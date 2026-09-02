import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Savings Account Login | Zama Gadgets" },
      {
        name: "description",
        content:
          "Sign in or create your Zama Gadgets savings account to deposit through MTN MoMoPay or Airtel Money and track your balance towards your next phone.",
      },
      { property: "og:title", content: "Savings Account Login | Zama Gadgets" },
      {
        property: "og:description",
        content: "Track every deposit you make towards your next phone at Zama Gadgets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/savings-account" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/savings-account`,
            data: { full_name: fullName, phone },
          },
        });
        if (error) throw error;
        toast.success("Account created. You can start saving now.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      const { data } = await supabase.auth.getSession();
      if (data.session) navigate({ to: "/savings-account" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function googleFallback() {
    // Works on any host (Vercel, custom domains) via the backend's own OAuth flow.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/savings-account` },
    });
    if (error) toast.error("Google sign-in failed. Please try again.");
  }

  async function google() {
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        await googleFallback();
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/savings-account" });
    } catch {
      await googleFallback();
    }
  }

  return (
    <main className="surface-hero">
      <div className="mx-auto flex max-w-md flex-col px-4 py-16">
        <h1 className="font-display text-3xl font-bold">
          {mode === "signin" ? "Sign in to your savings" : "Open a savings account"}
        </h1>
        <p className="mt-2 text-sm opacity-80">
          Save towards any phone at {SITE.name} and keep every deposit on record.
        </p>

        <div className="mt-8 rounded-3xl bg-card p-6 text-card-foreground shadow-card">
          <button
            type="button"
            onClick={google}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <Field label="Full name" value={fullName} onChange={setFullName} required />
                <Field
                  label="Phone number"
                  value={phone}
                  onChange={setPhone}
                  placeholder="07XX XXX XXX"
                  required
                />
              </>
            )}
            <Field label="Email" type="email" value={email} onChange={setEmail} required />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
            />
            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to Zama savings?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>

        <Link to="/savings" className="mt-6 text-center text-sm opacity-80 hover:underline">
          How the savings plan works
        </Link>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
