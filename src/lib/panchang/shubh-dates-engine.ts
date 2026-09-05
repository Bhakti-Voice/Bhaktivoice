import { getPanchang, getMonthCalendar } from "./engine";
import { DEFAULT_CITY, getCityById, type CityConfig } from "./cities";
import { NAKSHATRA_NAMES, NAKSHATRA_NAMES_HI, TITHI_NAMES, TITHI_NAMES_HI } from "./names";
import type { DayPanchang } from "./types";

export type ShubhDatesCategory =
  | "vehicle-purchase"
  | "property-purchase"
  | "griha-pravesh"
  | "vivah-muhurat"
  | "naamkaran"
  | "mundan";

export interface ShubhDayDetail {
  date: Date;
  dateString: string; // YYYY-MM-DD
  dayNumber: number;
  weekdayNameEn: string;
  weekdayNameHi: string;
  isAuspicious: boolean;
  statusMessageEn: string;
  statusMessageHi: string;
  muhuratWindowEn?: string;
  muhuratWindowHi?: string;
  tithiNameEn: string;
  tithiNameHi: string;
  nakshatraNameEn: string;
  nakshatraNameHi: string;
  reasonsInauspiciousEn?: string;
  reasonsInauspiciousHi?: string;
}

export interface ShubhMonthCalendar {
  year: number;
  month: number; // 1 - 12
  monthNameEn: string;
  monthNameHi: string;
  shubhDaysCount: number;
  days: ShubhDayDetail[];
  category: ShubhDatesCategory;
}

// Classical Vedic parameters for Vehicle Purchase:
// Auspicious Nakshatras: Ashwini, Rohini, Mrigashira, Punarvasu, Pushya, Hasta, Chitra, Swati, Anuradha, Shravana, Dhanishta, Shatabhisha, Revati
const VEHICLE_SHUBH_NAKSHATRAS = new Set([
  0,  // Ashwini
  3,  // Rohini
  4,  // Mrigashira
  6,  // Punarvasu
  7,  // Pushya
  12, // Hasta
  13, // Chitra
  14, // Swati
  16, // Anuradha
  21, // Shravana
  22, // Dhanishta
  23, // Shatabhisha
  26, // Revati
]);

// Inauspicious days for buying vehicles: Tuesday, Saturday (traditionally avoided due to aggressive Mars & delay-causing Saturn energies)
const VEHICLE_PROHIBITED_WEEKDAYS = new Set([2, 6]); // 2 = Tuesday, 6 = Saturday

// Auspicious Tithis: Pratipada, Dwitiya, Tritiya, Panchami, Shashthi, Ashtami, Dashami, Ekadashi, Trayodashi, Purnima
// Avoid: Chaturthi (Rikta), Navami (Rikta), Chaturdashi (Rikta), Amavasya (Pitri)
const PROHIBITED_TITHIS = new Set([
  4,  // Chaturthi
  9,  // Navami
  14, // Chaturdashi
  30, // Amavasya
]);

// Classical Property Purchase Nakshatras:
// Rohini, Mrigashira, Punarvasu, Magha, Uttara Phalguni, Hasta, Anuradha, Mula, Uttara Ashadha, Shravana, Uttara Bhadrapada, Revati
const PROPERTY_SHUBH_NAKSHATRAS = new Set([
  3,  // Rohini
  4,  // Mrigashira
  6,  // Punarvasu
  9,  // Magha
  11, // Uttara Phalguni
  12, // Hasta
  16, // Anuradha
  18, // Mula
  20, // Uttara Ashadha
  21, // Shravana
  25, // Uttara Bhadrapada
  26, // Revati
]);

// Griha Pravesh Auspicious Nakshatras:
// Rohini, Mrigashira, Uttara Phalguni, Chitra, Anuradha, Uttara Ashadha, Shravana, Dhanishta, Shatabhisha, Uttara Bhadrapada, Revati
const GRIHA_PRAVESH_NAKSHATRAS = new Set([
  3,  // Rohini
  4,  // Mrigashira
  11, // Uttara Phalguni
  13, // Chitra
  16, // Anuradha
  20, // Uttara Ashadha
  21, // Shravana
  22, // Dhanishta
  23, // Shatabhisha
  25, // Uttara Bhadrapada
  26, // Revati
]);

// Vivah (Marriage) Auspicious Nakshatras:
// Rohini, Mrigashira, Magha, Uttara Phalguni, Hasta, Swati, Anuradha, Mula, Uttara Ashadha, Uttara Bhadrapada, Revati
const VIVAH_NAKSHATRAS = new Set([
  3, 4, 9, 11, 12, 14, 16, 18, 20, 25, 26,
]);

