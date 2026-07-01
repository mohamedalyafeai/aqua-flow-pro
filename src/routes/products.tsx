import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, CheckCircle2, Clock } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { products, type Application, type Availability, type PumpType } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "./about";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "المنتجات | مضخات، محركات، أنظمة تحلية وفلاتر — رواد المضخات" },
      { name: "description", content: "استعرض تشكيلة رواد المضخات: مضخات مياه، مضخات غاطسة، محركات كهربائية، أنظمة تحلية RO، فلاتر مركزية وأنظمة ضباب. فلترة حسب النوع والتطبيق والتوفر." },
      { property: "og:title", content: "Products — Pumps, Motors, RO Systems | Pioneers Pumps" },
      { property: "og:description", content: "Browse our full range: water pumps, submersibles, electric motors, RO systems, central filters and mist cooling. Filter by type, application, and availability." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/products" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Products — Pioneers Pumps" },
      { name: "twitter:description", content: "Water pumps, motors, RO systems, filtration and mist cooling — with technical specs." },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const TYPE_OPTIONS: { value: PumpType | "all"; ar: string; en: string }[] = [
  { value: "all", ar: "الكل", en: "All" },
  { value: "water-pumps", ar: "مضخات المياه", en: "Water Pumps" },
  { value: "submersible-pumps", ar: "المضخات الغاطسة", en: "Submersible Pumps" },
  { value: "motors", ar: "المحركات الكهربائية", en: "Electric Motors" },
  { value: "ro-systems", ar: "أنظمة التحلية", en: "RO Systems" },
  { value: "central-filters", ar: "الفلاتر المركزية", en: "Central Filters" },
  { value: "mist-systems", ar: "أنظمة الضباب", en: "Mist Systems" },
];

const APP_OPTIONS: { value: Application; keyAr: string; keyEn: string }[] = [
  { value: "residential", keyAr: "سكني", keyEn: "Residential" },
  { value: "commercial", keyAr: "تجاري", keyEn: "Commercial" },
  { value: "industrial", keyAr: "صناعي", keyEn: "Industrial" },
  { value: "agricultural", keyAr: "زراعي", keyEn: "Agricultural" },
];

const AVAIL_OPTIONS: { value: Availability | "all"; ar: string; en: string }[] = [
  { value: "all", ar: "الكل", en: "All" },
  { value: "in-stock", ar: "متوفر", en: "In stock" },
  { value: "on-order", ar: "حسب الطلب", en: "On order" },
];

function ProductsPage() {
  const { tr, lang } = useLang();
  const [q, setQ] = useState("");
  const [type, setType] = useState<PumpType | "all">("all");
  const [app, setApp] = useState<Application | "all">("all");
  const [avail, setAvail] = useState<Availability | "all">("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter((p) => {
      if (type !== "all" && p.slug !== type) return false;
      if (avail !== "all" && p.availability !== avail) return false;
      if (app !== "all" && !p.applications.includes(app)) return false;
      if (needle) {
        const hay = [p.ar, p.en, p.descAr, p.descEn, p.brandsAr, p.brandsEn].join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [q, type, app, avail]);

  const clearAll = () => {
    setQ("");
    setType("all");
    setApp("all");
    setAvail("all");
  };

  const hasFilters = q !== "" || type !== "all" || app !== "all" || avail !== "all";

  return (
    <>
      <PageHeader title={tr("products_title")} subtitle={tr("products_sub")} />
      <Section>
        <div className="mb-8 rounded-2xl border bg-card p-5 shadow-card md:p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand">
            <SlidersHorizontal className="h-4 w-4" />
            <span>{lang === "ar" ? "بحث وتصفية" : "Search & filter"}</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative lg:col-span-2">
              <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={tr("filter_search")}
                className="ltr:pl-9 rtl:pr-9"
                aria-label={tr("filter_search")}
              />
            </div>
            <FilterSelect
              label={tr("filter_type")}
              value={type}
              onChange={(v) => setType(v as PumpType | "all")}
              options={TYPE_OPTIONS.map((o) => ({ value: o.value, label: lang === "ar" ? o.ar : o.en }))}
            />
            <FilterSelect
              label={tr("filter_availability")}
              value={avail}
              onChange={(v) => setAvail(v as Availability | "all")}
              options={AVAIL_OPTIONS.map((o) => ({ value: o.value, label: lang === "ar" ? o.ar : o.en }))}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {tr("filter_application")}:
            </span>
            <FilterChip active={app === "all"} onClick={() => setApp("all")}>{tr("filter_all")}</FilterChip>
            {APP_OPTIONS.map((o) => (
              <FilterChip key={o.value} active={app === o.value} onClick={() => setApp(o.value)}>
                {lang === "ar" ? o.keyAr : o.keyEn}
              </FilterChip>
            ))}
            {hasFilters && (
              <button
                onClick={clearAll}
                className="ms-auto inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-deep"
              >
                <X className="h-3 w-3" />
                {tr("filter_clear")}
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 text-sm text-muted-foreground">
          {filtered.length} {tr("filter_results")}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed bg-card p-12 text-center">
            <p className="text-muted-foreground">{tr("filter_no_results")}</p>
            <Button onClick={clearAll} variant="outline" className="mt-4">
              {tr("filter_clear")}
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <Link to="/products/$category" params={{ category: p.slug }} className="block aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={p.img}
                    alt={lang === "ar" ? p.ar : p.en}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {p.availability === "in-stock" ? (
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                        <CheckCircle2 className="me-1 h-3 w-3" />
                        {tr("avail_in_stock")}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Clock className="me-1 h-3 w-3" />
                        {tr("avail_on_order")}
                      </Badge>
                    )}
                    {p.applications.slice(0, 2).map((a) => (
                      <Badge key={a} variant="outline" className="text-xs">
                        {lang === "ar"
                          ? APP_OPTIONS.find((o) => o.value === a)?.keyAr
                          : APP_OPTIONS.find((o) => o.value === a)?.keyEn}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mt-3 text-lg font-bold">
                    <Link to="/products/$category" params={{ category: p.slug }} className="hover:text-brand">
                      {lang === "ar" ? p.ar : p.en}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{lang === "ar" ? p.descAr : p.descEn}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/products/$category" params={{ category: p.slug }}>
                        {tr("view_details")}
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="bg-brand text-white hover:bg-brand-deep">
                      <Link to="/contact" search={{ product: p.slug }}>
                        {tr("quote")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active ? "border-brand bg-brand text-white" : "border-border bg-background text-foreground hover:border-brand hover:text-brand"
      }`}
    >
      {children}
    </button>
  );
}