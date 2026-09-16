# Script to update Panchang & Astrology pages and views for Telugu
import re

# ==============================================================================
# 1. src/app/panchang/graha-sthiti/page.tsx
# ==============================================================================
path = "src/app/panchang/graha-sthiti/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

te_faqs = '''const GRAHA_STHITI_FAQS_TE = [
  {
    question: "గ్రహ స్థితి (Graha Sthiti) అంటే ఏమిటి?",
    answer:
      "దైనందిన గ్రహ స్థితి అనేది ఆకాశంలో నిర్దిష్ట సమయంలో (ఉదయం 05:30 లేదా మధ్యాహ్నం) సూర్యుడు, చంద్రుడు, కుజుడు, బుధుడు, గురువు, శుక్రుడు, శని, రాహువు మరియు కేతువుల నిరయన (Sidereal) రాశులు మరియు ఖచ్చితమైన అంశలు (డిగ్రీలు, నిమిషాలు, సెకన్లు) తెలిపే శాస్త్రీయ వివరణ.",
  },
  {
    question: "వక్రీ గ్రహం (Retrograde - R) యొక్క జ్యోతిష్య ప్రాముఖ్యత ఏమిటి?",
    answer:
      "వక్రీ గతి అంటే భూమికి సంబంధించి గ్రహం వెనుకకు ప్రయాణిస్తున్నట్లు కనిపించడం. వైదిక జ్యోతిష్యంలో వక్రీ గ్రహాలు 'చేష్టా బలం' కలిగినవిగా పరిగణించబడతాయి. ఇవి గత కర్మల పునఃసమీక్ష మరియు ఊహించని తీవ్రమైన ఫలితాలకు సంకేతం.",
  },
  {
    question: "గ్రహ అస్తమయం (Combustion) ఎప్పుడు జరుగుతుంది?",
    answer:
      "ఏదైనా గ్రహం సూర్యునికి అత్యంత సమీపంలోకి వచ్చినప్పుడు (ఉదా. బుధుడు 12°, శుక్రుడు 8°-10°, కుజుడు 17°), సూర్యుని తీవ్రమైన కాంతి కిరణాల ప్రభావం వల్ల ఆ గ్రహం అస్తమిస్తుంది. అస్తమించిన గ్రహం యొక్క బాహ్య భౌతిక ఫలితాలు బలహీనపడతాయి.",
  },
  {
    question: "భక్తి వాయిస్‌లో ఏ అయనాంశను ఉపయోగించారు?",
    answer:
      "మేము భారత ప్రభుత్వం సిఫార్సు చేసిన ప్రామాణిక లాహిరి అయనాంశ (Chitrapaksha Lahiri Ayanamsha)ను ఉపయోగిస్తున్నాము, ఇది అంతర్జాతీయ నాసా JPL ఖగోళ గణనలకు అనుగుణంగా అత్యంత ఖచ్చితమైన ఫలితాలను ఇస్తుంది.",
  },
];
'''

