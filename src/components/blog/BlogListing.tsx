"use client";

import { useMemo, useState } from "react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { ListingSearch } from "@/components/content/ListingSearch";
import { PageHero } from "@/components/layout/PageHero";
import { matchesListingQuery } from "@/lib/content/listing-search";
import { useMessages } from "@/lib/i18n/client";
import type { BlogPost, BreadcrumbItem } from "@/lib/content/types";
import type { HubHeroId } from "@/lib/media/hub-heroes";

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
  const visible = useMemo(
    () =>
      posts.filter((post) =>
        matchesListingQuery(
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
        ),
      ),
    [posts, query],
  );
  const searching = Boolean(query.trim());

  return (
    <>
      <PageHero title={title} subtitle={subtitle} hub={hub} ornament crumbs={crumbs}>
        <div className="mt-4">
          <ListingSearch
            value={query}
            onChange={setQuery}
            placeholder={t.common.listingSearch(t.nav.blog)}
            label={t.search}
          />
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pt-3 lg:px-8">
        {visible.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
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
        ) : searching ? (
          <p className="rounded-[28px] bg-white px-6 py-12 text-center text-muted ring-1 ring-line">
            {t.common.listingSearchNone}
          </p>
        ) : null}
      </div>
    </>
  );
}
