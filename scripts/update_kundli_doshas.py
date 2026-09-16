# Update Kaal Sarp, Manglik, Sade Sati and Kundli Chart tools for Telugu
import re

# 1. kaal-sarp-dosha/page.tsx
path = "src/app/kundli/kaal-sarp-dosha/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Kaal Sarp Dosha Calculator — 12 Types of Kaal Sarp Yoga, Udit/Anudit Check & Vedic Remedies";
  const description =
    "Calculate Kaal Sarp Dosha online with 100% astronomical accuracy. Identify all 12 classical Kaal Sarp Yogas (Anant to Sheshnag), Udit vs Anudit Gola direction, Purna vs Anshik enclosure, life milestones, and authentic Shastric remedies.";''',
    '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  const title = isTe
    ? "కాల సర్ప దోష కాలిక్యులేటర్ — 12 రకాల కాల సర్ప యోగాలు & వైదిక నివారణలు"
    : isHi
    ? "काल सर्प दोष कैलकुलेटर — 12 प्रकार के काल सर्प योग, उदित/अनुदित एवं वैदिक उपाय"
    : "Kaal Sarp Dosha Calculator — 12 Types of Kaal Sarp Yoga, Udit/Anudit Check & Vedic Remedies";
  const description = isTe
    ? "100% ఖచ్చితమైన వైదిక గణనతో కాల సర్ప దోషాన్ని ఆన్‌లైన్‌లో లెక్కించండి. అనంత నుండి శేషనాగ వరకు 12 రకాల కాల సర్ప యోగాలు, పూర్ణ/ఆంశిక ప్రభావం మరియు ప్రామాణిక శాస్త్ర నివారణలు."
    : isHi
    ? "100% सटीक वैदिक गणना द्वारा काल सर्प दोष की ऑनलाइन जांच करें। अनंत से शेषनाग तक 12 प्रकार के काल सर्प योग, पूर्ण व आंशिक प्रभाव एवं प्रामाणिक शास्त्रीय उपाय।"
    : "Calculate Kaal Sarp Dosha online with 100% astronomical accuracy. Identify all 12 classical Kaal Sarp Yogas (Anant to Sheshnag), Udit vs Anudit Gola direction, Purna vs Anshik enclosure, life milestones, and authentic Shastric remedies.";'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isHi ? "काल सर्प दोष कैलकुलेटर" : "Kaal Sarp Dosha Calculator", PATHS.kaalSarpDosha]
  );''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isTe ? "కుండలి" : isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isTe ? "కాల సర్ప దోష కాలిక్యులేటర్" : isHi ? "काल सर्प दोष कैलकुलेटर" : "Kaal Sarp Dosha Calculator", PATHS.kaalSarpDosha]
  );'''
)

