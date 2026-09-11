export type PlanetRuler = "Sun" | "Venus" | "Mercury" | "Moon" | "Saturn" | "Jupiter" | "Mars";

export type HoraPeriod = {
  index: number; // 1 to 12
  isDay: boolean;
  ruler: PlanetRuler;
  rulerHi: string;
  start: Date;
  end: Date;
  nature: "shubh" | "madhyam" | "ashubh";
  natureHi: string;
  bestTasksEn: string[];
  bestTasksHi: string[];
  avoidTasksEn: string[];
  avoidTasksHi: string[];
};

export type DayHoraSchedule = {
  dayHoras: HoraPeriod[];
  nightHoras: HoraPeriod[];
  currentHora: HoraPeriod | null;
};

// Chaldean descending planetary sequence for consecutive Horas:
// Sun -> Venus -> Mercury -> Moon -> Saturn -> Jupiter -> Mars -> Sun...
const HORA_ORDER: PlanetRuler[] = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"];

// 1st Hora of each weekday (0: Sun ... 6: Sat)
const WEEKDAY_FIRST_HORA: PlanetRuler[] = [
  "Sun",      // 0: Sunday
  "Moon",     // 1: Monday
  "Mars",     // 2: Tuesday
  "Mercury",  // 3: Wednesday
  "Jupiter",  // 4: Thursday
  "Venus",    // 5: Friday
  "Saturn",   // 6: Saturday
];

export const HORA_METADATA: Record<
  PlanetRuler,
  {
    nameHi: string;
    nature: "shubh" | "madhyam" | "ashubh";
    natureHi: string;
    bestTasksEn: string[];
    bestTasksHi: string[];
    avoidTasksEn: string[];
    avoidTasksHi: string[];
  }
> = {
  Sun: {
    nameHi: "सूर्य",
    nature: "madhyam",
    natureHi: "मध्यम / तेज",
    bestTasksEn: ["Government filings & VIP meetings", "Taking charge of executive roles", "Surya Arghya & Gayatri chanting", "Purchasing copper or gold"],
    bestTasksHi: ["सरकारी कार्य व अधिकारियों से भेंट", "प्रशासनिक पदभार ग्रहण करना", "सूर्य अर्घ्य व गायत्री जप", "तांबा या सोना क्रय करना"],
    avoidTasksEn: ["Marriage ceremonies", "Starting romantic ventures"],
    avoidTasksHi: ["विवाह वार्ता", "शांति व सुलह के कार्य"],
  },
  Venus: {
    nameHi: "शुक्र",
    nature: "shubh",
    natureHi: "अति शुभ",
    bestTasksEn: ["Buying gold, jewelry & designer clothes", "Marriage talks, engagements & dates", "Artistic, musical & cinema ventures", "Vehicle delivery & luxury shopping"],
    bestTasksHi: ["आभूषण व नए वस्त्र खरीदना", "विवाह सगाई व प्रेम संबंध", "संगीत, कला व अभिनय का प्रारंभ", "वाहन डिलीवरी व विलासिता क्रय"],
    avoidTasksEn: ["Court litigations", "Hostile confrontations"],
    avoidTasksHi: ["कोर्ट-कचहरी के विवाद", "शत्रुतापूर्ण वार्ता"],
  },
  Mercury: {
    nameHi: "बुध",
    nature: "shubh",
    natureHi: "शुभ",
    bestTasksEn: ["Signing contracts & business deals", "Stock trading & financial bookkeeping", "Starting academic study or writing books", "Marketing & publishing campaigns"],
    bestTasksHi: ["व्यापारिक समझौते व अनुबंध हस्ताक्षर", "शेयर बाजार, बहीखाता व बैंकिंग", "अध्ययन, लेखन व नई विद्या का आरंभ", "विज्ञापन व प्रचार प्रसार"],
    avoidTasksEn: ["Aggressive legal conflicts"],
    avoidTasksHi: ["उग्र व कठोर निर्णय"],
  },
  Moon: {
    nameHi: "चन्द्र",
    nature: "shubh",
    natureHi: "शुभ",
    bestTasksEn: ["Water, dairy & FMCG ventures", "Beginning travel & relocation", "Public service & motherly care", "Silver purchase & emotional bonding"],
    bestTasksHi: ["जल, डेयरी व खाद्य व्यवसाय", "शुभ यात्रा व गृह परिवर्तन", "जनसेवा व पारिवारिक संवाद", "चांदी खरीदना व ध्यान"],
    avoidTasksEn: ["Lending large sums of money"],
    avoidTasksHi: ["बड़ा कर्ज देना या जोखिम भरा सट्टा"],
  },
  Saturn: {
    nameHi: "शनि",
    nature: "ashubh",
    natureHi: "कठोर / अशुभ",
    bestTasksEn: ["Real estate, land digging & foundation", "Purchasing iron, machinery & fuel", "Legal documentation & debt settlement", "Submitting taxes & labor negotiations"],
    bestTasksHi: ["भूमि खुदाई, नींव खनन व संपत्ति", "लोहा, मशीनरी, तेल व वाहन सर्विस", "पुराना कर्ज चुकाना व टैक्स फाइलिंग", "श्रमिकों से संबंधित कार्य"],
    avoidTasksEn: ["Weddings & festive celebrations", "New business inaugurations"],
    avoidTasksHi: ["विवाह व शुभ मांगलिक उत्सव", "नवीन व्यापार का उद्घाटन"],
  },
  Jupiter: {
    nameHi: "गुरु (बृहस्पति)",
    nature: "shubh",
    natureHi: "परम शुभ",
    bestTasksEn: ["Spiritual ceremonies, Puja & Hawan", "Meeting teachers, mentors & spiritual gurus", "High-value financial investments & bank accounts", "Admissions & legal registrations"],
    bestTasksHi: ["यज्ञ, अनुष्ठान व धार्मिक कार्य", "गुरु व विद्वानों से भेंट व आशीर्वाद", "बड़ा धन निवेश व बैंक खाता खोलना", "विश्वविद्यालय प्रवेश व रजिस्ट्री"],
    avoidTasksEn: ["Gambling or dubious activities"],
    avoidTasksHi: ["अनैतिक व कपटपूर्ण कार्य"],
  },
  Mars: {
    nameHi: "मंगल",
    nature: "ashubh",
    natureHi: "उग्र / मध्यम",
    bestTasksEn: ["Surgical procedures & medical operations", "Sports competitions & physical training", "Land acquisition & engineering tests", "Debates & tackling adversaries"],
    bestTasksHi: ["शल्य चिकित्सा (ऑपरेशन) व दवा आरंभ", "खेलकूद, व्यायाम व सैन्य अभ्यास", "भूमि व अचल संपत्ति की पैमाइश", "वाद-विवाद व शत्रुओं पर विजय"],
    avoidTasksEn: ["Peace settlements & marriage negotiations", "Traveling long distances"],
    avoidTasksHi: ["शांति समझौता व विवाह वार्ता", "शुभ धार्मिक यात्रा"],
  },
};

