# Update CityPickerButton.tsx and CitySelectorModal.tsx for Telugu support
import re

# 1. Update CityPickerButton.tsx
city_picker_path = "src/components/panchang/CityPickerButton.tsx"
with open(city_picker_path, "r", encoding="utf-8") as f:
    cp_code = f.read()

cp_code = cp_code.replace(
    "export interface CityPickerButtonProps {\n  city: CityConfig;\n  onCityChange: (city: CityConfig) => void;\n  isHi?: boolean;\n  className?: string;\n  variant?: \"default\" | \"compact\" | \"pill\";\n}",
    "export interface CityPickerButtonProps {\n  city: CityConfig;\n  onCityChange: (city: CityConfig) => void;\n  isHi?: boolean;\n  isTe?: boolean;\n  className?: string;\n  variant?: \"default\" | \"compact\" | \"pill\";\n}"
)

cp_code = cp_code.replace(
    "export function CityPickerButton({\n  city,\n  onCityChange,\n  isHi = false,\n  className = \"\",\n  variant = \"default\",\n}: CityPickerButtonProps) {",
    "export function CityPickerButton({\n  city,\n  onCityChange,\n  isHi = false,\n  isTe = false,\n  className = \"\",\n  variant = \"default\",\n}: CityPickerButtonProps) {"
)

cp_code = cp_code.replace(
    'title={isHi ? "स्थान बदलें (100,000+ नगर व तीर्थ)" : "Change location (100,000+ cities & temples)"}',
    'title={isTe ? "ప్రాంతాన్ని మార్చండి (100,000+ నగరాలు & పుణ్యక్షేత్రాలు)" : isHi ? "स्थान बदलें (100,000+ नगर व तीर्थ)" : "Change location (100,000+ cities & temples)"}'
)

cp_code = cp_code.replace(
    "        isHi={isHi}\n      />",
    "        isHi={isHi}\n        isTe={isTe}\n      />"
)

with open(city_picker_path, "w", encoding="utf-8") as f:
    f.write(cp_code)

print("Updated CityPickerButton.tsx")

# 2. Update CitySelectorModal.tsx
modal_path = "src/components/panchang/CitySelectorModal.tsx"
with open(modal_path, "r", encoding="utf-8") as f:
    modal_code = f.read()

modal_code = modal_code.replace(
    "export interface CitySelectorModalProps {\n  isOpen: boolean;\n  onClose: () => void;\n  onSelectCity: (city: CityConfig) => void;\n  selectedCity: CityConfig;\n  isHi?: boolean;\n}",
    "export interface CitySelectorModalProps {\n  isOpen: boolean;\n  onClose: () => void;\n  onSelectCity: (city: CityConfig) => void;\n  selectedCity: CityConfig;\n  isHi?: boolean;\n  isTe?: boolean;\n}"
)

modal_code = modal_code.replace(
    "export function CitySelectorModal({\n  isOpen,\n  onClose,\n  onSelectCity,\n  selectedCity,\n  isHi = false,\n}: CitySelectorModalProps) {",
    "export function CitySelectorModal({\n  isOpen,\n  onClose,\n  onSelectCity,\n  selectedCity,\n  isHi = false,\n  isTe = false,\n}: CitySelectorModalProps) {"
)

modal_code = modal_code.replace(
    '''        setGpsError(
          err.code === 1
            ? isHi
              ? "स्थान अनुमति अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।"
              : "Location permission denied. Please allow access in browser."
            : isHi
            ? "स्थान प्राप्त करने में असमर्थ। कृपया पुनः प्रयास करें।"
            : "Unable to retrieve your location. Please try again."
        );''',
    '''        setGpsError(
          err.code === 1
            ? isTe
              ? "స్థాన అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతి ఇవ్వండి."
              : isHi
              ? "स्थान अनुमति अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।"
              : "Location permission denied. Please allow access in browser."
            : isTe
            ? "మీ స్థానాన్ని పొందడం సాధ్యం కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి."
            : isHi
            ? "स्थान प्राप्त करने में असमर्थ। कृपया पुनः प्रयास करें।"
            : "Unable to retrieve your location. Please try again."
        );'''
)

modal_code = modal_code.replace(
    'setCustomError(isHi ? "मान्य अक्षांश (-90 से +90) दर्ज करें।" : "Enter valid latitude (-90 to +90).");',
    'setCustomError(isTe ? "సరైన అక్షాంశం (-90 నుండి +90) నమోదు చేయండి." : isHi ? "मान्य अक्षांश (-90 से +90) दर्ज करें।" : "Enter valid latitude (-90 to +90).");'
)

