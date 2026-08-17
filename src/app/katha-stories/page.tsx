import type { Metadata } from "next";
import { Headphones } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingCard } from "@/components/content/ListingCard";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { listKatha } from "@/lib/content";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("katha");
}

const TONES = [
  "bg-[#fce7f3] text-[#be185d]",
  "bg-[#ffedd5] text-[#c2410c]",
  "bg-[#dbeafe] text-[#1d4ed8]",
  "bg-[#ffedd5] text-[#9a3412]",
  "bg-[#fef3c7] text-[#b45309]",
  "bg-[#fee2e2] text-[#b91c1c]",
];

export default async function KathaIndexPage() {
  const [kathaSeries, t] = await Promise.all([listKatha(), getMessages()]);

  return (
    <div>
      <PageHero title={t.hubs.katha.h1} hub="katha" crumbs={localizedCrumbs(t.homeName, [t.hubs.katha.h1, PATHS.katha])} />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.katha.h1,
          kathaSeries.map((series) => ({ name: series.title, url: `${PATHS.katha}/${series.slug}` })),
        )}
      />

      {kathaSeries.length ? (
        <div className="mt-10 flex flex-wrap gap-4">
          {kathaSeries.map((series, index) => (
            <LocaleLink
              key={series.slug}
              href={`${PATHS.katha}/${series.slug}`}
              className="flex w-24 flex-col items-center gap-2"
            >
              <span
                className={`inline-flex h-16 w-16 items-center justify-center rounded-full text-sm font-medium ${TONES[index % TONES.length]}`}
              >
                {(series.category || series.title).slice(0, 1)}
              </span>
              <span className="text-sm text-ink">{series.category || series.title}</span>
            </LocaleLink>
          ))}
        </div>
      ) : null}

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">{t.common.popularKatha}</h2>
        {kathaSeries.length ? (
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {kathaSeries.map((series) => (
              <ListingCard
                key={series.slug}
                href={`${PATHS.katha}/${series.slug}`}
                title={series.title}
                text={series.subtitle || series.introduction}
                image={series.heroImage}
                imageAlt={series.heroImageAlt}
                meta={series.category}
                footer={
                  <LocaleLink
                    href={`${PATHS.katha}/${series.slug}?listen=1`}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-saffron px-3 py-2 text-sm font-medium text-white"
                  >
                    <Headphones className="h-4 w-4" />
                    {t.common.listen}
                  </LocaleLink>
                }
              />
            ))}
          </div>
        ) : (
          <EmptyListing kind="katha" />
        )}
      </section>
      <HubSeoBlock id="katha" />
      </div>
    </div>
  );
}
