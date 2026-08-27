/**
 * Classical Ashtakoot 36 Guna Milan Engine
 * Based on Brihat Parashara Hora Shastra and traditional Muhurat Chintamani.
 */

// 1. VARNA (1 Point)
// 0: Brahmin (Water), 1: Kshatriya (Fire), 2: Vaishya (Earth), 3: Shudra (Air)
export const RASHI_VARNA = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0] as const;
export const VARNA_NAMES = ["Brahmin (ब्राह्मण)", "Kshatriya (क्षत्रिय)", "Vaishya (वैश्य)", "Shudra (शूद्र)"] as const;
export const VARNA_NAMES_HI = ["ब्राह्मण", "क्षत्रिय", "वैश्य", "शूद्र"] as const;

export function varnaScore(boyRashi: number, girlRashi: number): { score: number; boyVarna: string; girlVarna: string } {
  const bV = RASHI_VARNA[boyRashi];
  const gV = RASHI_VARNA[girlRashi];
  // Brahmin (0) > Kshatriya (1) > Vaishya (2) > Shudra (3)
  const score = bV <= gV ? 1 : 0;
  return { score, boyVarna: VARNA_NAMES[bV], girlVarna: VARNA_NAMES[gV] };
}

// 2. VASHYA (2 Points)
// 0: Chatushpada (Quadruped), 1: Manava (Human), 2: Jalachara (Water), 3: Vanachara (Wild/Lion), 4: Keeta (Insect)
export const RASHI_VASHYA = [0, 0, 1, 2, 3, 1, 1, 4, 1, 0, 1, 2] as const;
export const VASHYA_NAMES = ["Quadruped (चतुष्पद)", "Human (मानव/द्विपद)", "Water (जलचर)", "Wild (वनचर/सिंह)", "Insect (कीट)"] as const;
export const VASHYA_NAMES_HI = ["चतुष्पद", "मानव/द्विपद", "जलचर", "वनचर/सिंह", "कीट"] as const;

// Vashya matrix [Boy][Girl]
const VASHYA_POINTS: number[][] = [
  // Quadruped, Human, Water, Wild, Insect
  [2, 1, 1, 0, 1], // Quadruped
  [1, 2, 1, 0, 1], // Human
  [1, 1, 2, 1, 1], // Water
  [0, 0, 0, 2, 0], // Wild
  [1, 1, 1, 0, 2], // Insect
];

export function vashyaScore(boyRashi: number, girlRashi: number): { score: number; boyVashya: string; girlVashya: string } {
  const bV = RASHI_VASHYA[boyRashi];
  const gV = RASHI_VASHYA[girlRashi];
  const score = VASHYA_POINTS[bV]?.[gV] ?? 1;
  return { score, boyVashya: VASHYA_NAMES[bV], girlVashya: VASHYA_NAMES[gV] };
}

// 3. TARA (3 Points) - Star / Destiny Compatibility
export const TARA_NAMES = [
  "Janma (Birth)",
  "Sampat (Wealth)",
  "Vipat (Danger)",
  "Kshema (Wellbeing)",
  "Pratyak (Obstacle)",
  "Sadhana (Success)",
  "Naidhana (Loss)",
  "Mitra (Friendly)",
  "Param Mitra (Best Friend)",
] as const;

export const TARA_NAMES_HI = [
  "जन्म तारा",
  "सम्पत् तारा",
  "विपत् तारा",
  "क्षेम तारा",
  "प्रत्यरि तारा",
  "साधक तारा",
  "वध तारा",
  "मित्र तारा",
  "परम मित्र तारा",
] as const;

export function taraScore(boyNak: number, girlNak: number): { score: number; boyTara: string; girlTara: string } {
  // Tara count from Boy to Girl
  const bToG = ((girlNak - boyNak + 27) % 9) + 1;
  // Tara count from Girl to Boy
  const gToB = ((boyNak - girlNak + 27) % 9) + 1;

  const isAuspicious = (taraNum: number) => [2, 4, 6, 8, 9].includes(taraNum);

  let bPts = isAuspicious(bToG) ? 1.5 : 0;
  let gPts = isAuspicious(gToB) ? 1.5 : 0;

  // Janma tara exception (if 1st tara, give 1.5 if same rashi/nakshatra)
  if (bToG === 1 && gToB === 1) {
    bPts = 1.5;
    gPts = 1.5;
  }

  const score = bPts + gPts;
  return {
    score,
    boyTara: TARA_NAMES[bToG - 1],
    girlTara: TARA_NAMES[gToB - 1],
  };
}

