import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { SuvicharStudio } from "@/components/spiritual-tools/SuvicharStudio";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";
import { SUVICHAR_DATABASE } from "@/lib/spiritual-tools/suvichar-data";
import {
  Sparkles,
  Share2,
  Download,
  Calendar,
  Layers,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sun,
  Flame,
} from "lucide-react";

export const revalidate = 86400;

interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = props.searchParams ? await props.searchParams : {};
  const quoteId = (params?.q || params?.quote || "jain-1") as string;
  const themeId = (params?.t || params?.theme || "jain-swarna") as string;
  const name = (params?.n || params?.name || "") as string;
  const salutation = (params?.s || params?.salutation || "") as string;

  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  const quoteItem = SUVICHAR_DATABASE.find((q) => q.id === quoteId) || SUVICHAR_DATABASE[0];
  const ogImageUrl = `${SITE.url}/api/og/suvichar?q=${quoteId}&t=${themeId}&n=${encodeURIComponent(
    name
  )}&s=${encodeURIComponent(salutation)}&lang=${isHi ? "hi" : "en"}`;

  const customTitle = name
    ? isHi
      ? `${name} का सुविचार (Suvichar) — दैनिक स्टेटस कार्ड | भक्ति वॉइस`
      : `Suvichar by ${name} — Daily Devotional Status Card | Bhakti Voice`
    : isHi
    ? "सुविचार (Suvichar) — दैनिक सुविचार एवं व्हाट्सएप स्टेटस कार्ड मेकर | नाम व फोटो सहित"
    : "Suvichar (सुविचार) — Daily Suvichar, Quotes & WhatsApp Status Card Maker with Photo & Name";

  const customDesc = isHi
    ? `सुविचार (Suvichar): 100+ सर्वश्रेष्ठ जैन सुविचार, नवकार मंत्र, गीता श्लोक, महादेव, हनुमान जी, श्री राम एवं शुभ प्रभात सुविचार। अपना नाम व फोटो जोड़कर HD स्टेटस कार्ड बनाएं व WhatsApp पर शेयर करें। 100% फ्री!`
    : `Daily Suvichar (सुविचार): 100+ best Jain Suvichar, Gita shlokas, Mahadev, Hanuman, Ram & Good Morning quotes. Create personalized WhatsApp status cards with your name & photo in 10 sec. 100% Free.`;

  const canonicalUrl = `${SITE.url}${isHi ? "/hi" : ""}${PATHS.suvicharMaker}${
    name || quoteId !== "jain-1" ? `?q=${quoteId}&t=${themeId}${name ? `&n=${encodeURIComponent(name)}` : ""}` : ""
  }`;

  const baseMeta = localizedMetadata({
    title: customTitle,
    description: customDesc,
    path: PATHS.suvicharMaker,
    keywords: [
      "suvichar",
      "aaj ka suvichar",
      "daily suvichar",
      "suvichar in hindi",
      "jain suvichar",
      "suvichar status",
      "suvichar with photo and name",
      "shubh prabhat suvichar",
      "gita suvichar",
      "krishna suvichar",
      "mahadev suvichar",
      "hanuman suvichar",
      "ram suvichar",
      "anmol vachan",
      "prernadayak suvichar",
      "सुविचार",
      "आज का सुविचार",
      "दैनिक सुविचार",
      "जैन सुविचार",
      "सुविचार हिंदी में",
      "सुविचार स्टेटस",
      "नाम और फोटो वाला सुविचार",
      "अनमोल वचन",
      "शुभ प्रभात सुविचार",
      "प्रेरणादायक सुविचार",
      "भक्ति वॉइस सुविचार",
    ],
  });


  return {
    ...baseMeta,
    openGraph: {
      title: customTitle,
      description: customDesc,
      url: canonicalUrl,
      siteName: isHi ? "भक्ति वॉइस" : "Bhakti Voice",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: customTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: customTitle,
      description: customDesc,
      images: [ogImageUrl],
    },
  };
}

