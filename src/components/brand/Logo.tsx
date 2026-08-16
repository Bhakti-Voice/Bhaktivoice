"use client";

import { MediaImage } from "@/components/media/MediaImage";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <LocaleLink href="/" className={`flex items-center gap-2 ${className}`}>
      <MediaImage
        src="/images/lotus-logo.png"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
        priority
      />
      <span className="font-serif text-2xl font-semibold leading-none text-[#8b2c1f]">
        Bhakti <span className="font-normal text-saffron">Voice</span>
      </span>
    </LocaleLink>
  );
}
