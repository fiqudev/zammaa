import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, waLink } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Zama Gadgets | New Pioneer Mall, Wilson Street Kampala" },
      { name: "description", content: "Visit Zama Gadgets at New Pioneer Mall, Wilson Street, Shop No. PA 23, Kampala. Call +256 709 321161 or email zamagadgets@gmail.com." },
      { property: "og:title", content: "Contact Zama Gadgets | Kampala" },
      { property: "og:description", content: "Shop No. PA 23, New Pioneer Mall, Wilson Street, Kampala. Call or WhatsApp +256 709 321161." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div>
      <section className="surface-hero">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">Get in touch</h1>
          <p className="mt-3 max-w-2xl opacity-80">
            Walk in, call, or send a WhatsApp message — we reply fast during working hours.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3">
        <div className="space-y-4 md:col-span-1">
          {[
            { icon: MapPin, title: "Shop location", value: SITE.address },
            { icon: Phone, title: "Call us", value: SITE.phone, href: SITE.phoneHref },
            { icon: Mail, title: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
            { icon: Clock, title: "Working hours", value: "Mon – Sat: 8:30am – 8:00pm · Sun: 10:00am – 4:00pm" },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <c.icon className="size-6 text-primary" />
              <h2 className="mt-3 font-display text-sm font-bold uppercase tracking-wide">{c.title}</h2>
              {c.href ? (
                <a href={c.href} className="mt-1 block text-sm text-muted-foreground hover:text-primary">{c.value}</a>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">{c.value}</p>
              )}
            </div>
          ))}
          <a
            href={SITE.tiktok}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-border bg-card p-6 text-sm font-semibold shadow-card hover:bg-muted"
          >
            Follow us on TikTok — @zama.gadgets
          </a>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border shadow-card md:col-span-2">
          <iframe
            title="Zama Gadgets location — New Pioneer Mall, Wilson Street, Kampala"
            src="https://www.google.com/maps?q=New%20Pioneer%20Mall%20Wilson%20Street%20Kampala&output=embed"
            loading="lazy"
            className="h-[420px] w-full border-0"
          />
          <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-6">
            <p className="text-sm text-muted-foreground">Shop No. PA 23 — ask for Zama Gadgets at the entrance.</p>
            <a
              href={waLink("Hello Zama Gadgets, I'd like directions to your shop.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              <MessageCircle className="size-4" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}