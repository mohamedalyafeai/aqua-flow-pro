import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

export const t: Dict = {
  brand: { ar: "رواد المضخات", en: "Pioneers Pumps" },
  brandFull: { ar: "شركة رواد المضخات للتجارة", en: "Pioneers Pumps Trading Co." },
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_about: { ar: "من نحن", en: "About" },
  nav_services: { ar: "خدماتنا", en: "Services" },
  nav_products: { ar: "المنتجات", en: "Products" },
  nav_contact: { ar: "تواصل معنا", en: "Contact" },
  cta_quote: { ar: "اطلب عرض سعر", en: "Request a Quote" },
  cta_contact: { ar: "تواصل معنا", en: "Contact Us" },
  hero_eyebrow: { ar: "حلول مياه متكاملة منذ سنوات", en: "Integrated Water Solutions" },
  hero_title_ar: { ar: "رواد المضخات... شركاؤكم في حلول المياه المتكاملة", en: "Reliable Water Solutions You Can Trust" },
  hero_sub: {
    ar: "نوفر مضخات ومحركات وأنظمة تنقية وتبريد بالضباب عالية الجودة، مع تركيب احترافي وصيانة دورية وقطع غيار أصلية للقطاعات السكنية والتجارية والصناعية.",
    en: "Premium pumps, filtration systems, mist cooling solutions, installation, maintenance, and spare parts for residential, commercial and industrial customers.",
  },
  about_title: { ar: "من نحن", en: "About Us" },
  about_lead: { ar: "خبرة هندسية، جودة، والتزام تجاه عملائنا.", en: "Engineering expertise, premium quality, and long-term commitment." },
  about_body: {
    ar: "شركة رواد المضخات للتجارة هي إحدى الشركات الرائدة في مجال استيراد وتوريد مضخات المياه، محركات الكهرباء، أنظمة التحلية، الفلاتر المركزية، وأنظمة الضباب والرذاذ، مع تقديم خدمات التركيب والصيانة وقطع الغيار بأعلى معايير الجودة.",
    en: "Pioneers Pumps Trading Co. is a leading supplier of water pumps, electric motors, RO systems, central filters, and mist cooling solutions — backed by professional installation, maintenance, and genuine spare parts.",
  },
  services_title: { ar: "خدماتنا", en: "Our Services" },
  services_sub: { ar: "حلول شاملة لكل احتياجاتكم من المياه", en: "End-to-end solutions for every water need" },
  why_title: { ar: "لماذا تختارنا", en: "Why Choose Us" },
  why_sub: { ar: "نلتزم بالجودة والشفافية في كل خطوة", en: "Quality and transparency in every step" },
  products_title: { ar: "منتجاتنا المميزة", en: "Featured Products" },
  products_sub: { ar: "تشكيلة واسعة من أفضل الماركات العالمية", en: "A curated range from top global brands" },
  testimonials_title: { ar: "آراء عملائنا", en: "What Our Clients Say" },
  values_title: { ar: "قيمنا", en: "Our Values" },
  process_title: { ar: "كيف نعمل", en: "Our Process" },
  stats_title: { ar: "أرقام تتحدث عنا", en: "Numbers That Speak" },
  faq_title: { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" },
  contact_title: { ar: "تواصل معنا", en: "Get In Touch" },
  contact_sub: { ar: "سعداء بخدمتكم على مدار الأسبوع", en: "We're here to help every day of the week" },
  form_name: { ar: "الاسم", en: "Name" },
  form_phone: { ar: "رقم الجوال", en: "Phone" },
  form_email: { ar: "البريد الإلكتروني", en: "Email" },
  form_service: { ar: "الخدمة المطلوبة", en: "Service Needed" },
  form_message: { ar: "الرسالة", en: "Message" },
  form_send: { ar: "إرسال الطلب", en: "Send Request" },
  footer_rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  quote: { ar: "طلب عرض سعر", en: "Request Quote" },
  hours: { ar: "السبت - الخميس: 8 ص - 9 م", en: "Sat – Thu: 8 AM – 9 PM" },
  phone_label: { ar: "هاتف", en: "Phone" },
  email_label: { ar: "البريد", en: "Email" },
  whatsapp: { ar: "واتساب", en: "WhatsApp" },
  read_more: { ar: "اعرف المزيد", en: "Learn more" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: keyof typeof t) => string;
  dir: "rtl" | "ltr";
}

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const value: Ctx = {
    lang,
    setLang,
    tr: (key) => t[key]?.[lang] ?? String(key),
    dir: lang === "ar" ? "rtl" : "ltr",
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}