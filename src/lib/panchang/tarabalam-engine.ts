import { NAKSHATRA_NAMES, NAKSHATRA_NAMES_HI, RASI_NAMES, RASI_NAMES_HI } from "./names";
import { getPanchang } from "./engine";
import { DEFAULT_CITY, type CityConfig } from "./cities";
import { moonRasi } from "./astronomy";

export interface TaraDefinition {
  index: number; // 1 to 9
  name: string;
  nameHi: string;
  sanskrit: string;
  nature: "shubh" | "madhyam" | "ashubh";
  natureLabel: string;
  natureLabelHi: string;
  significance: string;
  significanceHi: string;
  remedy: string;
  remedyHi: string;
}

export const TARA_DEFINITIONS: Record<number, TaraDefinition> = {
  1: {
    index: 1,
    name: "Janma Tara",
    nameHi: "जन्म तारा",
    sanskrit: "जन्म",
    nature: "madhyam",
    natureLabel: "Mixed / Caution",
    natureLabelHi: "मध्यम / सतर्कता",
    significance: "Represents bodily health and self. Ordinary for routine work; avoid major surgery, high-risk travel, or marriage.",
    significanceHi: "शारीरिक स्वास्थ्य व चेतना का कारक। नित्य कार्यों हेतु सामान्य; परंतु विवाह, बड़ी यात्रा व शल्य चिकित्सा में सावधानी बरतें।",
    remedy: "Donate yellow vegetables or grains; chant Gayatri Mantra.",
    remedyHi: "पीले धान्य का दान करें अथवा गायत्री मंत्र का जप करें।",
  },
  2: {
    index: 2,
    name: "Sampat Tara",
    nameHi: "सम्पत तारा",
    sanskrit: "सम्पत्",
    nature: "shubh",
    natureLabel: "Highly Auspicious",
    natureLabelHi: "अति शुभ",
    significance: "Bestows wealth, luxury, financial prosperity, and successful business investments. Excellent for commercial deals.",
    significanceHi: "धन-धान्य, व्यापारिक लाभ एवं समृद्धि प्रदायक। नवीन निवेश, खरीदारी एवं वित्तीय समझौतों हेतु श्रेष्ठ।",
    remedy: "No remedy needed; auspicious day.",
    remedyHi: "उपाय की आवश्यकता नहीं; अत्यंत शुभ तारा।",
  },
  3: {
    index: 3,
    name: "Vipat Tara",
    nameHi: "विपत तारा",
    sanskrit: "विपत्",
    nature: "ashubh",
    natureLabel: "Inauspicious / Loss",
    natureLabelHi: "अशुभ / हानि",
    significance: "Indicates unforeseen hazards, monetary loss, disagreements, or accidents. Postpone crucial legal, financial, or travel decisions.",
    significanceHi: "अचानक संकट, धन हानि व विवाद की आशंका। महत्वपूर्ण समझौतों, यात्रा व वाद-विवाद से दूर रहें।",
    remedy: "Donate pure jaggery (Gud) to a cow or underprivileged person.",
    remedyHi: "गाय को गुड़ खिलाएं अथवा गुड़ का दान करें।",
  },
  4: {
    index: 4,
    name: "Kshema Tara",
    nameHi: "क्षेम तारा",
    sanskrit: "क्षेम",
    nature: "shubh",
    natureLabel: "Auspicious / Security",
    natureLabelHi: "शुभ / कल्याण",
    significance: "Ensures well-being, peace of mind, protection, and successful reconciliation. Ideal for domestic harmony and starting medical treatments.",
    significanceHi: "कल्याण, मानसिक शांति, पारिवारिक सुख व सुरक्षा की प्रतीक। स्वास्थ्य लाभ व गृह शांति हेतु उत्तम।",
    remedy: "No remedy needed; auspicious day.",
    remedyHi: "उपाय की आवश्यकता नहीं; शुभ दिन।",
  },
  5: {
    index: 5,
    name: "Pratyak Tara",
    nameHi: "प्रत्यक तारा",
    sanskrit: "प्रत्यक्",
    nature: "ashubh",
    natureLabel: "Obstacles / Opposition",
    natureLabelHi: "अशुभ / प्रत्यवाय",
    significance: "Creates resistance, hidden rivals, backbiting, and unexpected delays. Maintain calm and refrain from arguments.",
    significanceHi: "कार्यों में व्यवधान, विरोधियों की सक्रियता व व्यर्थ तनाव। संयम बनाए रखें तथा विवाद टालें।",
    remedy: "Donate rock salt (Sendha Namak) or light a ghee lamp before Lord Shiva.",
    remedyHi: "सेंधा नमक का दान करें अथवा शिवजी के समक्ष घी का दीपक जलाएं।",
  },
  6: {
    index: 6,
    name: "Sadhana Tara",
    nameHi: "साधना तारा",
    sanskrit: "साधना",
    nature: "shubh",
    natureLabel: "Supreme Achievement",
    natureLabelHi: "सिद्धिदायक / अति शुभ",
    significance: "Brings accomplishment of goals, spiritual siddhi, examinations success, and material fulfillment. Highly favored for ambitious deeds.",
    significanceHi: "मनोरथ सिद्धि, परीक्षा-प्रतियोगिता में सफलता एवं आध्यात्मिक साधना हेतु परम सिद्धिदायक तारा।",
    remedy: "No remedy needed; auspicious day.",
    remedyHi: "उपाय की आवश्यकता नहीं; परम सिद्ध तारा।",
  },
  7: {
    index: 7,
    name: "Naidhana Tara (Vadha)",
    nameHi: "निधन तारा (वध)",
    sanskrit: "निधन / वध",
    nature: "ashubh",
    natureLabel: "Most Inauspicious",
    natureLabelHi: "वर्जित / त्याज्य",
    significance: "Classical texts strictly prohibit initiating new enterprises, wedding rites, or long journeys. Focus on quiet contemplation and prayer.",
    significanceHi: "शास्त्रों में इसे सर्वाधिक त्याज्य माना गया है। नए कार्य, शिलान्यास अथवा यात्रा पूर्णतः वर्जित हैं।",
    remedy: "Donate black sesame seeds (Til) or offer milk/water to a Peepal tree with Maha Mrityunjaya mantra.",
    remedyHi: "काले तिल का दान करें तथा महामृत्युंजय मंत्र का १०८ बार जप करें।",
  },
  8: {
    index: 8,
    name: "Mitra Tara",
    nameHi: "मित्र तारा",
    sanskrit: "मित्र",
    nature: "shubh",
    natureLabel: "Friendly & Beneficial",
    natureLabelHi: "मित्रवत / शुभ",
    significance: "Fosters cordial relationships, helpful alliances, pleasant travels, and joyous conversations. Great for networking and contracts.",
    significanceHi: "सद्भाव, मित्रता, सामाजिक सहयोग एवं सुखद यात्रा की द्योतक। नवीन संबंधों के निर्माण हेतु उत्तम।",
    remedy: "No remedy needed; auspicious day.",
    remedyHi: "उपाय की आवश्यकता नहीं; शुभ दिन।",
  },
  9: {
    index: 9,
    name: "Parama Mitra Tara",
    nameHi: "परम मित्र तारा",
    sanskrit: "परम मित्र",
    nature: "shubh",
    natureLabel: "Supreme Auspiciousness",
    natureLabelHi: "परम कल्याणकारी / श्रेष्ठ",
    significance: "The highest grade of friendship and divine grace. Guarantees smooth victory, mutual respect, and prosperity in all auspicious beginnings.",
    significanceHi: "सर्वोत्तम मित्र तारा। सर्वकार्य सिद्धि, आदर-सम्मान एवं महान अभ्युदय प्रदान करने वाला काल।",
    remedy: "No remedy needed; supremely auspicious day.",
    remedyHi: "उपाय की आवश्यकता नहीं; सर्वश्रेष्ठ तारा।",
  },
};

