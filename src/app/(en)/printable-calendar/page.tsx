import type { Metadata } from "next";
import { PrintableCalendarHero } from "@/components/calendar/PrintableCalendarHero";
import { PrintableWallCalendarView } from "@/components/calendar/PrintableWallCalendarView";
import { PrintableCalendarContent } from "@/components/calendar/PrintableCalendarContent";
import { PrintableCalendarFaq } from "@/components/calendar/PrintableCalendarFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const currentYear = new Date().getFullYear();

  return localizedMetadata({
    title: isTe
      ? `హిందూ క్యాలెండర్ ${currentYear} (Print / PDF) — సనాతన పంచాంగం, పండుగలు & ఏకాదశి తేదీలు`
      : isHi
      ? `हिन्दू दीवार कैलेंडर ${currentYear} (Print / PDF) — सनातन पंचांग, व्रत त्यौहार व एकादशी तारीखें`
      : `Printable Hindu Calendar ${currentYear} (PDF / Wall Calendar) — Free Sanatan Panchang Download`,
    description: isTe
      ? `${currentYear} ప్రామాణిక సనాతన హిందూ వాల్ క్యాలెండర్ (PDF). అన్ని 12 నెలల పంచాంగం, తిథి, నక్షత్రం, ఏకాదశి, పౌర్ణమి మరియు ముఖ్యమైన పండుగలు A4 షీట్‌లో ఉచితంగా ప్రింట్ చేయండి లేదా PDF డౌన్‌లోడ్ చేసుకోండి.`
      : isHi
      ? `${currentYear} का प्रामाणिक सनातन दीवार कैलेंडर (Wall Calendar)। किसी भी शहर के लिए 12 महीनों का पंचांग, एकादशी, पूर्णिमा, अमावस्या एवं प्रमुख त्यौहार एक क्लिक में A4 शीट पर प्रिंट करें या PDF डाउनलोड करें। लाला रामस्वरूप व ठाकुर प्रसाद पंचांग अनुरूप।`
      : `Download or print free monthly & annual Hindu Wall Calendar ${currentYear} (Vikram Samvat 2082-2083) in A4 PDF. Complete Sanatan Panchang with Tithi, Nakshatra, Ekadashi, Vrats, and festival markers for any city.`,
    path: PATHS.printableCalendar,
    keywords: isTe
      ? [
          "హిందూ క్యాలెండర్ 2026 pdf డౌన్‌లోడ్",
          "సనాతన పంచాంగం 2026 pdf",
          "తెలుగు క్యాలెండర్ 2026 ప్రింట్",
          "పండుగల క్యాలెండర్ 2026",
          "ఏకాదశి క్యాలెండర్ 2026 pdf",
          "వాల్ క్యాలెండర్ 2026 ప్రింటబుల్",
          "printable hindu calendar 2026 telugu",
        ]
      : isHi
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
      "Simply click the orange 'Print Wall Calendar / PDF' button at the top right. In your browser's print dialog, choose 'Save as PDF' (to download the file) or select your connected printer to print directly on an A4 sheet. The page automatically hides navigation bars, buttons, sidebars, and FAQs to output a clean, beautiful wall poster.",
  },
  {
    question: "What is Vikram Samvat and why does it differ from the Gregorian year?",
    answer:
      "Vikram Samvat was established in 57 BCE by Emperor Vikramaditya of Ujjain to commemorate victory over the Sakas. Because it began 57 years before the common Gregorian era, Vikram Samvat is approximately 56 to 57 years ahead (e.g., 2026 CE corresponds to Vikram Samvat 2082–2083).",
  },
  {
    question: "Are the Tithis and festival timings accurate for my specific city?",
    answer:
      "Yes. Unlike generic mass-printed paper calendars that only calculate for Varanasi or Ujjain, BhaktiVoice calculates Sunrise, Sunset, and the prevailing Udaya Tithi dynamically for your selected city using high-precision astronomical ephemeris algorithms.",
  },
  {
    question: "What do the abbreviations 'Shu' (शु) and 'Kri' (कृ) mean on the calendar?",
    answer:
      "'Shu' stands for Shukla Paksha (the waxing bright lunar fortnight leading to Purnima / Full Moon), while 'Kri' stands for Krishna Paksha (the waning dark lunar fortnight leading to Amavasya / New Moon).",
  },
  {
    question: "Which paper size and print settings work best for home altars and Puja rooms?",
    answer:
      "Standard A4 paper in Landscape orientation works best. For long-lasting altar posters, we recommend using 120–180 GSM matte photo paper or ivory bond cardstock. Ensure 'Background graphics' is turned ON in your print dialog so all festive highlights and colors are preserved.",
  },
  {
    question: "How does BhaktiVoice calculate Udaya Tithi and sunrise times?",
    answer:
      "In the Vedic Drik-Ganita tradition, 'सूर्योदये या तिथिः सा दिनव्यापिनी'—the tithi prevailing at astronomical sunrise governs the entire ritual day. BhaktiVoice calculates topocentric solar coordinates and local horizon refraction for over 100,000 cities worldwide.",
  },
  {
    question: "Can I print calendars for past months or future years?",
    answer:
      "Yes. Use the '<' and '>' arrow controls in the top control bar to navigate to any month or year (e.g., 2025, 2026, 2027). The system calculates the exact lunisolar panchang and festival dates dynamically for any chosen period.",
  },
  {
    question: "How does this printable wall calendar compare to traditional printed panchang brands like Lala Ramswaroop, Thakur Prasad, or Babulal Chaturvedi?",
    answer:
      "Traditional paper calendars provide a single static calculation (usually calibrated only for Varanasi or Jabalpur). BhaktiVoice combines the authentic typography and festival accuracy of classic Sanatan wall calendars with modern dynamic geolocation, providing exact local tithis and sunrise times for your specific town or city.",
  },
];

