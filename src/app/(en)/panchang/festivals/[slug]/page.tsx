import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FestivalDetailView } from "@/components/calendar/FestivalDetailView";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllFestivalSlugs, getFestivalBySlug } from "@/lib/panchang/engine";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = getAllFestivalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) return { title: "Festival not found" };

  return localizedMetadata({
    title: `${festival.name} 2026 — Date, Shubh Muhurat, Puja Vidhi, Vrat Katha & Aarti`,
    description: `${festival.name} (${festival.nameHi}) in 2026: Accurate Date (${festival.dateString2026}), Puja Timing (${festival.pujaTiming}), Muhurat, Step-by-step Puja Vidhi, Vrat Katha, Mantra & Aarti.`,
    path: `/panchang/festivals/${festival.slug}`,
    keywords: [
      `${festival.name.toLowerCase()} 2026`,
      `${festival.name.toLowerCase()} date`,
      `${festival.name.toLowerCase()} puja vidhi`,
      `${festival.name.toLowerCase()} muhurat`,
      `${festival.name.toLowerCase()} katha`,
      `${festival.name.toLowerCase()} mantra`,
      `${festival.name.toLowerCase()} aarti`,
    ],
  });
}

export default async function FestivalSlugPage({ params }: Props) {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) notFound();

  const t = await getMessages();

  // Event Schema and FAQ Schema
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${festival.name} 2026`,
    startDate: `${festival.dateString2026}T06:00:00+05:30`,
    endDate: `${festival.dateString2026}T23:59:00+05:30`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "India",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    description: festival.shortDescription,
    organizer: {
      "@type": "Organization",
      name: "BhaktiVoice",
      url: SITE.url,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: festival.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <JsonLd data={[eventSchema, faqSchema]} />

      <PageHero
        title={`${festival.name} 2026`}
        subtitle={`Complete spiritual guide, Shubh Muhurat, step-by-step Puja Vidhi, Vrat Katha, Mantra and Aarti for ${festival.name} (${festival.nameHi}).`}
        hub="festivals"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          ["Hindu Calendar", PATHS.calendar],
          [festival.name, `/panchang/festivals/${festival.slug}`]
        )}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <FestivalDetailView festival={festival} isModal={false} />
      </div>
    </div>
  );
}
