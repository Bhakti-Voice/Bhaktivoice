import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, ScrollText, ArrowRight } from "lucide-react";
import { getGitaChapter, getGitaChapters } from "@/lib/gita/storage";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { GITA_FAQS_EN } from "@/lib/gita/faq-data";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { gitaChapterSchema } from "@/lib/seo/schema";
import { getLocale } from "@/lib/i18n/server";

export const revalidate = 86400;

export async function generateStaticParams() {
  return Array.from({ length: 18 }, (_, i) => ({
    chapter: `chapter-${i + 1}`,
  }));
}

function parseChapterNumber(param: string): number | null {
  const clean = param.toLowerCase().replace("chapter-", "").trim();
  const num = parseInt(clean, 10);
  if (isNaN(num) || num < 1 || num > 18) return null;
  return num;
}

type Props = {
  params: Promise<{ chapter: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter: chapterParam } = await params;
  const num = parseChapterNumber(chapterParam);
  if (!num) return { title: "Chapter Not Found | Bhakti Voice" };

  const chapter = await getGitaChapter(num);
  if (!chapter) return { title: "Chapter Not Found | Bhakti Voice" };

  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? `श्रीमद्भगवद्गीता अध्याय ${chapter.chapter}: ${chapter.nameHindi || chapter.name} — सम्पूर्ण श्लोक व अर्थ`
    : `Bhagavad Gita Chapter ${chapter.chapter}: ${chapter.name} — All Verses, Meaning & Summary`;

  const description = isHi
    ? `भगवद्गीता अध्याय ${chapter.chapter} (${chapter.nameSanskrit || chapter.nameHindi}) के सभी ${chapter.versesCount || chapter.verses?.length || 0} श्लोक, संस्कृत पाठ, सरल हिंदी भावार्थ और मुख्य आध्यात्मिक शिक्षाएं पढ़ें।`
    : `Read all ${chapter.versesCount || chapter.verses?.length || 0} verses of Bhagavad Gita Chapter ${chapter.chapter} (${chapter.nameSanskrit || chapter.name}) with Sanskrit shlokas, English translations, Hindi meaning, and philosophical commentary.`;

  return buildMetadata({
    title,
    description,
    path: `/bhagavad-gita/chapter-${num}`,
    locale,
    image: "/images/kurukshetra-chariot.jpg",
    imageAlt: `Bhagavad Gita Chapter ${chapter.chapter} - ${chapter.name}`,
    keywords: [
      `Bhagavad Gita Chapter ${chapter.chapter}`,
      chapter.name,
      chapter.nameHindi || "",
      chapter.nameSanskrit || "",
      "Gita Shlokas",
      "Sanskrit Gita Slokas with meaning",
      "Lord Krishna Arjuna dialogue",
      "Hindu Scripture",
    ].filter(Boolean),
  });
}

