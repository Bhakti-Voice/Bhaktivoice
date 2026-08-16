import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  Flame,
  Heart,
  ShoppingBag,
  Users,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { formatCount, getStats } from "@/lib/cms/client";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";
import { localizedMetadata } from "@/lib/seo/metadata";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages();
  return localizedMetadata({
    title: t.home.title,
    description: t.home.description,
    path: "/",
    image: "/images/krishna-hero.png",
    imageAlt: "Lord Krishna playing the flute by a river at sunset",
    absoluteTitle: true,
  });
}

const COUNT_LABELS = [
  { slug: "ram-naam", name: "Ram Naam", color: "bg-orange-400" },
  { slug: "radhe-radhe", name: "Radhe Radhe", color: "bg-purple-400" },
  { slug: "om-namah-shivaya", name: "Om Namah Shivaya", color: "bg-sky-200" },
];

const AVATARS = ["#c05621", "#d97706", "#7c3aed", "#be185d", "#1d4ed8", "#0f766e", "#b45309"];

export default async function HomePage() {
  const [stats, t, locale] = await Promise.all([getStats(), getMessages(), getLocale()]);
  const features = [
    { href: PATHS.naamJaap, icon: Flame, color: "bg-[#f3e8ff] text-[#7c3aed]", ...t.home.features[0] },
    { href: PATHS.katha, icon: BookOpen, color: "bg-[#ffedd5] text-[#c2410c]", ...t.home.features[1] },
    { href: PATHS.diary, icon: Heart, color: "bg-[#fee2e2] text-[#b91c1c]", ...t.home.features[2] },
    { href: PATHS.store, icon: ShoppingBag, color: "bg-[#fef3c7] text-[#b45309]", ...t.home.features[3] },
    { href: PATHS.community, icon: Users, color: "bg-[#fce7f3] text-[#be185d]", ...t.home.features[4] },
    { href: PATHS.festivals, icon: CalendarDays, color: "bg-[#ffedd5] text-[#c2410c]", ...t.home.features[5] },
  ];
  const counts = COUNT_LABELS.map((item) => ({
    ...item,
    count: formatCount(stats.byMantra.find((row) => row.slug === item.slug)?.total ?? 0, locale),
  }));

  return (
    <div>
      <JsonLd
        data={itemListSchema(
          "Bhakti features",
          features.map((feature) => ({ name: feature.title, url: feature.href })),
        )}
      />

      <section className="relative min-h-[580px] overflow-hidden lg:min-h-[700px]">
        <Image
          src="/images/krishna-hero.png"
          alt="Lord Krishna playing the flute by a river at sunset"
          fill
          priority
          className="object-cover object-[72%_8%] scale-x-[-1]"
          sizes="100vw"
        />
        <div className="hero-krishna-fade pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-8 lg:px-8 lg:pt-24 lg:pb-10">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="font-serif text-4xl leading-[1.15] text-ink sm:text-5xl lg:text-[3.5rem]">
              {t.home.h1}
            </h1>
            <p className="mt-4 text-lg text-muted">{t.home.sub}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LocaleLink
                href={PATHS.naamJaap}
                className="rounded-full bg-navy px-7 py-3 text-sm font-medium text-white shadow-sm"
              >
                {t.home.startJaap}
              </LocaleLink>
              <LocaleLink
                href={PATHS.katha}
                className="rounded-full border border-line bg-white/90 px-7 py-3 text-sm font-medium text-ink backdrop-blur-sm"
              >
                {t.home.exploreKatha}
              </LocaleLink>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map((color) => (
                  <span
                    key={color}
                    className="inline-flex h-8 w-8 rounded-full border-2 border-ivory"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-ivory bg-navy text-xs text-white">
                  +
                </span>
              </div>
              <p className="text-sm font-medium text-ink/70">
                {formatCount(stats.users, locale)} {t.home.devoteesJoined}
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6">
            {features.map((feature) => (
              <LocaleLink
                key={feature.href}
                href={feature.href}
                className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line transition hover:-translate-y-0.5"
              >
                <span className={`inline-flex rounded-2xl p-2 ${feature.color}`}>
                  <feature.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-semibold text-ink">{feature.title}</h2>
                <p className="mt-1 text-sm text-muted">{feature.text}</p>
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-2 pb-16 lg:px-8">
        <div className="grid items-center gap-8 rounded-[32px] bg-navy px-6 py-8 text-white md:grid-cols-[1.1fr_0.8fr_1fr] lg:px-10">
          <div>
            <p className="text-sm text-white/80">{t.home.globalToday}</p>
            <p className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">
              {formatCount(stats.total, locale)}
            </p>
            <p className="mt-2 text-sm text-white/70">{t.home.naamChanted}</p>
            <LocaleLink
              href={PATHS.community}
              className="mt-5 inline-flex rounded-full bg-gold px-5 py-2 text-sm font-medium text-navy"
            >
              {t.home.joinSankalp}
            </LocaleLink>
          </div>
          <div className="relative mx-auto h-40 w-full max-w-xs">
            <Image
              src="/images/diyas.png"
              alt="Lit diyas glowing in the dark"
              fill
              className="object-contain"
              sizes="240px"
            />
          </div>
          <div className="grid gap-4">
            {counts.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className={`h-8 w-8 shrink-0 rounded-full ${item.color}`} />
                <div className="flex-1">
                  <p className="text-xs text-white/70">{item.name}</p>
                  <p className="font-semibold">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <HubSeoBlock id="home" />
      </div>
    </div>
  );
}
