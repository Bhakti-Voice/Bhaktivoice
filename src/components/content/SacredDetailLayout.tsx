import type { ReactNode } from "react";
import {
  Calendar,
  Clock,
  UserCheck,
  Sparkles,
  MapPin,
  ChevronDown,
  ListOrdered,
  Flame,
  Landmark,
  Feather,
  ShieldCheck,
  Compass,
  ArrowRight,
} from "lucide-react";
import type { BreadcrumbItem, Faq } from "@/lib/content/types";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlogShare } from "@/components/blog/BlogShare";
import { ProseText } from "@/components/content/SectionBody";
import { YouTubeEmbed } from "@/components/content/YouTubeEmbed";
import { MediaImage } from "@/components/media/MediaImage";
import { BrandFallback } from "@/components/media/BrandFallback";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export type HighlightCard = {
  icon?: string | ReactNode;
  title: string;
  subtitle?: string;
};

export type ArticleSectionItem = {
  heading?: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
};

export type RelatedPostItem = {
  title: string;
  url: string;
  image?: string;
  readingTime?: string;
};

export type SacredDetailLayoutProps = {
  title: string;
  h1: string;
  subtitle?: string;
  category?: string;
  readingTime?: string;
  breadcrumbs?: BreadcrumbItem[];
  path: string;
  author?: string;
  authorRole?: string;
  publishedAt?: string;
  updatedAt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroOverlayQuote?: string;
  heroLocation?: string;
  heroImageLocation?: string;
  introduction?: string;
  highlights?: HighlightCard[];
  sections?: ArticleSectionItem[];
  numberedSections?: ArticleSectionItem[];
  takeaway?: string;
  takeawayTitle?: string;
  tags?: string[];
  faqs?: Faq[];
  youtubeUrl?: string;
  relatedPosts?: RelatedPostItem[];
  cta?: {
    title: string;
    body: string;
    href: string;
    label: string;
  };
  quote?: {
    text: string;
    author?: string;
  };
  children?: ReactNode;
};

function renderHighlightIcon(icon?: string | ReactNode) {
  if (!icon) return <Sparkles className="h-4 w-4 text-[#b45309]" />;
  if (typeof icon !== "string") return icon;

  switch (icon.toLowerCase()) {
    case "temple":
    case "masterpiece":
    case "architecture":
      return <Landmark className="h-4 w-4 text-[#b45309]" />;
    case "wonder":
    case "engineering":
    case "compass":
      return <Compass className="h-4 w-4 text-[#b45309]" />;
    case "sacred":
    case "scripture":
    case "ramayana":
    case "katha":
      return <Feather className="h-4 w-4 text-[#b45309]" />;
    case "heritage":
    case "spiritual":
    case "shield":
      return <ShieldCheck className="h-4 w-4 text-[#b45309]" />;
    default:
      return <Sparkles className="h-4 w-4 text-[#b45309]" />;
  }
}

