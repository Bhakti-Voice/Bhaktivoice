import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { TithiPageView } from "@/components/tithi/TithiPageView";
import { tithiPageFaqs, tithiPageMeta, toTithiPageData } from "@/lib/panchang";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/seo/site";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const data = toTithiPageData(locale);
  const meta = tithiPageMeta(data, locale);
  return localizedMetadata({
    title: meta.title,
    description: meta.description,
    path: PATHS.tithi,
    keywords: [
      "aaj ki tithi",
      data.currentTithi,
      data.currentPaksha,
      data.currentMasa,
      data.currentNakshatra,
      "hindu panchang",
      "delhi",
    ],
  });
}

export default async function TithiPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const data = toTithiPageData(locale);
  const faqs = tithiPageFaqs(data, locale);
  const meta = tithiPageMeta(data, locale);

  return (
    <div>
      <PageHero
        title={t.hubs.tithi.h1}
        subtitle={data.currentDate}
        hub="tithi"
        crumbs={localizedCrumbs(t.homeName, [t.nav.tithi, PATHS.tithi])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: meta.title,
          url: `${SITE.url}${PATHS.tithi}`,
          description: meta.description,
          dateModified: new Date().toISOString().slice(0, 10),
        }}
      />
      <div className="mx-auto max-w-4xl px-4 pt-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-saffron">{t.common.panchang}</p>
        <p className="mt-2 font-serif text-3xl text-ink sm:text-4xl">{data.currentTithi}</p>
        <p className="mt-1 text-muted">
          {data.currentPaksha} · {data.currentMasa} · {t.common.vikramSamvat} {data.currentVikramSamvat}
        </p>
      </div>
      <TithiPageView
        data={data}
        faqs={faqs}
        copy={{
          specialTitle: t.common.specialObservances,
          timingsTitle: t.common.tithiTimings,
          sunrise: t.common.sunrise,
          sunset: t.common.sunset,
          rahuKaal: t.common.rahuKaal,
          tithiStarts: t.common.tithiStarts,
          tithiEnds: t.common.tithiEnds,
          nextTithi: t.common.nextTithi,
          alignmentsTitle: t.common.alignments,
          masa: t.common.masa,
          paksha: t.common.paksha,
          nakshatra: t.common.nakshatra,
          vikramSamvat: t.common.vikramSamvat,
          upcomingTitle: t.common.upcomingTithis,
          upcomingLead: t.common.nextDaysSunrise,
          delhiNote: t.common.delhiPanchangNote,
          faqTitle: t.common.faqTitle,
          jaapTitle: t.common.tithiJaapTitle,
          jaapBody: t.common.tithiJaapBody,
          jaapLabel: t.common.startJaap,
        }}
      />
      <div className="mx-auto max-w-4xl px-4 pb-8 lg:px-8 lg:pb-12">
        <HubSeoBlock id="tithi" />
      </div>
    </div>
  );
}
