"use client";

import { MediaImage } from "@/components/media/MediaImage";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <LocaleLink href="/" className={`flex min-w-0 items-center gap-2 ${className}`}>
      <MediaImage
        src="/images/lotus-logo.png"
        alt=""
        width={36}
        height={36}
        className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
        priority
      />
      <span className="font-serif text-lg font-semibold leading-none text-[#8b2c1f] sm:text-2xl">
        Bhakti <span className="font-normal text-saffron">Voice</span>
      </span>
    </LocaleLink>
  );
}
