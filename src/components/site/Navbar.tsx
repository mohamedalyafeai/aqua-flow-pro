import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Globe, Droplets } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { tr, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: tr("nav_home") },
    { to: "/about", label: tr("nav_about") },
    { to: "/services", label: tr("nav_services") },
    { to: "/products", label: tr("nav_products") },
    { to: "/contact", label: tr("nav_contact") },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b shadow-sm" : "bg-background/60 backdrop-blur"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:h-20">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-elegant">
            <Droplets className="h-5 w-5" />
          </span>
          <span className="flex flex-col min-w-0">
            <span className="truncate text-sm font-bold text-brand md:text-base">{tr("brand")}</span>
            <span className="truncate text-[10px] text-muted-foreground md:text-xs">{tr("brandFull")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-brand"
              activeProps={{ className: "text-brand bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-brand"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <Button asChild size="sm" className="hidden bg-brand text-white hover:bg-brand-deep md:inline-flex">
            <Link to="/contact">{tr("cta_quote")}</Link>
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-md border lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "text-brand bg-secondary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-brand text-white hover:bg-brand-deep">
              <Link to="/contact" onClick={() => setOpen(false)}>{tr("cta_quote")}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}