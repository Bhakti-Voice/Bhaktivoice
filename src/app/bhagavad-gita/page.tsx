import type { Metadata } from "next";
import { GitaBookReader } from "@/components/gita/GitaBookReader";
import { getGitaChapters, getGitaChapter } from "@/lib/gita/storage";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { GITA_FAQS_EN } from "@/lib/gita/faq-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Bhagavad Gita — Read All 18 Chapters & 700 Shlokas with Meaning",
    description:
      "Read all 18 chapters and 700 verses of the Bhagavad Gita with original Sanskrit shlokas, English translations, Hindi meanings, chapter commentaries, and interactive 3D scripture book.",
    path: "/bhagavad-gita",
    locale: "en",
    image: "/images/kurukshetra-chariot.jpg",
    imageAlt: "Lord Krishna driving Arjuna's chariot at Kurukshetra battlefield",
    keywords: [
      "Bhagavad Gita",
      "Gita Shlokas",
      "Bhagavad Gita with English Translation",
      "Bhagavad Gita Chapters",
      "Lord Krishna Arjuna dialogue",
      "Karma Yoga",
      "Bhakti Yoga",
      "Jnana Yoga",
      "Sanskrit Gita Slokas",
    ],
  });
}

export default async function BhagavadGitaPage({
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
    name: "Bhagavad Gita",
    alternateName: "The Song of God",
    author: {
      "@type": "Person",
      name: "Maharshi Veda Vyasa",
    },
    inLanguage: ["sa", "en", "hi"],
    genre: "Sacred Scripture / Hindu Philosophy",
    numberOfPages: 700,
    about: "The sacred dialogue between Lord Krishna and Arjuna on dharma, yoga, karma, and liberation.",
    url: absoluteUrl("/bhagavad-gita"),
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

      {/* Comprehensive FAQs Section with Schema.org FAQPage */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <FaqList
          faqs={GITA_FAQS_EN}
          title="Frequently Asked Questions on Bhagavad Gita"
          jsonLd={true}
          className="mt-6"
        />
      </div>
    </div>
  );
}
