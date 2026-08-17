import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCategoryChips } from "@/components/blog/BlogCategoryChips";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { listBlog } from "@/lib/content";
import { getBlogPage, getBlogPageCount } from "@/lib/content/blog-pagination";
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
  const blogPosts = await listBlog();
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
      <p className="mt-3 text-sm text-muted">
        <Link href={PATHS.blog} className="text-saffron">
          Back to page 1
        </Link>
      </p>
      <div className="mt-8">
        <BlogCategoryChips key={posts.map((post) => post.title).join("|")} posts={posts} />
      </div>
      <div className="mt-10">
        <ContextualCta
          title="Start 108 Naam Jaap"
          body="Let the next sitting be shorter than the article you just finished."
          href="/naam-jaap"
          label="Start Jaap"
        />
      </div>
      <HubSeoBlock id="blog" />
    </div>
  );
}
