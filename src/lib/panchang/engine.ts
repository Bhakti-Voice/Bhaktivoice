import {
  calendarDateForZone,
  calculateChoghadiya,
  calculateMuhurats,
  getKaranaSnapshot,
  getMoonData,
  getNakshatraSnapshot,
  getSunrise,
  getSunset,
  getTithiSnapshot,
  getYogaSnapshot,
  lastFullMoon,
  lastNewMoon,
  nextFullMoon,
  nextNewMoon,
  siderealLon,
  sunRasi,
  tropicalSunLon,
  weekdayForZone,
} from "./astronomy";
import { DEFAULT_CITY, type CityConfig } from "./cities";
import { FESTIVAL_DETAILS, getObservancesForTithi } from "./festivals-data";
import {
  MASA_NAMES,
  MASA_NAMES_HI,
  MONTH_NAMES_EN,
  MONTH_NAMES_HI,
  RITU_NAMES,
  RITU_NAMES_HI,
  VARA_NAMES,
  VARA_NAMES_HI,
} from "./names";
import type { CalendarDay, CalendarMonth, DayPanchang, FestivalDetail, Paksha } from "./types";


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
  const year = date.getFullYear();
  return masaIndex >= 9 ? year + 56 : year + 57;
}

function shakaSamvat(date: Date, masaIndex: number): number {
  const year = date.getFullYear();
  return masaIndex >= 0 && masaIndex <= 9 ? year - 78 : year - 79;
}

function rituFromMasa(masaIndex: number): { name: string; nameHi: string } {
  const ritu = Math.floor(masaIndex / 2) % 6;
  return { name: RITU_NAMES[ritu], nameHi: RITU_NAMES_HI[ritu] };
}

function ayanaFromDate(date: Date): { name: string; nameHi: string } {
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();
  // Makar Sankranti (around Jan 14) to Karka Sankranti (around July 16) is Uttarayana
  const isUttarayan = (month > 0 || day >= 14) && (month < 6 || (month === 6 && day < 16));
  return isUttarayan
    ? { name: "Uttarayana", nameHi: "उत्तरायण" }
    : { name: "Dakshinayana", nameHi: "दक्षिणायन" };
}

