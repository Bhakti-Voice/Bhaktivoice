# Update PanchangShareCardModal.tsx
with open("src/components/panchang/PanchangShareCardModal.tsx", "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    "export interface PanchangShareCardModalProps {\n  panchang: DayPanchang;\n  city: CityConfig;\n  isHi?: boolean;\n  onClose: () => void;\n}",
    "export interface PanchangShareCardModalProps {\n  panchang: DayPanchang;\n  city: CityConfig;\n  isHi?: boolean;\n  isTe?: boolean;\n  onClose: () => void;\n}"
)

code = code.replace(
    "export function PanchangShareCardModal({\n  panchang,\n  city,\n  isHi = false,\n  onClose,\n}: PanchangShareCardModalProps) {",
    "export function PanchangShareCardModal({\n  panchang,\n  city,\n  isHi = false,\n  isTe = false,\n  onClose,\n}: PanchangShareCardModalProps) {"
)

code = code.replace(
    'new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {',
    'new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {'
)

old_share_text = '''  const shareText = isHi
    ? `🕉️ ${panchang.gregorianLabelHi} — दैनिक पंचांग\\n📍 स्थान: ${city.nameHi}\\n\\n• तिथि: ${panchang.tithiAtSunrise.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})\\n• नक्षत्र: ${panchang.nakshatra.nameHi} (पाद ${panchang.nakshatra.pada})\\n• योग: ${panchang.yoga.nameHi} | करण: ${panchang.karana.nameHi}\\n• सूर्योदय: ${formatTime(panchang.sunrise)} | सूर्यास्त: ${formatTime(panchang.sunset)}\\n• राहु काल: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• अभिजित मुहूर्त: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "कोई नहीं"}\\n\\n🌸 आज का मंत्र: ${panchang.dailyMantra ? panchang.dailyMantra.sanskrit : "ॐ नमो भगवते वासुदेवाय"}\\n\\nसम्पूर्ण दैनिक पंचांग व शुभ मुहूर्त देखें:\\nhttps://bhaktivoice.com/panchang/today`
    : `🕉️ ${panchang.gregorianLabel} — Daily Panchang\\n📍 City: ${city.name}\\n\\n• Tithi: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha)\\n• Nakshatra: ${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})\\n• Yoga: ${panchang.yoga.name} | Karana: ${panchang.karana.name}\\n• Sunrise: ${formatTime(panchang.sunrise)} | Sunset: ${formatTime(panchang.sunset)}\\n• Rahu Kaal: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• Abhijit Muhurat: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "None"}\\n\\n🌸 Sacred Mantra: ${panchang.dailyMantra ? panchang.dailyMantra.sanskrit : "Om Namo Bhagavate Vasudevaya"}\\n\\nExplore complete daily Panchang & Shubh Muhurats:\\nhttps://bhaktivoice.com/panchang/today`;'''

new_share_text = '''  const shareText = isTe
    ? `🕉️ ${panchang.gregorianLabel} — దిన పంచాంగం\\n📍 ప్రాంతం: ${city.name}\\n\\n• తిథి: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "శుక్ల పక్షం" : "కృష్ణ పక్షం"})\\n• నక్షత్రం: ${panchang.nakshatra.name} (పాదము ${panchang.nakshatra.pada})\\n• యోగం: ${panchang.yoga.name} | కరణం: ${panchang.karana.name}\\n• సూర్యోదయం: ${formatTime(panchang.sunrise)} | సూర్యాస్తమయం: ${formatTime(panchang.sunset)}\\n• రాహు కాలం: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• అభిజిత్ ముహూర్తం: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "ఏదీ లేదు"}\\n\\n🌸 నేటి మంత్రం: ${panchang.dailyMantra ? panchang.dailyMantra.sanskrit : "ఓం నమో భగవతే వాసుదేవాయ"}\\n\\nసంపూర్ణ దిన పంచాంగం మరియు శుభ ముహూర్తాలు చూడండి:\\nhttps://bhaktivoice.com/te/panchang/today`
    : isHi
    ? `🕉️ ${panchang.gregorianLabelHi} — दैनिक पंचांग\\n📍 स्थान: ${city.nameHi}\\n\\n• तिथि: ${panchang.tithiAtSunrise.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})\\n• नक्षत्र: ${panchang.nakshatra.nameHi} (पाद ${panchang.nakshatra.pada})\\n• योग: ${panchang.yoga.nameHi} | करण: ${panchang.karana.nameHi}\\n• सूर्योदय: ${formatTime(panchang.sunrise)} | सूर्यास्त: ${formatTime(panchang.sunset)}\\n• राहु काल: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• अभिजित मुहूर्त: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "कोई नहीं"}\\n\\n🌸 आज का मंत्र: ${panchang.dailyMantra ? panchang.dailyMantra.sanskrit : "ॐ नमो भगवते वासुदेवाय"}\\n\\nसम्पूर्ण दैनिक पंचांग व शुभ मुहूर्त देखें:\\nhttps://bhaktivoice.com/panchang/today`
    : `🕉️ ${panchang.gregorianLabel} — Daily Panchang\\n📍 City: ${city.name}\\n\\n• Tithi: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha)\\n• Nakshatra: ${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})\\n• Yoga: ${panchang.yoga.name} | Karana: ${panchang.karana.name}\\n• Sunrise: ${formatTime(panchang.sunrise)} | Sunset: ${formatTime(panchang.sunset)}\\n• Rahu Kaal: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\\n• Abhijit Muhurat: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "None"}\\n\\n🌸 Sacred Mantra: ${panchang.dailyMantra ? panchang.dailyMantra.sanskrit : "Om Namo Bhagavate Vasudevaya"}\\n\\nExplore complete daily Panchang & Shubh Muhurats:\\nhttps://bhaktivoice.com/panchang/today`;'''

