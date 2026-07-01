import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  product_slug: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
  source: z.string().trim().max(50).default("contact_form"),
  lang: z.enum(["ar", "en"]).default("ar"),
});

export type LeadInput = z.infer<typeof leadSchema>;

const NOTIFY_EMAIL = "mohamedyafei17@gmail.com";

function esc(s: string | undefined | null) {
  return String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Backend not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    });

    const { data: inserted, error } = await supabase
      .from("leads")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        service: data.service || null,
        product_slug: data.product_slug || null,
        message: data.message,
        source: data.source,
        lang: data.lang,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[submitLead] insert error:", error.message);
      throw new Error("Could not save your request. Please try again.");
    }

    // Best-effort email notification via Lovable Emails infrastructure.
    // If email infra is not configured yet, silently continue — the lead
    // is safely stored in the database.
    try {
      const subject = `طلب جديد من الموقع - ${data.name} | New website lead`;
      const html = `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:20px; background:#ffffff;">
          <h2 style="color:#0B3C5D; border-bottom:2px solid #0B3C5D; padding-bottom:10px;">New Lead / طلب جديد</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px; font-weight:bold;">Name / الاسم</td><td style="padding:8px;">${esc(data.name)}</td></tr>
            <tr style="background:#f5f7fa;"><td style="padding:8px; font-weight:bold;">Phone / الهاتف</td><td style="padding:8px;" dir="ltr">${esc(data.phone)}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Email / البريد</td><td style="padding:8px;" dir="ltr">${esc(data.email || "-")}</td></tr>
            <tr style="background:#f5f7fa;"><td style="padding:8px; font-weight:bold;">Service / الخدمة</td><td style="padding:8px;">${esc(data.service || "-")}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Product / المنتج</td><td style="padding:8px;">${esc(data.product_slug || "-")}</td></tr>
            <tr style="background:#f5f7fa;"><td style="padding:8px; font-weight:bold;">Source / المصدر</td><td style="padding:8px;">${esc(data.source)}</td></tr>
            <tr><td style="padding:8px; font-weight:bold; vertical-align:top;">Message / الرسالة</td><td style="padding:8px; white-space:pre-wrap;">${esc(data.message)}</td></tr>
          </table>
          <p style="margin-top:20px; color:#666; font-size:12px;">Lead ID: ${inserted?.id ?? "n/a"}</p>
        </div>
      `;

      const lovableApiKey = process.env.LOVABLE_API_KEY;
      if (lovableApiKey) {
        const res = await fetch("https://ai.gateway.lovable.dev/v1/emails/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableApiKey}`,
          },
          body: JSON.stringify({
            to: NOTIFY_EMAIL,
            subject,
            html,
          }),
        }).catch((e) => {
          console.warn("[submitLead] email send failed:", e?.message ?? e);
          return null;
        });
        if (res && !res.ok) {
          console.warn("[submitLead] email non-2xx:", res.status);
        }
      }
    } catch (e) {
      console.warn("[submitLead] notification error (non-fatal):", e);
    }

    return { ok: true, id: inserted?.id };
  });