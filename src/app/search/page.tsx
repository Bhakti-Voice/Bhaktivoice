import type { Metadata } from "next";
import { searchIndex } from "@/lib/content";
import { ListingCard } from "@/components/content/ListingCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
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
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.search, "/search"])} />
      <h1 className="mt-4 font-serif text-4xl text-ink">{t.search}</h1>
      <p className="mt-3 text-muted">
        {query ? t.common.searchCount(results.length, query) : t.common.searchEmpty}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {results.map((item) => (
          <ListingCard
            key={item.href}
            href={item.href}
            title={item.title}
            text={item.introduction}
            imageAlt={item.title}
            meta={item.kind}
          />
        ))}
      </div>
    </div>
  );
}
