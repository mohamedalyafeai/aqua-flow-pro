import type { Application, Availability, PumpType } from "@/lib/site-data";

export interface ProductModel {
  id: string;
  category: PumpType;
  brand: string;
  model: string;
  ar: string;
  en: string;
  applications: Application[];
  availability: Availability;
  /** Price range in SAR, ex-VAT, supply only. */
  priceMin: number;
  priceMax: number;
  specs: { labelAr: string; labelEn: string; valueAr: string; valueEn: string }[];
}

const S = (labelAr: string, labelEn: string, valueAr: string, valueEn = valueAr) => ({
  labelAr,
  labelEn,
  valueAr,
  valueEn,
});

export const productModels: ProductModel[] = [
  // ---------- Water pumps ----------
  {
    id: "pedrollo-jswm-2ax",
    category: "water-pumps",
    brand: "Pedrollo",
    model: "JSWm 2AX",
    ar: "مضخة بيدرولو JSWm 2AX ذاتية السحب",
    en: "Pedrollo JSWm 2AX Self-Priming Jet Pump",
    applications: ["residential", "commercial"],
    availability: "in-stock",
    priceMin: 1150,
    priceMax: 1450,
    specs: [
      S("القدرة", "Power", "1.1 كيلوواط (1.5 حصان)", "1.1 kW (1.5 HP)"),
      S("التدفق", "Flow", "5 – 60 لتر/دقيقة", "5 – 60 L/min"),
      S("الضغط", "Head", "حتى 48 متر", "Up to 48 m"),
      S("الجهد", "Voltage", "230 فولت / 50 هرتز", "230 V / 50 Hz"),
      S("المداخل", "Ports", "1\" شفط × 1\" طرد", '1" suction × 1" discharge'),
      S("الجسم", "Body", "حديد زهر مع دفاعة نحاسية", "Cast iron with brass impeller"),
    ],
  },
  {
    id: "grundfos-cm3-4",
    category: "water-pumps",
    brand: "Grundfos",
    model: "CM3-4 A-R-A-E",
    ar: "مضخة غراندفوس CM3-4 أفقية متعددة المراحل",
    en: "Grundfos CM3-4 Horizontal Multistage Pump",
    applications: ["residential", "commercial"],
    availability: "in-stock",
    priceMin: 2350,
    priceMax: 2950,
    specs: [
      S("القدرة", "Power", "0.55 كيلوواط", "0.55 kW"),
      S("التدفق", "Flow", "حتى 4.5 م³/ساعة", "Up to 4.5 m³/h"),
      S("الضغط", "Head", "36 متر", "36 m"),
      S("الجهد", "Voltage", "230 فولت أحادي الطور", "230 V single-phase"),
      S("المادة", "Material", "ستانلس 304", "Stainless steel 304"),
      S("درجة الحماية", "Protection", "IP55", "IP55"),
    ],
  },
  {
    id: "dab-e1gi-40",
    category: "water-pumps",
    brand: "DAB",
    model: "E.sybox Mini 3",
    ar: "مجموعة ضغط دي إيه بي E.sybox Mini 3 بمحرك متغير السرعة",
    en: "DAB E.sybox Mini 3 Variable-Speed Booster Set",
    applications: ["residential"],
    availability: "in-stock",
    priceMin: 3900,
    priceMax: 4600,
    specs: [
      S("القدرة", "Power", "0.85 كيلوواط", "0.85 kW"),
      S("التدفق", "Flow", "حتى 4.8 م³/ساعة", "Up to 4.8 m³/h"),
      S("الضغط", "Head", "55 متر", "55 m"),
      S("التحكم", "Control", "إنفرتر مدمج + شاشة", "Built-in inverter + display"),
      S("مستوى الصوت", "Noise", "≤ 50 ديسيبل", "≤ 50 dB"),
      S("الجهد", "Voltage", "230 فولت / 50 هرتز", "230 V / 50 Hz"),
    ],
  },
  {
    id: "ebara-3m-40",
    category: "water-pumps",
    brand: "Ebara",
    model: "3M 40-160/3",
    ar: "مضخة إيبارا 3M طرد مركزي ستانلس",
    en: "Ebara 3M 40-160/3 Stainless Centrifugal Pump",
    applications: ["commercial", "industrial"],
    availability: "on-order",
    priceMin: 5200,
    priceMax: 6800,
    specs: [
      S("القدرة", "Power", "3 كيلوواط (4 حصان)", "3 kW (4 HP)"),
      S("التدفق", "Flow", "حتى 24 م³/ساعة", "Up to 24 m³/h"),
      S("الضغط", "Head", "34 متر", "34 m"),
      S("الجهد", "Voltage", "400 فولت ثلاثي الطور", "400 V three-phase"),
      S("المادة", "Material", "AISI 304 كامل", "Full AISI 304"),
      S("الاستخدام", "Duty", "تشغيل مستمر 24 ساعة", "Continuous 24 h duty"),
    ],
  },

  // ---------- Submersible pumps ----------
  {
    id: "grundfos-sp3a-25",
    category: "submersible-pumps",
    brand: "Grundfos",
    model: 'SP 3A-25 (4")',
    ar: "مضخة غاطسة غراندفوس SP 3A-25 مقاس 4 بوصة",
    en: 'Grundfos SP 3A-25 4" Borehole Pump',
    applications: ["residential", "agricultural"],
    availability: "in-stock",
    priceMin: 6800,
    priceMax: 8400,
    specs: [
      S("القدرة", "Power", "1.5 كيلوواط", "1.5 kW"),
      S("التدفق", "Flow", "حتى 4 م³/ساعة", "Up to 4 m³/h"),
      S("الضغط", "Head", "150 متر", "150 m"),
      S("قطر البئر", "Bore size", "4 بوصة", '4"'),
      S("المادة", "Material", "ستانلس 304", "Stainless steel 304"),
      S("المحرك", "Motor", "MS402 غاطس", "MS402 submersible"),
    ],
  },
  {
    id: "franklin-6-15hp",
    category: "submersible-pumps",
    brand: "Franklin Electric",
    model: '6" 15 HP Set',
    ar: "طقم غاطس فرانكلين 6 بوصة بقدرة 15 حصان",
    en: 'Franklin Electric 6" 15 HP Submersible Set',
    applications: ["agricultural", "industrial"],
    availability: "on-order",
    priceMin: 18500,
    priceMax: 24000,
    specs: [
      S("القدرة", "Power", "11 كيلوواط (15 حصان)", "11 kW (15 HP)"),
      S("التدفق", "Flow", "حتى 30 م³/ساعة", "Up to 30 m³/h"),
      S("الضغط", "Head", "180 متر", "180 m"),
      S("الجهد", "Voltage", "400 فولت ثلاثي الطور", "400 V three-phase"),
      S("لوحة التحكم", "Control panel", "SubDrive مع حماية جفاف", "SubDrive with dry-run protection"),
      S("الكابل", "Cable", "كابل غاطس 4×6 مم²", "4×6 mm² submersible cable"),
    ],
  },
  {
    id: "pedrollo-4sr2-13",
    category: "submersible-pumps",
    brand: "Pedrollo",
    model: "4SR 2/13",
    ar: "مضخة بيدرولو الغاطسة 4SR 2/13",
    en: "Pedrollo 4SR 2/13 Submersible Pump",
    applications: ["residential", "agricultural"],
    availability: "in-stock",
    priceMin: 3200,
    priceMax: 4100,
    specs: [
      S("القدرة", "Power", "1.1 كيلوواط", "1.1 kW"),
      S("التدفق", "Flow", "حتى 3.6 م³/ساعة", "Up to 3.6 m³/h"),
      S("الضغط", "Head", "88 متر", "88 m"),
      S("قطر البئر", "Bore size", "4 بوصة", '4"'),
      S("المراحل", "Stages", "13 مرحلة", "13 stages"),
      S("الجهد", "Voltage", "230 فولت", "230 V"),
    ],
  },

  // ---------- Motors ----------
  {
    id: "abb-m3bp-90",
    category: "motors",
    brand: "ABB",
    model: "M3BP 90SLA IE3",
    ar: "محرك ABB ثلاثي الطور 1.5 كيلوواط IE3",
    en: "ABB M3BP 90SLA IE3 Three-Phase Motor",
    applications: ["commercial", "industrial"],
    availability: "in-stock",
    priceMin: 1750,
    priceMax: 2300,
    specs: [
      S("القدرة", "Power", "1.5 كيلوواط (2 حصان)", "1.5 kW (2 HP)"),
      S("السرعة", "Speed", "2880 د/د", "2,880 RPM"),
      S("الجهد", "Voltage", "400 فولت / 50 هرتز", "400 V / 50 Hz"),
      S("الكفاءة", "Efficiency", "IE3 عالية الكفاءة", "IE3 premium efficiency"),
      S("الحماية", "Protection", "IP55 / F", "IP55 / Class F"),
      S("التركيب", "Mounting", "B3 قدم", "B3 foot"),
    ],
  },
  {
    id: "siemens-1le1-11kw",
    category: "motors",
    brand: "Siemens",
    model: "SIMOTICS 1LE1 11 kW",
    ar: "محرك سيمنز SIMOTICS 1LE1 بقدرة 11 كيلوواط",
    en: "Siemens SIMOTICS 1LE1 11 kW Motor",
    applications: ["industrial"],
    availability: "on-order",
    priceMin: 6900,
    priceMax: 9200,
    specs: [
      S("القدرة", "Power", "11 كيلوواط (15 حصان)", "11 kW (15 HP)"),
      S("السرعة", "Speed", "1465 د/د", "1,465 RPM"),
      S("الجهد", "Voltage", "400/690 فولت", "400/690 V"),
      S("الكفاءة", "Efficiency", "IE3", "IE3"),
      S("الإطار", "Frame", "160M ألومنيوم/زهر", "160M aluminium/cast iron"),
      S("الحماية", "Protection", "IP55", "IP55"),
    ],
  },
  {
    id: "weg-gearbox-w22",
    category: "motors",
    brand: "WEG",
    model: "W22 + WG20 Gearbox",
    ar: "محرك WEG W22 مع جيربوكس WG20 عالي العزم",
    en: "WEG W22 Motor with WG20 Gearbox",
    applications: ["industrial"],
    availability: "on-order",
    priceMin: 8500,
    priceMax: 14500,
    specs: [
      S("القدرة", "Power", "5.5 كيلوواط", "5.5 kW"),
      S("نسبة التخفيض", "Gear ratio", "1:10 حتى 1:100", "1:10 to 1:100"),
      S("العزم", "Output torque", "حتى 1200 نيوتن·متر", "Up to 1,200 N·m"),
      S("الجهد", "Voltage", "400 فولت ثلاثي الطور", "400 V three-phase"),
      S("التبريد", "Cooling", "IC411", "IC411"),
      S("الحماية", "Protection", "IP55", "IP55"),
    ],
  },

  // ---------- RO systems ----------
  {
    id: "ro-home-7stage",
    category: "ro-systems",
    brand: "AquaPro",
    model: "7-Stage 100 GPD",
    ar: "نظام تحلية منزلي 7 مراحل بإنتاج 100 جالون/يوم",
    en: "7-Stage Home RO System, 100 GPD",
    applications: ["residential"],
    availability: "in-stock",
    priceMin: 950,
    priceMax: 1600,
    specs: [
      S("المراحل", "Stages", "7 مراحل + معدن قلوي", "7 stages + alkaline"),
      S("الإنتاج", "Output", "100 جالون/يوم", "100 GPD"),
      S("الخزان", "Tank", "3.2 جالون معدني", "3.2 gal metal tank"),
      S("المضخة", "Booster pump", "مضخة ضغط مدمجة", "Integrated booster pump"),
      S("التعقيم", "Sterilisation", "مصباح UV اختياري", "Optional UV lamp"),
      S("الضمان", "Warranty", "12 شهرًا", "12 months"),
    ],
  },
  {
    id: "ro-commercial-1500gpd",
    category: "ro-systems",
    brand: "Hydronix / Pentair membranes",
    model: "Commercial 1500 GPD",
    ar: "نظام تحلية تجاري 1500 جالون/يوم",
    en: "Commercial RO Plant, 1,500 GPD",
    applications: ["commercial"],
    availability: "on-order",
    priceMin: 12000,
    priceMax: 19000,
    specs: [
      S("الإنتاج", "Output", "1500 جالون/يوم (5.7 م³)", "1,500 GPD (5.7 m³)"),
      S("الأغشية", "Membranes", "2 × 4040 TFC", "2 × 4040 TFC"),
      S("المضخة", "High-pressure pump", "مضخة ستانلس متعددة المراحل", "Stainless multistage pump"),
      S("المعالجة الأولية", "Pre-treatment", "رملي + كربوني + مانع ترسيب", "Sand + carbon + antiscalant"),
      S("التحكم", "Control", "لوحة PLC مع TDS متصل", "PLC panel with inline TDS"),
      S("الهيكل", "Frame", "ستانلس 304", "Stainless steel 304"),
    ],
  },
  {
    id: "ro-industrial-6000gpd",
    category: "ro-systems",
    brand: "Custom Build",
    model: "Industrial 6000 GPD",
    ar: "محطة تحلية صناعية 6000 جالون/يوم",
    en: "Industrial RO Plant, 6,000 GPD",
    applications: ["industrial"],
    availability: "on-order",
    priceMin: 38000,
    priceMax: 75000,
    specs: [
      S("الإنتاج", "Output", "6000 جالون/يوم (22.7 م³)", "6,000 GPD (22.7 m³)"),
      S("الأغشية", "Membranes", "6 × 4040 أو 2 × 8040", "6 × 4040 or 2 × 8040"),
      S("الاسترجاع", "Recovery", "45 – 55%", "45 – 55%"),
      S("الجرعات", "Dosing", "أنظمة جرعات كلور/مانع ترسيب", "Chlorine & antiscalant dosing"),
      S("التخزين", "Storage", "خزانات 2 × 5000 لتر", "2 × 5,000 L tanks"),
      S("التركيب", "Installation", "تسليم مفتاح باليد", "Turn-key installation"),
    ],
  },

  // ---------- Central filters ----------
  {
    id: "central-10x54",
    category: "central-filters",
    brand: "Pentair",
    model: "Sand + Carbon 10x54",
    ar: "فلتر مركزي 10×54 رملي + كربوني للفلل",
    en: "Central Filter 10x54, Sand + Carbon",
    applications: ["residential"],
    availability: "in-stock",
    priceMin: 3200,
    priceMax: 4800,
    specs: [
      S("التدفق", "Flow", "حتى 25 جالون/دقيقة", "Up to 25 GPM"),
      S("الخزانات", "Vessels", "2 × 10×54 بوصة", "2 × 10x54 in"),
      S("الوسائط", "Media", "رمل سيليكا + كربون منشط", "Silica sand + activated carbon"),
      S("الصمام", "Valve", "غسيل عكسي أوتوماتيكي", "Automatic backwash valve"),
      S("الوصلات", "Connections", "1\" PVC", '1" PVC'),
      S("الضمان", "Warranty", "12 شهرًا", "12 months"),
    ],
  },
  {
    id: "central-softener-14x65",
    category: "central-filters",
    brand: "Pentair",
    model: "Softener 14x65",
    ar: "نظام إزالة عسر المياه 14×65 مع خزان ملح",
    en: "Water Softener 14x65 with Brine Tank",
    applications: ["commercial", "residential"],
    availability: "on-order",
    priceMin: 7500,
    priceMax: 11500,
    specs: [
      S("التدفق", "Flow", "حتى 60 جالون/دقيقة", "Up to 60 GPM"),
      S("السعة", "Capacity", "3.0 قدم³ راتنج", "3.0 ft³ resin"),
      S("الصمام", "Valve", "Fleck 9100 / 2850", "Fleck 9100 / 2850"),
      S("خزان الملح", "Brine tank", "300 لتر", "300 L"),
      S("التجديد", "Regeneration", "حسب الحجم أو المؤقت", "Metered or timed"),
      S("الوصلات", "Connections", "2\" ", '2"'),
    ],
  },

  // ---------- Mist systems ----------
  {
    id: "mist-70bar-30nozzle",
    category: "mist-systems",
    brand: "Coolzone",
    model: "70 bar / 30 nozzles",
    ar: "نظام ضباب 70 بار مع 30 فوهة",
    en: "Mist System 70 bar, 30 Nozzles",
    applications: ["commercial", "residential"],
    availability: "in-stock",
    priceMin: 6500,
    priceMax: 9500,
    specs: [
      S("الضغط", "Pressure", "70 بار", "70 bar"),
      S("الفوهات", "Nozzles", "30 فوهة نحاس نيكل 0.2 مم", "30 nickel-brass nozzles, 0.2 mm"),
      S("المضخة", "Pump", "مضخة مكبسية 1.5 كيلوواط", "1.5 kW plunger pump"),
      S("الأنابيب", "Lines", "ستانلس 304 قطر 3/8\"", '3/8" stainless 304 tubing'),
      S("خفض الحرارة", "Cooling effect", "8 – 12 °م", "8 – 12 °C"),
      S("التغطية", "Coverage", "حتى 60 متر خطي", "Up to 60 linear m"),
    ],
  },
  {
    id: "mist-100bar-farm",
    category: "mist-systems",
    brand: "MistCooling",
    model: "100 bar Farm Line",
    ar: "نظام ضباب زراعي 100 بار للحظائر والمزارع",
    en: "100 bar Agricultural Mist Line",
    applications: ["agricultural", "commercial"],
    availability: "on-order",
    priceMin: 14000,
    priceMax: 32000,
    specs: [
      S("الضغط", "Pressure", "100 بار", "100 bar"),
      S("الفوهات", "Nozzles", "80 – 200 فوهة", "80 – 200 nozzles"),
      S("المضخة", "Pump", "3 كيلوواط مع لوحة تحكم", "3 kW with control panel"),
      S("المرشح", "Filtration", "فلتر 5 ميكرون قبل المضخة", "5-micron pre-filter"),
      S("التحكم", "Control", "مؤقت دوري + حساس حرارة", "Cycle timer + thermostat"),
      S("التغطية", "Coverage", "حتى 400 متر خطي", "Up to 400 linear m"),
    ],
  },
];

