import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PanchakView } from "@/components/panchang/PanchakView";
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
      ? `पंचक कब है 2026 (${dateFormatted}) — आज पंचक की स्थिति, प्रकार, वर्जित कार्य व उपाय`
      : `Panchak 2026 Dates (${dateFormatted}) — Today Panchak Status, Types & Niyam`,
    description: isHi
      ? `आज ${dateFormatted} को पंचक है या नहीं? पंचक के 5 प्रकार (रोग, राज, अग्नि, चोर, मृत्यु पंचक), वर्जित कार्य, शांति उपाय एवं वर्ष 2026 की संपूर्ण तिथि समय सारणी।`
      : `Is Panchak active today (${dateFormatted})? Check Panchak types, start and end dates, prohibited activities, and full 2026 Panchak calendar schedule.`,
    path: PATHS.panchak,
    keywords: isHi
      ? [
          "पंचक कब है",
          "आज पंचक है या नहीं",
          "पंचक 2026 तारीख",
          "पंचक के प्रकार",
          "मृत्यु पंचक",
          "राज पंचक",
          "पंचक में वर्जित कार्य",
          "पंचक शांति उपाय",
        ]
      : [
          "panchak kab hai",
          "today panchak status",
          "panchak 2026 dates",
          "is panchak active today",
          "panchak types",
          "mrityu panchak",
          "raja panchak",
          "panchak prohibited activities",
        ],
  });
}

const PANCHAK_FAQS_EN = [
  {
    question: "What is Panchak and why is it significant?",
    answer:
      "Panchak is a five-day astronomical period that occurs every month when the Moon transits through the last five constellations: Dhanishta (last two padas), Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, and Revati (signs Aquarius and Pisces). Initiating specific domestic and construction activities is traditionally avoided during this time.",
  },
  {
    question: "What are the 5 types of Panchak?",
    answer:
      "Depending on the weekday it begins, Panchak is classified into: 1. Roga Panchak (Sunday - illness), 2. Raja Panchak (Monday - auspicious for state/official affairs), 3. Agni Panchak (Tuesday - fire hazard), 4. Chora Panchak (Friday - theft/loss), and 5. Mrityu Panchak (Saturday - severe bodily affliction).",
  },
  {
    question: "What activities are prohibited during Panchak?",
    answer:
      "Five specific tasks are avoided: 1. Constructing the roof or lintel of a house, 2. Purchasing or manufacturing a wooden cot/bed, 3. Traveling in the South direction, 4. Stockpiling grass, wood, or fuel, and 5. Cremating a deceased body without Panchak Shanti vidhi.",
  },
];

const PANCHAK_FAQS_HI = [
  {
    question: "पंचक क्या होता है और यह क्यों लगता है?",
    answer:
      "जब चंद्रमा कुंभ और मीन राशि में गोचर करता है, तो उस समय चंद्रमा धनिष्ठा (उत्तरार्ध), शतभिषा, पूर्वाभाद्रपद, उत्तराभाद्रपद और रेवती नक्षत्रों से गुजरता है। इन पांच नक्षत्रों के कालखंड को 'पंचक' कहा जाता है। यह प्रत्येक माह लगभग 5 दिन के लिए लगता है।",
  },
  {
    question: "पंचक कितने प्रकार के होते हैं?",
    answer:
      "पंचक किस वार को प्रारंभ हो रहा है, उसके अनुसार 5 प्रकार होते हैं: 1. रोग पंचक (रविवार), 2. राज पंचक (सोमवार - शुभ), 3. अग्नि पंचक (मंगलवार), 4. चोर पंचक (शुक्रवार), और 5. मृत्यु पंचक (शनिवार - सर्वाधिक अशुभ)। बुधवार व गुरुवार का पंचक दोषमुक्त माना जाता है।",
  },
  {
    question: "पंचक में कौन से कार्य नहीं करने चाहिए?",
    answer:
      "पंचक में 5 कार्य वर्जित हैं: 1. घर की छत (लेंटर) ढालना, 2. चारपाई या नया पलंग बनवाना, 3. दक्षिण दिशा की यात्रा करना, 4. लकड़ी, ईंधन या घास एकत्र करना, और 5. पंचक शांति के बिना शव का अंतिम संस्कार करना।",
  },
];

export default async function PanchakPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? PANCHAK_FAQS_HI : PANCHAK_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isHi ? "पंचक कैलेंडर 2026 — भक्ति वॉइस" : "Panchak Calendar 2026 — BhaktiVoice",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          description: isHi
            ? "आज पंचक की स्थिति, प्रकार, वर्जित कार्य एवं 2026 की संपूर्ण समय सारणी।"
            : "Live Panchak status, types, prohibitions, remedies, and 2026 Panchak calendar schedule.",
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
        title={isHi ? "पंचक विचार एवं 2026 कैलेंडर" : "Panchak Status & 2026 Calendar"}
        subtitle={
          isHi
            ? "आज पंचक है या नहीं? पंचक के 5 प्रकार, वर्जित कार्य, शास्त्रीय शांति उपाय एवं वर्ष 2026 की संपूर्ण समय सारणी।"
            : "Is Panchak active today? Explore Panchak types, prohibited actions, astrological remedies, and full 2026 schedule."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],
          [isHi ? "पंचक विचार" : "Panchak", PATHS.panchak],
        )}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <PanchakView />
        <FaqList faqs={faqs} title={isHi ? "पंचक से संबंधित अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"} />
      </div>
    </div>
  );
}
