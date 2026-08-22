/** Ashtakoot lookup tables for 36 Guna Milan — client-side only. */

export const VARNA_BY_RASHI = [3, 3, 2, 2, 1, 1, 0, 0, 3, 2, 1, 0] as const;
export const VARNA_NAMES = ["Brahmin", "Kshatriya", "Vaishya", "Shudra"] as const;

/** 0 = same, 1 = friendly, 2 = neutral, 3 = enemy for Vashya */
export const VASHYA_MATRIX = [
  [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 1],
  [1, 0, 2, 1, 2, 1, 1, 2, 2, 3, 2, 1],
  [1, 2, 0, 1, 1, 2, 2, 1, 2, 2, 3, 1],
  [2, 1, 1, 0, 2, 1, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 0, 1, 2, 1, 1, 2, 2, 2],
  [2, 1, 2, 1, 1, 0, 1, 2, 2, 2, 2, 1],
  [2, 1, 2, 1, 2, 1, 0, 1, 1, 2, 2, 2],
  [3, 2, 1, 2, 1, 2, 1, 0, 2, 1, 1, 2],
  [1, 2, 2, 2, 1, 2, 1, 2, 0, 1, 1, 2],
  [2, 3, 2, 2, 2, 2, 2, 1, 1, 0, 1, 2],
  [2, 2, 3, 2, 2, 2, 2, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1, 0],
] as const;

export const VASHYA_SCORE = [2, 1, 0.5, 0] as const;

/** Nakshatra lords for Graha Maitri — 0 Sun, 1 Moon, 2 Mars, 3 Mercury, 4 Jupiter, 5 Venus, 6 Saturn */
export const NAKSHATRA_LORD = [
  2, 6, 2, 5, 2, 6, 3, 4, 6, 2, 5, 2, 3, 4, 6, 2, 5, 2, 6, 3, 4, 6, 2, 5, 2, 6, 3,
] as const;

/** 0 friend, 1 neutral, 2 enemy */
export const GRAHA_FRIENDSHIP = [
  [0, 0, 2, 1, 0, 2, 2],
  [0, 0, 1, 2, 1, 0, 2],
  [2, 1, 0, 2, 2, 1, 0],
  [1, 2, 2, 0, 2, 1, 1],
  [0, 1, 2, 2, 0, 2, 1],
  [2, 0, 1, 1, 2, 0, 2],
  [2, 2, 0, 1, 1, 2, 0],
] as const;

/** Gana by nakshatra index: 0 Deva, 1 Manushya, 2 Rakshasa */
export const GANA_BY_NAKSHATRA = [
  0, 1, 2, 1, 0, 2, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0,
] as const;

/** Nadi by nakshatra: 0 Adi, 1 Madhya, 2 Antya */
export const NADI_BY_NAKSHATRA = [
  0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2,
] as const;

/** Yoni pairs score simplified by nakshatra animal groups (0-3 points) */
export const YONI_SCORE_MATRIX = [
  [4, 2, 2, 3, 2, 2, 2, 1, 2, 1, 1, 3, 3, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 2, 2, 1, 1],
  [2, 4, 3, 3, 2, 2, 2, 2, 2, 1, 2, 3, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [2, 3, 4, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [3, 3, 2, 4, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [2, 2, 2, 2, 4, 3, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [2, 2, 2, 2, 3, 4, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [2, 2, 2, 2, 2, 2, 4, 3, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 3, 4, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 2, 2, 2, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
] as const;

export function taraScore(boyNak: number, girlNak: number): number {
  const distance = (girlNak - boyNak + 27) % 27;
  const group = distance % 9;
  if (group === 0 || group === 2 || group === 4 || group === 6 || group === 8) return 3;
  if (group === 1 || group === 3) return 1.5;
  return 0;
}

export function bhakootScore(boyRashi: number, girlRashi: number): number {
  const diff = Math.abs(boyRashi - girlRashi);
  const normalized = diff > 6 ? 12 - diff : diff;
  if (normalized === 0) return 7;
  if (normalized === 1 || normalized === 11) return 0;
  if (normalized === 2 || normalized === 10) return 7;
  if (normalized === 3 || normalized === 9) return 0;
  if (normalized === 4 || normalized === 8) return 7;
  if (normalized === 5 || normalized === 7) return 0;
  return 0;
}

export function ganaScore(boyNak: number, girlNak: number): number {
  const boy = GANA_BY_NAKSHATRA[boyNak];
  const girl = GANA_BY_NAKSHATRA[girlNak];
  if (boy === girl) return 6;
  if ((boy === 0 && girl === 1) || (boy === 1 && girl === 0)) return 5;
  if ((boy === 0 && girl === 2) || (boy === 2 && girl === 0)) return 1;
  if ((boy === 1 && girl === 2) || (boy === 2 && girl === 1)) return 0;
  return 3;
}

export function nadiScore(boyNak: number, girlNak: number): number {
  return NADI_BY_NAKSHATRA[boyNak] === NADI_BY_NAKSHATRA[girlNak] ? 0 : 8;
}

export function varnaScore(boyRashi: number, girlRashi: number): number {
  const boy = VARNA_BY_RASHI[boyRashi];
  const girl = VARNA_BY_RASHI[girlRashi];
  return boy >= girl ? 1 : 0;
}

export function vashyaScore(boyRashi: number, girlRashi: number): number {
  return VASHYA_SCORE[VASHYA_MATRIX[boyRashi][girlRashi]];
}

export function grahaMaitriScore(boyNak: number, girlNak: number): number {
  const boyLord = NAKSHATRA_LORD[boyNak];
  const girlLord = NAKSHATRA_LORD[girlNak];
  const relation = GRAHA_FRIENDSHIP[boyLord][girlLord];
  if (relation === 0) return 5;
  if (relation === 1) return 3;
  return 0;
}

export function yoniScore(boyNak: number, girlNak: number): number {
  return YONI_SCORE_MATRIX[boyNak][girlNak];
}
