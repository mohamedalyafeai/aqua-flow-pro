import {
  Droplet, Waves, Cog, Filter, CloudFog, Wrench, Settings, Package, Zap,
  Shield, BadgeCheck, HandCoins, Headphones, Truck, Users, Award, Boxes,
} from "lucide-react";

export const services = [
  { icon: Droplet, ar: "مضخات المياه", en: "Water Pumps", descAr: "حلول سكنية، تجارية وصناعية بكفاءة عالية.", descEn: "Residential, commercial and industrial high-efficiency solutions." },
  { icon: Waves, ar: "المضخات الغاطسة", en: "Submersible Pumps", descAr: "للآبار العميقة والاستخدامات المنزلية.", descEn: "For deep wells and domestic use." },
  { icon: Zap, ar: "المحركات الكهربائية", en: "Electrical Motors", descAr: "محركات مستوردة موثوقة بأداء طويل الأمد.", descEn: "Reliable imported motors built to last." },
  { icon: Cog, ar: "محركات الجير بوكس", en: "Gearbox Motors", descAr: "حلول صناعية لعزوم الدوران العالية.", descEn: "Industrial gearbox motor solutions." },
  { icon: Filter, ar: "أنظمة تنقية المياه", en: "Water Purification (RO)", descAr: "أنظمة منزلية لتحلية وتنقية المياه.", descEn: "Domestic reverse osmosis purification." },
  { icon: Boxes, ar: "الفلاتر المركزية", en: "Central Filters", descAr: "فلترة شاملة لكامل المنزل أو المنشأة.", descEn: "Whole-house and facility-wide filtration." },
  { icon: CloudFog, ar: "أنظمة الضباب والرذاذ", en: "Mist & Fog Cooling", descAr: "للمزارع، المقاهي، المطاعم والاستراحات.", descEn: "For farms, cafes, restaurants and outdoor areas." },
  { icon: Wrench, ar: "خدمات التركيب", en: "Installation Services", descAr: "تركيب احترافي بأيدي فنيين خبراء.", descEn: "Professional installation by expert technicians." },
  { icon: Settings, ar: "خدمات الصيانة", en: "Maintenance Services", descAr: "صيانة دورية وإصلاح سريع وموثوق.", descEn: "Routine maintenance and reliable repair." },
  { icon: Package, ar: "قطع الغيار الأصلية", en: "Genuine Spare Parts", descAr: "قطع غيار أصلية لكل الماركات.", descEn: "Original replacement parts for all brands." },
];

export const whyUs = [
  { icon: BadgeCheck, ar: "منتجات عالية الجودة", en: "High Quality Products" },
  { icon: Wrench, ar: "تركيب احترافي", en: "Professional Installation" },
  { icon: Shield, ar: "استشارة صادقة", en: "Honest Consultation" },
  { icon: HandCoins, ar: "أسعار شفافة", en: "Transparent Pricing" },
  { icon: Headphones, ar: "دعم ما بعد البيع", en: "After-Sales Support" },
  { icon: Truck, ar: "توصيل سريع", en: "Fast Delivery" },
  { icon: Users, ar: "فريق ذو خبرة", en: "Experienced Team" },
  { icon: Award, ar: "قطع غيار أصلية", en: "Genuine Spare Parts" },
];

import pump from "@/assets/product-pump.jpg";
import submersible from "@/assets/product-submersible.jpg";
import motor from "@/assets/product-motor.jpg";
import ro from "@/assets/product-ro.jpg";
import filter from "@/assets/product-filter.jpg";
import mist from "@/assets/product-mist.jpg";

export type PumpType =
  | "water-pumps"
  | "submersible-pumps"
  | "motors"
  | "ro-systems"
  | "central-filters"
  | "mist-systems";

export type Application = "residential" | "commercial" | "industrial" | "agricultural";
export type Availability = "in-stock" | "on-order";

export interface ProductSpec {
  labelAr: string;
  labelEn: string;
  valueAr: string;
  valueEn: string;
}

export interface ProductCategory {
  slug: PumpType;
  img: string;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
  longAr: string;
  longEn: string;
  applications: Application[];
  availability: Availability;
  brandsAr: string;
  brandsEn: string;
  specs: ProductSpec[];
  useCasesAr: string[];
  useCasesEn: string[];
}

