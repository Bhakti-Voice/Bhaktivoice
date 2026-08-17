export function BrandFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff7ee] via-[#f7f0e6] to-[#ead9c4] px-2 text-center">
      <p
        className="max-w-full text-sm italic tracking-wide text-saffron-deep sm:text-2xl lg:text-3xl"
        style={{ fontFamily: "var(--font-playfair), ui-serif, Georgia, serif" }}
      >
        Bhakti Voice
      </p>
      <p
        className="mt-0.5 max-w-full text-xs text-ink/70 sm:mt-1 sm:text-lg lg:text-xl"
        style={{ fontFamily: "var(--font-devanagari), ui-serif, serif" }}
      >
        भक्ति वॉइस
      </p>
    </div>
  );
}
