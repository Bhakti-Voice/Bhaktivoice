import { Body, MoonPhase, Observer, SearchMoonPhase } from "astronomy-engine";
import {
  KARANA_NAMES,
  MASA_NAMES,
  MASA_NAMES_HI,
  RAHU_KAAL_PERIOD,
  RITU_NAMES,
  RITU_NAMES_HI,
  TITHI_NAMES,
  TITHI_NAMES_HI,
  VARA_NAMES,
  VARA_NAMES_HI,
  YOGA_NAMES,
} from "@/lib/panchang/names";
import type { ClientPanchangResult } from "./types";
import {
  moonSiderealAt,
  NAKSHATRA_SPAN,
  nakshatraFromSidereal,
  sunriseAt,
  sunsetAt,
  sunSiderealAt,
  wrap360,
} from "./core-astro";
import { formatDateLong } from "./geo";

function tithiIndex(date: Date): number {
  return Math.min(29, Math.floor(wrap360(MoonPhase(date)) / 12));
}

function tithiLabel(index: number): { name: string; nameHi: string; paksha: string; pakshaHi: string } {
  const paksha = index < 15 ? "Shukla" : "Krishna";
  const pakshaHi = index < 15 ? "शुक्ल" : "कृष्ण";
  const number = (index % 15) + 1;
  if (paksha === "Shukla" && number === 15) {
    return { name: "Purnima", nameHi: "पूर्णिमा", paksha, pakshaHi };
  }
  if (paksha === "Krishna" && number === 15) {
    return { name: "Amavasya", nameHi: "अमावस्या", paksha, pakshaHi };
  }
  return { name: TITHI_NAMES[number - 1], nameHi: TITHI_NAMES_HI[number - 1], paksha, pakshaHi };
}

function yogaAt(date: Date): string {
  const sun = wrap360(sunSiderealAt(date));
  const moon = wrap360(moonSiderealAt(date));
  const sum = (sun + moon) % 360;
  return YOGA_NAMES[Math.min(26, Math.floor(sum / NAKSHATRA_SPAN))];
}

function karanaAt(date: Date): string {
  const half = Math.floor(wrap360(MoonPhase(date)) / 6);
  if (half === 0) return KARANA_NAMES[10];
  if (half >= 57) return KARANA_NAMES[Math.min(9, half - 57 + 7)];
  return KARANA_NAMES[(half - 1) % 7];
}

function masaIndex(date: Date): number {
  const sun = sunSiderealAt(date);
  return Math.min(11, Math.floor(sun / 30));
}

function weekdayIndex(date: Date, timeZone: string): number {
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(date);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
}

function rahuKaal(sunrise: Date, sunset: Date, weekday: number) {
  const period = RAHU_KAAL_PERIOD[weekday];
  const slice = (sunset.getTime() - sunrise.getTime()) / 8;
  return {
    start: new Date(sunrise.getTime() + (period - 1) * slice),
    end: new Date(sunrise.getTime() + period * slice),
  };
}

export function getClientPanchang(
  latitude: number,
  longitude: number,
  timeZone: string,
  locationLabel: string,
  now = new Date(),
): ClientPanchangResult {
  const observer = new Observer(latitude, longitude, 0);
  const sunrise = sunriseAt(observer, now);
  const sunset = sunsetAt(observer, sunrise);
  const weekday = weekdayIndex(sunrise, timeZone);
  const tithi = tithiLabel(tithiIndex(sunrise));
  const nakshatra = nakshatraFromSidereal(moonSiderealAt(sunrise));
  const masa = masaIndex(sunrise);

  return {
    locationLabel,
    latitude,
    longitude,
    timeZone,
    gregorianLabel: formatDateLong(now, timeZone),
    weekdayName: VARA_NAMES[weekday],
    weekdayNameHi: VARA_NAMES_HI[weekday],
    sunrise,
    sunset,
    tithi,
    nakshatra: { name: nakshatra.name, nameHi: nakshatra.nameHi, pada: nakshatra.pada },
    yoga: yogaAt(sunrise),
    karana: karanaAt(sunrise),
    rahuKaal: rahuKaal(sunrise, sunset, weekday),
    masa: { name: MASA_NAMES[masa], nameHi: MASA_NAMES_HI[masa] },
    ritu: { name: RITU_NAMES[Math.floor(masa / 2)], nameHi: RITU_NAMES_HI[Math.floor(masa / 2)] },
  };
}

/** Abhijit muhurat — midday window (~24 min centered on solar noon). */
export function abhijitMuhurat(sunrise: Date, sunset: Date): { start: Date; end: Date } {
  const noon = new Date((sunrise.getTime() + sunset.getTime()) / 2);
  const half = 12 * 60_000;
  return { start: new Date(noon.getTime() - half), end: new Date(noon.getTime() + half) };
}

export function nextPhaseBoundary(date: Date, days = 1.5): Date | null {
  const found = SearchMoonPhase(wrap360(MoonPhase(date) + 12), date, days);
  return found?.date ?? null;
}

export { Observer, Body };