// 4. YONI (4 Points) - 14 Classical Animal Temperaments
export const NAKSHATRA_YONI = [
  0, // 0 Ashwini: Horse
  1, // 1 Bharani: Elephant
  2, // 2 Krittika: Sheep
  3, // 3 Rohini: Serpent
  3, // 4 Mrigashira: Serpent
  4, // 5 Ardra: Dog
  5, // 6 Punarvasu: Cat
  2, // 7 Pushya: Sheep
  5, // 8 Ashlesha: Cat
  6, // 9 Magha: Rat
  6, // 10 Purva Phalguni: Rat
  7, // 11 Uttara Phalguni: Cow
  8, // 12 Hasta: Buffalo
  9, // 13 Chitra: Tiger
  8, // 14 Swati: Buffalo
  9, // 15 Vishakha: Tiger
  10, // 16 Anuradha: Deer
  10, // 17 Jyeshtha: Deer
  4, // 18 Mula: Dog
  11, // 19 Purva Ashadha: Monkey
  12, // 20 Uttara Ashadha: Mongoose
  11, // 21 Shravana: Monkey
  13, // 22 Dhanishta: Lion
  0, // 23 Shatabhisha: Horse
  13, // 24 Purva Bhadrapada: Lion
  7, // 25 Uttara Bhadrapada: Cow
  1, // 26 Revati: Elephant
] as const;

export const YONI_NAMES = [
  "Horse (अश्व)",
  "Elephant (गज)",
  "Sheep (मेष)",
  "Serpent (सर्प)",
  "Dog (श्वान)",
  "Cat (मार्जार)",
  "Rat (मूषक)",
  "Cow (गौ)",
  "Buffalo (महिष)",
  "Tiger (व्याघ्र)",
  "Deer (मृग)",
  "Monkey (वानर)",
  "Mongoose (नकुल)",
  "Lion (सिंह)",
] as const;

export const YONI_NAMES_HI = [
  "अश्व (घोड़ा)",
  "गज (हाथी)",
  "मेष (भेड़)",
  "सर्प (सांप)",
  "श्वान (कुत्ता)",
  "मार्जार (बिल्ली)",
  "मूषक (चूहा)",
  "गौ (गाय)",
  "महिष (भैंस)",
  "व्याघ्र (बाघ)",
  "मृग (हिरण)",
  "वानर (बंदर)",
  "नकुल (नेवला)",
  "सिंह (शेर)",
] as const;

// 14x14 Yoni compatibility matrix (0 to 4 points)
// Enemies: Horse-Buffalo, Elephant-Lion, Sheep-Monkey, Snake-Mongoose, Dog-Deer, Cat-Rat, Cow-Tiger
const YONI_MATRIX: number[][] = [
  // 0:Horse, 1:Elephant, 2:Sheep, 3:Snake, 4:Dog, 5:Cat, 6:Rat, 7:Cow, 8:Buffalo, 9:Tiger, 10:Deer, 11:Monkey, 12:Mongoose, 13:Lion
  [4, 2, 2, 3, 2, 2, 2, 2, 0, 1, 3, 2, 2, 1], // 0 Horse
  [2, 4, 3, 3, 2, 2, 2, 3, 3, 1, 2, 3, 2, 0], // 1 Elephant
  [2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 2, 1], // 2 Sheep
  [3, 3, 2, 4, 2, 1, 1, 2, 2, 1, 2, 2, 0, 2], // 3 Snake
  [2, 2, 1, 2, 4, 2, 1, 2, 2, 1, 0, 2, 2, 1], // 4 Dog
  [2, 2, 2, 1, 2, 4, 0, 2, 2, 1, 2, 2, 2, 1], // 5 Cat
  [2, 2, 1, 1, 1, 0, 4, 2, 2, 1, 2, 2, 2, 1], // 6 Rat
  [2, 3, 3, 2, 2, 2, 2, 4, 3, 0, 3, 2, 2, 1], // 7 Cow
  [0, 3, 3, 2, 2, 2, 2, 3, 4, 1, 2, 2, 2, 1], // 8 Buffalo
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 1, 1], // 9 Tiger
  [3, 2, 2, 2, 0, 2, 2, 3, 2, 1, 4, 2, 2, 1], // 10 Deer
  [2, 3, 0, 2, 2, 2, 2, 2, 2, 1, 2, 4, 2, 2], // 11 Monkey
  [2, 2, 2, 0, 2, 2, 2, 2, 2, 1, 2, 2, 4, 2], // 12 Mongoose
  [1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4], // 13 Lion
];

export function yoniScore(boyNak: number, girlNak: number): { score: number; boyYoni: string; girlYoni: string } {
  const bY = NAKSHATRA_YONI[boyNak];
  const gY = NAKSHATRA_YONI[girlNak];
  const score = YONI_MATRIX[bY]?.[gY] ?? 2;
  return { score, boyYoni: YONI_NAMES[bY], girlYoni: YONI_NAMES[gY] };
}

