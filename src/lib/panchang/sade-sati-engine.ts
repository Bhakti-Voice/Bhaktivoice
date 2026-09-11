import {
  RASI_NAMES,
  RASI_NAMES_HI,
} from "./names";

export type SadeSatiPhase = "rising" | "peak" | "setting";
export type DhaiyaType = "kantaka" | "ashtama";

export interface TransitPeriod {
  rashiIndex: number;
  rashiName: string;
  rashiNameHi: string;
  startDate: string;
  endDate: string;
  type: "sade_sati_rising" | "sade_sati_peak" | "sade_sati_setting" | "dhaiya_kantaka" | "dhaiya_ashtama";
  label: string;
  labelHi: string;
  isCurrent: boolean;
}

export interface SadeSatiCycle {
  cycleNumber: number;
  overallStartDate: string;
  overallEndDate: string;
  phases: TransitPeriod[];
  isCurrent: boolean;
}

export interface SadeSatiReport {
  moonRashiIndex: number;
  moonRashiName: string;
  moonRashiNameHi: string;
  asOfDate: string;
  currentSaturnRashiIndex: number;
  currentSaturnRashiName: string;
  currentSaturnRashiNameHi: string;
  
  // Status
  isInSadeSati: boolean;
  currentSadeSatiPhase: SadeSatiPhase | null;
  isInDhaiya: boolean;
  currentDhaiyaType: DhaiyaType | null;
  statusSummary: string;
  statusSummaryHi: string;

  // Sign temperament with Saturn
  temperament: "favorable" | "moderate" | "challenging";
  temperamentTitle: string;
  temperamentTitleHi: string;
  temperamentExplanation: string;
  temperamentExplanationHi: string;

  // Cycles & Timelines
  allSadeSatiCycles: SadeSatiCycle[];
  allDhaiyaPeriods: TransitPeriod[];
  currentPeriodDetails: TransitPeriod | null;
  nextPeriodDetails: TransitPeriod | null;

  // Classical Vedic Remedies
  remedies: {
    title: string;
    titleHi: string;
    description: string;
    descriptionHi: string;
    mantra?: string;
  }[];
}

/**
 * Astronomical Saturn (Shani) Ingress & Retrograde Table (1960–2065)
 * Calculated via Lahiri (Chitrapaksha) sidereal longitude at day-level resolution.
 */
