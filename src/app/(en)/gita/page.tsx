import type { Metadata } from "next";
import { GitaBookReader } from "@/components/gita/GitaBookReader";
import { getGitaChapters, getGitaChapter } from "@/lib/gita/storage";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { GITA_FAQS_EN } from "@/lib/gita/faq-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const { getLocale } = await import("@/lib/i18n/server");
  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  return buildMetadata({
    title: isTe
      ? "శ్రీమద్భగవద్గీత — అన్ని 18 అధ్యాయాలు & 700 శ్లోకాలు తెలుగు భావార్థంతో"
      : isHi
      ? "श्रीमद्भगवद्गीता — सभी १८ अध्याय एवं ७०० श्लोक हिंदी भावार्थ सहित"
      : "Bhagavad Gita — Read All 18 Chapters & 700 Shlokas with Meaning",
    description: isTe
      ? "శ్రీమద్భగవద్గీత సంపూర్ణ 18 అధ్యాయాలు మరియు 700 శ్లోకాలు. సంస్కృత శ్లోకాలు, సమగ్ర తెలుగు తాత్పర్యం మరియు 3D పవిత్ర గ్రంథ పాఠకుడు."
      : isHi
      ? "श्रीमद्भगवद्गीता के सभी १८ अध्यायों और ७०० श्लोकों का संपूर्ण अध्ययन करें। प्रामाणिक संस्कृत श्लोक, सरल हिंदी भावार्थ और ३डी ग्रंथ पाठक।"
      : "Read all 18 chapters and 700 verses of the Bhagavad Gita with original Sanskrit shlokas, English translations, Hindi meanings, chapter commentaries, and interactive 3D scripture book.",
    path: "/gita",
    locale,
    image: "/images/kurukshetra-chariot.jpg",
    imageAlt: isTe
      ? "కురుక్షేత్రంలో శ్రీకృష్ణార్జునుల రథం"
      : isHi
      ? "कुरुक्षेत्र में भगवान श्रीकृष्ण द्वारा अर्जुन को गीता उपदेश"
      : "Lord Krishna driving Arjuna's chariot at Kurukshetra battlefield",
    keywords: isTe
      ? [
          "శ్రీమద్భగవద్గీత",
          "భగవద్గీత శ్లోకాలు తెలుగు",
          "భగవద్గీత 18 అధ్యాయాలు",
          "గీతా సారము తెలుగు",
          "కర్మ యోగం",
          "భక్తి యోగం",
          "జ్ఞాన యోగం",
          "శ్రీకృష్ణ అర్జున సంవాదం",
        ]
      : isHi
      ? [
          "श्रीमद्भगवद्गीता",
          "भगवद्गीता हिंदी में",
          "गीता श्लोक हिंदी भावार्थ",
          "भगवद्गीता के १८ अध्याय",
          "गीता के अनमोल वचन",
          "कर्मयोग",
          "भक्तियोग",
          "ज्ञानयोग",
          "श्रीकृष्ण अर्जुन संवाद",
          "गीता का सार",
        ]
      : [
          "Bhagavad Gita",
          "Bhagavad Gita Quotes Chapter Wise",
          "Bhagavad Gita in Hindi",
          "Gita Shlokas with Meaning",
          "Bhagavad Gita All 18 Chapters",
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
