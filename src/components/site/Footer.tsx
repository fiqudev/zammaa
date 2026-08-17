import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/zama-logo.png.asset.json";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="Zama Gadgets logo" width={48} height={48} loading="lazy" className="h-12 w-12 rounded-md bg-ink-foreground/95 object-contain p-1" />
            <span className="font-display text-xl font-bold">ZAMA GADGETS</span>
          </div>
          <p className="mt-4 max-w-md text-sm opacity-75">
            Thank you for supporting Zama Gadgets. Your trust keeps us going — new and used
            iPhones, MacBooks, tablets, accessories, swaps, topups, repairs and phone savings,
            delivered across Uganda and the region.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link to="/shop" className="hover:text-accent">Shop</Link></li>
            <li><Link to="/services" className="hover:text-accent">Services</Link></li>
            <li><Link to="/savings" className="hover:text-accent">Phone Savings</Link></li>
            <li><Link to="/about" className="hover:text-accent">About us</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><a href={SITE.tiktok} target="_blank" rel="noreferrer" className="hover:text-accent">TikTok @zama.gadgets</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Visit us</h3>
          <ul className="mt-4 space-y-3 text-sm opacity-80">
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" />{SITE.address}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0" /><a href={SITE.phoneHref} className="hover:text-accent">{SITE.phone}</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs opacity-60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Zama Gadgets. Quality Beyond.</p>
          <p>Savings via Airtel Merchant {SITE.merchant}</p>
        </div>
      </div>
    </footer>
  );
}