export interface TarabalamResult {
  janmaNakshatraIndex: number;
  janmaNakshatraName: string;
  janmaNakshatraNameHi: string;
  transitNakshatraIndex: number;
  transitNakshatraName: string;
  transitNakshatraNameHi: string;
  diffCount: number; // 1 to 27
  paryaya: 1 | 2 | 3;
  paryayaName: string;
  paryayaNameHi: string;
  taraNumber: number; // 1 to 9
  tara: TaraDefinition;
  isFavorable: boolean;
}

export interface ChandrabalamResult {
  janmaRashiIndex: number;
  janmaRashiName: string;
  janmaRashiNameHi: string;
  transitRashiIndex: number;
  transitRashiName: string;
  transitRashiNameHi: string;
  houseFromMoon: number; // 1 to 12
  isFavorable: boolean;
  isAshtamaChandra: boolean;
  verdictTitle: string;
  verdictTitleHi: string;
  description: string;
  descriptionHi: string;
}

export interface DailyBalamReport {
  asOfDate: string;
  cityName: string;
  tarabalam: TarabalamResult;
  chandrabalam: ChandrabalamResult;
  overallScore: "uttama" | "madhyama" | "ashubha";
  overallScoreLabel: string;
  overallScoreLabelHi: string;
  overallAdvice: string;
  overallAdviceHi: string;
  nakshatraTable: {
    nakshatraIndex: number;
    nakshatraName: string;
    nakshatraNameHi: string;
    taraNumber: number;
    taraName: string;
    taraNameHi: string;
    nature: "shubh" | "madhyam" | "ashubh";
    isCurrent: boolean;
  }[];
}

