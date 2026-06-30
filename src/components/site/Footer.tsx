import { Link } from "@tanstack/react-router";
import { Droplets, Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { tr, lang } = useLang();
  return (
    <footer className="bg-brand-deep text-white">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
              <Droplets className="h-5 w-5 text-cyan-accent" />
            </span>
            <span className="font-bold">{tr("brand")}</span>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">{tr("brandFull")}</p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-cyan-accent transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-cyan-accent transition-colors"><Instagram className="h-4 w-4" /></a>
            <a href="https://wa.me/966500000000" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-cyan-accent transition-colors"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-accent">{lang === "ar" ? "روابط سريعة" : "Quick Links"}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="text-white/80 hover:text-white">{tr("nav_home")}</Link></li>
            <li><Link to="/about" className="text-white/80 hover:text-white">{tr("nav_about")}</Link></li>
            <li><Link to="/services" className="text-white/80 hover:text-white">{tr("nav_services")}</Link></li>
            <li><Link to="/products" className="text-white/80 hover:text-white">{tr("nav_products")}</Link></li>
            <li><Link to="/contact" className="text-white/80 hover:text-white">{tr("nav_contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-accent">{tr("nav_services")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{lang === "ar" ? "مضخات المياه" : "Water Pumps"}</li>
            <li>{lang === "ar" ? "أنظمة التحلية RO" : "RO Systems"}</li>
            <li>{lang === "ar" ? "الفلاتر المركزية" : "Central Filters"}</li>
            <li>{lang === "ar" ? "أنظمة الضباب والرذاذ" : "Mist & Fog Cooling"}</li>
            <li>{lang === "ar" ? "تركيب وصيانة" : "Installation & Maintenance"}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-accent">{tr("contact_title")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-accent" /><span dir="ltr">+966 50 000 0000</span></li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-accent" />info@ruwad-pumps.com</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-accent" />{lang === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {tr("brandFull")} — {tr("footer_rights")}
        </div>
      </div>
    </footer>
  );
}