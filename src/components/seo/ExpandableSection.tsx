import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function ExpandableSection({
  title,
  children,
  className = "",
  id,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <details
      id={id}
      className={`group mt-3 scroll-mt-24 rounded-2xl bg-white ring-1 ring-line ${className}`}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 [&::-webkit-details-marker]:hidden">
        <span className="font-serif text-lg text-ink">{title}</span>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted">
          <span className="group-open:hidden">Show</span>
          <span className="hidden group-open:inline">Hide</span>
          <ChevronDown className="h-4 w-4 text-saffron transition group-open:rotate-180" />
        </span>
      </summary>
      <div className="border-t border-line px-5 py-5">{children}</div>
    </details>
  );
}