function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hrs ${minutes} mins`;
}

export const DAILY_MANTRAS = [
  {
    sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥",
    deity: "Gayatri Mata / Lord Surya",
    translation: "We meditate on that most adorable, supreme light of the divine sun of the spiritual reality; may it inspire and guide our intellect towards illumination.",
    benefit: "Enhances mental clarity, spiritual intelligence, inner peace, and life energy.",
  },
  {
    sanskrit: "ॐ नमः शिवाय ॥",
    deity: "Lord Shiva",
    translation: "I bow to Lord Shiva, the supreme auspicious reality residing in all consciousness.",
    benefit: "Dissolves negative tendencies, bestows deep mental tranquility, and awakens inner stillness.",
  },
  {
    sanskrit: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥",
    deity: "Lord Krishna & Rama",
    translation: "O Lord Krishna, O divine energy Radha-Rama, please engage me in Your eternal loving service.",
    benefit: "Removes worldly anxieties, fills the heart with sublime bhakti and divine joy.",
  },
  {
    sanskrit: "ॐ श्रीं ह्रीं क्लीं ग्लौं गं गणपतये वर वरद सर्वजनं मे वशमानय स्वाहा ॥",
    deity: "Lord Ganesha",
    translation: "Salutations to Lord Ganesha, the granter of supreme boons and remover of all hindrances.",
    benefit: "Overcomes material and spiritual obstacles, granting wisdom and auspicious beginnings.",
  },
  {
    sanskrit: "ॐ हं हनुमते रुद्रात्मकाय हुं फट् ॥",
    deity: "Lord Hanuman",
    translation: "Salutations to Lord Hanuman, the radiant embodiment of Rudra's divine courage and strength.",
    benefit: "Protects against fear, strengthens willpower, health, and steadfast devotion.",
  },
  {
    sanskrit: "ॐ श्रीं महालक्ष्म्यै च विद्महे विष्णुपत्न्यै च धीमहि तन्नो लक्ष्मीः प्रचोदयात् ॥",
    deity: "Mata Mahalakshmi",
    translation: "We meditate upon Goddess Mahalakshmi, the eternal consort of Lord Vishnu; may She illuminate our life with spiritual and material abundance.",
    benefit: "Invites purity, auspicious wealth, marital harmony, and graceful prosperity.",
  },
  {
    sanskrit: "ॐ नमो भगवते वासुदेवाय ॥",
    deity: "Lord Vishnu",
    translation: "Obeisances to the Supreme Personality of Godhead, Lord Vasudeva.",
    benefit: "Liberates the mind from the cycle of fear, bringing inner peace and spiritual realization.",
  },
];

export const DAILY_DARSHAN = [
  {
    templeName: "Shri Kashi Vishwanath Temple",
    deity: "Lord Shiva",
    location: "Varanasi, Uttar Pradesh",
    imageUrl: "/images/kashi.jpg",
    description: "The eternal golden abode of Lord Shiva on the sacred banks of Mother Ganga.",
  },
  {
    templeName: "Shri Bankey Bihari Mandir",
    deity: "Lord Krishna",
    location: "Vrindavan, Uttar Pradesh",
    imageUrl: "/images/vrindavan.jpg",
    description: "The enchanting temple of sweet Thakur Ji where devotion overflows in every corner.",
  },
  {
    templeName: "Shri Ram Janmabhoomi Mandir",
    deity: "Bhagwan Shri Ram Lalla",
    location: "Ayodhya, Uttar Pradesh",
    imageUrl: "/images/ayodhya.jpg",
    description: "The majestic grand temple at the sacred birthplace of Maryada Purushottam Shri Ram.",
  },
  {
    templeName: "Tirumala Venkateswara Temple",
    deity: "Lord Balaji (Govinda)",
    location: "Tirupati, Andhra Pradesh",
    imageUrl: "/images/tirupati.jpg",
    description: "The Kaliyuga Vaikuntha where Lord Venkateswara showers boundless mercy on all devotees.",
  },
  {
    templeName: "Maa Vaishno Devi Temple",
    deity: "Maa Mahakali, Mahalakshmi, Mahasaraswati",
    location: "Katra, Jammu & Kashmir",
    imageUrl: "/images/vaishnodevi.jpg",
    description: "The sanctified holy cave in the Trikuta hills granting shelter and boons to all seekers.",
  },
  {
    templeName: "Somnath Jyotirlinga Temple",
    deity: "Lord Shiva",
    location: "Prabhas Patan, Gujarat",
    imageUrl: "/images/somnath.jpg",
    description: "The first among the twelve sacred Jyotirlingas, standing eternally beside the Arabian Sea.",
  },
  {
    templeName: "Shri Jagannath Temple",
    deity: "Lord Jagannath, Balabhadra, Subhadra",
    location: "Puri, Odisha",
    imageUrl: "/images/puri.jpg",
    description: "The supreme abode of the Lord of the Universe, famous for the eternal Mahaprasad and Ratha Yatra.",
  },
];

export function getPanchang(targetDate: Date = new Date(), cityConfig?: CityConfig): DayPanchang {
  const city = cityConfig || DEFAULT_CITY;
  const instant = targetDate;
  const timeZone = city.timeZone;
  
  const calDate = calendarDateForZone(instant, timeZone);
  const weekday = weekdayForZone(instant, timeZone);
  
  const sunrise = getSunrise(instant, city);
  const sunset = getSunset(instant, city);
  const nextDayMidnight = new Date(sunrise.getTime() + 24 * 3600_000);
  const nextSunrise = getSunrise(nextDayMidnight, city);

  const tithiAtSunrise = getTithiSnapshot(sunrise);
  const tithiNow = getTithiSnapshot(instant);
  const nakshatra = getNakshatraSnapshot(sunrise);
  const yoga = getYogaSnapshot(sunrise);
  const karana = getKaranaSnapshot(sunrise);
  const moon = getMoonData(instant, city);
  const sunR = sunRasi(sunrise);

  const amanta = amantaMasa(sunrise);
  const purnimanta = purnimantaMasa(sunrise, tithiAtSunrise.paksha);
  const vSamvat = vikramSamvat(sunrise, purnimanta.index);
  const sSamvat = shakaSamvat(sunrise, purnimanta.index);
  const gSamvat = vSamvat; // Gujarati Samvat starts on Kartika Shukla Pratipada
  const ritu = rituFromMasa(purnimanta.index);
  const ayana = ayanaFromDate(sunrise);

  const dayLengthMs = sunset.getTime() - sunrise.getTime();
  const nightLengthMs = nextSunrise.getTime() - sunset.getTime();
  const dayDuration = formatDuration(dayLengthMs);
  const nightDuration = formatDuration(nightLengthMs);

  const muhurats = calculateMuhurats(sunrise, sunset, weekday, nakshatra);
  const choghadiya = calculateChoghadiya(sunrise, sunset, nextSunrise, weekday);

  const observances = getObservancesForTithi({
    masaIndex: purnimanta.index,
    paksha: tithiAtSunrise.paksha,
    tithiNumber: tithiAtSunrise.number,
    weekday,
    year: calDate.year,
  });

  const nextTithi = getTithiSnapshot(new Date(tithiAtSunrise.end.getTime() + 60_000));

  const dayOfWeekIndex = instant.getDay();
  const dailyMantra = DAILY_MANTRAS[dayOfWeekIndex % DAILY_MANTRAS.length];
  const dailyDarshan = DAILY_DARSHAN[dayOfWeekIndex % DAILY_DARSHAN.length];

  const dateString = `${calDate.year}-${String(calDate.month).padStart(2, "0")}-${String(calDate.day).padStart(2, "0")}`;

  const gregorianLabel = new Intl.DateTimeFormat("en-IN", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(instant);

  const gregorianLabelHi = new Intl.DateTimeFormat("hi-IN", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(instant);

  return {
    instant,
    city,
    gregorianDateString: dateString,
    gregorianLabel,
    gregorianLabelHi,
    weekday,
    weekdayName: VARA_NAMES[weekday],
    weekdayNameHi: VARA_NAMES_HI[weekday],
    sunrise,
    sunset,
    dayDuration,
    nightDuration,
    sunSign: sunR.name,
    sunSignHi: sunR.nameHi,
    moon,
    tithiAtSunrise,
    tithiNow,
    nakshatra,
    yoga,
    karana,
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
    vikramSamvat: vSamvat,
    shakaSamvat: sSamvat,
    gujaratiSamvat: gSamvat,
    ritu,
    ayana,
    brahmaMuhurat: muhurats.brahma,
    abhijitMuhurat: muhurats.abhijit,
    amritKaal: muhurats.amritKaal,
    godhuliMuhurat: muhurats.godhuli,
    vijayaMuhurat: muhurats.vijaya,
    nishitaMuhurat: muhurats.nishita,
    rahuKaal: muhurats.rahuKaal,
    yamaganda: muhurats.yamaganda,
    gulikaKaal: muhurats.gulika,
    durMuhurat: muhurats.durMuhurat,
    varjyam: muhurats.varjyam,
    dayChoghadiya: choghadiya.day,
    nightChoghadiya: choghadiya.night,
    observances,
    nextTithi,
    dailyMantra,
    dailyDarshan,
    spiritualGuidance: `${tithiAtSunrise.name} of ${MASA_NAMES[purnimanta.index]} Masa (${tithiAtSunrise.paksha === "shukla" ? "Shukla Paksha" : "Krishna Paksha"}). Lord ${nakshatra.deity || "Surya"} presides over today's Nakshatra ${nakshatra.name}.`,
    location: `${city.name} (${city.timeZone})`,
    upcoming: Array.from({ length: 7 }, (_, i) => {
      const futureDate = new Date(sunrise.getTime() + (i + 1) * 86_400_000);
      const futureSunrise = getSunrise(futureDate, city);
      const fTithi = getTithiSnapshot(futureSunrise);
      const fPurnimanta = purnimantaMasa(futureSunrise, fTithi.paksha);
      const fWeekday = weekdayForZone(futureSunrise, timeZone);
      const fCalDate = calendarDateForZone(futureSunrise, timeZone);
      const fObs = getObservancesForTithi({
        masaIndex: fPurnimanta.index,
        paksha: fTithi.paksha,
        tithiNumber: fTithi.number,
        weekday: fWeekday,
        year: fCalDate.year,
      });
      return {
        date: futureSunrise,
        dateString: `${fCalDate.year}-${String(fCalDate.month).padStart(2, "0")}-${String(fCalDate.day).padStart(2, "0")}`,
        weekdayName: VARA_NAMES[fWeekday],
        weekdayNameHi: VARA_NAMES_HI[fWeekday],
        tithi: fTithi,
        masaName: MASA_NAMES[fPurnimanta.index],
        masaNameHi: MASA_NAMES_HI[fPurnimanta.index],
        observances: fObs,
      };
    }),
  };
}

