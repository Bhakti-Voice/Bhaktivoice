import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Heart, MapPin, Users } from "lucide-react";
import { YatraPlannerForm } from "@/components/yatra/YatraPlannerForm";
import { listYatra } from "@/lib/content";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { hubMetadata } from "@/lib/i18n/hub";
import { PATHS } from "@/lib/seo/paths";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("planner");
}

const FEATURES = [
  { icon: MapPin, title: "Darshan first", text: "One major shrine at the centre of the trip." },
  { icon: Heart, title: "Rest included", text: "Evenings for a ghat, a mala, or sleep." },
  { icon: Users, title: "For the group", text: "Elders and children set the true pace." },
  { icon: Compass, title: "Local confirm", text: "Passes and aarti change — we do not invent clocks." },
];

export const dynamic = "force-dynamic";

export default async function YatraPlannerPage() {
  const trips = await listYatra();
  const destinations = Array.from(
    new Set(trips.map((page) => page.destination).filter(Boolean)),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={pageCrumbs(["Yatra", PATHS.yatra], ["Planner", PATHS.yatraPlanner])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">Plan Your Yatra</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <YatraPlannerForm destinations={destinations} />
        <div className="relative min-h-[360px] overflow-hidden rounded-[32px] bg-sand">
          <Image
            src="/images/yatra-map.png"
            alt="A map of sacred India for planning a yatra"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
            <feature.icon className="h-5 w-5 text-saffron" />
            <h2 className="mt-3 font-medium text-ink">{feature.title}</h2>
            <p className="mt-1 text-sm text-muted">{feature.text}</p>
          </div>
        ))}
      </div>
      <HubSeoBlock id="planner" />
    </div>
  );
}