code = code.replace(old_share_text, new_share_text)

code = code.replace(
    '<span>{isHi ? "दैनिक पंचांग स्टेटस कार्ड" : "Daily Panchang Status Card"}</span>',
    '<span>{isTe ? "దిన పంచాంగ స్టేటస్ కార్డ్" : isHi ? "दैनिक पंचांग स्टेटस कार्ड" : "Daily Panchang Status Card"}</span>'
)

code = code.replace(
    '<span>{isHi ? "संवत " + panchang.vikramSamvat : "Samvat " + panchang.vikramSamvat}</span>',
    '<span>{isTe ? "సంవత్సరం " + panchang.vikramSamvat : isHi ? "संवत " + panchang.vikramSamvat : "Samvat " + panchang.vikramSamvat}</span>'
)

code = code.replace(
    '<span className="text-muted block text-[10px] uppercase font-bold">{isHi ? "तिथि" : "Tithi"}</span>',
    '<span className="text-muted block text-[10px] uppercase font-bold">{isTe ? "తిథి" : isHi ? "तिथि" : "Tithi"}</span>'
)

code = code.replace(
    '{isHi ? (panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष") : panchang.tithiAtSunrise.paksha + " Paksha"}',
    '{isTe ? (panchang.tithiAtSunrise.paksha === "shukla" ? "శుక్ల పక్షం" : "కృష్ణ పక్షం") : isHi ? (panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष") : panchang.tithiAtSunrise.paksha + " Paksha"}'
)

code = code.replace(
    '<span className="text-muted block text-[10px] uppercase font-bold">{isHi ? "नक्षत्र" : "Nakshatra"}</span>',
    '<span className="text-muted block text-[10px] uppercase font-bold">{isTe ? "నక్షత్రం" : isHi ? "नक्षत्र" : "Nakshatra"}</span>'
)

code = code.replace(
    '{isHi ? `पाद ${panchang.nakshatra.pada}` : `Pada ${panchang.nakshatra.pada}`}',
    '{isTe ? `పాదము ${panchang.nakshatra.pada}` : isHi ? `पाद ${panchang.nakshatra.pada}` : `Pada ${panchang.nakshatra.pada}`}'
)

code = code.replace(
    '<span className="text-muted block text-[10px] uppercase font-bold">{isHi ? "सूर्योदय / सूर्यास्त" : "Sun Times"}</span>',
    '<span className="text-muted block text-[10px] uppercase font-bold">{isTe ? "సూర్యోదయం / సూర్యాస్తమయం" : isHi ? "सूर्योदय / सूर्यास्त" : "Sun Times"}</span>'
)

code = code.replace(
    '<span className="text-muted block text-[10px] uppercase font-bold">{isHi ? "राहु काल" : "Rahu Kaal"}</span>',
    '<span className="text-muted block text-[10px] uppercase font-bold">{isTe ? "రాహు కాలం" : isHi ? "राहु काल" : "Rahu Kaal"}</span>'
)

code = code.replace(
    '{isHi ? "अभिजित मुहूर्त (सर्वकार्य सिद्धि):" : "Abhijit Muhurat (Best Shubh):"}',
    '{isTe ? "అభిజిత్ ముహూర్తం (సర్వకార్య సిద్ధి):" : isHi ? "अभिजित मुहूर्त (सर्वकार्य सिद्धि):" : "Abhijit Muhurat (Best Shubh):"}'
)

code = code.replace(
    '{isHi ? "आज का दैनिक मन्त्र" : "Daily Sacred Mantra"}',
    '{isTe ? "నేటి దిన మంత్రం" : isHi ? "आज का दैनिक मन्त्र" : "Daily Sacred Mantra"}'
)

code = code.replace(
    'BhaktiVoice.com • {isHi ? "दैनिक वैदिक पंचांग" : "Vedic Panchang & Muhurat"}',
    'BhaktiVoice.com • {isTe ? "దిన వైదిక పంచాంగం" : isHi ? "दैनिक वैदिक पंचांग" : "Vedic Panchang & Muhurat"}'
)

code = code.replace(
    '<span>{isHi ? (copied ? "कॉपी हो गया!" : "टेक्स्ट कॉपी करें") : copied ? "Copied!" : "Copy Text"}</span>',
    '<span>{isTe ? (copied ? "కాపీ చేయబడింది!" : "టెక్స్ట్ కాపీ చేయండి") : isHi ? (copied ? "कॉपी हो गया!" : "टेक्स्ट कॉपी करें") : copied ? "Copied!" : "Copy Text"}</span>'
)

code = code.replace(
    '<span>{isHi ? "प्रिंट / PDF" : "Print"}</span>',
    '<span>{isTe ? "ప్రింట్ / PDF" : isHi ? "प्रिंट / PDF" : "Print"}</span>'
)

with open("src/components/panchang/PanchangShareCardModal.tsx", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated PanchangShareCardModal.tsx")
