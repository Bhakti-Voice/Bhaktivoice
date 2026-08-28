import {
  Body,
  EclipticGeoMoon,
  MoonPhase,
  Observer,
  SearchMoonPhase,
  SearchRiseSet,
  SunPosition,
  Illumination,
} from "astronomy-engine";

import {
  GULIKA_PERIOD,
  KARANA_NAMES,
  KARANA_NAMES_HI,
  NAKSHATRA_DEITIES,
  NAKSHATRA_NAMES,
  NAKSHATRA_NAMES_HI,
  RAHU_KAAL_PERIOD,
  RASI_NAMES,
  RASI_NAMES_HI,
  TITHI_NAMES,
  TITHI_NAMES_HI,
  YAMAGANDA_PERIOD,
  YOGA_NAMES,
  YOGA_NAMES_HI,
} from "./names";
import type {
  ChoghadiyaPeriod,
  KaranaSnapshot,
  MoonData,
  MuhuratWindow,
  NakshatraSnapshot,
  Paksha,
  TithiSnapshot,
  YogaSnapshot,
} from "./types";
import type { CityConfig } from "./cities";

export const NAKSHATRA_SPAN = 360 / 27; // 13.333333°
export const TITHI_SPAN = 360 / 30; // 12°
export const YOGA_SPAN = 360 / 27; // 13.333333°
export const RASI_SPAN = 30; // 30°

export function julianDay(date: Date): number {
  return date.getTime() / 86_400_000 + 2_440_587.5;
}

/** Lahiri (Chitrapaksha) ayanamsa in degrees. */
export function lahiriAyanamsa(date: Date): number {
  const jd = julianDay(date);
  const years = (jd - 2_451_545.0) / 365.2422;
  return 23.853139 + (50.2388475 / 3600) * years;
}

export function wrap360(value: number): number {
  const wrapped = value % 360;
  return wrapped < 0 ? wrapped + 360 : wrapped;
}

export function tropicalSunLon(date: Date): number {
  return wrap360(SunPosition(date).elon);
}

export function tropicalMoonLon(date: Date): number {
  return wrap360(EclipticGeoMoon(date).lon);
}

export function siderealLon(tropical: number, date: Date): number {
  return wrap360(tropical - lahiriAyanamsa(date));
}

/** Moon−Sun elongation in degrees [0, 360). */
export function elongation(date: Date): number {
  return wrap360(MoonPhase(date));
}

export function tithiIndex(date: Date): number {
  return Math.min(29, Math.floor(elongation(date) / 12));
}

export function getObserver(city: CityConfig): Observer {
  return new Observer(city.latitude, city.longitude, city.elevationMeters);
}

export function calendarDateForZone(date: Date, timeZone: string): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const pick = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: pick("year"), month: pick("month"), day: pick("day") };
}

export function weekdayForZone(date: Date, timeZone: string): number {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(date);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
}

/** Midnight at the start of this civil day in city's time zone. */
export function startOfDayForZone(date: Date, timeZone: string): Date {
  const { year, month, day } = calendarDateForZone(date, timeZone);
  // IST offset is UTC + 5:30 = 330 mins
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0) - (5 * 60 + 30) * 60 * 1000);
}

export function getSunrise(date: Date, city: CityConfig): Date {
  const observer = getObserver(city);
  const midnight = startOfDayForZone(date, city.timeZone);
  const rise = SearchRiseSet(Body.Sun, observer, +1, midnight, 1);
  return rise?.date ?? new Date(midnight.getTime() + 6 * 3600_000);
}

export function getSunset(date: Date, city: CityConfig): Date {
  const observer = getObserver(city);
  const rise = getSunrise(date, city);
  const set = SearchRiseSet(Body.Sun, observer, -1, rise, 1);
  return set?.date ?? new Date(rise.getTime() + 12 * 3600_000);
}

export function getMoonrise(date: Date, city: CityConfig): Date | null {
  const observer = getObserver(city);
  const midnight = startOfDayForZone(date, city.timeZone);
  const rise = SearchRiseSet(Body.Moon, observer, +1, midnight, 1.2);
  return rise ? rise.date : null;
}

