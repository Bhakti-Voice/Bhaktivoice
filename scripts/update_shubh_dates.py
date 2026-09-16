# Update Shubh Dates and Calendar View for Telugu
with open("src/components/muhurat/ShubhDatesCalendarView.tsx", "r", encoding="utf-8") as f:
    cv_code = f.read()

cv_code = cv_code.replace(
    '''  const isHi = locale === "hi";''',
    '''  const isHi = locale === "hi";
  const isTe = locale === "te";
  const TE_MONTHS = ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"];'''
)

cv_code = cv_code.replace(
    '''  const weekDayLabels = isHi
    ? ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];''',
    '''  const weekDayLabels = isTe
    ? ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"]
    : isHi
    ? ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];'''
)

cv_code = cv_code.replace(
    '''{totalShubhDaysInYear} {isHi ? "शुभ दिन" : "Auspicious Days"}''',
    '''{totalShubhDaysInYear} {isTe ? "శుభ దినాలు" : isHi ? "शुभ दिन" : "Auspicious Days"}'''
)

cv_code = cv_code.replace(
    '''{isHi ? `वर्ष ${selectedYear} में कुल सर्वोत्तम मुहूर्त` : `Total Best Muhurat Days in ${selectedYear}`}''',
    '''{isTe ? `${selectedYear} సంవత్సరంలో మొత్తం ఉత్తమ ముహూర్త దినాలు` : isHi ? `वर्ष ${selectedYear} में कुल सर्वोत्तम मुहूर्त` : `Total Best Muhurat Days in ${selectedYear}`}'''
)

cv_code = cv_code.replace(
    '''{activeCalendar.shubhDaysCount} {isHi ? "शुभ दिन" : "Shubh Days"}''',
    '''{activeCalendar.shubhDaysCount} {isTe ? "శుభ దినాలు" : isHi ? "शुभ दिन" : "Shubh Days"}'''
)

cv_code = cv_code.replace(
    '''{isHi ? `${activeCalendar.monthNameHi} ${selectedYear} में` : `In ${activeCalendar.monthNameEn} ${selectedYear}`}''',
    '''{isTe ? `${TE_MONTHS[activeCalendar.month - 1]} ${selectedYear} లో` : isHi ? `${activeCalendar.monthNameHi} ${selectedYear} में` : `In ${activeCalendar.monthNameEn} ${selectedYear}`}'''
)

cv_code = cv_code.replace(
    '''12 {isHi ? "महीने" : "Months"}''',
    '''12 {isTe ? "నెలలు" : isHi ? "महीने" : "Months"}'''
)

cv_code = cv_code.replace(
    '''{isHi ? "पंचांग आधारित संपूर्ण वार्षिक चक्र" : "Complete Full-Year Panchang Grid"}''',
    '''{isTe ? "పంచాంగ ఆధారిత సంపూర్ణ వార్షిక చక్రం" : isHi ? "पंचांग आधारित संपूर्ण वार्षिक चक्र" : "Complete Full-Year Panchang Grid"}'''
)

cv_code = cv_code.replace(
    '''<span>{isHi ? cal.monthNameHi : cal.monthNameEn}</span>''',
    '''<span>{isTe ? TE_MONTHS[cal.month - 1] : isHi ? cal.monthNameHi : cal.monthNameEn}</span>'''
)

cv_code = cv_code.replace(
    '''                {isHi
                  ? `${activeCalendar.monthNameHi} ${selectedYear} कैलेंडर`
                  : `${activeCalendar.monthNameEn} ${selectedYear} Calendar`}''',
    '''                {isTe
                  ? `${TE_MONTHS[activeCalendar.month - 1]} ${selectedYear} క్యాలెండర్`
                  : isHi
                  ? `${activeCalendar.monthNameHi} ${selectedYear} कैलेंडर`
                  : `${activeCalendar.monthNameEn} ${selectedYear} Calendar`}'''
)

with open("src/components/muhurat/ShubhDatesCalendarView.tsx", "w", encoding="utf-8") as f:
    f.write(cv_code)
print("Updated ShubhDatesCalendarView.tsx")


# Update src/app/shubh-dates/[slug]/page.tsx
with open("src/app/shubh-dates/[slug]/page.tsx", "r", encoding="utf-8") as f:
    p_code = f.read()

