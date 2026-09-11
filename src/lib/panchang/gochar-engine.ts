import { getDailyEphemeris, type DailyEphemerisReport } from "./ephemeris-engine";
import { RASI_NAMES, RASI_NAMES_HI } from "./names";
import { DEFAULT_CITY } from "./cities";

export interface PlanetGocharItem {
  planetId: string;
  name: string;
  nameHi: string;
  symbol: string;
  currentRashiIndex: number;
  currentRashiName: string;
  currentRashiNameHi: string;
  degreeFormatted: string;
  houseFromMoon: number; // 1 to 12
  isFavorable: boolean;
  effectType: "shubh" | "sama" | "ashubh";
  effectTitle: string;
  effectTitleHi: string;
  description: string;
  descriptionHi: string;
  isRetrograde: boolean;
  isCombust: boolean;
}

export interface MajorTransitEvent {
  planetId: "saturn" | "jupiter" | "rahu" | "ketu";
  planetName: string;
  planetNameHi: string;
  symbol: string;
  fromRashiIndex: number;
  fromRashiName: string;
  fromRashiNameHi: string;
  toRashiIndex: number;
  toRashiName: string;
  toRashiNameHi: string;
  transitDate: string; // YYYY-MM-DD
  significance: string;
  significanceHi: string;
}

export interface GocharReport {
  asOfDate: string;
  moonRashiIndex: number;
  moonRashiName: string;
  moonRashiNameHi: string;
  planets: PlanetGocharItem[];
  totalShubhCount: number;
  totalAshubhCount: number;
  overallScorePercentage: number; // 0 - 100%
  overallVerdict: string;
  overallVerdictHi: string;
  majorTransits: MajorTransitEvent[];
}

/**
 * Classical Gochar Favorable Houses from Natal Moon (Phaladeepika / Brihat Samhita)
 */
const FAVORABLE_HOUSES_MAP: Record<string, number[]> = {
  sun: [3, 6, 10, 11],
  moon: [1, 3, 6, 7, 10, 11],
  mars: [3, 6, 11],
  mercury: [2, 4, 6, 8, 10, 11],
  jupiter: [2, 5, 7, 9, 11],
  venus: [1, 2, 3, 4, 5, 8, 9, 11, 12],
  saturn: [3, 6, 11],
  rahu: [3, 6, 10, 11],
  ketu: [3, 6, 11],
};

