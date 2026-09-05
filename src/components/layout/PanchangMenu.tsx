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
          className="absolute left-1/2 -translate-x-1/4 top-full z-50 mt-2 w-[760px] animate-in fade-in zoom-in-95 duration-150 rounded-2xl border border-line bg-[#fffbf6] p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur-md"
        >
          {/* Header Bar inside popup with Quick links */}
          <div className="mb-3 flex items-center justify-between border-b border-line pb-2.5 px-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-saffron animate-pulse" />
              <span className="font-bold tracking-wider text-maroon uppercase text-[11px]">
                {locale === "hi" ? "सम्पूर्ण वैदिक एवं क्षेत्रीय पंचांग" : "Vedic & Regional Panchang Systems"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <LocaleLink
                href="/panchang/today"
                onClick={() => setOpen(false)}
                className="font-bold text-saffron-deep hover:text-maroon underline decoration-saffron decoration-2 underline-offset-4 transition-colors"
              >
                {locale === "hi" ? "आज का पंचांग →" : "Today's Panchang →"}
              </LocaleLink>
              <LocaleLink
                href="/hindu-calendar"
                onClick={() => setOpen(false)}
                className="font-medium text-muted hover:text-maroon transition-colors"
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
                      className={`block rounded-xl px-3 py-2 text-center text-xs font-semibold tracking-wide transition-all duration-150 border shadow-xs ${
                        active
                          ? "border-saffron bg-saffron text-white shadow-sm"
                          : "border-[#edd8c4] bg-[#fbf3e7] text-ink hover:bg-[#fae7cf] hover:border-saffron hover:text-saffron-deep hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0"
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
          <div className="mt-3 pt-2.5 border-t border-line text-[11px] text-muted flex items-center justify-between px-1">
            <span>
              {locale === "hi"
                ? "प्रामाणिक दृक सिद्धांत एवं सटीक गृह-नक्षत्र काल गणना"
                : "100% Accurate Drik Ganita, Sidereal Longitudes & Muhurat"}
            </span>
            <span className="font-medium text-saffron-deep">Lahiri Ayanamsa</span>
          </div>
        </div>
      )}
    </div>
  );
}