if "GRAHA_STHITI_FAQS_TE" not in code:
    code = te_faqs + "\n" + code

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isTe
    ? "దైనందిన గ్రహ స్థితి (Graha Sthiti Ephemeris) — 9 వైదిక గ్రహాలు, రాశి అంశలు, వక్రీ & అస్తంగత వివరాలు"
    : isHi'''
)

code = code.replace(
    '''  const description = isHi
    ? "प्रामाणिक लाहिरी (चित्रापक्ष) अयनांश आधारित दैनिक ९ वैदिक ग्रहों एवं आधुनिक ग्रहों की स्पष्ट स्थिति। राशि, अंश, कला, विकला, नक्षत्र पाद, वक्री (R) व अस्त (Combust) गति का सम्पूर्ण विवरण।"''',
    '''  const description = isTe
    ? "లాహిరి (చిత్రపక్ష) అయనాంశ ఆధారిత దైనందిన 9 వైదిక నవగ్రహాల ఖచ్చితమైన స్థితి. రాశి, డిగ్రీలు, కళలు, వికళలు, నక్షత్ర పాదం, వక్రీ (R) మరియు అస్తంగత (Combust) గతుల సంపూర్ణ నివేదిక."
    : isHi
    ? "प्रामाणिक लाहिरी (चित्रापक्ष) अयनांश आधारित दैनिक ९ वैदिक ग्रहों एवं आधुनिक ग्रहों की स्पष्ट स्थिति। राशि, अंश, कला, विकला, नक्षत्र पाद, वक्री (R) व अस्त (Combust) गति का सम्पूर्ण विवरण।"'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isHi ? "पंचांग" : "Panchang", PATHS.panchang],
    [isHi ? "दैनिक ग्रह स्थिति" : "Planetary Ephemeris", `${PATHS.panchang}/graha-sthiti`]
  );

  const faqs = isHi''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],
    [isTe ? "దైనందిన గ్రహ స్థితి" : isHi ? "दैनिक ग्रह स्थिति" : "Planetary Ephemeris", `${PATHS.panchang}/graha-sthiti`]
  );

  const faqs = isTe ? GRAHA_STHITI_FAQS_TE : isHi'''
)

code = code.replace(
    '''  const pageTitle = isHi
    ? "दैनिक ग्रह स्थिति (Graha Sthiti Ephemeris)"
    : "Daily Planetary Ephemeris (Graha Sthiti)";

  const subtitle = isHi
    ? "लाहिरी अयनांश पर आधारित ९ वैदिक ग्रह, राशि अंश-कला, नक्षत्र पाद, वक्री व अस्त गति"
    : "High-precision Sidereal Lahiri positions for 9 Vedic Grahas with Retrograde & Combustion status";''',
    '''  const pageTitle = isTe
    ? "దైనందిన గ్రహ స్థితి (Graha Sthiti Ephemeris)"
    : isHi
    ? "दैनिक ग्रह स्थिति (Graha Sthiti Ephemeris)"
    : "Daily Planetary Ephemeris (Graha Sthiti)";

  const subtitle = isTe
    ? "లాహిరి అయనాంశం ఆధారంగా 9 వైదిక గ్రహాలు, రాశి డిగ్రీలు, నక్షత్ర పాదం, వక్రీ మరియు అస్తంగత గతులు"
    : isHi
    ? "लाहिरी अयनांश पर आधारित ९ वैदिक ग्रह, राशि अंश-कला, नक्षत्र पाद, वक्री व अस्त गति"
    : "High-precision Sidereal Lahiri positions for 9 Vedic Grahas with Retrograde & Combustion status";'''
)

code = code.replace(
    '''<FaqList faqs={faqs} title={isHi ? "ग्रह स्थिति से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? "గ్రహ స్థితికి సంబంధించిన తరచుగా అడిగే ప్రశ్నలు" : isHi ? "ग्रह स्थिति से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("1. Updated src/app/panchang/graha-sthiti/page.tsx")


# ==============================================================================
# 2. src/components/panchang/GrahaSthitiPageView.tsx
# ==============================================================================
path = "src/components/panchang/GrahaSthitiPageView.tsx"
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
    '''title={isHi ? "पिछला दिन" : "Previous Day"}''',
    '''title={isTe ? "మునుపటి రోజు" : isHi ? "पिछला दिन" : "Previous Day"}'''
)

code = code.replace(
    '''title={isHi ? "अगला दिन" : "Next Day"}''',
    '''title={isTe ? "తరువాతి రోజు" : isHi ? "अगला दिन" : "Next Day"}'''
)

code = code.replace(
    '''{isHi ? "आज" : "Today"}''',
    '''{isTe ? "నేడు" : isHi ? "आज" : "Today"}'''
)

code = code.replace(
    '''<CityPickerButton city={city} onCityChange={setCity} isHi={isHi} />''',
    '''<CityPickerButton city={city} onCityChange={setCity} isHi={isHi} isTe={isTe} />'''
)

code = code.replace(
    '''<GrahaSthitiTable ephemeris={ephemeris} isHi={isHi} />''',
    '''<GrahaSthitiTable ephemeris={ephemeris} isHi={isHi} isTe={isTe} />'''
)

code = code.replace(
    '''<span>{isHi ? "वक्री ग्रह (Retrograde - R)" : "Retrograde Motion (Vakri)"}</span>''',
    '''<span>{isTe ? "వక్రీ గ్రహాలు (Retrograde - R)" : isHi ? "वक्री ग्रह (Retrograde - R)" : "Retrograde Motion (Vakri)"}</span>'''
)

