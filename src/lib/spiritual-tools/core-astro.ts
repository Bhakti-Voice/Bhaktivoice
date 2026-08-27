import { Body, Ecliptic, EclipticGeoMoon, GeoVector, Observer, SearchRiseSet, SunPosition } from "astronomy-engine";
import {
  NAKSHATRA_SPAN,
  lahiriAyanamsa,
  siderealLon,
  tropicalMoonLon,
  tropicalSunLon,
  wrap360,
} from "@/lib/panchang/astronomy";
import { NAKSHATRA_NAMES, NAKSHATRA_NAMES_HI, RASI_NAMES } from "@/lib/panchang/names";
import type { PlanetStatus } from "./types";

export { lahiriAyanamsa, siderealLon, wrap360, NAKSHATRA_SPAN };

export const RASI_NAMES_HI = [
  "मेष",
  "वृषभ",
  "मिथुन",
  "कर्क",
  "सिंह",
  "कन्या",
  "तुला",
  "वृश्चिक",
  "धनु",
  "मकर",
  "कुंभ",
  "मीन",
] as const;

export const RASI_LORDS = [
  "Mars", // Aries
  "Venus", // Taurus
  "Mercury", // Gemini
  "Moon", // Cancer
  "Sun", // Leo
  "Mercury", // Virgo
  "Venus", // Libra
  "Mars", // Scorpio
  "Jupiter", // Sagittarius
  "Saturn", // Capricorn
  "Saturn", // Aquarius
  "Jupiter", // Pisces
] as const;

export const RASI_LORDS_HI = [
  "मंगल",
  "शुक्र",
  "बुध",
  "चंद्र",
  "सूर्य",
  "बुध",
  "शुक्र",
  "मंगल",
  "गुरु",
  "शनि",
  "शनि",
  "गुरु",
] as const;

export const HOUSE_SIGNIFICATIONS = [
  { en: "Self, Physical Appearance, Personality, Vitality", hi: "तनु भाव — स्वयं, व्यक्तित्व, रूप, स्वास्थ्य" },
  { en: "Wealth, Family, Speech, Assets, Food", hi: "धन भाव — धन, परिवार, वाणी, संचित संपत्ति" },
  { en: "Siblings, Courage, Communication, Short Journeys", hi: "सहज भाव — पराक्रम, छोटे भाई-बहन, साहस" },
  { en: "Mother, Home, Vehicles, Happiness, Property", hi: "सुख भाव — माता, गृह सुख, वाहन, भूमि" },
  { en: "Children, Intelligence, Education, Past Karma", hi: "पुत्र/ज्ञान भाव — संतान, बुद्धि, विद्या, पूर्व पुण्य" },
  { en: "Health, Enemies, Debts, Daily Work, Competition", hi: "रिपु/रोग भाव — शत्रु, रोग, ऋण, प्रतियोगिता" },
  { en: "Spouse, Marriage, Partnerships, Business Relations", hi: "जाया/कलत्र भाव — जीवनसाथी, विवाह, साझेदारी" },
  { en: "Longevity, Transformation, Secrets, Occult, Sudden Events", hi: "आयु/मृत्यु भाव — आयु, गूढ़ रहस्य, आकस्मिक परिवर्तन" },
  { en: "Fortune, Dharma, Higher Wisdom, Guru, Long Travel", hi: "धर्म/भाग्य भाव — भाग्य, धर्म, गुरु, तीर्थ यात्रा" },
  { en: "Career, Profession, Fame, Authority, Social Status", hi: "कर्म भाव — आजीविका, व्यवसाय, मान-सम्मान, पद" },
  { en: "Gains, Income, Elder Siblings, Desires, Network", hi: "लाभ/आय भाव — आय, लाभ, बड़े भाई-बहन, मित्र" },
  { en: "Expenses, Foreign Lands, Liberation (Moksha), Sleep, Losses", hi: "व्यय/मोक्ष भाव — व्यय, विदेश वास, मोक्ष, शयन सुख" },
] as const;

export function rashiFromSidereal(lon: number): { index: number; name: string; nameHi: string } {
  const index = Math.min(11, Math.floor(wrap360(lon) / 30));
  return { index, name: RASI_NAMES[index], nameHi: RASI_NAMES_HI[index] };
}

export function nakshatraFromSidereal(lon: number): {
  index: number;
  name: string;
  nameHi: string;
  pada: number;
} {
  const span = wrap360(lon) / NAKSHATRA_SPAN;
  const index = Math.min(26, Math.floor(span));
  const pada = Math.min(4, Math.floor((span - index) * 4) + 1);
  return { index, name: NAKSHATRA_NAMES[index], nameHi: NAKSHATRA_NAMES_HI[index], pada };
}

export function formatDegreeMinutes(lon: number): string {
  const degInSign = wrap360(lon) % 30;
  const degrees = Math.floor(degInSign);
  const minutes = Math.floor((degInSign - degrees) * 60);
  return `${degrees}° ${minutes.toString().padStart(2, "0")}'`;
}

