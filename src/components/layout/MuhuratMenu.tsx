"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Clock, Sparkles } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useLocale } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n/config";

interface MuhuratMenuItem {
  href: string;
  labelEn: string;
  labelHi: string;
}

// 3 Columns matching user reference screenshot
const MUHURAT_COLUMNS: { items: MuhuratMenuItem[] }[] = [
  // Column 1
  {
    items: [
      { href: "/muhurat#choghadiya", labelEn: "Choghadiya", labelHi: "चौघड़िया (दिन-रात)" },
      { href: "/muhurat#shubha-hora", labelEn: "Shubha Hora", labelHi: "शुभ ग्रह होरा" },
      { href: "/shubh-dates/vivah-muhurat", labelEn: "Vivah Muhurat", labelHi: "विवाह मुहूर्त 2026 (कैलेंडर)" },
      { href: "/shubh-dates/griha-pravesh", labelEn: "Griha Pravesh", labelHi: "गृह प्रवेश मुहूर्त (कैलेंडर)" },
      { href: "/shubh-dates/property-purchase", labelEn: "Property Purchase", labelHi: "संपत्ति क्रय मुहूर्त (कैलेंडर)" },
    ],
  },
  // Column 2
  {
    items: [
      { href: "/shubh-dates/vehicle-purchase", labelEn: "Vehicle Purchase", labelHi: "वाहन क्रय मुहूर्त (कैलेंडर)" },
      { href: "/shubh-dates/business-opening", labelEn: "Business Opening", labelHi: "व्यापार/दुकान उद्घाटन (कैलेंडर)" },
      { href: "/shubh-dates/gold-buying", labelEn: "Gold Buying Muhurat", labelHi: "सोना/चांदी क्रय मुहूर्त" },
      { href: "/shubh-dates/naamkaran", labelEn: "Naamkaran Muhurat", labelHi: "नामकरण संस्कार मुहूर्त" },
      { href: "/shubh-dates/mundan", labelEn: "Mundan Muhurat", labelHi: "मुंडन संस्कार मुहूर्त" },
    ],
  },
  // Column 3
  {
    items: [
      { href: "/shubh-dates/vidyarambha", labelEn: "Vidyarambha", labelHi: "विद्यारंभ संस्कार मुहूर्त" },
      { href: "/shubh-dates/karnavedha", labelEn: "Karnavedha Muhurat", labelHi: "कर्णवेध संस्कार मुहूर्त" },
      { href: "/muhurat#auspicious-yoga", labelEn: "Auspicious Yoga", labelHi: "सर्वार्थ व अमृत सिद्धि योग" },
      { href: "/muhurat#panchaka-rahita", labelEn: "Panchaka Rahita", labelHi: "पंचक रहित मुहूर्त" },
      { href: "/muhurat#abhijit-muhurat", labelEn: "Abhijit Muhurat", labelHi: "अभिजित मुहूर्त" },
    ],
  },
];

export function MuhuratMenu({
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

  const isMuhuratActive = pathname === "/muhurat" || pathname.startsWith("/muhurat/");

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
            {locale === "hi" ? "शुभ मुहूर्त एवं चौघड़िया" : "Muhurat & Timings"}
          </p>
        </div>
        <LocaleLink
          href="/muhurat"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-xl bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-900"
        >
          <Clock className="h-3.5 w-3.5 text-saffron" />
          <span>{locale === "hi" ? "सम्पूर्ण मुहूर्त हब देखें" : "Explore All Muhurats"}</span>
        </LocaleLink>
        <div className="grid grid-cols-2 gap-1 px-1">
          {MUHURAT_COLUMNS.flatMap((c) => c.items).map((item) => (
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
          open || isMuhuratActive
            ? "font-semibold text-maroon underline decoration-saffron decoration-2 underline-offset-[10px]"
            : "font-medium text-ink/70 hover:text-saffron"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>{locale === "hi" ? "मुहूर्त" : "Muhurat"}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-saffron" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/3 top-full z-50 mt-1 w-[620px] animate-in fade-in zoom-in-95 duration-150 rounded-2xl border border-line bg-[#fffbf6] p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur-md"
        >
          {/* Header Bar inside popup with Quick links */}
          <div className="mb-3 flex items-center justify-between border-b border-line pb-2.5 px-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-saffron animate-pulse" />
              <span className="font-bold tracking-wider text-maroon uppercase text-[11px]">
                {locale === "hi" ? "वैदिक शुभ मुहूर्त एवं समय शुद्धि" : "Vedic Muhurat & Time Selection"}
              </span>
            </div>
            <LocaleLink
              href="/muhurat"
              onClick={() => setOpen(false)}
              className="font-bold text-saffron-deep hover:text-maroon underline decoration-saffron decoration-2 underline-offset-4 transition-colors"
            >
              {locale === "hi" ? "सम्पूर्ण मुहूर्त मार्गदर्शिका →" : "All Muhurat Details →"}
            </LocaleLink>
          </div>

          {/* 3-column Grid matching user screenshot */}
          <div className="grid grid-cols-3 gap-2">
            {MUHURAT_COLUMNS.map((col, colIdx) => (
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
                ? "त्रिबल शुद्धि, बाण दोष परिहार एवं शुभ लग्न निर्धारण"
                : "Tribala Shuddhi, Baan Dosha Remediation & Auspicious Lagna"}
            </span>
            <span className="font-medium text-saffron-deep flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Vedic Ganita
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
