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
    title: t.hubs.kundliMilanTool.title,
    description: t.hubs.kundliMilanTool.description,
    path: PATHS.kundliMilan,
    keywords: [...SPIRITUAL_TOOL_KEYWORDS.milan],
  });
}

export default async function KundliMilanPage() {
  const t = await getMessages();

  return (
    <div>
      <PageHero
        title={t.hubs.kundliMilanTool.h1}
        subtitle={t.spiritualTools.privacyNotice}
        hub="community"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [t.spiritualTools.tools.milan.title, PATHS.kundliMilan],
        )}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:pb-12">
        <SpiritualToolLoader tool="kundliMilan" />
        <FaqList faqs={[...SPIRITUAL_TOOL_FAQS.milan]} title={t.common.faqTitle} className="mt-12" />
      </div>
    </div>
  );
}
