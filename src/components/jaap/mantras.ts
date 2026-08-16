export const JAAP_MANTRAS = [
  { slug: "radhe-radhe", label: "Radhe Radhe", text: "राधे राधे", balloon: "राधा", color: "#ec4899" },
  { slug: "ram-naam", label: "Ram Naam", text: "राम राम", balloon: "राम", color: "#ea580c" },
  { slug: "hare-krishna", label: "Hare Krishna", text: "हरे कृष्ण", balloon: "कृष्ण", color: "#3b82f6" },
  { slug: "om-namah-shivaya", label: "Om Namah Shivaya", text: "ॐ नमः शिवाय", balloon: "शिव", color: "#8b5cf6" },
  { slug: "shri-ram", label: "Shri Ram", text: "श्री राम", balloon: "श्री राम", color: "#dc2626" },
  { slug: "namokar", label: "Namokar Mantra", text: "णमो अरिहंताणं", balloon: "णमो", color: "#d97706" },
] as const;

export type JaapMantraSlug = (typeof JAAP_MANTRAS)[number]["slug"];
