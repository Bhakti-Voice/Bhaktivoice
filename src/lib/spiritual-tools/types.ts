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

export type PlanetPosition = {
  id: string;
  name: string;
  nameHi: string;
  siderealLongitude: number;
  rashiIndex: number;
  rashi: string;
  rashiHi: string;
  nakshatraIndex: number;
  nakshatra: string;
  nakshatraHi: string;
  pada: number;
  retrograde: boolean;
};

export type KundliChart = {
  birthUtc: Date;
  place: BirthPlace;
  lagna: PlanetPosition;
  moon: PlanetPosition;
  sun: PlanetPosition;
  planets: PlanetPosition[];
};

export type GunaScore = {
  name: string;
  nameHi: string;
  max: number;
  score: number;
  detail: string;
};

export type MilanResult = {
  boy: KundliChart;
  girl: KundliChart;
  gunas: GunaScore[];
  total: number;
  maxTotal: number;
  verdict: string;
  verdictHi: string;
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
