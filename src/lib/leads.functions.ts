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

    // Email notification is delivered once the user configures the
    // email domain (see contact form UI + follow-up). Until then, all
    // leads are safely stored in the database and viewable in Cloud.
    console.log(`[lead] new submission id=${inserted?.id} for ${NOTIFY_EMAIL}`);

    return { ok: true, id: inserted?.id };
  });