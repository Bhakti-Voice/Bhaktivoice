import { Body } from "astronomy-engine";
import type { BirthDetails, KundliChart, PlanetPosition } from "./types";
import { zonedLocalToUtc } from "./geo";
import {
  isRetrograde,
  meanKetuLongitude,
  meanRahuLongitude,
  nakshatraFromSidereal,
  rashiFromSidereal,
  siderealAscendant,
  siderealPlanetLongitude,
} from "./core-astro";

const PLANET_META: { id: string; body?: Body; name: string; nameHi: string; node?: "rahu" | "ketu" }[] = [
  { id: "sun", body: Body.Sun, name: "Sun", nameHi: "सूर्य" },
  { id: "moon", body: Body.Moon, name: "Moon", nameHi: "चंद्र" },
  { id: "mars", body: Body.Mars, name: "Mars", nameHi: "मंगल" },
  { id: "mercury", body: Body.Mercury, name: "Mercury", nameHi: "बुध" },
  { id: "jupiter", body: Body.Jupiter, name: "Jupiter", nameHi: "गुरु" },
  { id: "venus", body: Body.Venus, name: "Venus", nameHi: "शुक्र" },
  { id: "saturn", body: Body.Saturn, name: "Saturn", nameHi: "शनि" },
  { id: "rahu", name: "Rahu", nameHi: "राहु", node: "rahu" },
  { id: "ketu", name: "Ketu", nameHi: "केतु", node: "ketu" },
];

function buildPosition(
  id: string,
  name: string,
  nameHi: string,
  siderealLongitude: number,
  retrograde: boolean,
): PlanetPosition {
  const rashi = rashiFromSidereal(siderealLongitude);
  const nakshatra = nakshatraFromSidereal(siderealLongitude);
  return {
    id,
    name,
    nameHi,
    siderealLongitude,
    rashiIndex: rashi.index,
    rashi: rashi.name,
    rashiHi: rashi.nameHi,
    nakshatraIndex: nakshatra.index,
    nakshatra: nakshatra.name,
    nakshatraHi: nakshatra.nameHi,
    pada: nakshatra.pada,
    retrograde,
  };
}

export function generateKundli(details: BirthDetails): KundliChart {
  const birthUtc = zonedLocalToUtc(details.date, details.time, details.place.timeZone);
  const { latitude, longitude, timeZone } = details.place;

  const lagnaLon = siderealAscendant(birthUtc, latitude, longitude);
  const lagna = buildPosition("lagna", "Lagna", "लग्न", lagnaLon, false);

  const planets: PlanetPosition[] = PLANET_META.map((meta) => {
    let sidereal = 0;
    let retro = false;
    if (meta.node === "rahu") {
      sidereal = meanRahuLongitude(birthUtc);
    } else if (meta.node === "ketu") {
      sidereal = meanKetuLongitude(birthUtc);
    } else if (meta.body) {
      sidereal = siderealPlanetLongitude(meta.body, birthUtc);
      retro = isRetrograde(meta.body, birthUtc);
    }
    return buildPosition(meta.id, meta.name, meta.nameHi, sidereal, retro);
  });

  const moon = planets.find((planet) => planet.id === "moon")!;
  const sun = planets.find((planet) => planet.id === "sun")!;

  return {
    birthUtc,
    place: { ...details.place, timeZone },
    lagna,
    moon,
    sun,
    planets,
  };
}

export function chartSummary(chart: KundliChart, locale: "en" | "hi" = "en"): string {
  const hi = locale === "hi";
  return hi
    ? `लग्न ${chart.lagna.rashiHi} · चंद्र ${chart.moon.rashiHi} (${chart.moon.nakshatraHi})`
    : `Lagna ${chart.lagna.rashi} · Moon ${chart.moon.rashi} (${chart.moon.nakshatra})`;
}
