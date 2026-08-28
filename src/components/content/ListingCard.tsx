import type { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
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
      {/* Image with Aspect Ratio & Soft Gradient Overlay */}
      <div className="relative overflow-hidden aspect-[16/10] w-full bg-amber-50/50">
        <CoverMedia
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {badge ? (
          <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-saffron-deep shadow-xs backdrop-blur-md border border-amber-200/80">
            {badge}
          </span>
        ) : null}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {meta ? (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100/80 text-amber-900 border border-amber-200/60">
              <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              {meta}
            </span>
          </div>
        ) : null}

        <h2 className="font-serif text-[16px] sm:text-[17px] font-bold leading-snug text-[#2c1810] group-hover:text-saffron-deep transition-colors line-clamp-2">
          {title}
        </h2>

        <ProseText
          text={text}
          className="mt-2 text-xs sm:text-[13px] leading-relaxed text-stone-600 line-clamp-2"
        />

        {/* Read Indicator */}
        {!footer && (
          <div className="mt-4 pt-3 border-t border-amber-100/70 flex items-center justify-between text-xs font-semibold text-saffron-deep group-hover:text-saffron transition-colors">
            <span>विवरण देखें</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        )}
      </div>
    </>
  );

  if (footer) {
    return (
      <article className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-b from-[#fffefc] to-[#fff9f1] border border-[#ecd9be] hover:border-amber-400/90 shadow-[0_4px_18px_rgba(217,119,6,0.06)] hover:shadow-[0_16px_36px_rgba(217,119,6,0.14)] hover:-translate-y-1.5 transition-all duration-300 select-none">
        <LocaleLink href={href} className="flex flex-col flex-1 cursor-pointer">
          {body}
        </LocaleLink>
        <div className="mt-auto px-4 pb-4 pt-0 sm:px-5 sm:pb-5">{footer}</div>
      </article>
    );
  }

  return (
    <LocaleLink
      href={href}
      className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-b from-[#fffefc] to-[#fff9f1] border border-[#ecd9be] hover:border-amber-400/90 shadow-[0_4px_18px_rgba(217,119,6,0.06)] hover:shadow-[0_16px_36px_rgba(217,119,6,0.14)] hover:-translate-y-1.5 transition-all duration-300 select-none cursor-pointer"
    >
      {body}
    </LocaleLink>
  );
}
