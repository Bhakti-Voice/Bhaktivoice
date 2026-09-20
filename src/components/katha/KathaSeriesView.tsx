import { Suspense } from "react";
import { Headphones } from "lucide-react";
import { KathaNarrator } from "@/components/katha/KathaNarrator";
import { ProseText } from "@/components/content/SectionBody";
import type { KathaSeries } from "@/lib/content/types";
import { PATHS } from "@/lib/seo/paths";
import { SacredDetailLayout } from "@/components/content/SacredDetailLayout";

export function KathaSeriesView({
  series,
}: {
  series: KathaSeries;
  autoListen?: boolean;
}) {
  const relatedPosts = (series.relatedContent ?? []).map((item) => ({
    title: item.text,
    url: item.href,
    readingTime: "12 min listen",
  }));

  const highlights = [
    { icon: "temple", title: series.category || "Sacred Katha" },
    { icon: "wonder", title: series.language || "Devotional Audio" },
    { icon: "sacred", title: `${series.duration || "12 min"} Duration` },
    { icon: "heritage", title: `${series.rating || "5.0"} Rating (${series.ratingsCount || "108+"})` },
  ];

  return (
    <SacredDetailLayout
      title={series.title}
      h1={series.h1}
      subtitle={series.subtitle || series.metaDescription}
      category={series.category || "Katha & Stories"}
      readingTime={series.duration}
      breadcrumbs={series.breadcrumbs}
      path={`${PATHS.katha}/${series.slug}`}
      author={series.author}
      publishedAt={series.publishedAt}
      updatedAt={series.updatedAt}
      heroImage={series.heroImage}
      heroImageAlt={series.heroImageAlt || series.title}
      introduction={series.introduction}
      highlights={highlights}
      tags={series.tags}
      faqs={series.faqs}
      youtubeUrl={series.youtubeUrl}
      relatedPosts={relatedPosts}
      cta={series.cta}
    >
      {/* Audio Narrator Player */}
      <div className="mb-8">
        <Suspense fallback={null}>
          <KathaNarrator
            title={series.h1}
            subtitle={series.subtitle}
            introduction={series.introduction}
            language={series.language}
            episodes={series.episodes}
          />
        </Suspense>
      </div>

      {/* Episode List */}
      <section aria-labelledby="episodes-heading" id="episodes" className="scroll-mt-24">
        <div className="flex items-center gap-2 mb-6">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B85014] text-white font-bold text-sm shadow-xs">
            ★
          </span>
          <h2 id="episodes-heading" className="font-serif text-2xl font-bold text-[#1A1613]">
            Story Episodes ({series.episodes?.length || 0})
          </h2>
        </div>
        <ol className="space-y-4">
          {(series.episodes ?? []).map((episode) => (
            <li
              key={episode.number}
              className="rounded-2xl border border-[#EDE3D4] bg-white p-5 sm:p-6 shadow-2xs hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFEFE2] px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#B85014]">
                  Episode {episode.number}
                </span>
                <span className="text-xs font-medium text-muted flex items-center gap-1">
                  <Headphones className="h-3 w-3 text-[#B85014]" />
                  {episode.duration}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-lg sm:text-xl font-bold text-[#1A1613]">{episode.title}</h3>
              <ProseText text={episode.summary} className="mt-2 text-sm leading-relaxed text-[#5A524A]" />
            </li>
          ))}
        </ol>
      </section>
    </SacredDetailLayout>
  );
}

