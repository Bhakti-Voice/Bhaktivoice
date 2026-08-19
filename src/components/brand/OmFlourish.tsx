export function OmFlourish({ className = "" }: { className?: string }) {
  return (
    <div className={`mt-1 flex -translate-y-0.5 ${className}`} aria-hidden>
      <img
        src="/images/om-flourish.svg"
        alt=""
        width={1860}
        height={220}
        className="-ml-1 h-6 w-auto max-w-[min(100%,11rem)] object-contain object-left sm:h-7 sm:max-w-52 lg:h-8 lg:max-w-56"
        draggable={false}
      />
    </div>
  );
}
