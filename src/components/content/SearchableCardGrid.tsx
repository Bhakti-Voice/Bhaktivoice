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
}: {
  items: ListingCardItem[];
  emptyKind?: keyof Messages["emptyLabels"];
  emptyText?: string;
  className?: string;
  placeholder: string;
}) {
  const t = useMessages();
  const [query, setQuery] = useState("");
  const [activeMeta, setActiveMeta] = useState<string | null>(null);

  const metaFilters = useMemo(() => {
    const set = new Set<string>();
    for (const item of items) {
      if (item.meta?.trim()) set.add(item.meta.trim());
      else if (item.group?.trim()) set.add(item.group.trim());
    }
    return Array.from(set);
  }, [items]);

  const shown = useMemo(
    () =>
      items.filter((item) => {
        const itemTag = item.meta?.trim() || item.group?.trim();
        const matchesTag = activeMeta ? itemTag?.toLowerCase() === activeMeta.toLowerCase() : true;
        if (!matchesTag) return false;
        return matchesListingQuery(
          [item.title, item.text, item.meta, item.slug, item.group, item.filters],
          query,
        );
      }),
    [items, query, activeMeta],
  );

  const searching = Boolean(query.trim() || activeMeta);
  const emptyMessage =
    searching && items.length
      ? t.common.listingSearchNone
      : emptyText || (emptyKind ? t.empty(t.emptyLabels[emptyKind]) : t.common.listingSearchNone);

  return (
    <div>
      <div className="mt-2 space-y-3">
        <ListingSearch
          value={query}
          onChange={setQuery}
          placeholder={placeholder}
          label={t.search}
        />

        {metaFilters.length > 2 ? (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveMeta(null)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide transition-all ${
                activeMeta === null
                  ? "bg-saffron text-white shadow-xs"
                  : "bg-white text-ink/75 ring-1 ring-line hover:bg-cream hover:text-ink"
              }`}
            >
              All
            </button>
            {metaFilters.slice(0, 10).map((meta) => (
              <button
                key={meta}
                type="button"
                onClick={() => setActiveMeta(activeMeta === meta ? null : meta)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide transition-all ${
                  activeMeta === meta
                    ? "bg-saffron text-white shadow-xs"
                    : "bg-white text-ink/75 ring-1 ring-line hover:bg-cream hover:text-ink"
                }`}
              >
                {meta}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {shown.length ? (
        <ListingCardGrid items={shown} className={className} />
      ) : (
        <div className="mt-8 rounded-3xl bg-white p-10 text-center ring-1 ring-line shadow-xs">
          <p className="text-base text-ink font-serif">{emptyMessage}</p>
          {searching ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveMeta(null);
              }}
              className="mt-3 inline-flex rounded-full bg-cream px-4 py-2 text-xs font-medium text-saffron-deep ring-1 ring-saffron/20 hover:bg-[#fff2e4]"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

