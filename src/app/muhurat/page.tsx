import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getLocale } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { getPanchang } from "@/lib/panchang/engine";
import { DEFAULT_CITY } from "@/lib/panchang/cities";
import { renderRichMarkdownHtml } from "@/lib/text/markdown-tables";
import {
  Clock,
  Sparkles,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Info,
  ArrowRight,
  Heart,
  Home,
  Building,
  Car,
  Compass,
} from "lucide-react";

export const revalidate = 1800; // 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? "शुभ मुहूर्त 2026 — चौघड़िया, विवाह, गृह प्रवेश, वाहन, संपत्ति क्रय एवं शुभ होरा"
    : "Shubh Muhurat 2026 — Choghadiya, Marriage, Griha Pravesh, Property, Vehicle & Hora";

  const description = isHi
    ? "वैदिक दृक सिद्धान्त पर आधारित दैनिक शुभ मुहूर्त, दिन-रात का चौघड़िया, आज का अभिजित मुहूर्त, राहु काल, विवाह मुहूर्त 2026, गृह प्रवेश, वाहन क्रय एवं सर्वार्थ सिद्धि योग।"
    : "Comprehensive Vedic Shubh Muhurat guide. Calculate today's Day & Night Choghadiya, Abhijit Muhurat, Rahu Kaal, 2026 Marriage dates, Griha Pravesh, Vehicle & Property Purchase.";

  return localizedMetadata({
    title,
    description,
    path: PATHS.muhurat,
    keywords: isHi
      ? [
          "शुभ मुहूर्त 2026",
          "आज का चौघड़िया",
          "विवाह मुहूर्त 2026",
          "गृह प्रवेश मुहूर्त",
          "अभिजित मुहूर्त समय",
          "राहु काल आज",
          "वाहन क्रय मुहूर्त",
          "संपत्ति खरीद मुहूर्त",
          "शुभ ग्रह होरा",
          "गौरी पंचांगम",
          "जैन पच्चक्खाण",
          "सर्वार्थ सिद्धि योग",
        ]
      : [
          "shubh muhurat 2026",
          "choghadiya today",
          "marriage muhurat 2026",
          "griha pravesh dates 2026",
          "abhijit muhurat timing",
          "rahu kaal timing",
          "vehicle purchase muhurat",
          "property purchase dates",
          "gowri panchangam",
          "shubha hora",
          "sarvartha siddhi yoga",
        ],
  });
}

const FAQS_HI = [
  {
    question: "मुहूर्त क्या है और इसका दैनिक जीवन में क्या महत्व है?",
    answer:
      "वैदिक काल गणना में ४८ मिनट की कालावधि को एक 'मुहूर्त' कहा जाता है (दिन और रात में कुल ३० मुहूर्त होते हैं)। किसी भी महत्वपूर्ण कार्य, संस्कार अथवा व्यावसायिक यात्रा को ब्रह्मांडीय अनुकूलता के क्षण में आरंभ करने से विघ्न टलते हैं और अभीष्ट सफलता मिलती है।",
  },
  {
    question: "चौघड़िया में कौन-से समय शुभ और कौन-से त्याज्य माने गए हैं?",
    answer:
      "चौघड़िया के सात प्रकारों में 'अमृत' (सर्वोत्तम), 'शुभ' (मांगलिक), 'लाभ' (व्यापारिक उन्नति), और 'चर' (यात्रा व गतिशीलता) को शुभ माना गया है। जबकि 'रोग', 'काल' और 'उद्वेग' को अशुभ मानकर इन अवधियों में नए कार्यों का आरंभ त्याज्य कहा गया है।",
  },
  {
    question: "अभिजित मुहूर्त को सर्वदोष निवारक क्यों माना गया है?",
    answer:
      "अभिजित मुहूर्त प्रतिदिन मध्याह्न काल के लगभग २४ मिनट पूर्व से २४ मिनट पश्चात् तक (सूर्य के उच्चतम बिंदु पर) रहता है। इसे भगवान श्रीहरि विष्णु के सुदर्शन चक्र का सुरक्षा कवच प्राप्त है, जिससे अधिकांश सामान्य ग्रह-दोष स्वतः शांत हो जाते हैं।",
  },
  {
    question: "विवाह एवं गृह प्रवेश मुहूर्त में त्रिबल शुद्धि क्या है?",
    answer:
      "वर-वधू के लिए सूर्य, चन्द्रमा और बृहस्पति का गोचर में अनुकूल होना 'त्रिबल शुद्धि' कहलाता है। सूर्य से आत्मबल, चन्द्र से मानसिक शांति, और गुरु से दांपत्य व संतति का सुख सिद्ध होता है।",
  },
];

