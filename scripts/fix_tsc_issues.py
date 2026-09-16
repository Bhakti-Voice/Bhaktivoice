# -*- coding: utf-8 -*-
import re

# 1. Fix src/app/bhadra/page.tsx
path_bhadra = "src/app/bhadra/page.tsx"
with open(path_bhadra, "r", encoding="utf-8") as f:
    content = f.read()

# Remove duplicate BHADRA_FAQS_TE definition
# Notice lines 136-155 had duplicate BHADRA_FAQS_TE
dup_pattern = r'const BHADRA_FAQS_TE = \[\s*\{\s*question: "భద్ర ఎవరు.*?\n\];'
matches = list(re.finditer(dup_pattern, content, re.DOTALL))
if len(matches) > 0:
    content = content[:matches[0].start()] + content[matches[0].end():]
    with open(path_bhadra, "w", encoding="utf-8") as f:
        f.write(content)
    print("SUCCESS: Fixed bhadra duplicate BHADRA_FAQS_TE")

# 2. Fix src/app/grahan/page.tsx
path_grahan = "src/app/grahan/page.tsx"
with open(path_grahan, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("  const isTe = locale === \"te\";\n  const isTe = locale === \"te\";", "  const isTe = locale === \"te\";")
with open(path_grahan, "w", encoding="utf-8") as f:
    f.write(content)
print("SUCCESS: Fixed grahan duplicate isTe")

# 3. Fix src/app/muhurat/page.tsx
path_muhurat = "src/app/muhurat/page.tsx"
with open(path_muhurat, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("  const isTe = locale === \"te\";\n  const isTe = locale === \"te\";", "  const isTe = locale === \"te\";")
with open(path_muhurat, "w", encoding="utf-8") as f:
    f.write(content)
print("SUCCESS: Fixed muhurat duplicate isTe")

# 4. Fix src/components/spiritual-tools/ManglikCard.tsx
path_manglik = "src/components/spiritual-tools/ManglikCard.tsx"
with open(path_manglik, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace('manglik.level === "Mild"', 'manglik.level === "Low"')
with open(path_manglik, "w", encoding="utf-8") as f:
    f.write(content)
print("SUCCESS: Fixed ManglikCard Mild -> Low")

# 5. Fix src/components/spiritual-tools/SpiritualToolsMenu.tsx
path_menu = "src/components/spiritual-tools/SpiritualToolsMenu.tsx"
new_menu_content = '''"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useLocale } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n/config";

interface ToolMenuItem {
  href: string;
  labelEn: string;
  labelHi: string;
  labelTe: string;
}

interface ToolColumn {
  categoryEn: string;
  categoryHi: string;
  categoryTe: string;
  items: ToolMenuItem[];
}

const TOOL_COLUMNS: ToolColumn[] = [
  // Column 1: Astrology & Kundli
  {
    categoryEn: "Astrology & Kundli",
    categoryHi: "ज्योतिष व कुंडली",
    categoryTe: "జ్యోతిష్యం & కుండలి",
    items: [
      { href: "/kundli", labelEn: "Free Janam Kundli", labelHi: "मुफ्त जन्म कुंडली", labelTe: "ఉచిత జన్మ కుండలి" },
      { href: "/kundli-milan", labelEn: "Kundli Milan (36 Guna)", labelHi: "३६ गुण कुंडली मिलान", labelTe: "కుండలి మిలన్ (36 గుణాలు)" },
      { href: "/baby-names", labelEn: "Baby Names by Nakshatra", labelHi: "नक्षत्र अनुसार नामकरण", labelTe: "నక్షత్ర నామకరణం" },
      { href: "/panchang/chandrabalam", labelEn: "Chandrabalam Finder", labelHi: "दैनिक चंद्रबलम", labelTe: "చంద్రబలం" },
      { href: "/panchang/nakshatra", labelEn: "Nakshatra Calculator", labelHi: "नक्षत्र एवं राशि फल", labelTe: "నక్షత్ర & రాశి ఫలాలు" },
    ],
  },
  // Column 2: Sadhana & Chanting
  {
    categoryEn: "Daily Sadhana & Jap",
    categoryHi: "नित्य साधना व जप",
    categoryTe: "నిత్య సాధన & జపం",
    items: [
      { href: "/naam-jaap", labelEn: "Digital Naam Jaap", labelHi: "डिजिटल नाम जप", labelTe: "డిజిటల్ నామ జపం" },
      { href: "/naam-jaap/mala", labelEn: "108 Jap Mala Counter", labelHi: "१०८ जप माला काउंटर", labelTe: "108 జప మాల కౌంటర్" },
      { href: "/daily-sadhana/sankalp", labelEn: "Daily Sankalp Vidhi", labelHi: "दैनिक संकल्प विधि", labelTe: "దిన సంకల్ప విధి" },
      { href: "/daily-sadhana/diary", labelEn: "Bhakti Sadhana Diary", labelHi: "नित्य साधना डायरी", labelTe: "భక్తి సాధన డైరీ" },
    ],
  },
  // Column 3: Utilities & Media
  {
    categoryEn: "Creative & Utilities",
    categoryHi: "उपयोगी टूल्स व मीडिया",
    categoryTe: "ఉపయోగకరమైన సాధనాలు & మీడియా",
    items: [
      { href: "/printable-calendar", labelEn: "Printable Wall Calendar (PDF)", labelHi: "दीवार कैलेंडर प्रिंट / PDF", labelTe: "క్యాలెండర్ ప్రింట్ / PDF" },
      { href: "/suvichar-card-maker", labelEn: "Suvichar Status Maker", labelHi: "सुविचार स्टेटस मेकर", labelTe: "సువిచార్ స్టేటస్ మేకర్" },
      { href: "/sacred-yatra-guides/planner", labelEn: "Tirth Yatra Planner", labelHi: "तीर्थ यात्रा प्लानर", labelTe: "తీర్థ యాత్ర ప్లానర్" },
      { href: "/panchang/panchang-utilities", labelEn: "Panchang Utilities", labelHi: "पंचांग टूल्स एवं गणना", labelTe: "పంచాంగ సాధనాలు" },
      { href: "/spiritual-tools", labelEn: "All Spiritual Tools (Hub)", labelHi: "सम्पूर्ण टूल्स हब", labelTe: "అన్ని సాధనాల హబ్" },
    ],
  },
];

const ALL_ITEMS = TOOL_COLUMNS.flatMap((c) => c.items);

export function SpiritualToolsMenu({
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

  const isToolsActive =
    pathname === "/spiritual-tools" ||
    pathname.startsWith("/spiritual-tools/") ||
    pathname === "/suvichar-card-maker" ||
    pathname.startsWith("/suvichar-card-maker/") ||
    pathname === "/naam-jaap" ||
    pathname.startsWith("/naam-jaap/") ||
    pathname === "/kundli" ||
    pathname.startsWith("/kundli/") ||
    pathname === "/kundli-milan" ||
    pathname.startsWith("/kundli-milan/") ||
    pathname === "/daily-sadhana/sankalp" ||
    pathname === "/daily-sadhana/diary";

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

  // Mobile drawer rendering matching Panchang/Muhurat/Vrat drawers
  if (mobile) {
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 pt-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {locale === "te" ? "ఆధ్యాత్మిక & వైదిక సాధనాలు" : locale === "hi" ? "आध्यात्मिक एवं वैदिक उपकरण" : "Spiritual Tools & Utilities"}
          </p>
        </div>
        <LocaleLink
          href="/spiritual-tools"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-xl bg-saffron/10 px-3 py-2 text-xs font-semibold text-saffron-deep"
        >
          <Sparkles className="h-3.5 w-3.5 text-saffron" />
          <span>{locale === "te" ? "అన్ని సాధనాల హబ్ చూడండి" : locale === "hi" ? "सम्पूर्ण टूल्स हब देखें" : "Explore All Spiritual Tools"}</span>
        </LocaleLink>
        <div className="grid grid-cols-2 gap-1 px-1">
          {ALL_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <LocaleLink
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`truncate rounded-xl px-2.5 py-1.5 text-xs transition-colors ${
                  active
                    ? "bg-maroon font-semibold text-white"
                    : "text-ink/80 hover:bg-cream hover:text-saffron-deep"
                }`}
              >
                {locale === "te" ? item.labelTe : locale === "hi" ? item.labelHi : item.labelEn}
              </LocaleLink>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Dropdown matching the header popup theme & styling
  return (
    <div className="relative" ref={ref} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className={`inline-flex cursor-pointer items-center gap-1 whitespace-nowrap shrink-0 text-[13px] tracking-wide transition-colors ${
          open || isToolsActive
            ? "font-semibold text-maroon underline decoration-saffron decoration-2 underline-offset-[10px]"
            : "font-medium text-ink/70 hover:text-saffron"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>{locale === "te" ? "ఆధ్యాత్మిక సాధనాలు" : locale === "hi" ? "आध्यात्मिक उपकरण" : "Spiritual Tools"}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-saffron" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-3/4 top-full z-50 mt-1 w-[620px] max-w-[calc(100vw-2rem)] animate-in fade-in zoom-in-95 duration-150 rounded-2xl border border-line bg-[#fffbf6] p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur-md"
        >
          {/* Header Bar inside popup with Quick links */}
          <div className="mb-3 flex items-center justify-between border-b border-line pb-2.5 px-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-saffron animate-pulse" />
              <span className="font-bold tracking-wider text-maroon uppercase text-[11px]">
                {locale === "te" ? "వైదిక & ఆధ్యాత్మిక సాధనాలు" : locale === "hi" ? "वैदिक एवं आध्यात्मिक साधन" : "Vedic & Spiritual Utility Tools"}
              </span>
            </div>
            <LocaleLink
              href="/spiritual-tools"
              onClick={() => setOpen(false)}
              className="font-bold text-saffron-deep hover:text-maroon underline decoration-saffron decoration-2 underline-offset-4 transition-colors"
            >
              {locale === "te" ? "అన్ని సాధనాల హబ్ →" : locale === "hi" ? "सम्पूर्ण टूल्स हब →" : "All Spiritual Tools →"}
            </LocaleLink>
          </div>

          {/* 3-column Grid matching site theme & other popups */}
          <div className="grid grid-cols-3 gap-2">
            {TOOL_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="space-y-1.5">
                <div className="text-[10px] font-bold text-maroon/75 uppercase tracking-wider px-1 pb-0.5 text-center">
                  {locale === "te" ? col.categoryTe : locale === "hi" ? col.categoryHi : col.categoryEn}
                </div>
                {col.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/spiritual-tools" && pathname.startsWith(`${item.href}/`));
                  return (
                    <LocaleLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-3 py-2 text-center text-xs font-semibold tracking-wide transition-all duration-150 border shadow-xs ${
                        active
                          ? "border-saffron bg-saffron text-white shadow-sm"
                          : "border-[#edd8c4] bg-[#fbf3e7] text-ink hover:bg-[#fae7cf] hover:border-saffron hover:text-saffron-deep hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0"
                      }`}
                    >
                      <span className="block truncate">
                        {locale === "te" ? item.labelTe : locale === "hi" ? item.labelHi : item.labelEn}
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
              {locale === "te"
                ? "100% ఉచితం మరియు సురక్షితం — డేటా మీ బ్రౌజర్‌లోనే భద్రంగా ఉంటుంది"
                : locale === "hi"
                ? "100% निःशुल्क एवं सुरक्षित — डेटा सीधे आपके ब्राउज़र में सुरक्षित रहता है"
                : "100% Free, Private & Secure — Client-side Vedic tools, zero server logs"}
            </span>
            <span className="font-medium text-saffron-deep flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Vedic Tools
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
'''
with open(path_menu, "w", encoding="utf-8") as f:
    f.write(new_menu_content)
print("SUCCESS: Updated SpiritualToolsMenu with complete Telugu support")
