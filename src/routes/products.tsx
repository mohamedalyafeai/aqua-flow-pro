import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { products } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { PageHeader } from "./about";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "منتجاتنا | شركة رواد المضخات للتجارة" },
      { name: "description", content: "تشكيلة منتجاتنا من مضخات المياه، المضخات الغاطسة، المحركات الكهربائية، أنظمة التحلية والفلاتر المركزية." },
      { property: "og:title", content: "Products — Pioneers Pumps" },
      { property: "og:description", content: "Premium pumps, motors, RO systems, central filters and mist systems." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { tr, lang } = useLang();
  return (
    <>
      <PageHeader title={tr("products_title")} subtitle={tr("products_sub")} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.en} className="group overflow-hidden rounded-2xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img src={p.img} alt={p.en} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{lang === "ar" ? p.ar : p.en}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{lang === "ar" ? p.descAr : p.descEn}</p>
                <Button asChild size="sm" className="mt-4 bg-brand text-white hover:bg-brand-deep">
                  <Link to="/contact">{tr("quote")}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}