export function getMoonset(date: Date, city: CityConfig): Date | null {
  const observer = getObserver(city);
  const midnight = startOfDayForZone(date, city.timeZone);
  const set = SearchRiseSet(Body.Moon, observer, -1, midnight, 1.2);
  return set ? set.date : null;
}

export function searchPhase(targetLon: number, from: Date, limitDays: number): Date | null {
  const found = SearchMoonPhase(targetLon, from, limitDays);
  return found ? found.date : null;
}

export function lastNewMoon(date: Date): Date {
  return searchPhase(0, date, -40) ?? new Date(date.getTime() - 29.5 * 86_400_000);
}

export function nextNewMoon(date: Date): Date {
  const soon = searchPhase(0, new Date(date.getTime() + 60_000), 40);
  return soon ?? new Date(date.getTime() + 29.5 * 86_400_000);
}

export function lastFullMoon(date: Date): Date {
  return searchPhase(180, date, -40) ?? new Date(date.getTime() - 14 * 86_400_000);
}

export function nextFullMoon(date: Date): Date {
  return searchPhase(180, new Date(date.getTime() + 60_000), 40) ?? new Date(date.getTime() + 14 * 86_400_000);
}

export function tithiBoundary(index: number): number {
  return wrap360(index * 12);
}

export function tithiStart(date: Date): Date {
  const index = tithiIndex(date);
  const target = tithiBoundary(index);
  const found = searchPhase(target, date, -2);
  return found ?? new Date(date.getTime() - 12 * 3600_000);
}

export function tithiEnd(date: Date): Date {
  const index = tithiIndex(date);
  const target = tithiBoundary((index + 1) % 30);
  const found = searchPhase(target, new Date(date.getTime() + 60_000), 2.2);
  return found ?? new Date(date.getTime() + 12 * 3600_000);
}

export function getTithiSnapshot(date: Date): TithiSnapshot {
  const index = tithiIndex(date);
  const paksha: Paksha = index < 15 ? "shukla" : "krishna";
  const number = (index % 15) + 1;
  const isPurnima = paksha === "shukla" && number === 15;
  const isAmavasya = paksha === "krishna" && number === 15;
  const name = isPurnima ? "Purnima" : isAmavasya ? "Amavasya" : TITHI_NAMES[number - 1];
  const nameHi = isPurnima ? "पूर्णिमा" : isAmavasya ? "अमावस्या" : TITHI_NAMES_HI[number - 1];
  const start = tithiStart(date);
  const end = tithiEnd(date);
  const total = end.getTime() - start.getTime();
  const elapsed = Math.max(0, date.getTime() - start.getTime());
  const progressPercent = total > 0 ? Math.min(100, Math.round((elapsed / total) * 100)) : 50;

  return {
    index,
    number,
    paksha,
    name,
    nameHi,
    start,
    end,
    progressPercent,
  };
}

export function sunRasi(date: Date): { index: number; name: string; nameHi: string } {
  const sidereal = siderealLon(tropicalSunLon(date), date);
  const index = Math.min(11, Math.floor(sidereal / 30));
  return { index, name: RASI_NAMES[index], nameHi: RASI_NAMES_HI[index] };
}

export function moonRasi(date: Date): { index: number; name: string; nameHi: string } {
  const sidereal = siderealLon(tropicalMoonLon(date), date);
  const index = Math.min(11, Math.floor(sidereal / 30));
  return { index, name: RASI_NAMES[index], nameHi: RASI_NAMES_HI[index] };
}

export function getNakshatraSnapshot(date: Date): NakshatraSnapshot {
  const moon = siderealLon(tropicalMoonLon(date), date);
  const span = moon / NAKSHATRA_SPAN;
  const index = Math.min(26, Math.floor(span));
  const pada = Math.min(4, Math.floor((span - index) * 4) + 1);

  // Approximate start/end
  const fractionPast = span - index;
  const approxDurationMs = 24.2 * 3600_000;
  const start = new Date(date.getTime() - fractionPast * approxDurationMs);
  const end = new Date(start.getTime() + approxDurationMs);

  return {
    index,
    name: NAKSHATRA_NAMES[index],
    nameHi: NAKSHATRA_NAMES_HI[index],
    pada,
    deity: NAKSHATRA_DEITIES[index],
    start,
    end,
  };
}

