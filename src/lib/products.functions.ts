import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { ProductModel } from "@/lib/catalog";

const specSchema = z.object({
  labelAr: z.string().trim().max(80),
  labelEn: z.string().trim().max(80),
  valueAr: z.string().trim().max(200),
  valueEn: z.string().trim().max(200),
});

const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers and dashes only"),
  category: z.string().trim().min(2).max(50),
  brand: z.string().trim().min(1).max(60),
  model: z.string().trim().min(1).max(60),
  name_ar: z.string().trim().min(2).max(160),
  name_en: z.string().trim().min(2).max(160),
  applications: z.array(z.string().trim().max(30)).max(8).default([]),
  availability: z.enum(["in-stock", "on-order"]).default("in-stock"),
  price_min: z.number().int().min(0).max(10_000_000).default(0),
  price_max: z.number().int().min(0).max(10_000_000).default(0),
  specs: z.array(specSchema).max(20).default([]),
  sort_order: z.number().int().min(0).max(100000).default(0),
  is_active: z.boolean().default(true),
});

export type ProductRow = z.infer<typeof productSchema> & { id: string };

function publicEnv() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Backend not configured");
  return { url, key };
}

/** Public read of visible products (used by the products & pricing pages). */
export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { createClient } = await import("@supabase/supabase-js");
  const { url, key } = publicEnv();
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });

  const { data, error } = await supabase
    .from("products")
    .select("id, slug, category, brand, model, name_ar, name_en, applications, availability, price_min, price_max, specs, sort_order")
    .eq("is_active", true)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[listProducts]", error.message);
    return { models: [] as ProductModel[] };
  }

  const models: ProductModel[] = (data ?? []).map((r: any) => ({
    id: r.slug,
    category: r.category,
    brand: r.brand,
    model: r.model,
    ar: r.name_ar,
    en: r.name_en,
    applications: r.applications ?? [],
    availability: r.availability,
    priceMin: r.price_min,
    priceMax: r.price_max,
    specs: Array.isArray(r.specs) ? r.specs : [],
  }));

  return { models };
});

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

/** Admin read: includes hidden products. */
export const listAllProducts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as any);
    const { data, error } = await context.supabase
      .from("products")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return { products: data ?? [] };
  });

export const saveProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => productSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const row = {
      slug: data.slug,
      category: data.category,
      brand: data.brand,
      model: data.model,
      name_ar: data.name_ar,
      name_en: data.name_en,
      applications: data.applications,
      availability: data.availability,
      price_min: data.price_min,
      price_max: data.price_max,
      specs: data.specs,
      sort_order: data.sort_order,
      is_active: data.is_active,
    };

    if (data.id) {
      const { error } = await context.supabase.from("products").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }

    const { error } = await context.supabase.from("products").insert(row);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { error } = await context.supabase.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** One-click import of the starter catalog that ships with the site. */
export const importStarterCatalog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as any);
    const { productModels } = await import("@/lib/catalog");

    const rows = productModels.map((m, i) => ({
      slug: m.id,
      category: m.category,
      brand: m.brand,
      model: m.model,
      name_ar: m.ar,
      name_en: m.en,
      applications: m.applications,
      availability: m.availability,
      price_min: m.priceMin,
      price_max: m.priceMax,
      specs: m.specs,
      sort_order: i * 10,
      is_active: true,
    }));

    const { error } = await context.supabase.from("products").upsert(rows, { onConflict: "slug" });
    if (error) throw new Error(error.message);
    return { ok: true, count: rows.length };
  });
