import type { Metadata } from "next";
import { PrintableWallCalendarView } from "@/components/calendar/PrintableWallCalendarView";
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
      ? `हिन्दू दीवार कैलेंडर ${currentYear} (Print / PDF) — सनातन पंचांग, व्रत त्यौहार व एकादशी तारीखें`
      : `Printable Hindu Calendar ${currentYear} (PDF / Wall Calendar) — Free Sanatan Panchang Download`,
    description: isHi
      ? `${currentYear} का प्रामाणिक सनातन दीवार कैलेंडर (Wall Calendar)। किसी भी शहर के लिए 12 महीनों का पंचांग, एकादशी, पूर्णिमा, अमावस्या एवं प्रमुख त्यौहार एक क्लिक में A4 शीट पर प्रिंट करें या PDF डाउनलोड करें। लाला रामस्वरूप व ठाकुर प्रसाद पंचांग अनुरूप।`
      : `Download or print free monthly & annual Hindu Wall Calendar ${currentYear} (Vikram Samvat 2082-2083) in A4 PDF. Complete Sanatan Panchang with Tithi, Nakshatra, Ekadashi, Vrats, and festival markers for any city.`,
    path: PATHS.printableCalendar,
    keywords: isHi
      ? [
          "हिन्दू दीवार कैलेंडर 2026",
          "सनातन पंचांग 2026 pdf डाउनलोड",
          "लाला रामस्वरूप पंचांग 2026 pdf",
          "ठाकुर प्रसाद पंचांग 2026",
          "हिन्दू कैलेंडर प्रिंट आउट",
          "2026 का हिन्दू कैलेंडर व्रत त्यौहार सहित",
          "एकादशी व्रत कैलेंडर 2026 print",
          "विक्रम संवत 2082 2083 कैलेंडर",
          "मासिक पंचांग कैलेंडर 2026",
          "हिन्दू पंचांग वॉल पोस्टर",
          "बाबूलाल चतुर्वेदी कैलेंडर 2026",
          "hindu calendar 2026 pdf download",
        ]
      : [
          "printable hindu calendar 2026",
          "hindu wall calendar 2026 pdf",
          "hindu calendar 2026 pdf download",
          "sanatan panchang printable 2026",
          "free printable hindu calendar with tithi",
          "hindu calendar 2026 with festivals pdf",
          "monthly hindu calendar for print",
          "lala ramswaroop calendar 2026 pdf download",
          "thakur prasad calendar 2026 pdf",
          "babulal chaturvedi calendar 2026",
          "vikram samvat 2082 calendar printable",
          "ekadashi calendar 2026 printable",
          "hindu festival calendar 2026 a4 print",
          "indian calendar 2026 pdf download",
          "panchang wall calendar",
        ],
  });
}

const FAQS_EN = [
  {
    question: "How do I download or print this Hindu Wall Calendar as a PDF?",
    answer:
      "Simply click the orange 'Print Wall Calendar / PDF' button at the top right. In your browser's print dialog, choose 'Save as PDF' or select your connected printer. The page is specially styled with custom @media print rules to fit onto a standard A4 sheet without navigation bars or menus.",
  },
  {
    question: "Are the Tithis and festival timings accurate for my specific city?",
    answer:
      "Yes. Unlike generic printed paper calendars which only calculate for Varanasi or Ujjain, BhaktiVoice calculates Sunrise, Sunset, and prevailing Udaya Tithi dynamically for your selected city using modern astronomical ephemeris algorithms.",
  },
  {
    question: "What is Vikram Samvat and why does it differ from the Gregorian year?",
    answer:
      "Vikram Samvat was established in 57 BCE by Emperor Vikramaditya of Ujjain to commemorate victory over the Sakas. Because it began 57 years before the common Gregorian era, Vikram Samvat is approximately 56 to 57 years ahead (e.g. 2026 CE corresponds to Vikram Samvat 2082–2083).",
  },
  {
    question: "What do the abbreviations 'Shu' (शु) and 'Kri' (कृ) mean on the calendar?",
    answer:
      "'Shu' stands for Shukla Paksha (the waxing bright lunar fortnight leading to Purnima / Full Moon), while 'Kri' stands for Krishna Paksha (the waning dark lunar fortnight leading to Amavasya / New Moon).",
  },
];

