import { getPanchang, getMonthCalendar } from "@/lib/panchang/engine";
import { DEFAULT_CITY } from "@/lib/panchang/cities";
import { getDailyRashifal, type RashiForecast } from "@/lib/spiritual-tools/daily-rashifal";

export interface HomeVedicData {
  panchang: {
    masaPurnimantaHi: string;
    vikramSamvat: number;
    tithiName: string;
    tithiNameHi: string;
    paksha: string;
    nakshatraName: string;
    nakshatraNameHi: string;
    nakshatraPada: number;
    abhijitTime: string | null;
    rahuKaalTime: string;
    sunTimes: string;
    yogaName: string;
    yogaNameHi: string;
    karanaName: string;
    karanaNameHi: string;
  };
  days: {
    dayNumber: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    hasFast: boolean;
    observanceTitle: string;
  }[];
  rashifalList: RashiForecast[];
  formattedToday: string;
  monthLabel: string;
  upcomingObservances: { name: string; dateNumber: number }[];
}

function formatTime(d: Date | string | null | undefined): string {
  if (!d) return "--:--";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(new Date(d));
  } catch {
    return "--:--";
  }
}

export function getHomeVedicData(locale: string): HomeVedicData {
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const now = new Date();
  const panchang = getPanchang(now, DEFAULT_CITY);
  const monthCalendar = getMonthCalendar(now.getFullYear(), now.getMonth() + 1, DEFAULT_CITY);
  const rashifalList = getDailyRashifal(now);

  const loc = isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN";

  const formattedToday = new Intl.DateTimeFormat(loc, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(now);

  const monthLabel = new Intl.DateTimeFormat(loc, {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(now);

  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const futureDays = monthCalendar.days.filter((d) => d.isCurrentMonth && d.dateString >= todayStr);
  const upcomingObservances: { name: string; dateNumber: number }[] = [];
  for (const d of futureDays) {
    for (const obs of d.observances) {
      const obsName = isTe ? ((obs as any).nameTe || obs.nameHi || obs.name) : isHi ? obs.nameHi || obs.name : obs.name;
      if (upcomingObservances.length < 2 && !upcomingObservances.some((o) => o.name === obsName)) {
        upcomingObservances.push({
          name: obsName,
          dateNumber: d.dayNumber,
        });
      }
    }
    if (upcomingObservances.length >= 2) break;
  }

  const days = monthCalendar.days.slice(0, 35).map((day) => ({
    dayNumber: day.dayNumber,
    isCurrentMonth: day.isCurrentMonth,
    isToday: day.isToday,
    hasFast: day.hasEkadashi || day.hasPurnima || day.hasAmavasya || day.hasPradosh,
    observanceTitle: day.observances.map((o) => (isTe ? ((o as any).nameTe || o.nameHi || o.name) : isHi ? o.nameHi || o.name : o.name)).join(", "),
  }));

  const abhijitTime = panchang.abhijitMuhurat
    ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}`
    : null;
  const rahuKaalTime = `${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}`;
  const sunTimes = `${formatTime(panchang.sunrise)} • ${formatTime(panchang.sunset)}`;

  return {
    panchang: {
      masaPurnimantaHi: panchang.masaPurnimanta.nameHi,
      vikramSamvat: panchang.vikramSamvat,
      tithiName: panchang.tithiAtSunrise.name,
      tithiNameHi: panchang.tithiAtSunrise.nameHi,
      paksha: panchang.tithiAtSunrise.paksha,
      nakshatraName: panchang.nakshatra.name,
      nakshatraNameHi: panchang.nakshatra.nameHi,
      nakshatraPada: panchang.nakshatra.pada,
      abhijitTime,
      rahuKaalTime,
      sunTimes,
      yogaName: panchang.yoga.name,
      yogaNameHi: panchang.yoga.nameHi,
      karanaName: panchang.karana.name,
      karanaNameHi: panchang.karana.nameHi,
    },
    days,
    rashifalList,
    formattedToday,
    monthLabel,
    upcomingObservances,
  };
}
