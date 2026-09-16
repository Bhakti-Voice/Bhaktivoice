# Group 3: Suvichar Studio & OG
import re

# 1. src/app/suvichar-card-maker/page.tsx
with open("src/app/suvichar-card-maker/page.tsx", "r", encoding="utf-8") as f:
    sc = f.read()

faqs_te_block = '''const FAQS_TE = [
  {
    question: "వాట్సాప్ స్టేటస్ కార్డులో మీ పేరు మరియు ఫోటోను ఎలా చేర్చాలి?",
    answer:
      "మీకు ఇష్టమైన ఆధ్యాత్మిక వర్గాన్ని (జైన ధర్మం, భగవద్గీత, మహాదేవ్, హనుమాన్, శ్రీరాముడు, దేవి లేదా పండుగలు) ఎంచుకోండి, మీ పేరు మరియు ఊరు నమోదు చేయండి, ఫోటోను అప్‌లోడ్ చేయండి (ఇది బంగారు మెడలియన్‌లో అందంగా కనిపిస్తుంది), మరియు 'WhatsApp లో షేర్ చేయండి' లేదా 'HD డౌన్‌లోడ్' పై క్లిక్ చేయండి. కేవలం 10 సెకన్లలో మీ వ్యక్తిగత స్టేటస్ కార్డ్ సిద్ధమవుతుంది.",
  },
  {
    question: "WhatsApp లో లింక్ పంపినప్పుడు ఫోటో కార్డు ఆటోమేటిక్‌గా కనిపిస్తుందా?",
    answer:
      "అవును! భక్తి వాయిస్‌లో అధునాతన డైనమిక్ ఓపెన్ గ్రాఫ్ టెక్నాలజీ ఉంది. మీరు ఏదైనా WhatsApp చాట్ లేదా గ్రూప్‌లో లింక్ షేర్ చేసినప్పుడు, మీ పేరు మరియు సువిచారంతో కూడిన అందమైన హై-రిజల్యూషన్ ఫోటో ప్రివ్యూ కార్డు ప్రత్యక్షమవుతుంది.",
  },
  {
    question: "జైన సువిచారాలు మరియు భగవాన్ మహావీరుని అమృతవాణి ఇందులో ఉన్నాయా?",
    answer:
      "అవును! ఇందులో శ్రీ నవకార మహామంత్రం, భగవాన్ మహావీరుని అహింసా సందేశం, 'జీవించు-జీవించనివ్వు', మిచ్ఛామి దుక్కడం (క్షమాపణ ప్రార్థన), చత్తారి మంగళం, అనేకాంతవాదం, అపరిగ్రహం మరియు పర్యుషణ పర్వ విశేష సువిచారాలు ఉన్నాయి.",
  },
  {
    question: "సువిచార పాఠం, సంస్కృత శ్లోకం మరియు కర్తను మనం స్వయంగా మార్చుకోవచ్చా?",
    answer:
      "ఖచ్చితంగా! ఇందులో ఉన్న 100+ సిద్ధమైన సువిచారాలతో పాటు, 'భక్తి పాఠాన్ని సవరించండి' ఎంపిక ద్వారా మీ స్వంత శ్లోకం, దోహా లేదా సుభాషితాన్ని రాసుకోవచ్చు.",
  },
  {
    question: "కార్డులో నేటి తిథి మరియు పంచాంగం ఆటోమేటిక్‌గా వస్తాయా?",
    answer:
      "అవును! 'నేటి తిథి & పంచాంగం జోడించండి' ఆప్షన్ ఆన్ చేస్తే, కార్డ్ పైభాగంలో నేటి తిథి, పక్షం మరియు నక్షత్రం ఖచ్చితమైన వైదిక గణనలతో ప్రత్యక్షమవుతాయి.",
  },
  {
    question: "ఈ టూల్ ఉచితం మరియు సురక్షితమైనదేనా?",
    answer:
      "అవును, ఇది 100% ఉచితం. మీ ఫోటో మరియు వ్యక్తిగత వివరాలు మీ బ్రౌజర్‌లోనే ప్రాసెస్ చేయబడతాయి, ఎప్పుడూ ఏ సర్వర్‌కూ అప్‌లోడ్ కావు.",
  },
  {
    question: "కార్డు 9:16 వాట్సాప్ స్టేటస్ మరియు 1:1 ఇన్‌స్టాగ్రామ్ పోస్ట్ సైజుల్లో లభిస్తుందా?",
    answer:
      "అవును, మీరు 9:16 వాట్సాప్ స్టేటస్ (1080×1920px), 1:1 ఇన్‌స్టాగ్రామ్ స్క్వేర్ పోస్ట్ మరియు 16:9 ఫేస్‌బుక్ బ్యానర్ ఫార్మాట్లలో హెచ్‌డీ క్వాలిటీలో డౌన్‌లోడ్ చేసుకోవచ్చు.",
  },
];
'''

