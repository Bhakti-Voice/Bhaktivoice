import type { BirthDetails, GunaScore, MilanResult } from "./types";
import { generateKundli } from "./kundli";
import {
  bhakootScore,
  ganaScore,
  grahaMaitriScore,
  nadiScore,
  taraScore,
  varnaScore,
  vashyaScore,
  yoniScore,
} from "./ashtakoot-data";

function verdict(total: number): { en: string; hi: string } {
  if (total >= 32) return { en: "Excellent match — very auspicious compatibility.", hi: "उत्तम मिलान — अत्यंत शुभ अनुकूलता।" };
  if (total >= 28) return { en: "Very good match — strong harmony indicated.", hi: "बहुत अच्छा मिलान — मजबूत सामंजस्य।" };
  if (total >= 24) return { en: "Good match — marriage can be considered.", hi: "अच्छा मिलान — विवाह पर विचार किया जा सकता है।" };
  if (total >= 18) return { en: "Average match — meets the traditional minimum of 18 Gunas.", hi: "औसत मिलान — 18 गुणों की पारंपरिक न्यूनतम सीमा पूरी।" };
  return { en: "Below traditional threshold — consult a learned astrologer.", hi: "पारंपरिक सीमा से कम — किसी ज्योतिषी से परामर्श करें।" };
}

export function calculateMilan(boy: BirthDetails, girl: BirthDetails): MilanResult {
  const boyChart = generateKundli(boy);
  const girlChart = generateKundli(girl);

  const boyMoon = boyChart.moon;
  const girlMoon = girlChart.moon;

  const gunas: GunaScore[] = [
    {
      name: "Varna",
      nameHi: "वर्ण",
      max: 1,
      score: varnaScore(boyMoon.rashiIndex, girlMoon.rashiIndex),
      detail: "Spiritual duty compatibility",
    },
    {
      name: "Vashya",
      nameHi: "वश्य",
      max: 2,
      score: vashyaScore(boyMoon.rashiIndex, girlMoon.rashiIndex),
      detail: "Mutual influence and attraction",
    },
    {
      name: "Tara",
      nameHi: "तारा",
      max: 3,
      score: taraScore(boyMoon.nakshatraIndex, girlMoon.nakshatraIndex),
      detail: "Star compatibility and wellbeing",
    },
    {
      name: "Yoni",
      nameHi: "योनि",
      max: 4,
      score: yoniScore(boyMoon.nakshatraIndex, girlMoon.nakshatraIndex),
      detail: "Natural temperament harmony",
    },
    {
      name: "Graha Maitri",
      nameHi: "ग्रह मैत्री",
      max: 5,
      score: grahaMaitriScore(boyMoon.nakshatraIndex, girlMoon.nakshatraIndex),
      detail: "Planetary friendship of Moon lords",
    },
    {
      name: "Gana",
      nameHi: "गण",
      max: 6,
      score: ganaScore(boyMoon.nakshatraIndex, girlMoon.nakshatraIndex),
      detail: "Temperament — Deva, Manushya, Rakshasa",
    },
    {
      name: "Bhakoot",
      nameHi: "भकूट",
      max: 7,
      score: bhakootScore(boyMoon.rashiIndex, girlMoon.rashiIndex),
      detail: "Moon sign harmony and prosperity",
    },
    {
      name: "Nadi",
      nameHi: "नाड़ी",
      max: 8,
      score: nadiScore(boyMoon.nakshatraIndex, girlMoon.nakshatraIndex),
      detail: "Health and progeny compatibility",
    },
  ];

  const total = Math.round(gunas.reduce((sum, guna) => sum + guna.score, 0) * 10) / 10;
  const v = verdict(total);

  return {
    boy: boyChart,
    girl: girlChart,
    gunas,
    total,
    maxTotal: 36,
    verdict: v.en,
    verdictHi: v.hi,
  };
}
