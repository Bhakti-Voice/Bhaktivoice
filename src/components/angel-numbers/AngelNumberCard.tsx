import { ArrowRight } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export interface AngelNumberCardProps {
  slug: string;
  number?: string;
  title: string;
  excerpt: string;
  publishedAt?: string;
  heroImage?: string;
  category?: string;
  readMoreText?: string;
}

function formatDate(iso?: string) {
  if (!iso) return "Aug 11, 2026";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function getDisplayNumber(num?: string, slug?: string, title?: string): string {
  if (num && num.trim()) return num.trim();
  const slugMatch = slug?.match(/(\d+)/);
  if (slugMatch) return slugMatch[1];
  const titleMatch = title?.match(/(\d+)/);
  if (titleMatch) return titleMatch[1];
  return "777";
}

// Curated celestial moon themes matching target mockup
const CELESTIAL_THEMES = [
  {
    bgImage: "/images/angel-numbers/celestial-moon-gold.webp",
    numberColor: "text-[#fffdf2]",
    numberGlow: "drop-shadow-[0_0_14px_rgba(254,240,138,0.95)] drop-shadow-[0_0_30px_rgba(251,191,36,0.75)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]",
  },
  {
    bgImage: "/images/angel-numbers/celestial-moon-sunset.webp",
    numberColor: "text-[#fffaf5]",
    numberGlow: "drop-shadow-[0_0_14px_rgba(255,237,213,0.95)] drop-shadow-[0_0_30px_rgba(251,146,60,0.75)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]",
  },
  {
    bgImage: "/images/angel-numbers/celestial-moon-cyan.webp",
    numberColor: "text-[#f0f9ff]",
    numberGlow: "drop-shadow-[0_0_14px_rgba(224,242,254,0.95)] drop-shadow-[0_0_30px_rgba(56,189,248,0.75)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]",
  },
  {
    bgImage: "/images/angel-numbers/celestial-moon-crescent.webp",
    numberColor: "text-[#fff1f2]",
    numberGlow: "drop-shadow-[0_0_14px_rgba(254,205,211,0.95)] drop-shadow-[0_0_30px_rgba(244,114,182,0.75)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]",
  },
];

export function AngelNumberCard({
  slug,
  number,
  title,
  excerpt,
  publishedAt,
  heroImage,
  category = "Angel Number",
  readMoreText = "Read More",
}: AngelNumberCardProps) {
  const displayNumber = getDisplayNumber(number, slug, title);
  const href = `/library/angel-numbers/${slug}`;

  // Deterministically select theme based on number
  const numVal = parseInt(displayNumber, 10) || 0;
  const theme = CELESTIAL_THEMES[Math.abs(numVal) % CELESTIAL_THEMES.length];

  return (
    <LocaleLink
      href={href}
      className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl bg-white border border-[#ebdccb] hover:border-amber-400/90 shadow-[0_2px_10px_rgba(217,119,6,0.04)] hover:shadow-[0_12px_28px_rgba(217,119,6,0.12)] hover:-translate-y-1 transition-all duration-300 select-none cursor-pointer"
    >
      {/* Top Banner: Celestial Night Sky with Radiant Moon & Center Glowing Serif Number */}
      <div className="relative w-full h-[155px] sm:h-[168px] lg:h-[175px] overflow-hidden bg-[#070b18] flex items-center justify-center">
        {/* Celestial Moon Artwork (Smooth Slow Zoom on Card Hover) */}
        <img
          src={theme.bgImage}
          alt={`Angel Number ${displayNumber} celestial moon and stars`}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Center Glowing Number in classic Roman serif typography */}
        <span
          className={`relative z-10 font-serif text-[40px] sm:text-[46px] lg:text-[48px] font-bold tracking-normal ${theme.numberColor} ${theme.numberGlow} transition-transform duration-500 group-hover:scale-105 select-none`}
        >
          {displayNumber}
        </span>
      </div>


      {/* Card Body with tighter, compact padding */}
      <div className="flex flex-col flex-1 p-3 sm:p-3.5">
        {/* Meta row: Badge and Date */}
        <div className="flex items-center justify-between gap-1.5 mb-1.5">
          <span className="inline-flex items-center rounded-full bg-[#fdf0ec] px-2 py-0.5 text-[10px] font-semibold text-[#b8532f] border border-[#fae2da]">
            {category}
          </span>
          <span className="text-[10.5px] text-stone-500 font-medium">
            {formatDate(publishedAt)}
          </span>
        </div>

        {/* Card Title */}
        <h2 className="font-serif text-[14px] sm:text-[14.5px] font-bold leading-snug text-[#2c1810] group-hover:text-saffron-deep transition-colors line-clamp-1">
          {title}
        </h2>

        {/* Card Excerpt */}
        <p className="mt-1 text-[11.5px] sm:text-[12px] text-stone-600 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>

        {/* Read More link */}
        <div className="mt-2.5 pt-2 border-t border-[#f4e9dd] flex items-center gap-1 text-[11px] font-semibold text-stone-700 group-hover:text-saffron-deep transition-colors">
          <span>{readMoreText}</span>
          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </LocaleLink>
  );
}
