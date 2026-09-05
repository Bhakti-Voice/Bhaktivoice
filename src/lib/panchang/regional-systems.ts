import {
  sunRasi,
  moonRasi,
  tropicalSunLon,
  tropicalMoonLon,
  siderealLon,
  elongation,
  lahiriAyanamsa,
  getTithiSnapshot,
  getNakshatraSnapshot,
  getYogaSnapshot,
  getKaranaSnapshot,
} from "./astronomy";
import { DEFAULT_CITY, getCityById, type CityConfig } from "./cities";
import { getPanchang } from "./engine";
import {
  MASA_NAMES,
  MASA_NAMES_HI,
  NAKSHATRA_NAMES,
  NAKSHATRA_NAMES_HI,
  NAKSHATRA_DEITIES,
  RASI_NAMES,
  RASI_NAMES_HI,
} from "./names";
import type { DayPanchang } from "./types";

export type RegionalPanchangSystem = {
  slug: string;
  titleEn: string;
  titleHi: string;
  category: "solar" | "lunar" | "astrological" | "utility";
  region: string;
  regionHi: string;
  descriptionEn: string;
  descriptionHi: string;
  featuresEn: string[];
  featuresHi: string[];
  keywordsEn: string[];
  keywordsHi: string[];
  faqsEn: { question: string; answer: string }[];
  faqsHi: { question: string; answer: string }[];
  seoGuideEn: string;
  seoGuideHi: string;
};

