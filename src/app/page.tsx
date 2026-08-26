import { Suspense } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { CoverMedia } from "@/components/media/CoverMedia";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { OmFlourish } from "@/components/brand/OmFlourish";
import {
  ArrowRight,
  Bell,
} from "lucide-react";
import {
  CommunityIcon,
  FestivalCalendarIcon,
  LotusIcon,
  OpenBookIcon,
  PrayerHandsIcon,
  TempleIcon,
} from "@/components/home/FeatureIcons";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { getDailyQuote, getStats } from "@/lib/cms/client";
import { formatCount } from "@/lib/format";
import { listBlog, listKatha, listYatra } from "@/lib/content";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";
import { localizedMetadata } from "@/lib/seo/metadata";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ProseText } from "@/components/content/SectionBody";
import { JAAP_MANTRAS } from "@/components/jaap/mantras";
import type { Messages } from "@/lib/i18n/messages";
import type { Metadata } from "next";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages();
  return localizedMetadata({
    title: t.home.title,
    description: t.home.description,
    path: "/",
    image: "/assets/bhakti-voice-og-home.jpg",
    imageAlt: "Bhakti Voice - Online Naam Jaap, Katha, and Spiritual Sadhana",
    absoluteTitle: true,
  });
}

const AVATARS = ["#c05621", "#d97706", "#7c3aed", "#be185d", "#1d4ed8", "#0f766e", "#b45309"];

export default async function HomePage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const features = [
    { href: PATHS.naamJaap, icon: PrayerHandsIcon, ...t.home.features[0] },
    { href: PATHS.katha, icon: OpenBookIcon, ...t.home.features[1] },
    { href: PATHS.yatra, icon: TempleIcon, ...t.home.features[2] },
    { href: PATHS.store, icon: LotusIcon, ...t.home.features[3] },
    { href: PATHS.community, icon: CommunityIcon, ...t.home.features[4] },
    { href: PATHS.festivals, icon: FestivalCalendarIcon, ...t.home.features[5] },
  ];

  return (
    <div>
      <JsonLd
        data={await localizedItemListSchema(
          "Bhakti features",
          features.map((feature) => ({ name: feature.title, url: feature.href })),
        )}
      />

      <section className="relative isolate">
        <div className="relative min-h-[34rem] overflow-hidden bg-[#fff9f2] sm:min-h-[40rem] lg:min-h-[760px] lg:bg-transparent">
          <div className="hero-krishna-mobile pointer-events-none absolute inset-y-0 right-0 w-[82%] sm:w-[70%] lg:hidden">
            <MediaImage
              src="/images/krishna-hero.png"
              alt="Lord Krishna playing the flute by a river at sunset"
              fill
              priority
              className="object-cover object-[16%_12%]"
              sizes="82vw"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <MediaImage
              src="/images/krishna-hero.png"
              alt="Lord Krishna playing the flute by a river at sunset"
              fill
              priority
              className="object-cover object-[18%_16%] scale-x-[-1]"
              sizes="100vw"
            />
          </div>
          <div className="hero-krishna-text-veil pointer-events-none" />
          <div className="hero-krishna-fade pointer-events-none absolute inset-0" />
          <div className="hero-krishna-blur-bottom pointer-events-none" />
          <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-7xl flex-col justify-start px-4 pb-24 pt-5 sm:min-h-[40rem] sm:pb-32 sm:pt-8 lg:min-h-[760px] lg:justify-center lg:px-8 lg:pb-40 lg:pt-16">
            <div className="max-w-[17.5rem] sm:max-w-xl lg:max-w-2xl">
              <OmFlourish />
              <h1 className="mt-1 font-display text-[1.85rem] font-semibold leading-[1.2] text-[#2c1810] sm:text-5xl lg:text-[3.35rem]">
                {t.home.h1}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-lg">{t.home.sub}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <LocaleLink
                  href={PATHS.naamJaap}
                  className="inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-saffron-deep sm:px-7 sm:py-3"
                >
                  <Bell className="h-4 w-4" />
                  {t.home.startJaap}
                </LocaleLink>
                <LocaleLink
                  href={PATHS.katha}
                  className="rounded-full border-2 border-saffron bg-white px-5 py-2.5 text-sm font-semibold text-[#2c1810] sm:px-7 sm:py-3"
                >
                  {t.home.exploreKatha}
                </LocaleLink>
              </div>
              <div className="mt-5">
                <LocaleLink href={PATHS.community} className="inline-flex items-center gap-2.5">
                  <span className="flex -space-x-2">
                    {AVATARS.slice(0, 4).map((color) => (
                      <span
                        key={color}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#fff9f2] sm:h-8 sm:w-8"
                        style={{ backgroundColor: color }}
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" fill="currentColor">
                          <circle cx="12" cy="8" r="3.4" />
                          <path d="M5 20c1.1-4.4 3.8-6.6 7-6.6s5.9 2.2 7 6.6Z" />
                        </svg>
                      </span>
                    ))}
                  </span>
                  <span className="text-sm font-medium text-[#4a4038] sm:text-[15px]">{t.home.joinJourney}</span>
                </LocaleLink>
                <p className="mt-2 flex items-center gap-1.5 font-serif text-[15px] italic text-[#7a2e10] sm:text-base">
                  {t.home.heroQuote}
                  <LotusIcon className="h-4 w-4 shrink-0 fill-saffron stroke-saffron" aria-hidden />
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="relative z-20 mx-auto -mt-[4.75rem] max-w-7xl px-4 pb-6 sm:-mt-[5.25rem] lg:-mt-[5.25rem] lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
            {features.map((feature) => (
              <LocaleLink
                key={feature.href}
                href={feature.href}
                className="home-feature-card flex aspect-square min-w-0 flex-col items-center justify-center rounded-[18px] px-2.5 py-4 text-center sm:px-3"
              >
                <feature.icon className="h-8 w-8 text-saffron sm:h-9 sm:w-9" />
                <h2 className="mt-3 font-display text-[15px] font-bold leading-tight text-[#6b2a16] sm:text-[17px]">
                  {feature.title}
                </h2>
                <p className="mt-1.5 text-[11px] font-medium tracking-[0.04em] text-[#7a3b22] sm:text-xs">
                  {feature.text}
                </p>
              </LocaleLink>
            ))}
          </div>
        </section>
      </section>

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 pt-2 pb-10 lg:px-8">
            <div className="h-56 animate-pulse rounded-[32px] bg-maroon/80" />
          </div>
        }
      >
        <HomeChantBanner locale={locale} t={t} />
      </Suspense>

      <Suspense fallback={null}>
        <HomeContentSections t={t} />
      </Suspense>

      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <HubSeoBlock id="home" collapsible />
      </div>
    </div>
  );
}

