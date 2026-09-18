import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BhadraView } from "@/components/panchang/BhadraView";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return localizedMetadata({
    title: isTe
      ? `నేడు భద్ర ఎప్పుడు ఉంది (${dateFormatted}) — భద్రా కాలం సమయాలు, వాసం & ముఖ-పుచ్ఛ విచారం`
      : isHi
      ? `भद्रा कब है आज (${dateFormatted}) — आज भद्रा कब से कब तक है? भद्रा वास व मुख-पुच्छ समय`
      : `Bhadra Timings Today (${dateFormatted}) — Aaj Bhadra Kab Hai? Live Status, Vaas & Mukha Puchha`,
    description: isTe
      ? `ఈరోజు ${dateFormatted} భద్రా కాలం ఎప్పటి నుండి ఎప్పటి వరకు ఉంది? భద్రా వాసం (స్వర్గం, పాతాళం, పృథ్వి), ముఖ మరియు పుచ్ఛ కాలాల సమయం, మరియు రక్షాబంధన్, హోలికా దహన నియమాలను మీ నగరం ప్రకారం తెలుసుకోండి.`
      : isHi
      ? `आज ${dateFormatted} को भद्रा कब से कब तक है? जानें आज भद्रा है या नहीं, भद्रा का वास (स्वर्ग, पाताल, पृथ्वी), मुख और पुच्छ काल का सटीक समय, और रक्षाबंधन व होलिका दहन के शास्त्रीय नियम। 120+ शहरों अनुसार लाइव समय सारणी।`
      : `Is Bhadra active today (${dateFormatted})? Check exact Bhadra start and end timings, Bhadra Vaas (Swarga, Prithvi, Patala), Mukha & Puchha kaal, and Raksha Bandhan festival rules across 120+ cities.`,
    path: PATHS.bhadra,
    keywords: isTe
      ? ["భద్రా కాలం", "నేడు భద్ర ఉందా", "భద్రా వాసం", "విష్టి కరణం", "భద్ర ముఖ పుచ్ఛం", "రాఖీ కట్టే ముహూర్తం"]
      : isHi
      ? [
          "भद्रा कब है",
          "आज भद्रा कब से कब तक है",
          "आज भद्रा है या नहीं",
          "क्या आज भद्रा है",
          "भद्रा काल आज का",
          "भद्रा वास कहां है आज",
          "भद्रा मुख और पुच्छ का समय",
          "विष्टि करण क्या है",
          "भद्रा में क्या नहीं करना चाहिए",
          "राखी बांधने का शुभ मुहूर्त भद्रा",
          "होलिका दहन भद्रा काल 2026",
          "भद्रा शांति के उपाय",
          "स्वर्ग पाताल पृथ्वी भद्रा वास",
          "दैनिक भद्रा समय सारणी",
          "bhadra kab hai",
          "bhadra timings today hindi",
        ]
      : [
          "bhadra kab hai",
          "bhadra timings today",
          "today bhadra start and end time",
          "aaj bhadra kab se kab tak hai",
          "aaj bhadra hai ya nahi",
          "is bhadra active today",
          "bhadra kaal today",
          "bhadra vaas today",
          "bhadra mukha puchha timings",
          "vishti karana timings today",
          "vishti karana today",
          "bhadra in hindi",
          "raksha bandhan bhadra timings",
          "holika dahan bhadra rules",
          "bhadra dosha remedies",
          "swarga patala prithvi bhadra",
          "kya aaj bhadra hai",
          "bhadra puchha time today",
          "bhadra calendar 2026",
        ],
  });
}

const BHADRA_FAQS_EN = [
  {
    question: "What is Bhadra in Vedic astrology?",
    answer:
      "Bhadra is personified as the daughter of Sun God (Surya) and Chhaya, and the sister of Saturn (Shani Dev). In astrological terms, Bhadra corresponds to the Vishti Karana (the 7th movable karana). Due to her fiery and destructive nature, auspicious celebrations are forbidden during her prevalence.",
  },
  {
    question: "What is Bhadra Vaas (Residence) and how does it affect rituals?",
    answer:
      "Bhadra resides in three realms depending on the Moon's sign: 1. Swarga (Heaven) when Moon is in Aries, Taurus, Gemini, or Scorpio — safe on Earth; 2. Patala (Netherworld) when Moon is in Sagittarius, Capricorn, Aquarius, or Pisces — profitable on Earth; 3. Prithvi (Earth / Mrityuloka) when Moon is in Cancer, Leo, Virgo, or Libra — highly malefic on Earth, causing destruction.",
  },
  {
    question: "Can any ritual be done during Bhadra Puchha?",
    answer:
      "Yes. If an auspicious activity is unavoidable during emergency situations, it may be solemnized during the 'Bhadra Puchha' (the tail portion), while 'Bhadra Mukha' (the face/jaws) must strictly be avoided at all costs.",
  },
];

