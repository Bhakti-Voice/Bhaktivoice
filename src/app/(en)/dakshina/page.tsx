import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SevaSupportBanner } from "@/components/dakshina/SevaSupportBanner";
import { FaqList } from "@/components/seo/FaqList";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";
import { getLocale } from "@/lib/i18n/server";
import type { Faq } from "@/lib/content/types";
import { ShieldCheck, Server, Users } from "lucide-react";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Digital Dakshina — Support Our Seva | Bhakti Voice",
  description:
    "Bhakti Voice is a 100% ad-free spiritual sanctuary. Offer a small digital dakshina (₹51, ₹101, ₹501, ₹1100, ₹2100) to help us cover server costs and keep our daily sadhana resources free for all devotees.",
  keywords: [
    "Digital Dakshina",
    "Support Bhakti Voice",
    "Seva Donation",
    "UPI Dakshina",
    "Ad-free Spiritual Site",
    "Bhakti Seva",
    "डिजिटल दक्षिणा",
    "भक्ति वॉयस सेवा",
  ],
  alternates: {
    canonical: "/dakshina",
  },
};

const FAQ_EN: Faq[] = [
  {
    question: "Why does Bhakti Voice request a Digital Dakshina?",
    answer:
      "Unlike commercial platforms that flood spiritual seekers with betting ads, popup banners, and commercial trackers, Bhakti Voice is dedicated to being a 100% pure, ad-free sanctuary. Running high-precision astronomical engines for Panchang, real-time Kundli generation, audio kathas, and high-speed cloud infrastructure requires continuous upkeep. Your dakshina directly covers these server, computing, and hosting expenses.",
  },
  {
    question: "Which payment apps are supported for Dakshina?",
    answer:
      "Any standard UPI application in India is supported, including Google Pay (GPay), PhonePe, Paytm, BHIM UPI, Amazon Pay, Cred, and all major mobile banking applications. Simply scan the dynamic QR code on the page or send directly to UPI ID: **7060383962@ybl**.",
  },
  {
    question: "Can I choose my own contribution amount?",
    answer:
      "Yes, absolutely. While we provide sacred preset suggestions such as ₹51 (Shubh Bhent), ₹101 (Seva Sankalp), ₹501 (Vishesh Sahyog), ₹1,100 (Maha Seva), ₹2,100 (Kalyan Seva), and ₹11,000 (Sansthan Mitra), you can enter any custom amount of your choice in the amount input box.",
  },
  {
    question: "How do I pay if I am browsing on a mobile phone?",
    answer:
      "When browsing on a mobile device, you do not need to scan the QR code. Simply tap the **'Pay via UPI App (Mobile)'** button. It will directly launch your installed UPI app (Google Pay, PhonePe, or Paytm) with our verified payee details and your chosen amount pre-filled.",
  },
  {
    question: "Is any amount deducted as platform fee or gateway commission?",
    answer:
      "No. Because you pay directly via peer-to-peer UPI to **7060383962@ybl**, 100% of your dakshina reaches directly without third-party intermediary cuts or gateway charges. Every single rupee goes towards keeping the site fast, ad-free, and running smoothly.",
  },
  {
    question: "Will the site and spiritual resources always remain free for all devotees?",
    answer:
      "Yes. Our core commitment is that sacred wisdom, daily panchang, kathas, chalisas, aartis, and prayer tools must remain open and free for every devotee regardless of financial means. Voluntary contributions from those who are able help keep it accessible to everyone.",
  },
  {
    question: "Is my payment safe and secure?",
    answer:
      "Yes, completely. UPI transactions are protected by bank-grade security protocols governed by the National Payments Corporation of India (NPCI) and authorized only through your confidential UPI PIN on your phone. Bhakti Voice never collects, stores, or handles your bank account credentials.",
  },
];

