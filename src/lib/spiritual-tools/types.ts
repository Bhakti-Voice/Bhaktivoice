export type BirthPlace = {
  name: string;
  latitude: number;
  longitude: number;
  timeZone: string;
};

export type BirthDetails = {
  name: string;
  date: string;
  time: string;
  place: BirthPlace;
};

export type PlanetStatus =
  | "Exalted"
  | "Debilitated"
  | "Own Sign"
  | "Friendly"
  | "Neutral"
  | "Enemy"
  | "Normal";

export type PlanetPosition = {
  id: string;
  name: string;
  nameHi: string;
  symbol: string;
  siderealLongitude: number;
  degreeInSign: number; // 0 to 29.99
  formattedDegree: string; // e.g. 14° 32'
  rashiIndex: number; // 0 to 11
  rashi: string;
  rashiHi: string;
  nakshatraIndex: number; // 0 to 26
  nakshatra: string;
  nakshatraHi: string;
  pada: number; // 1 to 4
  house: number; // 1 to 12
  retrograde: boolean;
  isCombust?: boolean;
  status: PlanetStatus;
  statusHi: string;
};

export type HouseData = {
  houseNumber: number; // 1 to 12
  rashiIndex: number;
  rashi: string;
  rashiHi: string;
  rashiLord: string;
  rashiLordHi: string;
  signification: string;
  significationHi: string;
  planets: PlanetPosition[];
};

export type ManglikResult = {
  isManglik: boolean;
  level: "None" | "Low" | "High";
  levelHi: string;
  fromLagna: { isManglik: boolean; house: number };
  fromMoon: { isManglik: boolean; house: number };
  description: string;
  descriptionHi: string;
  isCancelled?: boolean;
  cancellationReason?: string;
  cancellationReasonHi?: string;
};

export type DashaPeriod = {
  planetId: string;
  planetName: string;
  planetNameHi: string;
  startYear: number;
  endYear: number;
  durationYears: number;
  isCurrent: boolean;
};

export type KundliChart = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthUtc: Date;
  place: BirthPlace;
  lagna: PlanetPosition;
  moon: PlanetPosition;
  sun: PlanetPosition;
  planets: PlanetPosition[];
  houses: HouseData[];
  manglik: ManglikResult;
  vimshottariDasha: {
    birthBalancePlanet: string;
    birthBalancePlanetHi: string;
    birthBalanceYears: number;
    periods: DashaPeriod[];
  };
};

export type GunaScore = {
  id: "varna" | "vashya" | "tara" | "yoni" | "grahaMaitri" | "gana" | "bhakoot" | "nadi";
  name: string;
  nameHi: string;
  max: number;
  score: number;
  boyValue: string;
  boyValueHi: string;
  girlValue: string;
  girlValueHi: string;
  detail: string;
  detailHi: string;
  hasDosha?: boolean;
  isCancelled?: boolean;
  cancellationNote?: string;
  cancellationNoteHi?: string;
};

export type MilanResult = {
  boy: KundliChart;
  girl: KundliChart;
  gunas: GunaScore[];
  total: number;
  maxTotal: number;
  percentage: number;
  verdict: string;
  verdictHi: string;
  verdictSummary: string;
  verdictSummaryHi: string;
  compatibilityLevel: "Excellent" | "Good" | "Average" | "Low";
  nadiDosha: { present: boolean; cancelled: boolean; note: string; noteHi: string };
  bhakootDosha: { present: boolean; cancelled: boolean; note: string; noteHi: string };
  manglikMatch: {
    boyManglik: boolean;
    girlManglik: boolean;
    compatible: boolean;
    note: string;
    noteHi: string;
  };
};

export type ClientPanchangResult = {
  locationLabel: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  gregorianLabel: string;
  weekdayName: string;
  weekdayNameHi: string;
  sunrise: Date;
  sunset: Date;
  tithi: { name: string; nameHi: string; paksha: string; pakshaHi: string };
  nakshatra: { name: string; nameHi: string; pada: number };
  yoga: string;
  karana: string;
  rahuKaal: { start: Date; end: Date };
  masa: { name: string; nameHi: string };
  ritu: { name: string; nameHi: string };
};

export type SpiritualToolId = "panchang" | "kundli" | "kundliMilan";
