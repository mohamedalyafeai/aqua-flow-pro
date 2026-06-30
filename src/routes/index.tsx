import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Star, Quote, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-pumps.jpg";
import { useLang } from "@/lib/i18n";
import { services, whyUs, products, testimonials, values, processSteps, stats, faqs } from "@/lib/site-data";
import { Section, SectionHeading } from "@/components/site/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "شركة رواد المضخات للتجارة | Pioneers Pumps Trading Co." },
      { name: "description", content: "حلول متكاملة لمضخات المياه، أنظمة التحلية RO، الفلاتر المركزية، أنظمة الضباب والرذاذ، تركيب، صيانة وقطع غيار أصلية." },
      { property: "og:title", content: "Pioneers Pumps Trading Co. — شركة رواد المضخات" },
      { property: "og:description", content: "Reliable water solutions you can trust — pumps, RO systems, mist cooling, installation & maintenance." },
    ],
  }),
  component: Index,
});

function Index() {
  const { tr, lang } = useLang();
  return (
    <>
      <Hero />

      <Section id="about" className="bg-background">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-float-up">
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">{tr("about_title")}</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{tr("about_lead")}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{tr("about_body")}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { ar: "سنوات من الخبرة", en: "Years of experience" },
                { ar: "فريق فني محترف", en: "Professional technical team" },
                { ar: "منتجات عالية الجودة", en: "High-quality products" },
                { ar: "رضا عملاء حقيقي", en: "Genuine customer satisfaction" },
              ].map((it) => (
                <li key={it.en} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-accent" />
                  <span>{lang === "ar" ? it.ar : it.en}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild className="bg-brand text-white hover:bg-brand-deep">
                <Link to="/about">{tr("read_more")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-brand opacity-20 blur-2xl" />
            <img src={heroImg} alt="Industrial pump facility" loading="lazy" width={1920} height={1280} className="rounded-3xl object-cover shadow-elegant" />
          </div>
        </div>
      </Section>

      <ServicesGrid />
      <WhyUs />
      <Stats />
      <ProductsGrid />
      <Values />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

function Hero() {
  const { tr, lang } = useLang();
  return (
    <section className="relative isolate overflow-hidden">
      <img src={heroImg} alt="Industrial water pumps" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="container mx-auto px-4 py-28 md:py-40 lg:py-48">
        <div className="max-w-3xl text-white animate-float-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-accent" />
            {tr("hero_eyebrow")}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            {lang === "ar"
              ? "رواد المضخات... شركاؤكم في حلول المياه المتكاملة"
              : "Reliable Water Solutions You Can Trust"}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">{tr("hero_sub")}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-cyan-accent text-brand-deep hover:bg-white">
              <Link to="/contact">
                {tr("cta_quote")}
                {lang === "ar" ? <ArrowLeft className="ms-2 h-4 w-4" /> : <ArrowRight className="ms-2 h-4 w-4" />}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-brand-deep">
              <Link to="/services">{tr("nav_services")}</Link>
            </Button>
          </div>
        </div>
      </div>
      <a href="#about" aria-label="Scroll" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 hover:text-white">
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}

function ServicesGrid() {
  const { tr, lang } = useLang();
  return (
    <Section id="services" className="bg-secondary/40">
      <SectionHeading eyebrow={tr("nav_services")} title={tr("services_title")} subtitle={tr("services_sub")} />
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
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function WhyUs() {
  const { tr, lang } = useLang();
  return (
    <Section className="bg-background">
      <SectionHeading eyebrow={lang === "ar" ? "ميزاتنا" : "Advantages"} title={tr("why_title")} subtitle={tr("why_sub")} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.map((w) => {
          const Icon = w.icon;
          return (
            <div key={w.en} className="flex items-start gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-brand">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-secondary text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold">{lang === "ar" ? w.ar : w.en}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setVal(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { val, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold text-white md:text-5xl">{val.toLocaleString()}{suffix}</div>
      <div className="mt-2 text-sm text-white/80 md:text-base">{label}</div>
    </div>
  );
}

function Stats() {
  const { lang } = useLang();
  return (
    <section className="bg-gradient-brand py-16">
      <div className="container mx-auto grid grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {stats.map((s) => (
          <StatItem key={s.en} value={s.value} suffix={s.suffix} label={lang === "ar" ? s.ar : s.en} />
        ))}
      </div>
    </section>
  );
}

function ProductsGrid() {
  const { tr, lang } = useLang();
  return (
    <Section id="products" className="bg-secondary/40">
      <SectionHeading eyebrow={tr("nav_products")} title={tr("products_title")} subtitle={tr("products_sub")} />
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
  );
}

function Values() {
  const { tr, lang } = useLang();
  return (
    <Section className="bg-background">
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
  );
}

function Process() {
  const { tr, lang } = useLang();
  return (
    <Section className="bg-secondary/40">
      <SectionHeading eyebrow={lang === "ar" ? "آلية العمل" : "How we work"} title={tr("process_title")} />
      <div className="relative grid gap-6 md:grid-cols-5">
        {processSteps.map((step, i) => (
          <div key={step.en} className="relative rounded-2xl border bg-card p-6 text-center shadow-card">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-lg font-bold text-white">{i + 1}</div>
            <h4 className="mt-4 font-semibold">{lang === "ar" ? step.ar : step.en}</h4>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const { tr, lang } = useLang();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  const cur = testimonials[idx];
  return (
    <Section className="bg-background">
      <SectionHeading eyebrow={lang === "ar" ? "آراء حقيقية" : "Real reviews"} title={tr("testimonials_title")} />
      <div className="mx-auto max-w-3xl">
        <div className="relative rounded-3xl border bg-card p-8 shadow-card md:p-12">
          <Quote className="absolute -top-5 start-8 h-10 w-10 rounded-full bg-gradient-brand p-2 text-white" />
          <div className="flex justify-center gap-1 text-cyan-accent">
            {Array.from({ length: cur.stars }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
          </div>
          <p key={idx} className="mt-5 text-center text-lg leading-relaxed text-foreground/90 animate-float-up md:text-xl">
            "{lang === "ar" ? cur.ar : cur.en}"
          </p>
          <div className="mt-6 text-center font-semibold text-brand">— {cur.name}</div>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-brand" : "w-2 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function FAQ() {
  const { tr, lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section className="bg-secondary/40">
      <SectionHeading eyebrow="FAQ" title={tr("faq_title")} />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-xl border bg-card">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-start font-semibold transition-colors hover:bg-secondary"
            >
              <span>{lang === "ar" ? f.qAr : f.qEn}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="border-t px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                {lang === "ar" ? f.aAr : f.aEn}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function CTA() {
  const { tr, lang } = useLang();
  return (
    <section className="relative isolate overflow-hidden bg-gradient-brand py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          {lang === "ar" ? "جاهزون لخدمتكم في أي وقت" : "Ready to serve you anytime"}
        </h2>
        <p className="mt-3 text-white/85">{lang === "ar" ? "اطلب استشارة مجانية أو عرض سعر الآن." : "Request a free consultation or quote now."}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-white text-brand-deep hover:bg-cyan-accent">
            <Link to="/contact">{tr("cta_quote")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/50 bg-transparent text-white hover:bg-white hover:text-brand-deep">
            <a href="tel:+966500000000">{tr("cta_contact")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
