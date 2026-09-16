# Group 5: Bhakti Store & Cart
import re

# 1. src/app/bhakti-store/page.tsx
with open("src/app/bhakti-store/page.tsx", "r", encoding="utf-8") as f:
    bs = f.read()

bs = bs.replace(
'''  const [products, t, locale] = await Promise.all([
    listProducts(),
    getMessages(),
    getLocale(),
  ]);
  const isHi = locale === "hi";''',
'''  const [products, t, locale] = await Promise.all([
    listProducts(),
    getMessages(),
    getLocale(),
  ]);
  const isTe = locale === "te";
  const isHi = locale === "hi";'''
)

bs = bs.replace(
    'title={isHi ? "भक्ति स्टोर — प्रामाणिक साधना एवं पूजा सामग्री" : t.hubs.store.h1}',
    'title={isTe ? "భక్తి స్టోర్ — ప్రామాణిక సాధన & పూజా సామగ్రి" : isHi ? "भक्ति स्टोर — प्रामाणिक साधना एवं पूजा सामग्री" : t.hubs.store.h1}'
)
bs = bs.replace(
'''        subtitle={
          isHi
            ? "दैनिक नाम जप एवं पूजन हेतु 100% शुद्ध तुलसी माला, रुद्राक्ष, पीतल दीपक एवं सिद्ध यंत्र।"
            : "Authentic tulsi malas, rudraksha, brass diyas, and sacred yantras for your daily devotional sadhana."
        }''',
'''        subtitle={
          isTe
            ? "దైనందిన నామ జపం మరియు పూజల కోసం 100% స్వచ్ఛమైన తులసి మాలలు, రుద్రాక్షలు, ఇత్తడి దీపాలు మరియు సిద్ధ యంత్రాలు."
            : isHi
            ? "दैनिक नाम जप एवं पूजन हेतु 100% शुद्ध तुलसी माला, रुद्राक्ष, पीतल दीपक एवं सिद्ध यंत्र।"
            : "Authentic tulsi malas, rudraksha, brass diyas, and sacred yantras for your daily devotional sadhana."
        }'''
)
bs = bs.replace(
    '[isHi ? "स्टोर" : t.nav.store, PATHS.store],',
    '[isTe ? "భక్తి స్టోర్" : isHi ? "स्टोर" : t.nav.store, PATHS.store],'
)
bs = bs.replace(
    '{isHi ? "दैनिक साधना सामग्री संग्रह" : "Sacred Sadhana Essentials"}',
    '{isTe ? "పవిత్ర సాధనా సామగ్రి సేకరణ" : isHi ? "दैनिक साधना सामग्री संग्रह" : "Sacred Sadhana Essentials"}'
)
bs = bs.replace(
'''            <p className="text-xs text-muted sm:text-sm">
              {isHi
                ? "शुद्ध प्राकृतिक तत्वों से निर्मित, पूजा और जप हेतु उपयुक्त सामग्री।"
                : "Handcrafted, natural, and respectful companions for your shrine and daily chanting."}
            </p>''',
'''            <p className="text-xs text-muted sm:text-sm">
              {isTe
                ? "సహజ సిద్ధమైన పవిత్ర ద్రవ్యాలతో తయారైన పూజా మరియు జప సామగ్రి."
                : isHi
                ? "शुद्ध प्राकृतिक तत्वों से निर्मित, पूजा और जप हेतु उपयुक्त सामग्री।"
                : "Handcrafted, natural, and respectful companions for your shrine and daily chanting."}
            </p>'''
)
bs = bs.replace(
    'title={isHi ? "भक्ति स्टोर से संबंधित सामान्य प्रश्न" : t.common.faqTitle}',
    'title={isTe ? "భక్తి స్టోర్ గురించి తరచుగా అడిగే ప్రశ్నలు (FAQs)" : isHi ? "भक्ति स्टोर से संबंधित सामान्य प्रश्न" : t.common.faqTitle}'
)

with open("src/app/bhakti-store/page.tsx", "w", encoding="utf-8") as f:
    f.write(bs)
print("SUCCESS: Updated bhakti-store/page.tsx")

# 2. src/app/bhakti-store/[slug]/page.tsx
with open("src/app/bhakti-store/[slug]/page.tsx", "r", encoding="utf-8") as f:
    bsp = f.read()

