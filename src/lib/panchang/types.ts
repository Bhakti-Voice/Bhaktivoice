export type Paksha = "shukla" | "krishna";

export type Observance = {
  name: string;
  nameHi?: string;
  href?: string;
};

export type TithiSnapshot = {
  index: number;
  number: number;
  paksha: Paksha;
  name: string;
  nameHi: string;
  start: Date;
  end: Date;
};

export type DayPanchang = {
  instant: Date;
  location: string;
  weekday: number;
  weekdayName: string;
  weekdayNameHi: string;
  gregorianLabel: string;
  sunrise: Date;
  sunset: Date;
  tithiAtSunrise: TithiSnapshot;
  tithiNow: TithiSnapshot;
  masaAmanta: { index: number; name: string; nameHi: string; adhika: boolean };
  masaPurnimanta: { index: number; name: string; nameHi: string; adhika: boolean };
  vikramSamvat: number;
  ritu: { name: string; nameHi: string };
  nakshatra: { name: string; nameHi: string; pada: number };
  yoga: { name: string };
  karana: { name: string };
  rahuKaal: { start: Date; end: Date };
  nextTithi: TithiSnapshot;
  observances: Observance[];
  upcoming: {
    date: Date;
    weekdayName: string;
    weekdayNameHi: string;
    tithi: TithiSnapshot;
    masaName: string;
    masaNameHi: string;
    observances: Observance[];
  }[];
};
