const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "..", "src", "app");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "hi" || entry.name === "te" || entry.name === "api") continue;
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
  const dest = path.join(appDir, "te", rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const destDir = path.dirname(dest);
  let importPath = toPosix(path.relative(destDir, file)).replace(/\.tsx$/, "");
  if (!importPath.startsWith(".")) importPath = `./${importPath}`;
  const source = fs.readFileSync(file, "utf8");
  const hasMeta = /export async function generateMetadata|export function generateMetadata/.test(source);
  const revalidate = source.match(/export const revalidate\s*=\s*(\d+)/);
  const dynamic = source.match(/export const dynamic\s*=\s*(["'][^"']+["'])/);
  const lines = [
    `import { withTelugu } from "@/lib/i18n/te-route";`,
    hasMeta
      ? `import EnDefault, { generateMetadata as enMeta } from "${importPath}";`
      : `import EnDefault from "${importPath}";`,
    "",
  ];
  // Next.js only reads segment config from a literal in this file — re-exports are ignored.
  if (revalidate) lines.push(`export const revalidate = ${revalidate[1]};`);
  if (dynamic) lines.push(`export const dynamic = ${dynamic[1]};`);
  if (hasMeta) {
    lines.push("", `export const generateMetadata = withTelugu(enMeta);`);
  }
  lines.push("", `export default withTelugu(EnDefault);`, "");
  fs.writeFileSync(dest, lines.join("\n"));
}

const layoutDest = path.join(appDir, "te", "layout.tsx");
fs.writeFileSync(
  layoutDest,
  `import { setRequestLocale } from "@/lib/i18n/server";

export const metadata = {
  other: {
    "content-language": "te-IN",
  },
};

export default function TeluguLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("te");
  return children;
}
`,
);

const notFoundSrc = path.join(appDir, "not-found.tsx");
if (fs.existsSync(notFoundSrc)) {
  const dest = path.join(appDir, "te", "not-found.tsx");
  fs.writeFileSync(
    dest,
    `import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault from "../not-found";

export default withTelugu(EnDefault);
`,
  );
}

console.log("wrote Telugu route mirrors successfully");
