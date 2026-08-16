import { PATHS } from "@/lib/seo/paths";
import type { Observance, Paksha } from "./types";
import { MASA_NAMES } from "./names";

function masa(name: string) {
  return MASA_NAMES.indexOf(name as (typeof MASA_NAMES)[number]);
}

type Rule = {
  name: string;
  nameHi?: string;
  href?: string;
  masa?: number;
  paksha?: Paksha;
  tithi: number;
};

const RULES: Rule[] = [
  { name: "Ekadashi vrat", nameHi: "एकादशी व्रत", href: `${PATHS.festivals}/ekadashi`, tithi: 11 },
  { name: "Purnima", nameHi: "पूर्णिमा", tithi: 15, paksha: "shukla" },
  { name: "Amavasya", nameHi: "अमावस्या", tithi: 15, paksha: "krishna" },
  { name: "Pradosh vrat", nameHi: "प्रदोष व्रत", tithi: 13 },
  { name: "Sankashti Chaturthi", nameHi: "संकष्टी चतुर्थी", tithi: 4, paksha: "krishna" },
  { name: "Vinayaka Chaturthi", nameHi: "विनायक चतुर्थी", tithi: 4, paksha: "shukla" },
  {
    name: "Nag Panchami",
    nameHi: "नाग पंचमी",
    masa: masa("Shravana"),
    paksha: "shukla",
    tithi: 5,
  },
  {
    name: "Raksha Bandhan",
    nameHi: "रक्षा बन्धन",
    href: `${PATHS.festivals}/raksha-bandhan`,
    masa: masa("Shravana"),
    paksha: "shukla",
    tithi: 15,
  },
  {
    name: "Guru Purnima",
    nameHi: "गुरु पूर्णिमा",
    masa: masa("Ashadha"),
    paksha: "shukla",
    tithi: 15,
  },
  {
    name: "Ganesh Chaturthi",
    nameHi: "गणेश चतुर्थी",
    href: `${PATHS.festivals}/ganesh-chaturthi`,
    masa: masa("Bhadrapada"),
    paksha: "shukla",
    tithi: 4,
  },
  {
    name: "Janmashtami",
    nameHi: "जन्माष्टमी",
    href: `${PATHS.festivals}/janmashtami`,
    masa: masa("Bhadrapada"),
    paksha: "krishna",
    tithi: 8,
  },
  {
    name: "Ram Navami",
    nameHi: "राम नवमी",
    href: `${PATHS.festivals}/ram-navami`,
    masa: masa("Chaitra"),
    paksha: "shukla",
    tithi: 9,
  },
  {
    name: "Akshaya Tritiya",
    nameHi: "अक्षय तृतीया",
    href: `${PATHS.festivals}/akshaya-tritiya`,
    masa: masa("Vaishakha"),
    paksha: "shukla",
    tithi: 3,
  },
  {
    name: "Maha Shivratri",
    nameHi: "महा शिवरात्रि",
    href: `${PATHS.festivals}/maha-shivratri`,
    masa: masa("Phalguna"),
    paksha: "krishna",
    tithi: 14,
  },
  {
    name: "Holi",
    nameHi: "होली",
    href: `${PATHS.festivals}/holi`,
    masa: masa("Phalguna"),
    paksha: "shukla",
    tithi: 15,
  },
  {
    name: "Karwa Chauth",
    nameHi: "करवा चौथ",
    href: `${PATHS.festivals}/karwa-chauth`,
    masa: masa("Kartika"),
    paksha: "krishna",
    tithi: 4,
  },
  {
    name: "Dhanteras",
    nameHi: "धनतेरस",
    href: `${PATHS.festivals}/dhanteras`,
    masa: masa("Kartika"),
    paksha: "krishna",
    tithi: 13,
  },
  {
    name: "Diwali",
    nameHi: "दीपावली",
    href: `${PATHS.festivals}/diwali`,
    masa: masa("Kartika"),
    paksha: "krishna",
    tithi: 15,
  },
  {
    name: "Govardhan Puja",
    nameHi: "गोवर्धन पूजा",
    href: `${PATHS.festivals}/govardhan-puja`,
    masa: masa("Kartika"),
    paksha: "shukla",
    tithi: 1,
  },
  {
    name: "Navratri begins",
    nameHi: "नवरात्रि आरम्भ",
    href: `${PATHS.festivals}/navratri`,
    masa: masa("Ashvina"),
    paksha: "shukla",
    tithi: 1,
  },
];

export function observancesFor(input: {
  masaIndex: number;
  paksha: Paksha;
  tithiNumber: number;
  weekday: number;
}): Observance[] {
  const found: Observance[] = [];
  for (const rule of RULES) {
    if (rule.tithi !== input.tithiNumber) continue;
    if (rule.paksha && rule.paksha !== input.paksha) continue;
    if (rule.masa !== undefined && rule.masa !== input.masaIndex) continue;
    found.push({ name: rule.name, nameHi: rule.nameHi, href: rule.href });
  }
  if (input.masaIndex === masa("Shravana") && input.weekday === 1) {
    found.push({ name: "Sawan Somvar", nameHi: "सावन सोमवार" });
  }
  return found.filter(
    (item, index, all) => all.findIndex((other) => other.name === item.name) === index,
  );
}
