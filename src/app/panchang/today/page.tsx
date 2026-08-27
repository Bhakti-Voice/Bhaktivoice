import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PanchangTodayView } from "@/components/panchang/PanchangTodayView";
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
      ? `आज का पंचांग (${dateFormatted}) — आज की तिथि, शुभ मुहूर्त, चौघड़िया एवं राहु काल`
      : `Today's Panchang (${dateFormatted}) — Aaj Ka Panchang, Tithi, Shubh Muhurat & Rahu Kaal`,
    description: isHi
      ? `${dateFormatted} का सम्पूर्ण वैदिक पंचांग। आज की तिथि, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त, राहु काल, अभिजित मुहूर्त और दिन-रात का चौघड़िया।`
      : `Get accurate Today's Panchang for ${dateFormatted}. Aaj ki Tithi, Nakshatra, Yoga, Karana, Sunrise/Sunset, Rahu Kaal, Abhijit Muhurat, and Choghadiya for all Indian cities.`,
    path: PATHS.panchangToday,
    keywords: isHi
      ? [
          "आज का पंचांग",
          "आज की तिथि",
          "शुभ मुहूर्त आज",
          "राहु काल आज",
          "आज का चौघड़िया",
          "दैनिक पंचांग",
        ]
      : [
          "aaj ka panchang",
          "today panchang",
          "aaj ki tithi",
          "today nakshatra",
          "shubh muhurat today",
          "rahu kaal today",
          "today choghadiya",
          "hindu calendar today",
        ],
  });
}

const TODAY_FAQS_EN = [
  {
    question: "What is Aaj Ka Panchang (Today's Panchang)?",
    answer:
      "Aaj Ka Panchang represents the five celestial limbs of Vedic astrology for today: Tithi (Lunar day), Nakshatra (Constellation), Yoga, Karana, and Vara (Weekday), along with solar/lunar timings and auspicious muhurats.",
  },
  {
    question: "What is the most auspicious time (Shubh Muhurat) today?",
    answer:
      "Abhijit Muhurat (midday, approximately 11:45 AM - 12:35 PM on non-Wednesdays), Brahma Muhurat (before sunrise), and Amrit Kaal are today's top auspicious periods for starting important ventures.",
  },
  {
    question: "What is Rahu Kaal today and why should it be avoided?",
    answer:
      "Rahu Kaal is an inauspicious 90-minute period occurring every day ruled by the shadow planet Rahu. Auspicious ceremonies, travel, new purchases, and financial transactions are traditionally avoided during Rahu Kaal.",
  },
];

const TODAY_FAQS_HI = [
  {
    question: "आज का पंचांग क्या होता है?",
    answer:
      "दैनिक पंचांग वैदिक ज्योतिष के पांच मुख्य अंगों (तिथि, वार, नक्षत्र, योग और करण) का दर्पण है। यह आज के दिन के शुभ-अशुभ मुहूर्त, सूर्योदय, सूर्यास्त और चंद्रोदय का सटीक समय दर्शाता है।",
  },
  {
    question: "आज का सबसे शुभ मुहूर्त कौन सा है?",
    answer:
      "आज के दिन अभिजित मुहूर्त (बुधवार को छोड़कर दोपहर का समय), ब्रह्म मुहूर्त (सूर्योदय से पूर्व) और अमृत काल को किसी भी नए व मांगलिक कार्य के लिए सर्वश्रेष्ठ माना जाता है।",
  },
  {
    question: "आज राहु काल कब है और इसमें क्या नहीं करना चाहिए?",
    answer:
      "राहु काल प्रतिदिन लगभग 90 मिनट की एक अशुभ अवधि होती है। इस समय में गृह प्रवेश, नया व्यापार, धन निवेश या शुभ यात्रा का आरंभ करने से बचना चाहिए।",
  },
];

export default async function PanchangTodayPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const params = await searchParams;
  const faqs = isHi ? TODAY_FAQS_HI : TODAY_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi ? "आज का पंचांग — दैनिक वैदिक ज्योतिष एवं मुहूर्त" : "Today's Panchang — Daily Vedic Astrology & Muhurat",
          description: isHi
            ? "तिथि, नक्षत्र, सूर्योदय, सूर्यास्त, चौघड़िया और शुभ मुहूर्त के साथ दैनिक पंचांग।"
            : "Live daily Hindu Panchang with Tithi, Nakshatra, Sunrise, Sunset, Choghadiya, and Shubh Muhurat.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <PageHero
        title={isHi ? "आज का पंचांग एवं शुभ मुहूर्त" : "Today's Panchang & Muhurat"}
        subtitle={
          isHi
            ? "आज का दैनिक वैदिक पंचांग। अपने नगर के अनुसार सटीक तिथि, नक्षत्र, योग, करण, चौघड़िया, राहु काल और शुभ मुहूर्त देखें।"
            : "Live Vedic Panchang for today. Accurate Tithi, Nakshatra, Yoga, Karana, Choghadiya, Rahu Kaal, and Auspicious Muhurats for your city."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "पंचांग" : "Panchang", PATHS.panchang],
          [isHi ? "आज का पंचांग" : "Today's Panchang", PATHS.panchangToday]
        )}
      />

      <PanchangTodayView initialCityId={params.city} pageMode="today" />

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <FaqList
          faqs={faqs}
          title={isHi ? "आज के पंचांग से जुड़े मुख्य प्रश्नोत्तर (FAQs)" : "Frequently Asked Questions about Today's Panchang"}
        />
      </div>
    </div>
  );
}
