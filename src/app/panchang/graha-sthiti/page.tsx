const GRAHA_STHITI_FAQS_TE = [
  {
    question: "గ్రహ స్థితి (Graha Sthiti) అంటే ఏమిటి?",
    answer:
      "దైనందిన గ్రహ స్థితి అనేది ఆకాశంలో నిర్దిష్ట సమయంలో (ఉదయం 05:30 లేదా మధ్యాహ్నం) సూర్యుడు, చంద్రుడు, కుజుడు, బుధుడు, గురువు, శుక్రుడు, శని, రాహువు మరియు కేతువుల నిరయన (Sidereal) రాశులు మరియు ఖచ్చితమైన అంశలు (డిగ్రీలు, నిమిషాలు, సెకన్లు) తెలిపే శాస్త్రీయ వివరణ.",
  },
  {
    question: "వక్రీ గ్రహం (Retrograde - R) యొక్క జ్యోతిష్య ప్రాముఖ్యత ఏమిటి?",
    answer:
      "వక్రీ గతి అంటే భూమికి సంబంధించి గ్రహం వెనుకకు ప్రయాణిస్తున్నట్లు కనిపించడం. వైదిక జ్యోతిష్యంలో వక్రీ గ్రహాలు 'చేష్టా బలం' కలిగినవిగా పరిగణించబడతాయి. ఇవి గత కర్మల పునఃసమీక్ష మరియు ఊహించని తీవ్రమైన ఫలితాలకు సంకేతం.",
  },
  {
    question: "గ్రహ అస్తమయం (Combustion) ఎప్పుడు జరుగుతుంది?",
    answer:
      "ఏదైనా గ్రహం సూర్యునికి అత్యంత సమీపంలోకి వచ్చినప్పుడు (ఉదా. బుధుడు 12°, శుక్రుడు 8°-10°, కుజుడు 17°), సూర్యుని తీవ్రమైన కాంతి కిరణాల ప్రభావం వల్ల ఆ గ్రహం అస్తమిస్తుంది. అస్తమించిన గ్రహం యొక్క బాహ్య భౌతిక ఫలితాలు బలహీనపడతాయి.",
  },
  {
    question: "భక్తి వాయిస్‌లో ఏ అయనాంశను ఉపయోగించారు?",
    answer:
      "మేము భారత ప్రభుత్వం సిఫార్సు చేసిన ప్రామాణిక లాహిరి అయనాంశ (Chitrapaksha Lahiri Ayanamsha)ను ఉపయోగిస్తున్నాము, ఇది అంతర్జాతీయ నాసా JPL ఖగోళ గణనలకు అనుగుణంగా అత్యంత ఖచ్చితమైన ఫలితాలను ఇస్తుంది.",
  },
];

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { GrahaSthitiPageView } from "@/components/panchang/GrahaSthitiPageView";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isTe
    ? "దైనందిన గ్రహ స్థితి (Graha Sthiti Ephemeris) — 9 వైదిక గ్రహాలు, రాశి అంశలు, వక్రీ & అస్తంగత వివరాలు"
    : isHi
    ? "दैनिक ग्रह स्थिति (Graha Sthiti Ephemeris) — ९ वैदिक ग्रह, अंश-कला-विकला, वक्री व अस्त"
    : "Daily Planetary Ephemeris (Graha Sthiti) — Vedic Lahiri Degrees, Vakri, Combust & Pada";

  const description = isTe
    ? "లాహిరి (చిత్రపక్ష) అయనాంశ ఆధారిత దైనందిన 9 వైదిక నవగ్రహాల ఖచ్చితమైన స్థితి. రాశి, డిగ్రీలు, కళలు, వికళలు, నక్షత్ర పాదం, వక్రీ (R) మరియు అస్తంగత (Combust) గతుల సంపూర్ణ నివేదిక."
    : isHi
    ? "प्रामाणिक लाहिरी (चित्रापक्ष) अयनांश आधारित दैनिक ९ वैदिक ग्रहों एवं आधुनिक ग्रहों की स्पष्ट स्थिति। राशि, अंश, कला, विकला, नक्षत्र पाद, वक्री (R) व अस्त (Combust) गति का सम्पूर्ण विवरण।"
    : "High-precision Daily Planetary Ephemeris (Graha Sthiti) based on Lahiri (Chitrapaksha) Ayanamsha. Real-time Sidereal degrees, minutes, seconds, Nakshatra Pada, retrograde (Vakri), combust status, and planetary dignities.";

  return localizedMetadata({
    title,
    description,
    path: `${PATHS.panchang}/graha-sthiti`,
    keywords: isHi
      ? [
          "ग्रह स्थिति आज की",
          "दैनिक ग्रह स्थिति",
          "वैदिक पंचांग ग्रह गोचर",
          "वक्री ग्रह 2026",
          "शनि वक्री कब होगा",
          "गुरु अस्त 2026",
          "लाहिरी अयनांश पंचांग",
          "graha sthiti today",
          "planetary ephemeris vedic",
        ]
      : [
          "planetary ephemeris",
          "graha sthiti today",
          "vedic planet positions",
          "daily ephemeris table",
          "lahiri ayanamsa degrees",
          "retrograde planets today",
          "combust planets vedic",
          "nakshatra pada calculator",
          "navagraha position table",
        ],
  });
}

