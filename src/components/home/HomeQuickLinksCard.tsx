import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PATHS } from "@/lib/seo/paths";
import {
  Compass,
  Sparkles,
  Sun,
  Flame,
  Landmark,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import type { ReactNode } from "react";

interface HomeQuickLinksCardProps {
  locale: string;
}

interface QuickLinkItem {
  href: string;
  label: string;
  featured?: boolean;
}

interface QuickLinkCategory {
  title: string;
  icon: ReactNode;
  badge: string;
  links: QuickLinkItem[];
}

export function HomeQuickLinksCard({ locale }: HomeQuickLinksCardProps) {
  const isHi = locale === "hi";

  const categories: QuickLinkCategory[] = [
    {
      title: isHi ? "पंचांग एवं वैदिक उपकरण" : "Panchang & Vedic Tools",
      icon: <Sun className="h-4 w-4 text-amber-600" />,
      badge: isHi ? "लाइव" : "Live",
      links: [
        { href: PATHS.panchangToday, label: isHi ? "आज का पंचांग" : "Today's Panchang", featured: true },
        { href: PATHS.panchangTomorrow, label: isHi ? "कल का पंचांग" : "Tomorrow's Panchang" },
        { href: PATHS.panchangYesterday, label: isHi ? "बीता पंचांग" : "Yesterday's Panchang" },
        { href: PATHS.calendar, label: isHi ? "हिन्दू कैलेंडर 2026" : "Hindu Calendar 2026", featured: true },
        { href: PATHS.tithi, label: isHi ? "आज की तिथि" : "Aaj Ki Tithi" },
        { href: PATHS.suvicharMaker, label: isHi ? "सुविचार स्टेटस मेकर" : "Suvichar Status Maker", featured: true },
        { href: PATHS.kundli, label: isHi ? "मुफ्त जन्म कुंडली" : "Free Kundli" },
        { href: PATHS.kundliMilan, label: isHi ? "36 गुण कुंडली मिलान" : "Kundli Milan" },
        { href: PATHS.spiritualTools, label: isHi ? "सभी आध्यात्मिक उपकरण →" : "All Spiritual Tools →" },
      ],
    },
    {
      title: isHi ? "साधना, मंत्र एवं जप" : "Sadhana, Mantras & Jaap",
      icon: <Flame className="h-4 w-4 text-orange-600" />,
      badge: isHi ? "दैनिक" : "Daily",
      links: [
        { href: PATHS.naamJaap, label: isHi ? "ऑनलाइन नाम जाप" : "Online Naam Jaap", featured: true },
        { href: PATHS.mala, label: isHi ? "जाप माला काउंटर (108)" : "Japa Mala Counter (108)" },
        { href: PATHS.sadhana, label: isHi ? "दैनिक साधना कक्ष" : "Daily Sadhana Room" },
        { href: PATHS.sankalp, label: isHi ? "साधना संकल्प" : "Sadhana Sankalp" },
        { href: PATHS.diary, label: isHi ? "आध्यात्मिक डायरी" : "Spiritual Diary" },
        { href: PATHS.mantras, label: isHi ? "नाम जाप मंत्र संग्रह" : "Sacred Jaap Mantras", featured: true },
      ],
    },
    {
      title: isHi ? "कथा, मंदिर एवं तीर्थ यात्रा" : "Katha, Temples & Yatra",
      icon: <Landmark className="h-4 w-4 text-amber-700" />,
      badge: isHi ? "दर्शन" : "Explore",
      links: [
        { href: PATHS.katha, label: isHi ? "पौराणिक कथाएं" : "Sacred Katha Stories", featured: true },
        { href: PATHS.temples, label: isHi ? "प्रमुख हिन्दू मंदिर" : "Sacred Hindu Temples" },
        { href: PATHS.festivals, label: isHi ? "हिन्दू त्यौहार व व्रत" : "Hindu Festivals & Vrats", featured: true },
        { href: PATHS.yatra, label: isHi ? "पवित्र तीर्थ यात्रा गाइड" : "Sacred Yatra Guides" },
        { href: PATHS.yatraPlanner, label: isHi ? "तीर्थ यात्रा प्लानर" : "Yatra Route Planner" },
      ],
    },
    {
      title: isHi ? "आरती, भजन, ज्ञान एवं समुदाय" : "Aarti, Bhajans & Community",
      icon: <BookOpen className="h-4 w-4 text-rose-600" />,
      badge: isHi ? "भक्ति" : "Bhakti",
      links: [
        { href: PATHS.aarti, label: isHi ? "सम्पूर्ण आरती संग्रह" : "Aarti Sangrah" },
        { href: PATHS.bhajan, label: isHi ? "भजन एवं कीर्तन" : "Bhajan & Kirtan" },
        { href: PATHS.chalisa, label: isHi ? "चालीसा संग्रह" : "Chalisa Sangrah" },
        { href: PATHS.quotes, label: isHi ? "दैनिक प्रेरणादायक सुविचार" : "Daily Quotes & Suvichar" },
        { href: PATHS.spirituality, label: isHi ? "सनातन आध्यात्मिक ज्ञान" : "Spiritual Knowledge" },
        { href: PATHS.blog, label: isHi ? "भक्ति वॉइस ब्लॉग" : "Bhakti Blog" },
        { href: PATHS.community, label: isHi ? "भक्त समुदाय" : "Devotee Community" },
        { href: PATHS.store, label: isHi ? "भक्ति स्टोर" : "Bhakti Store" },
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#fffdf9] to-[#fff8f0] p-5 shadow-xs ring-1 ring-amber-500/15 sm:p-6 lg:p-7">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-saffron">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-ink sm:text-lg">
                {isHi ? "त्वरित लिंक्स डायरेक्टरी (Quick Navigation)" : "Quick Navigation Hub"}
              </h2>
              <p className="text-[11px] text-muted sm:text-xs">
                {isHi
                  ? "भक्ति वॉइस के सभी पंचांग, साधना, मंत्र, कथा, मंदिर एवं आध्यात्मिक उपकरणों के सीधे लिंक्स"
                  : "Direct 1-click links to all Panchang, Sadhana, Mantras, Katha, Temples & Vedic Tools"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            <span>{isHi ? "25+ निःशुल्क सुविधाएं" : "25+ Free Devotional Services"}</span>
          </div>
        </div>

        {/* 4-Column Quick Links Grid */}
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {cat.icon}
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/90">
                    {cat.title}
                  </span>
                </div>
                <span className="rounded-md bg-amber-100/70 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                  {cat.badge}
                </span>
              </div>

              <ul className="flex flex-col space-y-1">
                {cat.links.map((link) => (
                  <li key={link.href}>
                    <LocaleLink
                      href={link.href}
                      className="group flex items-center justify-between rounded-xl px-2.5 py-1.5 text-[12.5px] font-medium text-ink/75 transition hover:bg-amber-50 hover:text-saffron-deep"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 group-hover:bg-saffron" />
                        <span className="line-clamp-1">{link.label}</span>
                      </span>
                      {link.featured ? (
                        <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[9.5px] font-bold text-amber-800 ring-1 ring-amber-300/60">
                          {isHi ? "दिव्य" : "Divine"}
                        </span>
                      ) : (
                        <ArrowUpRight className="h-3 w-3 text-muted/40 opacity-0 transition group-hover:text-saffron group-hover:opacity-100" />
                      )}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

