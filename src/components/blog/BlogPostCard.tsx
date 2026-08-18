import { ChevronRight } from "lucide-react";
import { CoverMedia } from "@/components/media/CoverMedia";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ProseText } from "@/components/content/SectionBody";
import { BlogSaveButton } from "@/components/blog/BlogSaveButton";
import type { BlogPost } from "@/lib/content/types";
import { PATHS } from "@/lib/seo/paths";

export function BlogPostCard({
  post,
  readMore,
  saveLabel,
  savedLabel,
  authorFallback,
}: {
  post: BlogPost;
  readMore: string;
  saveLabel: string;
  savedLabel: string;
  authorFallback: string;
}) {
  const href = `${PATHS.blog}/${post.slug}`;
  const author = post.author?.trim() || authorFallback;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line transition hover:-translate-y-0.5">
      <LocaleLink href={href} className="block cursor-pointer">
        <CoverMedia
          src={post.heroImage}
          alt={post.heroImageAlt || post.title}
          className="aspect-[16/10] w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
        />
        <div className="px-3.5 pt-2.5 sm:px-4 sm:pt-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-saffron">
            {post.category}
            {post.readingTime ? ` • ${post.readingTime}` : ""}
          </p>
          <h2 className="listing-card-title mt-1 line-clamp-2 font-serif text-base leading-snug text-ink sm:text-lg">
            {post.title}
          </h2>
          <ProseText
            text={post.excerpt || post.introduction}
            className="listing-card-text mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted"
          />
        </div>
      </LocaleLink>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line px-3.5 py-2.5 sm:px-4">
        <p className="flex min-w-0 items-center gap-2 text-xs text-muted">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff4ea] text-[10px] font-medium text-saffron-deep ring-1 ring-[#f3d2b3]">
            {author.slice(0, 1).toUpperCase()}
          </span>
          <span className="truncate">{author}</span>
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <BlogSaveButton slug={post.slug} saveLabel={saveLabel} savedLabel={savedLabel} />
          <LocaleLink
            href={href}
            className="inline-flex items-center gap-0.5 text-sm font-medium text-saffron-deep hover:text-saffron"
          >
            {readMore}
            <ChevronRight className="h-4 w-4" />
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}
