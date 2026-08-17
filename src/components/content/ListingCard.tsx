import type { ReactNode } from "react";
import { CoverMedia } from "@/components/media/CoverMedia";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function ListingCard({
  href,
  title,
  text,
  image,
  imageAlt,
  meta,
  footer,
}: {
  href: string;
  title: string;
  text: string;
  image?: string;
  imageAlt: string;
  meta?: string;
  footer?: ReactNode;
}) {
  const body = (
    <>
      <CoverMedia
        src={image}
        alt={imageAlt}
        className="aspect-[2/1] w-full"
        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 280px"
      />
      <div className="p-2.5 sm:p-3">
        {meta ? <p className="text-[11px] uppercase tracking-wide text-saffron">{meta}</p> : null}
        <h2 className="listing-card-title mt-1 line-clamp-2 break-words font-serif text-base leading-snug text-ink sm:text-lg">
          {title}
        </h2>
        <p className="listing-card-text mt-1.5 line-clamp-2 break-words text-sm leading-relaxed text-muted">{text}</p>
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
