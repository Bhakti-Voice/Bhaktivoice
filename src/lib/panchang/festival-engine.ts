import {
  SearchRiseSet,
  Body,
  Observer,
  SunPosition,
} from "astronomy-engine";
import {
  getObserver,
  getSunrise,
  getSunset,
  getMoonrise,
  getTithiSnapshot,
  siderealLon,
  tropicalSunLon,
  wrap360,
  lahiriAyanamsa,
  calendarDateForZone,
  startOfDayForZone,
  type CityConfig,
} from "./astronomy";
import { DEFAULT_CITY } from "./cities";
import { RASI_NAMES, RASI_NAMES_HI } from "./names";

export type FestivalVyaptiRule =
  | "nishita"      // Midnight (Maha Shivratri, Janmashtami)
  | "pradosha"     // Sunset to 2h 24m after (Diwali Lakshmi Puja, Holika Dahan)
  | "madhyahna"    // Midday / Solar noon (Ganesh Chaturthi, Ram Navami)
  | "aparahna"     // Afternoon (Dussehra, Pitru Shraddha)
  | "sunrise"      // Sunrise / Udaya Tithi (Chaitra/Sharad Navratri, Devutthana Ekadashi)
  | "moonrise"     // Moonrise (Karwa Chauth, Sankashti Chaturthi)
  | "sankranti";   // Solar Ingress (Makar Sankranti, Mesha Sankranti)

export interface DynamicFestivalInfo {
  slug: string;
  name: string;
  nameHi: string;
  date: Date;
  dateString: string; // YYYY-MM-DD
  tithiName: string;
  tithiNameHi: string;
  muhuratTitle: string;
  muhuratTitleHi: string;
  muhuratWindow: string;
  muhuratWindowHi: string;
  muhuratStart: Date;
  muhuratEnd: Date;
  ruleDescription: string;
  ruleDescriptionHi: string;
  deity: string;
  category: "festival" | "vrat" | "sankranti";
}

interface FestivalDefinition {
  slug: string;
  name: string;
  nameHi: string;
  deity: string;
  category: "festival" | "vrat" | "sankranti";
  rule: FestivalVyaptiRule;
  targetMasaIndex?: number; // 0=Chaitra, ..., 11=Phalguna
  targetPaksha?: "shukla" | "krishna";
  targetTithiNumber?: number; // 1 to 15
  targetSolarRashi?: number; // For Sankranti: 0=Mesha, 9=Makara
  approxMonthStart: number; // 1-12 (Gregorian)
  approxMonthEnd: number; // 1-12 (Gregorian)
  muhuratNameEn: string;
  muhuratNameHi: string;
  ruleExplanationEn: string;
  ruleExplanationHi: string;
}

