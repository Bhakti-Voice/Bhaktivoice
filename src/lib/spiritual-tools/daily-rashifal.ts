export interface RashiForecast {
  id: string;
  nameEn: string;
  nameHi: string;
  sanskrit: string;
  symbol: string;
  element: string;
  elementHi: string;
  rulerEn: string;
  rulerHi: string;
  predictionEn: string;
  predictionHi: string;
  luckyNumber: number;
  luckyColorEn: string;
  luckyColorHi: string;
  mantra: string;
  remedyEn: string;
  remedyHi: string;
}

const RASHI_METADATA = [
  {
    id: "aries",
    nameEn: "Aries",
    nameHi: "मेष",
    sanskrit: "Mesha",
    symbol: "♈",
    element: "Fire",
    elementHi: "अग्नि",
    rulerEn: "Mars (Mangal)",
    rulerHi: "मंगल",
    mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
  },
  {
    id: "taurus",
    nameEn: "Taurus",
    nameHi: "वृषभ",
    sanskrit: "Vrishabha",
    symbol: "♉",
    element: "Earth",
    elementHi: "पृथ्वी",
    rulerEn: "Venus (Shukra)",
    rulerHi: "शुक्र",
    mantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
  },
  {
    id: "gemini",
    nameEn: "Gemini",
    nameHi: "मिथुन",
    sanskrit: "Mithuna",
    symbol: "♊",
    element: "Air",
    elementHi: "वायु",
    rulerEn: "Mercury (Budh)",
    rulerHi: "बुध",
    mantra: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
  },
  {
    id: "cancer",
    nameEn: "Cancer",
    nameHi: "कर्क",
    sanskrit: "Karka",
    symbol: "♋",
    element: "Water",
    elementHi: "जल",
    rulerEn: "Moon (Chandra)",
    rulerHi: "चन्द्रमा",
    mantra: "ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः",
  },
  {
    id: "leo",
    nameEn: "Leo",
    nameHi: "सिंह",
    sanskrit: "Simha",
    symbol: "♌",
    element: "Fire",
    elementHi: "अग्नि",
    rulerEn: "Sun (Surya)",
    rulerHi: "सूर्य",
    mantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
  },
  {
    id: "virgo",
    nameEn: "Virgo",
    nameHi: "कन्या",
    sanskrit: "Kanya",
    symbol: "♍",
    element: "Earth",
    elementHi: "पृथ्वी",
    rulerEn: "Mercury (Budh)",
    rulerHi: "बुध",
    mantra: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
  },
  {
    id: "libra",
    nameEn: "Libra",
    nameHi: "तुला",
    sanskrit: "Tula",
    symbol: "♎",
    element: "Air",
    elementHi: "वायु",
    rulerEn: "Venus (Shukra)",
    rulerHi: "शुक्र",
    mantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
  },
  {
    id: "scorpio",
    nameEn: "Scorpio",
    nameHi: "वृश्चिक",
    sanskrit: "Vrishchika",
    symbol: "♏",
    element: "Water",
    elementHi: "जल",
    rulerEn: "Mars (Mangal)",
    rulerHi: "मंगल",
    mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
  },
  {
    id: "sagittarius",
    nameEn: "Sagittarius",
    nameHi: "धनु",
    sanskrit: "Dhanu",
    symbol: "♐",
    element: "Fire",
    elementHi: "अग्नि",
    rulerEn: "Jupiter (Guru)",
    rulerHi: "बृहस्पति",
    mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
  },
  {
    id: "capricorn",
    nameEn: "Capricorn",
    nameHi: "मकर",
    sanskrit: "Makara",
    symbol: "♑",
    element: "Earth",
    elementHi: "पृथ्वी",
    rulerEn: "Saturn (Shani)",
    rulerHi: "शनि",
    mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
  },
  {
    id: "aquarius",
    nameEn: "Aquarius",
    nameHi: "कुम्भ",
    sanskrit: "Kumbha",
    symbol: "♒",
    element: "Air",
    elementHi: "वायु",
    rulerEn: "Saturn (Shani)",
    rulerHi: "शनि",
    mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
  },
  {
    id: "pisces",
    nameEn: "Pisces",
    nameHi: "मीन",
    sanskrit: "Meena",
    symbol: "♓",
    element: "Water",
    elementHi: "जल",
    rulerEn: "Jupiter (Guru)",
    rulerHi: "बृहस्पति",
    mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
  },
];

