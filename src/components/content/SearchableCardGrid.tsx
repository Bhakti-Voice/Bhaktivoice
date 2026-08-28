"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
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
  const [expandedTags, setExpandedTags] = useState(false);

  const metaFilters = useMemo(() => {
    const set = new Set<string>();
    for (const item of items) {
      if (item.meta?.trim()) set.add(item.meta.trim());
      else if (item.group?.trim()) set.add(item.group.trim());
    }
    return Array.from(set);
  }, [items]);

  const INITIAL_TAGS_LIMIT = 3;
  const displayFilters = expandedTags ? metaFilters : metaFilters.slice(0, INITIAL_TAGS_LIMIT);
  const hasExtraFilters = metaFilters.length > INITIAL_TAGS_LIMIT;

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
      <div className="mt-2 space-y-3.5">
        <ListingSearch
          value={query}
          onChange={setQuery}
          placeholder={placeholder}
          label={t.search}
        />

        {/* Category Pill Filters */}
        {metaFilters.length > 1 ? (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveMeta(null)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide transition-all ${
                  activeMeta === null
                    ? "bg-gradient-to-r from-saffron to-saffron-deep text-white shadow-xs ring-1 ring-saffron/30"
                    : "bg-white text-stone-700 ring-1 ring-stone-200/80 hover:bg-amber-50 hover:text-saffron-deep"
                }`}
              >
                All
              </button>
              {displayFilters.map((meta) => (
                <button
                  key={meta}
                  type="button"
                  onClick={() => setActiveMeta(activeMeta === meta ? null : meta)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide transition-all ${
                    activeMeta === meta
                      ? "bg-gradient-to-r from-saffron to-saffron-deep text-white shadow-xs ring-1 ring-saffron/30"
                      : "bg-white text-stone-700 ring-1 ring-stone-200/80 hover:bg-amber-50 hover:text-saffron-deep"
                  }`}
                >
                  {meta}
                </button>
              ))}

              {hasExtraFilters && (
                <button
                  type="button"
                  onClick={() => setExpandedTags(!expandedTags)}
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-1 text-xs font-semibold text-saffron-deep bg-amber-50 hover:bg-amber-100 ring-1 ring-amber-200/80 transition-colors shadow-2xs"
                >
                  <span>{expandedTags ? "Show Less" : `+${metaFilters.length - INITIAL_TAGS_LIMIT} More`}</span>
                </button>
              )}
            </div>

            {/* Quick Result Counter */}
            <span className="text-[11.5px] font-medium text-stone-500">
              {shown.length} / {items.length}
            </span>
          </div>
        ) : null}
      </div>

      {shown.length ? (
        <ListingCardGrid items={shown} className={className} />
      ) : (
        <div className="mt-8 rounded-[28px] bg-white p-10 text-center ring-1 ring-stone-200/80 shadow-xs">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 ring-1 ring-amber-200/60 text-saffron">
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="text-base text-ink font-serif font-medium">{emptyMessage}</p>
          {searching ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveMeta(null);
              }}
              className="mt-4 inline-flex rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 text-xs font-semibold text-saffron-deep ring-1 ring-saffron/20 hover:bg-amber-100 transition-colors"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
