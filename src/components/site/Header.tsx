import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/zama-logo.png.asset.json";
import { SITE, waLink } from "@/data/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/services", label: "Services" },
  { to: "/savings", label: "Phone Savings" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs">
          <p className="opacity-80">{SITE.address}</p>
          <div className="flex items-center gap-5 opacity-90">
            <a href={SITE.phoneHref} className="hover:text-accent">{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a>
            <a href={SITE.tiktok} target="_blank" rel="noreferrer" className="hover:text-accent">TikTok</a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="Zama Gadgets logo" width={48} height={48} className="h-11 w-11 rounded-md object-contain" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight">ZAMA GADGETS</span>
            <span className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{SITE.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink("Hello Zama Gadgets, I would like to make an order.")}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <Phone className="size-4" /> Order on WhatsApp
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-2 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}