export function tropicalPlanetLongitude(body: Body, date: Date): number {
  if (body === Body.Moon) return tropicalMoonLon(date);
  if (body === Body.Sun) return tropicalSunLon(date);
  const vec = GeoVector(body, date, true);
  return wrap360(Ecliptic(vec).elon);
}

export function siderealPlanetLongitude(body: Body, date: Date): number {
  return siderealLon(tropicalPlanetLongitude(body, date), date);
}

/** Mean Rahu (ascending lunar node) in Sidereal ecliptic longitude. */
export function siderealRahuLongitude(date: Date): number {
  const jd = date.getTime() / 86_400_000 + 2_440_587.5;
  const t = (jd - 2_451_545.0) / 36525.0;
  const omega =
    125.0445479 -
    1934.1362891 * t +
    0.0020754 * t * t +
    (t * t * t) / 467_441 -
    (t * t * t * t) / 60_616_000;
  return siderealLon(wrap360(omega), date);
}

export function siderealKetuLongitude(date: Date): number {
  return wrap360(siderealRahuLongitude(date) + 180);
}

/**
 * Calculates the exact Ascendant (Lagna) Longitude from Local Sidereal Time
 * and Geographic Latitude using standard spherical astronomy.
 */
export function ascendantLongitude(date: Date, latitude: number, longitude: number): number {
  const jd = date.getTime() / 86_400_000 + 2_440_587.5;
  const t = (jd - 2_451_545.0) / 36525.0;
  const obliquity = 23.4392911 - 0.0130042 * t;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2_451_545.0) + 0.000387933 * t * t;
  gmst = wrap360(gmst);
  const lst = wrap360(gmst + longitude);

  const lstRad = (lst * Math.PI) / 180;
  const latRad = (latitude * Math.PI) / 180;
  const oblRad = (obliquity * Math.PI) / 180;

  const y = Math.cos(lstRad);
  const x = -Math.sin(lstRad) * Math.cos(oblRad) - Math.tan(latRad) * Math.sin(oblRad);

  const asc = (Math.atan2(y, x) * 180) / Math.PI;
  return wrap360(asc);
}

export function siderealAscendant(date: Date, latitude: number, longitude: number): number {
  return siderealLon(ascendantLongitude(date, latitude, longitude), date);
}

export function evaluatePlanetStatus(
  planetId: string,
  rashiIndex: number,
  sunLon: number,
  planetLon: number,
): { status: PlanetStatus; statusHi: string; isCombust: boolean } {
  let isCombust = false;
  if (planetId !== "sun" && planetId !== "rahu" && planetId !== "ketu") {
    const diff = Math.abs(wrap360(planetLon - sunLon));
    const dist = diff > 180 ? 360 - diff : diff;
    if (dist < 8.5) isCombust = true;
  }

  // Classical exaltation & debilitation signs
  const EXALTATIONS: Record<string, number> = {
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

  const DEBILITATIONS: Record<string, number> = {
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
    sun: [4], // Leo
    moon: [3], // Cancer
    mars: [0, 7], // Aries, Scorpio
    mercury: [2, 5], // Gemini, Virgo
    jupiter: [8, 11], // Sagittarius, Pisces
    venus: [1, 6], // Taurus, Libra
    saturn: [9, 10], // Capricorn, Aquarius
  };

  if (EXALTATIONS[planetId] === rashiIndex) {
    return { status: "Exalted", statusHi: "उच्च", isCombust };
  }
  if (DEBILITATIONS[planetId] === rashiIndex) {
    return { status: "Debilitated", statusHi: "नीच", isCombust };
  }
  if (OWN_SIGNS[planetId]?.includes(rashiIndex)) {
    return { status: "Own Sign", statusHi: "स्वक्षेत्री", isCombust };
  }

  return { status: "Normal", statusHi: "सामान्य", isCombust };
}

export function sunriseAt(observer: Observer, date: Date): Date {
  const rise = SearchRiseSet(Body.Sun, observer, +1, date, 1);
  return rise?.date ?? new Date(date.getTime() + 6 * 3_600_000);
}

export function sunsetAt(observer: Observer, date: Date): Date {
  const rise = sunriseAt(observer, date);
  const set = SearchRiseSet(Body.Sun, observer, -1, rise, 1);
  return set?.date ?? new Date(rise.getTime() + 12 * 3_600_000);
}

export function moonSiderealAt(date: Date): number {
  return siderealLon(EclipticGeoMoon(date).lon, date);
}

export function sunSiderealAt(date: Date): number {
  return siderealLon(SunPosition(date).elon, date);
}

export function isRetrograde(body: Body, date: Date): boolean {
  if (body === Body.Sun || body === Body.Moon) return false;
  const before = siderealPlanetLongitude(body, new Date(date.getTime() - 86_400_000));
  const after = siderealPlanetLongitude(body, new Date(date.getTime() + 86_400_000));
  return wrap360(after - before) > 180;
}
