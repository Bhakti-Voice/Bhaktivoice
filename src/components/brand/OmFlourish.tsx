export function OmFlourish({ className = "" }: { className?: string }) {
  return (
    <div className={`mt-2 flex translate-y-2 sm:mt-3 sm:translate-y-3 ${className}`} aria-hidden>
      <img
        src="/images/om-flourish.svg"
        alt=""
        width={1860}
        height={220}
        className="-ml-2 h-14 w-auto max-w-[min(100%,22rem)] object-contain object-left sm:h-16 sm:max-w-[28rem] lg:h-[4.75rem] lg:max-w-[32rem]"
        draggable={false}
      />
    </div>
  );
}
