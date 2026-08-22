import type { BirthPlace } from "./types";

/** Major Indian cities — client-side lookup only; no API calls. */
export const INDIAN_CITIES: BirthPlace[] = [
  { name: "New Delhi", latitude: 28.6139, longitude: 77.209, timeZone: "Asia/Kolkata" },
  { name: "Mumbai", latitude: 19.076, longitude: 72.8777, timeZone: "Asia/Kolkata" },
  { name: "Bengaluru", latitude: 12.9716, longitude: 77.5946, timeZone: "Asia/Kolkata" },
  { name: "Kolkata", latitude: 22.5726, longitude: 88.3639, timeZone: "Asia/Kolkata" },
  { name: "Chennai", latitude: 13.0827, longitude: 80.2707, timeZone: "Asia/Kolkata" },
  { name: "Hyderabad", latitude: 17.385, longitude: 78.4867, timeZone: "Asia/Kolkata" },
  { name: "Ahmedabad", latitude: 23.0225, longitude: 72.5714, timeZone: "Asia/Kolkata" },
  { name: "Pune", latitude: 18.5204, longitude: 73.8567, timeZone: "Asia/Kolkata" },
  { name: "Jaipur", latitude: 26.9124, longitude: 75.7873, timeZone: "Asia/Kolkata" },
  { name: "Lucknow", latitude: 26.8467, longitude: 80.9462, timeZone: "Asia/Kolkata" },
  { name: "Varanasi", latitude: 25.3176, longitude: 82.9739, timeZone: "Asia/Kolkata" },
  { name: "Ayodhya", latitude: 26.7922, longitude: 82.1998, timeZone: "Asia/Kolkata" },
  { name: "Haridwar", latitude: 29.9457, longitude: 78.1642, timeZone: "Asia/Kolkata" },
  { name: "Rishikesh", latitude: 30.0869, longitude: 78.2676, timeZone: "Asia/Kolkata" },
  { name: "Ujjain", latitude: 23.1765, longitude: 75.7885, timeZone: "Asia/Kolkata" },
  { name: "Mathura", latitude: 27.4924, longitude: 77.6737, timeZone: "Asia/Kolkata" },
  { name: "Vrindavan", latitude: 27.582, longitude: 77.7, timeZone: "Asia/Kolkata" },
  { name: "Puri", latitude: 19.8135, longitude: 85.8312, timeZone: "Asia/Kolkata" },
  { name: "Dwarka", latitude: 22.2442, longitude: 68.9685, timeZone: "Asia/Kolkata" },
  { name: "Tirupati", latitude: 13.6288, longitude: 79.4192, timeZone: "Asia/Kolkata" },
];

export function filterCities(query: string): BirthPlace[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return INDIAN_CITIES.slice(0, 8);
  return INDIAN_CITIES.filter((city) => city.name.toLowerCase().includes(needle)).slice(0, 8);
}

export function defaultCity(): BirthPlace {
  return INDIAN_CITIES[0];
}

/** Convert local birth date/time in a timezone to UTC — runs entirely in the browser. */
export function zonedLocalToUtc(date: string, time: string, timeZone: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  let utcGuess = Date.UTC(year, month - 1, day, hour, minute);

  for (let step = 0; step < 4; step += 1) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date(utcGuess));

    const pick = (type: string) => Number(parts.find((part) => part.type === type)?.value || 0);
    const localHour = pick("hour") === 24 ? 0 : pick("hour");
    const diffMinutes =
      (hour - localHour) * 60 +
      (minute - pick("minute")) +
      (day - pick("day")) * 1440 +
      (month - pick("month")) * 43_200 +
      (year - pick("year")) * 525_600;
    if (diffMinutes === 0) break;
    utcGuess -= diffMinutes * 60_000;
  }

  return new Date(utcGuess);
}

export function formatTime(date: Date, timeZone: string, locale: "en" | "hi" = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatDateLong(date: Date, timeZone: string, locale: "en" | "hi" = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function readDeviceLocation(): Promise<BirthPlace | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) return null;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
        resolve({
          name: "Your location",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timeZone,
        });
      },
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 300_000 },
    );
  });
}