code = code.replace(
    '''            {isHi
              ? "पृथ्वी के सापेक्ष विपरीत दिशा में चलने का आभास। ज्योतिषीय मान्यता के अनुसार वक्री ग्रह अत्यधिक बलवान (चेष्टा बली) होकर चेष्टा और पुनरावलोकन का फल देते हैं।"
              : "Apparent backward motion of a planet as viewed from Earth. In Vedic astrology, retrograde planets attain Chesta Bala (motional strength) with intensified karma."}''',
    '''            {isTe
              ? "భూమికి సాపేక్షంగా విరుద్ధ దిశలో తిరుగుతున్నట్లు కనిపించడం. వైదిక జ్యోతిష్యం ప్రకారం వక్రీ గ్రహాలు చేష్టా బలం కలిగి ఉండి విశేష కర్మ ఫలితాలను ఇస్తాయి."
              : isHi
              ? "पृथ्वी के सापेक्ष विपरीत दिशा में चलने का आभास। ज्योतिषीय मान्यता के अनुसार वक्री ग्रह अत्यधिक बलवान (चेष्टा बली) होकर चेष्टा और पुनरावलोकन का फल देते हैं।"
              : "Apparent backward motion of a planet as viewed from Earth. In Vedic astrology, retrograde planets attain Chesta Bala (motional strength) with intensified karma."}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("2. Updated src/components/panchang/GrahaSthitiPageView.tsx")


# ==============================================================================
# 3. src/components/panchang/GrahaSthitiTable.tsx
# ==============================================================================
path = "src/components/panchang/GrahaSthitiTable.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''export interface GrahaSthitiTableProps {
  ephemeris: DailyEphemerisReport;
  isHi?: boolean;
  className?: string;
  showAllPlanetsDefault?: boolean;
}''',
    '''export interface GrahaSthitiTableProps {
  ephemeris: DailyEphemerisReport;
  isHi?: boolean;
  isTe?: boolean;
  className?: string;
  showAllPlanetsDefault?: boolean;
}'''
)

code = code.replace(
    '''export function GrahaSthitiTable({
  ephemeris,
  isHi = false,
  className = "",
  showAllPlanetsDefault = false,
}: GrahaSthitiTableProps) {''',
    '''export function GrahaSthitiTable({
  ephemeris,
  isHi = false,
  isTe = false,
  className = "",
  showAllPlanetsDefault = false,
}: GrahaSthitiTableProps) {'''
)

code = code.replace(
    '''{isHi ? "दैनिक ग्रह स्थिति (Planetary Ephemeris)" : "Daily Planetary Ephemeris (Graha Sthiti)"}''',
    '''{isTe ? "దైనందిన గ్రహ స్థితి (Planetary Ephemeris)" : isHi ? "दैनिक ग्रह स्थिति (Planetary Ephemeris)" : "Daily Planetary Ephemeris (Graha Sthiti)"}'''
)

code = code.replace(
    '''              {isHi
                ? `अयनंश: ${ephemeris.ayanamsaFormatted} • दैनिक गति, वक्र एवं अस्त स्थिति`
                : `Ayanamsa: ${ephemeris.ayanamsaFormatted} • Exact degrees, Vakri (R) & Combust`}''',
    '''              {isTe
                ? `అయనాంశం: ${ephemeris.ayanamsaFormatted} • దైనందిన గతి, వక్ర & అస్తంగత స్థితి`
                : isHi
                ? `अयनंश: ${ephemeris.ayanamsaFormatted} • दैनिक गति, वक्र एवं अस्त स्थिति`
                : `Ayanamsa: ${ephemeris.ayanamsaFormatted} • Exact degrees, Vakri (R) & Combust`}'''
)

code = code.replace(
    '''            {showOuterPlanets
              ? isHi ? "केवल नवग्रह (9 Grahas)" : "Show 9 Grahas Only"
              : isHi ? "सभी ग्रह (+अरुण, वरुण, यम)" : "Show Outer Planets (+Uranus, Neptune)"}''',
    '''            {showOuterPlanets
              ? isTe ? "కేవలం నవగ్రహాలు (9 Grahas)" : isHi ? "केवल नवग्रह (9 Grahas)" : "Show 9 Grahas Only"
              : isTe ? "అన్ని గ్రహాలు (+యూరేనస్, నెప్ట్యూన్)" : isHi ? "सभी ग्रह (+अरुण, वरुण, यम)" : "Show Outer Planets (+Uranus, Neptune)"}'''
)

