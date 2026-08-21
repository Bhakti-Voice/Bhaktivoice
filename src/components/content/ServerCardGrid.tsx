import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingCardGrid, type ListingCardItem } from "@/components/content/ListingCardGrid";
import type { Messages } from "@/lib/i18n/messages";

export type { ListingCardItem };

export function ServerCardGrid({
  items,
  emptyKind,
  emptyText,
  className = "mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3",
}: {
  items: ListingCardItem[];
  emptyKind?: keyof Messages["emptyLabels"];
  emptyText?: string;
  className?: string;
}) {
  if (!items.length) {
    return emptyText ? (
      <p className="mt-10 rounded-[28px] bg-white px-6 py-12 text-center text-muted ring-1 ring-line">{emptyText}</p>
    ) : (
      <EmptyListing kind={emptyKind} />
    );
  }

  return <ListingCardGrid items={items} className={className} />;
}