modal_code = modal_code.replace(
    'setCustomError(isHi ? "मान्य देशांतर (-180 से +180) दर्ज करें।" : "Enter valid longitude (-180 to +180).");',
    'setCustomError(isTe ? "సరైన రేఖాంశం (-180 నుండి +180) నమోదు చేయండి." : isHi ? "मान्य देशांतर (-180 से +180) दर्ज करें।" : "Enter valid longitude (-180 to +180).");'
)

modal_code = modal_code.replace(
    '{isHi ? "स्थान चुनें (100,000+ विश्व नगर व तीर्थ)" : "Select Location (100,000+ Global Cities & Tirthas)"}',
    '{isTe ? "ప్రాంతాన్ని ఎంచుకోండి (100,000+ నగరాలు & పుణ్యక్షేత్రాలు)" : isHi ? "स्थान चुनें (100,000+ विश्व नगर व तीर्थ)" : "Select Location (100,000+ Global Cities & Tirthas)"}'
)

modal_code = modal_code.replace(
    '''              <p className="text-xs text-muted">
                {isHi
                  ? "सटीक सूर्योदय, सूर्यास्त व पंचांग हेतु स्थान खोजें या जीपीएस उपयोग करें"
                  : "Search any city worldwide, use GPS, or enter custom coordinates"}
              </p>''',
    '''              <p className="text-xs text-muted">
                {isTe
                  ? "ఖచ్చితమైన సూర్యోదయం, సూర్యాస్తమయం & పంచాంగం కోసం నగరాన్ని శోధించండి లేదా జీపీఎస్ ఉపయోగించండి"
                  : isHi
                  ? "सटीक सूर्योदय, सूर्यास्त व पंचांग हेतु स्थान खोजें या जीपीएस उपयोग करें"
                  : "Search any city worldwide, use GPS, or enter custom coordinates"}
              </p>'''
)

modal_code = modal_code.replace(
    'aria-label={isHi ? "बंद करें" : "Close"}',
    'aria-label={isTe ? "మూసివేయండి" : isHi ? "बंद करें" : "Close"}'
)

modal_code = modal_code.replace(
    '{isHi ? "शहर / तीर्थ खोजें" : "Search Cities & Tirthas"}',
    '{isTe ? "నగరం / తీర్థం శోధించండి" : isHi ? "शहर / तीर्थ खोजें" : "Search Cities & Tirthas"}'
)

modal_code = modal_code.replace(
    '{isHi ? "कस्टम अक्षांश / देशांतर" : "Custom Coordinates"}',
    '{isTe ? "కస్టమ్ అక్షాంశం / రేఖాంశం" : isHi ? "कस्टम अक्षांश / देशांतर" : "Custom Coordinates"}'
)

modal_code = modal_code.replace(
    '''                  placeholder={
                    isHi
                      ? "शहर, जिला, तीर्थ का नाम लिखें (उदा. वाराणसी, Edison, Udupi)..."
                      : "Search any city, town, or temple (e.g. Varanasi, Edison, Udupi)..."
                  }''',
    '''                  placeholder={
                    isTe
                      ? "నగరం, జిల్లా, పుణ్యక్షేత్రం పేరును శోధించండి (ఉదా. తిరుపతి, హైదరాబాద్, వారణాసి)..."
                      : isHi
                      ? "शहर, जिला, तीर्थ का नाम लिखें (उदा. वाराणसी, Edison, Udupi)..."
                      : "Search any city, town, or temple (e.g. Varanasi, Edison, Udupi)..."
                  }'''
)

modal_code = modal_code.replace(
    '<span>{isHi ? "मेरा स्थान (GPS)" : "Detect GPS"}</span>',
    '<span>{isTe ? "నా స్థానం (GPS)" : isHi ? "मेरा स्थान (GPS)" : "Detect GPS"}</span>'
)

modal_code = modal_code.replace(
    '{isHi ? "प्रमुख तीर्थ एवं लोकप्रिय नगर:" : "Popular Tirthas & Metros:"}',
    '{isTe ? "ప్రముఖ పుణ్యక్షేత్రాలు & నగరాలు:" : isHi ? "प्रमुख तीर्थ एवं लोकप्रिय नगर:" : "Popular Tirthas & Metros:"}'
)

modal_code = modal_code.replace(
    '{isHi ? "हाल ही में देखे गए स्थान:" : "Recently Selected:"}',
    '{isTe ? "ఇటీవల చూసిన ప్రాంతాలు:" : isHi ? "हाल ही में देखे गए स्थान:" : "Recently Selected:"}'
)

modal_code = modal_code.replace(
    '<span>{isHi ? "वैश्विक डेटाबेस में खोज रहे हैं..." : "Searching 100,000+ global locations..."}</span>',
    '<span>{isTe ? "ప్రపంచ డేటాబేస్‌లో శోధిస్తోంది..." : isHi ? "वैश्विक डेटाबेस में खोज रहे हैं..." : "Searching 100,000+ global locations..."}</span>'
)

