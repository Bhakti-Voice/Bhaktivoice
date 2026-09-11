import {
  Body,
  Ecliptic,
  EclipticGeoMoon,
  GeoVector,
  SunPosition,
} from "astronomy-engine";
import {
  lahiriAyanamsa,
  siderealLon,
  tropicalMoonLon,
  tropicalSunLon,
  wrap360,
  type CityConfig,
} from "./astronomy";
import { DEFAULT_CITY } from "./cities";
import {
  NAKSHATRA_NAMES,
  NAKSHATRA_NAMES_HI,
  RASI_NAMES,
  RASI_NAMES_HI,
} from "./names";
import {
  siderealRahuLongitude,
  siderealKetuLongitude,
} from "@/lib/spiritual-tools/core-astro";

export interface PlanetEphemeris {
  id: string;
  name: string;
  nameHi: string;
  symbol: string;
  siderealLongitude: number;
  rashiIndex: number;
  rashiName: string;
  rashiNameHi: string;
  degreeInRashiFormatted: string; // e.g. 14° 32' 18"
  nakshatraIndex: number;
  nakshatraName: string;
  nakshatraNameHi: string;
  pada: number;
  nakshatraLord: string;
  nakshatraLordHi: string;
  rashiLord: string;
  rashiLordHi: string;
  dailySpeed: number; // degrees / day
  isRetrograde: boolean;
  isCombust: boolean;
  dignity: "exalted" | "mooltrikona" | "own" | "friendly" | "neutral" | "enemy" | "debilitated";
  dignityHi: string;
}

export interface DailyEphemerisReport {
  date: Date;
  dateString: string;
  ayanamsaName: string;
  ayanamsaDegrees: number;
  ayanamsaFormatted: string;
  planets: PlanetEphemeris[];
}

const NAKSHATRA_SPAN = 360 / 27; // 13.333333°

const NAKSHATRA_LORDS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
];

const NAKSHATRA_LORDS_HI = [
  "केतु", "शुक्र", "सूर्य", "चंद्र", "मंगल", "राहु", "गुरु", "शनि", "बुध",
  "केतु", "शुक्र", "सूर्य", "चंद्र", "मंगल", "राहु", "गुरु", "शनि", "बुध",
  "केतु", "शुक्र", "सूर्य", "चंद्र", "मंगल", "राहु", "गुरु", "शनि", "बुध",
];

const RASI_LORDS_MAP = [
  { en: "Mars", hi: "मंगल" },     // Mesha
  { en: "Venus", hi: "शुक्र" },    // Vrishabha
  { en: "Mercury", hi: "बुध" },   // Mithuna
  { en: "Moon", hi: "चंद्र" },     // Karka
  { en: "Sun", hi: "सूर्य" },      // Simha
  { en: "Mercury", hi: "बुध" },   // Kanya
  { en: "Venus", hi: "शुक्र" },    // Tula
  { en: "Mars", hi: "मंगल" },     // Vrishchika
  { en: "Jupiter", hi: "गुरु" },   // Dhanu
  { en: "Saturn", hi: "शनि" },    // Makara
  { en: "Saturn", hi: "शनि" },    // Kumbha
  { en: "Jupiter", hi: "गुरु" },   // Meena
];

// Classical combustion threshold limits (degrees from Sun)
const COMBUSTION_LIMITS: Record<string, number> = {
  moon: 12,
  mars: 17,
  mercury: 14,
  jupiter: 11,
  venus: 10,
  saturn: 15,
};

// Exaltation (Uchha) and Debilitation (Neecha) signs
const EXALTATION_SIGNS: Record<string, number> = {
  sun: 0, // Aries
  moon: 1, // Taurus
  mars: 9, // Capricorn
  mercury: 5, // Virgo
  jupiter: 3, // Cancer
  venus: 11, // Pisces
  saturn: 6, // Libra
  rahu: 1, // Taurus
  ketu: 7, // Scorpio
};

const DEBILITATION_SIGNS: Record<string, number> = {
  sun: 6, // Libra
  moon: 7, // Scorpio
  mars: 3, // Cancer
  mercury: 11, // Pisces
  jupiter: 9, // Capricorn
  venus: 5, // Virgo
  saturn: 0, // Aries
  rahu: 7, // Scorpio
  ketu: 1, // Taurus
};

