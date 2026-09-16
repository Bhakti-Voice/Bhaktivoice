import re

# 1. Update Header.tsx
with open("src/components/layout/Header.tsx", "r", encoding="utf-8") as f:
    header = f.read()

header_old_more = '''  const moreLinks = [
    { href: PATHS.choghadiya, label: locale === "hi" ? "आज का चौघड़िया" : "Today's Choghadiya" },
    { href: PATHS.panchak, label: locale === "hi" ? "पंचक विचार 2026" : "Panchak Calendar" },
    { href: PATHS.bhadra, label: locale === "hi" ? "भद्रा काल विचार" : "Bhadra Timings" },
    { href: PATHS.hora, label: locale === "hi" ? "दैनिक ग्रह होरा" : "Planetary Hora" },
    { href: PATHS.sadhana, label: t.nav.sadhana },
    { href: PATHS.calendar, label: locale === "hi" ? "हिन्दू कैलेंडर" : "Hindu Calendar" },
    { href: PATHS.panchangToday, label: locale === "hi" ? "आज का पंचांग" : "Today's Panchang" },
    { href: PATHS.community, label: t.nav.community },
    { href: PATHS.store, label: t.nav.store },
    { href: PATHS.blog, label: t.nav.blog },
    { href: PATHS.temples, label: t.nav.temples },
    { href: PATHS.festivals, label: t.nav.festivals },
    { href: PATHS.tithi, label: t.nav.tithi },
    { href: PATHS.suvicharMaker, label: locale === "hi" ? "सुविचार स्टेटस मेकर" : "Suvichar Status Maker" },
    { href: PATHS.quotes, label: t.nav.quotes },
    { href: PATHS.mantras, label: t.nav.mantras },
    { href: PATHS.bhajan, label: t.nav.bhajan },
    { href: PATHS.aarti, label: t.nav.aarti },
    { href: PATHS.chalisa, label: t.nav.chalisa },
    { href: PATHS.spirituality, label: t.nav.spirituality },
    { href: PATHS.yatraPlanner, label: t.nav.yatraPlanner },
    { href: PATHS.sankalp, label: t.nav.sankalp },
  ];'''

header_new_more = '''  const moreLinks = [
    { href: PATHS.choghadiya, label: locale === "te" ? "నేటి చోఘడియా (పగలు & రాత్రి)" : locale === "hi" ? "आज का चौघड़िया" : "Today's Choghadiya" },
    { href: PATHS.panchak, label: locale === "te" ? "పంచక విచారం 2026" : locale === "hi" ? "पंचक विचार 2026" : "Panchak Calendar" },
    { href: PATHS.bhadra, label: locale === "te" ? "భద్రా కాల విచారం" : locale === "hi" ? "भद्रा काल विचार" : "Bhadra Timings" },
    { href: PATHS.hora, label: locale === "te" ? "దైనందిన గ్రహ హోరా" : locale === "hi" ? "दैनिक ग्रह होरा" : "Planetary Hora" },
    { href: PATHS.sadhana, label: t.nav.sadhana },
    { href: PATHS.calendar, label: locale === "te" ? "హిందూ క్యాలెండర్ 2026" : locale === "hi" ? "हिन्दू कैलेंडर" : "Hindu Calendar" },
    { href: PATHS.panchangToday, label: locale === "te" ? "నేటి పంచాంగం (లైవ్)" : locale === "hi" ? "आज का पंचांग" : "Today's Panchang" },
    { href: PATHS.community, label: t.nav.community },
    { href: PATHS.store, label: t.nav.store },
    { href: PATHS.blog, label: t.nav.blog },
    { href: PATHS.temples, label: t.nav.temples },
    { href: PATHS.festivals, label: t.nav.festivals },
    { href: PATHS.tithi, label: t.nav.tithi },
    { href: PATHS.suvicharMaker, label: locale === "te" ? "సువిచార కార్డ్ & స్టేటస్ మేకర్" : locale === "hi" ? "सुविचार स्टेटस मेकर" : "Suvichar Status Maker" },
    { href: PATHS.quotes, label: t.nav.quotes },
    { href: PATHS.mantras, label: t.nav.mantras },
    { href: PATHS.bhajan, label: t.nav.bhajan },
    { href: PATHS.aarti, label: t.nav.aarti },
    { href: PATHS.chalisa, label: t.nav.chalisa },
    { href: PATHS.spirituality, label: t.nav.spirituality },
    { href: PATHS.yatraPlanner, label: t.nav.yatraPlanner },
    { href: PATHS.sankalp, label: t.nav.sankalp },
  ];'''

if header_old_more in header:
    header = header.replace(header_old_more, header_new_more)
    with open("src/components/layout/Header.tsx", "w", encoding="utf-8") as f:
        f.write(header)
    print("SUCCESS: Updated Header.tsx")

# 2. Update Footer.tsx
with open("src/components/layout/Footer.tsx", "r", encoding="utf-8") as f:
    footer = f.read()

footer_old = '''export async function Footer() {
  const t = await getMessages();
  const columns = [
    {
      title: t.footerCols.quickLinks,
      links: [
        { href: "/", label: t.nav.home },
        { href: PATHS.naamJaap, label: t.nav.naamJaap },
        { href: PATHS.katha, label: t.nav.katha },
        { href: PATHS.yatra, label: t.nav.yatra },
        { href: PATHS.babyNames, label: "Vedic Baby Names (नामकरण)" },
        { href: PATHS.printableCalendar, label: "Printable Wall Calendar (PDF)" },
      ],
    },'''

footer_new = '''import { getLocale } from "@/lib/i18n/server";

export async function Footer() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";

  const columns = [
    {
      title: t.footerCols.quickLinks,
      links: [
        { href: "/", label: t.nav.home },
        { href: PATHS.naamJaap, label: t.nav.naamJaap },
        { href: PATHS.katha, label: t.nav.katha },
        { href: PATHS.yatra, label: t.nav.yatra },
        { href: PATHS.babyNames, label: isTe ? "నక్షత్ర నామకరణం" : isHi ? "वैदिक नामकरण" : "Vedic Baby Names (नामकरण)" },
        { href: PATHS.printableCalendar, label: isTe ? "ప్రింట్ క్యాలెండర్ (PDF)" : isHi ? "प्रिंट योग्य कैलेंडर (PDF)" : "Printable Wall Calendar (PDF)" },
      ],
    },'''