const BHADRA_FAQS_TE = [
  {
    question: "భద్ర అంటే ఎవరు మరియు వైదిక జ్యోతిష్యంలో దీని ప్రాముఖ్యత ఏమిటి?",
    answer:
      "పౌరాణిక విశ్వాసాల ప్రకారం భద్ర సూర్యదేవుడు మరియు ఛాయాదేవిల పుత్రిక, శనిదేవుని సోదరి. జ్యోతిష్యంలో 'విష్టి కరణం'నే భద్ర అని పిలుస్తారు. ఆమె ఉగ్ర స్వభావం కారణంగా భద్రా కాలంలో శుభ మరియు మాంగలిక కార్యాలు పూర్తిగా నిషిద్ధం.",
  },
  {
    question: "భద్రా వాసం అంటే ఏమిటి మరియు భూమిపై దీని ప్రభావం ఎలా ఉంటుంది?",
    answer:
      "చంద్రుని రాశిని బట్టి భద్ర మూడు లోకాలలో నివసిస్తుంది: 1. స్వర్గ లోకం (మేషం, వృషభం, మిథునం, వృశ్చికం) — భూమిపై శుభం; 2. పాతాళ లోకం (ధనుస్సు, మకరం, కుంభం, మీనం) — వ్యాపార ధనలాభాలకు అనుకూలం; 3. మృత్యులోకం / భూమి (కర్కాటకం, సింహం, కన్య, తుల) — అత్యంత హానికరం, ఇందులో సమస్త శుభ కార్యాలు వర్జ్యం.",
  },
  {
    question: "భద్రా పుచ్ఛ కాలంలో శుభ కార్యం చేయవచ్చా?",
    answer:
      "అవును. అత్యవసర పరిస్థితులలో పనులను వాయిదా వేయడం సాధ్యం కానప్పుడు భద్ర యొక్క పుచ్ఛ భాగంలో కార్యాన్ని పూర్తి చేయవచ్చు. అయితే భద్ర ముఖ కాలంలో పనులు చేయడం వల్ల సర్వనాశన భయం ఉంటుందని శాస్త్రాలు చెబుతున్నాయి.",
  },
];

const BHADRA_FAQS_HI = [
  {
    question: "भद्रा कौन हैं और वैदिक ज्योतिष में इसका क्या महत्व है?",
    answer:
      "पौराणिक मान्यताओं के अनुसार भद्रा भगवान सूर्यदेव और माता छाया की पुत्री तथा शनिदेव की सगी बहन हैं। ज्योतिष में 'विष्टि करण' को ही भद्रा कहा जाता है। अपने उग्र स्वभाव के कारण भद्रा काल में शुभ व मांगलिक कार्य सर्वथा वर्जित माने गए हैं।",
  },
  {
    question: "भद्रा वास क्या होता है और इसका पृथ्वी पर क्या असर पड़ता है?",
    answer:
      "चंद्रमा की राशि के अनुसार भद्रा का वास तीन लोकों में होता है: 1. स्वर्ग लोक (मेष, वृषभ, मिथुन, वृश्चिक) — पृथ्वी पर शुभ; 2. पाताल लोक (धनु, मकर, कुंभ, मीन) — व्यापार व धन हेतु लाभप्रद; 3. मृत्युलोक / पृथ्वी (कर्क, सिंह, कन्या, तुला) — अत्यंत घातक व अशुभ, जिसमें समस्त मांगलिक कार्य वर्जित हैं।",
  },
  {
    question: "क्या भद्रा पुच्छ काल में शुभ कार्य किया जा सकता है?",
    answer:
      "हां। अत्यंत अपरिहार्य स्थिति में यदि कोई कार्य टालना संभव न हो, तो भद्रा के पुच्छ भाग (अंतिम 3 घटियों) में कार्य संपन्न किया जा सकता है। परंतु भद्रा मुख काल (आरंभ की 5 घटियां) में कार्य करने से सर्वनाश का भय रहता है।",
  },
];



export default async function BhadraPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const faqs = isTe ? BHADRA_FAQS_TE : isHi ? BHADRA_FAQS_HI : BHADRA_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isTe
            ? "భద్రా కాలం కాలిక్యులేటర్ — భక్తి వాయిస్"
            : isHi
            ? "भद्रा काल कैलकुलेटर — भक्ति वॉइस"
            : "Bhadra Timings Calculator — BhaktiVoice",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          description: isTe
            ? "నేడు భద్ర ఎప్పుడు ఉంది? భద్రా వాసం, ముఖ-పుచ్ఛ సమయం మరియు శాస్త్రీయ నియమాలు."
            : isHi
            ? "आज भद्रा कब से कब तक है? भद्रा वास, मुख-पुच्छ समय व शास्त्रीय नियम।"
            : "Live Bhadra timings calculator, Bhadra Vaas, Mukha-Puchha timings, and classical festival rules.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
          },
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />

      <PageHero
        title={
          isTe
            ? "నేడు భద్ర ఎప్పుడు ఉంది — నేటి భద్రా స్థితి & సమయ పట్టిక"
            : isHi
            ? "भद्रा कब है — आज की भद्रा स्थिति व समय सारणी"
            : "Bhadra Timings Today (आज भद्रा कब है)"
        }
        subtitle={
          isTe
            ? "ఈరోజు భద్ర ఎప్పటి నుండి ఎప్పటి వరకు ఉంది? భద్రా వాసం (స్వర్గం, పృథ్వి, పాతాళం), ముఖ మరియు పుచ్ఛ సమయాలు మరియు రక్షాబంధన్ శాస్త్రీయ నియమాలు తెలుసుకోండి."
            : isHi
            ? "आज भद्रा कब से कब तक है? जानें भद्रा वास (स्वर्ग, पृथ्वी, पाताल), मुख एवं पुच्छ समय तथा रक्षाबंधन के विशेष शास्त्रीय नियम।"
            : "Is Bhadra active today? Discover exact start & end timings, Bhadra Vaas in 3 realms, Mukha-Puchha windows, and festival guidelines."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "శుభ ముహూర్తాలు" : isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],
          [isTe ? "భద్రా విచారం" : isHi ? "भद्रा विचार" : "Bhadra", PATHS.bhadra],
        )}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <BhadraView />
        <FaqList
          faqs={faqs}
          title={
            isTe
              ? "భద్రకు సంబంధించిన తరచుగా అడిగే ప్రశ్నలు"
              : isHi
              ? "भद्रा से संबंधित अक्सर पूछे जाने वाले प्रश्न"
              : "Frequently Asked Questions"
          }
        />
      </div>
    </div>
  );
}
