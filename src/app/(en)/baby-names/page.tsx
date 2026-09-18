import type { Metadata } from "next";
import { BabyNamesView } from "@/components/baby-names/BabyNamesView";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isTe
      ? "నక్షత్రం ప్రకారం శిశువుల పేర్లు 2026 — 108 పాద నామాక్షరాలు, 12 రాశుల వైదిక & ఆధునిక పేర్లు"
      : isHi
      ? "नक्षत्र अनुसार बच्चों के नाम 2026 — 108 पाद नामाक्षर, 12 राशि के आधुनिक व वैदिक नाम"
      : "Baby Names by Nakshatra & Pada 2026 (नक्षत्र अनुसार नाम) — 108 Vedic Namkaran Syllables & Modern Names",
    description: isTe
      ? "27 నక్షత్రాల 108 పాద నామాక్షరాలు మరియు 12 రాశుల ఆధారంగా నవజాత బాలురు, బాలికలకు శ్రేష్ఠమైన వైదిక & ఆధునిక పేర్లు. సంస్కృత అర్థాలు మరియు నామకరణ పద్ధతి."
      : isHi
      ? "27 नक्षत्रों के 108 पाद नामाक्षर (1, 2, 3, 4 पाद) और 12 राशियों के अनुसार नवजात बालकों और बालिकाओं के सर्वश्रेष्ठ वैदिक व आधुनिक नाम। सुंदर संस्कृत अर्थ, कुलदेवी-देवता एवं शास्त्रसम्मत नामकरण विधि।"
      : "Find auspicious Hindu baby names by Nakshatra and Pada (1, 2, 3, 4) in 2026. Complete 108 sacred Vedic syllables, 12 Rashi letters, boy & girl names with Sanskrit meanings, deities, and Namkaran rules.",
    path: PATHS.babyNames,
    keywords: isHi
      ? [
          "नक्षत्र अनुसार बच्चों के नाम",
          "जन्म नक्षत्र के अनुसार नाम",
          "108 पाद नामाक्षर",
          "राशि अनुसार बच्चों के नाम",
          "लड़कों के आधुनिक नाम अर्थ सहित",
          "लड़कियों के सुंदर वैदिक नाम",
          "वैदिक नामकरण संस्कार विधि",
          "नक्षत्र नामाक्षर 2026",
          "संस्कृत में बच्चों के नाम",
          "हिन्दू बेबी नेम्स 2026",
          "मेष राशि के नाम",
          "अश्विनी नक्षत्र के नाम",
          "रोहिणी नक्षत्र के नाम",
          "baby names hindi",
          "bacchon ke naam nakshatra ke hisab se",
        ]
      : [
          "baby names by nakshatra",
          "nakshatra baby names",
          "baby names by nakshatra pada",
          "baby names by nakshatra pada 1 2 3 4",
          "hindu baby boy names by nakshatra",
          "hindu baby girl names by nakshatra",
          "modern hindu baby names 2026",
          "vedic baby names with meaning",
          "namkaran syllables",
          "108 nakshatra syllables",
          "rashi baby names",
          "rashi letters for baby names",
          "nakshatra ke hisab se bacchon ke naam",
          "janma nakshatra baby names",
          "sanskrit baby names with meanings",
          "unique indian baby names 2026",
          "namkaran sanskar vidhi and rules",
          "baby names by date of birth and time",
          "astrology baby names boy and girl",
          "hindu baby names 2026",
        ],
  });
}

const FAQS_EN = [
  {
    question: "Why should a baby's name be chosen according to Janma Nakshatra Pada?",
    answer:
      "In Vedic astrology, the Moon's exact constellation (Nakshatra) and quarter (Pada) at birth generate an electromagnetic harmonic sound (Namakshara). Naming the child starting with this sacred seed sound harmonizes their subtle physical body with cosmic planetary energies, fostering health, intellect, and spiritual protection.",
  },
  {
    question: "What is the difference between Rashi letters and Nakshatra syllables?",
    answer:
      "Each of the 12 Rashis (Zodiac signs) covers 2.25 Nakshatras (9 Padas). While Rashi letters provide broad phonetic groups (e.g., Aries = A, L, E), the Nakshatra Pada syllable offers pinpoint mathematical precision for the exact moment of birth (e.g., Ashwini Pada 1 = 'Chu', Pada 2 = 'Che'). Vedic scholars always prioritize the Nakshatra Pada syllable.",
  },
  {
    question: "When should the Vedic Namkaran Samskara be performed?",
    answer:
      "Classical Grihya Sutras recommend performing the Namkaran Samskara on the 10th, 11th, 12th, or 16th day after birth, immediately following the end of the Jata-shaucha (initial purification period). Auspicious lunar tithis (excluding Rikta tithis 4, 9, 14 and Amavasya) and fixed constellations (Rohini, Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada) are ideal.",
  },
  {
    question: "What are the 4 names traditionally given to a Hindu child?",
    answer:
      "According to ancient scriptures, a child receives: (1) Nakshatra Nama (secret astrological name matching the birth star), (2) Devata Nama (honoring the family or chosen deity), (3) Masa Nama (reflecting the ruling Vishnu form of the birth month), and (4) Vyavaharika Nama (the public, social name used in school and daily life).",
  },
];