const OWN_SIGNS: Record<string, number[]> = {
  sun: [4],
  moon: [3],
  mars: [0, 7],
  mercury: [2, 5],
  jupiter: [8, 11],
  venus: [1, 6],
  saturn: [9, 10],
  rahu: [10],
  ketu: [7],
};

function formatDMS(degInSign: number): string {
  const d = Math.floor(degInSign);
  const mFloat = (degInSign - d) * 60;
  const m = Math.floor(mFloat);
  const s = Math.round((mFloat - m) * 60);
  return `${d}° ${String(m).padStart(2, "0")}' ${String(s).padStart(2, "0")}"`;
}

function getTropicalBodyLon(body: Body, date: Date): number {
  if (body === Body.Sun) return tropicalSunLon(date);
  if (body === Body.Moon) return tropicalMoonLon(date);
  const vec = GeoVector(body, date, true);
  return wrap360(Ecliptic(vec).elon);
}

/**
 * Calculates the complete Daily Planetary Ephemeris (Graha Sthiti)
 * for all 9 Vedic Grahas + modern outer planets for any date and city.
 */
export function getDailyEphemeris(date: Date, cityConfig?: CityConfig): DailyEphemerisReport {
  const ayan = lahiriAyanamsa(date);
  const ayanDeg = Math.floor(ayan);
  const ayanMin = Math.floor((ayan - ayanDeg) * 60);
  const ayanSec = Math.round(((ayan - ayanDeg) * 60 - ayanMin) * 60);
  const ayanFormatted = `${ayanDeg}° ${ayanMin}' ${ayanSec}" (Chitrapaksha / Lahiri)`;

  // Time delta for calculating apparent orbital speed (6 hours before and after)
  const dtHours = 6;
  const tBefore = new Date(date.getTime() - dtHours * 3600_000);
  const tAfter = new Date(date.getTime() + dtHours * 3600_000);

  // Compute Sun longitude first (reference for combustion)
  const sunTrop = tropicalSunLon(date);
  const sunSidereal = siderealLon(sunTrop, date);

  const bodies: { id: string; name: string; nameHi: string; symbol: string; body?: Body }[] = [
    { id: "sun", name: "Surya (Sun)", nameHi: "सूर्य", symbol: "☉", body: Body.Sun },
    { id: "moon", name: "Chandra (Moon)", nameHi: "चंद्र", symbol: "☽", body: Body.Moon },
    { id: "mars", name: "Mangal (Mars)", nameHi: "मंगल", symbol: "♂", body: Body.Mars },
    { id: "mercury", name: "Budha (Mercury)", nameHi: "बुध", symbol: "☿", body: Body.Mercury },
    { id: "jupiter", name: "Guru (Jupiter)", nameHi: "गुरु (बृहस्पति)", symbol: "♃", body: Body.Jupiter },
    { id: "venus", name: "Shukra (Venus)", nameHi: "शुक्र", symbol: "♀", body: Body.Venus },
    { id: "saturn", name: "Shani (Saturn)", nameHi: "शनि", symbol: "♄", body: Body.Saturn },
    { id: "rahu", name: "Rahu (North Node)", nameHi: "राहु", symbol: "☊" },
    { id: "ketu", name: "Ketu (South Node)", nameHi: "केतु", symbol: "☋" },
    { id: "uranus", name: "Uranus (Arun)", nameHi: "अरुण (Uranus)", symbol: "♅", body: Body.Uranus },
    { id: "neptune", name: "Neptune (Varun)", nameHi: "वरुण (Neptune)", symbol: "♆", body: Body.Neptune },
    { id: "pluto", name: "Pluto (Yama)", nameHi: "यम (Pluto)", symbol: "♇", body: Body.Pluto },
  ];

  const planets: PlanetEphemeris[] = [];

  for (const b of bodies) {
    let sidereal: number;
    let siderealBefore: number;
    let siderealAfter: number;

    if (b.id === "rahu") {
      sidereal = siderealRahuLongitude(date);
      siderealBefore = siderealRahuLongitude(tBefore);
      siderealAfter = siderealRahuLongitude(tAfter);
    } else if (b.id === "ketu") {
      sidereal = siderealKetuLongitude(date);
      siderealBefore = siderealKetuLongitude(tBefore);
      siderealAfter = siderealKetuLongitude(tAfter);
    } else if (b.body !== undefined) {
      sidereal = siderealLon(getTropicalBodyLon(b.body, date), date);
      siderealBefore = siderealLon(getTropicalBodyLon(b.body, tBefore), tBefore);
      siderealAfter = siderealLon(getTropicalBodyLon(b.body, tAfter), tAfter);
    } else {
      continue;
    }

    // Apparent daily speed (deg/day)
    let diff = siderealAfter - siderealBefore;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const dailySpeed = (diff / (2 * dtHours)) * 24;

    // Retrograde: speed < 0 (Rahu/Ketu naturally move retrograde in mean motion)
    const isRetrograde = b.id === "rahu" || b.id === "ketu" ? true : dailySpeed < -0.0001;

    // Combustion (Asta)
    let isCombust = false;
    if (b.id !== "sun" && b.id !== "rahu" && b.id !== "ketu") {
      let sunDiff = Math.abs(wrap360(sidereal - sunSidereal));
      if (sunDiff > 180) sunDiff = 360 - sunDiff;
      const threshold = COMBUSTION_LIMITS[b.id] || 8.5;
      if (sunDiff <= threshold) {
        isCombust = true;
      }
    }

    // Rashi & Degrees in Rashi
    const rashiIndex = Math.min(11, Math.floor(sidereal / 30));
    const degInRashi = sidereal % 30;
    const rashiName = RASI_NAMES[rashiIndex];
    const rashiNameHi = RASI_NAMES_HI[rashiIndex];
    const rashiLord = RASI_LORDS_MAP[rashiIndex].en;
    const rashiLordHi = RASI_LORDS_MAP[rashiIndex].hi;

    // Nakshatra & Pada
    const nakSpan = sidereal / NAKSHATRA_SPAN;
    const nakshatraIndex = Math.min(26, Math.floor(nakSpan));
    const pada = Math.min(4, Math.floor((nakSpan - nakshatraIndex) * 4) + 1);
    const nakshatraName = NAKSHATRA_NAMES[nakshatraIndex];
    const nakshatraNameHi = NAKSHATRA_NAMES_HI[nakshatraIndex];
    const nakshatraLord = NAKSHATRA_LORDS[nakshatraIndex];
    const nakshatraLordHi = NAKSHATRA_LORDS_HI[nakshatraIndex];

    // Dignity
    let dignity: PlanetEphemeris["dignity"] = "neutral";
    let dignityHi = "सम";

    if (EXALTATION_SIGNS[b.id] === rashiIndex) {
      dignity = "exalted";
      dignityHi = "उच्च (Exalted)";
    } else if (DEBILITATION_SIGNS[b.id] === rashiIndex) {
      dignity = "debilitated";
      dignityHi = "नीच (Debilitated)";
    } else if (OWN_SIGNS[b.id]?.includes(rashiIndex)) {
      dignity = "own";
      dignityHi = "स्वक्षेत्री (Own)";
    }

    planets.push({
      id: b.id,
      name: b.name,
      nameHi: b.nameHi,
      symbol: b.symbol,
      siderealLongitude: Math.round(sidereal * 10000) / 10000,
      rashiIndex,
      rashiName,
      rashiNameHi,
      degreeInRashiFormatted: formatDMS(degInRashi),
      nakshatraIndex,
      nakshatraName,
      nakshatraNameHi,
      pada,
      nakshatraLord,
      nakshatraLordHi,
      rashiLord,
      rashiLordHi,
      dailySpeed: Math.round(dailySpeed * 100) / 100,
      isRetrograde,
      isCombust,
      dignity,
      dignityHi,
    });
  }

  const cal = date.toISOString().split("T")[0];

  return {
    date,
    dateString: cal,
    ayanamsaName: "Lahiri (Chitrapaksha)",
    ayanamsaDegrees: Math.round(ayan * 10000) / 10000,
    ayanamsaFormatted: ayanFormatted,
    planets,
  };
}
