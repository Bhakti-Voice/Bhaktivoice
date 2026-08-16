import { LocaleLink } from "@/components/i18n/LocaleLink";

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
    saffron: "bg-[#f8efe4]",
    navy: "bg-navy text-white",
    peach: "bg-[#f6e6d4]",
  };

  return (
    <aside className={`rounded-3xl p-6 ${tones[tone]}`}>
      <h2 className={`font-serif text-2xl ${tone === "navy" ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <p className={`mt-2 text-sm ${tone === "navy" ? "text-white/80" : "text-muted"}`}>
        {body}
      </p>
      <LocaleLink
        href={href}
        className={`mt-4 inline-flex rounded-full px-5 py-2.5 text-sm font-medium ${
          tone === "navy" ? "bg-gold text-navy" : "bg-saffron text-white"
        }`}
      >
        {label}
      </LocaleLink>
    </aside>
  );
}