export const products: ProductCategory[] = [
  {
    slug: "water-pumps",
    img: pump,
    ar: "مضخات المياه",
    en: "Water Pumps",
    descAr: "مضخات طرد مركزي عالية الأداء للاستخدام السكني والتجاري.",
    descEn: "High-performance centrifugal pumps for residential and commercial use.",
    longAr:
      "تشكيلة واسعة من مضخات المياه بأداء موثوق وكفاءة عالية، مصممة لضخ المياه النظيفة في المنازل والفلل والمباني التجارية والمنشآت الصناعية.",
    longEn:
      "A complete range of reliable, high-efficiency water pumps engineered to move clean water in homes, villas, commercial buildings, and industrial facilities.",
    applications: ["residential", "commercial", "industrial"],
    availability: "in-stock",
    brandsAr: "بيدرولو، دي إيه بي، غراندفوس",
    brandsEn: "Pedrollo, DAB, Grundfos",
    specs: [
      { labelAr: "معدل التدفق", labelEn: "Flow rate", valueAr: "حتى 300 لتر/دقيقة", valueEn: "Up to 300 L/min" },
      { labelAr: "الضغط الأقصى", labelEn: "Max head", valueAr: "حتى 80 متر", valueEn: "Up to 80 m" },
      { labelAr: "القدرة", labelEn: "Power range", valueAr: "0.5 – 7.5 حصان", valueEn: "0.5 – 7.5 HP" },
      { labelAr: "الجهد", labelEn: "Voltage", valueAr: "220 / 380 فولت", valueEn: "220 / 380 V" },
      { labelAr: "الجسم", labelEn: "Body", valueAr: "حديد زهر / ستانلس", valueEn: "Cast iron / Stainless steel" },
      { labelAr: "الضمان", labelEn: "Warranty", valueAr: "12 شهرًا", valueEn: "12 months" },
    ],
    useCasesAr: ["ضخ المياه في الفلل والمنازل", "رفع المياه للخزانات العلوية", "شبكات الري التجارية", "أنظمة إطفاء الحريق"],
    useCasesEn: ["Villa & home water supply", "Booster to rooftop tanks", "Commercial irrigation networks", "Fire-fighting systems"],
  },
  {
    slug: "submersible-pumps",
    img: submersible,
    ar: "المضخات الغاطسة",
    en: "Submersible Pumps",
    descAr: "مضخات غاطسة متينة للآبار العميقة والاستخدامات الشاقة.",
    descEn: "Durable submersible pumps for deep wells and heavy-duty use.",
    longAr:
      "مضخات غاطسة أصلية مصممة للعمل تحت الماء لفترات طويلة، مثالية للآبار الارتوازية، خزانات المياه، والمنشآت الزراعية.",
    longEn:
      "Original submersible pumps built for continuous operation underwater — ideal for artesian wells, water reservoirs, and agricultural sites.",
    applications: ["residential", "industrial", "agricultural"],
    availability: "in-stock",
    brandsAr: "فرانكلين، غراندفوس، بيدرولو",
    brandsEn: "Franklin, Grundfos, Pedrollo",
    specs: [
      { labelAr: "عمق الغطس", labelEn: "Immersion depth", valueAr: "حتى 200 متر", valueEn: "Up to 200 m" },
      { labelAr: "معدل التدفق", labelEn: "Flow rate", valueAr: "حتى 500 لتر/دقيقة", valueEn: "Up to 500 L/min" },
      { labelAr: "القدرة", labelEn: "Power range", valueAr: "1 – 30 حصان", valueEn: "1 – 30 HP" },
      { labelAr: "قطر البئر", labelEn: "Well diameter", valueAr: "4\" / 6\" / 8\"", valueEn: "4\" / 6\" / 8\"" },
      { labelAr: "المادة", labelEn: "Material", valueAr: "ستانلس 304", valueEn: "Stainless steel 304" },
      { labelAr: "الضمان", labelEn: "Warranty", valueAr: "12 شهرًا", valueEn: "12 months" },
    ],
    useCasesAr: ["الآبار الارتوازية العميقة", "ضخ مياه الري للمزارع", "تصريف مياه الأمطار", "خزانات تحت الأرض"],
    useCasesEn: ["Deep artesian wells", "Farm irrigation pumping", "Storm water drainage", "Underground reservoirs"],
  },
  {
    slug: "motors",
    img: motor,
    ar: "المحركات الكهربائية",
    en: "Electric Motors",
    descAr: "محركات كهربائية صناعية عالية الكفاءة بأداء طويل الأمد.",
    descEn: "High-efficiency industrial electric motors built to last.",
    longAr:
      "محركات كهربائية أحادية وثلاثية الأطوار، بما فيها محركات الجير بوكس للتطبيقات الصناعية عالية العزم، من علامات تجارية موثوقة عالميًا.",
    longEn:
      "Single-phase, three-phase, and gearbox motors for high-torque industrial applications, sourced from trusted global brands.",
    applications: ["commercial", "industrial"],
    availability: "in-stock",
    brandsAr: "سيمنز، ABB، ويج",
    brandsEn: "Siemens, ABB, WEG",
    specs: [
      { labelAr: "القدرة", labelEn: "Power range", valueAr: "0.25 – 100 حصان", valueEn: "0.25 – 100 HP" },
      { labelAr: "السرعة", labelEn: "Speed", valueAr: "750 – 3000 د/د", valueEn: "750 – 3000 RPM" },
      { labelAr: "الجهد", labelEn: "Voltage", valueAr: "220 / 380 / 415 فولت", valueEn: "220 / 380 / 415 V" },
      { labelAr: "التردد", labelEn: "Frequency", valueAr: "50 / 60 هرتز", valueEn: "50 / 60 Hz" },
      { labelAr: "الحماية", labelEn: "Protection", valueAr: "IP55", valueEn: "IP55" },
      { labelAr: "التبريد", labelEn: "Cooling", valueAr: "IC411", valueEn: "IC411" },
    ],
    useCasesAr: ["خطوط الإنتاج الصناعية", "المصاعد والسيور", "أنظمة التهوية", "ورش الميكانيكا الثقيلة"],
    useCasesEn: ["Industrial production lines", "Elevators & conveyors", "Ventilation systems", "Heavy mechanical workshops"],
  },
  {
    slug: "ro-systems",
    img: ro,
    ar: "أنظمة التحلية RO",
    en: "RO Purification Systems",
    descAr: "أنظمة تحلية بالتناضح العكسي لمياه شرب نقية وآمنة.",
    descEn: "Reverse-osmosis systems for clean, safe drinking water.",
    longAr:
      "حلول متكاملة لتنقية مياه الشرب باستخدام تقنية التناضح العكسي متعدد المراحل، مناسبة للمنازل والمكاتب والمطاعم والمصانع.",
    longEn:
      "End-to-end drinking water purification using multi-stage reverse osmosis — designed for homes, offices, restaurants, and factories.",
    applications: ["residential", "commercial", "industrial"],
    availability: "in-stock",
    brandsAr: "أكوا، إسبرينغ، هيدرونكس",
    brandsEn: "Aqua, iSpring, Hydronix",
    specs: [
      { labelAr: "المراحل", labelEn: "Stages", valueAr: "5 – 7 مراحل", valueEn: "5 – 7 stages" },
      { labelAr: "الإنتاج اليومي", labelEn: "Daily output", valueAr: "75 – 6000 جالون/يوم", valueEn: "75 – 6,000 GPD" },
      { labelAr: "خزان التخزين", labelEn: "Storage tank", valueAr: "3.2 – 20 جالون", valueEn: "3.2 – 20 gal" },
      { labelAr: "نسبة الترشيح", labelEn: "Filtration", valueAr: "99% إزالة الشوائب", valueEn: "99% impurity removal" },
      { labelAr: "معقم UV", labelEn: "UV steriliser", valueAr: "اختياري", valueEn: "Optional" },
      { labelAr: "الضمان", labelEn: "Warranty", valueAr: "12 شهرًا", valueEn: "12 months" },
    ],
    useCasesAr: ["مياه الشرب المنزلية", "المطاعم والمقاهي", "المكاتب والمرافق", "خطوط الإنتاج الغذائي"],
    useCasesEn: ["Home drinking water", "Restaurants & cafes", "Offices & facilities", "Food production lines"],
  },
  {
    slug: "central-filters",
    img: filter,
    ar: "الفلاتر المركزية",
    en: "Central Filters",
    descAr: "أنظمة فلترة مركزية لتنقية المياه لكامل المنزل أو المنشأة.",
    descEn: "Central filtration systems for whole-house or whole-facility water.",
    longAr:
      "فلاتر مركزية بمراحل متعددة (رملي، كربوني، مُنقّي) تعالج المياه عند مدخل المبنى لحماية الأجهزة، الأنابيب، وضمان مياه أفضل في كل نقطة استخدام.",
    longEn:
      "Multi-stage central filters (sand, carbon, softener) treat water at the building inlet to protect appliances and pipes and deliver better water at every point of use.",
    applications: ["residential", "commercial", "industrial"],
    availability: "in-stock",
    brandsAr: "بنتير، آكوا، هيدرونكس",
    brandsEn: "Pentair, Aqua, Hydronix",
    specs: [
      { labelAr: "معدل التدفق", labelEn: "Flow rate", valueAr: "20 – 120 جالون/دقيقة", valueEn: "20 – 120 GPM" },
      { labelAr: "حجم الخزان", labelEn: "Tank size", valueAr: "\"10x54 - \"14x65", valueEn: "10x54\" – 14x65\"" },
      { labelAr: "المراحل", labelEn: "Stages", valueAr: "3 مراحل أساسية", valueEn: "3 core stages" },
      { labelAr: "الوسائط", labelEn: "Media", valueAr: "رمل سيليكا / كربون منشط", valueEn: "Silica sand / activated carbon" },
      { labelAr: "الغسيل العكسي", labelEn: "Backwash", valueAr: "أوتوماتيكي بمؤقت", valueEn: "Automatic timed" },
      { labelAr: "الضمان", labelEn: "Warranty", valueAr: "12 شهرًا", valueEn: "12 months" },
    ],
    useCasesAr: ["الفلل والقصور", "الفنادق والمنتجعات", "المدارس والمستشفيات", "المصانع"],
    useCasesEn: ["Villas & mansions", "Hotels & resorts", "Schools & hospitals", "Factories"],
  },
  {
    slug: "mist-systems",
    img: mist,
    ar: "أنظمة الضباب والرذاذ",
    en: "Mist & Fog Cooling Systems",
    descAr: "أنظمة تبريد بالضباب للمقاهي والمزارع والاستراحات.",
    descEn: "Mist cooling systems for cafes, farms, and outdoor venues.",
    longAr:
      "أنظمة الضباب ذات الضغط العالي تخفض درجة الحرارة حتى 15°م في المساحات الخارجية، مع تركيب احترافي وخراطيم مقاومة للتآكل.",
    longEn:
      "High-pressure mist systems lower outdoor temperatures by up to 15°C with professional installation and corrosion-resistant lines.",
    applications: ["commercial", "agricultural", "residential"],
    availability: "in-stock",
    brandsAr: "MistCooling، Coolzone، AquaCool",
    brandsEn: "MistCooling, Coolzone, AquaCool",
    specs: [
      { labelAr: "الضغط التشغيلي", labelEn: "Operating pressure", valueAr: "70 – 100 بار", valueEn: "70 – 100 bar" },
      { labelAr: "حجم القطرة", labelEn: "Droplet size", valueAr: "10 – 20 ميكرون", valueEn: "10 – 20 microns" },
      { labelAr: "خفض الحرارة", labelEn: "Temperature drop", valueAr: "حتى 15°م", valueEn: "Up to 15°C" },
      { labelAr: "الأنابيب", labelEn: "Line material", valueAr: "ستانلس / نايلون", valueEn: "Stainless / nylon" },
      { labelAr: "الفوهات", labelEn: "Nozzles", valueAr: "نحاس مطلي بالنيكل", valueEn: "Nickel-plated brass" },
      { labelAr: "التركيب", labelEn: "Installation", valueAr: "شامل بواسطة فريقنا", valueEn: "Full turn-key by our team" },
    ],
    useCasesAr: ["المقاهي والمطاعم الخارجية", "الاستراحات والمزارع", "حظائر الدواجن والماشية", "الملاعب الرياضية"],
    useCasesEn: ["Outdoor cafes & restaurants", "Rest houses & farms", "Poultry & livestock barns", "Sports venues"],
  },
];

