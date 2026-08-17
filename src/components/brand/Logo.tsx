"use client";

import { MediaImage } from "@/components/media/MediaImage";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const light = variant === "light";
  return (
    <LocaleLink href="/" className={`flex min-w-0 items-center gap-2 ${className}`}>
      <MediaImage
        src={light ? "/images/lotus-logo-mark.png" : "/images/lotus-logo.png"}
        alt=""
        width={36}
        height={36}
        className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
        priority
      />
      <span
        className={`font-display text-[1.35rem] font-semibold leading-none sm:text-[1.65rem] ${
          light ? "text-white" : "text-saffron-deep"
        }`}
      >
        Bhakti <span className={`font-medium ${light ? "text-gold" : "text-saffron"}`}>Voice</span>
      </span>
    </LocaleLink>
  );
}