const FAQS_HI = [
  {
    question: "इस हिन्दू दीवार कैलेंडर को PDF के रूप में कैसे डाउनलोड या प्रिंट करें?",
    answer:
      "शीर्ष पर दिए गए नारंगी 'प्रिंट वॉल कैलेंडर / PDF' बटन पर क्लिक करें। अपने ब्राउज़र के प्रिंट डायलॉग में 'Save as PDF' चुनें या अपने प्रिंटर से A4 आकार पर प्रिंट निकालें। यह पृष्ठ प्रिंटिंग के लिए विशेष रूप से अनुकूलित है जिससे अनावश्यक बटन या मेनू स्वतः छिप जाते हैं।",
  },
  {
    question: "विक्रम संवत् क्या है और यह ईस्वी सन् से आगे क्यों है?",
    answer:
      "विक्रम संवत् की शुरुआत राजा विक्रमादित्य ने 57 ईसा पूर्व (BCE) में की थी। ईस्वी सन् (ग्रेगोरियन कैलेंडर) से 57 वर्ष पूर्व प्रारंभ होने के कारण यह हमेशा 56 से 57 वर्ष आगे चलता है (जैसे वर्ष 2026 में विक्रम संवत् 2082-2083 है)।",
  },
  {
    question: "क्या इस कैलेंडर की तिथियां और सूर्योदय मेरे शहर के अनुसार सही हैं?",
    answer:
      "हाँ, बिल्कुल। बाजार में मिलने वाले सामान्य छपे पंचांग केवल उज्जैन या काशी के समय पर आधारित होते हैं। भक्ति वॉइस आपके द्वारा चुने गए शहर (जैसे दिल्ली, मुंबई, पटना, जयपुर आदि) के सटीक अक्षांश-देशांतर के अनुसार सूर्योदय, सूर्यास्त और उदयातिथि की तात्कालिक गणना करता है।",
  },
  {
    question: "कैलेंडर के बॉक्स में 'शु' और 'कृ' का क्या अर्थ है?",
    answer:
      "'शु' का अर्थ है शुक्ल पक्ष (अमावस्या से पूर्णिमा तक का बढ़ता हुआ उज्ज्वल पखवाड़ा) और 'कृ' का अर्थ है कृष्ण पक्ष (पूर्णिमा से अमावस्या तक का घटता हुआ पखवाड़ा)।",
  },
  {
    question: "पूजा घर व दीवार के लिए कौन-सा कागज़ और प्रिंटर सेटिंग सर्वोत्तम है?",
    answer:
      "लैंडस्केप (Landscape) ओरिएंटेशन में मानक A4 साइज़ सर्वोत्तम है। पूजा घर में धूप व धुएं से सुरक्षा हेतु 120–180 GSM का मैट फोटो पेपर या आइवरी कार्डशीट इस्तेमाल करें। प्रिंट डायलॉग में 'Background graphics' चालू रखें।",
  },
  {
    question: "उदयातिथि और सूर्योदय की गणना कैसे की जाती है?",
    answer:
      "वैदिक सनातन परंपरा में 'सूर्योदये या तिथिः सा दिनव्यापिनी' के अनुसार सूर्योदय कालीन तिथि पूरे दिन मान्य होती है। भक्ति वॉइस आपके शहर के वास्तविक अक्षांश-देशांतर के आधार पर तात्कालिक सूर्योदय व तिथि की गणना करता है।",
  },
  {
    question: "क्या मैं पिछले या आने वाले महीनों और वर्षों का कैलेंडर भी देख और प्रिंट कर सकता हूँ?",
    answer:
      "हाँ। शीर्ष नियंत्रण पट्टी में दिए गए '<' और '>' तीरों का उपयोग करके आप किसी भी वर्ष और महीने का पंचांग कैलेंडर देख और प्रिंट कर सकते हैं।",
  },
  {
    question: "यह डिजिटल वॉल कैलेंडर लाला रामस्वरूप, ठाकुर प्रसाद या बाबूलाल चतुर्वेदी पंचांग से कैसे भिन्न है?",
    answer:
      "पारंपरिक कागजी पंचांग केवल काशी या जबलपुर के समय पर छपते हैं। भक्ति वॉइस पारंपरिक पंचांग की प्रामाणिकता और प्रारूप को बनाए रखते हुए आपके स्थानीय शहर के सटीक सूर्योदय व तिथियों के अनुसार गणना प्रस्तुत करता है।",
  },
];

