import { useState } from "react";
import { z } from "zod";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/lib/leads.functions";
import { business, waLink } from "@/lib/business";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  preferred_date: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(1000),
});

export interface LeadFormProps {
  source: string;
  productSlug?: string;
  defaultService?: string;
  defaultMessage?: string;
  serviceOptions?: { value: string; label: string }[];
  showPreferredDate?: boolean;
  submitLabel?: string;
  whatsappFallback?: boolean;
}

export function LeadForm({
  source,
  productSlug,
  defaultService = "",
  defaultMessage = "",
  serviceOptions,
  showPreferredDate = false,
  submitLabel,
  whatsappFallback = true,
}: LeadFormProps) {
  const { tr, lang } = useLang();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(target).entries()));
    if (!parsed.success) {
      toast.error(lang === "ar" ? "يرجى تعبئة الحقول بشكل صحيح" : "Please fill the fields correctly");
      return;
    }
    setSubmitting(true);
    try {
      await submitLead({
        data: {
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email || "",
          service: parsed.data.service || "",
          product_slug: productSlug || "",
          message: parsed.data.message,
          preferred_date: parsed.data.preferred_date || "",
          source,
          lang,
        },
      });
      toast.success(tr("form_success"));
      if (whatsappFallback) {
        const text = `${lang === "ar" ? "طلب جديد" : "New request"}\n${parsed.data.name} - ${parsed.data.phone}\n${parsed.data.service ?? ""}\n${parsed.data.message}`;
        window.open(waLink(text), "_blank", "noopener,noreferrer");
      }
      target.reset();
    } catch (err) {
      console.error(err);
      toast.error(
        lang === "ar"
          ? `تعذر الإرسال، يرجى المحاولة أو الاتصال على ${business.phoneDisplay}`
          : `Could not submit. Please try again or call ${business.phoneDisplay}`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor={`${source}-name`}>{tr("form_name")} *</Label>
        <Input id={`${source}-name`} name="name" required maxLength={100} className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor={`${source}-phone`}>{tr("form_phone")} *</Label>
        <Input id={`${source}-phone`} name="phone" required type="tel" maxLength={30} className="mt-1.5" dir="ltr" />
      </div>
      <div>
        <Label htmlFor={`${source}-email`}>{tr("form_email")}</Label>
        <Input id={`${source}-email`} name="email" type="email" maxLength={255} className="mt-1.5" dir="ltr" />
      </div>
      <div>
        <Label htmlFor={`${source}-service`}>{tr("form_service")}</Label>
        {serviceOptions ? (
          <select
            id={`${source}-service`}
            name="service"
            defaultValue={defaultService}
            className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">{lang === "ar" ? "اختر..." : "Select..."}</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.label}>
                {o.label}
              </option>
            ))}
          </select>
        ) : (
          <Input id={`${source}-service`} name="service" maxLength={100} className="mt-1.5" defaultValue={defaultService} />
        )}
      </div>
      {showPreferredDate && (
        <div className="sm:col-span-2">
          <Label htmlFor={`${source}-date`}>
            {lang === "ar" ? "التاريخ والوقت المفضل للزيارة" : "Preferred visit date & time"}
          </Label>
          <Input
            id={`${source}-date`}
            name="preferred_date"
            type="datetime-local"
            className="mt-1.5"
            dir="ltr"
          />
        </div>
      )}
      <div className="sm:col-span-2">
        <Label htmlFor={`${source}-message`}>{tr("form_message")} *</Label>
        <Textarea
          id={`${source}-message`}
          name="message"
          required
          maxLength={1000}
          rows={5}
          className="mt-1.5"
          defaultValue={defaultMessage}
        />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={submitting} className="w-full bg-brand text-white hover:bg-brand-deep sm:w-auto">
          <Send className="me-2 h-4 w-4" />
          {submitting ? (lang === "ar" ? "جارٍ الإرسال..." : "Sending...") : (submitLabel ?? tr("form_send"))}
        </Button>
      </div>
    </form>
  );
}