// 5. GRAHA MAITRI (5 Points) - Rashi Lord Friendship
// 0: Sun, 1: Moon, 2: Mars, 3: Mercury, 4: Jupiter, 5: Venus, 6: Saturn
export const RASHI_LORDS_INDEX = [2, 5, 3, 1, 0, 3, 5, 2, 4, 6, 6, 4] as const;
export const GRAHA_NAMES = ["Sun (सूर्य)", "Moon (चंद्र)", "Mars (मंगल)", "Mercury (बुध)", "Jupiter (गुरु)", "Venus (शुक्र)", "Saturn (शनि)"] as const;

// 7x7 Planetary friendship table: 2 = Friend, 1 = Neutral, 0 = Enemy
const PLANET_RELATION: number[][] = [
  // Sun, Moon, Mars, Mer, Jup, Ven, Sat
  [2, 2, 2, 1, 2, 0, 0], // Sun
  [2, 2, 1, 2, 1, 1, 1], // Moon
  [2, 2, 2, 0, 2, 1, 0], // Mars
  [2, 0, 1, 2, 1, 2, 1], // Mercury
  [2, 2, 2, 0, 2, 0, 1], // Jupiter
  [0, 0, 1, 2, 1, 2, 2], // Venus
  [0, 0, 0, 2, 1, 2, 2], // Saturn
];

export function grahaMaitriScore(boyRashi: number, girlRashi: number): { score: number; boyLord: string; girlLord: string } {
  const bLord = RASHI_LORDS_INDEX[boyRashi];
  const gLord = RASHI_LORDS_INDEX[girlRashi];

  if (bLord === gLord) {
    return { score: 5, boyLord: GRAHA_NAMES[bLord], girlLord: GRAHA_NAMES[gLord] };
  }

  const rel1 = PLANET_RELATION[bLord]?.[gLord] ?? 1;
  const rel2 = PLANET_RELATION[gLord]?.[bLord] ?? 1;

  let score = 0;
  if (rel1 === 2 && rel2 === 2) score = 5; // Mutual Friends
  else if ((rel1 === 2 && rel2 === 1) || (rel1 === 1 && rel2 === 2)) score = 4; // Friend + Neutral
  else if (rel1 === 1 && rel2 === 1) score = 3; // Mutual Neutral
  else if ((rel1 === 2 && rel2 === 0) || (rel1 === 0 && rel2 === 2)) score = 1; // Friend + Enemy
  else if ((rel1 === 1 && rel2 === 0) || (rel1 === 0 && rel2 === 1)) score = 0.5; // Neutral + Enemy
  else score = 0; // Mutual Enemies

  return { score, boyLord: GRAHA_NAMES[bLord], girlLord: GRAHA_NAMES[gLord] };
}

// 6. GANA (6 Points)
// 0: Deva, 1: Manushya, 2: Rakshasa
export const NAKSHATRA_GANA = [
  0, 1, 2, 1, 0, 1, 0, 0, 2, // Ashwini to Ashlesha
  2, 1, 1, 0, 2, 0, 2, 0, 2, // Magha to Jyeshtha
  2, 1, 1, 0, 2, 2, 1, 1, 0, // Mula to Revati
] as const;

export const GANA_NAMES = ["Deva (देव)", "Manushya (मनुष्य)", "Rakshasa (राक्षस)"] as const;
export const GANA_NAMES_HI = ["देव गण", "मनुष्य गण", "राक्षस गण"] as const;

export function ganaScore(boyNak: number, girlNak: number): { score: number; boyGana: string; girlGana: string } {
  const bG = NAKSHATRA_GANA[boyNak];
  const gG = NAKSHATRA_GANA[girlNak];

  let score = 0;
  if (bG === gG) score = 6;
  else if (bG === 0 && gG === 1) score = 6; // Deva Boy + Manushya Girl
  else if (bG === 1 && gG === 0) score = 5; // Manushya Boy + Deva Girl
  else if (bG === 0 && gG === 2) score = 1; // Deva Boy + Rakshasa Girl
  else if (bG === 2 && gG === 0) score = 0; // Rakshasa Boy + Deva Girl
  else score = 0; // Manushya & Rakshasa

  return { score, boyGana: GANA_NAMES[bG], girlGana: GANA_NAMES[gG] };
}

