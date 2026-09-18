import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
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
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";
import { withLocale } from "@/lib/i18n/config";

export const revalidate = 1800;

type Props = {
  params: Promise<{ page: string }>;
};

export async function generateStaticParams() {
  const posts = await listBlog();
  const pages = getBlogPageCount(posts.length, BLOG_PAGE_SIZE);
  const params: { page: string }[] = [];
  for (let i = 2; i <= pages; i++) {
    params.push({ page: String(i) });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: rawPage } = await params;
  const page = parseInt(rawPage, 10);
  if (!Number.isInteger(page) || page < 1) {
    return hubMetadata("blog");
  }
  const [t, posts] = await Promise.all([getMessages(), listBlog()]);
  const pages = getBlogPageCount(posts.length, BLOG_PAGE_SIZE);

  if (page === 1) {
    return hubMetadata("blog");
  }

  const pageText = t.common.pageOf(page, pages);
  const title = `${t.hubs.blog.title} — ${pageText}`;

  return hubMetadata("blog", {
    path: `${PATHS.blog}/page/${page}`,
    title,
  });
}

export default async function BlogPagedPage({ params }: Props) {
  const { page: rawPage } = await params;
  const page = parseInt(rawPage, 10);
  const locale = await getLocale();

  if (page === 1) {
    permanentRedirect(withLocale(PATHS.blog, locale));
  }

  const [posts, t] = await Promise.all([listBlog(), getMessages()]);
  const pages = getBlogPageCount(posts.length, BLOG_PAGE_SIZE);

  if (!Number.isInteger(page) || page < 1 || (pages > 0 && page > pages)) {
    notFound();
  }

  const pagePosts = getBlogPage(posts, page, BLOG_PAGE_SIZE).map(toBlogSummary);
  const categories = Array.from(
    new Set(posts.map((p) => p.category?.trim()).filter(Boolean) as string[])
  );

  const pageText = t.common.pageOf(page, pages);
  const pageTitle = `${t.hubs.blog.h1} (${pageText})`;

  return (
    <div>
      <BlogListing
        posts={pagePosts}
        categories={categories}
        title={pageTitle}
        subtitle={t.common.blogLead}
        hub="blog"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.blog, PATHS.blog],
          [pageText, `${PATHS.blog}/page/${page}`]
        )}
        readMore={t.common.blogReadMore}
        saveLabel={t.common.blogSave}
        savedLabel={t.common.blogSaved}
        authorFallback={t.common.blogAuthorFallback}
        page={page}
        pages={pages}
        basePath={PATHS.blog}
        showFeatured={false}
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-10">
        <JsonLd
          data={await localizedItemListSchema(
            pageTitle,
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
