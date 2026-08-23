// Server-only helpers for MTN MoMo Collections and Airtel Money Africa
// "push" payments: the telecom sends a PIN prompt to the customer's phone.
// Never import this file from client code.

export type PushStatus = "pending" | "success" | "failed";

export interface StatusResult {
  status: PushStatus;
  amount?: number;
}

/** Normalizes Ugandan phone input (0700…, +256…, 256…, 7…) to 2567XXXXXXXX. */
export function normalizeUgPhone(raw: string): string | null {
  const digits = raw.replace(/[^\d]/g, "");
  let msisdn = digits;
  if (msisdn.startsWith("0")) msisdn = "256" + msisdn.slice(1);
  else if (/^7\d{8}$/.test(msisdn)) msisdn = "256" + msisdn;
  return /^2567\d{8}$/.test(msisdn) ? msisdn : null;
}

// ---------------------------------------------------------------------------
// MTN MoMo Collections (Request To Pay)
// ---------------------------------------------------------------------------

export function mtnConfigured() {
  return Boolean(
    process.env["MTN_SUBSCRIPTION_KEY"] &&
      process.env["MTN_API_USER"] &&
      process.env["MTN_API_KEY"],
  );
}

function mtnTargetEnv() {
  return process.env["MTN_TARGET_ENV"] ?? "sandbox";
}

function mtnBase() {
  return mtnTargetEnv() === "sandbox"
    ? "https://sandbox.momodeveloper.mtn.com"
    : "https://proxy.momo.mtn.com";
}

/** The MTN sandbox only transacts in EUR; production Uganda uses UGX. */
function mtnCurrency() {
  return mtnTargetEnv() === "sandbox" ? "EUR" : "UGX";
}

async function mtnToken(): Promise<string> {
  const res = await fetch(`${mtnBase()}/collection/token/`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env["MTN_API_USER"]!}:${process.env["MTN_API_KEY"]!}`,
        ).toString("base64"),
      "Ocp-Apim-Subscription-Key": process.env["MTN_SUBSCRIPTION_KEY"]!,
    },
  });
  if (!res.ok) throw new Error(`MTN auth failed (${res.status})`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function mtnRequestToPay(opts: {
  amount: number;
  phone: string;
  referenceId: string;
  externalId: string;
}): Promise<void> {
  const token = await mtnToken();
  const res = await fetch(`${mtnBase()}/collection/v1_0/requesttopay`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Reference-Id": opts.referenceId,
      "X-Target-Environment": mtnTargetEnv(),
      "Ocp-Apim-Subscription-Key": process.env["MTN_SUBSCRIPTION_KEY"]!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: String(opts.amount),
      currency: mtnCurrency(),
      externalId: opts.externalId,
      payer: { partyIdType: "MSISDN", partyId: opts.phone },
      payerMessage: "Zama Gadgets phone savings",
      payeeNote: "Zama Gadgets savings deposit",
    }),
  });
  // 202 Accepted = PIN prompt dispatched to the phone.
  if (res.status !== 202) {
    const text = await res.text();
    throw new Error(`MTN requestToPay failed (${res.status}): ${text.slice(0, 200)}`);
  }
}

export async function mtnGetStatus(referenceId: string): Promise<StatusResult> {
  const token = await mtnToken();
  const res = await fetch(`${mtnBase()}/collection/v1_0/requesttopay/${referenceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Target-Environment": mtnTargetEnv(),
      "Ocp-Apim-Subscription-Key": process.env["MTN_SUBSCRIPTION_KEY"]!,
    },
  });
  if (!res.ok) throw new Error(`MTN status check failed (${res.status})`);
  const data = (await res.json()) as { status?: string; amount?: string };
  const amount = data.amount != null ? Number(data.amount) : undefined;
  if (data.status === "SUCCESSFUL") return { status: "success", amount };
  if (data.status === "FAILED") return { status: "failed", amount };
  return { status: "pending", amount };
}

// ---------------------------------------------------------------------------
// Airtel Money Africa (USSD Push / merchant payment)
// ---------------------------------------------------------------------------

export function airtelConfigured() {
  return Boolean(
    process.env["AIRTEL_CLIENT_ID"] && process.env["AIRTEL_CLIENT_SECRET"],
  );
}

function airtelBase() {
  return (process.env["AIRTEL_ENV"] ?? "uat") === "uat"
    ? "https://openapiuat.airtel.africa"
    : "https://openapi.airtel.africa";
}

async function airtelToken(): Promise<string> {
  const res = await fetch(`${airtelBase()}/auth/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env["AIRTEL_CLIENT_ID"]!,
      client_secret: process.env["AIRTEL_CLIENT_SECRET"]!,
      grant_type: "client_credentials",
    }),
  });
  if (!res.ok) throw new Error(`Airtel auth failed (${res.status})`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function airtelPush(opts: {
  amount: number;
  phone: string;
  transactionId: string;
  reference: string;
}): Promise<void> {
  const token = await airtelToken();
  const res = await fetch(`${airtelBase()}/merchant/v1/payments/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Country": "UG",
      "X-Currency": "UGX",
    },
    body: JSON.stringify({
      reference: opts.reference,
      subscriber: { country: "UG", currency: "UGX", msisdn: opts.phone },
      transaction: {
        amount: opts.amount,
        country: "UG",
        currency: "UGX",
        id: opts.transactionId,
      },
    }),
  });
  const data = (await res.json().catch(() => null)) as {
    status?: { success?: boolean; message?: string };
  } | null;
  if (!res.ok || !data?.status?.success) {
    throw new Error(
      `Airtel push failed (${res.status}): ${data?.status?.message ?? "unknown"}`,
    );
  }
}

export async function airtelGetStatus(transactionId: string): Promise<StatusResult> {
  const token = await airtelToken();
  const res = await fetch(`${airtelBase()}/standard/v1/payments/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Country": "UG",
      "X-Currency": "UGX",
    },
  });
  if (!res.ok) throw new Error(`Airtel status check failed (${res.status})`);
  const data = (await res.json()) as {
    data?: { transaction?: { status?: string; amount?: number } };
  };
  const tx = data.data?.transaction;
  const amount = tx?.amount != null ? Number(tx.amount) : undefined;
  // TS = success, TF = failed, TP/TIP = still pending.
  if (tx?.status === "TS") return { status: "success", amount };
  if (tx?.status === "TF") return { status: "failed", amount };
  return { status: "pending", amount };
}
