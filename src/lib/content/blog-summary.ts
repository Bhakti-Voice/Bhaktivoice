import type { BlogPost } from "./types";

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  introduction: string;
  category: string;
  readingTime: string;
  heroImage: string;
  heroImageAlt: string;
  author: string;
  updatedAt: string;
  tags: string[];
  publishedAt?: string;
};

/**
 * Strips heavy fields (like full markdown/paragraph body, faqs, and relation arrays)
 * to keep HTML responses and Next.js client hydration payloads lightweight.
 */
export function toBlogSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    introduction: post.introduction || "",
    category: post.category || "",
    readingTime: post.readingTime || "",
    heroImage: post.heroImage || "",
    heroImageAlt: post.heroImageAlt || post.title || "",
    author: post.author || "",
    updatedAt: post.updatedAt || "",
    tags: Array.isArray(post.tags) ? post.tags : [],
    publishedAt: post.publishedAt || "",
  };
}