const FAQS_TE = [
  {
    question: "జన్మ నక్షత్ర పాదం ప్రకారం శిశువు పేరును ఎందుకు నిర్ణయించాలి?",
    answer:
      "వైదిక జ్యోతిష్య శాస్త్రం ప్రకారం, శిశువు జన్మించిన సమయంలో చంద్రుడు సంచరించే నక్షత్రం మరియు చరణం (పాదం) ఒక పవిత్రమైన ధ్వని తరంగాన్ని (నామాక్షరం) ఉత్పత్తి చేస్తాయి. ఈ బీజాక్షరంతో పేరు ప్రారంభించడం వల్ల శిశువు ఆరోగ్యం, మేధస్సు మరియు గ్రహానుకూలత చక్కగా సమకూరుతాయి.",
  },
  {
    question: "రాశి అక్షరాలకు, నక్షత్ర నామాక్షరాలకు తేడా ఏమిటి?",
    answer:
      "ఒక రాశిలో రెండుంబావు నక్షత్రాలు (9 పాదాలు) ఉంటాయి. రాశి అక్షరాలు సాధారణ అక్షర సమూహాన్ని సూచిస్తాయి (ఉదాహరణకు మేష రాశికి అ, ల, ఇ), కానీ నక్షత్ర పాదం అనేది జనన సమయానికి అత్యంత ఖచ్చితమైన నామాక్షరాన్ని అందిస్తుంది (ఉదాహరణకు అశ్విని 1వ పాదానికి 'చు', 2వ పాదానికి 'చే'). వైదిక సంప్రదాయంలో నక్షత్ర పాదాక్షరానికే ప్రథమ ప్రాధాన్యత ఇవ్వబడుతుంది.",
  },
  {
    question: "నామకరణ సంస్కారాన్ని ఏ రోజు మరియు ముహూర్తంలో జరపాలి?",
    answer:
      "గృహ్య సూత్రాల ప్రకారం, శిశువు జన్మించిన 10వ, 11వ, 12వ లేదా 16వ రోజున సూతక విముక్తి తర్వాత నామకరణం నిర్వహిస్తారు. దీనికి స్థిర నక్షత్రాలు (రోహిణి, ఉత్తర ఫల్గుణి, ఉత్తరాషాఢ, ఉత్తరాభాద్ర), పుష్యమి, హస్త, అనురాధ మరియు రిక్త తిథులు (4, 9, 14, అమావాస్య) మినహాయించి శుభ తిథులు శ్రేష్ఠమైనవి.",
  },
  {
    question: "సనాతన సంప్రదాయంలో శిశువుకు నిర్ణయించే 4 పేర్లు ఏమిటి?",
    answer:
      "శాస్త్రాల ప్రకారం 4 రకాల పేర్ల విధానం కలదు: (1) నక్షత్ర నామం (జన్మ నక్షత్రం ఆధారంగా రహస్య నామం), (2) దేవతా నామం (కులదైవం లేదా ఇష్టదైవం పేరు), (3) మాస నామం (జన్మించిన చాంద్రమాస విష్ణు నామం), మరియు (4) వ్యవహారిక నామం (సమాజంలో, పాఠశాలలో పిలిచే అందమైన పేరు).",
  },
];

