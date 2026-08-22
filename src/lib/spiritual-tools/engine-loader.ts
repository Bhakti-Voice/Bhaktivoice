/** Lazy-load heavy astrology modules — keeps initial JS bundle small. */

export async function loadClientPanchang() {
  return import("./client-panchang");
}

export async function loadKundliEngine() {
  return import("./kundli");
}

export async function loadMilanEngine() {
  return import("./milan");
}
