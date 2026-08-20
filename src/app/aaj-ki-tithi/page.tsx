import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { TithiPageView } from "@/components/tithi/TithiPageView";
import {
  tithiPageFaqs,
  tithiPageGraph,
  tithiPageMeta,
  tithiPageProse,
  toTithiPageData,
} from "@/lib/panchang";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const data = toTithiPageData(locale);
  const meta = tithiPageMeta(data, locale);
  return localizedMetadata({
    title: meta.title,
    description: meta.description,
    path: PATHS.tithi,
    absoluteTitle: true,
    keywords: [
      "aaj ki tithi",
      "today panchang",
      "hindu calendar",
      data.currentTithi,
      data.currentPaksha,
      data.currentMasa,
      data.currentNakshatra,
      ...data.specialFestivals,
      "delhi",
    ],
    modifiedTime: data.isoDate,
  });
}

export default async function TithiPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const data = toTithiPageData(locale);
  const faqs = tithiPageFaqs(data, locale);
  const crumbs = localizedCrumbs(t.homeName, [t.nav.tithi, PATHS.tithi]);

  return (
    <div>
      <JsonLd data={tithiPageGraph(data, faqs, crumbs, locale)} />
      <PageHero
        title={t.hubs.tithi.h1}
        subtitle={data.currentDate}
        hub="tithi"
        crumbs={crumbs}
        breadcrumbJsonLd={false}
      />
      <TithiPageView
        data={data}
        faqs={faqs}
        prose={tithiPageProse(data, locale)}
        copy={{
          panchang: t.common.panchang,
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
          vara: t.common.vara,
          ritu: t.common.ritu,
          yoga: t.common.yoga,
          karana: t.common.karana,
          upcomingTitle: t.common.upcomingTithis,
          delhiNote: t.common.delhiPanchangNote,
          faqTitle: t.common.faqTitle,
          jaapTitle: t.common.tithiJaapTitle,
          jaapBody: t.common.tithiJaapBody,
          jaapLabel: t.common.startJaap,
          readMore: t.common.readMore,
          readLess: t.common.readLess,
        }}
      />
      <div className="mx-auto max-w-4xl px-4 pb-8 lg:px-8 lg:pb-12">
        <HubSeoBlock id="tithi" faqJsonLd={false} />
      </div>
    </div>
  );
}
