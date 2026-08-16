import type { Metadata } from "next";
import { ProfileView } from "@/components/profile/ProfileView";
import { localizedMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata({
  title: "My Bhakti Journey",
  description: "Your jaap, sankalp, and the paths you keep returning to.",
  path: "/profile",
  noIndex: true,
});
}

export default function ProfilePage() {
  return <ProfileView />;
}