async function HomeChantBanner({ locale, t }: { locale: string; t: Messages }) {
  const stats = await getStats();
  const counts = JAAP_MANTRAS.map((item) => ({
    slug: item.slug,
    name: item.label,
    color: item.dot,
    count: formatCount(stats.byMantra.find((row) => row.slug === item.slug)?.total ?? 0, locale),
  }));
  return (
    <section className="mx-auto max-w-7xl px-4 pt-2 pb-10 lg:px-8">
      <div className="grid grid-cols-2 items-center gap-3 rounded-[28px] bg-maroon px-5 py-6 text-left text-white sm:gap-6 sm:px-6 md:grid-cols-[1.15fr_0.9fr_1fr] md:px-8 md:py-8 lg:px-10">
        <div>
          <p className="text-xs font-medium text-saffron sm:text-sm">{t.home.globalToday}</p>
          <p className="mt-1 font-display text-5xl font-semibold sm:text-5xl">
            {formatCount(stats.total, locale)}
          </p>
          <p className="mt-1 text-sm text-white/70">{t.home.naamChanted}</p>
          <LocaleLink
            href={PATHS.community}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-saffron px-4 py-2 text-sm font-medium text-white hover:bg-saffron-deep sm:mt-5 sm:px-5 sm:py-2.5"
          >
            {t.home.joinSankalp}
            <ArrowRight className="h-4 w-4" />
          </LocaleLink>
        </div>
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[200px] overflow-hidden rounded-[28px] sm:max-w-[260px] md:max-w-[300px]">
          <MediaImage
            src="/images/diyas-mark.png"
            alt="Lit diyas glowing in the dark"
            fill
            className="object-contain object-[center_60%] mix-blend-lighten"
            sizes="(max-width: 768px) 200px, 300px"
          />
        </div>
        <div className="col-span-2 grid w-full grid-cols-2 gap-3 md:col-span-1 md:gap-3">
          {counts.map((item) => (
            <div key={item.slug} className="flex w-full items-center gap-3">
              <span className={`h-3 w-3 shrink-0 rounded-full ${item.color}`} />
              <div>
                <p className="text-xs text-white/70">{item.name}</p>
                <p className="font-semibold">{item.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function HomeContentSections({ t }: { t: Messages }) {
  const [katha, yatra, blogs, quote] = await Promise.all([
    listKatha(),
    listYatra(),
    listBlog(),
    getDailyQuote(),
  ]);
  const popular = [
    ...katha.slice(0, 3).map((item) => ({
      href: `${PATHS.katha}/${item.slug}`,
      title: item.title,
      text: item.subtitle || item.introduction,
      image: item.heroImage,
      imageAlt: item.heroImageAlt || item.title,
    })),
  ];
  if (popular.length < 3) {
    popular.push(
      ...yatra.slice(0, 3 - popular.length).map((item) => ({
        href: `${PATHS.yatra}/${item.slug}`,
        title: item.title,
        text: item.introduction,
        image: item.heroImage,
        imageAlt: item.heroImageAlt || item.title,
      })),
    );
  }
  const latest = blogs.slice(0, 3);

  return (
    <>
      {popular.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
          <SectionHeading>{t.home.popularTitle}</SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((item) => (
              <LocaleLink key={item.href} href={item.href} className="group min-w-0">
                <CoverMedia
                  src={item.image}
                  alt={item.imageAlt}
                  className="aspect-[4/3] w-full rounded-2xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                />
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg leading-snug text-ink">{item.title}</h3>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-saffron text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <ProseText text={item.text} className="mt-1 line-clamp-2 text-sm text-muted" />
              </LocaleLink>
            ))}
          </div>
          <div className="mt-5">
            <LocaleLink
              href={PATHS.katha}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-saffron hover:text-saffron-deep"
            >
              {t.home.moreKatha}
              <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7a2e10] via-[#c45c1a] to-[#8b3a12] px-6 py-8 text-center text-white sm:px-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 sm:block">
            <MediaImage
              src="/images/diyas-mark.png"
              alt=""
              fill
              className="object-contain object-left opacity-80 mix-blend-screen"
              sizes="160px"
            />
          </div>
          <ProseText
            text={quote?.text || t.home.krishnaQuote}
            className="relative font-serif text-lg italic leading-relaxed text-white sm:text-xl"
          />
          <p className="relative mt-2 text-sm text-white/80">
            {quote?.attribution
              ? quote.attribution.startsWith("—") || quote.attribution.startsWith("–")
                ? quote.attribution
                : `— ${quote.attribution}`
              : t.home.krishnaQuoteBy}
          </p>
        </div>
      </section>

      {latest.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
          <SectionHeading>{t.home.latestTitle}</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((item) => (
              <article key={item.slug} className="min-w-0">
                <LocaleLink href={`${PATHS.blog}/${item.slug}`} className="group block">
                  <div className="relative">
                    <CoverMedia
                      src={item.heroImage}
                      alt={item.heroImageAlt || item.title}
                      className="aspect-[16/10] w-full rounded-2xl"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    />
                    {item.category ? (
                      <span className="absolute bottom-3 left-3 rounded-full bg-saffron px-3 py-1 text-xs font-medium text-white">
                        {item.category}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 font-serif text-xl leading-snug text-ink">{item.title}</h3>
                  <ProseText
                    text={item.excerpt || item.introduction}
                    className="mt-2 line-clamp-2 text-sm text-muted"
                  />
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-lotus">
                    {t.home.readMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </LocaleLink>
              </article>
            ))}
          </div>
          <div className="mt-5">
            <LocaleLink
              href={PATHS.blog}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-saffron hover:text-saffron-deep"
            >
              {t.home.moreBlogs}
              <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          </div>
        </section>
      ) : null}
    </>
  );
}
