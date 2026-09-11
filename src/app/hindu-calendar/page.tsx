import type { Metadata } from "next";
import { Printer, Sparkles } from "lucide-react";
import { CalendarView } from "@/components/calendar/CalendarView";
import { LocaleLink } from "@/components/i18n/LocaleLink";
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
  const isHi = locale === "hi";
  const currentYear = new Date().getFullYear();

  return localizedMetadata({
    title: isHi
      ? `हिन्दू कैलेंडर ${currentYear} — दैनिक पंचांग, आज की तिथि, व्रत एवं त्यौहार`
      : `Hindu Calendar ${currentYear} — Daily Panchang, Tithi, Festivals & Vrat`,
    description: isHi
      ? `${currentYear} का सम्पूर्ण हिन्दू कैलेंडर और वैदिक पंचांग। सटीक तिथि, नक्षत्र, शुभ मुहूर्त, राहु काल, एकादशी, पूर्णिमा, अमावस्या एवं प्रमुख हिन्दू त्यौहार देखें।`
      : `Complete Hindu Calendar & Vedic Panchang for ${currentYear}. Get accurate Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, Ekadashi, Purnima, and Hindu festivals with city-wise timings.`,
    path: PATHS.calendar,
    keywords: isHi
      ? [
          "हिन्दू कैलेंडर 2026",
          "आज का पंचांग",
          "आज की तिथि",
          "एकादशी व्रत 2026",
          "पूर्णिमा व्रत",
          "अमावस्या",
          "शुभ मुहूर्त",
          "राहु काल समय",
        ]
      : [
          "hindu calendar 2026",
          "panchang today",
          "aaj ka panchang",
          "hindu festivals 2026",
          "ekadashi dates 2026",
          "purnima dates",
          "amavasya dates",
          "shubh muhurat",
          "rahu kaal timing",
          "tithi today",
        ],
  });
}

const CALENDAR_FAQS_EN = [
  {
    question: "How does the Hindu Lunar Calendar (Panchang) work?",
    answer:
      "The Hindu calendar is a lunisolar calendar based on the movements of both the Sun and the Moon. It consists of 5 core astronomical limbs (Pancha-Anga): Tithi (lunar day), Nakshatra (lunar mansion), Yoga (soli-lunar sum), Karana (half tithi), and Vara (weekday).",
  },
  {
    question: "Why do Tithi timings differ across different cities?",
    answer:
      "While the Moon-Sun elongation angle is universal at any instant, local Panchang elements like Sunrise (Surya Udaya) vary by city latitude and longitude. Many Hindu fasts and observances depend on the Tithi prevailing at local Sunrise (Udaya Tithi).",
  },
  {
    question: "What is the difference between Purnimanta and Amanta calendars?",
    answer:
      "In the Purnimanta calendar (followed predominantly in North India), the lunar month ends on the Full Moon (Purnima). In the Amanta calendar (followed in Maharashtra, Gujarat, South India), the month ends on the New Moon (Amavasya). The fortnight phases (Shukla and Krishna Paksha) remain identical.",
  },
  {
    question: "Which times are considered most auspicious for puja and new starts?",
    answer:
      "Brahma Muhurat (approx. 96 to 48 minutes before sunrise), Abhijit Muhurat (midday, except Wednesdays), Godhuli Muhurat (twilight), and Amrit Kaal are considered exceptionally auspicious (Shubh Muhurat) for sadhana, travel, and new beginnings.",
  },
];

const CALENDAR_FAQS_HI = [
  {
    question: "हिन्दू चंद्र कैलेंडर (पंचांग) कैसे कार्य करता है?",
    answer:
      "हिन्दू कैलेंडर सूर्य और चंद्रमा दोनों की खगोलीय गतियों पर आधारित एक चंद्र-सौर (लूनिसोलर) प्रणाली है। इसमें पांच मुख्य अंग होते हैं: तिथि, नक्षत्र, योग, करण और वार। इन्हीं के आधार पर शुभ-अशुभ मुहूर्त और पर्व निर्धारित होते हैं।",
  },
  {
    question: "विभिन्न शहरों में तिथि का समय क्यों बदल जाता है?",
    answer:
      "यद्यपि चंद्रमा और सूर्य का कोणीय अंतर पूरे विश्व में एक ही समय पर बदलता है, परन्तु स्थानीय सूर्योदय का समय प्रत्येक नगर के अक्षांश व देशांतर के अनुसार भिन्न होता है। अधिकांश हिन्दू व्रत एवं पर्व उदयातिथि (सूर्योदय के समय उपस्थित तिथि) के अनुसार मान्य होते हैं।",
  },
  {
    question: "पूर्णिमान्त और अमान्त पंचांग में क्या अंतर है?",
    answer:
      "उत्तर भारत में पूर्णिमान्त मास चलता है जहाँ माह का समापन पूर्णिमा को होता है। वहीं महाराष्ट्र, गुजरात और दक्षिण भारत में अमान्त मास चलता है जहाँ माह का समापन अमावस्या को होता है। शुक्ल व कृष्ण पक्ष की तिथियाँ दोनों में समान रहती हैं।",
  },
  {
    question: "पूजा और नए कार्यों के लिए कौन से मुहूर्त सर्वश्रेष्ठ माने जाते हैं?",
    answer:
      "ब्रह्म मुहूर्त (सूर्योदय से 96 से 48 मिनट पूर्व), अभिजित मुहूर्त (दोपहर, बुधवार को छोड़कर), गोधूलि मुहूर्त और अमृत काल को किसी भी शुभ कार्य, पूजा-अर्चना एवं यात्रा के लिए अत्यंत फलदायी माना गया है।",
  },
];

