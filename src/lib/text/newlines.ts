/** Turn JSON `\n` (and Windows line endings) into real line breaks. */
export function expandNewlines(value: string) {
  return value.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
}

export function expandNewlinesDeep<T>(value: T): T {
  if (typeof value === "string") return expandNewlines(value) as T;
  if (Array.isArray(value)) return value.map((item) => expandNewlinesDeep(item)) as T;
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      next[key] = expandNewlinesDeep(nested);
    }
    return next as T;
  }
  return value;
}
