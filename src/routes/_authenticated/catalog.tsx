import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, RefreshCw, PackagePlus, ArrowLeft } from "lucide-react";
import {
  deleteProduct,
  importStarterCatalog,
  listAllProducts,
  saveProduct,
} from "@/lib/products.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_authenticated/catalog")({
  head: () => ({
    meta: [
      { title: "إدارة المنتجات | رواد المضخات للتجارة" },
      { name: "description", content: "إضافة وتعديل وحذف موديلات المضخات والمحركات والأنظمة." },
      { property: "og:title", content: "Product Catalog Manager — Pioneers Pumps" },
      { property: "og:description", content: "Add, edit and delete pump, motor and system models." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Product Catalog Manager — Pioneers Pumps" },
      { name: "twitter:description", content: "Manage your product models." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CatalogAdminPage,
});

const CATEGORIES = [
  { value: "water-pumps", label: "مضخات المياه / Water pumps" },
  { value: "submersible-pumps", label: "المضخات الغاطسة / Submersible pumps" },
  { value: "motors", label: "المحركات الكهربائية / Electric motors" },
  { value: "ro-systems", label: "أنظمة التحلية / RO systems" },
  { value: "central-filters", label: "الفلاتر المركزية / Central filters" },
  { value: "mist-systems", label: "أنظمة الضباب / Mist systems" },
];

const APPLICATIONS = [
  { value: "residential", label: "سكني / Residential" },
  { value: "commercial", label: "تجاري / Commercial" },
  { value: "industrial", label: "صناعي / Industrial" },
  { value: "agricultural", label: "زراعي / Agricultural" },
];

interface FormState {
  id?: string;
  slug: string;
  category: string;
  brand: string;
  model: string;
  name_ar: string;
  name_en: string;
  applications: string[];
  availability: "in-stock" | "on-order";
  price_min: string;
  price_max: string;
  specsText: string;
  sort_order: string;
  is_active: boolean;
}

const emptyForm: FormState = {
  slug: "",
  category: "water-pumps",
  brand: "",
  model: "",
  name_ar: "",
  name_en: "",
  applications: ["residential"],
  availability: "in-stock",
  price_min: "0",
  price_max: "0",
  specsText: "",
  sort_order: "0",
  is_active: true,
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

function specsToText(specs: any[]): string {
  return (specs ?? [])
    .map((s) => [s.labelAr, s.labelEn, s.valueAr, s.valueEn].join(" | "))
    .join("\n");
}

function textToSpecs(text: string) {
  return text
    .split("\n")
    .map((line) => line.split("|").map((p) => p.trim()))
    .filter((parts) => parts.length >= 3 && parts[0])
    .map((parts) => ({
      labelAr: parts[0] ?? "",
      labelEn: parts[1] || (parts[0] ?? ""),
      valueAr: parts[2] ?? "",
      valueEn: parts[3] || (parts[2] ?? ""),
    }));
}

function CatalogAdminPage() {
  const qc = useQueryClient();
  const fetchAll = useServerFn(listAllProducts);
  const save = useServerFn(saveProduct);
  const remove = useServerFn(deleteProduct);
  const importStarter = useServerFn(importStarterCatalog);

  const [form, setForm] = useState<FormState | null>(null);
  const [filter, setFilter] = useState("all");

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => fetchAll({}),
  });

  const products = data?.products ?? [];
  const shown = useMemo(
    () => (filter === "all" ? products : products.filter((p: any) => p.category === filter)),
    [products, filter],
  );

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["public-products"] });
  };

  const saveMutation = useMutation({
    mutationFn: (payload: any) => save({ data: payload }),
    onSuccess: () => {
      toast.success("تم الحفظ / Saved");
      setForm(null);
      invalidate();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("تم الحذف / Deleted");
      invalidate();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const importMutation = useMutation({
    mutationFn: () => importStarter({}),
    onSuccess: (r: any) => {
      toast.success(`تم استيراد ${r?.count ?? 0} موديل / Imported ${r?.count ?? 0} models`);
      invalidate();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const startEdit = (p: any) =>
    setForm({
      id: p.id,
      slug: p.slug,
      category: p.category,
      brand: p.brand,
      model: p.model,
      name_ar: p.name_ar,
      name_en: p.name_en,
      applications: p.applications ?? [],
      availability: p.availability,
      price_min: String(p.price_min),
      price_max: String(p.price_max),
      specsText: specsToText(p.specs),
      sort_order: String(p.sort_order),
      is_active: p.is_active,
    });

  const submit = () => {
    if (!form) return;
    const slug = form.slug.trim() || slugify(`${form.brand}-${form.model}`);
    if (!form.brand.trim() || !form.model.trim() || !form.name_ar.trim() || !form.name_en.trim()) {
      toast.error("الماركة، الموديل والاسم بالعربية والإنجليزية مطلوبة / Brand, model and both names are required");
      return;
    }
    saveMutation.mutate({
      ...(form.id ? { id: form.id } : {}),
      slug,
      category: form.category,
      brand: form.brand.trim(),
      model: form.model.trim(),
      name_ar: form.name_ar.trim(),
      name_en: form.name_en.trim(),
      applications: form.applications,
      availability: form.availability,
      price_min: Number(form.price_min) || 0,
      price_max: Number(form.price_max) || 0,
      specs: textToSpecs(form.specsText),
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Toaster richColors position="top-center" />

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">إدارة المنتجات / Product Catalog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            أضف موديلاتك الحقيقية هنا وستظهر فوراً في صفحتي المنتجات والأسعار.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="me-2 h-4 w-4" />
              الطلبات / Enquiries
            </Link>
          </Button>
          <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`me-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            تحديث / Refresh
          </Button>
          <Button
            variant="outline"
            onClick={() => importMutation.mutate()}
            disabled={importMutation.isPending}
          >
            <PackagePlus className="me-2 h-4 w-4" />
            استيراد القائمة الحالية / Import starter list
          </Button>
          <Button className="bg-brand text-white hover:bg-brand-deep" onClick={() => setForm({ ...emptyForm })}>
            <Plus className="me-2 h-4 w-4" />
            موديل جديد / New model
          </Button>
        </div>
      </header>

      {isError && (
        <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm font-semibold text-destructive">
          {error instanceof Error && error.message.includes("Forbidden")
            ? "حسابك ليس لديه صلاحية إدارة. / This account is not a manager yet."
            : "تعذر تحميل المنتجات. / Could not load products."}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {[{ value: "all", label: `الكل / All (${products.length})` }, ...CATEGORIES].map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              filter === c.value ? "border-brand bg-brand text-white" : "hover:border-brand hover:text-brand"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {form && (
        <section className="mt-6 rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="font-bold">{form.id ? "تعديل موديل / Edit model" : "موديل جديد / New model"}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="font-semibold">الماركة / Brand</span>
              <Input className="mt-1" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            </label>
            <label className="text-sm">
              <span className="font-semibold">رقم الموديل / Model number</span>
              <Input className="mt-1" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
            </label>
            <label className="text-sm">
              <span className="font-semibold">الاسم بالعربية</span>
              <Input className="mt-1" value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} />
            </label>
            <label className="text-sm">
              <span className="font-semibold">Name in English</span>
              <Input className="mt-1" value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} />
            </label>
            <label className="text-sm">
              <span className="font-semibold">الفئة / Category</span>
              <select
                className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2 text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="font-semibold">التوفر / Stock status</span>
              <select
                className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2 text-sm"
                value={form.availability}
                onChange={(e) => setForm({ ...form, availability: e.target.value as FormState["availability"] })}
              >
                <option value="in-stock">متوفر / In stock</option>
                <option value="on-order">حسب الطلب / On order</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="font-semibold">أقل سعر (ريال) / Price from</span>
              <Input
                className="mt-1"
                type="number"
                min={0}
                value={form.price_min}
                onChange={(e) => setForm({ ...form, price_min: e.target.value })}
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold">أعلى سعر (ريال) / Price to</span>
              <Input
                className="mt-1"
                type="number"
                min={0}
                value={form.price_max}
                onChange={(e) => setForm({ ...form, price_max: e.target.value })}
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold">الترتيب / Sort order</span>
              <Input
                className="mt-1"
                type="number"
                min={0}
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold">المعرف في الرابط / URL slug</span>
              <Input
                className="mt-1"
                dir="ltr"
                placeholder={slugify(`${form.brand}-${form.model}`) || "grundfos-cm3-4"}
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </label>
          </div>

          <div className="mt-4">
            <span className="text-sm font-semibold">التطبيقات / Applications</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {APPLICATIONS.map((a) => {
                const on = form.applications.includes(a.value);
                return (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        applications: on
                          ? form.applications.filter((v) => v !== a.value)
                          : [...form.applications, a.value],
                      })
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      on ? "border-brand bg-brand text-white" : "hover:border-brand hover:text-brand"
                    }`}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="mt-4 block text-sm">
            <span className="font-semibold">المواصفات / Specifications</span>
            <span className="block text-xs text-muted-foreground">
              سطر لكل مواصفة: العنوان بالعربية | العنوان بالإنجليزية | القيمة بالعربية | القيمة بالإنجليزية
            </span>
            <Textarea
              className="mt-1 font-mono text-xs"
              rows={6}
              value={form.specsText}
              onChange={(e) => setForm({ ...form, specsText: e.target.value })}
              placeholder={"القدرة | Power | 1.1 كيلوواط | 1.1 kW\nالتدفق | Flow | 60 لتر/دقيقة | 60 L/min"}
            />
          </label>

          <label className="mt-4 flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            />
            ظاهر في الموقع / Visible on the website
          </label>

          <div className="mt-5 flex gap-2">
            <Button className="bg-brand text-white hover:bg-brand-deep" onClick={submit} disabled={saveMutation.isPending}>
              حفظ / Save
            </Button>
            <Button variant="ghost" onClick={() => setForm(null)}>إلغاء / Cancel</Button>
          </div>
        </section>
      )}

      {isLoading && <p className="mt-10 text-muted-foreground">جارٍ التحميل...</p>}

      {!isLoading && !isError && products.length === 0 && (
        <p className="mt-10 text-muted-foreground">
          لا توجد موديلات محفوظة بعد — الموقع يعرض القائمة المبدئية. أضف موديلاتك أو استورد القائمة الحالية للتعديل عليها.
        </p>
      )}

      <div className="mt-6 space-y-3">
        {shown.map((p: any) => (
          <article key={p.id} className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border bg-card p-4 shadow-card">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold" dir="ltr">{p.brand} {p.model}</h3>
                <Badge variant="outline" className="text-xs">{p.category}</Badge>
                <Badge variant={p.availability === "in-stock" ? "secondary" : "outline"} className="text-xs">
                  {p.availability === "in-stock" ? "متوفر / In stock" : "حسب الطلب / On order"}
                </Badge>
                {!p.is_active && <Badge variant="destructive" className="text-xs">مخفي / Hidden</Badge>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.name_ar}</p>
              <p className="text-sm text-muted-foreground" dir="ltr">{p.name_en}</p>
              <p className="mt-1 text-sm font-bold text-brand" dir="ltr">
                {p.price_min.toLocaleString("en-US")} – {p.price_max.toLocaleString("en-US")} SAR
              </p>
              <p className="text-xs text-muted-foreground">{(p.specs ?? []).length} مواصفة / specs</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => startEdit(p)}>
                <Pencil className="me-2 h-4 w-4" />
                تعديل / Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                disabled={deleteMutation.isPending}
                onClick={() => {
                  if (confirm(`حذف ${p.brand} ${p.model}؟ / Delete this model?`)) deleteMutation.mutate(p.id);
                }}
              >
                <Trash2 className="me-2 h-4 w-4" />
                حذف / Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
