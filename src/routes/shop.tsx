import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, PRODUCTS, type Category } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { SITE, waLink } from "@/data/site";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop iPhones, MacBooks & Tablets | Zama Gadgets Kampala" },
      { name: "description", content: "Browse new and UK used iPhones from iPhone 11, MacBooks, iPads and accessories. Order instantly on WhatsApp with delivery across Uganda." },
      { property: "og:title", content: "Shop iPhones, MacBooks & Tablets | Zama Gadgets" },
      { property: "og:description", content: "New and used iPhones, MacBooks, tablets and accessories. Order on WhatsApp, delivered countrywide." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const list = PRODUCTS.filter(
    (p) =>
      (active === "All" || p.category === active) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div>
      <section className="surface-hero">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">Shop</h1>
          <p className="mt-3 max-w-2xl opacity-80">
            Pick what you want, tap “Order on WhatsApp” and our team confirms availability, the
            current price and delivery to your location.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active === c
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a model…"
              aria-label="Search products"
              className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No match here — message us on WhatsApp and we will source it for you.
          </p>
        )}

        <div className="mt-14 rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <h2 className="text-2xl font-bold">Didn’t find your model?</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            We source specific models on request — Samsung, Google Pixel, gaming laptops and more.
            Talk to us on {SITE.phone}.
          </p>
          <a
            href={waLink("Hello Zama Gadgets, I'm looking for a specific device. Can you help me source it?")}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Request a device
          </a>
        </div>
      </section>
    </div>
  );
}