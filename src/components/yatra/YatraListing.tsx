"use client";

import { useMemo, useState } from "react";
import { ListingCard } from "@/components/content/ListingCard";
import { useMessages } from "@/lib/i18n/client";
import type { ListingCardItem } from "@/components/content/ServerCardGrid";

export function YatraListing({ items, filters }: { items: ListingCardItem[]; filters: string[] }) {
  const t = useMessages();
  const [active, setActive] = useState("All");
  const chips = useMemo(() => ["All", ...filters.filter((item) => item !== "All")], [filters]);
  const shown =
    active === "All"
      ? items.filter((item) => item.group === "destination" || !item.group)
      : items.filter((item) => item.filters?.includes(active));

  return (
    <>
      {chips.length > 1 ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {chips.map((filter) => {
            const isActive = active === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`rounded-full px-4 py-2 text-sm ${
                  isActive ? "bg-saffron text-white" : "border border-line bg-sand text-ink"
                }`}
              >
                {filter === "All" ? t.common.all : filter}
              </button>
            );
          })}
        </div>
      ) : null}
      {shown.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {shown.map((item) => (
            <ListingCard
              key={item.slug}
              href={item.href}
              title={item.title}
              text={item.text}
              image={item.image}
              imageAlt={item.imageAlt ?? item.title}
              meta={item.meta}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-[28px] bg-white px-6 py-12 text-center text-muted ring-1 ring-line">
          {t.empty(t.emptyLabels.trips)}
        </p>
      )}
    </>
  );
}
