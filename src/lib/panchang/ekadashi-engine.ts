import {
  getSunrise,
  getSunset,
  getTithiSnapshot,
  tithiIndex,
  tithiStart,
  tithiEnd,
  calendarDateForZone,
  type CityConfig,
} from "./astronomy";
import { DEFAULT_CITY } from "./cities";

export interface EkadashiRecord {
  id: string;
  name: string;
  nameHi: string;
  masa: string;
  masaHi: string;
  paksha: "shukla" | "krishna";
  deity: string;
  significance: string;
  significanceHi: string;
  
  // Fast Dates
  fastDateSmarta: Date;
  fastDateSmartaString: string; // YYYY-MM-DD
  fastDateVaishnava: Date;
  fastDateVaishnavaString: string; // YYYY-MM-DD
  isSmartaVaishnavaSame: boolean;

  // Tithi Timings
  tithiStart: Date;
  tithiEnd: Date;
  tithiStartFormatted: string;
  tithiEndFormatted: string;

  // Parana Timings (The exact micro-window to break fast)
  paranaDate: Date;
  paranaDateString: string;
  paranaStart: Date;
  paranaEnd: Date;
  paranaWindowFormatted: string;
  paranaWindowFormattedHi: string;
  hariVasaraEnd: Date;
  hariVasaraEndFormatted: string;
  dwadashiEnd: Date;
  dwadashiEndFormatted: string;
  paranaRuleNote: string;
  paranaRuleNoteHi: string;
}

interface EkadashiMeta {
  slug: string;
  name: string;
  nameHi: string;
  masa: string;
  masaHi: string;
  paksha: "shukla" | "krishna";
  deity: string;
  significance: string;
  significanceHi: string;
  approxMonth: number; // 1-12
}

