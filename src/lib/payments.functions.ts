import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { MIN_DEPOSIT, formatUGX } from "@/lib/ussd";
import {
  airtelConfigured,
  airtelGetStatus,
  airtelPush,
  mtnConfigured,
  mtnGetStatus,
  mtnRequestToPay,
  normalizeUgPhone,
} from "@/lib/payments.server";

export interface InitiateResult {
  ok: boolean;
  reason?: "not_configured" | "provider_error";
  depositId?: string;
}

/**
 * Records a pending deposit and asks the mobile-money network to push a PIN
 * prompt to the customer's phone. The deposit only counts towards the
 * balance once the network confirms the PIN was entered (syncDepositStatus).
 */
export const initiateDepositPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { amount: number; phone: string; network: "mtn" | "airtel"; goalId?: string | null }) =>
      input,
  )
  .handler(async ({ data, context }): Promise<InitiateResult> => {
    const amount = Math.round(Number(data.amount));
    if (!Number.isFinite(amount) || amount < MIN_DEPOSIT) {
      throw new Error(`Minimum deposit is ${formatUGX(MIN_DEPOSIT)}`);
    }
    const phone = normalizeUgPhone(String(data.phone ?? ""));
    if (!phone) throw new Error("Enter a valid Ugandan number, e.g. 0700 000 000");
    if (data.network !== "mtn" && data.network !== "airtel") {
      throw new Error("Choose MTN or Airtel");
    }

    const configured =
      data.network === "mtn" ? mtnConfigured() : airtelConfigured();
    if (!configured) return { ok: false, reason: "not_configured" };

    const reference = crypto.randomUUID();
    const { data: row, error } = await context.supabase
      .from("deposits")
      .insert({
        user_id: context.userId,
        goal_id: data.goalId ?? null,
        amount,
        network: data.network,
        payer_phone: phone,
        provider_ref: reference,
      })
      .select("id")
      .single();
    if (error || !row) throw new Error("Could not record the deposit");

    try {
      if (data.network === "mtn") {
        await mtnRequestToPay({
          amount,
          phone,
          referenceId: reference,
          externalId: row.id,
        });
      } else {
        await airtelPush({
          amount,
          phone,
          transactionId: reference,
          reference: `Zama savings deposit`,
        });
      }
    } catch (e) {
      console.error(e);
      return { ok: false, reason: "provider_error", depositId: row.id };
    }

    return { ok: true, depositId: row.id };
  });

/**
 * Asks the network whether the customer completed the PIN prompt for a
 * deposit. On success the deposit is marked confirmed (balance counts it);
 * on failure/cancel it is marked rejected; otherwise it stays pending.
 */
export const syncDepositStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { depositId: string }) => input)
  .handler(async ({ data, context }): Promise<{ status: string }> => {
    const { data: dep, error } = await context.supabase
      .from("deposits")
      .select("id, amount, network, status, provider_ref")
      .eq("id", data.depositId)
      .single();
    if (error || !dep) throw new Error("Deposit not found");
    if (dep.status !== "pending" || !dep.provider_ref) return { status: dep.status };

    let result;
    try {
      result =
        dep.network === "mtn"
          ? await mtnGetStatus(dep.provider_ref)
          : await airtelGetStatus(dep.provider_ref);
    } catch (e) {
      // Transient provider error — keep waiting rather than failing the deposit.
      console.error(e);
      return { status: "pending" };
    }
    if (result.status === "pending") return { status: "pending" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (
      result.status === "success" &&
      (result.amount == null ||
        Math.round(result.amount) === Math.round(Number(dep.amount)))
    ) {
      await supabaseAdmin
        .from("deposits")
        .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
        .eq("id", dep.id)
        .eq("status", "pending");
      return { status: "confirmed" };
    }
    if (result.status === "failed") {
      await supabaseAdmin
        .from("deposits")
        .update({ status: "rejected" })
        .eq("id", dep.id)
        .eq("status", "pending");
      return { status: "rejected" };
    }
    return { status: "pending" };
  });