const FAQ_HI: Faq[] = [
  {
    question: "डिजिटल दक्षिणा क्या है और भक्ति वॉयस को सहयोग की आवश्यकता क्यों है?",
    answer:
      "भक्ति वॉयस पूरी तरह विज्ञापन-मुक्त आध्यात्मिक मंच है — यहाँ कोई सट्टेबाजी (betting) विज्ञापन, अवांछित पॉपअप या कमर्शियल ट्रैकर नहीं हैं, जिससे आपकी साधना और एकाग्रता शुद्ध बनी रहे। पंचांग की सूक्ष्म खगोलीय गणना, वास्तविक समय में जन्म कुंडली निर्माण और दैनिक कथाओं को होस्ट करने हेतु हाई-स्पीड क्लाउड सर्वर की आवश्यकता होती है। आपकी छोटी सी डिजिटल दक्षिणा इन सर्वर व रखरखाव खर्चों को वहन करने में सीधा सहयोग करती है।",
  },
  {
    question: "दक्षिणा अर्पित करने हेतु कौन-से UPI ऐप्स मान्य हैं?",
    answer:
      "भारत के सभी प्रमुख UPI ऐप्स समर्थित हैं, जिनमें Google Pay (GPay), PhonePe, Paytm, BHIM UPI, Amazon Pay, Cred और सभी बैंक ऐप्स शामिल हैं। आप पेज पर प्रदर्शित QR कोड को स्कैन कर सकते हैं या सीधे UPI ID: **7060383962@ybl** पर भेज सकते हैं।",
  },
  {
    question: "क्या मैं अपनी इच्छानुसार कोई भी राशि चुन सकता हूँ?",
    answer:
      "हाँ, बिल्कुल। हमने सुविधा हेतु ₹51 (शुभ भेंट), ₹101 (सेवा संकल्प), ₹501 (विशेष सहयोग), ₹1,100 (महा सेवा), ₹2,100 (कल्याण सेवा) और ₹11,000 (संस्थान मित्र) के विकल्प दिए हैं। आप 'अन्य राशि' बॉक्स में अपनी श्रद्धानुसार कोई भी राशि दर्ज कर सकते हैं।",
  },
  {
    question: "यदि मैं मोबाइल पर वेबसाइट देख रहा हूँ तो कैसे भुगतान करूँ?",
    answer:
      "मोबाइल पर आपको स्क्रीन का QR कोड स्कैन करने की आवश्यकता नहीं है। बस **'UPI ऐप से भुगतान करें'** बटन पर टैप करें। यह सीधे आपके फोन में मौजूद Google Pay, PhonePe या Paytm को खोलेगा और राशि व विवरण स्वतः भर देगा।",
  },
  {
    question: "क्या दक्षिणा में से कोई गेटवे या बिचौलिया कमीशन कटता है?",
    answer:
      "नहीं। चूँकि भुगतान सीधे UPI ID (**7060383962@ybl**) पर होता है, इसलिए 100% दक्षिणा बिना किसी मध्यस्थ शुल्क या कटौती के सीधे सर्वर रखरखाव व सेवा कार्य में उपयोग होती है।",
  },
  {
    question: "क्या भक्ति वॉयस की सभी सेवाएँ सदा निःशुल्क रहेंगी?",
    answer:
      "हाँ। हमारा मूल संकल्प है कि दैनिक पंचांग, कथा, आरती, चालीसा और जप साधना साधन सभी भक्तों, विद्यार्थियों और वरिष्ठजनों के लिए सदा पूरी तरह निःशुल्क रहेंगे। समर्थ भक्तों का स्वैच्छिक सहयोग इसे सबके लिए खुला बनाए रखता है।",
  },
  {
    question: "क्या मेरा भुगतान पूर्णतः सुरक्षित है?",
    answer:
      "हाँ, 100% सुरक्षित। UPI प्रणाली NPCI (भारतीय राष्ट्रीय भुगतान निगम) और भारतीय बैंकों द्वारा संचालित है, जो आपके व्यक्तिगत UPI PIN से ही प्रमाणित होती है। भक्ति वॉयस किसी भी प्रकार का बैंक विवरण या कार्ड डेटा संग्रहीत नहीं करता।",
  },
];

