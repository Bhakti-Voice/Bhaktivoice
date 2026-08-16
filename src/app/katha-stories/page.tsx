import type { Metadata } from "next";
import { BookOpen, Headphones, Play } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { EmptyListing } from "@/components/content/EmptyListing";
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
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.katha.h1,
          kathaSeries.map((series) => ({ name: series.title, url: `${PATHS.katha}/${series.slug}` })),
        )}
      />
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.hubs.katha.h1, PATHS.katha])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">{t.hubs.katha.h1}</h1>

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
          <ul className="mt-5 grid gap-4">
            {kathaSeries.map((series) => (
              <li
                key={series.slug}
                className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line"
              >
                <div>
                  <h3 className="font-serif text-xl text-ink">{series.title}</h3>
                  <p className="mt-1 text-sm text-muted">{series.subtitle}</p>
                  <p className="mt-1 text-xs text-muted">
                    {series.duration}
                    {series.rating && series.rating !== "0" ? ` · ★ ${series.rating}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <LocaleLink
                    href={`${PATHS.katha}/${series.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm"
                  >
                    <BookOpen className="h-4 w-4" /> {t.common.read}
                  </LocaleLink>
                  <LocaleLink
                    href={`${PATHS.katha}/${series.slug}#episodes`}
                    className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm"
                  >
                    <Headphones className="h-4 w-4" /> {t.common.listen}
                  </LocaleLink>
                  <LocaleLink
                    href={`${PATHS.katha}/${series.slug}#episodes`}
                    className="inline-flex items-center gap-1 rounded-full bg-saffron px-4 py-2 text-sm text-white"
                  >
                    <Play className="h-4 w-4" /> {t.common.watch}
                  </LocaleLink>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyListing kind="katha" />
        )}
      </section>
      <HubSeoBlock id="katha" />
    </div>
  );
}
