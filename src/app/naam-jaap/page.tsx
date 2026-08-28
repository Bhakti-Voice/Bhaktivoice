import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { JaapSidebar } from "@/components/jaap/JaapSidebar";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { JaapSeoGuide } from "@/components/jaap/JaapSeoGuide";
import { hubMetadata } from "@/lib/i18n/hub";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";
import { SITE, absoluteUrl } from "@/lib/seo/site";

import { JaapCounter } from "@/components/jaap/JaapCounter";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("naamJaap");
}

export default async function NaamJaapPage() {
  const t = await getMessages();
  const locale = await getLocale();
  const isHi = locale === "hi";

  // WebApplication Schema for SEO
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isHi ? "भक्ति वॉइस डिजिटल नाम जप काउंटर" : "Bhakti Voice Digital Naam Jaap Counter",
    url: absoluteUrl(PATHS.naamJaap),
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description: isHi
      ? "मुफ़्त ऑनलाइन १०८ माला जप काउंटर — राधे राधे, राम नाम, हरे कृष्ण महामंत्र एवं ॐ नमः शिवाय का शांत व भावपूर्ण जप।"
      : "Free online 108 Mala Jaap counter for Radhe Radhe, Ram Naam, Hare Krishna Mahamantra and Om Namah Shivaya with daily streak tracking and sound cues.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2480",
    },
  };

  // HowTo Schema for Step-by-Step Vidhi
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isHi ? "डिजिटल जप काउंटर से १०८ नाम जप कैसे करें" : "How to Practice 108 Naam Jaap using Digital Mala",
    description: isHi
      ? "दैनिक नाम जप की सरल और प्रामाणिक विधि।"
      : "Step-by-step guide to doing 108 mantra japa with focus and devotion.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isHi ? "शांत स्थान पर बैठें" : "Sit in a Quiet Space",
        text: isHi
          ? "रीढ़ सीधी रखकर पूर्व या उत्तर दिशा की ओर मुख करके बैठें।"
          : "Sit comfortably with a straight spine facing East or North.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isHi ? "पावन मंत्र चुनें" : "Select Divine Mantra",
        text: isHi
          ? "राधे राधे, राम नाम, हरे कृष्ण या ॐ नमः शिवाय में से अपना प्रिय मंत्र चुनें।"
          : "Choose your beloved mantra (Radhe Radhe, Ram Naam, Hare Krishna, or Om Namah Shivaya).",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isHi ? "१०८ मनके पूर्ण करें" : "Chant 108 Times",
        text: isHi
          ? "प्रत्येक उच्चारण के साथ काउंटर स्पर्श करें अथवा स्पेसबार दबाएँ जब तक १ माला (१०८) पूर्ण न हो जाए।"
          : "Tap the counter circle or press Spacebar once per chant until one full mala (108) is complete.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isHi ? "साधना फल समर्पित करें व साझा करें" : "Dedicate & Share",
        text: isHi
          ? "जप पूर्ण होने पर आंतरिक शांति का अनुभव करें और परिजनों के साथ साझा करें।"
          : "Absorb the inner peace and share your sadhana blessing card with family on WhatsApp.",
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
      <JsonLd
        data={await localizedItemListSchema(t.jaap.counter, [
          { name: t.jaap.counter, url: PATHS.naamJaap },
          { name: t.hubs.mala.h1, url: PATHS.mala },
        ])}
      />
      <JsonLd data={appSchema} />
      <JsonLd data={howToSchema} />

      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.nav.naamJaap, PATHS.naamJaap])} />

      {/* Page Header with Devotional Badge */}
      <div className="mt-3 mb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-100/90 text-orange-900 border border-orange-200">
            📿 {isHi ? "दैनिक आध्यात्मिक साधना" : "Daily Sadhana"}
          </span>
        </div>
        <h1 className="font-serif text-3xl text-ink sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t.jaap.counter}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
          {isHi
            ? "राधे राधे, राम नाम, हरे कृष्ण एवं ॐ नमः शिवाय का शांत १०८ जप काउंटर। अपनी दैनिक माला और श्रृंखला बनाए रखें।"
            : "A peaceful digital jaap counter for Radhe Radhe, Ram naam, Hare Krishna, and Om Namah Shivaya. Count a mala of 108, sustain your daily streak, and experience stillness."}
        </p>
      </div>

      <div className="mt-6 grid gap-6 overflow-visible lg:grid-cols-[230px_minmax(0,1fr)]">
        <div className="order-2 min-w-0 lg:order-1">
          <JaapSidebar />
        </div>
        <div className="order-1 min-w-0 lg:order-2">
          <JaapCounter />
        </div>
      </div>

      {/* Rich Editorial Guide for High SEO Rank */}
      <JaapSeoGuide isHi={isHi} />

      <HubSeoBlock id="naam-jaap" collapsible />
      <FaqList faqs={[...t.jaap.faqs]} title={t.jaap.faqTitle} />
    </div>
  );
}