sc = sc.replace('const FAQS_HI = [', faqs_te_block + '\nconst FAQS_HI = [')

sc = sc.replace(
'''  const locale = await getLocale();
  const isHi = locale === "hi";''',
'''  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";'''
)

sc = sc.replace(
'''  const customTitle = name
    ? isHi
      ? `${name} का सुविचार (Suvichar) — दैनिक स्टेटस कार्ड | भक्ति वॉइस`
      : `Suvichar by ${name} — Daily Devotional Status Card | Bhakti Voice`
    : isHi
    ? "सुविचार (Suvichar) — दैनिक सुविचार एवं व्हाट्सएप स्टेटस कार्ड मेकर | नाम व फोटो सहित"
    : "Suvichar (सुविचार) — Daily Suvichar, Quotes & WhatsApp Status Card Maker with Photo & Name";''',
'''  const customTitle = name
    ? isTe
      ? `${name} సువిచార్ (Suvichar) — దైవిక స్టేటస్ కార్డ్ | భక్తి వాయిస్`
      : isHi
      ? `${name} का सुविचार (Suvichar) — दैनिक स्टेटस कार्ड | भक्ति वॉइस`
      : `Suvichar by ${name} — Daily Devotional Status Card | Bhakti Voice`
    : isTe
    ? "సువిచార్ (Suvichar) — దైవిక సూక్తులు & వాట్సాప్ స్టేటస్ కార్డ్ మేకర్ | పేరు & ఫోటోతో"
    : isHi
    ? "सुविचार (Suvichar) — दैनिक सुविचार एवं व्हाट्सएप स्टेटस कार्ड मेकर | नाम व फोटो सहित"
    : "Suvichar (सुविचार) — Daily Suvichar, Quotes & WhatsApp Status Card Maker with Photo & Name";'''
)

sc = sc.replace(
'''export default async function SuvicharCardMakerPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? FAQS_HI : FAQS_EN;''',
'''export default async function SuvicharCardMakerPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";
  const faqs = isTe ? FAQS_TE : isHi ? FAQS_HI : FAQS_EN;'''
)

sc = sc.replace(
'''        title={
          isHi
            ? "सुविचार (Suvichar) — दैनिक सुविचार एवं स्टेटस मेकर"
            : "Suvichar (सुविचार) — Daily Quotes & WhatsApp Status Studio"
        }
        subtitle={
          isHi
            ? "100+ प्रामाणिक जैन सुविचार, नवकार मंत्र, गीता श्लोक, महादेव, हनुमान चालीसा, श्री राम एवं शुभ प्रभात सुविचार। अपना नाम व फोटो जोड़कर 10 सेकंड में HD स्टेटस कार्ड बनाएं व WhatsApp पर शेयर करें।"
            : "Create & share 100+ personalized HD devotional status cards with authentic Jain suvichar, Gita shlokas, Mahadev, Hanuman, Ram & today's live Tithi. 100% Free."
        }''',
'''        title={
          isTe
            ? "సువిచార్ (Suvichar) — దైవిక సూక్తులు & స్టేటస్ మేకర్"
            : isHi
            ? "सुविचार (Suvichar) — दैनिक सुविचार एवं स्टेटस मेकर"
            : "Suvichar (सुविचार) — Daily Quotes & WhatsApp Status Studio"
        }
        subtitle={
          isTe
            ? "100+ జైన సువిచారాలు, నవకార మంత్రం, భగవద్గీత శ్లోకాలు, మహాదేవ్, హనుమాన్ చాలీసా, శ్రీరామ సూక్తులు. మీ పేరు, ఫోటోతో 10 సెకన్లలో HD స్టేటస్ కార్డ్ తయారుచేసి WhatsApp లో షేర్ చేయండి."
            : isHi
            ? "100+ प्रामाणिक जैन सुविचार, नवकार मंत्र, गीता श्लोक, महादेव, हनुमान चालीसा, श्री राम एवं शुभ प्रभात सुविचार। अपना नाम व फोटो जोड़कर 10 सेकंड में HD स्टेटस कार्ड बनाएं व WhatsApp पर शेयर करें।"
            : "Create & share 100+ personalized HD devotional status cards with authentic Jain suvichar, Gita shlokas, Mahadev, Hanuman, Ram & today's live Tithi. 100% Free."
        }'''
)