te_dict = '''
const TE_TITLES: Record<ShubhDatesCategory, { title: string; metaTitle: string; metaDesc: string; intro: string; deity: string; faqs: { q: string; a: string }[] }> = {
  "vehicle-purchase": {
    title: "వాహన కొనుగోలు శుభ ముహూర్తాలు 2026 (కార్ & బైక్)",
    metaTitle: "వాహన కొనుగోలు శుభ ముహూర్తాలు 2026 — కార్ & బైక్ కొనడానికి శుభ దినాలు, తిథులు & పంచాంగం",
    metaDesc: "2026 సంవత్సరంలో కొత్త కార్, బైక్ లేదా ఏదైనా వాహనం కొనడానికి ప్రామాణిక శుభ ముహూర్తాల క్యాలెండర్. తిథి, నక్షత్రం, చోఘడియా మరియు శాస్త్రోక్త నియమాలతో సహా.",
    intro: "కొత్త వాహనం కొనుగోలు చేయడం జీవితంలో ఒక ముఖ్యమైన మైలురాయి. వైదిక జ్యోతిష్యంలో వాహనానికి కారక గ్రహం శుక్రుడు (సుఖసంతోషాలు) మరియు కుజుడు (యాంత్రిక శక్తి). శాస్త్ర సమ్మతమైన శుభ ముహూర్తంలో వాహనం కొనుగోలు చేయడం వల్ల ప్రయాణాలు సురక్షితంగా, శుభప్రదంగా సాగుతాయి.",
    deity: "శ్రీ గణేశుడు మరియు దేవశిల్పి విశ్వకర్మ",
    faqs: [
      { q: "వాహనం డెలివరీ తీసుకోవడానికి ఏ రోజులు అత్యుత్తమం?", a: "ఆదివారం, సోమవారం, బుధవారం, గురువారం మరియు శుక్రవారాలు వాహన డెలివరీకి అత్యంత శుభప్రదమైనవి. మంగళవారం మరియు శనివారాలు నివారించడం మంచిది." },
      { q: "వాహన కొనుగోలుకు ఏ నక్షత్రాలు అనుకూలం?", a: "అశ్విని, రోహిణి, మృగశిర, పునర్వసు, పుష్యమి, హస్త, చిత్త, స్వాతి, అనూరాధ, శ్రవణం మరియు రేవతి నక్షత్రాలు అత్యంత శుభప్రదం." }
    ]
  },
  "property-purchase": {
    title: "ఆస్తి & భూమి కొనుగోలు శుభ ముహూర్తాలు 2026",
    metaTitle: "ఆస్తి & ప్లాట్ రిజిస్ట్రేషన్ శుభ ముహూర్తాలు 2026 — ఇల్లు, భూమి కొనుగోలు శుభ దినాలు",
    metaDesc: "2026 లో ప్లాట్, ఫ్లాట్, భూమి రిజిస్ట్రేషన్ మరియు అగ్రిమెంట్ కొరకు శాస్త్రోక్త శుభ ముహూర్తాల క్యాలెండర్.",
    intro: "భూమి, ఇల్లు లేదా స్థిరాస్తిని కొనుగోలు చేయడం శాశ్వత భద్రత మరియు శ్రేయస్సుకు చిహ్నం. భూమిపుత్రుడైన కుజుడు మరియు స్థిర లక్ష్మి అనుగ్రహం కోసం శుభ ముహూర్తంలో రిజిస్ట్రేషన్ చేయడం ఉత్తమం.",
    deity: "భూమాత & కుజ భగవానుడు",
    faqs: [
      { q: "రిజిస్ట్రేషన్ మరియు అగ్రిమెంట్ చేయడానికి ఏ తిథులు శ్రేష్ఠం?", a: "శుక్ల పక్ష విదియ, తదియ, పంచమి, సప్తమి, దశమి, ఏకాదశి మరియు త్రయోదశి తిథులు రిజిస్ట్రేషన్‌కు అత్యంత శుభప్రదం." }
    ]
  },
  "griha-pravesh": {
    title: "గృహప్రవేశం శుభ ముహూర్తాలు 2026",
    metaTitle: "గృహప్రవేశం శుభ ముహూర్తాలు 2026 — నూతన గృహ ప్రవేశ శుభ దినాలు & వాస్తు శాంతి",
    metaDesc: "2026 సంవత్సరంలో నూతన గృహప్రవేశం మరియు వాస్తు పూజ కొరకు ఉత్తమ శుభ ముహూర్తాల క్యాలెండర్.",
    intro: "నూతన గృహంలోకి అడుగుపెట్టడం కుటుంబంలో సుఖసంతోషాలు, ఆయురారోగ్యాలు నింపే పవిత్ర ఘట్టం. శుభ లగ్నంలో వాస్తు శాంతి చేసి గృహప్రవేశం చేయడం శ్రేయస్కరం.",
    deity: "వాస్తు పురుషుడు & శ్రీమహావిష్ణువు",
    faqs: [
      { q: "గృహప్రవేశానికి ఏ మాసాలు అత్యంత శుభప్రదం?", a: "వైశాఖం, జ్యేష్ఠం, మాఘం మరియు ఫాల్గుణ మాసాలు నూతన గృహప్రవేశానికి అత్యంత శ్రేష్ఠమైనవి. చాతుర్మాసం, ఖర్మాసాల్లో గృహప్రవేశం నిషిద్ధం." }
    ]
  },
  "vivah-muhurat": {
    title: "వివాహ శుభ ముహూర్తాలు 2026",
    metaTitle: "వివాహ శుభ ముహూర్తాలు 2026 — పెళ్లి ముహూర్తాలు, లగ్న పట్టిక & శుభ దినాలు",
    metaDesc: "2026 సంవత్సరపు వివాహ ముహూర్తాల పూర్తి క్యాలెండర్. శుద్ధ తిథులు, నక్షత్రాలు మరియు గురు-శుక్ర అస్తంగత విచారంతో కూడిన ప్రామాణిక పట్టిక.",
    intro: "వివాహం అనేది సప్తపది ద్వారా రెండు ఆత్మల పవిత్ర కలయిక. గురు, శుక్రుల బలము మరియు శుద్ధ లగ్నంలో వివాహం జరిపించడం దంపతుల దీర్ఘాయుష్షుకు, దాంపత్య సుఖానికి మూలం.",
    deity: "శ్రీ లక్ష్మీ నారాయణులు & ఉమా మహేశ్వరులు",
    faqs: [
      { q: "వివాహానికి ఏ కాలాలు నిషిద్ధం?", a: "దేవశయని చాతుర్మాసం (ఆషాఢ శుద్ధ ఏకాదశి నుండి కార్తీక శుద్ధ ఏకాదశి వరకు), ఖర్మాసం (సూర్యుడు ధనుస్సు, మీన రాశుల్లో ఉన్నప్పుడు), మరియు గురు లేదా శుక్ర అస్తమయ సమయాలలో వివాహాలు నిషిద్ధం." }
    ]
  },
  naamkaran: {
    title: "నామకరణం శుభ ముహూర్తాలు 2026",
    metaTitle: "నామకరణం శుభ ముహూర్తాలు 2026 — శిశువు నామకరణ సంస్కార శుభ దినాలు",
    metaDesc: "శిశువుకు నామకరణం చేయడానికి 2026 లో గల శుభ ముహూర్తాలు, తిథులు మరియు అనుకూల నక్షత్రాల క్యాలెండర్.",
    intro: "శిశువుకు పవిత్ర నామకరణ సంస్కారం నిర్వహించడం ద్వారా ఆయుష్షు, వర్చస్సు మరియు కీర్తి పెరుగుతాయి.",
    deity: "సరస్వతీ దేవి & కులదైవం",
    faqs: [
      { q: "నామకరణం ఎప్పుడు చేయాలి?", a: "శిశువు జన్మించిన 10వ, 11వ, 12వ లేదా 16వ రోజున నామకరణ సంస్కారం చేయడం శాస్త్ర సమ్మతం." }
    ]
  },
  mundan: {
    title: "పుట్టువెండ్రుకలు / ముండన్ శుభ ముహూర్తాలు 2026",
    metaTitle: "పుట్టువెండ్రుకలు తీయుటకు శుభ ముహూర్తాలు 2026 — చౌల సంస్కార శుభ దినాలు",
    metaDesc: "పిల్లల పుట్టువెండ్రుకలు తీయడానికి 2026 లో ఉత్తమ శుభ ముహూర్తాలు మరియు తిథుల పట్టిక.",
    intro: "చౌల కర్మ (పుట్టువెండ్రుకలు తీయడం) ద్వారా గర్భస్థ అశుద్ధత తొలగిపోయి మేధాశక్తి, ఆరోగ్యం వృద్ధి చెందుతాయి.",
    deity: "కులదైవం & శ్రీ వేంకటేశ్వర స్వామి",
    faqs: [
      { q: "పుట్టువెండ్రుకలు ఏ వయస్సులో తీయాలి?", a: "మొదటి సంవత్సరం లేదా మూడవ సంవత్సరంలో ఉత్తరాయణ పుణ్యకాలంలో చౌల సంస్కారం చేయడం శ్రేష్ఠం." }
    ]
  },
  "business-opening": {
    title: "నూతన వ్యాపార ప్రారంభ శుభ ముహూర్తాలు 2026",
    metaTitle: "నూతన దుకాణం, ఆఫీస్ & వ్యాపార ప్రారంభ శుభ ముహూర్తాలు 2026",
    metaDesc: "షాప్ ఓపెనింగ్, నూతన వ్యాపారం మరియు కార్యాలయ ప్రారంభానికి 2026 లో అనుకూలమైన శుభ ముహూర్తాలు.",
    intro: "నూతన వ్యాపారం ప్రారంభించేటప్పుడు శ్రీ మహాలక్ష్మి మరియు గణపతి అనుగ్రహంతో లాభాలు, వృద్ధి చేకూరుతాయి.",
    deity: "శ్రీ మహాలక్ష్మి & కుబేర స్వామి",
    faqs: [
      { q: "షాప్ ఓపెనింగ్‌కు ఏ లగ్నం శ్రేష్ఠం?", a: "వృషభం, సింహం, వృశ్చికం, కుంభం వంటి స్థిర లగ్నాలు వ్యాపార స్థిరత్వానికి అత్యంత శుభప్రదం." }
    ]
  },
  "gold-buying": {
    title: "బంగారం కొనుగోలు శుభ ముహూర్తాలు 2026 (పుష్య నక్షత్రం)",
    metaTitle: "బంగారం, ఆభరణాలు కొనుగోలు చేయడానికి శుభ ముహూర్తాలు 2026",
    metaDesc: "గురు పుష్య యోగం, రవి పుష్య యోగం, ధనత్రయోదశి మరియు అక్షయ తృతీయలలో బంగారం కొనుగోలు ముహూర్తాలు.",
    intro: "బంగారం శ్రీ మహాలక్ష్మి స్వరూపం. గురు పుష్య యోగంలో లేదా శుభ తిథులలో స్వర్ణం కొనుగోలు చేయడం అక్షయ సంపదకు మూలం.",
    deity: "శ్రీ మహాలక్ష్మి దేవి",
    faqs: [
      { q: "బంగారం కొనడానికి ఏ నక్షత్రం అత్యుత్తమం?", a: "పుష్య నక్షత్రం (గురు పుష్యం, రవి పుష్యం) మరియు రోహిణి, హస్త, స్వాతి నక్షత్రాలు బంగారం కొనడానికి అత్యంత పవిత్రమైనవి." }
    ]
  },
  vidyarambha: {
    title: "విద్యాభ్యాసం / అక్షరాభ్యాసం శుభ ముహూర్తాలు 2026",
    metaTitle: "అక్షరాభ్యాసం శుభ ముహూర్తాలు 2026 — విద్యా ప్రారంభ శుభ దినాలు",
    metaDesc: "పిల్లల అక్షరాభ్యాసం మరియు విద్యా ప్రారంభం కొరకు 2026 లో గల సరస్వతీ యోగ శుభ ముహూర్తాలు.",
    intro: "శిశువుకు తొలిసారిగా అక్షరాలు దిద్దించడం సరస్వతీ దేవి కటాక్షాన్ని, ఉన్నత జ్ఞానాన్ని ప్రసాదిస్తుంది.",
    deity: "జ్ఞాన సరస్వతీ దేవి & హయగ్రీవ స్వామి",
    faqs: [
      { q: "అక్షరాభ్యాసానికి ఏ రోజులు పవిత్రమైనవి?", a: "వసంత పంచమి, విజయదశమి మరియు గురువారాలు అక్షరాభ్యాసానికి అత్యంత శ్రేష్ఠమైనవి." }
    ]
  },
  karnavedha: {
    title: "కర్ణవేధ (చెవులు కుట్టించుట) శుభ ముహూర్తాలు 2026",
    metaTitle: "కర్ణవేధ సంస్కార శుభ ముహూర్తాలు 2026 — చెవులు కుట్టించడానికి శుభ దినాలు",
    metaDesc: "చిన్నారులకు చెవులు కుట్టించడానికి 2026 లో శాస్త్రోక్త శుభ ముహూర్తాలు మరియు తిథుల పట్టిక.",
    intro: "కర్ణవేధ సంస్కారం ద్వారా ఆక్యుపంక్చర్ నాడీ శుద్ధి జరిగి మేధాశక్తి, కంటి చూపు మరియు రోగనిరోధక శక్తి పెరుగుతాయి.",
    deity: "సూర్య భగవానుడు & ధన్వంతరి",
    faqs: [
      { q: "కర్ణవేధ ఏ సమయంలో చేయాలి?", a: "ఉదయం పూట సూర్యకాంతి ప్రకాశిస్తున్న సమయంలో శుక్ల పక్ష శుభ తిథులలో కర్ణవేధ చేయడం శ్రేష్ఠం." }
    ]
  }
};
'''

