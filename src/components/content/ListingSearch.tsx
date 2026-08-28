"use client";

import { Search, X } from "lucide-react";
import { MediaImage } from "@/components/media/MediaImage";
import { useMessages } from "@/lib/i18n/client";

export function ListingSearch({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
}) {
  const t = useMessages();
  const searchLabel = label ?? t.search;

  return (
    <div className="w-full rounded-[26px] bg-gradient-to-r from-white via-[#fffdfa] to-[#fff9f0] p-2.5 sm:p-3 shadow-[0_4px_20px_rgba(217,119,6,0.07)] ring-1 ring-amber-200/75 transition-all">
      <form
        className="flex items-center gap-2.5 sm:gap-3"
        onSubmit={(event) => event.preventDefault()}
        role="search"
      >
        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 ring-1 ring-amber-200/60 sm:flex">
          <MediaImage
            src="/images/lotus-logo-mark.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        </div>

        <label className="relative flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white py-1 pr-1.5 pl-3.5 ring-1 ring-[#e8dac4] focus-within:ring-2 focus-within:ring-saffron/40 focus-within:border-saffron/40 shadow-xs sm:gap-3 sm:pl-4">
          <Search className="h-4 w-4 shrink-0 text-stone-400" aria-hidden />
          <span className="sr-only">{searchLabel}</span>
          <input
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className="h-9 min-w-0 flex-1 border-0 bg-transparent text-xs sm:text-sm text-ink outline-none placeholder:text-stone-400"
          />

          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}

          <button
            type="submit"
            className="inline-flex h-8 sm:h-9 shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-saffron to-saffron-deep px-3.5 sm:px-4 text-xs sm:text-sm font-semibold text-white shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            <Search className="h-3.5 w-3.5" aria-hidden />
            <span>{searchLabel}</span>
          </button>
        </label>
      </form>
    </div>
  );
}
