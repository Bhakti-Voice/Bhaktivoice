import {
  Body,
  EclipticGeoMoon,
  MakeTime,
  MoonPhase,
  Observer,
  SearchMoonPhase,
  SearchRiseSet,
  SunPosition,
} from "astronomy-engine";
import { DELHI } from "./names";

export const NAKSHATRA_SPAN = 360 / 27;

export function julianDay(date: Date): number {
  return date.getTime() / 86_400_000 + 2_440_587.5;
}

/** Lahiri (Chitrapaksha) ayanamsa in degrees. Linear from J2000.0 = 23.853139°. */
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

/** Moon−Sun elongation in degrees [0, 360). Same in tropical and sidereal. */
export function elongation(date: Date): number {
  return wrap360(MoonPhase(date));
}

export function tithiIndex(date: Date): number {
  return Math.min(29, Math.floor(elongation(date) / 12));
}

export const DELHI_OBSERVER = new Observer(DELHI.latitude, DELHI.longitude, DELHI.heightMeters);

export function istCalendarDate(date: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: DELHI.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const pick = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: pick("year"), month: pick("month"), day: pick("day") };
}

export function istWeekday(date: Date): number {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: DELHI.timeZone,
    weekday: "short",
  }).format(date);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
}

/** Midnight at the start of this civil day in India Standard Time. */
export function startOfIstDay(date: Date): Date {
  const { year, month, day } = istCalendarDate(date);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0) - (5 * 60 + 30) * 60 * 1000);
}

export function addIstDays(date: Date, days: number): Date {
  return new Date(startOfIstDay(date).getTime() + days * 86_400_000 + 12 * 60 * 60 * 1000);
}

export function sunriseDelhi(date: Date): Date {
  const midnight = startOfIstDay(date);
  const rise = SearchRiseSet(Body.Sun, DELHI_OBSERVER, +1, midnight, 1);
  return rise?.date ?? new Date(midnight.getTime() + 6 * 3600_000);
}

export function sunsetDelhi(date: Date): Date {
  const rise = sunriseDelhi(date);
  const set = SearchRiseSet(Body.Sun, DELHI_OBSERVER, -1, rise, 1);
  return set?.date ?? new Date(rise.getTime() + 12 * 3600_000);
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

export function makeTime(date: Date) {
  return MakeTime(date);
}