function wrapSidereal(sunTrop: number, moonTrop: number, date: Date): number {
  const ayan = lahiriAyanamsa(date);
  const sun = wrap360(sunTrop - ayan);
  const moon = wrap360(moonTrop - ayan);
  return wrap360(sun + moon);
}

export function getYogaSnapshot(date: Date): YogaSnapshot {
  const sum = wrapSidereal(tropicalSunLon(date), tropicalMoonLon(date), date);
  const index = Math.min(26, Math.floor(sum / YOGA_SPAN));
  const fraction = (sum / YOGA_SPAN) - index;
  const approxDurationMs = 23 * 3600_000;
  const start = new Date(date.getTime() - fraction * approxDurationMs);
  const end = new Date(start.getTime() + approxDurationMs);

  return {
    index,
    name: YOGA_NAMES[index],
    nameHi: YOGA_NAMES_HI[index],
    start,
    end,
  };
}

export function getKaranaSnapshot(date: Date): KaranaSnapshot {
  const elon = elongation(date);
  const half = Math.floor(elon / 6);
  let index = 0;
  if (half === 0) index = 10; // Kimstughna
  else if (half === 57) index = 7; // Shakuni
  else if (half === 58) index = 8; // Chatushpada
  else if (half === 59) index = 9; // Naga
  else index = (half - 1) % 7;

  const fraction = (elon % 6) / 6;
  const approxDurationMs = 12 * 3600_000;
  const start = new Date(date.getTime() - fraction * approxDurationMs);
  const end = new Date(start.getTime() + approxDurationMs);

  return {
    index,
    name: KARANA_NAMES[index],
    nameHi: KARANA_NAMES_HI[index],
    start,
    end,
  };
}

export function getMoonData(date: Date, city: CityConfig): MoonData {
  const moonrise = getMoonrise(date, city);
  const moonset = getMoonset(date, city);
  const illum = Illumination(Body.Moon, date);
  const illuminationPercent = Math.round(illum.phase_fraction * 100);
  const phaseAngle = wrap360(MoonPhase(date));
  const rasi = moonRasi(date);

  let phaseName = "Waxing Crescent";
  let phaseNameHi = "शुक्ल पक्ष द्वितीया-तृतीया";
  if (phaseAngle < 15 || phaseAngle >= 345) {
    phaseName = "New Moon (Amavasya)";
    phaseNameHi = "अमावस्या";
  } else if (phaseAngle >= 15 && phaseAngle < 75) {
    phaseName = "Waxing Crescent";
    phaseNameHi = "शुक्ल पक्ष (बाल चन्द्र)";
  } else if (phaseAngle >= 75 && phaseAngle < 105) {
    phaseName = "First Quarter";
    phaseNameHi = "शुक्ल पक्ष अष्टमी";
  } else if (phaseAngle >= 105 && phaseAngle < 165) {
    phaseName = "Waxing Gibbous";
    phaseNameHi = "शुक्ल पक्ष एकादशी-त्रयोदशी";
  } else if (phaseAngle >= 165 && phaseAngle < 195) {
    phaseName = "Full Moon (Purnima)";
    phaseNameHi = "पूर्णिमा (पूर्ण चन्द्र)";
  } else if (phaseAngle >= 195 && phaseAngle < 255) {
    phaseName = "Waning Gibbous";
    phaseNameHi = "कृष्ण पक्ष द्वितीया-पंचमी";
  } else if (phaseAngle >= 255 && phaseAngle < 285) {
    phaseName = "Third Quarter";
    phaseNameHi = "कृष्ण पक्ष अष्टमी";
  } else {
    phaseName = "Waning Crescent";
    phaseNameHi = "कृष्ण पक्ष एकादशी-चतुर्दशी";
  }

  return {
    moonrise,
    moonset,
    illumination: illuminationPercent,
    phaseName,
    phaseNameHi,
    phaseAngle,
    sign: rasi.name,
    signHi: rasi.nameHi,
  };
}

