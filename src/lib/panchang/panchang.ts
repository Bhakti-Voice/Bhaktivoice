import { DELHI } from "./cities";
import { getPanchang as getPanchangEngine } from "./engine";
import { istCalendarDate } from "./astronomy";
import type { DayPanchang, Paksha } from "./types";

export function getPanchang(now: Date = new Date(), _upcomingDays?: number): DayPanchang {
  return getPanchangEngine(now, DELHI);
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

export function formatIstMonthDayYear(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-US", {
    timeZone: DELHI.timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function isoIstDate(date: Date): string {
  const { year, month, day } = istCalendarDate(date);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function pakshaLabel(paksha: Paksha): { en: string; hi: string } {
  return paksha === "shukla"
    ? { en: "Shukla paksha", hi: "शुक्ल पक्ष" }
    : { en: "Krishna paksha", hi: "कृष्ण पक्ष" };
}
