import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/search/SearchResults";
import { getMessages } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages();
  return localizedMetadata({
    title: t.common.searchTitle,
    description: t.common.searchDesc,
    path: "/search",
    noIndex: true,
  });
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto mt-16 h-40 max-w-7xl animate-pulse rounded-[32px] bg-sand" />}>
      <SearchResults />
    </Suspense>
  );
}