if footer_old in footer:
    footer = footer.replace(footer_old, footer_new)
    with open("src/components/layout/Footer.tsx", "w", encoding="utf-8") as f:
        f.write(footer)
    print("SUCCESS: Updated Footer.tsx")

# 3. Update PanchangMenu.tsx
with open("src/components/layout/PanchangMenu.tsx", "r", encoding="utf-8") as f:
    panchang = f.read()

# Replace PanchangMenuItem interface
panchang = panchang.replace(
'''interface PanchangMenuItem {
  slug: string;
  href: string;
  labelEn: string;
  labelHi: string;
}''',
'''interface PanchangMenuItem {
  slug: string;
  href: string;
  labelEn: string;
  labelHi: string;
  labelTe: string;
}'''
)

# Replace PANCHANG_COLUMNS with labelTe
old_cols = '''const PANCHANG_COLUMNS: { titleEn?: string; titleHi?: string; items: PanchangMenuItem[] }[] = [
  // Column 1
  {
    items: [
      { slug: "month-panchang", href: "/panchang/month-panchang", labelEn: "Month Panchang", labelHi: "मासिक पंचांग" },
      { slug: "dainik-panchang", href: "/panchang/dainik-panchang", labelEn: "Dainik Panchang", labelHi: "दैनिक पंचांग" },
      { slug: "assamese-panjika", href: "/panchang/assamese-panjika", labelEn: "Assamese Panjika", labelHi: "असमिया पंजिका" },
      { slug: "bengali-panjika", href: "/panchang/bengali-panjika", labelEn: "Bengali Panjika", labelHi: "बंगाली पंजिका" },
      { slug: "tamil-panchangam", href: "/panchang/tamil-panchangam", labelEn: "Tamil Panchangam", labelHi: "तमिल पंचांगम" },
    ],
  },
  // Column 2
  {
    items: [
      { slug: "odia-panji", href: "/panchang/odia-panji", labelEn: "Odia Panji", labelHi: "ओड़िया पांजी" },
      { slug: "malayalam-panchangam", href: "/panchang/malayalam-panchangam", labelEn: "Malayalam Panchangam", labelHi: "मलयालम पंचांगम" },
      { slug: "marathi-panchang", href: "/panchang/marathi-panchang", labelEn: "Marathi Panchang", labelHi: "मराठी पंचांग" },
      { slug: "gujarati-panchang", href: "/panchang/gujarati-panchang", labelEn: "Gujarati Panchang", labelHi: "गुजराती पंचांग" },
      { slug: "kannada-panchang", href: "/panchang/kannada-panchang", labelEn: "Kannada Panchang", labelHi: "कन्नड़ पंचांग" },
    ],
  },
  // Column 3
  {
    items: [
      { slug: "telugu-panchangam", href: "/panchang/telugu-panchangam", labelEn: "Telugu Panchangam", labelHi: "तेलुगु पंचांगम" },
      { slug: "nepali-patro", href: "/panchang/nepali-patro", labelEn: "Nepali Patro", labelHi: "नेपाली पात्रो" },
      { slug: "iskcon-panchang", href: "/panchang/iskcon-panchang", labelEn: "ISKCON Panchang", labelHi: "इस्कॉन पंचांग" },
      { slug: "chandrabalam", href: "/panchang/chandrabalam", labelEn: "Chandrabalam", labelHi: "चंद्रबलम" },
      { slug: "panchang-utilities", href: "/panchang/panchang-utilities", labelEn: "Panchang Utilities", labelHi: "पंचांग टूल्स" },
    ],
  },
  // Column 4
  {
    items: [
      { slug: "choghadiya", href: "/choghadiya", labelEn: "Choghadiya", labelHi: "चौघड़िया (दिन-रात)" },
      { slug: "panchak", href: "/panchak", labelEn: "Panchak Calendar", labelHi: "पंचक विचार 2026" },
      { slug: "bhadra", href: "/bhadra", labelEn: "Bhadra Timings", labelHi: "भद्रा काल विचार" },
      { slug: "hora", href: "/hora", labelEn: "Planetary Hora", labelHi: "ग्रह होरा चक्र" },
      { slug: "vinchudo", href: "/panchang/vinchudo", labelEn: "Vinchudo", labelHi: "विंछुड़ो विचार" },
      { slug: "nakshatra", href: "/panchang/nakshatra", labelEn: "Nakshatra", labelHi: "नक्षत्र फल" },
    ],
  },
];'''