// 16 regional and specialized panchang systems matching user request
export const REGIONAL_SYSTEMS: Record<string, RegionalPanchangSystem> = {
  "month-panchang": {
    slug: "month-panchang",
    titleEn: "Month Panchang (मासिक पंचांग)",
    titleHi: "मासिक पंचांग — सम्पूर्ण माह की तिथियाँ, व्रत एवं पर्व",
    category: "lunar",
    region: "All India / National",
    regionHi: "अखिल भारतीय / राष्ट्रीय",
    descriptionEn: "Complete monthly Hindu calendar detailing Shukla & Krishna Paksha, Ekadashis, Purnima, Amavasya, and auspicious muhurat for every day of the month.",
    descriptionHi: "सम्पूर्ण महीने का वैदिक पंचांग। शुक्ल और कृष्ण पक्ष की तिथियाँ, एकादशी, पूर्णिमा, अमावस्या, प्रदोष, संकष्टी चतुर्थी एवं दैनिक शुभ मुहूर्त।",
    featuresEn: [
      "Full month grid with day-by-day Tithi & Nakshatra",
      "Purnimanta & Amanta lunar month markers",
      "Major vrat, upavas, and festival highlights",
      "Auspicious days for Griha Pravesh, marriage & property purchases"
    ],
    featuresHi: [
      "दिन-प्रतिदिन तिथि, वार एवं नक्षत्र का विस्तृत विवरण",
      "पूर्णिमान्त और अमान्त मास गणना की स्पष्टता",
      "सभी एकादशी, प्रदोष एवं मासिक त्योहारों की तालिका",
      "गृह प्रवेश, विवाह और वाहन क्रय हेतु शुभ तिथियाँ"
    ],
    keywordsEn: ["month panchang", "monthly hindu calendar", "masik panchang", "tithi calendar this month", "hindu month dates"],
    keywordsHi: ["मासिक पंचांग", "महीने का पंचांग", "आज का महीना हिन्दू कैलेंडर", "माह के व्रत और त्योहार"],
    faqsEn: [
      {
        question: "How is a Hindu lunar month calculated in the Month Panchang?",
        answer: "A Hindu lunar month (Masa) consists of two fortnights: Shukla Paksha (waxing moon) and Krishna Paksha (waning moon), spanning approximately 29.5 solar days from one New Moon (Amanta) or Full Moon (Purnimanta) to the next."
      },
      {
        question: "What is the difference between Purnimanta and Amanta systems?",
        answer: "In North India, months end on Purnima (Purnimanta system), whereas in Gujarat, Maharashtra, and South India, months end on Amavasya (Amanta system). The Paksha and daily Tithi remain identical in both systems."
      }
    ],
    faqsHi: [
      {
        question: "मासिक पंचांग में हिन्दू मास की गणना कैसे की जाती है?",
        answer: "हिन्दू मास में दो पक्ष होते हैं: शुक्ल पक्ष (बढ़ता चंद्रमा) और कृष्ण पक्ष (घटता चंद्रमा)। पूर्णिमान्त मास पूर्णिमा पर समाप्त होता है और अमान्त मास अमावस्या पर।"
      },
      {
        question: "पूर्णिमान्त और अमान्त पंचांग में क्या अंतर है?",
        answer: "उत्तर भारत में मास की गणना पूर्णिमा से पूर्णिमा (पूर्णिमान्त) की जाती है, जबकि महाराष्ट्र, गुजरात और दक्षिण भारत में अमावस्या से अमावस्या (अमान्त) तक की जाती है। तिथियाँ दोनों में समान रहती हैं।"
      }
    ],
    seoGuideEn: `The **Month Panchang (मासिक पंचांग)** is the foundation of traditional Indian life, planning, and spiritual observances. While daily life often moves according to the Gregorian calendar, our sacred rituals, fasts, pujas, and family milestones are guided by the rhythmic movement of the Sun and Moon.

Each lunar month consists of 30 Tithis divided equally into the **Shukla Paksha** (bright fortnight leading to Purnima) and **Krishna Paksha** (dark fortnight culminating in Amavasya). By tracking the monthly panchang, devotees can prepare in advance for holy days such as Ekadashi, Pradosham, Shivratri, and Sankashti Chaturthi, ensuring that spiritual discipline is sustained harmoniously throughout the year.`,
    seoGuideHi: `**मासिक पंचांग** भारतीय सनातन परंपरा, धर्म साधना और पारिवारिक संस्कारों का आधार है। यद्यपि दैनिक कार्यों में ग्रेगोरियन कैलेंडर का उपयोग होता है, किंतु हमारे सभी व्रत, पर्व, पूजा-अनुष्ठान और शुभ कार्य सूर्य और चंद्रमा की गति पर आधारित वैदिक पंचांग के अनुसार ही संपन्न होते हैं।

प्रत्येक हिन्दू मास में 30 तिथियाँ होती हैं जो दो पक्षों—शुक्ल पक्ष (पूर्णिमा तक) और कृष्ण पक्ष (अमावस्या तक)—में विभाजित हैं। मासिक पंचांग के माध्यम से भक्तजन एकादशी, प्रदोष, मासिक शिवरात्रि और संकष्टी चतुर्थी जैसे पावन व्रतों की पूर्व तैयारी कर सकते हैं।`
  },

  "dainik-panchang": {
    slug: "dainik-panchang",
    titleEn: "Dainik Panchang (दैनिक पंचांग)",
    titleHi: "दैनिक पंचांग — आज के पाँच अंग, सूर्य-चंद्र समय एवं चौघड़िया",
    category: "lunar",
    region: "All India / National",
    regionHi: "अखिल भारतीय / राष्ट्रीय",
    descriptionEn: "Daily Vedic Panchang providing accurate calculations for the 5 celestial limbs: Tithi, Vara, Nakshatra, Yoga, and Karana, with precise Sunrise, Sunset, Rahu Kaal, and Choghadiya.",
    descriptionHi: "आज का संपूर्ण दैनिक वैदिक पंचांग। तिथि, वार, नक्षत्र, योग, करण के साथ सूर्योदय-सूर्यास्त, राहु काल, अभिजित मुहूर्त और दिन-रात का चौघड़िया।",
    featuresEn: [
      "Exact 5 limbs of Vedic time (Panch-Anga)",
      "Accurate Sunrise, Sunset, Moonrise & Moonset timings",
      "Shubh Muhurats (Abhijit, Brahma, Amrit Kaal)",
      "Ashubh Timings (Rahu Kaal, Yamaganda, Gulika, Durmuhurat)"
    ],
    featuresHi: [
      "पंचांग के पाँचों अंगों (तिथि, वार, नक्षत्र, योग, करण) का सूक्ष्म गणित",
      "सटीक सूर्योदय, सूर्यास्त, चंद्रोदय और चंद्रास्त समय",
      "शुभ मुहूर्त (अभिजित, ब्रह्म मुहूर्त, अमृत काल)",
      "अशुभ समय (राहु काल, यमगण्ड, गुलिक काल, दुर्मुहूर्त)"
    ],
    keywordsEn: ["dainik panchang", "daily panchang", "aaj ka panchang", "today panchangam", "5 limbs of vedic calendar"],
    keywordsHi: ["दैनिक पंचांग", "आज का पंचांग", "दैनिक तिथि नक्षत्र", "आज का राहुकाल और चौघड़िया"],
    faqsEn: [
      {
        question: "What are the five limbs of Dainik Panchang?",
        answer: "The five limbs (Panch-Anga) are: 1. Tithi (Lunar day), 2. Vara (Solar weekday), 3. Nakshatra (Lunar constellation), 4. Yoga (Angular relationship between Sun and Moon), and 5. Karana (Half of a Tithi)."
      }
    ],
    faqsHi: [
      {
        question: "दैनिक पंचांग के पाँच अंग कौन-से हैं?",
        answer: "पंचांग के पाँच अंग हैं: १. तिथि (चंद्र दिवस), २. वार (सप्ताह का दिन), ३. नक्षत्र (तारा समूह), ४. योग (सूर्य-चंद्र का कोणीय योग), और ५. करण (एक तिथि का आधा भाग)।"
      }
    ],
    seoGuideEn: `**Dainik Panchang (दैनिक पंचांग)** reflects the living celestial clock of the universe. In Vedic science, every moment carries a unique energetic vibration governed by the planetary positions of the Sun and Moon.

By reviewing the Dainik Panchang each morning before starting your day, you align your conscious mind with cosmic rhythms. Knowing the prevailing Nakshatra inspires focused meditation, observing Rahu Kaal helps avoid avoidable conflicts during fragile planetary hours, and performing charity during auspicious Muhurats magnifies spiritual merit manifold.`,
    seoGuideHi: `**दैनिक पंचांग** ब्रह्मांड की जीवंत खगोलीय घड़ी का दर्पण है। वैदिक ज्योतिष के अनुसार प्रत्येक क्षण सूर्य और चंद्रमा की स्थिति से एक विशिष्ट ऊर्जा और स्पंदन धारण करता है।

प्रतिदिन प्रातः दैनिक पंचांग का दर्शन करने से साधक का चित्त प्राकृतिक नियमों के साथ एकाकार होता है। आज का नक्षत्र जानने से जप में एकाग्रता बढ़ती है, राहु काल का परिहार करने से कार्यों में विघ्न नहीं आते, और शुभ मुहूर्त में किए गए सत्कर्म अनंत गुना फल प्रदान करते हैं।`
  },

  "assamese-panjika": {
    slug: "assamese-panjika",
    titleEn: "Assamese Panjika (অসমীয়া পঞ্জিকা)",
    titleHi: "असमिया पंजिका — भास्कर संवत एवं असम का सौर कैलेंडर",
    category: "solar",
    region: "Assam & Northeast India",
    regionHi: "असम एवं पूर्वोत्तर भारत",
    descriptionEn: "Authentic Assamese Panjika (অসমীয়া পঞ্জিকা) based on the Bhaskarabda solar calendar, highlighting Bohag, Kati, Magh Bihu, tithis, and auspicious Assamese lagna timings.",
    descriptionHi: "भास्कराब्द सौर कैलेंडर पर आधारित प्रामाणिक असमिया पंजिका। बोहाग, काति, माघ बिहू, दैनिक तिथि, नक्षत्र एवं मांगलिक मुहूर्त।",
    featuresEn: [
      "Solar months: Bohag, Jeth, Ahar, Shaon, Bhada, Ahin, Kati, Aghon, Puh, Magh, Phagun, Chot",
      "Bihu festival timings: Rongali (Bohag), Kongali (Kati), and Bhogali (Magh) Bihu",
      "Kamakhya temple special devatas and Ambubachi Mela observances",
      "Traditional Assamese Bor Din and sacred fasting days"
    ],
    featuresHi: [
      "सौर मास: बोहाग, जेठ, आहार, शाओन, भाद, आहीन, काति, आघोन, पूह, माघ, फागुन, चोत",
      "तीनों बिहू के पावन मुहूर्त: रोंगाली (बोहाग), कोंगाली (काति) एवं भोगाली (माघ) बिहू",
      "कामाख्या धाम विशेष अनुष्ठान एवं अम्बुबाची महापर्व",
      "असमिया परंपरा के अनुसार मांगलिक कार्य एवं विवाह लग्न"
    ],
    keywordsEn: ["assamese panjika", "assamese calendar 2026", "asomiya panjika", "bohag bihu panjika", "bhaskarabda calendar"],
    keywordsHi: ["असमिया पंजिका", "असम कैलेंडर", "बोहाग बिहू पंजिका", "कामाख्या पंचांग"],
    faqsEn: [
      {
        question: "What calendar era does the Assamese Panjika follow?",
        answer: "The Assamese Panjika follows the Bhaskar calendar (Bhaskarabda), named after King Bhaskaravarman of Kamarupa, beginning in 594 CE alongside the Bengali San."
      },
      {
        question: "When does the Assamese New Year begin?",
        answer: "The Assamese New Year begins on the first day of Bohag (Bohag 1, usually April 14 or 15), celebrated with immense joy as Rongali Bihu."
      }
    ],
    faqsHi: [
      {
        question: "असमिया पंजिका किस संवत पर आधारित है?",
        answer: "असमिया पंजिका भास्कराब्द (भास्कर संवत) पर आधारित है, जिसका आरंभ कामरूप के महान राजा भास्करवर्मन के शासनकाल (594 ईस्वी) से माना जाता है।"
      },
      {
        question: "असमिया नववर्ष कब आरंभ होता है?",
        answer: "असमिया नववर्ष बोहाग मास की संक्रांति (14 या 15 अप्रैल) को रोंगाली बिहू के साथ प्रारंभ होता है।"
      }
    ],
    seoGuideEn: `The **Assamese Panjika (অসমীয়া পঞ্জিকা)** holds a deeply sacred and cultural place in Assam and across the Brahmaputra valley. Rooted in the ancient Kamarupa astronomical traditions, it harmonizes the Sun's transit (Sankranti) with sacred lunar tithis.

The heart of Assamese culture beats with the three Bihus: **Rongali Bihu** in Bohag celebrating springtime creation and the New Year; **Kongali Bihu** in Kati for lighting sacred saki lamps in paddy fields; and **Bhogali Bihu** in Magh honoring Agni Devata with community feasts (Uruka). Furthermore, the annual **Ambubachi Mela** at the revered Maa Kamakhya Devi Peeth marks the earth's rejuvenation based on the Sun's transit into Ardra Nakshatra.`,
    seoGuideHi: `**असमिया पंजिका (অসমীয়া পঞ্জিকা)** असम तथा संपूर्ण पूर्वोत्तर भारत की सांस्कृतिक और आध्यात्मिक आत्मा है। प्राचीन कामरूप की खगोलीय परंपरा पर आधारित यह पंजिका सौर संक्रांति और वैदिक चंद्र तिथियों का अद्भुत संगम है।

असमिया संस्कृति के तीन मुख्य पर्व—**रोंगाली बिहू** (नववर्ष व वसंतोत्सव), **कोंगाली बिहू** (कार्तिक में खेतों में दीपदान), और **भोगाली बिहू** (अग्नि पूजन व फसल कटाई)—पंजिका के अनुसार ही मनाए जाते हैं। माँ कामाख्या धाम में लगने वाला विश्वप्रसिद्ध **अम्बुबाची मेला** जब सूर्य आर्द्रा नक्षत्र में प्रवेश करता है, इसी पंजिका के द्वारा निश्चित होता है।`
  },

  "bengali-panjika": {
    slug: "bengali-panjika",
    titleEn: "Bengali Panjika (বাংলা পঞ্জিকা)",
    titleHi: "बंगाली पंजिका — बांग्ला संवत, दुर्गा पूजा एवं शुद्ध निर्णय",
    category: "solar",
    region: "Bengal, Tripura & Eastern India",
    regionHi: "पश्चिम बंगाल, त्रिपुरा एवं पूर्वी भारत",
    descriptionEn: "Comprehensive Bengali Panjika (বাংলা পঞ্জিকা) based on Surya Siddhanta & Drik Siddhanta, detailing Pohela Boishakh, Durga Puja timings, tithis, and Shubho Bibaho muhurat.",
    descriptionHi: "सूर्य सिद्धांत एवं दृक सिद्धांत पर आधारित प्रामाणिक बंगाली पंजिका। पोइला बैशाख, दुर्गा पूजा समय, एकादशी एवं शुभ विवाह लग्न।",
    featuresEn: [
      "Bengali Solar Months: Boishakh to Choitro",
      "Durga Puja Mahasaptami, Mahashtami, Sandhi Puja & Dashami exact timings",
      "Shubho Bibaho (Bengali marriage) and Annaprashan dates",
      "Kali Puja, Saraswati Puja, and Nababarsha guidelines"
    ],
    featuresHi: [
      "१२ बांग्ला मास: बैशाख से चैत्र तक की संपूर्ण पंजिका",
      "श्री दुर्गा पूजा, महासप्तमी, महाअष्टमी, संधि पूजा एवं विजयादशमी के सटीक मुहूर्त",
      "शुभ विवाह दिन, उपनयन एवं अन्नप्राशन के मांगलिक लग्न",
      "काली पूजा, सरस्वती पूजा एवं पोइला बैशाख का पावन समय"
    ],
    keywordsEn: ["bengali panjika", "bangla calendar 2026", "pohela boishakh panjika", "durga puja 2026 dates", "surya siddhanta panjika"],
    keywordsHi: ["बंगाली पंजिका", "बांग्ला कैलेंडर", "दुर्गा पूजा 2026", "पोइला बैशाख", "बंगाली शादी के लग्न"],
    faqsEn: [
      {
        question: "What is the significance of Sandhi Puja in Bengali Panjika?",
        answer: "Sandhi Puja takes place at the exact cosmic interstice of the last 24 minutes of Ashtami tithi and the first 24 minutes of Navami tithi, commemorating Devi Durga's triumph over Chanda and Munda as Chamunda."
      }
    ],
    faqsHi: [
      {
        question: "बंगाली पंजिका में संधि पूजा का क्या महत्व है?",
        answer: "अष्टमी तिथि के अंतिम २४ मिनट और नवमी तिथि के प्रथम २४ मिनट का संगम 'संधि काल' कहलाता है। इसी समय माँ दुर्गा ने चामुंडा रूप धारण कर चंड-मुंड का संहार किया था।"
      }
    ],
    seoGuideEn: `The **Bengali Panjika (বাংলা পঞ্জিকা)** is an indispensable spiritual guide for millions of Bengalis worldwide. Formulated using precise mathematical treatises such as the **Surya Siddhanta**, it determines the exact cosmic moments when divine energies touch the earth.

The pinnacle of the Bengali calendar is **Durga Puja**, where every ritual—from the invoking of the Mother on Sasthi, the bathing of the Nabapatrika on Saptami, the sacred Pushpanjali on Ashtami, to the pivotal **Sandhi Puja**—demands second-by-second astronomical precision. It also marks the prosperous sunrise of **Pohela Boishakh** (Noboborsho) and sacred fasting days of Loknath Baba, Ramakrishna Paramahamsa, and Sri Chaitanya Mahaprabhu.`,
    seoGuideHi: `**बंगाली पंजिका (বাংলা পঞ্জিকা)** संपूर्ण विश्व के बंगाली समाज के लिए धर्म, संस्कृति और मांगलिक कर्मों का मार्गदर्शक ग्रंथ है। **सूर्य सिद्धांत** और दृक गणित के नियमों के आधार पर इसमें सूर्य और चंद्रमा के सूक्ष्म संचार का अंकन होता है।

इस पंजिका का सबसे पावन पर्व **दुर्गा पूजा** है, जिसमें महासप्तमी नवपत्रिका प्रवेश, महाअष्टमी पुष्पांजलि, और ४८ मिनट की अत्यंत चमत्कारी **संधि पूजा** का समय पल-पल की सटीकता के साथ निकाला जाता है। इसके अतिरिक्त पोइला बैशाख, काली पूजा, और चैतन्य महाप्रभु के आविर्भाव दिवस का निर्धारण भी इसी से होता है।`
  },

  "tamil-panchangam": {
    slug: "tamil-panchangam",
    titleEn: "Tamil Panchangam (தமிழ் பஞ்சாங்கம்)",
    titleHi: "तमिल पंचांगम — सौर तिरुक्कणित एवं वाक्किय पंचांगम",
    category: "solar",
    region: "Tamil Nadu & South India",
    regionHi: "तमिलनाडु एवं दक्षिण भारत",
    descriptionEn: "Authentic Tamil Panchangam (தமிழ் பஞ்சாங்கம்) following the Solar Sauramana calendar. Track Chithirai Puthandu, Tamil months, Nalla Neram, Rahu Kalam, and Yamagandam.",
    descriptionHi: "सौर सौरमान कैलेंडर पर आधारित तमिल पंचांगम। तमिल नववर्ष (चित्तिरै), नल्ल नेरम, राहु कालम, यमगंडम और शुभ मुहूर्त।",
    featuresEn: [
      "12 Tamil Months: Chithirai, Vaikasi, Aani, Aadi, Aavani, Purattasi, Aippasi, Karthigai, Margazhi, Thai, Maasi, Panguni",
      "Daily Nalla Neram (auspicious hours) and Gowri Nalla Neram",
      "Aadi Perukku, Purattasi Sani, and Margazhi Tiruppavai schedules",
      "Thai Pongal, Panguni Uthiram, and Skanda Sashti vratham"
    ],
    featuresHi: [
      "१२ तमिल सौर मास: चित्तिरै, वैकासी, आनि, आदि, आवणि, पुरट्टासी, ऐप्पसी, कार्तिकै, मार्गशी, तै, मासी, पंगुनि",
      "दैनिक नल्ल नेरम (शुभ समय) एवं गौरी नल्ल नेरम",
      "पुरट्टासी शनिवार, मार्गशी तिरुप्पावै एवं आदि पेरुक्कू के नियम",
      "तै पोंगल, पंगुनि उथिरम एवं स्कंद षष्ठी व्रत"
    ],
    keywordsEn: ["tamil panchangam", "tamil calendar 2026", "nalla neram today", "rahu kalam today tamil", "chithirai puthandu 2026"],
    keywordsHi: ["तमिल पंचांगम", "तमिल कैलेंडर", "नल्ल नेरम आज", "राहु कालम तमिल", "पोंगल मुहूर्त"],
    faqsEn: [
      {
        question: "What is Nalla Neram in Tamil Panchangam?",
        answer: "Nalla Neram refers to the auspicious time windows in each day when planetary forces are constructive and spiritually uplifting, ideal for undertaking prayers, travels, and new beginnings."
      },
      {
        question: "How do Tamil solar months function?",
        answer: "Tamil months begin on the day the Sun transitions (Sankranthi) into a new zodiac constellation. For instance, Chithirai begins when the Sun enters Mesha (Aries)."
      }
    ],
    faqsHi: [
      {
        question: "तमिल पंचांगम में 'नल्ल नेरम' क्या है?",
        answer: "नल्ल नेरम (Nalla Neram) दिन का वह शुभ कालखंड है जिसमें ग्रह-नक्षत्रों का प्रभाव सर्वाधिक सकारात्मक होता है। कोई भी शुभ कार्य या यात्रा इसी समय आरंभ की जाती है।"
      }
    ],
    seoGuideEn: `The **Tamil Panchangam (தமிழ் பஞ்சாங்கம்)** represents one of India's oldest solar calendar systems (Sauramana). Measured from the exact transit of the Sun into Mesha Rasi on **Chithirai 1** (Tamil New Year / Puthandu), it structures religious and temple life throughout Tamil Nadu.

Devotees rely on **Nalla Neram** and **Gowri Panchangam** to select moments of fortune, while strictly sidestepping Rahu Kalam and Yamagandam. Sacred months such as **Purattasi** are consecrated entirely to Lord Venkateswara (Perumal), **Margazhi** is saturated with Andal's divine Tiruppavai at dawn, and **Thai** heralds gratitude for the harvest during Pongal.`,
    seoGuideHi: `**तमिल पंचांगम (தமிழ் பஞ்சாங்கம்)** भारत की प्राचीनतम सौर पंचांग प्रणालियों में से एक है। जब सूर्य मेष राशि में प्रवेश करता है, तब **चित्तिरै १** (तमिल नववर्ष / पुथांडु) के साथ इसका आरंभ होता है।

तमिल श्रद्धालु दैनिक जीवन में **नल्ल नेरम** और **गौरी पंचांगम** के द्वारा शुभ कार्यों का चयन करते हैं तथा राहु कालम और यमगंडम का त्याग करते हैं। **पुरट्टासी** मास भगवान विष्णु (वेंकटेश्वर) की आराधना के लिए, **मार्गशी** मास आंडाल की तिरुप्पावै साधना के लिए, और **तै** मास पोंगल के पावन कृतज्ञता पर्व के लिए जाना जाता है।`
  },

  "odia-panji": {
    slug: "odia-panji",
    titleEn: "Odia Panji (ଓଡ଼ିଆ ପଞ୍ଜିକା)",
    titleHi: "ओडिया पंजिका — श्री जगन्नाथ मंदिर पंचांग एवं महाप्रभु नीति",
    category: "solar",
    region: "Odisha & Eastern India",
    regionHi: "ओडिशा एवं पूर्वी भारत",
    descriptionEn: "Traditional Odia Panji (ଓଡ଼ିଆ ପଞ୍ଜିକା) aligned with Shree Jagannath Temple traditions of Puri. Track Pana Sankranti, Ratha Yatra, Chandan Yatra, and daily tithis.",
    descriptionHi: "श्री जगन्नाथ धाम पुरी की पावन परंपरा से जुड़ी ओडिया पंजिका। पणा संक्रांति (महाविषुव), रथयात्रा, चंदन यात्रा एवं दैनिक शुभ लग्न।",
    featuresEn: [
      "Aligned with Kohinoor, Radharaman, and Asali Khadiratna Odia traditions",
      "Pana Sankranti (Maha Vishuva Sankranti / Odia New Year)",
      "Puri Ratha Yatra, Snana Yatra, and Bahuda Yatra accurate schedules",
      "Manabasa Gurubara, Prathamastami, and Raja Parba observances"
    ],
    featuresHi: [
      "कोहिनूर, राधारमण एवं प्राचीन खादीरत्न पंजिका परंपराओं के अनुसार",
      "पणा संक्रांति (महाविषुव संक्रांति / ओडिया नववर्ष)",
      "श्री क्षेत्र पुरी की रथयात्रा, स्नान यात्रा और बहुड़ा यात्रा के सटीक मुहूर्त",
      "मानबसा गुरुवार, प्रथमाष्टमी और रज पर्व की पावन तिथियाँ"
    ],
    keywordsEn: ["odia panji", "odia calendar 2026", "jagannath temple panji", "ratha yatra 2026 date", "pana sankranti"],
    keywordsHi: ["ओडिया पंजिका", "ओडिशा पंचांग", "जगन्नाथ पुरी पंजिका", "रथ यात्रा 2026 तारीख", "पणा संक्रांति"],
    faqsEn: [
      {
        question: "How is the Odia Panji connected to Jagannath Temple?",
        answer: "The Odia Panji directly dictates the daily temple sevas, nithis, and festival ceremonies of Mahaprabhu Jagannath at the Puri Srimandir."
      }
    ],
    faqsHi: [
      {
        question: "ओडिया पंजिका का जगन्नाथ मंदिर से क्या संबंध है?",
        answer: "ओडिया पंजिका के आधार पर ही श्री जगन्नाथ मंदिर पुरी में महाप्रभु की नित्य सेवा, भोग और रथयात्रा जैसी सभी दिव्य नीतियों का समय निर्धारित होता है।"
      }
    ],
    seoGuideEn: `The **Odia Panji (ଓଡ଼ିଆ ପଞ୍ଜିକା)** is profoundly intertwined with the devotion to **Lord Jagannath**, the Lord of the Universe. Celebrated across Odisha, this panjika directs both agricultural life and the grand liturgical rituals of Srimandir in Puri.

The Odia year commences on **Pana Sankranti** (Maha Vishuva Sankranti), when sacred sweet water (pana) is offered in earthen pots with holy basil. During the monsoon, the glorious **Ratha Yatra** draws millions as the Lord steps out of His sanctum onto Nandighosa chariot on Ashadha Shukla Dwitiya. Throughout the month of Margasira, women observe the sanctified **Manabasa Gurubara** fasting in honor of Mata Mahalakshmi.`,
    seoGuideHi: `**ओडिया पंजिका (ଓଡ଼ିଆ ପଞ୍ଜିକା)** महाप्रभु **श्री जगन्नाथ** के चरणों में समर्पित ओडिशा की आध्यात्मिक धरोहर है। यह पंजिका पुरी श्रीमंदिर की सेवा-नीति से लेकर प्रत्येक ओडिया परिवार के दैनिक धार्मिक आचरण का नियमन करती है।

ओडिया नववर्ष **पणा संक्रांति** पर आरंभ होता है। आषाढ़ शुक्ल द्वितीया को विश्वप्रसिद्ध **रथयात्रा** का आयोजन इसी पंजिका के द्वारा निश्चित होता है। इसके अलावा मार्गशीर्ष में माता महालक्ष्मी की उपासना का **मानबसा गुरुवार** और कन्याओं का सम्मान पर्व **प्रथमाष्टमी** अत्यंत श्रद्धा से मनाए जाते हैं।`
  },

  "malayalam-panchangam": {
    slug: "malayalam-panchangam",
    titleEn: "Malayalam Panchangam (മലയാളം പഞ്ചാംഗം)",
    titleHi: "मलयालम पंचांगम — कोल्लम वर्ष, ओंणम एवं विषु मुहूर्त",
    category: "solar",
    region: "Kerala & South India",
    regionHi: "केरल एवं दक्षिण भारत",
    descriptionEn: "Accurate Malayalam Panchangam (മലയാളം പഞ്ചാംഗം) following the Kollam Era (കൊല്ലവർഷം). Check Chingam Onam, Vishu Kani, Sabarimala Mandala Kalam, and daily Nakshtras.",
    descriptionHi: "कोल्लम संवत पर आधारित प्रामाणिक मलयालम पंचांगम। चिंगम ओंणम, मेष विषु, सबरीमाला मंडल काल और दैनिक नक्षत्र-मुहूर्त।",
    featuresEn: [
      "12 Malayalam Solar Months: Chingam, Kanni, Thulam, Vrischikam, Dhanu, Makaram, Kumbham, Meenam, Medam, Edavam, Mithunam, Karkidakam",
      "Vishu Kani & Kaineettam auspicious time calculation",
      "Sabarimala Mandala season & Makaravilakku sacred timings",
      "Thiruvonam, Attukal Pongala, and Vishu festival guide"
    ],
    featuresHi: [
      "१२ मलयालम सौर मास: चिंगम, कन्नि, तुलाम, वृश्चिकम, धनु, मकरम, कुंभम, मीनम, मेडम, एडवम, मिथुनम, कर्कडकम",
      "विषु कणी एवं कैनीट्टम के शुभ दर्शन का समय",
      "सबरीमाला मंडलम एवं मकरविलक्कु का पावन कालखंड",
      "तिरुवोणम (ओंणम), आट्टुकाल पोंगाल और कर्कटक वावु बलि"
    ],
    keywordsEn: ["malayalam panchangam", "kerala calendar 2026", "kollam era calendar", "onam 2026 date", "vishu 2026 date"],
    keywordsHi: ["मलयालम पंचांगम", "केरल पंचांग", "कोल्लम वर्ष", "ओंणम 2026", "विषु मुहूर्त"],
    faqsEn: [
      {
        question: "What is the Kollam Era in Malayalam calendar?",
        answer: "The Kollam Era (Kollavarsham) is the traditional solar calendar of Kerala established in 825 CE, beginning with the month of Chingam."
      }
    ],
    faqsHi: [
      {
        question: "मलयालम पंचांगम में कोल्लम संवत क्या है?",
        answer: "कोल्लम संवत (कोल्लवर्षम) केरल का पारंपरिक सौर कैलेंडर है, जिसकी स्थापना ८२५ ईस्वी में हुई थी। इसका पहला महीना 'चिंगम' होता है।"
      }
    ],
    seoGuideEn: `The **Malayalam Panchangam (മലയാളം പഞ്ചാംഗം)** is the sacred celestial guide of God's Own Country, Kerala. Operating under the ancient **Kollam Era (Kollavarsham)**, it tracks the Sun's transit through the zodiacal mansions with exquisite precision.

The year reaches its joyous crescendo in **Chingam** with the celebration of **Thiruvonam (Onam)**, welcoming King Mahabali. In the month of **Medam**, the dawn of **Vishu** invites the auspicious sight of Vishu Kani—gold, fruits, mirror, and yellow Kani Konna flowers. From **Vrischikam 1**, millions don the black dhoti and Tulsi beads to embark on the austere 41-day Vratam for Lord Ayyappa at **Sabarimala**.`,
    seoGuideHi: `**मलयालम पंचांगम (മലയാളം പഞ്ചാംഗം)** केरल की पावन देवभूमि का दिव्य समय-मानक है। **कोल्लम संवत (८२५ ईस्वी)** के आधार पर चलने वाला यह सौर पंचांग सूर्य के राशि संक्रमण के अनुसार संचालित होता है।

**चिंगम** मास में महाबली के स्वागत का महापर्व **ओंणम (तिरुवोणम)** मनाया जाता है। **मेडम** मास में **विषु** के दिन प्रातःकाल 'विषु कणी' के दर्शन कर सुख-समृद्धि की प्रार्थना की जाती है। **वृश्चिकम १** से भगवान अय्यप्पा के पावन धाम **सबरीमाला** के लिए ४१ दिवसीय कठिन मंडल व्रत का आरंभ इसी पंचांग से होता है।`
  },

  "marathi-panchang": {
    slug: "marathi-panchang",
    titleEn: "Marathi Panchang (मराठी पंचांग)",
    titleHi: "मराठी पंचांग — शालिवाहन शक, गुढीपाडवा एवं गणेशोत्सव",
    category: "lunar",
    region: "Maharashtra & Goa",
    regionHi: "महाराष्ट्र एवं गोवा",
    descriptionEn: "Accurate Marathi Panchang (मराठी पंचांग) following the Shalivahana Shaka Amanta system. Track Gudi Padwa, Ganeshotsav, Pandharpur Wari, and Choghadiya.",
    descriptionHi: "शालिवाहन शक अमान्त परंपरा पर आधारित प्रामाणिक मराठी पंचांग। गुढीपाडवा, गणेशोत्सव, पंढरपूर आषाढी वारी एवं दैनिक शुभ मुहूर्त।",
    featuresEn: [
      "Shalivahana Shaka Samvat calculations",
      "Gudi Padwa (Chaitra Shukla Pratipada / Marathi New Year)",
      "Ganeshotsav 10-day celebration & Visarjan timings",
      "Ashadhi & Kartiki Ekadashi Pandharpur Wari pilgrimage dates"
    ],
    featuresHi: [
      "शालिवाहन शक संवत की सटीक खगोलीय गणना",
      "गुढीपाडवा (चैत्र शुक्ल प्रतिपदा / नववर्षारंभ)",
      "श्री गणेशोत्सव के १० दिवसीय प्रतिष्ठापना एवं विसर्जन मुहूर्त",
      "आषाढी एवं कार्तिकी एकादशी पंढरपूर विठ्ठल वारी का पावन समय"
    ],
    keywordsEn: ["marathi panchang", "marathi calendar 2026", "gudi padwa 2026 date", "ganpati 2026 date", "shalivahana shaka panchang"],
    keywordsHi: ["मराठी पंचांग", "महाराष्ट्र कैलेंडर", "गुढीपाडवा 2026", "गणेशोत्सव मुहूर्त", "शालिवाहन शक पंचांग"],
    faqsEn: [
      {
        question: "Which calendar system is followed in Maharashtra?",
        answer: "Maharashtra follows the Shalivahana Shaka calendar in the Amanta format, where the month starts on Shukla Pratipada and concludes on Amavasya."
      }
    ],
    faqsHi: [
      {
        question: "महाराष्ट्र में कौन-सा संवत माना जाता है?",
        answer: "महाराष्ट्र में शालिवाहन शक संवत (अमान्त प्रणाली) माना जाता है, जिसका आरंभ चैत्र शुक्ल प्रतिपदा (गुढीपाडवा) से होता है।"
      }
    ],
    seoGuideEn: `The **Marathi Panchang (मराठी पंचांग)** is anchored in the illustrious **Shalivahana Shaka** tradition. Celebrated with pride across Maharashtra, it is an Amanta lunar calendar starting on the triumph of **Gudi Padwa** in Chaitra.

Devotional life in Maharashtra centers upon Lord Vithoba of Pandharpur, commemorated through the divine walking pilgrimage (Wari) on **Ashadhi Ekadashi** and **Kartiki Ekadashi**. In Bhadrapada, homes and public pandals resound with *'Ganpati Bappa Morya'* for the ten radiant days of **Ganeshotsav**, all orchestrated strictly to the Tithis of the Marathi Panchang.`,
    seoGuideHi: `**मराठी पंचांग (मराठी पंचांग)** गौरवशाली **शालिवाहन शक** परंपरा का पोषक है। चैत्र शुक्ल प्रतिपदा को घर-घर में विजय ध्वज स्वरूप गुढी उभारकर नववर्ष **गुढीपाडवा** मनाया जाता है।

महाराष्ट्र की भक्ति-चेतना पंढरपुर के विठू माउली से स्पंदित है, जहाँ **आषाढी वारी** और **कार्तिकी वारी** के दिन लाखों वारकरी पंचांग की तिथियों के अनुसार पैदल चलकर पहुँचते हैं। भाद्रपद में भगवान गणेश की घर-घर प्रतिष्ठापना और विसर्जन का समय इसी पंचांग द्वारा निर्धारित होता है।`
  },

  "gujarati-panchang": {
    slug: "gujarati-panchang",
    titleEn: "Gujarati Panchang (ગુજરાતી પંચાંગ)",
    titleHi: "गुजराती पंचांग — विक्रम संवत, बेसतूं वर्ष एवं चौघड़िया",
    category: "lunar",
    region: "Gujarat & Western India",
    regionHi: "गुजरात एवं पश्चिमी भारत",
    descriptionEn: "Comprehensive Gujarati Panchang (ગુજરાતી પંચાંગ) featuring Bestu Varas (New Year), Navratri Garba tithis, Choghadiya, Shubh Labh, and Amanta Vikram Samvat.",
    descriptionHi: "विक्रम संवत अमान्त पद्धति पर आधारित गुजराती पंचांग। बेसतूं वर्ष, नवरात्रि गरबा मुहूर्त, लाभ पांचम, शुभ-लाभ चौघड़िया एवं तिथि।",
    featuresEn: [
      "New Year starts on Kartika Sud Ekam (Bestu Varas, day after Diwali)",
      "Full Choghadiya: Amrut, Shubh, Labh, Char, Rog, Kaal, Udveg",
      "9 nights of Navratri Ghatasthapana & Sharad Purnima timings",
      "Labh Pancham (Kartika Sud 5) for business reopening"
    ],
    featuresHi: [
      "कार्तिक सुद एकम (दीपावली के अगले दिन बेसतूं वर्ष) से नववर्षारंभ",
      "अमृत, शुभ, लाभ, चर, रोग, काल, उद्वेग का संपूर्ण चौघड़िया",
      "आसो मास की पावन नवरात्रि घटस्थापना एवं गरबा मुहूर्त",
      "व्यापार और नवीन बहीखाते आरंभ करने हेतु लाभ पांचम"
    ],
    keywordsEn: ["gujarati panchang", "gujarati calendar 2026", "bestu varas 2026", "choghadiya gujarati", "vikram samvat 2082"],
    keywordsHi: ["गुजराती पंचांग", "गुजरात कैलेंडर", "बेसतूं वर्ष 2026", "गुजराती चौघड़िया", "लाभ पांचम मुहूर्त"],
    faqsEn: [
      {
        question: "When does the Gujarati New Year begin?",
        answer: "The Gujarati New Year (Bestu Varas) begins on Kartika Shukla Pratipada (Kartik Sud Ekam), the day following Diwali."
      }
    ],
    faqsHi: [
      {
        question: "गुजराती नववर्ष कब प्रारंभ होता है?",
        answer: "गुजराती नववर्ष दीपावली के अगले दिन 'कार्तिक सुद एकम' (बेसतूं वर्ष) से प्रारंभ होता है।"
      }
    ],
    seoGuideEn: `The **Gujarati Panchang (ગુજરાતી પંચାંગ)** holds a distinctive place in Indian astrology. Following the **Vikram Samvat Amanta** system, its New Year (**Bestu Varas**) begins not in spring, but in autumn on the day immediately following Deepavali.

Gujaratis are world-renowned for their reverence of **Choghadiya** (Amrut, Shubh, and Labh periods) for commencing journeys, investments, and enterprise. The sacred nine nights of **Navratri** in the month of Aso immerse the state in devotional Garba honoring Maa Jagadamba, while **Labh Pancham** signals the blessed opening of ledgers for the fiscal year.`,
    seoGuideHi: `**गुजराती पंचांग (ગુજરાતી પંચાંગ)** भारतीय ज्योतिष में अपना विशिष्ट स्थान रखता है। यह **विक्रम संवत अमान्त** प्रणाली का पालन करता है और इसका नववर्ष (**बेसतूं वर्ष**) दीपावली के अगले दिन कार्तिक मास की प्रतिपदा से प्रारंभ होता है।

व्यापार, उद्योग और यात्रा के लिए गुजराती समाज में **चौघड़िया** (अमृत, शुभ, लाभ) का विशेष महत्व है। आसो मास की **नवरात्रि** में माँ जगदंबा की गरबा आराधना और **लाभ पांचम** पर नए व्यापारिक बहीखातों का श्रीगणेश इसी पंचांग के अनुसार किया जाता है।`
  },

  "kannada-panchang": {
    slug: "kannada-panchang",
    titleEn: "Kannada Panchanga (ಕನ್ನಡ ಪಂಚಾಂಗ)",
    titleHi: "कन्नड़ पंचांग — युगादि, शालीवाहन शक एवं चंद्रमान पंचांग",
    category: "lunar",
    region: "Karnataka & South India",
    regionHi: "कर्नाटक एवं दक्षिण भारत",
    descriptionEn: "Detailed Kannada Panchanga (ಕನ್ನಡ ಪಂಚಾಂಗ) following the Chandramana Shalivahana Shaka tradition. Includes Ugadi, Karaga, Hampi Utsava, Rahu Kala, and Gulika Kala.",
    descriptionHi: "चंद्रमान शालिवाहन शक परंपरा पर आधारित कन्नड़ पंचांग। युगादि पर्व, मैसूर दशहरा, राहु काल, गुलिक काल एवं नित्य पंचांग विवरण।",
    featuresEn: [
      "Chandramana Calendar with 60-year Samvatsara cycle",
      "Ugadi (Chaitra Shuddha Padyami / Kannada New Year)",
      "Mysuru Dasara (Navaratri) & Vijayadashami elephant procession timings",
      "Kadalekai Parishe and Varamahalakshmi Vrata schedules"
    ],
    featuresHi: [
      "६० संवत्सर चक्र के साथ चंद्रमान पंचांग की गणना",
      "युगादि पर्व (चैत्र शुद्ध पाड्यमि / कन्नड़ नववर्ष)",
      "मैसूर दशहरा, जांबो सावारी (हाथी जुलूस) एवं विजयदशमी मुहूर्त",
      "वरमहालक्ष्मी व्रत और कडलेकाई परिषे की पवित्र तिथियाँ"
    ],
    keywordsEn: ["kannada panchang", "kannada calendar 2026", "ugadi 2026 date", "rahu kala today kannada", "chandramana panchangam"],
    keywordsHi: ["कन्नड़ पंचांग", "कर्नाटक पंचांग", "युगादि 2026", "मैसूर दशहरा", "कन्नड़ राहु काल"],
    faqsEn: [
      {
        question: "What is the basis of Kannada Panchanga?",
        answer: "Kannada Panchanga follows the Chandramana (lunar) system where the month begins with Shukla Paksha and concludes with Amavasya, initiating the year on Ugadi."
      }
    ],
    faqsHi: [
      {
        question: "कन्नड़ पंचांग किस पद्धति पर आधारित है?",
        answer: "कन्नड़ पंचांग 'चंद्रमान' पद्धति पर आधारित है, जिसका नववर्ष चैत्र मास के प्रथम दिन 'युगादि' से आरंभ होता है।"
      }
    ],
    seoGuideEn: `The **Kannada Panchanga (ಕನ್ನಡ ಪಂಚಾಂಗ)** embodies the rich Vedic heritage of Karnataka. Following the **Chandramana** (lunar) computation of the Shalivahana era, the year opens on **Ugadi** (Chaitra Shuddha Padyami), celebrated by tasting *Bevu-Bella* (neem and jaggery) signifying life's dualities.

Throughout Karnataka, devotees observe **Varamahalakshmi Vrata** in the month of Shravana for domestic happiness, and participate in the grand royal splendor of **Mysuru Dasara** honoring Goddess Chamundeshwari. Every auspicious venture is cross-referenced with Rahu Kala and Yamagandam for maximum divine blessing.`,
    seoGuideHi: `**कन्नड़ पंचांग (ಕನ್ನಡ ಪಂಚಾಂಗ)** कर्नाटक की पावन वैदिक और सांस्कृतिक परंपरा का दर्पण है। **चंद्रमान** शालिवाहन शक के अनुसार चलने वाला यह पंचांग **युगादि** पर्व से प्रारंभ होता है, जहाँ जीवन के सुख-दुख के संतुलन का प्रतीक 'बेवु-बेल्ल' (नीम-गुड़) ग्रहण किया जाता है।

श्रावण मास में सौभाग्य की देवी **वरमहालक्ष्मी व्रत** तथा आश्विन में माँ चामुंडेश्वरी की कृपा से संपन्न होने वाला विश्वविख्यात **मैसूर दशहरा** इसी पंचांग की तिथियों के आधार पर आयोजित होता है।`
  },

  "telugu-panchangam": {
    slug: "telugu-panchangam",
    titleEn: "Telugu Panchangam (తెలుగు పంచాంగం)",
    titleHi: "तेलुगु पंचांगम — उगादि, चांद्रमान एवं शुभ लग्न निर्णय",
    category: "lunar",
    region: "Andhra Pradesh & Telangana",
    regionHi: "आंध्र प्रदेश एवं तेलंगाना",
    descriptionEn: "Authentic Telugu Panchangam (తెలుగు పంచାంగం) following the Chandramana system. Covers Ugadi, Sri Rama Navami at Bhadrachalam, Rahu Kalam, and Varjyam.",
    descriptionHi: "चांद्रमान परंपरा का प्रामाणिक तेलुगु पंचांगम। उगादि पचडी मुहूर्त, भद्राचलम सीताराम कल्याणम, राहु कालम, वर्ज्यम और अमृत घड़ियाँ।",
    featuresEn: [
      "Telugu Samvatsara, Ayana, Rithu, Masamu, Pakshamu, Thithi",
      "Ugadi (Chaitra Suddha Padyami) & Ugadi Pacchadi timings",
      "Varjyam and Durmuhurtham accurate calculation",
      "Sri Rama Navami Kalyanotsavam at sacred Bhadrachalam"
    ],
    featuresHi: [
      "तेलुगु संवत्सर, आयन, ऋतु, मासमु, पक्षमु और तिथि का पूर्ण विश्लेषण",
      "उगादि (चैत्र शुद्ध पाड्यमि) एवं षड्रुचि उगादि पच्चड़ि का समय",
      "वर्ज्यम और दुर्मुहूर्तम की सटीक खगोलीय अवधि",
      "भद्राचलम धाम में प्रभु श्री सीताराम कल्याणोत्सव"
    ],
    keywordsEn: ["telugu panchangam", "telugu calendar 2026", "ugadi 2026 date", "varjyam timings today", "subha muhurtham telugu"],
    keywordsHi: ["तेलुगु पंचांगम", "आंध्र पंचांग", "उगादि 2026", "वर्ज्यम समय आज", "तेलुगु शुभ मुहूर्त"],
    faqsEn: [
      {
        question: "What is Varjyam in Telugu Panchangam?",
        answer: "Varjyam represents a specific inauspicious duration (approximately 1.5 to 2 hours) derived from the prevailing Nakshatra, during which initiating new enterprises is avoided."
      }
    ],
    faqsHi: [
      {
        question: "तेलुगु पंचांगम में 'वर्ज्यम' क्या है?",
        answer: "वर्ज्यम प्रत्येक नक्षत्र के आधार पर निर्धारित वह अशुभ समय (लगभग डेढ़ से दो घंटे) है जिसमें कोई भी नया या मांगलिक कार्य आरंभ नहीं किया जाता।"
      }
    ],
    seoGuideEn: `The **Telugu Panchangam (తెలుగు పంచాంగం)** is revered in Andhra Pradesh, Telangana, and by Telugu communities worldwide. Operating on the **Chandramana** calendar, its 60-year Jovian cycle (Prabhava to Kshaya) lends profound depth to astrological forecasting.

The Telugu year begins with **Ugadi**, marked by the ritual preparation of *Ugadi Pacchadi* uniting six tastes to honor life's diverse experiences. Devotees rely heavily on avoiding **Varjyam** and **Durmuhurtham**, while celebrating the sacred wedding of Lord Rama and Sita Devi at **Bhadrachalam** on Sri Rama Navami.`,
    seoGuideHi: `**तेलुगु पंचांगम (తెలుగు పంచాంగం)** आंध्र प्रदेश, तेलंगाना और विश्वभर के तेलुगु भाषियों का पावन मार्गदर्शक है। **चांद्रमान** पद्धति पर आधारित यह पंचांग ६० संवत्सरों के चक्र (प्रभव से क्षय तक) के साथ संचालित होता है।

वर्ष का शुभारंभ **उगादि** पर्व पर षड्रुचि 'उगादि पच्चड़ि' के नैवेद्य के साथ होता है। तेलुगु परंपरा में **वर्ज्यम** और **दुर्मुहूर्तम** का त्याग अनिवार्य माना जाता है, जबकि भद्राचलम में श्री सीताराम कल्याणम और तिरुमाला बालाजी के ब्रह्मोत्सव इसी पंचांग के अनुसार मनाए जाते हैं।`
  },

  "nepali-patro": {
    slug: "nepali-patro",
    titleEn: "Nepali Patro (नेपाली पात्रो)",
    titleHi: "नेपाली पात्रो — विक्रम संवत, दशैं एवं तिहार पंचांग",
    category: "solar",
    region: "Nepal & Himalayan Region",
    regionHi: "नेपाल एवं हिमालयी क्षेत्र",
    descriptionEn: "Traditional Nepali Patro (नेपाली पात्रो) based on the official Bikram Sambat (B.S.) calendar. Check Dashain, Tihar (Deepawali), Chhath, and daily Nepali tithis.",
    descriptionHi: "नेपाल के आधिकारिक विक्रम संवत (B.S.) पर आधारित नेपाली पात्रो। बडा दशैं, तिहार (यमपञ्चक), छठ पर्व, व्रत एवं पंचांग।",
    featuresEn: [
      "Official Bikram Sambat (B.S.) months: Baishakh to Chaitra",
      "Bijaya Dashami (Dashain) Tika & Jamara exact auspicious moments",
      "Tihar 5-day Yamapanchak: Kaag, Kukur, Gai, Govardhan, Bhai Tika",
      "Pashupatinath Maha Shivratri, Teej, and Chhath Parva"
    ],
    featuresHi: [
      "आधिकारिक बिक्रम संवत मास: बैशाख से चैत्र तक",
      "बडा दशैं (विजयादशमी) टीका एवं जमरा लगाने का सर्वश्रेष्ठ साइत",
      "तिहार के पाँच दिन (यमपञ्चक): काग, कुकुर, गाई, गोवर्धन एवं भाई टीका",
      "पशुपतिनाथ महाशिवरात्रि, हरितालिका तीज और छठ महापर्व"
    ],
    keywordsEn: ["nepali patro", "nepali calendar 2083", "bikram sambat calendar", "dashain 2026 tika sait", "tihar 2026 date"],
    keywordsHi: ["नेपाली पात्रो", "नेपाल कैलेंडर", "बिक्रम संवत 2083", "दशैं टीका साइत", "तिहार भाई टीका"],
    faqsEn: [
      {
        question: "How does Bikram Sambat in Nepali Patro relate to the Western year?",
        answer: "Bikram Sambat (B.S.) is approximately 56.7 years ahead of the Gregorian calendar (A.D.). For example, Gregorian 2026 corresponds to Nepali year 2082–2083 B.S."
      }
    ],
    faqsHi: [
      {
        question: "नेपाली पात्रो का बिक्रम संवत ईस्वी सन् से कितना आगे है?",
        answer: "नेपाल का राष्ट्रीय बिक्रम संवत (B.S.) ग्रेगोरियन कैलेंडर (ईस्वी) से लगभग ५६.७ वर्ष आगे चलता है। सन् २०२६ में नेपाल में २०८२-२०८३ संवत रहेगा।"
      }
    ],
    seoGuideEn: `The **Nepali Patro (नेपाली पात्रो)** is the official national calendar of Nepal and the Himalayan spiritual belt. Operating under **Bikram Sambat (B.S.)**, it governs civil governance, temple worship at Lord Pashupatinath, and agrarian rhythms.

The biggest festival of Nepal, **Bada Dashain**, culminates in receiving sanctified red Tika and golden Jamara on Vijaya Dashami during the officially calculated *Sait* (auspicious second). This is followed closely by **Tihar (Yamapanchak)**, where crows, dogs, cows, oxen, and the sacred bond of siblings (Bhai Tika) are honored with vermilion and flower garlands.`,
    seoGuideHi: `**नेपाली पात्रो (नेपाली पात्रो)** नेपाल राष्ट्र और संपूर्ण हिमालयी क्षेत्र का आधिकारिक एवं धार्मिक पंचांग है। **बिक्रम संवत** के अनुसार चलने वाला यह पात्रो श्री पशुपतिनाथ के मंदिर विधान और राष्ट्रीय जीवन को संचालित करता है।

नेपाल का सबसे बड़ा महापर्व **बडा दशैं** है, जिसमें विजयादशमी के दिन बड़े-बुजुर्गों से लाल टीका और जौ का जमरा ग्रहण करने का शुभ 'साइत' पात्रो से निकाला जाता है। इसके पश्चात पाँच दिवसीय **तिहार (यमपञ्चक)** में काग, श्वान, गौमाता और भाई-बहन के प्रेम का **भाई टीका** पर्व मनाया जाता है।`
  },

  "iskcon-panchang": {
    slug: "iskcon-panchang",
    titleEn: "ISKCON Vaishnava Calendar (इस्कॉन पंचांग)",
    titleHi: "इस्कॉन वैष्णव पंचांग — गौर पूर्णिमा, शुद्ध एकादशी एवं पारण समय",
    category: "lunar",
    region: "Global Gaudiya Vaishnava",
    regionHi: "वैश्विक गौड़ीय वैष्णव परंपरा",
    descriptionEn: "Official ISKCON Gaudiya Vaishnava Calendar calculating Shuddha Ekadashi, exact Parana breaking times, Gaurabda era, and Appearance days of Lord Krishna and Acharyas.",
    descriptionHi: "इस्कॉन गौड़ीय वैष्णव पंचांग। शुद्धा एकादशी, सटीक पारण समय, गौराब्द संवत, श्रीकृष्ण जन्माष्टमी एवं वैष्णव आचार्यों के आविर्भाव-तिरोभाव दिवस।",
    featuresEn: [
      "Follows Gaudiya Vaishnava Shuddha Ekadashi rules (avoids Viddha Ekadashi)",
      "Exact Parana (fast-breaking) time window for every Ekadashi",
      "Gaurabda months: Vishnu, Madhusudana, Trivikrama, Vamana, Sridhara, Hrishikesha, Padmanabha, Damodara, Keshava, Narayana, Madhava, Govinda",
      "Janmashtami, Gaura Purnima, Radhastami, and Ratha Yatra schedules"
    ],
    featuresHi: [
      "विद्धा एकादशी का पूर्ण त्याग और शुद्धा एकादशी का प्रामाणिक पालन",
      "प्रत्येक एकादशी व्रत के पारण का सूर्योदय पश्चात् सटीक समय",
      "भगवान विष्णु के १२ नामों पर आधारित गौराब्द मास (दामोदर, माधव, गोविंद आदि)",
      "श्रीकृष्ण जन्माष्टमी, गौर पूर्णिमा, राधाष्टमी एवं प्रभुपाद तिरोभाव दिवस"
    ],
    keywordsEn: ["iskcon calendar 2026", "vaishnava panchang", "ekadashi parana time", "gaurabda calendar", "shuddha ekadashi iskcon"],
    keywordsHi: ["इस्कॉन कैलेंडर", "वैष्णव पंचांग", "एकादशी पारण समय", "गौराब्द कैलेंडर", "शुद्धा एकादशी इस्कॉन"],
    faqsEn: [
      {
        question: "Why does ISKCON Ekadashi date sometimes differ from Smartha calendar?",
        answer: "Gaudiya Vaishnavas strictly follow Shuddha Ekadashi rules established by Srila Rupa Goswami and Hari-bhakti-vilasa: if Dashami tithi touches the Brahma Muhurat (Arunodaya), the fast is postponed to Dvadashi (Mahadvadashi)."
      },
      {
        question: "What is the Gaurabda calendar?",
        answer: "The Gaurabda calendar counts years from the advent of Sri Chaitanya Mahaprabhu in Mayapur in 1486 CE. Its months are named after the twelve transcendental forms of Lord Vishnu."
      }
    ],
    faqsHi: [
      {
        question: "इस्कॉन की एकादशी सामान्य पंचांग से भिन्न क्यों होती है?",
        answer: "गौड़ीय वैष्णव परंपरा 'हरिभक्तिविलास' के अनुसार विद्धा एकादशी का उपवास नहीं करती। यदि सूर्योदय से पूर्व अरुणोदय काल में दशमी का तनिक भी स्पर्श हो, तो उपवास द्वादशी (महाद्वादशी) को रखा जाता है।"
      }
    ],
    seoGuideEn: `The **ISKCON Vaishnava Calendar (इस्कॉन पंचांग)** is the spiritual guide for devotees of Lord Krishna across the globe. Conforming to the timeless instructions of **Sri Chaitanya Mahaprabhu** and the Six Goswamis of Vrindavan, its calculations prioritize pure devotion (*shuddha-bhakti*).

Central to this calendar is the strict observance of **Shuddha Ekadashi**, avoiding any pollution from Dashami tithi, coupled with exact **Parana** timings for breaking the fast. The calendar also designates the highest days of meditation: **Gaura Purnima**, **Janmashtami**, **Radhastami**, and the sacred month of **Kartika (Damodara Masa)** when offering a ghee lamp grants limitless spiritual advancement.`,
    seoGuideHi: `**इस्कॉन वैष्णव पंचांग (इस्कॉन पंचांग)** विश्वभर के कृष्ण भक्तों का नित्य साधना पंचांग है। **श्री चैतन्य महाप्रभु** और श्रील रूप गोस्वामी द्वारा रचित 'हरिभक्तिविलास' के आधार पर यह पंचांग विशुद्ध भक्ति के नियमों का पालन करता है।

इस पंचांग की विशेषता **शुद्धा एकादशी** और अगले दिन सूर्योदय के बाद के सटीक **पारण समय** का निर्धारण है। इसके अतिरिक्त **गौर पूर्णिमा**, **श्रीकृष्ण जन्माष्टमी**, **राधाष्टमी**, और विशेष रूप से **दामोदर मास (कार्तिक)** के नियम, जिसमें दीपदान करने से अनंत गुना भक्ति फल की प्राप्ति होती है, इसी से जाने जाते हैं।`
  },

  "chandrabalam": {
    slug: "chandrabalam",
    titleEn: "Chandrabalam (चंद्रबलम)",
    titleHi: "चंद्रबलम — आपकी जन्म राशि से चंद्रमा का शुभ-अशुभ बल",
    category: "astrological",
    region: "Vedic Astrology / Gochara",
    regionHi: "वैदिक ज्योतिष / गोचर फल",
    descriptionEn: "Daily Chandrabalam calculator determining lunar strength for your Janma Rasi (Moon Sign). Essential for selecting muhurats for travel, investments, and ceremonies.",
    descriptionHi: "आपकी जन्म राशि से दैनिक चंद्रबल की गणना। यात्रा, व्यवसाय, गृह प्रवेश एवं शुभ कार्य आरंभ करने के लिए चंद्रमा का गोचर फल।",
    featuresEn: [
      "Calculates current transit Moon position from your Janma Rasi (1st to 12th house)",
      "Auspicious houses: 1, 3, 6, 7, 10, 11 (Shubha Chandrabalam)",
      "Chandra Dosha caution houses: 8th (Ashtama Chandra) and 12th",
      "Remedies and auspicious Hora windows when Moon strength is weak"
    ],
    featuresHi: [
      "जन्म राशि से गोचरस्थ चंद्रमा की स्थिति का सूक्ष्म विश्लेषण (१ से १२ भाव)",
      "शुभ चंद्रबल भाव: १, ३, ६, ७, १०, ११",
      "सावधानी भाव: अष्टम चंद्रमा (अष्टम चंद्र दोष) एवं द्वादश चंद्रमा",
      "चंद्रबल कमजोर होने पर शुभ कार्य करने हेतु शास्त्रोक्त उपाय एवं होरा ज्ञान"
    ],
    keywordsEn: ["chandrabalam today", "chandrabalam calculator", "moon strength astrology", "ashtama chandra dosha", "janma rasi gochara"],
    keywordsHi: ["चंद्रबल आज", "चंद्रबलम कैलकुलेटर", "अष्टम चंद्रमा दोष", "राशि अनुसार चंद्रमा का फल"],
    faqsEn: [
      {
        question: "Why is Chandrabalam important in Muhurat selection?",
        answer: "In Vedic astrology, the Moon rules the mind (Manas). If Chandrabalam is weak—especially when the Moon transits the 8th house from your birth sign—the mind is prone to anxiety and misjudgment, making it inadvisable to begin critical tasks."
      }
    ],
    faqsHi: [
      {
        question: "मुहूर्त में चंद्रबल का क्या महत्व है?",
        answer: "शास्त्रों में 'चंद्रमा मनसो जातः' कहा गया है। यदि गोचर में चंद्रबल कमजोर हो (विशेषकर जन्म राशि से आठवें भाव में 'अष्टम चंद्रमा'), तो मानसिक भ्रम और विघ्न की संभावना रहती है। शुभ चंद्रबल कार्य की सिद्धि सुनिश्चित करता है।"
      }
    ],
    seoGuideEn: `**Chandrabalam (चंद्रबलम)** is the ancient Vedic yardstick for evaluating mental clarity, vitality, and fortune on any given day. The sage Varahamihira emphasized that while solar strength bestows external success, the Moon governs inner tranquility and emotional resilience.

When the transit Moon resides in the **1st, 3rd, 6th, 7th, 10th, or 11th house** from your natal Moon sign (Janma Rasi), Chandrabalam is positive, making it an excellent time for interviews, signing documents, launching businesses, or entering a new home. Conversely, when the Moon enters your **8th house (Ashtama Chandra)**, one should focus on prayers, charity, and patient meditation rather than aggressive worldly ventures.`,
    seoGuideHi: `**चंद्रबलम (चंद्रबलम)** किसी भी दिन व्यक्ति के मानसिक सामर्थ्य, उत्साह और भाग्य का आकलन करने का वैदिक पैमाना है। आचार्य वराहमिहिर के अनुसार सूर्य जहाँ बाह्य अधिकार देता है, वहीं चंद्रमा आंतरिक शांति और निर्णय क्षमता का स्वामी है।

जब गोचर का चंद्रमा आपकी जन्म राशि से **१, ३, ६, ७, १० या ११वें भाव** में होता है, तब पूर्ण चंद्रबल मिलता है। इस समय किए गए कार्य शीघ्र फलित होते हैं। इसके विपरीत जब चंद्रमा जन्म राशि से **आठवें भाव (अष्टम चंद्रमा)** में हो, तो नया जोखिम न लेकर भगवान शिव या हनुमान जी की आराधना करना श्रेयस्कर होता है।`
  },

  "vinchudo": {
    slug: "vinchudo",
    titleEn: "Vinchudo (વિંછુડો / विंछुड़ो)",
    titleHi: "विंछुड़ो (Vinchudo) — वृश्चिक चंद्रमा का अशुभ काल एवं निवारण",
    category: "astrological",
    region: "Gujarat, Rajasthan & Western India",
    regionHi: "गुजरात, राजस्थान एवं पश्चिमी भारत",
    descriptionEn: "Accurate Vinchudo (વિંછુડો) calculator. Track when the Moon transits Scorpio (Vrischika Rasi) across Anuradha and Jyeshtha nakshatras, and understand traditional dosha remedies.",
    descriptionHi: "विंछुड़ो (Vinchudo) की सटीक समय गणना। जब चंद्रमा वृश्चिक राशि (अनुराधा एवं ज्येष्ठा नक्षत्र) में गोचर करता है, तो शुभ कार्यों का निषेध एवं शांति उपाय।",
    featuresEn: [
      "Exact start and end timings of the 2.5-day Vinchudo period",
      "Forbidden activities: marriage, engagement, house purchase, vehicle buying",
      "Safe activities: medical treatments, mantra sadhana, Lord Shiva worship",
      "Scriptural guidance from Gujarati and Rajasthani Jyotish traditions"
    ],
    featuresHi: [
      "ढाई दिन (लगभग ६० घंटे) चलने वाले विंछुड़ो की सटीक शुरुआत और समाप्ति",
      "वर्जित कार्य: सगाई, विवाह, नया व्यापार, गृह प्रवेश, वाहन क्रय",
      "शुभ कार्य: रोगोपचार, महामृत्युंजय मंत्र जप, शिव आराधना एवं दान",
      "गुजराती और राजस्थानी ज्योतिष परंपरा के अनुसार शांति विधान"
    ],
    keywordsEn: ["vinchudo today", "vinchudo timings", "scorpio moon inauspicious", "vinchudo 2026 dates", "gujarati vinchudo"],
    keywordsHi: ["विंछुड़ो आज का समय", "विंछुड़ो कब है", "वृश्चिक राशि का चंद्रमा", "विंछुड़ो में क्या न करें"],
    faqsEn: [
      {
        question: "What is Vinchudo in Vedic Astrology?",
        answer: "Vinchudo (derived from 'Vrishchika' or scorpion) is the 2.5-day period when the Moon transits the sign of Scorpio, particularly over Jyeshtha Nakshatra. Because the Moon is debilitated (Neecha) in Scorpio, auspicious ceremonies like weddings are avoided."
      }
    ],
    faqsHi: [
      {
        question: "ज्योतिष में विंछुड़ो (Vinchudo) क्या होता है?",
        answer: "विंछुड़ो का अर्थ है वृश्चिक (बिच्छू) राशि का काल। जब चंद्रमा अपनी नीच राशि वृश्चिक (विशेषकर अनुराधा व ज्येष्ठा नक्षत्र) में ढाई दिन रहता है, तब इस कालखंड को विंछुड़ो कहते हैं। इसमें सगाई, विवाह और नया व्यापार आरंभ नहीं किया जाता।"
      }
    ],
    seoGuideEn: `In the astrological traditions of Gujarat and Rajasthan, **Vinchudo (વિંછુડો)** is one of the most widely monitored transit periods. Lasting approximately two and a half days (around 60 hours), it occurs every month when the Moon transits through **Vrischika Rasi (Scorpio)**.

Because Scorpio is the debilitation sign of the Moon (*Neecha Rasi*), the psychic and emotional waters are traditionally considered agitated, akin to the sting of a scorpion (*Vinchhi*). For this reason, families refrain from scheduling engagements (*Vagdana*), solemnizing marriages, laying foundation stones (*Khat Muhurat*), or signing contracts. However, this period is exceptionally potent for esoteric spirituality, Tantra, Maha Mrityunjaya Japa, and inner introspection.`,
    seoGuideHi: `गुजरात और राजस्थान की लोक-ज्योतिष परंपरा में **विंछुड़ो (વિંછુડો)** का अत्यधिक विचार किया जाता है। प्रत्येक माह जब चंद्रमा अपनी नीच राशि **वृश्चिक** में भ्रमण करता है, तो यह ढाई दिन का काल 'विंछुड़ो' कहलाता है।

चूँकि वृश्चिक राशि में चंद्रमा नीच का होता है, अतः इसे विषैला या बिच्छू के डंक के समान तीक्ष्ण माना गया है। इस समय विवाह, सगाई, नया व्यापार या गृह प्रवेश जैसे शुभ कार्यों का सर्वथा निषेध रहता है। किंतु यह समय आध्यात्मिक साधना, महामृत्युंजय मंत्र जप, कालभैरव उपासना और ध्यान के लिए अत्यंत कल्याणकारी माना जाता है।`
  },

  "nakshatra": {
    slug: "nakshatra",
    titleEn: "Nakshatra Calculator (नक्षत्र)",
    titleHi: "नक्षत्र — २७ वैदिक नक्षत्र, देवता, पाद एवं ताराबलम",
    category: "astrological",
    region: "Vedic Astrology",
    regionHi: "वैदिक ज्योतिष",
    descriptionEn: "Complete Vedic Nakshatra guide and daily calculator. Explore all 27 Nakshatras from Ashwini to Revati, their ruling deities, planetary lords, padas, and Tarabalam.",
    descriptionHi: "२७ नक्षत्रों का संपूर्ण वैदिक ज्ञान एवं दैनिक नक्षत्र कैलकुलेटर। अश्विनी से रेवती तक, नक्षत्र देवता, स्वामी ग्रह, चार पाद और ताराबल का फल।",
    featuresEn: [
      "Real-time Nakshatra & Pada based on Moon's sidereal degree",
      "Ruling deity, planetary lord (Graha), and Gana (Deva/Manushya/Rakshasa)",
      "Daily Tarabalam (Janma, Sampat, Vipat, Kshema, Pratyak, Sadhana, Naidhana, Mitra, Param Mitra)",
      "Auspicious activities associated with each constellation"
    ],
    featuresHi: [
      "चंद्रमा की सटीक स्थिति के आधार पर वर्तमान नक्षत्र और पाद (१, २, ३, ४)",
      "प्रत्येक नक्षत्र के इष्ट देवता, स्वामी ग्रह और गण (देव, मनुष्य, राक्षस)",
      "दैनिक ताराबल (जन्म, संपत, विपत, क्षेम, प्रत्यक, साधन, नैधन, मित्र, परम मित्र)",
      "नक्षत्र अनुसार शुभ कार्यों की सूची (पुष्य, रोहिणी, स्वाती, श्रवण आदि)"
    ],
    keywordsEn: ["nakshatra today", "27 nakshatras list", "tarabalam calculator", "pushya nakshatra muhurat", "birth nakshatra meaning"],
    keywordsHi: ["आज का नक्षत्र", "२७ नक्षत्रों के नाम", "ताराबलम कैलकुलेटर", "पुष्य नक्षत्र शुभ समय", "नक्षत्र देवता"],
    faqsEn: [
      {
        question: "How many Nakshatras are there in Vedic astrology?",
        answer: "There are 27 primary Nakshatras dividing the 360-degree zodiac into 13°20' segments, with an occasional 28th intercalary Nakshatra named Abhijit."
      }
    ],
    faqsHi: [
      {
        question: "वैदिक ज्योतिष में कुल कितने नक्षत्र होते हैं?",
        answer: "वैदिक ज्योतिष में मुख्य रूप से २७ नक्षत्र होते हैं (प्रत्येक १३ अंश २० कला का)। विशेष अनुष्ठानों में २८वें नक्षत्र 'अभिजित' की भी गणना की जाती है।"
      }
    ],
    seoGuideEn: `The **27 Nakshatras (नक्षत्र)** form the deepest tapestry of Vedic astrology and human destiny. While Western astrology emphasizes the twelve Sun signs, the Rigveda and Atharvaveda celebrate the Moon's sacred nightly brides—the lunar mansions.

Each Nakshatra is spanned across four **Padas** (quarters) corresponding to the Navamsha divisions. Constellations such as **Pushya** (the nourish-star ruled by Brihaspati) are considered so inherently auspicious that any venture begun under it brings lasting prosperity. By knowing today's Nakshatra and calculating your **Tarabalam** (Sampat, Kshema, Sadhana, and Mitra stars), you can effortlessly pick optimal moments for your dreams and duties.`,
    seoGuideHi: `**२७ नक्षत्र (नक्षत्र)** वैदिक ज्योतिष की सबसे सूक्ष्म और दिव्य धारा हैं। जहाँ पाश्चात्य ज्योतिष मात्र १२ सूर्य राशियों तक सीमित है, वहीं वेद-पुराणों में चंद्रमा की २७ नक्षत्र-पत्नियों के प्रभाव को मानव जीवन का नियामक माना गया है।

प्रत्येक नक्षत्र के चार **पाद** होते हैं। **पुष्य नक्षत्र** को नक्षत्रों का राजा कहा गया है, जिसमें किया गया कोई भी शुभ कार्य चिरस्थायी समृद्धि देता है। प्रतिदिन के नक्षत्र से अपना **ताराबल** (संपत, क्षेम, साधन, मित्र) जानकर आप अपने व्यापार, साधना और परिवार के लिए सर्वोत्तम समय का चयन कर सकते हैं।`
  },

  "panchang-utilities": {
    slug: "panchang-utilities",
    titleEn: "Panchang Utilities (पंचांग उपयोगिताएँ)",
    titleHi: "पंचांग उपयोगिताएँ — राहु काल, चौघड़िया, होरा एवं दिशाशूल कैलकुलेटर",
    category: "utility",
    region: "All India / Universal",
    regionHi: "अखिल भारतीय / सार्वभौमिक",
    descriptionEn: "Essential Vedic timekeeping calculators: Rahu Kaal, Yamaganda, Gulika, Day & Night Choghadiya, Planetary Hora, and Dishashool travel guidelines.",
    descriptionHi: "महत्वपूर्ण वैदिक समय उपकरण: राहु काल, यमगण्ड, गुलिक काल, दिन-रात का चौघड़िया, सूर्योदय आधारित ग्रह होरा और दिशाशूल परिहार।",
    featuresEn: [
      "Real-time Rahu Kaal, Yamaganda & Gulika Kaal clock for your city",
      "Day and Night Choghadiya table (Amrut, Shubh, Labh, Char, Rog, Kaal, Udveg)",
      "24-Hour Planetary Hora calculator (Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars)",
      "Dishashool guidance: forbidden travel directions by weekday and scriptural remedies"
    ],
    featuresHi: [
      "आपके शहर के अनुसार सटीक राहु काल, यमगण्ड और गुलिक काल",
      "दिन और रात का पूर्ण चौघड़िया चक्र (अमृत, शुभ, लाभ, चर, रोग, काल, उद्वेग)",
      "२४ घंटे की ग्रह होरा तालिका (सूर्य, शुक्र, बुध, चंद्र, शनि, गुरु, मंगल)",
      "दिशाशूल निर्देश: वार अनुसार वर्जित यात्रा दिशाएँ और शास्त्रोक्त उपाय"
    ],
    keywordsEn: ["panchang utilities", "rahu kaal calculator", "choghadiya today", "planetary hora calculator", "dishashool travel remedies"],
    keywordsHi: ["पंचांग टूल्स", "राहु काल समय", "आज का चौघड़िया", "ग्रह होरा तालिका", "दिशाशूल उपाय"],
    faqsEn: [
      {
        question: "What is Planetary Hora in Vedic timekeeping?",
        answer: "A Hora is a Vedic hour (approximately 1 hour based on sunrise to sunset divided by 12) ruled sequentially by one of the 7 ancient planets. A Sun hora is ideal for government work, a Jupiter hora for learning, and a Venus hora for arts and agreements."
      }
    ],
    faqsHi: [
      {
        question: "वैदिक ज्योतिष में 'ग्रह होरा' क्या है?",
        answer: "दिन और रात को १२-१२ भागों में विभाजित कर प्रत्येक घंटे का स्वामित्व एक ग्रह को सौंपा जाता है, जिसे 'होरा' कहते हैं। गुरु की होरा में विद्या, शुक्र की होरा में व्यापार और सूर्य की होरा में प्रशासनिक कार्य सिद्ध होते हैं।"
      }
    ],
    seoGuideEn: `**Panchang Utilities (पंचांग उपयोगिताएँ)** bring the practical wisdom of the Rishis into daily decision-making. Far from being mere superstitions, these time slices represent natural planetary cycles that influence the human nervous system and worldly endeavors.

Our utilities provide instantaneous precision for:
1. **Rahu Kaal & Yamaganda**: Critical periods to avoid starting new journeys or agreements.
2. **Choghadiya**: The beloved sevenfold division of auspicious (Amrut, Shubh, Labh) and cautionary periods.
3. **Planetary Hora**: Tuning specific tasks (financial, artistic, spiritual) to the reigning planetary ruler of the hour.
4. **Dishashool**: Understanding daily directional friction and applying traditional neutralizing remedies (such as taking curd, betel leaf, or coriander before departing).`,
    seoGuideHi: `**पंचांग उपयोगिताएँ (पंचांग उपयोगिताएँ)** वैदिक ऋषियों के काल-ज्ञान को दैनिक व्यावहारिक जीवन में उतारने का साधन हैं। ये समय-विभाजन प्रकृति और ग्रहों के उन चक्रीय प्रभावों पर आधारित हैं जो मानव मन और कार्य-परिणामों को प्रभावित करते हैं।

इस पृष्ठ पर आप पाएंगे:
१. **राहु काल एवं यमगण्ड**: अशुभ समय जब नवीन कार्य आरंभ करने से बचना चाहिए।
२. **चौघड़िया**: अमृत, शुभ, लाभ, चर, रोग, काल और उद्वेग का समय।
३. **ग्रह होरा**: २४ घंटों में प्रत्येक ग्रह की विशिष्ट ऊर्जा का लाभ उठाकर कार्यों को सफल बनाना।
४. **दिशाशूल परिहार**: किस दिन किस दिशा में यात्रा वर्जित है और आवश्यक होने पर क्या उपाय (जैसे दही, गुड़, पान या धनिया) खाकर निकलना चाहिए।`
  }
};

