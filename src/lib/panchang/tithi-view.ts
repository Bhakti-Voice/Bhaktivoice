import type { BreadcrumbItem, Faq } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/config";
import { PATHS } from "@/lib/seo/paths";
import { SITE, absoluteUrl } from "@/lib/seo/site";
import type { DayPanchang, Observance } from "./types";
import {
  formatIstDate,
  formatIstDateTime,
  formatIstMonthDayYear,
  formatIstTime,
  getPanchang,
  isoIstDate,
  pakshaLabel,
} from "./panchang";

export type UpcomingTithi = {
  date: string;
  day: string;
  tithi: string;
  festival?: string;
};

export type NextVrat = {
  day: string;
  date: string;
  name: string;
  isEkadashi: boolean;
};

/** Presentation model for /aaj-ki-tithi. Filled from the Delhi sky calculation, not a third-party almanac. */
export type TithiPageData = {
  currentDate: string;
  titleDate: string;
  isoDate: string;
  currentVikramSamvat: string;
  currentMasa: string;
  masaAmanta: string;
  currentPaksha: string;
  currentTithi: string;
  tithiNumber: number;
  tithiStartTime: string;
  tithiEndTime: string;
  tithiStartAt: string;
  tithiEndAt: string;
  nextTithi: string;
  nextTithiEndAt: string;
  sunriseTime: string;
  sunsetTime: string;
  rahuKaalStart: string;
  rahuKaalEnd: string;
  currentNakshatra: string;
  nakshatraPada: number;
  weekday: string;
  ritu: string;
  yoga: string;
  karana: string;
  specialFestivals: string[];
  upcomingTithis: UpcomingTithi[];
  nextVrat: NextVrat | null;
  location: string;
  observances: Observance[];
};

export type TithiProse = {
  welcome: string;
  observances: string;
  tithiTiming: string;
  sun: string;
  alignments: string;
  upcoming: string;
  close: string;
};

export function toTithiPageData(locale: Locale, now = new Date()): TithiPageData {
  const hi = locale === "hi";
  const panchang = getPanchang(now, 7);
  const tithi = panchang.tithiAtSunrise;
  const paksha = pakshaLabel(tithi.paksha);
  const masa = panchang.masaPurnimanta;
  const time = (value: Date) => formatIstTime(value, locale);
  const dateTime = (value: Date) => formatIstDateTime(value, locale);

  const specialFestivals = panchang.observances.map((item) =>
    hi ? (item.nameHi ?? item.name) : item.name,
  );

  return {
    currentDate: formatIstDate(panchang.sunrise, locale),
    titleDate: formatIstMonthDayYear(panchang.sunrise, locale),
    isoDate: isoIstDate(panchang.sunrise),
    currentVikramSamvat: String(panchang.vikramSamvat),
    currentMasa: hi ? masa.nameHi : masa.name,
    masaAmanta: hi ? panchang.masaAmanta.nameHi : panchang.masaAmanta.name,
    currentPaksha: hi ? paksha.hi : paksha.en,
    currentTithi: hi ? tithi.nameHi : tithi.name,
    tithiNumber: tithi.number,
    tithiStartTime: time(tithi.start),
    tithiEndTime: time(tithi.end),
    tithiStartAt: dateTime(tithi.start),
    tithiEndAt: dateTime(tithi.end),
    nextTithi: hi ? panchang.nextTithi.nameHi : panchang.nextTithi.name,
    nextTithiEndAt: dateTime(panchang.nextTithi.end),
    sunriseTime: time(panchang.sunrise),
    sunsetTime: time(panchang.sunset),
    rahuKaalStart: time(panchang.rahuKaal.start),
    rahuKaalEnd: time(panchang.rahuKaal.end),
    currentNakshatra: hi ? panchang.nakshatra.nameHi : panchang.nakshatra.name,
    nakshatraPada: panchang.nakshatra.pada,
    weekday: hi ? panchang.weekdayNameHi : panchang.weekdayName,
    ritu: hi ? panchang.ritu.nameHi : panchang.ritu.name,
    yoga: panchang.yoga.name,
    karana: panchang.karana.name,
    specialFestivals,
    upcomingTithis: panchang.upcoming.map((day) => {
      const dayPaksha = pakshaLabel(day.tithi.paksha);
      const tithiName = hi
        ? `${day.masaNameHi} ${dayPaksha.hi} ${day.tithi.nameHi}`
        : `${day.masaName} ${dayPaksha.en} ${day.tithi.name}`;
      const festival = day.observances
        .map((item) => (hi ? (item.nameHi ?? item.name) : item.name))
        .join(" · ");
      return {
        date: formatIstDate(day.date, locale),
        day: hi ? day.weekdayNameHi : day.weekdayName,
        tithi: tithiName,
        festival: festival || undefined,
      };
    }),
    nextVrat: nextVratFromUpcoming(panchang.upcoming, locale),
    location: panchang.location,
    observances: panchang.observances,
  };
}