new_cols = '''const PANCHANG_COLUMNS: { titleEn?: string; titleHi?: string; items: PanchangMenuItem[] }[] = [
  // Column 1
  {
    items: [
      { slug: "month-panchang", href: "/panchang/month-panchang", labelEn: "Month Panchang", labelHi: "मासिक पंचांग", labelTe: "మాస పంచాంగం" },
      { slug: "dainik-panchang", href: "/panchang/dainik-panchang", labelEn: "Dainik Panchang", labelHi: "दैनिक पंचांग", labelTe: "దిన పంచాంగం" },
      { slug: "assamese-panjika", href: "/panchang/assamese-panjika", labelEn: "Assamese Panjika", labelHi: "असमिया पंजिका", labelTe: "అస్సామీ పంజికా" },
      { slug: "bengali-panjika", href: "/panchang/bengali-panjika", labelEn: "Bengali Panjika", labelHi: "बंगाली पंजिका", labelTe: "బెంగాలీ పంజికా" },
      { slug: "tamil-panchangam", href: "/panchang/tamil-panchangam", labelEn: "Tamil Panchangam", labelHi: "तमिल पंचांगम", labelTe: "తమిళ పంచాంగం" },
    ],
  },
  // Column 2
  {
    items: [
      { slug: "odia-panji", href: "/panchang/odia-panji", labelEn: "Odia Panji", labelHi: "ओड़िया पांजी", labelTe: "ఒడియా పంజీ" },
      { slug: "malayalam-panchangam", href: "/panchang/malayalam-panchangam", labelEn: "Malayalam Panchangam", labelHi: "मलयालम पंचांगम", labelTe: "మలయాళ పంచాంగం" },
      { slug: "marathi-panchang", href: "/panchang/marathi-panchang", labelEn: "Marathi Panchang", labelHi: "मराठी पंचांग", labelTe: "మరాఠీ పంచాంగం" },
      { slug: "gujarati-panchang", href: "/panchang/gujarati-panchang", labelEn: "Gujarati Panchang", labelHi: "गुजराती पंचांग", labelTe: "గుజరాతీ పంచాంగం" },
      { slug: "kannada-panchang", href: "/panchang/kannada-panchang", labelEn: "Kannada Panchang", labelHi: "कन्नड़ पंचांग", labelTe: "కన్నడ పంచాంగం" },
    ],
  },
  // Column 3
  {
    items: [
      { slug: "telugu-panchangam", href: "/panchang/telugu-panchangam", labelEn: "Telugu Panchangam", labelHi: "तेलुगु पंचांगम", labelTe: "తెలుగు పంచాంగం" },
      { slug: "nepali-patro", href: "/panchang/nepali-patro", labelEn: "Nepali Patro", labelHi: "नेपाली पात्रो", labelTe: "నేపాలీ పాత్రో" },
      { slug: "iskcon-panchang", href: "/panchang/iskcon-panchang", labelEn: "ISKCON Panchang", labelHi: "इस्कॉन पंचांग", labelTe: "ఇస్కాన్ పంచాంగం" },
      { slug: "chandrabalam", href: "/panchang/chandrabalam", labelEn: "Chandrabalam", labelHi: "चंद्रबलम", labelTe: "చంద్రబలం" },
      { slug: "panchang-utilities", href: "/panchang/panchang-utilities", labelEn: "Panchang Utilities", labelHi: "पंचांग टूल्स", labelTe: "పంచాంగ పరికరాలు" },
    ],
  },
  // Column 4
  {
    items: [
      { slug: "choghadiya", href: "/choghadiya", labelEn: "Choghadiya", labelHi: "चौघड़िया (दिन-रात)", labelTe: "చోఘడియా (పగలు-రాత్రి)" },
      { slug: "panchak", href: "/panchak", labelEn: "Panchak Calendar", labelHi: "पंचक विचार 2026", labelTe: "పంచక విచారం 2026" },
      { slug: "bhadra", href: "/bhadra", labelEn: "Bhadra Timings", labelHi: "भद्रा काल विचार", labelTe: "భద్రా కాల విచారం" },
      { slug: "hora", href: "/hora", labelEn: "Planetary Hora", labelHi: "ग्रह होरा चक्र", labelTe: "గ్రహ హోరా చక్రం" },
      { slug: "vinchudo", href: "/panchang/vinchudo", labelEn: "Vinchudo", labelHi: "विंछुड़ो विचार", labelTe: "వింఛుడో విచారం" },
      { slug: "nakshatra", href: "/panchang/nakshatra", labelEn: "Nakshatra", labelHi: "नक्षत्र फल", labelTe: "నక్షత్ర ఫలం" },
    ],
  },
];'''

panchang = panchang.replace(old_cols, new_cols)

# Replace label rendering
panchang = panchang.replace(
    'locale === "hi" ? "पंचांग एवं कैलेंडर" : "Panchang & Calendars"',
    'locale === "te" ? "పంచాంగం & క్యాలెండర్లు" : locale === "hi" ? "पंचांग एवं कैलेंडर" : "Panchang & Calendars"'
)
panchang = panchang.replace(
    'locale === "hi" ? "आज का पंचांग (Live)" : "Today\'s Panchang (Live)"',
    'locale === "te" ? "నేటి పంచాంగం (లైవ్)" : locale === "hi" ? "आज का पंचांग (Live)" : "Today\'s Panchang (Live)"'
)
panchang = panchang.replace(
    '{locale === "hi" ? item.labelHi : item.labelEn}',
    '{locale === "te" ? item.labelTe : locale === "hi" ? item.labelHi : item.labelEn}'
)
panchang = panchang.replace(
    '<span>{locale === "hi" ? "पंचांग" : "Panchang"}</span>',
    '<span>{locale === "te" ? "పంచాంగం" : locale === "hi" ? "पंचांग" : "Panchang"}</span>'
)
panchang = panchang.replace(
    'locale === "hi" ? "सम्पूर्ण वैदिक एवं क्षेत्रीय पंचांग" : "Vedic & Regional Panchang Systems"',
    'locale === "te" ? "సంపూర్ణ వైదిక & ప్రాంతీయ పంచాంగాలు" : locale === "hi" ? "सम्पूर्ण वैदिक एवं क्षेत्रीय पंचांग" : "Vedic & Regional Panchang Systems"'
)
panchang = panchang.replace(
    'locale === "hi" ? "आज का पंचांग →" : "Today\'s Panchang →"',
    'locale === "te" ? "నేటి పంచాంగం →" : locale === "hi" ? "आज का पंचांग →" : "Today\'s Panchang →"'
)
panchang = panchang.replace(
    'locale === "hi" ? "हिन्दू कैलेंडर" : "Hindu Calendar"',
    'locale === "te" ? "హిందూ క్యాలెండర్" : locale === "hi" ? "हिन्दू कैलेंडर" : "Hindu Calendar"'
)
panchang = panchang.replace(
    'locale === "hi"\n                ? "प्रामाणिक दृक सिद्धांत एवं सटीक गृह-नक्षत्र काल गणना"\n                : "100% Accurate Drik Ganita, Sidereal Longitudes & Muhurat"',
    'locale === "te"\n                ? "ప్రామాణిక దృక్ సిద్ధాంతం మరియు ఖచ్చితమైన గ్రహ-నక్షత్ర కాల గణన"\n                : locale === "hi"\n                ? "प्रामाणिक दृक सिद्धांत एवं सटीक गृह-नक्षत्र काल गणना"\n                : "100% Accurate Drik Ganita, Sidereal Longitudes & Muhurat"'
)

with open("src/components/layout/PanchangMenu.tsx", "w", encoding="utf-8") as f:
    f.write(panchang)
print("SUCCESS: Updated PanchangMenu.tsx")

# 4. Update MuhuratMenu.tsx
with open("src/components/layout/MuhuratMenu.tsx", "r", encoding="utf-8") as f:
    muhurat = f.read()

