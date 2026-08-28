import { ChevronRight, Clock, Sparkles } from "lucide-react";
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
    <article className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-b from-[#fffefc] to-[#fff9f1] border border-[#ecd9be] hover:border-amber-400/90 shadow-[0_4px_18px_rgba(217,119,6,0.06)] hover:shadow-[0_16px_36px_rgba(217,119,6,0.14)] hover:-translate-y-1.5 transition-all duration-300 select-none">
      <LocaleLink href={href} className="flex flex-col flex-1 cursor-pointer">
        {/* Cover Media */}
        <div className="relative overflow-hidden aspect-[16/10] w-full bg-amber-50/50">
          <CoverMedia
            src={post.heroImage}
            alt={post.heroImageAlt || post.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {post.category ? (
            <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-saffron-deep shadow-xs backdrop-blur-md border border-amber-200/80">
              {post.category}
            </span>
          ) : null}
        </div>

        {/* Content Body */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          {post.readingTime ? (
            <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-stone-500 mb-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              <span>{post.readingTime}</span>
            </div>
          ) : null}

          <h2 className="font-serif text-[17px] sm:text-[18px] font-bold leading-snug text-[#2c1810] group-hover:text-saffron-deep transition-colors line-clamp-2">
            {post.title}
          </h2>

          <ProseText
            text={post.excerpt || post.introduction}
            className="mt-2 text-xs sm:text-[13px] leading-relaxed text-stone-600 line-clamp-2"
          />
        </div>
      </LocaleLink>

      {/* Card Footer: Author & Save Action */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-amber-100/75 px-4 py-3 sm:px-5">
        <p className="flex min-w-0 items-center gap-2 text-xs text-stone-600">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-900 ring-1 ring-amber-200">
            {author.slice(0, 1).toUpperCase()}
          </span>
          <span className="truncate font-medium">{author}</span>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <BlogSaveButton slug={post.slug} saveLabel={saveLabel} savedLabel={savedLabel} />
          <LocaleLink
            href={href}
            className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-bold text-saffron-deep transition-all group-hover:translate-x-0.5 hover:text-saffron"
          >
            <span>{readMore}</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}
