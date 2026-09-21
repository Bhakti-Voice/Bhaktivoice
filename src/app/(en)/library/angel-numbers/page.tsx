import type { Metadata } from "next";
import { AngelNumberListing } from "@/components/angel-numbers/AngelNumberListing";
import { listAngelNumbers } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { JsonLd } from "@/components/seo/JsonLd";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("angelNumbers");
}

export default async function AngelNumbersListingPage() {
  const items = await listAngelNumbers();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Angel Numbers & Divine Sequence Meanings",
    description: "Explore repeating angel numbers, spiritual guidance, and numerological insights.",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.title,
      url: `https://bhaktivoice.com${PATHS.angelNumbers}/${item.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <AngelNumberListing items={items} />
    </>
  );
}
