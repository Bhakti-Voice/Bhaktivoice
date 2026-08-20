import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { localizedMetadata } from "@/lib/seo/metadata";

const LoginClient = dynamic(
  () => import("@/components/auth/LoginClient").then((mod) => mod.LoginClient),
  { loading: () => <div className="mx-auto mt-16 h-80 max-w-md animate-pulse rounded-[32px] bg-sand" /> },
);

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata({
  title: "Sign in to Bhakti Voice",
  description: "Continue with Google to save jaap counts, sankalps, and your diary.",
  path: "/login",
  noIndex: true,
});
}

export default function LoginPage() {
  return <LoginClient />;
}
