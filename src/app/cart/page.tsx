import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/content/PlaceholderPage";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata({
  title: "Your Cart",
  description: "Review malas, diyas and puja companions before checkout.",
  path: "/cart",
  noIndex: true,
});
}

export default function CartPage() {
  return (
    <PlaceholderPage
      title="Your cart is a quiet tray"
      description="Items you add from the store will rest here. Checkout is being prepared with the same unhurried care as a puja thali."
      href={PATHS.store}
      label="Visit the store"
      crumbs={pageCrumbs(["Cart", "/cart"])}
    />
  );
}
