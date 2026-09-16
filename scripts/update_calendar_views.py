# Update PrintableWallCalendarView, SelectedDatePanel, UpcomingFestivals, FestivalDetailView, EkadashiCalendarView
import re

# 1. PrintableWallCalendarView.tsx
path = "src/components/calendar/PrintableWallCalendarView.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''const WEEKDAY_NAMES_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAY_NAMES_HI = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];''',
    '''const WEEKDAY_NAMES_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAY_NAMES_HI = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
const WEEKDAY_NAMES_TE = ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"];
const TE_MONTHS = ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"];'''
)

code = code.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

code = code.replace(
    '''<CityPickerButton city={city} onCityChange={setCity} isHi={isHi} variant="compact" />''',
    '''<CityPickerButton city={city} onCityChange={setCity} isHi={isHi} isTe={isTe} variant="compact" />'''
)

code = code.replace(
    '''{isHi ? "वॉल कैलेंडर प्रिंट करें / PDF" : "Print Wall Calendar / PDF"}''',
    '''{isTe ? "వాల్ క్యాలెండర్ ప్రింట్ / PDF" : isHi ? "वॉल कैलेंडर प्रिंट करें / PDF" : "Print Wall Calendar / PDF"}'''
)

code = code.replace(
    '''{isHi ? WEEKDAY_NAMES_HI[idx] : name}''',
    '''{isTe ? WEEKDAY_NAMES_TE[idx] : isHi ? WEEKDAY_NAMES_HI[idx] : name}'''
)