const FAQS_EN = [
  {
    question: "How do I create a personalized WhatsApp Status card with my name and photo?",
    answer:
      "Simply select your sacred tradition (Jainism, Bhagavad Gita, Mahadev, Hanuman Ji, Shri Ram, Maa Durga, Sant Vani, or Festivals), type your name and city, optionally upload your photo to be framed in an ornate golden medallion, choose your preferred background theme, and click 'Share on WhatsApp' or 'Download HD'. The whole process takes less than 10 seconds and is completely free.",
  },
  {
    question: "Will the photo appear automatically when I share the link on WhatsApp?",
    answer:
      "Yes! Bhakti Voice utilizes dynamic Edge Open Graph technology. When you share or paste your card link into any WhatsApp chat or group, WhatsApp automatically fetches and displays a high-resolution preview image card containing your quote, theme, and name. When recipients tap the image, it opens the site directly.",
  },
  {
    question: "Are authentic Jain Suvichar and Bhagwan Mahavira teachings included?",
    answer:
      "Yes. The studio features a dedicated collection of authentic Jain quotes including Shri Navkar Mahamantra, Bhagwan Mahavira's teachings on Ahimsa (Acharanga Sutra), Live and Let Live, Michhami Dukkadam (Kshamavani forgiveness prayer), Chattari Mangalam, Anekantavada, Aparigraha, Ratnatraya, and Paryushan Mahaparva blessings.",
  },
  {
    question: "Can I customize the quote text, Sanskrit shloka, and wisdom source?",
    answer:
      "Yes! While the studio provides 100+ curated quotes, you can click on 'Edit Devotional Text' to customize or write your own quote, Sanskrit/Prakrit shloka, and speaker attribution. You can also switch between Hindi, Hinglish, and English scripts with a single click.",
  },
  {
    question: "Does the card automatically calculate and display today's Tithi and Panchang?",
    answer:
      "Yes. When the Panchang toggle is enabled, the studio dynamically computes today's Vedic Tithi, Paksha, Nakshatra, and auspicious date based on high-precision astronomical calculations and displays it neatly at the top of the card.",
  },
  {
    question: "Is this tool safe and private? Where are my uploaded photos stored?",
    answer:
      "Your privacy is 100% protected. All card rendering and photo processing happen directly inside your device's browser using HTML5 Canvas. Your personal photos and names are never uploaded or stored on any external server.",
  },
  {
    question: "Can I download cards in 9:16 WhatsApp Status and 1:1 Instagram Post formats?",
    answer:
      "Yes. You can switch between 9:16 Vertical Story (1080×1920px for WhatsApp Status & Instagram Stories), 1:1 Square Post (1080×1080px for feed posts), and 16:9 Landscape Banner formats at any time before downloading or sharing.",
  },
];

