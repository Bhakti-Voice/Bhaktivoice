import type { Metadata } from "next";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { hubMetadata } from "@/lib/i18n/hub";
import { FaqList } from "@/components/seo/FaqList";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMessages, getLocale } from "@/lib/i18n/server";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";
import { listStotrams } from "@/lib/content";
import { StotramHubView } from "@/components/stotram/StotramHubView";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("stotram");
}

export default async function StotramPage() {
  const [allItems, t, locale] = await Promise.all([listStotrams(), getMessages(), getLocale()]);

  return (
    <div>
      <PageHero
        title={t.hubs.stotram.h1}
        hub="stotram"
        ornament
        crumbs={pageCrumbs([
          locale === "hi" ? "स्तोत्र संग्रह" : locale === "te" ? "స్తోత్రాలు" : "Stotram",
          PATHS.stotram,
        ])}
      >
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-amber-900/90 sm:text-base">
          {t.hubs.stotram.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <LocaleLink
            href={PATHS.naamJaap}
            className="rounded-full bg-amber-800 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-amber-900 sm:text-sm"
          >
            {locale === "hi"
              ? "डिजिटल नाम जाप"
              : locale === "te"
              ? "డిజిటల్ నామ జపం"
              : "Digital Naam Jaap Counter"}
          </LocaleLink>
          <LocaleLink
            href={PATHS.chalisa}
            className="rounded-full border border-amber-300 bg-white/90 px-4 py-2 text-xs font-semibold text-amber-950 shadow-xs transition-colors hover:bg-amber-50 sm:text-sm"
          >
            {locale === "hi"
              ? "चालीसा संग्रह"
              : locale === "te"
              ? "చాలీసా సంగ్రహం"
              : "Sacred Chalisa Sangrah"}
          </LocaleLink>
          <LocaleLink
            href={PATHS.mantras}
            className="rounded-full border border-amber-300 bg-white/90 px-4 py-2 text-xs font-semibold text-amber-950 shadow-xs transition-colors hover:bg-amber-50 sm:text-sm"
          >
            {locale === "hi"
              ? "वैदिक मंत्र"
              : locale === "te"
              ? "వేద మంత్రాలు"
              : "Vedic Mantras"}
          </LocaleLink>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 lg:px-8 lg:pb-16">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.stotram.h1,
            allItems.map((item) => ({ name: item.title, url: `${PATHS.stotram}/${item.slug}` })),
          )}
        />

        <StotramHubView stotrams={allItems} locale={locale} />

        <div className="mt-12">
          <FaqList faqs={[...t.listingFaqs.stotram]} title={t.common.faqTitle} />
        </div>
      </div>
    </div>
  );
}