code = code.replace(
    '''        title={isHi ? "काल सर्प दोष कैलकुलेटर" : "Kaal Sarp Dosha Calculator"}
        subtitle={
          isHi
            ? "जन्म कुंडली में राहु-केतु अक्ष अनुसार १२ प्रकार के काल सर्प योग, उदित/अनुदित स्थिति, पूर्ण/आंशिक प्रभाव एवं प्रामाणिक शास्त्रीय उपाय।"
            : "Identify all 12 classical Kaal Sarp Yogas, planetary enclosure by Rahu-Ketu, and authentic Vedic remedies."
        }''',
    '''        title={isTe ? "కాల సర్ప దోష కాలిక్యులేటర్" : isHi ? "काल सर्प दोष कैलकुलेटर" : "Kaal Sarp Dosha Calculator"}
        subtitle={
          isTe
            ? "జన్మ కుండలిలో రాహు-కేతువుల అక్షం ఆధారంగా 12 రకాల కాల సర్ప యోగాలు, పూర్ణ/ఆంశిక ప్రభావం మరియు ప్రామాణిక నివారణోపాయాలు."
            : isHi
            ? "जन्म कुंडली में राहु-केतु अक्ष अनुसार १२ प्रकार के काल सर्प योग, उदित/अनुदित स्थिति, पूर्ण/आंशिक प्रभाव एवं प्रामाणिक शास्त्रीय उपाय।"
            : "Identify all 12 classical Kaal Sarp Yogas, planetary enclosure by Rahu-Ketu, and authentic Vedic remedies."
        }'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("Updated kaal-sarp-dosha/page.tsx")


# 2. manglik-dosha/page.tsx
path = "src/app/kundli/manglik-dosha/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Manglik Dosha Calculator — Check Kuja Dosha, Cancellation Rules & Percentage";
  const description =
    "Check Manglik Dosha (Kuja Dosha / Bhauma Dosha) in your Kundli online. Evaluates Lagna, Moon, and Venus charts with all classical cancellation rules and remedies.";''',
    '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  const title = isTe
    ? "మాంగ్లిక్ దోష కాలిక్యులేటర్ — కుజ దోష విచారం, రద్దు నియమాలు & నివారణలు"
    : isHi
    ? "मांगलिक दोष कैलकुलेटर — कुज दोष जांच, परिहार नियम एवं प्रतिशत"
    : "Manglik Dosha Calculator — Check Kuja Dosha, Cancellation Rules & Percentage";
  const description = isTe
    ? "మీ జన్మ కుండలిలో మాంగ్లిక్ దోషం (కుజ దోషం) ఆన్‌లైన్‌లో పరీక్షించండి. లగ్నం, చంద్రుడు మరియు శుక్రుని స్థానాల విశ్లేషణ, సమగ్ర రద్దు నియమాలు మరియు వైదిక నివారణలు."
    : isHi
    ? "अपनी जन्म कुंडली में मांगलिक दोष (कुज दोष) की ऑनलाइन जांच करें। लग्न, चंद्र और शुक्र से मंगल की स्थिति, शास्त्रीय परिहार नियम एवं सरल उपाय।"
    : "Check Manglik Dosha (Kuja Dosha / Bhauma Dosha) in your Kundli online. Evaluates Lagna, Moon, and Venus charts with all classical cancellation rules and remedies.";'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isHi ? "मांगलिक दोष कैलकुलेटर" : "Manglik Dosha Calculator", PATHS.manglikDosha]
  );''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isTe ? "కుండలి" : isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isTe ? "మాంగ్లిక్ దోష కాలిక్యులేటర్" : isHi ? "मांगलिक दोष कैलकुलेटर" : "Manglik Dosha Calculator", PATHS.manglikDosha]
  );'''
)

code = code.replace(
    '''        title={isHi ? "मांगलिक दोष कैलकुलेटर" : "Manglik Dosha Calculator"}
        subtitle={
          isHi
            ? "लग्न, चंद्र और शुक्र कुंडली से मंगल की स्थिति, मांगलिक तीव्रता, शास्त्रीय परिहार नियम एवं वैवाहिक उपाय।"
            : "Check Kuja Dosha from Lagna, Moon & Venus with Parashari cancellation rules and percentage severity."
        }''',
    '''        title={isTe ? "మాంగ్లిక్ దోష కాలిక్యులేటర్" : isHi ? "मांगलिक दोष कैलकुलेटर" : "Manglik Dosha Calculator"}
        subtitle={
          isTe
            ? "లగ్నం, చంద్రుడు మరియు శుక్రుని నుండి కుజుని స్థితి, మాంగ్లిక్ తీవ్రత, శాస్త్రోక్త రద్దు నియమాలు మరియు వైవాహిక నివారణలు."
            : isHi
            ? "लग्न, चंद्र और शुक्र कुंडली से मंगल की स्थिति, मांगलिक तीव्रता, शास्त्रीय परिहार नियम एवं वैवाहिक उपाय।"
            : "Check Kuja Dosha from Lagna, Moon & Venus with Parashari cancellation rules and percentage severity."
        }'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("Updated manglik-dosha/page.tsx")