export function getProductBySlug(slug: string): ProductCategory | undefined {
  return products.find((p) => p.slug === slug);
}

export const testimonials = [
  { stars: 5, ar: "من أفضل الشركات في أنظمة الرذاذ، جودة التركيب ممتازة ومنذ 4 سنوات بدون أي مشاكل. اهتمامهم بجودة التركيب وخدمة ما بعد البيع رائع.", en: "One of the best companies for mist cooling systems. Installation quality is exceptional, and after four years I have never had any issues. Their attention to installation and after-sales service is outstanding.", name: "فيصل / Faisal" },
  { stars: 5, ar: "رواد المضخات شركاء حقيقيون في كل قطرة ماء. هم خياري الأول دائماً لأنظمة الفلترة والقطع المركزية.", en: "Ruwad Pumps are true partners in every drop of water. They are always my first choice for filtration systems and central solutions.", name: "جمال الكلدي / Jamal Al-Kaldi" },
  { stars: 5, ar: "احترافية وأمانة استثنائية. شرح الفريق كل منتج بوضوح، أسعار شفافة، وأتاحوا لي المقارنة قبل القرار.", en: "Outstanding professionalism and honesty. The team explained every product clearly, provided transparent pricing, and let me compare before deciding.", name: "سلطان الطويمي / Sultan Altuwaymi" },
];

