import { LocaleLink } from "@/components/i18n/LocaleLink";
import { CalendarDays, Heart, ScrollText } from "lucide-react";
import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  panchang: <CalendarDays className="h-7 w-7 text-saffron" aria-hidden />,
  kundli: <ScrollText className="h-7 w-7 text-saffron" aria-hidden />,
  milan: <Heart className="h-7 w-7 text-saffron" aria-hidden />,
};

export function ToolCard({
  href,
  title,
  description,
  icon,
  openLabel = "Open tool",
}: {
  href: string;
  title: string;
  description: string;
  icon: keyof typeof ICONS;
  openLabel?: string;
}) {
  return (
    <LocaleLink
      href={href}
      className="group flex h-full flex-col rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-line transition hover:-translate-y-0.5 hover:ring-saffron/30"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7f0] ring-1 ring-saffron/15">
        {ICONS[icon]}
      </div>
      <h2 className="font-serif text-xl text-ink group-hover:text-saffron-deep">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{description}</p>
      <span className="mt-4 text-sm font-medium text-saffron">{openLabel} →</span>
    </LocaleLink>
  );
}

export function ToolCardGrid({
  tools,
  openLabel = "Open tool",
}: {
  tools: { href: string; title: string; description: string; icon: keyof typeof ICONS }[];
  openLabel?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.href} {...tool} openLabel={openLabel} />
      ))}
    </div>
  );
}
