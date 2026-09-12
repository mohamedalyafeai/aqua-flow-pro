import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote, MapPin, CalendarDays } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { PageHeader } from "./about";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import { business } from "@/lib/business";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "مشاريعنا | صور وشهادات عملاء لمشاريع منفذة — رواد المضخات" },
      {
        name: "description",
        content:
          "مشاريع منفذة في مجمعات سكنية، مزارع، مقاهي ومصانع: صور التنفيذ، نطاق العمل، النتائج المقاسة وشهادات العملاء من رواد المضخات للتجارة.",
      },
      { property: "og:title", content: "Our Projects | Pioneers Pumps Trading Co." },
      {
        property: "og:description",
        content:
          "Completed pump, borehole, RO and mist system projects with installation photos, measured results and customer testimonials.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Projects — Pioneers Pumps" },
      { name: "twitter:description", content: "Installation photos, measured results and customer testimonials." },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <>
      <PageHeader
        title={ar ? "مشاريعنا" : "Our Projects"}
        subtitle={
          ar
            ? "مشاريع منفذة بصور من موقع العمل، أرقام حقيقية، وشهادات من أصحابها."
            : "Delivered projects with on-site photos, measured numbers, and words from the owners themselves."
        }
      />

      <Section>
        <div className="space-y-12">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              id={p.slug}
              className="grid gap-8 overflow-hidden rounded-3xl border bg-card shadow-card lg:grid-cols-2"
            >
              <img
                src={p.image}
                alt={
                  ar
                    ? `${p.titleAr} — ${p.locationAr}`
                    : `${p.titleEn} — ${p.locationEn}`
                }
                loading={i === 0 ? "eager" : "lazy"}
                className={`h-64 w-full object-cover lg:h-full ${i % 2 === 1 ? "lg:order-2" : ""}`}
              />

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-xs">{ar ? p.sectorAr : p.sectorEn}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {ar ? p.locationAr : p.locationEn}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {p.year}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold md:text-2xl">{ar ? p.titleAr : p.titleEn}</h2>

                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-brand">{ar ? "نطاق العمل" : "Scope"}</dt>
                    <dd className="text-muted-foreground">{ar ? p.scopeAr : p.scopeEn}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand">{ar ? "النتيجة" : "Result"}</dt>
                    <dd className="text-muted-foreground">{ar ? p.resultAr : p.resultEn}</dd>
                  </div>
                </dl>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t pt-4 text-center">
                  {p.metrics.map((m) => (
                    <div key={m.en}>
                      <div className="text-sm font-bold text-brand" dir="ltr">{m.value}</div>
                      <div className="mt-1 text-[11px] text-muted-foreground">{ar ? m.ar : m.en}</div>
                    </div>
                  ))}
                </div>

                <blockquote className="mt-6 rounded-2xl bg-secondary/40 p-5">
                  <Quote className="h-5 w-5 text-brand" />
                  <p className="mt-2 text-sm leading-relaxed">
                    {ar ? p.testimonial.quoteAr : p.testimonial.quoteEn}
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {ar ? p.testimonial.authorAr : p.testimonial.authorEn}
                    </span>
                    {" — "}
                    {ar ? p.testimonial.roleAr : p.testimonial.roleEn}
                  </footer>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="rounded-3xl border bg-card p-8 text-center shadow-card">
          <h2 className="text-2xl font-bold">{ar ? "مشروعك القادم؟" : "Your project next?"}</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            {ar
              ? "أرسل تفاصيل موقعك وسنقوم بزيارة معاينة وتقديم عرض سعر واضح."
              : "Send your site details and we'll survey it and come back with a clear quotation."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-brand text-white hover:bg-brand-deep">
              <Link to="/contact">{ar ? "اطلب عرض سعر" : "Request a quote"}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/installation">{ar ? "خدمات التركيب" : "Installation services"}</Link>
            </Button>
            <Button asChild variant="ghost">
              <a href={business.phoneHref} dir="ltr">{business.phoneDisplay}</a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
