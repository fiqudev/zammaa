import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftRight, Smartphone, Wrench, Zap, ShieldCheck, Truck } from "lucide-react";
import repair from "@/assets/repair.jpg.asset.json";
import { waLink } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Phone Repairs, Swaps & Topups | Zama Gadgets" },
      { name: "description", content: "Screen replacement, battery, charging port and software repairs, phone swaps, airtime and data topups at New Pioneer Mall, Wilson Street, Kampala." },
      { property: "og:title", content: "Phone Repairs, Swaps & Topups | Zama Gadgets" },
      { property: "og:description", content: "Expert phone and MacBook repairs, device swaps, airtime and data topups in Kampala." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Wrench, title: "Repair services", body: "Screen replacement, battery, charging port, camera, water damage and software fixes for iPhones, Androids, iPads, MacBooks and other gadgets." },
  { icon: ArrowLeftRight, title: "Swaps & trade-in", body: "Bring your old device, we value it fairly and you top up the balance for the phone or gadget you want." },
  { icon: Smartphone, title: "Unlocking & setup", body: "Network unlocking, iCloud guidance, data transfer and full setup before you leave the counter." },
  { icon: ShieldCheck, title: "Device check-up", body: "Free honest inspection — battery health, IMEI status and originality check before you buy anywhere." },
  { icon: Truck, title: "Countrywide delivery", body: "Delivery to all parts of Uganda and to neighbouring countries through trusted couriers and bus services." },
];

function Services() {
  return (
    <div>
      <section className="surface-hero">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">Services</h1>
          <p className="mt-3 max-w-2xl opacity-80">
            More than a shop — Zama Gadgets keeps your devices alive, upgraded and connected.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <article key={s.title} className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <s.icon className="size-8 text-primary" />
            <h2 className="mt-4 font-display text-lg font-bold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl border border-border bg-card shadow-card md:grid-cols-2">
          <img src={repair.url} alt="Technician repairing a smartphone at Zama Gadgets" loading="lazy" width={1200} height={800} className="h-full w-full object-cover" />
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold">Same-day repairs by certified technicians</h2>
            <p className="mt-4 text-muted-foreground">
              Most screen and battery replacements are done while you wait. We use quality parts,
              test everything in front of you and back our work with a service warranty.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink("Hello Zama Gadgets, I need a repair. Here is the problem with my device:")}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Book a repair
              </a>
              <Link to="/contact" className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted">
                Visit the shop
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}