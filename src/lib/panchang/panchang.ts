import {
  elongation,
  istCalendarDate,
  istWeekday,
  lahiriAyanamsa,
  lastFullMoon,
  lastNewMoon,
  NAKSHATRA_SPAN,
  nextFullMoon,
  nextNewMoon,
  siderealLon,
  startOfIstDay,
  sunriseDelhi,
  sunsetDelhi,
  tithiEnd,
  tithiIndex,
  tithiStart,
  tropicalMoonLon,
  tropicalSunLon,
} from "./astronomy";
import {
  DELHI,
  KARANA_NAMES,
  MASA_NAMES,
  MASA_NAMES_HI,
  NAKSHATRA_NAMES,
  RAHU_KAAL_PERIOD,
  RITU_NAMES,
  RITU_NAMES_HI,
  TITHI_NAMES,
  TITHI_NAMES_HI,
  VARA_NAMES,
  VARA_NAMES_HI,
  YOGA_NAMES,
} from "./names";
import { observancesFor } from "./observances";
import type { DayPanchang, Paksha, TithiSnapshot } from "./types";

function tithiSnapshot(date: Date): TithiSnapshot {
  const index = tithiIndex(date);
  const paksha: Paksha = index < 15 ? "shukla" : "krishna";
  const number = (index % 15) + 1;
  const isPurnima = paksha === "shukla" && number === 15;
  const isAmavasya = paksha === "krishna" && number === 15;
  const name = isPurnima
    ? "Purnima"
    : isAmavasya
      ? "Amavasya"
      : TITHI_NAMES[number - 1];
  const nameHi = isPurnima
    ? "पूर्णिमा"
    : isAmavasya
      ? "अमावस्या"
      : TITHI_NAMES_HI[number - 1];
  return {
    index,
    number,
    paksha,
    name,
    nameHi,
    start: tithiStart(date),
    end: tithiEnd(date),
  };
}

function sunRasiIndex(date: Date): number {
  const sidereal = siderealLon(tropicalSunLon(date), date);
  return Math.min(11, Math.floor(sidereal / 30));
}

function amantaMasa(date: Date): { index: number; adhika: boolean } {
  const last = lastNewMoon(date);
  const next = nextNewMoon(date);
  const index = sunRasiIndex(last);
  const adhika = sunRasiIndex(next) === index;
  return { index, adhika };
}

function purnimantaMasa(date: Date, paksha: Paksha): { index: number; adhika: boolean } {
  const last = lastFullMoon(date);
  const next = nextFullMoon(date);
  const index = sunRasiIndex(paksha === "shukla" ? next : last);
  return { index, adhika: sunRasiIndex(last) === sunRasiIndex(next) };
}

function vikramSamvat(date: Date, masaIndex: number): number {
  const year = istCalendarDate(date).year;
  return masaIndex >= 9 ? year + 56 : year + 57;
}

function rituFromMasa(masaIndex: number): { name: string; nameHi: string } {
  const ritu = Math.floor(masaIndex / 2);
  return { name: RITU_NAMES[ritu], nameHi: RITU_NAMES_HI[ritu] };
}

function nakshatraAt(date: Date): { name: string; pada: number } {
  const moon = siderealLon(tropicalMoonLon(date), date);
  const span = moon / NAKSHATRA_SPAN;
  const index = Math.min(26, Math.floor(span));
  const pada = Math.min(4, Math.floor((span - index) * 4) + 1);
  return { name: NAKSHATRA_NAMES[index], pada };
}

function yogaAt(date: Date): { name: string } {
  const sum = wrapSidereal(tropicalSunLon(date), tropicalMoonLon(date), date);
  const index = Math.min(26, Math.floor(sum / NAKSHATRA_SPAN));
  return { name: YOGA_NAMES[index] };
}

function wrapSidereal(sunTrop: number, moonTrop: number, date: Date): number {
  const ayan = lahiriAyanamsa(date);
  const sun = ((sunTrop - ayan) % 360 + 360) % 360;
  const moon = ((moonTrop - ayan) % 360 + 360) % 360;
  return (sun + moon) % 360;
}

