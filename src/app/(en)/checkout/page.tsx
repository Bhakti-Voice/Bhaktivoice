import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/content/PlaceholderPage";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata({
  title: "Checkout",
  description: "Complete your Bhakti store order.",
  path: "/checkout",
  noIndex: true,
});
}

export default function CheckoutPage() {
  return (
    <PlaceholderPage
      title="Checkout is almost ready"
      description="We are still laying out a calm payment path. Your cart will wait without pressure."
      href="/cart"
      label="Return to cart"
      crumbs={pageCrumbs(["Checkout", "/checkout"])}
    />
  );
}
