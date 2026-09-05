"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Flame, Sparkles } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useLocale } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n/config";

interface VratMenuItem {
  href: string;
  labelEn: string;
  labelHi: string;
}

// 3 Columns covering all Vrats
const VRAT_COLUMNS: { items: VratMenuItem[] }[] = [
  // Column 1
  {
    items: [
      { href: "/vrat-upavas#ekadashi-vrat", labelEn: "Ekadashi Vrat & Parana", labelHi: "एकादशी व्रत एवं पारण" },
      { href: "/vrat-upavas#pradosh-vrat", labelEn: "Pradosh Vrat (Shiva)", labelHi: "प्रदोष व्रत (त्रयोदशी)" },
      { href: "/vrat-upavas#sankashti-chaturthi", labelEn: "Sankashti Chaturthi", labelHi: "संकष्टी चतुर्थी (गणेश)" },
      { href: "/vrat-upavas#masik-shivratri", labelEn: "Masik Shivratri", labelHi: "मासिक शिवरात्रि व्रत" },
      { href: "/vrat-upavas#purnima-vrat", labelEn: "Purnima & Satyanarayan", labelHi: "पूर्णिमा व्रत व कथा" },
    ],
  },
  // Column 2
  {
    items: [
      { href: "/vrat-upavas#amavasya-tarpan", labelEn: "Amavasya & Pitru Tarpan", labelHi: "अमावस्या एवं पितृ तर्पण" },
      { href: "/vrat-upavas#navratri-vrat", labelEn: "Navratri 9 Days Vrat", labelHi: "नवरात्रि ९ दिवसीय व्रत" },
      { href: "/vrat-upavas#rohini-vrat", labelEn: "Rohini Vrat & Jain", labelHi: "रोहिणी व्रत एवं पच्चक्खाण" },
      { href: "/vrat-upavas#sawan-somwar", labelEn: "Sawan Somwar Vrat", labelHi: "सावन सोमवार व्रत" },
      { href: "/vrat-upavas#skanda-sashti", labelEn: "Skanda Sashti Vrat", labelHi: "स्कंद षष्ठी (कार्तिकेय)" },
    ],
  },
  // Column 3
  {
    items: [
      { href: "/vrat-upavas#varalakshmi-vrat", labelEn: "Varalakshmi Vrat", labelHi: "वरलक्ष्मी व्रत" },
      { href: "/vrat-upavas#karwa-chauth", labelEn: "Karwa Chauth Vrat", labelHi: "करवा चौथ व्रत" },
      { href: "/vrat-upavas#ahar-niyam", labelEn: "Vrat Ahar Rules (Phalahar)", labelHi: "व्रत आहार नियम (फलाहार)" },
      { href: "/vrat-upavas#sankalp-vidhi", labelEn: "Vrat Sankalp Vidhi", labelHi: "व्रत संकल्प एवं उद्यापन" },
      { href: "/vrat-upavas#all-vrats", labelEn: "Full 2026 Vrat Calendar", labelHi: "सम्पूर्ण व्रत कैलेंडर 2026" },
    ],
  },
];

export function VratMenu({
  mobile = false,
  onNavigate,
  isOpen,
  onToggle,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}) {
  const locale = useLocale();
  const pathname = stripLocale(usePathname() || "/");
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onToggle || setInternalOpen;
  const ref = useRef<HTMLDivElement>(null);

  const isVratActive = pathname === "/vrat-upavas" || pathname.startsWith("/vrat-upavas/");

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
            {locale === "hi" ? "सनातन व्रत एवं उपवास" : "Vrat & Upavas"}
          </p>
        </div>
        <LocaleLink
          href="/vrat-upavas"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-xl bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-950"
        >
          <Flame className="h-3.5 w-3.5 text-orange-600" />
          <span>{locale === "hi" ? "सम्पूर्ण व्रत हब देखें" : "Explore All Vrats"}</span>
        </LocaleLink>
        <div className="grid grid-cols-2 gap-1 px-1">
          {VRAT_COLUMNS.flatMap((c) => c.items).map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="truncate rounded-xl px-2.5 py-1.5 text-xs text-ink/80 hover:bg-cream hover:text-saffron-deep"
            >
              {locale === "hi" ? item.labelHi : item.labelEn}
            </LocaleLink>
          ))}
        </div>
      </div>
    );
  }

  // Desktop Dropdown matching user screenshot and site theme
  return (
    <div className="relative" ref={ref} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className={`inline-flex cursor-pointer items-center gap-1 whitespace-nowrap shrink-0 text-[13px] tracking-wide transition-colors ${
          open || isVratActive
            ? "font-semibold text-maroon underline decoration-saffron decoration-2 underline-offset-[10px]"
            : "font-medium text-ink/70 hover:text-saffron"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>{locale === "hi" ? "व्रत व उपवास" : "Vrat & Upavas"}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-saffron" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full z-50 mt-1 w-[620px] animate-in fade-in zoom-in-95 duration-150 rounded-2xl border border-line bg-[#fffbf6] p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur-md"
        >
          {/* Header Bar inside popup with Quick links */}
          <div className="mb-3 flex items-center justify-between border-b border-line pb-2.5 px-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-600 animate-pulse" />
              <span className="font-bold tracking-wider text-maroon uppercase text-[11px]">
                {locale === "hi" ? "सनातन व्रत, उपवास एवं पारण निर्णय" : "Sacred Vrats, Upavas & Fasting Rules"}
              </span>
            </div>
            <LocaleLink
              href="/vrat-upavas"
              onClick={() => setOpen(false)}
              className="font-bold text-saffron-deep hover:text-maroon underline decoration-saffron decoration-2 underline-offset-4 transition-colors"
            >
              {locale === "hi" ? "सम्पूर्ण व्रत निर्देशिका →" : "All Vrat Guides →"}
            </LocaleLink>
          </div>

          {/* 3-column Grid matching user screenshot */}
          <div className="grid grid-cols-3 gap-2">
            {VRAT_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="space-y-1.5">
                {col.items.map((item) => {
                  return (
                    <LocaleLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2 text-center text-xs font-semibold tracking-wide transition-all duration-150 border border-[#edd8c4] bg-[#fbf3e7] text-ink hover:bg-[#fae7cf] hover:border-saffron hover:text-saffron-deep hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
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
                ? "शास्त्रोक्त पारण समय, हरिवासर त्याग एवं सूर्योदय-व्यापिनी तिथि"
                : "Scriptural Parana Timing, Harivasara Avoidance & Sunrise Tithi"}
            </span>
            <span className="font-medium text-saffron-deep flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Shuddha Vrat
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
