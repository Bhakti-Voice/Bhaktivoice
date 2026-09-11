export type GowriType = "Amrutha" | "Shubha" | "Labha" | "Dhana" | "Uthi" | "Roga" | "Visha" | "Sora";

export type GowriPeriod = {
  name: GowriType;
  nameHi: string;
  nameTa: string;
  nature: "shubh" | "madhyam" | "ashubh";
  natureHi: string;
  start: Date;
  end: Date;
  significanceEn: string;
  significanceHi: string;
};

export const GOWRI_METADATA: Record<
  GowriType,
  {
    nameHi: string;
    nameTa: string;
    nature: "shubh" | "madhyam" | "ashubh";
    natureHi: string;
    significanceEn: string;
    significanceHi: string;
  }
> = {
  Amrutha: {
    nameHi: "अमृत",
    nameTa: "அமிர்தம்",
    nature: "shubh",
    natureHi: "परम शुभ",
    significanceEn: "Supreme nectar window. Best for all auspicious beginnings, ceremonies, and travel.",
    significanceHi: "अमृत तुल्य शुभ समय। सभी मांगलिक कार्य, पूजा व यात्रा हेतु सर्वश्रेष्ठ।",
  },
  Shubha: {
    nameHi: "शुभ",
    nameTa: "சுபம்",
    nature: "shubh",
    natureHi: "शुभ",
    significanceEn: "Highly favorable for marriage discussions, property purchases, and signing contracts.",
    significanceHi: "शुभ व कल्याणकारी। विवाह वार्ता, भूमि क्रय व नए अनुबंध हेतु उत्तम।",
  },
  Labha: {
    nameHi: "लाभ",
    nameTa: "லாபம்",
    nature: "shubh",
    natureHi: "लाभकारी",
    significanceEn: "Favorable for commerce, opening bank accounts, trading, and financial growth.",
    significanceHi: "व्यापारिक लाभ, धन निवेश व वित्तीय कार्यों हेतु फलदायी।",
  },
  Dhana: {
    nameHi: "धन",
    nameTa: "தனம்",
    nature: "shubh",
    natureHi: "शुभ (धन)",
    significanceEn: "Brings monetary prosperity, recovery of debts, and material prosperity.",
    significanceHi: "धन संपदा में वृद्धि, रुका धन वापस पाने व आभूषण खरीदने हेतु अनुकूल।",
  },
  Uthi: {
    nameHi: "उत्ति / उद्यम",
    nameTa: "உத்தி",
    nature: "madhyam",
    natureHi: "मध्यम",
    significanceEn: "Moderate influence. Suitable for routine daily chores and physical labor.",
    significanceHi: "मध्यम फल। दैनिक सामान्य कार्यों व परिश्रम हेतु उपयुक्त।",
  },
  Roga: {
    nameHi: "रोग",
    nameTa: "ரோகம்",
    nature: "ashubh",
    natureHi: "अशुभ (रोग)",
    significanceEn: "Causes health vulnerability and physical fatigue. Avoid initiating medical treatment.",
    significanceHi: "शारीरिक अस्वस्थता व कष्ट का भय। नए कार्य टालें।",
  },
  Visha: {
    nameHi: "विष",
    nameTa: "விஷம்",
    nature: "ashubh",
    natureHi: "अति अशुभ (विष)",
    significanceEn: "Toxic influence. Severe hazard of failure, accidents, and conflict. Cease all auspicious works.",
    significanceHi: "विष तुल्य घातक प्रभाव। वाद-विवाद, दुर्घटना व नुकसान की आशंका रहती है।",
  },
  Sora: {
    nameHi: "चोर / सोर",
    nameTa: "சோரம்",
    nature: "ashubh",
    natureHi: "अशुभ (चोर)",
    significanceEn: "Loss of wealth, deceit, and betrayal. Avoid travel and monetary loans.",
    significanceHi: "चोरी, कपट व धन हानि का भय। यात्रा व उधार लेन-देन से बचें।",
  },
};

// Classical Gowri sequence by weekday (0: Sunday ... 6: Saturday)
const GOWRI_DAY_ORDER: GowriType[][] = [
  ["Uthi", "Amrutha", "Roga", "Labha", "Shubha", "Visha", "Sora", "Dhana"],     // Sun
  ["Amrutha", "Roga", "Labha", "Shubha", "Visha", "Sora", "Dhana", "Uthi"],     // Mon
  ["Roga", "Labha", "Shubha", "Visha", "Sora", "Dhana", "Uthi", "Amrutha"],     // Tue
  ["Labha", "Shubha", "Visha", "Sora", "Dhana", "Uthi", "Amrutha", "Roga"],     // Wed
  ["Shubha", "Visha", "Sora", "Dhana", "Uthi", "Amrutha", "Roga", "Labha"],     // Thu
  ["Visha", "Sora", "Dhana", "Uthi", "Amrutha", "Roga", "Labha", "Shubha"],     // Fri
  ["Sora", "Dhana", "Uthi", "Amrutha", "Roga", "Labha", "Shubha", "Visha"],     // Sat
];

const GOWRI_NIGHT_ORDER: GowriType[][] = [
  ["Sora", "Dhana", "Uthi", "Amrutha", "Roga", "Labha", "Shubha", "Visha"],     // Sun
  ["Uthi", "Amrutha", "Roga", "Labha", "Shubha", "Visha", "Sora", "Dhana"],     // Mon
  ["Amrutha", "Roga", "Labha", "Shubha", "Visha", "Sora", "Dhana", "Uthi"],     // Tue
  ["Roga", "Labha", "Shubha", "Visha", "Sora", "Dhana", "Uthi", "Amrutha"],     // Wed
  ["Labha", "Shubha", "Visha", "Sora", "Dhana", "Uthi", "Amrutha", "Roga"],     // Thu
  ["Shubha", "Visha", "Sora", "Dhana", "Uthi", "Amrutha", "Roga", "Labha"],     // Fri
  ["Visha", "Sora", "Dhana", "Uthi", "Amrutha", "Roga", "Labha", "Shubha"],     // Sat
];

export function calculateGowriPanchangam(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  weekday: number,
): { day: GowriPeriod[]; night: GowriPeriod[] } {
  const daySlice = (sunset.getTime() - sunrise.getTime()) / 8;
  const nightSlice = (nextSunrise.getTime() - sunset.getTime()) / 8;

  const dayTypes = GOWRI_DAY_ORDER[weekday];
  const nightTypes = GOWRI_NIGHT_ORDER[weekday];

  const day: GowriPeriod[] = dayTypes.map((type, i) => {
    const meta = GOWRI_METADATA[type];
    return {
      name: type,
      nameHi: meta.nameHi,
      nameTa: meta.nameTa,
      nature: meta.nature,
      natureHi: meta.natureHi,
      start: new Date(sunrise.getTime() + i * daySlice),
      end: new Date(sunrise.getTime() + (i + 1) * daySlice),
      significanceEn: meta.significanceEn,
      significanceHi: meta.significanceHi,
    };
  });

  const night: GowriPeriod[] = nightTypes.map((type, i) => {
    const meta = GOWRI_METADATA[type];
    return {
      name: type,
      nameHi: meta.nameHi,
      nameTa: meta.nameTa,
      nature: meta.nature,
      natureHi: meta.natureHi,
      start: new Date(sunset.getTime() + i * nightSlice),
      end: new Date(sunset.getTime() + (i + 1) * nightSlice),
      significanceEn: meta.significanceEn,
      significanceHi: meta.significanceHi,
    };
  });

  return { day, night };
}
