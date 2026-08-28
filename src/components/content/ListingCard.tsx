import type { ReactNode } from "react";
import { CoverMedia } from "@/components/media/CoverMedia";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ProseText } from "@/components/content/SectionBody";

export function ListingCard({
  href,
  title,
  text,
  image,
  imageAlt,
  meta,
  badge,
  footer,
}: {
  href: string;
  title: string;
  text: string;
  image?: string;
  imageAlt: string;
  meta?: string;
  badge?: string;
  footer?: ReactNode;
}) {
  const body = (
    <>
      <div className="relative overflow-hidden">
        <CoverMedia
          src={image}
          alt={imageAlt}
          className="aspect-[2/1] w-full transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 280px"
        />
        {badge ? (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-saffron-deep shadow-xs backdrop-blur-xs ring-1 ring-saffron/20">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="p-3.5 sm:p-4">
        {meta ? (
          <p className="text-[11px] font-bold uppercase tracking-wider text-saffron-deep">
            {meta}
          </p>
        ) : null}
        <h2 className="listing-card-title mt-1 line-clamp-2 break-words font-serif text-base font-bold leading-snug text-ink transition-colors group-hover:text-saffron-deep sm:text-lg">
          {title}
        </h2>
        <ProseText
          text={text}
          className="listing-card-text mt-1.5 line-clamp-2 break-words text-xs sm:text-sm leading-relaxed text-muted/90"
        />
      </div>
    </>
  );

  if (footer) {
    return (
      <article className="group card-spiritual flex min-w-0 flex-col overflow-hidden rounded-2xl sm:rounded-[22px] bg-white ring-1 ring-line/80 transition-all duration-300 hover:shadow-[0_12px_28px_rgba(211,84,0,0.10)] hover:border-saffron/40 hover:-translate-y-1">
        <LocaleLink href={href} className="block cursor-pointer">
          {body}
        </LocaleLink>
        <div className="mt-auto px-3.5 pb-3.5 pt-1 sm:px-4 sm:pb-4">{footer}</div>
      </article>
    );
  }

  return (
    <LocaleLink
      href={href}
      className="group card-spiritual min-w-0 cursor-pointer overflow-hidden rounded-2xl sm:rounded-[22px] bg-white ring-1 ring-line/80 transition-all duration-300 hover:shadow-[0_12px_28px_rgba(211,84,0,0.10)] hover:border-saffron/40 hover:-translate-y-1"
    >
      {body}
    </LocaleLink>
  );
}