// Predictive templates tailored to daily planetary transits
const PREDICTIONS = [
  {
    hi: "आज रुके हुए कार्यों में गति आएगी। आत्मविश्वास से निर्णय लें, वरिष्ठजनों का सहयोग मिलेगा। पारिवारिक वातावरण सुखद रहेगा।",
    en: "Pending tasks gain momentum today. Make decisions with confidence; support from elders is assured.",
    remedyHi: "प्रातः भगवान सूर्य को तांबे के पात्र से जल अर्पित करें।",
    remedyEn: "Offer pure water to Lord Surya in a copper vessel in the morning.",
    colorHi: "केसरिया (Saffron)",
    colorEn: "Saffron",
  },
  {
    hi: "आर्थिक दृष्टि से दिन अनुकूल है। नए संपर्कों से लाभ होगा। वाणी में मधुरता बनाए रखें और मानसिक शांति को प्राथमिकता दें।",
    en: "Financially favorable day with beneficial opportunities from new contacts. Maintain calm speech.",
    remedyHi: "माता लक्ष्मी का स्मरण कर श्वेत पुष्प या मिश्री अर्पित करें।",
    remedyEn: "Chant Mahalakshmi mantra and offer white flowers or mishri.",
    colorHi: "श्वेत (White)",
    colorEn: "White",
  },
  {
    hi: "कार्यक्षेत्र में आपकी सूझबूझ की प्रशंसा होगी। आध्यात्मिक साधना व अध्ययन में मन लगेगा। व्यर्थ के विवादों से दूर रहें।",
    en: "Your intellect and wit will be appreciated at work. Spiritual focus and meditation will bring clarity.",
    remedyHi: "तुलसी के पौधे में जल दें और एक परिक्रमा करें।",
    remedyEn: "Water the sacred Tulsi plant and perform one mindful circumambulation.",
    colorHi: "हरा (Green)",
    colorEn: "Green",
  },
  {
    hi: "मन में सकारात्मक विचार रहेंगे। घर-परिवार में मांगलिक चर्चा हो सकती है। स्वास्थ्य उत्तम रहेगा और भक्ति भाव बढ़ेगा।",
    en: "Positive energy surrounds you today. Auspicious discussions in family bring joy and emotional peace.",
    remedyHi: "शिवलिंग पर कच्चा दूध व जल अर्पित करें।",
    remedyEn: "Offer raw milk and water on the sacred Shiva Lingam.",
    colorHi: "मोती श्वेत (Pearl)",
    colorEn: "Pearl White",
  },
  {
    hi: "मान-सम्मान और प्रभाव में वृद्धि होगी। महत्वपूर्ण योजनाओं पर विचार करने का उत्तम समय है। धर्म कार्य में रुचि रहेगी।",
    en: "Prestige and personal influence rise today. A great day to advance meaningful long-term plans.",
    remedyHi: "गाय को गुड़ अथवा रोटी खिलाएं।",
    remedyEn: "Feed fresh jaggery or bread to a sacred cow.",
    colorHi: "सुनहरा पीला (Golden)",
    colorEn: "Golden Yellow",
  },
  {
    hi: "परिश्रम का पूरा प्रतिफल प्राप्त होगा। व्यावसायिक यात्रा अथवा नए कार्य की रूपरेखा बन सकती है। स्वास्थ्य का ध्यान रखें।",
    en: "Hard work yields tangible rewards. Productive travel or planning for a new venture is favored.",
    remedyHi: "गणेश जी को दूर्वा अर्पित कर ॐ गं गणपतये नमः का जप करें।",
    remedyEn: "Offer sacred Durva grass to Lord Ganesha with 11 chants.",
    colorHi: "हल्का हरा (Light Green)",
    colorEn: "Light Green",
  },
  {
    hi: "साझेदारी व संबंधों में मधुरता बढ़ेगी। संतुलन व धैर्य से काम लेंगे तो सफलता सुनिश्चित है। संध्या समय शुभ समाचार मिल सकता है।",
    en: "Harmonious energy strengthens relationships and collaborations. Balance and patience bring success.",
    remedyHi: "किसी जरूरतमंद को फल अथवा भोजन दान करें।",
    remedyEn: "Offer fruits or meals to someone in need.",
    colorHi: "गुलाबी (Pink)",
    colorEn: "Soft Pink",
  },
  {
    hi: "गूढ़ विषयों और आत्मचिंतन में रुचि बढ़ेगी। गुप्त शत्रुओं से सावधान रहें और अपनी योजनाओं को गोपनीय रखें। साधना से बल मिलेगा।",
    en: "Deep intuition and introspection guide you today. Keep your sacred plans confidential for best results.",
    remedyHi: "हनुमान चालीसा का पाठ करें और सिंदूर का तिलक लगाएं।",
    remedyEn: "Recite the Hanuman Chalisa and wear a tilak of pure vermillion.",
    colorHi: "लाल (Red)",
    colorEn: "Deep Red",
  },
  {
    hi: "भाग्य का पूरा साथ मिलेगा। धार्मिक यात्रा अथवा सत्संग के योग बन रहे हैं। गुरुजनों का आशीर्वाद विशेष फलदायी रहेगा।",
    en: "Fortune favors your spiritual and noble efforts. Blessed time for temple visits and holy company.",
    remedyHi: "माथे पर केसर अथवा हल्दी का तिलक लगाएं।",
    remedyEn: "Apply a sacred saffron or turmeric tilak on the forehead.",
    colorHi: "पीला (Yellow)",
    colorEn: "Bright Yellow",
  },
  {
    hi: "कर्मक्षेत्र में दृढ़ता और निष्ठा रंग लाएगी। आर्थिक स्थिति सुदृढ़ होगी। धैर्यपूर्वक अपने कर्तव्यों का पालन करते रहें।",
    en: "Steadfast dedication at work brings lasting stability. Patience and discipline will reward you handsomely.",
    remedyHi: "पीपल के वृक्ष के समीप संध्या समय सरसों के तेल का दीपक प्रज्वलित करें।",
    remedyEn: "Light a mustard oil diya near a sacred Peepal tree in the evening.",
    colorHi: "नीला (Blue)",
    colorEn: "Deep Blue",
  },
  {
    hi: "नवीन विचारों और सामाजिक कार्यों में सफलता मिलेगी। पुराने मित्रों से संपर्क आनंददायक रहेगा। ईश्वर पर भरोसा रखें।",
    en: "Innovative ideas and selfless service flourish today. Joyful reconnections with trusted companions.",
    remedyHi: "पक्षियों को दाना डालें अथवा जल का पात्र रखें।",
    remedyEn: "Feed grains to birds or place a clean bowl of water outdoors.",
    colorHi: "आसमानी (Sky Blue)",
    colorEn: "Sky Blue",
  },
  {
    hi: "आध्यात्मिक आनंद और मन की शांति का अनुभव होगा। दान-पुण्य से आत्मिक संतोष मिलेगा। रचनात्मक कार्यों में सफलता मिलेगी।",
    en: "Spiritual serenity and profound inner peace prevail today. Acts of charity bring immense grace.",
    remedyHi: "भगवान विष्णु के सहस्त्रनाम अथवा ॐ नमो नारायणाय का जप करें।",
    remedyEn: "Chant 'Om Namo Narayanaya' 108 times with devotion.",
    colorHi: "हल्दी पीला (Turmeric)",
    colorEn: "Turmeric Yellow",
  },
];

