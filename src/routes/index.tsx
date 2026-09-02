import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Testimonials } from "@/components/site/Testimonials";
import { ProductCard } from "@/components/site/ProductCard";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PRODUCTS } from "@/data/products";
import { waLink } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Zama Gadgets | New & Used iPhones, MacBooks, Tablets & Accessories",
      },
      {
        name: "description",
        content:
          "Zama Gadgets sells new and used iPhones, MacBooks, tablets, smart gadgets, accessories, swaps and repairs in Kampala. Phone savings available via Airtel Merchant 7040710. Delivered across Uganda and the region.",
      },
      {
        property: "og:title",
        content: "Zama Gadgets | New & Used iPhones, MacBooks & Tablets",
      },
      {
        property: "og:description",
        content:
          "Quality Beyond. Shop iPhones, MacBooks, tablets, smart gadgets and accessories. Order on WhatsApp, save through Airtel Merchant 7040710, or visit us at New Pioneer Mall, Wilson Street.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Tested devices",
    body: "Every gadget and device is inspected for authenticity, battery health and performance before it reaches you.",
  },
  {
    icon: Wrench,
    title: "Same-day repairs",
    body: "Screen, battery, charging and software fixes done by certified technicians while you wait.",
  },
  {
    icon: ShieldCheck,
    title: "Safe swaps",
    body: "Trade in your old device and top up the difference for the upgrade you actually want.",
  },
  {
    icon: Truck,
    title: "Countrywide delivery",
    body: "We deliver to every region of Uganda and to nearby countries through trusted couriers.",
  },
];

const CATEGORIES = [
  { label: "iPhones", to: "/shop" },
  { label: "MacBooks", to: "/shop" },
  { label: "Tablets", to: "/shop" },
  { label: "Accessories", to: "/shop" },
  { label: "Repairs", to: "/services" },
  { label: "Phone savings", to: "/savings" },
] as const;

function Index() {
  const featured = PRODUCTS.filter((p) => p.badge).slice(0, 4);

  return (
    <div>
      <section className="surface-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="group relative inline-flex items-center rounded-full p-px transition-transform duration-300 hover:scale-105">
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 blur-sm transition-opacity group-hover:opacity-75" />
              <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-1.5 shadow-lg shadow-indigo-500/20">
                <Zap className="size-3.5 text-white" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  New arrivals in stock
                </span>
              </span>
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Your trusted gadget store in Kampala
            </h1>
            <p className="mt-5 max-w-md text-lg opacity-85">
              New and used iPhones, MacBooks, tablets, smart gadgets, accessories, swaps and repairs.
              Quality Beyond, delivered across Uganda and the region.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Shop now <ArrowRight className="size-4" />
              </Link>
              <a
                href={waLink(
                  "Hello Zama Gadgets, I saw your website and I have an inquiry.",
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/10 hover:border-primary-foreground/70"
              >
                <WhatsAppIcon className="size-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={hero}
              alt="Premium iPhone and MacBook displayed in dramatic lighting"
              width={1600}
              height={1104}
              className="rounded-3xl object-cover shadow-glow"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 text-sm">
          <span className="font-semibold">New Pioneer Mall · Wilson Street · Shop No. PA 23</span>
          <span className="text-muted-foreground">Delivery to all parts of Uganda & neighbouring countries</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="shrink-0 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold shadow-card transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Featured</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Popular right now</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
            View all products
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">
            View all products
          </Link>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Phone Savings</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Save small, own the phone you want
            </h2>
            <p className="mt-4 opacity-80">
              No pressure. Save any amount through Airtel Merchant 7040710 or MTN Merchant 82992038 and collect your device when
              your balance is enough. Perfect for students, professionals and families.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/savings"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Start saving
              </Link>
              <a
                href={waLink("Hello Zama Gadgets, I want to know more about the phone savings plan.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-secondary-foreground/25 px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary-foreground/10"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <div className="rounded-3xl bg-ink p-8 text-ink-foreground ring-1 ring-ink-foreground/10">
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { title: "Daily savings", body: "Save any amount, any day" },
                { title: "No interest", body: "You own 100% of what you save" },
                { title: "Tracked", body: "We record every deposit in your name" },
                { title: "Flexible", body: "Switch to another model anytime" },
              ].map((i) => (
                <div key={i.title} className="rounded-2xl bg-ink-foreground/10 p-5">
                  <h3 className="font-display font-bold">{i.title}</h3>
                  <p className="mt-1 text-sm opacity-70">{i.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Why Zama Gadgets</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">More than a gadget shop</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-border bg-card p-7 text-center shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary">
                <f.icon className="size-7 text-accent" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="surface-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Thank you for supporting Zama Gadgets</h2>
          <p className="mt-4 text-lg opacity-80">
            Your trust is the reason we keep going. Whether you buy, save, repair or recommend us to a
            friend, you are part of the Zama Gadgets family. We promise to keep delivering Quality
            Beyond.
          </p>
          <a
            href={waLink("Hello Zama Gadgets, I want to place an order.")}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Order on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
