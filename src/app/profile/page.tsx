import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { localizedMetadata } from "@/lib/seo/metadata";

const ProfileView = dynamic(
  () => import("@/components/profile/ProfileView").then((mod) => mod.ProfileView),
  { loading: () => <div className="mx-auto mt-10 h-96 max-w-5xl animate-pulse rounded-[32px] bg-sand" /> },
);

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
