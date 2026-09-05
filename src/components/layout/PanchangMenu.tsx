"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Calendar, Moon, Sun, Compass } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useLocale } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n/config";

interface PanchangMenuItem {
  slug: string;
  href: string;
  labelEn: string;
  labelHi: string;
}

// 4 Columns exactly matching user screenshot
const PANCHANG_COLUMNS: { titleEn?: string; titleHi?: string; items: PanchangMenuItem[] }[] = [
  // Column 1
  {
    items: [
      { slug: "month-panchang", href: "/panchang/month-panchang", labelEn: "Month Panchang", labelHi: "मासिक पंचांग" },
      { slug: "dainik-panchang", href: "/panchang/dainik-panchang", labelEn: "Dainik Panchang", labelHi: "दैनिक पंचांग" },
      { slug: "assamese-panjika", href: "/panchang/assamese-panjika", labelEn: "Assamese Panjika", labelHi: "असमिया पंजिका" },
      { slug: "bengali-panjika", href: "/panchang/bengali-panjika", labelEn: "Bengali Panjika", labelHi: "बंगाली पंजिका" },
      { slug: "tamil-panchangam", href: "/panchang/tamil-panchangam", labelEn: "Tamil Panchangam", labelHi: "तमिल पंचांगम" },
    ],
  },
  // Column 2
  {
    items: [
      { slug: "odia-panji", href: "/panchang/odia-panji", labelEn: "Odia Panji", labelHi: "ओड़िया पांजी" },
      { slug: "malayalam-panchangam", href: "/panchang/malayalam-panchangam", labelEn: "Malayalam Panchangam", labelHi: "मलयालम पंचांगम" },
      { slug: "marathi-panchang", href: "/panchang/marathi-panchang", labelEn: "Marathi Panchang", labelHi: "मराठी पंचांग" },
      { slug: "gujarati-panchang", href: "/panchang/gujarati-panchang", labelEn: "Gujarati Panchang", labelHi: "गुजराती पंचांग" },
      { slug: "kannada-panchang", href: "/panchang/kannada-panchang", labelEn: "Kannada Panchang", labelHi: "कन्नड़ पंचांग" },
    ],
  },
  // Column 3
  {
    items: [
      { slug: "telugu-panchangam", href: "/panchang/telugu-panchangam", labelEn: "Telugu Panchangam", labelHi: "तेलुगु पंचांगम" },
      { slug: "nepali-patro", href: "/panchang/nepali-patro", labelEn: "Nepali Patro", labelHi: "नेपाली पात्रो" },
      { slug: "iskcon-panchang", href: "/panchang/iskcon-panchang", labelEn: "ISKCON Panchang", labelHi: "इस्कॉन पंचांग" },
      { slug: "chandrabalam", href: "/panchang/chandrabalam", labelEn: "Chandrabalam", labelHi: "चंद्रबलम" },
      { slug: "panchang-utilities", href: "/panchang/panchang-utilities", labelEn: "Panchang Utilities", labelHi: "पंचांग टूल्स" },
    ],
  },
  // Column 4
  {
    items: [
      { slug: "vinchudo", href: "/panchang/vinchudo", labelEn: "Vinchudo", labelHi: "विंछुड़ो विचार" },
      { slug: "nakshatra", href: "/panchang/nakshatra", labelEn: "Nakshatra", labelHi: "नक्षत्र फल" },
    ],
  },
];

const ALL_ITEMS = PANCHANG_COLUMNS.flatMap((c) => c.items);