/**
 * Computes calendar-wise Shubh Dates with day-by-day evaluation matching Drik Panchang's calendar table structure
 */
/**
 * Fast direct calculation of Tithi, Nakshatra, and Sun Sign for high-performance static page generation
 */
import {
  tropicalSunLon,
  tropicalMoonLon,
  siderealLon,
  NAKSHATRA_SPAN,
  tithiIndex,
  sunRasi,
  getSunrise,
  getSunset,
} from "./astronomy";
import { MONTH_NAMES_EN, MONTH_NAMES_HI, VARA_NAMES, VARA_NAMES_HI } from "./names";

export function calculateShubhDatesMonth(
  year: number,
  month: number,
  category: ShubhDatesCategory = "vehicle-purchase",
  city: CityConfig = DEFAULT_CITY
): ShubhMonthCalendar {
  const totalDays = new Date(year, month, 0).getDate();
  const days: ShubhDayDetail[] = [];
  let shubhDaysCount = 0;

  for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
    // 06:00 AM approximation for sunrise baseline
    const approxSunrise = new Date(year, month - 1, dayNum, 6, 0, 0);
    const weekday = approxSunrise.getDay();

    // Fast Tithi calculation
    const tIndex = tithiIndex(approxSunrise);
    const tithiPaksha = tIndex < 15 ? "shukla" : "krishna";
    const tithiNum = (tIndex % 15) + 1;
    const isPurnima = tithiPaksha === "shukla" && tithiNum === 15;
    const isAmavasya = tithiPaksha === "krishna" && tithiNum === 15;
    const tithiNameEn = isPurnima ? "Purnima" : isAmavasya ? "Amavasya" : TITHI_NAMES[tithiNum - 1];
    const tithiNameHi = isPurnima ? "पूर्णिमा" : isAmavasya ? "अमावस्या" : TITHI_NAMES_HI[tithiNum - 1];

    // Fast Nakshatra calculation
    const moonSidereal = siderealLon(tropicalMoonLon(approxSunrise), approxSunrise);
    const nakshatraIdx = Math.min(26, Math.floor(moonSidereal / NAKSHATRA_SPAN));
    const nakshatraNameEn = NAKSHATRA_NAMES[nakshatraIdx];
    const nakshatraNameHi = NAKSHATRA_NAMES_HI[nakshatraIdx];

    // Fast Sun Rasi
    const sunR = sunRasi(approxSunrise);

    let isAuspicious = false;
    let statusMessageEn = "";
    let statusMessageHi = "";
    let reasonsInauspiciousEn = "";
    let reasonsInauspiciousHi = "";
    let muhuratWindowEn = "";
    let muhuratWindowHi = "";

    if (category === "vehicle-purchase") {
      if (VEHICLE_PROHIBITED_WEEKDAYS.has(weekday)) {
        statusMessageEn = "Prohibited Weekday for Vehicle Purchase";
        statusMessageHi = "वाहन क्रय हेतु वर्जित वार (मंगलवार/शनिवार)";
        reasonsInauspiciousEn = `${VARA_NAMES[weekday]} is conventionally avoided for motor vehicle deliveries due to Mars/Saturn friction.`;
        reasonsInauspiciousHi = `${VARA_NAMES_HI[weekday]} वाहन क्रय हेतु निषिद्ध माना जाता है।`;
      } else if (PROHIBITED_TITHIS.has(tithiNum) || isAmavasya) {
        statusMessageEn = "Prohibited Tithi (Rikta or Amavasya)";
        statusMessageHi = "रिक्ता अथवा अमावस्या तिथि (वर्जित)";
        reasonsInauspiciousEn = `Tithi ${tithiNameEn} belongs to Rikta (4, 9, 14) or Pitri Amavasya, unsuitable for vehicle acquisition.`;
        reasonsInauspiciousHi = `${tithiNameHi} रिक्ता या अमावस्या तिथि होने के कारण शुभ नहीं है।`;
      } else if (!VEHICLE_SHUBH_NAKSHATRAS.has(nakshatraIdx)) {
        statusMessageEn = "Auspicious Nakshatra not Available";
        statusMessageHi = "शुभ नक्षत्र उपलब्ध नहीं है";
        reasonsInauspiciousEn = `${nakshatraNameEn} is not among the auspicious stars prescribed in classical Muhurat treatises.`;
        reasonsInauspiciousHi = `${nakshatraNameHi} वाहन क्रय के लिए अनुकूल नक्षत्र नहीं है।`;
      } else {
        isAuspicious = true;
        shubhDaysCount++;
        statusMessageEn = "Auspicious Vehicle Purchase Muhurat is Available";
        statusMessageHi = "वाहन क्रय हेतु अति शुभ मुहूर्त उपलब्ध है";
        muhuratWindowEn = "06:45 AM to 05:30 PM (Avoid Rahu Kaal window)";
        muhuratWindowHi = "प्रातः 06:45 से सायं 05:30 तक (दैनिक राहुकाल त्यागें)";
      }
    } else if (category === "property-purchase") {
      if (PROHIBITED_TITHIS.has(tithiNum) || isAmavasya) {
        statusMessageEn = "Rikta Tithi - Inauspicious for Property Registration";
        statusMessageHi = "रिक्ता तिथि - रजिस्ट्री हेतु वर्जित";
      } else if (!PROPERTY_SHUBH_NAKSHATRAS.has(nakshatraIdx)) {
        statusMessageEn = "Auspicious Fixed/Gentle Nakshatra Not Available";
        statusMessageHi = "स्थिर या सौम्य नक्षत्र उपलब्ध नहीं";
      } else {
        isAuspicious = true;
        shubhDaysCount++;
        statusMessageEn = "Auspicious Property Registration Muhurat Available";
        statusMessageHi = "भूमि, भवन व संपत्ति रजिस्ट्री का शुभ मुहूर्त";
        muhuratWindowEn = "09:15 AM to 04:30 PM";
        muhuratWindowHi = "प्रातः 09:15 से सायं 04:30 तक";
      }
    } else if (category === "griha-pravesh") {
      if (sunR.index === 11 || sunR.index === 8) { // Pisces or Sagittarius = Kharmas
        statusMessageEn = "Kharmas / Malmas - Griha Pravesh Prohibited";
        statusMessageHi = "खरमास / मलमास - गृह प्रवेश वर्जित";
      } else if (weekday === 2 || weekday === 0) { // Tuesday & Sunday avoided for Griha Pravesh
        statusMessageEn = "Prohibited Weekday (Tuesday/Sunday) for Housewarming";
        statusMessageHi = "गृह प्रवेश हेतु वर्जित वार (मंगलवार/रविवार)";
      } else if (!GRIHA_PRAVESH_NAKSHATRAS.has(nakshatraIdx)) {
        statusMessageEn = "Auspicious Sthira Nakshatra Not Available";
        statusMessageHi = "स्थिर नक्षत्र उपलब्ध नहीं";
      } else {
        isAuspicious = true;
        shubhDaysCount++;
        statusMessageEn = "Auspicious Griha Pravesh Muhurat is Available";
        statusMessageHi = "गृह प्रवेश एवं वास्तु शांति हेतु शुभ मुहूर्त";
        muhuratWindowEn = "06:15 AM to 11:45 AM (Brahma & Abhijit Muhurat)";
        muhuratWindowHi = "प्रातः 06:15 से 11:45 तक (अभिजित एवं स्थिर लग्न)";
      }
    } else if (category === "vivah-muhurat") {
      // Chatrumas (months roughly July to Nov) or Kharmas
      const isChaturmas = month >= 7 && month <= 10;
      if (isChaturmas || sunR.index === 11 || sunR.index === 8) {
        statusMessageEn = "Devshayani / Chaturmas or Kharmas - Marriages Inauspicious";
        statusMessageHi = "देवशयनी चतुर्मास / खरमास - विवाह संस्कार वर्जित";
      } else if (!VIVAH_NAKSHATRAS.has(nakshatraIdx)) {
        statusMessageEn = "Auspicious Vivah Nakshatra Not Available";
        statusMessageHi = "शुभ विवाह नक्षत्र उपलब्ध नहीं";
      } else if (PROHIBITED_TITHIS.has(tithiNum) || isAmavasya) {
        statusMessageEn = "Prohibited Tithi for Sacred Matrimony";
        statusMessageHi = "विवाह हेतु निषिद्ध तिथि";
      } else {
        isAuspicious = true;
        shubhDaysCount++;
        statusMessageEn = "Auspicious Vivah Muhurat Available";
        statusMessageHi = "पाणिग्रहण एवं शुभ विवाह का मंगल मुहूर्त";
        muhuratWindowEn = "Evening Godhuli & Nishita Muhurat (Lagna Shuddhi)";
        muhuratWindowHi = "सायं गोधूलि एवं रात्रि निशीथ लग्न में";
      }
    } else {
      // Default general Shubh Muhurat (Naamkaran, Mundan, etc.)
      if (!PROHIBITED_TITHIS.has(tithiNum) && !isAmavasya && weekday !== 2) {
        isAuspicious = true;
        shubhDaysCount++;
        statusMessageEn = "Auspicious Timings Available";
        statusMessageHi = "शुभ मुहूर्त उपलब्ध";
        muhuratWindowEn = "Daytime Auspicious Choghadiya & Abhijit";
        muhuratWindowHi = "दिन का शुभ चौघड़िया एवं अभिजित मुहूर्त";
      } else {
        statusMessageEn = "Inauspicious Period";
        statusMessageHi = "अशुभ समय";
      }
    }

    days.push({
      date: approxSunrise,
      dateString: `${year}-${String(month).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`,
      dayNumber: dayNum,
      weekdayNameEn: VARA_NAMES[weekday],
      weekdayNameHi: VARA_NAMES_HI[weekday],
      isAuspicious,
      statusMessageEn,
      statusMessageHi,
      muhuratWindowEn: isAuspicious ? muhuratWindowEn : undefined,
      muhuratWindowHi: isAuspicious ? muhuratWindowHi : undefined,
      tithiNameEn: `${tithiNameEn} (${tithiPaksha === "shukla" ? "Shukla" : "Krishna"})`,
      tithiNameHi: `${tithiNameHi} (${tithiPaksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})`,
      nakshatraNameEn,
      nakshatraNameHi,
      reasonsInauspiciousEn: !isAuspicious ? reasonsInauspiciousEn : undefined,
      reasonsInauspiciousHi: !isAuspicious ? reasonsInauspiciousHi : undefined,
    });
  }

  return {
    year,
    month,
    monthNameEn: MONTH_NAMES_EN[month - 1],
    monthNameHi: MONTH_NAMES_HI[month - 1],
    shubhDaysCount,
    days,
    category,
  };
}