muhurat = muhurat.replace(
'''interface MuhuratMenuItem {
  href: string;
  labelEn: string;
  labelHi: string;
}''',
'''interface MuhuratMenuItem {
  href: string;
  labelEn: string;
  labelHi: string;
  labelTe: string;
}'''
)

old_muh_cols = '''const MUHURAT_COLUMNS: { items: MuhuratMenuItem[] }[] = [
  // Column 1
  {
    items: [
      { href: "/choghadiya", labelEn: "Choghadiya (Day & Night)", labelHi: "चौघड़िया (दिन-रात)" },
      { href: "/hora", labelEn: "Planetary Hora", labelHi: "दैनिक ग्रह होरा" },
      { href: "/bhadra", labelEn: "Bhadra Timings", labelHi: "भद्रा काल विचार" },
      { href: "/panchak", labelEn: "Panchak 2026 Calendar", labelHi: "पंचक विचार एवं 2026 तारीखें" },
      { href: "/shubh-dates/vivah-muhurat", labelEn: "Vivah Muhurat", labelHi: "विवाह मुहूर्त 2026 (कैलेंडर)" },
      { href: "/shubh-dates/griha-pravesh", labelEn: "Griha Pravesh", labelHi: "गृह प्रवेश मुहूर्त (कैलेंडर)" },
    ],
  },
  // Column 2
  {
    items: [
      { href: "/shubh-dates/property-purchase", labelEn: "Property Purchase", labelHi: "संपत्ति क्रय मुहूर्त (कैलेंडर)" },
      { href: "/shubh-dates/vehicle-purchase", labelEn: "Vehicle Purchase", labelHi: "वाहन क्रय मुहूर्त (कैलेंडर)" },
      { href: "/shubh-dates/business-opening", labelEn: "Business Opening", labelHi: "व्यापार/दुकान उद्घाटन (कैलेंडर)" },
      { href: "/shubh-dates/gold-buying", labelEn: "Gold Buying Muhurat", labelHi: "सोना/चांदी क्रय मुहूर्त" },
      { href: "/shubh-dates/naamkaran", labelEn: "Naamkaran Muhurat", labelHi: "नामकरण संस्कार मुहूर्त" },
      { href: "/shubh-dates/mundan", labelEn: "Mundan Muhurat", labelHi: "मुंडन संस्कार मुहूर्त" },
    ],
  },
  // Column 3
  {
    items: [
      { href: "/shubh-dates/vidyarambha", labelEn: "Vidyarambha", labelHi: "विद्यारंभ संस्कार मुहूर्त" },
      { href: "/shubh-dates/karnavedha", labelEn: "Karnavedha Muhurat", labelHi: "कर्णवेध संस्कार मुहूर्त" },
      { href: "/muhurat#auspicious-yoga", labelEn: "Auspicious Yoga", labelHi: "सर्वार्थ व अमृत सिद्धि योग" },
      { href: "/muhurat#panchaka-rahita", labelEn: "Panchaka Rahita", labelHi: "पंचक रहित मुहूर्त" },
      { href: "/muhurat#abhijit-muhurat", labelEn: "Abhijit Muhurat", labelHi: "अभिजित मुहूर्त" },
    ],
  },
];'''

new_muh_cols = '''const MUHURAT_COLUMNS: { items: MuhuratMenuItem[] }[] = [
  // Column 1
  {
    items: [
      { href: "/choghadiya", labelEn: "Choghadiya (Day & Night)", labelHi: "चौघड़िया (दिन-रात)", labelTe: "చోఘడియా (పగలు & రాత్రి)" },
      { href: "/hora", labelEn: "Planetary Hora", labelHi: "दैनिक ग्रह होरा", labelTe: "దైనందిన గ్రహ హోరా" },
      { href: "/bhadra", labelEn: "Bhadra Timings", labelHi: "भद्रा काल विचार", labelTe: "భద్రా కాల విచారం" },
      { href: "/panchak", labelEn: "Panchak 2026 Calendar", labelHi: "पंचक विचार एवं 2026 तारीखें", labelTe: "పంచక విచారం 2026" },
      { href: "/shubh-dates/vivah-muhurat", labelEn: "Vivah Muhurat", labelHi: "विवाह मुहूर्त 2026 (कैलेंडर)", labelTe: "వివాహ ముహూర్తాలు 2026" },
      { href: "/shubh-dates/griha-pravesh", labelEn: "Griha Pravesh", labelHi: "गृह प्रवेश मुहूर्त (कैलेंडर)", labelTe: "గృహ ప్రవేశ ముహూర్తాలు" },
    ],
  },
  // Column 2
  {
    items: [
      { href: "/shubh-dates/property-purchase", labelEn: "Property Purchase", labelHi: "संपत्ति क्रय मुहूर्त (कैलेंडर)", labelTe: "ఆస్తి కొనుగోలు ముహూర్తం" },
      { href: "/shubh-dates/vehicle-purchase", labelEn: "Vehicle Purchase", labelHi: "वाहन क्रय मुहूर्त (कैलेंडर)", labelTe: "వాహన కొనుగోలు ముహూర్తం" },
      { href: "/shubh-dates/business-opening", labelEn: "Business Opening", labelHi: "व्यापार/दुकान उद्घाटन (कैलेंडर)", labelTe: "వ్యాపార ప్రారంభ ముహూర్తం" },
      { href: "/shubh-dates/gold-buying", labelEn: "Gold Buying Muhurat", labelHi: "सोना/चांदी क्रय मुहूर्त", labelTe: "బంగారం కొనుగోలు ముహూర్తం" },
      { href: "/shubh-dates/naamkaran", labelEn: "Naamkaran Muhurat", labelHi: "नामकरण संस्कार मुहूर्त", labelTe: "నామకరణ సంస్కార ముహూర్తం" },
      { href: "/shubh-dates/mundan", labelEn: "Mundan Muhurat", labelHi: "मुंडन संस्कार मुहूर्त", labelTe: "పుట్టువెండ్రుకల ముహూర్తం" },
    ],
  },
  // Column 3
  {
    items: [
      { href: "/shubh-dates/vidyarambha", labelEn: "Vidyarambha", labelHi: "विद्यारंभ संस्कार मुहूर्त", labelTe: "అక్షరాభ్యాస ముహూర్తం" },
      { href: "/shubh-dates/karnavedha", labelEn: "Karnavedha Muhurat", labelHi: "कर्णवेध संस्कार मुहूर्त", labelTe: "కర్ణవేధ (చెవులు కుట్టే) ముహూర్తం" },
      { href: "/muhurat#auspicious-yoga", labelEn: "Auspicious Yoga", labelHi: "सर्वार्थ व अमृत सिद्धि योग", labelTe: "సర్వార్థ & అమృత సిద్ధి యోగం" },
      { href: "/muhurat#panchaka-rahita", labelEn: "Panchaka Rahita", labelHi: "पंचक रहित मुहूर्त", labelTe: "పంచక రహిత ముహూర్తం" },
      { href: "/muhurat#abhijit-muhurat", labelEn: "Abhijit Muhurat", labelHi: "अभिजित मुहूर्त", labelTe: "అభిజిత్ ముహూర్తం" },
    ],
  },
];'''