modal_code = modal_code.replace(
    '{isHi ? "कोई स्थान नहीं मिला।" : "No locations found."}',
    '{isTe ? "ఎటువంటి ప్రాంతం కనుగొనబడలేదు." : isHi ? "कोई स्थान नहीं मिला।" : "No locations found."}'
)

modal_code = modal_code.replace(
    '''                  <p className="text-xs text-muted/80 mt-1">
                    {isHi
                      ? "आप 'कस्टम अक्षांश / देशांतर' टैब में जाकर सीधे निर्देशांक दर्ज कर सकते हैं।"
                      : "You can enter exact coordinates in the 'Custom Coordinates' tab."}
                  </p>''',
    '''                  <p className="text-xs text-muted/80 mt-1">
                    {isTe
                      ? "మీరు 'కస్టమ్ అక్షాంశం / రేఖాంశం' ట్యాబ్‌లో నేరుగా నమోదు చేయవచ్చు."
                      : isHi
                      ? "आप 'कस्टम अक्षांश / देशांतर' टैब में जाकर सीधे निर्देशांक दर्ज कर सकते हैं।"
                      : "You can enter exact coordinates in the 'Custom Coordinates' tab."}
                  </p>'''
)

modal_code = modal_code.replace(
    '{isHi ? "स्थान का नाम (वैकल्पिक)" : "Location Name (Optional)"}',
    '{isTe ? "ప్రాంతం పేరు (ఐచ్ఛికం)" : isHi ? "स्थान का नाम (वैकल्पिक)" : "Location Name (Optional)"}'
)

modal_code = modal_code.replace(
    'placeholder={isHi ? "उदा. मेरा घर, आश्रम, गाँव" : "e.g. Home, My Ashram, Hometown"}',
    'placeholder={isTe ? "ఉదా. మా ఊరు, నివాసం, ఆశ్రమం" : isHi ? "उदा. मेरा घर, आश्रम, गाँव" : "e.g. Home, My Ashram, Hometown"}'
)

modal_code = modal_code.replace(
    '{isHi ? "अक्षांश (Latitude: -90.00 to +90.00)" : "Latitude (-90.00 to +90.00) *"}',
    '{isTe ? "అక్షాంశం (Latitude: -90.00 to +90.00) *" : isHi ? "अक्षांश (Latitude: -90.00 to +90.00)" : "Latitude (-90.00 to +90.00) *"}'
)

modal_code = modal_code.replace(
    '{isHi ? "देशांतर (Longitude: -180.00 to +180.00)" : "Longitude (-180.00 to +180.00) *"}',
    '{isTe ? "రేఖాంశం (Longitude: -180.00 to +180.00) *" : isHi ? "देशांतर (Longitude: -180.00 to +180.00)" : "Longitude (-180.00 to +180.00) *"}'
)

modal_code = modal_code.replace(
    '{isHi ? "समुद्र तल से ऊंचाई (मीटर)" : "Elevation (Meters)"}',
    '{isTe ? "సముద్ర మట్టం నుండి ఎత్తు (మీటర్లు)" : isHi ? "समुद्र तल से ऊंचाई (मीटर)" : "Elevation (Meters)"}'
)

modal_code = modal_code.replace(
    '{isHi ? "समय क्षेत्र (Timezone) *" : "Timezone (IANA) *"}',
    '{isTe ? "సమయ మండలం (Timezone) *" : isHi ? "समय क्षेत्र (Timezone) *" : "Timezone (IANA) *"}'
)

modal_code = modal_code.replace(
    '{isHi ? "रद्द करें" : "Cancel"}',
    '{isTe ? "రద్దు చేయండి" : isHi ? "रद्द करें" : "Cancel"}'
)

modal_code = modal_code.replace(
    '{isHi ? "पंचांग गणना करें" : "Apply & Calculate Panchang"}',
    '{isTe ? "పంచాంగం లెక్కించండి" : isHi ? "पंचांग गणना करें" : "Apply & Calculate Panchang"}'
)

modal_code = modal_code.replace(
    '{isHi ? "वर्तमान चयनित स्थान:" : "Current Location:"}',
    '{isTe ? "ప్రస్తుతం ఎంచుకున్న ప్రాంతం:" : isHi ? "वर्तमान चयनित स्थान:" : "Current Location:"}'
)

modal_code = modal_code.replace(
    '{isHi ? "100% सटीक वैदिक गणित" : "100% Accurate Vedic Astronomy"}',
    '{isTe ? "100% ఖచ్చితమైన వైదిక గణితం" : isHi ? "100% सटीक वैदिक गणित" : "100% Accurate Vedic Astronomy"}'
)

with open(modal_path, "w", encoding="utf-8") as f:
    f.write(modal_code)

print("Updated CitySelectorModal.tsx")
