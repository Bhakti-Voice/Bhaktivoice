import type { Metadata } from "next";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { PageHero } from "@/components/layout/PageHero";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages, getLocale } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("more");
}

export default async function MorePage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const links = [
    { href: PATHS.naamJaap, label: t.nav.naamJaap },
    { href: PATHS.katha, label: t.nav.katha },
    { href: PATHS.yatra, label: t.nav.yatra },
    { href: PATHS.sadhana, label: t.nav.sadhana },
    { href: PATHS.blog, label: t.nav.blog },
    { href: PATHS.temples, label: t.nav.temples },
    { href: PATHS.festivals, label: t.nav.festivals },
    { href: PATHS.tithi, label: t.nav.tithi },
    { href: PATHS.quotes, label: t.nav.quotes },
    { href: PATHS.mantras, label: t.nav.mantras },
    { href: PATHS.bhajan, label: t.nav.bhajan },
    { href: PATHS.aarti, label: t.nav.aarti },
    { href: PATHS.chalisa, label: t.nav.chalisa },
    { href: PATHS.stotram, label: t.nav.stotram },
    { href: PATHS.spirituality, label: t.nav.spirituality },
    { href: PATHS.community, label: t.nav.community },
    { href: PATHS.store, label: t.nav.store },
    { href: PATHS.yatraPlanner, label: t.nav.yatraPlanner },
    { href: PATHS.sankalp, label: t.nav.sankalp },
    { href: PATHS.diary, label: t.nav.diary },
    { href: "/profile", label: t.nav.myJourney },
  ];

  return (
    <div>
      <PageHero title={t.hubs.more.h1} hub="more" crumbs={localizedCrumbs(t.homeName, [t.hubs.more.h1, PATHS.more])} />
      <div className="mx-auto max-w-3xl px-4 pb-12 lg:px-8">
        <ul className="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
          {links.map((link) => (
            <li key={link.href}>
              <LocaleLink href={link.href} className="block px-5 py-4 text-ink hover:text-saffron">
                {link.label}
              </LocaleLink>
            </li>
          ))}
        </ul>

        {/* Sister Products & Ecosystem Card (Contextual High Authority Dofollow Link for Domain Authority) */}
        <div className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-saffron/15 text-saffron">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.2L12 17.5l-6.3 3.7 2.3-7.2-6-4.6h7.6z" />
              </svg>
            </span>
            <h2 className="text-lg font-bold text-ink">
              {isTe ? "మా ఇతర ఉత్పత్తులు & డిజిటల్ నెట్‌వర్క్" : isHi ? "हमारे अन्य उत्पाद एवं डिजिटल नेटवर्क" : "Our Other Products & Digital Ecosystem"}
            </h2>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {isTe
              ? "భక్తి మరియు ఆధ్యాత్మిక సేవలతో పాటు, ఖచ్చితమైన ప్రపంచ గడియారం, సమయ క్షేత్రాలు మరియు అంతర్జాతీయ మీటింగ్ ప్లానర్ కోసం మా సోదర ప్లాట్‌ఫారమ్‌ను సందర్శించండి:"
              : isHi
              ? "दैनिक भक्ति और सनातन साधना के साथ-साथ सटीक विश्व घड़ी, टाइमज़ोन कनवर्टर और वैश्विक समय समन्वय के लिए हमारे डिजिटल पार्टनर प्लेटफॉर्म को देखें:"
              : "Beyond devotional wisdom and daily sadhana, explore our precision global chronometry platform for synchronized world clocks, timezone conversion, and international meeting planning:"}
          </p>
          <div className="mt-4">
            <a
              href="https://www.timenumbers.com"
              target="_blank"
              rel="noopener"
              title="TimeNumbers - Accurate World Clock, Time Zone Converter & Meeting Planner"
              className="group inline-flex items-center gap-3.5 rounded-2xl border border-line bg-sand/30 p-4 shadow-xs transition-all hover:border-saffron hover:bg-white hover:shadow-md max-w-xl w-full"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-saffron to-saffron-deep text-white shadow-xs group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current fill-none stroke-2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-ink group-hover:text-saffron transition-colors">
                    TimeNumbers (www.timenumbers.com)
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 stroke-saffron fill-none stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </div>
                <p className="text-xs text-muted truncate mt-0.5">
                  {isTe
                    ? "ఖచ్చితమైన ప్రపంచ గడియారం, సమయ క్షేత్రాలు మరియు మీటింగ్ ప్లానర్"
                    : isHi
                    ? "सटीक विश्व घड़ी, टाइमज़ोन कनवर्टर, सूर्योदय-सूर्यास्त और मीटिंग प्लानर"
                    : "Accurate World Clock, Time Zone Converter, Sunrise/Sunset & Meeting Planner"}
                </p>
              </div>
            </a>
          </div>
        </div>

        <HubSeoBlock id="more" />
      </div>
    </div>
  );
}