code = code.replace(
    '''              <th className="py-3 px-4">{isHi ? "ग्रह (Planet)" : "Planet"}</th>
              <th className="py-3 px-4">{isHi ? "राशि (Zodiac Sign)" : "Rashi (Sign)"}</th>
              <th className="py-3 px-4 font-mono">{isHi ? "अंश (Degrees)" : "Degrees in Sign"}</th>
              <th className="py-3 px-4">{isHi ? "नक्षत्र एवं पाद" : "Nakshatra & Pada"}</th>
              <th className="py-3 px-4">{isHi ? "गति (Speed)" : "Speed (Deg/Day)"}</th>
              <th className="py-3 px-4">{isHi ? "स्थिति (Status)" : "Motion & Combustion"}</th>''',
    '''              <th className="py-3 px-4">{isTe ? "గ్రహం (Planet)" : isHi ? "ग्रह (Planet)" : "Planet"}</th>
              <th className="py-3 px-4">{isTe ? "రాశి (Zodiac Sign)" : isHi ? "राशि (Zodiac Sign)" : "Rashi (Sign)"}</th>
              <th className="py-3 px-4 font-mono">{isTe ? "అంశలు (Degrees)" : isHi ? "अंश (Degrees)" : "Degrees in Sign"}</th>
              <th className="py-3 px-4">{isTe ? "నక్షత్రం & పాదం" : isHi ? "नक्षत्र एवं पाद" : "Nakshatra & Pada"}</th>
              <th className="py-3 px-4">{isTe ? "గతి (Speed)" : isHi ? "गति (Speed)" : "Speed (Deg/Day)"}</th>
              <th className="py-3 px-4">{isTe ? "స్థితి (Status)" : isHi ? "स्थिति (Status)" : "Motion & Combustion"}</th>'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("3. Updated src/components/panchang/GrahaSthitiTable.tsx")


# ==============================================================================
# 4. src/app/panchang/tarabalam/page.tsx
# ==============================================================================
path = "src/app/panchang/tarabalam/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

te_tarabalam_faqs = '''const TARABALAM_FAQS_TE = [
  {
    question: "తారాబలం (Tarabalam) అంటే ఏమిటి?",
    answer:
      "తారాబలం అనేది ఒకరి జన్మ నక్షత్రం నుండి ప్రస్తుత గోచార నక్షత్రం వరకు గల దూరాన్ని లెక్కించే ప్రక్రియ. ఇది 9 తారల (జన్మ, సంపత్, విపత్, క్షేమ, ప్రత్యక్, సాధన, నైధన, మిత్ర, పరమ మిత్ర) చక్రంలో తిరుగుతుంది. సంపత్, క్షేమ, సాధన, మిత్ర మరియు పరమ మిత్ర తారలు అత్యంత శుభప్రదమైనవి.",
  },
  {
    question: "చంద్రబలం (Chandrabalam) అంటే ఏమిటి మరియు అష్టమ చంద్ర దోషం ఎందుకు పరిహరించాలి?",
    answer:
      "చంద్రబలం అంటే జన్మ రాశి నుండి గోచార చంద్రుని స్థానాన్ని గణించడం. 1, 3, 6, 7, 10, 11 వ స్థానాల్లో చంద్రుడు శుభ ఫలితాలనిస్తాడు. జన్మ రాశి నుండి 8వ స్థానంలో చంద్రుడు ఉన్నప్పుడు 'అష్టమ చంద్ర దోషం' అంటారు, ఇది మానసిక అశాంతిని, పనుల్లో ఆటంకాలను కలిగిస్తుంది.",
  },
  {
    question: "తారాబలం అశుభంగా ఉన్నప్పుడు ఏ పరిహారాలు చేయాలి?",
    answer:
      "విపత్ తారలో బెల్లం దానం, ప్రత్యక్ తారలో సైంధవ లవణం (ఉప్పు) దానం, మరియు నైధన తారలో నువ్వుల దానం చేయడం లేదా మహామృత్యుంజయ మంత్ర జపం చేయడం వల్ల దోష శాంతి కలుగుతుంది.",
  },
];
'''

if "TARABALAM_FAQS_TE" not in code:
    code = te_tarabalam_faqs + "\n" + code

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isTe
    ? "దైనందిన తారాబలం & చంద్రబలం కాలిక్యులేటర్ — నేటి రోజు మీకు ఎలా ఉంటుంది? (తారా చక్రం)"
    : isHi'''
)