const FAQS_HI = [
  {
    question: "इस हिन्दू दीवार कैलेंडर को PDF के रूप में कैसे डाउनलोड या प्रिंट करें?",
    answer:
      "शीर्ष पर दिए गए 'वॉल कैलेंडर प्रिंट करें / PDF' बटन पर क्लिक करें। अपने ब्राउज़र के प्रिंट डायलॉग में 'Save as PDF' चुनें या अपने प्रिंटर से A4 आकार पर प्रिंट निकालें। यह पृष्ठ प्रिंटिंग के लिए विशेष रूप से अनुकूलित है जिससे अनावश्यक बटन या मेनू स्वतः छिप जाते हैं।",
  },
  {
    question: "क्या इस कैलेंडर की तिथियां और सूर्योदय मेरे शहर के अनुसार सही हैं?",
    answer:
      "हाँ, बिल्कुल। बाजार में मिलने वाले सामान्य छपे पंचांग केवल उज्जैन या काशी के समय पर आधारित होते हैं। भक्ति वॉइस आपके द्वारा चुने गए शहर (जैसे दिल्ली, मुंबई, पटना, जयपुर आदि) के सटीक अक्षांश-देशांतर के अनुसार सूर्योदय, सूर्यास्त और उदयातिथि की तात्कालिक गणना करता है।",
  },
  {
    question: "विक्रम संवत् क्या है और यह ईस्वी सन् से आगे क्यों है?",
    answer:
      "विक्रम संवत् की शुरुआत राजा विक्रमादित्य ने 57 ईसा पूर्व (BCE) में की थी। ईस्वी सन् (ग्रेगोरियन कैलेंडर) से 57 वर्ष पूर्व प्रारंभ होने के कारण यह हमेशा 56 से 57 वर्ष आगे चलता है (जैसे वर्ष 2026 में विक्रम संवत् 2082-2083 है)।",
  },
  {
    question: "कैलेंडर के बॉक्स में 'शु' और 'कृ' का क्या अर्थ है?",
    answer:
      "'शु' का अर्थ है शुक्ल पक्ष (अमावस्या से पूर्णिमा तक का बढ़ता हुआ उज्ज्वल पखवाड़ा) और 'कृ' का अर्थ है कृष्ण पक्ष (पूर्णिमा से अमावस्या तक का घटता हुआ पखवाड़ा)।",
  },
];

export default async function PrintableCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; year?: string; month?: string }>;
}) {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const params = await searchParams;
  const initialYear = params.year ? Number(params.year) : undefined;
  const initialMonth = params.month ? Number(params.month) : undefined;
  const faqs = isHi ? FAQS_HI : FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi
            ? "हिन्दू दीवार कैलेंडर — सनातन पंचांग प्रिंट एवं PDF"
            : "Printable Hindu Wall Calendar & Sanatan Panchang",
          description: isHi
            ? "प्रामाणिक सनातन दीवार कैलेंडर किसी भी शहर के लिए एक क्लिक में प्रिंट करें या PDF डाउनलोड करें।"
            : "Printable and downloadable monthly Hindu wall calendar with accurate Tithis and festivals.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <div className="print:hidden">
        <PageHero
          title={
            isHi
              ? "हिन्दू दीवार कैलेंडर (Print / PDF)"
              : "Printable Hindu Wall Calendar"
          }
          subtitle={
            isHi
              ? "अपने पूजा घर अथवा दीवार के लिए किसी भी नगर का सम्पूर्ण सनातन पंचांग कैलेंडर एक क्लिक में प्रिंट करें अथवा PDF सेव करें।"
              : "Authentic monthly Sanatan Panchang wall calendar poster for your home altar. Easily print or save as A4 PDF for any Indian or global city."
          }
          hub="tithi"
          crumbs={localizedCrumbs(
            t.homeName,
            [t.nav.spiritualTools, PATHS.spiritualTools],
            [isHi ? "प्रिंट कैलेंडर" : "Printable Calendar", PATHS.printableCalendar]
          )}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12 print:p-0 print:m-0 print:max-w-none">
        <PrintableWallCalendarView
          initialYear={initialYear}
          initialMonth={initialMonth}
          initialCityId={params.city}
        />

        <div className="mt-16 mx-auto max-w-4xl print:hidden">
          <FaqList
            faqs={faqs}
            title={
              isHi
                ? "हिन्दू दीवार कैलेंडर से जुड़े मुख्य प्रश्नोत्तर (FAQs)"
                : "Frequently Asked Questions about Printable Hindu Calendar"
            }
          />
        </div>
      </div>
    </div>
  );
}