function karanaAt(date: Date): { name: string } {
  const half = Math.floor(elongation(date) / 6);
  if (half === 0) return { name: KARANA_NAMES[10] };
  if (half === 57) return { name: KARANA_NAMES[7] };
  if (half === 58) return { name: KARANA_NAMES[8] };
  if (half === 59) return { name: KARANA_NAMES[9] };
  return { name: KARANA_NAMES[(half - 1) % 7] };
}

function rahuKaal(sunrise: Date, sunset: Date, weekday: number): { start: Date; end: Date } {
  const period = RAHU_KAAL_PERIOD[weekday];
  const slice = (sunset.getTime() - sunrise.getTime()) / 8;
  const start = new Date(sunrise.getTime() + (period - 1) * slice);
  const end = new Date(sunrise.getTime() + period * slice);
  return { start, end };
}

function gregorianLabel(date: Date): string {
  return new Intl.DateTimeFormat("hi-IN", {
    timeZone: DELHI.timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function dayBlock(date: Date): Omit<DayPanchang, "upcoming" | "tithiNow" | "instant"> & {
  tithiNow: TithiSnapshot;
  instant: Date;
} {
  const sunrise = sunriseDelhi(date);
  const sunset = sunsetDelhi(date);
  const weekday = istWeekday(sunrise);
  const atSunrise = tithiSnapshot(sunrise);
  const now = tithiSnapshot(date);
  const amanta = amantaMasa(sunrise);
  const purnimanta = purnimantaMasa(sunrise, atSunrise.paksha);
  return {
    instant: date,
    location: `${DELHI.name} (${DELHI.timeZone})`,
    weekday,
    weekdayName: VARA_NAMES[weekday],
    weekdayNameHi: VARA_NAMES_HI[weekday],
    gregorianLabel: gregorianLabel(sunrise),
    sunrise,
    sunset,
    tithiAtSunrise: atSunrise,
    tithiNow: now,
    masaAmanta: {
      index: amanta.index,
      name: MASA_NAMES[amanta.index],
      nameHi: MASA_NAMES_HI[amanta.index],
      adhika: amanta.adhika,
    },
    masaPurnimanta: {
      index: purnimanta.index,
      name: MASA_NAMES[purnimanta.index],
      nameHi: MASA_NAMES_HI[purnimanta.index],
      adhika: purnimanta.adhika,
    },
    vikramSamvat: vikramSamvat(sunrise, purnimanta.index),
    ritu: rituFromMasa(purnimanta.index),
    nakshatra: nakshatraAt(sunrise),
    yoga: yogaAt(sunrise),
    karana: karanaAt(sunrise),
    rahuKaal: rahuKaal(sunrise, sunset, weekday),
    observances: observancesFor({
      masaIndex: purnimanta.index,
      paksha: atSunrise.paksha,
      tithiNumber: atSunrise.number,
      weekday,
    }),
  };
}

export function getPanchang(now = new Date(), upcomingDays = 7): DayPanchang {
  const today = dayBlock(now);
  const upcoming = [];
  for (let offset = 1; offset <= upcomingDays; offset += 1) {
    const day = new Date(startOfIstDay(now).getTime() + offset * 86_400_000 + 8 * 3600_000);
    const block = dayBlock(day);
    upcoming.push({
      date: block.sunrise,
      weekdayName: block.weekdayName,
      weekdayNameHi: block.weekdayNameHi,
      tithi: block.tithiAtSunrise,
      masaName: block.masaPurnimanta.name,
      masaNameHi: block.masaPurnimanta.nameHi,
      observances: block.observances,
    });
  }
  return { ...today, upcoming };
}

export function formatIstTime(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    timeZone: DELHI.timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatIstDateTime(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    timeZone: DELHI.timeZone,
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatIstDate(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    timeZone: DELHI.timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function pakshaLabel(paksha: Paksha): { en: string; hi: string } {
  return paksha === "shukla"
    ? { en: "Shukla paksha", hi: "शुक्ल पक्ष" }
    : { en: "Krishna paksha", hi: "कृष्ण पक्ष" };
}
