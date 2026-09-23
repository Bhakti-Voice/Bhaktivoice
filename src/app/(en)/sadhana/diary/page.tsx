import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { PATHS } from "@/lib/seo/paths";

const DiaryClient = dynamic(
  () => import("@/components/sadhana/DiaryClient").then((mod) => mod.DiaryClient),
  { loading: () => <div className="mt-10 h-80 animate-pulse rounded-[32px] bg-sand" /> },
);

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("diary");
}

export default async function DiaryPage() {
  const t = await getMessages();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={pageCrumbs([t.nav.sadhana, PATHS.sadhana], [t.nav.diary, PATHS.diary])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">{t.hubs.diary.h1}</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">{t.common.diaryWhereHint}</p>
      <div className="mt-10">
        <DiaryClient />
      </div>
      <HubSeoBlock id="diary" hideFaqs />
      <FaqList faqs={[...t.listingFaqs.diary]} title={t.common.faqTitle} />
    </div>
  );
}
