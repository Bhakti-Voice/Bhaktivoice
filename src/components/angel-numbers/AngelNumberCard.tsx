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

// Curated ethereal celestial palettes matching the reference screenshot
const CELESTIAL_THEMES = [
  {
    bg: "from-[#fceddf] via-[#fff4ea] to-[#f4dccb]",
    accent: "#b45309",
    wingSvg: "text-amber-800/15",
  },
  {
    bg: "from-[#f7dbe3] via-[#fff0f4] to-[#edd0da]",
    accent: "#be185d",
    wingSvg: "text-rose-800/15",
  },
  {
    bg: "from-[#e4dcf1] via-[#f7f3fb] to-[#d8cce8]",
    accent: "#6d28d9",
    wingSvg: "text-purple-800/15",
  },
  {
    bg: "from-[#dce9f2] via-[#f2f8fc] to-[#ccdfec]",
    accent: "#0369a1",
    wingSvg: "text-sky-800/15",
  },
  {
    bg: "from-[#fceed4] via-[#fff8e7] to-[#f3dfbe]",
    accent: "#b45309",
    wingSvg: "text-amber-700/15",
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
      className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-xl bg-white border border-[#ebdccb] hover:border-amber-400/90 shadow-[0_2px_10px_rgba(217,119,6,0.04)] hover:shadow-[0_10px_24px_rgba(217,119,6,0.11)] hover:-translate-y-0.5 transition-all duration-250 select-none cursor-pointer"
    >
      {/* Top Banner: Compact Ethereal Celestial Sky with Large Centered Serif Number */}
      <div
        className={`relative w-full h-[88px] sm:h-[94px] overflow-hidden bg-gradient-to-r ${theme.bg} flex items-center justify-center`}
      >
        {heroImage ? (
          <img
            src={heroImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-black/5" />
        )}

        {/* Delicate subtle wing curve artwork */}
        <svg
          className={`absolute inset-0 w-full h-full ${theme.wingSvg} pointer-events-none transition-transform duration-500 group-hover:scale-105`}
          viewBox="0 0 240 90"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M15,75 C60,20 120,45 120,45 C120,45 180,20 225,75"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="3 2"
            opacity="0.6"
          />
          <path
            d="M30,80 C75,32 120,52 120,52 C120,52 165,32 210,80"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          <circle cx="120" cy="36" r="20" fill="white" opacity="0.4" />
        </svg>

        {/* Large prominent serif angel number */}
        <span className="relative z-10 font-serif text-[32px] sm:text-[36px] font-bold tracking-tight text-[#2d1b14] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] group-hover:text-amber-950 transition-colors">
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