const CLASSICAL_INTERPRETATIONS: Record<string, Record<number, { en: string; hi: string }>> = {
  sun: {
    1: { en: "Fatigue, eye strain, disputes, elevated ego.", hi: "शारीरिक थकान, नेत्र कष्ट एवं अहंकार से बचना चाहिए।" },
    2: { en: "Financial caution required; speech needs restraint.", hi: "आर्थिक मामलों में सावधानी तथा वाणी पर संयम रखें।" },
    3: { en: "High courage, victory over adversaries, official recognition.", hi: "पराक्रम में वृद्धि, शत्रुओं पर विजय व अधिकारियों से सहयोग।" },
    4: { en: "Domestic unease, mother's health needs attention.", hi: "पारिवारिक असंतोष व माता के स्वास्थ्य का ध्यान रखें।" },
    5: { en: "Mental worries regarding children or investments.", hi: "संतान व सट्टा-निवेश को लेकर मानसिक उद्वेग संभव।" },
    6: { en: "Eradication of debts and illnesses; triumph in contests.", hi: "ऋण, रोग व विरोधियों का शमन; मुकदमों व प्रतियोगिताओं में विजय।" },
    7: { en: "Tension in marital partnership or travels.", hi: "जीवनसाथी से मतभेद अथवा यात्रा में व्यवधान की संभावना।" },
    8: { en: "Health fluctuations; avoid risky financial ventures.", hi: "अचानक बाधाएं, स्वास्थ्य शिथिलता; जोखिम से बचें।" },
    9: { en: "Obstacles in fortune; maintain respect with father/teachers.", hi: "भाग्य में विलंब; पिता व गुरुजनों का सम्मान बनाए रखें।" },
    10: { en: "Professional promotion, honor from government or seniors.", hi: "कार्यक्षेत्र में पदोन्नति, मान-सम्मान व राजकीय लाभ।" },
    11: { en: "Fulfillment of ambitions, influx of prosperity and honors.", hi: "धन लाभ, मनोरथ सिद्धि, मित्रों व वरिष्ठों से श्रेष्ठ सहयोग।" },
    12: { en: "High unavoidable expenditures; disturbed sleep.", hi: "अनावश्यक व्यय, नेत्र विकार व अनिद्रा से सजग रहें।" },
  },
  jupiter: {
    1: { en: "Distracted focus; intellectual overload.", hi: "विचारों का भटकाव; अधिक बौद्धिक श्रम।" },
    2: { en: "Abundant wealth accumulation, sweet speech, family bliss.", hi: "धन-धान्य में वृद्धि, मधुर वाणी एवं परिवार में मांगलिक उत्सव।" },
    3: { en: "Disputes with siblings or frequent travel fatigue.", hi: "सहोदरादि से मतभेद अथवा अनावश्यक यात्राएं।" },
    4: { en: "Loss of peace at residence, property matters stall.", hi: "मानसिक अशांति, भूमि-भवन संबंधी कार्यों में अड़चनें।" },
    5: { en: "Supreme blessing: progeny, spiritual initiation, sharp intellect.", hi: "संतान सुख, ज्ञान-दीक्षा, मंत्र सिद्धि व उत्तम बौद्धिक लाभ।" },
    6: { en: "Health challenges, disputes with maternal relatives.", hi: "उदर विकार, मातृपक्ष से असहमति अथवा ऋण का बोझ।" },
    7: { en: "Marital harmony, flourishing business partnerships.", hi: "दांपत्य सुख, विवाह योग एवं व्यापार में उत्तम साझेदारी लाभ।" },
    8: { en: "Fatigue, delays in fortune, spiritual transformation.", hi: "अपेक्षित कार्यों में विलंब, वैराग्य व आध्यात्मिक अनुभव।" },
    9: { en: "Apex fortune: divine grace, pilgrimages, career elevation.", hi: "परम भाग्योदय, तीर्थयात्रा, गुरु कृपा व मान-सम्मान।" },
    10: { en: "Heavy workload, transfer or accountability scrutiny.", hi: "कार्यभार में अत्यधिक वृद्धि, स्थान परिवर्तन अथवा परीक्षण।" },
    11: { en: "Tremendous monetary gains, wish-fulfillment, honors.", hi: "विशाल धन लाभ, अभीष्ट सिद्धि व सामाजिक प्रतिष्ठा।" },
    12: { en: "Dharmic spending, charitable expenses, quiet contemplation.", hi: "धार्मिक व शुभ कार्यों पर व्यय, आत्म-चिंतन व वैराग्य।" },
  },
  saturn: {
    1: { en: "Sade Sati (Peak): intense discipline, patience required.", hi: "साढ़े साती शिखर: अत्यधिक परिश्रम, धैर्य व स्वास्थ्य सतर्कता।" },
    2: { en: "Sade Sati (Setting): financial reorganization, family duties.", hi: "साढ़े साती अंत्य चरण: संचित धन का संरक्षण, परिवार की जिम्मेदारी।" },
    3: { en: "Supreme vigor, victory over obstacles, long-term mastery.", hi: "उत्कृष्ट पराक्रम, शत्रुओं का दमन एवं स्थायी प्रगति।" },
    4: { en: "Kantaka Dhaiya: domestic unease, property delays.", hi: "कंटक ढैय्या: गृह सुख में कमी, वाहन व माता के स्वास्थ्य की चिंता।" },
    5: { en: "Obstacles in speculations, emotional reserve.", hi: "सट्टेबाजी से हानि, प्रेम प्रसंगों व संतान को लेकर चिंता।" },
    6: { en: "Unshakable triumph, defeat of all rivals, robust health.", hi: "शत्रुहंता योग, रोग व ऋण से मुक्ति, अभूतपूर्व सफलता।" },
    7: { en: "Strains in partnership; coldness in personal dynamics.", hi: "साझेदारी में मतभेद, जीवनसाथी के साथ संवाद में संयम आवश्यक।" },
    8: { en: "Ashtama Dhaiya: unexpected hurdles, extra caution needed.", hi: "अष्टम ढैय्या: गुप्त बाधाएं, वाहन चलाने में पूर्ण सावधानी बरतें।" },
    9: { en: "Spiritual trials, father's health, slow fortune.", hi: "भाग्य में धीमापन, धार्मिक यात्राओं में कष्ट।" },
    10: { en: "Relentless duty, heavy professional burden.", hi: "कठिन कर्म, पदोन्नति हेतु तीव्र संघर्ष।" },
    11: { en: "Golden transit: massive long-term wealth, influential network.", hi: "सर्वश्रेष्ठ गोचर: दीर्घकालिक लाभ, स्थायी संपत्ति एवं कीर्ति।" },
    12: { en: "Sade Sati (Rising): foreign expenses, insomnia, spiritual quest.", hi: "साढ़े साती उदय: विदेश संबंधी व्यय, अनिद्रा, आत्म-समीक्षा।" },
  },
};