muhurat = muhurat.replace(old_muh_cols, new_muh_cols)
muhurat = muhurat.replace(
    'locale === "hi" ? "शुभ मुहूर्त एवं चौघड़िया" : "Shubh Muhurat & Timings"',
    'locale === "te" ? "శుభ ముహూర్తాలు & చోఘడియా" : locale === "hi" ? "शुभ मुहूर्त एवं चौघड़िया" : "Shubh Muhurat & Timings"'
)
muhurat = muhurat.replace(
    'locale === "hi" ? "मुहूर्त हब (Live)" : "Muhurat Hub (Live)"',
    'locale === "te" ? "ముహూర్త కేంద్రం (లైవ్)" : locale === "hi" ? "मुहूर्त हब (Live)" : "Muhurat Hub (Live)"'
)
muhurat = muhurat.replace(
    '{locale === "hi" ? item.labelHi : item.labelEn}',
    '{locale === "te" ? item.labelTe : locale === "hi" ? item.labelHi : item.labelEn}'
)
muhurat = muhurat.replace(
    '<span>{locale === "hi" ? "मुहूर्त" : "Muhurat"}</span>',
    '<span>{locale === "te" ? "ముహూర్తం" : locale === "hi" ? "मुहूर्त" : "Muhurat"}</span>'
)
muhurat = muhurat.replace(
    'locale === "hi" ? "शुभ मुहूर्त एवं तिथि निर्णय" : "Auspicious Muhurat & Timings"',
    'locale === "te" ? "శుభ ముహూర్తాలు & తిథి నిర్ణయం" : locale === "hi" ? "शुभ मुहूर्त एवं तिथि निर्णय" : "Auspicious Muhurat & Timings"'
)
muhurat = muhurat.replace(
    'locale === "hi" ? "मुहूर्त हब →" : "Muhurat Hub →"',
    'locale === "te" ? "ముహూర్త కేంద్రం →" : locale === "hi" ? "मुहूर्त हब →" : "Muhurat Hub →"'
)
muhurat = muhurat.replace(
    'locale === "hi" ? "चौघड़िया" : "Choghadiya"',
    'locale === "te" ? "చోఘడియా" : locale === "hi" ? "चौघड़िया" : "Choghadiya"'
)
muhurat = muhurat.replace(
    'locale === "hi"\n                ? "16 शास्त्रीय संस्कार एवं दैनिक मांगलिक कार्यों के शुभ काल"\n                : "Auspicious timings for weddings, housewarming, travel & puja"',
    'locale === "te"\n                ? "16 సంస్కారాలు మరియు దైనందిన శుభ కార్యాలకు పవిత్ర ముహూర్తాలు"\n                : locale === "hi"\n                ? "16 शास्त्रीय संस्कार एवं दैनिक मांगलिक कार्यों के शुभ काल"\n                : "Auspicious timings for weddings, housewarming, travel & puja"'
)

with open("src/components/layout/MuhuratMenu.tsx", "w", encoding="utf-8") as f:
    f.write(muhurat)
print("SUCCESS: Updated MuhuratMenu.tsx")

# 5. Update VratMenu.tsx
with open("src/components/layout/VratMenu.tsx", "r", encoding="utf-8") as f:
    vrat = f.read()

vrat = vrat.replace(
'''interface VratMenuItem {
  href: string;
  labelEn: string;
  labelHi: string;
}''',
'''interface VratMenuItem {
  href: string;
  labelEn: string;
  labelHi: string;
  labelTe: string;
}'''
)

old_vrat_cols = '''const VRAT_COLUMNS: { items: VratMenuItem[] }[] = [
  // Column 1
  {
    items: [
      { href: "/vrat-upavas#ekadashi-vrat", labelEn: "Ekadashi Vrat & Parana", labelHi: "एकादशी व्रत एवं पारण" },
      { href: "/vrat-upavas#pradosh-vrat", labelEn: "Pradosh Vrat (Shiva)", labelHi: "प्रदोष व्रत (त्रयोदशी)" },
      { href: "/vrat-upavas#sankashti-chaturthi", labelEn: "Sankashti Chaturthi", labelHi: "संकष्टी चतुर्थी (गणेश)" },
      { href: "/vrat-upavas#masik-shivratri", labelEn: "Masik Shivratri", labelHi: "मासिक शिवरात्रि व्रत" },
      { href: "/vrat-upavas#purnima-vrat", labelEn: "Purnima & Satyanarayan", labelHi: "पूर्णिमा व्रत व कथा" },
    ],
  },
  // Column 2
  {
    items: [
      { href: "/vrat-upavas#amavasya-tarpan", labelEn: "Amavasya & Pitru Tarpan", labelHi: "अमावस्या एवं पितृ तर्पण" },
      { href: "/vrat-upavas#navratri-vrat", labelEn: "Navratri 9 Days Vrat", labelHi: "नवरात्रि ९ दिवसीय व्रत" },
      { href: "/vrat-upavas#rohini-vrat", labelEn: "Rohini Vrat & Jain", labelHi: "रोहिणी व्रत एवं पच्चक्खाण" },
      { href: "/vrat-upavas#sawan-somwar", labelEn: "Sawan Somwar Vrat", labelHi: "सावन सोमवार व्रत" },
      { href: "/vrat-upavas#skanda-sashti", labelEn: "Skanda Sashti Vrat", labelHi: "स्कंद षष्ठी (कार्तिकेय)" },
    ],
  },
  // Column 3
  {
    items: [
      { href: "/vrat-upavas#varalakshmi-vrat", labelEn: "Varalakshmi Vrat", labelHi: "वरलक्ष्मी व्रत" },
      { href: "/vrat-upavas#karwa-chauth", labelEn: "Karwa Chauth Vrat", labelHi: "करवा चौथ व्रत" },
      { href: "/vrat-upavas#ahar-niyam", labelEn: "Vrat Ahar Rules (Phalahar)", labelHi: "व्रत आहार नियम (फलाहार)" },
      { href: "/vrat-upavas#sankalp-vidhi", labelEn: "Vrat Sankalp Vidhi", labelHi: "व्रत संकल्प एवं उद्यापन" },
      { href: "/vrat-upavas#all-vrats", labelEn: "Full 2026 Vrat Calendar", labelHi: "सम्पूर्ण व्रत कैलेंडर 2026" },
    ],
  },
];'''

