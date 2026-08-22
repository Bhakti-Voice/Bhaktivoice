import type { Metadata } from "next";
import { ToolCardGrid } from "@/components/spiritual-tools/ToolCard";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SPIRITUAL_TOOL_FAQS, SPIRITUAL_TOOL_KEYWORDS } from "@/lib/spiritual-tools/seo-content";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages();
  return localizedMetadata({
    title: t.hubs.spiritualTools.title,
    description: t.hubs.spiritualTools.description,
    path: PATHS.spiritualTools,
    keywords: [...SPIRITUAL_TOOL_KEYWORDS.landing],
  });
}

export default async function SpiritualToolsPage() {
  const t = await getMessages();
  const tools = [
    {
      href: PATHS.panchang,
      title: t.spiritualTools.tools.panchang.title,
      description: t.spiritualTools.tools.panchang.description,
      icon: "panchang" as const,
    },
    {
      href: PATHS.kundli,
      title: t.spiritualTools.tools.kundli.title,
      description: t.spiritualTools.tools.kundli.description,
      icon: "kundli" as const,
    },
    {
      href: PATHS.kundliMilan,
      title: t.spiritualTools.tools.milan.title,
      description: t.spiritualTools.tools.milan.description,
      icon: "milan" as const,
    },
  ];

  return (
    <div>
      <PageHero
        title={t.hubs.spiritualTools.h1}
        subtitle={t.spiritualTools.landingLead}
        hub="tithi"
        crumbs={localizedCrumbs(t.homeName, [t.nav.spiritualTools, PATHS.spiritualTools])}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:pb-12">
        <ToolCardGrid tools={tools} openLabel={t.spiritualTools.openTool} />
        <FaqList faqs={[...SPIRITUAL_TOOL_FAQS.landing]} title={t.common.faqTitle} className="mt-12" />
      </div>
    </div>
  );
}
