export function formatCount(value: number, locale: string = "en"): string {
  return value.toLocaleString(locale === "hi" || locale === "hi-IN" ? "hi-IN" : "en-IN");
}
