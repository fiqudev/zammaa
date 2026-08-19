import { createFileRoute, Link } from "@tanstack/react-router";
import { Testimonials } from "@/components/site/Testimonials";
import logo from "@/assets/zama-logo.png.asset.json";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zama Gadgets | Trusted Phone Shop in Kampala" },
      { name: "description", content: "Zama Gadgets sells new and used iPhones, MacBooks and tablets at New Pioneer Mall, Wilson Street, Kampala. Quality Beyond — swaps, repairs, topups and phone savings." },
      { property: "og:title", content: "About Zama Gadgets | Trusted Phone Shop in Kampala" },
      { property: "og:description", content: "Who we are: a Kampala-based gadget shop built on honest deals, genuine devices and real customer care." },
    ],
  }),
  component: About,
});

const STATS = [
  { value: "5,000+", label: "Happy customers served" },
  { value: "6", label: "Countries we deliver to" },
  { value: "24hr", label: "Typical repair turnaround" },
  { value: "100%", label: "Devices tested before sale" },
];

function About() {
  return (
    <div>
      <section className="surface-hero">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <img src={logo.url} alt="Zama Gadgets logo" loading="lazy" width={80} height={80} className="h-20 w-20 rounded-xl bg-ink-foreground/95 object-contain p-2" />
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Quality Beyond</h1>
          <p className="mt-4 max-w-2xl opacity-80">
            Zama Gadgets is a Kampala-based gadget store built on one simple promise: sell honest
            devices at honest prices, and treat every customer like family.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold">Our story</h2>
          <p className="mt-4 text-muted-foreground">
            We started with a small counter and a big belief — that Ugandans deserve access to
            genuine iPhones, MacBooks and tablets without being cheated. Today we operate from
            {" "}{SITE.address}, serving walk-in customers, online buyers and clients across East Africa.
          </p>
          <p className="mt-4 text-muted-foreground">
            Beyond selling, we repair, swap and run a phone savings plan that has helped
            hundreds of people own devices they once thought were out of reach.
          </p>
          <Link to="/shop" className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            Browse our shop
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 self-start">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-3xl bg-secondary p-10 text-center text-secondary-foreground">
          <h2 className="text-2xl font-bold">Thank you for supporting Zama Gadgets</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm opacity-80">
            Every purchase, every referral and every review keeps this dream alive. We are truly
            grateful for your trust and we promise to keep giving you Quality Beyond.
          </p>
        </div>
      </section>
    </div>
  );
}