export default async function GitaChapterPage({ params }: Props) {
  const { chapter: chapterParam } = await params;
  const num = parseChapterNumber(chapterParam);
  if (!num) notFound();

  const [chapter, allChapters, locale] = await Promise.all([
    getGitaChapter(num),
    getGitaChapters(),
    getLocale(),
  ]);

  if (!chapter) notFound();

  const isHi = locale === "hi";
  const verses = chapter.verses || [];
  const prevChapter = num > 1 ? num - 1 : null;
  const nextChapter = num < 18 ? num + 1 : null;

  const relevantFaqs = GITA_FAQS_EN.filter((faq) => {
    if (num === 2 && (faq.question.includes("2.47") || faq.question.includes("Immortal Soul"))) return true;
    if (num === 11 && faq.question.includes("Cosmic Form")) return true;
    if (num === 18 && faq.question.includes("18.66")) return true;
    if (faq.question.includes("four primary paths") || faq.question.includes("core message")) return true;
    return false;
  }).slice(0, 4);

  const schema = gitaChapterSchema({
    chapter: chapter.chapter,
    name: chapter.name,
    nameHindi: chapter.nameHindi || "",
    nameSanskrit: chapter.nameSanskrit || "",
    versesCount: chapter.versesCount || verses.length,
    summary: chapter.summary || "",
    path: `/bhagavad-gita/chapter-${num}`,
    locale,
  });

  const breadcrumbs = [
    { name: isHi ? "होम" : "Home", href: "/" },
    { name: isHi ? "श्रीमद्भगवद्गीता" : "Bhagavad Gita", href: "/bhagavad-gita" },
    {
      name: isHi
        ? `अध्याय ${chapter.chapter}: ${chapter.nameHindi || chapter.name}`
        : `Chapter ${chapter.chapter}: ${chapter.name}`,
      href: `/bhagavad-gita/chapter-${num}`,
    },
  ];

  return (
    <div className="w-full bg-ivory">
      <JsonLd data={schema} />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} jsonLd={true} />

        {/* Chapter Hero Card */}
        <header className="relative mt-6 overflow-hidden rounded-3xl border border-[#eedec9] bg-white p-6 sm:p-10 shadow-xs">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron-deep border border-saffron/20">
                <ScrollText className="h-3.5 w-3.5" />
                {isHi ? `अध्याय ${chapter.chapter}` : `Chapter ${chapter.chapter} of 18`}
              </span>
              <span className="rounded-full bg-sand/60 px-3 py-1 text-xs font-medium text-muted">
                {chapter.versesCount || verses.length} {isHi ? "श्लोक" : "Verses"}
              </span>
            </div>

            <div className="mt-4">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
                {isHi ? chapter.nameHindi || chapter.name : chapter.name}
              </h1>
              {chapter.nameSanskrit ? (
                <p className="mt-2 font-serif text-xl sm:text-2xl text-saffron-deep italic">
                  {chapter.nameSanskrit}
                </p>
              ) : null}
              {chapter.nameTranslation ? (
                <p className="mt-1 text-sm sm:text-base text-muted">
                  {chapter.nameTranslation}
                </p>
              ) : null}
            </div>

            {/* Humanized Chapter Summary */}
            <div className="chapter-summary mt-6 rounded-2xl bg-[#fffdf9] p-5 sm:p-6 border border-[#f0e4d2]">
              <div className="flex items-center gap-2 text-saffron font-semibold text-sm">
                <Sparkles className="h-4 w-4" />
                <span>{isHi ? "अध्याय का आध्यात्मिक सार" : "Chapter Overview & Spiritual Essence"}</span>
              </div>
              <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-ink/80">
                {isHi ? chapter.summaryHindi || chapter.summary : chapter.summary}
              </p>
            </div>

            {/* Read in Interactive 3D Reader CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/bhagavad-gita?chapter=${num}&verse=1`}
                className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-saffron-deep transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                {isHi ? "3D गीता पुस्तक में पढ़ें" : "Read in 3D Sacred Book"}
              </Link>
              <Link
                href="/bhagavad-gita"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-ink hover:bg-sand/40 transition-colors"
              >
                {isHi ? "सभी 18 अध्याय देखें" : "View All 18 Chapters"}
              </Link>
            </div>
          </div>
        </header>

        {/* Verses Preview List */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink">
              {isHi ? `अध्याय ${chapter.chapter} के श्लोक` : `Verses in Chapter ${chapter.chapter}`}
            </h2>
            <span className="text-xs sm:text-sm text-muted">
              {verses.length} {isHi ? "श्लोक उपलब्ध" : "Shlokas available"}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {verses.slice(0, 10).map((v) => (
              <Link
                key={v.verse}
                href={`/bhagavad-gita?chapter=${num}&verse=${v.verse}`}
                className="group block rounded-2xl border border-[#eedec9] bg-white p-5 shadow-2xs hover:border-saffron/40 hover:shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="inline-block rounded-md bg-saffron/10 px-2.5 py-0.5 text-xs font-bold text-saffron-deep">
                      {isHi ? `श्लोक ${chapter.chapter}.${v.verse}` : `Verse ${chapter.chapter}.${v.verse}`}
                    </span>
                    <p className="mt-2.5 font-serif text-base sm:text-lg text-ink font-medium leading-relaxed group-hover:text-saffron-deep transition-colors">
                      {v.sanskrit}
                    </p>
                    <p className="mt-2 text-sm text-muted line-clamp-2">
                      {isHi ? v.hindi || v.english : v.english || v.hindi}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted/60 group-hover:text-saffron group-hover:translate-x-0.5 transition-all mt-1" />
                </div>
              </Link>
            ))}

            {verses.length > 10 ? (
              <div className="pt-2 text-center">
                <Link
                  href={`/bhagavad-gita?chapter=${num}&verse=11`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-saffron bg-white px-6 py-2.5 text-sm font-semibold text-saffron-deep hover:bg-saffron hover:text-white transition-colors"
                >
                  {isHi ? `शेष सभी ${verses.length - 10} श्लोक पढ़ें` : `Read all ${verses.length} verses in Reader`}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        {/* Chapter Navigation Footer */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          {prevChapter ? (
            <Link
              href={`/bhagavad-gita/chapter-${prevChapter}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 hover:border-saffron/40 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-saffron shrink-0" />
              <div className="text-left min-w-0">
                <span className="text-xs text-muted">{isHi ? "पिछला अध्याय" : "Previous Chapter"}</span>
                <p className="font-serif text-sm sm:text-base font-semibold text-ink truncate">
                  {allChapters[prevChapter - 1]?.name || `Chapter ${prevChapter}`}
                </p>
              </div>
            </Link>
          ) : <div />}

          {nextChapter ? (
            <Link
              href={`/bhagavad-gita/chapter-${nextChapter}`}
              className="flex items-center justify-end gap-3 rounded-2xl border border-line bg-white p-4 hover:border-saffron/40 transition-colors text-right"
            >
              <div className="text-right min-w-0">
                <span className="text-xs text-muted">{isHi ? "अगला अध्याय" : "Next Chapter"}</span>
                <p className="font-serif text-sm sm:text-base font-semibold text-ink truncate">
                  {allChapters[nextChapter - 1]?.name || `Chapter ${nextChapter}`}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-saffron shrink-0" />
            </Link>
          ) : <div />}
        </div>

        {/* Relevant FAQs */}
        {relevantFaqs.length > 0 ? (
          <div className="mt-12">
            <FaqList
              faqs={relevantFaqs}
              title={isHi ? "भगवद्गीता से जुड़े महत्वपूर्ण प्रश्नोत्तर" : "Frequently Asked Questions"}
              jsonLd={true}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
