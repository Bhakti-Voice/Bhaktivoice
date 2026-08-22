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

export { lahiriAyanamsa, siderealLon, wrap360, NAKSHATRA_SPAN };

const RASI_NAMES_HI = [
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

export function tropicalPlanetLongitude(body: Body, date: Date): number {
  if (body === Body.Moon) return tropicalMoonLon(date);
  if (body === Body.Sun) return tropicalSunLon(date);
  const vec = GeoVector(body, date, true);
  return wrap360(Ecliptic(vec).elon);
}

export function siderealPlanetLongitude(body: Body, date: Date): number {
  return siderealLon(tropicalPlanetLongitude(body, date), date);
}

/** Mean Rahu (ascending lunar node) in tropical ecliptic longitude. */
export function meanRahuLongitude(date: Date): number {
  const jd = date.getTime() / 86_400_000 + 2_440_587.5;
  const t = (jd - 2_451_545.0) / 36525.0;
  const omega =
    125.0445479 -
    1934.1362891 * t +
    0.0020754 * t * t +
    (t * t * t) / 467_441 -
    (t * t * t * t) / 60_616_000;
  return wrap360(omega);
}

export function meanKetuLongitude(date: Date): number {
  return wrap360(meanRahuLongitude(date) + 180);
}

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
  const y = -Math.cos(lstRad);
  const x = Math.sin(oblRad) * Math.tan(latRad) + Math.cos(oblRad) * Math.sin(lstRad);
  return wrap360((Math.atan2(y, x) * 180) / Math.PI);
}

export function siderealAscendant(date: Date, latitude: number, longitude: number): number {
  return siderealLon(ascendantLongitude(date, latitude, longitude), date);
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
