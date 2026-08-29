import type { Metadata } from "next";
import { GitaBookReader } from "@/components/gita/GitaBookReader";
import { getGitaChapters, getGitaChapter } from "@/lib/gita/storage";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { GITA_FAQS_HI } from "@/lib/gita/faq-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "श्रीमद्भगवद्गीता — सभी १८ अध्याय एवं ७०० श्लोक हिंदी भावार्थ सहित",
    description:
      "श्रीमद्भगवद्गीता के सभी १८ अध्यायों और ७०० श्लोकों का संपूर्ण अध्ययन करें। प्रामाणिक संस्कृत श्लोक, सरल हिंदी भावार्थ, अंग्रेजी अनुवाद और ३डी ग्रंथ पाठक।",
    path: "/bhagavad-gita",
    locale: "hi",
    image: "/images/kurukshetra-chariot.jpg",
    imageAlt: "कुरुक्षेत्र में भगवान श्रीकृष्ण द्वारा अर्जुन को गीता उपदेश",
    keywords: [
      "श्रीमद्भगवद्गीता",
      "गीता श्लोक हिंदी भावार्थ",
      "भगवद्गीता के १८ अध्याय",
      "कर्मयोग",
      "भक्तियोग",
      "ज्ञानयोग",
      "श्रीकृष्ण अर्जुन संवाद",
      "कुरुक्षेत्र गीता ज्ञान",
    ],
  });
}

export default async function HindiBhagavadGitaPage({
  searchParams,
}: {
  searchParams: Promise<{ chapter?: string; verse?: string }>;
}) {
  const params = await searchParams;
  const initialChapterNum = params.chapter ? parseInt(params.chapter, 10) || 2 : 2;
  const initialVerseNum = params.verse ? parseInt(params.verse, 10) || 11 : 11;

  const chapters = await getGitaChapters();
  const chapterData = await getGitaChapter(initialChapterNum);

  const scriptureSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "श्रीमद्भगवद्गीता",
    alternateName: "Bhagavad Gita Hindi",
    author: {
      "@type": "Person",
      name: "महर्षि वेदव्यास",
    },
    inLanguage: ["hi", "sa"],
    genre: "पवित्र धर्मग्रंथ / वैदिक दर्शन",
    numberOfPages: 700,
    about: "कुरुक्षेत्र रणभूमि में भगवान श्रीकृष्ण और अर्जुन के मध्य धर्म, योग, निष्काम कर्म और मोक्ष का पावन संवाद।",
    url: absoluteUrl("/hi/bhagavad-gita"),
  };

  return (
    <div className="w-full">
      <JsonLd data={scriptureSchema} />

      {/* Interactive 3D Sacred Book Reader */}
      <GitaBookReader
        initialChapters={chapters}
        initialChapterData={chapterData}
        initialChapterNumber={initialChapterNum}
        initialVerseNumber={initialVerseNum}
      />

      {/* Comprehensive Hindi FAQs Section with Schema.org FAQPage */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <FaqList
          faqs={GITA_FAQS_HI}
          title="श्रीमद्भगवद्गीता से जुड़े महत्वपूर्ण प्रश्नोत्तर (FAQs)"
          jsonLd={true}
          className="mt-6"
        />
      </div>
    </div>
  );
}