function nextVratFromUpcoming(
  upcoming: DayPanchang["upcoming"],
  locale: Locale,
): NextVrat | null {
  const hi = locale === "hi";
  const ekadashi = upcoming.find((day) => day.tithi.number === 11);
  const marked = upcoming.find((day) => day.observances.length);
  const pick = ekadashi ?? marked;
  if (!pick) return null;
  const festival = pick.observances[0];
  return {
    day: hi ? pick.weekdayNameHi : pick.weekdayName,
    date: formatIstDate(pick.date, locale),
    name: ekadashi
      ? hi
        ? "एकादशी व्रत"
        : "Ekadashi Vrat"
      : hi
        ? (festival?.nameHi ?? festival?.name ?? pick.tithi.nameHi)
        : (festival?.name ?? pick.tithi.name),
    isEkadashi: Boolean(ekadashi),
  };
}

export function tithiPageFaqs(data: TithiPageData, locale: Locale): Faq[] {
  const hi = locale === "hi";
  const paksha = titlePaksha(data.currentPaksha);
  const lunar = lunarDayPhrase(data.tithiNumber, data.currentTithi, hi);
  const vrat = data.nextVrat;

  return [
    {
      question: hi
        ? `${data.titleDate} के लिए आज की तिथि क्या है?`
        : `What is the exact Tithi for today, ${data.titleDate}?`,
      answer: hi
        ? `आज का आरम्भ ${paksha} की ${data.currentTithi} से होता है${lunar ? ` (${lunar})` : ""}। यह ${data.tithiEndTime} (IST) तक रहती है, उसके बाद तिथि ${data.nextTithi} हो जाती है।`
        : `Today begins with ${data.currentTithi} Tithi${lunar ? ` (${lunar})` : ""} of the ${paksha}. ${data.currentTithi} is active until ${data.tithiEndTime} (IST), after which the tithi shifts to ${data.nextTithi}.`,
    },
    {
      question: hi
        ? "क्या आज कोई विशेष हिन्दू त्योहार या व्रत है?"
        : "Are there any special Hindu festivals or fasts today?",
      answer: festivalFaqAnswer(data, hi),
    },
    {
      question: hi ? "आज राहु काल किस समय है?" : "What time is Rahu Kaal today?",
      answer: hi
        ? `आज राहु काल ${data.rahuKaalStart} से ${data.rahuKaalEnd} (IST) तक है। इस समय नया काम आरम्भ न करें।`
        : `Today, Rahu Kaal lasts from ${data.rahuKaalStart} to ${data.rahuKaalEnd} (IST). It is recommended to avoid starting new ventures during this window.`,
    },
    {
      question: hi ? "आज कौन सा नक्षत्र चल रहा है?" : "Which Nakshatra is active today?",
      answer: hi
        ? `चंद्रमा इस समय ${data.currentNakshatra} नक्षत्र (पाद ${data.nakshatraPada}) में है, योग ${data.yoga} है — जप और साधना के लिए अनुकूल।`
        : `The moon is currently in the ${data.currentNakshatra} Nakshatra (Pada ${data.nakshatraPada}), paired with ${data.yoga} Yoga for favorable spiritual practices and chanting.`,
    },
    {
      question: hi ? "अगला प्रमुख व्रत या उपवास कब है?" : "When is the next major Vrat or fasting day?",
      answer: vrat
        ? vrat.isEkadashi
          ? hi
            ? `अगला प्रमुख उपवास ${vrat.name} है, आने वाले ${vrat.day} को — विष्णु भक्तों के लिए विशेष दिन।`
            : `The next major fasting day is the ${vrat.name}, falling this coming ${vrat.day}, which is highly significant for Lord Vishnu devotees.`
          : hi
            ? `आने वाले सप्ताह में अगला अंकित व्रत ${vrat.name} है, ${vrat.day} (${vrat.date}) को।`
            : `The next marked observance in the coming week is ${vrat.name}, falling this coming ${vrat.day} (${vrat.date}).`
        : hi
          ? "आने वाले सात सूर्योदयों में कोई प्रमुख व्रत अंकित नहीं है। नीचे की तिथियाँ देखें।"
          : "No major fasting day is marked in the next seven sunrises of this panchang. See the tithi list below.",
    },
  ];
}