bsp = bsp.replace(
'''  const isHi = locale === "hi";''',
'''  const isTe = locale === "te";
  const isHi = locale === "hi";'''
)
bsp = bsp.replace(
    '{isHi ? "स्टॉक समाप्त" : "Out of Stock"}',
    '{isTe ? "స్టాక్ పూర్తయింది" : isHi ? "स्टॉक समाप्त" : "Out of Stock"}'
)
bsp = bsp.replace(
    '{discountPercent}% {isHi ? "छूट" : "OFF"}',
    '{discountPercent}% {isTe ? "రాయితీ" : isHi ? "छूट" : "OFF"}'
)
bsp = bsp.replace(
    '• 128 {isHi ? "भक्तों की समीक्षा" : "Devotee Reviews"}',
    '• 128 {isTe ? "భక్తుల సమీక్షలు" : isHi ? "भक्तों की समीक्षा" : "Devotee Reviews"}'
)
bsp = bsp.replace(
    '• 100% {isHi ? "प्रामाणिक" : "Authentic"}',
    '• 100% {isTe ? "ప్రామాణికం" : isHi ? "प्रामाणिक" : "Authentic"}'
)
bsp = bsp.replace(
    '{isHi ? `${discountPercent}% की बचत` : `Save ${discountPercent}%`}',
    '{isTe ? `${discountPercent}% ఆదా` : isHi ? `${discountPercent}% की बचत` : `Save ${discountPercent}%`}'
)
bsp = bsp.replace(
    '{isHi ? "सभी कर सम्मिलित • भारत भर में सुरक्षित प्रेषण" : "Inclusive of all taxes • Pan-India safe dispatch"}',
    '{isTe ? "అన్ని పన్నులు కలిపి • భారతదేశమంతటా సురక్షిత డెలివరీ" : isHi ? "सभी कर सम्मिलित • भारत भर में सुरक्षित प्रेषण" : "Inclusive of all taxes • Pan-India safe dispatch"}'
)
bsp = bsp.replace(
    '<span>{isHi ? "100% शुद्ध एवं नैसर्गिक सामग्री" : "100% Pure & Natural Materials"}</span>',
    '<span>{isTe ? "100% స్వచ్ఛమైన & సహజ పదార్థాలు" : isHi ? "100% शुद्ध एवं नैसर्गिक सामग्री" : "100% Pure & Natural Materials"}</span>'
)
bsp = bsp.replace(
    '<span>{isHi ? "₹499 से अधिक के ऑर्डर पर मुफ्त डिलीवरी" : "Free Pan-India Delivery on orders over ₹499"}</span>',
    '<span>{isTe ? "₹499 పైబడిన ఆర్డర్లపై ఉచిత డెలివరీ" : isHi ? "₹499 से अधिक के ऑर्डर पर मुफ्त डिलीवरी" : "Free Pan-India Delivery on orders over ₹499"}</span>'
)
bsp = bsp.replace(
    '<span>{isHi ? "दैनिक नाम जप एवं पूजन हेतु उपयुक्त" : "Ideal for daily Naam Jaap and Puja rituals"}</span>',
    '<span>{isTe ? "నిత్య నామ జపం & పూజాధికాలకు అనువైనది" : isHi ? "दैनिक नाम जप एवं पूजन हेतु उपयुक्त" : "Ideal for daily Naam Jaap and Puja rituals"}</span>'
)
bsp = bsp.replace(
    '{isHi ? "सामग्री विवरण एवं आध्यात्मिक महत्व" : "Product Details & Spiritual Significance"}',
    '{isTe ? "వస్తువు వివరాలు & ఆధ్యాత్మిక ప్రాముఖ్యత" : isHi ? "सामग्री विवरण एवं आध्यात्मिक महत्व" : "Product Details & Spiritual Significance"}'
)
bsp = bsp.replace(
    '{isHi ? "अन्य आध्यात्मिक साधन सामग्री" : "Related Sadhana Companions"}',
    '{isTe ? "ఇతర ఆధ్యాత్మిక సాధన సామగ్రి" : isHi ? "अन्य आध्यात्मिक साधन सामग्री" : "Related Sadhana Companions"}'
)

with open("src/app/bhakti-store/[slug]/page.tsx", "w", encoding="utf-8") as f:
    f.write(bsp)
