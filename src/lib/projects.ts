import compound from "@/assets/project-compound.jpg";
import farm from "@/assets/project-farm.jpg";
import cafe from "@/assets/project-cafe.jpg";
import factory from "@/assets/project-factory.jpg";

export interface Project {
  slug: string;
  image: string;
  titleAr: string;
  titleEn: string;
  sectorAr: string;
  sectorEn: string;
  locationAr: string;
  locationEn: string;
  year: string;
  scopeAr: string;
  scopeEn: string;
  resultAr: string;
  resultEn: string;
  metrics: { ar: string; en: string; value: string }[];
  testimonial: {
    quoteAr: string;
    quoteEn: string;
    authorAr: string;
    authorEn: string;
    roleAr: string;
    roleEn: string;
  };
}

/**
 * Reference projects shown on /projects and linked from the installation page.
 * These are starter entries — replace the titles, photos, numbers and quotes
 * with the owner's real jobs as they are supplied.
 */
export const projects: Project[] = [
  {
    slug: "residential-compound-riyadh",
    image: compound,
    titleAr: "مجمع سكني من 24 وحدة",
    titleEn: "24-Unit Residential Compound",
    sectorAr: "سكني",
    sectorEn: "Residential",
    locationAr: "الرياض — حي الياسمين",
    locationEn: "Riyadh — Al Yasmin",
    year: "2025",
    scopeAr: "مجموعة ضغط مزدوجة غراندفوس CM مع خزان تمدد ولوحة تبادل تشغيل أوتوماتيكي وتمديدات ستانلس.",
    scopeEn: "Twin Grundfos CM booster set with expansion vessel, automatic duty/standby panel and stainless pipework.",
    resultAr: "ضغط ثابت 3.5 بار في كل الوحدات وتوقف الأعطال منذ التسليم.",
    resultEn: "Steady 3.5 bar at every unit and zero breakdowns since handover.",
    metrics: [
      { ar: "مدة التنفيذ", en: "Duration", value: "4 أيام / 4 days" },
      { ar: "الضغط", en: "Pressure", value: "3.5 bar" },
      { ar: "الوحدات", en: "Units served", value: "24" },
    ],
    testimonial: {
      quoteAr: "ركبوا المجموعة خلال أربعة أيام بدون إيقاف المياه على السكان، والضغط في الدور الخامس أصبح مثل الأرضي.",
      quoteEn: "They installed the set in four days without cutting water to the residents, and pressure on the fifth floor now matches the ground floor.",
      authorAr: "أ. سعد الحربي",
      authorEn: "Saad Al-Harbi",
      roleAr: "مدير الصيانة — المجمع",
      roleEn: "Facilities Manager",
    },
  },
  {
    slug: "date-farm-qassim",
    image: farm,
    titleAr: "مزرعة نخيل 60 هكتار",
    titleEn: "60-Hectare Date Farm",
    sectorAr: "زراعي",
    sectorEn: "Agricultural",
    locationAr: "القصيم — بريدة",
    locationEn: "Al-Qassim — Buraydah",
    year: "2025",
    scopeAr: "طقم غاطس فرانكلين 15 حصان على بئر 180 متر مع لوحة SubDrive وحماية جفاف وحساس مستوى.",
    scopeEn: "Franklin 15 HP submersible set on a 180 m borehole with SubDrive panel, dry-run protection and level probe.",
    resultAr: "تدفق مستقر 28 م³/ساعة وانخفاض استهلاك الكهرباء بنحو 18%.",
    resultEn: "Stable 28 m³/h and roughly 18% lower energy consumption.",
    metrics: [
      { ar: "العمق", en: "Depth", value: "180 m" },
      { ar: "التدفق", en: "Flow", value: "28 m³/h" },
      { ar: "توفير الطاقة", en: "Energy saved", value: "18%" },
    ],
    testimonial: {
      quoteAr: "قبل التركيب كان المحرك يحترق كل موسم. بعد اللوحة الجديدة وحماية الجفاف لم نوقف الري ولا مرة.",
      quoteEn: "We used to burn a motor every season. Since the new panel and dry-run protection we have not stopped irrigation once.",
      authorAr: "م. عبدالله القحطاني",
      authorEn: "Abdullah Al-Qahtani",
      roleAr: "مالك المزرعة",
      roleEn: "Farm Owner",
    },
  },
  {
    slug: "cafe-chain-diriyah",
    image: cafe,
    titleAr: "سلسلة مقاهي خارجية — 3 فروع",
    titleEn: "Outdoor Cafe Chain — 3 Branches",
    sectorAr: "تجاري",
    sectorEn: "Commercial",
    locationAr: "الدرعية والرياض",
    locationEn: "Diriyah & Riyadh",
    year: "2024",
    scopeAr: "نظام ضباب 70 بار بـ 96 فوهة على ثلاثة فروع مع مؤقت وحساس حرارة وخط ستانلس مخفي.",
    scopeEn: "70 bar mist system, 96 nozzles across three branches with timer, thermostat and concealed stainless line.",
    resultAr: "انخفاض الحرارة المحسوسة 10 °م وزيادة استخدام الجلسات الخارجية في الصيف.",
    resultEn: "Perceived temperature down 10 °C and far higher summer use of outdoor seating.",
    metrics: [
      { ar: "الفروع", en: "Branches", value: "3" },
      { ar: "الفوهات", en: "Nozzles", value: "96" },
      { ar: "خفض الحرارة", en: "Temp. drop", value: "10 °C" },
    ],
    testimonial: {
      quoteAr: "الجلسات الخارجية كانت فاضية في الصيف، الآن هي الأكثر طلباً. التنفيذ كان نظيفاً وبدون إغلاق الفرع.",
      quoteEn: "Our terrace used to sit empty in summer; now it is the most requested area. The work was clean and we never closed the branch.",
      authorAr: "نورة العتيبي",
      authorEn: "Noura Al-Otaibi",
      roleAr: "المديرة التشغيلية",
      roleEn: "Operations Manager",
    },
  },
  {
    slug: "food-factory-industrial-city",
    image: factory,
    titleAr: "مصنع أغذية — محطة تحلية 6000 جالون/يوم",
    titleEn: "Food Factory — 6,000 GPD RO Plant",
    sectorAr: "صناعي",
    sectorEn: "Industrial",
    locationAr: "الرياض — المدينة الصناعية الثانية",
    locationEn: "Riyadh — 2nd Industrial City",
    year: "2024",
    scopeAr: "محطة تحلية 6000 جالون/يوم مع معالجة أولية وجرعات ولوحة PLC وقياس TDS مستمر وتقرير تشغيل.",
    scopeEn: "6,000 GPD RO plant with pre-treatment, dosing, PLC panel, continuous TDS monitoring and commissioning report.",
    resultAr: "مياه إنتاج مطابقة للمواصفات وتقليل استهلاك المياه المرفوضة.",
    resultEn: "Process water within spec and reduced reject water consumption.",
    metrics: [
      { ar: "الإنتاجية", en: "Capacity", value: "6,000 GPD" },
      { ar: "TDS الناتج", en: "Product TDS", value: "< 50 ppm" },
      { ar: "مدة التنفيذ", en: "Duration", value: "3 أسابيع / 3 weeks" },
    ],
    testimonial: {
      quoteAr: "التسليم كان موثقاً بتقرير تشغيل وقراءات، وهذا ساعدنا مباشرة في تدقيق الجودة.",
      quoteEn: "Handover came with a full commissioning report and readings, which went straight into our quality audit.",
      authorAr: "م. فهد الدوسري",
      authorEn: "Fahad Al-Dosari",
      roleAr: "مدير الجودة",
      roleEn: "Quality Manager",
    },
  },
];