/**
 * Deterministically generates today's Vedic horoscope forecast for all 12 Rashis.
 * Updates naturally on every calendar day at midnight.
 */
export function getDailyRashifal(date = new Date()): RashiForecast[] {
  // Day of year and day-of-week seed
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const daySeed = year * 1000 + (month + 1) * 31 + day;

  return RASHI_METADATA.map((rashi, index) => {
    // Deterministic offset per Rashi ensuring daily rotation across the 12 predictions
    const predIndex = (daySeed + index * 5) % PREDICTIONS.length;
    const template = PREDICTIONS[predIndex];
    const luckyNumber = ((daySeed + index * 7) % 9) + 1;

    return {
      id: rashi.id,
      nameEn: rashi.nameEn,
      nameHi: rashi.nameHi,
      sanskrit: rashi.sanskrit,
      symbol: rashi.symbol,
      element: rashi.element,
      elementHi: rashi.elementHi,
      rulerEn: rashi.rulerEn,
      rulerHi: rashi.rulerHi,
      predictionEn: template.en,
      predictionHi: template.hi,
      luckyNumber,
      luckyColorEn: template.colorEn,
      luckyColorHi: template.colorHi,
      mantra: rashi.mantra,
      remedyEn: template.remedyEn,
      remedyHi: template.remedyHi,
    };
  });
}
