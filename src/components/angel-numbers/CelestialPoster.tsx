"use client";

interface CelestialPosterProps {
  number: string;
  keywords?: string;
  quote?: string;
}

const DEFAULT_KEYWORDS: Record<string, string> = {
  "555": "CHANGE • GROWTH • FREEDOM",
  "777": "LUCK • INTUITION • AWAKENING",
  "888": "ABUNDANCE • KARMA • HARMONY",
  "444": "PROTECTION • STABILITY • GUIDANCE",
  "111": "NEW BEGINNINGS • MANIFESTATION",
  "222": "BALANCE • TRUST • DIVINE TIMING",
  "333": "CREATIVITY • PROTECTION • SUPPORT",
  "999": "COMPLETION • CLOSURE • REBIRTH",
  "497": "INNER WISDOM • SPIRITUAL GROWTH",
  "498": "DIVINE SUPPORT • ABUNDANCE",
  "499": "DIVINE TIMING • SOUL MISSION",
  "500": "FREEDOM • EXPANSION • NEW PATHS",
};

export function CelestialPoster({ number, keywords, quote }: CelestialPosterProps) {
  const displayKeywords =
    keywords || DEFAULT_KEYWORDS[number] || "DIVINE GUIDANCE • PURPOSE • HARMONY";
  const displayQuote = quote || "You are exactly where you need to be.";

  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-[#d8aa67]/50 shadow-[0_10px_30px_rgba(180,83,9,0.22)] select-none flex flex-col justify-between p-5 bg-gradient-to-b from-[#1f0d04] via-[#6d3509] to-[#261004]">
      {/* Radiant Sunburst & Light Rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Core Radial Sunlight */}
        <div
          className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,247,214,0.95) 0%, rgba(251,191,36,0.65) 28%, rgba(217,119,6,0.3) 50%, transparent 70%)",
          }}
        />

        {/* Sunbeam Angle Highlights */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          viewBox="0 0 300 400"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M150 120 L0 0 L50 0 Z" fill="#fef08a" opacity="0.4" />
          <path d="M150 120 L300 0 L250 0 Z" fill="#fef08a" opacity="0.4" />
          <path d="M150 120 L300 150 L300 100 Z" fill="#fed7aa" opacity="0.3" />
          <path d="M150 120 L0 150 L0 100 Z" fill="#fed7aa" opacity="0.3" />
          <path d="M150 120 L0 300 L0 250 Z" fill="#fde68a" opacity="0.2" />
          <path d="M150 120 L300 300 L300 250 Z" fill="#fde68a" opacity="0.2" />
        </svg>

        {/* Ethereal Floating Particles / Stars */}
        <div className="absolute top-8 left-8 w-1 h-1 rounded-full bg-amber-200 shadow-[0_0_8px_#fef08a]" />
        <div className="absolute top-12 right-10 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
        <div className="absolute top-24 left-14 w-1 h-1 rounded-full bg-amber-100 shadow-[0_0_6px_#fde68a]" />
        <div className="absolute top-28 right-16 w-2 h-2 rounded-full bg-amber-200/80 shadow-[0_0_12px_#f59e0b]" />
        <div className="absolute top-44 left-6 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b]" />
        <div className="absolute top-48 right-8 w-1 h-1 rounded-full bg-amber-100 shadow-[0_0_8px_#fff]" />
      </div>

      {/* Ascension Stairway to Divine Light */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-[180px] pointer-events-none opacity-90"
        viewBox="0 0 300 180"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="stairGlow" x1="150" y1="20" x2="150" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef3c7" stopOpacity="0.9" />
            <stop offset="0.4" stopColor="#f59e0b" stopOpacity="0.65" />
            <stop offset="1" stopColor="#78350f" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#fff8e7" stopOpacity="0.75" />
            <stop offset="0.6" stopColor="#b45309" stopOpacity="0.4" />
            <stop offset="1" stopColor="#1f0d04" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Perspective Steps Ascending into Light */}
        <polygon points="144,30 156,30 158,36 142,36" fill="url(#stairGlow)" opacity="0.95" />
        <polygon points="141,38 159,38 162,45 138,45" fill="url(#stairGlow)" opacity="0.92" />
        <polygon points="137,48 163,48 166,57 134,57" fill="url(#stairGlow)" opacity="0.88" />
        <polygon points="132,60 168,60 172,71 128,71" fill="url(#stairGlow)" opacity="0.84" />
        <polygon points="126,75 174,75 179,88 121,88" fill="url(#stairGlow)" opacity="0.8" />
        <polygon points="119,92 181,92 187,107 113,107" fill="url(#stairGlow)" opacity="0.75" />
        <polygon points="110,112 190,112 197,130 103,130" fill="url(#stairGlow)" opacity="0.7" />
        <polygon points="100,135 200,135 208,155 92,155" fill="url(#stairGlow)" opacity="0.65" />
        <polygon points="88,160 212,160 220,180 80,180" fill="url(#stairGlow)" opacity="0.6" />

        {/* Soft Heavenly Cloud Masses on Left & Right Base */}
        <path
          d="M-20,180 Q20,140 60,155 Q90,140 120,165 Q80,180 -20,180 Z"
          fill="url(#cloudGrad)"
          opacity="0.8"
        />
        <path
          d="M320,180 Q280,140 240,155 Q210,140 180,165 Q220,180 320,180 Z"
          fill="url(#cloudGrad)"
          opacity="0.8"
        />
      </svg>

      {/* Top Section: Sparkle / Lotus Glow Symbol */}
      <div className="relative z-10 flex items-center justify-center pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-amber-200 text-[10px] font-semibold tracking-widest uppercase shadow-sm">
          <span>✧</span>
          <span>Divine Alignment</span>
          <span>✧</span>
        </div>
      </div>

      {/* Center Section: Grand Serif Number & Sacred Keywords */}
      <div className="relative z-10 text-center my-auto py-4">
        {/* Large Prominent 3D Glowing Numerals */}
        <div
          className="font-serif text-[60px] sm:text-[72px] lg:text-[76px] font-black tracking-tight leading-none text-[#fffdf2]"
          style={{
            textShadow:
              "0 2px 4px rgba(0,0,0,0.6), 0 0 30px rgba(251,191,36,0.85), 0 0 60px rgba(245,158,11,0.5)",
          }}
        >
          {number}
        </div>

        {/* Sacred Keywords with Dots */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.22em] text-amber-200/95 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {displayKeywords}
        </div>
      </div>

      {/* Bottom Section: Cursive Spiritual Whisper */}
      <div className="relative z-10 text-center pb-1">
        <p className="font-serif italic text-xs sm:text-[13px] text-amber-100/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed">
          &ldquo;{displayQuote}&rdquo;
        </p>
      </div>
    </div>
  );
}