export function tithiPageMeta(data: TithiPageData, locale: Locale) {
  const hi = locale === "hi";
  const pageName = tithiPageName(locale);
  const festivalTail = data.specialFestivals.length
    ? hi
      ? `और विशेष पर्व जैसे ${joinAnd(data.specialFestivals, "hi")}।`
      : `and special festivals like ${joinAnd(data.specialFestivals, "en")}.`
    : hi
      ? `और आज की तिथि ${data.currentTithi}।`
      : `and today's ${data.currentTithi}.`;
  return {
    title: `${pageName} (${data.titleDate})`,
    description: hi
      ? `${data.titleDate} की आज की तिथि देखें। सूर्योदय, सूर्यास्त, राहु काल, नक्षत्र, ${festivalTail}`
      : `Check Aaj Ki Tithi for today, ${data.titleDate}. Get today's Panchang details including sunrise, sunset, Rahu Kaal, Nakshatra, ${festivalTail}`,
  };
}

export function tithiPageProse(data: TithiPageData, locale: Locale): TithiProse {
  const hi = locale === "hi";
  const festivalList = data.specialFestivals.join(", ");
  const names = data.specialFestivals.join(" ").toLowerCase();
  const nag = /nag panchami|नाग पंचमी/.test(names);
  const sawan = /sawan somvar|सावन सोमवार/.test(names);

  if (hi) {
    return {
      welcome: `दिल्ली का दैनिक पंचांग यहाँ है। नाम जप, व्रत, या केवल चंद्र दिन जानने के लिए आज की तिथि सूर्योदय की हिन्दू तिथि है। आज ${data.currentDate} है। नीचे का पंचांग सूर्य और चंद्रमा से दिल्ली (IST) के लिए गणना है — छपे हुए पंचांग की नकल नहीं।`,
      observances: data.specialFestivals.length
        ? `आज हमारे कैलेंडर पर ${festivalList} अंकित है।${nag ? " नाग पंचमी पर कई घर नागों और शिव के नाम का स्मरण करते हैं।" : ""}${sawan ? " सावन सोमवार श्रावण के सोम का व्रत है।" : ""} मंदिर की आरती और स्थानीय रीति पूछें — हम घड़ी नहीं गढ़ते।`
        : "इस तिथि पर कोई विशेष त्योहार अंकित नहीं है। साधारण दिन भी एक माला के लिए पर्याप्त है।",
      tithiTiming: `सूर्योदय पर तिथि ${data.currentTithi} है। यह ${data.tithiStartAt} IST से ${data.tithiEndAt} IST तक रहती है। इसके बाद ${data.nextTithi} चलती है, जो ${data.nextTithiEndAt} IST तक रहती है।`,
      sun: `दिल्ली में सूर्योदय ${data.sunriseTime} और सूर्यास्त ${data.sunsetTime} है। राहु काल ${data.rahuKaalStart} से ${data.rahuKaalEnd} IST तक है — कई गृहस्थ नया काम इसके बाद रखते हैं। जप किसी भी सच्चे समय बैठ सकता है।`,
      alignments: `पंचांग के पाँच अंग दिल्ली सूर्योदय पर: वार ${data.weekday}, ऋतु ${data.ritu}, नक्षत्र ${data.currentNakshatra} (पाद ${data.nakshatraPada}), योग ${data.yoga}, करण ${data.karana}। पूर्णिमान्त मास ${data.currentMasa} है; अमान्त मास ${data.masaAmanta} है जहाँ वे भिन्न हों। विक्रम संवत ${data.currentVikramSamvat}।`,
      upcoming: "आने वाले सात सूर्योदयों की तिथियाँ नीचे हैं — व्रत और एकादशी पहले से देख लें।",
      close: "तिथि ज्ञात है। एक माला १०८ की बैठें। आकाश पहले से चल रहा है; मनके दिन पूरा करते हैं।",
    };
  }

  return {
    welcome: `Here is the daily panchang for Delhi. Whether you are sitting for naam jaap, keeping a vrat, or simply wanting the lunar day, Aaj Ki Tithi is the Hindu calendar date at sunrise. Today is ${data.currentDate}. The details below are calculated from the Sun and Moon for Delhi (IST) — not copied from a printed almanac.`,
    observances: data.specialFestivals.length
      ? `Today our calendar marks ${festivalList}.${nag ? " On Nag Panchami many households remember the Nagas and sit with Shiva's name." : ""}${sawan ? " Sawan Somvar is the Monday vrat of Shravan." : ""} Confirm local temple practice; we do not invent aarti clocks.`
      : "No special festival is marked on this tithi. An ordinary day is still enough for one mala.",
    tithiTiming: `At sunrise the tithi is ${data.currentTithi}. It runs from ${data.tithiStartAt} IST until ${data.tithiEndAt} IST. After that it becomes ${data.nextTithi}, which holds until ${data.nextTithiEndAt} IST.`,
    sun: `Sunrise in Delhi is ${data.sunriseTime}. Sunset is ${data.sunsetTime}. Rahu Kaal is ${data.rahuKaalStart} to ${data.rahuKaalEnd} IST — many households wait until it passes before beginning new work. Jaap can be sat at any honest hour.`,
    alignments: `The five limbs of panchang at Delhi sunrise: Vara is ${data.weekday}. Ritu is ${data.ritu}. Nakshatra is ${data.currentNakshatra} (pada ${data.nakshatraPada}). Yoga is ${data.yoga}. Karana is ${data.karana}. Purnimanta masa is ${data.currentMasa}; Amanta masa is ${data.masaAmanta} where they differ. Vikram Samvat ${data.currentVikramSamvat}.`,
    upcoming: "The next seven sunrises are listed below so you can see ekadashi and other vrats coming.",
    close: "The tithi is known. Sit for one mala of 108. The sky has already begun; the beads finish the day.",
  };
}

