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
  breadcrumbJsonLd = true,
  ornament = false,
}: {
  title: string;
  subtitle?: string;
  crumbs?: BreadcrumbItem[];
  hub?: HubHeroId;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  breadcrumbJsonLd?: boolean;
  ornament?: boolean;
}) {
  const preset = hub ? HUB_HEROES[hub] : HUB_HEROES.more;
  const src = image || preset.image;
  const alt = imageAlt || preset.imageAlt;
  const object = preset.object;

  return (
    <section className="page-hero relative isolate min-h-[148px] overflow-hidden sm:min-h-[168px] lg:min-h-[200px]">
      <MediaImage
        src={src}
        alt={alt}
        fill
        priority
        className={`object-cover opacity-80 ${object}`}
        sizes="100vw"
      />
      <div className="page-hero-veil pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-start px-4 pt-3 pb-11 sm:pt-4 sm:pb-12 lg:px-8 lg:pt-5 lg:pb-14">
        {crumbs ? <Breadcrumbs items={crumbs} jsonLd={breadcrumbJsonLd} /> : null}
        <h1 className="mt-1 max-w-2xl font-display text-2xl leading-tight text-[#2c1810] sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {ornament ? (
          <div className="mt-1.5 flex items-center gap-2" aria-hidden>
            <span className="h-px w-8 bg-[#2c1810]/25 sm:w-12" />
            <MediaImage
              src="/images/lotus-logo-mark.png"
              alt=""
              width={22}
              height={22}
              className="h-4 w-4 object-contain sm:h-5 sm:w-5"
            />
            <span className="h-px w-8 bg-[#2c1810]/25 sm:w-12" />
          </div>
        ) : null}
        {subtitle ? (
          <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-ink/70 sm:text-sm">{subtitle}</p>
        ) : null}
        {children}
      </div>
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-8 w-full sm:h-10 lg:h-11"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="#fff9f2"
          d="M0 34c160 24 320-20 480-8 160 12 240 32 400 24s280-36 400-16c80 12 120 20 160 16v22H0V34z"
        />
      </svg>
    </section>
  );
}
