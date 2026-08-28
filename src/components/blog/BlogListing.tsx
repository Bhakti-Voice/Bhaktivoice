"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Clock, Sparkles } from "lucide-react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { ListingSearch } from "@/components/content/ListingSearch";
import { PageHero } from "@/components/layout/PageHero";
import { CoverMedia } from "@/components/media/CoverMedia";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ProseText } from "@/components/content/SectionBody";
import { BlogSaveButton } from "@/components/blog/BlogSaveButton";
import { matchesListingQuery } from "@/lib/content/listing-search";
import { useMessages } from "@/lib/i18n/client";
import type { BlogPost, BreadcrumbItem } from "@/lib/content/types";
import type { HubHeroId } from "@/lib/media/hub-heroes";
import { PATHS } from "@/lib/seo/paths";

export function BlogListing({
  posts,
  title,
  subtitle,
  crumbs,
  hub,
  readMore,
  saveLabel,
  savedLabel,
  authorFallback,
}: {
  posts: BlogPost[];
  title: string;
  subtitle: string;
  crumbs: BreadcrumbItem[];
  hub: HubHeroId;
  readMore: string;
  saveLabel: string;
  savedLabel: string;
  authorFallback: string;
}) {
  const t = useMessages();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedTags, setExpandedTags] = useState(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const post of posts) {
      if (post.category?.trim()) set.add(post.category.trim());
    }
    return Array.from(set);
  }, [posts]);

  const visible = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory ? post.category?.toLowerCase() === activeCategory.toLowerCase() : true;
      if (!matchesCategory) return false;
      return matchesListingQuery(
        [
          post.title,
          post.excerpt,
          post.introduction,
          post.category,
          post.tags,
          post.author,
          post.slug,
          post.readingTime,
        ],
        query,
      );
    });
  }, [posts, query, activeCategory]);

  const isFiltering = Boolean(query.trim() || activeCategory);
  const featuredPost = !isFiltering && visible.length > 0 ? visible[0] : null;
  const gridPosts = featuredPost ? visible.slice(1) : visible;

  const INITIAL_TAGS_LIMIT = 3;
  const displayCategories = expandedTags ? categories : categories.slice(0, INITIAL_TAGS_LIMIT);
  const hasExtraTags = categories.length > INITIAL_TAGS_LIMIT;

  return (
    <>
      <PageHero title={title} subtitle={subtitle} hub={hub} ornament crumbs={crumbs} />

      <div className="mx-auto max-w-7xl px-4 pt-2 sm:pt-4 lg:px-8">
        <div className="space-y-3.5">
          <ListingSearch
            value={query}
            onChange={setQuery}
            placeholder={t.common.listingSearch(t.nav.blog)}
            label={t.search}
          />

          {categories.length > 1 ? (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 pb-1">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === null
                    ? "bg-gradient-to-r from-saffron to-saffron-deep text-white shadow-xs ring-1 ring-saffron/30"
                    : "bg-white text-stone-700 ring-1 ring-stone-200/80 hover:bg-amber-50 hover:text-saffron-deep"
                }`}
              >
                All
              </button>
              {displayCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide transition-all ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-saffron to-saffron-deep text-white shadow-xs ring-1 ring-saffron/30"
                      : "bg-white text-stone-700 ring-1 ring-stone-200/80 hover:bg-amber-50 hover:text-saffron-deep"
                  }`}
                >
                  {cat}
                </button>
              ))}

              {hasExtraTags && (
                <button
                  type="button"
                  onClick={() => setExpandedTags(!expandedTags)}
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-1 text-xs font-semibold text-saffron-deep bg-amber-50 hover:bg-amber-100 ring-1 ring-amber-200/80 transition-colors shadow-2xs"
                >
                  <span>{expandedTags ? "Show Less" : `+${categories.length - INITIAL_TAGS_LIMIT} More`}</span>
                </button>
              )}
            </div>
          ) : null}
        </div>

        {/* Featured Post Spotlight */}
        {featuredPost ? (
          <section aria-label="Featured Guide" className="mt-6 mb-8">
            <div className="group relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#fffefc] to-[#fff9f1] border border-[#ecd9be] hover:border-amber-400/90 shadow-[0_6px_24px_rgba(217,119,6,0.08)] hover:shadow-[0_20px_48px_rgba(217,119,6,0.18)] transition-all duration-300">
              <div className="grid lg:grid-cols-[1.2fr_1fr] items-stretch">
                <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[320px] bg-amber-50/50">
                  <CoverMedia
                    src={featuredPost.heroImage}
                    alt={featuredPost.heroImageAlt || featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 700px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-stone-900/85 px-3.5 py-1 text-xs font-bold tracking-wider uppercase text-amber-300 backdrop-blur-md border border-amber-300/30 shadow-xs">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    <span>Featured</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3">
                      {featuredPost.category ? (
                        <span className="rounded-full bg-amber-100/90 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-200/80">
                          {featuredPost.category}
                        </span>
                      ) : null}
                      {featuredPost.readingTime ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-stone-500">
                          <Clock className="h-3.5 w-3.5 text-amber-600" />
                          {featuredPost.readingTime}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-3 font-serif text-2xl font-bold leading-snug text-[#2c1810] group-hover:text-saffron-deep transition-colors sm:text-3xl">
                      <LocaleLink href={`${PATHS.blog}/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </LocaleLink>
                    </h2>

                    <ProseText
                      text={featuredPost.excerpt || featuredPost.introduction}
                      className="mt-3 text-sm sm:text-base leading-relaxed text-stone-600 line-clamp-3"
                    />
                  </div>

                  <div className="mt-6 pt-5 border-t border-amber-100/80 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-900 ring-1 ring-amber-200">
                        {(featuredPost.author || authorFallback).slice(0, 1).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-[#2c1810] leading-tight">
                          {featuredPost.author || authorFallback}
                        </p>
                        <p className="text-[11px] text-stone-500">{featuredPost.updatedAt ? `Updated ${featuredPost.updatedAt}` : "Spiritual Guide"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <BlogSaveButton slug={featuredPost.slug} saveLabel={saveLabel} savedLabel={savedLabel} />
                      <LocaleLink
                        href={`${PATHS.blog}/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-saffron to-saffron-deep px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
                      >
                        <span>{readMore}</span>
                        <ChevronRight className="h-4 w-4" />
                      </LocaleLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {gridPosts.length ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                readMore={readMore}
                saveLabel={saveLabel}
                savedLabel={savedLabel}
                authorFallback={authorFallback}
              />
            ))}
          </div>
        ) : isFiltering ? (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center ring-1 ring-line">
            <p className="text-base text-ink font-serif">{t.common.listingSearchNone}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory(null);
              }}
              className="mt-3 inline-flex rounded-full bg-cream px-4 py-2 text-xs font-medium text-saffron-deep ring-1 ring-saffron/20 hover:bg-[#fff2e4]"
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

