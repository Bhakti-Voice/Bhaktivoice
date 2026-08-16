"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { JAAP_MANTRAS, type JaapMantraSlug } from "@/components/jaap/mantras";

export function JaapMantraSelect({
  value,
  onChange,
}: {
  value: JaapMantraSlug;
  onChange: (slug: JaapMantraSlug) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = JAAP_MANTRAS.find((item) => item.slug === value) ?? JAAP_MANTRAS[0];

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setOpen((current) => !current);
  }

  function choose(event: MouseEvent<HTMLButtonElement>, slug: JaapMantraSlug) {
    event.stopPropagation();
    onChange(slug);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative" data-jaap-ignore>
      <button
        type="button"
        id="jaap-mantra"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        className="inline-flex items-center gap-2.5 rounded-full bg-white/90 py-2 pr-3 pl-4 shadow-sm ring-1 ring-line"
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: selected.color }} />
        <span className="text-left">
          <span className="block font-serif text-xl leading-tight" style={{ color: selected.color }}>
            {selected.label}
          </span>
          <span className="font-devanagari text-[11px] leading-none text-muted">{selected.text}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-muted transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-labelledby="jaap-mantra"
          className="absolute top-[calc(100%+10px)] left-1/2 z-30 w-[280px] -translate-x-1/2 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-line"
        >
          {JAAP_MANTRAS.map((mantra) => {
            const active = mantra.slug === value;
            return (
              <button
                key={mantra.slug}
                type="button"
                role="option"
                aria-selected={active}
                onClick={(event) => choose(event, mantra.slug)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                  active ? "bg-[#fff4ea]" : "hover:bg-cream"
                }`}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: mantra.color }} />
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-sm text-ink">{mantra.label}</span>
                  <span className="font-devanagari text-xs text-muted">{mantra.text}</span>
                </span>
                {active ? <Check className="h-4 w-4 shrink-0 text-saffron" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