export default async function GrahaSthitiPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],
    [isTe ? "దైనందిన గ్రహ స్థితి" : isHi ? "दैनिक ग्रह स्थिति" : "Planetary Ephemeris", `${PATHS.panchang}/graha-sthiti`]
  );

  const faqs = isTe ? GRAHA_STHITI_FAQS_TE : isHi
    ? [
        {
          question: "ग्रह स्थिति (Graha Sthiti) क्या होती है?",
          answer:
            "दैनिक ग्रह स्थिति किसी निश्चित समय (सामान्यतः प्रातः ०५:३० अथवा मध्याह्न) पर आकाश में सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु एवं केतु की निरयण (Sidereal) राशियों एवं सटीक अंशों (डिग्री, मिनट, सेकंड) का वैज्ञानिक ब्योरा है।",
        },
        {
          question: "वक्री ग्रह (Retrograde - R) का ज्योतिषीय महत्व क्या है?",
          answer:
            "वक्री गति का अर्थ है पृथ्वी के सापेक्ष ग्रह का उल्टा चलता प्रतीत होना। वैदिक ज्योतिष में वक्री ग्रह 'चेष्टा बली' माने जाते हैं। ये कर्मों के पुनर्मूल्यांकन और अप्रत्याशित तीव्र परिणामों का संकेत देते हैं।",
        },
        {
          question: "ग्रह अस्त (Combustion) कब माना जाता है?",
          answer:
            "जब कोई ग्रह सूर्य के अति निकट आ जाता है (जैसे बुध १२°, शुक्र ८°-१०°, मंगल १७°), तो सूर्य की प्रखर रश्मियों के कारण वह अस्त हो जाता है। अस्त ग्रह के बाह्य सांसारिक प्रभाव शिथिल हो जाते हैं।",
        },
        {
          question: "भक्ति वॉयस पर किस अयनांश का उपयोग किया गया है?",
          answer:
            "हम भारत सरकार के पंचांग सुधार समिति (Calendar Reform Committee) द्वारा संस्तुत प्रमाणिक लाहिरी अयनांश (Chitrapaksha Lahiri Ayanamsha) का उपयोग करते हैं, जो आधुनिक खगोलीय गणनाओं (NASA JPL Ephemeris) के अनुरूप सूक्ष्मता प्रदान करता है।",
        },
      ]
    : [
        {
          question: "What is Graha Sthiti (Planetary Ephemeris)?",
          answer:
            "Graha Sthiti is the precise Sidereal (Nirayana) celestial longitude of the nine Vedic Grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) and outer planets calculated for a specific city and date in degrees, minutes, and seconds.",
        },
        {
          question: "What does Retrograde (Vakri) mean?",
          answer:
            "Retrograde motion is the apparent backward movement of a planet through the zodiac from the perspective of Earth. In Vedic astrology, retrograde planets gain Chesta Bala (motional power) and represent karmic introspection and heightened results.",
        },
        {
          question: "When is a planet considered Combust (Asta)?",
          answer:
            "A planet becomes combust when it gets within a specific angular proximity to the Sun (e.g., Mercury ~12°, Venus ~8°-10°, Mars ~17°, Jupiter ~11°, Saturn ~15°). Solar brilliance overpowers the visible luminescence of the combust planet.",
        },
        {
          question: "Which Ayanamsha does BhaktiVoice use?",
          answer:
            "We calculate all sidereal positions using the official Chitrapaksha Lahiri Ayanamsha, the recognized national standard of the Indian Astronomical Ephemeris.",
        },
      ];

  const pageTitle = isTe
    ? "దైనందిన గ్రహ స్థితి (Graha Sthiti Ephemeris)"
    : isHi
    ? "दैनिक ग्रह स्थिति (Graha Sthiti Ephemeris)"
    : "Daily Planetary Ephemeris (Graha Sthiti)";

  const subtitle = isTe
    ? "లాహిరి అయనాంశం ఆధారంగా 9 వైదిక గ్రహాలు, రాశి డిగ్రీలు, నక్షత్ర పాదం, వక్రీ మరియు అస్తంగత గతులు"
    : isHi
    ? "लाहिरी अयनांश पर आधारित ९ वैदिक ग्रह, राशि अंश-कला, नक्षत्र पाद, वक्री व अस्त गति"
    : "High-precision Sidereal Lahiri positions for 9 Vedic Grahas with Retrograde & Combustion status";

  return (
    <div className="space-y-8 pb-16">
      <PageHero
        title={pageTitle}
        subtitle={subtitle}
        crumbs={breadcrumbs}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <GrahaSthitiPageView />

        <div className="mt-12">
          <FaqList faqs={faqs} title={isTe ? "గ్రహ స్థితికి సంబంధించిన తరచుగా అడిగే ప్రశ్నలు" : isHi ? "ग्रह स्थिति से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: pageTitle,
          url: `${SITE.url}${PATHS.panchang}/graha-sthiti`,
          description: subtitle,
          applicationCategory: "AstrologyApplication",
          operatingSystem: "All",
        }}
      />
    </div>
  );
}