/**
 * Calculates Tarabalam (Tara Chakra) between natal birth star and transiting star.
 */
export function calculateTarabalam(
  janmaNakshatraIndex: number,
  transitNakshatraIndex: number
): TarabalamResult {
  const diffCount = ((transitNakshatraIndex - janmaNakshatraIndex + 27) % 27) + 1;
  const paryaya = diffCount <= 9 ? 1 : diffCount <= 18 ? 2 : 3;
  const paryayaName =
    paryaya === 1
      ? "Prathama Paryaya (Affects Body/Self)"
      : paryaya === 2
      ? "Dvitiya Paryaya (Affects Mind/Wealth)"
      : "Tritiya Paryaya (Affects Destiny/Karma)";
  const paryayaNameHi =
    paryaya === 1
      ? "प्रथम पर्याय (शरीर व स्वास्थ्य पर प्रभाव)"
      : paryaya === 2
      ? "द्वितीय पर्याय (मन व संपत्ति पर प्रभाव)"
      : "तृतीय पर्याय (भाग्य व कर्म पर प्रभाव)";

  const taraNumber = ((diffCount - 1) % 9) + 1;
  const tara = TARA_DEFINITIONS[taraNumber];
  const isFavorable = tara.nature === "shubh";

  return {
    janmaNakshatraIndex,
    janmaNakshatraName: NAKSHATRA_NAMES[janmaNakshatraIndex],
    janmaNakshatraNameHi: NAKSHATRA_NAMES_HI[janmaNakshatraIndex],
    transitNakshatraIndex,
    transitNakshatraName: NAKSHATRA_NAMES[transitNakshatraIndex],
    transitNakshatraNameHi: NAKSHATRA_NAMES_HI[transitNakshatraIndex],
    diffCount,
    paryaya,
    paryayaName,
    paryayaNameHi,
    taraNumber,
    tara,
    isFavorable,
  };
}

/**
 * Calculates Chandrabalam (Moon Strength) between natal Moon sign and transiting Moon sign.
 */
export function calculateChandrabalam(
  janmaRashiIndex: number,
  transitRashiIndex: number
): ChandrabalamResult {
  const houseFromMoon = ((transitRashiIndex - janmaRashiIndex + 12) % 12) + 1;
  const favorableHouses = [1, 3, 6, 7, 10, 11];
  const isFavorable = favorableHouses.includes(houseFromMoon);
  const isAshtamaChandra = houseFromMoon === 8;

  let verdictTitle = "Auspicious Chandrabalam (Shubh)";
  let verdictTitleHi = "शुभ चंद्रबलम्";
  let description = `Moon transiting house ${houseFromMoon} from natal Moon: Auspicious mental clarity, good vitality, and favorable outcomes.`;
  let descriptionHi = `चंद्रमा आपकी जन्म राशि से ${houseFromMoon}वें भाव में गोचर कर रहे हैं: मानसिक प्रसन्नता, स्फूर्ति एवं कार्यों में अनुकूलता प्राप्त होगी।`;

  if (isAshtamaChandra) {
    verdictTitle = "Ashtama Chandra Dosha (Inauspicious)";
    verdictTitleHi = "अष्टम चंद्र दोष (अशुभ)";
    description = "Moon transiting 8th house from natal Moon: Classic Ashtama Chandra. Avoid major financial deals, long journeys, or confrontational talks.";
    descriptionHi = "चंद्रमा जन्म राशि से आठवें भाव में हैं। यह अष्टम चंद्र दोष कहलाता है। नए कार्य, बड़ी यात्रा, निवेश एवं वाद-विवाद से बचें।";
  } else if (!isFavorable) {
    verdictTitle = "Ordinary / Neutral Chandrabalam";
    verdictTitleHi = "सामान्य चंद्रबलम्";
    description = `Moon transiting house ${houseFromMoon} from natal Moon: Moderate mental focus; patience advised.`;
    descriptionHi = `चंद्रमा आपकी जन्म राशि से ${houseFromMoon}वें भाव में हैं: सामान्य फल; धैर्य व शांति से कार्य करें।`;
  }

  return {
    janmaRashiIndex,
    janmaRashiName: RASI_NAMES[janmaRashiIndex],
    janmaRashiNameHi: RASI_NAMES_HI[janmaRashiIndex],
    transitRashiIndex,
    transitRashiName: RASI_NAMES[transitRashiIndex],
    transitRashiNameHi: RASI_NAMES_HI[transitRashiIndex],
    houseFromMoon,
    isFavorable,
    isAshtamaChandra,
    verdictTitle,
    verdictTitleHi,
    description,
    descriptionHi,
  };
}

