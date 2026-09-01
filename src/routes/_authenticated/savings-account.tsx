import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Loader2, LogOut, PhoneCall, PiggyBank, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SITE, waLink } from "@/data/site";
import { MIN_DEPOSIT, NETWORKS, formatUGX, type NetworkId } from "@/lib/ussd";
import { initiateDepositPayment, syncDepositStatus } from "@/lib/payments.functions";

export const Route = createFileRoute("/_authenticated/savings-account")({
  head: () => ({
    meta: [
      { title: "My Savings Account | Zama Gadgets" },
      {
        name: "description",
        content:
          "Track your Zama Gadgets phone savings, deposit instantly through MTN MoMoPay or Airtel Money, and see your balance towards your target device.",
      },
      { property: "og:title", content: "My Savings Account | Zama Gadgets" },
      {
        property: "og:description",
        content: "Deposit through MTN or Airtel and watch your phone savings grow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SavingsAccount,
});

function SavingsAccount() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const goals = useQuery({
    queryKey: ["savings-goals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("savings_goals")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deposits = useQuery({
    queryKey: ["deposits"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deposits")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const goal = goals.data?.[0] ?? null;

  const totals = useMemo(() => {
    const rows = deposits.data ?? [];
    const confirmed = rows
      .filter((d) => d.status === "confirmed")
      .reduce((s, d) => s + Number(d.amount), 0);
    const pending = rows
      .filter((d) => d.status === "pending")
      .reduce((s, d) => s + Number(d.amount), 0);
    return { confirmed, pending };
  }, [deposits.data]);

  const target = goal ? Number(goal.target_amount) : 0;
  const progress = target > 0 ? Math.min(100, (totals.confirmed / target) * 100) : 0;

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Zama Savings
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">My savings account</h1>
        </div>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
          {goal ? (
            <>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Saving for
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold">{goal.device_name}</h2>
              <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Stat label="Confirmed" value={formatUGX(totals.confirmed)} />
                <Stat label="Awaiting confirmation" value={formatUGX(totals.pending)} />
                <Stat label="Target" value={formatUGX(target)} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {totals.confirmed >= target && target > 0
                  ? "You have reached your target — come and pick up your device, or ask us to deliver it."
                  : `${formatUGX(Math.max(0, target - totals.confirmed))} left to reach your target.`}
              </p>
            </>
          ) : (
            <GoalForm onSaved={() => qc.invalidateQueries({ queryKey: ["savings-goals"] })} />
          )}
        </div>

        <DepositCard
          goalId={goal?.id ?? null}
          onSaved={() => qc.invalidateQueries({ queryKey: ["deposits"] })}
        />
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Deposit history</h2>
        {(deposits.data?.length ?? 0) === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No deposits yet. Make your first one above — the minimum is {formatUGX(MIN_DEPOSIT)}.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Network</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {deposits.data?.map((d) => (
                  <tr key={d.id} className="border-t border-border">
                    <td className="px-5 py-3">
                      {new Date(d.created_at).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-5 py-3">{NETWORKS[d.network as NetworkId]?.short ?? d.network}</td>
                    <td className="px-5 py-3 font-semibold">{formatUGX(Number(d.amount))}</td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          d.status === "confirmed"
                            ? "rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"
                            : d.status === "rejected"
                              ? "rounded-full bg-destructive/15 px-3 py-1 text-xs font-semibold text-destructive"
                              : "rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"
                        }
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/50 p-4">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}

function GoalForm({ onSaved }: { onSaved: () => void }) {
  const [device, setDevice] = useState("");
  const [amount, setAmount] = useState("");

  const save = useMutation({
    mutationFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Please sign in again");
      const { error } = await supabase.from("savings_goals").insert({
        user_id: auth.user.id,
        device_name: device,
        target_amount: Number(amount),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Savings goal created");
      onSaved();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not save goal"),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate();
      }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <PiggyBank className="size-6 text-primary" />
        <h2 className="font-display text-xl font-bold">Set your savings target</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Tell us the device you want and how much it costs. We reserve it and track every deposit.
      </p>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Device you are saving for
        </span>
        <input
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          required
          placeholder="iPhone 13 Pro Max"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Target amount (UGX)
        </span>
        <input
          type="number"
          min={MIN_DEPOSIT}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="2500000"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>
      <button
        type="submit"
        disabled={save.isPending}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
      >
        <Plus className="size-4" /> Create savings goal
      </button>
    </form>
  );
}

type Phase = "idle" | "prompting" | "confirmed" | "failed";

function DepositCard({ goalId, onSaved }: { goalId: string | null; onSaved: () => void }) {
  const [network, setNetwork] = useState<NetworkId>("mtn");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [note, setNote] = useState("");
  const [manualMode, setManualMode] = useState(false);
  const info = NETWORKS[network];
  const value = Number(amount || 0);

  const initiate = useServerFn(initiateDepositPayment);
  const sync = useServerFn(syncDepositStatus);

  /** Polls the network until the customer enters (or abandons) their PIN. */
  async function waitForPin(depositId: string) {
    const deadline = Date.now() + 3 * 60 * 1000;
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 4000));
      let status: string;
      try {
        ({ status } = await sync({ data: { depositId } }));
      } catch {
        continue;
      }
      if (status === "confirmed") {
        setPhase("confirmed");
        setNote("Payment received — your savings balance has been updated.");
        setAmount("");
        onSaved();
        toast.success("Deposit confirmed and added to your savings");
        return;
      }
      if (status === "rejected") {
        setPhase("failed");
        setNote("The payment was not completed, so nothing was saved. You can try again.");
        onSaved();
        return;
      }
    }
    setPhase("failed");
    setNote(
      "We did not get a confirmation in time. If you entered your PIN, it will appear once our team verifies it.",
    );
    onSaved();
  }

  const start = useMutation({
    mutationFn: async () => {
      if (value < MIN_DEPOSIT) throw new Error(`Minimum deposit is ${formatUGX(MIN_DEPOSIT)}`);
      const res = await initiate({
        data: { amount: value, phone, network, goalId },
      });
      if (!res.ok) {
        if (res.reason === "not_configured") {
          setManualMode(true);
          throw new Error(
            "Automatic mobile money is not switched on yet — use the merchant steps below.",
          );
        }
        throw new Error("The network could not send the PIN prompt. Please try again.");
      }
      setPhase("prompting");
      setNote(
        `Check ${phone} — enter your ${info.short} PIN on the prompt to complete the payment.`,
      );
      onSaved();
      await waitForPin(res.depositId!);
    },
    onError: (e) => {
      setPhase("idle");
      toast.error(e instanceof Error ? e.message : "Could not start the payment");
    },
  });

  async function copyMerchant() {
    await navigator.clipboard.writeText(info.merchant);
    setCopied(true);
    toast.success("Merchant code copied");
    setTimeout(() => setCopied(false), 2000);
  }

  const busy = start.isPending || phase === "prompting";

  return (
    <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
      <h2 className="font-display text-xl font-bold">Save now</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter the amount and your mobile money number. A PIN prompt appears on your phone — enter
        your PIN and your balance updates automatically. If you don’t, nothing is saved.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {(Object.values(NETWORKS)).map((n) => (
          <button
            key={n.id}
            type="button"
            disabled={busy}
            onClick={() => setNetwork(n.id)}
            className={
              network === n.id
                ? "rounded-2xl border-2 border-primary bg-primary/10 px-4 py-3 text-sm font-semibold"
                : "rounded-2xl border border-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted disabled:opacity-60"
            }
          >
            {n.label}
            <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
              Merchant {n.merchant}
            </span>
          </button>
        ))}
      </div>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Amount (min {formatUGX(MIN_DEPOSIT)})
        </span>
        <input
          type="number"
          min={MIN_DEPOSIT}
          step={1000}
          value={amount}
          disabled={busy}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="50000"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-60"
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {info.short} number to charge
        </span>
        <input
          type="tel"
          value={phone}
          disabled={busy}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0700 000 000"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-60"
        />
      </label>

      <button
        onClick={() => {
          setNote("");
          setPhase("idle");
          start.mutate();
        }}
        disabled={busy}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
      >
        {phase === "prompting" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Waiting for your PIN…
          </>
        ) : (
          <>
            <PhoneCall className="size-4" /> Save {value >= MIN_DEPOSIT ? formatUGX(value) : ""} with{" "}
            {info.short}
          </>
        )}
      </button>

      {note && (
        <p
          className={
            phase === "confirmed"
              ? "mt-4 rounded-2xl bg-primary/10 p-4 text-sm font-medium text-primary"
              : phase === "failed"
                ? "mt-4 rounded-2xl bg-destructive/10 p-4 text-sm font-medium text-destructive"
                : "mt-4 rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground"
          }
        >
          {note}
        </p>
      )}

      <div className="mt-6 rounded-2xl bg-muted/50 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {info.short} merchant code
            </span>
            <p className="font-display text-2xl font-bold">{info.merchant}</p>
          </div>
          <button
            type="button"
            onClick={copyMerchant}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold hover:bg-muted"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} Copy
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {manualMode
            ? "Backup method — pay the merchant code yourself and our team will confirm it:"
            : "Backup method if the prompt does not reach your phone:"}
        </p>
        <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {info.steps.map((s, i) => (
            <li key={s}>
              {i + 1}. {s}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">
          Dial code: <span className="font-semibold text-foreground">{info.dial}</span> · registered
          as {SITE.name}
        </p>
      </div>

      <a
        href={waLink("Hello Zama Gadgets, here is my savings deposit confirmation message.")}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block text-center text-sm font-semibold text-primary hover:underline"
      >
        Send your payment message on WhatsApp
      </a>
    </div>
  );
}
