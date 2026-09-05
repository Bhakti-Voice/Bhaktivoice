import { expandNewlines } from "@/lib/text/newlines";

type Tag = "p" | "div" | "span" | "dd" | "li";

/**
 * Checks if the text contains HTML markup like <table>, <b>, <i>, <ul>, etc.
 */
function hasHtmlMarkup(text: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(text);
}

/**
 * Strips potentially dangerous tags (script, iframe, object, embed, form, input)
 * and event handlers (on* attributes, javascript: pseudo protocols).
 * Leaves safe presentation elements (table, thead, tbody, tr, th, td, b, strong, i, em, u, s, mark,
 * ul, ol, li, p, br, blockquote, div, span, a, code, pre) intact.
 */
function sanitizeHtmlString(html: string): string {
  return html
    // Remove blacklisted dangerous tags completely
    .replace(/<\s*(?:script|iframe|object|embed|applet|meta|link|style|form|input|button|textarea|select)[^>]*>[\s\S]*?<\s*\/\s*(?:script|iframe|object|embed|applet|meta|link|style|form|input|button|textarea|select)\s*>/gi, "")
    .replace(/<\s*(?:script|iframe|object|embed|applet|meta|link|style|form|input|button|textarea|select)[^>]*\/?>/gi, "")
    // Remove inline JS event handlers (e.g. onclick=, onerror=, onload=)
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    // Neutralize javascript: or vbscript: links
    .replace(/\b(href|src)\s*=\s*(["']?)\s*(?:javascript|vbscript|data):/gi, '$1=$2#');
}

/**
 * CMS text: JSON `\n` becomes a visible new line.
 * If HTML elements (tables, bold, italic, callouts, lists) are detected, renders safely with
 * responsive table wrappers and clean spiritual typography.
 */
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
  const expanded = expandNewlines(text);

  if (hasHtmlMarkup(expanded)) {
    const sanitized = sanitizeHtmlString(expanded);
    const isTable = /<table[\s\S]*<\/table>/i.test(sanitized);

    // If it's a full table block or contains block tags, render in a div container to avoid invalid nesting
    const ContainerTag = Tag === "p" && (isTable || /<(?:div|ul|ol|blockquote|table)/i.test(sanitized)) ? "div" : Tag;

    if (isTable) {
      return (
        <ContainerTag
          className={`prose-rich-content table-scroll-container my-4 ${className}`.trim()}
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />
      );
    }

    return (
      <ContainerTag
        className={`prose-rich-content ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    );
  }

  return <Tag className={`whitespace-pre-line ${className}`.trim()}>{expanded}</Tag>;
}

export function SectionBody({ body }: { body: string }) {
  return <ProseText as="div" text={body} className="mt-3 leading-relaxed text-muted" />;
}
