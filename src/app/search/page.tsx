import type { Metadata } from "next";
import { searchIndex } from "@/lib/content";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const t = await getMessages();
  return localizedMetadata({
    title: query ? t.common.searchResults(query) : t.common.searchTitle,
    description: t.common.searchDesc,
    path: "/search",
    noIndex: true,
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const [results, t] = await Promise.all([query ? searchIndex(query) : Promise.resolve([]), getMessages()]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.search, "/search"])} />
      <h1 className="mt-4 font-serif text-4xl text-ink">{t.search}</h1>
      <p className="mt-3 text-muted">
        {query ? t.common.searchCount(results.length, query) : t.common.searchEmpty}
      </p>
      <ul className="mt-8 space-y-4">
        {results.map((item) => (
          <li key={item.href}>
            <LocaleLink
              href={item.href}
              className="block rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line hover:ring-saffron"
            >
              <p className="text-xs uppercase tracking-wide text-saffron">{item.kind}</p>
              <h2 className="mt-1 font-serif text-xl text-ink">{item.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{item.introduction}</p>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
