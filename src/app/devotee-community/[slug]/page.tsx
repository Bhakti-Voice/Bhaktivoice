import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityRoom } from "@/components/community/CommunityRoom";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getCommunityGroup } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/seo/metadata";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const group = await getCommunityGroup(slug);
  if (!group) return { title: "Community not found" };
  return localizedMetadata({
    title: `${group.name} — Devotee Community`,
    description: group.text || "A peaceful sangha on Bhakti Voice.",
    path: `${PATHS.community}/${group.slug}`,
  });
}

export default async function CommunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const [group, t] = await Promise.all([getCommunityGroup(slug), getMessages()]);
  if (!group) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs
        items={pageCrumbs([t.nav.community, PATHS.community], [group.name, `${PATHS.community}/${group.slug}`])}
      />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">{group.name}</h1>
      <div className="mt-8">
        <CommunityRoom slug={group.slug} name={group.name} text={group.text} />
      </div>
    </div>
  );
}
