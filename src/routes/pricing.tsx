import { createFileRoute, Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { PageHeader } from "./about";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/site-data";
import { modelsByCategory, priceRangeForCategory, installationServicePricing } from "@/lib/catalog";
import { LeadForm } from "@/components/site/LeadForm";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "الأسعار وعروض الأسعار | نطاقات تكلفة المضخات والأنظمة — رواد المضخات" },
      {
        name: "description",
        content:
          "نطاقات أسعار واضحة لمضخات المياه، المضخات الغاطسة، المحركات، أنظمة التحلية، الفلاتر المركزية وأنظمة الضباب، مع أسعار التركيب والصيانة وطلب عرض سعر مباشر.",
      },
      { property: "og:title", content: "Pricing & Quotes | Pioneers Pumps Trading Co." },
      {
        property: "og:description",
        content:
          "Transparent price ranges for pumps, motors, RO systems, central filters and mist cooling — plus installation and maintenance rates.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing — Pioneers Pumps" },
      { name: "twitter:description", content: "Cost ranges per product plus installation rates and instant quote requests." },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const sar = (n: number) => n.toLocaleString("en-US");

function PricingPage() {
  const { lang, tr } = useLang();
  const ar = lang === "ar";

  return (
    <>
      <Toaster richColors position="top-center" />
      <PageHeader
        title={ar ? "الأسعار وعروض الأسعار" : "Pricing & Quotes"}
        subtitle={
          ar
            ? "نطاقات تكلفة تقديرية لكل فئة منتج، بالريال السعودي وبدون ضريبة القيمة المضافة."
            : "Indicative cost ranges for every product family, in SAR and excluding VAT."
        }
      />

      <Section>
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-brand/20 bg-brand/5 p-4 text-sm text-brand">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {ar
              ? "الأسعار المعروضة تقديرية للتوريد فقط وتختلف حسب الموديل، الكمية، وظروف الموقع. أرسل طلب عرض سعر وسنرد بسعر نهائي مفصّل."
              : "Listed prices are supply-only estimates and vary by model, quantity and site conditions. Send a quote request and we'll reply with a firm, itemised price."}
          </p>
        </div>

        <div className="space-y-10">
          {products.map((p) => {
            const range = priceRangeForCategory(p.slug);
            const models = modelsByCategory(p.slug);
            return (
              <div key={p.slug} className="overflow-hidden rounded-2xl border bg-card shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-secondary/40 p-5 md:p-6">
                  <div>
                    <h2 className="text-xl font-bold">{ar ? p.ar : p.en}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{ar ? p.descAr : p.descEn}</p>
                  </div>
                  {range && (
                    <div className="text-end">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {ar ? "نطاق السعر" : "Price range"}
                      </div>
                      <div className="text-lg font-bold text-brand" dir="ltr">
                        {sar(range.min)} – {sar(range.max)} SAR
                      </div>
                    </div>
                  )}
                </div>

                <div className="divide-y">
                  {models.map((m) => (
                    <div key={m.id} className="flex flex-wrap items-center justify-between gap-3 p-5 md:px-6">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-brand">{m.brand}</span>
                          <Badge variant="outline" className="text-xs" dir="ltr">
                            {m.model}
                          </Badge>
                          <Badge
                            className={
                              m.availability === "in-stock"
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                                : ""
                            }
                            variant={m.availability === "in-stock" ? "default" : "secondary"}
                          >
                            {m.availability === "in-stock" ? tr("avail_in_stock") : tr("avail_on_order")}
                          </Badge>
                        </div>
                        <div className="mt-1 font-semibold">{ar ? m.ar : m.en}</div>
                        <div className="mt-1 text-xs text-muted-foreground" dir="ltr">
                          {m.specs
                            .slice(0, 3)
                            .map((s) => `${ar ? s.labelAr : s.labelEn}: ${ar ? s.valueAr : s.valueEn}`)
                            .join(" • ")}
                        </div>
                      </div>
                      <div className="font-bold text-brand" dir="ltr">
                        {sar(m.priceMin)} – {sar(m.priceMax)} SAR
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t bg-secondary/20 p-4 text-sm md:px-6">
                  <Link to="/products/$category" params={{ category: p.slug }} className="font-semibold text-brand hover:underline">
                    {ar ? "عرض المواصفات الكاملة" : "See full specifications"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <h2 className="text-2xl font-bold">{ar ? "أسعار التركيب والصيانة" : "Installation & Maintenance Rates"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {ar
            ? "تشمل العمالة والمواد الاستهلاكية الأساسية، ولا تشمل أعمال البناء أو تمديدات خارج النطاق."
            : "Includes labour and basic consumables; excludes civil works and out-of-scope pipe runs."}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {installationServicePricing.map((s) => (
            <div key={s.en} className="rounded-xl border bg-card p-5 shadow-card">
              <div className="font-semibold">{ar ? s.ar : s.en}</div>
              <div className="mt-2 font-bold text-brand" dir="ltr">
                {sar(s.min)} – {sar(s.max)} SAR
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-bold">{ar ? "اطلب عرض سعر" : "Request a Quote"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {ar
              ? "أخبرنا بالمنتج والكمية وظروف الموقع، وسنرد بعرض سعر مفصّل خلال 24 ساعة."
              : "Tell us the product, quantity and site conditions — we'll reply with an itemised quote within 24 hours."}
          </p>
          <div className="mt-6">
            <LeadForm
              source="pricing_quote"
              serviceOptions={products.map((p) => ({ value: p.slug, label: ar ? p.ar : p.en }))}
              submitLabel={ar ? "أرسل طلب عرض السعر" : "Send quote request"}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