export function PanchangMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const locale = useLocale();
  const pathname = stripLocale(usePathname() || "/");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isPanchangActive =
    pathname === "/panchang" ||
    pathname.startsWith("/panchang/") ||
    pathname === "/hindu-calendar" ||
    pathname.startsWith("/hindu-calendar/");

  useEffect(() => {
    if (!open) return;
    function close(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Mobile drawer rendering
  if (mobile) {
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 pt-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {locale === "hi" ? "पंचांग एवं कैलेंडर" : "Panchang & Calendars"}
          </p>
        </div>
        <LocaleLink
          href="/panchang/today"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-xl bg-saffron/10 px-3 py-2 text-xs font-semibold text-saffron-deep"
        >
          <Sun className="h-3.5 w-3.5" />
          <span>{locale === "hi" ? "आज का पंचांग (Live)" : "Today's Panchang (Live)"}</span>
        </LocaleLink>
        <div className="grid grid-cols-2 gap-1 pt-1">
          {ALL_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <LocaleLink
                key={item.slug}
                href={item.href}
                onClick={onNavigate}
                className={`truncate rounded-xl px-3 py-2 text-xs transition-colors ${
                  active
                    ? "bg-maroon font-semibold text-white"
                    : "text-ink/80 hover:bg-cream hover:text-saffron-deep"
                }`}
              >
                {locale === "hi" ? item.labelHi : item.labelEn}
              </LocaleLink>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Dropdown matching the user's reference image styling
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className={`inline-flex cursor-pointer items-center gap-1 text-[13px] tracking-wide transition-colors ${
          open || isPanchangActive
            ? "font-semibold text-maroon underline decoration-saffron decoration-2 underline-offset-[10px]"
            : "font-medium text-ink/70 hover:text-saffron"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>{locale === "hi" ? "पंचांग" : "Panchang"}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-saffron" : ""}`}
        />
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute left-1/2 -translate-x-1/4 top-full z-50 mt-2 w-[760px] animate-in fade-in zoom-in-95 duration-150 rounded-2xl border-2 border-[#b85d19] bg-[#5a1e12] p-3 shadow-2xl ring-1 ring-black/20"
          style={{
            backgroundImage: "linear-gradient(180deg, #6b2416 0%, #4a150c 100%)",
          }}
        >
          {/* Header Bar inside popup with Quick links */}
          <div className="mb-2.5 flex items-center justify-between border-b border-[#a2491a]/60 pb-2 px-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#f6ad55] animate-pulse" />
              <span className="font-bold tracking-wider text-[#fed7aa] uppercase text-[11px]">
                {locale === "hi" ? "सम्पूर्ण वैदिक एवं क्षेत्रीय पंचांग" : "Vedic & Regional Panchang Systems"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <LocaleLink
                href="/panchang/today"
                onClick={() => setOpen(false)}
                className="font-bold text-[#ffedd5] hover:text-[#fbbf24] underline decoration-[#f6ad55] underline-offset-2"
              >
                {locale === "hi" ? "आज का पंचांग →" : "Today's Panchang →"}
              </LocaleLink>
              <LocaleLink
                href="/hindu-calendar"
                onClick={() => setOpen(false)}
                className="font-medium text-[#fed7aa] hover:text-white"
              >
                {locale === "hi" ? "हिन्दू कैलेंडर" : "Hindu Calendar"}
              </LocaleLink>
            </div>
          </div>

          {/* 4-column Grid matching user screenshot */}
          <div className="grid grid-cols-4 gap-2">
            {PANCHANG_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="space-y-1.5">
                {col.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <LocaleLink
                      key={item.slug}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-center text-xs font-medium tracking-wide transition-all duration-150 border shadow-sm ${
                        active
                          ? "border-[#f6ad55] bg-[#ea9b4a] text-[#42140b] font-bold shadow-inner"
                          : "border-[#b85d19] bg-[#e6a256] text-[#42140b] hover:bg-[#f6b26b] hover:border-[#fcd34d] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                      }`}
                    >
                      <span className="block truncate">
                        {locale === "hi" ? item.labelHi : item.labelEn}
                      </span>
                    </LocaleLink>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Bottom subtle banner */}
          <div className="mt-2.5 pt-2 border-t border-[#a2491a]/40 text-[11px] text-[#fed7aa]/80 flex items-center justify-between px-1">
            <span>
              {locale === "hi"
                ? "प्रामाणिक दृक सिद्धांत एवं सटीक गृह-नक्षत्र काल गणना"
                : "100% Accurate Drik Ganita, Sidereal Longitudes & Muhurat"}
            </span>
            <span className="text-[#fed7aa]/60">Lahiri Ayanamsa</span>
          </div>
        </div>
      )}
    </div>
  );
}
