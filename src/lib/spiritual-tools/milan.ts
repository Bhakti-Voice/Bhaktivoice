import type { BirthDetails, GunaScore, MilanResult } from "./types";
import { generateKundli } from "./kundli";
import {
  GANA_NAMES_HI,
  NADI_NAMES_HI,
  TARA_NAMES_HI,
  VARNA_NAMES_HI,
  VASHYA_NAMES_HI,
  YONI_NAMES_HI,
  bhakootScore,
  ganaScore,
  grahaMaitriScore,
  nadiScore,
  taraScore,
  varnaScore,
  vashyaScore,
  yoniScore,
} from "./ashtakoot-data";

function verdict(total: number): {
  level: "Excellent" | "Good" | "Average" | "Low";
  en: string;
  hi: string;
  summaryEn: string;
  summaryHi: string;
} {
  if (total >= 28) {
    return {
      level: "Excellent",
      en: "Excellent Match (उत्तम मिलान) — Highly Auspicious Compatibility",
      hi: "उत्तम मिलान — अत्यंत शुभ एवं अनुकूल वैवाहिक संबंध",
      summaryEn:
        "The Ashtakoot score is exceptional (28+ Gunas). High psychological, financial, spiritual, and physical harmony is indicated for a blessed married life.",
      summaryHi:
        "अष्टकूट मिलान में 28 से अधिक गुण मिले हैं। वैवाहिक जीवन में मानसिक, आर्थिक, पारिवारिक एवं शारीरिक सामंजस्य अत्यंत श्रेष्ठ रहेगा।",
    };
  }
  if (total >= 21) {
    return {
      level: "Good",
      en: "Good Match (शुभ मिलान) — Favorable Compatibility",
      hi: "शुभ मिलान — वैवाहिक जीवन हेतु अनुकूल एवं कल्याणकारी",
      summaryEn:
        "A strong match score (21–27.5 Gunas). Major life harmony factors align well. Marriage can be solemnized with confidence.",
      summaryHi:
        "गुण मिलान 21 से 27 के बीच है। प्रमुख जीवन घटक शुभ हैं। सुखद गृहस्थ जीवन हेतु यह संबंध अनुकूल है।",
    };
  }
  if (total >= 18) {
    return {
      level: "Average",
      en: "Average Match (मध्यम मिलान) — Meets Minimum Vedic Threshold",
      hi: "मध्यम मिलान — 18 गुणों की पारंपरिक न्यूनतम सीमा पूर्ण",
      summaryEn:
        "Meets the classical Vedic requirement (18+ Gunas). Individual horoscopes should be reviewed for planetary strengths and dasha periods.",
      summaryHi:
        "विवाह हेतु आवश्यक 18 गुणों की न्यूनतम सीमा पूर्ण है। व्यक्तिगत कुंडलियों में ग्रह मैत्री एवं दशा का मिलान कर निर्णय लें।",
    };
  }
  return {
    level: "Low",
    en: "Low Match (अशुभ/सामान्य से कम) — Astrological Guidance Suggested",
    hi: "सामान्य से कम मिलान — विद्वान ज्योतिषी से परामर्श अनुशंसित",
    summaryEn:
      "The total Gunas are below the traditional 18-point threshold. Remedial rituals or deeper horoscope chart analysis are recommended before proceeding.",
    summaryHi:
      "गुणों का योग 18 से कम है। विवाह पूर्व विद्वान ज्योतिषी से कुंडलियों का विस्तृत विश्लेषण एवं शांति उपाय कराना उचित रहेगा।",
  };
}

