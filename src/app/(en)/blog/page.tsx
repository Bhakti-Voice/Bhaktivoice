import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogPromiseBar } from "@/components/blog/BlogPromiseBar";
import { EmptyListing } from "@/components/content/EmptyListing";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { listBlog } from "@/lib/content";
import { BLOG_PAGE_SIZE, getBlogPage, getBlogPageCount } from "@/lib/content/blog-pagination";
import { toBlogSummary } from "@/lib/content/blog-summary";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("blog");
}

export default async function BlogIndexPage() {
  const [allPosts, t] = await Promise.all([listBlog(), getMessages()]);
  const pages = getBlogPageCount(allPosts.length, BLOG_PAGE_SIZE);
  const pagePosts = getBlogPage(allPosts, 1, BLOG_PAGE_SIZE).map(toBlogSummary);
  const categories = Array.from(
    new Set(allPosts.map((p) => p.category?.trim()).filter(Boolean) as string[])
  );

  return (
    <div>
      <BlogListing
        posts={pagePosts}
        categories={categories}
        title={t.hubs.blog.h1}
        subtitle={t.common.blogLead}
        hub="blog"
        crumbs={localizedCrumbs(t.homeName, [t.nav.blog, PATHS.blog])}
        readMore={t.common.blogReadMore}
        saveLabel={t.common.blogSave}
        savedLabel={t.common.blogSaved}
        authorFallback={t.common.blogAuthorFallback}
        page={1}
        pages={pages}
        basePath={PATHS.blog}
        showFeatured
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-10">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.blog.h1,
            pagePosts.map((post) => ({ name: post.title, url: `${PATHS.blog}/${post.slug}` })),
          )}
        />
        {!pagePosts.length ? <EmptyListing kind="blog" /> : null}
        <BlogPromiseBar items={t.common.blogPromises} />
        <HubSeoBlock id="blog" hideFaqs />
        <FaqList faqs={[...t.listingFaqs.blog]} title={t.common.faqTitle} />
      </div>
    </div>
  );
}
