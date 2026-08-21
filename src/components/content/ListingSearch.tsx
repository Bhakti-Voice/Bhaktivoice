"use client";

import { Search } from "lucide-react";
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
    <div className="w-full rounded-[28px] bg-white px-4 py-4 shadow-[0_8px_28px_rgba(230,126,34,0.08)] ring-1 ring-saffron/15 sm:px-5 sm:py-5">
      <form
        className="flex items-center gap-3 sm:gap-4"
        onSubmit={(event) => event.preventDefault()}
        role="search"
      >
        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff7f0] ring-1 ring-saffron/20 sm:flex">
          <MediaImage
            src="/images/lotus-logo-mark.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        </div>

        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white py-1.5 pr-1.5 pl-3.5 ring-1 ring-line focus-within:ring-2 focus-within:ring-saffron/35 sm:gap-3 sm:pl-4">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <span className="sr-only">{searchLabel}</span>
          <input
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className="h-10 min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:h-11"
          />
          <button
            type="submit"
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-saffron px-3.5 text-sm font-medium text-white hover:bg-saffron-deep sm:h-10 sm:px-5"
          >
            <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
            <span>{searchLabel}</span>
          </button>
        </label>
      </form>
    </div>
  );
}