export default async function DakshinaPage() {
  const locale = await getLocale();
  const isHi = locale === "hi";

  const crumbs = pageCrumbs([
    isHi ? "डिजिटल दक्षिणा" : "Digital Dakshina",
    PATHS.dakshina,
  ]);

  const faqs = isHi ? FAQ_HI : FAQ_EN;
  const faqTitle = isHi
    ? "डिजिटल दक्षिणा — अक्सर पूछे जाने वाले प्रश्न (FAQ)"
    : "Frequently Asked Questions on Digital Dakshina";

  return (
    <div className="bg-ivory pb-20">
      {/* Hero Header */}
      <PageHero
        title={isHi ? "सेवा समर्पण | डिजिटल दक्षिणा" : "सेवा समर्पण | Digital Dakshina"}
        subtitle={
          isHi
            ? "100% विज्ञापन-मुक्त पवित्र आध्यात्मिक मंच — सेवा और निष्ठा से निर्मित"
            : "A 100% Ad-Free Devotional Sanctuary Built with Love & Seva"
        }
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* Core Seva Banner Widget */}
        <SevaSupportBanner
          title={isHi ? "अपनी डिजिटल दक्षिणा अर्पित करें" : "Offer Your Digital Dakshina"}
          subtitle={
            isHi
              ? "यदि भक्ति वॉयस ने आपके जीवन में शांति, भक्ति और दैनिक साधना में सहायता की है, तो सर्वर खर्च और इस सेवा को अविरल बनाए रखने हेतु एक छोटी सी दक्षिणा अवश्य अर्पित करें।"
              : "If Bhakti Voice has brought peace, clarity, or devotion into your life, consider offering a small contribution to help us maintain servers, compute daily panchang, and keep this sanctuary ad-free."
          }
        />

        {/* Why Support Section */}
        <section aria-labelledby="why-support-heading" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2
              id="why-support-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-ink"
            >
              {isHi ? "आपका सहयोग क्यों महत्वपूर्ण है?" : "Why Your Support Matters"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted">
              {isHi
                ? "हमने पहले दिन से एक संकल्प लिया: कोई विज्ञापन नहीं, कोई ट्रैकर नहीं और भक्ति का कोई व्यवसायीकरण नहीं।"
                : "We made a solemn promise from day one: no ads, no trackers, and no commercialization of sacred devotion."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-amber-200/90 bg-white p-6 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80 text-maroon mb-4">
                <ShieldCheck className="h-6 w-6 text-saffron" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink">
                {isHi ? "100% विज्ञापन-मुक्त अनुभव" : "100% Ad-Free Experience"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                {isHi
                  ? "कोई कष्टप्रद पॉपअप या सट्टेबाजी के बैनर नहीं। जब आप मंत्र जप या पवित्र कथा पढ़ते हैं, आपका ध्यान पूर्णतः ईश्वर में रहता है।"
                  : "No intrusive popups, casino ads, or disruptive banners. When you chant or read sacred kathas, your spiritual focus remains entirely pure."}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200/90 bg-white p-6 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80 text-maroon mb-4">
                <Server className="h-6 w-6 text-saffron" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink">
                {isHi ? "सटीक क्लाउड कम्प्यूटिंग" : "Precision Cloud Compute"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                {isHi
                  ? "ग्रह स्थिति, पंचांग गणित, होरा और कुंडली गणना आधुनिक क्लाउड सर्वर्स पर निरंतर प्रोसेस होती है, जो प्रतिदिन हजारों भक्तों को सेवा देती है।"
                  : "Real-time planetary ephemeris, Panchang math, Hora, and Kundli engines run on modern cloud servers serving thousands of requests each day."}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200/90 bg-white p-6 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80 text-maroon mb-4">
                <Users className="h-6 w-6 text-saffron" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink">
                {isHi ? "सबके लिए सदा निःशुल्क" : "Free Access for Everyone"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                {isHi
                  ? "आपकी स्वैच्छिक दक्षिणा यह सुनिश्चित करती है कि विद्यार्थी, वृद्ध और हर साधक बिना किसी शुल्क के वैदिक ज्ञान प्राप्त कर सके।"
                  : "Your voluntary dakshina pays it forward, ensuring students, elders, and seekers everywhere can freely access spiritual texts without paywalls."}
              </p>
            </div>
          </div>
        </section>

        {/* Sacred Shloka Card */}
        <div className="rounded-2xl border border-amber-300/70 bg-gradient-to-r from-amber-50 via-cream to-amber-50 p-6 sm:p-8 text-center shadow-inner">
          <span className="text-2xl">🪔</span>
          <blockquote className="mt-3 font-serif text-base sm:text-lg italic text-maroon">
            “यज्ञशिष्टाशिनः सन्तो मुच्यन्ते सर्वकिल्बिषैः । भुञ्जते ते त्वघं पापा ये पचन्त्यात्मकारणात् ॥”
          </blockquote>
          <p className="mt-2 text-xs sm:text-sm text-muted max-w-xl mx-auto">
            {isHi
              ? "(जो भक्त सेवा और यज्ञ के बाद बचा प्रसाद ग्रहण करते हैं, वे सब पापों से मुक्त हो जाते हैं। जो केवल अपने लिए साधन जुटाते हैं, वे पाप ही खाते हैं। — श्रीमद्भगवद्गीता ३.१३)"
              : "(The spiritually noble who share and offer seva are freed from all bondages. Those who offer with devotion sustain the divine cycle of life. — Bhagavad Gita 3.13)"}
          </p>
        </div>

        {/* FAQs Component */}
        <FaqList faqs={faqs} title={faqTitle} />
      </div>
    </div>
  );
}