# 3. sade-sati/page.tsx
path = "src/app/kundli/sade-sati/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? "शनि साढ़े साती कैलकुलेटर — साढ़े साती के चरण, ढैया एवं प्रामाणिक वैदिक उपाय"
    : "Shani Sade Sati Calculator — 3 Phases, Dhaiya Timeline & Vedic Remedies";

  const description = isHi
    ? "अपनी जन्म चंद्र राशि अनुसार जानें शनि की साढ़े साती चल रही है या नहीं। प्रथम, द्वितीय व तृतीय चरण का सटीक समय, शनि ढैया (कंटक व अष्टम शनि), प्रभाव एवं प्रामाणिक शांति उपाय।"
    : "Check whether you are currently under Shani Sade Sati or Dhaiya based on your natal Moon sign (Janma Rashi). Complete 3-phase timeline and authentic Vedic remedies.";''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isTe
    ? "శని ఏలినాటి శని కాలిక్యులేటర్ — 3 దశలు, అర్ధాష్టమ శని కాలం & వైదిక నివారణలు"
    : isHi
    ? "शनि साढ़े साती कैलकुलेटर — साढ़े साती के चरण, ढैया एवं प्रामाणिक वैदिक उपाय"
    : "Shani Sade Sati Calculator — 3 Phases, Dhaiya Timeline & Vedic Remedies";

  const description = isTe
    ? "మీ జన్మ చంద్ర రాశి ప్రకారం ప్రస్తుతం ఏలినాటి శని (సాడే సాతి) లేదా అర్ధాష్టమ శని నడుస్తుందో లేదో తెలుసుకోండి. 3 దశల ఖచ్చితమైన కాలం, ఫలితాలు మరియు శాస్త్రోక్త నివారణలు."
    : isHi
    ? "अपनी जन्म चंद्र राशि अनुसार जानें शनि की साढ़े साती चल रही है या नहीं। प्रथम, द्वितीय व तृतीय चरण का सटीक समय, शनि ढैया (कंटक व अष्टम शनि), प्रभाव एवं प्रामाणिक शांति उपाय।"
    : "Check whether you are currently under Shani Sade Sati or Dhaiya based on your natal Moon sign (Janma Rashi). Complete 3-phase timeline and authentic Vedic remedies.";'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isHi ? "शनि साढ़े साती कैलकुलेटर" : "Shani Sade Sati Calculator", `${PATHS.kundli}/sade-sati`]
  );''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isTe ? "కుండలి" : isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isTe ? "ఏలినాటి శని కాలిక్యులేటర్" : isHi ? "शनि साढ़े साती कैलकुलेटर" : "Shani Sade Sati Calculator", `${PATHS.kundli}/sade-sati`]
  );'''
)

code = code.replace(
    '''        title={isHi ? "शनि साढ़े साती कैलकुलेटर" : "Shani Sade Sati Calculator"}
        subtitle={
          isHi
            ? "जन्म चंद्र राशि अनुसार जानें साढ़े साती के ३ चरण (उदय, शिखर, अस्त), शनि ढैया एवं प्रामाणिक शास्त्रीय उपाय"
            : "Find your current Sade Sati phase, 7.5-year timeline, Dhaiya periods, and Shani Dev remedies."
        }''',
    '''        title={isTe ? "ఏలినాటి శని కాలిక్యులేటర్" : isHi ? "शनि साढ़े साती कैलकुलेटर" : "Shani Sade Sati Calculator"}
        subtitle={
          isTe
            ? "జన్మ చంద్ర రాశి ప్రకారం ఏలినాటి శని 3 దశలు (ఆరంభ, మధ్యమ, అంత్య), అర్ధాష్టమ శని మరియు శాస్త్రోక్త శని శాంతి పరిహారాలు."
            : isHi
            ? "जन्म चंद्र राशि अनुसार जानें साढ़े साती के ३ चरण (उदय, शिखर, अस्त), शनि ढैया एवं प्रामाणिक शास्त्रीय उपाय"
            : "Find your current Sade Sati phase, 7.5-year timeline, Dhaiya periods, and Shani Dev remedies."
        }'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("Updated sade-sati/page.tsx")


# 4. KundliChartSvg.tsx
path = "src/components/spiritual-tools/KundliChartSvg.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

