# Group 1: Kundli components and spiritual-tools page
import re

# 1. KundliDashaTable.tsx
with open("src/components/spiritual-tools/KundliDashaTable.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
text = text.replace(
    '{isHi ? "विंशोत्तरी महादशा चक्र" : "Vimshottari Mahadasha Timeline"}',
    '{isTe ? "వింశోత్తరీ మహాదశా కాలచక్రం" : isHi ? "विंशोत्तरी महादशा चक्र" : "Vimshottari Mahadasha Timeline"}'
)
text = text.replace(
    '{isHi\n              ? `जन्म समय दशा शेष: ${vimshottari.birthBalancePlanetHi} (${vimshottari.birthBalanceYears} वर्ष)`\n              : `Birth Balance Dasha: ${vimshottari.birthBalancePlanet} (${vimshottari.birthBalanceYears} yrs)`}',
    '{isTe\n              ? `జన్మ సమయ దశా శేషం: ${vimshottari.birthBalancePlanetHi || vimshottari.birthBalancePlanet} (${vimshottari.birthBalanceYears} సం.)`\n              : isHi\n              ? `जन्म समय दशा शेष: ${vimshottari.birthBalancePlanetHi} (${vimshottari.birthBalanceYears} वर्ष)`\n              : `Birth Balance Dasha: ${vimshottari.birthBalancePlanet} (${vimshottari.birthBalanceYears} yrs)`}'
)
text = text.replace(
    '<span>120 {isHi ? "वर्षीय चक्र" : "Year Cycle"}</span>',
    '<span>120 {isTe ? "సంవత్సరాల చక్రం" : isHi ? "वर्षीय चक्र" : "Year Cycle"}</span>'
)
text = text.replace(
    '{isHi ? `${period.planetNameHi} महादशा` : `${period.planetName} Mahadasha`}',
    '{isTe ? `${period.planetNameHi || period.planetName} మహాదశ` : isHi ? `${period.planetNameHi} महादशा` : `${period.planetName} Mahadasha`}'
)
text = text.replace(
    '{period.startYear} – {period.endYear} ({period.durationYears} {isHi ? "वर्ष" : "yrs"})',
    '{period.startYear} – {period.endYear} ({period.durationYears} {isTe ? "సం." : isHi ? "वर्ष" : "yrs"})'
)
text = text.replace(
    '{isHi ? "वर्तमान" : "Active"}',
    '{isTe ? "ప్రస్తుతం" : isHi ? "वर्तमान" : "Active"}'
)
with open("src/components/spiritual-tools/KundliDashaTable.tsx", "w", encoding="utf-8") as f:
    f.write(text)
print("SUCCESS: Updated KundliDashaTable.tsx")

# 2. ManglikCard.tsx
with open("src/components/spiritual-tools/ManglikCard.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
text = text.replace(
    '{isHi ? "मांगलिक दोष विश्लेषण (Kuja Dosha)" : "Manglik Dosha Analysis"}',
    '{isTe ? "మాంగళిక దోష విశ్లేషణ (కుజ దోషం)" : isHi ? "मांगलिक दोष विश्लेषण (Kuja Dosha)" : "Manglik Dosha Analysis"}'
)
text = text.replace(
    '{isHi\n                ? `स्थिति: ${manglik.levelHi}`\n                : `Status: ${manglik.level === "None" ? "No Dosha" : manglik.level + " Manglik"}`}',
    '{isTe\n                ? `స్థితి: ${manglik.level === "None" ? "దోష రహితం" : manglik.level + " మాంగళిక దోషం"}`\n                : isHi\n                ? `स्थिति: ${manglik.levelHi}`\n                : `Status: ${manglik.level === "None" ? "No Dosha" : manglik.level + " Manglik"}`}'
)
text = text.replace(
    '{isHi ? manglik.levelHi : manglik.level}',
    '{isTe ? (manglik.level === "None" ? "దోష రహితం" : manglik.level === "Mild" ? "సాధారణ మాంగళికం" : "పూర్ణ మాంగళికం") : isHi ? manglik.levelHi : manglik.level}'
)
text = text.replace(
    '{isHi ? manglik.descriptionHi : manglik.description}',
    '{isTe ? (manglik.isManglik ? "కుండలిలో కుజుడు లగ్నం, 4, 7, 8 లేదా 12వ స్థానంలో ఉన్నందున కుజ దోష ప్రభావం కలదు." : "మీ జన్మ కుండలిలో ఎటువంటి మాంగళిక లేదా కుజ దోషం లేదు. వైవాహిక జీవితం శుభప్రదం.") : isHi ? manglik.descriptionHi : manglik.description}'
)
text = text.replace(
    '{isHi ? manglik.cancellationReasonHi : manglik.cancellationReason}',
    '{isTe ? (manglik.cancellationReasonHi || manglik.cancellationReason) : isHi ? manglik.cancellationReasonHi : manglik.cancellationReason}'
)
text = text.replace(
    '{isHi\n              ? "उपाय: भगवान शिव एवं हनुमान जी की आराधना करें। विवाह से पूर्व वर-वधू दोनों की कुंडलियों का सामंजस्य आवश्यक है।"\n              : "Remedial Guidance: Worship of Lord Shiva & Lord Hanuman is auspicious. Mutual horoscope matching is recommended before marriage."}',
    '{isTe\n              ? "శాంతి పరిహారం: ప్రతిరోజూ హనుమాన్ చాలీసా పఠించండి లేదా పరమశివునికి రుద్రాభిషేకం జరిపించండి. వివాహానికి ముందు ఇరువైపుల కుండలి పొంతన పరిశీలించడం శ్రేయస్కరం."\n              : isHi\n              ? "उपाय: भगवान शिव एवं हनुमान जी की आराधना करें। विवाह से पूर्व वर-वधू दोनों की कुंडलियों का सामंजस्य आवश्यक है।"\n              : "Remedial Guidance: Worship of Lord Shiva & Lord Hanuman is auspicious. Mutual horoscope matching is recommended before marriage."}'
)
with open("src/components/spiritual-tools/ManglikCard.tsx", "w", encoding="utf-8") as f:
    f.write(text)
print("SUCCESS: Updated ManglikCard.tsx")

# 3. PrintableKundliReport.tsx
with open("src/components/spiritual-tools/PrintableKundliReport.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Add useLocale from client
text = text.replace('import { useLocale } from "@/lib/i18n/client";\n', '')
text = text.replace('import { KundliChartSvg } from "./KundliChartSvg";', 'import { KundliChartSvg } from "./KundliChartSvg";\nimport { useLocale } from "@/lib/i18n/client";')

text = text.replace(
'''export function PrintableKundliReport({
  chart,
  isHi = false,
  onClose,
}: PrintableKundliReportProps) {''',
'''export function PrintableKundliReport({
  chart,
  isHi: initialIsHi = false,
  onClose,
}: PrintableKundliReportProps) {
  const locale = useLocale();
  const isTe = locale === "te";
  const isHi = initialIsHi || locale === "hi";'''
)

text = text.replace(
    '{isHi ? "प्रिंट / PDF सेव करें" : "Print / Save as PDF"}',
    '{isTe ? "ప్రింట్ / PDF సేవ్ చేయండి" : isHi ? "प्रिंट / PDF सेव करें" : "Print / Save as PDF"}'
)
text = text.replace(
    '{isHi ? "वैदिक जन्म पत्रिका (जन्म कुंडली)" : "Vedic Horoscope (Janam Patrika)"}',
    '{isTe ? "వైదిక జన్మ పత్రిక (జన్మ కుండలి)" : isHi ? "वैदिक जन्म पत्रिका (जन्म कुंडली)" : "Vedic Horoscope (Janam Patrika)"}'
)
text = text.replace(
    '{isHi\n              ? "चित्रापक्ष (लाहिरी) अयनांश आधारित प्रामाणिक जन्म विवरण"\n              : "Calculated using high-precision Chitrapaksha (Lahiri) Sidereal Ayanamsha"}',
    '{isTe\n              ? "చిత్రపక్ష (లాహిరి) అయనాంశ ఆధారిత ప్రామాణిక జన్మ వివరాలు"\n              : isHi\n              ? "चित्रापक्ष (लाहिरी) अयनांश आधारित प्रामाणिक जन्म विवरण"\n              : "Calculated using high-precision Chitrapaksha (Lahiri) Sidereal Ayanamsha"}'
)
text = text.replace(
    '{isHi ? "१. जातक जन्म विवरण" : "1. Birth Credentials"}',
    '{isTe ? "౧. జాతక జన్మ వివరాలు" : isHi ? "१. जातक जन्म विवरण" : "1. Birth Credentials"}'
)
text = text.replace('{isHi ? "जातक नाम: " : "Name: "}', '{isTe ? "పేరు: " : isHi ? "जातक नाम: " : "Name: "}')
text = text.replace('{isHi ? "जन्म दिनांक: " : "Date of Birth: "}', '{isTe ? "జన్మ తేదీ: " : isHi ? "जन्म दिनांक: " : "Date of Birth: "}')
text = text.replace('{isHi ? "जन्म समय: " : "Time of Birth: "}', '{isTe ? "జన్మ సమయం: " : isHi ? "जन्म समय: " : "Time of Birth: "}')
text = text.replace('{isHi ? "जन्म स्थान: " : "Birth Place: "}', '{isTe ? "జన్మ స్థలం: " : isHi ? "जन्म स्थान: " : "Birth Place: "}')
text = text.replace('{isHi ? "लग्न (Ascendant): " : "Ascendant (Lagna): "}', '{isTe ? "లగ్నం: " : isHi ? "लग्न (Ascendant): " : "Ascendant (Lagna): "}')
text = text.replace('{isHi ? "चंद्र राशि (Moon Sign): " : "Moon Sign (Rashi): "}', '{isTe ? "చంద్ర రాశి: " : isHi ? "चंद्र राशि (Moon Sign): " : "Moon Sign (Rashi): "}')
text = text.replace('{isHi ? "जन्म नक्षत्र: " : "Nakshatra: "}', '{isTe ? "జన్మ నక్షత్రం: " : isHi ? "जन्म नक्षत्र: " : "Nakshatra: "}')
text = text.replace('{isHi ? "पाद" : "Pada"}', '{isTe ? "పాదం" : isHi ? "पाद" : "Pada"}')
text = text.replace('{isHi ? "मांगलिक स्थिति: " : "Manglik Status: "}', '{isTe ? "మాంగళిక స్థితి: " : isHi ? "मांगलिक स्थिति: " : "Manglik Status: "}')
text = text.replace('{isHi ? chart.manglik.levelHi : chart.manglik.level}', '{isTe ? (chart.manglik.isManglik ? "కుజ దోషం కలదు" : "దోష రహితం") : isHi ? chart.manglik.levelHi : chart.manglik.level}')
text = text.replace('{isHi ? "लग्न कुण्डली (D-1 Lagna Chart)" : "Lagna Birth Chart (D-1)"}', '{isTe ? "లగ్న కుండలి (D-1 జన్మ చక్రం)" : isHi ? "लग्न कुण्डली (D-1 Lagna Chart)" : "Lagna Birth Chart (D-1)"}')
text = text.replace('{isHi ? "ग्रह स्पष्ट स्थिति (Graha Sthiti)" : "Planetary Ephemeris"}', '{isTe ? "గ్రహ స్పష్ట స్థితి (గ్రహాల స్థానాలు)" : isHi ? "ग्रह स्पष्ट स्थिति (Graha Sthiti)" : "Planetary Ephemeris"}')

text = text.replace('{isHi ? "ग्रह" : "Planet"}', '{isTe ? "గ్రహం" : isHi ? "ग्रह" : "Planet"}')
text = text.replace('{isHi ? "राशि" : "Rashi"}', '{isTe ? "రాశి" : isHi ? "राशि" : "Rashi"}')
text = text.replace('{isHi ? "अंश" : "Deg"}', '{isTe ? "డిగ్రీ" : isHi ? "अंश" : "Deg"}')
text = text.replace('{isHi ? "नक्षत्र" : "Nakshatra"}', '{isTe ? "నక్షత్రం" : isHi ? "नक्षत्र" : "Nakshatra"}')
text = text.replace('{isHi ? "अवस्था" : "Dignity"}', '{isTe ? "అవస్థ" : isHi ? "अवस्था" : "Dignity"}')
text = text.replace('{isHi ? "२. विंशोत्तरी महादशा चक्र" : "2. Vimshottari Mahadasha Timeline"}', '{isTe ? "౨. వింశోత్తరీ మహాదశా కాలచక్రం" : isHi ? "२. विंशोत्तरी महादशा चक्र" : "2. Vimshottari Mahadasha Timeline"}')
text = text.replace('{isHi ? "वर्तमान" : "Current"}', '{isTe ? "ప్రస్తుతం" : isHi ? "वर्तमान" : "Current"}')
text = text.replace(
    '{isHi\n              ? "भक्ति वॉयस — BhaktiVoice.com द्वारा निर्मित प्रामाणिक वैदिक जन्म पत्रिका"\n              : "Generated by BhaktiVoice.com — Authentic Vedic Astrology & Panchang"}',
    '{isTe\n              ? "భక్తి వాయిస్ — BhaktiVoice.com ద్వారా రూపొందించబడిన ప్రామాణిక వైదిక జన్మ పత్రిక"\n              : isHi\n              ? "भक्ति वॉयस — BhaktiVoice.com द्वारा निर्मित प्रामाणिक वैदिक जन्म पत्रिका"\n              : "Generated by BhaktiVoice.com — Authentic Vedic Astrology & Panchang"}'
)

with open("src/components/spiritual-tools/PrintableKundliReport.tsx", "w", encoding="utf-8") as f:
    f.write(text)
print("SUCCESS: Updated PrintableKundliReport.tsx")

# 4. src/app/spiritual-tools/page.tsx
with open("src/app/spiritual-tools/page.tsx", "r", encoding="utf-8") as f:
    st = f.read()

st = st.replace(
'''import {
  SPIRITUAL_TOOL_FAQS,
  SPIRITUAL_TOOL_FAQS_HI,
  SPIRITUAL_TOOL_KEYWORDS,
} from "@/lib/spiritual-tools/seo-content";''',
'''import {
  SPIRITUAL_TOOL_FAQS,
  SPIRITUAL_TOOL_FAQS_HI,
  SPIRITUAL_TOOL_FAQS_TE,
  SPIRITUAL_TOOL_KEYWORDS,
} from "@/lib/spiritual-tools/seo-content";'''
)

st = st.replace(
'''export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isHi
      ? "वैदिक एवं आध्यात्मिक उपकरण — आज का पंचांग, हिन्दू कैलेंडर, कुंडली एवं मिलान"
      : t.hubs.spiritualTools.title,
    description: isHi
      ? "भक्ति वॉइस के 100% निःशुल्क एवं सुरक्षित वैदिक उपकरण। आज का पंचांग, हिन्दू कैलेंडर 2026, मुफ्त जन्म कुंडली एवं 36 गुण कुंडली मिलान सीधे अपने ब्राउज़र में देखें।"
      : t.hubs.spiritualTools.description,
    path: PATHS.spiritualTools,
    keywords: [...SPIRITUAL_TOOL_KEYWORDS.landing],
  });
}''',
'''export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isTe
      ? "వైదిక & ఆధ్యాత్మిక సాధనాలు — నేటి పంచాంగం, హిందూ క్యాలెండర్, జన్మ కుండలి & పొంతన"
      : isHi
      ? "वैदिक एवं आध्यात्मिक उपकरण — आज का पंचांग, हिन्दू कैलेंडर, कुंडली एवं मिलान"
      : t.hubs.spiritualTools.title,
    description: isTe
      ? "భక్తి వాయిస్ 100% ఉచిత మరియు సురక్షిత వైదిక సాధనాలు. నేటి పంచాంగం, హిందూ క్యాలెండర్ 2026, ఉచిత జన్మ కుండలి మరియు 36 గుణ కుండలి మిలనం నేరుగా మీ బ్రౌజర్ లో చూడండి."
      : isHi
      ? "भक्ति वॉइस के 100% निःशुल्क एवं सुरक्षित वैदिक उपकरण। आज का पंचांग, हिन्दू कैलेंडर 2026, मुफ्त जन्म कुंडली एवं 36 गुण कुंडली मिलान सीधे अपने ब्राउज़र में देखें।"
      : t.hubs.spiritualTools.description,
    path: PATHS.spiritualTools,
    keywords: [...SPIRITUAL_TOOL_KEYWORDS.landing],
  });
}'''
)

st = st.replace(
'''export default async function SpiritualToolsPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? [...SPIRITUAL_TOOL_FAQS_HI.landing] : [...SPIRITUAL_TOOL_FAQS.landing];''',
'''export default async function SpiritualToolsPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";
  const faqs = isTe
    ? [...SPIRITUAL_TOOL_FAQS_TE.landing]
    : isHi
    ? [...SPIRITUAL_TOOL_FAQS_HI.landing]
    : [...SPIRITUAL_TOOL_FAQS.landing];'''
)

# Update the tools array titles and descriptions with isTe
st_tools_old = '''    {
      href: PATHS.suvicharMaker,
      title: isHi ? "सुविचार एवं व्हाट्सएप स्टेटस मेकर" : "Daily Suvichar & Status Studio",
      description: isHi
        ? "जैन वाणी, गीता श्लोक, शिव, हनुमान, राम एवं पर्व सुविचार के साथ अपना नाम व फोटो जोड़कर HD स्टेटस कार्ड बनाएं।"
        : "Create personalized HD WhatsApp Status & Story cards with Jain wisdom, Gita shlokas, and daily Vedic Panchang.",
      icon: "suvichar" as const,
    },
    {
      href: PATHS.panchangToday,
      title: isHi ? "आज का पंचांग" : "Today's Panchang",
      description: isHi
        ? "आज की तिथि, नक्षत्र, सूर्योदय, सूर्यास्त, राहु काल, अभिजित मुहूर्त और चौघड़िया का सम्पूर्ण दैनिक विवरण।"
        : "Live Vedic Panchang for today: accurate Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, and Choghadiya timings.",
      icon: "panchang" as const,
    },
    {
      href: PATHS.calendar,
      title: isHi ? "हिन्दू कैलेंडर 2026" : "Hindu Calendar 2026",
      description: isHi
        ? "मासिक पंचांग ग्रिड, एकादशी, पूर्णिमा, अमावस्या, प्रदोष, संक्रांति और सभी प्रमुख हिन्दू त्यौहारों की तिथियाँ।"
        : "Interactive 7-column Hindu lunisolar calendar with monthly Tithis, Ekadashis, Vrats, and major festival dates.",
      icon: "calendar" as const,
    },
    {
      href: PATHS.kundli,
      title: isHi ? "मुफ्त जन्म कुंडली" : t.spiritualTools.tools.kundli.title,
      description: isHi
        ? "सटीक जन्म पत्रिका, लग्न, ग्रह स्थिति और भाव विश्लेषण। 100% सुरक्षित और निजी।"
        : t.spiritualTools.tools.kundli.description,
      icon: "kundli" as const,
    },
    {
      href: PATHS.kundliMilan,
      title: isHi ? "कुंडली मिलान" : t.spiritualTools.tools.milan.title,
      description: isHi
        ? "विवाह अनुकूलता हेतु पारंपरिक 36 गुण अष्टकूट मिलान विश्लेषण।"
        : t.spiritualTools.tools.milan.description,
      icon: "milan" as const,
    },'''

st_tools_new = '''    {
      href: PATHS.suvicharMaker,
      title: isTe ? "సువిచార కార్డ్ & స్టేటస్ మేకర్" : isHi ? "सुविचार एवं व्हाट्सएप स्टेटस मेकर" : "Daily Suvichar & Status Studio",
      description: isTe
        ? "జైన వాణి, భగవద్గీత శ్లోకాలు, శివ, హనుమాన్, శ్రీరామ సూక్తులతో మీ పేరు, ఫోటో జతచేసి HD స్టేటస్ కార్డ్ తయారుచేసుకోండి."
        : isHi
        ? "जैन वाणी, गीता श्लोक, शिव, हनुमान, राम एवं पर्व सुविचार के साथ अपना नाम व फोटो जोड़कर HD स्टेटस कार्ड बनाएं।"
        : "Create personalized HD WhatsApp Status & Story cards with Jain wisdom, Gita shlokas, and daily Vedic Panchang.",
      icon: "suvichar" as const,
    },
    {
      href: PATHS.panchangToday,
      title: isTe ? "నేటి పంచాంగం" : isHi ? "आज का पंचांग" : "Today's Panchang",
      description: isTe
        ? "నేటి తిథి, నక్షత్రం, సూర్యోదయం, రాహుకాలం, అభిజిత్ ముహూర్తం మరియు చోఘడియా పూర్తి వివరాలు."
        : isHi
        ? "आज की तिथि, नक्षत्र, सूर्योदय, सूर्यास्त, राहु काल, अभिजित मुहूर्त और चौघड़िया का सम्पूर्ण दैनिक विवरण।"
        : "Live Vedic Panchang for today: accurate Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, and Choghadiya timings.",
      icon: "panchang" as const,
    },
    {
      href: PATHS.calendar,
      title: isTe ? "హిందూ క్యాలెండర్ 2026" : isHi ? "हिन्दू कैलेंडर 2026" : "Hindu Calendar 2026",
      description: isTe
        ? "మాస పట్టిక, ఏకాదశి, పౌర్ణమి, అమావాస్య, ప్రదోషం మరియు ప్రముఖ హిందూ పండుగల సమగ్ర క్యాలెండర్."
        : isHi
        ? "मासिक पंचांग ग्रिड, एकादशी, पूर्णिमा, अमावस्या, प्रदोष, संक्रांति और सभी प्रमुख हिन्दू त्यौहारों की तिथियाँ।"
        : "Interactive 7-column Hindu lunisolar calendar with monthly Tithis, Ekadashis, Vrats, and major festival dates.",
      icon: "calendar" as const,
    },
    {
      href: PATHS.kundli,
      title: isTe ? "ఉచిత జన్మ కుండలి" : isHi ? "मुफ्त जन्म कुंडली" : t.spiritualTools.tools.kundli.title,
      description: isTe
        ? "ఖచ్చితమైన జన్మ పత్రిక, లగ్నం, గ్రహ స్థానాలు మరియు భావ విశ్లేషణ. 100% ఉచితం & గోప్యమైనది."
        : isHi
        ? "सटीक जन्म पत्रिका, लग्न, ग्रह स्थिति और भाव विश्लेषण। 100% सुरक्षित और निजी।"
        : t.spiritualTools.tools.kundli.description,
      icon: "kundli" as const,
    },
    {
      href: PATHS.kundliMilan,
      title: isTe ? "కుండలి పొంతన (36 గుణాలు)" : isHi ? "कुंडली मिलान" : t.spiritualTools.tools.milan.title,
      description: isTe
        ? "వివాహ అనుకూలత కొరకు సాంప్రదాయ 36 గుణాల అష్టకూట మిలన విశ్లేషణ."
        : isHi
        ? "विवाह अनुकूलता हेतु पारंपरिक 36 गुण अष्टकूट मिलान विश्लेषण।"
        : t.spiritualTools.tools.milan.description,
      icon: "milan" as const,
    },'''

st = st.replace(st_tools_old, st_tools_new)

st = st.replace(
    'title={isHi ? "आध्यात्मिक एवं वैदिक उपकरण" : t.hubs.spiritualTools.h1}',
    'title={isTe ? "ఆధ్యాత్మిక & వైదిక సాధనాలు" : isHi ? "आध्यात्मिक एवं वैदिक उपकरण" : t.hubs.spiritualTools.h1}'
)
st = st.replace(
    'isHi\n            ? "100% सुरक्षित और निजी वैदिक टूल्स — दैनिक पंचांग, हिन्दू कैलेंडर, जन्म कुंडली और कुंडली मिलान। आपकी कोई भी जानकारी कभी सर्वर पर नहीं भेजी जाती।"\n            : t.spiritualTools.landingLead',
    'isTe\n            ? "100% ఉచిత & సురక్షిత వైదిక పరికరాలు — దిన పంచాంగం, హిందూ క్యాలెండర్, జన్మ కుండలి మరియు కుండలి మిలనం. మీ సమాచారం ఎప్పుడూ సర్వర్‌కు పంపబడదు."\n            : isHi\n            ? "100% सुरक्षित और निजी वैदिक टूल्स — दैनिक पंचांग, हिन्दू कैलेंडर, जन्म कुंडली और कुंडली मिलान। आपकी कोई भी जानकारी कभी सर्वर पर नहीं भेजी जाती।"\n            : t.spiritualTools.landingLead'
)
st = st.replace(
    'isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools',
    'isTe ? "ఆధ్యాత్మిక పరికరాలు" : isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools'
)
st = st.replace(
    'openLabel={isHi ? "उपकरण खोलें" : t.spiritualTools.openTool}',
    'openLabel={isTe ? "సాధనాన్ని తెరవండి" : isHi ? "उपकरण खोलें" : t.spiritualTools.openTool}'
)
st = st.replace(
    'title={isHi ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)" : t.common.faqTitle}',
    'title={isTe ? "తరచుగా అడిగే ప్రశ్నలు (FAQs)" : isHi ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)" : t.common.faqTitle}'
)

with open("src/app/spiritual-tools/page.tsx", "w", encoding="utf-8") as f:
    f.write(st)
print("SUCCESS: Updated spiritual-tools/page.tsx")