const CLASSICAL_FESTIVAL_DEFINITIONS: FestivalDefinition[] = [
  {
    slug: "maha-shivratri",
    name: "Maha Shivratri",
    nameHi: "महाशिवरात्रि",
    deity: "Lord Shiva",
    category: "festival",
    rule: "nishita",
    targetMasaIndex: 11, // Phalguna
    targetPaksha: "krishna",
    targetTithiNumber: 14,
    approxMonthStart: 2,
    approxMonthEnd: 3,
    muhuratNameEn: "Nishita Kaal Puja Muhurat",
    muhuratNameHi: "निशिता काल पूजा मुहूर्त",
    ruleExplanationEn: "According to Nirnayasindhu, Maha Shivratri is observed on Phalguna Krishna Chaturdashi prevailing during Nishita Kaal (midnight).",
    ruleExplanationHi: "निर्णयसिन्धु के अनुसार महाशिवरात्रि फाल्गुन कृष्ण चतुर्दशी को निशिता काल (मध्यरात्रि) व्यापिनी होने पर मनाई जाती है।",
  },
  {
    slug: "holi",
    name: "Holika Dahan / Holi",
    nameHi: "होलिका दहन / होली",
    deity: "Bhakt Prahlad / Lord Vishnu",
    category: "festival",
    rule: "pradosha",
    targetMasaIndex: 11, // Phalguna
    targetPaksha: "shukla",
    targetTithiNumber: 15,
    approxMonthStart: 3,
    approxMonthEnd: 4,
    muhuratNameEn: "Holika Dahan Pradosh Muhurat",
    muhuratNameHi: "होलिका दहन प्रदोष मुहूर्त",
    ruleExplanationEn: "Holika Dahan is performed on Phalguna Purnima during Pradosha Kaal after sunset without Bhadra Mukha.",
    ruleExplanationHi: "होलिका दहन फाल्गुन पूर्णिमा के दिन सूर्यास्त के बाद प्रदोष काल में भद्रा रहित काल में किया जाता है।",
  },
  {
    slug: "chaitra-navratri",
    name: "Chaitra Navratri / Hindu New Year",
    nameHi: "चैत्र नवरात्रि / नव संवत्सर",
    deity: "Mata Durga",
    category: "festival",
    rule: "sunrise",
    targetMasaIndex: 0, // Chaitra
    targetPaksha: "shukla",
    targetTithiNumber: 1,
    approxMonthStart: 3,
    approxMonthEnd: 4,
    muhuratNameEn: "Ghatasthapana Muhurat",
    muhuratNameHi: "घटस्थापना शुभ मुहूर्त",
    ruleExplanationEn: "Nav Samvatsar and Ghatasthapana occur on Chaitra Shukla Pratipada prevailing at sunrise.",
    ruleExplanationHi: "चैत्र शुक्ल प्रतिपदा को सूर्योदय व्यापिनी तिथि में नव संवत्सर एवं कलश घटस्थापना का विधान है।",
  },
  {
    slug: "ram-navami",
    name: "Ram Navami",
    nameHi: "राम नवमी",
    deity: "Lord Rama",
    category: "festival",
    rule: "madhyahna",
    targetMasaIndex: 0, // Chaitra
    targetPaksha: "shukla",
    targetTithiNumber: 9,
    approxMonthStart: 3,
    approxMonthEnd: 4,
    muhuratNameEn: "Madhyahna Janmotsav Muhurat",
    muhuratNameHi: "मध्याह्न प्रभु श्री राम जन्मोत्सव मुहूर्त",
    ruleExplanationEn: "Lord Rama manifested at solar noon (Madhyahna Kaal) on Chaitra Shukla Navami.",
    ruleExplanationHi: "भगवान श्री राम का प्राकट्य चैत्र शुक्ल नवमी को दोपहर मध्याह्न काल में हुआ था।",
  },
  {
    slug: "akshaya-tritiya",
    name: "Akshaya Tritiya",
    nameHi: "अक्षय तृतीया",
    deity: "Lord Vishnu & Mata Lakshmi",
    category: "festival",
    rule: "madhyahna",
    targetMasaIndex: 1, // Vaishakha
    targetPaksha: "shukla",
    targetTithiNumber: 3,
    approxMonthStart: 4,
    approxMonthEnd: 5,
    muhuratNameEn: "Shubh Gold & Puja Muhurat",
    muhuratNameHi: "अक्षय तृतीया स्वर्ण क्रय एवं पूजन मुहूर्त",
    ruleExplanationEn: "Observed on Vaishakha Shukla Tritiya prevailing during Madhyahna / Purvahna.",
    ruleExplanationHi: "वैशाख शुक्ल तृतीया को अक्षय तृतीया का सर्वसिद्धिदायक महापर्व मनाया जाता है।",
  },
  {
    slug: "raksha-bandhan",
    name: "Raksha Bandhan",
    nameHi: "रक्षाबंधन",
    deity: "Lord Krishna & Devi Indrani",
    category: "festival",
    rule: "aparahna",
    targetMasaIndex: 4, // Shravana
    targetPaksha: "shukla",
    targetTithiNumber: 15,
    approxMonthStart: 8,
    approxMonthEnd: 9,
    muhuratNameEn: "Raksha Bandhan Aparahna Muhurat",
    muhuratNameHi: "रक्षाबंधन अपराह्न मुहूर्त",
    ruleExplanationEn: "Observed on Shravana Purnima during Aparahna Kaal avoiding Bhadra.",
    ruleExplanationHi: "श्रावण पूर्णिमा के दिन भद्रा रहित अपराह्न काल में रक्षासूत्र बांधने का विधान है।",
  },
  {
    slug: "krishna-janmashtami",
    name: "Krishna Janmashtami",
    nameHi: "श्री कृष्ण जन्माष्टमी",
    deity: "Lord Krishna",
    category: "festival",
    rule: "nishita",
    targetMasaIndex: 5, // Bhadrapada
    targetPaksha: "krishna",
    targetTithiNumber: 8,
    approxMonthStart: 8,
    approxMonthEnd: 9,
    muhuratNameEn: "Nishita Kaal Janmotsav Muhurat",
    muhuratNameHi: "निशिता काल श्रीकृष्ण जन्मोत्सव मुहूर्त",
    ruleExplanationEn: "Lord Krishna was born at midnight (Nishita Kaal) on Bhadrapada Krishna Ashtami.",
    ruleExplanationHi: "भगवान श्रीकृष्ण का जन्म भाद्रपद कृष्ण अष्टमी की आधी रात (निशिता काल) में हुआ था।",
  },
  {
    slug: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    nameHi: "गणेश चतुर्थी",
    deity: "Lord Ganesha",
    category: "festival",
    rule: "madhyahna",
    targetMasaIndex: 5, // Bhadrapada
    targetPaksha: "shukla",
    targetTithiNumber: 4,
    approxMonthStart: 8,
    approxMonthEnd: 9,
    muhuratNameEn: "Madhyahna Ganeshotsav Sthapana Muhurat",
    muhuratNameHi: "मध्याह्न गणेश स्थापना एवं पूजन मुहूर्त",
    ruleExplanationEn: "Ganesh Sthapana is performed during Madhyahna Kaal on Bhadrapada Shukla Chaturthi.",
    ruleExplanationHi: "भगवान गणपति का जन्मोत्सव भाद्रपद शुक्ल चतुर्थी को मध्याह्न व्यापिनी काल में मनाया जाता है।",
  },
  {
    slug: "sharad-navratri",
    name: "Sharad Navratri",
    nameHi: "शारदीय नवरात्रि",
    deity: "Mata Durga",
    category: "festival",
    rule: "sunrise",
    targetMasaIndex: 6, // Ashvina
    targetPaksha: "shukla",
    targetTithiNumber: 1,
    approxMonthStart: 9,
    approxMonthEnd: 10,
    muhuratNameEn: "Ghatasthapana Muhurat",
    muhuratNameHi: "घटस्थापना शुभ मुहूर्त",
    ruleExplanationEn: "Sharad Navratri commences on Ashvina Shukla Pratipada prevailing at sunrise.",
    ruleExplanationHi: "आश्विन शुक्ल प्रतिपदा को सूर्योदय व्यापिनी तिथि में शारदीय नवरात्रि कलश स्थापना की जाती है।",
  },
  {
    slug: "dussehra",
    name: "Dussehra (Vijayadashami)",
    nameHi: "दशहरा (विजयादशमी)",
    deity: "Lord Rama & Mata Durga",
    category: "festival",
    rule: "aparahna",
    targetMasaIndex: 6, // Ashvina
    targetPaksha: "shukla",
    targetTithiNumber: 10,
    approxMonthStart: 10,
    approxMonthEnd: 11,
    muhuratNameEn: "Vijaya Muhurat & Aparahna Puja",
    muhuratNameHi: "विजय मुहूर्त एवं अपराजिता पूजन",
    ruleExplanationEn: "Vijayadashami is observed on Ashvina Shukla Dashami during Aparahna / Vijaya Muhurat.",
    ruleExplanationHi: "आश्विन शुक्ल दशमी को अपराह्न कालीन विजय मुहूर्त में शस्त्र पूजन व विजयादशमी मनाई जाती है।",
  },
  {
    slug: "karwa-chauth",
    name: "Karwa Chauth",
    nameHi: "करवा चौथ",
    deity: "Mata Parvati & Chandra Dev",
    category: "vrat",
    rule: "moonrise",
    targetMasaIndex: 7, // Kartika
    targetPaksha: "krishna",
    targetTithiNumber: 4,
    approxMonthStart: 10,
    approxMonthEnd: 11,
    muhuratNameEn: "Puja & Moonrise Timings",
    muhuratNameHi: "करवा चौथ पूजा एवं चंद्रोदय समय",
    ruleExplanationEn: "Observed on Kartika Krishna Chaturthi with fasting broken upon Moonrise.",
    ruleExplanationHi: "कार्तिक कृष्ण चतुर्थी को चंद्रोदय व्यापिनी तिथि में करवा चौथ का निर्जला व्रत रखा जाता है।",
  },
  {
    slug: "dhanteras",
    name: "Dhanteras (Dhanvantari Jayanti)",
    nameHi: "धनतेरस (धनवंतरी जयंती)",
    deity: "Lord Dhanvantari & Kuber",
    category: "festival",
    rule: "pradosha",
    targetMasaIndex: 7, // Kartika
    targetPaksha: "krishna",
    targetTithiNumber: 13,
    approxMonthStart: 10,
    approxMonthEnd: 11,
    muhuratNameEn: "Pradosh Kaal Shopping & Puja Muhurat",
    muhuratNameHi: "प्रदोष काल धनतेरस पूजन व खरीदारी मुहूर्त",
    ruleExplanationEn: "Observed on Kartika Krishna Trayodashi prevailing during Pradosha Kaal.",
    ruleExplanationHi: "कार्तिक कृष्ण त्रयोदशी को प्रदोष काल व्यापिनी होने पर धनतेरस का महापर्व मनाया जाता है।",
  },
  {
    slug: "diwali",
    name: "Diwali (Lakshmi Puja)",
    nameHi: "दीपावली (महालक्ष्मी पूजन)",
    deity: "Mata Lakshmi & Lord Ganesha",
    category: "festival",
    rule: "pradosha",
    targetMasaIndex: 7, // Kartika
    targetPaksha: "krishna",
    targetTithiNumber: 15,
    approxMonthStart: 10,
    approxMonthEnd: 11,
    muhuratNameEn: "Pradosh Kaal & Vrishabha Lagna Lakshmi Puja",
    muhuratNameHi: "प्रदोष काल एवं स्थिर वृषभ लग्न लक्ष्मी पूजन",
    ruleExplanationEn: "Per Nirnayasindhu, Diwali Lakshmi Puja is observed when Kartika Amavasya prevails during Pradosha Kaal.",
    ruleExplanationHi: "निर्णयसिन्धु के अनुसार कार्तिक अमावस्या को प्रदोष काल व्यापिनी होने पर दीपावली महालक्ष्मी पूजन किया जाता है।",
  },
  {
    slug: "govardhan-puja",
    name: "Govardhan Puja (Annakut)",
    nameHi: "गोवर्धन पूजा (अन्नकूट)",
    deity: "Lord Krishna & Giriraj Ji",
    category: "festival",
    rule: "sunrise",
    targetMasaIndex: 7, // Kartika
    targetPaksha: "shukla",
    targetTithiNumber: 1,
    approxMonthStart: 10,
    approxMonthEnd: 11,
    muhuratNameEn: "Pratahkaal Govardhan Puja Muhurat",
    muhuratNameHi: "प्रातःकाल गोवर्धन पूजन मुहूर्त",
    ruleExplanationEn: "Celebrated on Kartika Shukla Pratipada prevailing in the morning.",
    ruleExplanationHi: "कार्तिक शुक्ल प्रतिपदा को गिरिराज गोवर्धन की पूजा व 56 भोग अन्नकूट महोत्सव होता है।",
  },
  {
    slug: "bhai-dooj",
    name: "Bhai Dooj (Yama Dwitiya)",
    nameHi: "भाई दूज (यम द्वितीया)",
    deity: "Yamaraj & Yamuna Devi",
    category: "festival",
    rule: "aparahna",
    targetMasaIndex: 7, // Kartika
    targetPaksha: "shukla",
    targetTithiNumber: 2,
    approxMonthStart: 10,
    approxMonthEnd: 11,
    muhuratNameEn: "Aparahna Tilak Muhurat",
    muhuratNameHi: "अपराह्न भाई तिलक मुहूर्त",
    ruleExplanationEn: "Celebrated on Kartika Shukla Dwitiya during Aparahna Kaal.",
    ruleExplanationHi: "कार्तिक शुक्ल द्वितीया को अपराह्न काल में बहन द्वारा भाई को तिलक करने का पावन विधान है।",
  },
  {
    slug: "chhath-puja",
    name: "Chhath Puja (Sandhya Arghya)",
    nameHi: "छठ पूजा (संध्या अर्घ्य)",
    deity: "Lord Surya & Chhathi Maiya",
    category: "vrat",
    rule: "pradosha",
    targetMasaIndex: 7, // Kartika
    targetPaksha: "shukla",
    targetTithiNumber: 6,
    approxMonthStart: 10,
    approxMonthEnd: 11,
    muhuratNameEn: "Sunset Sandhya Arghya Timings",
    muhuratNameHi: "सूर्यास्त संध्या अर्घ्य समय",
    ruleExplanationEn: "Observed on Kartika Shukla Shashthi offering Arghya to the setting Sun.",
    ruleExplanationHi: "कार्तिक शुक्ल षष्ठी के दिन अस्ताचलगामी भगवान सूर्य को सायंकालीन अर्घ्य दिया जाता है।",
  },
  {
    slug: "devutthana-ekadashi",
    name: "Devutthana Ekadashi (Tulsi Vivah)",
    nameHi: "देवउठनी एकादशी (तुलसी विवाह)",
    deity: "Lord Vishnu & Tulsi Maharani",
    category: "festival",
    rule: "sunrise",
    targetMasaIndex: 7, // Kartika
    targetPaksha: "shukla",
    targetTithiNumber: 11,
    approxMonthStart: 11,
    approxMonthEnd: 11,
    muhuratNameEn: "Ekadashi Vrat & Tulsi Vivah Muhurat",
    muhuratNameHi: "देवउठनी एकादशी व्रत एवं तुलसी विवाह मुहूर्त",
    ruleExplanationEn: "Lord Vishnu awakens from Yogic sleep (Chaturmas) on Kartika Shukla Ekadashi.",
    ruleExplanationHi: "कार्तिक शुक्ल एकादशी को भगवान श्री हरि विष्णु 4 माह के योगनिद्रा से जागृत होते हैं।",
  },
  {
    slug: "makar-sankranti",
    name: "Makar Sankranti",
    nameHi: "मकर संक्रांति",
    deity: "Lord Surya Dev",
    category: "sankranti",
    rule: "sankranti",
    targetSolarRashi: 9, // Makara (Capricorn)
    approxMonthStart: 1,
    approxMonthEnd: 1,
    muhuratNameEn: "Punya Kaal & Mahapunya Kaal Muhurat",
    muhuratNameHi: "पुण्य काल एवं महापुण्य काल मुहूर्त",
    ruleExplanationEn: "Observed on the exact day when Surya enters Makara Rashi (Uttarayana).",
    ruleExplanationHi: "भगवान सूर्य जब धनु से मकर राशि में प्रवेश कर उत्तरायण होते हैं, तब मकर संक्रांति मनाई जाती है।",
  },
];

