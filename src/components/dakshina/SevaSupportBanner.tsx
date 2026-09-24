"use client";

import { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";
import {
  Heart,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Server,
  Zap,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/client";

const UPI_ID = "7060383962@ybl";
const PAYEE_NAME = "Bhakti Voice";
const DEFAULT_AMOUNTS = [51, 101, 501, 1100, 2100, 11000] as const;

type PresetAmount = (typeof DEFAULT_AMOUNTS)[number];

const AMOUNT_LABELS: Record<PresetAmount, { en: string; hi: string }> = {
  51: { en: "Shubh Bhent", hi: "शुभ भेंट" },
  101: { en: "Seva Sankalp", hi: "सेवा संकल्प" },
  501: { en: "Vishesh Sahyog", hi: "विशेष सहयोग" },
  1100: { en: "Maha Seva", hi: "महा सेवा" },
  2100: { en: "Kalyan Seva", hi: "कल्याण सेवा" },
  11000: { en: "Sansthan Mitra", hi: "संस्थान मित्र" },
};

interface SevaSupportBannerProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SevaSupportBanner({
  title,
  subtitle,
  className = "",
}: SevaSupportBannerProps) {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [selectedAmount, setSelectedAmount] = useState<number | null>(101);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const activeAmount = customAmount
    ? Math.max(1, parseInt(customAmount, 10) || 0)
    : selectedAmount || 101;

  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${encodeURIComponent(activeAmount.toString())}&cu=INR&tn=${encodeURIComponent(
    "Digital Dakshina - Bhakti Voice Seva"
  )}`;

  const generateQR = useCallback(async (uri: string) => {
    try {
      const url = await QRCode.toDataURL(uri, {
        width: 260,
        margin: 1,
        errorCorrectionLevel: "M",
        color: {
          dark: "#1e140a",
          light: "#ffffff",
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error("QR Code generation error:", err);
    }
  }, []);

  useEffect(() => {
    generateQR(upiUri);
  }, [upiUri, generateQR]);

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      aria-label="Digital Dakshina Seva Banner"
      className={`relative overflow-hidden rounded-3xl border-2 border-amber-300/80 bg-gradient-to-b from-[#fffcf7] to-cream/80 p-6 sm:p-8 md:p-10 shadow-xl ${className}`}
    >
      {/* Decorative background glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl">
        {/* Top Sacred Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/70 px-3.5 py-1 text-xs font-semibold text-maroon shadow-xs mb-4">
          <Sparkles className="h-3.5 w-3.5 text-saffron" />
          <span>{isHi ? "100% विज्ञापन-मुक्त सेवा" : "100% Ad-Free Sanctuary"}</span>
        </div>

        {/* Heading & Pitch */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {title ||
                (isHi
                  ? "सेवा सहयोग | डिजिटल दक्षिणा"
                  : "Digital Dakshina — Support Our Seva")}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-muted">
              {subtitle ||
                (isHi
                  ? "भक्ति वॉयस पूर्णतः विज्ञापन-मुक्त आध्यात्मिक मंच है। यदि इस मंच से आपके जीवन में शांति और साधना में एकाग्रता प्राप्त होती है, तो सर्वर और दैनिक संचालन को जारी रखने हेतु एक छोटी सी डिजिटल दक्षिणा अर्पित करें।"
                  : "Bhakti Voice is a 100% ad-free sanctuary. If this site brings peace to your day, consider offering a small digital dakshina (₹51, ₹101, or ₹501) to help us cover server costs and keep our daily sadhana resources free for all devotees.")}
            </p>

            {/* Why Support Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-ink/80">
              <div className="flex items-center gap-2 rounded-xl bg-white/80 border border-amber-200/60 p-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{isHi ? "शून्य विज्ञापन, पूर्ण पवित्रता" : "Zero Popups or Ads"}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/80 border border-amber-200/60 p-2.5">
                <Server className="h-4 w-4 text-saffron shrink-0" />
                <span>{isHi ? "हाई-स्पीड सर्वर मेंटिनेंस" : "High-Speed Servers"}</span>
              </div>
            </div>

            {/* Preset Amount Selector */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-ink/90 mb-2">
                {isHi ? "दक्षिणा राशि चुनें:" : "Choose Contribution Amount:"}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {DEFAULT_AMOUNTS.map((amt) => {
                  const isSelected = selectedAmount === amt && !customAmount;
                  const label = AMOUNT_LABELS[amt];
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`flex flex-col items-center justify-center rounded-xl p-2 text-center transition-all ${
                        isSelected
                          ? "bg-gradient-to-b from-amber-500 to-saffron-deep text-white shadow-md ring-2 ring-amber-300 scale-105"
                          : "border border-amber-200/90 bg-white/90 text-ink hover:border-amber-400 hover:bg-amber-50/50"
                      }`}
                    >
                      <span className="font-serif text-sm font-bold">
                        ₹{amt.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`text-[9px] truncate max-w-full ${
                          isSelected ? "text-amber-100" : "text-muted"
                        }`}
                      >
                        {isHi ? label.hi : label.en}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount input */}
              <div className="mt-3 flex items-center gap-2 max-w-xs">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder={isHi ? "अन्य राशि (₹)..." : "Other amount (₹)..."}
                    value={customAmount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      setCustomAmount(val);
                      if (val) setSelectedAmount(null);
                    }}
                    className="w-full rounded-lg border border-amber-200 bg-white py-1.5 pl-6 pr-3 text-xs text-ink placeholder:text-muted/60 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron"
                  />
                </div>
                {customAmount && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomAmount("");
                      setSelectedAmount(101);
                    }}
                    className="text-xs text-muted hover:text-maroon underline underline-offset-2"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: QR Code & Payment Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border-2 border-amber-300/80 bg-white p-5 shadow-lg text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-maroon mb-2">
                <span>🙏</span>
                <span>{isHi ? "UPI से सीधे स्कैन करें" : "Scan Directly via any UPI"}</span>
                <span className="font-serif font-bold text-saffron">
                  ₹{activeAmount.toLocaleString("en-IN")}
                </span>
              </div>

              {/* QR Container */}
              <div className="relative mx-auto inline-block rounded-xl border border-line bg-white p-2 shadow-xs">
                {qrDataUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={qrDataUrl}
                    alt={`UPI QR Code for ${activeAmount}`}
                    className="h-48 w-48 sm:h-52 sm:w-52 rounded object-contain"
                    width={208}
                    height={208}
                  />
                ) : (
                  <div className="h-48 w-48 sm:h-52 sm:w-52 flex items-center justify-center bg-sand/30 rounded text-xs text-muted">
                    Generating QR...
                  </div>
                )}
                {/* Center OM badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border-2 border-amber-400">
                    <span className="text-base">🕉️</span>
                  </div>
                </div>
              </div>

              {/* UPI ID Field & Copy Button */}
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/60 p-2 text-left">
                <div className="text-[10px] uppercase font-semibold text-muted tracking-wider">
                  UPI ID:
                </div>
                <div className="flex items-center justify-between gap-1 mt-0.5">
                  <code className="text-xs font-mono font-bold text-maroon tracking-wide">
                    {UPI_ID}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-maroon hover:bg-maroon/90 text-white shadow-xs"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>{isHi ? "कॉपी हुआ!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>{isHi ? "कॉपी" : "Copy"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct UPI Mobile Link */}
              <a
                href={upiUri}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-saffron to-saffron-deep px-4 py-2.5 text-center text-xs font-semibold text-white shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
              >
                <Smartphone className="h-4 w-4" />
                <span>
                  {isHi
                    ? `UPI ऐप से ₹${activeAmount} अर्पित करें`
                    : `Pay ₹${activeAmount} via UPI App (Mobile)`}
                </span>
              </a>

              {/* Supported UPI Apps Pills */}
              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-muted">
                <span className="rounded bg-sand px-1.5 py-0.5">Google Pay</span>
                <span className="rounded bg-sand px-1.5 py-0.5">PhonePe</span>
                <span className="rounded bg-sand px-1.5 py-0.5">Paytm</span>
                <span className="rounded bg-sand px-1.5 py-0.5">BHIM</span>
                <span className="rounded bg-sand px-1.5 py-0.5">Any UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
