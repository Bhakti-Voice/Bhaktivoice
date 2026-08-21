"use client";

import { Search } from "lucide-react";

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
  return (
    <label className="flex h-11 max-w-xl items-center gap-2 rounded-full bg-white px-4 ring-1 ring-line focus-within:ring-2 focus-within:ring-saffron/40">
      <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
      <span className="sr-only">{label ?? placeholder}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-11 min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
      />
    </label>
  );
}
