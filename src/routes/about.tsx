import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-pumps.jpg";
import { useLang } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/site/Section";
import { values } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | خبرة هندسية في حلول المضخات — رواد المضخات" },
      { name: "description", content: "تعرّف على شركة رواد المضخات للتجارة: خبرة هندسية موثوقة في توريد وتركيب وصيانة مضخات المياه، أنظمة التحلية، الفلاتر المركزية وأنظمة الضباب. رؤيتنا، رسالتنا وقيمنا." },
      { property: "og:title", content: "About Us — Pioneers Pumps Trading Co." },
      { property: "og:description", content: "Engineering expertise, premium products, and long-term customer commitment across water pumping and treatment." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Pioneers Pumps" },
      { name: "twitter:description", content: "Trusted engineering expertise in pumps, RO, filtration, and mist cooling." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative bg-gradient-brand py-16 text-white md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-extrabold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 text-white/85 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}

function AboutPage() {
  const { tr, lang } = useLang();
  return (
    <>
      <PageHeader title={tr("about_title")} subtitle={tr("about_lead")} />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={heroImg} alt="Facility" loading="lazy" width={1920} height={1280} className="rounded-3xl object-cover shadow-elegant" />
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{lang === "ar" ? "قصتنا" : "Our Story"}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{tr("about_body")}</p>
            <ul className="mt-6 space-y-3">
              {[
                { ar: "سنوات من الخبرة في السوق", en: "Years of market experience" },
                { ar: "فريق فني محترف ومؤهل", en: "Professional, certified technical team" },
                { ar: "شراكات مع أفضل العلامات العالمية", en: "Partnerships with leading global brands" },
                { ar: "خدمة ما بعد البيع والعلاقات طويلة الأمد", en: "After-sales service and long-term relationships" },
              ].map((it) => (
                <li key={it.en} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-accent" />
                  <span>{lang === "ar" ? it.ar : it.en}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-7 bg-brand text-white hover:bg-brand-deep">
              <Link to="/contact">{tr("cta_contact")}</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading eyebrow={lang === "ar" ? "ما نؤمن به" : "Our beliefs"} title={tr("values_title")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.en} className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-card">
              <span className="absolute -top-3 -end-3 text-7xl font-black text-secondary/80">0{i + 1}</span>
              <h3 className="relative text-lg font-bold text-brand">{lang === "ar" ? v.ar : v.en}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{lang === "ar" ? v.descAr : v.descEn}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}