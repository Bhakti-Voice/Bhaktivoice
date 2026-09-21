import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Eye,
  Moon,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { hubMetadata } from "@/lib/i18n/hub";
import { JsonLd } from "@/components/seo/JsonLd";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";
import { getLocale } from "@/lib/i18n/server";
import { getLibraryContent } from "@/lib/library/library-content";
import { LibraryStatsStrip } from "@/components/library/LibraryStatsStrip";
import { LibraryFaqSection } from "@/components/library/LibraryFaqSection";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("library");
}

const iconMap = {
  sparkles: Sparkles,
  compass: Compass,
  moon: Moon,
  eye: Eye,
};

const featureIconMap = {
  content: ShieldCheck,
  understand: CheckCircle2,
  growing: TrendingUp,
};

export default async function LibraryHubPage() {
  const currentLocale = await getLocale();
  const content = getLibraryContent(currentLocale);

  // Breadcrumbs: strictly follow Home -> Library
  const breadcrumbs = [
    { name: content.homeLabel, href: "/" },
    { name: content.libraryLabel, href: PATHS.library },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2c1810]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* JSON-LD Schema: CollectionPage with ItemList */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `BhaktiVoice ${content.title}`,
            description: content.description,
            url: `${SITE.url}${currentLocale === "en" ? PATHS.library : `/${currentLocale}${PATHS.library}`}`,
            inLanguage: currentLocale,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: content.collections.map((col, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: col.title,
                description: col.description,
                url: col.active
                  ? `${SITE.url}${currentLocale === "en" ? col.href : `/${currentLocale}${col.href}`}`
                  : undefined,
              })),
            },
          }}
        />

        {/* Breadcrumb Navigation: Home > Library */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero Banner with Scenic Sunrise River Temple Artwork */}
        <section
          aria-label="Library Overview"
          className="relative overflow-hidden rounded-3xl border border-[#ebdccb] bg-[#faf5ec] shadow-xs mb-10 sm:mb-12"
        >
          {/* Background Scenic Artwork for Desktop & Tablet */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 pointer-events-none select-none">
            <MediaImage
              src="/images/library/hero-temple-sunrise.jpg"
              alt="Sacred temple ghat at golden sunrise"
              fill
              priority
              className="object-cover object-right-bottom"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Seamless fading gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf5ec] via-[#faf5ec]/90 to-[#faf5ec]/30 lg:via-[#faf5ec]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf5ec] via-transparent to-[#faf5ec]/40" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
            {/* Left Content Area (7 cols on lg) */}
            <div className="lg:col-span-7 max-w-2xl">
              {/* Badge: SPIRITUAL KNOWLEDGE HUB */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#faece1] px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#b8532f] border border-[#f3d7c4] mb-4">
                <Compass className="w-3.5 h-3.5" />
                <span>{content.heroBadge}</span>
              </div>

              {/* Main Heading H1 */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#2c1810] leading-[1.15]">
                {content.title}
              </h1>

              {/* Subheading */}
              <p className="mt-3 text-base sm:text-lg font-serif font-medium text-[#b45309]">
                {content.subtitle}
              </p>

              {/* Intro Description */}
              <p className="mt-3.5 text-xs sm:text-sm lg:text-base text-stone-600 leading-relaxed max-w-xl">
                {content.description}
              </p>

              {/* 3 Value Pillars */}
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6 pt-6 border-t border-[#ecd8c4]/80">
                {content.heroFeatures.map((feat, idx) => {
                  const FeatIcon = featureIconMap[feat.icon] || ShieldCheck;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#faece1] text-[#c85a24] border border-[#f3d7c4]">
                        <FeatIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#2c1810]">
                          {feat.title}
                        </div>
                        <div className="text-[11px] sm:text-xs text-stone-500">
                          {feat.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Quote Area (5 cols on lg) */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="relative rounded-2xl border border-white/60 bg-white/75 backdrop-blur-xs p-5 sm:p-6 shadow-xs max-w-sm text-right lg:text-center">
                <p className="font-serif italic text-base sm:text-lg font-medium text-[#4a3429] leading-snug">
                  {content.heroQuote.text}
                </p>
                <p className="mt-2 text-xs font-semibold text-[#8d5b4c] uppercase tracking-wider">
                  {content.heroQuote.source}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Section Header & 2x2 Grid */}
        <section id="collections" aria-label="Spiritual Library Collections">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {content.collections.map((col, idx) => {
              const IconComponent = iconMap[col.iconName] || Sparkles;

              const cardInner = (
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 h-full">
                  {/* Left Column: Artwork Image */}
                  <div className="relative w-full sm:w-44 h-48 sm:h-auto shrink-0 rounded-2xl overflow-hidden border border-[#faeade] bg-stone-100 shadow-inner">
                    <MediaImage
                      src={col.image}
                      alt={`${col.title} - ${col.subtitle}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 176px"
                    />
                  </div>

                  {/* Right Column: Collection Metadata & Link */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      {/* Top Header: Icon & Status Badge */}
                      <div className="flex items-center justify-between gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-2xl ${
                            col.active
                              ? "bg-[#faece1] text-[#c85a24]"
                              : "bg-[#f5f4f0] text-[#78716c]"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>

                        <span
                          className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                            col.active
                              ? "bg-[#eaf7ee] text-[#1e7e34] border border-[#cdeed5]"
                              : "bg-[#f5f4f0] text-[#78716c] border border-[#e7e5e4]"
                          }`}
                        >
                          {col.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-lg sm:text-xl lg:text-[21px] font-bold text-[#2c1810] mt-3 leading-tight group-hover:text-[#b94e15] transition-colors">
                        {col.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="mt-1 text-xs sm:text-sm font-serif font-medium text-[#8d5b4c]">
                        {col.subtitle}
                      </p>

                      {/* Description */}
                      <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                        {col.description}
                      </p>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="mt-5 pt-4 border-t border-[#f2e6d8] flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-[#e36d23] group-hover:text-[#cc5a12] transition-colors">
                        {col.buttonText}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e36d23] text-white shadow-xs transition-transform duration-200 group-hover:scale-110">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  key={idx}
                  className={`group rounded-3xl border p-5 sm:p-6 transition-all duration-300 ${
                    col.active
                      ? "bg-white border-[#ebdccb] shadow-[0_4px_20px_rgba(220,100,30,0.04)] hover:shadow-[0_12px_32px_rgba(220,100,30,0.09)] hover:border-amber-400/80 hover:-translate-y-1"
                      : "bg-white border-[#ebdccb] shadow-[0_2px_10px_rgba(0,0,0,0.02)] opacity-95"
                  }`}
                >
                  {col.active ? (
                    <LocaleLink href={col.href} className="block h-full focus:outline-hidden">
                      {cardInner}
                    </LocaleLink>
                  ) : (
                    <div className="block h-full">{cardInner}</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Value Highlights & Lotus Motto Strip */}
        <LibraryStatsStrip stats={content.stats} lotusMotto={content.lotusMotto} />

        {/* 10 FAQs & Searchable Sidebar Section */}
        <LibraryFaqSection
          faqs={content.faqs}
          faqTitle={content.faqTitle}
          searchPlaceholder={content.faqSearchPlaceholder}
          sidebarQuote={content.sidebarQuote}
          sidebarCta={content.sidebarCta}
        />
      </div>
    </div>
  );
}
