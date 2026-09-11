/**
 * Classical Parashari Ashtakavarga Calculation Engine
 * Directly follows Maharishi Parashara's Brihat Parashara Hora Shastra (BPHS).
 * Computes Bhinnashtakavarga (BAV) for all 7 planets and Sarvashtakavarga (SAV, 337 total points).
 */

import type { KundliChart } from "./types";

export type PlanetAshtakaKey = "sun" | "moon" | "mars" | "mercury" | "jupiter" | "venus" | "saturn";

export type AshtakavargaHouseScore = {
  houseNumber: number; // 1 to 12
  rashiIndex: number; // 0 to 11
  rashiName: string;
  rashiNameHi: string;
  totalPoints: number; // SAV points in this house
  strength: "Uttama" | "Madhyama" | "Adhama";
  strengthHi: "उत्तम" | "मध्यम" | "साधना योग्य";
  interpretationEn: string;
  interpretationHi: string;
};

export type AshtakavargaResult = {
  // Bhinnashtakavarga (BAV) per planet across 12 signs (index 0 to 11 = Aries to Pisces)
  bav: Record<PlanetAshtakaKey, number[]>;
  // Sarvashtakavarga (SAV) per sign (0 to 11)
  savByRashi: number[];
  // SAV per house from Lagna (1 to 12)
  savByHouse: AshtakavargaHouseScore[];
  // Total points across zodiac (must sum to 337)
  totalPoints: number;
};

const BENEFIC_PLACES: Record<PlanetAshtakaKey, Record<string, number[]>> = {
  sun: {
    sun: [1, 2, 4, 7, 8, 9, 10, 11],
    moon: [3, 6, 10, 11],
    mars: [1, 2, 4, 7, 8, 9, 10, 11],
    mercury: [3, 5, 6, 9, 10, 11, 12],
    jupiter: [5, 6, 9, 11],
    venus: [6, 7, 12],
    saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    lagna: [3, 4, 6, 10, 11, 12],
  },
  moon: {
    sun: [3, 6, 7, 8, 10, 11],
    moon: [1, 3, 6, 7, 10, 11],
    mars: [2, 3, 5, 6, 9, 10, 11],
    mercury: [1, 3, 4, 5, 7, 8, 10, 11],
    jupiter: [1, 4, 7, 8, 10, 11, 12],
    venus: [3, 4, 5, 7, 9, 10, 11],
    saturn: [3, 5, 6, 11],
    lagna: [3, 6, 10, 11],
  },
  mars: {
    sun: [3, 5, 6, 10, 11],
    moon: [3, 6, 11],
    mars: [1, 2, 4, 7, 8, 10, 11],
    mercury: [3, 5, 6, 11],
    jupiter: [6, 10, 11, 12],
    venus: [6, 8, 11, 12],
    saturn: [1, 4, 7, 8, 9, 10, 11],
    lagna: [1, 3, 6, 10, 11],
  },
  mercury: {
    sun: [5, 6, 9, 11, 12],
    moon: [2, 4, 6, 8, 10, 11],
    mars: [1, 2, 4, 7, 8, 9, 10, 11],
    mercury: [1, 3, 5, 6, 9, 10, 11, 12],
    jupiter: [6, 8, 11, 12],
    venus: [1, 2, 3, 4, 5, 8, 9, 11],
    saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    lagna: [1, 2, 4, 6, 8, 10, 11],
  },
  jupiter: {
    sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
    moon: [2, 5, 7, 9, 11],
    mars: [1, 2, 4, 7, 8, 10, 11],
    mercury: [1, 2, 4, 5, 6, 9, 10, 11],
    jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
    venus: [2, 5, 6, 9, 10, 11],
    saturn: [3, 5, 6, 12],
    lagna: [1, 2, 4, 5, 6, 7, 9, 10, 11],
  },
  venus: {
    sun: [8, 11, 12],
    moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
    mars: [3, 5, 6, 9, 11, 12],
    mercury: [3, 5, 6, 9, 11],
    jupiter: [5, 8, 9, 10, 11],
    venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
    saturn: [3, 4, 5, 8, 9, 10, 11],
    lagna: [1, 2, 3, 4, 5, 8, 9, 11],
  },
  saturn: {
    sun: [1, 2, 4, 7, 8, 10, 11],
    moon: [3, 5, 6, 11],
    mars: [3, 5, 6, 10, 11, 12],
    mercury: [6, 8, 9, 10, 11, 12],
    jupiter: [5, 6, 11, 12],
    venus: [6, 11, 12],
    saturn: [3, 5, 6, 11],
    lagna: [1, 3, 4, 6, 10, 11],
  },
};