print("SUCCESS: Updated bhakti-store/[slug]/page.tsx")

# 3. src/app/cart/page.tsx
with open("src/app/cart/page.tsx", "r", encoding="utf-8") as f:
    cp = f.read()

cp = cp.replace(
'''  const locale = await getLocale();
  const isHi = locale === "hi";''',
'''  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";'''
)
cp = cp.replace(
    'title: isHi ? "आपकी साधना थाल (Cart) — भक्ति स्टोर" : "Your Sadhana Cart — Bhakti Store",',
    'title: isTe ? "మీ సాధనా తాంబూలం (Cart) — భక్తి స్టోర్" : isHi ? "आपकी साधना थाल (Cart) — भक्ति स्टोर" : "Your Sadhana Cart — Bhakti Store",'
)
cp = cp.replace(
'''export default async function CartPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";''',
'''export default async function CartPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";'''
)
cp = cp.replace(
    'title={isHi ? "आपकी साधना थाल" : "Your Sadhana Cart"}',
    'title={isTe ? "మీ సాధనా తాంబూలం" : isHi ? "आपकी साधना थाल" : "Your Sadhana Cart"}'
)
cp = cp.replace(
'''        subtitle={
          isHi
            ? "दैनिक पूजा एवं नाम जप हेतु चयनित प्रामाणिक सामग्री।"
            : "Authentic companions chosen for your daily devotional practice."
        }''',
'''        subtitle={
          isTe
            ? "నిత్య పూజ మరియు నామ జపం కోసం ఎంపిక చేసుకున్న ప్రామాణిక సామగ్రి."
            : isHi
            ? "दैनिक पूजा एवं नाम जप हेतु चयनित प्रामाणिक सामग्री।"
            : "Authentic companions chosen for your daily devotional practice."
        }'''
)
cp = cp.replace(
    '[isHi ? "कार्ट" : "Cart", "/cart"],',
    '[isTe ? "కార్ట్" : isHi ? "कार्ट" : "Cart", "/cart"],'
)

with open("src/app/cart/page.tsx", "w", encoding="utf-8") as f:
    f.write(cp)
print("SUCCESS: Updated cart/page.tsx")

# 4. src/components/store/AddToCartButton.tsx
with open("src/components/store/AddToCartButton.tsx", "r", encoding="utf-8") as f:
    atc = f.read()

atc = atc.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
atc = atc.replace(
    '{isHi ? "यह सामग्री वर्तमान में स्टॉक में नहीं है" : "Currently Out of Stock"}',
    '{isTe ? "ప్రస్తుతం ఈ వస్తువు స్టాక్ లో లేదు" : isHi ? "यह सामग्री वर्तमान में स्टॉक में नहीं है" : "Currently Out of Stock"}'
)
atc = atc.replace(
    '{isHi ? "कार्ट में जोड़ा गया!" : "Added to Cart!"}',
    '{isTe ? "కార్ట్‌కు జోడించబడింది!" : isHi ? "कार्ट में जोड़ा गया!" : "Added to Cart!"}'
)
atc = atc.replace(
    '{isHi ? "कार्ट में जोड़ें" : "Add to Cart"}',
    '{isTe ? "కార్ట్‌కు జోడించండి" : isHi ? "कार्ट में जोड़ें" : "Add to Cart"}'
)
atc = atc.replace(
    '{isHi ? "तुरंत ऑर्डर करें (Buy Now)" : "Buy Now"}',
    '{isTe ? "ఇప్పుడే కొనండి (Buy Now)" : isHi ? "तुरंत ऑर्डर करें (Buy Now)" : "Buy Now"}'
)

with open("src/components/store/AddToCartButton.tsx", "w", encoding="utf-8") as f:
    f.write(atc)
print("SUCCESS: Updated AddToCartButton.tsx")

# 5. src/components/store/CartView.tsx
with open("src/components/store/CartView.tsx", "r", encoding="utf-8") as f:
    cv = f.read()