code = code.replace(
    '''  const rashiNamesHi = [
    "मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या",
    "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"
  ];''',
    '''  const rashiNamesHi = [
    "मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या",
    "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"
  ];
  const rashiNamesTe = [
    "మేషం", "వృషభం", "మిథునం", "కర్కాటకం", "సింహం", "కన్య",
    "తుల", "వృశ్చికం", "ధనుస్సు", "మకరం", "కుంభం", "మీనం"
  ];'''
)

code = code.replace(
    '''{isHi ? "उत्तर भारतीय" : "North Indian"}''',
    '''{isTe ? "ఉత్తర భారత శైలి" : isHi ? "उत्तर भारतीय" : "North Indian"}'''
)

code = code.replace(
    '''{isHi ? "दक्षिण भारतीय" : "South Indian"}''',
    '''{isTe ? "దక్షిణ భారత శైలి" : isHi ? "दक्षिण भारतीय" : "South Indian"}'''
)

code = code.replace(
    '''{isHi ? "पूर्वी भारतीय" : "East Indian"}''',
    '''{isTe ? "తూర్పు భారత శైలి" : isHi ? "पूर्वी भारतीय" : "East Indian"}'''
)

code = code.replace(
    '''{isHi ? "लग्न कुंडली" : "Lagna Kundli"}''',
    '''{isTe ? "లగ్న కుండలి" : isHi ? "लग्न कुंडली" : "Lagna Kundli"}'''
)

code = code.replace(
    '''{isHi ? "चंद्र कुंडली" : "Chandra Kundli"}''',
    '''{isTe ? "చంద్ర కుండలి" : isHi ? "चंद्र कुंडली" : "Chandra Kundli"}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("Updated KundliChartSvg.tsx")


# 5. AshtakavargaTable.tsx
path = "src/components/spiritual-tools/AshtakavargaTable.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

code = code.replace(
    '''{isHi ? "महर्षि पराशर अष्टाकवर्ग तालिका" : "Parashari Ashtakavarga Chart"}''',
    '''{isTe ? "మహర్షి పరాశర అష్టకవర్గ పట్టిక" : isHi ? "महर्षि पराशर अष्टाकवर्ग तालिका" : "Parashari Ashtakavarga Chart"}'''
)

code = code.replace(
    '''{isHi ? "सर्वाष्टाकवर्ग (SAV)" : "Sarvashtakavarga (SAV)"}''',
    '''{isTe ? "సర్వాష్టకవర్గ (SAV)" : isHi ? "सर्वाष्टाकवर्ग (SAV)" : "Sarvashtakavarga (SAV)"}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("Updated AshtakavargaTable.tsx")


# 6. SadeSatiTool.tsx
path = "src/components/spiritual-tools/SadeSatiTool.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

code = code.replace(
    '''{isHi ? "अपनी जन्म राशि (चंद्र राशि) चुनें" : "Select Your Moon Sign (Janma Rashi)"}''',
    '''{isTe ? "మీ జన్మ చంద్ర రాశిని ఎంచుకోండి" : isHi ? "अपनी जन्म राशि (चंद्र राशि) चुनें" : "Select Your Moon Sign (Janma Rashi)"}'''
)

code = code.replace(
    '''            {isHi
              ? "साढ़े साती की गणना सदैव जन्म कुंडली की चंद्र राशि के आधार पर की जाती है।"
              : "Shani Sade Sati is strictly evaluated from the natal Moon sign (Janma Rashi)."}''',
    '''            {isTe
              ? "ఏలినాటి శని (సాడే సాతి) గణన ఎల్లప్పుడూ జన్మ కుండలిలోని చంద్ర రాశి ఆధారంగా మాత్రమే చేయబడుతుంది."
              : isHi
              ? "साढ़े साती की गणना सदैव जन्म कुंडली की चंद्र राशि के आधार पर की जाती है।"
              : "Shani Sade Sati is strictly evaluated from the natal Moon sign (Janma Rashi)."}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("Updated SadeSatiTool.tsx")


# 7. KaalSarpTool.tsx
path = "src/components/spiritual-tools/KaalSarpTool.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("Updated KaalSarpTool.tsx")


# 8. ManglikTool.tsx
path = "src/components/spiritual-tools/ManglikTool.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("Updated ManglikTool.tsx")