const FAQS_EN = [
  {
    question: "What is a Muhurat and why is it essential in Vedic Astrology?",
    answer:
      "A Muhurat is a Vedic time unit lasting approximately 48 minutes (there are 30 Muhurats in a 24-hour solar day). Choosing an auspicious Muhurat harmonizes human actions with planetary vibrations, mitigating potential obstacles and enhancing prosperity.",
  },
  {
    question: "Which Choghadiya periods are auspicious and which should be avoided?",
    answer:
      "Among the seven Choghadiya periods: Amrit (supreme nectar), Shubh (auspicious for rituals), Labh (prosperity & commerce), and Char (favorable for travel) are auspicious. Rog (disease), Kaal (destructive), and Udveg (anxiety) are inauspicious and should be avoided for new beginnings.",
  },
  {
    question: "Why is Abhijit Muhurat considered all-protective?",
    answer:
      "Occurring around solar noon (approx. 24 minutes before to 24 minutes after), Abhijit Muhurat is blessed by Lord Vishnu. It holds the power to neutralize minor celestial doshas, making it the most dependable daily window.",
  },
  {
    question: "What is Tribala Shuddhi for Marriage and Griha Pravesh?",
    answer:
      "Tribala Shuddhi requires the auspicious alignment of the Sun, the Moon, and Jupiter in the transit horoscope of the couple. The Sun grants vitality, the Moon grants mental tranquility, and Jupiter ensures enduring wisdom and progeny.",
  },
];

