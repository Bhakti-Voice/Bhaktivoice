import type { Metadata } from "next";
import { JaapCounter } from "@/components/jaap/JaapCounter";
import { JaapSidebar } from "@/components/jaap/JaapSidebar";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { hubMetadata } from "@/lib/i18n/hub";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("mala");
}

export default function MalaModePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <div className="grid gap-8 overflow-visible lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="order-2 min-w-0 lg:order-1">
          <JaapSidebar />
        </div>
        <div className="order-1 min-w-0 lg:order-2">
          <Breadcrumbs items={pageCrumbs(["Naam Jaap", "/naam-jaap"], ["Mala Jaap", "/naam-jaap/mala"])} />
          <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">Mala Jaap</h1>
          <div className="mt-8">
            <JaapCounter mode="mala" />
          </div>
          <HubSeoBlock id="mala" />
        </div>
      </div>
    </div>
  );
}