/** List of all 16 valid slugs */
export const ALL_REGIONAL_SLUGS = Object.keys(REGIONAL_SYSTEMS);

/** Helper to get system metadata */
export function getRegionalSystem(slug: string): RegionalPanchangSystem | undefined {
  return REGIONAL_SYSTEMS[slug];
}

/** Compute live regional celestial status & astronomical alignments */
export function computeRegionalSnapshot(slug: string, date: Date = new Date(), cityId = "delhi") {
  const city = getCityById(cityId) || DEFAULT_CITY;
  const panchang = getPanchang(date, city);
  const ayanamsa = lahiriAyanamsa(date);

  // Tropical and Sidereal longitudes
  const tropSun = tropicalSunLon(date);
  const tropMoon = tropicalMoonLon(date);
  const sidSun = siderealLon(tropSun, date);
  const sidMoon = siderealLon(tropMoon, date);
  const sunR = sunRasi(date);
  const moonR = moonRasi(date);
  const sunRasiIdx = sunR.index;
  const moonRasiIdx = moonR.index;

  // Regional Months
  const bengaliSolarMonths = [
    { en: "Boishakh", hi: "वैशाख" },
    { en: "Joishtho", hi: "ज्येष्ठ" },
    { en: "Asharh", hi: "आषाढ़" },
    { en: "Srabon", hi: "श्रावण" },
    { en: "Bhadro", hi: "भाद्रपद" },
    { en: "Ashwin", hi: "आश्विन" },
    { en: "Kartik", hi: "कार्तिक" },
    { en: "Agrahayan", hi: "अग्रहायण" },
    { en: "Poush", hi: "पौष" },
    { en: "Magh", hi: "माघ" },
    { en: "Falgun", hi: "फाल्गुन" },
    { en: "Chaitra", hi: "चैत्र" },
  ];

  const tamilSolarMonths = [
    { en: "Chithirai", hi: "चित्तिरई" },
    { en: "Vaikasi", hi: "वैकासी" },
    { en: "Aani", hi: "आनी" },
    { en: "Aadi", hi: "आडी" },
    { en: "Avani", hi: "आवणी" },
    { en: "Purattasi", hi: "पुरट्टासी" },
    { en: "Aippasi", hi: "ऐप्पसी" },
    { en: "Karthigai", hi: "कार्तिकई" },
    { en: "Margazhi", hi: "मार्गशी" },
    { en: "Thai", hi: "थाई" },
    { en: "Masi", hi: "मासी" },
    { en: "Panguni", hi: "पंगुनी" },
  ];

  const malayalamSolarMonths = [
    { en: "Chingam", hi: "चिंगम" },
    { en: "Kanni", hi: "कन्नी" },
    { en: "Thulam", hi: "तुलाम" },
    { en: "Vrischikam", hi: "वृश्चिकम" },
    { en: "Dhanu", hi: "धनु" },
    { en: "Makaram", hi: "मकरम" },
    { en: "Kumbham", hi: "कुंभम" },
    { en: "Meenam", hi: "मीनम" },
    { en: "Medam", hi: "मेदाम" },
    { en: "Edavam", hi: "एदवम" },
    { en: "Mithunam", hi: "मिथुनम" },
    { en: "Karkidakam", hi: "कर्कटकम" },
  ];

  const assameseSolarMonths = [
    { en: "Bohag", hi: "बोहाग" },
    { en: "Jeth", hi: "जेठ" },
    { en: "Ahar", hi: "आहार" },
    { en: "Shaon", hi: "शाओन" },
    { en: "Bhada", hi: "भाद" },
    { en: "Ahin", hi: "आहीन" },
    { en: "Kati", hi: "काति" },
    { en: "Aghon", hi: "आघोन" },
    { en: "Puh", hi: "पूह" },
    { en: "Magh", hi: "माघ" },
    { en: "Phagun", hi: "फागुन" },
    { en: "Chot", hi: "चोत" },
  ];

  const odiaSolarMonths = [
    { en: "Baisakha", hi: "बैशाख" },
    { en: "Jyeshtha", hi: "ज्येष्ठ" },
    { en: "Ashadha", hi: "आषाढ़" },
    { en: "Shrabana", hi: "श्रावण" },
    { en: "Bhadrava", hi: "भाद्रव" },
    { en: "Ashwina", hi: "आश्विन" },
    { en: "Karttika", hi: "कार्तिक" },
    { en: "Margasira", hi: "मार्गशिर" },
    { en: "Pousha", hi: "पौष" },
    { en: "Magha", hi: "माघ" },
    { en: "Falguna", hi: "फाल्गुन" },
    { en: "Chaitra", hi: "चैत्र" },
  ];

  // Specific Regional derivations
  const solarMonthIndex = sunRasiIdx; // 0 = Mesha (Chaitra/Boishakh/Chithirai etc)
  const bengaliMonth = bengaliSolarMonths[solarMonthIndex] || bengaliSolarMonths[0];
  const tamilMonth = tamilSolarMonths[solarMonthIndex] || tamilSolarMonths[0];
  const assameseMonth = assameseSolarMonths[solarMonthIndex] || assameseSolarMonths[0];
  const odiaMonth = odiaSolarMonths[solarMonthIndex] || odiaSolarMonths[0];

  // Malayalam Kollam year starts at Chingam (Simha rasi = index 4)
  const malayalamIdx = (solarMonthIndex + 8) % 12;
  const malayalamMonth = malayalamSolarMonths[malayalamIdx] || malayalamSolarMonths[0];

  // Vinchudo calculation (Moon in Vrischika Rasi / Scorpio, specifically Jyeshtha & Moola / Anuradha)
  const isVinchudoActive = moonRasiIdx === 7; // Scorpio = 7
  const vinchudoSeverity =
    panchang.nakshatra.name === "Jyeshtha"
      ? "Severe (तीव्र विंछुड़ो)"
      : isVinchudoActive
      ? "Active (विंछुड़ो प्रभाव)"
      : "Free / Shubh (विंछुड़ो रहित)";

  // Chandrabalam (1, 3, 6, 7, 10, 11 from native moon)
  const currentMoonRasiNameEn = moonR.name;
  const currentMoonRasiNameHi = moonR.nameHi;

  // ISKCON Gaurabda calculation (Gaura Purnima starts Chaitra/Madhava Masa)
  const iskconMonths = [
    { en: "Vishnu", hi: "विष्णु मास (चैत्र)" },
    { en: "Madhusudana", hi: "मधुसूदन मास (वैशाख)" },
    { en: "Trivikrama", hi: "त्रिविक्रम मास (ज्येष्ठ)" },
    { en: "Vamana", hi: "वामन मास (आषाढ़)" },
    { en: "Sridhara", hi: "श्रीधर मास (श्रावण)" },
    { en: "Hrishikesha", hi: "हृषीकेश मास (भाद्रपद)" },
    { en: "Padmanabha", hi: "पद्मनाभ मास (आश्विन)" },
    { en: "Damodara (Kartik)", hi: "दामोदर मास (कार्तिक)" },
    { en: "Keshava", hi: "केशव मास (मार्गशीर्ष)" },
    { en: "Narayana", hi: "नारायण मास (पौष)" },
    { en: "Madhava", hi: "माधव मास (माघ)" },
    { en: "Govinda", hi: "गोविंद मास (फाल्गुन)" },
  ];
  const iskconCurrentMonth = iskconMonths[panchang.masaPurnimanta.index % 12] || iskconMonths[0];

  return {
    panchang,
    city,
    ayanamsa: ayanamsa.toFixed(4),
    sidSunLon: sidSun.toFixed(2),
    sidMoonLon: sidMoon.toFixed(2),
    sunRasiEn: sunR.name,
    sunRasiHi: sunR.nameHi,
    moonRasiEn: currentMoonRasiNameEn,
    moonRasiHi: currentMoonRasiNameHi,
    solarMonthIndex,
    bengaliMonth,
    tamilMonth,
    malayalamMonth,
    assameseMonth,
    odiaMonth,
    iskconCurrentMonth,
    isVinchudoActive,
    vinchudoSeverity,
  };
}

