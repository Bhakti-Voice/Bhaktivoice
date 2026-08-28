import { ChevronRight, Clock } from "lucide-react";
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
    <article className="group card-spiritual flex min-w-0 flex-col overflow-hidden rounded-2xl sm:rounded-[22px] bg-white ring-1 ring-line/70 transition-all duration-300 hover:shadow-[0_14px_32px_rgba(211,84,0,0.10)] hover:border-saffron/40 hover:-translate-y-1">
      <LocaleLink href={href} className="block cursor-pointer">
        <div className="relative overflow-hidden">
          <CoverMedia
            src={post.heroImage}
            alt={post.heroImageAlt || post.title}
            className="aspect-[16/10] w-full transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          />
          {post.category ? (
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-saffron-deep shadow-sm backdrop-blur-md ring-1 ring-saffron/20">
              {post.category}
            </span>
          ) : null}
        </div>
        <div className="px-4 pt-3.5 sm:px-5 sm:pt-4">
          {post.readingTime ? (
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
              <Clock className="h-3.5 w-3.5 text-saffron" />
              <span>{post.readingTime}</span>
            </div>
          ) : null}
          <h2 className="listing-card-title mt-1.5 line-clamp-2 font-serif text-lg font-bold leading-snug text-ink transition-colors group-hover:text-saffron-deep sm:text-xl">
            {post.title}
          </h2>
          <ProseText
            text={post.excerpt || post.introduction}
            className="listing-card-text mt-2 line-clamp-2 text-sm leading-relaxed text-muted/90"
          />
        </div>
      </LocaleLink>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#f0e6d9] px-4 py-3 sm:px-5">
        <p className="flex min-w-0 items-center gap-2 text-xs text-muted">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff2e4] text-[11px] font-bold text-saffron-deep ring-1 ring-[#f3d2b3]">
            {author.slice(0, 1).toUpperCase()}
          </span>
          <span className="truncate font-medium">{author}</span>
        </p>
        <div className="flex shrink-0 items-center gap-1.5">
          <BlogSaveButton slug={post.slug} saveLabel={saveLabel} savedLabel={savedLabel} />
          <LocaleLink
            href={href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-saffron-deep transition-all group-hover:translate-x-0.5 hover:text-saffron"
          >
            <span>{readMore}</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}

