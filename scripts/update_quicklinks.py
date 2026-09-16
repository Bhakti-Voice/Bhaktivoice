import re

content = '''import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PATHS } from "@/lib/seo/paths";
import {
  Compass,
  Sparkles,
  Sun,
  Flame,
  Landmark,
  BookOpen,
  ArrowUpRight,
  Clock,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";

interface HomeQuickLinksCardProps {
  locale: string;
}

interface QuickLinkItem {
  href: string;
  label: string;
  featured?: boolean;
}

interface QuickLinkCategory {
  title: string;
  icon: ReactNode;
  badge: string;
  links: QuickLinkItem[];
}

export function HomeQuickLinksCard({ locale }: HomeQuickLinksCardProps) {
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const categories: QuickLinkCategory[] = [
    // 1. Shubh Muhurats & Choghadiya
    {
      title: isTe
        ? "శుభ ముహూర్తాలు & చోఘడియా (ముహూర్త కేంద్రం)"
        : isHi
        ? "शुभ मुहूर्त एवं चौघड़िया (Muhurat Hub)"
        : "Auspicious Muhurat & Timings",
      icon: <Clock className="h-4 w-4 text-amber-600" />,
      badge: isTe ? "శుభ వేళ" : isHi ? "शुभ वेला" : "Auspicious",
      links: [
        {
          href: PATHS.choghadiya,
          label: isTe ? "నేటి చోఘడియా (పగలు & రాత్రి)" : isHi ? "आज का चौघड़िया (Day/Night)" : "Choghadiya (Day & Night)",
          featured: true,
        },
        {
          href: PATHS.hora,
          label: isTe ? "శుభ గ్రహ హోరా చక్రం" : isHi ? "शुभ ग्रह होरा चक्र" : "Shubha Planetary Hora",
          featured: true,
        },
        {
          href: PATHS.bhadra,
          label: isTe ? "భద్రా కాలం & వాస విచారం" : isHi ? "भद्रा काल एवं वास विचार" : "Bhadra Timings & Vaas",
          featured: true,
        },
        {
          href: PATHS.panchak,
          label: isTe ? "పంచక విచారం & 2026 తేదీలు" : isHi ? "पंचक विचार एवं 2026 कैलेंडर" : "Panchak Status & 2026 Dates",
          featured: true,
        },
        {
          href: PATHS.shubhDates("vivah-muhurat"),
          label: isTe ? "శుభ వివాహ ముహూర్తాలు 2026 (క్యాలెండర్)" : isHi ? "शुभ विवाह मुहूर्त 2026 (कैलेंडर)" : "Vivah Muhurat (Wedding Calendar)",
          featured: true,
        },
        {
          href: PATHS.shubhDates("griha-pravesh"),
          label: isTe ? "గృహ ప్రవేశ & వాస్తు ముహూర్తం" : isHi ? "गृह प्रवेश एवं वास्तु मुहूर्त" : "Griha Pravesh Calendar",
        },
        {
          href: PATHS.shubhDates("property-purchase"),
          label: isTe ? "ఆస్తి & భూమి రిజిస్ట్రేషన్ ముహూర్తం" : isHi ? "संपत्ति एवं भूमि रजिस्ट्री मुहूर्त" : "Property Purchase Calendar",
        },
        {
          href: PATHS.shubhDates("vehicle-purchase"),
          label: isTe ? "వాహన కొనుగోలు ముహూర్తం (కారు/బైక్)" : isHi ? "वाहन क्रय मुहूर्त (कार/बाइक कैलेंडर)" : "Vehicle Purchase Calendar",
          featured: true,
        },
        {
          href: PATHS.shubhDates("business-opening"),
          label: isTe ? "వ్యాపార ప్రారంభ & దుకాణ ముహూర్తం" : isHi ? "व्यापार एवं दुकान उद्घाटन मुहूर्त" : "Business Opening Muhurat",
        },
        {
          href: PATHS.shubhDates("gold-buying"),
          label: isTe ? "బంగారం & వెండి కొనుగోలు ముహూర్తం" : isHi ? "सोना व चांदी खरीद मुहूर्त (पुष्य योग)" : "Gold Buying Muhurat",
        },
        {
          href: PATHS.shubhDates("vidyarambha"),
          label: isTe ? "విద్యారంభ & అక్షరాభ్యాస సంస్కారం" : isHi ? "विद्यारंभ व अक्षरारंभ संस्कार" : "Vidyarambha Muhurat",
        },
        {
          href: PATHS.shubhDates("naamkaran"),
          label: isTe ? "నామకరణ సంస్కార శుభ ముహూర్తం" : isHi ? "नामकरण संस्कार शुभ मुहूर्त" : "Naamkaran Samskara Muhurat",
        },
        {
          href: PATHS.shubhDates("mundan"),
          label: isTe ? "పుట్టువెంట్రుకల ముహూర్తం (చూడాకరణం)" : isHi ? "मुंडन (चूड़ाकरण) मुहूर्त 2026" : "Mundan Ceremony Muhurat",
        },
        {
          href: PATHS.shubhDates("karnavedha"),
          label: isTe ? "కర్ణవేధ (చెవులు కుట్టే) ముహూర్తం" : isHi ? "कर्णवेध (कान छेदन) मुहूर्त" : "Karnavedha Muhurat",
        },
        {
          href: PATHS.regionalPanchang("panchang-utilities"),
          label: isTe ? "రాహు కాలం & యమగండం వేళలు" : isHi ? "राहु काल एवं यमगण्ड समय" : "Rahu Kala & Inauspicious Hours",
        },
        {
          href: PATHS.regionalPanchang("dainik-panchang"),
          label: isTe ? "అభిజిత్ ముహూర్తం (రోజువారీ శ్రేష్ఠ కాలం)" : isHi ? "अभिजित मुहूर्त (दैनिक श्रेष्ठ काल)" : "Abhijit Muhurat (Daily Best Time)",
        },
        {
          href: PATHS.regionalPanchang("chandrabalam"),
          label: isTe ? "చంద్రబలం & గోచార శుద్ధి" : isHi ? "चंद्रबलम एवं गोचर शुद्धि" : "Chandrabalam & Lunar Transit",
        },
        {
          href: PATHS.regionalPanchang("vinchudo"),
          label: isTe ? "వృశ్చిక రాశి వింఛుడో విచారం & పరిహారం" : isHi ? "विंछुड़ो विचार एवं परिहार" : "Vinchudo Dosha & Timing",
        },
        {
          href: PATHS.regionalPanchang("nakshatra"),
          label: isTe ? "నక్షత్ర తారాబలం & శుభాశుభ ఫలితాలు" : isHi ? "नक्षत्र ताराबल एवं शुभाशुभ फल" : "Nakshatra Tarabalam Grid",
        },
        {
          href: PATHS.regionalPanchang("panchang-utilities"),
          label: isTe ? "వార దిశాశూల & నివారణోపాయాలు" : isHi ? "सप्ताह के दिशाशूल एवं उपाय" : "Dishashool Directional Rules",
        },
      ],
    },

    // 2. Vrat, Upavas & Sacred Observances
    {
      title: isTe
        ? "సనాతన వ్రతాలు & ఉపవాసాలు (Vrat & Upavas)"
        : isHi
        ? "सनातन व्रत एवं उपवास (Vrat & Upavas)"
        : "Sacred Vrats & Fasting Days",
      icon: <Flame className="h-4 w-4 text-orange-600" />,
      badge: isTe ? "భక్తి & తపస్సు" : isHi ? "तप व पुण्य" : "Devotion",
      links: [
        {
          href: PATHS.festivals,
          label: isTe ? "ఏకాదశి వ్రతం & పారణ సమయాలు (24 ఏకాదశులు)" : isHi ? "एकादशी व्रत एवं पारण समय (२४ एकादशी)" : "Ekadashi Vrat & Parana Dates",
          featured: true,
        },
        {
          href: PATHS.festivals,
          label: isTe ? "ప్రదోష వ్రతం (త్రయోదశి శివ పూజ)" : isHi ? "प्रदोष व्रत (त्रयोदशी शिव पूजा)" : "Pradosh Vrat (Shiva Twilight)",
        },
        {
          href: PATHS.festivals,
          label: isTe ? "సంకష్టహర చతుర్థి (చంద్రోదయ గణపతి పూజ)" : isHi ? "संकष्टी चतुर्थी (चंद्रोदय गणेश पूजा)" : "Sankashti Chaturthi Dates",
        },
        {
          href: PATHS.festivals,
          label: isTe ? "మాస శివరాత్రి వ్రత విధానం" : isHi ? "मासिक शिवरात्रि व्रत विधान" : "Masik Shivratri Vrat",
        },
        {
          href: PATHS.festivals,
          label: isTe ? "పౌర్ణమి వ్రతం & శ్రీ సత్యనారాయణ స్వామి కథ" : isHi ? "पूर्णिमा व्रत एवं श्री सत्यनारायण कथा" : "Purnima Vrat & Satyanarayan Puja",
          featured: true,
        },
        {
          href: PATHS.festivals,
          label: isTe ? "అమావాస్య & పితృ తర్పణ శ్రాద్ధం" : isHi ? "अमावस्या एवं पितृ तर्पण श्राद्ध" : "Amavasya Pitru Tarpan Dates",
        },
        {
          href: PATHS.festivals,
          label: isTe ? "శారదీయ & చైత్ర నవరాత్రి వ్రతాలు" : isHi ? "शारदीय व चैत्र नवरात्रि उपवास" : "Navratri 9 Days Vrat & Ghatasthapana",
        },
        {
          href: PATHS.calendar,
          label: isTe ? "రోహిణి వ్రతం & జైన పచ్చక్ఖాణ్" : isHi ? "रोहिणी व्रत एवं जैन पच्चक्खाण" : "Rohini Vrat & Ascetic Observances",
        },
        {
          href: PATHS.calendar,
          label: isTe ? "సంపూర్ణ నెలవారీ వ్రత-పండుగల క్యాలెండర్ 2026" : isHi ? "सम्पूर्ण मासिक व्रत-पर्व कैलेंडर 2026" : "Monthly Vrat & Festival Calendar 2026",
        },
      ],
    },

    // 3. Panchang & Vedic Calendars
    {
      title: isTe
        ? "వైదిక పంచాంగం & ప్రాంతీయ క్యాలెండర్లు"
        : isHi
        ? "वैदिक पंचांग एवं क्षेत्रीय पंजिका"
        : "Panchang & Regional Calendars",
      icon: <Sun className="h-4 w-4 text-amber-700" />,
      badge: isTe ? "లైవ్ పంచాంగం" : isHi ? "लाइव काल" : "Ephemeris",
      links: [
        {
          href: PATHS.panchangToday,
          label: isTe ? "నేటి దిన పంచాంగం (Live)" : isHi ? "आज का दैनिक पंचांग (Live)" : "Today's Panchang (Live)",
          featured: true,
        },
        {
          href: PATHS.panchangTomorrow,
          label: isTe ? "రేపటి ముందస్తు పంచాంగం" : isHi ? "कल का अग्रिम पंचांग" : "Tomorrow's Advance Panchang",
        },
        {
          href: PATHS.panchangYesterday,
          label: isTe ? "నిన్నటి పంచాంగ వివరాలు" : isHi ? "बीते दिवस का पंचांग" : "Yesterday's Panchang Record",
        },
        {
          href: PATHS.calendar,
          label: isTe ? "హిందూ క్యాలెండర్ 2026 (సంవత్సరం)" : isHi ? "हिन्दू कैलेंडर 2026 (संवत्सर)" : "Hindu Calendar 2026 (Vikram Samvat)",
          featured: true,
        },
        {
          href: PATHS.tithi,
          label: isTe ? "నేటి తిథి & చంద్ర కళలు" : isHi ? "आज की तिथि एवं चंद्र कला" : "Aaj Ki Tithi & Lunar Phase",
        },
        {
          href: PATHS.regionalPanchang("month-panchang"),
          label: isTe ? "నెలవారీ పంచాంగం (అమాంత/పూర్ణిమాంత)" : isHi ? "मासिक पंचांग (पूर्णिमान्त/अमान्त)" : "Month Panchang (Full Grid)",
        },
        {
          href: PATHS.regionalPanchang("dainik-panchang"),
          label: isTe ? "దిన పంచాంగం 5 అంగాల వివరాలు" : isHi ? "दैनिक पंचांग ५ अंग विवरण" : "Dainik Panchang 5 Limbs",
        },
        {
          href: PATHS.regionalPanchang("gujarati-panchang"),
          label: isTe ? "గుజరాతీ పంచాంగం" : isHi ? "गुजराती पंचांग (विक्रम संवत)" : "Gujarati Panchang",
        },
        {
          href: PATHS.regionalPanchang("marathi-panchang"),
          label: isTe ? "మరాఠీ పంచాంగం (శాలివాహన శక)" : isHi ? "मराठी पंचांग (शालिवाहन शक)" : "Marathi Panchang",
        },
        {
          href: PATHS.regionalPanchang("bengali-panjika"),
          label: isTe ? "బెంగాలీ పంజిక" : isHi ? "बंगाली पंजिका (सूर्याब्द)" : "Bengali Panjika",
        },
        {
          href: PATHS.regionalPanchang("tamil-panchangam"),
          label: isTe ? "తమిళ పంచాంగం (సౌర మానం)" : isHi ? "तमिल पंचांगम (सौर मास)" : "Tamil Panchangam",
        },
        {
          href: PATHS.regionalPanchang("iskcon-panchang"),
          label: isTe ? "ఇస్కాన్ వైష్ణవ క్యాలెండర్ (గౌరాబ్ద)" : isHi ? "इस्कॉन वैष्णव कैलेंडर (गौराब्द)" : "ISKCON Gaurabda Calendar",
        },
      ],
    },

    // 4. Spiritual Sadhana, Mantras & Sacred Gita
    {
      title: isTe
        ? "సాధన, నామ జపం & శ్రీమద్భగవద్గీత"
        : isHi
        ? "साधना, नाम जप एवं श्रीमद्भगवद्गीता"
        : "Sadhana, Mantras & Gita",
      icon: <BookOpen className="h-4 w-4 text-emerald-700" />,
      badge: isTe ? "ఆత్మోద్ధరణ" : isHi ? "आत्मोद्धार" : "Spiritual",
      links: [
        {
          href: PATHS.gita,
          label: isTe ? "శ్రీమద్భగవద్గీత (18 అధ్యాయాలు, 700 శ్లోకాలు)" : isHi ? "श्रीमद्भगवद्गीता (१८ अध्याय, ७०० श्लोक)" : "Srimad Bhagavad Gita (18 Chapters)",
          featured: true,
        },
        {
          href: PATHS.naamJaap,
          label: isTe ? "ఆన్‌లైన్ నామ జప కౌంటర్" : isHi ? "ऑनलाइन नाम जप काउंटर" : "Online Naam Jaap Counter",
          featured: true,
        },
        {
          href: PATHS.mala,
          label: isTe ? "108 మణుల డిజిటల్ జపమాల" : isHi ? "१०८ मनकों की डिजिटल जप माला" : "108 Japa Mala Digital Counter",
        },
        {
          href: PATHS.sadhana,
          label: isTe ? "నిత్య ఆధ్యాత్మిక సాధన మందిరం" : isHi ? "दैनिक आध्यात्मिक साधना कक्ष" : "Daily Sadhana Sanctuary",
        },
        {
          href: PATHS.sankalp,
          label: isTe ? "పవిత్ర వైదిక సంకల్ప పత్రం" : isHi ? "पावन वैदिक संकल्प पत्र" : "Sacred Vedic Sankalp",
        },
        {
          href: PATHS.diary,
          label: isTe ? "భక్తి సాధన డైరీ" : isHi ? "दैनिक भक्ति डायरी" : "Devotional Spiritual Diary",
        },
        {
          href: PATHS.mantras,
          label: isTe ? "మహామంత్రాల సంగ్రహం (హరే కృష్ణ, ఓం నమః శివాయ)" : isHi ? "महामंत्र संग्रह (हरे कृष्ण, ॐ नमः शिवाय)" : "Sacred Mahamantra Collection",
          featured: true,
        },
        {
          href: PATHS.spirituality,
          label: isTe ? "సనాతన ఆధ్యాత్మిక జ్ఞానం & తత్వ దర్శనం" : isHi ? "सनातन आध्यात्मिक ज्ञान एवं दर्शन" : "Sanatana Spiritual Wisdom",
        },
      ],
    },

    // 5. Katha, Temples & Sacred Yatra
    {
      title: isTe
        ? "గాథలు, పుణ్యక్షేత్రాలు & తీర్థయాత్ర"
        : isHi
        ? "कथा, मंदिर दर्शन एवं तीर्थ यात्रा"
        : "Katha, Temples & Yatra",
      icon: <Landmark className="h-4 w-4 text-rose-700" />,
      badge: isTe ? "తీర్థ దర్శనం" : isHi ? "तीर्थ दर्शन" : "Pilgrimage",
      links: [
        {
          href: PATHS.katha,
          label: isTe ? "పౌరాణిక కథలు & వ్రత కథల సంగ్రహం" : isHi ? "पौराणिक कथाएं एवं व्रत कथा संग्रह" : "Puranic Katha & Vrat Katha",
          featured: true,
        },
        {
          href: PATHS.temples,
          label: isTe ? "భారతదేశ ప్రముఖ పుణ్యక్షేత్రాలు & దర్శనం" : isHi ? "भारत के प्रमुख दिव्य मन्दिर" : "Sacred Hindu Temples Directory",
        },
        {
          href: PATHS.festivals,
          label: isTe ? "ప్రముఖ హిందూ పండుగలు & ఉత్సవాలు 2026" : isHi ? "प्रमुख हिन्दू पर्व एवं उत्सव 2026" : "All Hindu Festivals 2026",
          featured: true,
        },
        {
          href: PATHS.yatra,
          label: isTe ? "చార్ ధామ్ & జ్యోతిర్లింగ యాత్రా మార్గదర్శి" : isHi ? "चार धाम एवं ज्योतिर्लिंग यात्रा गाइड" : "Char Dham & Jyotirlinga Guides",
        },
        {
          href: PATHS.yatraPlanner,
          label: isTe ? "తీర్థయాత్ర రూట్ & బడ్జెట్ ప్లానర్" : isHi ? "तीर्थ यात्रा मार्ग एवं बजट प्लानर" : "Yatra Route & Budget Planner",
        },
        {
          href: PATHS.blog,
          label: isTe ? "భక్తి వాయిస్ ఆధ్యాత్మిక బ్లాగ్" : isHi ? "भक्ति वॉइस आध्यात्मिक ब्लॉग" : "Bhakti Voice Spiritual Blog",
        },
        {
          href: PATHS.community,
          label: isTe ? "ప్రపంచవ్యాప్త భక్త సమాజం" : isHi ? "विश्वव्यापी भक्त समुदाय" : "Global Devotee Community",
        },
        {
          href: PATHS.store,
          label: isTe ? "పవిత్ర భక్తి స్టోర్ (పూజా సామగ్రి & పుస్తకాలు)" : isHi ? "पवित्र भक्ति स्टोर (पूजा सामग्री व पुस्तकें)" : "Bhakti Store (Pooja Items & Books)",
        },
      ],
    },

    // 6. Aarti, Chalisa, Bhajans & Vedic Astrology Tools
    {
      title: isTe
        ? "హారతులు, చాలీసా, భజనలు & జ్యోతిష్యం"
        : isHi
        ? "आरती, चालीसा, भजन एवं ज्योतिष टूल्स"
        : "Aarti, Chalisa, Bhajan & Tools",
      icon: <Sparkles className="h-4 w-4 text-purple-700" />,
      badge: isTe ? "స్తుతి & టూల్స్" : isHi ? "स्तुति व टूल्स" : "Devotion & Tools",
      links: [
        {
          href: PATHS.aarti,
          label: isTe ? "సంపూర్ణ నిత్య హారతుల సంగ్రహం" : isHi ? "सम्पूर्ण नित्य आरती संग्रह" : "Complete Aarti Sangrah",
          featured: true,
        },
        {
          href: PATHS.chalisa,
          label: isTe ? "చాలీసా సంగ్రహం (హనుమాన్, శివ, దుర్గ)" : isHi ? "चालीसा संग्रह (हनुमान, शिव, दुर्गा)" : "Chalisa Sangrah (Hanuman, Shiva)",
        },
        {
          href: PATHS.bhajan,
          label: isTe ? "మధుర భజనలు, సంకీర్తన & లిరిక్స్" : isHi ? "मधुर भजन, संकीर्तन एवं लिरिक्स" : "Bhajans, Kirtan & Lyrics",
        },
        {
          href: PATHS.quotes,
          label: isTe ? "దైవిక సువిచారాలు & సూక్తులు" : isHi ? "दैनिक प्रेरक सुविचार एवं श्लोक" : "Daily Spiritual Quotes & Thoughts",
        },
        {
          href: PATHS.suvicharMaker,
          label: isTe ? "సువిచార కార్డ్ & స్టేటస్ మేకర్" : isHi ? "सुविचार कार्ड व स्टेटस मेकर" : "Suvichar Status & Card Maker",
          featured: true,
        },
        {
          href: PATHS.kundli,
          label: isTe ? "ఉచిత వైదిక జన్మ కుండలి" : isHi ? "मुफ्त वैदिक जन्म कुंडली" : "Free Vedic Kundli Horoscope",
        },
        {
          href: PATHS.kundliMilan,
          label: isTe ? "36 గుణ అష్టకూట మిలనం (వివాహ పొంతన)" : isHi ? "३६ गुण अष्टकूट मिलान" : "36 Guna Kundli Milan",
        },
        {
          href: PATHS.spiritualTools,
          label: isTe ? "అన్ని వైదిక & ఆధ్యాత్మిక టూల్స్ →" : isHi ? "सभी वैदिक व आध्यात्मिक उपकरण →" : "All Vedic Spiritual Tools →",
        },
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 lg:px-8" id="quick-navigation">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#fffdf9] to-[#fff8f0] p-5 shadow-xs ring-1 ring-amber-500/15 sm:p-6 lg:p-7">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-saffron">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-ink sm:text-xl">
                {isTe
                  ? "త్వరిత నావిగేషన్ హబ్ (Quick Navigation Hub) — సంపూర్ణ సనాతన డైరెక్టరీ"
                  : isHi
                  ? "त्वरित नेविगेशन हब (Quick Navigation Hub) — सम्पूर्ण सनातन डायरेक्टरी"
                  : "Quick Navigation Hub — Complete Sanatana Directory"}
              </h2>
              <p className="mt-0.5 text-xs text-muted sm:text-sm">
                {isTe
                  ? "శుభ ముహూర్తాలు, దిన పంచాంగం, ఏకాదశి-ప్రదోష వ్రతాలు, భగవద్గీత, నామ జపం, ఆలయాలు, హారతులు & వైదిక జ్యోతిష్యానికి ప్రామాణిక వేదిక"
                  : isHi
                  ? "शुभ मुहूर्त, दैनिक पंचांग, एकादशी-प्रदोष व्रत, श्रीमद्भगवद्गीता, नाम जप, मंदिर, आरती एवं वैदिक ज्योतिष का प्रामाणिक प्रवेश द्वार"
                  : "Direct access to Auspicious Muhurat, Daily Panchang, Ekadashi Vrats, Bhagavad Gita, Naam Jaap, Temples & Vedic Astrology Tools"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            <span>
              {isTe
                ? "60+ ప్రామాణిక వైదిక సేవలు & పేజీలు"
                : isHi
                ? "60+ प्रामाणिक वैदिक सेवाएं व पृष्ठ"
                : "60+ Authentic Vedic Services & Pages"}
            </span>
          </div>
        </div>

        {/* 6-Column / Responsive Quick Links Grid */}
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl bg-white/70 p-4 ring-1 ring-amber-500/10 transition-all hover:bg-white hover:shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between border-b border-amber-500/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                    {cat.icon}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-ink/90">
                    {cat.title}
                  </span>
                </div>
                <span className="rounded-md bg-amber-100/70 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  {cat.badge}
                </span>
              </div>

              <ul className="flex flex-col space-y-1">
                {cat.links.map((link, lIdx) => (
                  <li key={`${link.href}-${lIdx}`}>
                    <LocaleLink
                      href={link.href}
                      className="group flex items-center justify-between rounded-xl px-2.5 py-1.5 text-sm sm:text-[14.5px] font-medium text-ink/80 transition hover:bg-amber-50/80 hover:text-saffron-deep"
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 group-hover:bg-saffron" />
                        <span className="line-clamp-1">{link.label}</span>
                      </span>
                      {link.featured ? (
                        <span className="shrink-0 rounded-md bg-amber-50 px-2 py-0.5 text-[10.5px] font-bold text-amber-800 ring-1 ring-amber-300/60">
                          {isTe ? "ప్రత్యేకం" : isHi ? "दिव्य" : "Featured"}
                        </span>
                      ) : (
                        <ArrowUpRight className="h-3 w-3 text-stone-300 opacity-0 transition group-hover:text-saffron group-hover:opacity-100" />
                      )}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer info ribbon */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-amber-500/10 pt-4 text-xs text-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>
              {isTe
                ? "శ్రీ సనాతన ధర్మ ప్రామాణిక గ్రంథాలు, దృక్-సిద్ధాంత పంచాంగం & పురాణ శాస్త్రాల ఆధారంగా నిర్మించబడినది"
                : isHi
                ? "श्री सनातन धर्म प्रामाणिक ग्रंथ, दृక్-सिद्धांत पंचांग एवं पौराणिक शास्त्रों के आधार पर निर्मित"
                : "Curated strictly in accordance with classical Drik-Ganita astronomy & Vedic scriptures."}
            </span>
          </div>
          <div className="flex items-center gap-3 font-semibold text-saffron-deep">
            <LocaleLink href={PATHS.panchangToday} className="hover:underline">
              {isTe ? "దిన పంచాంగం →" : isHi ? "दैनिक पंचांग →" : "Daily Panchang →"}
            </LocaleLink>
            <LocaleLink href={PATHS.muhurat} className="hover:underline">
              {isTe ? "ముహూర్త కేంద్రం →" : isHi ? "मुहूर्त हब →" : "Muhurat Hub →"}
            </LocaleLink>
            <LocaleLink href={PATHS.calendar} className="hover:underline">
              {isTe ? "క్యాలెండర్ 2026 →" : isHi ? "कैलेंडर 2026 →" : "Calendar 2026 →"}
            </LocaleLink>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

with open('src/components/home/HomeQuickLinksCard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("HomeQuickLinksCard.tsx updated successfully!")
