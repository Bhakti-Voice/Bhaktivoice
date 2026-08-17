export const HUB_HEROES = {
  katha: {
    image: "/images/krishna-leela.png",
    imageAlt: "Baby Krishna by the river at sunset",
    object: "object-[78%_22%]",
  },
  yatra: {
    image: "/images/yatra-map.png",
    imageAlt: "Illustrated pilgrimage map of a sacred city",
    object: "object-[70%_40%]",
  },
  temples: {
    image: "/images/vrindavan-temple.png",
    imageAlt: "White marble temple glowing in evening light",
    object: "object-[62%_40%]",
  },
  festivals: {
    image: "/images/puja-thali.png",
    imageAlt: "Brass puja thali with diya, flowers and kumkum",
    object: "object-[70%_55%]",
  },
  mantras: {
    image: "/images/jaap-mala.png",
    imageAlt: "Tulsi jaap mala for naam jaap",
    object: "object-[68%_45%]",
  },
  store: {
    image: "/images/tulsi-mala.png",
    imageAlt: "Sacred tulsi mala and puja items",
    object: "object-[65%_50%]",
  },
  sadhana: {
    image: "/images/sankalp-flowers.png",
    imageAlt: "Flowers offered for a daily sankalp",
    object: "object-[72%_40%]",
  },
  community: {
    image: "/images/krishna-hero.png",
    imageAlt: "Lord Krishna playing the flute at sunset",
    object: "object-[22%_16%]",
  },
  blog: {
    image: "/images/ayodhya-mandir.png",
    imageAlt: "Temple spires of Ayodhya",
    object: "object-[60%_35%]",
  },
  spirituality: {
    image: "/images/shiva-idol.png",
    imageAlt: "Shiva lingam in a quiet shrine",
    object: "object-[68%_30%]",
  },
  bhajan: {
    image: "/images/hanuman-thumb.png",
    imageAlt: "Hanuman in devotion",
    object: "object-[70%_20%]",
  },
  aarti: {
    image: "/images/diyas.png",
    imageAlt: "Lit diyas glowing in the dark",
    object: "object-[75%_50%]",
  },
  tithi: {
    image: "/images/varanasi-ghats.png",
    imageAlt: "Ghats of Varanasi at dusk",
    object: "object-[70%_40%]",
  },
  more: {
    image: "/images/ujjain-ghats.png",
    imageAlt: "Sacred ghats and temples",
    object: "object-[65%_40%]",
  },
} as const;

export type HubHeroId = keyof typeof HUB_HEROES;
