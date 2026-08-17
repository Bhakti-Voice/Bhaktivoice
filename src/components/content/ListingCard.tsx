import { MediaImage } from "@/components/media/MediaImage";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function ListingCard({
  href,
  title,
  text,
  image,
  imageAlt,
  meta,
  compact = false,
}: {
  href: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  meta?: string;
  compact?: boolean;
}) {
  return (
    <LocaleLink
      href={href}
      className={`group overflow-hidden bg-white shadow-sm ring-1 ring-line transition hover:-translate-y-0.5 ${
        compact ? "rounded-2xl" : "rounded-3xl"
      }`}
    >
      <div className={`relative bg-sand ${compact ? "aspect-[2/1]" : "aspect-[16/10]"}`}>
        {image ? (
          <MediaImage
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes={
              compact
                ? "(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 280px"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            }
          />
        ) : null}
      </div>
      <div className={compact ? "p-2.5 sm:p-3" : "p-5"}>
        {meta ? (
          <p className="text-[11px] uppercase tracking-wide text-saffron">{meta}</p>
        ) : null}
        <h2 className={`mt-1 font-serif text-ink ${compact ? "line-clamp-2 text-sm leading-snug sm:text-base" : "text-xl"}`}>
          {title}
        </h2>
        <p className={`mt-1.5 leading-relaxed text-muted ${compact ? "line-clamp-1 text-xs" : "line-clamp-2 text-sm"}`}>
          {text}
        </p>
      </div>
    </LocaleLink>
  );
}