code = code.replace(
    '''  const description = isHi
    ? "अपने जन्म नक्षत्र और चंद्र राशि से जानें आज का व्यक्तिगत ताराबल और चंद्रबल। ९ तारा चक्र (सम्पत, क्षेम, साधना, विपत, प्रत्यक, निधन), अष्टम चंद्र दोष विचार, और शुभ मुहूर्त निर्णय।"''',
    '''  const description = isTe
    ? "మీ జన్మ నక్షత్రం మరియు చంద్ర రాశి ఆధారంగా నేటి వ్యక్తిగత తారాబలం మరియు చంద్రబలాన్ని తెలుసుకోండి. 9 తారా చక్రం (సంపత్, క్షేమ, సాధన, విపత్, నైధన), అష్టమ చంద్ర విచారం మరియు శుభ ముహూర్త నిర్ణయం."
    : isHi
    ? "अपने जन्म नक्षत्र और चंद्र राशि से जानें आज का व्यक्तिगत ताराबल और चंद्रबल। ९ तारा चक्र (सम्पत, क्षेम, साधना, विपत, प्रत्यक, निधन), अष्टम चंद्र दोष विचार, और शुभ मुहूर्त निर्णय।"'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isHi ? "पंचांग" : "Panchang", PATHS.panchang],
    [isHi ? "ताराबलम् व चंद्रबलम्" : "Tarabalam & Chandrabalam", `${PATHS.panchang}/tarabalam`]
  );

  const faqs = isHi''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],
    [isTe ? "తారాబలం & చంద్రబలం" : isHi ? "ताराबलम् व चंद्रबलम्" : "Tarabalam & Chandrabalam", `${PATHS.panchang}/tarabalam`]
  );

  const faqs = isTe ? TARABALAM_FAQS_TE : isHi'''
)

code = code.replace(
    '''<FaqList faqs={faqs} title={isHi ? "ताराबलम् एवं चंद्रबलम् से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? "తారాబలం మరియు చంద్రబలానికి సంబంధించిన తరచుగా అడిగే ప్రశ్నలు" : isHi ? "ताराबलम् एवं चंद्रबलम् से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />'''
)

code = code.replace(
    '''  const pageTitle = isHi
    ? "दैनिक ताराबलम् एवं चंद्रबलम् (Daily Tara Chakra)"
    : "Daily Tarabalam & Chandrabalam Calculator";

  const subtitle = isHi
    ? "अपने जन्म नक्षत्र एवं राशि अनुसार जानें आज का दिन आपके लिए कितना शुभ और अनुकूल है"
    : "Find whether today is auspicious for you based on your Janma Nakshatra and Rashi";''',
    '''  const pageTitle = isTe
    ? "దైనందిన తారాబలం & చంద్రబలం (Daily Tara Chakra)"
    : isHi
    ? "दैनिक ताराबलम् एवं चंद्रबलम् (Daily Tara Chakra)"
    : "Daily Tarabalam & Chandrabalam Calculator";

  const subtitle = isTe
    ? "మీ జన్మ నక్షత్రం మరియు రాశి ప్రకారం నేటి రోజు మీకు ఎంత శుభప్రదమో మరియు అనుకూలమో తెలుసుకోండి"
    : isHi
    ? "अपने जन्म नक्षत्र एवं राशि अनुसार जानें आज का दिन आपके लिए कितना शुभ और अनुकूल है"
    : "Find whether today is auspicious for you based on your Janma Nakshatra and Rashi";'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("4. Updated src/app/panchang/tarabalam/page.tsx")


# ==============================================================================
# 5. src/components/panchang/TarabalamView.tsx
# ==============================================================================
path = "src/components/panchang/TarabalamView.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''import {
  NAKSHATRA_NAMES,
  NAKSHATRA_NAMES_HI,
  RASI_NAMES,
  RASI_NAMES_HI,
} from "@/lib/panchang/names";''',
    '''import {
  NAKSHATRA_NAMES,
  NAKSHATRA_NAMES_HI,
  NAKSHATRA_NAMES_TE,
  RASI_NAMES,
  RASI_NAMES_HI,
  RASI_NAMES_TE,
} from "@/lib/panchang/names";'''
)

code = code.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

code = code.replace(
    '''title={isHi ? "पिछला दिन" : "Previous Day"}''',
    '''title={isTe ? "మునుపటి రోజు" : isHi ? "पिछला दिन" : "Previous Day"}'''
)

