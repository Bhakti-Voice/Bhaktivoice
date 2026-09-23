import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { hubMetadata } from "@/lib/i18n/hub";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { EmptyListing } from "@/components/content/EmptyListing";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";
import { listSankalpOffers } from "@/lib/content";
import { ProseText } from "@/components/content/SectionBody";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("sankalp");
}

export default async function SankalpPage() {
  const offers = await listSankalpOffers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={pageCrumbs(["Sadhana", PATHS.sadhana], ["Sankalp", PATHS.sankalp])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">My Sankalps</h1>

      <section className="mt-10 overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-line md:grid md:grid-cols-2">
        <div className="p-8">
          <p className="text-xs uppercase tracking-wide text-saffron">In progress</p>
          <h2 className="mt-2 font-serif text-3xl text-ink">No active sankalp</h2>
          <p className="mt-3 text-sm text-muted">0 of 0 · start a vow small enough to keep</p>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-sand">
            <div className="h-full w-0 rounded-full bg-saffron" />
          </div>
          <LocaleLink
            href="/naam-jaap"
            className="mt-6 inline-flex rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-white"
          >
            Begin Jaap
          </LocaleLink>
        </div>
        <div className="relative min-h-[240px]">
          <MediaImage
            src="/images/sankalp-flowers.png"
            alt="Flowers placed for a sankalp"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">Popular Sankalps</h2>
        {offers.length ? (
          <ul className="mt-5 grid gap-4">
            {offers.map((item) => (
              <li
                key={item.slug}
                className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line"
              >
                <div>
                  <h3 className="font-serif text-xl text-ink">{item.title}</h3>
                  <ProseText text={item.text} className="mt-1 text-sm text-muted" />
                </div>
                <LocaleLink
                  href={item.href}
                  className="rounded-full bg-navy px-5 py-2 text-sm font-medium text-white"
                >
                  Join
                </LocaleLink>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyListing kind="sankalps" />
        )}
      </section>
      <HubSeoBlock id="sankalp" />
    </div>
  );
}
