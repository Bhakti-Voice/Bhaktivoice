import { Sparkles } from "lucide-react";
import { ProseText } from "@/components/content/SectionBody";
import type { YatraPage } from "@/lib/content/types";
import { PATHS } from "@/lib/seo/paths";
import { SacredDetailLayout } from "@/components/content/SacredDetailLayout";

export function YatraDetailView({ page }: { page: YatraPage }) {
  const subtitle =
    page.category === "itinerary"
      ? `${page.destination} · a humane sequence`
      : page.category === "places"
        ? `${page.destination} · places worth a slow visit`
        : page.category === "darshan"
          ? `${page.destination} · arrive as a guest`
          : `${page.state} · ${(page.filters ?? []).slice(0, 2).join(" · ")}`;

  const relatedPosts = (page.relatedContent ?? []).map((item) => ({
    title: item.text,
    url: item.href,
    readingTime: "10 min read",
  }));

  const highlights = [
    { icon: "temple", title: page.bestTime ? `Best: ${page.bestTime}` : "Sacred Pilgrimage" },
    { icon: "wonder", title: page.state || "Spiritual Bharat" },
    { icon: "sacred", title: page.destination || "Holy Dhama" },
    { icon: "heritage", title: `${page.places?.length || 0} Sacred Shrines` },
  ];

  return (
    <SacredDetailLayout
      title={page.title}
      h1={page.h1}
      subtitle={subtitle}
      category="Sacred Yatra"
      readingTime="10 min read"
      breadcrumbs={page.breadcrumbs}
      path={`${PATHS.yatra}/${page.slug}`}
      author={page.author}
      publishedAt={page.publishedAt}
      updatedAt={page.updatedAt}
      heroImage={page.heroImage}
      heroImageAlt={page.heroImageAlt || page.title}
      heroImageLocation={page.destination || page.state}
      introduction={page.introduction}
      highlights={highlights}
      tags={page.tags || page.filters || []}
      faqs={page.faqs}
      youtubeUrl={page.youtubeUrl}
      relatedPosts={relatedPosts}
      cta={page.cta}
    >
      <div className="space-y-6">
        {page.whyVisit && (
          <section className="rounded-2xl border border-[#EDE3D4] bg-white p-6 shadow-2xs">
            <h2 className="font-serif text-2xl font-bold text-[#1A1613] mb-3">Why visit</h2>
            <ProseText text={page.whyVisit} className="text-[#5A524A] leading-relaxed" />
          </section>
        )}

        {page.significance && (
          <section className="rounded-2xl border border-[#EDE3D4] bg-white p-6 shadow-2xs">
            <h2 className="font-serif text-2xl font-bold text-[#1A1613] mb-3">Significance</h2>
            <ProseText text={page.significance} className="text-[#5A524A] leading-relaxed" />
          </section>
        )}

        {/* Sacred Places */}
        {page.places && page.places.length > 0 && (
          <section className="rounded-2xl border border-[#EDE3D4] bg-white p-6 shadow-2xs">
            <h2 className="font-serif text-2xl font-bold text-[#1A1613] mb-4">Sacred Places</h2>
            <ul className="space-y-3.5">
              {page.places.map((place) => (
                <li key={place.name} className="rounded-xl border border-[#F5EDE1] bg-[#FFFBF7] p-4">
                  <h3 className="font-serif text-lg font-bold text-[#1A1613] flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#B85014]" />
                    <span>{place.name}</span>
                  </h3>
                  <ProseText text={place.note} className="mt-1.5 text-sm leading-relaxed text-[#5A524A]" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pilgrimage Itinerary */}
        {page.itinerary && page.itinerary.length > 0 && (
          <section className="rounded-2xl border border-[#EDE3D4] bg-white p-6 shadow-2xs">
            <h2 className="font-serif text-2xl font-bold text-[#1A1613] mb-4">Pilgrimage Itinerary</h2>
            <ol className="space-y-3.5">
              {page.itinerary.map((item) => (
                <li key={item.day} className="rounded-xl border border-[#F5EDE1] bg-[#FFFBF7] p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B85014]">{item.day}</span>
                  <ProseText text={item.plan} className="mt-1.5 text-sm leading-relaxed text-[#2C241B]/90" />
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Travel & Stay Guide */}
        <section className="rounded-2xl border border-[#EDE3D4] bg-white p-6 shadow-2xs">
          <h2 className="font-serif text-2xl font-bold text-[#1A1613] mb-4">Travel & Stay Guide</h2>
          <div className="space-y-3 text-sm leading-relaxed text-[#5A524A]">
            {page.howToReach && (
              <p>
                <strong className="text-[#1A1613]">How to reach: </strong>
                <ProseText as="span" text={page.howToReach} />
              </p>
            )}
            {page.stay && (
              <p>
                <strong className="text-[#1A1613]">Where to stay: </strong>
                <ProseText as="span" text={page.stay} />
              </p>
            )}
            {page.food && (
              <p>
                <strong className="text-[#1A1613]">Prasad & Food: </strong>
                <ProseText as="span" text={page.food} />
              </p>
            )}
            {page.nearby && page.nearby.length > 0 && (
              <p>
                <strong className="text-[#1A1613]">Nearby holy shrines: </strong>
                {page.nearby.join(" · ")}
              </p>
            )}
          </div>
        </section>

        {/* Yatra Tips */}
        {page.tips && page.tips.length > 0 && (
          <section className="rounded-2xl border border-[#EDE3D4] bg-white p-6 shadow-2xs">
            <h2 className="font-serif text-2xl font-bold text-[#1A1613] mb-4">Yatra Tips & Advice</h2>
            <ul className="space-y-2.5">
              {page.tips.map((tip) => (
                <ProseText
                  as="li"
                  key={tip}
                  text={tip}
                  className="rounded-xl bg-[#FFFBF7] p-3 text-sm text-[#2C241B] border border-[#F5EDE1]"
                />
              ))}
            </ul>
          </section>
        )}
      </div>
    </SacredDetailLayout>
  );
}

