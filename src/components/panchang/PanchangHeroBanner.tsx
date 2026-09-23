import React from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/content/types";
import { Clock, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";

export interface PanchangHeroBannerProps {
  title: string;
  subtitle: string;
  crumbs?: BreadcrumbItem[];
  locale?: string;
}

export function PanchangHeroBanner({
  title,
  subtitle,
  crumbs,
  locale = "en",
}: PanchangHeroBannerProps) {
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const badges = [
    {
      icon: Clock,
      label: isTe
        ? "ఖచ్చితమైన వైదిక గణన"
        : isHi
        ? "सटीक वैदिक गणना"
        : "Accurate Vedic Calculations",
    },
    {
      icon: Sparkles,
      label: isTe
        ? "శుభ ముహూర్త మార్గదర్శనం"
        : isHi
        ? "शुभ मुहूर्त मार्गदर्शन"
        : "Auspicious Timing Guidance",
    },
    {
      icon: ShieldCheck,
      label: isTe
        ? "సులభమైన వివరణ"
        : isHi
        ? "सरल एवं स्पष्ट"
        : "Simple & Easy to Understand",
    },
    {
      icon: HeartHandshake,
      label: isTe
        ? "సన్మార్గ సాధన"
        : isHi
        ? "सद्गति एवं कल्याण"
        : "Devotion for a Better Life",
    },
  ];

  const quote = isTe
    ? "మంచి సమయం శుభారంభానికి మూలం."
    : isHi
    ? "शुभ मुहूर्त श्रेष्ठ प्रारंभ की नींव है।"
    : "Good timings create good beginnings.";

  const sacredMantra = "॥ शुभं भवतु ॥";

  return (
    <section className="relative overflow-hidden border-b border-amber-200/50 bg-gradient-to-b from-[#fefbf6] via-[#fdf7ee] to-[#fbf2e3] pt-3 pb-4 sm:pt-6 sm:pb-8">
      {/* Background Decorative Temple Silhouette */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-15">
        <Image
          src="/images/vrindavan-temple.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top filter blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/70 via-transparent to-[#fbf2e3]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {crumbs && (
          <div className="mb-2 sm:mb-3">
            <Breadcrumbs items={crumbs} />
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          {/* Main Title & Subtitle & Badges */}
          <div className="max-w-3xl space-y-2 sm:space-y-3">
            {/* Sacred Tag Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-100/70 px-3.5 py-1 text-xs font-bold text-amber-900 shadow-2xs backdrop-blur-xs">
              <span className="text-sm">🕉️</span>
              <span className="font-serif tracking-wider">ॐ नमः शिवाय</span>
            </div>

            <h1 className="font-serif text-2xl font-extrabold tracking-tight text-[#2b1e16] sm:text-4xl lg:text-[42px] leading-tight">
              {title}
            </h1>

            <p className="max-w-2xl text-xs sm:text-sm text-[#5a483a] leading-relaxed">
              {subtitle}
            </p>

            {/* 4 Feature Badges - Horizontal Scroll on Mobile, Wrap on Desktop */}
            <div className="pt-1 sm:pt-2 flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none flex-nowrap sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0">
              {badges.map((b, idx) => {
                const IconComponent = b.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-xl border border-amber-200/80 bg-white/85 px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#4a3628] shadow-2xs backdrop-blur-xs transition hover:border-amber-300"
                  >
                    <div className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                      <IconComponent className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </div>
                    <span className="whitespace-nowrap">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Quote Callout */}
          <div className="hidden lg:flex lg:flex-col lg:items-end justify-center shrink-0">
            <div className="relative rounded-2xl border border-amber-200/70 bg-gradient-to-br from-white/95 via-amber-50/60 to-white/95 p-4 shadow-xs backdrop-blur-xs max-w-xs text-right">
              <span className="absolute -top-3 right-4 font-serif text-3xl leading-none text-amber-400/50">
                “
              </span>
              <p className="font-serif text-sm font-semibold italic text-[#50321c] leading-snug">
                “{quote}”
              </p>
              <div className="mt-1 font-serif text-xs font-bold text-amber-800 tracking-wider">
                {sacredMantra}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
