/**
 * Parashari Divisional Charts (Shodashvarga) Calculation Engine
 * Conforms to classical rules of Maharishi Parashara's Brihat Parashara Hora Shastra (BPHS).
 */

import { wrap360 } from "./core-astro";

export type DivisionalChartId =
  | "D1"
  | "D2"
  | "D3"
  | "D4"
  | "D7"
  | "D9"
  | "D10"
  | "D12"
  | "D16"
  | "D20"
  | "D24"
  | "D27"
  | "D30"
  | "D60";

export type DivisionalChartMeta = {
  id: DivisionalChartId;
  name: string;
  nameHi: string;
  sanskritName: string;
  signification: string;
  significationHi: string;
  division: number;
};

export const DIVISIONAL_CHARTS: DivisionalChartMeta[] = [
  {
    id: "D1",
    name: "Rasi Chart (D-1)",
    nameHi: "लग्न / राशि चक्र (D-1)",
    sanskritName: "Rasi",
    signification: "Physical body, vitality, and primary life destiny",
    significationHi: "भौतिक शरीर, सामान्य भाग्य और संपूर्ण जीवन का आधार",
    division: 1,
  },
  {
    id: "D9",
    name: "Navamsha (D-9)",
    nameHi: "नवांश चक्र (D-9)",
    sanskritName: "Navamsha",
    signification: "Spouse, marriage, spiritual dharma, and hidden potential",
    significationHi: "जीवनसाथी, वैवाहिक जीवन, धर्म, भाग्य एवं आंतरिक शक्ति",
    division: 9,
  },
  {
    id: "D10",
    name: "Dasamsha (D-10)",
    nameHi: "दशांश चक्र (D-10)",
    sanskritName: "Dasamsha",
    signification: "Career, professional success, power, and worldly status",
    significationHi: "आजीविका, कार्यक्षेत्र, पद-प्रतिष्ठा और व्यावसायिक सफलता",
    division: 10,
  },
  {
    id: "D7",
    name: "Saptamsha (D-7)",
    nameHi: "सप्तांश चक्र (D-7)",
    sanskritName: "Saptamsha",
    signification: "Children, progeny, legacy, and creative potential",
    significationHi: "संतान सुख, वंश वृद्धि एवं रचनात्मकता",
    division: 7,
  },
  {
    id: "D3",
    name: "Drekkana (D-3)",
    nameHi: "द्रेष्काण चक्र (D-3)",
    sanskritName: "Drekkana",
    signification: "Siblings, courage, vitality, and collaborative endeavors",
    significationHi: "भाई-बहन, पराक्रम, साहस और पुरुषार्थ",
    division: 3,
  },
  {
    id: "D2",
    name: "Hora (D-2)",
    nameHi: "होरा चक्र (D-2)",
    sanskritName: "Hora",
    signification: "Wealth, financial prosperity, and liquid assets",
    significationHi: "धन-संपत्ति, आर्थिक समृद्धि एवं कोष",
    division: 2,
  },
  {
    id: "D4",
    name: "Chaturthamsa (D-4)",
    nameHi: "चतुर्थांश चक्र (D-4)",
    sanskritName: "Chaturthamsa",
    signification: "Fixed assets, real estate, vehicles, and general fortune",
    significationHi: "अचल संपत्ति, भूमि, भवन, वाहन एवं भाग्य",
    division: 4,
  },
  {
    id: "D12",
    name: "Dwadasamsa (D-12)",
    nameHi: "द्वादशांश चक्र (D-12)",
    sanskritName: "Dwadasamsa",
    signification: "Parents, maternal/paternal lineage, and ancestral karma",
    significationHi: "माता-पिता, पूर्वज एवं पैतृक कर्म",
    division: 12,
  },
  {
    id: "D16",
    name: "Shodashamsa (D-16)",
    nameHi: "षोडशांश चक्र (D-16)",
    sanskritName: "Shodashamsa",
    signification: "Conveyances, vehicular comforts, and mental happiness",
    significationHi: "वाहन सुख एवं मानसिक शांति",
    division: 16,
  },
  {
    id: "D20",
    name: "Vimsamsa (D-20)",
    nameHi: "विंशांश चक्र (D-20)",
    sanskritName: "Vimsamsa",
    signification: "Spiritual practice, mantra siddhi, and divine devotion",
    significationHi: "उपासना, भक्ति, साधना और आध्यात्मिक प्रगति",
    division: 20,
  },
  {
    id: "D24",
    name: "Siddhamsa (D-24)",
    nameHi: "सिद्धांश / चतुर्विंशांश (D-24)",
    sanskritName: "Chaturvimsamsa",
    signification: "Higher learning, intellect, academic degrees, and wisdom",
    significationHi: "उच्च विद्या, ज्ञान, बुद्धि और शास्त्र ज्ञान",
    division: 24,
  },
  {
    id: "D27",
    name: "Saptavimsamsa (D-27)",
    nameHi: "सप्तविंशांश चक्र (D-27)",
    sanskritName: "Bhamsa",
    signification: "Physical stamina, hidden strengths, and constitutional vitality",
    significationHi: "शारीरिक बल, अंतःशक्ति एवं स्वास्थ्य",
    division: 27,
  },
  {
    id: "D30",
    name: "Trimsamsa (D-30)",
    nameHi: "त्रिंशांश चक्र (D-30)",
    sanskritName: "Trimsamsa",
    signification: "Afflictions, misfortunes, character challenges, and remedies",
    significationHi: "अरिष्ट, कष्ट, दुर्गुण निवारण एवं सुरक्षा",
    division: 30,
  },
  {
    id: "D60",
    name: "Shashtiamsa (D-60)",
    nameHi: "षष्ट्यंश चक्र (D-60)",
    sanskritName: "Shashtiamsa",
    signification: "Subtle past life karma and deep destiny seed (supreme varga)",
    significationHi: "पूर्वजन्म के संचित कर्म और सूक्ष्म प्रारब्ध",
    division: 60,
  },
];

