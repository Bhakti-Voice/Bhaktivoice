"use client";

import { useMemo, useState } from "react";
import { ListingSearch } from "@/components/content/ListingSearch";
import { ServerCardGrid, type ListingCardItem } from "@/components/content/ServerCardGrid";
import { matchesListingQuery } from "@/lib/content/listing-search";
import { useMessages } from "@/lib/i18n/client";
import type { Messages } from "@/lib/i18n/messages";

export function SearchableCardGrid({
  items,
  emptyKind,
  emptyText,
  className,
  placeholder,
}: {
  items: ListingCardItem[];
  emptyKind?: keyof Messages["emptyLabels"];
  emptyText?: string;
  className?: string;
  placeholder: string;
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
  const searching = Boolean(query.trim());

  return (
    <div>
      <div className="mt-6">
        <ListingSearch value={query} onChange={setQuery} placeholder={placeholder} label={t.search} />
      </div>
      <ServerCardGrid
        items={shown}
        emptyKind={emptyKind}
        emptyText={searching && items.length ? t.common.listingSearchNone : emptyText}
        className={className}
      />
    </div>
  );
}
