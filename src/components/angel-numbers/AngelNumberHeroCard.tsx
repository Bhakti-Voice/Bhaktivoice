export function AngelNumberHeroCard({
  quote = "Numbers are whispers from the divine.",
  quoteSub = "Learn to listen.",
}: {
  quote?: string;
  quoteSub?: string;
} = {}) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center px-2 py-0.5 select-none pointer-events-none">
      {/* Angel wings SVG illustration with glowing center lotus */}
      <div className="relative flex items-center justify-center">
        <svg
          className="w-48 sm:w-56 h-auto"
          viewBox="0 0 280 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Wing Feathers */}
          <path
            d="M120 52 C95 46 68 30 30 8 C48 26 62 44 88 56 C62 44 48 30 25 18 C40 36 58 52 94 64 C70 56 52 44 38 34 C56 50 82 66 120 67 Z"
            fill="url(#wingGradientL)"
            opacity="0.85"
          />
          <path
            d="M115 44 C90 34 62 20 28 6 C47 20 70 36 98 48 Z"
            fill="#d97706"
            opacity="0.25"
          />

          {/* Right Wing Feathers */}
          <path
            d="M160 52 C185 46 212 30 250 8 C232 26 218 44 192 56 C218 44 232 30 255 18 C240 36 222 52 186 64 C210 56 228 44 242 34 C224 50 198 66 160 67 Z"
            fill="url(#wingGradientR)"
            opacity="0.85"
          />
          <path
            d="M165 44 C190 34 218 20 252 6 C233 20 210 36 182 48 Z"
            fill="#d97706"
            opacity="0.25"
          />

          {/* Central Lotus Flower & Soft Halo */}
          <circle cx="140" cy="34" r="15" fill="url(#sunGlow)" />
          {/* Center Petals */}
          <path
            d="M140 24 C136 31 132 35 140 44 C148 35 144 31 140 24 Z"
            fill="#b45309"
            opacity="0.9"
          />
          <path
            d="M132 30 C129 34 132 38 140 42 C136 39 133 34 132 30 Z"
            fill="#c2410c"
            opacity="0.75"
          />
          <path
            d="M148 30 C151 34 148 38 140 42 C144 39 147 34 148 30 Z"
            fill="#c2410c"
            opacity="0.75"
          />

          <defs>
            <linearGradient id="wingGradientL" x1="120" y1="62" x2="30" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="0.6" stopColor="#f43f5e" stopOpacity="0.22" />
              <stop offset="1" stopColor="#fed7aa" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="wingGradientR" x1="160" y1="62" x2="250" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="0.6" stopColor="#f43f5e" stopOpacity="0.22" />
              <stop offset="1" stopColor="#fed7aa" stopOpacity="0.03" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="1" stopColor="#fed7aa" stopOpacity="0.1" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Quote matching original reference image */}
      <blockquote className="-mt-1 space-y-0.5 text-center">
        <p className="font-serif text-[13px] sm:text-[14px] font-medium text-[#7d4427] leading-snug tracking-normal">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="font-serif text-[11.5px] sm:text-[12px] italic text-[#99583b]">
          {quoteSub}
        </p>
        <div className="text-amber-700/70 text-[9px] select-none pt-0.5">
          ✦
        </div>
      </blockquote>
    </div>
  );
}
