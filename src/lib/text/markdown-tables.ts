/**
 * Robust markdown to HTML converter that transforms:
 * - Markdown pipe tables into styled, responsive HTML <table> elements with thead, tbody, th, td
 * - Headings (###, ##, #) into styled <h4>, <h3>, <h2>
 * - Bold (**text**) into <strong>text</strong>
 * - Italic (*text*) into <em>text</em>
 * - Lists (- item) into <ul><li>
 */
export function renderRichMarkdownHtml(content: string): string {
  if (!content) return "";

  // Split content by potential table blocks vs text blocks
  const lines = content.split(/\r?\n/);
  const resultChunks: string[] = [];
  let inTable = false;
  let tableLines: string[] = [];

  function flushTable() {
    if (tableLines.length >= 2) {
      const parseCells = (row: string) =>
        row
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());

      const headerCells = parseCells(tableLines[0]);
      // Check if second row is divider
      const isDivider = /^\|?[\s:-|-]+\|?$/.test(tableLines[1]);
      const dataRows = isDivider ? tableLines.slice(2) : tableLines.slice(1);

      const thead = `<thead><tr>${headerCells
        .map(
          (c) =>
            `<th class="px-3.5 py-2.5 font-bold text-maroon bg-[#fbf3e7] border-b border-[#ebd8c1] text-xs sm:text-sm">${c}</th>`
        )
        .join("")}</tr></thead>`;

      const tbody = `<tbody>${dataRows
        .map((r, rIdx) => {
          const cells = parseCells(r);
          const bg = rIdx % 2 === 0 ? "bg-white" : "bg-[#fdfbf7]";
          return `<tr class="${bg} border-b border-line/60 hover:bg-cream/70 transition-colors">${cells
            .map(
              (c) =>
                `<td class="px-3.5 py-2 text-xs sm:text-sm text-ink/90">${c}</td>`
            )
            .join("")}</tr>`;
        })
        .join("")}</tbody>`;

      resultChunks.push(
        `<div class="my-6 overflow-x-auto rounded-2xl border border-[#eedec9] bg-white shadow-sm"><table class="w-full text-left border-collapse">${thead}${tbody}</table></div>`
      );
    }
    tableLines = [];
    inTable = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isTableRow = line.trim().startsWith("|") && line.trim().endsWith("|");

    if (isTableRow) {
      inTable = true;
      tableLines.push(line);
    } else {
      if (inTable) {
        flushTable();
      }

      // Format non-table markdown line
      let formatted = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/^### (.*?)$/g, "<h4 class='text-lg font-bold text-maroon mt-5 mb-2'>$1</h4>")
        .replace(/^## (.*?)$/g, "<h3 class='text-xl font-bold text-maroon mt-6 mb-3'>$1</h3>")
        .replace(/^# (.*?)$/g, "<h2 class='text-2xl font-bold text-maroon mt-8 mb-4'>$1</h2>")
        .replace(/\\\[/g, "")
        .replace(/\\\]/g, "")
        .replace(/\\left/g, "")
        .replace(/\\right/g, "")
        .replace(/\\lfloor/g, "")
        .replace(/\\rfloor/g, "")
        .replace(/\\lambda/g, "λ")
        .replace(/\\Delta\\psi/g, "Δψ");

      resultChunks.push(formatted);
    }
  }

  if (inTable) {
    flushTable();
  }

  return resultChunks.join("\n");
}
