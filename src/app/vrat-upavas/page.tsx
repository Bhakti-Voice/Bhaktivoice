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
import {
  Flame,
  Sparkles,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Info,
  ArrowRight,
  Heart,
  Moon,
  Utensils,
  BookOpen,
} from "lucide-react";

export const revalidate = 1800; // 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? "सनातन व्रत एवं उपवास 2026 — २४ एकादशी, पारण समय, प्रदोष, संकष्टी चतुर्थी व पूर्णिमा"
    : "Hindu Vrat & Upavas 2026 — 24 Ekadashi, Parana Timings, Pradosh, Sankashti & Purnima";

  const description = isHi
    ? "सम्पूर्ण हिन्दू व्रत एवं उपवास निर्देशिका। सभी २४ एकादशी तिथियाँ, शास्त्रोक्त पारण समय, प्रदोष व्रत, संकष्टी चतुर्थी, मासिक शिवरात्रि, पूर्णिमा, अमावस्या एवं फलाहार नियम।"
    : "Complete Hindu Fasting & Vrat guide. All 24 Ekadashi dates, scriptural Parana timings, Pradosh Vrat, Sankashti Chaturthi, Masik Shivratri, Purnima, and fasting nutrition rules.";

  return localizedMetadata({
    title,
    description,
    path: PATHS.vratUpavas,
    keywords: isHi
      ? [
          "हिन्दू व्रत एवं उपवास 2026",
          "एकादशी व्रत तिथियाँ",
          "एकादशी पारण समय",
          "प्रदोष व्रत 2026",
          "संकष्टी चतुर्थी चंद्रोदय समय",
          "मासिक शिवरात्रि व्रत",
          "पूर्णिमा व्रत नियम",
          "अमावस्या पितृ तर्पण",
          "नवरात्रि व्रत विधान",
          "व्रत फलाहार नियम",
        ]
      : [
          "hindu vrat 2026",
          "ekadashi dates 2026",
          "ekadashi parana time",
          "pradosh vrat timings",
          "sankashti chaturthi moonrise",
          "masik shivratri fasting",
          "purnima vrat katha",
          "amavasya pitru tarpan",
          "navratri fasting rules",
          "vrat diet guidelines",
        ],
  });
}

const FAQS_HI = [
  {
    question: "एकादशी व्रत में 'पारण समय' का क्या महत्व है?",
    answer:
      "शास्त्रों के अनुसार एकादशी व्रत का पूर्ण फल तभी मिलता है जब द्वादशी तिथि के भीतर और सूर्योदय के बाद शुद्ध काल में पारण (व्रत खोलना) किया जाए। यदि द्वादशी के प्रथम चरण में 'हरिवासर' लगा हो, तो उस समय पारण सर्वथा वर्जित होता है।",
  },
  {
    question: "प्रदोष व्रत किस समय संपन्न किया जाता है?",
    answer:
      "प्रदोष व्रत प्रत्येक माह के दोनों पक्षों की त्रयोदशी तिथि को रखा जाता है। इसकी मुख्य पूजा सूर्यास्त के लगभग ४५ मिनट पूर्व से ४५ मिनट पश्चात् (प्रदोष काल) में भगवान शिव और माता पार्वती की आरती व अभिषेक के साथ की जाती है।",
  },
  {
    question: "संकष्टी चतुर्थी में चंद्रमा को अर्घ्य क्यों दिया जाता है?",
    answer:
      "संकष्टी चतुर्थी भगवान श्री गणेश के विघ्नविनाशक स्वरूप को समर्पित है। रात्रि में चंद्रोदय के समय कच्चे दूध, दुर्वा और जल से चंद्रमा को अर्घ्य देने के पश्चात ही यह व्रत पूर्ण माना जाता है।",
  },
  {
    question: "व्रत के दौरान फलाहार के क्या शास्त्रीय नियम हैं?",
    answer:
      "व्रत में अन्न, दालें, प्याज, लहसुन, और साधारण समुद्री नमक वर्जित होते हैं। कूटू, सिंघाड़ा, साबूदाना, मखाना, ताजे फल, दूध, दही और सेंधा नमक (रॉक साल्ट) का उपयोग शास्त्र सम्मत माना गया है।",
  },
];

