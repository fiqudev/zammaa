import { createFileRoute } from "@tanstack/react-router";
import { PiggyBank, Wallet, PhoneCall, CheckCircle2 } from "lucide-react";
import savings from "@/assets/savings.jpg.asset.json";
import { SITE, waLink } from "@/data/site";

export const Route = createFileRoute("/savings")({
  head: () => ({
    meta: [
      { title: "Phone Savings Plan | Save & Own Your Phone — Zama Gadgets" },
      { name: "description", content: "Save little by little through Airtel Merchant 7040710 and collect your phone when your savings are enough. Flexible, transparent and recorded." },
      { property: "og:title", content: "Phone Savings Plan | Zama Gadgets" },
      { property: "og:description", content: "Save towards any phone through Airtel Merchant 7040710 and pick it up when you reach the amount." },
    ],
  }),
  component: Savings,
});

const STEPS = [
  { icon: PhoneCall, title: "1. Tell us your target", body: "Call or WhatsApp us with the phone you want. We agree on the amount and reserve it for you." },
  { icon: Wallet, title: "2. Save at your pace", body: `Send any amount, any day, to our Airtel Merchant number ${SITE.merchant}. Daily, weekly or monthly — you decide.` },
  { icon: PiggyBank, title: "3. We record every deposit", body: "Each payment is recorded against your name and phone number. Ask for your balance at any time." },
  { icon: CheckCircle2, title: "4. Collect your phone", body: "When your savings reach the amount, walk into the shop or ask us to deliver it to you." },
];

function Savings() {
  return (
    <div>
      <section className="surface-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Zama Savings</span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Save today, own your dream phone tomorrow</h1>
            <p className="mt-4 max-w-xl opacity-80">
              You don’t have to wait until you have all the money. Save with Zama Gadgets little by
              little, and when your savings reach the price of the phone you want, you simply come
              and pick it up.
            </p>
            <div className="mt-8 inline-flex flex-col gap-1 rounded-2xl bg-ink-foreground/10 p-6 ring-1 ring-ink-foreground/15">
              <span className="text-xs uppercase tracking-widest opacity-70">Airtel Merchant Number</span>
              <span className="font-display text-4xl font-bold text-accent">{SITE.merchant}</span>
              <span className="text-xs opacity-70">Registered as Zama Gadgets</span>
            </div>
          </div>
          <img src={savings.url} alt="Customer saving for a phone using mobile money" loading="lazy" width={1200} height={900} className="rounded-3xl object-cover shadow-glow" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold">How the savings plan works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <article key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <s.icon className="size-7 text-primary" />
              <h3 className="mt-4 font-display text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-card md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-bold">Good to know</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Minimum deposit is UGX 50,000 — save any amount from there, any day.</li>
              <li>Your savings can be moved to a different model if you change your mind.</li>
              <li>Always use the merchant number {SITE.merchant} and keep your Airtel message as proof.</li>
              <li>Send us a screenshot on WhatsApp after every deposit so we update your record.</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-secondary p-8 text-secondary-foreground">
            <h3 className="font-display text-xl font-bold">Ready to start saving?</h3>
            <p className="text-sm opacity-80">Open your savings record in less than two minutes.</p>
            <a
              href={waLink(`Hello Zama Gadgets, I want to start the phone savings plan. The phone I'm targeting is:`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              Start saving on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}