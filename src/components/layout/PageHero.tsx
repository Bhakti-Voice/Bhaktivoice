import { MediaImage } from "@/components/media/MediaImage";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/content/types";
import { HUB_HEROES, type HubHeroId } from "@/lib/media/hub-heroes";
import type { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  crumbs,
  hub,
  image,
  imageAlt,
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs?: BreadcrumbItem[];
  hub?: HubHeroId;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  const preset = hub ? HUB_HEROES[hub] : HUB_HEROES.more;
  const src = image || preset.image;
  const alt = imageAlt || preset.imageAlt;
  const object = preset.object;

  return (
    <section className="page-hero relative isolate h-[240px] overflow-hidden sm:h-[300px] lg:h-[420px]">
      <MediaImage
        src={src}
        alt={alt}
        fill
        priority
        className={`object-cover opacity-80 ${object}`}
        sizes="100vw"
      />
      <div className="page-hero-veil pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-8 lg:px-8">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <h1 className="mt-2 max-w-2xl font-display text-3xl leading-tight text-[#2c1810] sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle ? <p className="mt-2 max-w-xl text-base text-ink/70">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}