const FAQS_EN = [
  {
    question: "Why is the exact Parana timing critical for Ekadashi fasting?",
    answer:
      "In Vedic canonical lore, breaking an Ekadashi fast outside the designated Dvadashi Parana window nullifies the spiritual fruit. Devotees must also avoid breaking the fast during Harivasara (the first quarter of Dvadashi).",
  },
  {
    question: "What is the significance of Pradosh Vrat timing?",
    answer:
      "Observed on Trayodashi (13th lunar day), Pradosham worship occurs during twilight—approximately 45 minutes before to 45 minutes after sunset—when Lord Shiva is said to perform the divine cosmic dance to dissolve worldly debts.",
  },
  {
    question: "Why is moonrise worship essential for Sankashti Chaturthi?",
    answer:
      "Sankashti Chaturthi, dedicated to Lord Ganesha, concludes only after the Moon is sighted and offered holy Arghya (consecrated water, raw milk, and Durva grass), releasing negative karmic obstacles.",
  },
  {
    question: "What are the authentic dietary rules for Phalahar fasting?",
    answer:
      "Grains, lentils, table salt, onions, and garlic are strictly avoided. Buckwheat (Kuttu), water chestnut flour (Singhara), sago (Sabudana), makhana, dairy, fresh fruits, and Sendha Namak (rock salt) are permitted.",
  },
];