export function modelsByCategory(category: PumpType) {
  return productModels.filter((m) => m.category === category);
}

export function priceRangeForCategory(category: PumpType) {
  const list = modelsByCategory(category);
  if (list.length === 0) return null;
  return {
    min: Math.min(...list.map((m) => m.priceMin)),
    max: Math.max(...list.map((m) => m.priceMax)),
  };
}

export const installationServicePricing = [
  { ar: "تركيب مضخة مياه منزلية", en: "Domestic water pump installation", min: 350, max: 750 },
  { ar: "تركيب مضخة غاطسة (بئر)", en: "Borehole submersible installation", min: 1500, max: 6000 },
  { ar: "تركيب نظام تحلية منزلي", en: "Home RO system installation", min: 250, max: 450 },
  { ar: "تركيب فلتر مركزي", en: "Central filter installation", min: 700, max: 1800 },
  { ar: "تركيب نظام ضباب", en: "Mist system installation", min: 1200, max: 6500 },
  { ar: "عقد صيانة سنوي", en: "Annual maintenance contract", min: 900, max: 4500 },
];

export interface Qualification {
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
}

export const teamQualifications: Qualification[] = [
  {
    ar: "فنيون معتمدون من المصنّعين",
    en: "Manufacturer-certified technicians",
    descAr: "فريق مدرَّب على منتجات غراندفوس وبيدرولو وفرانكلين وفق دلائل التركيب المعتمدة.",
    descEn: "Trained on Grundfos, Pedrollo and Franklin products following approved installation manuals.",
  },
  {
    ar: "كهربائيون مرخّصون",
    en: "Licensed electricians",
    descAr: "توصيل لوحات التحكم والحماية حسب الكود السعودي للتوصيلات الكهربائية (SBC 401).",
    descEn: "Control and protection panels wired to the Saudi Building Code for electrical works (SBC 401).",
  },
  {
    ar: "خبرة في الآبار العميقة",
    en: "Deep-well expertise",
    descAr: "أطقم متخصصة في تنزيل ورفع المضخات الغاطسة حتى عمق 200 متر بمعدات رفع آمنة.",
    descEn: "Dedicated crews for setting and pulling submersibles to 200 m with proper lifting gear.",
  },
  {
    ar: "التزام بالسلامة",
    en: "Safety compliance",
    descAr: "معدات وقاية شخصية كاملة، تصاريح عمل، وإجراءات عزل الطاقة في كل موقع.",
    descEn: "Full PPE, work permits and lock-out/tag-out procedures on every site.",
  },
  {
    ar: "اختبار وتسليم موثّق",
    en: "Documented testing & handover",
    descAr: "تقرير تشغيل يوضح الضغط، التدفق، سحب التيار، وقراءات TDS قبل التسليم.",
    descEn: "Commissioning report with pressure, flow, current draw and TDS readings before handover.",
  },
  {
    ar: "ضمان على التركيب",
    en: "Workmanship warranty",
    descAr: "ضمان 6 أشهر على أعمال التركيب بالإضافة إلى ضمان المصنّع على المنتج.",
    descEn: "6-month workmanship warranty on top of the manufacturer product warranty.",
  },
];

