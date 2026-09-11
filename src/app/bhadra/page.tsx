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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return localizedMetadata({
    title: isHi
      ? `भद्रा कब है (${dateFormatted}) — आज भद्रा की स्थिति, भद्रा वास एवं मुख-पुच्छ समय`
      : `Bhadra Timings Today (${dateFormatted}) — Bhadra Status, Vaas & Mukha Puchha`,
    description: isHi
      ? `आज ${dateFormatted} को भद्रा कब से कब तक है? भद्रा वास (स्वर्ग, पृथ्वी, पाताल), भद्रा मुख एवं पुच्छ काल, रक्षाबंधन व होलिका दहन के विशेष शास्त्रीय नियम।`
      : `Is Bhadra active today (${dateFormatted})? Check Bhadra start & end timings, Bhadra Vaas (Swarga, Prithvi, Patala), Mukha-Puchha timings, and festival rules.`,
    path: PATHS.bhadra,
    keywords: isHi
      ? [
          "भद्रा कब है",
          "आज भद्रा कब तक है",
          "भद्रा वास",
          "भद्रा मुख और पुच्छ",
          "भद्रा में राखी क्यों नहीं बांधते",
          "विष्टि करण",
          "भद्रा समय आज",
        ]
      : [
          "bhadra kab hai",
          "bhadra timings today",
          "is bhadra active today",
          "bhadra vaas",
          "bhadra mukha puchha",
          "vishti karana",
          "raksha bandhan bhadra rules",
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
  const faqs = isHi ? BHADRA_FAQS_HI : BHADRA_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isHi ? "भद्रा काल कैलकुलेटर — भक्ति वॉइस" : "Bhadra Timings Calculator — BhaktiVoice",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          description: isHi
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
        title={isHi ? "भद्रा विचार एवं समय सारणी" : "Bhadra Timings & Status"}
        subtitle={
          isHi
            ? "आज भद्रा कब से कब तक है? भद्रा वास (स्वर्ग, पृथ्वी, पाताल), भद्रा मुख एवं पुच्छ समय तथा रक्षाबंधन के विशेष नियम।"
            : "Is Bhadra active today? Discover exact start and end times, Bhadra Vaas in 3 realms, Mukha-Puchha windows, and festival guidelines."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],
          [isHi ? "भद्रा विचार" : "Bhadra", PATHS.bhadra],
        )}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <BhadraView />
        <FaqList faqs={faqs} title={isHi ? "भद्रा से संबंधित अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"} />
      </div>
    </div>
  );
}
