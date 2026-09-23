import React from "react";
import Link from "next/link";
import {
  Scale,
  Flame,
  Compass,
  Heart,
  ScrollText,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PATHS } from "@/lib/seo/paths";

export type KundliToolId =
  | "kundli"
  | "sade-sati"
  | "manglik-dosha"
  | "kaal-sarp-dosha"
  | "kundli-milan";

interface RelatedKundliToolsProps {
  currentTool?: KundliToolId;
  isHi?: boolean;
  isTe?: boolean;
  className?: string;
}

export function RelatedKundliTools({
  currentTool = "kundli",
  isHi = false,
  isTe = false,
  className = "",
}: RelatedKundliToolsProps) {
  const allTools = [
    {
      id: "kundli" as KundliToolId,
      href: PATHS.kundli,
      title: isTe ? "ఉచిత జన్మ కుండలి" : isHi ? "मुफ्त जन्म कुंडली" : "Free Janam Kundli",
      description: isTe
        ? "ఖచ్చితమైన వైదిక జన్మ పత్రిక, లగ్నం, 16 వర్గ కుండలులు (D-9, D-10) మరియు వింశోత్తరి మహాదశ."
        : isHi
        ? "सटीक वैदिक जन्म पत्रिका, लग्न, 16 वर्ग कुंडलियां (नवांश, दशमांश) और विंशोत्तरी महादशा।"
        : "Generate your complete Vedic birth chart with 16 divisional charts (D9, D10), Lagna, and Dasha.",
      cta: isTe ? "కుండలిని రూపొందించండి" : isHi ? "कुंडली बनाएं" : "Generate Kundli",
      icon: <ScrollText className="h-5 w-5 text-amber-700" />,
      badge: isTe ? "జన్మ పత్రిక" : isHi ? "जन्म पत्रिका" : "Birth Chart",
      badgeBg: "bg-amber-50 text-amber-900 border-amber-200",
    },
    {
      id: "sade-sati" as KundliToolId,
      href: PATHS.sadeSati,
      title: isTe
        ? "శని సాడే సతి కాలిక్యులేటర్"
        : isHi
        ? "शनि साढ़े साती कैलकुलेटर"
        : "Shani Sade Sati Calculator",
      description: isTe
        ? "మీ జన్మ చంద్ర రాశి ప్రకారం ఏలినాటి శని 3 దశలు, కంటక & అష్టమ శని విశ్లేషణ మరియు శాస్త్రోక్త నివారణలు."
        : isHi
        ? "अपनी जन्म चंद्र राशि से साढ़े साती के तीनों चरण, ढैय्या एवं प्रामाणिक वैदिक उपाय जानें।"
        : "Check your Sade Sati period, rising, peak, and setting planetary phases with authentic Vedic remedies.",
      cta: isTe ? "సాడే సతి తనిఖీ చేయండి" : isHi ? "साढ़े साती जांचें" : "Check Sade Sati",
      icon: <Scale className="h-5 w-5 text-amber-800" />,
      badge: isTe ? "శని గోచారం" : isHi ? "शनि गोचर" : "Saturn Transit",
      badgeBg: "bg-amber-50 text-amber-900 border-amber-200",
    },
    {
      id: "manglik-dosha" as KundliToolId,
      href: PATHS.manglikDosha,
      title: isTe
        ? "మాంగ్లిక్ దోష కాలిక్యులేటర్"
        : isHi
        ? "मांगलिक दोष कैलकुलेटर"
        : "Manglik Dosha Calculator",
      description: isTe
        ? "లగ్నం, చంద్రుడు, శుక్రుడి నుండి కుజ దోష విశ్లేషణ మరియు 16 శాస్త్రోక్త పరిహార (దోష భంగ) నియమాలు."
        : isHi
        ? "लग्न, चंद्र व शुक्र से कुज दोष तथा 16 शास्त्रीय परिहार (दोष भंग) नियमों की सूक्ष्म जांच करें।"
        : "Check whether Manglik Dosha is present in your birth chart across Lagna, Moon, and Venus.",
      cta: isTe ? "మాంగ్లిక్ దోషం తనిఖీ చేయండి" : isHi ? "मांगलिक दोष जांचें" : "Check Manglik Dosha",
      icon: <Flame className="h-5 w-5 text-orange-600" />,
      badge: isTe ? "కుజ దోషం" : isHi ? "कुज दोष" : "Kuja Dosha",
      badgeBg: "bg-orange-50 text-orange-900 border-orange-200",
    },
    {
      id: "kaal-sarp-dosha" as KundliToolId,
      href: PATHS.kaalSarpDosha,
      title: isTe
        ? "కాల సర్ప దోష కాలిక్యులేటర్"
        : isHi
        ? "काल सर्प दोष कैलकुलेटर"
        : "Kaal Sarp Dosha Calculator",
      description: isTe
        ? "అనంత నుండి శేషనాగ వరకు 12 రకాల కాల సర్ప యోగాలు, రాహు-కేతువుల అక్ష విశ్లేషణ మరియు నివారణలు."
        : isHi
        ? "अनंत से शेषनाग तक 12 काल सर्प योगों, उदित/अनुदित दिशा एवं सात्विक शांति उपायों की जांच करें।"
        : "Analyze your Kundli for all 12 classical Kaal Sarp Yogas, Rahu-Ketu axis, and Shastric remedies.",
      cta: isTe ? "కాల సర్ప దోషం తనిఖీ చేయండి" : isHi ? "काल सर्प दोष जांचें" : "Check Kaal Sarp Dosha",
      icon: <Compass className="h-5 w-5 text-purple-600" />,
      badge: isTe ? "రాహు-కేతు యోగం" : isHi ? "राहु-केतु योग" : "Rahu-Ketu Yoga",
      badgeBg: "bg-purple-50 text-purple-900 border-purple-200",
    },
    {
      id: "kundli-milan" as KundliToolId,
      href: PATHS.kundliMilan,
      title: isTe ? "కుండలి మిలనం (36 గుణాలు)" : isHi ? "कुंडली मिलान (36 गुण)" : "Kundli Milan",
      description: isTe
        ? "వివాహ అనుకూలత కొరకు వధూవరుల సాంప్రదాయ 36 గుణాల అష్టకూట మిలనం, నాడీ మరియు భకూట్ పరిశీలన."
        : isHi
        ? "विवाह अनुकूलता हेतु वर-वधू का पारंपरिक 36 गुण अष्टकूट मिलान, नाड़ी दोष एवं भकूट विचार।"
        : "Match two Kundlis using classical 36 Gunas Ashtakoot Milan with Nadi and Bhakoot harmony checks.",
      cta: isTe ? "కుండలి కలపండి" : isHi ? "कुंडली मिलान करें" : "Match Kundli",
      icon: <Heart className="h-5 w-5 text-rose-600" />,
      badge: isTe ? "వివాహ పొంతన" : isHi ? "विवाह मिलान" : "Marriage Match",
      badgeBg: "bg-rose-50 text-rose-900 border-rose-200",
    },
  ];

  // Exclude current tool so the section acts as an intuitive sibling / child discovery block
  const displayedTools = allTools.filter((tool) => tool.id !== currentTool);

  const getLocalizedHref = (path: string) => {
    if (isTe) return `/te${path}`;
    if (isHi) return `/hi${path}`;
    return path;
  };

  return (
    <section
      aria-label="Related Kundli Tools"
      className={`rounded-3xl border border-[#ecdac8] bg-gradient-to-br from-[#fffdfa] via-white to-[#fff8ed] p-6 sm:p-8 shadow-xs print:hidden ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#ecdac8]/80 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-100/70 px-3 py-0.5 text-xs font-bold text-amber-900 mb-1.5">
            <Sparkles className="h-3 w-3 text-amber-800" />
            <span>
              {isTe ? "వైదిక జ్యోతిష సాధనాలు" : isHi ? "वैदिक ज्योतिष टूल्स" : "Vedic Astrology Tools"}
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#3b1812] tracking-tight">
            {isTe
              ? "సంబంధిత కుండలి సాధనాలు (Related Kundli Tools)"
              : isHi
              ? "संबंधित कुंडली उपकरण (Related Kundli Tools)"
              : "Related Kundli Tools"}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md">
          {isTe
            ? "దోష నివారణలు, గ్రహ గోచారం మరియు వివాహ అనుకూలత కొరకు మా ఇతర ప్రామాణిక సాధనాలను ఉపయోగించండి."
            : isHi
            ? "दोष निवारण, ग्रह गोचर और विवाह अनुकूलता हेतु हमारे अन्य प्रामाणिक वैदिक कुंडली टूल्स का लाभ लें।"
            : "Explore our authentic Vedic tools to analyze planetary transits, dosha remedies, and horoscope matching."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {displayedTools.map((tool) => {
          const finalHref = getLocalizedHref(tool.href);
          return (
            <Link
              key={tool.id}
              href={finalHref}
              className="group flex flex-col justify-between rounded-2xl border border-[#ecdac8] bg-white p-5 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-[#d9531e] hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff7ee] border border-amber-200/60 shadow-2xs group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wide ${tool.badgeBg}`}
                  >
                    {tool.badge}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#d9531e] transition-colors leading-snug">
                  {tool.title}
                </h3>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed font-normal">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f4ece3] flex items-center justify-between text-xs font-semibold text-[#c2410c] group-hover:text-[#d9531e]">
                <span>{tool.cta}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
