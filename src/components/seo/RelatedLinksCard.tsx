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
      className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-line"
    >
      <nav aria-label="Related articles">
        <h2 className="font-serif text-xl text-ink">{title}</h2>
        <ul className="mt-3 space-y-2">
          {posts.map((post) => (
            <li key={`${post.url}-${post.title}`}>
              <LocaleLink
                href={post.url}
                className="block text-sm leading-snug text-lotus underline-offset-2 hover:underline"
              >
                {post.title}
              </LocaleLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
