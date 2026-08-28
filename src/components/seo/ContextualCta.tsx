import { ChevronRight, Sparkles } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ProseText } from "@/components/content/SectionBody";

export function ContextualCta({
  title,
  body,
  href,
  label,
  tone = "saffron",
}: {
  title: string;
  body: string;
  href: string;
  label: string;
  tone?: "saffron" | "navy" | "peach";
}) {
  const tones = {
    saffron:
      "bg-gradient-to-br from-[#fffdf9] via-[#fff4e8] to-[#fdebd7] ring-1 ring-[#ebd5bd] text-ink shadow-xs",
    navy: "bg-gradient-to-br from-[#1b1c30] to-[#121324] text-white ring-1 ring-gold/20 shadow-md",
    peach:
      "bg-gradient-to-br from-[#fffdf9] via-[#fff2e4] to-[#fce2cb] ring-1 ring-[#f0d4b8] text-ink shadow-xs",
  };

  return (
    <aside className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 ${tones[tone]}`}>
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-deep">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Spiritual Practice</span>
      </div>
      <h2 className={`mt-2 font-serif text-xl sm:text-2xl font-bold ${tone === "navy" ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <ProseText
        text={body}
        className={`mt-2 text-xs sm:text-sm leading-relaxed ${tone === "navy" ? "text-white/80" : "text-muted"}`}
      />
      <LocaleLink
        href={href}
        className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-105 hover:shadow ${
          tone === "navy" ? "bg-gold text-navy hover:bg-[#dfb25e]" : "bg-saffron text-white hover:bg-saffron-deep"
        }`}
      >
        <span>{label}</span>
        <ChevronRight className="h-4 w-4" />
      </LocaleLink>
    </aside>
  );
}

