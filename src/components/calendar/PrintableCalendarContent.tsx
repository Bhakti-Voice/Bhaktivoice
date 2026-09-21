"use client";

import React from "react";
import {
  Compass,
  Moon,
  Sun,
  BookOpen,
  Printer,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface PrintableCalendarContentProps {
  isHi?: boolean;
  isTe?: boolean;
}

export function PrintableCalendarContent({
  isHi = false,
  isTe = false,
}: PrintableCalendarContentProps) {
  return (
    <section className="mt-12 space-y-12 border-t border-[#ecdac8]/80 pt-10 print:hidden text-stone-800">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3.5 py-1 text-xs font-bold text-[#b45309] mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>
            {isTe
              ? "ప్రామాణిక సనాతన విజ్ఞానం"
              : isHi
              ? "प्रामाणिक सनातन वैदिक ज्ञान"
              : "Authentic Vedic Wisdom & Panchang Guide"}
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812] tracking-tight">
          {isTe
            ? "సనాతన హిందూ వాల్ క్యాలెండర్ మరియు పంచాంగ మార్గదర్శి"
            : isHi
            ? "सनातन हिन्दू दीवार कैलेंडर एवं दैनिक पंचांग संपूर्ण दिग्दर्शिका"
            : "The Complete Guide to the Sanatan Hindu Wall Calendar & Panchang"}
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-stone-600 leading-relaxed">
          {isTe
            ? "ఈ క్యాలెండర్ కేవలం రోజులు మాత్రమే కాకుండా, గ్రహాలు, చంద్రకళలు, తిథులు మరియు దేవతల ఆశీస్సులతో కూడిన మీ నిత్య ఆధ్యాత్మిక మార్గదర్శి."
            : isHi
            ? "हिन्दू कैलेंडर मात्र तारीखों का संग्रह नहीं, बल्कि सूर्य-चंद्रमा की गति, ऋतु-परिवर्तन और कालचक्र के साथ जीवन को संतुलित करने का पवित्र साधन है।"
            : "More than a sequence of dates, a Sanatan Wall Calendar harmonizes your daily routine with cosmic solar-lunar rhythms, sacred tithis, and timeless spiritual wisdom."}
        </p>
      </div>

      {/* Grid: 5 Limbs of Panchang */}
      <div className="rounded-3xl border border-[#ecdac8] bg-gradient-to-b from-[#fffcf8] to-[#fbf7f0] p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-[#b45309]">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3b1812]">
              {isTe
                ? "పంచాంగం యొక్క 5 అంగాలు (పంచ అంగాలు)"
                : isHi
                ? "पंचांग के पंच-अंग: काल गणना के पाँच दिव्य स्तंभ"
                : "The Five Limbs of Panchang (Pancha-Anga)"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              {isTe
                ? "తిథి, వార, నక్షత్ర, యోగ, కరణాలు — కాలచక్ర రహస్యాలు"
                : isHi
                ? "तिथि, वार, नक्षत्र, योग और करण — वैदिक कालचक्र के मूल तत्व"
                : "Tithi, Vara, Nakshatra, Yoga, and Karana — the foundation of Vedic timekeeping"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Limb 1: Tithi */}
          <div className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e]/30 transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-700 font-serif font-bold text-sm">
                १
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-base">
                {isTe ? "తిథి (Tithi)" : isHi ? "तिथि (Tithi)" : "Tithi (Lunar Day)"}
              </h4>
            </div>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
              {isTe
                ? "సూర్యుడు మరియు చంద్రుని మధ్య 12 డిగ్రీల కోణీయ దూరాన్ని తిథి అంటారు. ఒక నెలలో 30 తిథులు ఉంటాయి (శుక్ల పక్షంలో 15, కృష్ణ పక్షంలో 15)."
                : isHi
                ? "सूर्य एवं चन्द्रमा के बीच 12 अंश के कोणीय अंतर को एक तिथि कहा जाता है। एक मास में 30 तिथियाँ होती हैं (15 शुक्ल पक्ष व 15 कृष्ण पक्ष)। सूर्योदय कालीन तिथि (उदयातिथि) सर्वमान्य मानी जाती है।"
                : "A Tithi represents a 12° angular longitudinal separation between the Sun and Moon. Each lunar month has 30 tithis (15 in Shukla Paksha, 15 in Krishna Paksha). The prevailing tithi at astronomical sunrise (Udayatithi) governs religious observances."}
            </p>
          </div>

          {/* Limb 2: Vara */}
          <div className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e]/30 transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-700 font-serif font-bold text-sm">
                २
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-base">
                {isTe ? "వారం (Vara)" : isHi ? "वार (Vara)" : "Vara (Solar Weekday)"}
              </h4>
            </div>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
              {isTe
                ? "సూర్యోదయం నుండి తర్వాతి సూర్యోదయం వరకు ఒక సౌర దినం. 7 వారాలు నవగ్రహాల అధిపతులచే పాలించబడతాయి (ఆదివారం సూర్యుడు, సోమవారం చంద్రుడు మొదలైనవి)."
                : isHi
                ? "एक सूर्योदय से अगले सूर्योदय तक की अवधि को 'वार' कहते हैं। सातों वार नवग्रहों के आधिपत्य में हैं (रविवार: सूर्य, सोमवार: चन्द्र, मंगलवार: मंगल आदि), जो दिन की ऊर्जा का नियमन करते हैं।"
                : "A solar day calculated from local sunrise to the next sunrise. The 7 weekdays are ruled by the Navagraha planetary lords, defining the ambient celestial energy and suitability for specific actions."}
            </p>
          </div>

          {/* Limb 3: Nakshatra */}
          <div className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e]/30 transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-700 font-serif font-bold text-sm">
                ३
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-base">
                {isTe ? "నక్షత్రం (Nakshatra)" : isHi ? "नक्षत्र (Nakshatra)" : "Nakshatra (Lunar Mansion)"}
              </h4>
            </div>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
              {isTe
                ? "రాశిచక్రం 27 నక్షత్రాలుగా విభజించబడింది. చంద్రుడు ఒక్కో నక్షత్రం గుండా ప్రయాణించే సమయం ఆనాటి నక్షత్రంగా పరిగణించబడుతుంది."
                : isHi
                ? "360 अंश के भचक्र को 27 समान भागों (प्रत्येक 13°20') में बाँटा गया है जिन्हें नक्षत्र कहते हैं। चन्द्रमा जिस नक्षत्र में विचरण करता है, वही उस दिन का नक्षत्र होता है।"
                : "The 360° zodiac is divided into 27 lunar mansions (13°20' each). As Chandra (Moon) travels across the ecliptic, each constellation imparts subtle qualities influencing human consciousness."}
            </p>
          </div>

          {/* Limb 4: Yoga */}
          <div className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e]/30 transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700 font-serif font-bold text-sm">
                ४
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-base">
                {isTe ? "యోగం (Yoga)" : isHi ? "योग (Yoga)" : "Yoga (Luni-Solar Angle)"}
              </h4>
            </div>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
              {isTe
                ? "సూర్యుడు మరియు చంద్రుని రేఖాంశాల మొత్తాన్ని 27 యోగాలుగా విభజించారు. విష్కంభం నుండి వైధృతి వరకు 27 రకాల యోగాలు ఉంటాయి."
                : isHi
                ? "सूर्य और चन्द्रमा के भोगांशों के योग से बनने वाले 27 विशेष संयोगों को 'योग' कहते हैं। विष्कम्भ से लेकर वैधृति तक 27 योगों में शुभ-अशुभ मुहूर्तों का निर्णय होता है।"
                : "Formed by the sum of solar and sidereal lunar longitudes divided into 27 segments of 13°20'. Auspicious yogas (like Siddhi, Shubha, Amrita) multiply the merit of good deeds and rituals."}
            </p>
          </div>

          {/* Limb 5: Karana */}
          <div className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e]/30 transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-serif font-bold text-sm">
                ५
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-base">
                {isTe ? "కరణం (Karana)" : isHi ? "करण (Karana)" : "Karana (Half-Tithi)"}
              </h4>
            </div>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
              {isTe
                ? "ఒక తిథిలో సగభాగాన్ని కరణం అంటారు (6 డిగ్రీలు). 11 కరణాలలో 7 చర కరణాలు, 4 స్థిర కరణాలు ఉంటాయి. భద్ర కరణం విష్టిగా ప్రసిద్ధి."
                : isHi
                ? "तिथि के आधे भाग (6 अंश) को 'करण' कहते हैं। कुल 11 करण होते हैं (7 चर और 4 स्थिर)। इनमें 'विष्टि करण' को 'भद्रा' कहा जाता है जिसमें शुभ कार्य वर्जित होते हैं।"
                : "A half-tithi spanning 6° of lunar elongation. There are 11 Karanas in total (7 movable, 4 fixed). Vishti Karana (popularly known as Bhadra) is traditionally avoided for auspicious undertakings."}
            </p>
          </div>

          {/* Bonus: Udayatithi */}
          <div className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e]/30 transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-700 font-serif font-bold text-sm">
                ☀️
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-base">
                {isTe ? "ఉదయతిథి ప్రాముఖ్యత" : isHi ? "उदयातिथि का महत्व" : "The Udayatithi Principle"}
              </h4>
            </div>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
              {isTe
                ? "సూర్యోదయ సమయంలో ఏ తిథి ఉంటుందో అదే రోజు మొత్తం ఆ తిథిగా పాటిస్తారు. భక్తి వాయిస్ మీ నగరం ప్రకారం ఉదయతిథిని ఖచ్చితంగా గణిస్తుంది."
                : isHi
                ? "सनातन धर्म में 'सूर्योदये या तिथिः सा दिनव्यापिनी' के अनुसार सूर्योदय कालीन तिथि पूरे दिन फलदायी मानी जाती है। इसलिए स्थानीय अक्षांश-देशांतर के आधार पर पंचांग देखना आवश्यक है।"
                : "According to the Smriti scriptures, the tithi present at the moment of local sunrise governs the entire daylight ritual. This makes city-accurate astronomical ephemeris essential for true precision."}
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Paksha & Vikram Samvat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: Shukla vs Krishna Paksha */}
        <div className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-[#b45309]">
              <Moon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
                {isTe
                  ? "శుక్ల పక్షం మరియు కృష్ణ పక్షం అర్థం"
                  : isHi
                  ? "शुक्ल पक्ष (Shu) एवं कृष्ण पक्ष (Kri) का रहस्य"
                  : "Understanding Shukla Paksha vs Krishna Paksha"}
              </h3>
              <p className="text-xs text-stone-500">
                {isTe ? "చంద్రుని వృద్ధి మరియు క్షీణత చక్రం" : isHi ? "चंद्रमा की 15-15 दिनों की कलाएँ" : "The Waxing & Waning Lunar Cycles"}
              </p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
              <p className="font-bold text-amber-900 mb-1">
                {isTe ? "శుక్ల పక్షం (Shu / Sh)" : isHi ? "शुक्ल पक्ष (शु / Shu)" : "Shukla Paksha (Shu / Waxing Moon)"}
              </p>
              <p>
                {isTe
                  ? "అమావాస్య తర్వాతి రోజు నుండి పౌర్ణమి వరకు చంద్రుని వెన్నెల పెరిగే 15 రోజులు. ఇది దైవిక కార్యాలు, వివాహం, గృహప్రవేశం మరియు కొత్త పనుల ప్రారంభానికి శుభప్రదం."
                  : isHi
                  ? "अमावस्या के अगले दिन से पूर्णिमा तक का 15 दिवसीय समय, जिसमें चंद्रमा का प्रकाश प्रतिदिन बढ़ता है। इसे देव पक्ष माना जाता है; नवीन गृहप्रवेश, व्यापारारम्भ व विवाह हेतु यह सर्वोत्तम है।"
                  : "The 15-day fortnight from the day following Amavasya (New Moon) to Purnima (Full Moon). As moonlight increases daily, it is revered as the bright, divine fortnight, ideal for Griha Pravesh, weddings, and new ventures."}
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
              <p className="font-bold text-stone-900 mb-1">
                {isTe ? "కృష్ణ పక్షం (Kri / Kr)" : isHi ? "कृष्ण पक्ष (कृ / Kri)" : "Krishna Paksha (Kri / Waning Moon)"}
              </p>
              <p>
                {isTe
                  ? "పౌర్ణమి తర్వాతి రోజు నుండి అమావాస్య వరకు చంద్రుని వెన్నెల తగ్గే 15 రోజులు. ఇది అంతర్ముఖ సాధన, పితృ తర్పణాలు, సంకల్ప వ్రతాలు మరియు ధ్యానానికి అనుకూలం."
                  : isHi
                  ? "पूर्णिमा के अगले दिन से अमावस्या तक का 15 दिवसीय समय, जब चंद्रकलाएँ घटती हैं। यह पक्ष आत्म-चिंतन, तपस्या, पितृ तर्पण एवं संकष्टी चतुर्थी जैसे तप-व्रतों के लिए विशेष रूप से फलदायी है।"
                  : "The 15-day fortnight from the day after Purnima to Amavasya. As the moon wanes, this period is considered deeply spiritual for inner contemplation, meditation, Pitru Tarpan, and penance fasts like Sankashti Chaturthi."}
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Vikram Samvat & Shaka Samvat */}
        <div className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-[#c2410c]">
              <Sun className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
                {isTe
                  ? "విక్రమ సంవత్ & శక సంవత్ లెక్కలు"
                  : isHi
                  ? "विक्रम संवत् (2083) एवं शक संवत् (1948) का इतिहास"
                  : "Vikram Samvat (2083) & Shaka Samvat (1948)"}
              </h3>
              <p className="text-xs text-stone-500">
                {isTe ? "భారతీయ కాలమానం & గ్రెగోరియన్ సంబంధం" : isHi ? "वैदिक संवत्सर एवं सौर वर्ष का संबंध" : "Historical Origins & Solar Synchronization"}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <p>
              {isTe
                ? "విక్రమ సంవత్ క్రీస్తు పూర్వం 57 లో ఉజ్జయిని చక్రవర్తి విక్రమాదిత్యునిచే ప్రారంభించబడింది. ఇది సాధారణ గ్రెగోరియన్ క్యాలెండర్ కంటే 57 సంవత్సరాలు ముందుంటుంది (ఉదాహరణకు 2026 = విక్రమ సంవత్ 2083)."
                : isHi
                ? "विक्रम संवत् की स्थापना 57 ईसा पूर्व (BCE) में मालव सम्राट विक्रमादित्य ने शकों पर ऐतिहासिक विजय के उपलक्ष्य में की थी। यही कारण है कि विक्रम संवत् ईस्वी सन् से 57 वर्ष आगे चलता है (जैसे 2026 में संवत् 2083)।"
                : "Vikram Samvat was instituted in 57 BCE by Emperor Vikramaditya of Ujjain following his decisive victory over the Saka invaders. Consequently, Vikram Samvat is approximately 56–57 years ahead of the Gregorian calendar (e.g. 2026 CE = VS 2083)."}
            </p>
            <p>
              {isTe
                ? "శక సంవత్ క్రీ.శ. 78 లో శాలివాహనునిచే ప్రారంభించబడింది మరియు ఇది భారత జాతీయ క్యాలెండర్ (గ్రెగోరియన్ కంటే 78 సంవత్సరాలు వెనుక ఉంటుంది)."
                : isHi
                ? "शक संवत् का आरंभ 78 ईस्वी में राजा शालिवाहन ने किया था, जिसे भारत सरकार द्वारा राष्ट्रीय संवत् घोषित किया गया है (ईस्वी सन् से 78 वर्ष पीछे, जैसे 2026 में शक 1948)।"
                : "Shaka Samvat began in 78 CE under King Shalivahana and serves as the official civil National Calendar of India, trailing the Gregorian year by 78 years (e.g. 2026 CE = Shaka 1948)."}
            </p>
            <div className="rounded-xl bg-[#fff7ed] border border-[#fed7aa] p-3 text-[11px] sm:text-xs font-medium text-[#9a3412]">
              💡 <strong>{isTe ? "అధిక మాసం రహస్యం:" : isHi ? "अधिक मास (मलमास) का नियम:" : "The Adhika Masa System:"}</strong>{" "}
              {isTe
                ? "చంద్ర సంవత్సరం (354 రోజులు) మరియు సౌర సంవత్సరం (365 రోజులు) సమతుల్యం చేయడానికి ప్రతి 32.5 నెలలకు ఒక అదనపు నెల కలుపుతారు."
                : isHi
                ? "चंद्र वर्ष (354 दिन) और सौर वर्ष (365 दिन) में 11 दिनों का अंतर होता है। इसे संतुलित करने के लिए प्रत्येक 32 महीने 16 दिन बाद एक 'अधिक मास' जुड़ता है।"
                : "A solar year is ~365.25 days while a lunar year is ~354 days. To maintain perfect seasonal synchronization, Vedic astronomy inserts an intercalary month (Adhika Masa) approximately every 32.5 months."}
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Home Altar Vastu & Print Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vastu Mandir Placement */}
        <div className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-800">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
                {isTe
                  ? "పూజా మందిరంలో క్యాలెండర్ ఉంచే వాస్తు నియమాలు"
                  : isHi
                  ? "पूजा घर व दीवार पर कैलेंडर लगाने के वास्तु नियम"
                  : "Home Mandir Placement & Vastu Guidelines"}
              </h3>
              <p className="text-xs text-stone-500">
                {isTe ? "ఈశాన్య దిశ & పవిత్ర సంకల్పం" : isHi ? "ईशान कोण एवं शुभ दिशा निर्देश" : "Sacred Directions & Altar Guidelines"}
              </p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-[#d9531e] font-bold mt-0.5">•</span>
              <span>
                <strong>{isTe ? "ఈశాన్య దిశ (North-East):" : isHi ? "ईशान कोण (उत्तर-पूर्व):" : "North-East (Ishanya):"}</strong>{" "}
                {isTe
                  ? "క్యాలెండర్‌ను పూజా గదిలో తూర్పు లేదా ఉత్తర గోడపై ఉంచడం అత్యంత శుభప్రదం."
                  : isHi
                  ? "पंचांग कैलेंडर को सदैव पूजा कक्ष की पूर्व या उत्तर दिशा की दीवार पर लगाना चाहिए। इससे सकारात्मक ऊर्जा का संचार होता है।"
                  : "Hang the wall calendar on the East or North wall of your home mandir or study room to invite positive, sattvic cosmic vibrations."}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d9531e] font-bold mt-0.5">•</span>
              <span>
                <strong>{isTe ? "నిత్య దర్శనం & సంకల్పం:" : isHi ? "प्रातः नित्य दर्शन:" : "Daily Morning Darshan:"}</strong>{" "}
                {isTe
                  ? "ప్రతిరోజు ఉదయం పూజ తర్వాత ఆనాటి తిథి మరియు నక్షత్రాన్ని చదవడం వల్ల శుభ ఫలితాలు లభిస్తాయి."
                  : isHi
                  ? "प्रतिदिन स्नान-ध्यान के पश्चात आज की तिथि, वार व नक्षत्र का स्मरण करने से मानसिक शांति व एकाग्रता प्राप्त होती है।"
                  : "Reciting the day's Tithi and Nakshatra during morning prayer fulfills traditional sankalpa and aligns the mind with celestial harmony."}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d9531e] font-bold mt-0.5">•</span>
              <span>
                <strong>{isTe ? "నివారించాల్సిన స్థలాలు:" : isHi ? "यहाँ न लगाएं:" : "Areas to Avoid:"}</strong>{" "}
                {isTe
                  ? "దక్షిణ దిశ లేదా అపరిశుభ్ర ప్రదేశాలలో పవిత్ర క్యాలెండర్‌ను ఉంచరాదు."
                  : isHi
                  ? "दक्षिण दिशा, मुख्य द्वार के ठीक ऊपर अथवा सीढ़ियों के नीचे पवित्र कैलेंडर लगाने से बचें।"
                  : "Avoid hanging the sacred calendar on South-facing walls, under staircases, or directly above the entrance doorway."}
              </span>
            </li>
          </ul>
        </div>

        {/* Print & Paper Best Practices */}
        <div className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-[#d9531e]">
              <Printer className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
                {isTe
                  ? "ఉత్తమ A4 ప్రింట్ & పేపర్ సలహాలు"
                  : isHi
                  ? "A4 प्रिंट एवं सर्वश्रेष्ठ कागज़ हेतु निर्देश"
                  : "A4 Printing & Paper Best Practices"}
              </h3>
              <p className="text-xs text-stone-500">
                {isTe ? "రంగులు, మార్జిన్లు & లామినేషన్" : isHi ? "रंग, मार्जिन एवं लैमिनेशन सुझाव" : "Optimal Color, Paper Weight & Longevity"}
              </p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-[#d9531e] font-bold mt-0.5">•</span>
              <span>
                <strong>{isTe ? "పేపర్ నాణ్యత:" : isHi ? "कागज़ की मोटाई (GSM):" : "Paper Weight (GSM):"}</strong>{" "}
                {isTe
                  ? "పూజా మందిరంలో ఏడాది పొడవునా ఉండేందుకు 120–180 GSM మ్యాట్ లేదా బాండ్ పేపర్ వాడండి."
                  : isHi
                  ? "दीवार पर टिकाऊपन के लिए 120 से 180 GSM का मैट फोटो पेपर या आइवरी कार्डशीट चुनें, जो धूप और अगरबत्ती के धुएं से सुरक्षित रहे।"
                  : "For home altars, use 120–180 GSM matte photo paper or ivory bond cardstock to resist curling and ambient incense smoke."}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d9531e] font-bold mt-0.5">•</span>
              <span>
                <strong>{isTe ? "ప్రింటర్ సెట్టింగ్స్:" : isHi ? "प्रिंटर सेटिंग:" : "Print Settings:"}</strong>{" "}
                {isTe
                  ? "ఓరియంటేషన్ 'Landscape' గా మరియు మార్జిన్లు 'Default' లేదా 'Minimum' గా సెట్ చేయండి. 'Background graphics' ను టిక్ చేయండి."
                  : isHi
                  ? "प्रिंट संवाद में Orientation: Landscape, Margins: Default और 'Background graphics' विकल्प को चालू (On) रखें।"
                  : "Set Orientation to Landscape, Margins to Default, and ensure 'Background graphics' is checked in your browser print dialog."}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d9531e] font-bold mt-0.5">•</span>
              <span>
                <strong>{isTe ? "లామినేషన్ లేదా ఫ్రేమింగ్:" : isHi ? "लैमिनेशन व फ्रेमिंग:" : "Lamination & Framing:"}</strong>{" "}
                {isTe
                  ? "ప్రింట్ తీసిన తర్వాత సులభంగా లామినేట్ చేయవచ్చు లేదా సాధారణ క్లిప్ బోర్డులో అమర్చుకోవచ్చు."
                  : isHi
                  ? "प्रिंट निकालने के बाद साधारण लैमिनेशन करवा लें या फोटो फ्रेम में लगा लें, जिससे पूरे वर्ष तिथि स्पष्ट व स्वच्छ रहे।"
                  : "Laminating the sheet or placing it inside a transparent plastic sleeve protects the calendar all year from oil diya droplets."}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
