export function OmFlourish({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center text-saffron ${className}`} aria-hidden>
      <svg viewBox="0 0 88 12" className="h-3 w-14 sm:h-3.5 sm:w-20" fill="none">
        <path
          d="M2 6h78"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M10 6h70"
          stroke="url(#om-flourish-left)"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M4 6 7.2 3.6 10.4 6 7.2 8.4Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <defs>
          <linearGradient id="om-flourish-left" x1="10" y1="6" x2="80" y2="6">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="1" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      <span className="relative mx-2 inline-flex h-10 w-10 items-center justify-center sm:mx-3 sm:h-11 sm:w-11">
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/50 via-saffron/20 to-transparent" />
        <span className="absolute inset-[3px] rounded-full ring-1 ring-saffron/35" />
        <span className="relative font-devanagari text-[1.65rem] leading-none text-saffron-deep sm:text-[1.85rem]">
          ॐ
        </span>
      </span>

      <svg viewBox="0 0 88 12" className="h-3 w-14 sm:h-3.5 sm:w-20" fill="none">
        <path
          d="M8 6h78"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M8 6h70"
          stroke="url(#om-flourish-right)"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M83.6 6 80.4 3.6 77.2 6 80.4 8.4Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <defs>
          <linearGradient id="om-flourish-right" x1="78" y1="6" x2="8" y2="6">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="1" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
