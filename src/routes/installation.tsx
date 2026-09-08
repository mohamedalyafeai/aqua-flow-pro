import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, CalendarClock, ShieldCheck, ClipboardCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { PageHeader } from "./about";
import { Badge } from "@/components/ui/badge";
import { LeadForm } from "@/components/site/LeadForm";
import { Toaster } from "@/components/ui/sonner";
import { teamQualifications, caseStudies, installationServicePricing } from "@/lib/catalog";
import { business } from "@/lib/business";
import { processSteps } from "@/lib/site-data";

export const Route = createFileRoute("/installation")({
  head: () => ({
    meta: [
      { title: "التركيب والصيانة | فريق فني معتمد وحجز زيارة — رواد المضخات" },
      {
        name: "description",
        content:
          "فريق فني معتمد لتركيب المضخات، الآبار العميقة، أنظمة التحلية، الفلاتر المركزية وأنظمة الضباب. اطلب زيارة فني، وتعرّف على مؤهلات الفريق ودراسات حالة لمشاريع منفذة.",
      },
      { property: "og:title", content: "Installation & Service | Pioneers Pumps Trading Co." },
      {
        property: "og:description",
        content:
          "Certified technicians for pumps, boreholes, RO plants, central filters and mist systems. Book a technician visit and read real project case studies.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/installation" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Installation & Service — Pioneers Pumps" },
      { name: "twitter:description", content: "Certified installation team, technician booking, and completed project case studies." },
    ],
    links: [{ rel: "canonical", href: "/installation" }],
  }),
  component: InstallationPage,
});

function InstallationPage() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <>
      <Toaster richColors position="top-center" />
      <PageHeader
        title={ar ? "التركيب والصيانة" : "Installation & Service"}
        subtitle={
          ar
            ? "فنيون معتمدون، تنفيذ موثّق، وضمان على العمل — من الاستشارة حتى التسليم."
            : "Certified technicians, documented commissioning, and a workmanship warranty — from survey to handover."
        }
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: BadgeCheck, ar: "فنيون معتمدون", en: "Certified technicians", vAr: "أكثر من 12 فنيًا", vEn: "12+ technicians" },
            { Icon: ClipboardCheck, ar: "عمليات تركيب منفذة", en: "Installations completed", vAr: "1000+", vEn: "1,000+" },
            { Icon: ShieldCheck, ar: "ضمان على التركيب", en: "Workmanship warranty", vAr: "6 أشهر", vEn: "6 months" },
            { Icon: CalendarClock, ar: "زمن الاستجابة", en: "Response time", vAr: "خلال 24 – 48 ساعة", vEn: "Within 24 – 48 h" },
          ].map((s) => (
            <div key={s.en} className="rounded-2xl border bg-card p-6 text-center shadow-card">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white">
                <s.Icon className="h-6 w-6" />
              </span>
              <div className="mt-4 text-xl font-bold text-brand">{ar ? s.vAr : s.vEn}</div>
              <div className="mt-1 text-sm text-muted-foreground">{ar ? s.ar : s.en}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <h2 className="text-2xl font-bold md:text-3xl">{ar ? "مؤهلات فريقنا" : "Our Team's Qualifications"}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {ar
            ? "كل تركيب ينفذه فنيون مدرّبون على المنتج نفسه، بإشراف فني وتوثيق كامل للتسليم."
            : "Every installation is carried out by technicians trained on the actual product, under supervision and with full handover documentation."}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamQualifications.map((q) => (
            <div key={q.en} className="rounded-2xl border bg-card p-6 shadow-card">
              <h3 className="font-bold text-brand">{ar ? q.ar : q.en}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ar ? q.descAr : q.descEn}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold md:text-3xl">{ar ? "خطوات التنفيذ" : "How the Job Runs"}</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.en} className="rounded-2xl border bg-card p-5 shadow-card">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="mt-3 font-semibold">{ar ? s.ar : s.en}</div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-secondary/30">
        <h2 className="text-2xl font-bold md:text-3xl">{ar ? "دراسات حالة" : "Case Studies"}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {ar ? "أمثلة على مشاريع نفذها فريقنا ونتائجها الفعلية." : "Examples of projects our team delivered and the results measured."}
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((c) => (
            <article key={c.titleEn} className="rounded-2xl border bg-card p-6 shadow-card">
              <Badge variant="outline" className="text-xs">{ar ? c.sectorAr : c.sectorEn}</Badge>
              <h3 className="mt-3 text-lg font-bold">{ar ? c.titleAr : c.titleEn}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-brand">{ar ? "التحدي" : "Challenge"}</dt>
                  <dd className="text-muted-foreground">{ar ? c.challengeAr : c.challengeEn}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand">{ar ? "الحل" : "Solution"}</dt>
                  <dd className="text-muted-foreground">{ar ? c.solutionAr : c.solutionEn}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand">{ar ? "النتيجة" : "Result"}</dt>
                  <dd className="text-muted-foreground">{ar ? c.resultAr : c.resultEn}</dd>
                </div>
              </dl>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t pt-4 text-center">
                {c.metrics.map((m) => (
                  <div key={m.en}>
                    <div className="text-sm font-bold text-brand" dir="ltr">{m.value}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{ar ? m.ar : m.en}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">{ar ? "احجز زيارة فني" : "Book a Technician"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {ar
                ? "اختر الخدمة والتاريخ المناسب وسنؤكد الموعد هاتفيًا."
                : "Pick the service and a suitable time — we'll confirm the appointment by phone."}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {installationServicePricing.map((s) => (
                <li key={s.en} className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
                  <span>{ar ? s.ar : s.en}</span>
                  <span className="shrink-0 font-semibold text-brand" dir="ltr">
                    {s.min.toLocaleString("en-US")} – {s.max.toLocaleString("en-US")} SAR
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              {ar ? "للحالات الطارئة اتصل مباشرة على " : "For urgent jobs call us directly on "}
              <a href={business.phoneHref} className="font-semibold text-brand" dir="ltr">
                {business.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="lg:col-span-3 rounded-3xl border bg-card p-6 shadow-card md:p-8">
            <h3 className="text-xl font-bold">{ar ? "نموذج حجز الفني" : "Technician Booking Form"}</h3>
            <div className="mt-6">
              <LeadForm
                source="technician_booking"
                showPreferredDate
                serviceOptions={installationServicePricing.map((s) => ({ value: s.en, label: ar ? s.ar : s.en }))}
                submitLabel={ar ? "أرسل طلب الحجز" : "Send booking request"}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
