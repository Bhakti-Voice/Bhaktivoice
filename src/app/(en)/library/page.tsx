import type { Metadata } from "next";
import { ArrowRight, BookOpen, Compass, Eye, Moon, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { hubMetadata } from "@/lib/i18n/hub";
import { JsonLd } from "@/components/seo/JsonLd";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("library");
}

export default function LibraryHubPage() {
  // Breadcrumbs: strictly follow Home -> Library
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Library", href: PATHS.library },
  ];

  const libraryCollections = [
    {
      title: "Angel Numbers & Sacred Numerology",
      subtitle: "Divine whispers and repeating number sequences",
      description:
        "Explore comprehensive spiritual meanings for angel numbers like 500, 555, 777, and 1111. Learn how the universe communicates with you through synchronicities, love guidance, and life direction.",
      href: PATHS.angelNumbers,
      badge: "Active Collection",
      icon: Sparkles,
      active: true,
      buttonText: "Explore Angel Numbers",
    },
    {
      title: "Sacred Yantras & Divine Geometry",
      subtitle: "Mystical diagrams for meditation and concentration",
      description:
        "Discover ancient sacred geometry representations of mantras and cosmic principles for household altars and mental clarity.",
      href: "#",
      badge: "Coming Soon",
      icon: Compass,
      active: false,
      buttonText: "In Preparation",
    },
    {
      title: "Vedic Dream Meanings (Swapna Shastra)",
      subtitle: "Sacred interpretations of spiritual visions",
      description:
        "Understand auspicious signs, sacred animals, and temple visions experienced during sleep according to timeless Vedic traditions.",
      href: "#",
      badge: "Coming Soon",
      icon: Moon,
      active: false,
      buttonText: "In Preparation",
    },
    {
      title: "Chakra Wisdom & Energy Alignment",
      subtitle: "Balancing the subtle body through devotion",
      description:
        "Gentle guides to understanding the seven sacred energy vortices, paired with japa, sacred sound vibrations, and breath awareness.",
      href: "#",
      badge: "Coming Soon",
      icon: Eye,
      active: false,
      buttonText: "In Preparation",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* JSON-LD Schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "BhaktiVoice Spiritual Library",
          description: "Explore sacred wisdom collections, divine angel numbers, and spiritual guidance.",
          url: "https://bhaktivoice.com/library",
        }}
      />

      {/* Breadcrumb Navigation: Home > Library */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-[#ebdccb] bg-gradient-to-br from-[#fffefc] via-[#faf5ec] to-[#f4ebe0] p-6 sm:p-10 shadow-xs mb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#fdf0ec] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#b8532f] border border-[#fae2da] mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Spiritual Knowledge Hub</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2c1810]">
            Spiritual Library
          </h1>
          <p className="mt-3 text-base sm:text-lg font-serif font-medium text-amber-900/85">
            Sacred Wisdom, Divine Symbols & Inner Guidance
          </p>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Welcome to the BhaktiVoice Library. We curate sacred wisdom, recurring celestial signs,
            angelic synchronicities, and meditative companions designed to ground your daily life in devotion and clarity.
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {libraryCollections.map((col, idx) => {
          const IconComponent = col.icon;
          return (
            <div
              key={idx}
              className={`rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                col.active
                  ? "bg-white border-[#ebdccb] shadow-[0_4px_20px_rgba(217,119,6,0.06)] hover:shadow-[0_12px_32px_rgba(217,119,6,0.12)] hover:border-amber-400/80 hover:-translate-y-1"
                  : "bg-[#faf6f0]/70 border-[#f0e3d5] opacity-80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className={`p-3 rounded-2xl ${
                      col.active
                        ? "bg-gradient-to-br from-amber-100 to-rose-100 text-amber-900"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                      col.active
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-stone-100 text-stone-600 border border-stone-200"
                    }`}
                  >
                    {col.badge}
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2c1810]">
                  {col.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm font-serif text-amber-900/80">
                  {col.subtitle}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#f2e6d9]">
                {col.active ? (
                  <LocaleLink
                    href={col.href}
                    className="inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-saffron-deep shadow-xs transition-colors"
                  >
                    <span>{col.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </LocaleLink>
                ) : (
                  <span className="text-xs font-semibold text-stone-600">
                    {col.buttonText}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