export function SacredDetailLayout({
  title,
  h1,
  subtitle,
  category,
  readingTime = "8 min read",
  breadcrumbs,
  path,
  author = "Vedic Research Cell",
  authorRole = "Writer & Research Team",
  publishedAt,
  updatedAt,
  heroImage,
  heroImageAlt,
  heroOverlayQuote,
  heroLocation,
  heroImageLocation,
  introduction,
  highlights,
  sections = [],
  numberedSections,
  takeaway,
  takeawayTitle = "Why this matters today",
  tags = [],
  faqs = [],
  youtubeUrl,
  relatedPosts = [],
  cta,
  quote,
  children,
}: SacredDetailLayoutProps) {
  const activeSections = sections.length > 0 ? sections : (numberedSections ?? []);

  // Default spiritual highlights if none provided
  const displayHighlights: HighlightCard[] =
    highlights && highlights.length > 0
      ? highlights
      : [
          {
            icon: "temple",
            title: "Sacred Heritage",
            subtitle: "Timeless Temple Tradition",
          },
          {
            icon: "wonder",
            title: "Architectural Wonder",
            subtitle: "Ancient Vedic Mastery",
          },
          {
            icon: "sacred",
            title: "Scriptural Origin",
            subtitle: "Puranic & Epic History",
          },
          {
            icon: "heritage",
            title: "Spiritual Sadhana",
            subtitle: "Living Faith & Wisdom",
          },
        ];

  // Generate Table of Contents from sections
  const toc = activeSections.filter((s) => Boolean(s.heading));

  return (
    <div className="relative min-h-screen bg-[#fbf8f3] text-[#2c241b]">
      {/* Subtle background ambient pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#eedec9_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
        aria-hidden="true"
      />

      {/* Decorative vertical quote ornament on wide screens */}
      <aside
        aria-hidden="true"
        className="pointer-events-none fixed left-4 top-1/3 z-10 hidden 2xl:flex flex-col items-center gap-4 opacity-55 select-none"
      >
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#b45309]/50 to-transparent" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-serif italic tracking-[0.28em] text-[#91775f] uppercase">
          Ancient Wisdom Lives Forever
        </span>
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#b45309]/50 to-transparent" />
      </aside>

      <article className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Breadcrumb row */}
        {breadcrumbs ? (
          <nav aria-label="Breadcrumbs" className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </nav>
        ) : null}

        {/* HERO SECTION: Balanced 2-column layout */}
        <header className="grid gap-8 lg:grid-cols-[1.14fr_0.86fr] lg:items-center">
          {/* Left Column: Title & Meta Deck */}
          <div className="min-w-0">
            {/* Tag / Category & Reading Time */}
            <div className="flex flex-wrap items-center gap-2.5">
              {category ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fceddc] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#b45309] border border-[#f5d5b3] shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
                  {category}
                </span>
              ) : null}
              {readingTime ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4ebe1] px-3 py-1 text-xs font-medium text-[#6e6358] border border-[#e8ded0]">
                  <Clock className="h-3.5 w-3.5 text-[#d97706]" />
                  {readingTime}
                </span>
              ) : null}
            </div>

            {/* H1 Heading */}
            <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.18] text-[#1c1815] tracking-[-0.015em]">
              {h1}
            </h1>

            {/* Subtitle / Synopsis */}
            {subtitle ? (
              <p className="mt-3.5 text-base sm:text-[17px] leading-relaxed text-[#5c5044] font-normal">
                {subtitle}
              </p>
            ) : null}

            {/* Author & Verification Meta Deck */}
            <div className="mt-5 flex flex-wrap items-center gap-4 py-3.5 border-y border-[#ebdccb] text-xs text-[#706456]">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffe7cc] to-[#ffd19e] text-xs font-bold text-[#b45309] ring-1 ring-[#f3cca0] shadow-2xs">
                  {(author || "B").slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <p className="font-semibold text-[#2b241d] flex items-center gap-1">
                    <span>{author}</span>
                    <UserCheck className="h-3.5 w-3.5 text-[#d97706]" />
                  </p>
                  <p className="text-[10.5px] text-[#857769]">{authorRole}</p>
                </div>
              </div>

              <div className="hidden sm:block h-6 w-px bg-[#ebdccb]" />

              {updatedAt || publishedAt ? (
                <div className="flex items-center gap-1.5 text-[#706456]">
                  <Calendar className="h-3.5 w-3.5 text-[#d97706]" />
                  <span>Updated: {updatedAt || publishedAt}</span>
                </div>
              ) : null}


            </div>
          </div>

          {/* Right Column: Hero Image Card */}
          <div className="relative">
            <div className="group relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full overflow-hidden rounded-3xl bg-[#1f1b18] shadow-lg border border-[#e8ded0]">
              {heroImage ? (
                <MediaImage
                  src={heroImage}
                  alt={heroImageAlt || title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#2a221b] to-[#171310] flex items-center justify-center">
                  <BrandFallback />
                </div>
              )}

              {/* Editorial Gradient Overlays */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"
                aria-hidden="true"
              />

              {/* Overlay Quote Badge */}
              {heroOverlayQuote ? (
                <div className="pointer-events-none absolute top-4 sm:top-5 left-4 sm:left-5 max-w-[240px]">
                  <p className="font-serif italic text-white/95 text-base sm:text-lg lg:text-xl leading-snug drop-shadow-md">
                    {heroOverlayQuote}
                  </p>
                </div>
              ) : null}

              {/* Location or Category Pin Badge */}
              <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white/90 border border-white/20 shadow-sm">
                <MapPin className="h-3 w-3 text-amber-400" />
                <span>{heroLocation || heroImageLocation || category || "Sacred Bharat"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY: 2-Column Grid */}
        <div className="mt-10 lg:mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
          {/* Main Editorial Column */}
          <div className="min-w-0 space-y-8">
            {/* Editorial Lead Paragraph */}
            {introduction ? (
              <div className="relative rounded-r-3xl border-l-[5px] border-[#d97706] bg-gradient-to-r from-[#fff7ec] via-[#fffbf6] to-white/70 p-6 sm:p-7 border-y border-r border-[#eddcc7] shadow-xs">
                <ProseText
                  text={introduction}
                  className="text-base sm:text-[17.5px] leading-[1.85] text-[#2c241d] font-normal"
                />
              </div>
            ) : null}

            {/* Quick Highlights / Key Insights 4-Card Bar */}
            {displayHighlights.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {displayHighlights.map((hl, idx) => (
                  <div
                    key={hl.title || idx}
                    className="rounded-2xl bg-white p-3.5 sm:p-4 border border-[#ebdcc8] shadow-2xs flex flex-col justify-between hover:border-[#d97706]/40 transition-colors"
                  >
                    <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#fceddc] text-[#b45309] mb-2.5">
                      {renderHighlightIcon(hl.icon)}
                    </div>
                    <div>
                      <p className="text-[12.5px] font-bold text-[#231d17] leading-snug">
                        {hl.title}
                      </p>
                      {hl.subtitle ? (
                        <p className="text-[11px] text-[#7a6b5d] mt-0.5 leading-tight line-clamp-1">
                          {hl.subtitle}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Custom Content Children (e.g. Lead blocks, audio narrator, temple attributes) */}
            {children ? <div className="space-y-6">{children}</div> : null}

            {/* Numbered Sections */}
            {activeSections.length > 0 ? (
              <div className="space-y-10 pt-2">
                {activeSections.map((section, idx) => {
                  const headingId = section.heading
                    ?.toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");

                  return (
                    <section
                      key={section.heading ?? idx}
                      id={headingId}
                      className="scroll-mt-24 space-y-4"
                    >
                      {section.heading ? (
                        <div className="flex items-start gap-3.5">
                          <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e05a36] to-[#c8401e] text-white text-sm sm:text-base font-bold shadow-xs">
                            {idx + 1}
                          </span>
                          <div>
                            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#1f1b17] leading-tight">
                              {section.heading}
                            </h2>
                            <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[#d97706] to-[#f59e0b] rounded-full" />
                          </div>
                        </div>
                      ) : null}

                      {/* Section Image if present */}
                      {section.image ? (
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#e8ded0] shadow-sm">
                          <MediaImage
                            src={section.image}
                            alt={section.imageAlt || section.heading || title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 750px"
                          />
                          {section.imageCaption ? (
                            <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
                              {section.imageCaption}
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      {/* Section Paragraphs with enhanced typography */}
                      <div className="space-y-4 pl-0 sm:pl-12">
                        {section.paragraphs.map((paragraph, pIdx) => (
                          <ProseText
                            key={pIdx}
                            text={paragraph}
                            className="text-base sm:text-[17px] leading-[1.85] text-[#2f2924] font-normal"
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : null}

            {/* Devotional Takeaway Box: "Why this matters today" */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#fff7eb] via-[#fff2e0] to-[#fdebd4] p-6 sm:p-8 border border-[#edd5be] shadow-xs">
              <div className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#fedebb] text-[#c8401e] shadow-2xs">
                  <Flame className="h-5 w-5 fill-current" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
                    {takeawayTitle}
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15.5px] leading-relaxed text-[#4d4034]">
                    {takeaway ||
                      subtitle ||
                      "Sacred wisdom reminds us that when devotion, knowledge and pure intention come together, living peace touches every corner of our daily journey."}
                  </p>
                </div>
              </div>

              {/* Decorative handwritten accent on desktop */}
              <div
                aria-hidden="true"
                className="mt-4 flex items-center justify-end font-serif italic text-xs sm:text-sm text-[#a68261]/80 select-none"
              >
                <span>Our past lights a brighter tomorrow</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </div>
            </div>

            {/* Related Topics / Tags Pills */}
            {tags.length > 0 ? (
              <div className="pt-6 border-t border-[#ebdcc8]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7a6d60]">
                  Related Topics
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-[#f6efe4] hover:bg-[#ffebd6] px-3.5 py-1.5 text-xs font-medium text-[#42372d] hover:text-[#b45309] border border-[#e5d9c7] hover:border-[#f2d1a8] transition-all shadow-2xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Frequently Asked Questions Accordion */}
            {faqs.length > 0 ? (
              <section aria-labelledby="faq-section-heading" className="pt-6 border-t border-[#ebdcc8]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e05a36] text-white text-base font-bold shadow-xs">
                    ?
                  </span>
                  <h2
                    id="faq-section-heading"
                    className="font-serif text-2xl sm:text-[26px] font-bold text-[#1f1b17]"
                  >
                    Frequently asked questions
                  </h2>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-2xl bg-white p-5 border border-[#e8dfd2] shadow-2xs transition-all duration-200 open:bg-[#fffdfa] open:border-[#d97706]/40"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-[#1e1814] [&::-webkit-details-marker]:hidden">
                        <span className="text-sm sm:text-base leading-snug group-hover:text-[#b45309] transition-colors">
                          {faq.question}
                        </span>
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f5ede2] text-[#b45309] transition group-open:rotate-180 group-open:bg-[#fce5cf]">
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </summary>
                      <div className="mt-3.5 pt-3.5 border-t border-[#f0e4d4]">
                        <ProseText
                          text={faq.answer}
                          className="text-sm sm:text-[14.5px] leading-relaxed text-[#5c4e40]"
                        />
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {/* STICKY SIDEBAR COLUMN */}
          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            {/* Widget 1: Share this knowledge */}
            <BlogShare title={title} path={path} />

            {/* Widget 2: Start Your Spiritual Practice / Start Jaap */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#fff7ec] via-[#fff1dc] to-[#fde5c8] p-6 border border-[#ebd0b3] shadow-xs">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-[#b45309] text-xl font-bold shadow-2xs border border-[#f5dbbf]">
                  🕉️
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#b45309]">
                    Start Your Spiritual Practice
                  </p>
                  <h3 className="font-serif text-xl font-bold text-[#231d17]">
                    {cta?.title || "Start Jaap"}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-[#5c4e40]">
                {cta?.body ||
                  "A short mala after reading is how sacred wisdom translates into peaceful sadhana."}
              </p>

              <LocaleLink
                href={cta?.href || "/naam-jaap"}
                className="mt-4.5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e67e22] to-[#d35400] px-5 py-3 text-sm font-bold text-white shadow-sm hover:from-[#d35400] hover:to-[#ba4400] hover:scale-[1.01] transition-all"
              >
                <span>{cta?.label || "Start 108 Naam Jaap"}</span>
                <ArrowRight className="h-4 w-4" />
              </LocaleLink>

              <p className="mt-2 text-center text-[11px] text-[#806f5f]">
                Small steps. A more peaceful you.
              </p>
            </div>

            {/* Widget 3: In this guide (Table of contents) */}
            {toc.length > 1 ? (
              <div className="rounded-3xl bg-white p-5 sm:p-6 border border-[#e8ded0] shadow-xs">
                <div className="flex items-center gap-2 text-[#1f1b17] font-bold font-serif text-base sm:text-lg">
                  <ListOrdered className="h-4 w-4 text-[#d97706]" />
                  <span>In this guide</span>
                </div>

                <ol className="mt-3.5 space-y-2.5 text-xs sm:text-sm">
                  {toc.map((s, idx) => {
                    const headingId = s.heading
                      ?.toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-");

                    return (
                      <li key={s.heading || idx} className="flex items-start gap-2.5">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fceddc] text-[10.5px] font-bold text-[#b45309] border border-[#f5d5b3]">
                          {idx + 1}
                        </span>
                        <a
                          href={`#${headingId}`}
                          className="text-[#3b3229] transition-colors hover:text-[#b45309] hover:underline underline-offset-4 leading-snug"
                        >
                          {s.heading}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : null}

            {/* Widget 4: Devotional Quote Callout (only if explicitly provided) */}
            {quote ? (
              <div className="relative rounded-3xl bg-gradient-to-br from-[#fffdfa] to-[#fff6eb] p-6 border border-[#ebdcc9] shadow-xs">
                <span
                  aria-hidden="true"
                  className="text-4xl font-serif text-[#d97706]/40 leading-none select-none block mb-1"
                >
                  “
                </span>
                <p className="font-serif italic text-sm sm:text-[14.5px] leading-relaxed text-[#3b3127]">
                  {quote.text}
                </p>
                {quote.author ? (
                  <p className="mt-2 text-right text-xs font-semibold text-[#8c7967]">
                    — {quote.author}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* Widget 5: You may also like (Related guides) */}
            {relatedPosts.length > 0 ? (
              <div className="rounded-3xl bg-white p-5 sm:p-6 border border-[#e8ded0] shadow-xs">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#1f1b17] mb-3.5">
                  You may also like
                </h3>
                <div className="space-y-3">
                  {relatedPosts.slice(0, 4).map((post, idx) => (
                    <LocaleLink
                      key={post.url || idx}
                      href={post.url}
                      className="group flex items-center gap-3 rounded-2xl p-2 hover:bg-[#fff9f2] transition-colors"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#ebdcc8] border border-[#e3d3be]">
                        {post.image ? (
                          <MediaImage
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="56px"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-xs font-bold text-[#b45309]">
                            🛕
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-[13px] font-semibold text-[#241e18] group-hover:text-[#b45309] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </p>
                        {post.readingTime ? (
                          <p className="text-[11px] text-[#857668] mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3 text-[#d97706]" />
                            <span>{post.readingTime}</span>
                          </p>
                        ) : null}
                      </div>
                    </LocaleLink>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Optional YouTube Video Embed */}
            {youtubeUrl ? (
              <YouTubeEmbed url={youtubeUrl} title={h1} compact />
            ) : null}
          </aside>
        </div>
      </article>
    </div>
  );
}
