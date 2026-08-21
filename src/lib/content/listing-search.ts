/** Live listing search: every word in the query must appear somewhere in the haystack. */
export function matchesListingQuery(
  fields: Array<string | number | undefined | null | string[]>,
  query: string,
) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = fields
    .flatMap((field) => (Array.isArray(field) ? field : [field]))
    .filter((field): field is string | number => field != null && field !== "")
    .join(" ")
    .toLowerCase();
  return needle.split(/\s+/).every((part) => haystack.includes(part));
}
