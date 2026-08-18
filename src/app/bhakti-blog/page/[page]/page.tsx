import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCategoryChips } from "@/components/blog/BlogCategoryChips";
import { BlogPromiseBar } from "@/components/blog/BlogPromiseBar";
import { ListingPager } from "@/components/content/ListingPager";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { listBlog } from "@/lib/content";
import { getBlogPage, getBlogPageCount } from "@/lib/content/blog-pagination";
import { getMessages } from "@/lib/i18n/server";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);
  return localizedMetadata({
    title: `Bhakti Blog — Page ${pageNumber}`,
    description: `More yatra, mantra and sadhana essays from Bhakti. Page ${pageNumber} of the journal.`,
    path: `${PATHS.blog}/page/${pageNumber}`,
  });
}

export default async function BlogPagedPage({ params }: Props) {
  const { page } = await params;
  const pageNumber = Number(page);
  const [blogPosts, t] = await Promise.all([listBlog(), getMessages()]);
  const total = getBlogPageCount(blogPosts.length);
  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > total) {
    notFound();
  }
  const posts = getBlogPage(blogPosts, pageNumber);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={itemListSchema(
          `Bhakti blog page ${pageNumber}`,
          posts.map((post) => ({ name: post.title, url: `${PATHS.blog}/${post.slug}` })),
        )}
      />
      <Breadcrumbs
        items={pageCrumbs(["Blog", PATHS.blog], [`Page ${pageNumber}`, `${PATHS.blog}/page/${pageNumber}`])}
      />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">Bhakti Blog · Page {pageNumber}</h1>
      <div className="mt-8">
        <BlogCategoryChips
          key={posts.map((post) => post.slug).join("|")}
          posts={posts}
          allLabel={t.common.all}
          readMore={t.common.blogReadMore}
          saveLabel={t.common.blogSave}
          savedLabel={t.common.blogSaved}
          authorFallback={t.common.blogAuthorFallback}
        />
        <ListingPager
          page={pageNumber}
          pages={total}
          basePath={PATHS.blog}
          previousLabel={t.common.previous}
          nextLabel={t.common.next}
          pageOf={t.common.pageOf}
        />
      </div>
      <BlogPromiseBar items={t.common.blogPromises} />
      <HubSeoBlock id="blog" />
    </div>
  );
}
