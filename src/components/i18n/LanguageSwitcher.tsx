"use client";

import { useEffect, useRef, useState } from "react";
import { withLocale, type Locale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";

/** Vercel/Next can report the homepage as `/index`; that must not become `/hi/index` or `/te/index`. */
function switcherPath(pathname: string): string {
  if (pathname === "/index" || pathname === "/index.html") return "/";
  if (pathname === "/hi/index" || pathname === "/hi/index.html") return "/hi";
  if (pathname === "/te/index" || pathname === "/te/index.html") return "/te";
  return pathname || "/";
}

const LANGUAGES: { code: Locale; label: string; nativeName: string; hrefLang: string }[] = [
  { code: "en", label: "EN", nativeName: "English", hrefLang: "en-IN" },
  { code: "hi", label: "हिन्दी", nativeName: "हिन्दी", hrefLang: "hi-IN" },
  { code: "te", label: "తెలుగు", nativeName: "తెలుగు", hrefLang: "te-IN" },
];

export function LanguageSwitcher() {
  const pathname = switcherPath(usePathname() || "/");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[#f4efe8] px-3 text-xs font-medium text-ink/80 transition-colors hover:bg-[#ede5dc] hover:text-saffron focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current language: ${current.nativeName}. Click to change language.`}
      >
        <Globe className="h-3.5 w-3.5 text-muted" />
        <span className="font-semibold">{current.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-40 origin-top-right rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-black/5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === locale;
              const href = withLocale(pathname, lang.code);
              return (
                <a
                  key={lang.code}
                  href={href}
                  hrefLang={lang.hrefLang}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                    isSelected
                      ? "bg-amber-50/80 font-semibold text-saffron-deep"
                      : "text-ink/80 hover:bg-[#f4efe8] hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">{lang.label}</span>
                    <span className="text-[11px] text-muted">({lang.nativeName})</span>
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-saffron-deep" />}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