const EKADASHI_DIRECTORY: EkadashiMeta[] = [
  {
    slug: "saphala-ekadashi",
    name: "Saphala Ekadashi",
    nameHi: "सफला एकादशी",
    masa: "Pausha",
    masaHi: "पौष",
    paksha: "krishna",
    deity: "Lord Narayana",
    significance: "Brings success (Saphalata) in all righteous undertakings and dispels sorrow.",
    significanceHi: "सभी शुभ कार्यों में सफलता प्रदान करने वाली तथा पापों का शमन करने वाली पावन एकादशी।",
    approxMonth: 1,
  },
  {
    slug: "pausha-putrada-ekadashi",
    name: "Pausha Putrada Ekadashi",
    nameHi: "पौष पुत्रदा एकादशी",
    masa: "Pausha",
    masaHi: "पौष",
    paksha: "shukla",
    deity: "Lord Vishnu",
    significance: "Bestows noble progeny, family happiness, and divine protection.",
    significanceHi: "संतान सुख, वंश वृद्धि एवं पारिवारिक कल्याण प्रदान करने वाली पवित्र एकादशी।",
    approxMonth: 1,
  },
  {
    slug: "shattila-ekadashi",
    name: "Shattila Ekadashi",
    nameHi: "षटतिला एकादशी",
    masa: "Magha",
    masaHi: "माघ",
    paksha: "krishna",
    deity: "Lord Vishnu",
    significance: "Involves six uses of sesame seeds (Til) for purification, charity, and spiritual health.",
    significanceHi: "तिल के 6 प्रकार के उपयोग (दान, हवन, तर्पण) से दुर्भाग्य निवारण व मोक्ष फल।",
    approxMonth: 1,
  },
  {
    slug: "jaya-ekadashi",
    name: "Jaya Ekadashi",
    nameHi: "जया एकादशी",
    masa: "Magha",
    masaHi: "माघ",
    paksha: "shukla",
    deity: "Lord Vishnu / Madhava",
    significance: "Liberates the soul from ghostly realms (Preta Yoni) and grants victory over fear.",
    significanceHi: "पिशाच योनि व सभी भय से मुक्ति दिलाकर विजय प्रदान करने वाली एकादशी।",
    approxMonth: 2,
  },
  {
    slug: "vijaya-ekadashi",
    name: "Vijaya Ekadashi",
    nameHi: "विजया एकादशी",
    masa: "Phalguna",
    masaHi: "फाल्गुन",
    paksha: "krishna",
    deity: "Lord Rama / Vishnu",
    significance: "Observed by Lord Rama before building the bridge to Lanka for assured victory.",
    significanceHi: "भगवान श्री राम ने लंका विजय सेतु निर्माण से पूर्व इसी एकादशी का व्रत किया था।",
    approxMonth: 2,
  },
  {
    slug: "amalaki-ekadashi",
    name: "Amalaki Ekadashi",
    nameHi: "आमलकी एकादशी",
    masa: "Phalguna",
    masaHi: "फाल्गुन",
    paksha: "shukla",
    deity: "Lord Vishnu & Amla Tree",
    significance: "Worship of the divine Amla tree, bestowing health, radiant vitality, and liberation.",
    significanceHi: "आंवले के पवित्र वृक्ष का पूजन कर निरोगी काया व विष्णुलोक की प्राप्ति।",
    approxMonth: 3,
  },
  {
    slug: "papmochani-ekadashi",
    name: "Papmochani Ekadashi",
    nameHi: "पापमोचिनी एकादशी",
    masa: "Chaitra",
    masaHi: "चैत्र",
    paksha: "krishna",
    deity: "Lord Vishnu",
    significance: "Dissolves the deepest karmic sins, guilt, and obstacles from the devotee's life.",
    significanceHi: "जाने-अनजाने में हुए समस्त घोर पापों का नाश करने वाली महाकल्याणकारी एकादशी।",
    approxMonth: 3,
  },
  {
    slug: "kamada-ekadashi",
    name: "Kamada Ekadashi",
    nameHi: "कामदा एकादशी",
    masa: "Chaitra",
    masaHi: "चैत्र",
    paksha: "shukla",
    deity: "Lord Krishna / Vasudeva",
    significance: "Fulfills all righteous desires (Kama) and removes curses and afflictions.",
    significanceHi: "भक्तों की सभी सात्विक मनोकामनाओं को पूर्ण करने वाली चैत्र शुक्ल एकादशी।",
    approxMonth: 4,
  },
  {
    slug: "varuthini-ekadashi",
    name: "Varuthini Ekadashi",
    nameHi: "वरूथिनी एकादशी",
    masa: "Vaishakha",
    masaHi: "वैशाख",
    paksha: "krishna",
    deity: "Lord Vamana",
    significance: "Protects the devotee like divine armor (Varutha) and equals gifting gold.",
    significanceHi: "कवच के समान सुरक्षा प्रदान करने वाली तथा कन्यादान व स्वर्ण दान तुल्य फलदायिनी।",
    approxMonth: 4,
  },
  {
    slug: "mohini-ekadashi",
    name: "Mohini Ekadashi",
    nameHi: "मोहिनी एकादशी",
    masa: "Vaishakha",
    masaHi: "वैशाख",
    paksha: "shukla",
    deity: "Lord Vishnu (Mohini Avatar)",
    significance: "Destroys worldly illusions (Moha) and grants pure spiritual discrimination.",
    significanceHi: "संसार के मोह-माया व भ्रम का क्षय कर चित्त को निर्मल भक्ति में लीन करने वाली एकादशी।",
    approxMonth: 5,
  },
  {
    slug: "apara-ekadashi",
    name: "Apara Ekadashi",
    nameHi: "अपरा एकादशी",
    masa: "Jyeshtha",
    masaHi: "ज्येष्ठ",
    paksha: "krishna",
    deity: "Lord Trivikrama",
    significance: "Bestows boundless (Apara) spiritual merit, fame, and wealth.",
    significanceHi: "अपरिमित पुण्य, यश, कीर्ति और धन-वैभव प्रदान करने वाली पावन एकादशी।",
    approxMonth: 5,
  },
  {
    slug: "nirjala-ekadashi",
    name: "Nirjala Ekadashi (Pandava Bhim)",
    nameHi: "निर्जला एकादशी (भीमसेनी)",
    masa: "Jyeshtha",
    masaHi: "ज्येष्ठ",
    paksha: "shukla",
    deity: "Lord Vishnu",
    significance: "The supreme Ekadashi observed without even a drop of water; yields the merit of all 24 Ekadashis.",
    significanceHi: "वर्ष की सबसे कठोर व पुण्यप्रद एकादशी, बिना जल ग्रहण किए व्रत करने से 24 एकादशियों का फल।",
    approxMonth: 6,
  },
  {
    slug: "yogini-ekadashi",
    name: "Yogini Ekadashi",
    nameHi: "योगिनी एकादशी",
    masa: "Ashadha",
    masaHi: "आषाढ़",
    paksha: "krishna",
    deity: "Lord Narayana",
    significance: "Cures all physical and mental ailments and purifies severe curses.",
    significanceHi: "सभी शारीरिक रोगों, कुष्ठ व शापों से मुक्ति दिलाने वाली दिव्य एकादशी।",
    approxMonth: 6,
  },
  {
    slug: "devshayani-ekadashi",
    name: "Devshayani Ekadashi (Ashadhi)",
    nameHi: "देवशयनी एकादशी (आषाढ़ी)",
    masa: "Ashadha",
    masaHi: "आषाढ़",
    paksha: "shukla",
    deity: "Lord Vishnu",
    significance: "Lord Vishnu enters cosmic Yogic sleep on Sheshanaga, initiating Chaturmas.",
    significanceHi: "भगवान श्री हरि क्षीरसागर में शेषशय्या पर 4 मास के लिए शयन करते हैं, चातुर्मास आरम्भ।",
    approxMonth: 7,
  },
  {
    slug: "kamika-ekadashi",
    name: "Kamika Ekadashi",
    nameHi: "कामिका एकादशी",
    masa: "Shravana",
    masaHi: "श्रावण",
    paksha: "krishna",
    deity: "Lord Sridhara",
    significance: "Equivalent to holy dip in Kashi Ganga and offering Tulsi leaves to Lord Vishnu.",
    significanceHi: "तुलसी दल से श्रीहरि पूजन करने पर अश्वमेध यज्ञ समान पुण्य फल देने वाली एकादशी।",
    approxMonth: 7,
  },
  {
    slug: "shravana-putrada-ekadashi",
    name: "Shravana Putrada Ekadashi (Pavitropana)",
    nameHi: "श्रावण पुत्रदा एकादशी (पवित्रोपना)",
    masa: "Shravana",
    masaHi: "श्रावण",
    paksha: "shukla",
    deity: "Lord Vishnu",
    significance: "Brings pure devotion, blessed children, and long-lasting peace in home.",
    significanceHi: "संतान सुख और गृह शांति प्रदान करने वाली तथा सभी पापों को हरने वाली एकादशी।",
    approxMonth: 8,
  },
  {
    slug: "aja-ekadashi",
    name: "Aja Ekadashi (Annada)",
    nameHi: "अजा एकादशी (अन्नदा)",
    masa: "Bhadrapada",
    masaHi: "भाद्रपद",
    paksha: "krishna",
    deity: "Lord Hrishikesha",
    significance: "Restored King Harishchandra's lost kingdom, wealth, and family.",
    significanceHi: "सत्यवादी राजा हरिश्चंद्र को खोया हुआ राज्य व परिवार इसी एकादशी व्रत के प्रभाव से पुनः मिला।",
    approxMonth: 8,
  },
  {
    slug: "parivartini-ekadashi",
    name: "Parivartini Ekadashi (Parsva)",
    nameHi: "परिवर्तिनी एकादशी (पार्श्व)",
    masa: "Bhadrapada",
    masaHi: "भाद्रपद",
    paksha: "shukla",
    deity: "Lord Vamana",
    significance: "Lord Vishnu turns His side while sleeping in Kshirasagar; wipes out all sins.",
    significanceHi: "योगनिद्रा में भगवान विष्णु करवट बदलते हैं; वामन अवतार की आराधना का परम फल।",
    approxMonth: 9,
  },
  {
    slug: "indira-ekadashi",
    name: "Indira Ekadashi (Pitru Paksha)",
    nameHi: "इन्दिरा एकादशी (पितृ पक्ष)",
    masa: "Ashvina",
    masaHi: "आश्विन",
    paksha: "krishna",
    deity: "Lord Shaligram / Vishnu",
    significance: "Observed during Pitru Paksha to grant salvation and Baikuntha to ancestors (Pitris).",
    significanceHi: "पितरों को यमलोक की यातना से मुक्त कर वैकुंठ लोक पहुंचाने वाली सर्वश्रेष्ठ एकादशी।",
    approxMonth: 9,
  },
  {
    slug: "papankusha-ekadashi",
    name: "Papankusha Ekadashi",
    nameHi: "पापांकुशा एकादशी",
    masa: "Ashvina",
    masaHi: "आश्विन",
    paksha: "shukla",
    deity: "Lord Padmanabha",
    significance: "Acts like an elephant goad (Ankusha) controlling and eliminating heavy sins.",
    significanceHi: "मन के अंकुश से पापों को नियंत्रित कर स्वर्ग एवं मोक्ष का मार्ग प्रशस्त करने वाली एकादशी।",
    approxMonth: 10,
  },
  {
    slug: "rama-ekadashi",
    name: "Rama Ekadashi",
    nameHi: "रमा एकादशी",
    masa: "Kartika",
    masaHi: "कार्तिक",
    paksha: "krishna",
    deity: "Mata Lakshmi & Lord Keshav",
    significance: "Celebrated before Diwali; bestows immense spiritual wealth and fulfills sankalpas.",
    significanceHi: "दीपावली से पूर्व माता लक्ष्मी की कृपा और अखंड सुख-समृद्धि प्रदान करने वाली एकादशी।",
    approxMonth: 10,
  },
  {
    slug: "devutthana-ekadashi",
    name: "Devutthana Ekadashi (Prabodhini)",
    nameHi: "देवउठनी एकादशी (प्रबोधिनी / तुलसी विवाह)",
    masa: "Kartika",
    masaHi: "कार्तिक",
    paksha: "shukla",
    deity: "Lord Vishnu",
    significance: "Lord Vishnu awakens from His 4-month sleep; auspicious wedding season begins with Tulsi Vivah.",
    significanceHi: "श्रीहरि के जागृत होने का महापर्व, चातुर्मास समाप्ति तथा शुभ विवाहों का मंगल आरम्भ।",
    approxMonth: 11,
  },
  {
    slug: "utpanna-ekadashi",
    name: "Utpanna Ekadashi",
    nameHi: "उत्पन्ना एकादशी",
    masa: "Margashirsha",
    masaHi: "मार्गशीर्ष",
    paksha: "krishna",
    deity: "Ekadashi Devi & Lord Vishnu",
    significance: "The divine birth of Ekadashi Devi who vanquished the demon Mura.",
    significanceHi: "एकादशी देवी का प्राकट्य दिवस; एकादशी व्रत का अनुष्ठान इसी दिन से आरम्भ किया जाता है।",
    approxMonth: 11,
  },
  {
    slug: "mokshada-ekadashi",
    name: "Mokshada Ekadashi (Gita Jayanti)",
    nameHi: "मोक्षदा एकादशी (गीता जयंती)",
    masa: "Margashirsha",
    masaHi: "मार्गशीर्ष",
    paksha: "shukla",
    deity: "Lord Krishna (Bhagavad Gita)",
    significance: "Bestows liberation (Moksha) from the cycle of birth and death; celebrates Gita Jayanti.",
    significanceHi: "कुरुक्षेत्र में भगवान श्रीकृष्ण द्वारा अर्जुन को भगवद्गीता का अमर उपदेश; मोक्ष फलदायिनी।",
    approxMonth: 12,
  },
];

