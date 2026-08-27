import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarView } from "@/components/calendar/CalendarView";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

type Props = {
  params: Promise<{ year: string }>;
  searchParams: Promise<{ city?: string; month?: string; date?: string }>;
};

export const revalidate = 86400;

export async function generateStaticParams() {
  return [{ year: "2025" }, { year: "2026" }, { year: "2027" }, { year: "2028" }, { year: "2029" }, { year: "2030" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const locale = await getLocale();
  const isHi = locale === "hi";
  const yearNum = Number(year);
  if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
    return { title: isHi ? "वर्ष नहीं मिला" : "Year not found" };
  }

  return localizedMetadata({
    title: isHi
      ? `हिन्दू कैलेंडर ${year} — सम्पूर्ण त्यौहार, व्रत, एकादशी एवं दैनिक पंचांग`
      : `Hindu Calendar ${year} — Complete Festivals, Vrat, Ekadashi & Panchang`,
    description: isHi
      ? `${year} का विस्तृत हिन्दू कैलेंडर। सभी 12 महीनों की तिथियाँ, महाशिवरात्रि, होली, दीपावली, नवरात्रि, एकादशी, पूर्णिमा और शुभ मुहूर्त।`
      : `Detailed Hindu Calendar ${year} with all 12 months. Accurate dates for Maha Shivratri, Holi, Diwali, Navratri, Ekadashis, Purnima, Amavasya, and Shubh Muhurat.`,
    path: `${PATHS.calendar}/${year}`,
    keywords: isHi
      ? [
          `हिन्दू कैलेंडर ${year}`,
          `त्यौहार सूची ${year}`,
          `एकादशी व्रत ${year}`,
          `दीपावली ${year} तारीख`,
          `होली ${year} तारीख`,
          `पंचांग ${year}`,
        ]
      : [
          `hindu calendar ${year}`,
          `festivals ${year}`,
          `hindu holidays ${year}`,
          `ekadashi list ${year}`,
          `panchang ${year}`,
          `diwali ${year} date`,
          `holi ${year} date`,
          `navratri ${year} dates`,
        ],
  });
}

const YEAR_FAQS_EN = [
  {
    question: "How are Hindu festival dates determined every year?",
    answer:
      "Hindu festival dates are calculated based on the lunar calendar (Tithi) and solar transit (Sankranti). Because a lunar year has approximately 354 days compared to the 365 days of the solar Gregorian calendar, festival dates shift by 10 to 11 days each year on the Gregorian calendar, and are harmonized every 3 years with Adhik Maas (leap month).",
  },
  {
    question: "What is Adhik Maas (Mala Maas)?",
    answer:
      "Adhik Maas is an extra lunar month added to the Hindu calendar approximately every 32.5 months to align the lunar year with the solar agricultural cycle. It is considered extraordinarily sacred for Lord Vishnu worship and Purushottam Mahatmya recitation.",
  },
];

const YEAR_FAQS_HI = [
  {
    question: "प्रत्येक वर्ष हिन्दू त्यौहारों की तिथियाँ कैसे निर्धारित होती हैं?",
    answer:
      "हिन्दू त्यौहारों की तिथियाँ चंद्रमा की कलाओं (तिथि) और सूर्य के राशि परिवर्तन (संक्रांति) पर आधारित होती हैं। चंद्र वर्ष में 354 दिन होते हैं जो सौर वर्ष (365 दिन) से 11 दिन कम होते हैं। इसी अंतर को संतुलित करने के लिए हर 3 वर्ष में एक अधिक मास (मलमास) जोड़ा जाता है।",
  },
  {
    question: "अधिक मास (पुरुषोत्तम मास) क्या होता है?",
    answer:
      "सूर्य संक्रांति रहित चंद्र मास को अधिक मास या पुरुषोत्तम मास कहा जाता है। यह लगभग हर 32.5 महीने में आता है। इस पावन मास में भगवान श्री हरि विष्णु की पूजा, गीता पाठ एवं दान का अनंत गुना फल प्राप्त होता है।",
  },
];

export default async function YearCalendarPage({ params, searchParams }: Props) {
  const { year } = await params;
  const yearNum = Number(year);
  if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) notFound();

  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const sParams = await searchParams;
  const initialMonth = sParams.month ? Number(sParams.month) : 1;
  const faqs = isHi ? YEAR_FAQS_HI : YEAR_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi ? `हिन्दू कैलेंडर ${year}` : `Hindu Calendar ${year}`,
          description: isHi
            ? `${year} का सम्पूर्ण वार्षिक हिन्दू कैलेंडर`
            : `Complete annual Hindu Calendar for the year ${year} with monthly Tithi, festivals, and Panchang calculations.`,
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <PageHero
        title={isHi ? `हिन्दू कैलेंडर ${year}` : `Hindu Calendar ${year}`}
        subtitle={
          isHi
            ? `${year} का सम्पूर्ण वार्षिक हिन्दू कैलेंडर। सभी 12 महीनों की तिथियाँ, एकादशी, पूर्णिमा, अमावस्या और त्यौहार देखें।`
            : `Complete Hindu Calendar for the year ${year}. View all 12 months with tithi details, Ekadashi, Purnima, Amavasya, and auspicious festival timings.`
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "हिन्दू कैलेंडर" : "Hindu Calendar", PATHS.calendar],
          [`${isHi ? "वर्ष" : "Year"} ${year}`, `${PATHS.calendar}/${year}`]
        )}
      />

      <CalendarView
        initialYear={yearNum}
        initialMonth={initialMonth}
        initialCityId={sParams.city}
        initialSelectedDate={sParams.date}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <FaqList
          faqs={faqs}
          title={
            isHi
              ? `हिन्दू कैलेंडर ${year} से जुड़े प्रश्नोत्तर`
              : `Frequently Asked Questions for Hindu Calendar ${year}`
          }
        />
      </div>
    </div>
  );
}