/**
 * Major Planetary Ingress Calendar (Saturn, Jupiter, Rahu, Ketu)
 * 2024–2030
 */
export const MAJOR_TRANSITS_CALENDAR: MajorTransitEvent[] = [
  // Jupiter (Guru)
  {
    planetId: "jupiter",
    planetName: "Guru (Jupiter)",
    planetNameHi: "गुरु (बृहस्पति)",
    symbol: "♃",
    fromRashiIndex: 0,
    fromRashiName: "Mesha (Aries)",
    fromRashiNameHi: "मेष",
    toRashiIndex: 1,
    toRashiName: "Vrishabha (Taurus)",
    toRashiNameHi: "वृषभ",
    transitDate: "2024-05-01",
    significance: "Jupiter entered Taurus, expanding agricultural and financial stability.",
    significanceHi: "गुरु का वृषभ में प्रवेश — आर्थिक व बैंकिंग क्षेत्र में विस्तार।",
  },
  {
    planetId: "jupiter",
    planetName: "Guru (Jupiter)",
    planetNameHi: "गुरु (बृहस्पति)",
    symbol: "♃",
    fromRashiIndex: 1,
    fromRashiName: "Vrishabha (Taurus)",
    fromRashiNameHi: "वृषभ",
    toRashiIndex: 2,
    toRashiName: "Mithuna (Gemini)",
    toRashiNameHi: "मिथुन",
    transitDate: "2025-05-14",
    significance: "Jupiter enters Gemini, sparking breakthroughs in AI, communication, and education.",
    significanceHi: "गुरु का मिथुन राशि में प्रवेश — संचार, शिक्षा व तकनीकी विकास में तीव्रता।",
  },
  {
    planetId: "jupiter",
    planetName: "Guru (Jupiter)",
    planetNameHi: "गुरु (बृहस्पति)",
    symbol: "♃",
    fromRashiIndex: 2,
    fromRashiName: "Mithuna (Gemini)",
    fromRashiNameHi: "मिथुन",
    toRashiIndex: 3,
    toRashiName: "Karka (Cancer - EXALTED)",
    toRashiNameHi: "कर्क (उच्च)",
    transitDate: "2026-06-02",
    significance: "Jupiter enters Cancer (Exalted / Uccha). Rare spiritual renaissance and divine peace.",
    significanceHi: "गुरु का उच्च राशि कर्क में प्रवेश — परम आध्यात्मिक समृद्धि, शांति व दिव्य योग।",
  },
  {
    planetId: "jupiter",
    planetName: "Guru (Jupiter)",
    planetNameHi: "गुरु (बृहस्पति)",
    symbol: "♃",
    fromRashiIndex: 3,
    fromRashiName: "Karka (Cancer)",
    fromRashiNameHi: "कर्क",
    toRashiIndex: 4,
    toRashiName: "Simha (Leo)",
    toRashiNameHi: "सिंह",
    transitDate: "2027-06-25",
    significance: "Jupiter enters Leo (Guru in royal friend's sign). Leadership and administrative strength.",
    significanceHi: "गुरु का सिंह राशि में प्रवेश — नेतृत्व क्षमता व प्रशासनिक प्रतिष्ठा में वृद्धि।",
  },

  // Saturn (Shani)
  {
    planetId: "saturn",
    planetName: "Shani (Saturn)",
    planetNameHi: "शनिदेव",
    symbol: "♄",
    fromRashiIndex: 10,
    fromRashiName: "Kumbha (Aquarius)",
    fromRashiNameHi: "कुंभ",
    toRashiIndex: 11,
    toRashiName: "Meena (Pisces)",
    toRashiNameHi: "मीन",
    transitDate: "2025-03-30",
    significance: "Saturn enters water sign Pisces. Shani Sade Sati begins for Aries, ends for Capricorn.",
    significanceHi: "शनि का मीन में प्रवेश — मेष की साढ़े साती आरंभ, मकर की साढ़े साती समाप्त।",
  },
  {
    planetId: "saturn",
    planetName: "Shani (Saturn)",
    planetNameHi: "शनिदेव",
    symbol: "♄",
    fromRashiIndex: 11,
    fromRashiName: "Meena (Pisces)",
    fromRashiNameHi: "मीन",
    toRashiIndex: 0,
    toRashiName: "Mesha (Aries - DEBILITATED)",
    toRashiNameHi: "मेष (नीच)",
    transitDate: "2027-06-03",
    significance: "Saturn enters Aries (Neecha). Societal restructuring and high accountability.",
    significanceHi: "शनि का मेष राशि में प्रवेश — वैश्विक व्यवस्था व अनुशासन में बड़े बदलाव।",
  },
  {
    planetId: "saturn",
    planetName: "Shani (Saturn)",
    planetNameHi: "शनिदेव",
    symbol: "♄",
    fromRashiIndex: 0,
    fromRashiName: "Mesha (Aries)",
    fromRashiNameHi: "मेष",
    toRashiIndex: 1,
    toRashiName: "Vrishabha (Taurus)",
    toRashiNameHi: "वृषभ",
    transitDate: "2030-04-18",
    significance: "Saturn enters Taurus (Friendly sign of Venus). Material consolidation and steady gains.",
    significanceHi: "शनि का मित्र राशि वृषभ में प्रवेश — भौतिक स्थायित्व एवं व्यापारिक संतुलन।",
  },

  // Rahu & Ketu (True Node Transits)
  {
    planetId: "rahu",
    planetName: "Rahu",
    planetNameHi: "राहु",
    symbol: "☊",
    fromRashiIndex: 11,
    fromRashiName: "Meena (Pisces)",
    fromRashiNameHi: "मीन",
    toRashiIndex: 10,
    toRashiName: "Kumbha (Aquarius)",
    toRashiNameHi: "कुंभ",
    transitDate: "2025-05-18",
    significance: "Rahu transits retrograde into Aquarius (Co-ruled by Saturn & Rahu). Technological surge.",
    significanceHi: "राहु का कुंभ राशि में प्रवेश — आधुनिक वैज्ञानिक शोध व अप्रत्याशित वैश्विक परिवर्तन।",
  },
  {
    planetId: "ketu",
    planetName: "Ketu",
    planetNameHi: "केतु",
    symbol: "☋",
    fromRashiIndex: 5,
    fromRashiName: "Kanya (Virgo)",
    fromRashiNameHi: "कन्या",
    toRashiIndex: 4,
    toRashiName: "Simha (Leo)",
    toRashiNameHi: "सिंह",
    transitDate: "2025-05-18",
    significance: "Ketu transits into Leo. Dissolution of ego, spiritual awakening among leaders.",
    significanceHi: "केतु का सिंह राशि में प्रवेश — अहं का विसर्जन, सत्ताधीशों में आत्म-चिंतन।",
  },
  {
    planetId: "rahu",
    planetName: "Rahu",
    planetNameHi: "राहु",
    symbol: "☊",
    fromRashiIndex: 10,
    fromRashiName: "Kumbha (Aquarius)",
    fromRashiNameHi: "कुंभ",
    toRashiIndex: 9,
    toRashiName: "Makara (Capricorn)",
    toRashiNameHi: "मकर",
    transitDate: "2026-11-25",
    significance: "Rahu enters Capricorn, transforming corporate governance and state structures.",
    significanceHi: "राहु का मकर राशि में प्रवेश — प्रशासनिक व्यवस्था एवं उद्योग जगत में पुनर्गठन।",
  },
  {
    planetId: "ketu",
    planetName: "Ketu",
    planetNameHi: "केतु",
    symbol: "☋",
    fromRashiIndex: 4,
    fromRashiName: "Simha (Leo)",
    fromRashiNameHi: "सिंह",
    toRashiIndex: 3,
    toRashiName: "Karka (Cancer)",
    toRashiNameHi: "कर्क",
    transitDate: "2026-11-25",
    significance: "Ketu enters Cancer. Emotional detachment, deeper interest in ancient meditation.",
    significanceHi: "केतु का कर्क राशि में प्रवेश — मानसिक शांति हेतु योग, ध्यान एवं वैराग्य भाव।",
  },
];

