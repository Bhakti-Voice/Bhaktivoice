import { Body } from "astronomy-engine";
import type {
  BirthDetails,
  DashaPeriod,
  HouseData,
  KundliChart,
  ManglikResult,
  PlanetPosition,
} from "./types";
import { zonedLocalToUtc } from "./geo";
import {
  HOUSE_SIGNIFICATIONS,
  NAKSHATRA_SPAN,
  RASI_LORDS,
  RASI_LORDS_HI,
  evaluatePlanetStatus,
  formatDegreeMinutes,
  isRetrograde,
  nakshatraFromSidereal,
  rashiFromSidereal,
  siderealAscendant,
  siderealKetuLongitude,
  siderealPlanetLongitude,
  siderealRahuLongitude,
  sunSiderealAt,
  wrap360,
} from "./core-astro";

const PLANET_META: {
  id: string;
  body?: Body;
  name: string;
  nameHi: string;
  symbol: string;
  node?: "rahu" | "ketu";
}[] = [
  { id: "sun", body: Body.Sun, name: "Sun", nameHi: "सूर्य", symbol: "☉" },
  { id: "moon", body: Body.Moon, name: "Moon", nameHi: "चंद्र", symbol: "☽" },
  { id: "mars", body: Body.Mars, name: "Mars", nameHi: "मंगल", symbol: "♂" },
  { id: "mercury", body: Body.Mercury, name: "Mercury", nameHi: "बुध", symbol: "☿" },
  { id: "jupiter", body: Body.Jupiter, name: "Jupiter", nameHi: "गुरु", symbol: "♃" },
  { id: "venus", body: Body.Venus, name: "Venus", nameHi: "शुक्र", symbol: "♀" },
  { id: "saturn", body: Body.Saturn, name: "Saturn", nameHi: "शनि", symbol: "♄" },
  { id: "rahu", name: "Rahu", nameHi: "राहु", symbol: "☊", node: "rahu" },
  { id: "ketu", name: "Ketu", nameHi: "केतु", symbol: "☋", node: "ketu" },
];

const VIMSHOTTARI_LORDS = [
  { id: "ketu", name: "Ketu", nameHi: "केतु", years: 7 },
  { id: "venus", name: "Venus", nameHi: "शुक्र", years: 20 },
  { id: "sun", name: "Sun", nameHi: "सूर्य", years: 6 },
  { id: "moon", name: "Moon", nameHi: "चंद्र", years: 10 },
  { id: "mars", name: "Mars", nameHi: "मंगल", years: 7 },
  { id: "rahu", name: "Rahu", nameHi: "राहु", years: 18 },
  { id: "jupiter", name: "Jupiter", nameHi: "गुरु", years: 16 },
  { id: "saturn", name: "Saturn", nameHi: "शनि", years: 19 },
  { id: "mercury", name: "Mercury", nameHi: "बुध", years: 17 },
];

function buildPosition(
  id: string,
  name: string,
  nameHi: string,
  symbol: string,
  siderealLongitude: number,
  retrograde: boolean,
  sunLon: number,
  lagnaRashiIndex: number,
): PlanetPosition {
  const rashi = rashiFromSidereal(siderealLongitude);
  const nakshatra = nakshatraFromSidereal(siderealLongitude);
  const degreeInSign = wrap360(siderealLongitude) % 30;
  const formattedDegree = formatDegreeMinutes(siderealLongitude);
  const house = ((rashi.index - lagnaRashiIndex + 12) % 12) + 1;
  const { status, statusHi, isCombust } = evaluatePlanetStatus(
    id,
    rashi.index,
    sunLon,
    siderealLongitude,
  );

  return {
    id,
    name,
    nameHi,
    symbol,
    siderealLongitude,
    degreeInSign,
    formattedDegree,
    rashiIndex: rashi.index,
    rashi: rashi.name,
    rashiHi: rashi.nameHi,
    nakshatraIndex: nakshatra.index,
    nakshatra: nakshatra.name,
    nakshatraHi: nakshatra.nameHi,
    pada: nakshatra.pada,
    house,
    retrograde,
    isCombust,
    status,
    statusHi,
  };
}

