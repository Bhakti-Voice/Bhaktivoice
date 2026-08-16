import type { Metadata } from "next";
import { BlogCategoryChips } from "@/components/blog/BlogCategoryChips";
import { EmptyListing } from "@/components/content/EmptyListing";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocaleLink } from "@/components/i18n/LocaleLink";
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
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.blog.h1,
          posts.map((post) => ({ name: post.title, url: `${PATHS.blog}/${post.slug}` })),
        )}
      />
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.nav.blog, PATHS.blog])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">{t.hubs.blog.h1}</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          {posts.length ? <BlogCategoryChips posts={posts} /> : <EmptyListing kind="blog" />}
          {pages > 1 ? (
            <p className="mt-8 text-sm text-muted">
              {t.common.pageOf(1, pages)} ·{" "}
              <LocaleLink href={`${PATHS.blog}/page/2`} className="text-saffron">
                {t.common.next}
              </LocaleLink>
            </p>
          ) : null}
        </div>
        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-line">
            <h2 className="font-serif text-xl text-ink">{t.common.tags}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.length ? (
                tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-cream px-3 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted">{t.common.noTags}</p>
              )}
            </div>
          </div>
          <div className="rounded-[28px] bg-cream p-6 ring-1 ring-line">
            <h2 className="font-serif text-xl text-ink">{t.common.followJourney}</h2>
            <p className="mt-2 text-sm text-muted">{t.common.followJourneyBody}</p>
          </div>
          <ContextualCta
            title={t.common.blogCtaTitle}
            body={t.common.blogCtaBody}
            href="/naam-jaap"
            label={t.common.blogCtaLabel}
          />
        </aside>
      </div>
      <HubSeoBlock id="blog" />
    </div>
  );
}
