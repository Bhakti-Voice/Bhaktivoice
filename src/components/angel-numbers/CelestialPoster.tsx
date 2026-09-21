"use client";

import Image from "next/image";

interface CelestialPosterProps {
  number: string;
  keywords?: string;
  quote?: string;
}

const DEFAULT_KEYWORDS: Record<string, string> = {
  "111": "New Beginnings  •  Intention  •  Manifestation",
  "222": "Balance  •  Harmony  •  Divine Timing",
  "333": "Creativity  •  Protection  •  Support",
  "444": "Protection  •  Stability  •  Guidance",
  "555": "Change  •  Growth  •  Freedom",
  "777": "Luck  •  Intuition  •  Awakening",
  "888": "Abundance  •  Karma  •  Prosperity",
  "999": "Completion  •  Closure  •  Rebirth",
  "1111": "Awakening  •  Portal  •  Intuition",
  "1212": "Ascension  •  Courage  •  Clarity",
  "500": "Freedom  •  Expansion  •  New Paths",
  "499": "Divine Timing  •  Soul Mission  •  Purpose",
  "498": "Support  •  Stability  •  Abundance",
  "497": "Inner Wisdom  •  Intuition  •  Growth",
};

const DEFAULT_QUOTES: Record<string, string> = {
  "498": "You are held and sustained by divine grace through every step.",
  "333": "You are exactly where you need to be.",
  "111": "Your thoughts are rapidly manifesting into physical form.",
  "222": "Have faith. Everything is working out as it should.",
  "444": "You are surrounded by angels who love and guide you.",
  "555": "Embrace the changes unfolding for your highest good.",
  "777": "You are in perfect harmony with universal wisdom.",
  "888": "The universe is endlessly abundant and showering you with blessings.",
  "999": "A significant chapter is closing so a glorious one can begin.",
  "1111": "Your spirit is awakening to its highest divine truth.",
  "1212": "Step fearlessly out of your comfort zone toward your dreams.",
  "500": "Release all limitations; new adventures await your spirit.",
  "499": "Trust divine timing and dedicate yourself to your purpose.",
  "497": "Quiet your mind; the answers already reside within your soul.",
};

export function CelestialPoster({ number, keywords, quote }: CelestialPosterProps) {
  const displayKeywords =
    keywords || DEFAULT_KEYWORDS[number] || "Support  •  Stability  •  Abundance";
  const displayQuote =
    quote || DEFAULT_QUOTES[number] || "You are held and sustained by divine grace through every step.";

  return (
    <div className="relative w-full max-w-[340px] h-[255px] sm:h-[270px] rounded-[24px] sm:rounded-[26px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.22)] border-[1.5px] border-[#e8c37d] select-none flex flex-col justify-between py-3.5 px-4 bg-[#6b4c82]">
      {/* Background: Exact celestial sky matching reference image */}
      <Image
        src="/images/angel-numbers/celestial-poster-bg.jpg"
        alt={`Angel Number ${number} Celestial Alignment`}
        fill
        sizes="(max-width: 640px) 320px, 340px"
        className="object-cover object-center pointer-events-none"
        priority
      />

      {/* Subtle Atmospheric Depth Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-stone-950/25 pointer-events-none" />

      {/* ============================================================== */}
      {/* TOP SECTION: Golden Hairline with 4-Point Star + DIVINE ALIGNMENT */}
      {/* ============================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-0.5">
        {/* Top 4-point Star Divider */}
        <div className="flex items-center justify-center gap-2 text-amber-200/80 mb-0.5">
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-200/80 to-transparent" />
          <svg
            className="w-3.5 h-3.5 text-amber-100 fill-current drop-shadow-[0_0_6px_#fef08a]"
            viewBox="0 0 24 24"
          >
            <path d="M12 0L14 9L23 11L14 13L12 22L10 13L1 11L10 9Z" />
          </svg>
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-200/80 to-transparent" />
        </div>

        {/* Title: DIVINE ALIGNMENT */}
        <span className="font-serif text-[11px] sm:text-[11.5px] font-bold tracking-[0.34em] text-[#fffdf5] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.75)]">
          DIVINE ALIGNMENT
        </span>
      </div>

      {/* ============================================================== */}
      {/* CENTER SECTION: Sculpted 3D Number + Keywords + Lotus Divider  */}
      {/* ============================================================== */}
      <div className="relative z-10 text-center my-auto flex flex-col items-center justify-center py-0.5">
        {/* Sculpted 3D Pearlescent & Gold Numerals */}
        <div className="relative leading-none">
          {/* Ambient Glow */}
          <div className="absolute inset-0 font-serif text-[56px] sm:text-[62px] font-black tracking-tight leading-none text-amber-200 blur-md opacity-75 select-none">
            {number}
          </div>
          {/* Forefront 3D Numerals matching reference image */}
          <div
            className="relative font-serif text-[56px] sm:text-[62px] font-black tracking-tight leading-none text-[#fffdf5]"
            style={{
              textShadow:
                "0 1px 0 #ffffff, 0 2px 0 #f4deb0, 0 3px 0 #cca252, 0 4px 10px rgba(0,0,0,0.6), 0 0 24px rgba(254,240,138,0.85)",
            }}
          >
            {number}
          </div>
        </div>

        {/* Keywords Subtitle */}
        <div className="mt-1 font-serif text-xs sm:text-[13px] font-semibold text-[#fffdf5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] tracking-wide">
          {displayKeywords}
        </div>

        {/* Lotus Divider: Hairline on left, Golden Lotus, Hairline on right */}
        <div className="flex items-center justify-center gap-2.5 my-1">
          <span className="w-10 sm:w-14 h-[1px] bg-gradient-to-r from-transparent via-amber-200/70 to-amber-200/90" />
          <svg
            className="w-6 h-4 text-amber-200 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]"
            viewBox="0 0 100 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M50 8 C44 24 40 40 50 56 C60 40 56 24 50 8 Z" fill="rgba(254, 240, 138, 0.35)" />
            <path d="M50 56 C38 46 24 36 28 20 C36 26 44 40 50 56 Z" fill="rgba(254, 240, 138, 0.2)" />
            <path d="M50 56 C62 46 76 36 72 20 C64 26 56 40 50 56 Z" fill="rgba(254, 240, 138, 0.2)" />
            <path d="M50 56 C32 54 14 46 12 36 C22 39 36 47 50 56 Z" />
            <path d="M50 56 C68 54 86 46 88 36 C78 39 64 47 50 56 Z" />
            <circle cx="50" cy="46" r="2" fill="currentColor" />
          </svg>
          <span className="w-10 sm:w-14 h-[1px] bg-gradient-to-r from-amber-200/90 via-amber-200/70 to-transparent" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM SECTION: Whisper Quote + Bottom 4-Point Star Divider   */}
      {/* ============================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 pb-0.5">
        {/* Italic Whisper Quote */}
        <p className="font-serif italic text-xs sm:text-[12.5px] text-[#fffdf2] leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-[280px]">
          &ldquo;{displayQuote}&rdquo;
        </p>

        {/* Bottom 4-point Star Divider */}
        <div className="flex items-center justify-center gap-2 text-amber-200/80 mt-1">
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-200/80 to-transparent" />
          <svg
            className="w-3.5 h-3.5 text-amber-100 fill-current drop-shadow-[0_0_6px_#fef08a]"
            viewBox="0 0 24 24"
          >
            <path d="M12 0L14 9L23 11L14 13L12 22L10 13L1 11L10 9Z" />
          </svg>
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-200/80 to-transparent" />
        </div>
      </div>
    </div>
  );
}