// 7. BHAKOOT (7 Points) - Moon Sign Distance & Dosha Cancellation
export function bhakootScore(
  boyRashi: number,
  girlRashi: number,
): { score: number; hasDosha: boolean; isCancelled: boolean; cancellationNote: string; cancellationNoteHi: string } {
  const diff = (girlRashi - boyRashi + 12) % 12;
  const rel1 = diff + 1; // 1 to 12
  const rel2 = ((boyRashi - girlRashi + 12) % 12) + 1;

  // Auspicious positions: 1/1, 1/7, 3/11, 4/10
  const isAuspicious =
    (rel1 === 1 && rel2 === 1) ||
    (rel1 === 7 && rel2 === 7) ||
    (rel1 === 3 && rel2 === 11) ||
    (rel1 === 11 && rel2 === 3) ||
    (rel1 === 4 && rel2 === 10) ||
    (rel1 === 10 && rel2 === 4);

  if (isAuspicious) {
    return {
      score: 7,
      hasDosha: false,
      isCancelled: false,
      cancellationNote: "Harmonious Moon Sign alignment (शुभ भकूट)",
      cancellationNoteHi: "चन्द्र राशियों का परस्पर शुभ संबंध",
    };
  }

  // Check Bhakoot Dosha cancellation exceptions
  const bLord = RASHI_LORDS_INDEX[boyRashi];
  const gLord = RASHI_LORDS_INDEX[girlRashi];
  const sameLord = bLord === gLord;
  const mutualFriends =
    PLANET_RELATION[bLord]?.[gLord] === 2 && PLANET_RELATION[gLord]?.[bLord] === 2;

  if (sameLord || mutualFriends) {
    return {
      score: 7,
      hasDosha: true,
      isCancelled: true,
      cancellationNote: "Bhakoot Dosha cancelled: Moon signs share the same planetary lord or mutual friends.",
      cancellationNoteHi: "भकूट दोष परिहार: दोनों राशियों के स्वामी एक हैं या परम मित्र हैं।",
    };
  }

  return {
    score: 0,
    hasDosha: true,
    isCancelled: false,
    cancellationNote: `Bhakoot Dosha present (${rel1}/${rel2} placement). Remedial measures suggested.`,
    cancellationNoteHi: `भकूट दोष उपस्थित (${rel1}/${rel2} संबंध)। शांति उपाय अनुशंसित।`,
  };
}

// 8. NADI (8 Points) - Health, Genetic Harmony & Progeny
// 0: Adi (Vata), 1: Madhya (Pitta), 2: Antya (Kapha)
export const NAKSHATRA_NADI = [
  0, 1, 2, 2, 1, 0, 0, 1, 2, // 1-9
  0, 1, 2, 2, 1, 0, 0, 1, 2, // 10-18
  0, 1, 2, 2, 1, 0, 0, 1, 2, // 19-27
] as const;

export const NADI_NAMES = ["Adi / Vata (आदि/वात)", "Madhya / Pitta (मध्य/पित्त)", "Antya / Kapha (अंत्य/कफ)"] as const;
export const NADI_NAMES_HI = ["आदि नाड़ी (वात)", "मध्य नाड़ी (पित्त)", "अंत्य नाड़ी (कफ)"] as const;

export function nadiScore(
  boyNak: number,
  girlNak: number,
  boyRashi: number,
  girlRashi: number,
): { score: number; boyNadi: string; girlNadi: string; hasDosha: boolean; isCancelled: boolean; cancellationNote: string; cancellationNoteHi: string } {
  const bN = NAKSHATRA_NADI[boyNak];
  const gN = NAKSHATRA_NADI[girlNak];

  if (bN !== gN) {
    return {
      score: 8,
      boyNadi: NADI_NAMES[bN],
      girlNadi: NADI_NAMES[gN],
      hasDosha: false,
      isCancelled: false,
      cancellationNote: "Auspicious: Different Nadis ensure genetic and physiological compatibility.",
      cancellationNoteHi: "शुभ: भिन्न नाड़ी होने से स्वास्थ्य एवं संतान सुख उत्तम रहेगा।",
    };
  }

  // Nadi Dosha cancellation exceptions:
  // 1. Same Rashi but different Nakshatras
  // 2. Same Nakshatra but different Rashis
  const sameRashiDiffNak = boyRashi === girlRashi && boyNak !== girlNak;
  const diffRashiSameNak = boyRashi !== girlRashi && boyNak === girlNak;

  if (sameRashiDiffNak || diffRashiSameNak) {
    return {
      score: 8,
      boyNadi: NADI_NAMES[bN],
      girlNadi: NADI_NAMES[gN],
      hasDosha: true,
      isCancelled: true,
      cancellationNote: "Nadi Dosha cancelled: Nakshatra or Rashi differentiation eliminates the affliction.",
      cancellationNoteHi: "नाड़ी दोष परिहार: नक्षत्र अथवा राशि भेद के कारण नाड़ी दोष निष्प्रभावी है।",
    };
  }

  return {
    score: 0,
    boyNadi: NADI_NAMES[bN],
    girlNadi: NADI_NAMES[gN],
    hasDosha: true,
    isCancelled: false,
    cancellationNote: "Nadi Dosha present (Same Nadi). Astrological remedies and Maha Mrityunjaya Japa suggested.",
    cancellationNoteHi: "एक नाड़ी दोष उपस्थित। महामृत्युंजय जप एवं शांति उपाय अनुशंसित।",
  };
}
