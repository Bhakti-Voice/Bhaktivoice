import { expandNewlines } from "@/lib/text/newlines";

type Tag = "p" | "div" | "span" | "dd" | "li";

/**
 * Checks if the text contains HTML markup or markdown headings.
 */
function hasHtmlOrMarkdownMarkup(text: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(text) || /^#{1,6}\s+/m.test(text);
}

/**
 * Wraps any <table> in a dedicated .table-scroll-container div so it scrolls
 * smoothly on mobile devices without boxing the parent paragraphs/headings.
 */
function wrapTablesInScrollContainer(html: string): string {
  return html.replace(
    /(?:<div\s+class="[^"]*table-scroll-container[^"]*">\s*)?(<table[\s\S]*?<\/table>)(?:\s*<\/div>)?/gi,
    '<div class="table-scroll-container">$1</div>'
  );
}

/**
 * Formats rich CMS content:
 * 1. Converts markdown headings (##, ###, ####) to semantic HTML tags.
 * 2. Formats non-block paragraphs separated by double newlines into <p> tags with <br /> for single line breaks.
 * 3. Wraps <table> elements in responsive scroll containers.
 */
function formatRichContent(text: string): string {
  let content = text;

  // Convert markdown headings into semantic HTML
  content = content.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  content = content.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  content = content.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  content = content.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Format double newlines into paragraphs for un-tagged text blocks
  const blocks = content.split(/\n{2,}/);
  const formattedBlocks = blocks.map((b) => {
    const trimmed = b.trim();
    if (!trimmed) return "";
    // If it starts with a recognized block-level HTML tag, keep as-is
    const isBlockTag = /^<\/?(table|thead|tbody|tr|th|td|ul|ol|li|div|blockquote|h[1-6]|p|hr|section|article|aside|header|footer|nav)\b/i.test(
      trimmed
    );
    if (isBlockTag) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
  });

  content = formattedBlocks.filter(Boolean).join("\n\n");

  // Wrap tables in isolated scroll container
  content = wrapTablesInScrollContainer(content);

  return content;
}

/**
 * Strips potentially dangerous tags (script, iframe, object, embed, form, input, button)
 * and event handlers (on* attributes, javascript: pseudo protocols).
 * Leaves safe presentation elements (h1-h6, table, thead, tbody, tr, th, td, b, strong, i, em, u, s, mark,
 * ul, ol, li, p, br, hr, blockquote, div, span, a, code, pre) intact.
 */
function sanitizeHtmlString(html: string): string {
  return html
    // Remove blacklisted dangerous tags completely
    .replace(
      /<\s*(?:script|iframe|object|embed|applet|meta|link|style|form|input|button|textarea|select)[^>]*>[\s\S]*?<\s*\/\s*(?:script|iframe|object|embed|applet|meta|link|style|form|input|button|textarea|select)\s*>/gi,
      ""
    )
    .replace(
      /<\s*(?:script|iframe|object|embed|applet|meta|link|style|form|input|button|textarea|select)[^>]*\/?>/gi,
      ""
    )
    // Remove inline JS event handlers (e.g. onclick=, onerror=, onload=)
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    // Neutralize javascript: or vbscript: links
    .replace(/\b(href|src)\s*=\s*(["']?)\s*(?:javascript|vbscript|data):/gi, "$1=$2#");
}

/**
 * ProseText:
 * Safely renders rich CMS content (HTML, tables, bold, lists, callouts, markdown headings)
 * or plain multiline text with consistent spiritual typography.
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

  if (hasHtmlOrMarkdownMarkup(expanded)) {
    const formatted = formatRichContent(expanded);
    const sanitized = sanitizeHtmlString(formatted);

    // If Tag is "p", switch to "div" so block tags (p, h2, table, etc.) don't violate HTML nesting
    const ContainerTag = Tag === "p" ? "div" : Tag;

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
  return <ProseText as="div" text={body} className="mt-4 leading-relaxed text-ink font-normal" />;
}