export const values = [
  { ar: "الجودة", en: "Quality", descAr: "نوفر منتجات موثوقة وعالية الجودة فقط.", descEn: "We supply only reliable, premium-quality products." },
  { ar: "النزاهة", en: "Integrity", descAr: "أسعار شفافة واستشارة صادقة.", descEn: "Transparent pricing and honest consultation." },
  { ar: "الاحترافية", en: "Professionalism", descAr: "تركيب وصيانة بأيدي خبراء.", descEn: "Expert installation and maintenance." },
  { ar: "رضا العملاء", en: "Customer Satisfaction", descAr: "دعم ما بعد البيع لعلاقات طويلة الأمد.", descEn: "Long-term after-sales support." },
];

export const processSteps = [
  { ar: "الاستشارة", en: "Consultation" },
  { ar: "اختيار المنتج", en: "Product Selection" },
  { ar: "التركيب الاحترافي", en: "Professional Installation" },
  { ar: "الاختبار", en: "Testing" },
  { ar: "الصيانة المستمرة", en: "Ongoing Maintenance" },
];

export const stats = [
  { value: 5000, suffix: "+", ar: "عميل راضٍ", en: "Satisfied Customers" },
  { value: 10000, suffix: "+", ar: "منتج تم توريده", en: "Products Delivered" },
  { value: 1000, suffix: "+", ar: "عملية تركيب", en: "Installations Completed" },
  { value: 100, suffix: "%", ar: "التزام بالعميل", en: "Customer Commitment" },
];

