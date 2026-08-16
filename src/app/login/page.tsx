import type { Metadata } from "next";
import { LoginClient } from "@/components/auth/LoginClient";
import { localizedMetadata } from "@/lib/seo/metadata";

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