const PRINT_FAQS_TE = [
  {
    question: "ఈ హిందూ వాల్ క్యాలెండర్‌ను PDF రూపంలో డౌన్‌లోడ్ లేదా ప్రింట్ ఎలా చేయాలి?",
    answer:
      "కుడి ఎగువన ఉన్న 'వాల్ క్యాలెండర్ ప్రింట్ / PDF' బటన్‌పై క్లిక్ చేయండి. మీ బ్రౌజర్ ప్రింట్ డైలాగ్‌లో 'Save as PDF' ఎంచుకోండి లేదా ప్రింటర్‌తో A4 సైజులో ప్రింట్ తీయండి. నావిగేషన్ మెనూలు, బటన్లు ఆటోమేటిక్‌గా దాచబడి కేవలం అందమైన వాల్ క్యాలెండర్ మాత్రమే ప్రింట్ అవుతుంది.",
  },
  {
    question: "ఈ క్యాలెండర్‌లోని తిథులు మరియు సూర్యోదయం నా నగరం ప్రకారం సరిగ్గా ఉంటాయా?",
    answer:
      "అవును, ఖచ్చితంగా. మార్కెట్లో దొరికే సాధారణ కాగితపు క్యాలెండర్లు వారణాసి లేదా ఉజ్జయిని సమయాలకు పరిమితమై ఉంటాయి. భక్తి వాయిస్ మీరు ఎంచుకున్న నగరం యొక్క ఖచ్చితమైన అక్షాంశ, రేఖాంశాల ప్రకారం సూర్యోదయం, సూర్యాస్తమయం మరియు ఉదయ తిథిని గణిస్తుంది.",
  },
  {
    question: "విక్రమ సంవత్సరం అంటే ఏమిటి మరియు ఇది గ్రెగోరియన్ సంవత్సరం కంటే ఎందుకు ముందు ఉంటుంది?",
    answer:
      "విక్రమ శకాన్ని ఉజ్జయిని చక్రవర్తి విక్రమాదిత్యుడు క్రీ.పూ 57 లో ప్రారంభించారు. ఇది గ్రెగోరియన్ క్యాలెండర్ కంటే 57 సంవత్సరాల ముందే ప్రారంభమైనందున ఎల్లప్పుడూ 56 నుండి 57 సంవత్సరాలు ముందుంటుంది (ఉదా. 2026 నాటికి విక్రమ సంవత్సరం 2082–2083).",
  },
  {
    question: "క్యాలెండర్ బాక్స్‌లో 'శు' మరియు 'కృ' అంటే అర్థం ఏమిటి?",
    answer:
      "'శు' అంటే శుక్ల పక్షం (అమావాస్య నుండి పౌర్ణమి వరకు పెరిగే వెన్నెల పక్షం), మరియు 'కృ' అంటే కృష్ణ పక్షం (పౌర్ణమి నుండి అమావాస్య వరకు తగ్గే చీకటి పక్షం).",
  },
  {
    question: "పూజా మందిరం కోసం ఉత్తమమైన ప్రింట్ సెట్టింగ్‌లు ఏమిటి?",
    answer:
      "ల్యాండ్‌స్కేప్ (Landscape) ఓరియంటేషన్‌లో A4 సైజు పేపర్ ఉత్తమమైనది. 120–180 GSM మ్యాట్ పేపర్ లేదా కార్డుషీట్ వాడటం వల్ల దీపం లేదా అగరుబత్తీ పొగ నుండి సురక్షితంగా ఉంటుంది. 'Background graphics' ను ఆన్ చేయడం మర్చిపోవద్దు.",
  },
  {
    question: "ఉదయతిథి ప్రాముఖ్యత ఏమిటి?",
    answer:
      "సనాతన ధర్మ నియమాల ప్రకారం సూర్యోదయ సమయంలో ఉండే తిథి ఆ రోజు మొత్తం పూజలకు, వ్రతాలకు వర్తిస్తుంది. భక్తి వాయిస్ మీ స్థానిక నగర సూర్యోదయ సమయాలను ఖచ్చితంగా గణిస్తుంది.",
  },
  {
    question: "గత లేదా భవిష్యత్ నెలల క్యాలెండర్లను ప్రింట్ చేయవచ్చా?",
    answer:
      "అవును. ఎగువన ఉన్న '<' మరియు '>' బటన్లను ఉపయోగించి ఏ నెల మరియు సంవత్సరానికైనా క్యాలెండర్‌ను తక్షణమే ప్రింట్ చేయవచ్చు.",
  },
  {
    question: "ఈ క్యాలెండర్ సంప్రదాయ పంచాంగాల కంటే ఎలా మెరుగైనది?",
    answer:
      "సాధారణ కాగితపు క్యాలెండర్లు ఒక్క స్థలానికి మాత్రమే లెక్కించబడతాయి. భక్తి వాయిస్ ఖచ్చితమైన ఖగోళ గణనలతో మీ నగరానికి అనుగుణంగా ప్రత్యక్ష తిథులు, నక్షత్రాలు మరియు పండుగల వివరాలను అందిస్తుంది.",
  },
];

