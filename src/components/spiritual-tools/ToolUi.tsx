import type { ReactNode } from "react";
import { Lock, Sparkles } from "lucide-react";

export function PrivacyNotice({ text }: { text: string }) {
  return (
    <p className="inline-flex items-start gap-2 rounded-2xl bg-[#edf8f0] px-4 py-3 text-sm font-medium text-[#1f5c3a] ring-1 ring-[#b8e0c8]">
      <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>{text}</span>
    </p>
  );
}

export function ToolSection({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[28px] bg-white p-5 ring-1 ring-line sm:p-6 ${className}`}>
      {title ? <h2 className="font-serif text-xl text-ink">{title}</h2> : null}
      <div className={title ? "mt-4" : ""}>{children}</div>
    </section>
  );
}

export function ToolBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7f0] px-3 py-1 text-xs font-medium text-saffron-deep ring-1 ring-saffron/20">
      <Sparkles className="h-3 w-3" aria-hidden />
      {children}
    </span>
  );
}

export function ResultGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl bg-cream/60 px-4 py-3 ring-1 ring-line/70">
          <dt className="text-xs uppercase tracking-wide text-muted">{item.label}</dt>
          <dd className="mt-1 font-medium text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function fieldClassName() {
  return "h-11 w-full rounded-2xl border border-line bg-white px-4 text-sm text-ink outline-none ring-saffron/30 focus:border-saffron focus:ring-2";
}

export function primaryButtonClassName(disabled = false) {
  return `inline-flex w-full items-center justify-center rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-white transition hover:bg-saffron-deep ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  }`;
}