cv = cv.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
cv = cv.replace(
    '{isHi ? "आपकी पूजा थाल अभी रिक्त है" : "Your Devotional Cart is Empty"}',
    '{isTe ? "మీ పూజా తాంబూలం ప్రస్తుతం ఖాళీగా ఉంది" : isHi ? "आपकी पूजा थाल अभी रिक्त है" : "Your Devotional Cart is Empty"}'
)
cv = cv.replace(
    '<span>{isHi ? "भक्ति स्टोर देखें" : "Explore Bhakti Store"}</span>',
    '<span>{isTe ? "భక్తి స్టోర్ చూడండి" : isHi ? "भक्ति स्टोर देखें" : "Explore Bhakti Store"}</span>'
)
cv = cv.replace(
    '{isHi ? "साधना सामग्री थाल" : "Your Sadhana Cart"} ({items.length})',
    '{isTe ? "మీ సాధనా తాంబూలం" : isHi ? "साधना सामग्री थाल" : "Your Sadhana Cart"} ({items.length})'
)
cv = cv.replace(
    '{isHi ? "थाल रिक्त करें" : "Clear All"}',
    '{isTe ? "అన్నీ తీసివేయండి" : isHi ? "थाल रिक्त करें" : "Clear All"}'
)
cv = cv.replace(
    '{isHi ? "ऑर्डर मूल्य विवरण" : "Order Summary"}',
    '{isTe ? "ఆర్డర్ వివరాలు" : isHi ? "ऑर्डर मूल्य विवरण" : "Order Summary"}'
)
cv = cv.replace(
    'placeholder={isHi ? "कूपन कोड (BHAKTI10)" : "Promo code (BHAKTI10)"}',
    'placeholder={isTe ? "కూపన్ కోడ్ (BHAKTI10)" : isHi ? "कूपन कोड (BHAKTI10)" : "Promo code (BHAKTI10)"}'
)
cv = cv.replace(
    '{isHi ? "लागू" : "Apply"}',
    '{isTe ? "వర్తింపజేయండి" : isHi ? "लागू" : "Apply"}'
)
cv = cv.replace(
    '<dt className="text-muted">{isHi ? "कुल सामग्री मूल्य" : "Item Subtotal"}</dt>',
    '<dt className="text-muted">{isTe ? "మొత్తం వస్తువుల ధర" : isHi ? "कुल सामग्री मूल्य" : "Item Subtotal"}</dt>'
)

with open("src/components/store/CartView.tsx", "w", encoding="utf-8") as f:
    f.write(cv)
print("SUCCESS: Updated CartView.tsx")

# 6. src/components/store/ProductCard.tsx
with open("src/components/store/ProductCard.tsx", "r", encoding="utf-8") as f:
    pc = f.read()

pc = pc.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
pc = pc.replace(
    '{isHi ? "स्टॉक समाप्त" : "Out of Stock"}',
    '{isTe ? "స్టాక్ పూర్తయింది" : isHi ? "स्टॉक समाप्त" : "Out of Stock"}'
)
pc = pc.replace(
    '{discountPercent}% {isHi ? "छूट" : "OFF"}',
    '{discountPercent}% {isTe ? "రాయితీ" : isHi ? "छूट" : "OFF"}'
)
pc = pc.replace(
    '{isHi ? "मुफ्त पवित्र पैकेजिंग" : "Free Sacred Packaging"}',
    '{isTe ? "ఉచిత పవిత్ర ప్యాకేజింగ్" : isHi ? "मुफ्त पवित्र पैकेजिंग" : "Free Sacred Packaging"}'
)
pc = pc.replace(
    '<span>{isHi ? "जोड़ा गया!" : "Added!"}</span>',
    '<span>{isTe ? "జోడించబడింది!" : isHi ? "जोड़ा गया!" : "Added!"}</span>'
)
pc = pc.replace(
    '<span>{isHi ? "कार्ट" : "Add"}</span>',
    '<span>{isTe ? "జోడించండి" : isHi ? "कार्ट" : "Add"}</span>'
)

with open("src/components/store/ProductCard.tsx", "w", encoding="utf-8") as f:
    f.write(pc)
print("SUCCESS: Updated ProductCard.tsx")

# 7. src/components/store/ProductTrustBadges.tsx
with open("src/components/store/ProductTrustBadges.tsx", "r", encoding="utf-8") as f:
    ptb = f.read()