if "TE_TITLES" not in p_code:
    p_code = te_dict + "\n" + p_code

p_code = p_code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const config = SHUBH_CATEGORIES_CONFIG[slug as ShubhDatesCategory];

  return localizedMetadata({
    title: isHi ? config.metaTitleHi : config.metaTitleEn,
    description: isHi ? config.metaDescHi : config.metaDescEn,''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const config = SHUBH_CATEGORIES_CONFIG[slug as ShubhDatesCategory];
  const teConfig = TE_TITLES[slug as ShubhDatesCategory];

  return localizedMetadata({
    title: isTe && teConfig ? teConfig.metaTitle : isHi ? config.metaTitleHi : config.metaTitleEn,
    description: isTe && teConfig ? teConfig.metaDesc : isHi ? config.metaDescHi : config.metaDescEn,'''
)

p_code = p_code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const category = slug as ShubhDatesCategory;
  const config = SHUBH_CATEGORIES_CONFIG[category];

  const year = 2026;
  const calendars = calculateShubhDatesYear(year, category);

  const crumbs = localizedCrumbs(
    isHi ? "मुख्य पृष्ठ" : "Home",
    [isHi ? "शुभ मुहूर्त" : "Shubh Muhurat", PATHS.muhurat],
    [isHi ? config.titleHi : config.titleEn, PATHS.shubhDates(slug)]
  );

  const faqs = (isHi ? config.faqsHi : config.faqsEn).map((f) => ({''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const category = slug as ShubhDatesCategory;
  const config = SHUBH_CATEGORIES_CONFIG[category];
  const teConfig = TE_TITLES[category];

  const year = 2026;
  const calendars = calculateShubhDatesYear(year, category);

  const crumbs = localizedCrumbs(
    isTe ? "హోమ్" : isHi ? "मुख्य पृष्ठ" : "Home",
    [isTe ? "శుభ ముహూర్తాలు" : isHi ? "शुभ मुहूर्त" : "Shubh Muhurat", PATHS.muhurat],
    [isTe && teConfig ? teConfig.title : isHi ? config.titleHi : config.titleEn, PATHS.shubhDates(slug)]
  );

  const rawFaqs = isTe && teConfig ? teConfig.faqs : (isHi ? config.faqsHi : config.faqsEn);
  const faqs = rawFaqs.map((f) => ({'''
)

p_code = p_code.replace(
    '''        title={isHi ? config.titleHi : config.titleEn}
        subtitle={isHi ? config.introHi : config.introEn}''',
    '''        title={isTe && teConfig ? teConfig.title : isHi ? config.titleHi : config.titleEn}
        subtitle={isTe && teConfig ? teConfig.intro : isHi ? config.introHi : config.introEn}'''
)

p_code = p_code.replace(
    '''              {isHi ? "आराध्य देवता: " : "Presiding Deity: "}
              <strong>{isHi ? config.deityHi : config.deityEn}</strong>''',
    '''              {isTe ? "ఆరాధ్య దైవం: " : isHi ? "आराध्य देवता: " : "Presiding Deity: "}
              <strong>{isTe && teConfig ? teConfig.deity : isHi ? config.deityHi : config.deityEn}</strong>'''
)

p_code = p_code.replace(
    '''              {isHi ? "शुद्ध वैदिक पंचांग गणना (दृक सिद्धांत)" : "Drik Ganita Astrological Standards"}''',
    '''              {isTe ? "శుద్ధ వైదిక పంచాంగ గణన (దృక్ సిద్ధాంతం)" : isHi ? "शुद्ध वैदिक पंचांग गणना (दृक सिद्धांत)" : "Drik Ganita Astrological Standards"}'''
)

with open("src/app/shubh-dates/[slug]/page.tsx", "w", encoding="utf-8") as f:
    f.write(p_code)
print("Updated shubh-dates/[slug]/page.tsx")