export function calculateManglikDosha(
  marsHouseFromLagna: number,
  marsHouseFromMoon: number,
  marsRashiIndex: number,
): ManglikResult {
  const MANGLIK_HOUSES = [1, 2, 4, 7, 8, 12];
  const isLagnaManglik = MANGLIK_HOUSES.includes(marsHouseFromLagna);
  const isMoonManglik = MANGLIK_HOUSES.includes(marsHouseFromMoon);

  if (!isLagnaManglik && !isMoonManglik) {
    return {
      isManglik: false,
      level: "None",
      levelHi: "दोष रहित",
      fromLagna: { isManglik: false, house: marsHouseFromLagna },
      fromMoon: { isManglik: false, house: marsHouseFromMoon },
      description: "No Manglik Dosha present. Mars is in an auspicious house.",
      descriptionHi: "कोई मांगलिक दोष नहीं है। मंगल अनुकूल भाव में स्थित है।",
    };
  }

  // Check classical cancellation rules
  // 1. Mars in Aries in 1st, Scorpio in 4th, Capricorn in 7th, Sagittarius in 8th, Pisces in 12th
  const isCancelled =
    (marsHouseFromLagna === 1 && marsRashiIndex === 0) ||
    (marsHouseFromLagna === 4 && marsRashiIndex === 7) ||
    (marsHouseFromLagna === 7 && marsRashiIndex === 9) ||
    (marsHouseFromLagna === 8 && marsRashiIndex === 8) ||
    (marsHouseFromLagna === 12 && marsRashiIndex === 11);

  if (isCancelled) {
    return {
      isManglik: true,
      level: "Low",
      levelHi: "आंशिक / परिहार",
      fromLagna: { isManglik: isLagnaManglik, house: marsHouseFromLagna },
      fromMoon: { isManglik: isMoonManglik, house: marsHouseFromMoon },
      description: `Manglik Dosha cancelled due to Mars placement in friendly/own sign (House ${marsHouseFromLagna}).`,
      descriptionHi: `मंगल के स्वराशि/उच्च राशि में होने के कारण मांगलिक दोष का परिहार हो गया है।`,
      isCancelled: true,
      cancellationReason: "Kuja Dosha cancelled by classical astrological exception.",
      cancellationReasonHi: "विशेष ग्रह स्थिति के कारण कुज दोष निष्प्रभावी है।",
    };
  }

  const isHigh = isLagnaManglik && (marsHouseFromLagna === 7 || marsHouseFromLagna === 8);
  return {
    isManglik: true,
    level: isHigh ? "High" : "Low",
    levelHi: isHigh ? "पूर्ण मांगलिक" : "आंशिक मांगलिक",
    fromLagna: { isManglik: isLagnaManglik, house: marsHouseFromLagna },
    fromMoon: { isManglik: isMoonManglik, house: marsHouseFromMoon },
    description: `Manglik Dosha present with Mars placed in House ${marsHouseFromLagna} from Lagna.`,
    descriptionHi: `लग्न से ${marsHouseFromLagna}वें भाव में मंगल स्थित होने से मांगलिक दोष उपस्थित है।`,
  };
}

export function calculateVimshottariDasha(
  moonLon: number,
  birthYear: number,
): {
  birthBalancePlanet: string;
  birthBalancePlanetHi: string;
  birthBalanceYears: number;
  periods: DashaPeriod[];
} {
  const nakIndex = Math.min(26, Math.floor(wrap360(moonLon) / NAKSHATRA_SPAN));
  const lordIdx = nakIndex % 9;
  const currentLord = VIMSHOTTARI_LORDS[lordIdx];

  const posInNak = wrap360(moonLon) % NAKSHATRA_SPAN;
  const fractionRemaining = (NAKSHATRA_SPAN - posInNak) / NAKSHATRA_SPAN;
  const balanceYears = Math.round(fractionRemaining * currentLord.years * 100) / 100;

  const currentYear = new Date().getFullYear();
  const periods: DashaPeriod[] = [];

  let startY = birthYear;
  let endY = birthYear + balanceYears;

  periods.push({
    planetId: currentLord.id,
    planetName: currentLord.name,
    planetNameHi: currentLord.nameHi,
    startYear: Math.floor(startY),
    endYear: Math.floor(endY),
    durationYears: balanceYears,
    isCurrent: currentYear >= startY && currentYear < endY,
  });

  startY = endY;

  for (let i = 1; i < 9; i++) {
    const nextLord = VIMSHOTTARI_LORDS[(lordIdx + i) % 9];
    endY = startY + nextLord.years;
    periods.push({
      planetId: nextLord.id,
      planetName: nextLord.name,
      planetNameHi: nextLord.nameHi,
      startYear: Math.floor(startY),
      endYear: Math.floor(endY),
      durationYears: nextLord.years,
      isCurrent: currentYear >= startY && currentYear < endY,
    });
    startY = endY;
  }

  return {
    birthBalancePlanet: currentLord.name,
    birthBalancePlanetHi: currentLord.nameHi,
    birthBalanceYears: balanceYears,
    periods,
  };
}