export default async function HinduCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; year?: string; month?: string; date?: string }>;
}) {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const params = await searchParams;
  const initialYear = params.year ? Number(params.year) : undefined;
  const initialMonth = params.month ? Number(params.month) : undefined;

  const currentYear = new Date().getFullYear();
  const displayYear = initialYear || currentYear;
  const faqs = isHi ? CALENDAR_FAQS_HI : CALENDAR_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi
            ? `हिन्दू कैलेंडर ${displayYear} एवं दैनिक पंचांग`
            : `Hindu Calendar ${displayYear} & Daily Panchang`,
          description: isHi
            ? "सटीक तिथि, नक्षत्र, शुभ मुहूर्त, राहु काल, एकादशी और हिन्दू त्यौहारों के साथ दैनिक पंचांग।"
            : "Production Hindu Calendar and Vedic Panchang with Tithi, Nakshatra, Auspicious Muhurats, Ekadashi, and Festivals.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <PageHero
        title={
          isHi
            ? `हिन्दू कैलेंडर ${displayYear} एवं पंचांग`
            : `Hindu Calendar ${displayYear} & Panchang`
        }
        subtitle={
          isHi
            ? "दैनिक तिथि, नक्षत्र, शुभ मुहूर्त, राहु काल, एकादशी, व्रत और प्रमुख हिन्दू त्यौहारों की अपने शहर अनुसार सटीक गणना देखें।"
            : "Explore daily Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, Ekadashi, Vrat, and major Hindu festivals with precise city-specific astronomical calculations."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "हिन्दू कैलेंडर" : "Hindu Calendar", PATHS.calendar]
        )}
      />

      <CalendarView
        initialYear={initialYear}
        initialMonth={initialMonth}
        initialCityId={params.city}
        initialSelectedDate={params.date}
      />

      {/* Printable Wall Calendar Callout Banner */}
      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-saffron/30 bg-gradient-to-r from-[#fff9f2] via-white to-[#fff9f2] p-6 shadow-xs">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-deep">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isHi ? "नया फीचर: दीवार कैलेंडर" : "New: Printable Wall Calendar"}</span>
            </div>
            <h3 className="mt-1.5 font-serif text-xl sm:text-2xl font-bold text-ink">
              {isHi
                ? "घर एवं मंदिर के लिए सनातन पंचांग दीवार कैलेंडर प्रिंट करें"
                : "Printable Sanatan Panchang Wall Calendar (A4 PDF)"}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted max-w-2xl">
              {isHi
                ? "अपने शहर के सूर्योदय-सूर्यास्त, विक्रम संवत्, एकादशी और सम्पूर्ण पर्वों की सूची के साथ उच्च गुणवत्ता वाला A4 दीवार पोस्टर एक क्लिक में प्रिंट करें या PDF डाउनलोड करें।"
                : "Download high-resolution, print-ready A4 Hindu Wall Calendar poster customized with your city's exact sunrise, Tithi, Ekadashi, and festival timings."}
            </p>
          </div>
          <LocaleLink
            href={PATHS.printableCalendar}
            className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-saffron-deep px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#963806] active:scale-95 transition"
          >
            <Printer className="h-4 w-4" />
            <span>{isHi ? "कैलेंडर प्रिंट करें" : "Print Calendar (PDF)"}</span>
          </LocaleLink>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <FaqList
          faqs={faqs}
          title={isHi ? "हिन्दू कैलेंडर से जुड़े महत्वपूर्ण प्रश्नोत्तर (FAQs)" : "Frequently Asked Questions about Hindu Calendar"}
        />
      </div>
    </div>
  );
}