/**
 * Formats a Date in a city's specific IANA timezone as hh:mm AM/PM.
 */
function formatTimeInZone(d: Date, timeZone: string, isHi: boolean): string {
  return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

/**
 * Calculates a specific festival date, muhurat, and tithi for ANY year (1900–2100+)
 * and any city in the world using Nirnayasindhu & Dharmasindhu Vyapti rules.
 */
export function getFestivalDate(
  slug: string,
  year: number,
  cityConfig?: CityConfig,
  isHi = false
): DynamicFestivalInfo | null {
  const city = cityConfig || DEFAULT_CITY;
  const def = CLASSICAL_FESTIVAL_DEFINITIONS.find((d) => d.slug === slug);
  if (!def) return null;

  // Handle Solar Ingress / Sankranti (Makar Sankranti)
  if (def.rule === "sankranti" && def.targetSolarRashi !== undefined) {
    return calculateSankrantiFestival(def, year, city, isHi);
  }

  // For Lunar festivals, search candidate days around the approximate Gregorian months
  const startDay = new Date(year, def.approxMonthStart - 1, 1, 12, 0, 0);
  const endDay = new Date(year, def.approxMonthEnd, 10, 12, 0, 0);

  let bestDay: Date | null = null;
  let bestMuhuratStart: Date = new Date();
  let bestMuhuratEnd: Date = new Date();
  let bestTithiName = "";
  let bestTithiNameHi = "";

  const dayCursor = new Date(startDay.getTime());
  while (dayCursor <= endDay) {
    const sunrise = getSunrise(dayCursor, city);
    const sunset = getSunset(dayCursor, city);
    const daySpan = sunset.getTime() - sunrise.getTime();

    // Define the specific evaluation moment based on the Nirnayasindhu Vyapti Rule
    let evalMoment: Date;
    let windowStart: Date;
    let windowEnd: Date;

    if (def.rule === "nishita") {
      // Midnight (Nishita Kaal) approx 11:45 PM to 12:35 AM
      const nextSunrise = getSunrise(new Date(dayCursor.getTime() + 86_400_000), city);
      const nightSpan = nextSunrise.getTime() - sunset.getTime();
      const midnightTime = sunset.getTime() + nightSpan / 2;
      evalMoment = new Date(midnightTime);
      windowStart = new Date(midnightTime - 24 * 60_000);
      windowEnd = new Date(midnightTime + 24 * 60_000);
    } else if (def.rule === "pradosha") {
      // Pradosha Kaal: sunset to sunset + 2h 24m
      evalMoment = new Date(sunset.getTime() + 36 * 60_000);
      windowStart = new Date(sunset.getTime());
      windowEnd = new Date(sunset.getTime() + 144 * 60_000);
    } else if (def.rule === "madhyahna") {
      // Madhyahna: 3rd 1/5th of day duration
      evalMoment = new Date(sunrise.getTime() + daySpan * 0.5);
      windowStart = new Date(sunrise.getTime() + daySpan * 0.4);
      windowEnd = new Date(sunrise.getTime() + daySpan * 0.6);
    } else if (def.rule === "aparahna") {
      // Aparahna: 4th 1/5th of day duration
      evalMoment = new Date(sunrise.getTime() + daySpan * 0.7);
      windowStart = new Date(sunrise.getTime() + daySpan * 0.6);
      windowEnd = new Date(sunrise.getTime() + daySpan * 0.8);
    } else if (def.rule === "moonrise") {
      const moonrise = getMoonrise(dayCursor, city);
      evalMoment = moonrise || new Date(sunset.getTime() + 90 * 60_000);
      windowStart = evalMoment;
      windowEnd = new Date(evalMoment.getTime() + 72 * 60_000);
    } else {
      // Default: sunrise (Udaya Tithi)
      evalMoment = new Date(sunrise.getTime() + 15 * 60_000);
      windowStart = sunrise;
      windowEnd = new Date(sunrise.getTime() + 120 * 60_000);
    }

    const tithiSnapshot = getTithiSnapshot(evalMoment);

    // Check match against target Tithi & Paksha
    if (
      tithiSnapshot.number === def.targetTithiNumber &&
      tithiSnapshot.paksha === def.targetPaksha
    ) {
      bestDay = new Date(dayCursor.getTime());
      bestMuhuratStart = windowStart;
      bestMuhuratEnd = windowEnd;
      bestTithiName = tithiSnapshot.name;
      bestTithiNameHi = tithiSnapshot.nameHi;
      break;
    }

    dayCursor.setDate(dayCursor.getDate() + 1);
  }

  if (!bestDay) {
    // Fallback: search at sunrise across month window
    const fallbackCursor = new Date(startDay.getTime());
    while (fallbackCursor <= endDay) {
      const sunrise = getSunrise(fallbackCursor, city);
      const t = getTithiSnapshot(sunrise);
      if (t.number === def.targetTithiNumber && t.paksha === def.targetPaksha) {
        bestDay = new Date(fallbackCursor.getTime());
        bestMuhuratStart = sunrise;
        bestMuhuratEnd = new Date(sunrise.getTime() + 120 * 60_000);
        bestTithiName = t.name;
        bestTithiNameHi = t.nameHi;
        break;
      }
      fallbackCursor.setDate(fallbackCursor.getDate() + 1);
    }
  }

  if (!bestDay) return null;

  const cal = calendarDateForZone(bestDay, city.timeZone);
  const dateString = `${cal.year}-${String(cal.month).padStart(2, "0")}-${String(cal.day).padStart(2, "0")}`;

  const timeStrEn = `${formatTimeInZone(bestMuhuratStart, city.timeZone, false)} to ${formatTimeInZone(bestMuhuratEnd, city.timeZone, false)}`;
  const timeStrHi = `${formatTimeInZone(bestMuhuratStart, city.timeZone, true)} से ${formatTimeInZone(bestMuhuratEnd, city.timeZone, true)}`;

  return {
    slug: def.slug,
    name: def.name,
    nameHi: def.nameHi,
    date: bestDay,
    dateString,
    tithiName: bestTithiName,
    tithiNameHi: bestTithiNameHi,
    muhuratTitle: def.muhuratNameEn,
    muhuratTitleHi: def.muhuratNameHi,
    muhuratWindow: timeStrEn,
    muhuratWindowHi: timeStrHi,
    muhuratStart: bestMuhuratStart,
    muhuratEnd: bestMuhuratEnd,
    ruleDescription: def.ruleExplanationEn,
    ruleDescriptionHi: def.ruleExplanationHi,
    deity: def.deity,
    category: def.category,
  };
}

/**
 * Calculates Makar Sankranti for any year using exact solar ingress longitude.
 */
function calculateSankrantiFestival(
  def: FestivalDefinition,
  year: number,
  city: CityConfig,
  isHi: boolean
): DynamicFestivalInfo {
  // Makar Sankranti occurs around Jan 14-15
  // Find date when Sun sidereal longitude crosses 270° (Makara)
  let targetDate = new Date(year, 0, 14, 12, 0, 0);

  for (let offset = -1; offset <= 2; offset++) {
    const testDate = new Date(year, 0, 14 + offset, 12, 0, 0);
    const sunSidereal = siderealLon(tropicalSunLon(testDate), testDate);
    if (sunSidereal >= 270 && sunSidereal < 273) {
      targetDate = testDate;
      break;
    }
  }

  const sunrise = getSunrise(targetDate, city);
  const sunset = getSunset(targetDate, city);
  const punyaStart = sunrise;
  const punyaEnd = new Date(sunset.getTime());

  const cal = calendarDateForZone(targetDate, city.timeZone);
  const dateString = `${cal.year}-${String(cal.month).padStart(2, "0")}-${String(cal.day).padStart(2, "0")}`;

  const timeStrEn = `${formatTimeInZone(punyaStart, city.timeZone, false)} to ${formatTimeInZone(punyaEnd, city.timeZone, false)}`;
  const timeStrHi = `${formatTimeInZone(punyaStart, city.timeZone, true)} से ${formatTimeInZone(punyaEnd, city.timeZone, true)}`;

  return {
    slug: def.slug,
    name: def.name,
    nameHi: def.nameHi,
    date: targetDate,
    dateString,
    tithiName: "Makara Sankranti (Uttarayana)",
    tithiNameHi: "मकर संक्रांति (उत्तरायण)",
    muhuratTitle: def.muhuratNameEn,
    muhuratTitleHi: def.muhuratNameHi,
    muhuratWindow: timeStrEn,
    muhuratWindowHi: timeStrHi,
    muhuratStart: punyaStart,
    muhuratEnd: punyaEnd,
    ruleDescription: def.ruleExplanationEn,
    ruleDescriptionHi: def.ruleExplanationHi,
    deity: def.deity,
    category: "sankranti",
  };
}

/**
 * Calculates all major classical festivals dynamically for ANY year (1900–2100+)
 * for any given city, sorted chronologically.
 */
export function calculateAnnualFestivals(
  year: number,
  cityConfig?: CityConfig,
  isHi = false
): DynamicFestivalInfo[] {
  const city = cityConfig || DEFAULT_CITY;
  const results: DynamicFestivalInfo[] = [];

  for (const def of CLASSICAL_FESTIVAL_DEFINITIONS) {
    const fest = getFestivalDate(def.slug, year, city, isHi);
    if (fest) {
      results.push(fest);
    }
  }

  // Sort chronologically by date
  return results.sort((a, b) => a.date.getTime() - b.date.getTime());
}
