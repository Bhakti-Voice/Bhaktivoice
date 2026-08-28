import { BookMarked, ChevronRight } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export type RelatedPost = {
  title: string;
  url: string;
};

/**
 * SEO-friendly related content sidebar: aside → nav → h2 → ul/li → descriptive anchors.
 * Renders only when relatedLink is true and there is at least one post.
 * Internal locale links only (no target="_blank", no noopener/noreferrer).
 */
export function RelatedLinksCard({
  relatedLink = false,
  relatedPosts,
  title = "Related Reading",
}: {
  relatedLink?: boolean;
  relatedPosts?: RelatedPost[] | null;
  title?: string;
}) {
  if (!relatedLink) return null;

  const posts = (relatedPosts ?? []).filter(
    (post) => post.title?.trim() && post.url?.trim(),
  );

  if (!posts.length) return null;

  return (
    <aside
      aria-label="Related Content"
      className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-[#e8dfd2]"
    >
      <nav aria-label="Related articles">
        <div className="flex items-center gap-2">
          <BookMarked className="h-4 w-4 text-saffron" />
          <h2 className="font-serif text-lg font-bold text-ink">{title}</h2>
        </div>
        <ul className="mt-3.5 space-y-2.5">
          {posts.map((post) => (
            <li key={`${post.url}-${post.title}`}>
              <LocaleLink
                href={post.url}
                className="group flex items-start gap-2 rounded-xl p-2 text-xs sm:text-sm font-medium leading-snug text-ink/85 transition-colors hover:bg-cream hover:text-saffron-deep"
              >
                <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saffron/60 transition-transform group-hover:translate-x-0.5 group-hover:text-saffron-deep" />
                <span className="line-clamp-2">{post.title}</span>
              </LocaleLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

