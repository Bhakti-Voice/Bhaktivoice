import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { hubMetadata } from "@/lib/i18n/hub";
import { PATHS } from "@/lib/seo/paths";

const DiaryClient = dynamic(
  () => import("@/components/sadhana/DiaryClient").then((mod) => mod.DiaryClient),
  { loading: () => <div className="mt-10 h-80 animate-pulse rounded-[32px] bg-sand" /> },
);

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("diary");
}

export default function DiaryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={pageCrumbs(["Sadhana", PATHS.sadhana], ["Diary", PATHS.diary])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">Bhakti Diary</h1>
      <div className="mt-10">
        <DiaryClient />
      </div>
      <HubSeoBlock id="diary" />
    </div>
  );
}