new_vrat_cols = '''const VRAT_COLUMNS: { items: VratMenuItem[] }[] = [
  // Column 1
  {
    items: [
      { href: "/vrat-upavas#ekadashi-vrat", labelEn: "Ekadashi Vrat & Parana", labelHi: "एकादशी व्रत एवं पारण", labelTe: "ఏకాదశి వ్రతం & పారణ" },
      { href: "/vrat-upavas#pradosh-vrat", labelEn: "Pradosh Vrat (Shiva)", labelHi: "प्रदोष व्रत (त्रयोदशी)", labelTe: "ప్రదోష వ్రతం (శివారాధన)" },
      { href: "/vrat-upavas#sankashti-chaturthi", labelEn: "Sankashti Chaturthi", labelHi: "संकष्टी चतुर्थी (गणेश)", labelTe: "సంకష్ట చతుర్థి (గణపతి)" },
      { href: "/vrat-upavas#masik-shivratri", labelEn: "Masik Shivratri", labelHi: "मासिक शिवरात्रि व्रत", labelTe: "మాస శివరాత్రి వ్రతం" },
      { href: "/vrat-upavas#purnima-vrat", labelEn: "Purnima & Satyanarayan", labelHi: "पूर्णिमा व्रत व कथा", labelTe: "పౌర్ణమి & సత్యనారాయణ వ్రతం" },
    ],
  },
  // Column 2
  {
    items: [
      { href: "/vrat-upavas#amavasya-tarpan", labelEn: "Amavasya & Pitru Tarpan", labelHi: "अमावस्या एवं पितृ तर्पण", labelTe: "అమావాస్య & పితృ తర్పణం" },
      { href: "/vrat-upavas#navratri-vrat", labelEn: "Navratri 9 Days Vrat", labelHi: "नवरात्रि ९ दिवसीय व्रत", labelTe: "శరన్నవరాత్రి 9 రోజుల వ్రతం" },
      { href: "/vrat-upavas#rohini-vrat", labelEn: "Rohini Vrat & Jain", labelHi: "रोहिणी व्रत एवं पच्चक्खाण", labelTe: "రోహిణి వ్రతం & పచ్చక్ఖాణ్" },
      { href: "/vrat-upavas#sawan-somwar", labelEn: "Sawan Somwar Vrat", labelHi: "सावन सोमवार व्रत", labelTe: "శ్రావణ సోమవార వ్రతం" },
      { href: "/vrat-upavas#skanda-sashti", labelEn: "Skanda Sashti Vrat", labelHi: "स्कंद षष्ठी (कार्तिकेय)", labelTe: "స్కంద షష్ఠి (సుబ్రహ్మణ్య)" },
    ],
  },
  // Column 3
  {
    items: [
      { href: "/vrat-upavas#varalakshmi-vrat", labelEn: "Varalakshmi Vrat", labelHi: "वरलक्ष्मी व्रत", labelTe: "వరలక్ష్మీ వ్రతం" },
      { href: "/vrat-upavas#karwa-chauth", labelEn: "Karwa Chauth Vrat", labelHi: "करवा चौथ व्रत", labelTe: "కర్వా చౌత్ వ్రతం" },
      { href: "/vrat-upavas#ahar-niyam", labelEn: "Vrat Ahar Rules (Phalahar)", labelHi: "व्रत आहार नियम (फलाहार)", labelTe: "వ్రత ఆహార నియమాలు (ఫలాహారం)" },
      { href: "/vrat-upavas#sankalp-vidhi", labelEn: "Vrat Sankalp Vidhi", labelHi: "व्रत संकल्प एवं उद्यापन", labelTe: "వ్రత సంకల్పం & ఉద్యాపన" },
      { href: "/vrat-upavas#all-vrats", labelEn: "Full 2026 Vrat Calendar", labelHi: "सम्पूर्ण व्रत कैलेंडर 2026", labelTe: "సంపూర్ణ వ్రత క్యాలెండర్ 2026" },
    ],
  },
];'''

