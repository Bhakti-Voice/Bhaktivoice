import { Headphones } from "lucide-react";
import { ListingCard } from "@/components/content/ListingCard";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { AddToCartButton } from "@/components/store/AddToCartButton";

export type ListingCardItem = {
  slug: string;
  href: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  meta?: string;
  badge?: string;
  listenHref?: string;
  listenLabel?: string;
  productName?: string;
  outOfStock?: boolean;
  filters?: string[];
  group?: string;
};

export function ListingCardGrid({
  items,
  className = "mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3",
}: {
  items: ListingCardItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item) => (
        <ListingCard
          key={item.slug}
          href={item.href}
          title={item.title}
          text={item.text}
          image={item.image}
          imageAlt={item.imageAlt ?? item.title}
          meta={item.meta}
          badge={item.badge}
          footer={
            item.listenHref ? (
              <LocaleLink
                href={item.listenHref}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-saffron px-3 py-2 text-sm font-medium text-white"
              >
                <Headphones className="h-4 w-4" />
                {item.listenLabel}
              </LocaleLink>
            ) : item.productName ? (
              <AddToCartButton slug={item.slug} name={item.productName} outOfStock={item.outOfStock} />
            ) : undefined
          }
        />
      ))}
    </div>
  );
}
