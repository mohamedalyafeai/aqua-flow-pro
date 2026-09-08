import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "دخول الإدارة | رواد المضخات للتجارة" },
      { name: "description", content: "صفحة دخول فريق رواد المضخات لإدارة طلبات العملاء والردود." },
      { property: "og:title", content: "Team Sign In — Pioneers Pumps" },
      { property: "og:description", content: "Internal sign in for the Pioneers Pumps enquiry dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Team Sign In — Pioneers Pumps" },
      { name: "twitter:description", content: "Internal sign in for the enquiry dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        toast.success("تم إنشاء الحساب. تحقق من بريدك لتأكيد الحساب. / Account created — check your email to confirm.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <Toaster richColors position="top-center" />
      <div className="rounded-3xl border bg-card p-8 shadow-card">
        <h1 className="text-2xl font-bold">
          {mode === "signin" ? "دخول الإدارة / Team sign in" : "حساب جديد / Create account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          لوحة إدارة طلبات العملاء — للموظفين المصرح لهم فقط.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">البريد الإلكتروني / Email</Label>
            <Input id="email" name="email" type="email" required className="mt-1.5" dir="ltr" />
          </div>
          <div>
            <Label htmlFor="password">كلمة المرور / Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} className="mt-1.5" dir="ltr" />
          </div>
          <Button type="submit" disabled={busy} className="w-full bg-brand text-white hover:bg-brand-deep">
            {busy ? "..." : mode === "signin" ? "دخول / Sign in" : "إنشاء حساب / Sign up"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-sm text-brand hover:underline"
        >
          {mode === "signin" ? "إنشاء حساب جديد / Create an account" : "لدي حساب / I already have an account"}
        </button>
      </div>
    </div>
  );
}
