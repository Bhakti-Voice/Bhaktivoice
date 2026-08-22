import type { Metadata } from "next";
import { SpiritualToolLoader } from "@/components/spiritual-tools/SpiritualToolLoader";
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
    title: t.hubs.kundliTool.title,
    description: t.hubs.kundliTool.description,
    path: PATHS.kundli,
    keywords: [...SPIRITUAL_TOOL_KEYWORDS.kundli],
  });
}

export default async function KundliPage() {
  const t = await getMessages();

  return (
    <div>
      <PageHero
        title={t.hubs.kundliTool.h1}
        subtitle={t.spiritualTools.privacyNotice}
        hub="spirituality"
        crumbs={localizedCrumbs(t.homeName, [t.nav.spiritualTools, PATHS.spiritualTools], [t.spiritualTools.tools.kundli.title, PATHS.kundli])}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:pb-12">
        <SpiritualToolLoader tool="kundli" />
        <FaqList faqs={[...SPIRITUAL_TOOL_FAQS.kundli]} title={t.common.faqTitle} className="mt-12" />
      </div>
    </div>
  );
}
