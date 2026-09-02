import { Star } from "lucide-react";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";
import t4 from "@/assets/t4.jpg";

const REVIEWS = [
  {
    name: "Denis Kirabo",
    place: "Kampala, Uganda",
    image: t1,
    rating: 5,
    text: "I bought a UK used iPhone 13 Pro Max from their shop at New Pioneer. Battery health was exactly what they told me. Genuine people, no stories.",
  },
  {
    name: "Sarah Nakato",
    place: "Mukono, Uganda",
    image: t2,
    rating: 5,
    text: "I saved with them through the Airtel merchant number for four months and picked up my iPhone 14. They kept every record and never disappointed me.",
  },
  {
    name: "Emmanuel Mwangi",
    place: "Nairobi, Kenya",
    image: t3,
    rating: 5,
    text: "Ordered a MacBook Air M2 on WhatsApp from Nairobi. Clear photos, fair price and it reached me safely. I will definitely buy again.",
  },
  {
    name: "Grace Uwase",
    place: "Kigali, Rwanda",
    image: t4,
    rating: 5,
    text: "My screen was cracked and they repaired it the same day I sent it. Then they swapped my old phone and I added a small balance. Very fair.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Testimonials</span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Trusted by clients across the region</h2>
        <p className="mt-3 text-muted-foreground">
          Real customers from Uganda, Kenya, Rwanda, Tanzania and South Sudan.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">“{r.text}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              <img src={r.image} alt={r.name} loading="lazy" width={600} height={600} className="size-11 rounded-full object-cover" />
              <span>
                <span className="block text-sm font-semibold">{r.name}</span>
                <span className="block text-xs text-muted-foreground">{r.place}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}