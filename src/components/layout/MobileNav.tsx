import { BookOpen, CircleDot, Home, MapPin, UserRound } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getMessages } from "@/lib/i18n/server";
import { PATHS } from "@/lib/seo/paths";

export async function MobileNav() {
  const t = await getMessages();
  const items = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: PATHS.naamJaap, label: t.nav.jaap, icon: CircleDot },
    { href: PATHS.katha, label: t.nav.katha, icon: BookOpen },
    { href: PATHS.yatra, label: t.nav.yatra, icon: MapPin },
    { href: "/profile", label: t.profile, icon: UserRound },
  ];

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 px-2 py-2 backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.href}>
            <LocaleLink href={item.href} className="flex flex-col items-center gap-1 py-1 text-[11px] text-muted">
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="max-w-full truncate px-0.5">{item.label}</span>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