/** Calculate all auspicious & inauspicious Muhurats for a given day. */
export function calculateMuhurats(sunrise: Date, sunset: Date, weekday: number, _nakshatra?: NakshatraSnapshot): {

  brahma: MuhuratWindow;
  abhijit: MuhuratWindow | null;
  amritKaal: MuhuratWindow | null;
  godhuli: MuhuratWindow;
  vijaya: MuhuratWindow;
  nishita: MuhuratWindow;
  rahuKaal: MuhuratWindow;
  yamaganda: MuhuratWindow;
  gulika: MuhuratWindow;
  durMuhurat: MuhuratWindow[];
  varjyam: MuhuratWindow | null;
} {
  const daySpan = sunset.getTime() - sunrise.getTime();
  const muhuratSpan = daySpan / 15; // 1 Muhurat = 1/15th of daytime (approx 48 mins)
  const eighthSlice = daySpan / 8;

  // Brahma Muhurat: 2 muhurats before sunrise = 96 mins to 48 mins before sunrise
  const brahmaStart = new Date(sunrise.getTime() - 96 * 60_000);
  const brahmaEnd = new Date(sunrise.getTime() - 48 * 60_000);
  const brahma: MuhuratWindow = {
    name: "Brahma Muhurat",
    nameHi: "ब्रह्म मुहूर्त",
    start: brahmaStart,
    end: brahmaEnd,
    isAuspicious: true,
    description: "Best for meditation, mantra jaap, study, and spiritual sadhana.",
    descriptionHi: "ध्यान, मन्त्र जप एवं साधना हेतु सर्वश्रेष्ठ समय।",
  };

  // Abhijit Muhurat: 8th muhurat of the day (midday). None on Wednesday (weekday === 3)
  let abhijit: MuhuratWindow | null = null;
  if (weekday !== 3) {
    const abhijitStart = new Date(sunrise.getTime() + 7 * muhuratSpan);
    const abhijitEnd = new Date(sunrise.getTime() + 8 * muhuratSpan);
    abhijit = {
      name: "Abhijit Muhurat",
      nameHi: "अभिजित मुहूर्त",
      start: abhijitStart,
      end: abhijitEnd,
      isAuspicious: true,
      description: "Highly auspicious for all positive endeavors, travel, and new starts.",
      descriptionHi: "सभी शुभ कार्यों, नए आरम्भ व यात्रा के लिए अति फलदायी।",
    };
  }

  // Godhuli Muhurat: 24 mins before sunset to 24 mins after
  const godhuli: MuhuratWindow = {
    name: "Godhuli Muhurat",
    nameHi: "गोधूलि मुहूर्त",
    start: new Date(sunset.getTime() - 24 * 60_000),
    end: new Date(sunset.getTime() + 24 * 60_000),
    isAuspicious: true,
    description: "Ideal for evening sandhya, lighting diya, and Lakshmi puja.",
    descriptionHi: "सायंकालीन सन्ध्या, दीप प्रज्वलन व पूजा हेतु उत्तम।",
  };

  // Vijaya Muhurat: 11th muhurat of daytime
  const vijaya: MuhuratWindow = {
    name: "Vijaya Muhurat",
    nameHi: "विजय मुहूर्त",
    start: new Date(sunrise.getTime() + 10 * muhuratSpan),
    end: new Date(sunrise.getTime() + 11 * muhuratSpan),
    isAuspicious: true,
    description: "Auspicious for overcoming obstacles and starting critical tasks.",
    descriptionHi: "बाधाओं पर विजय और महत्वपूर्ण कार्यों की शुरुआत के लिए शुभ।",
  };

  // Nishita Muhurat: Midnight muhurat (approx 11:45 PM - 12:35 AM)
  const midnight = new Date(sunset.getTime() + (24 * 3600_000 - daySpan) / 2);
  const nishita: MuhuratWindow = {
    name: "Nishita Muhurat",
    nameHi: "निशिता मुहूर्त",
    start: new Date(midnight.getTime() - 24 * 60_000),
    end: new Date(midnight.getTime() + 24 * 60_000),
    isAuspicious: true,
    description: "Sacred window for Shiva puja, Tantra sadhana, and Deepawali Lakshmi puja.",
    descriptionHi: "शिव पूजा, साधना एवं दीपावली लक्ष्मी पूजन हेतु सिद्ध काल।",
  };

  // Rahu Kaal: 1/8th division
  const rahuPeriod = RAHU_KAAL_PERIOD[weekday];
  const rahuKaal: MuhuratWindow = {
    name: "Rahu Kaal",
    nameHi: "राहु काल",
    start: new Date(sunrise.getTime() + (rahuPeriod - 1) * eighthSlice),
    end: new Date(sunrise.getTime() + rahuPeriod * eighthSlice),
    isAuspicious: false,
    description: "Avoid starting new ventures, financial investments, or travel.",
    descriptionHi: "नए कार्य, धन निवेश व शुभ यात्रा आरम्भ करने से बचें।",
  };

  // Yamaganda
  const yamaPeriod = YAMAGANDA_PERIOD[weekday];
  const yamaganda: MuhuratWindow = {
    name: "Yamaganda",
    nameHi: "यमगण्ड काल",
    start: new Date(sunrise.getTime() + (yamaPeriod - 1) * eighthSlice),
    end: new Date(sunrise.getTime() + yamaPeriod * eighthSlice),
    isAuspicious: false,
    description: "Inauspicious period ruled by Yama.",
    descriptionHi: "यम द्वारा शासित अशुभ समय।",
  };

  // Gulika Kaal
  const gulikaPeriod = GULIKA_PERIOD[weekday];
  const gulika: MuhuratWindow = {
    name: "Gulika Kaal",
    nameHi: "गुलिक काल",
    start: new Date(sunrise.getTime() + (gulikaPeriod - 1) * eighthSlice),
    end: new Date(sunrise.getTime() + gulikaPeriod * eighthSlice),
    isAuspicious: false,
    description: "Associated with Saturn (Shani), avoid starting major auspicious acts.",
    descriptionHi: "शनि से सम्बद्ध समय, महत्वपूर्ण शुभ कार्यों से बचें।",
  };

  // Dur Muhurat: 2 windows during daytime depending on weekday
  const durMuhurat: MuhuratWindow[] = [];
  const durSlices: Record<number, number[]> = {
    0: [14], // Sunday 14th muhurat
    1: [8, 12], // Monday
    2: [2, 7], // Tuesday
    3: [8], // Wednesday
    4: [6, 12], // Thursday
    5: [4, 9], // Friday
    6: [1, 2], // Saturday
  };
  const targetMuhurats = durSlices[weekday] || [8];
  for (const mIndex of targetMuhurats) {
    durMuhurat.push({
      name: "Dur Muhurat",
      nameHi: "दुर्मुहूर्त",
      start: new Date(sunrise.getTime() + (mIndex - 1) * muhuratSpan),
      end: new Date(sunrise.getTime() + mIndex * muhuratSpan),
      isAuspicious: false,
      description: "Inauspicious window according to Vedic muhurat rules.",
      descriptionHi: "अशुभ मुहूर्त अवधि।",
    });
  }

  // Varjyam: approximate 1.5 hour period derived from Nakshatra
  const varjyamStart = new Date(sunrise.getTime() + 3.5 * muhuratSpan);
  const varjyamEnd = new Date(varjyamStart.getTime() + 90 * 60_000);
  const varjyam: MuhuratWindow = {
    name: "Varjyam",
    nameHi: "वर्ज्यम्",
    start: varjyamStart,
    end: varjyamEnd,
    isAuspicious: false,
    description: "Inauspicious tyajya period.",
    descriptionHi: "त्याज्य व वर्जित काल।",
  };

  // Amrit Kaal: approximate 1.5 hour period after Varjyam
  const amritStart = new Date(varjyamEnd.getTime() + 2 * 3600_000);
  const amritEnd = new Date(amritStart.getTime() + 90 * 60_000);
  const amritKaal: MuhuratWindow = {
    name: "Amrit Kaal",
    nameHi: "अमृत काल",
    start: amritStart,
    end: amritEnd,
    isAuspicious: true,
    description: "Nectar period, highly potent for health, remedies, and ceremonies.",
    descriptionHi: "अमृत तुल्य फलदायी समय, आरोग्य व पूजा हेतु श्रेष्ठ।",
  };

  return {
    brahma,
    abhijit,
    amritKaal,
    godhuli,
    vijaya,
    nishita,
    rahuKaal,
    yamaganda,
    gulika,
    durMuhurat,
    varjyam,
  };
}