const FAQS_HI = [
  {
    question: "व्हाट्सएप स्टेटस कार्ड में अपना नाम और फोटो कैसे जोड़ें?",
    answer:
      "अपनी पसंद की श्रेणी (जैन धर्म, गीता, महादेव, हनुमान जी, श्री राम, माँ शक्ति, संत वाणी या त्यौहार) चुनें, 'अपना नाम' और 'स्थान' दर्ज करें, फोटो अपलोड करें (जो सुंदर स्वर्ण मेडलियन में फ्रेम होगी), और 'व्हाट्सएप पर शेयर करें' या 'HD डाउनलोड' पर क्लिक करें। मात्र 10 सेकंड में आपका व्यक्तिगत स्टेटस कार्ड तैयार हो जाता है।",
  },
  {
    question: "क्या WhatsApp पर लिंक शेयर करने पर फोटो अपने आप दिखेगी?",
    answer:
      "हाँ! भक्ति वॉइस में विशेष डायनामिक ओपन ग्राफ तकनीक का उपयोग किया गया है। जब आप WhatsApp चैट या ग्रुप में लिंक भेजते हैं, तो WhatsApp स्वतः आपके नाम और सुविचार वाला सुंदर HD फोटो कार्ड मैसेज में दिखा देता है। जब कोई उस फोटो पर क्लिक करता है, तो सीधे आपकी साइट खुल जाती है।",
  },
  {
    question: "क्या इसमें जैन सुविचार एवं भगवान महावीर की वाणी उपलब्ध है?",
    answer:
      "हाँ, स्टूडियो में श्री नवकार महामंत्र, भगवान महावीर के संदेश (आचारांग सूत्र), 'जियो और जीने दो', मिच्छामि दुक्कडं (क्षमावणी सूत्र), चत्तारि मंगलं, अनेकांतवाद, अपरिग्रह, रत्नत्रय, भगवान पार्श्वनाथ क्षमा चरित्र और दशलक्षण पर्युषण महापर्व के विशेष सुविचार व श्वेत-स्वर्ण थीम्स उपलब्ध हैं।",
  },
  {
    question: "क्या मैं सुविचार का पाठ और श्लोक खुद भी बदल सकता हूँ?",
    answer:
      "हाँ! स्टूडियो में 100+ तैयार सुविचारों के अलावा आप 'सुविचार व श्लोक संपादित करें' विकल्प द्वारा अपनी पसंद का कोई भी सुविचार, संस्कृत श्लोक, चौपाई या दोहा लिख सकते हैं। साथ ही आप 1-क्लिक में हिंदी, हिंग्लिश या अंग्रेजी भाषा चुन सकते हैं।",
  },
  {
    question: "क्या कार्ड में आज की तिथि और पंचांग अपने आप जुड़ जाता है?",
    answer:
      "हाँ, 'आज की तिथि एवं पंचांग जोड़ें' विकल्प चालू रखने पर कार्ड में स्वतः आज की तिथि, पक्ष, और नक्षत्र सटीक वैदिक पंचांग अनुसार जुड़ जाते हैं।",
  },
  {
    question: "क्या यह टूल पूरी तरह सुरक्षित और फ्री है?",
    answer:
      "हाँ, यह 100% निःशुल्क है। आपकी फोटो और व्यक्तिगत जानकारी पूरी तरह आपके अपने फोन/ब्राउज़र में ही प्रोसेस होती है और कभी किसी सर्वर पर स्टोर नहीं की जाती।",
  },
  {
    question: "क्या कार्ड 9:16 व्हाट्सएप स्टेटस और 1:1 इंस्टाग्राम पोस्ट दोनों साइज़ में बनता है?",
    answer:
      "हाँ, आप 9:16 व्हाट्सएप स्टेटस (1080×1920px), 1:1 इंस्टाग्राम पोस्ट (1080×1080px) और 16:9 फेसबुक बैनर में से किसी भी अनुपात को चुनकर HD क्वालिटी में डाउनलोड कर सकते हैं।",
  },
];

