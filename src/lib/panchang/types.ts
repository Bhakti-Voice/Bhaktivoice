import type { CityConfig } from "./cities";

export type Paksha = "shukla" | "krishna";

export type FestivalCategory =
  | "all"
  | "festival"
  | "vrat"
  | "ekadashi"
  | "purnima"
  | "amavasya"
  | "pradosh"
  | "sankashti"
  | "sankranti";

export type MuhuratWindow = {
  name: string;
  nameHi: string;
  start: Date;
  end: Date;
  isAuspicious: boolean;
  description?: string;
  descriptionHi?: string;
};

export type ChoghadiyaPeriod = {
  name: string;
  nameHi: string;
  type: "Amrit" | "Shubh" | "Labh" | "Char" | "Rog" | "Kaal" | "Udveg";
  nature: "shubh" | "ashubh" | "madhyam";
  start: Date;
  end: Date;
  ruler: string;
};

export type Observance = {
  slug?: string;
  name: string;
  nameHi?: string;
  category?: "festival" | "vrat" | "ekadashi" | "purnima" | "amavasya" | "pradosh" | "sankashti" | "sankranti";
  href?: string;
  description?: string;
  deity?: string;
  isMajor?: boolean;
};

export type TithiSnapshot = {
  index: number;
  number: number;
  paksha: Paksha;
  name: string;
  nameHi: string;
  start: Date;
  end: Date;
  progressPercent?: number;
};

export type NakshatraSnapshot = {
  index: number;
  name: string;
  nameHi: string;
  pada: number;
  ruler?: string;
  deity?: string;
  start: Date;
  end: Date;
};

export type YogaSnapshot = {
  index: number;
  name: string;
  nameHi: string;
  start: Date;
  end: Date;
};

export type KaranaSnapshot = {
  index: number;
  name: string;
  nameHi: string;
  start: Date;
  end: Date;
};

export type MoonData = {
  moonrise: Date | null;
  moonset: Date | null;
  illumination: number; // 0 to 100%
  phaseName: string;
  phaseNameHi: string;
  phaseAngle: number;
  sign: string;
  signHi: string;
};

export type DayPanchang = {
  instant: Date;
  city: CityConfig;
  gregorianDateString: string; // YYYY-MM-DD
  gregorianLabel: string;
  gregorianLabelHi: string;
  weekday: number;
  weekdayName: string;
  weekdayNameHi: string;
  
  // Sun & Day length
  sunrise: Date;
  sunset: Date;
  dayDuration: string; // e.g. "11 hrs 42 mins"
  nightDuration: string;
  sunSign: string;
  sunSignHi: string;
  
  // Moon data
  moon: MoonData;
  
  // Vedic elements
  tithiAtSunrise: TithiSnapshot;
  tithiNow: TithiSnapshot;
  nakshatra: NakshatraSnapshot;
  yoga: YogaSnapshot;
  karana: KaranaSnapshot;
  
  // Eras & Months
  masaAmanta: { index: number; name: string; nameHi: string; adhika: boolean };
  masaPurnimanta: { index: number; name: string; nameHi: string; adhika: boolean };
  vikramSamvat: number;
  shakaSamvat: number;
  gujaratiSamvat: number;
  ritu: { name: string; nameHi: string };
  ayana: { name: string; nameHi: string }; // Uttarayana / Dakshinayana
  
  // Auspicious Timings (Shubh Muhurat)
  brahmaMuhurat: MuhuratWindow;
  abhijitMuhurat: MuhuratWindow | null; // Note: None on Wednesday for Abhijit
  amritKaal: MuhuratWindow | null;
  godhuliMuhurat: MuhuratWindow;
  vijayaMuhurat: MuhuratWindow;
  nishitaMuhurat: MuhuratWindow;
  
  // Inauspicious Timings (Ashubh Muhurat)
  rahuKaal: MuhuratWindow;
  yamaganda: MuhuratWindow;
  gulikaKaal: MuhuratWindow;
  durMuhurat: MuhuratWindow[];
  varjyam: MuhuratWindow | null;
  
  // Day / Night Choghadiya
  dayChoghadiya: ChoghadiyaPeriod[];
  nightChoghadiya: ChoghadiyaPeriod[];
  
  // Observances
  observances: Observance[];
  
  // Next Tithi
  nextTithi: TithiSnapshot;
  
  // Daily Spiritual Connection
  dailyMantra?: {
    sanskrit: string;
    deity: string;
    translation: string;
    benefit: string;
  };
  dailyDarshan?: {
    templeName: string;
    deity: string;
    location: string;
    imageUrl: string;
    description: string;
  };
  spiritualGuidance?: string;
  location: string;
  
  upcoming: {
    date: Date;
    dateString?: string;
    weekdayName: string;
    weekdayNameHi: string;
    tithi: TithiSnapshot;
    masaName: string;
    masaNameHi: string;
    observances: Observance[];
  }[];
};

export type CalendarDay = {
  date: Date;
  dateString: string; // "2026-10-24"
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected?: boolean;
  weekday: number;
  tithiName: string;
  tithiNameHi: string;
  paksha: Paksha;
  moonPhaseIcon: "new" | "waxing-crescent" | "first-quarter" | "waxing-gibbous" | "full" | "waning-gibbous" | "third-quarter" | "waning-crescent";
  moonIllumination: number;
  observances: Observance[];
  hasMajorFestival: boolean;
  hasEkadashi: boolean;
  hasPurnima: boolean;
  hasAmavasya: boolean;
  hasPradosh: boolean;
  hasSankashti: boolean;
  hasSankranti: boolean;
  hasVrat: boolean;
};

export type CalendarMonth = {
  year: number;
  month: number; // 1-12
  monthName: string;
  monthNameHi: string;
  city: CityConfig;
  days: CalendarDay[];
  hinduMonthsSpanned: string[];
  totalDays: number;
};

export type FestivalDetail = {
  slug: string;
  name: string;
  nameHi: string;
  category: FestivalCategory;
  dateString2026: string;
  dateString2027: string;
  dateString2028: string;
  tithiNote: string;
  tithiNoteHi: string;
  hinduMonth: string;
  paksha: Paksha;
  tithiNumber: number;
  deity: string;
  shortDescription: string;
  shortDescriptionHi: string;
  muhuratTitle: string;
  muhuratTiming: string;
  pujaTiming: string;
  vratTiming?: string;
  moonriseTiming?: string;
  significance: string;
  pujaVidhi: { step: number; title: string; detail: string }[];
  vratKatha: string;
  mantra: { sanskrit: string; transliteration: string; meaning: string };
  aarti: { title: string; lines: string[]; href?: string };
  relatedBhaktiContent: { title: string; href: string; type: "mantra" | "katha" | "temple" | "aarti" | "yatra" }[];
  faqs: { question: string; answer: string }[];
};