code = code.replace(
    '''title={isHi ? "अगला दिन" : "Next Day"}''',
    '''title={isTe ? "తరువాతి రోజు" : isHi ? "अगला दिन" : "Next Day"}'''
)

code = code.replace(
    '''{isHi ? "आज" : "Today"}''',
    '''{isTe ? "నేడు" : isHi ? "आज" : "Today"}'''
)

code = code.replace(
    '''<CityPickerButton city={city} onCityChange={setCity} isHi={isHi} />''',
    '''<CityPickerButton city={city} onCityChange={setCity} isHi={isHi} isTe={isTe} />'''
)

code = code.replace(
    '''<span>{isHi ? "अपना जन्म नक्षत्र चुनें" : "Select Birth Nakshatra"}</span>''',
    '''<span>{isTe ? "మీ జన్మ నక్షత్రాన్ని ఎంచుకోండి" : isHi ? "अपना जन्म नक्षत्र चुनें" : "Select Birth Nakshatra"}</span>'''
)

code = code.replace(
    '''<span>{isHi ? "अपनी जन्म चंद्र राशि चुनें" : "Select Birth Moon Sign (Rashi)"}</span>''',
    '''<span>{isTe ? "మీ జన్మ చంద్ర రాశిని ఎంచుకోండి" : isHi ? "अपनी जन्म चंद्र राशि चुनें" : "Select Birth Moon Sign (Rashi)"}</span>'''
)

code = code.replace(
    '''{isHi ? NAKSHATRA_NAMES_HI[i] : name}''',
    '''{isTe ? NAKSHATRA_NAMES_TE[i] : isHi ? NAKSHATRA_NAMES_HI[i] : name}'''
)

code = code.replace(
    '''{isHi ? RASI_NAMES_HI[i] : name}''',
    '''{isTe ? RASI_NAMES_TE[i] : isHi ? RASI_NAMES_HI[i] : name}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("5. Updated src/components/panchang/TarabalamView.tsx")


# ==============================================================================
# 6. src/app/panchang/gochar/page.tsx
# ==============================================================================
path = "src/app/panchang/gochar/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

te_gochar_faqs = '''const GOCHAR_FAQS_TE = [
  {
    question: "గ్రహ గోచారం (Gochar) అంటే ఏమిటి?",
    answer:
      "ఆకాశంలో గ్రహాల నిరంతర చలనాన్ని 'గోచారం' అంటారు. జన్మ కుండలిలోని గ్రహాలు స్థిరంగా ఉంటాయి, అయితే ప్రస్తుత బ్రహ్మాండంలో కదులుతున్న గ్రహాలను గోచార గ్రహాలు అంటారు. ఫలిత జ్యోతిష్యంలో గోచారాన్ని జాతకుని జన్మ చంద్ర రాశి (Moon Sign) నుండి లెక్కిస్తారు.",
  },
  {
    question: "చంద్ర రాశి నుండే గోచారాన్ని ఎందుకు చూస్తారు?",
    answer:
      "వైదిక జ్యోతిష్యంలో చంద్రుడు మనస్సు, చేతన మరియు అనుభవాలకు కారకుడు. గ్రహ గోచార ప్రభావం నేరుగా వ్యక్తి యొక్క మానసిక స్థితి, నిర్ణయాలు మరియు దైనందిన సుఖ-దుఃఖాలపై పడుతుంది, అందుకే మహర్షి పరాశరుడు చంద్ర రాశి ఆధారిత గోచారానికి అత్యంత ప్రాధాన్యతనిచ్చారు.",
  },
  {
    question: "ఏ స్థానాల్లో గ్రహాల గోచారం అత్యంత శుభప్రదంగా పరిగణించబడుతుంది?",
    answer:
      "• సూర్యుడు: 3, 6, 10, 11వ స్థానాల్లో శుభం\\n• చంద్రుడు: 1, 3, 6, 7, 10, 11వ స్థానాల్లో శుభం\\n• కుజుడు: 3, 6, 11వ స్థానాల్లో శుభం\\n• బుధుడు: 2, 4, 6, 8, 10, 11వ స్థానాల్లో శుభం\\n• గురువు: 2, 5, 7, 9, 11వ స్థానాల్లో శుభం\\n• శుక్రుడు: 1, 2, 3, 4, 5, 8, 9, 11, 12వ స్థానాల్లో శుభం\\n• శని, రాహువు, కేతువు: 3, 6, 11వ (ఉపచయ) స్థానాల్లో శుభ ఫలితాలనిస్తారు.",
  },
  {
    question: "గోచారం మరియు మహాదశలలో ఏది ఎక్కువ ప్రభావవంతమైనది?",
    answer:
      "వింశోత్తరి మహాదశ జీవితపు పునాదిని నిర్ణయిస్తుంది, అయితే గోచారం ఆ ఫలితాలు సంభవించే ఖచ్చితమైన సమయాన్ని (ట్రిగ్గర్) నిర్దేశిస్తుంది. దశ అనుకూలంగా ఉండి, గోచారం కూడా శుభంగా ఉంటే అత్యద్భుతమైన విజయం లభిస్తుంది.",
  },
];
'''

if "GOCHAR_FAQS_TE" not in code:
    code = te_gochar_faqs + "\n" + code

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isTe
    ? "దైనందిన గ్రహ గోచార ఫలాలు & గోచార క్యాలెండర్ — 9 గ్రహాల రాశి మార్పు & భావ ఫలాలు"
    : isHi'''
)

