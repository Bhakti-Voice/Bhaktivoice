import type { Metadata } from "next";
import { Suspense } from "react";
import { SuvicharStudio } from "@/components/spiritual-tools/SuvicharStudio";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isHi
      ? "दैनिक सुविचार एवं व्हाट्सएप स्टेटस कार्ड मेकर — नाम व फोटो सहित बनाएं"
      : "Daily Suvichar & WhatsApp Status Card Studio — Personalized with Name & Photo",
    description: isHi
      ? "100% निःशुल्क दैनिक सुविचार, जैन वाणी, गीता श्लोक, शिव, हनुमान, राम एवं पर्व शुभकामना कार्ड बनाएं। अपना नाम व फोटो जोड़कर सीधे WhatsApp पर शेयर करें।"
      : "Create HD personalized WhatsApp Status & Instagram Story cards with Jain wisdom, Gita shlokas, Mahadev, Hanuman, Ram, and festival wishes. 100% free.",
    path: PATHS.suvicharMaker,
    keywords: [
      "suvichar status maker",
      "whatsapp status card maker",
      "jain suvichar with photo",
      "daily suprabhat quotes with name",
      "gita shloka status generator",
      "mahavir bhagwan suvichar",
      "shri krishna suvichar",
      "mahadev status maker",
      "dainik suvichar card generator",
      "bhakti voice status studio",
    ],
  });
}

const FAQS_EN = [
  {
    question: "How do I create a personalized WhatsApp Status card with my name?",
    answer:
      "Simply choose your preferred tradition (Jainism, Bhagavad Gita, Mahadev, Hanuman Ji, Ram, Devi, Sant Vani, or Festivals), type your name and city in the personalization fields, select an aesthetic theme, and click 'Share to WhatsApp' or 'Download HD'. It takes less than 10 seconds.",
  },
  {
    question: "Can I add my own photo and custom message to the card?",
    answer:
      "Yes! You can upload your photo (or family picture) which is rendered in an elegant golden medallion. You can also fully edit the quote text, Sanskrit shloka, and source attribution.",
  },
  {
    question: "Are Jain suvichar and Bhagwan Mahavira teachings included?",
    answer:
      "Yes. The studio features a dedicated Jain Dharma collection including Navkar Mahamantra, teachings of Bhagwan Mahavira, Ahimsa Paramo Dharma, Michhami Dukkadam (forgiveness), and Paryushan/Kalyanak blessings with authentic white & gold themes.",
  },
  {
    question: "Does the card automatically show today's Tithi and Panchang?",
    answer:
      "Yes. When the Panchang toggle is enabled, the card dynamically calculates and displays today's Tithi, Nakshatra, and auspicious date according to Vedic calculations.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, 100% free with no registration required. All cards are rendered privately directly inside your browser.",
  },
];

const FAQS_HI = [
  {
    question: "व्हाट्सएप स्टेटस कार्ड में अपना नाम और फोटो कैसे जोड़ें?",
    answer:
      "अपनी पसंद का विषय (जैन धर्म, गीता, शिव, हनुमान जी, श्री राम, देवी माँ या त्यौहार) चुनें, 'अपना नाम' और 'शहर' दर्ज करें, फोटो अपलोड करें और 'WhatsApp पर शेयर करें' या 'HD इमेज डाउनलोड' बटन दबाएं। मात्र 10 सेकंड में आपका व्यक्तिगत कार्ड तैयार हो जाता है।",
  },
  {
    question: "क्या इसमें जैन सुविचार एवं भगवान महावीर की वाणी उपलब्ध है?",
    answer:
      "हाँ, स्टूडियो में श्री नवकार महामंत्र, भगवान महावीर के संदेश, अहिंसा परमो धर्मः, मिच्छामि दुक्कडं (क्षमावाणी), और पर्युषण पर्व के लिए विशेष रूप से तैयार जैन श्वेत-स्वर्ण थीम्स और सुविचार उपलब्ध हैं।",
  },
  {
    question: "क्या कार्ड में आज की तिथि और पंचांग अपने आप जुड़ जाता है?",
    answer:
      "हाँ, 'आज की तिथि एवं पंचांग जोड़ें' विकल्प को चालू रखने पर कार्ड में स्वतः आज की तिथि, पक्ष, और नक्षत्र वैदिक पंचांग अनुसार जुड़ जाते हैं।",
  },
  {
    question: "क्या यह टूल पूरी तरह मुफ्त और सुरक्षित है?",
    answer:
      "हाँ, यह 100% निःशुल्क है। आपकी फोटो और व्यक्तिगत जानकारी पूरी तरह आपके अपने फोन/ब्राउज़र में ही प्रोसेस होती है और कभी किसी सर्वर पर नहीं भेजी जाती।",
  },
];

export default async function SuvicharCardMakerPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? FAQS_HI : FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isHi
            ? "दिव्य सुविचार एवं व्हाट्सएप स्टेटस कार्ड मेकर — भक्ति वॉइस"
            : "Daily Suvichar & WhatsApp Status Card Studio — BhaktiVoice",
          description: isHi
            ? "नाम, फोटो एवं पंचांग सहित सुंदर दैनिक सुविचार व व्हाट्सएप स्टेटस कार्ड बनाएं।"
            : "Create beautiful devotional status cards with your name, photo, and live tithi.",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          url: `${SITE.url}${PATHS.suvicharMaker}`,
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
        title={isHi ? "दिव्य सुविचार एवं व्हाट्सएप स्टेटस स्टूडियो" : "Daily Suvichar & WhatsApp Status Studio"}
        subtitle={
          isHi
            ? "जैन धर्म, गीता, महादेव, हनुमान, राम-जानकी, शक्ति उपासना एवं संतों की पावन वाणी के साथ 10 सेकंड में अपना नाम और फोटो जोड़कर HD कार्ड बनाएं और WhatsApp पर शेयर करें।"
            : "Create and share personalized HD devotional cards for WhatsApp Status and Instagram with authentic Jain & Hindu wisdom, your name, photo, and today's live Tithi."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "सुविचार कार्ड मेकर" : "Suvichar Status Studio", PATHS.suvicharMaker],
        )}

      />

      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
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

        <FaqList
          faqs={faqs}
          title={isHi ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)" : t.common.faqTitle}
          className="mt-12"
        />
      </div>
    </div>
  );
}