export const CHOGHADIYA_ORDER = [
  // Sunday daytime start: Udveg
  ["Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg"],
  // Monday daytime start: Amrit
  ["Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit"],
  // Tuesday daytime start: Rog
  ["Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog"],
  // Wednesday daytime start: Labh
  ["Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh"],
  // Thursday daytime start: Shubh
  ["Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh"],
  // Friday daytime start: Char
  ["Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char"],
  // Saturday daytime start: Kaal
  ["Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal"],
] as const;

export const CHOGHADIYA_INFO: Record<
  string,
  { nameHi: string; type: "Amrit" | "Shubh" | "Labh" | "Char" | "Rog" | "Kaal" | "Udveg"; nature: "shubh" | "ashubh" | "madhyam"; ruler: string }
> = {
  Amrit: { nameHi: "अमृत", type: "Amrit", nature: "shubh", ruler: "Moon (Chandra)" },
  Shubh: { nameHi: "शुभ", type: "Shubh", nature: "shubh", ruler: "Jupiter (Brihaspati)" },
  Labh: { nameHi: "लाभ", type: "Labh", nature: "shubh", ruler: "Mercury (Budha)" },
  Char: { nameHi: "चर", type: "Char", nature: "madhyam", ruler: "Venus (Shukra)" },
  Rog: { nameHi: "रोग", type: "Rog", nature: "ashubh", ruler: "Mars (Mangal)" },
  Kaal: { nameHi: "काल", type: "Kaal", nature: "ashubh", ruler: "Saturn (Shani)" },
  Udveg: { nameHi: "उद्वेग", type: "Udveg", nature: "ashubh", ruler: "Sun (Surya)" },
};