code = code.replace(
    '''  const description = isHi
    ? "वैदिक ज्योतिष अनुसार दैनिक ग्रह गोचर एवं चंद्र राशि आधारित भाव फल। सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु व केतु का राशि गोचर, शुभ/अशुभ प्रभाव स्कोर एवं २०२४-२०३० का मुख्य गोचर कैलेंडर।"''',
    '''  const description = isTe
    ? "వైదిక జ్యోతిష్యం ప్రకారం దైనందిన గ్రహ గోచారం మరియు చంద్ర రాశి ఆధారిత భావ ఫలాలు. సూర్య, చంద్ర, కుజ, బుధ, గురు, శుక్ర, శని, రాహు, కేతువుల రాశి సంచారం మరియు శుభ/అశుభ స్కోరు."
    : isHi
    ? "वैदिक ज्योतिष अनुसार दैनिक ग्रह गोचर एवं चंद्र राशि आधारित भाव फल। सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु व केतु का राशि गोचर, शुभ/अशुभ प्रभाव स्कोर एवं २०२४-२०३० का मुख्य गोचर कैलेंडर।"'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isHi ? "पंचांग" : "Panchang", PATHS.panchang],
    [isHi ? "ग्रह गोचर" : "Planetary Transits (Gochar)", `${PATHS.panchang}/gochar`]
  );

  const faqs = isHi''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],
    [isTe ? "గ్రహ గోచారం" : isHi ? "ग्रह गोचर" : "Planetary Transits (Gochar)", `${PATHS.panchang}/gochar`]
  );

  const faqs = isTe ? GOCHAR_FAQS_TE : isHi'''
)

code = code.replace(
    '''<FaqList faqs={faqs} title={isHi ? "ग्रह गोचर से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? "గ్రహ గోచారానికి సంబంధించిన తరచుగా అడిగే ప్రశ్నలు" : isHi ? "ग्रह गोचर से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />'''
)

code = code.replace(
    '''  const pageTitle = isHi
    ? "दैनिक ग्रह गोचर (Planetary Transits)"
    : "Daily Planetary Transits (Gochar)";

  const subtitle = isHi
    ? "जन्म चंद्र राशि अनुसार ९ वैदिक ग्रहों का दैनिक गोचर फल एवं २०२४-२०३० का मुख्य गोचर कैलेंडर"
    : "Real-time Sidereal planetary transit analysis for all 12 Moon Signs with 2024–2030 timeline";''',
    '''  const pageTitle = isTe
    ? "దైనందిన గ్రహ గోచారం (Planetary Transits)"
    : isHi
    ? "दैनिक ग्रह गोचर (Planetary Transits)"
    : "Daily Planetary Transits (Gochar)";

  const subtitle = isTe
    ? "జన్మ చంద్ర రాశి ప్రకారం 9 వైదిక గ్రహాల దైనందిన గోచార ఫలాలు మరియు గోచార క్యాలెండర్"
    : isHi
    ? "जन्म चंद्र राशि अनुसार ९ वैदिक ग्रहों का दैनिक गोचर फल एवं २०२४-२०३० का मुख्य गोचर कैलेंडर"
    : "Real-time Sidereal planetary transit analysis for all 12 Moon Signs with 2024–2030 timeline";'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("6. Updated src/app/panchang/gochar/page.tsx")


# ==============================================================================
# 7. src/components/panchang/GocharCalendarView.tsx
# ==============================================================================
path = "src/components/panchang/GocharCalendarView.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''import { RASI_NAMES, RASI_NAMES_HI } from "@/lib/panchang/names";''',
    '''import { RASI_NAMES, RASI_NAMES_HI, RASI_NAMES_TE } from "@/lib/panchang/names";'''
)

