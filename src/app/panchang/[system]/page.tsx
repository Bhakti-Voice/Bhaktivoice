import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getLocale } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/seo/site";
import {
  ALL_REGIONAL_SLUGS,
  getRegionalSystem,
  computeRegionalSnapshot,
} from "@/lib/panchang/regional-systems";
import { getSystemTreatise } from "@/lib/panchang/regional-treatises";
import {
  Compass,
  Calendar,
  Sun,
  Moon,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

export const revalidate = 1800; // 30 minutes

export function generateStaticParams() {
  return ALL_REGIONAL_SLUGS.map((system) => ({ system }));
}

interface PageProps {
  params: Promise<{ system: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { system } = await params;
  const sys = getRegionalSystem(system);
  if (!sys) return {};

  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? `${sys.titleHi} — वैदिक एवं क्षेत्रीय पंचांग, शुभ मुहूर्त व तिथि`
    : `${sys.titleEn} — Daily Tithi, Nakshatra, Muhurat & Regional Calendar`;

  const description = isHi
    ? `${sys.descriptionHi} प्रामाणिक दृक सिद्धांत और खगोलीय गणना पर आधारित।`
    : `${sys.descriptionEn} Accurate astronomical calculations using Lahiri Ayanamsa and Drik Ganita.`;

  return localizedMetadata({
    title,
    description,
    path: `/panchang/${sys.slug}`,
    keywords: isHi ? sys.keywordsHi : sys.keywordsEn,
  });
}

export default async function RegionalPanchangPage({ params }: PageProps) {
  const { system } = await params;
  const sys = getRegionalSystem(system);
  if (!sys) notFound();

  const locale = await getLocale();
  const isHi = locale === "hi";
  const now = new Date();

  const dateFormatted = new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const snap = computeRegionalSnapshot(sys.slug, now);
  const { panchang } = snap;
  const treatise = getSystemTreatise(sys.slug);

  const faqs = isHi ? sys.faqsHi : sys.faqsEn;
  const features = isHi ? sys.featuresHi : sys.featuresEn;

  // Schema for FAQ & Breadcrumb
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isHi ? "होम" : "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isHi ? "पंचांग" : "Panchang",
        item: `${SITE.url}/panchang/today`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isHi ? sys.titleHi : sys.titleEn,
        item: `${SITE.url}/panchang/${sys.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        title={isHi ? sys.titleHi : sys.titleEn}
        subtitle={
          isHi
            ? `${sys.regionHi} • प्रामाणिक पंचांग • ${dateFormatted}`
            : `${sys.region} • Authentic Vedic & Regional Almanac • ${dateFormatted}`
        }
        crumbs={
          isHi
            ? localizedCrumbs(
                "होम",
                ["पंचांग", "/panchang/today"],
                [sys.titleHi, `/panchang/${sys.slug}`]
              )
            : localizedCrumbs(
                "Home",
                ["Panchang", "/panchang/today"],
                [sys.titleEn, `/panchang/${sys.slug}`]
              )
        }
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Live Astronomical & Regional Snapshot Card */}
        <section className="mb-10 overflow-hidden rounded-3xl border-2 border-[#b85d19]/20 bg-gradient-to-br from-[#fffdfa] via-[#fff8ed] to-[#fbf1dc] p-6 shadow-xl lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eedec9] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-saffron-deep">
                  {isHi ? "लाइव खगोलीय गणना (आज)" : "Live Astronomical Alignment (Today)"}
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-bold text-maroon sm:text-3xl">
                {dateFormatted}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-saffron/15 px-3 py-1.5 font-semibold text-saffron-deep border border-saffron/30">
                {isHi ? `स्थान: ${snap.city.nameHi}` : `Location: ${snap.city.name}`}
              </span>
              <span className="rounded-full bg-sand/60 px-3 py-1.5 font-medium text-ink/80 border border-line">
                Lahiri: {snap.ayanamsa}°
              </span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {/* Tithi */}
            <div className="rounded-2xl border border-[#ebd8c1] bg-white/90 p-3.5 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Moon className="h-3.5 w-3.5 text-saffron-deep" />
                <span>{isHi ? "तिथि" : "Tithi"}</span>
              </div>
              <p className="mt-1 text-base font-bold text-ink truncate">
                {isHi ? panchang.tithiAtSunrise.nameHi : panchang.tithiAtSunrise.name}
              </p>
              <p className="text-[11px] text-muted truncate">
                {isHi
                  ? `${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल" : "कृष्ण"} पक्ष`
                  : `${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha`}
              </p>
            </div>

            {/* Nakshatra */}
            <div className="rounded-2xl border border-[#ebd8c1] bg-white/90 p-3.5 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>{isHi ? "नक्षत्र" : "Nakshatra"}</span>
              </div>
              <p className="mt-1 text-base font-bold text-ink truncate">
                {isHi ? panchang.nakshatra.nameHi : panchang.nakshatra.name}
              </p>
              <p className="text-[11px] text-muted truncate">
                {isHi ? `पाद ${panchang.nakshatra.pada}` : `Pada ${panchang.nakshatra.pada}`}
              </p>
            </div>

            {/* Yoga */}
            <div className="rounded-2xl border border-[#ebd8c1] bg-white/90 p-3.5 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Sun className="h-3.5 w-3.5 text-orange-600" />
                <span>{isHi ? "योग" : "Yoga"}</span>
              </div>
              <p className="mt-1 text-base font-bold text-ink truncate">
                {isHi ? panchang.yoga.nameHi : panchang.yoga.name}
              </p>
              <p className="text-[11px] text-muted truncate">
                {panchang.yoga.index}/27
              </p>
            </div>

            {/* Karana */}
            <div className="rounded-2xl border border-[#ebd8c1] bg-white/90 p-3.5 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Clock className="h-3.5 w-3.5 text-rose-600" />
                <span>{isHi ? "करण" : "Karana"}</span>
              </div>
              <p className="mt-1 text-base font-bold text-ink truncate">
                {isHi ? panchang.karana.nameHi : panchang.karana.name}
              </p>
              <p className="text-[11px] text-muted truncate">
                {isHi ? "अर्ध तिथि" : "Half Tithi"}
              </p>
            </div>

            {/* Moon Sign / Chandrarashi */}
            <div className="rounded-2xl border border-[#ebd8c1] bg-white/90 p-3.5 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Compass className="h-3.5 w-3.5 text-indigo-600" />
                <span>{isHi ? "चंद्र राशि" : "Moon Sign"}</span>
              </div>
              <p className="mt-1 text-base font-bold text-ink truncate">
                {isHi ? snap.moonRasiHi : snap.moonRasiEn}
              </p>
              <p className="text-[11px] text-muted truncate">
                {snap.sidMoonLon}° {isHi ? "निरयण" : "Sidereal"}
              </p>
            </div>

            {/* Sun Sign / Suryarashi */}
            <div className="rounded-2xl border border-[#ebd8c1] bg-white/90 p-3.5 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Sun className="h-3.5 w-3.5 text-yellow-600" />
                <span>{isHi ? "सूर्य राशि" : "Sun Sign"}</span>
              </div>
              <p className="mt-1 text-base font-bold text-ink truncate">
                {isHi ? snap.sunRasiHi : snap.sunRasiEn}
              </p>
              <p className="text-[11px] text-muted truncate">
                {snap.sidSunLon}° {isHi ? "निरयण" : "Sidereal"}
              </p>
            </div>
          </div>

          {/* Regional Context Banner */}
          <div className="mt-5 rounded-2xl border border-[#ecd5ba] bg-white/70 p-4 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 font-medium text-ink">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-saffron-deep shrink-0" />
                <span>
                  {sys.slug === "tamil-panchangam" &&
                    (isHi
                      ? `तमिल सौर मास: ${snap.tamilMonth.hi} (Tamil Solar Month: ${snap.tamilMonth.en})`
                      : `Current Tamil Solar Month: ${snap.tamilMonth.en} (${snap.tamilMonth.hi})`)}
                  {sys.slug === "bengali-panjika" &&
                    (isHi
                      ? `बंगला सौर मास: ${snap.bengaliMonth.hi} (Bengali Solar Month: ${snap.bengaliMonth.en})`
                      : `Current Bengali Solar Month: ${snap.bengaliMonth.en} (${snap.bengaliMonth.hi})`)}
                  {sys.slug === "malayalam-panchangam" &&
                    (isHi
                      ? `मलयालम कोल्लम मास: ${snap.malayalamMonth.hi} (Kollam Era Month: ${snap.malayalamMonth.en})`
                      : `Current Malayalam Kollam Month: ${snap.malayalamMonth.en} (${snap.malayalamMonth.hi})`)}
                  {sys.slug === "assamese-panjika" &&
                    (isHi
                      ? `असमिया भास्कराब्द मास: ${snap.assameseMonth.hi} (Assamese Month: ${snap.assameseMonth.en})`
                      : `Current Assamese Solar Month: ${snap.assameseMonth.en} (${snap.assameseMonth.hi})`)}
                  {sys.slug === "odia-panji" &&
                    (isHi
                      ? `ओड़िया सौर मास: ${snap.odiaMonth.hi} (Odia Month: ${snap.odiaMonth.en})`
                      : `Current Odia Solar Month: ${snap.odiaMonth.en} (${snap.odiaMonth.hi})`)}
                  {sys.slug === "iskcon-panchang" &&
                    (isHi
                      ? `गौराब्द वैष्णव मास: ${snap.iskconCurrentMonth.hi} (${snap.iskconCurrentMonth.en})`
                      : `Current Gaurabda Vaishnava Month: ${snap.iskconCurrentMonth.en} (${snap.iskconCurrentMonth.hi})`)}
                  {sys.slug === "vinchudo" &&
                    (isHi
                      ? `वर्तमान स्थिति: ${snap.vinchudoSeverity}`
                      : `Current Vinchudo Status: ${snap.vinchudoSeverity}`)}
                  {sys.slug === "chandrabalam" &&
                    (isHi
                      ? `वर्तमान गोचर चंद्र: ${snap.moonRasiHi} राशि (Native Moon 1, 3, 6, 7, 10, 11 are Auspicious)`
                      : `Current Transit Moon: ${snap.moonRasiEn} Rasi (Strong Chandrabalam for 1st, 3rd, 6th, 7th, 10th, 11th from Birth Moon)`)}
                  {![
                    "tamil-panchangam",
                    "bengali-panjika",
                    "malayalam-panchangam",
                    "assamese-panjika",
                    "odia-panji",
                    "iskcon-panchang",
                    "vinchudo",
                    "chandrabalam",
                  ].includes(sys.slug) &&
                    (isHi
                      ? `वैदिक मास: ${panchang.masaPurnimanta.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल" : "कृष्ण"} पक्ष) • विक्रम संवत ${panchang.vikramSamvat}`
                      : `Vedic Month: ${panchang.masaPurnimanta.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha) • Vikram Samvat ${panchang.vikramSamvat}`)}
                </span>
              </div>
              <LocaleLink
                href="/panchang/today"
                className="inline-flex items-center gap-1 font-bold text-saffron-deep hover:underline text-xs"
              >
                <span>{isHi ? "दैनिक संपूर्ण पंचांग देखें" : "View Full Day Panchang"}</span>
                <ArrowRight className="h-3 w-3" />
              </LocaleLink>
            </div>
          </div>
        </section>

        {/* System Features Highlights */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-maroon sm:text-2xl">
            {isHi
              ? `${sys.titleHi} की मुख्य विशेषताएँ एवं गणितीय नियम`
              : `Key Features & Astronomical Rules of ${sys.titleEn}`}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-2xl border border-line/80 bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed text-ink/90 font-medium">{feat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* In-depth Humanized SEO & Cultural Guide */}
        <section className="mb-12 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-2 border-b border-line pb-4">
            <ShieldCheck className="h-6 w-6 text-saffron-deep" />
            <h2 className="text-xl font-bold text-maroon sm:text-2xl">
              {isHi
                ? `प्रामाणिक विश्लेषण एवं विस्तृत मार्गदर्शिका`
                : `Authentic Calculation & Cultural Guide`}
            </h2>
          </div>

          <div className="prose prose-stone max-w-none text-ink/90 prose-headings:text-maroon prose-strong:text-maroon prose-p:leading-relaxed prose-rich-content">
            <div
              className="whitespace-pre-line text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: (isHi ? sys.seoGuideHi : sys.seoGuideEn)
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/### (.*?)\n/g, "<h3 class='text-lg font-bold text-maroon mt-4 mb-2'>$1</h3>\n")
                  .replace(/## (.*?)\n/g, "<h2 class='text-xl font-bold text-maroon mt-6 mb-3'>$1</h2>\n"),
              }}
            />

            {/* Encyclopedic 4000+ Word Treatise Sections */}
            <div className="mt-10 space-y-10 border-t border-line/60 pt-8">
              {treatise.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xl font-bold text-maroon sm:text-2xl border-b border-sand pb-2">
                    {isHi ? sec.headingHi : sec.headingEn}
                  </h3>
                  <div
                    className="whitespace-pre-line text-sm sm:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: (isHi ? sec.contentHi : sec.contentEn)
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>")
                        .replace(/### (.*?)\n/g, "<h4 class='text-base font-bold text-maroon mt-4 mb-2'>$1</h4>\n")
                        .replace(/\\\[/g, "")
                        .replace(/\\\]/g, "")
                        .replace(/\\left/g, "")
                        .replace(/\\right/g, "")
                        .replace(/\\lfloor/g, "")
                        .replace(/\\rfloor/g, "")
                        .replace(/\\lambda/g, "λ")
                        .replace(/\\Delta\\psi/g, "Δψ"),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Choghadiya / Auspicious Timings Overview */}
        <section className="mb-12 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-maroon sm:text-2xl">
              {isHi ? "दैनिक चौघड़िया मुहूर्त (दिन एवं रात्रि)" : "Today's Choghadiya Muhurat"}
            </h2>
            <span className="text-xs text-muted font-medium">
              {isHi ? "अमृत, शुभ एवं लाभ श्रेष्ठ" : "Amrut, Shubh & Labh are best"}
            </span>
          </div>
          <p className="mb-6 text-xs text-muted sm:text-sm">
            {isHi
              ? "किसी भी शुभ कार्य, यात्रा या नवीन अनुष्ठान को प्रारंभ करने से पूर्व चौघड़िया का विचार अत्यंत महत्वपूर्ण माना गया है।"
              : "Choghadiya is a classical system dividing day and night into 8 portions each to evaluate immediate auspiciousness."}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Day Choghadiya */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-maroon uppercase tracking-wider flex items-center gap-1.5">
                <Sun className="h-4 w-4 text-orange-500" />
                <span>{isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}</span>
              </h3>
              <div className="divide-y divide-line/60 rounded-2xl border border-line overflow-hidden bg-sand/20">
                {panchang.dayChoghadiya.map((ch, idx) => {
                  const startStr = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(ch.start);
                  const endStr = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(ch.end);
                  const isAuspicious = ch.nature === "shubh";
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm ${
                        isAuspicious
                          ? "bg-emerald-50/70 font-semibold text-emerald-900"
                          : "text-ink/80"
                      }`}
                    >
                      <span>{isHi ? ch.nameHi : ch.name} ({isHi ? (isAuspicious ? "शुभ" : ch.nature === "ashubh" ? "अशुभ" : "मध्यम") : ch.nature})</span>
                      <span className="text-xs text-muted">{startStr} - {endStr}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Night Choghadiya */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-maroon uppercase tracking-wider flex items-center gap-1.5">
                <Moon className="h-4 w-4 text-indigo-500" />
                <span>{isHi ? "रात्रि का चौघड़िया" : "Night Choghadiya"}</span>
              </h3>
              <div className="divide-y divide-line/60 rounded-2xl border border-line overflow-hidden bg-sand/20">
                {panchang.nightChoghadiya.map((ch, idx) => {
                  const startStr = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(ch.start);
                  const endStr = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(ch.end);
                  const isAuspicious = ch.nature === "shubh";
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm ${
                        isAuspicious
                          ? "bg-emerald-50/70 font-semibold text-emerald-900"
                          : "text-ink/80"
                      }`}
                    >
                      <span>{isHi ? ch.nameHi : ch.name} ({isHi ? (isAuspicious ? "शुभ" : ch.nature === "ashubh" ? "अशुभ" : "मध्यम") : ch.nature})</span>
                      <span className="text-xs text-muted">{startStr} - {endStr}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-maroon sm:text-2xl">
              {isHi
                ? `अक्सर पूछे जाने वाले प्रश्न (FAQ) — ${sys.titleHi}`
                : `Frequently Asked Questions — ${sys.titleEn}`}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {isHi
                ? "प्रामाणिक ग्रंथों एवं वैदिक ज्योतिष के आधार पर दिए गए उत्तर"
                : "Authoritative answers rooted in classical scriptures and astronomy"}
            </p>
          </div>
          <FaqList faqs={faqs} />
        </section>

        {/* Related Regional Panchangs Grid */}
        <section className="rounded-3xl border border-[#eedec9] bg-gradient-to-b from-[#fffcf8] to-[#fbf2e3] p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-lg font-bold text-maroon sm:text-xl">
            {isHi ? "अन्य क्षेत्रीय एवं विशिष्ट पंचांग" : "Explore Other Regional & Specialized Panchangs"}
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {ALL_REGIONAL_SLUGS.filter((s) => s !== sys.slug).map((slug) => {
              const rel = getRegionalSystem(slug);
              if (!rel) return null;
              return (
                <LocaleLink
                  key={slug}
                  href={`/panchang/${slug}`}
                  className="group block rounded-xl border border-[#eedec9] bg-white p-2.5 text-center transition-all hover:border-saffron hover:shadow-md"
                >
                  <p className="truncate text-xs font-semibold text-ink group-hover:text-saffron-deep">
                    {isHi ? rel.titleHi.split("—")[0] : rel.titleEn.split("(")[0]}
                  </p>
                  <span className="block text-[10px] text-muted truncate mt-0.5">
                    {isHi ? rel.regionHi : rel.region}
                  </span>
                </LocaleLink>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
