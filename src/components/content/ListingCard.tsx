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
      <div className="relative">
        <CoverMedia
          src={image}
          alt={imageAlt}
          className="aspect-[2/1] w-full"
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 280px"
        />
        {badge ? (
          <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-saffron-deep">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="p-2.5 sm:p-3">
        {meta ? <p className="text-[11px] uppercase tracking-wide text-saffron">{meta}</p> : null}
        <h2 className="listing-card-title mt-1 line-clamp-2 break-words font-serif text-base leading-snug text-ink sm:text-lg">
          {title}
        </h2>
        <ProseText
          text={text}
          className="listing-card-text mt-1.5 line-clamp-2 break-words text-sm leading-relaxed text-muted"
        />
      </div>
    </>
  );

  if (footer) {
    return (
      <article className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line transition hover:-translate-y-0.5">
        <LocaleLink href={href} className="block cursor-pointer">
          {body}
        </LocaleLink>
        <div className="px-3 pb-3">{footer}</div>
      </article>
    );
  }

  return (
    <LocaleLink
      href={href}
      className="group min-w-0 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line transition hover:-translate-y-0.5"
    >
      {body}
    </LocaleLink>
  );
}
