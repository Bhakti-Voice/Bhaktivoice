"use client";

import { Award, BarChart3, CircleDot, Flame, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useMessages, useLocale } from "@/lib/i18n/client";
import { stripLocale } from "@/lib/i18n/config";
import { PATHS } from "@/lib/seo/paths";

export function JaapSidebar() {
  const pathname = usePathname() || "/";
  const t = useMessages();
  const locale = useLocale();
  const isHi = locale === "hi";
  const current = stripLocale(pathname);

  const links = [
    { href: PATHS.naamJaap, label: t.jaap.counter, icon: CircleDot, badge: "Live" },
    { href: PATHS.mala, label: t.hubs.mala.h1, icon: Sparkles, badge: "108" },
    { href: `${PATHS.naamJaap}#progress-section`, label: t.jaap.progress, icon: BarChart3 },
    { href: PATHS.sankalp, label: t.nav.sankalp, icon: Flame, badge: isHi ? "संकल्प" : "Vow" },
    { href: PATHS.mantras, label: isHi ? "मंत्र संग्रह" : "Mantras", icon: Award },
    { href: "/profile", label: t.jaap.achievements, icon: Award },
  ];

  return (
    <aside className="h-fit rounded-3xl bg-gradient-to-b from-white to-[#fffaf4] p-3.5 shadow-sm ring-1 ring-[#ecd9be]">
      {/* Mini spiritual banner */}
      <div className="px-3 py-2.5 mb-2 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 border border-orange-200/60">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
          <span className="text-xs font-semibold text-orange-950 font-serif">
            {isHi ? "दैनिक नाम सुमिरन" : "Daily Remembrance"}
          </span>
        </div>
        <p className="text-[11px] text-orange-900/80 mt-1 leading-snug font-sans">
          {isHi ? "मन को शांत रखें, 108 नाम जपें।" : "Pause, sit, and chant 108 divine names."}
        </p>
      </div>

      <nav className="grid gap-1" aria-label={t.nav.jaap}>
        {links.map((link) => {
          const path = link.href.split("#")[0];
          const active = current === path && !link.href.includes("#");
          return (
            <LocaleLink
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={`flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-[#fff4ea] to-[#ffedd5] font-semibold text-saffron-deep ring-1 ring-orange-200 shadow-xs"
                  : "text-ink/80 hover:bg-[#fff6eb] hover:text-ink"
              }`}
            >
              <div className="flex items-center gap-3">
                <link.icon
                  className={`h-4 w-4 ${active ? "text-saffron fill-saffron/20" : "text-saffron/80"}`}
                />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    active
                      ? "bg-saffron text-white"
                      : "bg-amber-100/80 text-amber-800 border border-amber-200"
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </LocaleLink>
          );
        })}
      </nav>
    </aside>
  );
}

