"use client";

import { Check, ChevronDown, Sparkles } from "lucide-react";
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
        className="group inline-flex items-center gap-3 rounded-full bg-white/95 py-2.5 pr-4 pl-4 shadow-sm ring-1 ring-[#e8cca8] hover:ring-saffron/60 hover:shadow-md transition-all duration-200"
      >
        <span
          className="h-3.5 w-3.5 shrink-0 rounded-full shadow-xs"
          style={{ backgroundColor: selected.color }}
        />
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span
              className="font-serif text-lg sm:text-xl font-semibold leading-none"
              style={{ color: selected.color }}
            >
              {selected.label}
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {selected.deity}
            </span>
          </div>
          <span className="font-devanagari text-xs leading-none text-muted block mt-0.5">
            {selected.text.length > 28 ? `${selected.text.slice(0, 26)}...` : selected.text}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted group-hover:text-ink transition-transform duration-200 ${
            open ? "rotate-180 text-saffron" : ""
          }`}
        />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-labelledby="jaap-mantra"
          className="absolute top-[calc(100%+12px)] left-1/2 z-40 w-[min(340px,calc(100vw-2rem))] -translate-x-1/2 rounded-3xl bg-white/98 backdrop-blur-md p-2 shadow-2xl ring-1 ring-[#ecd9be] animate-fade-in"
        >
          <div className="px-3 py-2 border-b border-stone-100 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-saffron" />
              पावन मंत्र चयन (Select Mantra)
            </span>
          </div>

          <div className="space-y-1 max-h-[320px] overflow-y-auto">
            {JAAP_MANTRAS.map((mantra) => {
              const active = mantra.slug === value;
              return (
                <button
                  key={mantra.slug}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={(event) => choose(event, mantra.slug)}
                  className={`flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#fff4ea] to-[#ffedd5] shadow-xs ring-1 ring-orange-200"
                      : "hover:bg-[#fff9f2]"
                  }`}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: mantra.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-serif text-sm font-semibold text-ink">
                        {mantra.label}
                      </span>
                      <span className="text-[10px] text-muted truncate">{mantra.deity}</span>
                    </div>
                    <span className="font-devanagari text-xs text-muted block truncate mt-0.5">
                      {mantra.text}
                    </span>
                  </div>
                  {active ? (
                    <Check className="h-4 w-4 shrink-0 text-saffron" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

