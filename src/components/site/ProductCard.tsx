import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { waLink } from "@/data/site";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.condition}
        </span>
        <h3 className="font-display text-base font-bold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.specs}</p>
        <a
          href={waLink(`Hello Zama Gadgets, I'm interested in the ${product.name} (${product.condition}). Is it available and what's the price?`)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ShoppingBag className="size-4" /> Order on WhatsApp
        </a>
      </div>
    </article>
  );
}