export function getMonthCalendar(year: number, month: number, cityConfig?: CityConfig): CalendarMonth {
  const city = cityConfig || DEFAULT_CITY;
  const monthName = MONTH_NAMES_EN[month - 1] || "January";
  const monthNameHi = MONTH_NAMES_HI[month - 1] || "जनवरी";

  const totalDaysInMonth = new Date(year, month, 0).getDate();


  // Find starting day of week for the 1st of month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const startingDayOfWeek = new Date(year, month - 1, 1).getDay();

  const days: CalendarDay[] = [];
  const hinduMonthsSet = new Set<string>();

  // Add leading padding days from previous month
  const prevMonthTotalDays = new Date(year, month - 1, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month - 2, prevMonthTotalDays - i, 12, 0, 0);
    const dayPanchang = getPanchang(prevDate, city);
    const dateString = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}-${String(prevDate.getDate()).padStart(2, "0")}`;

    days.push({
      date: prevDate,
      dateString,
      dayNumber: prevDate.getDate(),
      isCurrentMonth: false,
      isToday: isSameDay(prevDate, new Date()),
      weekday: prevDate.getDay(),
      tithiName: dayPanchang.tithiAtSunrise.name,
      tithiNameHi: dayPanchang.tithiAtSunrise.nameHi,
      paksha: dayPanchang.tithiAtSunrise.paksha,
      moonPhaseIcon: getMoonIcon(dayPanchang.moon.phaseAngle),
      moonIllumination: dayPanchang.moon.illumination,
      observances: dayPanchang.observances,
      hasMajorFestival: dayPanchang.observances.some((o) => o.category === "festival" && o.isMajor),
      hasEkadashi: dayPanchang.observances.some((o) => o.category === "ekadashi"),
      hasPurnima: dayPanchang.observances.some((o) => o.category === "purnima"),
      hasAmavasya: dayPanchang.observances.some((o) => o.category === "amavasya"),
      hasPradosh: dayPanchang.observances.some((o) => o.category === "pradosh"),
      hasSankashti: dayPanchang.observances.some((o) => o.category === "sankashti"),
      hasSankranti: dayPanchang.observances.some((o) => o.category === "sankranti"),
      hasVrat: dayPanchang.observances.some((o) => o.category === "vrat" || o.category === "ekadashi" || o.category === "pradosh"),
    });
  }

  // Current month days
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const currentDate = new Date(year, month - 1, day, 12, 0, 0);
    const dayPanchang = getPanchang(currentDate, city);
    const dateString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    hinduMonthsSet.add(dayPanchang.masaPurnimanta.name);

    days.push({
      date: currentDate,
      dateString,
      dayNumber: day,
      isCurrentMonth: true,
      isToday: isSameDay(currentDate, new Date()),
      weekday: currentDate.getDay(),
      tithiName: dayPanchang.tithiAtSunrise.name,
      tithiNameHi: dayPanchang.tithiAtSunrise.nameHi,
      paksha: dayPanchang.tithiAtSunrise.paksha,
      moonPhaseIcon: getMoonIcon(dayPanchang.moon.phaseAngle),
      moonIllumination: dayPanchang.moon.illumination,
      observances: dayPanchang.observances,
      hasMajorFestival: dayPanchang.observances.some((o) => o.category === "festival" && o.isMajor),
      hasEkadashi: dayPanchang.observances.some((o) => o.category === "ekadashi"),
      hasPurnima: dayPanchang.observances.some((o) => o.category === "purnima"),
      hasAmavasya: dayPanchang.observances.some((o) => o.category === "amavasya"),
      hasPradosh: dayPanchang.observances.some((o) => o.category === "pradosh"),
      hasSankashti: dayPanchang.observances.some((o) => o.category === "sankashti"),
      hasSankranti: dayPanchang.observances.some((o) => o.category === "sankranti"),
      hasVrat: dayPanchang.observances.some((o) => o.category === "vrat" || o.category === "ekadashi" || o.category === "pradosh"),
    });
  }

  // Trailing padding days to fill 7 columns
  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const nextDate = new Date(year, month, d, 12, 0, 0);
    const dayPanchang = getPanchang(nextDate, city);
    const dateString = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;

    days.push({
      date: nextDate,
      dateString,
      dayNumber: d,
      isCurrentMonth: false,
      isToday: isSameDay(nextDate, new Date()),
      weekday: nextDate.getDay(),
      tithiName: dayPanchang.tithiAtSunrise.name,
      tithiNameHi: dayPanchang.tithiAtSunrise.nameHi,
      paksha: dayPanchang.tithiAtSunrise.paksha,
      moonPhaseIcon: getMoonIcon(dayPanchang.moon.phaseAngle),
      moonIllumination: dayPanchang.moon.illumination,
      observances: dayPanchang.observances,
      hasMajorFestival: dayPanchang.observances.some((o) => o.category === "festival" && o.isMajor),
      hasEkadashi: dayPanchang.observances.some((o) => o.category === "ekadashi"),
      hasPurnima: dayPanchang.observances.some((o) => o.category === "purnima"),
      hasAmavasya: dayPanchang.observances.some((o) => o.category === "amavasya"),
      hasPradosh: dayPanchang.observances.some((o) => o.category === "pradosh"),
      hasSankashti: dayPanchang.observances.some((o) => o.category === "sankashti"),
      hasSankranti: dayPanchang.observances.some((o) => o.category === "sankranti"),
      hasVrat: dayPanchang.observances.some((o) => o.category === "vrat" || o.category === "ekadashi" || o.category === "pradosh"),
    });
  }

  return {
    year,
    month,
    monthName,
    monthNameHi,
    city,
    days,
    hinduMonthsSpanned: Array.from(hinduMonthsSet),
    totalDays: totalDaysInMonth,
  };
}

export function getUpcomingFestivals(fromDate: Date = new Date(), limit: number = 10): {
  festival: FestivalDetail;
  date: Date;
  dateString: string;
  daysRemaining: number;
}[] {
  const allFestivals = Object.values(FESTIVAL_DETAILS);
  const now = fromDate.getTime();

  const candidates: { festival: FestivalDetail; date: Date; dateString: string; daysRemaining: number }[] = [];


  for (const fest of allFestivals) {
    // Check 2026, 2027, 2028 dates
    const dates = [fest.dateString2026, fest.dateString2027, fest.dateString2028].filter(Boolean);
    for (const dStr of dates) {
      const d = new Date(`${dStr}T00:00:00+05:30`);
      const diffMs = d.getTime() - now;
      const days = Math.ceil(diffMs / 86_400_000);
      if (days >= 0) {
        candidates.push({
          festival: fest,
          date: d,
          dateString: dStr,
          daysRemaining: days,
        });
      }
    }
  }

  candidates.sort((a, b) => a.daysRemaining - b.daysRemaining);

  // Return unique festivals up to limit
  const seenSlugs = new Set<string>();
  const results = [];
  for (const item of candidates) {
    if (!seenSlugs.has(item.festival.slug)) {
      seenSlugs.add(item.festival.slug);
      results.push(item);
      if (results.length >= limit) break;
    }
  }

  return results;
}

export function getFestivalBySlug(slug: string): FestivalDetail | undefined {
  return FESTIVAL_DETAILS[slug];
}

export function getAllFestivalSlugs(): string[] {
  return Object.keys(FESTIVAL_DETAILS);
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function getMoonIcon(
  phaseAngle: number
): "new" | "waxing-crescent" | "first-quarter" | "waxing-gibbous" | "full" | "waning-gibbous" | "third-quarter" | "waning-crescent" {
  if (phaseAngle < 15 || phaseAngle >= 345) return "new";
  if (phaseAngle < 75) return "waxing-crescent";
  if (phaseAngle < 105) return "first-quarter";
  if (phaseAngle < 165) return "waxing-gibbous";
  if (phaseAngle < 195) return "full";
  if (phaseAngle < 255) return "waning-gibbous";
  if (phaseAngle < 285) return "third-quarter";
  return "waning-crescent";
}
