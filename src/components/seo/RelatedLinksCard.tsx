import { LocaleLink } from "@/components/i18n/LocaleLink";

export type RelatedPost = {
  title: string;
  url: string;
};

/**
 * SEO-friendly related content sidebar: aside → nav → h2 → ul/li → descriptive anchors.
 * Internal locale links only (no target="_blank", no noopener/noreferrer).
 */
export function RelatedLinksCard({
  relatedPosts,
  title = "Related Reading",
}: {
  relatedPosts?: RelatedPost[] | null;
  /** @deprecated Prefer relatedPosts; maps text→title, href→url */
  items?: { text: string; href: string }[] | null;
  title?: string;
}) {
  const posts =
    relatedPosts?.filter((post) => post.title?.trim() && post.url?.trim()) ??
    itemsToPosts(items);

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

function itemsToPosts(items?: { text: string; href: string }[] | null): RelatedPost[] {
  return (items ?? [])
    .filter((item) => item.text?.trim() && item.href?.trim())
    .map((item) => ({ title: item.text, url: item.href }));
}