function formatTimeInZone(d: Date, timeZone: string, isHi: boolean): string {
  return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

function formatDateInZone(d: Date, timeZone: string): string {
  const parts = calendarDateForZone(d, timeZone);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

/**
 * Calculates all Ekadashis for ANY year and ANY city worldwide,
 * detailing Smarta vs Vaishnava dates, Hari Vasara end time, Dwadashi end time,
 * and the exact morning Parana micro-window.
 */
export function calculateEkadashiCalendar(
  year: number,
  cityConfig?: CityConfig,
  isHi = false
): EkadashiRecord[] {
  const city = cityConfig || DEFAULT_CITY;
  const records: EkadashiRecord[] = [];

  // Search through all 365 days of the year
  const startDay = new Date(year, 0, 1, 12, 0, 0);
  const endDay = new Date(year, 11, 31, 12, 0, 0);

  const dayCursor = new Date(startDay.getTime());

  while (dayCursor <= endDay) {
    const sunrise = getSunrise(dayCursor, city);
    const tithiSnap = getTithiSnapshot(sunrise);

    // If today is Ekadashi at sunrise (tithi index % 15 === 10, i.e. 11th tithi)
    if (tithiSnap.number === 11) {
      const ekadashiDate = new Date(dayCursor.getTime());
      const ekadashiStart = tithiSnap.start;
      const ekadashiEnd = tithiSnap.end;

      // Check Dashami contact at Arunodaya (96 mins before sunrise) for Smarta vs Vaishnava rule
      const arunodaya = new Date(sunrise.getTime() - 96 * 60_000);
      const isDashamiAtArunodaya = tithiIndex(arunodaya) % 15 === 9; // 10th tithi = Dashami

      const fastDateSmarta = isDashamiAtArunodaya
        ? new Date(ekadashiDate.getTime() + 86_400_000) // Moves to next day if contaminated
        : ekadashiDate;

      // Vaishnavas avoid even partial Dashami contamination
      const fastDateVaishnava = isDashamiAtArunodaya
        ? new Date(ekadashiDate.getTime() + 86_400_000)
        : ekadashiDate;

      // Parana occurs on Dwadashi day (day after the fast)
      const paranaDay = new Date(fastDateSmarta.getTime() + 86_400_000);
      const paranaSunrise = getSunrise(paranaDay, city);
      const paranaSunset = getSunset(paranaDay, city);
      const daySpan = paranaSunset.getTime() - paranaSunrise.getTime();

      // Dwadashi tithi starts when Ekadashi ends
      const dwadashiStart = ekadashiEnd;
      // Dwadashi ends after ~24 hours
      const dwadashiEnd = tithiEnd(new Date(dwadashiStart.getTime() + 3600_000));

      // Hari Vasara is the first 1/4th (25%) of Dwadashi tithi
      const dwadashiDuration = dwadashiEnd.getTime() - dwadashiStart.getTime();
      const hariVasaraEnd = new Date(dwadashiStart.getTime() + dwadashiDuration * 0.25);

      // PARANA TIME MICRO-WINDOW RULES:
      // 1. Fast must NOT be broken before sunrise
      // 2. Fast must NOT be broken during Hari Vasara
      // 3. Fast must be broken before Dwadashi ends
      let paranaOpenTime = new Date(Math.max(paranaSunrise.getTime(), hariVasaraEnd.getTime()));
      let paranaCloseTime: Date;

      if (dwadashiEnd.getTime() < paranaSunrise.getTime() + daySpan * 0.4) {
        // If Dwadashi ends early morning, must break before Dwadashi ends
        paranaCloseTime = dwadashiEnd;
      } else {
        // Ideal window: Pratahkaal (first 1/5th to 1/3rd of daytime)
        paranaCloseTime = new Date(paranaSunrise.getTime() + daySpan * 0.35);
      }

      // Edge case: if paranaOpenTime >= paranaCloseTime
      if (paranaOpenTime.getTime() >= paranaCloseTime.getTime()) {
        paranaCloseTime = new Date(paranaOpenTime.getTime() + 90 * 60_000);
      }

      // Match with known Ekadashi from directory
      const monthNumber = calendarDateForZone(ekadashiDate, city.timeZone).month;
      const meta =
        EKADASHI_DIRECTORY.find(
          (d) => d.paksha === tithiSnap.paksha && Math.abs(d.approxMonth - monthNumber) <= 1
        ) || EKADASHI_DIRECTORY[0];

      const paranaWindowEn = `${formatTimeInZone(paranaOpenTime, city.timeZone, false)} to ${formatTimeInZone(paranaCloseTime, city.timeZone, false)}`;
      const paranaWindowHi = `${formatTimeInZone(paranaOpenTime, city.timeZone, true)} से ${formatTimeInZone(paranaCloseTime, city.timeZone, true)}`;

      records.push({
        id: `${meta.slug}-${year}-${records.length + 1}`,
        name: meta.name,
        nameHi: meta.nameHi,
        masa: meta.masa,
        masaHi: meta.masaHi,
        paksha: meta.paksha,
        deity: meta.deity,
        significance: meta.significance,
        significanceHi: meta.significanceHi,
        fastDateSmarta,
        fastDateSmartaString: formatDateInZone(fastDateSmarta, city.timeZone),
        fastDateVaishnava,
        fastDateVaishnavaString: formatDateInZone(fastDateVaishnava, city.timeZone),
        isSmartaVaishnavaSame: fastDateSmarta.getTime() === fastDateVaishnava.getTime(),
        tithiStart: ekadashiStart,
        tithiEnd: ekadashiEnd,
        tithiStartFormatted: formatTimeInZone(ekadashiStart, city.timeZone, isHi),
        tithiEndFormatted: formatTimeInZone(ekadashiEnd, city.timeZone, isHi),
        paranaDate: paranaDay,
        paranaDateString: formatDateInZone(paranaDay, city.timeZone),
        paranaStart: paranaOpenTime,
        paranaEnd: paranaCloseTime,
        paranaWindowFormatted: paranaWindowEn,
        paranaWindowFormattedHi: paranaWindowHi,
        hariVasaraEnd,
        hariVasaraEndFormatted: formatTimeInZone(hariVasaraEnd, city.timeZone, isHi),
        dwadashiEnd,
        dwadashiEndFormatted: formatTimeInZone(dwadashiEnd, city.timeZone, isHi),
        paranaRuleNote: `Parana must be done on Dwadashi after Hari Vasara ends at ${formatTimeInZone(hariVasaraEnd, city.timeZone, false)} and before ${formatTimeInZone(paranaCloseTime, city.timeZone, false)}.`,
        paranaRuleNoteHi: `हरिवासर समाप्त होने के बाद प्रातः ${formatTimeInZone(hariVasaraEnd, city.timeZone, true)} से ${formatTimeInZone(paranaCloseTime, city.timeZone, true)} के मध्य पारणा करें।`,
      });

      // Advance by at least 12 days to avoid detecting the same Ekadashi
      dayCursor.setDate(dayCursor.getDate() + 11);
    }

    dayCursor.setDate(dayCursor.getDate() + 1);
  }

  return records;
}