export function generateKundli(details: BirthDetails): KundliChart {
  const birthUtc = zonedLocalToUtc(details.date, details.time, details.place.timeZone);
  const { latitude, longitude, timeZone } = details.place;

  const lagnaLon = siderealAscendant(birthUtc, latitude, longitude);
  const lagnaRashi = rashiFromSidereal(lagnaLon);

  const sunLon = sunSiderealAt(birthUtc);

  const lagna = buildPosition(
    "lagna",
    "Lagna (Ascendant)",
    "लग्न",
    "Asc",
    lagnaLon,
    false,
    sunLon,
    lagnaRashi.index,
  );

  const planets: PlanetPosition[] = PLANET_META.map((meta) => {
    let sidereal = 0;
    let retro = false;
    if (meta.node === "rahu") {
      sidereal = siderealRahuLongitude(birthUtc);
    } else if (meta.node === "ketu") {
      sidereal = siderealKetuLongitude(birthUtc);
    } else if (meta.body) {
      sidereal = siderealPlanetLongitude(meta.body, birthUtc);
      retro = isRetrograde(meta.body, birthUtc);
    }
    return buildPosition(
      meta.id,
      meta.name,
      meta.nameHi,
      meta.symbol,
      sidereal,
      retro,
      sunLon,
      lagnaRashi.index,
    );
  });

  const moon = planets.find((p) => p.id === "moon")!;
  const sun = planets.find((p) => p.id === "sun")!;
  const mars = planets.find((p) => p.id === "mars")!;

  // Build 12 Houses (Bhavas)
  const houses: HouseData[] = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const rashiIdx = (lagnaRashi.index + i) % 12;
    const rashiInfo = rashiFromSidereal(rashiIdx * 30);
    const housePlanets = planets.filter((p) => p.house === houseNum);
    const sig = HOUSE_SIGNIFICATIONS[i];

    return {
      houseNumber: houseNum,
      rashiIndex: rashiIdx,
      rashi: rashiInfo.name,
      rashiHi: rashiInfo.nameHi,
      rashiLord: RASI_LORDS[rashiIdx],
      rashiLordHi: RASI_LORDS_HI[rashiIdx],
      signification: sig.en,
      significationHi: sig.hi,
      planets: housePlanets,
    };
  });

  // Manglik Calculation
  const marsHouseFromMoon = ((mars.rashiIndex - moon.rashiIndex + 12) % 12) + 1;
  const manglik = calculateManglikDosha(mars.house, marsHouseFromMoon, mars.rashiIndex);

  // Vimshottari Dasha
  const birthYear = parseInt(details.date.split("-")[0] || "1995", 10);
  const vimshottariDasha = calculateVimshottariDasha(moon.siderealLongitude, birthYear);

  return {
    name: details.name,
    birthDate: details.date,
    birthTime: details.time,
    birthUtc,
    place: { ...details.place, timeZone },
    lagna,
    moon,
    sun,
    planets,
    houses,
    manglik,
    vimshottariDasha,
  };
}

export function chartSummary(chart: KundliChart, locale: "en" | "hi" = "en"): string {
  const hi = locale === "hi";
  return hi
    ? `लग्न ${chart.lagna.rashiHi} · चंद्र राशि ${chart.moon.rashiHi} (${chart.moon.nakshatraHi}, पाद ${chart.moon.pada}) · सूर्य राशि ${chart.sun.rashiHi}`
    : `Lagna ${chart.lagna.rashi} · Moon Sign ${chart.moon.rashi} (${chart.moon.nakshatra}, Pada ${chart.moon.pada}) · Sun Sign ${chart.sun.rashi}`;
}