/**
 * Calculates the Rashi index (0 to 11, where 0=Aries, 1=Taurus, ... 11=Pisces)
 * for a given sidereal longitude in a specific divisional chart (Varga).
 */
export function calculateVargaRashi(siderealLongitude: number, varga: DivisionalChartId): number {
  const lon = wrap360(siderealLongitude);
  const signIndex = Math.floor(lon / 30); // 0 to 11
  const degreeInSign = lon % 30; // 0 to 30

  // 0, 2, 4, 6, 8, 10 are odd signs (Aries, Gemini, Leo, Libra, Sagittarius, Aquarius)
  const isOddSign = signIndex % 2 === 0;

  // Movable (Chara): 0, 3, 6, 9 (Aries, Cancer, Libra, Capricorn)
  // Fixed (Sthira): 1, 4, 7, 10 (Taurus, Leo, Scorpio, Aquarius)
  // Dual (Dvisvabhava): 2, 5, 8, 11 (Gemini, Virgo, Sagittarius, Pisces)
  const modality = signIndex % 3; // 0 = Movable, 1 = Fixed, 2 = Dual

  switch (varga) {
    case "D1":
      return signIndex;

    case "D2": {
      // Hora: 15 deg per half
      const isFirstHalf = degreeInSign < 15;
      if (isOddSign) {
        // Sun (Leo = 4) first, Moon (Cancer = 3) second
        return isFirstHalf ? 4 : 3;
      } else {
        // Moon (Cancer = 3) first, Sun (Leo = 4) second
        return isFirstHalf ? 3 : 4;
      }
    }

    case "D3": {
      // Drekkana: 10 deg parts
      const part = Math.min(2, Math.floor(degreeInSign / 10));
      // 1st part: same, 2nd part: 5th sign, 3rd part: 9th sign
      return (signIndex + part * 4) % 12;
    }

    case "D4": {
      // Chaturthamsa: 7.5 deg parts
      const part = Math.min(3, Math.floor(degreeInSign / 7.5));
      // Kendra progression: 1st, 4th, 7th, 10th from sign
      return (signIndex + part * 3) % 12;
    }

    case "D7": {
      // Saptamsha: 30 / 7 deg per part (~4.2857 deg)
      const part = Math.min(6, Math.floor(degreeInSign / (30 / 7)));
      if (isOddSign) {
        return (signIndex + part) % 12;
      } else {
        return (signIndex + 6 + part) % 12;
      }
    }

    case "D9": {
      // Navamsha: 3 deg 20 min = 3.333333 deg per part
      // Absolute navamsha calculation across the 108 padas:
      return Math.floor(lon / (30 / 9)) % 12;
    }

    case "D10": {
      // Dasamsha: 3 deg per part
      const part = Math.min(9, Math.floor(degreeInSign / 3));
      if (isOddSign) {
        return (signIndex + part) % 12;
      } else {
        // Starts from 9th sign (signIndex + 8)
        return (signIndex + 8 + part) % 12;
      }
    }

    case "D12": {
      // Dwadasamsa: 2.5 deg per part
      const part = Math.min(11, Math.floor(degreeInSign / 2.5));
      return (signIndex + part) % 12;
    }

    case "D16": {
      // Shodashamsa: 1.875 deg per part (30 / 16)
      const part = Math.min(15, Math.floor(degreeInSign / 1.875));
      if (modality === 0) {
        // Movable: starts from Aries (0)
        return (0 + part) % 12;
      } else if (modality === 1) {
        // Fixed: starts from Leo (4)
        return (4 + part) % 12;
      } else {
        // Dual: starts from Sagittarius (8)
        return (8 + part) % 12;
      }
    }

    case "D20": {
      // Vimsamsa: 1.5 deg per part (30 / 20)
      const part = Math.min(19, Math.floor(degreeInSign / 1.5));
      if (modality === 0) {
        return (0 + part) % 12; // Aries
      } else if (modality === 1) {
        return (8 + part) % 12; // Sagittarius
      } else {
        return (4 + part) % 12; // Leo
      }
    }

    case "D24": {
      // Chaturvimsamsa / Siddhamsa: 1.25 deg per part (30 / 24)
      const part = Math.min(23, Math.floor(degreeInSign / 1.25));
      if (isOddSign) {
        return (4 + part) % 12; // Starts from Leo (4)
      } else {
        return (3 + part) % 12; // Starts from Cancer (3)
      }
    }

    case "D27": {
      // Saptavimsamsa: 30 / 27 deg per part (10 / 9 deg)
      const part = Math.min(26, Math.floor(degreeInSign / (10 / 9)));
      const triplicity = signIndex % 4; // 0=Fire, 1=Earth, 2=Air, 3=Water
      if (triplicity === 0) return (0 + part) % 12; // Aries
      if (triplicity === 1) return (3 + part) % 12; // Cancer
      if (triplicity === 2) return (6 + part) % 12; // Libra
      return (9 + part) % 12; // Capricorn
    }

    case "D30": {
      // Trimsamsa: unequal degrees ruled by Mars, Saturn, Jupiter, Mercury, Venus
      if (isOddSign) {
        if (degreeInSign < 5) return 0; // Aries (Mars)
        if (degreeInSign < 10) return 10; // Aquarius (Saturn)
        if (degreeInSign < 18) return 8; // Sagittarius (Jupiter)
        if (degreeInSign < 25) return 2; // Gemini (Mercury)
        return 6; // Libra (Venus)
      } else {
        if (degreeInSign < 5) return 1; // Taurus (Venus)
        if (degreeInSign < 12) return 5; // Virgo (Mercury)
        if (degreeInSign < 20) return 11; // Pisces (Jupiter)
        if (degreeInSign < 25) return 9; // Capricorn (Saturn)
        return 7; // Scorpio (Mars)
      }
    }

    case "D60": {
      // Shashtiamsa: 0.5 deg per part (30 / 60)
      const part = Math.min(59, Math.floor(degreeInSign / 0.5));
      return (signIndex + part) % 12;
    }

    default:
      return signIndex;
  }
}
