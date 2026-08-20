"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ListingCard } from "@/components/content/ListingCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import type { SearchHit } from "@/lib/cms/client";

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const locale = useLocale();
  const t = useMessages();
  const [results, setResults] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(Boolean(query));

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    const params = new URLSearchParams({ q: query, locale });
    fetch(`/api/search?${params}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => {
        setResults(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!controller.signal.aborted) setResults([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [query, locale]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.search, "/search"])} />
      <h1 className="mt-4 font-serif text-4xl text-ink">{t.search}</h1>
      <p className="mt-3 text-muted">
        {query
          ? loading
            ? t.common.searchResults(query)
            : t.common.searchCount(results.length, query)
          : t.common.searchEmpty}
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
