import { createFileRoute, Link } from "@tanstack/react-router";
import { PiggyBank, Wallet, PhoneCall, CheckCircle2, Smartphone, UserRound } from "lucide-react";
import savings from "@/assets/savings.jpg";
import { SITE, waLink } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import { MIN_DEPOSIT, NETWORKS, dialLink, formatUGX } from "@/lib/ussd";

export const Route = createFileRoute("/savings")({
  head: () => ({
    meta: [
      { title: "Phone Savings Plan | Save & Own Your Phone — Zama Gadgets" },
      { name: "description", content: "Open a free savings account and deposit instantly through Airtel Merchant 7040710 or MTN Merchant 82992038. Track your balance online and collect your phone when your savings are enough." },
      { property: "og:title", content: "Phone Savings Plan | Zama Gadgets" },
      { property: "og:description", content: "Save towards any phone through Airtel Merchant 7040710 or MTN Merchant 82992038 and track every deposit in your online savings account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Savings,
});

const STEPS = [
  { icon: UserRound, title: "1. Open your savings account", body: "Sign up free in under two minutes and tell us the device you are saving for. We reserve it for you." },
  { icon: Wallet, title: "2. Save at your pace", body: `Tap Save, choose MTN or Airtel, and your phone opens the payment menu — you only enter your PIN. Airtel Merchant ${SITE.merchant} or MTN Merchant ${SITE.mtnMerchant}.` },
  { icon: PiggyBank, title: "3. Watch your balance grow", body: "Every deposit is recorded against your name instantly. Check your confirmed balance any time in your account." },
  { icon: CheckCircle2, title: "4. Collect your phone", body: "When your savings reach the amount, walk into the shop or ask us to deliver it to you." },
];

const POPULAR = PRODUCTS.filter((p) => p.badge).slice(0, 4);

function Savings() {
  return (
    <div>
      <section className="surface-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Zama Savings</span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Save today, own your dream phone tomorrow</h1>
            <p className="mt-4 max-w-xl opacity-80">
              You don’t have to wait until you have all the money. Open your free savings account,
              deposit any amount from {formatUGX(MIN_DEPOSIT)} straight from your phone, and track
              every shilling until you own the device you want.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/savings-account"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                <UserRound className="size-4" /> Open my savings account
              </Link>
              <a
                href={waLink("Hello Zama Gadgets, I want to know more about the phone savings plan.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/15 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink-foreground/10"
              >
                <PhoneCall className="size-4" /> Ask on WhatsApp
              </a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="inline-flex flex-col gap-1 rounded-2xl bg-ink-foreground/10 p-6 ring-1 ring-ink-foreground/15">
                <span className="text-xs uppercase tracking-widest opacity-70">Airtel Merchant Number</span>
                <span className="font-display text-4xl font-bold text-accent">{SITE.merchant}</span>
                <span className="text-xs opacity-70">Registered as Zama Gadgets</span>
              </div>
              <div className="inline-flex flex-col gap-1 rounded-2xl bg-ink-foreground/10 p-6 ring-1 ring-ink-foreground/15">
                <span className="text-xs uppercase tracking-widest opacity-70">MTN Merchant Code</span>
                <span className="font-display text-4xl font-bold text-accent">{SITE.mtnMerchant}</span>
                <span className="text-xs opacity-70">Registered as Zama Gadgets</span>
              </div>
            </div>
          </div>
          <img src={savings} alt="Customer saving for a phone using mobile money" loading="lazy" width={1200} height={900} className="rounded-3xl object-cover shadow-glow" />
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
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Instant deposit</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Tap to pay from your phone</h2>
            <p className="mx-auto mt-3 max-w-xl opacity-80">
              These buttons open the payment menu on your phone directly. To have every deposit
              recorded and tracked, sign in to your savings account first.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {(Object.values(NETWORKS)).map((n) => (
              <article key={n.id} className="rounded-3xl bg-ink p-8 text-ink-foreground ring-1 ring-ink-foreground/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold">{n.label}</h3>
                  <span className="rounded-full bg-ink-foreground/10 px-3 py-1 text-xs font-semibold">
                    Merchant {n.merchant}
                  </span>
                </div>
                <ol className="mt-5 space-y-2 text-sm opacity-80">
                  {n.steps.map((s, i) => (
                    <li key={s}>
                      {i + 1}. {s}
                    </li>
                  ))}
                </ol>
                <a
                  href={dialLink(n.id)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
                >
                  <Smartphone className="size-4" /> Dial {n.dial} now
                </a>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-sm opacity-70">
            Works on any Ugandan SIM — no internet needed for the payment itself.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold">Popular savings targets</h2>
        <p className="mt-2 text-muted-foreground">Start saving for any of these — or anything else in the shop.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <img src={p.image} alt={p.name} loading="lazy" className="aspect-square w-full bg-muted object-contain p-4" />
              <div className="p-5">
                <h3 className="font-display font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.condition}</p>
                <Link to="/savings-account" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                  Save for this
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-card md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-bold">Good to know</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Minimum deposit is {formatUGX(MIN_DEPOSIT)} — save any amount from there, any day.</li>
              <li>Your savings can be moved to a different model if you change your mind.</li>
              <li>Always use Airtel Merchant {SITE.merchant} or MTN Merchant {SITE.mtnMerchant} and keep the payment message as proof.</li>
              <li>Deposits made through your account appear in your history instantly and are confirmed by our team.</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-secondary p-8 text-secondary-foreground">
            <h3 className="font-display text-xl font-bold">Ready to start saving?</h3>
            <p className="text-sm opacity-80">Open your savings account in less than two minutes.</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/savings-account"
                className="inline-flex w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Open my savings account
              </Link>
              <a
                href={waLink("Hello Zama Gadgets, I want to start the phone savings plan. The phone I'm targeting is:")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit rounded-full border border-secondary-foreground/25 px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary-foreground/10"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
