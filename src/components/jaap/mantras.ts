export const JAAP_MANTRAS = [
  { slug: "radhe-radhe", label: "Radhe Radhe", text: "राधे राधे", balloon: "राधा", color: "#ec4899", dot: "bg-pink-400" },
  { slug: "ram-naam", label: "Ram Naam", text: "राम राम", balloon: "राम", color: "#ea580c", dot: "bg-orange-400" },
  { slug: "hare-krishna", label: "Hare Krishna", text: "हरे कृष्ण", balloon: "कृष्ण", color: "#3b82f6", dot: "bg-blue-400" },
  { slug: "om-namah-shivaya", label: "Om Namah Shivaya", text: "ॐ नमः शिवाय", balloon: "शिव", color: "#8b5cf6", dot: "bg-violet-400" },
  { slug: "shri-ram", label: "Shri Ram", text: "श्री राम", balloon: "श्री राम", color: "#dc2626", dot: "bg-red-400" },
  { slug: "namokar", label: "Namokar Mantra", text: "णमो अरिहंताणं", balloon: "णमो", color: "#d97706", dot: "bg-amber-400" },
] as const;

export type JaapMantraSlug = (typeof JAAP_MANTRAS)[number]["slug"];

export type JaapCounts = Record<JaapMantraSlug, number>;

export function emptyJaapCounts(): JaapCounts {
  return Object.fromEntries(JAAP_MANTRAS.map((item) => [item.slug, 0])) as JaapCounts;
}

export function isJaapMantraSlug(value: string): value is JaapMantraSlug {
  return JAAP_MANTRAS.some((item) => item.slug === value);
}
