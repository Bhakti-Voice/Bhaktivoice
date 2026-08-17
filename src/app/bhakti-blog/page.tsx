import type { Metadata } from "next";
import { BlogCategoryChips } from "@/components/blog/BlogCategoryChips";
import { BlogTagCloud } from "@/components/blog/BlogTagCloud";
import { EmptyListing } from "@/components/content/EmptyListing";
import { PageHero } from "@/components/layout/PageHero";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { ListingPager } from "@/components/content/ListingPager";
import { listBlog } from "@/lib/content";
import { getBlogPage, getBlogPageCount } from "@/lib/content/blog-pagination";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("blog");
}

export default async function BlogIndexPage() {
  const [blogPosts, t] = await Promise.all([listBlog(), getMessages()]);
  const posts = getBlogPage(blogPosts, 1);
  const pages = getBlogPageCount(blogPosts.length);
  const tags = Array.from(new Set(blogPosts.flatMap((post) => post.tags ?? [])));

  return (
    <div>
      <PageHero title={t.hubs.blog.h1} hub="blog" crumbs={localizedCrumbs(t.homeName, [t.nav.blog, PATHS.blog])} />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.blog.h1,
          posts.map((post) => ({ name: post.title, url: `${PATHS.blog}/${post.slug}` })),
        )}
      />
      <BlogTagCloud tags={tags} />

      <div className="mt-8">
        {posts.length ? (
          <BlogCategoryChips key={posts.map((post) => post.title).join("|")} posts={posts} />
        ) : (
          <EmptyListing kind="blog" />
        )}
        <ListingPager
          page={1}
          pages={pages}
          basePath={PATHS.blog}
          previousLabel={t.common.previous}
          nextLabel={t.common.next}
          pageOf={t.common.pageOf}
        />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-cream p-5 ring-1 ring-line">
          <h2 className="font-serif text-xl text-ink">{t.common.followJourney}</h2>
          <p className="mt-2 text-sm text-muted">{t.common.followJourneyBody}</p>
        </div>
        <ContextualCta
          title={t.common.blogCtaTitle}
          body={t.common.blogCtaBody}
          href="/naam-jaap"
          label={t.common.blogCtaLabel}
        />
      </div>
      <HubSeoBlock id="blog" />
      </div>
    </div>
  );
}