const FAQS_HI = [
  {
    question: "जन्म नक्षत्र के पाद अनुसार नामकरण क्यों करना चाहिए?",
    answer:
      "वैदिक ज्योतिष के अनुसार, जन्म के समय चंद्रमा जिस नक्षत्र और चरण (पाद) में स्थित होता है, वह ब्रह्मांडीय ध्वनि तरंग उत्पन्न करता है जिसे 'नामाक्षर' कहते हैं। इस पावन बीज ध्वनि से नाम प्रारंभ करने पर बालक का मन, वाणी और भाग्य ग्रहों के शुभ प्रभाव से सामंजस्य स्थापित करते हैं।",
  },
  {
    question: "राशि के अक्षरों और नक्षत्र के नामाक्षरों में क्या अंतर है?",
    answer:
      "एक राशि में सवा दो नक्षत्र (9 पाद) होते हैं। राशि के अक्षर सामान्य ध्वनि वर्ग बताते हैं (जैसे मेष के लिए अ, ल, ई), जबकि नक्षत्र पाद उस विशेष घड़ी का अत्यंत सूक्ष्म और सटीक अक्षर प्रदान करता है (जैसे अश्विनी पाद 1 के लिए 'चु', पाद 2 के लिए 'चे')। शास्त्रीय दृष्टि से नक्षत्र पाद नामाक्षर को ही सर्वोच्च प्राथमिकता दी जाती है।",
  },
  {
    question: "नामकरण संस्कार किस दिन और मुहूर्त में करना चाहिए?",
    answer:
      "गृह्यसूत्रों के अनुसार, नामकरण संस्कार जन्म के 10वें, 11वें, 12वें अथवा 16वें दिन सूतक निवृत्ति के उपरांत किया जाता है। इसके लिए स्थिर नक्षत्र (रोहिणी, तीनों उत्तरा), पुष्य, हस्त, अनुराधा तथा रिक्ता तिथियों (4, 9, 14) को छोड़कर शुभ तिथियां सर्वोत्तम मानी जाती हैं।",
  },
  {
    question: "सनातन परंपरा में बच्चे के कौन से 4 नाम रखे जाते हैं?",
    answer:
      "शास्त्रों में 4 प्रकार के नामों का विधान है: (1) नक्षत्र नाम (जन्म नक्षत्र अनुसार गुप्त नाम), (2) देवता नाम (कुलदेवता या इष्टदेव के नाम पर), (3) मास नाम (जन्म के चंद्र मास के विष्णु रूप अनुसार), और (4) व्यावहारिक नाम (समाज और संसार में पुकारे जाने वाला मधुर नाम)।",
  },
];

export default async function BabyNamesPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";
  const faqs = isTe ? FAQS_TE : isHi ? FAQS_HI : FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi
            ? "नक्षत्र अनुसार बच्चों के नाम — वैदिक नामकरण संस्कार"
            : "Vedic Baby Names by Nakshatra & Pada 2026",
          description: isHi
            ? "27 नक्षत्रों के 108 पाद नामाक्षर और 12 राशियों के अनुसार बालक व बालिकाओं के सर्वश्रेष्ठ वैदिक नाम।"
            : "Comprehensive database of Vedic baby names by Janma Nakshatra and Pada with Sanskrit meanings.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <PageHero
        title={
          isTe
            ? "నక్షత్రం & రాశి ప్రకారం శిశువుల పేర్లు"
            : isHi
            ? "नक्षत्र एवं राशि अनुसार बच्चों के नाम"
            : "Vedic Baby Names by Nakshatra & Rashi"
        }
        subtitle={
          isTe
            ? "27 నక్షత్రాల 108 పాద నామాక్షరాలు, 12 రాశులు మరియు లోతైన అర్థాలతో కూడిన వైదిక శిశు నామాల ప్రామాణిక సమాహారం."
            : isHi
            ? "27 नक्षत्रों के 108 पाद नामाक्षर, 12 राशियां और आध्यात्मिक अर्थों से युक्त दिव्य बाल नामों की प्रामाणिक सूची।"
            : "Discover authentic Hindu baby names curated by 108 Nakshatra Pada syllables, Rashi letters, deities, and profound Vedic meanings."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isTe ? "నక్షత్ర నామకరణం" : isHi ? "वैदिक नामकरण" : "Vedic Baby Names", PATHS.babyNames]
        )}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        <BabyNamesView />

        <div className="mt-16 mx-auto max-w-4xl">
          <FaqList
            faqs={faqs}
            title={
              isTe
                ? "వైదిక నామకరణం గురించి తరచుగా అడిగే ప్రశ్నలు (FAQs)"
                : isHi
                ? "वैदिक नामकरण से जुड़े महत्वपूर्ण प्रश्नोत्तर (FAQs)"
                : "Frequently Asked Questions about Vedic Baby Names"
            }
          />
        </div>
      </div>
    </div>
  );
}
