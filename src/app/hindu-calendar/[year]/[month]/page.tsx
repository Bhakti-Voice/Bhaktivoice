import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarView } from "@/components/calendar/CalendarView";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { MONTH_NAMES_EN, MONTH_NAMES_HI } from "@/lib/panchang/names";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

type Props = {
  params: Promise<{ year: string; month: string }>;
  searchParams: Promise<{ city?: string; date?: string }>;
};

export const revalidate = 86400;

const MONTH_SLUGS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export async function generateStaticParams() {
  const years = ["2026", "2027", "2028"];
  const params: { year: string; month: string }[] = [];
  for (const year of years) {
    for (const month of MONTH_SLUGS) {
      params.push({ year, month });
    }
  }
  return params;
}

function parseMonth(slug: string): number {
  const idx = MONTH_SLUGS.indexOf(slug.toLowerCase());
  return idx !== -1 ? idx + 1 : -1;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month } = await params;
  const locale = await getLocale();
  const isHi = locale === "hi";
  const monthNum = parseMonth(month);
  const yearNum = Number(year);

  if (monthNum === -1 || isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
    return { title: isHi ? "माह नहीं मिला" : "Calendar Month Not Found" };
  }

  const monthName = MONTH_NAMES_EN[monthNum - 1];
  const monthNameHi = MONTH_NAMES_HI[monthNum - 1];

  return localizedMetadata({
    title: isHi
      ? `हिन्दू कैलेंडर ${monthNameHi} ${year} — दैनिक तिथि, व्रत एवं पंचांग`
      : `Hindu Calendar ${monthName} ${year} — Tithi, Festivals & Panchang`,
    description: isHi
      ? `${monthNameHi} (${monthName}) ${year} का दैनिक हिन्दू कैलेंडर। तिथि, नक्षत्र, एकादशी, पूर्णिमा, अमावस्या, शुभ मुहूर्त और त्यौहारों की सम्पूर्ण जानकारी।`
      : `Daily Hindu Calendar for ${monthName} (${monthNameHi}) ${year}. Check accurate Tithi, Nakshatra, Ekadashi, Purnima, Amavasya, Shubh Muhurat, and festivals.`,
    path: `${PATHS.calendar}/${year}/${month}`,
    keywords: isHi
      ? [
          `हिन्दू कैलेंडर ${monthNameHi} ${year}`,
          `${monthNameHi} ${year} पंचांग`,
          `${monthNameHi} के त्यौहार ${year}`,
          `${monthNameHi} एकादशी ${year}`,
        ]
      : [
          `hindu calendar ${monthName.toLowerCase()} ${year}`,
          `${monthName.toLowerCase()} ${year} panchang`,
          `festivals in ${monthName.toLowerCase()} ${year}`,
          `ekadashi in ${monthName.toLowerCase()} ${year}`,
        ],
  });
}

export default async function MonthCalendarPage({ params, searchParams }: Props) {
  const { year, month } = await params;
  const monthNum = parseMonth(month);
  const yearNum = Number(year);

  if (monthNum === -1 || isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) notFound();

  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const monthName = MONTH_NAMES_EN[monthNum - 1];
  const monthNameHi = MONTH_NAMES_HI[monthNum - 1];
  const sParams = await searchParams;

  const faqs = isHi
    ? [
        {
          question: `${monthNameHi} ${year} के प्रमुख व्रत एवं त्यौहार कौन से हैं?`,
          answer: `${monthNameHi} ${year} में पवित्र एकादशी व्रत, प्रदोष, पूर्णिमा, अमावस्या और कई प्रमुख पारंपरिक उत्सव आते हैं। कैलेंडर ग्रिड में किसी भी तारीख पर क्लिक करके उसकी सम्पूर्ण पूजा विधि और शुभ मुहूर्त देखें।`,
        },
        {
          question: `${monthNameHi} ${year} के लिए दैनिक तिथि और नक्षत्र कैसे देखें?`,
          answer: `ऊपर दिए गए 7-कॉलम कैलेंडर ग्रिड में प्रत्येक दिन की तिथि और चंद्र कला अंकित है। किसी भी दिन का चयन करते ही उसके सूर्योदय, सूर्यास्त और चौघड़िया सहित सम्पूर्ण पंचांग का विवरण दाईं ओर प्रदर्शित हो जाता है।`,
        },
      ]
    : [
        {
          question: `What are the major festivals in ${monthName} ${year}?`,
          answer: `The month of ${monthName} ${year} features sacred Ekadashi fasts, Pradosh Vrats, Purnima, Amavasya, and major traditional observances. Click on any highlighted date in the calendar grid to see full Puja Vidhi and Muhurat details.`,
        },
        {
          question: `How to check the daily Tithi and Nakshatra for ${monthName} ${year}?`,
          answer: `In the interactive 7-column calendar grid above, each day displays its corresponding Tithi and Moon phase icon. Selecting any date opens the complete Vedic Panchang panel with exact start and end times calculated for your city.`,
        },
      ];

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi ? `हिन्दू कैलेंडर ${monthNameHi} ${year}` : `Hindu Calendar ${monthName} ${year}`,
          description: isHi
            ? `${monthNameHi} ${year} का दैनिक हिन्दू कैलेंडर एवं पंचांग`
            : `Daily Hindu Calendar and Vedic Panchang for ${monthName} ${year} with Tithi, Nakshatra, and festival timings.`,
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <PageHero
        title={isHi ? `हिन्दू कैलेंडर ${monthNameHi} ${year}` : `Hindu Calendar ${monthName} ${year}`}
        subtitle={
          isHi
            ? `${monthNameHi} (${monthName}) ${year} का सम्पूर्ण दैनिक हिन्दू कैलेंडर। तिथि, चंद्र कला, एकादशी, व्रत और शुभ मुहूर्त देखें।`
            : `Complete daily Hindu calendar for ${monthName} (${monthNameHi}) ${year}. View Tithi, Moon phases, Ekadashi, Vrat, and auspicious Muhurats.`
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "हिन्दू कैलेंडर" : "Hindu Calendar", PATHS.calendar],
          [`${isHi ? "वर्ष" : "Year"} ${year}`, `${PATHS.calendar}/${year}`],
          [`${isHi ? monthNameHi : monthName}`, `${PATHS.calendar}/${year}/${month}`]
        )}
      />

      <CalendarView
        initialYear={yearNum}
        initialMonth={monthNum}
        initialCityId={sParams.city}
        initialSelectedDate={sParams.date}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <FaqList
          faqs={faqs}
          title={
            isHi
              ? `${monthNameHi} ${year} से जुड़े प्रश्नोत्तर`
              : `Frequently Asked Questions for ${monthName} ${year}`
          }
        />
      </div>
    </div>
  );
}