export default async function MuhuratHubPage() {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const today = new Date();
  const panchang = getPanchang(today, DEFAULT_CITY);

  const crumbs = localizedCrumbs(
    isHi ? "होम" : "Home",
    [isHi ? "शुभ मुहूर्त" : "Shubh Muhurat", PATHS.muhurat]
  );

  return (
    <div className="min-h-screen bg-[#faf6f0] text-ink pb-16">
      <PageHero
        title={isHi ? "वैदिक शुभ मुहूर्त एवं चौघड़िया डायरेक्टरी 2026" : "Vedic Shubh Muhurat & Timings Directory 2026"}
        crumbs={crumbs}
        ornament
      >
        <p className="mt-3 text-xs sm:text-sm text-ink/75 max-w-3xl leading-relaxed">
          {isHi
            ? "दैनिक चौघड़िया, शुभ ग्रह होरा, अभिजित मुहूर्त, विवाह मुहूर्त, गृह प्रवेश, संपत्ति व वाहन क्रय के सटीक एवं शास्त्रोक्त मुहूर्त। 100% प्रामाणिक दृक सिद्धान्त गणना।"
            : "Precision Vedic electional astrology (Muhurat Shastra). Instant Day & Night Choghadiya, Shubha Hora, Abhijit Muhurat, Vivah Muhurat 2026, Griha Pravesh, Property and Vehicle purchase dates."}
        </p>
      </PageHero>

      <main className="mx-auto max-w-7xl px-4 pt-6 lg:px-8 space-y-10">
        {/* Real-time Muhurat Snapshot Widget */}
        <section className="rounded-3xl bg-gradient-to-br from-white via-[#fffdf9] to-[#fff8f0] p-6 ring-1 ring-amber-500/15 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-saffron">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-ink sm:text-lg">
                  {isHi ? "आज के प्रमुख काल एवं मुहूर्त" : "Today's Key Muhurat Windows"}
                </h2>
                <p className="text-xs text-muted">
                  {DEFAULT_CITY.name} ({DEFAULT_CITY.state}) • {today.toLocaleDateString(isHi ? "hi-IN" : "en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full ring-1 ring-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isHi ? "दृक गणित सम्मत" : "Accurate Ephemeris"}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Abhijit */}
            <div className="rounded-2xl bg-amber-50/70 p-4 ring-1 ring-amber-300/60 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-amber-200/60 px-2 py-0.5 text-[10px] font-bold text-amber-900 uppercase">
                  {isHi ? "परम शुभ काल" : "Highly Auspicious"}
                </span>
                <h3 className="mt-2 font-serif text-sm font-bold text-ink">
                  {isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}
                </h3>
                <p className="mt-1 text-xs font-semibold text-saffron-deep">
                  {panchang.abhijitMuhurat ? `${panchang.abhijitMuhurat.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${panchang.abhijitMuhurat.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : (isHi ? "आज उपलब्ध नहीं" : "Not today")}
                </p>
              </div>
              <p className="mt-3 text-[11px] text-muted">
                {isHi ? "सभी मांगलिक कार्यों एवं विजय प्राप्ति हेतु श्रेष्ठ।" : "Superior window for initiating any auspicious work."}
              </p>
            </div>

            {/* Amrit Kaal */}
            <div className="rounded-2xl bg-emerald-50/70 p-4 ring-1 ring-emerald-300/60 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-emerald-200/60 px-2 py-0.5 text-[10px] font-bold text-emerald-900 uppercase">
                  {isHi ? "अमृत वेला" : "Nectar Period"}
                </span>
                <h3 className="mt-2 font-serif text-sm font-bold text-ink">
                  {isHi ? "अमृत काल" : "Amrit Kaal"}
                </h3>
                <p className="mt-1 text-xs font-semibold text-emerald-700">
                  {panchang.amritKaal ? `${panchang.amritKaal.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${panchang.amritKaal.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : (isHi ? "रात्रि कालीन" : "Night window")}
                </p>
              </div>
              <p className="mt-3 text-[11px] text-muted">
                {isHi ? "आरोग्य, मंत्र सिद्धि व महत्वपूर्ण अनुष्ठान हेतु।" : "Ideal for healing remedies, japa, and milestones."}
              </p>
            </div>

            {/* Brahma Muhurat */}
            <div className="rounded-2xl bg-purple-50/70 p-4 ring-1 ring-purple-300/60 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-purple-200/60 px-2 py-0.5 text-[10px] font-bold text-purple-900 uppercase">
                  {isHi ? "साधना काल" : "Spiritual Dawn"}
                </span>
                <h3 className="mt-2 font-serif text-sm font-bold text-ink">
                  {isHi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat"}
                </h3>
                <p className="mt-1 text-xs font-semibold text-purple-700">
                  {panchang.brahmaMuhurat ? `${panchang.brahmaMuhurat.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${panchang.brahmaMuhurat.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : (isHi ? "प्रातः काल" : "Dawn period")}
                </p>
              </div>
              <p className="mt-3 text-[11px] text-muted">
                {isHi ? "योग, प्राणायाम, ध्यान एवं भगवन्नाम जप के लिए।" : "Optimal window for meditation, study, and japa."}
              </p>
            </div>

            {/* Rahu Kaal */}
            <div className="rounded-2xl bg-rose-50/70 p-4 ring-1 ring-rose-300/60 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-rose-200/60 px-2 py-0.5 text-[10px] font-bold text-rose-900 uppercase">
                  {isHi ? "अशुभ वेला (त्याज्य)" : "Inauspicious (Avoid)"}
                </span>
                <h3 className="mt-2 font-serif text-sm font-bold text-ink">
                  {isHi ? "राहु काल" : "Rahu Kaal"}
                </h3>
                <p className="mt-1 text-xs font-semibold text-rose-700">
                  {panchang.rahuKaal ? `${panchang.rahuKaal.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${panchang.rahuKaal.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "--"}
                </p>
              </div>
              <p className="mt-3 text-[11px] text-muted">
                {isHi ? "नए अनुबंध, यात्रा व धन लेनदेन से परहेज करें।" : "Avoid new travel, major agreements, or financial risk."}
              </p>
            </div>
          </div>

        </section>

        {/* 15 Dedicated Muhurat Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Choghadiya */}
          <div id="choghadiya" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Sun className="h-5 w-5 text-amber-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "दिन व रात का चौघड़िया" : "Day & Night Choghadiya"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "दिनमान और रात्रिमान को आठ बराबर भागों में बाँटकर अमृत, शुभ, लाभ, चर (शुभ) तथा रोग, काल, उद्वेग (अशुभ) वेलाओं का निर्णय। किसी भी आकस्मिक कार्य के लिए चौघड़िया सर्वोत्तम मार्गदर्शक है।"
                : "The division of diurnal and nocturnal spans into 8 equal parts to compute Amrut, Shubh, Labh, Char (favorable) and Rog, Kaal, Udveg (unfavorable) intervals for timely execution."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-saffron-deep">
                {isHi ? "अमृत • शुभ • लाभ • चर" : "Amrut • Shubh • Labh • Char"}
              </span>
              <LocaleLink
                href="/panchang/panchang-utilities"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "चौघड़िया तालिका →" : "View Table →"}
              </LocaleLink>
            </div>
          </div>

          {/* 2. Shubha Hora */}
          <div id="shubha-hora" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Clock className="h-5 w-5 text-orange-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "शुभ ग्रह होरा चक्र" : "Planetary Hora Calculator"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "सूर्योदय से अगले सूर्योदय तक २४ घंटों में प्रत्येक घंटे का आधिपत्य एक विशिष्ट ग्रह के अधीन होता है। गुरु होरा में विद्या-अध्ययन, शुक्र होरा में आभूषण व कला, तथा सूर्य होरा में सरकारी कार्य सिद्ध होते हैं।"
                : "24-hour planetary ruler cycle based on local sunrise. Tune financial transactions to Jupiter/Venus horas, administrative work to Sun hora, and intellectual studies to Mercury hora."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-800">
                {isHi ? "२४ घंटे का ग्रह प्रभाव" : "24-Hour Planetary Clock"}
              </span>
              <LocaleLink
                href="/panchang/panchang-utilities"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "होरा चक्र देखें →" : "Calculate Hora →"}
              </LocaleLink>
            </div>
          </div>

          {/* 3. Vivah Muhurat */}
          <div id="vivah-muhurat" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Heart className="h-5 w-5 text-rose-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "शुभ विवाह मुहूर्त 2026" : "Vivah Muhurat 2026 (Weddings)"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "शास्त्र सम्मत त्रिबल शुद्धि (सूर्य, चंद्र, गुरु बल), बाण दोष रहित शुद्ध लग्न, गुरु-शुक्र अस्त काल (तारा डूबना) का परिहार, और देवशयनी एकादशी से चातुर्मास के नियमों का पूर्ण पालन।"
                : "Classical wedding dates incorporating Tribala Shuddhi (Sun, Moon, Jupiter transit strength), Ashtama Shuddhi, avoidance of combust planets (Guru/Shukra Astha), and Chaturmasya regulations."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-rose-800">
                {isHi ? "माह-दर-माह विवाह तिथियाँ" : "Monthly Wedding Calendar"}
              </span>
              <LocaleLink
                href="/panchang/month-panchang"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "विवाह तिथियाँ →" : "Wedding Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 4. Griha Pravesh */}
          <div id="griha-pravesh" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Home className="h-5 w-5 text-emerald-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "गृह प्रवेश एवं वास्तु मुहूर्त" : "Griha Pravesh Muhurat (Housewarming)"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "नवीन निर्मित भवन में प्रवेश (अपूर्व), पुनर्निर्मित गृह में प्रवेश (सपूर्व), तथा यात्रा उपरांत प्रवेश (द्वंद्व)। वास्तु चक्र के अनुकूल उत्तरायण काल एवं स्थिर लग्न में गृह प्रवेश परम कल्याणकारी है।"
                : "Apurva, Sapurva, and Dwandwa housewarming muhurats. Ideal when the Sun is in Uttarayana, aligned with stable fixed ascendants (Sthira Lagna like Taurus, Leo, Scorpio, Aquarius)."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-800">
                {isHi ? "वास्तु शुद्धि एवं स्थिर लग्न" : "Vastu Sthira Lagna"}
              </span>
              <LocaleLink
                href="/panchang/month-panchang"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "गृह प्रवेश तिथियाँ →" : "Housewarming Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 5. Property Purchase */}
          <div id="property-purchase" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Building className="h-5 w-5 text-indigo-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "संपत्ति एवं भूमि रजिस्ट्री मुहूर्त" : "Property Purchase & Registry"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "भूमि, प्लॉट, फ्लैट अथवा व्यावसायिक संपत्ति के बयाना, अनुबंध एवं रजिस्ट्री हेतु शुभ नक्षत्र (मृगशिरा, पुनर्वसु, मघा, विशाखा, अनुराधा, शतभिषा, रेवती) एवं रिक्ता तिथि परिहार।"
                : "Favorable constellations for property registration, land agreement signings, and deed execution free from Rikta tithis (4th, 9th, 14th) and Vishti (Bhadra) karana."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-indigo-800">
                {isHi ? "भूमि व फ्लैट रजिस्ट्री" : "Land & Real Estate"}
              </span>
              <LocaleLink
                href="/panchang/month-panchang"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "रजिस्ट्री मुहूर्त →" : "Registry Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 6. Vehicle Purchase */}
          <div id="vehicle-purchase" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Car className="h-5 w-5 text-teal-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "वाहन क्रय मुहूर्त (कार/बाइक)" : "Vehicle Purchase Muhurat"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "कार, दोपहिया अथवा व्यावसायिक वाहन क्रय करने एवं शोरूम से डिलीवरी लेने हेतु शुभ चर नक्षत्र (स्वाति, पुनर्वसु, श्रवण, धनिष्ठा, शतभिषा) और चंद्रमा का चतुर्थ भाव में दोषमुक्त होना।"
                : "Auspicious moments for vehicle delivery, booking, and keys handover based on movable (Chara) stars and ensuring the 4th house from transit Moon is unburdened by afflictions."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-teal-800">
                {isHi ? "सुरक्षित एवं सुखद यात्रा" : "Safe Vehicle Delivery"}
              </span>
              <LocaleLink
                href="/panchang/month-panchang"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "वाहन मुहूर्त →" : "Vehicle Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 7. Lagna Table */}
          <div id="lagna-table" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Compass className="h-5 w-5 text-amber-700" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "दैनिक लग्न तालिका" : "Daily Lagna Table (Ascendant)"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "पूर्वांचल क्षितिज पर २४ घंटे में १२ राशियों का उदय होता है जिसे 'लग्न' कहते हैं। चर, स्थिर एवं द्विस्वभाव लग्न के आधार पर कर्म की प्रकृति तय होती है। स्थिर लग्न दीर्घकालिक कार्यों हेतु सर्वोत्तम है।"
                : "Exact calculation of the 12 rising signs throughout the 24-hour cycle. Fixed signs (Sthira Lagna) are preferred for permanence; dual signs (Dwiswabhava) for knowledge and spiritual endeavors."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-900">
                {isHi ? "१२ राशियों का उदय काल" : "12 Ascendant Spans"}
              </span>
              <LocaleLink
                href="/panchang/dainik-panchang"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "लग्न तालिका →" : "View Lagna →"}
              </LocaleLink>
            </div>
          </div>

          {/* 8. Gowri Panchangam */}
          <div id="gowri-panchangam" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "गौरी पंचांगम" : "Gowri Panchangam"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "दक्षिण भारत की अत्यंत प्रतिष्ठित पद्धति जिसमें दिन और रात को अमृत, उति, लाभ, शुभ, रोग, विषम, चोर और बंध के आठ घटकों में विभाजित किया जाता है। त्वरित यात्रा एवं महत्वपूर्ण बैठक हेतु उत्तम।"
                : "Cherished in South Indian astrology, dividing day and night into Amrita, Uthi, Labha, Shubha, Roga, Visha, Chora, and Bandha. Indispensable for immediate decisions and meetings."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-purple-900">
                {isHi ? "अमृत, उति व लाभ काल" : "Amrita & Uthi Windows"}
              </span>
              <LocaleLink
                href="/panchang/tamil-panchangam"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "गौरी पंचांगम →" : "Explore Gowri →"}
              </LocaleLink>
            </div>
          </div>

          {/* 9. Jain Pachchakkhan */}
          <div id="jain-pachchakkhan" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "जैन पच्चक्खाण एवं नवकारशी" : "Jain Pachchakkhan & Navkarshi"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "जैन दर्शन के पावन तप-त्याग नियम: नवकारशी (सूर्योदय के ४८ मिनट बाद), पोरसी (३ घंटे बाद), एकासणा, बियासणा, आयंबिल, तथा चौविहार उपवास के सूर्योदय-सूर्यास्त आधारित सटीक गणितीय समय।"
                : "Jain vows and fasting windows: Navkarshi (48 minutes post-sunrise), Porsi, Ekatana, Biyasana, Ayambil, and Chauvihar timings based on exact astronomical sunrise and sunset."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-900">
                {isHi ? "अहिंसा व संयम काल" : "Ascetic Fasting Timings"}
              </span>
              <LocaleLink
                href="/panchang/gujarati-panchang"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "पच्चक्खाण समय →" : "View Timings →"}
              </LocaleLink>
            </div>
          </div>

          {/* 10. Rahu Kala & Yamaganda */}
          <div id="rahu-kala" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "राहु काल, यमगण्ड एवं गुलिक" : "Rahu Kala, Yamaganda & Gulika"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "प्रत्येक दिन का १/८वां भाग राहु काल कहलाता है। इसमें कोई भी शुभ कार्य, नवीन व्यापार अनुबंध या मांगलिक यात्रा नहीं की जाती। यमगण्ड में भी सावधानी रखी जाती है।"
                : "The 1/8th daylight partition governed by Rahu. Classical rules strictly proscribe commencing commercial ventures, long travel, or property signings during Rahu Kaal."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-rose-900">
                {isHi ? "अशुभ काल परिहार" : "Inauspicious Shielding"}
              </span>
              <LocaleLink
                href="/panchang/panchang-utilities"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "राहु काल घटी →" : "Rahu Kaal Clock →"}
              </LocaleLink>
            </div>
          </div>

          {/* 11. Auspicious Yoga */}
          <div id="auspicious-yoga" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "सर्वार्थ व अमृत सिद्धि योग" : "Sarvartha & Amrit Siddhi Yoga"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "वार और विशिष्ट नक्षत्रों के दिव्य संयोग से 'सर्वार्थ सिद्धि योग' और 'अमृत सिद्धि योग' का निर्माण होता है। इन योगों में प्रारंभ किया गया कोई भी कार्य निर्विघ्न रूप से पूर्ण एवं सिद्ध होता है।"
                : "Divine synchronicity between specific weekdays and constellations generating Sarvartha Siddhi Yoga and Amrit Siddhi Yoga, ensuring guaranteed completion and lasting abundance."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-800">
                {isHi ? "पुष्य योग व सिद्धि योग" : "Pushya & Siddhi Yogas"}
              </span>
              <LocaleLink
                href="/panchang/nakshatra"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "योग तिथियाँ →" : "View Yogas →"}
              </LocaleLink>
            </div>
          </div>

          {/* 12. Panchaka Rahita */}
          <div id="panchaka-rahita" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-amber-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "पंचक रहित मुहूर्त निर्णय" : "Panchaka Rahita Muhurat"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "तिथि, वार, नक्षत्र और लग्न की संख्याओं का योग कर ९ से भाग देने पर बचने वाले शेष से मृत्यु, अग्नि, राज, चोर और रोग पंचक का विचार किया जाता है। शून्य या शुभ शेष रहने पर 'पंचक रहित' श्रेष्ठ मुहूर्त बनता है।"
                : "The mathematical formula $(Tithi + Vara + Nakshatra + Lagna) \\pmod 9$ to test for Mrityu, Agni, Raja, Chora, or Roga Panchaka afflictions, ensuring clean Panchaka-free windows."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-blue-900">
                {isHi ? "पंचक दोष शुद्धि" : "Panchaka Free Timings"}
              </span>
              <LocaleLink
                href="/panchang/month-panchang"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "पंचक तालिका →" : "Panchaka Dates →"}
              </LocaleLink>
            </div>
          </div>
        </div>

        {/* Detailed High-SEO Treatise (Zero Thin Content) */}
        <article className="rounded-3xl bg-white p-6 lg:p-10 shadow-sm ring-1 ring-amber-500/15 space-y-6 text-ink/80 text-sm leading-relaxed">
          <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl border-b border-line pb-3">
            {isHi
              ? "वैदिक मुहूर्त शास्त्र का सम्पूर्ण वैज्ञानिक एवं आध्यात्मिक रहस्य — प्रामाणिक शोध"
              : "The Scientific & Spiritual Foundation of Vedic Muhurat Shastra — An Authoritative Guide"}
          </h2>

          {isHi ? (
            <div className="space-y-4">
              <p>
                सनातन धर्म में समय केवल क्षणों का व्यतीत होना नहीं, बल्कि एक दिव्य एवं चेतन शक्ति है। हमारे ऋषियों ने आकाशमण्डल के सूर्य, चन्द्रमा, नक्षत्रों एवं ग्रहों के परिभ्रमण को देखकर <strong>काल-विज्ञान</strong> का ऐसा सूक्ष्म गणित रचा, जो सहस्रों वर्षों से अक्षुण्ण है।
              </p>
              <h3 className="font-serif text-base font-bold text-ink pt-2">
                १. मुहूर्त के पाँच अनिवार्य स्तम्भ (पंचांग शुद्धि)
              </h3>
              <p>
                मुहूर्त निर्णय में पंचांग के पाँच अंगों का विचार सर्वोपरि होता है:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted">
                <li><strong>तिथि शुद्धि:</strong> रिक्ता तिथियों (४, ९, १४) का त्याग कर नंदा (१, ६, ११), भद्रा (२, ७, १२), जया (३, ८, १३), और पूर्णा (५, १०, १५) का चयन।</li>
                <li><strong>वार शुद्धि:</strong> सौम्य ग्रहों (चंद्र, बुध, गुरु, शुक्र) के वारों का अधिकांश संस्कारों में चयन, तथा क्रूर वारों (मंगल, शनि) का विशेष कार्यों में उपयोग।</li>
                <li><strong>नक्षत्र शुद्धि:</strong> साधक के जन्म नक्षत्र से अनुकूल ताराबल (संपत, क्षेम, साधन, मित्र, परम मित्र) का मिलान।</li>
                <li><strong>योग शुद्धि:</strong> २७ योगों में से अशुभ योगों (विष्कम्भ, शूल, गण्ड, व्याघात, वज्र, व्यतीपात, परिघ, वैधृति) के त्याज्य अंशों का परिहार।</li>
                <li><strong>करण शुद्धि:</strong> भद्रा (विष्टि करण) का पूर्ण परिहार, जिसमें कोई भी मांगलिक कार्य सर्वथा वर्जित माना गया है।</li>
              </ul>

              <h3 className="font-serif text-base font-bold text-ink pt-2">
                २. अभिजित मुहूर्त — भगवान विष्णु का सर्वदोषहर्ता चक्र
              </h3>
              <p>
                महर्षि वसिष्ठ का वचन है कि यदि किसी अत्यंत आवश्यक कार्य के लिए उपयुक्त लग्न या तिथि न मिल पा रही हो, तो मध्याह्न काल में <strong>अभिजित मुहूर्त</strong> में कार्य प्रारंभ किया जा सकता है। यह कालखंड आकाश के केंद्र में सूर्य के स्थित होने पर बनता है और सभी सामान्य दिशाशूल व ग्रह दोषों का शमन कर देता है।
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                In Vedic thought, time is an active cosmic field endowed with distinct qualitative properties. Just as a seed sown in spring blooms while the same seed in frozen soil withers, human endeavors initiated in alignment with the cosmic clock yield effortless success and enduring peace.
              </p>
              <h3 className="font-serif text-base font-bold text-ink pt-2">
                1. The Five Pillars of Electional Astrology (Panchanga Shuddhi)
              </h3>
              <p>
                Every Muhurat calculation rests upon five astronomical limbs:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted">
                <li><strong>Tithi Selection:</strong> Avoiding Rikta (empty) tithis (4th, 9th, 14th) in favor of Nanda, Bhadra, Jaya, and Purna tithis.</li>
                <li><strong>Vara (Weekday):</strong> Utilizing benefic days (Monday, Wednesday, Thursday, Friday) for life milestones and ceremonies.</li>
                <li><strong>Nakshatra Resonance:</strong> Aligning the stellar mansion with the native's Tarabalam (wealth, protection, mastery stars).</li>
                <li><strong>Yoga Alignment:</strong> Neutralizing harmful angular sums such as Vyatipata, Vaidhriti, and Vishkambha.</li>
                <li><strong>Karana Discipline:</strong> Strict avoidance of Vishti (Bhadra), the single most disruptive half-tithi for contracts and marriages.</li>
              </ul>

              <h3 className="font-serif text-base font-bold text-ink pt-2">
                2. Abhijit Muhurat — The Universal Protective Sanctuary
              </h3>
              <p>
                Sage Vashistha declares that when unexpected urgency prevents finding a perfectly defect-free horoscope, the midday <strong>Abhijit Muhurat</strong> serves as the supreme cosmic refuge. Governed by Lord Vishnu, it dissolves planetary impediments and crowns the endeavor with victory.
              </p>
            </div>
          )}
        </article>

        {/* FAQs */}
        <section className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm ring-1 ring-amber-500/10">
          <h2 className="font-serif text-lg font-bold text-ink sm:text-xl mb-4">
            {isHi ? "शुभ मुहूर्त से जुड़े अक्सर पूछे जाने वाले प्रश्न (FAQ)" : "Frequently Asked Questions about Muhurat"}
          </h2>
          <FaqList faqs={isHi ? FAQS_HI : FAQS_EN} jsonLd />
        </section>
      </main>
    </div>
  );
}