export const SATURN_TRANSIT_INTERVALS: { rashi: number; date: string }[] = [
  { rashi: 8, date: "1960-01-01" },
  { rashi: 9, date: "1961-02-02" },
  { rashi: 8, date: "1961-09-18" },
  { rashi: 9, date: "1961-10-09" },
  { rashi: 10, date: "1964-01-28" },
  { rashi: 11, date: "1966-04-10" },
  { rashi: 10, date: "1966-11-04" },
  { rashi: 11, date: "1966-12-20" },
  { rashi: 0, date: "1968-06-18" },
  { rashi: 11, date: "1968-09-29" },
  { rashi: 0, date: "1969-03-08" },
  { rashi: 1, date: "1971-04-29" },
  { rashi: 2, date: "1973-06-11" },
  { rashi: 3, date: "1975-07-24" },
  { rashi: 4, date: "1977-09-08" },
  { rashi: 5, date: "1979-11-04" },
  { rashi: 4, date: "1980-03-15" },
  { rashi: 5, date: "1980-07-28" },
  { rashi: 6, date: "1982-10-07" },
  { rashi: 7, date: "1984-12-22" },
  { rashi: 6, date: "1985-06-01" },
  { rashi: 7, date: "1985-09-18" },
  { rashi: 8, date: "1987-12-17" },
  { rashi: 9, date: "1990-03-21" },
  { rashi: 8, date: "1990-06-21" },
  { rashi: 9, date: "1990-12-15" },
  { rashi: 10, date: "1993-03-06" },
  { rashi: 9, date: "1993-10-16" },
  { rashi: 10, date: "1993-11-10" },
  { rashi: 11, date: "1995-06-03" },
  { rashi: 10, date: "1995-08-10" },
  { rashi: 11, date: "1996-02-17" },
  { rashi: 0, date: "1998-04-18" },
  { rashi: 1, date: "2000-06-07" },
  { rashi: 2, date: "2002-07-24" },
  { rashi: 1, date: "2003-01-09" },
  { rashi: 2, date: "2003-04-08" },
  { rashi: 3, date: "2004-09-06" },
  { rashi: 2, date: "2005-01-14" },
  { rashi: 3, date: "2005-05-27" },
  { rashi: 4, date: "2006-11-02" },
  { rashi: 3, date: "2007-01-11" },
  { rashi: 4, date: "2007-07-16" },
  { rashi: 5, date: "2009-09-10" },
  { rashi: 6, date: "2011-11-16" },
  { rashi: 5, date: "2012-05-17" },
  { rashi: 6, date: "2012-08-05" },
  { rashi: 7, date: "2014-11-03" },
  { rashi: 8, date: "2017-01-27" },
  { rashi: 7, date: "2017-06-21" },
  { rashi: 8, date: "2017-10-27" },
  { rashi: 9, date: "2020-01-25" },
  { rashi: 10, date: "2022-04-30" },
  { rashi: 9, date: "2022-07-13" },
  { rashi: 10, date: "2023-01-18" },
  { rashi: 11, date: "2025-03-30" },
  { rashi: 0, date: "2027-06-03" },
  { rashi: 11, date: "2027-10-21" },
  { rashi: 0, date: "2028-02-24" },
  { rashi: 1, date: "2029-08-09" },
  { rashi: 0, date: "2029-10-06" },
  { rashi: 1, date: "2030-04-18" },
  { rashi: 2, date: "2032-05-31" },
  { rashi: 3, date: "2034-07-13" },
  { rashi: 4, date: "2036-08-28" },
  { rashi: 5, date: "2038-10-23" },
  { rashi: 4, date: "2039-04-06" },
  { rashi: 5, date: "2039-07-13" },
  { rashi: 6, date: "2041-01-29" },
  { rashi: 5, date: "2041-02-07" },
  { rashi: 6, date: "2041-09-27" },
  { rashi: 7, date: "2043-12-12" },
  { rashi: 6, date: "2044-06-24" },
  { rashi: 7, date: "2044-08-31" },
  { rashi: 8, date: "2046-12-08" },
  { rashi: 9, date: "2049-03-07" },
  { rashi: 8, date: "2049-07-10" },
  { rashi: 9, date: "2049-12-05" },
  { rashi: 10, date: "2052-02-25" },
  { rashi: 11, date: "2054-05-15" },
  { rashi: 10, date: "2054-09-02" },
  { rashi: 11, date: "2055-02-06" },
  { rashi: 0, date: "2057-04-08" },
  { rashi: 1, date: "2059-05-28" },
  { rashi: 2, date: "2061-07-11" },
  { rashi: 1, date: "2062-02-14" },
  { rashi: 2, date: "2062-03-07" },
  { rashi: 3, date: "2063-08-25" },
  { rashi: 2, date: "2064-02-06" },
  { rashi: 3, date: "2064-05-10" },
];

/**
 * Returns the sidereal Rashi index (0–11) of Saturn for any given date string or Date object.
 */
export function getSaturnRashiAtDate(date: Date | string): number {
  const dateStr = typeof date === "string" ? date.split("T")[0] : date.toISOString().split("T")[0];
  
  // Find largest interval start <= dateStr
  for (let i = SATURN_TRANSIT_INTERVALS.length - 1; i >= 0; i--) {
    if (SATURN_TRANSIT_INTERVALS[i].date <= dateStr) {
      return SATURN_TRANSIT_INTERVALS[i].rashi;
    }
  }
  return SATURN_TRANSIT_INTERVALS[0].rashi;
}

/**
 * Calculates a complete Sade Sati & Dhaiya analysis report for any Moon Sign (0 = Mesha to 11 = Meena).
 */
