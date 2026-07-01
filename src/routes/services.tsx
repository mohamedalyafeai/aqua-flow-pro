import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { services } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { PageHeader } from "./about";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "خدماتنا | توريد، تركيب، صيانة وقطع غيار — رواد المضخات" },
      { name: "description", content: "خدمات شركة رواد المضخات: توريد مضخات المياه والغاطسة، المحركات الكهربائية، أنظمة تحلية RO، الفلاتر المركزية، أنظمة الضباب، بالإضافة إلى التركيب الاحترافي والصيانة الدورية وقطع الغيار الأصلية." },
      { property: "og:title", content: "Services — Supply, Install, Maintain | Pioneers Pumps" },
      { property: "og:description", content: "Water pumps, submersibles, motors, RO systems, central filtration, mist cooling, professional installation & maintenance, genuine spare parts." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Services — Pioneers Pumps" },
      { name: "twitter:description", content: "Full-service water solutions: supply, install, and maintain." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
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