export function calculateChoghadiya(sunrise: Date, sunset: Date, nextSunrise: Date, weekday: number): {
  day: ChoghadiyaPeriod[];
  night: ChoghadiyaPeriod[];
} {
  const daySlice = (sunset.getTime() - sunrise.getTime()) / 8;
  const nightSlice = (nextSunrise.getTime() - sunset.getTime()) / 8;
  const dayNames = CHOGHADIYA_ORDER[weekday];
  
  // Night order starts from 5th Choghadiya after day
  const nightNames = CHOGHADIYA_ORDER[(weekday + 4) % 7];

  const day: ChoghadiyaPeriod[] = [];
  for (let i = 0; i < 8; i++) {
    const name = dayNames[i];
    const info = CHOGHADIYA_INFO[name] || CHOGHADIYA_INFO.Shubh;
    day.push({
      name,
      nameHi: info.nameHi,
      type: info.type,
      nature: info.nature,
      start: new Date(sunrise.getTime() + i * daySlice),
      end: new Date(sunrise.getTime() + (i + 1) * daySlice),
      ruler: info.ruler,
    });
  }

  const night: ChoghadiyaPeriod[] = [];
  for (let i = 0; i < 8; i++) {
    const name = nightNames[i];
    const info = CHOGHADIYA_INFO[name] || CHOGHADIYA_INFO.Shubh;
    night.push({
      name,
      nameHi: info.nameHi,
      type: info.type,
      nature: info.nature,
      start: new Date(sunset.getTime() + i * nightSlice),
      end: new Date(sunset.getTime() + (i + 1) * nightSlice),
      ruler: info.ruler,
    });
  }

  return { day, night };
}

export function istCalendarDate(date: Date): { year: number; month: number; day: number } {
  return calendarDateForZone(date, "Asia/Kolkata");
}

export function istWeekday(date: Date): number {
  return weekdayForZone(date, "Asia/Kolkata");
}

export function startOfIstDay(date: Date): Date {
  return startOfDayForZone(date, "Asia/Kolkata");
}

export function sunriseDelhi(date: Date): Date {
  const delhiObserver: CityConfig = {
    id: "delhi",
    name: "Delhi",
    nameHi: "नई दिल्ली",
    state: "Delhi",
    stateHi: "दिल्ली",
    latitude: 28.6139,
    longitude: 77.209,
    elevationMeters: 216,
    timeZone: "Asia/Kolkata",
  };
  return getSunrise(date, delhiObserver);
}

export function sunsetDelhi(date: Date): Date {
  const delhiObserver: CityConfig = {
    id: "delhi",
    name: "Delhi",
    nameHi: "नई दिल्ली",
    state: "Delhi",
    stateHi: "दिल्ली",
    latitude: 28.6139,
    longitude: 77.209,
    elevationMeters: 216,
    timeZone: "Asia/Kolkata",
  };
  return getSunset(date, delhiObserver);
}