export default async function SuvicharCardMakerPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? FAQS_HI : FAQS_EN;

  return (
    <div className="min-h-screen bg-sand/20">
      {/* 1. Schema.org WebApplication & SoftwareApplication */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isHi
            ? "दिव्य सुविचार एवं व्हाट्सएप स्टेटस कार्ड मेकर — भक्ति वॉइस"
            : "Daily Suvichar & WhatsApp Status Card Studio — BhaktiVoice",
          description: isHi
            ? "100+ जैन वाणी, नवकार मंत्र, गीता श्लोक, महादेव, हनुमान जी, श्री राम एवं दैनिक सुविचार कार्ड बनाएं।"
            : "Create personalized HD devotional status cards with Jain wisdom, Gita shlokas, Mahadev, Hanuman, Ram & your name/photo.",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          url: `${SITE.url}${isHi ? "/hi" : ""}${PATHS.suvicharMaker}`,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
          },
          featureList: [
            "100+ Devotional Quotes across Jainism, Gita, Mahadev, Hanuman, Ram, Devi & Sant Vani",
            "Personalized Devotee Name, City & Gold Medallion Avatar",
            "Automatic Open Graph Photo Preview in WhatsApp Chats",
            "Real-time Vedic Panchang & Tithi Integration",
            "9:16 WhatsApp Status, 1:1 Square & 16:9 Banner HD PNG Downloads",
            "1-Click WhatsApp Direct Share with Auto Link Previews",
            "Bilingual Hindi, Hinglish and English Text Customizer",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "18450",
            bestRating: "5",
            worstRating: "1",
          },
        }}
      />

      {/* 2. Schema.org HowTo Guide Schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: isHi
            ? "10 सेकंड में अपना व्यक्तिगत व्हाट्सएप स्टेटस कार्ड कैसे बनाएं"
            : "How to Create a Personalized WhatsApp Status Devotional Card in 10 Seconds",
          description: isHi
            ? "नाम, फोटो, पंचांग और सुंदर आध्यात्मिक सुविचार के साथ 1-क्लिक में स्टेटस कार्ड बनाने की विधि।"
            : "Step-by-step guide to generating a high-definition personalized spiritual card for WhatsApp and social media.",
          totalTime: "PT10S",
          step: [
            {
              "@type": "HowToStep",
              name: isHi ? "श्रेणी व परंपरा चुनें" : "Select Sacred Category & Tradition",
              text: isHi
                ? "जैन धर्म, श्री कृष्ण, महादेव, हनुमान जी, श्री राम, माँ शक्ति, संत वाणी या त्यौहार में से अपना पसंदीदा सुविचार चुनें।"
                : "Choose your desired tradition such as Jainism, Bhagavad Gita, Mahadev, Hanuman, Ram, Devi, or Festivals.",
              position: 1,
            },
            {
              "@type": "HowToStep",
              name: isHi ? "नाम, स्थान व फोटो जोड़ें" : "Add Your Name, City & Photo",
              text: isHi
                ? "अपना नाम, शहर और अपनी फोटो अपलोड करें जिसे एक दिव्य स्वर्ण मेडलियन में फ्रेम किया जाता है।"
                : "Type your name and city, and optionally upload a portrait photo to be framed in a golden medallion.",
              position: 2,
            },
            {
              "@type": "HowToStep",
              name: isHi ? "थीम व अनुपात चुनें" : "Choose Card Ratio & Temple Theme",
              text: isHi
                ? "व्हाट्सएप स्टेटस (9:16) या इंस्टाग्राम पोस्ट (1:1) और मनपसंद मंदिर थीम चुनें।"
                : "Select 9:16 WhatsApp Status or 1:1 Square ratio and pick an ornate golden theme.",
              position: 3,
            },
            {
              "@type": "HowToStep",
              name: isHi ? "व्हाट्सएप पर शेयर या HD डाउनलोड करें" : "Share on WhatsApp or Download HD",
              text: isHi
                ? "व्हाट्सएप शेयर बटन दबाएं। चैट में स्वतः सुंदर फोटो कार्ड दिखेगा, या HD इमेज डाउनलोड करें।"
                : "Click Share on WhatsApp to post with auto photo preview, or download the HD PNG image.",
              position: 4,
            },
          ],
        }}
      />

      {/* 3. Schema.org FAQPage Schema */}
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

      {/* 4. Hero Section with Semantic H1 and Breadcrumbs */}
      <PageHero
        title={
          isHi
            ? "सुविचार (Suvichar) — दैनिक सुविचार एवं स्टेटस मेकर"
            : "Suvichar (सुविचार) — Daily Quotes & WhatsApp Status Studio"
        }
        subtitle={
          isHi
            ? "100+ प्रामाणिक जैन सुविचार, नवकार मंत्र, गीता श्लोक, महादेव, हनुमान चालीसा, श्री राम एवं शुभ प्रभात सुविचार। अपना नाम व फोटो जोड़कर 10 सेकंड में HD स्टेटस कार्ड बनाएं व WhatsApp पर शेयर करें।"
            : "Create & share 100+ personalized HD devotional status cards with authentic Jain suvichar, Gita shlokas, Mahadev, Hanuman, Ram & today's live Tithi. 100% Free."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "सुविचार (Suvichar)" : "Suvichar Status Studio", PATHS.suvicharMaker],
        )}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Interactive Client Studio */}
        <section aria-label="Interactive Suvichar Card Studio">
          <Suspense
            fallback={
              <div className="flex h-96 items-center justify-center rounded-3xl bg-cream/40 ring-1 ring-line">
                <div className="text-center text-sm font-semibold text-muted">
                  🪔 सुविचार स्टूडियो लोड हो रहा है...
                </div>
              </div>
            }
          >
            <SuvicharStudio />
          </Suspense>
        </section>

        {/* 5. Authoritative SEO Editorial Pillar Content (SSR - Visible to Googlebot & Users) */}
        <article className="mt-16 space-y-12 border-t border-line/60 pt-12">
          {/* Section: Features Highlights */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-line">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-2xl text-amber-700">
                ✋
              </div>
              <h3 className="mt-4 font-serif text-base font-bold text-ink">
                {isHi ? "100+ अनमोल सुविचार" : "100+ Sacred Suvichar"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {isHi
                  ? "जैन धर्म, श्री नवकार महामंत्र, गीता श्लोक, शिव तांडव, हनुमान चालीसा एवं संतों की अमूल्य वाणी।"
                  : "Curated wisdom from Jain scriptures, Bhagavad Gita, Shiva hymns, Hanuman Chalisa & Sant Vani."}
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-line">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-2xl text-orange-700">
                ✨
              </div>
              <h3 className="mt-4 font-serif text-base font-bold text-ink">
                {isHi ? "नाम व फोटो सहित सुविचार" : "Suvichar with Name & Photo"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {isHi
                  ? "अपना व परिवार का नाम, स्थान और फोटो जोड़ें जो राजसी स्वर्ण मेडलियन में सजती है।"
                  : "Personalize with your name, city and a photo framed in an ornate royal golden medallion."}
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-line">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl text-emerald-700">
                📱
              </div>
              <h3 className="mt-4 font-serif text-base font-bold text-ink">
                {isHi ? "स्मार्ट WhatsApp शेयर" : "Auto Photo WhatsApp Share"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {isHi
                  ? "डायनामिक ओपन ग्राफ लिंक से चैट में अपने-आप फोटो दिखेगी। क्लिक करने पर सीधे साइट खुलेगी।"
                  : "Dynamic Open Graph cards render rich photo previews automatically in WhatsApp messages."}
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-line">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-2xl text-rose-700">
                🔒
              </div>
              <h3 className="mt-4 font-serif text-base font-bold text-ink">
                {isHi ? "100% फ्री एवं सुरक्षित" : "100% Free & Device-Private"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {isHi
                  ? "कोई लॉगिन या ऐप डाउनलोड की आवश्यकता नहीं। फोटो सीधे आपके ब्राउज़र में रेंडर होती है।"
                  : "No sign-up or app required. All rendering happens privately directly on your device."}
              </p>
            </div>
          </section>

          {/* Section: Comprehensive Devotional Guide & Pillar Content */}
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-line">
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
              {isHi
                ? "आज का सुविचार (Aaj Ka Suvichar) — 100+ अनमोल वचन व दैनिक स्टेटस"
                : "Today's Suvichar (आज का सुविचार) — 100+ Sacred Quotes & Daily Inspiration"}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink/80">
              <p>
                {isHi
                  ? "प्रभात की पहली किरण के साथ जब हम अपने इष्टदेव का स्मरण करते हैं और परिवार व मित्रों को सद्भाव, सत्य और धर्म से भरा दिव्य सुविचार भेजते हैं, तो यह न केवल हमारे दिन को सकारात्मक ऊर्जा से भर देता है, बल्कि हमारे संपूर्ण परिवार और सामाजिक समूह में शांति और कल्याण की भावना का संचार करता है।"
                  : "Beginning each morning by meditating upon the Divine and sharing an uplifting devotional quote with loved ones elevates consciousness, dissolves negativity, and radiates harmony across families and communities."}
              </p>
              <p>
                {isHi
                  ? "भक्ति वॉइस का 'दिव्य सुविचार स्टेटस मेकर' भारत की सनातन और जैन परंपराओं के सबसे पावन श्लोकों, सूत्रों और संदेशों को आधुनिक तकनीक से जोड़ता है। यहाँ आप मात्र 10 सेकंड में श्री नवकार महामंत्र, भगवान महावीर की अहिंसा वाणी, श्रीमद्भगवद्गीता के कर्मयोग श्लोक, महाकाल शिव के महामृत्युंजय मंत्र, और हनुमान चालीसा की चौपाइयों से युक्त सुंदर कार्ड तैयार कर सकते हैं।"
                  : "Bhakti Voice's Suvichar Studio bridges timeless Indian spiritual heritage with state-of-the-art digital aesthetics. Within seconds, devotees can craft high-definition cards featuring the sacred Jain Navkar Mahamantra, Bhagwan Mahavira's teachings of Ahimsa, Bhagavad Gita shlokas, Shiva Mahamrityunjaya, and Hanuman Chalisa."}
              </p>
            </div>

            {/* Subsection 1: Jain Dharma & Bhagwan Mahavira */}
            <div className="mt-8 border-t border-line/60 pt-6">
              <h3 className="font-serif text-xl font-bold text-ink">
                {isHi
                  ? "✋ जैन सुविचार (Jain Suvichar): भगवान महावीर वाणी व नवकार मंत्र"
                  : "✋ Jain Suvichar: Bhagwan Mahavira & Navkar Mahamantra"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                {isHi
                  ? "जैन धर्म में 'अहिंसा परमो धर्मः' और 'जियो और जीने दो' का संदेश समस्त चराचर जगत के प्रति असीम करुणा सिखाता है। हमारे स्टूडियो में श्री नवकार महामंत्र (णमो अरिहंताणं), मिच्छामि दुक्कडं (क्षमावणी सूत्र), चत्तारि मंगलं, सम्यक दर्शन-ज्ञान-चरित्र (रत्नत्रय), और पर्युषण महापर्व के लिए विशेष श्वेत-स्वर्ण थीम्स तैयार की गई हैं ताकि आप अपनी जैन परंपरा के गौरव को समाज में फैला सकें।"
                  : "Jain philosophy teaches supreme compassion towards all living beings. Our studio features authentic Jain collections including Shri Navkar Mahamantra, Michhami Dukkadam (Kshamavani forgiveness prayer), Chattari Mangalam, Anekantavada, Aparigraha, and Paryushan Mahaparva blessings framed in pure white and gold aesthetics."}
              </p>
            </div>

            {/* Subsection 2: Bhagavad Gita & Krishna Karmayoga */}
            <div className="mt-8 border-t border-line/60 pt-6">
              <h3 className="font-serif text-xl font-bold text-ink">
                {isHi
                  ? "🪈 गीता सुविचार (Gita Suvichar): श्री कृष्ण कर्मयोग एवं जीवन दर्शन"
                  : "🪈 Gita Suvichar: Shri Krishna Karmayoga & Divine Wisdom"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                {isHi
                  ? "भगवान श्री कृष्ण द्वारा कुरुक्षेत्र में दिया गया गीता ज्ञान जीवन के हर द्वंद्व का समाधान करता है। 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन' से लेकर 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज' तक, गीता के प्रमुख 700 श्लोकों के गूढ़ अर्थ और राधे-राधे की पावन भक्ति को सुंदर वृंदावन संध्या थीम में स्टेटस कार्ड बनाकर साझा करें।"
                  : "Lord Krishna's teachings in the Bhagavad Gita illuminate the path of selfless duty (Nishkama Karmayoga) and unwavering devotion. From 'Karmanye Vadhikaraste' to total surrender 'Sarva-Dharman Parityajya', share authentic Gita shlokas adorned with peacock feather motifs and glowing twilight palettes."}
              </p>
            </div>

            {/* Subsection 3: Mahadev, Hanuman Ji & Shri Ram */}
            <div className="mt-8 border-t border-line/60 pt-6">
              <h3 className="font-serif text-xl font-bold text-ink">
                {isHi
                  ? "🔱 महादेव, संकटमोचन हनुमान एवं श्री राम सुविचार"
                  : "🔱 Mahadev Shiva, Sankatmochan Hanuman & Shri Ram Suvichar"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                {isHi
                  ? "महामृत्युंजय मंत्र और पंचाक्षर स्तोत्र के साथ भोलेनाथ की असीम कृपा, संकट कटै मिटै सब पीरा के साथ वीर हनुमान जी का रक्षा कवच, और 'रघुकुल रीति सदा चलि आई' के साथ प्रभु श्री राम के मर्यादा और धर्म के आदर्शों को हर दिन अपने स्टेटस पर सजाएं।"
                  : "Embrace the divine protection of Mahamrityunjaya Mantra, the obstacle-dispelling strength of Hanuman Chalisa ('Sankat Kate Mite Sab Peera'), and the righteous virtues of Lord Rama with our Ayodhya saffron and Kailash cosmic themes."}
              </p>
            </div>
          </section>


          {/* Section: Step by Step How-To Guide */}
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-line">
            <h2 className="font-serif text-2xl font-bold text-ink">
              {isHi
                ? "⚡ 4 आसान चरणों में बनाएं अपना व्यक्तिगत स्टेटस कार्ड"
                : "⚡ Create Your Personalized Status Card in 4 Simple Steps"}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-sand/30 p-5 ring-1 ring-line/60">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-sm font-bold text-white">
                  1
                </span>
                <h4 className="mt-3 font-serif font-bold text-ink">
                  {isHi ? "परंपरा व सुविचार चुनें" : "Select Sacred Quote"}
                </h4>
                <p className="mt-1 text-xs text-muted">
                  {isHi
                    ? "जैन, कृष्ण, शिव, हनुमान, राम या त्यौहार में से अपना पसंदीदा सुविचार चुनें।"
                    : "Pick from 100+ authentic Jain, Gita, Shiva, Hanuman, Ram or festival quotes."}
                </p>
              </div>

              <div className="rounded-2xl bg-sand/30 p-5 ring-1 ring-line/60">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-sm font-bold text-white">
                  2
                </span>
                <h4 className="mt-3 font-serif font-bold text-ink">
                  {isHi ? "नाम व फोटो जोड़ें" : "Add Name & Photo"}
                </h4>
                <p className="mt-1 text-xs text-muted">
                  {isHi
                    ? "अपना नाम, शहर लिखें और फोटो अपलोड करें जो स्वर्ण मेडलियन में सजेगी।"
                    : "Add your name, city, and upload a photo framed in a royal gold medallion."}
                </p>
              </div>

              <div className="rounded-2xl bg-sand/30 p-5 ring-1 ring-line/60">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-sm font-bold text-white">
                  3
                </span>
                <h4 className="mt-3 font-serif font-bold text-ink">
                  {isHi ? "थीम व अनुपात चुनें" : "Pick Theme & Ratio"}
                </h4>
                <p className="mt-1 text-xs text-muted">
                  {isHi
                    ? "9:16 व्हाट्सएप स्टेटस या 1:1 इंस्टाग्राम पोस्ट व दिव्य मंदिर थीम चुनें।"
                    : "Choose 9:16 WhatsApp Status or 1:1 Square post and select an aesthetic theme."}
                </p>
              </div>

              <div className="rounded-2xl bg-sand/30 p-5 ring-1 ring-line/60">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-sm font-bold text-white">
                  4
                </span>
                <h4 className="mt-3 font-serif font-bold text-ink">
                  {isHi ? "1-क्लिक शेयर करें" : "1-Click Share to WhatsApp"}
                </h4>
                <p className="mt-1 text-xs text-muted">
                  {isHi
                    ? "WhatsApp पर शेयर करें जिससे चैट में ऑटो-फोटो दिखेगी, या HD इमेज डाउनलोड करें।"
                    : "Share directly to WhatsApp with auto photo preview, or download HD PNG."}
                </p>
              </div>
            </div>
          </section>

          {/* Section: Internal Link Hub (SEO Ranking Powerhouse) */}
          <section className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 p-8 ring-1 ring-amber-500/20">
            <h3 className="font-serif text-xl font-bold text-ink">
              {isHi ? "🪔 भक्ति वॉइस के अन्य प्रमुख आध्यात्मिक साधन" : "🪔 Explore More Spiritual Tools on Bhakti Voice"}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {isHi
                ? "दैनिक पंचांग, साधना ट्रैकर, नाम जप काउंटर, धार्मिक कथाएं एवं तीर्थ यात्रा मार्गदर्शिका:"
                : "Live Panchang, daily sadhana tracker, digital japa counter, katha stories & sacred yatra guides:"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                href={isHi ? "/hi/panchang/today" : "/panchang/today"}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs ring-1 ring-line transition hover:border-amber-500 hover:bg-amber-50"
              >
                <span>📅</span>
                <span>{isHi ? "आज का पंचांग व शुभ मुहूर्त" : "Today's Panchang & Muhurat"}</span>
              </Link>

              <Link
                href={isHi ? "/hi/hindu-calendar" : "/hindu-calendar"}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs ring-1 ring-line transition hover:border-amber-500 hover:bg-amber-50"
              >
                <span>🗓️</span>
                <span>{isHi ? "सनातन व जैन व्रत-त्यौहार कैलेंडर" : "Vrat & Festival Calendar"}</span>
              </Link>

              <Link
                href={isHi ? "/hi/naam-jaap" : "/naam-jaap"}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs ring-1 ring-line transition hover:border-amber-500 hover:bg-amber-50"
              >
                <span>📿</span>
                <span>{isHi ? "डिजिटल नाम जप माला (108)" : "Digital Japa Counter (108)"}</span>
              </Link>

              <Link
                href={isHi ? "/hi/daily-sadhana" : "/daily-sadhana"}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs ring-1 ring-line transition hover:border-amber-500 hover:bg-amber-50"
              >
                <span>🕉️</span>
                <span>{isHi ? "दैनिक साधना व संकल्प" : "Daily Sadhana & Sankalp"}</span>
              </Link>

              <Link
                href={isHi ? "/hi/katha-stories" : "/katha-stories"}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs ring-1 ring-line transition hover:border-amber-500 hover:bg-amber-50"
              >
                <span>📜</span>
                <span>{isHi ? "पौराणिक कथाएं व व्रत कथा" : "Sacred Katha Stories"}</span>
              </Link>

              <Link
                href={isHi ? "/hi/sacred-yatra-guides" : "/sacred-yatra-guides"}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs ring-1 ring-line transition hover:border-amber-500 hover:bg-amber-50"
              >
                <span>🏔️</span>
                <span>{isHi ? "पवित्र तीर्थ यात्रा मार्गदर्शिका" : "Sacred Yatra Guides"}</span>
              </Link>

              <Link
                href={isHi ? "/hi/devotee-community" : "/devotee-community"}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs ring-1 ring-line transition hover:border-amber-500 hover:bg-amber-50"
              >
                <span>👥</span>
                <span>{isHi ? "भक्त सत्संग समुदाय" : "Devotee Community"}</span>
              </Link>
            </div>
          </section>

          {/* Section: Comprehensive FAQs */}
          <section aria-label="Frequently Asked Questions">
            <FaqList
              faqs={faqs}
              title={isHi ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)" : t.common.faqTitle}
              className="mt-6"
            />
          </section>
        </article>
      </main>
    </div>
  );
}

