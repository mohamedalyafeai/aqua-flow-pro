import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z as zs } from "zod";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { z } from "zod";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { PageHeader } from "./about";
import { submitLead } from "@/lib/leads.functions";
import { products } from "@/lib/site-data";

const contactSearchSchema = zs.object({
  product: zs.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: (s) => contactSearchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "تواصل معنا واطلب عرض سعر | رواد المضخات للتجارة" },
      { name: "description", content: "تواصل مع رواد المضخات للحصول على عرض سعر أو استشارة مجانية لخدمات المضخات، أنظمة التحلية، الفلاتر، وأنظمة الضباب. نرد خلال ساعات العمل." },
      { property: "og:title", content: "Contact & Request a Quote | Pioneers Pumps" },
      { property: "og:description", content: "Get a free consultation or quote for pumps, RO systems, filtration, and mist cooling. We respond during business hours." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — Pioneers Pumps" },
      { name: "twitter:description", content: "Free consultation & quotes for pumps and water systems." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(1000),
});

function ContactPage() {
  const { tr, lang } = useLang();
  const { product: productSlug } = Route.useSearch();
  const prefill = productSlug ? products.find((p) => p.slug === productSlug) : undefined;
  const prefillService = prefill ? (lang === "ar" ? prefill.ar : prefill.en) : "";
  const prefillMessage = prefill
    ? lang === "ar"
      ? `أرغب في طلب عرض سعر لمنتج: ${prefill.ar}. يرجى التواصل معي بالتفاصيل.`
      : `I'd like a quote for: ${prefill.en}. Please contact me with details.`
    : "";
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      toast.error(lang === "ar" ? "يرجى تعبئة الحقول بشكل صحيح" : "Please fill the fields correctly");
      return;
    }
    setSubmitting(true);
    const text = `${lang === "ar" ? "طلب جديد" : "New request"}%0A${result.data.name} - ${result.data.phone}%0A${result.data.service ?? ""}%0A${result.data.message}`;
    const target = e.currentTarget;
    try {
      await submitLead({
        data: {
          name: result.data.name,
          phone: result.data.phone,
          email: result.data.email || "",
          service: result.data.service || "",
          product_slug: productSlug || "",
          message: result.data.message,
          source: productSlug ? "product_quote" : "contact_form",
          lang,
        },
      });
      toast.success(
        lang === "ar"
          ? "تم إرسال طلبك بنجاح، سنتواصل معك قريباً."
          : "Your request was sent. We'll be in touch soon."
      );
      // Also open WhatsApp as a secondary fast channel
      window.open(`https://wa.me/966500000000?text=${text}`, "_blank");
      target.reset();
    } catch (err) {
      console.error(err);
      toast.error(
        lang === "ar"
          ? "تعذر الإرسال، يرجى المحاولة مرة أخرى أو التواصل عبر واتساب."
          : "Could not submit. Please try again or contact us on WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const contactItems = [
    { Icon: Phone, label: tr("phone_label"), value: "+966 50 000 0000", href: "tel:+966500000000" },
    { Icon: MessageCircle, label: tr("whatsapp"), value: "+966 50 000 0000", href: "https://wa.me/966500000000" },
    { Icon: Mail, label: tr("email_label"), value: "info@ruwad-pumps.com", href: "mailto:info@ruwad-pumps.com" },
    { Icon: MapPin, label: lang === "ar" ? "العنوان" : "Address", value: lang === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia" },
    { Icon: Clock, label: lang === "ar" ? "ساعات العمل" : "Hours", value: tr("hours") },
  ];

  return (
    <>
      <Toaster richColors position="top-center" />
      <PageHeader title={tr("contact_title")} subtitle={tr("contact_sub")} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">{lang === "ar" ? "معلومات التواصل" : "Contact Info"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{lang === "ar" ? "نسعد بالرد على استفساراتكم خلال ساعات العمل." : "We're glad to answer your questions during business hours."}</p>
            <ul className="mt-6 space-y-4">
              {contactItems.map((c) => (
                <li key={c.label} className="flex items-start gap-4 rounded-xl border bg-card p-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-brand text-white">
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="font-semibold text-foreground hover:text-brand" dir="ltr">{c.value}</a>
                    ) : (
                      <div className="font-semibold">{c.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 overflow-hidden rounded-2xl border shadow-card">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Riyadh&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                className="block"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 rounded-3xl border bg-card p-6 shadow-card md:p-8">
            <h2 className="text-2xl font-bold">{lang === "ar" ? "أرسل لنا رسالة" : "Send us a message"}</h2>
            {prefill && (
              <div className="mt-3 rounded-lg border border-brand/20 bg-brand/5 p-3 text-sm text-brand">
                {lang === "ar"
                  ? `طلب عرض سعر لـ: ${prefill.ar}`
                  : `Requesting a quote for: ${prefill.en}`}
              </div>
            )}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">{tr("form_name")} *</Label>
                <Input id="name" name="name" required maxLength={100} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">{tr("form_phone")} *</Label>
                <Input id="phone" name="phone" required type="tel" maxLength={30} className="mt-1.5" dir="ltr" />
              </div>
              <div>
                <Label htmlFor="email">{tr("form_email")}</Label>
                <Input id="email" name="email" type="email" maxLength={255} className="mt-1.5" dir="ltr" />
              </div>
              <div>
                <Label htmlFor="service">{tr("form_service")}</Label>
                <Input id="service" name="service" maxLength={100} className="mt-1.5" defaultValue={prefillService} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message">{tr("form_message")} *</Label>
                <Textarea id="message" name="message" required maxLength={1000} rows={5} className="mt-1.5" defaultValue={prefillMessage} />
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="mt-6 w-full bg-brand text-white hover:bg-brand-deep sm:w-auto">
              <Send className="me-2 h-4 w-4" />
              {submitting ? (lang === "ar" ? "جارٍ الإرسال..." : "Sending...") : tr("form_send")}
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
}