/** Precomputes all 12 months for a given year */
export function calculateShubhDatesYear(
  year: number,
  category: ShubhDatesCategory = "vehicle-purchase",
  city: CityConfig = DEFAULT_CITY
): ShubhMonthCalendar[] {
  const result: ShubhMonthCalendar[] = [];
  for (let m = 1; m <= 12; m++) {
    result.push(calculateShubhDatesMonth(year, m, category, city));
  }
  return result;
}

export const SHUBH_CATEGORIES_CONFIG: Record<
  ShubhDatesCategory,
  {
    slug: string;
    titleEn: string;
    titleHi: string;
    metaTitleEn: string;
    metaTitleHi: string;
    metaDescEn: string;
    metaDescHi: string;
    introEn: string;
    introHi: string;
    deityEn: string;
    deityHi: string;
    mantraEn: string;
    mantraHi: string;
    guidelinesEn: string[];
    guidelinesHi: string[];
    faqsEn: { q: string; a: string }[];
    faqsHi: { q: string; a: string }[];
  }
> = {
  "vehicle-purchase": {
    slug: "vehicle-purchase",
    titleEn: "Vehicle Purchase Muhurat 2026",
    titleHi: "वाहन क्रय शुभ मुहूर्त 2026 (कार व बाइक)",
    metaTitleEn: "Vehicle Purchase Muhurat 2026 — Auspicious Dates to Buy Car & Bike | Month-wise Calendar",
    metaTitleHi: "वाहन क्रय शुभ मुहूर्त 2026 — कार एवं बाइक खरीदने की शुभ तिथियाँ एवं पंचांग",
    metaDescEn: "Comprehensive 2026 vehicle buying calendar with auspicious date-by-date Muhurat timings for car, bike, and commercial automobiles based on authentic Vedic astrology.",
    metaDescHi: "वर्ष 2026 में नई कार, बाइक या वाहन खरीदने के लिए प्रामाणिक शुभ मुहूर्त कैलेंडर। तिथि, नक्षत्र, चौघड़िया एवं शास्त्रोक्त नियमों के साथ विस्तृत सूची।",
    introEn: "Buying a vehicle is a major milestone representing movement, safety, and prosperity. In Vedic astrology, automobiles fall under the celestial domain of Shukra (Venus) for luxury and comfort, and Mangala (Mars) for mechanical energy. Choosing a Shubh Muhurat ensures vehicle longevity, accident prevention, and auspicious travels for your family.",
    introHi: "नवीन वाहन क्रय करना जीवन की एक महत्वपूर्ण उपलब्धि है जो गति, सुरक्षा और समृद्धि का प्रतीक है। वैदिक ज्योतिष में वाहन का कारक ग्रह शुक्र (सुख-सुविधा) एवं मंगल (यांत्रिक शक्ति) है। शास्त्र सम्मत शुभ मुहूर्त में वाहन क्रय करने से यात्राएँ निर्विघ्न, सुरक्षित और कल्याणकारी होती हैं।",
    deityEn: "Lord Ganesha & Lord Vishwakarma",
    deityHi: "भगवान श्री गणेश एवं देवशिल्पी विश्वकर्मा",
    mantraEn: "Om Shri Vishwakarmaaya Namah • Om Gam Ganapataye Namah",
    mantraHi: "ॐ श्री विश्वकर्मणे नमः • ॐ गं गणपतये नमः",
    guidelinesEn: [
      "Favor Sunday, Monday, Wednesday, Thursday, or Friday for taking delivery.",
      "Avoid Tuesdays and Saturdays for financial transaction and primary delivery.",
      "Steer clear of Rikta Tithis (Chaturthi, Navami, Chaturdashi) and Amavasya.",
      "Draw a Swastika with kumkum and sandal paste on the vehicle's bonnet before taking it home.",
      "Break a coconut in front of the vehicle and offer sweets to the divine at a temple."
    ],
    guidelinesHi: [
      "सोमवार, बुधवार, गुरुवार, शुक्रवार एवं रविवार को वाहन की डिलीवरी लेना अत्यंत शुभ है।",
      "मंगलवार एवं शनिवार को वाहन क्रय व प्रथम डिलीवरी से बचना चाहिए।",
      "रिक्ता तिथियों (चतुर्थी, नवमी, चतुर्दशी) और अमावस्या का त्याग करें।",
      "वाहन के बोनट पर रोली व चंदन से स्वस्तिक चिन्ह अंकित करें।",
      "वाहन के समक्ष श्रीफल (नारियल) फोड़कर भगवान श्री गणेश का स्मरण करें।"
    ],
    faqsEn: [
      {
        q: "Why is Tuesday avoided for buying vehicles?",
        a: "Tuesday is governed by Mars (Mangala), a planet associated with aggression, iron friction, and combustion. Traditional texts suggest avoiding Tuesday deliveries to prevent accidental tendencies and unexpected repair costs."
      },
      {
        q: "Can I book a vehicle on an inauspicious day if delivery is taken on a Shubh Muhurat?",
        a: "Booking can be done on regular days, but the final financial transaction, key handover, and road-driving should strictly coincide with the prescribed Shubh Muhurat window."
      },
      {
        q: "Which Nakshatras are best for purchasing a new car?",
        a: "Chara (Movable) and Laghu (Light) Nakshatras like Punarvasu, Swati, Shravana, Dhanishta, Shatabhisha, Rohini, and Pushya are hailed as the finest stars for vehicle purchase."
      }
    ],
    faqsHi: [
      {
        q: "मंगलवार को नया वाहन खरीदना क्यों वर्जित माना जाता है?",
        a: "मंगलवार के अधिपति मंगल देव हैं जो उग्रता और अग्नि तत्व के कारक हैं। अतः वाहन में दुर्घटना परिहार और कल-पुर्जों की सुरक्षा हेतु मंगलवार को डिलीवरी टालने का विधान है।"
      },
      {
        q: "क्या अशुभ दिन बुकिंग करके शुभ मुहूर्त में डिलीवरी ली जा सकती है?",
        a: "हाँ, सामान्य बुकिंग किसी भी दिन की जा सकती है, किंतु पूर्ण भुगतान, चाबी प्राप्ति और वाहन का प्रथम संचालन शुभ मुहूर्त में ही होना चाहिए।"
      },
      {
        q: "कार या बाइक के लिए कौन-से नक्षत्र सर्वोत्तम हैं?",
        a: "पुनर्वसु, स्वाती, श्रवण, धनिष्ठा, शतभिषा, रोहिणी, मृगशिरा और पुष्य नक्षत्र वाहन क्रय के लिए अति उत्तम माने गए हैं।"
      }
    ]
  },
  "property-purchase": {
    slug: "property-purchase",
    titleEn: "Property Purchase & Registry Muhurat 2026",
    titleHi: "संपत्ति एवं भूमि रजिस्ट्री शुभ मुहूर्त 2026",
    metaTitleEn: "Property Purchase Muhurat 2026 — Auspicious Dates for Land & Flat Registry",
    metaTitleHi: "प्रॉपर्टी खरीद एवं रजिस्ट्री शुभ मुहूर्त 2026 — भूमि व मकान के श्रेष्ठ मुहूर्त",
    metaDescEn: "Auspicious dates and timings for property purchase, land acquisition, flat registration, and plot agreement in 2026 based on Vedic ephemeris.",
    metaDescHi: "भूमि, मकान, फ्लैट और भूखंड क्रय तथा रजिस्ट्री के वर्ष 2026 के सम्पूर्ण शुभ मुहूर्त। शास्त्रीय पंचांग गणना एवं तिथिवार तालिका।",
    introEn: "Investing in real estate or registering immovable property requires celestial stability. Classical texts evaluate Bhoomi Karaka Mars and Sthira (Fixed) constellations to ensure the asset brings perpetual generational wealth and peace.",
    introHi: "भूमि, भवन या अचल संपत्ति का क्रय जीवन का सबसे बड़ा निवेश होता है। भूमिपुत्र मंगल और स्थिर नक्षत्रों की कृपा से खरीदी गई संपत्ति वंश वृद्धि और स्थाई समृद्धि प्रदान करती है।",
    deityEn: "Bhumi Devi & Lord Varaha",
    deityHi: "भूदेवी एवं भगवान श्री वराह",
    mantraEn: "Om Namo Bhagavate Varaha-roopaya Bhoomi-dharanaaya Svaha",
    mantraHi: "ॐ नमो भगवते वराहरूपाय भूमिधारणाय स्वाहा",
    guidelinesEn: [
      "Select Sthira (Fixed) and Chara Nakshatras for everlasting asset appreciation.",
      "Avoid property registrations during Eclipse (Grahan) and Pitru Paksha.",
      "Conduct Bhoomi Pujan on northeast (Ishanya) corner before commencing any foundation."
    ],
    guidelinesHi: [
      "दीर्घकालिक लाभ के लिए स्थिर नक्षत्रों (रोहिणी, उत्तराफाल्गुनी आदि) का चयन करें।",
      "ग्रहण काल और पितृपक्ष में रजिस्ट्री कराने से बचें।",
      "नींव खुदाई से पूर्व ईशान कोण में भू-पूजन अवश्य संपन्न करें।"
    ],
    faqsEn: [
      {
        q: "Which day is best for property registration?",
        a: "Thursday, Friday, and Monday under auspicious Tithis like Dwitiya, Tritiya, Panchami, Saptami, and Dashami are highly praised."
      }
    ],
    faqsHi: [
      {
        q: "प्रॉपर्टी की रजिस्ट्री के लिए कौन-सा वार सबसे अच्छा है?",
        a: "गुरुवार, शुक्रवार और सोमवार को शुभ तिथियों में की गई रजिस्ट्री अत्यंत कल्याणकारी होती है।"
      }
    ]
  },
  "griha-pravesh": {
    slug: "griha-pravesh",
    titleEn: "Griha Pravesh Muhurat 2026",
    titleHi: "गृह प्रवेश एवं वास्तु शांति मुहूर्त 2026",
    metaTitleEn: "Griha Pravesh Muhurat 2026 — Auspicious Dates for Housewarming Ceremony",
    metaTitleHi: "गृह प्रवेश शुभ मुहूर्त 2026 — नए घर में प्रवेश एवं वास्तु शांति तिथियाँ",
    metaDescEn: "Detailed Griha Pravesh dates for 2026. Discover auspicious timings for Apoorva, Sapoorva, and Dwandhava housewarming ceremonies with Vastu Shuddhi.",
    metaDescHi: "वर्ष 2026 के संपूर्ण गृह प्रवेश शुभ मुहूर्त। अपूर्व, सपूर्व एवं द्वंद्व गृह प्रवेश की शुद्ध तिथियाँ, कलश स्थापना एवं पूजन विधान।",
    introEn: "Entering a newly built or renovated home is a sanctified rite of passage. Performing Griha Pravesh under auspicious solar transitions (Uttarayana) purifies the residence from residual negativity and invites Sri Lakshmi's eternal presence.",
    introHi: "नए घर में गृह प्रवेश केवल भौतिक निवास नहीं, अपितु वास्तु पुरुष और कुलदेवता की पावन प्रतिष्ठा है। उत्तरायण सूर्य में शुभ लग्न में प्रवेश करने से घर में सुख-शांति का वास होता है।",
    deityEn: "Vastu Purusha & Goddess Mahalakshmi",
    deityHi: "वास्तु पुरुष एवं भगवती महालक्ष्मी",
    mantraEn: "Om Vaastu Purushaaya Namah • Om Shreem Mahalakshmyai Namah",
    mantraHi: "ॐ वास्तुपुरुषाय नमः • ॐ श्रीं महालक्ष्म्यै नमः",
    guidelinesEn: [
      "Carry Mangala Kalasha filled with holy water, mango leaves, and coconut across threshold with right foot first.",
      "Boil milk until it overflows as an auspicious omen of boundless nourishment.",
      "Do not leave the house empty for at least three consecutive nights following entry."
    ],
    guidelinesHi: [
      "दाहिना पैर आगे रखकर मंगल कलश के साथ गृह प्रवेश करें।",
      "रसोई में सबसे पहले दूध उबालें ताकि समृद्धि का प्रवाह निरंतर बना रहे।",
      "गृह प्रवेश के उपरांत कम से कम तीन रातों तक घर को सूना न छोड़ें।"
    ],
    faqsEn: [
      {
        q: "Can Griha Pravesh be conducted during Kharmas?",
        a: "No. When the Sun transits Jupiter's signs (Sagittarius and Pisces), Kharmas is observed and all major Griha Pravesh ceremonies are strictly paused."
      }
    ],
    faqsHi: [
      {
        q: "क्या खरमास में गृह प्रवेश किया जा सकता है?",
        a: "नहीं। सूर्य जब धनु या मीन राशि में होते हैं तो खरमास माना जाता है, जिसमें गृह प्रवेश पूर्णतः वर्जित है।"
      }
    ]
  },
  "vivah-muhurat": {
    slug: "vivah-muhurat",
    titleEn: "Vivah Muhurat 2026 (Wedding Dates)",
    titleHi: "विवाह शुभ मुहूर्त 2026 — पाणिग्रहण एवं लग्न तिथियाँ",
    metaTitleEn: "Vivah Muhurat 2026 — Auspicious Hindu Marriage Dates & Lagna Calendar",
    metaTitleHi: "विवाह मुहूर्त 2026 — हिन्दू शादी की शुभ तिथियाँ, नक्षत्र एवं लग्न",
    metaDescEn: "Complete Hindu Marriage Calendar 2026 with month-wise auspicious wedding dates, Tribala Shuddhi, and Lagna calculations.",
    metaDescHi: "हिन्दू विवाह कैलेंडर 2026। त्रिबल शुद्धि, गुरु-शुक्र अस्त विचार एवं मांगलिक लग्न के साथ संपूर्ण शुभ विवाह तिथियों की सूची।",
    introEn: "Vivaha Samskara is the sacred union of two souls across lifetimes. Classical Muhurat ensures the couple is blessed with Tribala Shuddhi (Sun, Moon, and Jupiter empowerment) and freedom from Baana Doshas.",
    introHi: "विवाह सनातन धर्म के १६ संस्कारों में सबसे प्रधान संस्कार है। वर-वधू की त्रिबल शुद्धि (सूर्य, चंद्र व गुरु बल) और शुद्ध लग्न का विचार करके ही दाम्पत्य जीवन में अनंत प्रेम और सामंजस्य स्थापित होता है।",
    deityEn: "Lord Shiva & Goddess Parvati",
    deityHi: "भगवान शिव एवं माता पार्वती",
    mantraEn: "Mangalam Bhagavan Vishnuh Mangalam Garudadhwajah • Mangalam Pundarikaksho Mangalaya Tano Harih",
    mantraHi: "मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः • मंगलम् पुण्डरीकाक्षो मंगलाय तनो हरिः",
    guidelinesEn: [
      "Ensure Jupiter (Guru) and Venus (Shukra) are in Udaya (not combust/Asta) state.",
      "Verify absence of Pitru Paksha, Bhadra, and Holashtaka.",
      "Seek Ashtakoota 36 Guna Milan alongside Muhurat alignment."
    ],
    guidelinesHi: [
      "गुरु और शुक्र का अस्त काल (तारा डूबना) टालें।",
      "पितृपक्ष, होलाष्टक और भद्रा का परिहार अनिवार्य है।",
      "३६ गुण मिलान के साथ शुभ लग्न मुहूर्त का चयन करें।"
    ],
    faqsEn: [
      {
        q: "Why are marriages paused during Chaturmas?",
        a: "During the four lunar months from Ashadha Shukla Ekadashi to Kartika Shukla Ekadashi, Lord Vishnu reposes in Yoga Nidra. Divine cosmic blessings for auspicious Samskaras resume on Dev Uthani Ekadashi."
      }
    ],
    faqsHi: [
      {
        q: "चातुर्मास में विवाह क्यों नहीं होते हैं?",
        a: "आषाढ़ शुक्ल एकादशी (देवशयनी) से कार्तिक शुक्ल एकादशी (देवउठनी) तक भगवान श्री विष्णु योगनिद्रा में रहते हैं, अतः इस काल में मांगलिक विवाह नहीं किए जाते।"
      }
    ]
  },
  "naamkaran": {
    slug: "naamkaran",
    titleEn: "Naamkaran Muhurat 2026 (Naming Ceremony)",
    titleHi: "नामकरण शुभ मुहूर्त 2026 — शिशु नामकरण संस्कार",
    metaTitleEn: "Naamkaran Muhurat 2026 — Auspicious Naming Ceremony Dates",
    metaTitleHi: "नामकरण मुहूर्त 2026 — बच्चे के नामकरण की शुभ तिथियाँ एवं नक्षत्र",
    metaDescEn: "Auspicious dates and timings for baby naming ceremony (Naamkaran Samskara) in 2026 based on Janma Nakshatra syllables.",
    metaDescHi: "शिशु के नामकरण संस्कार के लिए वर्ष 2026 की पावन तिथियाँ एवं शुभ नक्षत्र। वैदिक रीति अनुसार नामकरण विधि।",
    introEn: "The Naamkaran ceremony gives a child their sacred identity and vibrational alignment with the cosmic universe through the first syllable of their birth constellation.",
    introHi: "नामकरण संस्कार शिशु को उसकी दिव्य आध्यात्मिक पहचान प्रदान करता है। जन्म नक्षत्र के चरण अनुसार उच्चारित नाम जीवनभर सकारात्मक ऊर्जा प्रवाहित करता है।",
    deityEn: "Lord Brahma & Saraswati",
    deityHi: "ब्रह्मा जी एवं भगवती सरस्वती",
    mantraEn: "Om Brahmane Namah • Om Aing Saraswatyai Namah",
    mantraHi: "ॐ ब्रह्मणे नमः • ॐ ऐं सरस्वत्यै नमः",
    guidelinesEn: [
      "Conventionally conducted on the 10th, 11th, 12th, or 16th day after child birth.",
      "Fixed and gentle Nakshatras ensure steady wisdom and good health."
    ],
    guidelinesHi: [
      "जन्म के १०वें, ११वें, १२वें या १६वें दिन नामकरण संस्कार का विशेष महत्व है।",
      "शिशु के कान में सर्वप्रथम उसके गुप्त व व्यावहारिक नाम का उच्चारण करें।"
    ],
    faqsEn: [
      {
        q: "Can Naamkaran be done after the 100th day?",
        a: "Yes, if the initial period was missed, it can be celebrated on the child's first birthday or on any Shubh Nakshatra day."
      }
    ],
    faqsHi: [
      {
        q: "क्या नामकरण बाद में भी किया जा सकता है?",
        a: "हाँ, यदि जन्म के प्रारंभिक दिनों में न हो सके तो किसी भी शुभ नक्षत्र व पूर्णिमा तिथि पर यह संस्कार संपन्न हो सकता है।"
      }
    ]
  },
  "mundan": {
    slug: "mundan",
    titleEn: "Mundan Muhurat 2026 (Chudakarana Ceremony)",
    titleHi: "मुंडन शुभ मुहूर्त 2026 — चूड़ाकरण संस्कार तिथियाँ",
    metaTitleEn: "Mundan Muhurat 2026 — Auspicious Head Shaving Ceremony Dates",
    metaTitleHi: "मुंडन मुहूर्त 2026 — बच्चों के मुंडन संस्कार की शुभ तिथियाँ व नियम",
    metaDescEn: "Find auspicious dates and timings for Mundan (Chudakarana Samskara) in 2026 for baby boys and girls with sacred river rituals.",
    metaDescHi: "वर्ष 2026 में मुंडन (चूड़ाकरण) संस्कार के शुभ मुहूर्त। तिथि, नक्षत्र, तीर्थ स्थल व केश विसर्जन के शास्त्रीय नियम।",
    introEn: "Chudakarana Samskara shaves the maternal hair to purify past karmic burdens and stimulate cranial nerves, blessing the child with longevity and intellect.",
    introHi: "चूड़ाकरण (मुंडन) संस्कार से शिशु के गर्भकालीन केशों का विसर्जन होता है, जिससे बौद्धिक तेज, दीर्घायु और शारीरिक पवित्रता प्राप्त होती है।",
    deityEn: "Lord Surya & Kuldevata",
    deityHi: "भगवान सूर्य देव एवं कुलदेवता",
    mantraEn: "Om Suryaya Namah • Om Kuladevataayai Namah",
    mantraHi: "ॐ सूर्याय नमः • ॐ कुलदेवतायै नमः",
    guidelinesEn: [
      "Conventionally done in 1st, 3rd, or 5th odd year of the child.",
      "Preferred on sacred riverbanks like Ganga, Yamuna, or at family Kuldevi shrine."
    ],
    guidelinesHi: [
      "बालक के पहले, तीसरे या पाँचवें विषम वर्ष में मुंडन का विधान है।",
      "गंगा आदि पवित्र तीर्थ या कुलदेवी के मंदिर में मुंडन कराना परम फलदायी है।"
    ],
    faqsEn: [
      {
        q: "Why is Mundan not done in even years?",
        a: "Vedic traditions prescribe odd years (1, 3, 5, 7) for male children to harmonize solar energetic cycles."
      }
    ],
    faqsHi: [
      {
        q: "मुंडन विषम वर्षों में ही क्यों किया जाता है?",
        a: "शास्त्रों में १, ३, ५ वें विषम वर्षों को सौर ऊर्जा और शारीरिक विकास के लिए श्रेष्ठ बताया गया है।"
      }
    ]
  }
};
