"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useMessages } from "@/lib/i18n/client";
import { PATHS } from "@/lib/seo/paths";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n/config";

const TOOL_PATHS = [PATHS.spiritualTools, PATHS.kundli, PATHS.kundliMilan] as const;

export function SpiritualToolsMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const t = useMessages();
  const pathname = stripLocale(usePathname() || "/");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = TOOL_PATHS.some((href) => pathname === href || pathname.startsWith(`${href}/`));

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

  const links = [
    { href: PATHS.spiritualTools, label: t.spiritualTools.allTools },
    { href: PATHS.kundli, label: t.spiritualTools.tools.kundli.title },
    { href: PATHS.kundliMilan, label: t.spiritualTools.tools.milan.title },
  ];

  if (mobile) {
    return (
      <div className="space-y-1">
        <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">{t.nav.spiritualTools}</p>
        {links.map((item) => (
          <LocaleLink
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="block rounded-xl px-3 py-2.5 text-ink hover:bg-cream"
          >
            {item.label}
          </LocaleLink>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex cursor-pointer items-center gap-0.5 text-[13px] tracking-wide ${
          active || open ? "font-semibold text-saffron" : "font-medium text-ink/70 hover:text-saffron"
        }`}
        aria-expanded={open}
      >
        {t.nav.spiritualTools}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open ? (
        <div className="absolute left-0 z-50 mt-3 w-56 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-line">
          {links.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block cursor-pointer rounded-xl px-3 py-2 text-sm text-ink hover:bg-cream"
            >
              {item.label}
            </LocaleLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
