export function safeNextPath(raw: string | null | undefined, fallback = "/") {
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("://")) return fallback;
  if (raw === "/login" || raw.startsWith("/login?")) return fallback;
  return raw;
}
