import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogPromiseBar } from "@/components/blog/BlogPromiseBar";
import { EmptyListing } from "@/components/content/EmptyListing";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { listBlog } from "@/lib/content";
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
  const [posts, t] = await Promise.all([listBlog(), getMessages()]);

  return (
    <div>
      <BlogListing
        posts={posts}
        title={t.hubs.blog.h1}
        subtitle={t.common.blogLead}
        hub="blog"
        crumbs={localizedCrumbs(t.homeName, [t.nav.blog, PATHS.blog])}
        readMore={t.common.blogReadMore}
        saveLabel={t.common.blogSave}
        savedLabel={t.common.blogSaved}
        authorFallback={t.common.blogAuthorFallback}
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-10">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.blog.h1,
            posts.map((post) => ({ name: post.title, url: `${PATHS.blog}/${post.slug}` })),
          )}
        />
        {!posts.length ? <EmptyListing kind="blog" /> : null}
        <BlogPromiseBar items={t.common.blogPromises} />
        <HubSeoBlock id="blog" hideFaqs />
        <FaqList faqs={[...t.listingFaqs.blog]} title={t.common.faqTitle} />
      </div>
    </div>
  );
}
