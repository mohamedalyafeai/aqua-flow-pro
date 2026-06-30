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

export const products = [
  { img: pump, ar: "مضخات المياه", en: "Water Pumps", descAr: "مضخات طرد مركزي عالية الأداء.", descEn: "High-performance centrifugal pumps." },
  { img: submersible, ar: "المضخات الغاطسة", en: "Submersible Pumps", descAr: "متينة وموثوقة للآبار العميقة.", descEn: "Durable, reliable deep-well pumps." },
  { img: motor, ar: "المحركات الكهربائية", en: "Electric Motors", descAr: "محركات صناعية بكفاءة عالية.", descEn: "Industrial-grade efficient motors." },
  { img: ro, ar: "أنظمة التحلية RO", en: "RO Systems", descAr: "تنقية منزلية متعددة المراحل.", descEn: "Multi-stage domestic RO systems." },
  { img: filter, ar: "الفلاتر المركزية", en: "Central Filters", descAr: "فلترة شاملة لكامل المبنى.", descEn: "Whole-house filtration." },
  { img: mist, ar: "أنظمة الضباب", en: "Mist Systems", descAr: "تبريد فعال للأماكن الخارجية.", descEn: "Effective outdoor cooling." },
];

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