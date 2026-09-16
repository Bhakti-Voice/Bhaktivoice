import re

with open('src/components/panchang/PanchangTodayView.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace isHi check to include isTe
code = code.replace(
    '  const locale = useLocale();\n  const isHi = locale === "hi";',
    '  const locale = useLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";'
)

# Format time
code = code.replace(
    'return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {',
    'return new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {'
)

# handleCopy
old_copy = '''  function handleCopy() {
    const text = isHi
      ? `🕉️ ${panchang.gregorianLabelHi} — आज का पंचांग\\n📍 स्थान: ${city.nameHi}\\n\\n• तिथि: ${panchang.tithiAtSunrise.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})\\n• नक्षत्र: ${panchang.nakshatra.nameHi} (पाद ${panchang.nakshatra.pada})\\n• योग: ${panchang.yoga.nameHi} | करण: ${panchang.karana.nameHi}\\n• सूर्योदय: ${formatTime(panchang.sunrise)} | सूर्यास्त: ${formatTime(panchang.sunset)}\\n• राहु काल: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• अभिजित: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "कोई नहीं"}\\n\\nसम्पूर्ण दैनिक पंचांग BhaktiVoice.com पर देखें`
      : `🕉️ ${panchang.gregorianLabel} — Aaj Ka Panchang\\n📍 City: ${city.name}\\n\\n• Tithi: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha)\\n• Nakshatra: ${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})\\n• Yoga: ${panchang.yoga.name} | Karana: ${panchang.karana.name}\\n• Sunrise: ${formatTime(panchang.sunrise)} | Sunset: ${formatTime(panchang.sunset)}\\n• Rahu Kaal: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• Abhijit: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "None"}\\n\\nExplore complete Daily Panchang on BhaktiVoice.com`;

    navigator.clipboard.writeText(text);'''

new_copy = '''  function handleCopy() {
    const text = isTe
      ? `🕉️ ${panchang.gregorianLabel} — నేటి పంచాంగం\\n📍 స్థానం: ${city.name}\\n\\n• తిథి: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "శుక్ల పక్షం" : "కృష్ణ పక్షం"})\\n• నక్షత్రం: ${panchang.nakshatra.name} (పాదం ${panchang.nakshatra.pada})\\n• యోగం: ${panchang.yoga.name} | కరణం: ${panchang.karana.name}\\n• సూర్యోదయం: ${formatTime(panchang.sunrise)} | సూర్యాస్తమయం: ${formatTime(panchang.sunset)}\\n• రాహు కాలం: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• అభిజిత్: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "లేదు"}\\n\\nసంపూర్ణ దిన పంచాంగం BhaktiVoice.com లో చూడండి`
      : isHi
      ? `🕉️ ${panchang.gregorianLabelHi} — आज का पंचांग\\n📍 स्थान: ${city.nameHi}\\n\\n• तिथि: ${panchang.tithiAtSunrise.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})\\n• नक्षत्र: ${panchang.nakshatra.nameHi} (पाद ${panchang.nakshatra.pada})\\n• योग: ${panchang.yoga.nameHi} | करण: ${panchang.karana.nameHi}\\n• सूर्योदय: ${formatTime(panchang.sunrise)} | सूर्यास्त: ${formatTime(panchang.sunset)}\\n• राहु काल: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• अभिजित: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "कोई नहीं"}\\n\\nसम्पूर्ण दैनिक पंचांग BhaktiVoice.com पर देखें`
      : `🕉️ ${panchang.gregorianLabel} — Aaj Ka Panchang\\n📍 City: ${city.name}\\n\\n• Tithi: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha)\\n• Nakshatra: ${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})\\n• Yoga: ${panchang.yoga.name} | Karana: ${panchang.karana.name}\\n• Sunrise: ${formatTime(panchang.sunrise)} | Sunset: ${formatTime(panchang.sunset)}\\n• Rahu Kaal: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• Abhijit: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "None"}\\n\\nExplore complete Daily Panchang on BhaktiVoice.com`;

    navigator.clipboard.writeText(text);'''

code = code.replace(old_copy, new_copy)

# Tabs
code = code.replace(
    '{isHi ? "कल (बीता हुआ)" : "Yesterday"}',
    '{isTe ? "నిన్న" : isHi ? "कल (बीता हुआ)" : "Yesterday"}'
)
code = code.replace(
    '{isHi ? "आज" : "Today"}',
    '{isTe ? "ఈరోజు" : isHi ? "आज" : "Today"}'
)
code = code.replace(
    '{isHi ? "कल (आने वाला)" : "Tomorrow"}',
    '{isTe ? "రేపు" : isHi ? "कल (आने वाला)" : "Tomorrow"}'
)

# Buttons
code = code.replace(
    '{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "कॉपी" : "Copy")}',
    '{copied ? (isTe ? "కాపీ అయింది!" : isHi ? "कॉपी हो गया!" : "Copied!") : (isTe ? "కాపీ" : isHi ? "कॉपी" : "Copy")}'
)
code = code.replace(
    '{isHi ? "व्हाट्सएप कार्ड" : "Status Card"}',
    '{isTe ? "వాట్సాప్ కార్డ్" : isHi ? "व्हाट्सएप कार्ड" : "Status Card"}'
)
code = code.replace(
    '{isHi ? "कैलेंडर देखें" : "View Calendar"}',
    '{isTe ? "క్యాలెండర్ చూడండి" : isHi ? "कैलेंडर देखें" : "View Calendar"}'
)

# Date details
code = code.replace(
    '{isHi ? "मास: " : "Masa: "}',
    '{isTe ? "మాసం: " : isHi ? "मास: " : "Masa: "}'
)
code = code.replace(
    '{isHi ? "पक्ष: " : "Paksha: "}',
    '{isTe ? "పక్షం: " : isHi ? "पक्ष: " : "Paksha: "}'
)
code = code.replace(
    '{isHi ? (panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष") : (panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna")}',
    '{panchang.tithiAtSunrise.paksha === "shukla" ? (isTe ? "శుక్ల పక్షం" : isHi ? "शुक्ल पक्ष" : "Shukla") : (isTe ? "కృష్ణ పక్షం" : isHi ? "कृष्ण पक्ष" : "Krishna")}'
)
code = code.replace(
    '{isHi ? "संवत: " : "Samvat: "}',
    '{isTe ? "సంవత్సరం: " : isHi ? "संवत: " : "Samvat: "}'
)
code = code.replace(
    '{isHi ? "ऋतु: " : "Ritu: "}',
    '{isTe ? "ఋతువు: " : isHi ? "ऋतु: " : "Ritu: "}'
)
code = code.replace(
    '{isHi ? "अयन: " : "Ayana: "}',
    '{isTe ? "అయనం: " : isHi ? "अयन: " : "Ayana: "}'
)

# Observances header
code = code.replace(
    '{isHi ? "आज के प्रमुख पर्व एवं व्रत:" : "Today\'s Festivals & Observances:"}',
    '{isTe ? "నేటి ప్రముఖ పర్వదినాలు & వ్రతాలు:" : isHi ? "आज के प्रमुख पर्व एवं व्रत:" : "Today\'s Festivals & Observances:"}'
)

# Quick links
code = code.replace(
    '{isHi ? "दैनिक ग्रह स्थिति" : "Planetary Ephemeris"}',
    '{isTe ? "దిన గ్రహ స్థితి" : isHi ? "दैनिक ग्रह स्थिति" : "Planetary Ephemeris"}'
)
code = code.replace(
    '{isHi ? "दैनिक ग्रह गोचर" : "Daily Gochar (Transits)"}',
    '{isTe ? "దిన గ్రహ గోచారం" : isHi ? "दैनिक ग्रह गोचर" : "Daily Gochar (Transits)"}'
)
code = code.replace(
    '{isHi ? "शनि साढ़े साती कैलकुलेटर" : "Shani Sade Sati"}',
    '{isTe ? "శని సాడే సతి కాలిక్యులేటర్" : isHi ? "शनि साढ़े साती कैलकुलेटर" : "Shani Sade Sati"}'
)
code = code.replace(
    '{isHi ? "एकादशी पारणा समय" : "Ekadashi Parana"}',
    '{isTe ? "ఏకాదశి పారణ సమయం" : isHi ? "एकादशी पारणा समय" : "Ekadashi Parana"}'
)
code = code.replace(
    '{isHi ? "ताराबलम् व चंद्रबलम्" : "Tarabalam"}',
    '{isTe ? "తారాబలం & చంద్రబలం" : isHi ? "ताराबलम् व चंद्रबलम्" : "Tarabalam"}'
)
code = code.replace(
    '{isHi ? "चौघड़िया मुहूर्त" : "Choghadiya"}',
    '{isTe ? "చోఘడియా ముహూర్తం" : isHi ? "चौघड़िया मुहूर्त" : "Choghadiya"}'
)
code = code.replace(
    '{isHi ? "दैनिक होरा चक्र" : "Hora"}',
    '{isTe ? "దిన హోరా చక్రం" : isHi ? "दैनिक होरा चक्र" : "Hora"}'
)
code = code.replace(
    '{isHi ? "गौरी पंचांगम" : "Gowri Panchangam"}',
    '{isTe ? "గౌరీ పంచాంగం" : isHi ? "गौरी पंचांगम" : "Gowri Panchangam"}'
)

# 5 Limbs
code = code.replace(
    '{isHi ? "पंचांग के पांच मुख्य अंग" : "The 5 Vedic Limbs (Pancha-Anga)"}',
    '{isTe ? "పంచాంగం యొక్క 5 ముఖ్య అంగాలు" : isHi ? "पंचांग के पांच मुख्य अंग" : "The 5 Vedic Limbs (Pancha-Anga)"}'
)
code = code.replace(
    '{isHi ? "1. तिथि" : "1. Tithi"}',
    '{isTe ? "1. తిథి" : isHi ? "1. तिथि" : "1. Tithi"}'
)
code = code.replace(
    '{isHi ? `समाप्त: ${formatTime(panchang.tithiAtSunrise.end)} तक` : `Ends at: ${formatTime(panchang.tithiAtSunrise.end)}`}',
    '{isTe ? `ముగింపు: ${formatTime(panchang.tithiAtSunrise.end)} వరకు` : isHi ? `समाप्त: ${formatTime(panchang.tithiAtSunrise.end)} तक` : `Ends at: ${formatTime(panchang.tithiAtSunrise.end)}`}'
)
code = code.replace(
    '{isHi ? "अगली तिथि: " : "Next: "}',
    '{isTe ? "తదుపరి తిథి: " : isHi ? "अगली तिथि: " : "Next: "}'
)

# Nakshatra
code = code.replace(
    '{isHi ? "2. नक्षत्र" : "2. Nakshatra"}',
    '{isTe ? "2. నక్షత్రం" : isHi ? "2. नक्षत्र" : "2. Nakshatra"}'
)
code = code.replace(
    '{isHi ? `समाप्त: ${formatTime(panchang.nakshatra.end)} तक` : `Ends at: ${formatTime(panchang.nakshatra.end)}`}',
    '{isTe ? `ముగింపు: ${formatTime(panchang.nakshatra.end)} వరకు` : isHi ? `समाप्त: ${formatTime(panchang.nakshatra.end)} तक` : `Ends at: ${formatTime(panchang.nakshatra.end)}`}'
)
code = code.replace(
    '{isHi ? "नक्षत्र स्वामी देवता: " : "Ruling Deity: "}',
    '{isTe ? "నక్షత్ర అధిపతి: " : isHi ? "नक्षत्र स्वामी देवता: " : "Ruling Deity: "}'
)

# Yoga
code = code.replace(
    '{isHi ? "3. योग" : "3. Yoga"}',
    '{isTe ? "3. యోగం" : isHi ? "3. योग" : "3. Yoga"}'
)
code = code.replace(
    '{isHi ? `समाप्त: ${formatTime(panchang.yoga.end)} तक` : `Ends at: ${formatTime(panchang.yoga.end)}`}',
    '{isTe ? `ముగింపు: ${formatTime(panchang.yoga.end)} వరకు` : isHi ? `समाप्त: ${formatTime(panchang.yoga.end)} तक` : `Ends at: ${formatTime(panchang.yoga.end)}`}'
)
code = code.replace(
    '{isHi ? "योग का स्वरूप: " : "Soli-Lunar Angle: "}',
    '{isTe ? "యోగ స్వరూపం: " : isHi ? "योग का स्वरूप: " : "Soli-Lunar Angle: "}'
)

# Karana
code = code.replace(
    '{isHi ? "4. करण" : "4. Karana"}',
    '{isTe ? "4. కరణం" : isHi ? "4. करण" : "4. Karana"}'
)
code = code.replace(
    '{isHi ? `समाप्त: ${formatTime(panchang.karana.end)} तक` : `Ends at: ${formatTime(panchang.karana.end)}`}',
    '{isTe ? `ముగింపు: ${formatTime(panchang.karana.end)} వరకు` : isHi ? `समाप्त: ${formatTime(panchang.karana.end)} तक` : `Ends at: ${formatTime(panchang.karana.end)}`}'
)
code = code.replace(
    '{isHi ? "अर्ध तिथि का स्वरूप: " : "Half-Tithi: "}',
    '{isTe ? "అర్ధ తిథి స్వరూపం: " : isHi ? "अर्ध तिथि का स्वरूप: " : "Half-Tithi: "}'
)

# Vara
code = code.replace(
    '{isHi ? "5. वार" : "5. Vara (Day)"}',
    '{isTe ? "5. వారం" : isHi ? "5. वार" : "5. Vara (Day)"}'
)
code = code.replace(
    '{isHi ? "दिन के स्वामी ग्रह: " : "Ruling Planet: "}',
    '{isTe ? "వారాధిపతి గ్రహం: " : isHi ? "दिन के स्वामी ग्रह: " : "Ruling Planet: "}'
)
code = code.replace(
    '? (isHi ? "सूर्य देव" : "Sun")',
    '? (isTe ? "సూర్య భగవానుడు" : isHi ? "सूर्य देव" : "Sun")'
)
code = code.replace(
    '? (isHi ? "चंद्र देव" : "Moon")',
    '? (isTe ? "చంద్ర భగవానుడు" : isHi ? "चंद्र देव" : "Moon")'
)
code = code.replace(
    '? (isHi ? "मंगल देव" : "Mars")',
    '? (isTe ? "కుజ భగవానుడు (మంగళ)" : isHi ? "मंगल देव" : "Mars")'
)
code = code.replace(
    '? (isHi ? "बुध देव" : "Mercury")',
    '? (isTe ? "బుధ భగవానుడు" : isHi ? "बुध देव" : "Mercury")'
)
code = code.replace(
    '? (isHi ? "बृहस्पति देव (गुरु)" : "Jupiter")',
    '? (isTe ? "బృహస్పతి (గురుడు)" : isHi ? "बृहस्पति देव (गुरु)" : "Jupiter")'
)
code = code.replace(
    '? (isHi ? "शुक्र देव" : "Venus")',
    '? (isTe ? "శుక్ర భగవానుడు" : isHi ? "शुक्र देव" : "Venus")'
)
code = code.replace(
    ': (isHi ? "शनि देव" : "Saturn")',
    ': (isTe ? "శని భగవానుడు" : isHi ? "शनि देव" : "Saturn")'
)
code = code.replace(
    '{isHi ? "दिनमान: " : "Day Length: "}',
    '{isTe ? "దినప్రమాణం: " : isHi ? "दिनमान: " : "Day Length: "}'
)

# Sun / Moon Celestial
code = code.replace(
    '{isHi ? "सूर्य एवं चंद्र खगोलीय स्थिति" : "Sun & Moon Celestial Ephemeris"}',
    '{isTe ? "సూర్య & చంద్ర ఖగోళ స్థితి" : isHi ? "सूर्य एवं चंद्र खगोलीय स्थिति" : "Sun & Moon Celestial Ephemeris"}'
)
code = code.replace(
    '{isHi ? "सूर्योदय" : "Sunrise"}',
    '{isTe ? "సూర్యోదయం" : isHi ? "सूर्योदय" : "Sunrise"}'
)
code = code.replace(
    '{isHi ? "सूर्य राशि: " : "Sun Sign: "}',
    '{isTe ? "సూర్య రాశి: " : isHi ? "सूर्य राशि: " : "Sun Sign: "}'
)
code = code.replace(
    '{isHi ? "सूर्यास्त" : "Sunset"}',
    '{isTe ? "సూర్యాస్తమయం" : isHi ? "सूर्यास्त" : "Sunset"}'
)
code = code.replace(
    '{isHi ? "दिनमान: " : "Day: "}',
    '{isTe ? "దినప్రమాణం: " : isHi ? "दिनमान: " : "Day: "}'
)
code = code.replace(
    '{isHi ? "चंद्रोदय" : "Moonrise"}',
    '{isTe ? "చంద్రోదయం" : isHi ? "चंद्रोदय" : "Moonrise"}'
)
code = code.replace(
    '{isHi ? "चंद्र राशि: " : "Moon Sign: "}',
    '{isTe ? "చంద్ర రాశి: " : isHi ? "चंद्र राशि: " : "Moon Sign: "}'
)
code = code.replace(
    '{isHi ? "चंद्रास्त" : "Moonset"}',
    '{isTe ? "చంద్రాస్తమయం" : isHi ? "चंद्रास्त" : "Moonset"}'
)
code = code.replace(
    '{isHi ? "चंद्र कला: " : "Illumination: "}',
    '{isTe ? "చంద్ర కళ: " : isHi ? "चंद्र कला: " : "Illumination: "}'
)

# Auspicious Muhurats
code = code.replace(
    '{isHi ? "आज के शुभ मुहूर्त" : "Today\'s Auspicious Muhurats"}',
    '{isTe ? "నేటి శుభ ముహూర్తాలు" : isHi ? "आज के शुभ मुहूर्त" : "Today\'s Auspicious Muhurats"}'
)
code = code.replace(
    '{isHi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat"}',
    '{isTe ? "బ్రహ్మ ముహూర్తం" : isHi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat"}'
)
code = code.replace(
    '{isHi ? "ध्यान, साधना एवं योग हेतु" : "Meditation & Spiritual Dawn"}',
    '{isTe ? "ధ్యానం, సాధన & యోగా కొరకు" : isHi ? "ध्यान, साधना एवं योग हेतु" : "Meditation & Spiritual Dawn"}'
)
code = code.replace(
    '{isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}',
    '{isTe ? "అభిజిత్ ముహూర్తం" : isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}'
)
code = code.replace(
    '{isHi ? "नवीन कार्यों एवं यात्रा हेतु" : "Best for all auspicious deeds"}',
    '{isTe ? "నూతన పనులు & విజయ ప్రాప్తికి శ్రేష్ఠం" : isHi ? "नवीन कार्यों एवं यात्रा हेतु" : "Best for all auspicious deeds"}'
)
code = code.replace(
    '{isHi ? "अमृत काल" : "Amrit Kaal"}',
    '{isTe ? "అమృత కాలం" : isHi ? "अमृत काल" : "Amrit Kaal"}'
)
code = code.replace(
    '{isHi ? "पूजा-अनुष्ठान हेतु" : "Nectar timing for ceremonies"}',
    '{isTe ? "పూజ & అనుష్ఠానాల కొరకు" : isHi ? "पूजा-अनुष्ठान हेतु" : "Nectar timing for ceremonies"}'
)
code = code.replace(
    '{isHi ? "विजय मुहूर्त" : "Vijaya Muhurat"}',
    '{isTe ? "విజయ ముహూర్తం" : isHi ? "विजय मुहूर्त" : "Vijaya Muhurat"}'
)
code = code.replace(
    '{isHi ? "गोधूलि मुहूर्त" : "Godhuli Muhurat"}',
    '{isTe ? "గోధూళి ముహూర్తం" : isHi ? "गोधूलि मुहूर्त" : "Godhuli Muhurat"}'
)

# Inauspicious
code = code.replace(
    '{isHi ? "आज के अशुभ काल" : "Today\'s Inauspicious Periods"}',
    '{isTe ? "నేటి అశుభ కాలాలు" : isHi ? "आज के अशुभ काल" : "Today\'s Inauspicious Periods"}'
)
code = code.replace(
    '{isHi ? "राहु काल" : "Rahu Kaal"}',
    '{isTe ? "రాహు కాలం" : isHi ? "राहु काल" : "Rahu Kaal"}'
)
code = code.replace(
    '{isHi ? "शुभ कार्य आरम्भ न करें" : "Avoid starting new journeys/deeds"}',
    '{isTe ? "శుభ కార్యాలు ప్రారంభించవద్దు" : isHi ? "शुभ कार्य आरम्भ न करें" : "Avoid starting new journeys/deeds"}'
)
code = code.replace(
    '{isHi ? "यमगण्ड काल" : "Yamaganda"}',
    '{isTe ? "యమగండ కాలం" : isHi ? "यमगण्ड काल" : "Yamaganda"}'
)
code = code.replace(
    '{isHi ? "गुलिक काल" : "Gulika Kaal"}',
    '{isTe ? "గుళిక కాలం" : isHi ? "गुलिक काल" : "Gulika Kaal"}'
)
code = code.replace(
    '{isHi ? `दुर्मुहूर्त ${idx + 1}` : `Dur Muhurat ${idx + 1}`}',
    '{isTe ? `దుర్ముహూర్తం ${idx + 1}` : isHi ? `दुर्मुहूर्त ${idx + 1}` : `Dur Muhurat ${idx + 1}`}'
)

# Choghadiya
code = code.replace(
    '{isHi ? "आज का सम्पूर्ण चौघड़िया मुहूर्त" : "Today\'s Complete Choghadiya Timings"}',
    '{isTe ? "నేటి సంపూర్ణ చోఘడియా ముహూర్తాలు" : isHi ? "आज का सम्पूर्ण चौघड़िया मुहूर्त" : "Today\'s Complete Choghadiya Timings"}'
)
code = code.replace(
    '{isHi ? "दिन एवं रात के 8-8 चौघड़िया काल" : "8 Day & 8 Night Choghadiya timings with planetary lords"}',
    '{isTe ? "పగలు మరియు రాత్రి 8-8 చోఘడియా సమయాలు" : isHi ? "दिन एवं रात के 8-8 चौघड़िया काल" : "8 Day & 8 Night Choghadiya timings with planetary lords"}'
)
code = code.replace(
    '{isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}',
    '{isTe ? "పగటి చోఘడియా" : isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}'
)
code = code.replace(
    '{isHi ? "रात का चौघड़िया" : "Night Choghadiya"}',
    '{isTe ? "రాత్రి చోఘడియా" : isHi ? "रात का चौघड़िया" : "Night Choghadiya"}'
)
code = code.replace(
    '{isHi ? "स्वामी ग्रह: " : "Ruler: "}',
    '{isTe ? "అధిపతి గ్రహం: " : isHi ? "स्वामी ग्रह: " : "Ruler: "}'
)

# Daily Mantra
code = code.replace(
    '{isHi ? "आज का दैनिक मन्त्र एवं जप संदेश" : "Daily Mantra & Sacred Guidance"}',
    '{isTe ? "నేటి దిన మంత్రం & జప సందేశం" : isHi ? "आज का दैनिक मन्त्र एवं जप संदेश" : "Daily Mantra & Sacred Guidance"}'
)
code = code.replace(
    '{isHi ? "इष्टदेव: " : "Deity: "}',
    '{isTe ? "ఇష్టదైవం: " : isHi ? "इष्टदेव: " : "Deity: "}'
)
code = code.replace(
    '{isHi ? "फल व लाभ: " : "Spiritual Benefit: "}',
    '{isTe ? "ఫలితం & లాభం: " : isHi ? "फल व लाभ: " : "Spiritual Benefit: "}'
)

with open('src/components/panchang/PanchangTodayView.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("PanchangTodayView.tsx updated successfully!")
