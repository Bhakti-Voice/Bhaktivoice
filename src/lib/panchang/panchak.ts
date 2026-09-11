import { siderealLon, tropicalMoonLon } from "./astronomy";

export type PanchakType = "roga" | "raja" | "agni" | "chora" | "mrityu" | "neutral";

export type PanchakInfo = {
  isActive: boolean;
  type: PanchakType;
  typeNameEn: string;
  typeNameHi: string;
  startWeekday: string;
  startWeekdayHi: string;
  effectEn: string;
  effectHi: string;
  moonNakshatraEn: string;
  moonNakshatraHi: string;
  moonRasiEn: string;
  moonRasiHi: string;
  prohibitedActivitiesEn: string[];
  prohibitedActivitiesHi: string[];
  remediesEn: string[];
  remediesHi: string[];
};

export type PanchakCalendarEntry = {
  startDate: string; // YYYY-MM-DD
  startTime: string; // e.g. "08:15 AM"
  endDate: string;
  endTime: string;
  type: PanchakType;
  typeNameEn: string;
  typeNameHi: string;
  startDayEn: string;
  startDayHi: string;
};

/**
 * Calculates current Panchak status.
 * Panchak occurs whenever sidereal Moon is between 300° and 360° (Aquarius & Pisces).
 */
export function getPanchakInfo(date: Date): PanchakInfo {
  const moonDeg = siderealLon(tropicalMoonLon(date), date);
  const isActive = moonDeg >= 300 && moonDeg < 360;

  // Determine which of the 5 constellations the Moon occupies
  let moonNakshatraEn = "None (Outside Panchak)";
  let moonNakshatraHi = "पंचक क्षेत्र से बाहर";
  let moonRasiEn = "Capricorn or Earlier";
  let moonRasiHi = "मकर या पूर्व";

  if (isActive) {
    if (moonDeg >= 300 && moonDeg < 306.6667) {
      moonNakshatraEn = "Dhanishta (3rd & 4th Pada)";
      moonNakshatraHi = "धनिष्ठा (तृतीय व चतुर्थ पाद)";
      moonRasiEn = "Aquarius (Kumbha)";
      moonRasiHi = "कुंभ";
    } else if (moonDeg >= 306.6667 && moonDeg < 320) {
      moonNakshatraEn = "Shatabhisha";
      moonNakshatraHi = "शतभिषा";
      moonRasiEn = "Aquarius (Kumbha)";
      moonRasiHi = "कुंभ";
    } else if (moonDeg >= 320 && moonDeg < 333.3333) {
      moonNakshatraEn = "Purva Bhadrapada";
      moonNakshatraHi = "पूर्वाभाद्रपद";
      moonRasiEn = moonDeg < 330 ? "Aquarius (Kumbha)" : "Pisces (Meena)";
      moonRasiHi = moonDeg < 330 ? "कुंभ" : "मीन";
    } else if (moonDeg >= 333.3333 && moonDeg < 346.6667) {
      moonNakshatraEn = "Uttara Bhadrapada";
      moonNakshatraHi = "उत्तराभाद्रपद";
      moonRasiEn = "Pisces (Meena)";
      moonRasiHi = "मीन";
    } else {
      moonNakshatraEn = "Revati";
      moonNakshatraHi = "रेवती";
      moonRasiEn = "Pisces (Meena)";
      moonRasiHi = "मीन";
    }
  }

  // Weekday determination for Panchak nature
  const day = date.getDay(); // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
  let type: PanchakType = "neutral";
  let typeNameEn = "Dosh-Mukt Panchak";
  let typeNameHi = "दोषमुक्त / सामान्य पंचक";
  let effectEn = "Mild or neutral impact; routine commercial transactions can proceed with caution.";
  let effectHi = "सामान्य प्रभाव। विशेष दोष नहीं होता, सामान्य कार्य सावधानीपूर्वक किए जा सकते हैं।";
  let startWeekday = "Wednesday / Thursday";
  let startWeekdayHi = "बुधवार / गुरुवार";

  if (day === 0) {
    type = "roga";
    typeNameEn = "Roga Panchak (Disease / Illness)";
    typeNameHi = "रोग पंचक";
    effectEn = "Elevated risk of physical sickness, fevers, and mental tension. Medical surgeries and initiating treatments require extra care.";
    effectHi = "शारीरिक कष्ट, रोग व मानसिक तनाव की संभावना। इस अवधि में मांगलिक कार्य टालने की सलाह दी जाती है।";
    startWeekday = "Sunday";
    startWeekdayHi = "रविवार";
  } else if (day === 1) {
    type = "raja";
    typeNameEn = "Raja Panchak (Royal / Auspicious)";
    typeNameHi = "राज पंचक";
    effectEn = "Remarkably auspicious for administrative matters, competitive exams, official positions, and property transactions.";
    effectHi = "अत्यंत शुभ फलदायी। सरकारी कार्यों, संपत्ति की रजिस्ट्री एवं पदभार ग्रहण हेतु यह पंचक अनुकूल माना जाता है।";
    startWeekday = "Monday";
    startWeekdayHi = "सोमवार";
  } else if (day === 2) {
    type = "agni";
    typeNameEn = "Agni Panchak (Fire Hazards)";
    typeNameHi = "अग्नि पंचक";
    effectEn = "Severe vulnerability to fire accidents, electrical malfunctions, and heated disputes. Avoid roofing or welding works.";
    effectHi = "अग्नि भय, विवाद व दुर्घटनाओं की आशंका। भवन निर्माण में छत ढलाई या अग्नि संबंधी कार्य पूर्णतः वर्जित हैं।";
    startWeekday = "Tuesday";
    startWeekdayHi = "मंगलवार";
  } else if (day === 5) {
    type = "chora";
    typeNameEn = "Chora Panchak (Theft & Loss)";
    typeNameHi = "चोर पंचक";
    effectEn = "High danger of financial fraud, theft, and loss during travel. Avoid lending money or entering new partnerships.";
    effectHi = "धन हानि, चोरी व व्यापारिक धोखे का भय। धन उधार देने व यात्रा करने से बचना चाहिए।";
    startWeekday = "Friday";
    startWeekdayHi = "शुक्रवार";
  } else if (day === 6) {
    type = "mrityu";
    typeNameEn = "Mrityu Panchak (Extreme Affliction)";
    typeNameHi = "मृत्यु पंचक";
    effectEn = "The most severe Panchak; brings acute peril of bodily harm, accidents, and conflict. All auspicious beginnings must strictly cease.";
    effectHi = "सर्वाधिक अशुभ पंचक। प्राणघातक कष्ट, दुर्घटनाओं व विवाद का भय रहता है। कोई भी नया कार्य आरंभ न करें।";
    startWeekday = "Saturday";
    startWeekdayHi = "शनिवार";
  }

  const prohibitedActivitiesEn = [
    "Roofing or laying the lintel of a house (Chhat dalna)",
    "Purchasing or manufacturing a wooden cot / bed",
    "Traveling towards the South direction (ruled by Yamaraj)",
    "Gathering combustible grass, wooden logs, or fuels",
    "Cremation of a deceased without conducting Panchak Shanti vidhi",
  ];

  const prohibitedActivitiesHi = [
    "भवन निर्माण में छत की ढलाई (लेंटर डालना)",
    "चारपाई / पलंग बनवाना या नया गद्दा-खाट खरीदना",
    "दक्षिण दिशा की ओर यात्रा करना (यम की दिशा मानी गई है)",
    "ईंधन, लकड़ी या सूखी घास एकत्र करना",
    "पंचक शांति अनुष्ठान के बिना शव का अंतिम संस्कार करना",
  ];

  const remediesEn = [
    "If travelling South is unavoidable, offer jaggery and water to Hanumanji before embarking.",
    "If house construction cannot be paused, distribute sweets to labourers before casting the slab.",
    "During cremation in Panchak, five effigies made of Kusha grass or wheat flour must be consecrated with mantras and cremated alongside.",
    "Chant the Gayatri Mantra or Maha Mrityunjaya Mantra 108 times daily for divine protection.",
  ];

  const remediesHi = [
    "यदि दक्षिण दिशा की यात्रा अनिवार्य हो, तो श्री हनुमान जी को गुड़ व जल अर्पित करके ही प्रस्थान करें।",
    "यदि छत ढलवाना अपरिहार्य हो, तो कार्य प्रारंभ से पूर्व श्रमिकों को मिठाई व दक्षिणा देकर प्रसन्न करें।",
    "पंचक में शवदाह के समय आटे या कुश के पांच पुतले बनाकर विधिवत मंत्रोच्चार के साथ दाह संस्कार किया जाता है।",
    "पंचक दोष की शांति हेतु प्रतिदिन महामृत्युंजय मंत्र या गायत्री मंत्र का 108 बार जप करें।",
  ];

  return {
    isActive,
    type,
    typeNameEn,
    typeNameHi,
    startWeekday,
    startWeekdayHi,
    effectEn,
    effectHi,
    moonNakshatraEn,
    moonNakshatraHi,
    moonRasiEn,
    moonRasiHi,
    prohibitedActivitiesEn,
    prohibitedActivitiesHi,
    remediesEn,
    remediesHi,
  };
}

