import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/content/PlaceholderPage";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata({
  title: "Account",
  description: "Manage your Bhakti account details.",
  path: "/account",
  noIndex: true,
});
}

export default function AccountPage() {
  return (
    <PlaceholderPage
      title="Account"
      description="Name, email, and the quiet facts of a devotee profile. Sign in to keep them."
      href="/login"
      label="Sign in"
      crumbs={pageCrumbs(["Account", "/account"])}
    />
  );
}
