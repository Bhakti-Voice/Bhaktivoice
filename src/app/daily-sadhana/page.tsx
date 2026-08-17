import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import Link from "next/link";
import {
  BookOpen,
  CircleDot,
  Flame,
  HeartHandshake,
  Moon,
  Sparkles,
} from "lucide-react";
import { hubMetadata } from "@/lib/i18n/hub";
import { PageHero } from "@/components/layout/PageHero";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("sadhana");
}

const CARDS = [
  {
    href: PATHS.naamJaap,
    title: "Naam Jaap",
    text: "Sit for one mala, or eleven sincere names.",
    icon: CircleDot,
  },
  {
    href: PATHS.katha,
    title: "Katha",
    text: "Listen to a chapter, then carry it into the day.",
    icon: BookOpen,
  },
  {
    href: PATHS.mantras,
    title: "Meditation",
    text: "A short naam as an anchor, not a project.",
    icon: Sparkles,
  },
  {
    href: PATHS.sankalp,
    title: "Sankalp",
    text: "A vow small enough to keep.",
    icon: Flame,
  },
  {
    href: PATHS.festivals,
    title: "Vrat / Upvas",
    text: "The next Ekadashi, kept as health allows.",
    icon: Moon,
  },
  {
    href: PATHS.community,
    title: "Seva",
    text: "A kindness after the sitting — the leftover that lasts.",
    icon: HeartHandshake,
  },
];

export default function SadhanaPage() {
  return (
    <div>
      <PageHero title="Today's Bhakti" hub="sadhana" crumbs={pageCrumbs(["Sadhana", PATHS.sadhana])}>
        <Link
          href={PATHS.diary}
          className="mt-5 inline-flex rounded-full border border-line bg-white px-5 py-2 text-sm"
        >
          Edit
        </Link>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line transition hover:-translate-y-0.5"
          >
            <span className="inline-flex rounded-2xl bg-sand p-2 text-saffron">
              <card.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-serif text-2xl text-ink">{card.title}</h2>
            <p className="mt-2 text-sm text-muted">{card.text}</p>
          </Link>
        ))}
      </div>

      <section className="relative mt-10 overflow-hidden rounded-[32px] bg-navy text-white">
        <div className="grid items-center gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <blockquote className="p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Daily quote</p>
            <p className="mt-3 font-serif text-3xl leading-snug">
              The mind acts like an enemy for those who do not control it.
            </p>
            <p className="mt-4 text-sm text-white/70">— Bhagavad Gita</p>
          </blockquote>
          <div className="relative min-h-[220px]">
            <MediaImage
              src="/images/diyas.png"
              alt="Lit diyas glowing for an evening of sadhana"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>
      <HubSeoBlock id="sadhana" />
      </div>
    </div>
  );
}
