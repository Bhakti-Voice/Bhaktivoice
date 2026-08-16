import { MediaImage } from "@/components/media/MediaImage";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function ListingCard({
  href,
  title,
  text,
  image,
  imageAlt,
  meta,
}: {
  href: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  meta?: string;
}) {
  return (
    <LocaleLink
      href={href}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-line transition hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] bg-sand">
        {image ? (
          <MediaImage
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : null}
      </div>
      <div className="p-5">
        {meta ? (
          <p className="text-xs uppercase tracking-wide text-saffron">{meta}</p>
        ) : null}
        <h2 className="mt-1 font-serif text-xl text-ink">{title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{text}</p>
      </div>
    </LocaleLink>
  );
}
