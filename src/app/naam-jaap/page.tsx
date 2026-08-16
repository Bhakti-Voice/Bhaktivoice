import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { JaapSidebar } from "@/components/jaap/JaapSidebar";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

const JaapCounter = dynamic(
  () => import("@/components/jaap/JaapCounter").then((mod) => mod.JaapCounter),
  { loading: () => <div className="min-h-[420px] animate-pulse rounded-[32px] bg-sand" /> },
);

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("naamJaap");
}

export default async function NaamJaapPage() {
  const t = await getMessages();
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
      <JsonLd
        data={itemListSchema(t.jaap.counter, [
          { name: t.jaap.counter, url: PATHS.naamJaap },
          { name: t.hubs.mala.h1, url: PATHS.mala },
        ])}
      />
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.nav.naamJaap, PATHS.naamJaap])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">{t.jaap.counter}</h1>
      <div className="mt-8 grid gap-6 overflow-visible lg:grid-cols-[210px_minmax(0,1fr)]">
        <JaapSidebar />
        <JaapCounter />
      </div>
      <HubSeoBlock id="naam-jaap" />
    </div>
  );
}