export const faqs = [
  { qAr: "هل تقدمون خدمات التركيب؟", qEn: "Do you provide installation?", aAr: "نعم، يقوم فريقنا المختص بالتركيب الكامل بأعلى المعايير.", aEn: "Yes, our specialized team handles complete installation to the highest standards." },
  { qAr: "هل توفرون الصيانة الدورية؟", qEn: "Do you offer maintenance?", aAr: "نقدم عقود صيانة دورية وزيارات طارئة عند الحاجة.", aEn: "We offer routine maintenance contracts and emergency visits when needed." },
  { qAr: "هل قطع الغيار متوفرة؟", qEn: "Are spare parts available?", aAr: "نوفر قطع غيار أصلية لكل الموديلات التي نتعامل معها.", aEn: "We stock genuine spare parts for all the models we sell." },
  { qAr: "هل تركبون أنظمة الضباب؟", qEn: "Do you install mist systems?", aAr: "نعم، للمنازل والمزارع والمقاهي والمطاعم.", aEn: "Yes, for homes, farms, cafes and restaurants." },
  { qAr: "هل يمكن طلب عرض سعر إلكترونياً؟", qEn: "Can I request a quotation online?", aAr: "بالتأكيد، يمكنك تعبئة نموذج التواصل وسنرد عليك خلال 24 ساعة.", aEn: "Absolutely — fill the contact form and we will respond within 24 hours." },
];