import { MediaImage } from "@/components/media/MediaImage";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/content/types";
import type { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  crumbs,
  image = "/images/krishna-hero.png",
  imageAlt = "Lord Krishna playing the flute by a river at sunset",
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs?: BreadcrumbItem[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate min-h-[42svh] overflow-hidden sm:min-h-[280px] lg:min-h-[300px]">
      <MediaImage
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-[center_16%] scale-x-[-1] lg:object-[72%_10%]"
        sizes="100vw"
      />
      <div className="hero-krishna-fade pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto flex min-h-[42svh] max-w-7xl flex-col justify-end px-4 pb-8 pt-6 sm:min-h-[280px] lg:min-h-[300px] lg:justify-center lg:px-8 lg:pb-10">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle ? <p className="mt-2 max-w-xl text-base text-muted">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}
