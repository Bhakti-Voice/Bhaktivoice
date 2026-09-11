import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { HoraView } from "@/components/panchang/HoraView";
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
      ? `आज की शुभ होरा (${dateFormatted}) — 24 दैनिक ग्रह होरा समय सारणी`
      : `Planetary Hora Today (${dateFormatted}) — Shubha Hora Timings & Calculator`,
    description: isHi
      ? `आज ${dateFormatted} की 24 दैनिक ग्रह होरा। सूर्य, शुक्र, बुध, चंद्र, शनि, गुरु व मंगल होरा का सटीक समय एवं प्रत्येक ग्रह अनुसार शुभ कार्य।`
      : `Check Today's Planetary Hora for ${dateFormatted}. Accurate 24 Day and Night Horas (Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars) with favorable activities.`,
    path: PATHS.hora,
    keywords: isHi
      ? [
          "आज की होरा",
          "शुभ होरा मुहूर्त",
          "दैनिक ग्रह होरा",
          "काल होरा",
          "गुरु होरा समय",
          "शुक्र होरा समय",
          "होरा चक्र आज",
        ]
      : [
          "planetary hora today",
          "aaj ki hora",
          "shubha hora timings",
          "kaal hora calculator",
          "jupiter hora time",
          "venus hora time",
          "24 hora table today",
        ],
  });
}

const HORA_FAQS_EN = [
  {
    question: "What is a Planetary Hora?",
    answer:
      "A Hora is an ancient Vedic unit of time. The word 'Hour' derives from 'Hora' (from Ahoratra). Each day from sunrise to next sunrise is divided into 24 Horas (12 Day Horas and 12 Night Horas), ruled cyclically by the seven classical planets.",
  },
  {
    question: "Which are the best Horas for wealth, business, and celebrations?",
    answer:
      "Jupiter (Guru) Hora and Venus (Shukra) Hora are considered the most auspicious for wealth, ceremonies, gold buying, and celebrations. Mercury (Budha) Hora is best for contracts, accounts, and education.",
  },
  {
    question: "How is the first Hora of the day determined?",
    answer:
      "The first Hora of any day begins exactly at local sunrise and is ruled by the lord of that weekday (e.g. Sunday starts with Sun, Monday starts with Moon, Tuesday starts with Mars, etc.).",
  },
];

const HORA_FAQS_HI = [
  {
    question: "ग्रह होरा क्या होती है?",
    answer:
      "वैदिक काल गणना में सूर्योदय से अगले सूर्योदय तक के 24 घंटों को 24 होराओं (12 दिन की होरा और 12 रात की होरा) में बांटा जाता है। 'अहोरात्र' शब्द से ही 'होरा' और अंग्रेजी का 'Hour' शब्द बना है। प्रत्येक होरा पर नवग्रहों में से सात प्रमुख ग्रहों का आधिपत्य होता है।",
  },
  {
    question: "मांगलिक एवं व्यापारिक कार्यों के लिए कौन सी होरा श्रेष्ठ है?",
    answer:
      "बृहस्पति (गुरु) होरा और शुक्र होरा को सभी प्रकार के मांगलिक कार्यों, विवाह वार्ता, धन संचय व आभूषण क्रय के लिए परम शुभ माना जाता है। बुध होरा व्यापार, अनुबंध व शिक्षा के लिए उत्तम है।",
  },
  {
    question: "दिन की पहली होरा कैसे तय होती है?",
    answer:
      "सूर्योदय के समय प्रारंभ होने वाली दिन की पहली होरा सदैव उस दिन (वार) के स्वामी ग्रह की होती है। जैसे रविवार को सूर्य, सोमवार को चंद्र, मंगलवार को मंगल, बुधवार को बुध, गुरुवार को गुरु, शुक्रवार को शुक्र और शनिवार को शनि की होरा पहली होती है।",
  },
];

export default async function HoraPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const params = await searchParams;
  const faqs = isHi ? HORA_FAQS_HI : HORA_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isHi ? "दैनिक ग्रह होरा कैलकुलेटर — भक्ति वॉइस" : "Planetary Hora Calculator — BhaktiVoice",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          description: isHi
            ? "दैनिक 24 ग्रह होरा समय सारणी। सूर्य, शुक्र, बुध, चंद्र, शनि, गुरु व मंगल होरा।"
            : "Daily 24 Planetary Horas calculator with Sun, Venus, Mercury, Moon, Saturn, Jupiter, and Mars timings.",
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
        title={isHi ? "दैनिक शुभ ग्रह होरा" : "Planetary Hora Calculator"}
        subtitle={
          isHi
            ? "दिन एवं रात की 24 ग्रह होरा का सटीक समय। किस होरा में कौन सा कार्य करना फलदायी है, शास्त्रीय प्रमाण सहित देखें।"
            : "Accurate 24 Day and Night Planetary Horas. Discover favorable and unfavorable hours ruled by the nine celestial grahas."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],
          [isHi ? "ग्रह होरा" : "Planetary Hora", PATHS.hora],
        )}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <HoraView initialCityId={params.city} />
        <FaqList faqs={faqs} title={isHi ? "ग्रह होरा से संबंधित प्रश्नोत्तरी" : "Frequently Asked Questions"} />
      </div>
    </div>
  );
}