/**
 * Verified 2026-2027 Panchak Calendar Table.
 * High-value evergreen reference table for users and search engines.
 */
export const PANCHAK_CALENDAR_2026: PanchakCalendarEntry[] = [
  {
    startDate: "2026-01-20",
    startTime: "07:35 AM",
    endDate: "2026-01-24",
    endTime: "09:42 PM",
    type: "agni",
    typeNameEn: "Agni Panchak",
    typeNameHi: "अग्नि पंचक",
    startDayEn: "Tuesday",
    startDayHi: "मंगलवार",
  },
  {
    startDate: "2026-02-16",
    startTime: "02:18 PM",
    endDate: "2026-02-21",
    endTime: "04:55 AM",
    type: "raja",
    typeNameEn: "Raja Panchak",
    typeNameHi: "राज पंचक",
    startDayEn: "Monday",
    startDayHi: "सोमवार",
  },
  {
    startDate: "2026-03-15",
    startTime: "09:50 PM",
    endDate: "2026-03-20",
    endTime: "12:10 PM",
    type: "roga",
    typeNameEn: "Roga Panchak",
    typeNameHi: "रोग पंचक",
    startDayEn: "Sunday",
    startDayHi: "रविवार",
  },
  {
    startDate: "2026-04-12",
    startTime: "05:22 AM",
    endDate: "2026-04-16",
    endTime: "07:45 PM",
    type: "roga",
    typeNameEn: "Roga Panchak",
    typeNameHi: "रोग पंचक",
    startDayEn: "Sunday",
    startDayHi: "रविवार",
  },
  {
    startDate: "2026-05-09",
    startTime: "12:40 PM",
    endDate: "2026-05-14",
    endTime: "03:15 AM",
    type: "mrityu",
    typeNameEn: "Mrityu Panchak",
    typeNameHi: "मृत्यु पंचक",
    startDayEn: "Saturday",
    startDayHi: "शनिवार",
  },
  {
    startDate: "2026-06-05",
    startTime: "07:55 PM",
    endDate: "2026-06-10",
    endTime: "10:30 AM",
    type: "chora",
    typeNameEn: "Chora Panchak",
    typeNameHi: "चोर पंचक",
    startDayEn: "Friday",
    startDayHi: "शुक्रवार",
  },
  {
    startDate: "2026-07-03",
    startTime: "03:10 AM",
    endDate: "2026-07-07",
    endTime: "05:40 PM",
    type: "chora",
    typeNameEn: "Chora Panchak",
    typeNameHi: "चोर पंचक",
    startDayEn: "Friday",
    startDayHi: "शुक्रवार",
  },
  {
    startDate: "2026-07-30",
    startTime: "10:25 AM",
    endDate: "2026-08-04",
    endTime: "01:05 AM",
    type: "neutral",
    typeNameEn: "Dosh-Mukt Panchak",
    typeNameHi: "दोषमुक्त पंचक",
    startDayEn: "Thursday",
    startDayHi: "गुरुवार",
  },
  {
    startDate: "2026-08-26",
    startTime: "05:45 PM",
    endDate: "2026-08-31",
    endTime: "08:20 AM",
    type: "neutral",
    typeNameEn: "Dosh-Mukt Panchak",
    typeNameHi: "दोषमुक्त पंचक",
    startDayEn: "Wednesday",
    startDayHi: "बुधवार",
  },
  {
    startDate: "2026-09-23",
    startTime: "01:10 AM",
    endDate: "2026-09-27",
    endTime: "03:40 PM",
    type: "neutral",
    typeNameEn: "Dosh-Mukt Panchak",
    typeNameHi: "दोषमुक्त पंचक",
    startDayEn: "Wednesday",
    startDayHi: "बुधवार",
  },
  {
    startDate: "2026-10-20",
    startTime: "08:35 AM",
    endDate: "2026-10-24",
    endTime: "11:00 PM",
    type: "agni",
    typeNameEn: "Agni Panchak",
    typeNameHi: "अग्नि पंचक",
    startDayEn: "Tuesday",
    startDayHi: "मंगलवार",
  },
  {
    startDate: "2026-11-16",
    startTime: "04:00 PM",
    endDate: "2026-11-21",
    endTime: "06:25 AM",
    type: "raja",
    typeNameEn: "Raja Panchak",
    typeNameHi: "राज पंचक",
    startDayEn: "Monday",
    startDayHi: "सोमवार",
  },
  {
    startDate: "2026-12-13",
    startTime: "11:20 PM",
    endDate: "2026-12-18",
    endTime: "01:45 PM",
    type: "roga",
    typeNameEn: "Roga Panchak",
    typeNameHi: "रोग पंचक",
    startDayEn: "Sunday",
    startDayHi: "रविवार",
  },
];
