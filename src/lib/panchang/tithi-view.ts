import type { Faq } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";
import type { Observance } from "./types";
import {
  formatIstDate,
  formatIstTime,
  getPanchang,
  pakshaLabel,
} from "./panchang";

export type UpcomingTithi = {
  date: string;
  day: string;
  tithi: string;
  festival?: string;
};

/** Presentation model for /aaj-ki-tithi. Filled from the Delhi sky calculation, not a third-party almanac. */
export type TithiPageData = {
  currentDate: string;
  currentVikramSamvat: string;
  currentMasa: string;
  currentPaksha: string;
  currentTithi: string;
  tithiStartTime: string;
  tithiEndTime: string;
  nextTithi: string;
  sunriseTime: string;
  sunsetTime: string;
  rahuKaalStart: string;
  rahuKaalEnd: string;
  currentNakshatra: string;
  specialFestivals: string[];
  upcomingTithis: UpcomingTithi[];
  location: string;
  observances: Observance[];
};

export function toTithiPageData(locale: Locale, now = new Date()): TithiPageData {
  const hi = locale === "hi";
  const panchang = getPanchang(now, 7);
  const tithi = panchang.tithiAtSunrise;
  const paksha = pakshaLabel(tithi.paksha);
  const masa = panchang.masaPurnimanta;
  const time = (value: Date) => formatIstTime(value, locale);

  const specialFestivals = panchang.observances.map((item) =>
    hi ? (item.nameHi ?? item.name) : item.name,
  );

  return {
    currentDate: formatIstDate(panchang.sunrise, locale),
    currentVikramSamvat: String(panchang.vikramSamvat),
    currentMasa: hi ? masa.nameHi : masa.name,
    currentPaksha: hi ? paksha.hi : paksha.en,
    currentTithi: hi ? tithi.nameHi : tithi.name,
    tithiStartTime: time(tithi.start),
    tithiEndTime: time(tithi.end),
    nextTithi: hi ? panchang.nextTithi.nameHi : panchang.nextTithi.name,
    sunriseTime: time(panchang.sunrise),
    sunsetTime: time(panchang.sunset),
    rahuKaalStart: time(panchang.rahuKaal.start),
    rahuKaalEnd: time(panchang.rahuKaal.end),
    currentNakshatra: hi ? panchang.nakshatra.nameHi : panchang.nakshatra.name,
    specialFestivals,
    upcomingTithis: panchang.upcoming.map((day) => {
      const dayPaksha = pakshaLabel(day.tithi.paksha);
      const tithiName = hi
        ? `${dayPaksha.hi} ${day.tithi.nameHi}`
        : `${dayPaksha.en} ${day.tithi.name}`;
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
    location: panchang.location,
    observances: panchang.observances,
  };
}

export function tithiPageFaqs(data: TithiPageData, locale: Locale): Faq[] {
  const hi = locale === "hi";
  const festivals = data.specialFestivals;
  return [
    {
      question: hi
        ? `${data.currentDate} के लिए आज की तिथि क्या है?`
        : `What is the exact Tithi for today, ${data.currentDate}?`,
      answer: hi
        ? `दिल्ली सूर्योदय पर आज ${data.currentPaksha} की ${data.currentTithi} है। यह ${data.tithiEndTime} IST तक रहती है। अगली तिथि ${data.nextTithi} है।`
        : `At Delhi sunrise today is ${data.currentTithi} (${data.currentPaksha}). It holds until ${data.tithiEndTime} IST. The next tithi is ${data.nextTithi}.`,
    },
    {
      question: hi
        ? "क्या आज कोई विशेष हिन्दू त्योहार या व्रत है?"
        : "Are there any special Hindu festivals or fasts today?",
      answer: festivals.length
        ? hi
          ? `आज का चिह्न: ${festivals.join(", ")}। मंदिर की आरती और व्रत की रीति स्थानीय रूप से पूछें — हम घड़ी नहीं गढ़ते।`
          : `Marked today: ${festivals.join(", ")}. Confirm aarti and vrata custom locally — we do not invent temple clocks.`
        : hi
          ? "इस तिथि पर हमारे पंचांग में कोई विशेष त्योहार अंकित नहीं है। साधारण दिन भी जप के लिए पर्याप्त हैं।"
          : "No special festival is marked on this tithi in our panchang. An ordinary day is still enough for jaap.",
    },
    {
      question: hi ? "आज राहु काल किस समय है?" : "What time is Rahu Kaal today?",
      answer: hi
        ? `दिल्ली के लिए आज राहु काल ${data.rahuKaalStart} से ${data.rahuKaalEnd} IST तक है।`
        : `Rahu Kaal for Delhi today is ${data.rahuKaalStart} – ${data.rahuKaalEnd} IST.`,
    },
    {
      question: hi ? "आज कौन सा नक्षत्र चल रहा है?" : "Which Nakshatra is active today?",
      answer: hi
        ? `दिल्ली सूर्योदय पर नक्षत्र ${data.currentNakshatra} है।`
        : `The nakshatra at Delhi sunrise is ${data.currentNakshatra}.`,
    },
  ];
}

export function tithiPageMeta(data: TithiPageData, locale: Locale) {
  const hi = locale === "hi";
  return {
    title: hi
      ? `आज की तिथि: ${data.currentTithi}, ${data.currentDate}`
      : `Aaj Ki Tithi: ${data.currentTithi}, ${data.currentDate}`,
    description: hi
      ? `आज ${data.currentTithi} है — ${data.currentPaksha}, ${data.currentMasa}, विक्रम संवत ${data.currentVikramSamvat}। सूर्योदय ${data.sunriseTime}, राहु काल ${data.rahuKaalStart}–${data.rahuKaalEnd} IST (दिल्ली)।`
      : `Today is ${data.currentTithi} — ${data.currentPaksha} of ${data.currentMasa}, Vikram Samvat ${data.currentVikramSamvat}. Sunrise ${data.sunriseTime}, Rahu Kaal ${data.rahuKaalStart}–${data.rahuKaalEnd} IST for Delhi.`,
  };
}