export function tithiPageGraph(
  data: TithiPageData,
  faqs: Faq[],
  crumbs: BreadcrumbItem[],
  locale: Locale,
) {
  const meta = tithiPageMeta(data, locale);
  const url = absoluteUrl(withLocale(PATHS.tithi, locale));
  const events = data.specialFestivals.map((name) => ({
    "@type": "Event",
    additionalType: "https://schema.org/Festival",
    name,
    startDate: data.isoDate,
    endDate: data.isoDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Delhi",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressCountry: "IN",
      },
    },
    description: `Hindu observance on ${data.currentTithi}, ${data.currentPaksha} of ${data.currentMasa}. Panchang times are for Delhi IST.`,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: tithiPageName(locale),
        description: meta.description,
        inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE.url}/#website`,
          name: SITE.name,
          url: `${SITE.url}/`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(withLocale(item.href, locale)),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      ...events,
    ],
  };
}

export function tithiPageName(locale: Locale) {
  return locale === "hi"
    ? "आज की तिथि: आज का पंचांग और हिन्दू कैलेंडर विवरण"
    : "Aaj Ki Tithi: Today's Panchang & Hindu Calendar Details";
}

function titlePaksha(value: string) {
  return value.replace(/\bpaksha\b/i, "Paksha").replace(/\bपक्ष\b/, "पक्ष");
}

function lunarDayPhrase(number: number, tithiName: string, hi: boolean) {
  if (/purnima|पूर्णिमा/i.test(tithiName)) return hi ? "पूर्णिमा — पूर्णिमा का दिन" : "the full moon day";
  if (/amavasya|अमावस्या/i.test(tithiName)) return hi ? "अमावस्या — अमावस्या का दिन" : "the new moon day";
  const en = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
    "fifteenth",
  ][Math.max(1, Math.min(15, number)) - 1];
  return hi ? `चंद्र मास का ${number}वाँ दिन` : `the ${en} lunar day`;
}

function joinAnd(items: string[], locale: "en" | "hi") {
  if (items.length <= 1) return items[0] ?? "";
  const conj = locale === "hi" ? " और " : " and ";
  if (items.length === 2) return `${items[0]}${conj}${items[1]}`;
  return `${items.slice(0, -1).join(", ")},${conj}${items[items.length - 1]}`;
}

function festivalFaqAnswer(data: TithiPageData, hi: boolean) {
  const festivals = data.specialFestivals;
  if (!festivals.length) {
    return hi
      ? "इस तिथि पर हमारे पंचांग में कोई विशेष त्योहार अंकित नहीं है। साधारण दिन भी जप के लिए पर्याप्त हैं।"
      : "No special Hindu festival or fast is marked on this tithi in our panchang. An ordinary day is still enough for jaap.";
  }
  const blob = festivals.join(" ").toLowerCase();
  const nag = /nag panchami|नाग पंचमी/.test(blob);
  const sawan = /sawan somvar|सावन सोमवार/.test(blob);
  if (nag && sawan) {
    return hi
      ? "हाँ, आज नाग पंचमी है — नाग देवता के पूजन का दिन — साथ ही सावन सोमवार, श्रावण मास का पवित्र सोम।"
      : "Yes, today marks Nag Panchami for serpent deity worship, as well as Sawan Somvar, the sacred Monday of the holy Shravana month.";
  }
  if (nag) {
    return hi
      ? "हाँ, आज नाग पंचमी है — नाग देवता के पूजन का दिन।"
      : "Yes, today marks Nag Panchami for serpent deity worship.";
  }
  if (sawan) {
    return hi
      ? "हाँ, आज सावन सोमवार है, श्रावण मास का पवित्र सोम।"
      : "Yes, today marks Sawan Somvar, the sacred Monday of the holy Shravana month.";
  }
  return hi
    ? `हाँ, आज ${joinAnd(festivals, "hi")} अंकित है।`
    : `Yes, today marks ${joinAnd(festivals, "en")}.`;
}