code = code.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

code = code.replace(
    '''title={isHi ? "पिछला दिन" : "Previous Day"}''',
    '''title={isTe ? "మునుపటి రోజు" : isHi ? "पिछला दिन" : "Previous Day"}'''
)

code = code.replace(
    '''title={isHi ? "अगला दिन" : "Next Day"}''',
    '''title={isTe ? "తరువాతి రోజు" : isHi ? "अगला दिन" : "Next Day"}'''
)

code = code.replace(
    '''{isHi ? "आज" : "Today"}''',
    '''{isTe ? "నేడు" : isHi ? "आज" : "Today"}'''
)

code = code.replace(
    '''<span>{isHi ? "अपनी जन्म चंद्र राशि चुनें:" : "Select Your Moon Sign (Rashi):"}</span>''',
    '''<span>{isTe ? "మీ జన్మ చంద్ర రాశిని ఎంచుకోండి:" : isHi ? "अपनी जन्म चंद्र राशि चुनें:" : "Select Your Moon Sign (Rashi):"}</span>'''
)

code = code.replace(
    '''{isHi ? RASI_NAMES_HI[idx] : rashi}''',
    '''{isTe ? RASI_NAMES_TE[idx] : isHi ? RASI_NAMES_HI[idx] : rashi}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("7. Updated src/components/panchang/GocharCalendarView.tsx")


# ==============================================================================
# 8. src/app/panchang/[system]/page.tsx
# ==============================================================================
path = "src/app/panchang/[system]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? `${sys.titleHi} — वैदिक एवं क्षेत्रीय पंचांग, शुभ मुहूर्त व तिथि`
    : `${sys.titleEn} — Daily Tithi, Nakshatra, Muhurat & Regional Calendar`;

  const description = isHi
    ? `${sys.descriptionHi} प्रामाणिक दृक सिद्धांत और खगोलीय गणना पर आधारित।`
    : `${sys.descriptionEn} Accurate astronomical calculations using Lahiri Ayanamsa and Drik Ganita.`;''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isTe
    ? `${sys.slug === "telugu-panchangam" ? "తెలుగు పంచాంగం 2026 — నేటి తిథి, నక్షత్రం, యోగం, వర్జ్యం & అమృత ఘడియలు" : `${sys.titleEn} — తెలుగు వైదిక పంచాంగం`}`
    : isHi
    ? `${sys.titleHi} — वैदिक एवं क्षेत्रीय पंचांग, शुभ मुहूर्त व तिथि`
    : `${sys.titleEn} — Daily Tithi, Nakshatra, Muhurat & Regional Calendar`;

  const description = isTe
    ? `${sys.slug === "telugu-panchangam" ? "ఖచ్చితమైన దృక్ సిద్ధాంత ఆధారిత తెలుగు పంచాంగం. నేటి తిథి, నక్షత్రం, వర్జ్యం, దుర్ముహూర్తం, రాహుకాలం, మరియు శుభ ముహూర్తాలు." : `${sys.descriptionEn} Accurate astronomical calculations using Lahiri Ayanamsa and Drik Ganita.`}`
    : isHi
    ? `${sys.descriptionHi} प्रामाणिक दृक सिद्धांत और खगोलीय गणना पर आधारित।`
    : `${sys.descriptionEn} Accurate astronomical calculations using Lahiri Ayanamsa and Drik Ganita.`;'''
)

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const now = new Date();

  const dateFormatted = new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const now = new Date();

  const dateFormatted = new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {'''
)

code = code.replace(
    '''        crumbs={
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
        }''',
    '''        crumbs={
          isTe
            ? localizedCrumbs(
                "హోమ్",
                ["పంచాంగం", "/panchang/today"],
                [sys.slug === "telugu-panchangam" ? "తెలుగు పంచాంగం" : sys.titleEn, `/panchang/${sys.slug}`]
              )
            : isHi
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
        }'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("8. Updated src/app/panchang/[system]/page.tsx")
