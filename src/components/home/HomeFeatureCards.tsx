import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  AartiIcon,
  BhajanIcon,
  BlogIcon,
  ChalisaIcon,
  CommunityIcon,
  FestivalCalendarIcon,
  LotusIcon,
  MantraIcon,
  OpenBookIcon,
  PrayerHandsIcon,
  ShrineIcon,
  TempleIcon,
  HinduCalendarIcon,
  PanchangIcon,
} from "@/components/home/FeatureIcons";
import { PATHS } from "@/lib/seo/paths";

interface FeatureItem {
  href: string;
  icon: typeof PanchangIcon;
  title: string;
  text: string;
  badge?: string;
  color: string;
  bgGrad: string;
}

export function HomeFeatureCards({ locale }: { locale: string }) {
  const isHi = locale === "hi";

  const features: FeatureItem[] = [
    {
      href: PATHS.panchangToday,
      icon: PanchangIcon,
      title: isHi ? "आज का पंचांग" : "Today's Panchang",
      text: isHi ? "शुभ मुहूर्त एवं चौघड़िया" : "Shubh Muhurat & Timings",
      badge: isHi ? "दैनिक" : "Daily",
      color: "#d97706",
      bgGrad: "from-amber-500/15 via-orange-500/10 to-amber-500/5",
    },
    {
      href: PATHS.calendar,
      icon: HinduCalendarIcon,
      title: isHi ? "हिन्दू कैलेंडर" : "Hindu Calendar",
      text: isHi ? "तिथि, व्रत और पर्व" : "Tithi, Vrat & Festivals",
      badge: "2026",
      color: "#ea580c",
      bgGrad: "from-orange-500/15 via-amber-500/10 to-orange-500/5",
    },
    {
      href: PATHS.naamJaap,
      icon: PrayerHandsIcon,
      title: isHi ? "नाम जप काउंटर" : "Naam Jaap",
      text: isHi ? "१०८ मनके व ध्यान" : "108 Beads & Dhyan",
      badge: "Live",
      color: "#e67e22",
      bgGrad: "from-orange-600/15 via-amber-500/10 to-yellow-500/5",
    },
    {
      href: PATHS.chalisa,
      icon: ChalisaIcon,
      title: isHi ? "चालीसा संग्रह" : "Chalisa Sangrah",
      text: isHi ? "हनुमान व शिव चालीसा" : "Hanuman, Shiva & Durga",
      color: "#e11d48",
      bgGrad: "from-rose-500/15 via-pink-500/10 to-red-500/5",
    },
    {
      href: PATHS.aarti,
      icon: AartiIcon,
      title: isHi ? "दैनिक आरती" : "Aarti Sangrah",
      text: isHi ? "नित्य आरती संग्रह" : "Daily Sacred Aarti",
      color: "#c026d3",
      bgGrad: "from-fuchsia-500/15 via-purple-500/10 to-pink-500/5",
    },
    {
      href: PATHS.mantras,
      icon: MantraIcon,
      title: isHi ? "वैदिक मंत्र" : "Sacred Mantras",
      text: isHi ? "मंत्र जाप व अर्थ" : "Vedic Mantras & Meaning",
      color: "#4f46e5",
      bgGrad: "from-indigo-500/15 via-blue-500/10 to-indigo-500/5",
    },
    {
      href: PATHS.katha,
      icon: OpenBookIcon,
      title: isHi ? "पौराणिक कथाएं" : "Puranic Katha",
      text: isHi ? "व्रत व भक्ति कथाएं" : "Vrat & Devotional Stories",
      color: "#b45309",
      bgGrad: "from-amber-600/15 via-yellow-500/10 to-amber-500/5",
    },
    {
      href: PATHS.festivals,
      icon: FestivalCalendarIcon,
      title: isHi ? "त्योहार व पर्व" : "Festivals",
      text: isHi ? "सनातन पर्व व तिथियां" : "Sanatan Celebrations",
      color: "#d97706",
      bgGrad: "from-amber-500/15 via-orange-500/10 to-amber-500/5",
    },
    {
      href: PATHS.temples,
      icon: ShrineIcon,
      title: isHi ? "पवित्र मंदिर" : "Hindu Temples",
      text: isHi ? "तीर्थ व दर्शन इतिहास" : "Sacred Temples & Darshan",
      color: "#92400e",
      bgGrad: "from-amber-700/15 via-orange-600/10 to-amber-600/5",
    },
    {
      href: PATHS.yatra,
      icon: TempleIcon,
      title: isHi ? "तीर्थ यात्रा" : "Yatra Guide",
      text: isHi ? "चार धाम व मार्गदर्शिका" : "Char Dham & Pilgrimage",
      color: "#854d0e",
      bgGrad: "from-yellow-600/15 via-amber-600/10 to-yellow-500/5",
    },
    {
      href: PATHS.bhajan,
      icon: BhajanIcon,
      title: isHi ? "भक्ति भजन" : "Bhakti Bhajans",
      text: isHi ? "मधुर भजन व संकीर्तन" : "Devotional Audio & Lyrics",
      color: "#0f766e",
      bgGrad: "from-teal-500/15 via-emerald-500/10 to-teal-500/5",
    },
    {
      href: PATHS.community,
      icon: CommunityIcon,
      title: isHi ? "भक्त परिवार" : "Devotee Community",
      text: isHi ? "सत्संग व विचार साझा करें" : "Devotees & Daily Sangha",
      color: "#7c3aed",
      bgGrad: "from-violet-500/15 via-purple-500/10 to-indigo-500/5",
    },
    {
      href: PATHS.store,
      icon: LotusIcon,
      title: isHi ? "पूजा सामग्री" : "Puja Store",
      text: isHi ? "रुद्राक्ष व पवित्र माला" : "Rudraksha & Puja Essentials",
      color: "#c2410c",
      bgGrad: "from-orange-600/15 via-amber-500/10 to-orange-500/5",
    },
    {
      href: PATHS.blog,
      icon: BlogIcon,
      title: isHi ? "धार्मिक लेख" : "Spiritual Blog",
      text: isHi ? "ज्ञान, विधि व साधना" : "Spiritual Insights & Guides",
      color: "#374151",
      bgGrad: "from-stone-500/15 via-neutral-500/10 to-stone-500/5",
    },
  ];

  return (
    <section className="relative z-20 mx-auto -mt-[4.5rem] max-w-7xl px-4 pb-4 sm:-mt-[5rem] lg:-mt-[5.25rem] lg:px-8">
      <div className="relative">
        {/* Scroll Container with Smooth Touch / Trackpad Scrolling */}
        <div
          className="home-feature-scroll-v2 -mx-4 sm:-mx-6 lg:-mx-2 px-4 sm:px-6 lg:px-2 overflow-x-auto overscroll-x-contain pb-3 pt-1 scroll-smooth"
          aria-label="Explore Bhakti Voice"
        >
          <div className="flex w-max gap-3 sm:gap-3.5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <LocaleLink
                  key={feature.href}
                  href={feature.href}
                  className="group relative flex flex-col justify-between w-[140px] sm:w-[155px] lg:w-[165px] min-h-[148px] sm:min-h-[160px] p-3.5 sm:p-4 rounded-[24px] bg-gradient-to-b from-[#fffefc] to-[#fff8ee] hover:from-white hover:to-[#fff3e0] border border-[#f0dcbe] hover:border-amber-400/90 shadow-[0_4px_16px_rgba(217,119,6,0.08)] hover:shadow-[0_12px_28px_rgba(217,119,6,0.18)] hover:-translate-y-1.5 transition-all duration-300 snap-start select-none"
                >
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${feature.bgGrad} flex items-center justify-center border border-amber-200/60 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shadow-2xs`}
                      style={{ color: feature.color }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {feature.badge ? (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100/90 text-orange-950 border border-orange-200/80 shadow-2xs">
                        {feature.badge === "Live" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-0.5" />
                        )}
                        {feature.badge}
                      </span>
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-saffron group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    )}
                  </div>

                  {/* Bottom: Title & Subtitle */}
                  <div className="mt-3 text-left">
                    <h2 className="font-serif text-[14px] sm:text-[15px] font-bold leading-tight text-[#3d1e13] group-hover:text-saffron-deep transition-colors line-clamp-1">
                      {feature.title}
                    </h2>
                    <p className="mt-1 text-[11px] sm:text-[11.5px] font-medium text-stone-500 group-hover:text-stone-700 leading-snug line-clamp-1 transition-colors">
                      {feature.text}
                    </p>
                  </div>

                  {/* Subtle ambient bottom glow on hover */}
                  <div
                    className="absolute inset-x-4 bottom-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: feature.color }}
                  />
                </LocaleLink>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