code = code.replace(
    '''{isHi ? monthNameHi : monthNameEn}''',
    '''{isTe ? TE_MONTHS[month - 1] : isHi ? monthNameHi : monthNameEn}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("1. Updated PrintableWallCalendarView.tsx")


# 2. SelectedDatePanel.tsx
path = "src/components/calendar/SelectedDatePanel.tsx"
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
    '''    return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {''',
    '''    return new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {'''
)

code = code.replace(
    '''    const text = isHi
      ? `🕉️ हिन्दू पंचांग (${panchang.gregorianLabelHi})\\n📍 स्थान: ${panchang.city.nameHi}\\n\\n• तिथि: ${panchang.tithiAtSunrise.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})\\n• नक्षत्र: ${panchang.nakshatra.nameHi} (पाद ${panchang.nakshatra.pada})\\n• योग: ${panchang.yoga.nameHi} | करण: ${panchang.karana.nameHi}\\n• सूर्योदय: ${formatTime(panchang.sunrise)} | सूर्यास्त: ${formatTime(panchang.sunset)}\\n• राहु काल: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• अभिजित: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "कोई नहीं"}\\n\\nसम्पूर्ण वैदिक पंचांग BhaktiVoice.com पर देखें`
      : `🕉️ Hindu Panchang (${panchang.gregorianLabel})\\n📍 City: ${panchang.city.name}\\n\\n• Tithi: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha)\\n• Nakshatra: ${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})\\n• Yoga: ${panchang.yoga.name} | Karana: ${panchang.karana.name}\\n• Sunrise: ${formatTime(panchang.sunrise)} | Sunset: ${formatTime(panchang.sunset)}\\n• Rahu Kaal: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• Abhijit: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "None"}\\n\\nExplore complete Vedic Calendar on BhaktiVoice.com`;''',
    '''    const text = isTe
      ? `🕉️ హిందూ పంచాంగం (${panchang.gregorianLabel})\\n📍 ప్రాంతం: ${panchang.city.name}\\n\\n• తిథి: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "శుక్ల పక్షం" : "కృష్ణ పక్షం"})\\n• నక్షత్రం: ${panchang.nakshatra.name} (పాదము ${panchang.nakshatra.pada})\\n• యోగం: ${panchang.yoga.name} | కరణం: ${panchang.karana.name}\\n• సూర్యోదయం: ${formatTime(panchang.sunrise)} | సూర్యాస్తమయం: ${formatTime(panchang.sunset)}\\n• రాహు కాలం: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• అభిజిత్ ముహూర్తం: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "ఏదీ లేదు"}\\n\\nసంపూర్ణ వైదిక పంచాంగం BhaktiVoice.com లో చూడండి`
      : isHi
      ? `🕉️ हिन्दू पंचांग (${panchang.gregorianLabelHi})\\n📍 स्थान: ${panchang.city.nameHi}\\n\\n• तिथि: ${panchang.tithiAtSunrise.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})\\n• नक्षत्र: ${panchang.nakshatra.nameHi} (पाद ${panchang.nakshatra.pada})\\n• योग: ${panchang.yoga.nameHi} | करण: ${panchang.karana.nameHi}\\n• सूर्योदय: ${formatTime(panchang.sunrise)} | सूर्यास्त: ${formatTime(panchang.sunset)}\\n• राहु काल: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• अभिजित: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "कोई नहीं"}\\n\\nसम्पूर्ण वैदिक पंचांग BhaktiVoice.com पर देखें`
      : `🕉️ Hindu Panchang (${panchang.gregorianLabel})\\n📍 City: ${panchang.city.name}\\n\\n• Tithi: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha)\\n• Nakshatra: ${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})\\n• Yoga: ${panchang.yoga.name} | Karana: ${panchang.karana.name}\\n• Sunrise: ${formatTime(panchang.sunrise)} | Sunset: ${formatTime(panchang.sunset)}\\n• Rahu Kaal: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• Abhijit: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "None"}\\n\\nExplore complete Vedic Calendar on BhaktiVoice.com`;'''
)

code = code.replace(
    '''{isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}''',
    '''{isTe ? "పగటి చోఘడియా" : isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}'''
)

code = code.replace(
    '''{isHi ? "रात्रि का चौघड़िया" : "Night Choghadiya"}''',
    '''{isTe ? "రాత్రి చోఘడియా" : isHi ? "रात्रि का चौघड़िया" : "Night Choghadiya"}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("2. Updated SelectedDatePanel.tsx")


# 3. UpcomingFestivals.tsx
path = "src/components/calendar/UpcomingFestivals.tsx"
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
    '''{isHi ? "आगामी पर्व एवं व्रत" : "Upcoming Festivals & Vrats"}''',
    '''{isTe ? "రాబోయే పండుగలు & వ్రతాలు" : isHi ? "आगामी पर्व एवं व्रत" : "Upcoming Festivals & Vrats"}'''
)

code = code.replace(
    '''{isHi ? "दिन" : "Days"}''',
    '''{isTe ? "రోజులు" : isHi ? "दिन" : "Days"}'''
)

code = code.replace(
    '''{isHi ? "घंटे" : "Hours"}''',
    '''{isTe ? "గంటలు" : isHi ? "घंटे" : "Hours"}'''
)

code = code.replace(
    '''{isHi ? "मिनट" : "Mins"}''',
    '''{isTe ? "నిమిషాలు" : isHi ? "मिनट" : "Mins"}'''
)

code = code.replace(
    '''{isHi ? "सेकंड" : "Secs"}''',
    '''{isTe ? "సెకన్లు" : isHi ? "सेकंड" : "Secs"}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("3. Updated UpcomingFestivals.tsx")


# 4. FestivalDetailView.tsx
path = "src/components/calendar/FestivalDetailView.tsx"
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
    '''aria-label={isHi ? "बंद करें" : "Close"}''',
    '''aria-label={isTe ? "మూసివేయండి" : isHi ? "बंद करें" : "Close"}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("4. Updated FestivalDetailView.tsx")


# 5. EkadashiCalendarView.tsx
path = "src/components/panchang/EkadashiCalendarView.tsx"
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
    '''<CityPickerButton city={city} onCityChange={handleCityChange} isHi={isHi} />''',
    '''<CityPickerButton city={city} onCityChange={handleCityChange} isHi={isHi} isTe={isTe} />'''
)

code = code.replace(
    '''{isHi ? "सभी एकादशी" : "All Ekadashis"}''',
    '''{isTe ? "అన్ని ఏకాదశులు" : isHi ? "सभी एकादशी" : "All Ekadashis"}'''
)

code = code.replace(
    '''{isHi ? "स्मार्त एकादशी" : "Smarta Dates"}''',
    '''{isTe ? "స్మార్త ఏకాదశి" : isHi ? "स्मार्त एकादशी" : "Smarta Dates"}'''
)

code = code.replace(
    '''{isHi ? "वैष्णव एकादशी (ISKCON)" : "Vaishnava (ISKCON)"}''',
    '''{isTe ? "వైష్ణవ ఏకాదశి (ISKCON)" : isHi ? "वैष्णव एकादशी (ISKCON)" : "Vaishnava (ISKCON)"}'''
)

code = code.replace(
    '''{isHi ? "आगामी एकादशी" : "Next Upcoming Ekadashi"}''',
    '''{isTe ? "తరువాతి ఏకాదశి" : isHi ? "आगामी एकादशी" : "Next Upcoming Ekadashi"}'''
)

code = code.replace(
    '''{isHi ? "विहित पारणा समय" : "Parana Time Window"}''',
    '''{isTe ? "పారణ సమయ వ్యవధి" : isHi ? "विहित पारणा समय" : "Parana Time Window"}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("5. Updated EkadashiCalendarView.tsx")