vrat = vrat.replace(old_vrat_cols, new_vrat_cols)
vrat = vrat.replace(
    'locale === "hi" ? "व्रत, उपवास एवं एकादशी" : "Vrat, Upavas & Fasting"',
    'locale === "te" ? "వ్రతాలు, ఉపవాసాలు & ఏకాదశి" : locale === "hi" ? "व्रत, उपवास एवं एकादशी" : "Vrat, Upavas & Fasting"'
)
vrat = vrat.replace(
    'locale === "hi" ? "व्रत हब (Live)" : "Vrat Hub (Live)"',
    'locale === "te" ? "వ్రత కేంద్రం (లైవ్)" : locale === "hi" ? "व्रत हब (Live)" : "Vrat Hub (Live)"'
)
vrat = vrat.replace(
    '{locale === "hi" ? item.labelHi : item.labelEn}',
    '{locale === "te" ? item.labelTe : locale === "hi" ? item.labelHi : item.labelEn}'
)
vrat = vrat.replace(
    '<span>{locale === "hi" ? "व्रत एवं उपवास" : "Vrat & Upavas"}</span>',
    '<span>{locale === "te" ? "వ్రతం & ఉపవాసం" : locale === "hi" ? "व्रत एवं उपवास" : "Vrat & Upavas"}</span>'
)
vrat = vrat.replace(
    'locale === "hi" ? "सनातन व्रत एवं उपवास निर्णय" : "Sanatana Vrats & Fasting Guidelines"',
    'locale === "te" ? "సనాతన వ్రతాలు & ఉపవాస నియమాలు" : locale === "hi" ? "सनातन व्रत एवं उपवास निर्णय" : "Sanatana Vrats & Fasting Guidelines"'
)
vrat = vrat.replace(
    'locale === "hi" ? "सम्पूर्ण व्रत हब →" : "All Vrats Hub →"',
    'locale === "te" ? "సంపూర్ణ వ్రత కేంద్రం →" : locale === "hi" ? "सम्पूर्ण व्रत हब →" : "All Vrats Hub →"'
)
vrat = vrat.replace(
    'locale === "hi" ? "एकादशी कैलेंडर" : "Ekadashi Calendar"',
    'locale === "te" ? "ఏకాదశి క్యాలెండర్" : locale === "hi" ? "एकादशी कैलेंडर" : "Ekadashi Calendar"'
)
vrat = vrat.replace(
    'locale === "hi"\n                ? "शास्त्र सम्मत पारण समय, हरिवासर समाप्ति एवं फलाहार नियम"\n                : "Vedic fasting windows, Parana timing & ritual procedures"',
    'locale === "te"\n                ? "శాస్త్రసమ్మత పారణ సమయాలు, హరివాసర ముగింపు & ఫలాహార నియమాలు"\n                : locale === "hi"\n                ? "शास्त्र सम्मत पारण समय, हरिवासर समाप्ति एवं फलाहार नियम"\n                : "Vedic fasting windows, Parana timing & ritual procedures"'
)

with open("src/components/layout/VratMenu.tsx", "w", encoding="utf-8") as f:
    f.write(vrat)
print("SUCCESS: Updated VratMenu.tsx")

# 6. Update SpiritualToolsMenu.tsx
with open("src/components/spiritual-tools/SpiritualToolsMenu.tsx", "r", encoding="utf-8") as f:
    tools = f.read()

tools = tools.replace(
'''interface ToolMenuItem {
  href: string;
  labelEn: string;
  labelHi: string;
}

interface ToolColumn {
  categoryEn: string;
  categoryHi: string;
  items: ToolMenuItem[];
}''',
'''interface ToolMenuItem {
  href: string;
  labelEn: string;
  labelHi: string;
  labelTe: string;
}

interface ToolColumn {
  categoryEn: string;
  categoryHi: string;
  categoryTe: string;
  items: ToolMenuItem[];
}'''
)

old_tool_cols = '''const TOOL_COLUMNS: ToolColumn[] = [
  // Column 1: Astrology & Kundli
  {
    categoryEn: "Astrology & Kundli",
    categoryHi: "ज्योतिष व कुंडली",
    items: [
      { href: "/kundli", labelEn: "Free Janam Kundli", labelHi: "मुफ्त जन्म कुंडली" },
      { href: "/kundli-milan", labelEn: "Kundli Milan (36 Guna)", labelHi: "३६ गुण कुंडली मिलान" },
      { href: "/baby-names", labelEn: "Baby Names by Nakshatra", labelHi: "नक्षत्र अनुसार नामकरण" },
      { href: "/panchang/chandrabalam", labelEn: "Chandrabalam Finder", labelHi: "दैनिक चंद्रबलम" },
      { href: "/panchang/nakshatra", labelEn: "Nakshatra Calculator", labelHi: "नक्षत्र एवं राशि फल" },
    ],
  },
  // Column 2: Sadhana & Chanting
  {
    categoryEn: "Daily Sadhana & Jap",
    categoryHi: "नित्य साधना व जप",
    items: [
      { href: "/naam-jaap", labelEn: "Digital Naam Jaap", labelHi: "डिजिटल नाम जप" },
      { href: "/naam-jaap/mala", labelEn: "108 Jap Mala Counter", labelHi: "१०८ जप माला काउंटर" },
      { href: "/daily-sadhana/sankalp", labelEn: "Daily Sankalp Vidhi", labelHi: "दैनिक संकल्प विधि" },
      { href: "/daily-sadhana/diary", labelEn: "Bhakti Sadhana Diary", labelHi: "नित्य साधना डायरी" },
    ],
  },
  // Column 3: Creative & Utilities
  {
    categoryEn: "Creative & Utilities",
    categoryHi: "उपयोगी टूल्स व मीडिया",
    items: [
      { href: "/printable-calendar", labelEn: "Printable Wall Calendar (PDF)", labelHi: "दीवार कैलेंडर प्रिंट / PDF" },
      { href: "/suvichar-card-maker", labelEn: "Suvichar Status Maker", labelHi: "सुविचार स्टेटस मेकर" },
      { href: "/sacred-yatra-guides/planner", labelEn: "Tirth Yatra Planner", labelHi: "तीर्थ यात्रा प्लानर" },
      { href: "/panchang/panchang-utilities", labelEn: "Panchang Utilities", labelHi: "पंचांग टूल्स एवं गणना" },
      { href: "/spiritual-tools", labelEn: "All Spiritual Tools (Hub)", labelHi: "सम्पूर्ण टूल्स हब" },
    ],
  },
];'''

