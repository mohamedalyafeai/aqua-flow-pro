import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { services } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { PageHeader } from "./about";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "خدماتنا | شركة رواد المضخات للتجارة" },
      { name: "description", content: "توريد وتركيب وصيانة مضخات المياه، أنظمة التحلية RO، الفلاتر المركزية، وأنظمة الضباب والرذاذ." },
      { property: "og:title", content: "Services — Pioneers Pumps" },
      { property: "og:description", content: "Pumps, RO systems, central filters, mist cooling, installation & maintenance." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { tr, lang } = useLang();
  return (
    <>
      <PageHeader title={tr("services_title")} subtitle={tr("services_sub")} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.en} className="group rounded-2xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{lang === "ar" ? s.ar : s.en}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lang === "ar" ? s.descAr : s.descEn}</p>
                <Button asChild variant="link" size="sm" className="mt-3 px-0 text-brand">
                  <Link to="/contact">{tr("quote")} →</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}