/**
 * Calculates complete Gochar (Planetary Transit) analysis for any given Moon Sign on any date.
 */
export function calculateGocharReport(moonRashiIndex: number, date = new Date()): GocharReport {
  const ephemeris = getDailyEphemeris(date, DEFAULT_CITY);
  const asOfStr = date.toISOString().split("T")[0];

  const planets: PlanetGocharItem[] = [];
  let shubhCount = 0;
  let ashubhCount = 0;

  // Filter 9 Vedic Grahas (exclude modern outer planets for traditional Vedic Gochar)
  const vedicPlanets = ephemeris.planets.filter((p) =>
    ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"].includes(p.id)
  );

  for (const p of vedicPlanets) {
    const houseFromMoon = ((p.rashiIndex - moonRashiIndex + 12) % 12) + 1;
    const favHouses = FAVORABLE_HOUSES_MAP[p.id] || [];
    const isFav = favHouses.includes(houseFromMoon);

    let effectType: "shubh" | "sama" | "ashubh" = isFav ? "shubh" : "ashubh";

    // Venus in 6th or 7th is mildly neutral/testing
    if (p.id === "venus" && (houseFromMoon === 6 || houseFromMoon === 7)) {
      effectType = "ashubh";
    }

    if (effectType === "shubh") {
      shubhCount++;
    } else {
      ashubhCount++;
    }

    // Lookup description
    const interp = CLASSICAL_INTERPRETATIONS[p.id]?.[houseFromMoon];
    const defaultDesc = isFav
      ? {
          en: `Transiting house ${houseFromMoon} from Moon: Auspicious results, mental clarity, and advancement.`,
          hi: `चंद्र से ${houseFromMoon}वें भाव में गोचर: शुभ फल, मानसिक शांति एवं कार्यों में सफलता।`,
        }
      : {
          en: `Transiting house ${houseFromMoon} from Moon: Patience, discipline, and caution advised.`,
          hi: `चंद्र से ${houseFromMoon}वें भाव में गोचर: संयम, धैर्य एवं सजगता अपेक्षित है।`,
        };

    const finalDesc = interp || defaultDesc;

    planets.push({
      planetId: p.id,
      name: p.name,
      nameHi: p.nameHi,
      symbol: p.symbol,
      currentRashiIndex: p.rashiIndex,
      currentRashiName: p.rashiName,
      currentRashiNameHi: p.rashiNameHi,
      degreeFormatted: p.degreeInRashiFormatted,
      houseFromMoon,
      isFavorable: isFav,
      effectType,
      effectTitle: isFav ? `House ${houseFromMoon} (Auspicious / Shubh)` : `House ${houseFromMoon} (Adverse / Ashubh)`,
      effectTitleHi: isFav ? `${houseFromMoon}वाँ भाव (शुभ गोचर)` : `${houseFromMoon}वाँ भाव (अशुभ गोचर)`,
      description: finalDesc.en,
      descriptionHi: finalDesc.hi,
      isRetrograde: p.isRetrograde,
      isCombust: p.isCombust,
    });
  }

  const total = shubhCount + ashubhCount;
  const scorePercent = Math.round((shubhCount / Math.max(1, total)) * 100);

  let overallVerdict = "Moderate & Balanced Gochar";
  let overallVerdictHi = "मध्यम व संतुलित गोचर फल";

  if (scorePercent >= 65) {
    overallVerdict = "Highly Auspicious (Rajayoga-like Favorable Transits)";
    overallVerdictHi = "अति शुभ गोचर (राजयोग समान अनुकूल परिणाम)";
  } else if (scorePercent <= 35) {
    overallVerdict = "Challenging Transit Period — Spiritual Sadhanas Advised";
    overallVerdictHi = "परीक्षण काल — जप, साधना व संयम अपेक्षित";
  }

  return {
    asOfDate: asOfStr,
    moonRashiIndex,
    moonRashiName: RASI_NAMES[moonRashiIndex],
    moonRashiNameHi: RASI_NAMES_HI[moonRashiIndex],
    planets,
    totalShubhCount: shubhCount,
    totalAshubhCount: ashubhCount,
    overallScorePercentage: scorePercent,
    overallVerdict,
    overallVerdictHi,
    majorTransits: MAJOR_TRANSITS_CALENDAR,
  };
}