export default async function VratUpavasHubPage() {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const today = new Date();
  const panchang = getPanchang(today, DEFAULT_CITY);

  const crumbs = localizedCrumbs(
    isHi ? "होम" : "Home",
    [isHi ? "व्रत एवं उपवास" : "Vrat & Upavas", PATHS.vratUpavas]
  );

  return (
    <div className="min-h-screen bg-[#faf6f0] text-ink pb-16">
      <PageHero
        title={isHi ? "सनातन व्रत, उपवास एवं पारण निर्देशिका 2026" : "Sanatana Vrat, Upavas & Fasting Guide 2026"}
        crumbs={crumbs}
        ornament
      >
        <p className="mt-3 text-xs sm:text-sm text-ink/75 max-w-3xl leading-relaxed">
          {isHi
            ? "सभी २४ एकादशी, सटीक पारण समय, प्रदोष व्रत, संकष्टी चतुर्थी, पूर्णिमा, अमावस्या, नवरात्रि एवं वैदिक उपवास विधान। 100% प्रामाणिक शास्त्र सम्मत जानकारी।"
            : "The authentic spiritual manual of Hindu fasts (Vrats). Comprehensive dates for 24 Ekadashis, Parana timing, Pradosh Vrat, Sankashti Chaturthi, Purnima, Amavasya, and dietary science."}
        </p>
      </PageHero>

      <main className="mx-auto max-w-7xl px-4 pt-6 lg:px-8 space-y-10">
        {/* Real-time Tithi & Fasting Banner */}
        <section className="rounded-3xl bg-gradient-to-br from-white via-[#fffdf9] to-[#fff8f0] p-6 ring-1 ring-orange-500/15 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-500/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-ink sm:text-lg">
                  {isHi ? "आज की तिथि एवं सक्रिय व्रत वेला" : "Today's Tithi & Fasting Observances"}
                </h2>
                <p className="text-xs text-muted">
                  {DEFAULT_CITY.name} ({DEFAULT_CITY.state}) • {panchang.tithiAtSunrise.name} ({panchang.tithiAtSunrise.paksha} पक्ष)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-900 bg-orange-50 px-3 py-1 rounded-full ring-1 ring-orange-200">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span>{isHi ? "शुद्ध वैदिक पंचांग" : "Vedic Ephemeris"}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-orange-50/70 p-4 ring-1 ring-orange-300/60">
              <span className="text-[10px] font-bold text-orange-900 uppercase">
                {isHi ? "दैनिक तिथि" : "Active Tithi"}
              </span>
              <h3 className="mt-1 font-serif text-sm font-bold text-ink">
                {isHi ? panchang.tithiAtSunrise.nameHi : panchang.tithiAtSunrise.name}
              </h3>
              <p className="mt-2 text-[11.5px] text-muted">
                {isHi ? `पक्ष: ${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"}` : `Fortnight: ${panchang.tithiAtSunrise.paksha} Paksha`}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50/70 p-4 ring-1 ring-amber-300/60">
              <span className="text-[10px] font-bold text-amber-900 uppercase">
                {isHi ? "सूर्योदय व चंद्रास्त" : "Solar & Lunar Times"}
              </span>
              <h3 className="mt-1 font-serif text-sm font-bold text-ink">
                {isHi ? `सूर्योदय: ${panchang.sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : `Sunrise: ${panchang.sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
              </h3>
              <p className="mt-2 text-[11.5px] text-muted">
                {isHi ? `सूर्यास्त: ${panchang.sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : `Sunset: ${panchang.sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50/70 p-4 ring-1 ring-emerald-300/60">
              <span className="text-[10px] font-bold text-emerald-900 uppercase">
                {isHi ? "मास संवत" : "Lunar Month"}
              </span>
              <h3 className="mt-1 font-serif text-sm font-bold text-ink">
                {isHi ? panchang.masaPurnimanta.nameHi : panchang.masaPurnimanta.name} मास
              </h3>
              <p className="mt-2 text-[11.5px] text-muted">
                विक्रम संवत {panchang.vikramSamvat}
              </p>
            </div>

            <div className="rounded-2xl bg-purple-50/70 p-4 ring-1 ring-purple-300/60">
              <span className="text-[10px] font-bold text-purple-900 uppercase">
                {isHi ? "आगामी महापर्व" : "Upcoming Vrat"}
              </span>
              <h3 className="mt-1 font-serif text-sm font-bold text-ink">
                {isHi ? "एकादशी / प्रदोष व्रत" : "Ekadashi / Pradosh"}
              </h3>
              <LocaleLink href="/hindu-festivals" className="mt-2 inline-block text-[11.5px] font-semibold text-saffron-deep hover:underline">
                {isHi ? "सम्पूर्ण पर्व सूची →" : "View Vrat List →"}
              </LocaleLink>
            </div>
          </div>
        </section>

        {/* 10 Major Vrat Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Ekadashi Vrat */}
          <div id="ekadashi-vrat" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Flame className="h-5 w-5 text-orange-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "२४ एकादशी व्रत एवं पारण समय" : "24 Ekadashi Vrat & Parana"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "प्रत्येक पक्ष की ११वीं तिथि को भगवान श्रीहरि विष्णु को समर्पित एकादशी व्रत। निर्जला, मोक्षदा, देवशयनी, देवप्रबोधिनी सहित सभी २४ एकादशियों के सटीक तिथिकाल एवं द्वादशी पारण समय का पालन अनिवार्य है।"
                : "The supreme Vaishnava fast observed on the 11th lunar day of both waxing and waning fortnights. Accurate Parana windows avoid Harivasara, guaranteeing spiritual liberation."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-orange-800">
                {isHi ? "श्रीहरि विष्णु उपासना" : "Dedicated to Lord Vishnu"}
              </span>
              <LocaleLink
                href="/hindu-festivals"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "एकादशी तिथियाँ →" : "Ekadashi Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 2. Pradosh Vrat */}
          <div id="pradosh-vrat" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Moon className="h-5 w-5 text-indigo-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "प्रदोष व्रत (त्रयोदशी शिव पूजा)" : "Pradosh Vrat (Trayodashi Shiva)"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "प्रत्येक मास के दोनों पक्षों की त्रयोदशी को प्रदोष काल (सूर्यास्त के समय) में भगवान शिव और माता पार्वती की पूजा। सोम प्रदोष, भौम प्रदोष और शनि प्रदोष का विशेष फल माना गया है।"
                : "Dedicated to Lord Shiva, observed on the 13th lunar day (Trayodashi). Worship is conducted in twilight (Pradosham) to remove financial debts, diseases, and planetary afflictions."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-indigo-800">
                {isHi ? "प्रदोष काल व्यापिनी पूजा" : "Twilight Shiva Worship"}
              </span>
              <LocaleLink
                href="/hindu-festivals"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "प्रदोष तिथियाँ →" : "Pradosh Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 3. Sankashti Chaturthi */}
          <div id="sankashti-chaturthi" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "संकष्टी चतुर्थी (चंद्रोदय गणेश व्रत)" : "Sankashti Chaturthi (Ganesha)"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "कृष्ण पक्ष की चतुर्थी को विघ्नहर्ता भगवान गणेश का व्रत। रात्रि में चंद्र दर्शन और अर्घ्य देने के पश्चात ही व्रत खोला जाता है। मंगलवार को पड़ने वाली अंगारकी चतुर्थी महापुण्यदायी होती है।"
                : "Observed during Krishna Paksha Chaturthi to propitiate Lord Ganesha. Completed upon night moonrise sighting with milk Arghya. Angarki Chaturthi falling on Tuesday is supremely auspicious."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-800">
                {isHi ? "चंद्रोदय समय अनिवार्य" : "Moonrise Arghya Timing"}
              </span>
              <LocaleLink
                href="/hindu-festivals"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "संकष्टी तिथियाँ →" : "Chaturthi Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 4. Masik Shivratri */}
          <div id="masik-shivratri" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <ShieldCheck className="h-5 w-5 text-purple-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "मासिक शिवरात्रि व्रत विधान" : "Masik Shivratri Vrat"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "प्रत्येक मास के कृष्ण पक्ष की चतुर्दशी को निशीथ काल (मध्यरात्रि) में भगवान शिव की आराधना। महाशिवरात्रि के समान ही प्रत्येक माह की शिवरात्रि आत्म-शुद्धि एवं मोक्ष प्रदायिनी है।"
                : "Observed on the 14th day of Krishna Paksha every lunar month. Dedicated to Nishita Kaal midnight worship of Lord Shiva, dissolving mental turmoil and deep karmic residue."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-purple-800">
                {isHi ? "निशीथ काल पूजा" : "Midnight Shiva Abhishekam"}
              </span>
              <LocaleLink
                href="/hindu-festivals"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "शिवरात्रि तिथियाँ →" : "Shivratri Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 5. Purnima Vrat */}
          <div id="purnima-vrat" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Moon className="h-5 w-5 text-teal-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "पूर्णिमा व्रत एवं सत्यनारायण कथा" : "Purnima Vrat & Satyanarayan"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "शुक्ल पक्ष की १५वीं तिथि पूर्णिमा पर श्री सत्यनारायण भगवान की पावन कथा, पंचामृत भोग, और सायं काल चंद्रमा को अर्घ्य। यह व्रत परिवार में शांति, समृद्धि और आरोग्य की वृद्धि करता है।"
                : "Observed on the 15th waxing day (Full Moon). Centered around Lord Satyanarayana puja, panchamrit offering, and evening moonbeam meditation for peace and prosperity."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-teal-800">
                {isHi ? "पूर्ण चंद्र दर्शन व अर्घ्य" : "Full Moon Blessing"}
              </span>
              <LocaleLink
                href="/hindu-festivals"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "पूर्णिमा तिथियाँ →" : "Purnima Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 6. Amavasya & Pitru Tarpan */}
          <div id="amavasya-tarpan" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Sun className="h-5 w-5 text-amber-700" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "अमावस्या एवं पितृ तर्पण श्राद्ध" : "Amavasya & Pitru Tarpan"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "कृष्ण पक्ष की अंतिम तिथि अमावस्या पर पूर्वजों (पितृगण) की शांति हेतु तिल-जल तर्पण, पिंडदान एवं ब्राह्मण भोजन। सोमवती अमावस्या और मौनी अमावस्या का स्नान-दान अत्यंत फलदायी है।"
                : "The new moon conclusion of Krishna Paksha dedicated to honoring ancestors through sesame water libations (Tarpan) and charity. Somvati and Mauni Amavasya carry profound spiritual merit."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-900">
                {isHi ? "पितृ दोष निवारण" : "Ancestral Peace"}
              </span>
              <LocaleLink
                href="/hindu-festivals"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "अमावस्या तिथियाँ →" : "Amavasya Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 7. Navratri Vrat */}
          <div id="navratri-vrat" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Heart className="h-5 w-5 text-rose-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "शारदीय व चैत्र नवरात्रि ९ दिवसीय व्रत" : "Navratri 9 Days Vrat"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "माँ भगवती दुर्गा के नौ रूपों (शैलपुत्री से सिद्धिदात्री) की उपासना। घटस्थापना (कलश स्थापना) का शुभ मुहूर्त, अखंड ज्योति, दुर्गा सप्तशती पाठ, और कन्या पूजन का विस्तृत शास्त्रोक्त विधान।"
                : "Nine-day ascetic adoration of Maa Durga's nine divine manifestations. Precise Ghatasthapana muhurat, unbroken ghee lamp (Akhand Jyoti), and Kumari Puja rituals."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-rose-900">
                {isHi ? "शक्ति उपासना व कलश स्थापना" : "Divine Shakti Worship"}
              </span>
              <LocaleLink
                href="/hindu-festivals"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "नवरात्रि तिथियाँ →" : "Navratri Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 8. Rohini Vrat */}
          <div id="rohini-vrat" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "रोहिणी व्रत एवं जैन पच्चक्खाण" : "Rohini Vrat & Jain Pachchakkhan"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "जैन समुदाय में रोहिणी नक्षत्र के उदय पर भगवान वासुपूज्य स्वामी की आराधना और पूर्ण उपवास। दांपत्य जीवन की रक्षा, पति की दीर्घायु और आत्मिक शांति के लिए यह व्रत अत्यंत आदरणीय है।"
                : "Observed when Rohini constellation rises, honoring Lord Vasupujya Swami. Fosters familial harmony, long life of spouse, and inner detachment through ascetic discipline."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-900">
                {isHi ? "रोहिणी नक्षत्र उदय" : "Rohini Rising Fast"}
              </span>
              <LocaleLink
                href="/panchang/gujarati-panchang"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "रोहिणी तिथियाँ →" : "Rohini Dates →"}
              </LocaleLink>
            </div>
          </div>

          {/* 9. Vrat Ahar Rules */}
          <div id="ahar-niyam" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Utensils className="h-5 w-5 text-amber-600" />
              <h3 className="font-serif text-base font-bold text-ink">
                {isHi ? "व्रत फलाहार एवं सात्विक आहार नियम" : "Vrat Phalahar & Dietary Rules"}
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {isHi
                ? "उपवास में शरीर और मन को हल्का रखने के लिए सात्विक फलाहार के नियम: कूटू, मखाना, फल, दूध और सेंधा नमक। तामसिक भोज्य पदार्थों (अन्न, मैदा, साधारण नमक, लहसुन) का सर्वथा निषेध।"
                : "Scientific guidelines for Phalahar: pure fruits, milk, curd, buckwheat, water-chestnut flour, and rock salt. Restricts heavy grains and inflammatory spices to facilitate deep meditation."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-800">
                {isHi ? "सात्विक आहार विज्ञान" : "Satvik Nutrition"}
              </span>
              <LocaleLink
                href="/spiritual-knowledge"
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {isHi ? "आहार ज्ञान पढ़ें →" : "Diet Guidelines →"}
              </LocaleLink>
            </div>
          </div>
        </div>

        {/* Long-Form Authoritative SEO Guide */}
        <article className="rounded-3xl bg-white p-6 lg:p-10 shadow-sm ring-1 ring-orange-500/15 space-y-6 text-ink/80 text-sm leading-relaxed">
          <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl border-b border-line pb-3">
            {isHi
              ? "सनातन व्रत-उपवास का आध्यात्मिक एवं खगोलीय विज्ञान — सम्पूर्ण संहिता"
              : "The Spiritual & Biological Science of Vedic Vrats — Complete Encyclopedic Treatise"}
          </h2>

          {isHi ? (
            <div className="space-y-4">
              <p>
                सनातन धर्म में 'उपवास' शब्द दो शब्दों से मिलकर बना है: <strong>'उप' + 'वास'</strong> अर्थात् ईश्वर के निकट वास करना। केवल अन्न का परित्याग कर देना व्रत नहीं है, अपितु अपनी इंद्रियों, मन और वाणी को संयमित कर परम चेतना में स्थिर करना ही सच्चा तप है।
              </p>
              <h3 className="font-serif text-base font-bold text-ink pt-2">
                १. एकादशी और मानवीय शरीर-विज्ञान (चंद्र कला प्रभाव)
              </h3>
              <p>
                आधुनिक विज्ञान भी स्वीकार करता है कि चंद्रमा का गुरुत्वाकर्षण पृथ्वी के जल एवं महासागरों में ज्वार-भाटा उत्पन्न करता है। मानवीय शरीर में भी ७०% से अधिक जल तत्व है। एकादशी तिथि (पूर्णिमा और अमावस्या से ४ दिन पूर्व) पर हमारे शरीर का जल संतुलन संवेदनशील होता है। इस दिन उपवास रखने से पाचन तंत्र को पूर्ण विश्राम मिलता है, शरीर से विषाक्त तत्व (Toxins) निष्कासित होते हैं, और मस्तिष्क में सत्व गुण की वृद्धि होती है।
              </p>
              <h3 className="font-serif text-base font-bold text-ink pt-2">
                २. पारण के सूक्ष्म नियम (द्वादशी पारण)
              </h3>
              <p>
                पद्म पुराण में स्पष्ट निर्देश है कि एकादशी का पारण सदैव सूर्योदय के बाद और द्वादशी समाप्त होने से पूर्व करना चाहिए। यदि द्वादशी तिथि सूर्योदय से पहले ही समाप्त हो जाए, तो सूर्योदय के ठीक बाद पारण किया जाता है। हरिवासर (द्वादशी का प्रथम चौथाई भाग) के समय पारण करने से व्रत का फल निष्फल हो जाता है, अतः हरिवासर समाप्त होने की प्रतीक्षा करनी चाहिए।
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                In the Vedic lexicon, <strong>Upavas</strong> signifies &apos;dwelling near the Divine&apos;. Far from being a mere deprivation of food, fasting is an intentional technology of biological rejuvenation and spiritual alignment designed by ancient sages.
              </p>
              <h3 className="font-serif text-base font-bold text-ink pt-2">
                1. Lunar Biology &amp; The Science of Ekadashi Fasting
              </h3>
              <p>
                The human nervous system and cellular fluid dynamics are inextricably tuned to the synodic lunar cycle. Four days before the Full Moon and New Moon (on the 11th tithi, Ekadashi), atmospheric pressure drops and biological metabolism shifts. Observing a water or light-fruit fast on Ekadashi induces cellular autophagy, cleanses metabolic waste, and channels pranic energy directly into higher cerebral centers.
              </p>
              <h3 className="font-serif text-base font-bold text-ink pt-2">
                2. The Canonical Rules of Parana (Breaking the Fast)
              </h3>
              <p>
                Scriptural canons in the <em>Padma Purana</em> strictly demand that the fast be broken during the daytime of Dvadashi (after sunrise) and before the expiration of the Dvadashi tithi. Furthermore, fasting must never be broken during <strong>Harivasara</strong>—the first 25% quadrant of Dvadashi ruled by cosmic planetary tension.
              </p>
            </div>
          )}
        </article>

        {/* FAQs */}
        <section className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm ring-1 ring-orange-500/10">
          <h2 className="font-serif text-lg font-bold text-ink sm:text-xl mb-4">
            {isHi ? "सनातन व्रत व उपवास से जुड़े सामान्य प्रश्न (FAQ)" : "Frequently Asked Questions about Hindu Vrats"}
          </h2>
          <FaqList faqs={isHi ? FAQS_HI : FAQS_EN} jsonLd />
        </section>
      </main>
    </div>
  );
}
