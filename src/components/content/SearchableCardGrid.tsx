"use client";

import { useMemo, useState } from "react";
import { ListingSearch } from "@/components/content/ListingSearch";
import { ListingCardGrid, type ListingCardItem } from "@/components/content/ListingCardGrid";
import { matchesListingQuery } from "@/lib/content/listing-search";
import { useMessages } from "@/lib/i18n/client";
import type { Messages } from "@/lib/i18n/messages";

export function SearchableCardGrid({
  items,
  emptyKind,
  emptyText,
  className,
  placeholder,
  suggestions,
}: {
  items: ListingCardItem[];
  emptyKind?: keyof Messages["emptyLabels"];
  emptyText?: string;
  className?: string;
  placeholder: string;
  suggestions?: string[];
}) {
  const t = useMessages();
  const [query, setQuery] = useState("");
  const shown = useMemo(
    () =>
      items.filter((item) =>
        matchesListingQuery(
          [item.title, item.text, item.meta, item.slug, item.group, item.filters],
          query,
        ),
      ),
    [items, query],
  );
  const chips = useMemo(() => {
    if (suggestions?.length) return suggestions.slice(0, 6);
    const seen = new Set<string>();
    const next: string[] = [];
    for (const item of items) {
      const title = item.title?.trim();
      if (!title) continue;
      const key = title.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      next.push(title);
      if (next.length >= 5) break;
    }
    return next;
  }, [items, suggestions]);
  const searching = Boolean(query.trim());
  const emptyMessage =
    searching && items.length
      ? t.common.listingSearchNone
      : emptyText || (emptyKind ? t.empty(t.emptyLabels[emptyKind]) : t.common.listingSearchNone);

  return (
    <div>
      <div className="mt-1 sm:mt-2">
        <ListingSearch
          value={query}
          onChange={setQuery}
          placeholder={placeholder}
          label={t.search}
          suggestions={chips}
        />
      </div>
      {shown.length ? (
        <ListingCardGrid items={shown} className={className} />
      ) : (
        <p className="mt-10 rounded-[28px] bg-white px-6 py-12 text-center text-muted ring-1 ring-line">
          {emptyMessage}
        </p>
      )}
    </div>
  );
}
