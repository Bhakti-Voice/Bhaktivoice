const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "..", "src", "app");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "hi" || entry.name === "api") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "page.tsx") out.push(full);
  }
  return out;
}

function toPosix(p) {
  return p.split(path.sep).join("/");
}

for (const file of walk(appDir)) {
  const rel = path.relative(appDir, file);
  const dest = path.join(appDir, "hi", rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const destDir = path.dirname(dest);
  let importPath = toPosix(path.relative(destDir, file)).replace(/\.tsx$/, "");
  if (!importPath.startsWith(".")) importPath = `./${importPath}`;
  const source = fs.readFileSync(file, "utf8");
  const hasMeta = /export async function generateMetadata|export function generateMetadata/.test(source);
  const hasRevalidate = /export const revalidate/.test(source);
  const hasDynamic = /export const dynamic/.test(source);
  const lines = [
    `import { withHindi } from "@/lib/i18n/hi-route";`,
    hasMeta
      ? `import EnDefault, { generateMetadata as enMeta } from "${importPath}";`
      : `import EnDefault from "${importPath}";`,
    "",
  ];
  if (hasRevalidate) lines.push(`export { revalidate } from "${importPath}";`);
  if (hasDynamic) lines.push(`export { dynamic } from "${importPath}";`);
  if (hasMeta) {
    lines.push("", `export const generateMetadata = withHindi(enMeta);`);
  }
  lines.push("", `export default withHindi(EnDefault);`, "");
  fs.writeFileSync(dest, lines.join("\n"));
}

const notFoundSrc = path.join(appDir, "not-found.tsx");
if (fs.existsSync(notFoundSrc)) {
  const dest = path.join(appDir, "hi", "not-found.tsx");
  fs.writeFileSync(
    dest,
    `import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault from "../not-found";

export default withHindi(EnDefault);
`,
  );
}

console.log("wrote Hindi route mirrors");
