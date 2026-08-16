"use client";

import { Award, BarChart3, CircleDot, History, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useMessages } from "@/lib/i18n/client";
import { stripLocale } from "@/lib/i18n/config";
import { PATHS } from "@/lib/seo/paths";

export function JaapSidebar() {
  const pathname = usePathname() || "/";
  const t = useMessages();
  const current = stripLocale(pathname);
  const links = [
    { href: PATHS.naamJaap, label: t.jaap.counter, icon: CircleDot },
    { href: PATHS.mala, label: t.hubs.mala.h1, icon: Sparkles },
    { href: `${PATHS.naamJaap}#history`, label: t.jaap.history, icon: History },
    { href: PATHS.sankalp, label: t.nav.sankalp, icon: Award },
    { href: `${PATHS.naamJaap}#statistics`, label: t.jaap.statistics, icon: BarChart3 },
    { href: "/profile", label: t.jaap.achievements, icon: Award },
  ];

  return (
    <aside className="h-fit rounded-[28px] bg-white/90 p-3 shadow-sm ring-1 ring-line">
      <nav className="grid gap-1" aria-label={t.nav.jaap}>
        {links.map((link) => {
          const path = link.href.split("#")[0];
          const active = current === path && !link.href.includes("#");
          return (
            <LocaleLink
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm ${
                active ? "bg-[#fff4ea] font-medium text-saffron-deep" : "text-ink/80 hover:bg-cream"
              }`}
            >
              <link.icon className={`h-4 w-4 ${active ? "text-saffron" : "text-saffron/80"}`} />
              {link.label}
            </LocaleLink>
          );
        })}
      </nav>
    </aside>
  );
}
