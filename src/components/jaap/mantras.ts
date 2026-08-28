export const JAAP_MANTRAS = [
  {
    slug: "radhe-radhe",
    label: "Radhe Radhe",
    text: "राधे राधे",
    balloon: "राधा",
    color: "#ec4899",
    deity: "Shri Radha Rani",
    meaning: "Calling upon the divine mother of devotion, unconditional love and bliss.",
    dot: "bg-pink-400",
    gradient: "from-pink-500/20 via-rose-500/10 to-amber-500/20",
    badge: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    slug: "ram-naam",
    label: "Ram Naam",
    text: "राम राम",
    balloon: "राम",
    color: "#ea580c",
    deity: "Bhagwan Shri Ram",
    meaning: "The supreme Taraka mantra that dispels all fear, karmic debts, and sorrow.",
    dot: "bg-orange-400",
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    slug: "hare-krishna",
    label: "Hare Krishna",
    text: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥",
    balloon: "कृष्ण",
    color: "#2563eb",
    deity: "Lord Krishna & Rama",
    meaning: "The Maha-Mantra for the age of Kali, awakening eternal dormant pure love for God.",
    dot: "bg-blue-400",
    gradient: "from-blue-500/20 via-indigo-500/10 to-teal-500/20",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    slug: "om-namah-shivaya",
    label: "Om Namah Shivaya",
    text: "ॐ नमः शिवाय",
    balloon: "शिव",
    color: "#7c3aed",
    deity: "Lord Shiva (Mahadev)",
    meaning: "The Panchakshari mantra awakening inner stillness, dissolving ego, and supreme peace.",
    dot: "bg-violet-400",
    gradient: "from-purple-500/20 via-violet-500/10 to-indigo-500/20",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    slug: "shri-ram",
    label: "Shri Ram",
    text: "श्री राम",
    balloon: "श्री राम",
    color: "#dc2626",
    deity: "Sita Ram",
    meaning: "Divine protection, auspicious grace, and spiritual elevation in every breath.",
    dot: "bg-red-400",
    gradient: "from-red-500/20 via-orange-500/10 to-amber-500/20",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
  {
    slug: "namokar",
    label: "Namokar Mantra",
    text: "णमो अरिहंताणं णमो सिद्धाणं णमो आयरियाणं णमो उवज्झायाणं णमो लोए सव्व साहूणं",
    balloon: "णमो",
    color: "#d97706",
    deity: "Pancha Paramesthi",
    meaning: "Universal reverence to Arihantas, Siddhas, Acharyas, Upadhyayas and all Sadhus.",
    dot: "bg-amber-400",
    gradient: "from-amber-500/20 via-yellow-500/10 to-orange-500/20",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
] as const;

export type JaapMantraSlug = (typeof JAAP_MANTRAS)[number]["slug"];

export type JaapCounts = Record<JaapMantraSlug, number>;

export function emptyJaapCounts(): JaapCounts {
  return Object.fromEntries(JAAP_MANTRAS.map((item) => [item.slug, 0])) as JaapCounts;
}

export function isJaapMantraSlug(value: string): value is JaapMantraSlug {
  return JAAP_MANTRAS.some((item) => item.slug === value);
}

