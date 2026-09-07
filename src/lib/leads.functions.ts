import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  product_slug: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
  preferred_date: z.string().trim().max(60).optional().or(z.literal("")),
  source: z.string().trim().max(50).default("contact_form"),
  lang: z.enum(["ar", "en"]).default("ar"),
});

export type LeadInput = z.infer<typeof leadSchema>;

const NOTIFY_EMAIL = "mohamedyafei17@gmail.com";

function publicClient() {
  const supabaseUrl = process.env["SUPABASE_URL"];
  const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!supabaseUrl || !supabaseKey) throw new Error("Backend not configured");
  return { supabaseUrl, supabaseKey };
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const { supabaseUrl, supabaseKey } = publicClient();

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    });

    // NOTE: no .select() here — anon may only INSERT (no SELECT policy), and
    // asking PostgREST to return the row would make the whole insert fail.
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service || null,
      product_slug: data.product_slug || null,
      message: data.message,
      preferred_date: data.preferred_date || null,
      source: data.source,
      lang: data.lang,
    });

    if (error) {
      console.error("[submitLead] insert error:", error.message);
      throw new Error("Could not save your request. Please try again.");
    }

    // Follow-up email is delivered once a sender domain is configured for the
    // project. Until then every enquiry is stored and visible in the dashboard.
    console.log(`[lead] new ${data.source} submission stored (notify: ${NOTIFY_EMAIL})`);

    return { ok: true };
  });

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data: leads, error } = await context.supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw new Error(error.message);

    const { data: replies } = await context.supabase
      .from("lead_replies")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);

    return { leads: leads ?? [], replies: replies ?? [] };
  });

export const updateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "contacted", "quoted", "won", "lost"]).optional(),
        admin_notes: z.string().trim().max(4000).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const patch: Record<string, unknown> = {};
    if (data.status) patch["status"] = data.status;
    if (data.admin_notes !== undefined) patch["admin_notes"] = data.admin_notes;
    const { error } = await context.supabase.from("leads").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const replyToLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        lead_id: z.string().uuid(),
        channel: z.enum(["email", "whatsapp", "phone"]),
        body: z.string().trim().min(2).max(4000),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);

    const { error } = await context.supabase.from("lead_replies").insert({
      lead_id: data.lead_id,
      author_id: context.userId,
      channel: data.channel,
      body: data.body,
    });
    if (error) throw new Error(error.message);

    await context.supabase
      .from("leads")
      .update({ status: "contacted", last_contacted_at: new Date().toISOString() })
      .eq("id", data.lead_id);

    return { ok: true };
  });
