"use client";

import { useMemo, useState } from "react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { PageHero } from "@/components/layout/PageHero";
import { useMessages } from "@/lib/i18n/client";
import type { BlogPost, BreadcrumbItem } from "@/lib/content/types";
import type { HubHeroId } from "@/lib/media/hub-heroes";

const TAG_PREVIEW = 10;

export function BlogListing({
  posts,
  title,
  subtitle,
  crumbs,
  hub,
  allLabel,
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
  allLabel: string;
  readMore: string;
  saveLabel: string;
  savedLabel: string;
  authorFallback: string;
}) {
  const t = useMessages();
  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))],
    [allLabel, posts],
  );
  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags ?? []))),
    [posts],
  );
  const [category, setCategory] = useState(allLabel);
  const [tag, setTag] = useState<string | null>(null);
  const [openTags, setOpenTags] = useState(false);

  const extra = tags.length - TAG_PREVIEW;
  const visibleTags = openTags || extra <= 0 ? tags : tags.slice(0, TAG_PREVIEW);
  const visible = posts.filter((post) => {
    const categoryOk = category === allLabel || post.category === category;
    const tagOk = !tag || (post.tags ?? []).includes(tag);
    return categoryOk && tagOk;
  });

  return (
    <>
      <PageHero title={title} subtitle={subtitle} hub={hub} ornament crumbs={crumbs}>
        {tags.length ? (
          <div className="mt-2 flex max-w-3xl flex-wrap items-center gap-1.5">
            {visibleTags.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTag((current) => (current === item ? null : item))}
                className={`rounded-full px-3 py-1 text-xs ring-1 sm:text-sm ${
                  tag === item
                    ? "bg-[#fff4ea] text-saffron-deep ring-[#f3d2b3]"
                    : "bg-white/80 text-ink ring-line hover:ring-saffron/40"
                }`}
              >
                {item}
              </button>
            ))}
            {extra > 0 ? (
              <button
                type="button"
                onClick={() => setOpenTags((value) => !value)}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-saffron ring-1 ring-saffron/40 sm:text-sm"
              >
                {openTags ? t.common.showLessTags : t.common.showMoreTags(extra)}
              </button>
            ) : null}
          </div>
        ) : null}
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pt-3 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-3.5 py-1.5 text-sm ${
                category === item
                  ? "bg-[#5c2e18] text-white"
                  : "border border-line bg-white text-ink hover:border-saffron/50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </>
  );
}
