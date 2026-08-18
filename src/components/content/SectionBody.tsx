import { expandNewlines } from "@/lib/text/newlines";

type Tag = "p" | "div" | "span" | "dd" | "li";

/** CMS text: JSON `\n` becomes a visible new line. */
export function ProseText({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string | null | undefined;
  className?: string;
  as?: Tag;
}) {
  if (!text) return null;
  return <Tag className={`whitespace-pre-line ${className}`.trim()}>{expandNewlines(text)}</Tag>;
}

export function SectionBody({ body }: { body: string }) {
  return <ProseText as="div" text={body} className="mt-3 leading-relaxed text-muted" />;
}