export default async function PrintableCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; year?: string; month?: string }>;
}) {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const params = await searchParams;
  const initialYear = params.year ? Number(params.year) : undefined;
  const initialMonth = params.month ? Number(params.month) : undefined;
  const faqs = isTe ? PRINT_FAQS_TE : isHi ? FAQS_HI : FAQS_EN;

  const currentYear = new Date().getFullYear();
  const canonicalUrl = `${SITE.url}${isTe ? "/te" : isHi ? "/hi" : ""}${PATHS.printableCalendar}`;

  return (
    <div className="min-h-screen bg-[#fffdfa]">
      {/* ========================================================= */}
      {/* ADVANCED SEO SCHEMA STRUCTURED DATA (JSON-LD) */}
      {/* ========================================================= */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": canonicalUrl,
          url: canonicalUrl,
          name: isTe
            ? `హిందూ క్యాలెండర్ ${currentYear} (Print / PDF) — సనాతన పంచాంగం`
            : isHi
            ? `हिन्दू दीवार कैलेंडर ${currentYear} (Print / PDF) — सनातन पंचांग`
            : `Printable Hindu Wall Calendar ${currentYear} — Sanatan Panchang PDF`,
          description: isTe
            ? "ప్రామాణిక సనాతన హిందూ వాల్ క్యాలెండర్ (PDF). తిథి, నక్షత్రం, ఏకాదశి, పౌర్ణమి మరియు ముఖ్యమైన పండుగలు A4 షీట్‌లో ఉచితంగా ప్రింట్ చేయండి."
            : isHi
            ? "प्रामाणिक सनातन दीवार कैलेंडर किसी भी शहर के लिए एक क्लिक में A4 पर प्रिंट करें या PDF डाउनलोड करें।"
            : "Authentic monthly Sanatan Panchang wall calendar for home altar. Easily print or save as A4 PDF for any city.",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: isTe ? "హోమ్" : isHi ? "होम" : "Home",
                item: `${SITE.url}${isTe ? "/te" : isHi ? "/hi" : "/"}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: isTe ? "ఆధ్యాత్మిక సాధనాలు" : isHi ? "आध्यात्मिक उपकरण" : "Spiritual Tools",
                item: `${SITE.url}${isTe ? "/te" : isHi ? "/hi" : ""}${PATHS.spiritualTools}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: isTe ? "ప్రింట్ క్యాలెండర్" : isHi ? "प्रिंट कैलेंडर" : "Printable Calendar",
              },
            ],
          },
          mainEntity: {
            "@type": "WebApplication",
            name: "BhaktiVoice Printable Hindu Wall Calendar",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
          },
        }}
      />

      {/* FAQ Schema for Google Rich Snippets */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }}
      />

      {/* ========================================================= */}
      {/* CUSTOM PRINT STYLESHEET (@media print) */}
      {/* ========================================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              @page {
                size: A4 landscape;
                margin: 6mm 8mm;
              }
              body {
                background: white !important;
                color: black !important;
                font-family: serif !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              header, footer, nav, .print\\:hidden, #guide-content {
                display: none !important;
              }
              .wall-calendar-printable {
                border: 2px solid #b45309 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                padding: 4mm !important;
                width: 100% !important;
                max-width: 100% !important;
                page-break-inside: avoid !important;
              }
            }
          `,
        }}
      />

      {/* 1. Hero Section (Matching User Mockup) */}
      <PrintableCalendarHero isHi={isHi} isTe={isTe} />

      {/* 2. Main Content Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10 print:p-0 print:m-0 print:max-w-none">
        {/* Interactive Wall Calendar View & Guide Sidebar */}
        <PrintableWallCalendarView
          initialYear={initialYear}
          initialMonth={initialMonth}
          initialCityId={params.city}
        />

        {/* Anti-Thin-Content Comprehensive Educational Guide (SEO Anchor) */}
        <div id="guide-content">
          <PrintableCalendarContent isHi={isHi} isTe={isTe} />
        </div>

        {/* Frequently Asked Questions with Live Search */}
        <PrintableCalendarFaq faqs={faqs} isHi={isHi} isTe={isTe} />
      </main>
    </div>
  );
}
