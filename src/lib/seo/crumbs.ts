import type { BreadcrumbItem } from "@/lib/content/types";

export function pageCrumbs(...trail: [name: string, href: string][]): BreadcrumbItem[] {
  return [{ name: "Home", href: "/" }, ...trail.map(([name, href]) => ({ name, href }))];
}

export function localizedCrumbs(
  homeName: string,
  ...trail: [name: string, href: string][]
): BreadcrumbItem[] {
  return [{ name: homeName, href: "/" }, ...trail.map(([name, href]) => ({ name, href }))];
}