export function calculateMilan(boy: BirthDetails, girl: BirthDetails): MilanResult {
  const boyChart = generateKundli(boy);
  const girlChart = generateKundli(girl);

  const boyMoon = boyChart.moon;
  const girlMoon = girlChart.moon;

  // 1. Varna
  const varna = varnaScore(boyMoon.rashiIndex, girlMoon.rashiIndex);
  // 2. Vashya
  const vashya = vashyaScore(boyMoon.rashiIndex, girlMoon.rashiIndex);
  // 3. Tara
  const tara = taraScore(boyMoon.nakshatraIndex, girlMoon.nakshatraIndex);
  // 4. Yoni
  const yoni = yoniScore(boyMoon.nakshatraIndex, girlMoon.nakshatraIndex);
  // 5. Graha Maitri
  const maitri = grahaMaitriScore(boyMoon.rashiIndex, girlMoon.rashiIndex);
  // 6. Gana
  const gana = ganaScore(boyMoon.nakshatraIndex, girlMoon.nakshatraIndex);
  // 7. Bhakoot
  const bhakoot = bhakootScore(boyMoon.rashiIndex, girlMoon.rashiIndex);
  // 8. Nadi
  const nadi = nadiScore(
    boyMoon.nakshatraIndex,
    girlMoon.nakshatraIndex,
    boyMoon.rashiIndex,
    girlMoon.rashiIndex,
  );

  const gunas: GunaScore[] = [
    {
      id: "varna",
      name: "Varna",
      nameHi: "वर्ण",
      max: 1,
      score: varna.score,
      boyValue: varna.boyVarna,
      boyValueHi: VARNA_NAMES_HI[boyMoon.rashiIndex % 4] || varna.boyVarna,
      girlValue: varna.girlVarna,
      girlValueHi: VARNA_NAMES_HI[girlMoon.rashiIndex % 4] || varna.girlVarna,
      detail: "Spiritual duty, ego harmony, and social affinity.",
      detailHi: "अहंकार, आध्यात्मिक कार्य एवं सामाजिक प्रकृति की अनुकूलता।",
    },
    {
      id: "vashya",
      name: "Vashya",
      nameHi: "वश्य",
      max: 2,
      score: vashya.score,
      boyValue: vashya.boyVashya,
      boyValueHi: VASHYA_NAMES_HI[boyMoon.rashiIndex % 5] || vashya.boyVashya,
      girlValue: vashya.girlVashya,
      girlValueHi: VASHYA_NAMES_HI[girlMoon.rashiIndex % 5] || vashya.girlVashya,
      detail: "Mutual influence, dominance, and magnetic attraction.",
      detailHi: "पारस्परिक आकर्षण, प्रभाव एवं अनुकूलता का सामंजस्य।",
    },
    {
      id: "tara",
      name: "Tara",
      nameHi: "तारा",
      max: 3,
      score: tara.score,
      boyValue: tara.boyTara,
      boyValueHi: TARA_NAMES_HI[((girlMoon.nakshatraIndex - boyMoon.nakshatraIndex + 27) % 9)] || tara.boyTara,
      girlValue: tara.girlTara,
      girlValueHi: TARA_NAMES_HI[((boyMoon.nakshatraIndex - girlMoon.nakshatraIndex + 27) % 9)] || tara.girlTara,
      detail: "Birth star destiny, longevity, and overall wellbeing.",
      detailHi: "भाग्य, आयु, स्वास्थ्य एवं सौभाग्य की पारस्परिक स्थिति।",
    },
    {
      id: "yoni",
      name: "Yoni",
      nameHi: "योनि",
      max: 4,
      score: yoni.score,
      boyValue: yoni.boyYoni,
      boyValueHi: YONI_NAMES_HI[boyMoon.nakshatraIndex % 14] || yoni.boyYoni,
      girlValue: yoni.girlYoni,
      girlValueHi: YONI_NAMES_HI[girlMoon.nakshatraIndex % 14] || yoni.girlYoni,
      detail: "Physical intimacy, temperament, and biological harmony.",
      detailHi: "शारीरिक आकर्षण, स्वभाव एवं प्राकृतिक अनुकूलता।",
    },
    {
      id: "grahaMaitri",
      name: "Graha Maitri",
      nameHi: "ग्रह मैत्री",
      max: 5,
      score: maitri.score,
      boyValue: maitri.boyLord,
      boyValueHi: maitri.boyLord,
      girlValue: maitri.girlLord,
      girlValueHi: maitri.girlLord,
      detail: "Planetary friendship of Moon lords (mental rapport & outlook).",
      detailHi: "राशियों के स्वामियों की मित्रता — मानसिक तालमेल एवं जीवन दृष्टिकोण।",
    },
    {
      id: "gana",
      name: "Gana",
      nameHi: "गण",
      max: 6,
      score: gana.score,
      boyValue: gana.boyGana,
      boyValueHi: GANA_NAMES_HI[boyMoon.nakshatraIndex % 3] || gana.boyGana,
      girlValue: gana.girlGana,
      girlValueHi: GANA_NAMES_HI[girlMoon.nakshatraIndex % 3] || gana.girlGana,
      detail: "Behavioral nature and worldview (Deva, Manushya, Rakshasa).",
      detailHi: "स्वभाव एवं व्यवहार (देव गण, मनुष्य गण, राक्षस गण)।",
    },
    {
      id: "bhakoot",
      name: "Bhakoot",
      nameHi: "भकूट",
      max: 7,
      score: bhakoot.score,
      boyValue: `${boyMoon.rashi} (${boyMoon.rashiHi})`,
      boyValueHi: boyMoon.rashiHi,
      girlValue: `${girlMoon.rashi} (${girlMoon.rashiHi})`,
      girlValueHi: girlMoon.rashiHi,
      detail: "Moon sign relative distance (family prosperity, joy & children).",
      detailHi: "पारिवारिक समृद्धि, वंश वृद्धि एवं गृहस्थ सुख।",
      hasDosha: bhakoot.hasDosha,
      isCancelled: bhakoot.isCancelled,
      cancellationNote: bhakoot.cancellationNote,
      cancellationNoteHi: bhakoot.cancellationNoteHi,
    },
    {
      id: "nadi",
      name: "Nadi",
      nameHi: "नाड़ी",
      max: 8,
      score: nadi.score,
      boyValue: nadi.boyNadi,
      boyValueHi: NADI_NAMES_HI[boyMoon.nakshatraIndex % 3] || nadi.boyNadi,
      girlValue: nadi.girlNadi,
      girlValueHi: NADI_NAMES_HI[girlMoon.nakshatraIndex % 3] || nadi.girlNadi,
      detail: "Genetic health, physiological constitution, and healthy progeny.",
      detailHi: "स्वास्थ्य, आनुवंशिक अनुकूलता एवं उत्तम संतान सुख।",
      hasDosha: nadi.hasDosha,
      isCancelled: nadi.isCancelled,
      cancellationNote: nadi.cancellationNote,
      cancellationNoteHi: nadi.cancellationNoteHi,
    },
  ];

  const total = Math.round(gunas.reduce((sum, g) => sum + g.score, 0) * 10) / 10;
  const percentage = Math.round((total / 36) * 100);
  const v = verdict(total);

  // Manglik Match Evaluation
  const boyManglik = boyChart.manglik.isManglik;
  const girlManglik = girlChart.manglik.isManglik;

  let manglikCompatible = true;
  let manglikNote = "Both partners have matching Manglik status.";
  let manglikNoteHi = "दोनों जातकों की मांगलिक स्थिति परस्पर अनुकूल है।";

  if (boyManglik && girlManglik) {
    manglikCompatible = true;
    manglikNote = "Both are Manglik: Kuja Dosha is mutually cancelled (दोष परिहार). Highly favorable!";
    manglikNoteHi = "दोनों जातक मांगलिक हैं: कुज दोष का स्वतः परिहार हो जाता है। अत्यंत शुभ!";
  } else if (!boyManglik && !girlManglik) {
    manglikCompatible = true;
    manglikNote = "Both are Non-Manglik: Perfectly free of Kuja Dosha.";
    manglikNoteHi = "दोनों जातक मांगलिक दोष से मुक्त हैं।";
  } else {
    manglikCompatible = false;
    const who = boyManglik ? "Boy" : "Girl";
    const whoHi = boyManglik ? "वर" : "कन्या";
    manglikNote = `${who} is Manglik while the other partner is Non-Manglik. Astrological consultation recommended.`;
    manglikNoteHi = `${whoHi} मांगलिक हैं जबकि दूसरा साथी गैर-मांगलिक है। विद्वान ज्योतिषी से परामर्श उचित रहेगा।`;
  }

  return {
    boy: boyChart,
    girl: girlChart,
    gunas,
    total,
    maxTotal: 36,
    percentage,
    verdict: v.en,
    verdictHi: v.hi,
    verdictSummary: v.summaryEn,
    verdictSummaryHi: v.summaryHi,
    compatibilityLevel: v.level,
    nadiDosha: {
      present: nadi.hasDosha,
      cancelled: nadi.isCancelled,
      note: nadi.cancellationNote,
      noteHi: nadi.cancellationNoteHi,
    },
    bhakootDosha: {
      present: bhakoot.hasDosha,
      cancelled: bhakoot.isCancelled,
      note: bhakoot.cancellationNote,
      noteHi: bhakoot.cancellationNoteHi,
    },
    manglikMatch: {
      boyManglik,
      girlManglik,
      compatible: manglikCompatible,
      note: manglikNote,
      noteHi: manglikNoteHi,
    },
  };
}
