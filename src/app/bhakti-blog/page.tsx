import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogPromiseBar } from "@/components/blog/BlogPromiseBar";
import { EmptyListing } from "@/components/content/EmptyListing";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
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

  return (
    <div>
      <BlogListing
        posts={posts}
        title={t.hubs.blog.h1}
        subtitle={t.common.blogLead}
        hub="blog"
        crumbs={localizedCrumbs(t.homeName, [t.nav.blog, PATHS.blog])}
        allLabel={t.common.all}
        readMore={t.common.blogReadMore}
        saveLabel={t.common.blogSave}
        savedLabel={t.common.blogSaved}
        authorFallback={t.common.blogAuthorFallback}
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-10">
        <JsonLd
          data={itemListSchema(
            t.hubs.blog.h1,
            posts.map((post) => ({ name: post.title, url: `${PATHS.blog}/${post.slug}` })),
          )}
        />
        {!posts.length ? <EmptyListing kind="blog" /> : null}
        <ListingPager
          page={1}
          pages={pages}
          basePath={PATHS.blog}
          variant="path"
          previousLabel={t.common.previous}
          nextLabel={t.common.next}
          pageOf={t.common.pageOf}
        />
        <BlogPromiseBar items={t.common.blogPromises} />
        <HubSeoBlock id="blog" hideFaqs />
        <FaqList faqs={[...t.listingFaqs.blog]} title={t.common.faqTitle} />
      </div>
    </div>
  );
}