export function calculateSadeSatiReport(moonRashiIndex: number, asOfDateInput?: Date | string): SadeSatiReport {
  const asOf = asOfDateInput instanceof Date
    ? asOfDateInput
    : asOfDateInput
    ? new Date(asOfDateInput)
    : new Date();

  const asOfStr = asOf.toISOString().split("T")[0];
  const currentSaturnRashi = getSaturnRashiAtDate(asOf);

  const rashi12th = (moonRashiIndex + 11) % 12; // 1st Phase (Rising)
  const rashi1st = moonRashiIndex;              // 2nd Phase (Peak)
  const rashi2nd = (moonRashiIndex + 1) % 12;   // 3rd Phase (Setting)
  const rashi4th = (moonRashiIndex + 3) % 12;   // Kantaka Dhaiya
  const rashi8th = (moonRashiIndex + 7) % 12;   // Ashtama Dhaiya

  let isInSadeSati = false;
  let currentSadeSatiPhase: SadeSatiPhase | null = null;
  let isInDhaiya = false;
  let currentDhaiyaType: DhaiyaType | null = null;

  if (currentSaturnRashi === rashi12th) {
    isInSadeSati = true;
    currentSadeSatiPhase = "rising";
  } else if (currentSaturnRashi === rashi1st) {
    isInSadeSati = true;
    currentSadeSatiPhase = "peak";
  } else if (currentSaturnRashi === rashi2nd) {
    isInSadeSati = true;
    currentSadeSatiPhase = "setting";
  } else if (currentSaturnRashi === rashi4th) {
    isInDhaiya = true;
    currentDhaiyaType = "kantaka";
  } else if (currentSaturnRashi === rashi8th) {
    isInDhaiya = true;
    currentDhaiyaType = "ashtama";
  }

  // Summary labels
  let statusSummary = "Currently FREE from Shani Sade Sati and Dhaiya.";
  let statusSummaryHi = "वर्तमान में शनि की साढ़े साती अथवा ढैय्या का कोई प्रभाव नहीं है।";

  if (isInSadeSati) {
    if (currentSadeSatiPhase === "rising") {
      statusSummary = "Undergoing Shani Sade Sati — 1st Phase (Rising / Aardh Charan).";
      statusSummaryHi = "शनि की साढ़े साती का प्रथम चरण (उदय / आद्य चरण) चल रहा है।";
    } else if (currentSadeSatiPhase === "peak") {
      statusSummary = "Undergoing Shani Sade Sati — 2nd Phase (Peak / Madhya Charan in Janma Rashi).";
      statusSummaryHi = "शनि की साढ़े साती का द्वितीय चरण (मध्य / शिखर चरण — जन्म राशि) चल रहा है।";
    } else {
      statusSummary = "Undergoing Shani Sade Sati — 3rd Phase (Setting / Antya Charan).";
      statusSummaryHi = "शनि की साढ़े साती का तृतीय चरण (अस्त / अंत्य चरण) चल रहा है।";
    }
  } else if (isInDhaiya) {
    if (currentDhaiyaType === "kantaka") {
      statusSummary = "Undergoing Shani Kantaka Dhaiya (Small Panoti — 4th House Transit).";
      statusSummaryHi = "शनि की चतुर्थ ढैय्या (कंटक शनि — ४था भाव) चल रही है।";
    } else {
      statusSummary = "Undergoing Shani Ashtama Dhaiya (Small Panoti — 8th House Transit).";
      statusSummaryHi = "शनि की अष्टम ढैय्या (अष्टम शनि — ८वाँ भाव) चल रही है।";
    }
  }

  // Classical Temperament for this sign
  let temperament: "favorable" | "moderate" | "challenging" = "moderate";
  let temperamentTitle = "Moderate & Transformational Impact";
  let temperamentTitleHi = "मध्यम एवं परिवर्तनकारी प्रभाव";
  let temperamentExplanation =
    "Saturn acts as a strict cosmic teacher. The period brings tests of patience, career restructuring, and spiritual maturity.";
  let temperamentExplanationHi =
    "शनिदेव कर्मफलदाता के रूप में धैर्य, परिश्रम और अनुशासन की परीक्षा लेते हैं। आत्म-चिंतन एवं कठिन परिश्रम से दीर्घकालिक स्थायित्व प्राप्त होता है।";

  // Saturn's own or exalted/friendly signs
  if ([1, 6, 9, 10].includes(moonRashiIndex)) {
    // Taurus (Venus), Libra (Saturn exalted/Venus), Capricorn (Saturn), Aquarius (Saturn)
    temperament = "favorable";
    temperamentTitle = "Favorable & Constructive Growth (Mitra / Swakshetra)";
    temperamentTitleHi = "शुभ एवं सकारात्मक उन्नति (मित्र व स्वराशि प्रभाव)";
    temperamentExplanation =
      "Because Saturn is the sign lord or a close friend to your Moon lord (Venus/Saturn), Sade Sati acts constructively, elevating your maturity, social standing, and material foundations.";
    temperamentExplanationHi =
      "क्योंकि शनिदेव आपकी राशि के स्वामी अथवा परम मित्र (शुक्र/शनि) हैं, अतः साढ़े साती अधिक कष्टकारी न होकर प्रगति, प्रतिष्ठा एवं स्थायी संपत्ति निर्माण में सहायक होती है।";
  } else if ([3, 4, 7].includes(moonRashiIndex)) {
    // Cancer (Moon - enemy), Leo (Sun - natural adversary), Scorpio (Mars)
    temperament = "challenging";
    temperamentTitle = "Intense Testing & High Discipline Required (Shatru Kshetra)";
    temperamentTitleHi = "गहन परीक्षा एवं संयम की आवश्यकता (शत्रु क्षेत्र प्रभाव)";
    temperamentExplanation =
      "Saturn shares an adversarial relationship with your Moon sign lord. Heightened stress, mental turbulence, or unexpected delays require steadfast devotion, discipline, and classical remedies.";
    temperamentExplanationHi =
      "आपकी राशि स्वामी के साथ शनिदेव का स्वाभाविक शत्रुभाव होने से यह समय मानसिक उद्वेग, स्वास्थ्य एवं संबंधों में सजगता की मांग करता है। नियमित जप एवं सात्विक आचरण आवश्यक है।";
  }

  // Extract all transit periods for this moon sign from the historical table
  const allIntervals = SATURN_TRANSIT_INTERVALS;
  const periods: TransitPeriod[] = [];

  for (let i = 0; i < allIntervals.length; i++) {
    const r = allIntervals[i].rashi;
    const start = allIntervals[i].date;
    const end = i < allIntervals.length - 1 ? allIntervals[i + 1].date : "2065-12-31";

    let type: TransitPeriod["type"] | null = null;
    let label = "";
    let labelHi = "";

    if (r === rashi12th) {
      type = "sade_sati_rising";
      label = "Sade Sati — 1st Phase (Rising / 12th House)";
      labelHi = "साढ़े साती — प्रथम चरण (द्वादश भाव)";
    } else if (r === rashi1st) {
      type = "sade_sati_peak";
      label = "Sade Sati — 2nd Phase (Peak / Janma Rashi)";
      labelHi = "साढ़े साती — द्वितीय चरण (जन्म राशि शिखर)";
    } else if (r === rashi2nd) {
      type = "sade_sati_setting";
      label = "Sade Sati — 3rd Phase (Setting / 2nd House)";
      labelHi = "साढ़े साती — तृतीय चरण (द्वितीय भाव)";
    } else if (r === rashi4th) {
      type = "dhaiya_kantaka";
      label = "Shani Dhaiya — Kantaka (4th House)";
      labelHi = "शनि ढैय्या — कंटक (चतुर्थ भाव)";
    } else if (r === rashi8th) {
      type = "dhaiya_ashtama";
      label = "Shani Dhaiya — Ashtama (8th House)";
      labelHi = "शनि ढैय्या — अष्टम (अष्टम भाव)";
    }

    if (type) {
      const isCurrent = asOfStr >= start && asOfStr < end;
      periods.push({
        rashiIndex: r,
        rashiName: RASI_NAMES[r],
        rashiNameHi: RASI_NAMES_HI[r],
        startDate: start,
        endDate: end,
        type,
        label,
        labelHi,
        isCurrent,
      });
    }
  }

  // Group Sade Sati into distinct 7.5-year cycles (each cycle spans consecutive rising, peak, setting phases)
  const sadeSatiPeriods = periods.filter((p) =>
    p.type.startsWith("sade_sati")
  );

  const allSadeSatiCycles: SadeSatiCycle[] = [];
  let curCyclePhases: TransitPeriod[] = [];
  let cycleCounter = 1;

  for (let i = 0; i < sadeSatiPeriods.length; i++) {
    const p = sadeSatiPeriods[i];
    curCyclePhases.push(p);

    // If next period is far in time (> 3 years apart) or is 1st phase again, close current cycle
    const nextP = sadeSatiPeriods[i + 1];
    let closeCycle = false;

    if (!nextP) {
      closeCycle = true;
    } else {
      const endDate = new Date(p.endDate).getTime();
      const nextStartDate = new Date(nextP.startDate).getTime();
      const gapYears = (nextStartDate - endDate) / (365.25 * 86400000);
      if (gapYears > 2.5 || nextP.type === "sade_sati_rising" && p.type === "sade_sati_setting") {
        closeCycle = true;
      }
    }

    if (closeCycle && curCyclePhases.length > 0) {
      const cycleStart = curCyclePhases[0].startDate;
      const cycleEnd = curCyclePhases[curCyclePhases.length - 1].endDate;
      const isCurrentCycle = asOfStr >= cycleStart && asOfStr <= cycleEnd;

      allSadeSatiCycles.push({
        cycleNumber: cycleCounter++,
        overallStartDate: cycleStart,
        overallEndDate: cycleEnd,
        phases: [...curCyclePhases],
        isCurrent: isCurrentCycle,
      });
      curCyclePhases = [];
    }
  }

  const allDhaiyaPeriods = periods.filter((p) => p.type.startsWith("dhaiya"));

  // Find currently active period and next upcoming period
  const currentPeriodDetails = periods.find((p) => p.isCurrent) || null;
  const nextPeriodDetails = periods.find((p) => p.startDate > asOfStr) || null;

  // Classical Vedic Remedies
  const remedies = [
    {
      title: "Daily Shri Hanuman Chalisa Recitation",
      titleHi: "नित्य श्री हनुमान चालीसा का पाठ",
      description:
        "Lord Hanuman protects all devotees from the malevolent influences of Saturn. Reciting Hanuman Chalisa every morning and especially on Tuesdays & Saturdays provides immediate spiritual fortitude.",
      descriptionHi:
        "पौराणिक मान्यता के अनुसार संकटमोचन हनुमान जी की शरण में जाने वाले भक्त को शनिदेव कभी अनिष्ट फल नहीं देते। मंगलवार एवं शनिवार को सुंदरकांड अथवा हनुमान चालीसा का पाठ विशेष कल्याणकारी है।",
      mantra: "मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥",
    },
    {
      title: "Shani Beej Mantra (108 Chants)",
      titleHi: "शनि बीज मन्त्र जप (१०८ बार)",
      description:
        "Chant the authentic Shani Beej Mantra using a Rudraksha rosary on Saturday evenings facing the West direction.",
      descriptionHi:
        "शनिवार की संध्या के समय पश्चिम दिशा की ओर मुख करके रुद्राक्ष की माला से १०८ बार शनि बीज मंत्र का जप करें।",
      mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥ (अथवा: ॐ शं शनैश्चराय नमः)",
    },
    {
      title: "Sarson Tel Deepak under Peepal Tree",
      titleHi: "पीपल वृक्ष के नीचे सरसों के तेल का दीपक",
      description:
        "Light a mustard oil earthen lamp under a Peepal tree after sunset on Saturdays and circumambulate (Parikrama) seven times.",
      descriptionHi:
        "प्रत्येक शनिवार सूर्यास्त के उपरांत पीपल के वृक्ष के नीचे सरसों के तेल का चौमुखा दीपक प्रज्वलित करें तथा सात परिक्रमा करें।",
    },
    {
      title: "Saturday Daan (Charity of Saturnian Articles)",
      titleHi: "शनिवार का दान (काली वस्तुएं एवं तिल)",
      description:
        "Donate black sesame seeds, black urad dal, mustard oil, iron utensils, or black blankets to the needy or laborers on Saturday afternoons.",
      descriptionHi:
        "शनिवार के दिन काले तिल, काली उड़द, सरसों का तेल, लोहे का तवा/पात्र अथवा जरूरतमंद श्रमिकों को भोजन व काले वस्त्रों का दान करें।",
    },
    {
      title: "Respect to Laborers, Elders, and Subordinates",
      titleHi: "श्रमिकों, वृद्धों व अधीनस्थों का सम्मान",
      description:
        "Saturn is the cosmic ruler of karma, justice, and the working class. Treating domestic helpers, janitors, and laborers with fairness and generosity pleases Saturn the most.",
      descriptionHi:
        "शनिदेव न्याय के अधिष्ठाता हैं तथा समाज के निर्बल व श्रमजीवी वर्ग का प्रतिनिधित्व करते हैं। किसी भी असहाय, कर्मचारी अथवा वृद्ध का अपमान न करें।",
    },
  ];

  return {
    moonRashiIndex,
    moonRashiName: RASI_NAMES[moonRashiIndex],
    moonRashiNameHi: RASI_NAMES_HI[moonRashiIndex],
    asOfDate: asOfStr,
    currentSaturnRashiIndex: currentSaturnRashi,
    currentSaturnRashiName: RASI_NAMES[currentSaturnRashi],
    currentSaturnRashiNameHi: RASI_NAMES_HI[currentSaturnRashi],
    isInSadeSati,
    currentSadeSatiPhase,
    isInDhaiya,
    currentDhaiyaType,
    statusSummary,
    statusSummaryHi,
    temperament,
    temperamentTitle,
    temperamentTitleHi,
    temperamentExplanation,
    temperamentExplanationHi,
    allSadeSatiCycles,
    allDhaiyaPeriods,
    currentPeriodDetails,
    nextPeriodDetails,
    remedies,
  };
}