export interface CaseStudy {
  titleAr: string;
  titleEn: string;
  sectorAr: string;
  sectorEn: string;
  challengeAr: string;
  challengeEn: string;
  solutionAr: string;
  solutionEn: string;
  resultAr: string;
  resultEn: string;
  metrics: { ar: string; en: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    titleAr: "مجمع سكني من 24 وحدة — الرياض",
    titleEn: "24-Unit Residential Compound — Riyadh",
    sectorAr: "سكني",
    sectorEn: "Residential",
    challengeAr: "ضغط مياه غير مستقر في الأدوار العلوية وتكرار احتراق المضخة القديمة.",
    challengeEn: "Unstable water pressure on upper floors and repeated failure of the old pump.",
    solutionAr: "تركيب مجموعة ضغط مزدوجة غراندفوس CM مع خزان تمدد ولوحة تبادل تشغيل أوتوماتيكي.",
    solutionEn: "Twin Grundfos CM booster set with expansion vessel and automatic duty/standby panel.",
    resultAr: "ضغط ثابت 3.5 بار في كل الوحدات وتوقف الأعطال منذ التسليم.",
    resultEn: "Steady 3.5 bar at every unit and zero breakdowns since handover.",
    metrics: [
      { ar: "مدة التنفيذ", en: "Duration", value: "4 أيام / 4 days" },
      { ar: "الضغط", en: "Pressure", value: "3.5 bar" },
      { ar: "الوحدات", en: "Units served", value: "24" },
    ],
  },
  {
    titleAr: "مزرعة نخيل 60 هكتار — القصيم",
    titleEn: "60-Hectare Date Farm — Al-Qassim",
    sectorAr: "زراعي",
    sectorEn: "Agricultural",
    challengeAr: "بئر بعمق 180 مترًا مع انخفاض تدفق وتلف متكرر للمحرك بسبب الجفاف.",
    challengeEn: "180 m borehole with dropping yield and repeated motor burnout from dry running.",
    solutionAr: "طقم فرانكلين 15 حصان مع لوحة SubDrive وحماية جفاف وحساس مستوى.",
    solutionEn: "Franklin 15 HP set with SubDrive panel, dry-run protection and level probe.",
    resultAr: "تدفق مستقر 28 م³/ساعة وانخفاض استهلاك الكهرباء بنحو 18%.",
    resultEn: "Stable 28 m³/h and roughly 18% lower energy consumption.",
    metrics: [
      { ar: "العمق", en: "Depth", value: "180 m" },
      { ar: "التدفق", en: "Flow", value: "28 m³/h" },
      { ar: "توفير الطاقة", en: "Energy saved", value: "18%" },
    ],
  },
  {
    titleAr: "سلسلة مقاهي خارجية — الدرعية",
    titleEn: "Outdoor Cafe Chain — Diriyah",
    sectorAr: "تجاري",
    sectorEn: "Commercial",
    challengeAr: "جلسات خارجية غير قابلة للاستخدام في الصيف بسبب الحرارة.",
    challengeEn: "Outdoor seating unusable in summer heat.",
    solutionAr: "نظام ضباب 70 بار بـ 96 فوهة على ثلاثة فروع مع مؤقت وحساس حرارة.",
    solutionEn: "70 bar mist system, 96 nozzles across three branches with timer and thermostat.",
    resultAr: "انخفاض الحرارة المحسوسة 10 °م وزيادة استخدام الجلسات الخارجية في الصيف.",
    resultEn: "Perceived temperature down 10 °C and far higher summer use of outdoor seating.",
    metrics: [
      { ar: "الفروع", en: "Branches", value: "3" },
      { ar: "الفوهات", en: "Nozzles", value: "96" },
      { ar: "خفض الحرارة", en: "Temp. drop", value: "10 °C" },
    ],
  },
  {
    titleAr: "مصنع أغذية — المدينة الصناعية الثانية",
    titleEn: "Food Factory — 2nd Industrial City",
    sectorAr: "صناعي",
    sectorEn: "Industrial",
    challengeAr: "حاجة لمياه إنتاج مطابقة للمواصفات مع أملاح مرتفعة في المصدر.",
    challengeEn: "Process water had to meet spec while the source water was high in salts.",
    solutionAr: "محطة تحلية 6000 جالون/يوم مع معالجة أولية وجرعات ولوحة PLC وقياس TDS مستمر.",
    solutionEn: "6,000 GPD RO plant with pre-treatment, dosing, PLC panel and continuous TDS monitoring.",
    resultAr: "خفض TDS من 1450 إلى أقل من 40 جزء بالمليون مع تشغيل مستمر.",
    resultEn: "TDS reduced from 1,450 to under 40 ppm with continuous operation.",
    metrics: [
      { ar: "الإنتاج", en: "Output", value: "22.7 m³/day" },
      { ar: "TDS", en: "TDS", value: "1450 → 40 ppm" },
      { ar: "مدة التنفيذ", en: "Duration", value: "3 أسابيع / 3 weeks" },
    ],
  },
];