new_tool_cols = '''const TOOL_COLUMNS: ToolColumn[] = [
  // Column 1: Astrology & Kundli
  {
    categoryEn: "Astrology & Kundli",
    categoryHi: "ज्योतिष व कुंडली",
    categoryTe: "జ్యోతిష్యం & కుండలి",
    items: [
      { href: "/kundli", labelEn: "Free Janam Kundli", labelHi: "मुफ्त जन्म कुंडली", labelTe: "ఉచిత జన్మ కుండలి" },
      { href: "/kundli-milan", labelEn: "Kundli Milan (36 Guna)", labelHi: "३६ गुण कुंडली मिलान", labelTe: "36 గుణ కుండలి మిలనం" },
      { href: "/baby-names", labelEn: "Baby Names by Nakshatra", labelHi: "नक्षत्र अनुसार नामकरण", labelTe: "నక్షత్రం ప్రకారం శిశు నామాలు" },
      { href: "/panchang/chandrabalam", labelEn: "Chandrabalam Finder", labelHi: "दैनिक चंद्रबलम", labelTe: "దిన చంద్రబలం" },
      { href: "/panchang/nakshatra", labelEn: "Nakshatra Calculator", labelHi: "नक्षत्र एवं राशि फल", labelTe: "నక్షత్ర & రాశి ఫలితాలు" },
    ],
  },
  // Column 2: Sadhana & Chanting
  {
    categoryEn: "Daily Sadhana & Jap",
    categoryHi: "नित्य साधना व जप",
    categoryTe: "నిత్య సాధన & జపం",
    items: [
      { href: "/naam-jaap", labelEn: "Digital Naam Jaap", labelHi: "डिजिटल नाम जप", labelTe: "డిజిటల్ నామ జపం" },
      { href: "/naam-jaap/mala", labelEn: "108 Jap Mala Counter", labelHi: "१०८ जप माला काउंटर", labelTe: "108 జపమాల కౌంటర్" },
      { href: "/daily-sadhana/sankalp", labelEn: "Daily Sankalp Vidhi", labelHi: "दैनिक संकल्प विधि", labelTe: "దిన సంకల్ప విధి" },
      { href: "/daily-sadhana/diary", labelEn: "Bhakti Sadhana Diary", labelHi: "नित्य साधना डायरी", labelTe: "నిత్య సాధన డైరీ" },
    ],
  },
  // Column 3: Creative & Utilities
  {
    categoryEn: "Creative & Utilities",
    categoryHi: "उपयोगी टूल्स व मीडिया",
    categoryTe: "ఉపయుక్త సాధనాలు & మీడియా",
    items: [
      { href: "/printable-calendar", labelEn: "Printable Wall Calendar (PDF)", labelHi: "दीवार कैलेंडर प्रिंट / PDF", labelTe: "ప్రింట్ వాల్ క్యాలెండర్ (PDF)" },
      { href: "/suvichar-card-maker", labelEn: "Suvichar Status Maker", labelHi: "सुविचार स्टेटस मेकर", labelTe: "సువిచార స్టేటస్ మేకర్" },
      { href: "/sacred-yatra-guides/planner", labelEn: "Tirth Yatra Planner", labelHi: "तीर्थ यात्रा प्लानर", labelTe: "తీర్థయాత్రా ప్లానర్" },
      { href: "/panchang/panchang-utilities", labelEn: "Panchang Utilities", labelHi: "पंचांग टूल्स एवं गणना", labelTe: "పంచాంగ పరికరాలు & గణనలు" },
      { href: "/spiritual-tools", labelEn: "All Spiritual Tools (Hub)", labelHi: "सम्पूर्ण टूल्स हब", labelTe: "సంపూర్ణ సాధనాల కేంద్రం" },
    ],
  },
];'''

tools = tools.replace(old_tool_cols, new_tool_cols)
tools = tools.replace(
    'locale === "hi" ? "आध्यात्मिक एवं वैदिक उपकरण" : "Spiritual Tools & Calculators"',
    'locale === "te" ? "ఆధ్యాత్మిక & వైదిక సాధనాలు" : locale === "hi" ? "आध्यात्मिक एवं वैदिक उपकरण" : "Spiritual Tools & Calculators"'
)
tools = tools.replace(
    'locale === "hi" ? "सभी उपकरण (Hub)" : "All Tools (Hub)"',
    'locale === "te" ? "అన్ని సాధనాలు (కేంద్రం)" : locale === "hi" ? "सभी उपकरण (Hub)" : "All Tools (Hub)"'
)
tools = tools.replace(
    '{locale === "hi" ? col.categoryHi : col.categoryEn}',
    '{locale === "te" ? col.categoryTe : locale === "hi" ? col.categoryHi : col.categoryEn}'
)
tools = tools.replace(
    '{locale === "hi" ? item.labelHi : item.labelEn}',
    '{locale === "te" ? item.labelTe : locale === "hi" ? item.labelHi : item.labelEn}'
)
tools = tools.replace(
    '<span>{locale === "hi" ? "उपकरण" : "Tools"}</span>',
    '<span>{locale === "te" ? "సాధనాలు" : locale === "hi" ? "उपकरण" : "Tools"}</span>'
)
tools = tools.replace(
    'locale === "hi" ? "वैदिक एवं आध्यात्मिक उपकरण" : "Vedic & Spiritual Calculators"',
    'locale === "te" ? "వైదిక & ఆధ్యాత్మిక సాధనాలు" : locale === "hi" ? "वैदिक एवं आध्यात्मिक उपकरण" : "Vedic & Spiritual Calculators"'
)
tools = tools.replace(
    'locale === "hi" ? "सभी उपकरण देखें →" : "All Spiritual Tools →"',
    'locale === "te" ? "అన్ని సాధనాలు చూడండి →" : locale === "hi" ? "सभी उपकरण देखें →" : "All Spiritual Tools →"'
)
tools = tools.replace(
    'locale === "hi" ? "जन्म कुंडली" : "Janam Kundli"',
    'locale === "te" ? "జన్మ కుండలి" : locale === "hi" ? "जन्म कुंडली" : "Janam Kundli"'
)
tools = tools.replace(
    'locale === "hi"\n                ? "100% सुरक्षित और निःशुल्क वैदिक उपकरण — कुंडली, पंचांग, मिलान एवं सुविचार"\n                : "100% Free & Private — Vedic Kundli, Milan, Panchang & Status Maker"',
    'locale === "te"\n                ? "100% ఉచిత మరియు సురక్షిత వైదిక సాధనాలు — కుండలి, పంచాంగం, పొంతన & సువిచారాలు"\n                : locale === "hi"\n                ? "100% सुरक्षित और निःशुल्क वैदिक उपकरण — कुंडली, पंचांग, मिलान एवं सुविचार"\n                : "100% Free & Private — Vedic Kundli, Milan, Panchang & Status Maker"'
)

with open("src/components/spiritual-tools/SpiritualToolsMenu.tsx", "w", encoding="utf-8") as f:
    f.write(tools)
print("SUCCESS: Updated SpiritualToolsMenu.tsx")
