// Central business contact details.
// NOTE: these were filled in with realistic Riyadh details as a starting point.
// Update the values here once and they change everywhere on the site.
export const business = {
  phoneDisplay: "+966 11 456 7788",
  phoneHref: "tel:+966114567788",
  whatsappDisplay: "+966 55 987 6543",
  whatsappNumber: "966559876543",
  whatsappHref: "https://wa.me/966559876543",
  email: "sales@ruwadpumps.com",
  emailHref: "mailto:sales@ruwadpumps.com",
  salesEmail: "sales@ruwadpumps.com",
  addressAr: "طريق الخرج، المنطقة الصناعية الثانية، مخرج 18، الرياض 14328، المملكة العربية السعودية",
  addressEn: "Al-Kharj Road, 2nd Industrial City, Exit 18, Riyadh 14328, Saudi Arabia",
  mapEmbed:
    "https://www.google.com/maps?q=2nd+Industrial+City+Al-Kharj+Road+Riyadh+Saudi+Arabia&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=2nd+Industrial+City+Al-Kharj+Road+Riyadh",
  hoursAr: "السبت - الخميس: 8:00 ص - 9:00 م • الجمعة: مغلق",
  hoursEn: "Sat – Thu: 8:00 AM – 9:00 PM • Friday: closed",
  crNumber: "1010574821",
  vatNumber: "300145678900003",
} as const;

export function waLink(text: string) {
  return `${business.whatsappHref}?text=${encodeURIComponent(text)}`;
}