ptb = ptb.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
ptb = ptb.replace(
    'title: isHi ? "100% प्रामाणिक एवं शुद्ध" : "100% Pure & Authentic",',
    'title: isTe ? "100% ప్రామాణిక & స్వచ్ఛమైనవి" : isHi ? "100% प्रामाणिक एवं शुद्ध" : "100% Pure & Authentic",'
)
ptb = ptb.replace(
    'title: isHi ? "पवित्र एवं सुरक्षित पैकिंग" : "Sanctified Packaging",',
    'title: isTe ? "పవిత్ర & సురక్షిత ప్యాకింగ్" : isHi ? "पवित्र एवं सुरक्षित पैकिंग" : "Sanctified Packaging",'
)
ptb = ptb.replace(
    'title: isHi ? "साधना हेतु यथार्थ भाव" : "True Sadhana Purpose",',
    'title: isTe ? "నిత్య సాధనకు అనువైనది" : isHi ? "साधना हेतु यथार्थ भाव" : "True Sadhana Purpose",'
)
ptb = ptb.replace(
    'title: isHi ? "अखिल भारतीय सुरक्षित डिलीवरी" : "Pan-India Safe Delivery",',
    'title: isTe ? "భారతదేశమంతటా సురక్షిత డెలివరీ" : isHi ? "अखिल भारतीय सुरक्षित डिलीवरी" : "Pan-India Safe Delivery",'
)

with open("src/components/store/ProductTrustBadges.tsx", "w", encoding="utf-8") as f:
    f.write(ptb)
print("SUCCESS: Updated ProductTrustBadges.tsx")

# 8. src/components/store/StoreCategoryFilter.tsx
with open("src/components/store/StoreCategoryFilter.tsx", "r", encoding="utf-8") as f:
    scf = f.read()

scf = scf.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
scf = scf.replace(
'''    if (clean === "malas") return isHi ? "जाप माला" : "Jaap Malas";
    if (clean === "yantras") return isHi ? "सिद्ध यंत्र" : "Sacred Yantras";
    if (clean === "puja") return isHi ? "पूजा सामग्री" : "Puja Essentials";
    if (clean === "books") return isHi ? "धार्मिक पुस्तकें" : "Sacred Books";''',
'''    if (clean === "malas") return isTe ? "జప మాలలు" : isHi ? "जाप माला" : "Jaap Malas";
    if (clean === "yantras") return isTe ? "సిద్ధ యంత్రాలు" : isHi ? "सिद्ध यंत्र" : "Sacred Yantras";
    if (clean === "puja") return isTe ? "పూజా సామగ్రి" : isHi ? "पूजा सामग्री" : "Puja Essentials";
    if (clean === "books") return isTe ? "ఆధ్యాత్మిక గ్రంథాలు" : isHi ? "धार्मिक पुस्तकें" : "Sacred Books";'''
)
scf = scf.replace(
    'placeholder={isHi ? "तुलसी माला, रुद्राक्ष, श्री यंत्र खोजें..." : "Search malas, yantras, diyas, puja items..."}',
    'placeholder={isTe ? "తులసి మాల, రుద్రాక్ష, శ్రీ యంత్రం వెతకండి..." : isHi ? "तुलसी माला, रुद्राक्ष, श्री यंत्र खोजें..." : "Search malas, yantras, diyas, puja items..."}'
)
scf = scf.replace(
    '{isHi ? "सभी सामग्री" : "All Items"} ({products.length})',
    '{isTe ? "అన్ని వస్తువులు" : isHi ? "सभी सामग्री" : "All Items"} ({products.length})'
)
scf = scf.replace(
    '<span>{isHi ? "केवल उपलब्ध" : "In Stock"}</span>',
    '<span>{isTe ? "లభ్యమయ్యేవి మాత్రమే" : isHi ? "केवल उपलब्ध" : "In Stock"}</span>'
)
scf = scf.replace(
    '{isHi ? "कोई सामग्री नहीं मिली" : "No Items Found"}',
    '{isTe ? "ఎటువంటి సామగ్రి లభించలేదు" : isHi ? "कोई सामग्री नहीं मिली" : "No Items Found"}'
)
scf = scf.replace(
    '{isHi ? "फ़िल्टर रीसेट करें" : "Reset Filters"}',
    '{isTe ? "ఫిల్టర్లను రీసెట్ చేయండి" : isHi ? "फ़िल्टर रीसेट करें" : "Reset Filters"}'
)

with open("src/components/store/StoreCategoryFilter.tsx", "w", encoding="utf-8") as f:
    f.write(scf)
print("SUCCESS: Updated StoreCategoryFilter.tsx")
