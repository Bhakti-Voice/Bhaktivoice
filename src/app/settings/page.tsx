import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/content/PlaceholderPage";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata({
  title: "Settings",
  description: "Notification and practice preferences for your Bhakti account.",
  path: "/settings",
  noIndex: true,
});
}

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Reminders, language, and how loudly the day should knock. This desk is still being arranged."
      href="/profile"
      label="Back to your journey"
      crumbs={pageCrumbs(["Settings", "/settings"])}
    />
  );
}