const RASHI_NAMES_EN = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const RASHI_NAMES_HI = [
  "मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या",
  "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"
];

export function calculateAshtakavarga(chart: KundliChart): AshtakavargaResult {
  // Extract positions of 7 planets + Lagna (rashiIndex 0 to 11)
  const planetRashi: Record<string, number> = {
    lagna: chart.lagna.rashiIndex,
  };

  chart.planets.forEach((p) => {
    if (["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"].includes(p.id)) {
      planetRashi[p.id] = p.rashiIndex;
    }
  });

  const planetsList: PlanetAshtakaKey[] = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"];

  // Initialize BAV tables: 7 planets x 12 signs
  const bav: Record<PlanetAshtakaKey, number[]> = {
    sun: Array(12).fill(0),
    moon: Array(12).fill(0),
    mars: Array(12).fill(0),
    mercury: Array(12).fill(0),
    jupiter: Array(12).fill(0),
    venus: Array(12).fill(0),
    saturn: Array(12).fill(0),
  };

  // Compute points for each target planet
  planetsList.forEach((target) => {
    const rules = BENEFIC_PLACES[target];
    // Each of the 8 reference points casts bindus
    const references = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "lagna"];
    references.forEach((ref) => {
      const refSign = planetRashi[ref] ?? 0;
      const beneficHouses = rules[ref] ?? [];
      beneficHouses.forEach((h) => {
        // House h from refSign (1-based: house 1 = refSign, house 2 = (refSign + 1) % 12)
        const sign = (refSign + h - 1) % 12;
        bav[target][sign] += 1;
      });
    });
  });

  // Calculate composite Sarvashtakavarga (SAV) per sign
  const savByRashi = Array(12).fill(0);
  for (let sign = 0; sign < 12; sign++) {
    planetsList.forEach((p) => {
      savByRashi[sign] += bav[p][sign];
    });
  }

  // Calculate SAV per House from Lagna
  const lagnaSign = chart.lagna.rashiIndex;
  const savByHouse: AshtakavargaHouseScore[] = Array.from({ length: 12 }, (_, i) => {
    const houseNumber = i + 1;
    const sign = (lagnaSign + i) % 12;
    const points = savByRashi[sign];

    let strength: "Uttama" | "Madhyama" | "Adhama" = "Madhyama";
    let strengthHi: "उत्तम" | "मध्यम" | "साधना योग्य" = "मध्यम";
    let interpretationEn = "";
    let interpretationHi = "";

    if (points >= 30) {
      strength = "Uttama";
      strengthHi = "उत्तम";
      interpretationEn = `Strong benefic shield with ${points} Bindus. Planetary transits through this house yield abundant prosperity, success, and protection.`;
      interpretationHi = `${points} बिंदुओं के साथ यह भाव अत्यंत बली है। गोचर में इस भाव से ग्रह अनुकूल परिणाम और सफलता प्रदान करते हैं।`;
    } else if (points >= 28) {
      strength = "Madhyama";
      strengthHi = "मध्यम";
      interpretationEn = `Balanced and steady with ${points} Bindus. Normal karma operates with consistent rewards for honest effort.`;
      interpretationHi = `${points} बिंदुओं के साथ यह भाव संतुलित फलदायी है। सामान्य परिश्रम से कार्य सिद्ध होते हैं।`;
    } else {
      strength = "Adhama";
      strengthHi = "साधना योग्य";
      interpretationEn = `Delicate with ${points} Bindus (below standard 28 threshold). Requires sadhana, patience, and remedial awareness during major transits.`;
      interpretationHi = `${points} बिंदुओं के साथ यह भाव संवेदनशील है (28 से कम)। इस भाव से जुड़े कार्यों में अतिरिक्त धैर्य एवं साधना की आवश्यकता है।`;
    }

    return {
      houseNumber,
      rashiIndex: sign,
      rashiName: RASHI_NAMES_EN[sign],
      rashiNameHi: RASHI_NAMES_HI[sign],
      totalPoints: points,
      strength,
      strengthHi,
      interpretationEn,
      interpretationHi,
    };
  });

  const totalPoints = savByRashi.reduce((sum, p) => sum + p, 0);

  return {
    bav,
    savByRashi,
    savByHouse,
    totalPoints,
  };
}