/**
 * Calculates 24 Planetary Horas for a given day and night.
 */
export function calculateHoras(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  weekday: number,
  currentTime: Date = new Date(),
): DayHoraSchedule {
  const daySlice = (sunset.getTime() - sunrise.getTime()) / 12;
  const nightSlice = (nextSunrise.getTime() - sunset.getTime()) / 12;

  const firstRuler = WEEKDAY_FIRST_HORA[weekday];
  let currentRulerIdx = HORA_ORDER.indexOf(firstRuler);

  const dayHoras: HoraPeriod[] = [];
  for (let i = 0; i < 12; i++) {
    const ruler = HORA_ORDER[currentRulerIdx % 7];
    const meta = HORA_METADATA[ruler];
    const start = new Date(sunrise.getTime() + i * daySlice);
    const end = new Date(sunrise.getTime() + (i + 1) * daySlice);

    dayHoras.push({
      index: i + 1,
      isDay: true,
      ruler,
      rulerHi: meta.nameHi,
      start,
      end,
      nature: meta.nature,
      natureHi: meta.natureHi,
      bestTasksEn: meta.bestTasksEn,
      bestTasksHi: meta.bestTasksHi,
      avoidTasksEn: meta.avoidTasksEn,
      avoidTasksHi: meta.avoidTasksHi,
    });

    currentRulerIdx++;
  }

  const nightHoras: HoraPeriod[] = [];
  for (let i = 0; i < 12; i++) {
    const ruler = HORA_ORDER[currentRulerIdx % 7];
    const meta = HORA_METADATA[ruler];
    const start = new Date(sunset.getTime() + i * nightSlice);
    const end = new Date(sunset.getTime() + (i + 1) * nightSlice);

    nightHoras.push({
      index: i + 1,
      isDay: false,
      ruler,
      rulerHi: meta.nameHi,
      start,
      end,
      nature: meta.nature,
      natureHi: meta.natureHi,
      bestTasksEn: meta.bestTasksEn,
      bestTasksHi: meta.bestTasksHi,
      avoidTasksEn: meta.avoidTasksEn,
      avoidTasksHi: meta.avoidTasksHi,
    });

    currentRulerIdx++;
  }

  const allHoras = [...dayHoras, ...nightHoras];
  const nowMs = currentTime.getTime();
  const currentHora = allHoras.find((h) => nowMs >= h.start.getTime() && nowMs < h.end.getTime()) || null;

  return { dayHoras, nightHoras, currentHora };
}
