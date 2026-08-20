import type { Metadata } from "next";
import { QuotesExplorer } from "@/components/quotes/QuotesExplorer";
import { listQuotesPage } from "@/lib/cms/client";
import { hubMetadata } from "@/lib/i18n/hub";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("quotes");
}

export default async function DailyQuotesPage() {
  const initial = await listQuotesPage("", 0, 30);
  return <QuotesExplorer initial={initial} />;
}
