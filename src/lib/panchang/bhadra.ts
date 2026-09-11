import { elongation, moonRasi } from "./astronomy";

export type BhadraResidence = "swarga" | "prithvi" | "patala";

export type BhadraInfo = {
  isActive: boolean;
  start: Date | null;
  end: Date | null;
  residence: BhadraResidence | null;
  residenceEn: string;
  residenceHi: string;
  residenceImpactEn: string;
  residenceImpactHi: string;
  isMaleficOnEarth: boolean;
  moonSign: string;
  moonSignHi: string;
  puchhaStart?: Date | null;
  puchhaEnd?: Date | null;
  mukhaStart?: Date | null;
  mukhaEnd?: Date | null;
  guidanceEn: string;
  guidanceHi: string;
  prohibitedActivitiesEn: string[];
  prohibitedActivitiesHi: string[];
};

/**
 * Calculates Bhadra (Vishti Karana) status and residence for any date.
 * Based on classical Jyotish tenets (Muhurta Chintamani & Narada Samhita).
 */
export function getBhadraInfo(date: Date): BhadraInfo {
  const elon = elongation(date);
  const half = Math.floor(elon / 6); // 0 to 59
  
  // Vishti Karana (Bhadra) corresponds to (half - 1) % 7 === 6 for half in 1..56
  const isVishti = half >= 1 && half <= 56 && (half - 1) % 7 === 6;

  // Find the prevailing or nearest Bhadra on this day
  let targetHalf = half;
  let isActive = isVishti;

  if (!isVishti) {
    // Check if Bhadra occurs within +-12 hours
    const nextHalf = half + 1;
    const prevHalf = half - 1;
    if (nextHalf >= 1 && nextHalf <= 56 && (nextHalf - 1) % 7 === 6) {
      targetHalf = nextHalf;
    } else if (prevHalf >= 1 && prevHalf <= 56 && (prevHalf - 1) % 7 === 6) {
      targetHalf = prevHalf;
    }
  }

  const fraction = (elon % 6) / 6;
  const approxDurationMs = 12 * 3600_000;
  
  let start: Date | null = null;
  let end: Date | null = null;

  if (isActive) {
    start = new Date(date.getTime() - fraction * approxDurationMs);
    end = new Date(start.getTime() + approxDurationMs);
  } else if (targetHalf !== half) {
    const diffHalves = targetHalf - half;
    start = new Date(date.getTime() + (diffHalves - fraction) * approxDurationMs);
    end = new Date(start.getTime() + approxDurationMs);
  }

  // Moon Rasi determines Bhadra Vaas (Residence)
  const rasi = moonRasi(date);
  const rasiIdx = rasi.index; // 0: Mesha ... 11: Meena

  let residence: BhadraResidence = "swarga";
  let residenceEn = "Swarga Loka (Heaven)";
  let residenceHi = "स्वर्ग लोक";
  let residenceImpactEn = "Bhadra resides in the celestial realm. Its sting stays in heaven, rendering rituals on Earth safe and auspicious.";
  let residenceImpactHi = "भद्रा का वास स्वर्ग में है। इसका अशुभ प्रभाव पृथ्वी पर नहीं पड़ता, अतः सभी सांसारिक मांगलिक कार्य निर्विघ्न किए जा सकते हैं।";
  let isMaleficOnEarth = false;

  // Classical Rule of Bhadra Vaas:
  // Mesha(0), Vrishabha(1), Mithuna(2), Vrischika(7) -> Swarga
  // Karka(3), Simha(4), Kanya(5), Tula(6) -> Prithvi (Mrityuloka)
  // Dhanu(8), Makara(9), Kumbha(10), Meena(11) -> Patala
  if ([3, 4, 5, 6].includes(rasiIdx)) {
    residence = "prithvi";
    residenceEn = "Prithvi Loka (Earth / Mrityuloka)";
    residenceHi = "पृथ्वी लोक (मृत्युलोक)";
    residenceImpactEn = "Bhadra resides directly on Earth! This is the most malefic state where all auspicious ceremonies, tying of Raksha Bandhan, and Griha Pravesh are strictly prohibited.";
    residenceImpactHi = "भद्रा का वास साक्षात् पृथ्वी (मृत्युलोक) पर है! यह अत्यंत अशुभ स्थिति है, जिसमें रक्षाबंधन सूत्र बांधना, होलिका दहन, विवाह, गृह प्रवेश आदि सर्वथा वर्जित हैं।";
    isMaleficOnEarth = true;
  } else if ([8, 9, 10, 11].includes(rasiIdx)) {
    residence = "patala";
    residenceEn = "Patala Loka (Netherworld)";
    residenceHi = "पाताल लोक";
    residenceImpactEn = "Bhadra resides in the netherworld. According to Muhurta Chintamani, Bhadra in Patala showers worldly prosperity and commercial success on Earth.";
    residenceImpactHi = "भद्रा का वास पाताल लोक में है। मुहूर्त चिंतामणि के अनुसार पाताल निवासिनी भद्रा पृथ्वी वासियों के लिए धन-धान्य और व्यापार में विजय प्रदान करने वाली मानी गई है।";
    isMaleficOnEarth = false;
  }

  // Compute Bhadra Puchha & Mukha (Puchha is last 3 ghatis ~ 1.2 hrs, Mukha is first 5 ghatis ~ 2 hrs)
  let puchhaStart: Date | null = null;
  let puchhaEnd: Date | null = null;
  let mukhaStart: Date | null = null;
  let mukhaEnd: Date | null = null;

  if (start && end) {
    const totalMs = end.getTime() - start.getTime();
    mukhaStart = new Date(start.getTime());
    mukhaEnd = new Date(start.getTime() + totalMs * (5 / 30));

    puchhaStart = new Date(end.getTime() - totalMs * (3 / 30));
    puchhaEnd = new Date(end.getTime());
  }

  const prohibitedActivitiesEn = [
    "Raksha Bandhan rakhi tying",
    "Holika Dahan lighting",
    "Griha Pravesh & Housewarming",
    "Vivah Sanskar (Weddings)",
    "Starting a new business or signing contracts",
    "Beginning long journeys (Yatra)",
    "Mundan and Janeu ceremonies",
  ];

  const prohibitedActivitiesHi = [
    "रक्षाबंधन पर रक्षासूत्र (राखी) बांधना",
    "होलिका दहन प्रज्वलित करना",
    "नवीन गृह प्रवेश एवं वास्तु पूजा",
    "विवाह संस्कार एवं सगाई",
    "नवीन व्यापार का शुभारम्भ या अनुबंध हस्ताक्षर",
    "शुभ यात्रा का प्रस्थान",
    "मुंडन एवं उपनयन (जनेऊ) संस्कार",
  ];

  const guidanceEn = isMaleficOnEarth && isActive
    ? "Bhadra is currently active on Earth. Delay all auspicious activities until the tail (Puchha) or until Bhadra concludes."
    : isActive
    ? `Bhadra is currently active, but its residence is in ${residenceEn}. Classical texts indicate earthly ceremonies face minimal affliction.`
    : "Bhadra (Vishti Karana) is not prevailing at this moment. You may proceed with auspicious undertakings during favorable Choghadiya or Abhijit Muhurat.";

  const guidanceHi = isMaleficOnEarth && isActive
    ? "वर्तमान में भद्रा मृत्युलोक में सक्रिय है। समस्त शुभ कार्यों को भद्रा की समाप्ति या भद्रा पुच्छ काल तक स्थगित रखें।"
    : isActive
    ? `भद्रा वर्तमान में सक्रिय अवश्य है, किंतु इसका वास ${residenceHi} में है। शास्त्रीय मतानुसार पृथ्वी के कार्यों पर इसका दोष न्यून रहता है।`
    : "इस समय भद्रा का प्रभाव नहीं है। शुभ चौघड़िया या अभिजित मुहूर्त में मांगलिक कार्य संपन्न किए जा सकते हैं।";

  return {
    isActive,
    start,
    end,
    residence,
    residenceEn,
    residenceHi,
    residenceImpactEn,
    residenceImpactHi,
    isMaleficOnEarth,
    moonSign: rasi.name,
    moonSignHi: rasi.nameHi,
    puchhaStart,
    puchhaEnd,
    mukhaStart,
    mukhaEnd,
    guidanceEn,
    guidanceHi,
    prohibitedActivitiesEn,
    prohibitedActivitiesHi,
  };
}
