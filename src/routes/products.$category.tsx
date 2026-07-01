import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Clock, ChevronRight, ChevronLeft, Wrench, Award } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { getProductBySlug, products, type Application, type ProductSpec } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.category);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.product;
    const titleAr = p ? `${p.ar} | مواصفات وحلول من رواد المضخات` : "المنتج | رواد المضخات";
    const titleEn = p ? `${p.en} — Specs & Solutions | Pioneers Pumps` : "Product | Pioneers Pumps";
    const descAr = p
      ? `${p.longAr} تعرف على المواصفات الفنية، حالات الاستخدام والماركات المتوفرة. اطلب عرض سعر الآن.`
      : "منتجات رواد المضخات للتجارة.";
    const descEn = p
      ? `${p.longEn} See technical specs, use cases, and available brands. Request a quote today.`
      : "Pioneers Pumps product range.";
    return {
      meta: [
        { title: titleAr },
        { name: "description", content: descAr },
        { property: "og:title", content: titleEn },
        { property: "og:description", content: descEn },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.category}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: titleEn },
        { name: "twitter:description", content: descEn },
      ],
      links: [{ rel: "canonical", href: `/products/${params.category}` }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: p.en,
                alternateName: p.ar,
                description: p.longEn,
                brand: { "@type": "Brand", name: p.brandsEn },
                category: "Water Pumps & Systems",
                offers: {
                  "@type": "Offer",
                  availability:
                    p.availability === "in-stock"
                      ? "https://schema.org/InStock"
                      : "https://schema.org/PreOrder",
                  priceCurrency: "SAR",
                  price: "0",
                  priceValidUntil: "2026-12-31",
                  seller: { "@type": "Organization", name: "Pioneers Pumps Trading Co." },
                },
              }),
            },
          ]
        : [],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Button asChild className="mt-6"><Link to="/products">← Back to products</Link></Button>
    </div>
  ),
  errorComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <Button asChild className="mt-6"><Link to="/products">← Back to products</Link></Button>
    </div>
  ),
});

const APP_LABELS: Record<string, { ar: string; en: string }> = {
  residential: { ar: "سكني", en: "Residential" },
  commercial: { ar: "تجاري", en: "Commercial" },
  industrial: { ar: "صناعي", en: "Industrial" },
  agricultural: { ar: "زراعي", en: "Agricultural" },
};

function CategoryPage() {
  const { product } = Route.useLoaderData();
  const { tr, lang } = useLang();
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-brand py-16 text-white md:py-20">
        <div className="container mx-auto px-4">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/70">
            <Link to="/" className="hover:text-white">{tr("nav_home")}</Link>
            <Chevron className="h-4 w-4" />
            <Link to="/products" className="hover:text-white">{tr("nav_products")}</Link>
            <Chevron className="h-4 w-4" />
            <span className="text-white">{lang === "ar" ? product.ar : product.en}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {product.availability === "in-stock" ? (
                  <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">
                    <CheckCircle2 className="me-1 h-3 w-3" />
                    {tr("avail_in_stock")}
                  </Badge>
                ) : (
                  <Badge className="bg-amber-500 text-white hover:bg-amber-500">
                    <Clock className="me-1 h-3 w-3" />
                    {tr("avail_on_order")}
                  </Badge>
                )}
                {product.applications.map((a: Application) => (
                  <Badge key={a} variant="outline" className="border-white/30 text-white">
                    {lang === "ar" ? APP_LABELS[a].ar : APP_LABELS[a].en}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">
                {lang === "ar" ? product.ar : product.en}
              </h1>
              <p className="mt-4 text-white/85 md:text-lg">
                {lang === "ar" ? product.longAr : product.longEn}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-cyan-accent text-brand-deep hover:bg-white">
                  <Link to="/contact" search={{ product: product.slug }}>
                    {tr("cta_quote")}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-brand-deep"
                >
                  <a href="tel:+966500000000">{tr("cta_contact")}</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-white/10 blur-2xl" />
              <img
                src={product.img}
                alt={lang === "ar" ? product.ar : product.en}
                width={800}
                height={600}
                className="rounded-3xl object-cover shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specs & Use cases */}
      <Section className="bg-background">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-brand">
              <Wrench className="h-6 w-6" />
              {tr("specs_title")}
            </h2>
            <div className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-card">
              <dl className="divide-y">
                {product.specs.map((s: ProductSpec, i: number) => (
                  <div key={i} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
                    <dt className="text-sm font-semibold text-muted-foreground">
                      {lang === "ar" ? s.labelAr : s.labelEn}
                    </dt>
                    <dd className="text-sm font-medium text-foreground sm:col-span-2">
                      {lang === "ar" ? s.valueAr : s.valueEn}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <h2 className="mt-12 flex items-center gap-2 text-2xl font-bold text-brand">
              <CheckCircle2 className="h-6 w-6" />
              {tr("usecases_title")}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {(lang === "ar" ? product.useCasesAr : product.useCasesEn).map((u: string, i: number) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-accent" />
                  <span className="text-sm">{u}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand">
                <Award className="h-5 w-5" />
                {tr("brands_title")}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {lang === "ar" ? product.brandsAr : product.brandsEn}
              </p>
              <div className="my-6 h-px bg-border" />
              <h3 className="text-lg font-bold">
                {lang === "ar" ? "بحاجة إلى استشارة؟" : "Need a consultation?"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "ar"
                  ? "فريقنا الفني جاهز لمساعدتك على اختيار الحل المناسب."
                  : "Our technical team is ready to help you pick the right solution."}
              </p>
              <Button asChild className="mt-4 w-full bg-brand text-white hover:bg-brand-deep">
                <Link to="/contact" search={{ product: product.slug }}>{tr("cta_quote")}</Link>
              </Button>
              <Button asChild variant="outline" className="mt-2 w-full">
                <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer">{tr("whatsapp")}</a>
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      {/* Related */}
      <Section className="bg-secondary/40">
        <h2 className="mb-8 text-2xl font-bold">{tr("related_title")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              to="/products/$category"
              params={{ category: r.slug }}
              className="group overflow-hidden rounded-2xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img src={r.img} alt={lang === "ar" ? r.ar : r.en} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-bold group-hover:text-brand">{lang === "ar" ? r.ar : r.en}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{lang === "ar" ? r.descAr : r.descEn}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/products">{tr("back_to_products")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}