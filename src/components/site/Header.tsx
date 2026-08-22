import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Menu, X, Phone, PiggyBank, LogOut } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/zama-logo.png.asset.json";
import { SITE, waLink } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";

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
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    setOpen(false);
    navigate({ to: "/" });
  }

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
          <Link
            to="/savings-account"
            activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            My Savings
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <button
              onClick={signOut}
              className="hidden items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted sm:inline-flex"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          ) : (
            <Link
              to="/auth"
              className="hidden items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted sm:inline-flex"
            >
              <PiggyBank className="size-4" /> Sign in
            </Link>
          )}
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
          <Link
            to="/savings-account"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
          >
            My Savings
          </Link>
          {session ? (
            <button
              onClick={signOut}
              className="block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-muted"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Sign in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