sc = sc.replace(
    '[isHi ? "सुविचार (Suvichar)" : "Suvichar Status Studio", PATHS.suvicharMaker]',
    '[isTe ? "సువిచార కార్డ్ మేకర్" : isHi ? "सुविचार (Suvichar)" : "Suvichar Status Studio", PATHS.suvicharMaker]'
)

with open("src/app/suvichar-card-maker/page.tsx", "w", encoding="utf-8") as f:
    f.write(sc)
print("SUCCESS: Updated suvichar-card-maker/page.tsx")

# 2. src/app/api/og/suvichar/route.tsx
with open("src/app/api/og/suvichar/route.tsx", "r", encoding="utf-8") as f:
    og = f.read()

og = og.replace(
'''    const isHi = searchParams.get("lang") !== "en";''',
'''    const lang = searchParams.get("lang") || "en";
    const isTe = lang === "te";
    const isHi = lang === "hi";'''
)

og = og.replace(
'''    const displaySalutation =
      salutation.trim() ||
      (isHi
        ? item.tradition === "jain"
          ? "सप्रेम जय जिनेन्द्र"
          : "जय श्री कृष्णा"
        : item.tradition === "jain"
          ? "Saprem Jai Jinendra"
          : "Jai Shree Krishna");''',
'''    const displaySalutation =
      salutation.trim() ||
      (isTe
        ? item.tradition === "jain"
          ? "సప్రేమ జై జినేంద్ర"
          : "జై శ్రీ కృష్ణ"
        : isHi
        ? item.tradition === "jain"
          ? "सप्रेम जय जिनेन्द्र"
          : "जय श्री कृष्णा"
        : item.tradition === "jain"
          ? "Saprem Jai Jinendra"
          : "Jai Shree Krishna");'''
)

og = og.replace(
    '<span style={{ display: "flex" }}>🙏 प्रेषक:</span>',
    '<span style={{ display: "flex" }}>{isTe ? "🙏 పంపినవారు:" : isHi ? "🙏 प्रेषक:" : "🙏 From:"}</span>'
)

og = og.replace(
'''              <span style={{ display: "flex" }}>•</span>
              <span style={{ display: "flex" }}>भक्ति वॉइस</span>
              <span style={{ display: "flex" }}>•</span>
              <span style={{ display: "flex", color: "#FDE68A" }}>अपना कार्ड बनाएं</span>''',
'''              <span style={{ display: "flex" }}>•</span>
              <span style={{ display: "flex" }}>{isTe ? "భక్తి వాయిస్" : isHi ? "भक्ति वॉइस" : "Bhakti Voice"}</span>
              <span style={{ display: "flex" }}>•</span>
              <span style={{ display: "flex", color: "#FDE68A" }}>{isTe ? "మీ కార్డ్‌ని రూపొందించండి" : isHi ? "अपना कार्ड बनाएं" : "Create Status"}</span>'''
)

with open("src/app/api/og/suvichar/route.tsx", "w", encoding="utf-8") as f:
    f.write(og)
print("SUCCESS: Updated api/og/suvichar/route.tsx")

# 3. src/components/spiritual-tools/SuvicharStudio.tsx
with open("src/components/spiritual-tools/SuvicharStudio.tsx", "r", encoding="utf-8") as f:
    ss = f.read()

ss = ss.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')

ss = ss.replace(
    '{isHi ? "रैंडम सुविचार बदलें" : "Shuffle Random Quote"}',
    '{isTe ? "వేరే సువిచారాన్ని ఎంచుకోండి" : isHi ? "रैंडम सुविचार बदलें" : "Shuffle Random Quote"}'
)
ss = ss.replace(
    '{isHi ? "श्रेणी व परंपरा चुनें" : "Select Sacred Category & Tradition"}',
    '{isTe ? "వర్గం & సంప్రదాయాన్ని ఎంచుకోండి" : isHi ? "श्रेणी व परंपरा चुनें" : "Select Sacred Category & Tradition"}'
)
ss = ss.replace(
    '{isHi ? "नाम, स्थान एवं फोटो जोड़ें" : "Add Your Name, City & Photo"}',
    '{isTe ? "మీ పేరు, ఊరు & ఫోటోను జతచేయండి" : isHi ? "नाम, स्थान एवं फोटो जोड़ें" : "Add Your Name, City & Photo"}'
)
ss = ss.replace(
    '{isHi ? "आपका नाम / परिवार का नाम" : "Your Name / Family Name"}',
    '{isTe ? "మీ పేరు / కుటుంబం పేరు" : isHi ? "आपका नाम / परिवार का नाम" : "Your Name / Family Name"}'
)

with open("src/components/spiritual-tools/SuvicharStudio.tsx", "w", encoding="utf-8") as f:
    f.write(ss)
print("SUCCESS: Updated SuvicharStudio.tsx")