/**
 * Calculates complete Daily Tarabalam & Chandrabalam report for a specific city and date.
 */
export function calculateDailyBalam(
  janmaNakshatraIndex: number,
  janmaRashiIndex: number,
  targetDate = new Date(),
  cityConfig?: CityConfig
): DailyBalamReport {
  const city = cityConfig || DEFAULT_CITY;
  const panchang = getPanchang(targetDate, city);

  const transitNakshatraIndex = panchang.nakshatra.index; // 0 to 26
  const transitMoonRasi = moonRasi(targetDate);
  const transitRashiIndex = transitMoonRasi.index; // 0 to 11

  const tarabalam = calculateTarabalam(janmaNakshatraIndex, transitNakshatraIndex);
  const chandrabalam = calculateChandrabalam(janmaRashiIndex, transitRashiIndex);

  let overallScore: DailyBalamReport["overallScore"] = "madhyama";
  let overallScoreLabel = "Moderate Day (Madhyama Balam)";
  let overallScoreLabelHi = "मध्यम बल (सामान्य दिन)";
  let overallAdvice =
    "One factor is favorable while another requires attention. Favorable for routine and moderate tasks; take precautions for high-stakes undertakings.";
  let overallAdviceHi =
    "ताराबल अथवा चंद्रबल में से एक अनुकूल है। नित्य एवं सामान्य कार्यों हेतु ठीक है; बड़े निर्णयों में सावधानी बरतें।";

  if (tarabalam.isFavorable && chandrabalam.isFavorable) {
    overallScore = "uttama";
    overallScoreLabel = "Highly Auspicious Day (Uttama Balam)";
    overallScoreLabelHi = "अति शुभ दिन (उत्तम बल)";
    overallAdvice =
      "Both Tarabala and Chandrabala are favorable! Excellent cosmic alignment for new ventures, celebrations, business deals, and journeys.";
    overallAdviceHi =
      "ताराबलम् एवं चंद्रबलम् दोनों अनुकूल हैं! नवीन कार्य आरम्भ, व्यापार, यात्रा एवं शुभ मांगलिक कार्यों हेतु सर्वश्रेष्ठ दिन।";
  } else if (!tarabalam.isFavorable && chandrabalam.isAshtamaChandra) {
    overallScore = "ashubha";
    overallScoreLabel = "Inauspicious Day (Ashubha Balam)";
    overallScoreLabelHi = "अशुभ दिन (त्याज्य बल)";
    overallAdvice =
      "Both Tarabala and Chandrabala are challenging today. Avoid initiating critical new projects, large financial investments, or stressful meetings.";
    overallAdviceHi =
      "ताराबल व चंद्रबल दोनों प्रतिकूल हैं। नवीन अनुबंध, भारी निवेश अथवा महत्वपूर्ण कार्यों को स्थगित करना शास्त्रसम्मत है।";
  }

  // Generate 27-Nakshatra Table relative to user's birth star
  const nakshatraTable = NAKSHATRA_NAMES.map((name, idx) => {
    const diff = ((idx - janmaNakshatraIndex + 27) % 27) + 1;
    const tNum = ((diff - 1) % 9) + 1;
    const tDef = TARA_DEFINITIONS[tNum];

    return {
      nakshatraIndex: idx,
      nakshatraName: name,
      nakshatraNameHi: NAKSHATRA_NAMES_HI[idx],
      taraNumber: tNum,
      taraName: tDef.name,
      taraNameHi: tDef.nameHi,
      nature: tDef.nature,
      isCurrent: idx === transitNakshatraIndex,
    };
  });

  const asOfStr = targetDate.toISOString().split("T")[0];

  return {
    asOfDate: asOfStr,
    cityName: city.name,
    tarabalam,
    chandrabalam,
    overallScore,
    overallScoreLabel,
    overallScoreLabelHi,
    overallAdvice,
    overallAdviceHi,
    nakshatraTable,
  };
}
