"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";
import {
  Heart,
  X,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PATHS } from "@/lib/seo/paths";
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

export function DakshinaFloatingButton() {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(101);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLockedOpen, setIsLockedOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeAmount = customAmount
    ? Math.max(1, parseInt(customAmount, 10) || 0)
    : selectedAmount || 101;

  // Build UPI URI
  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${encodeURIComponent(activeAmount.toString())}&cu=INR&tn=${encodeURIComponent(
    "Digital Dakshina - Bhakti Voice Seva"
  )}`;

  // Generate QR Code data URL
  const generateQR = useCallback(async (uri: string) => {
    try {
      const url = await QRCode.toDataURL(uri, {
        width: 240,
        margin: 1,
        errorCorrectionLevel: "M",
        color: {
          dark: "#1e140a",
          light: "#ffffff",
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error("Failed to generate UPI QR code:", err);
    }
  }, []);

  useEffect(() => {
    generateQR(upiUri);
  }, [upiUri, generateQR]);

  // Handle copy UPI ID
  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Hover handlers for desktop
  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsHovered(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isLockedOpen) return;
    leaveTimerRef.current = setTimeout(() => {
      setIsHovered(false);
      setIsOpen(false);
    }, 280);
  };

  // Click toggle (locks popup open or closes it)
  const handleToggleClick = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsLockedOpen(false);
      setIsHovered(false);
    } else {
      setIsOpen(true);
      setIsLockedOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsLockedOpen(false);
    setIsHovered(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setIsLockedOpen(false);
        setIsHovered(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-20 right-3.5 sm:right-6 md:bottom-6 md:right-6 z-50 flex flex-col items-end print:hidden select-none"
      aria-label="Digital Dakshina Seva Support"
    >
      {/* POPUP CARD */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Digital Dakshina Modal"
          className="mb-3 w-[92vw] max-w-[370px] sm:max-w-[400px] max-h-[78vh] sm:max-h-[82vh] overflow-y-auto rounded-2xl border-2 border-amber-300/80 bg-[#fffdf9] p-0 shadow-2xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            boxShadow:
              "0 20px 35px -10px rgba(74, 16, 20, 0.25), 0 10px 15px -5px rgba(230, 126, 34, 0.2)",
          }}
        >
          {/* Spiritual Header Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-maroon via-[#6b1820] to-maroon px-4 py-3.5 text-white">
            <div className="absolute -right-4 -top-6 h-20 w-20 rounded-full bg-saffron/20 blur-xl pointer-events-none" />
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 text-amber-200 text-lg shadow-inner ring-1 ring-amber-300/40">
                  🙏
                </span>
                <div>
                  <h3 className="font-serif text-base font-semibold tracking-wide text-amber-100 flex items-center gap-1.5">
                    {isHi ? "डिजिटल दक्षिणा" : "Digital Dakshina"}
                    <span className="text-[10px] uppercase font-sans tracking-wider bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded-full border border-amber-400/30">
                      Seva
                    </span>
                  </h3>
                  <p className="text-[11px] text-amber-200/80">
                    {isHi ? "100% विज्ञापन-मुक्त पवित्र मंच" : "100% Ad-Free Sacred Sanctuary"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close Dakshina popup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-4">
            {/* The Pitch */}
            <div className="rounded-xl border border-amber-200/80 bg-gradient-to-b from-amber-50/70 to-cream/50 p-3.5 text-xs leading-relaxed text-ink/90">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-saffron mt-0.5" />
                <p>
                  <strong className="text-maroon font-serif">
                    {isHi ? "भक्ति वॉयस पूर्णतः विज्ञापन-मुक्त है।" : "Bhakti Voice is a 100% ad-free sanctuary."}
                  </strong>{" "}
                  {isHi
                    ? "यदि इस मंच से आपके दिन में शांति और भक्ति का संचार होता है, तो सर्वर खर्च और इस निरंतर सेवा को बनाए रखने हेतु एक छोटी सी डिजिटल दक्षिणा अवश्य अर्पित करें।"
                    : "If this site brings peace to your day, consider offering a small digital dakshina (₹51, ₹101, or ₹501) to help us cover server costs and keep this seva free for everyone."}
                </p>
              </div>
            </div>

            {/* Amount Selection Chips */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-ink/80 flex items-center gap-1">
                  <span>{isHi ? "सहयोग राशि चुनें" : "Select Contribution"}</span>
                </span>
                <span className="text-[11px] font-medium text-maroon font-serif">
                  ₹{activeAmount}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
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
                      className={`relative flex flex-col items-center justify-center rounded-xl py-2 px-1 text-center transition-all ${
                        isSelected
                          ? "bg-gradient-to-b from-amber-500 to-saffron-deep text-white shadow-md ring-2 ring-amber-300 scale-[1.02]"
                          : "border border-amber-200/90 bg-white/90 text-ink hover:border-amber-400 hover:bg-amber-50/40"
                      }`}
                    >
                      <span className="font-serif text-sm font-bold">
                        ₹{amt.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`text-[9px] truncate max-w-full px-1 ${
                          isSelected ? "text-amber-100" : "text-muted"
                        }`}
                      >
                        {isHi ? label.hi : label.en}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Field */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder={isHi ? "अन्य राशि दर्ज करें..." : "Other amount (₹)..."}
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
                    className="text-[11px] text-muted hover:text-maroon underline underline-offset-2"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic UPI QR Code Display */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-amber-200/90 bg-white p-3 shadow-inner">
              <div className="text-[11px] font-medium text-muted mb-1.5 flex items-center gap-1.5">
                <span>{isHi ? "स्कैन करें और तुरंत भुगतान करें" : "Scan with any UPI App to pay"}</span>
                <span className="font-serif font-bold text-maroon">
                  ₹{activeAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="relative rounded-lg border border-line bg-white p-1.5 shadow-sm">
                {qrDataUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={qrDataUrl}
                    alt={`UPI QR Code for ${activeAmount}`}
                    className="h-44 w-44 sm:h-48 sm:w-48 rounded object-contain"
                    width={192}
                    height={192}
                  />
                ) : (
                  <div className="h-44 w-44 sm:h-48 sm:w-48 flex items-center justify-center bg-sand/30 rounded text-xs text-muted">
                    Generating QR...
                  </div>
                )}
                {/* Center Sacred Emblem Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md border-2 border-amber-400">
                    <span className="text-sm">🕉️</span>
                  </div>
                </div>
              </div>

              {/* Supported UPI Apps Pills */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-muted">
                <span className="rounded bg-sand/80 px-1.5 py-0.5 font-medium">GPay</span>
                <span className="rounded bg-sand/80 px-1.5 py-0.5 font-medium">PhonePe</span>
                <span className="rounded bg-sand/80 px-1.5 py-0.5 font-medium">Paytm</span>
                <span className="rounded bg-sand/80 px-1.5 py-0.5 font-medium">BHIM</span>
                <span className="rounded bg-sand/80 px-1.5 py-0.5 font-medium">Any UPI</span>
              </div>
            </div>

            {/* UPI ID Copy Field */}
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-2.5">
              <div className="text-[10px] font-medium text-muted uppercase tracking-wider mb-1">
                {isHi ? "सीधा UPI ID (कॉपी करें):" : "Direct UPI ID (Click to Copy):"}
              </div>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs font-semibold text-maroon font-mono tracking-wide bg-white px-2.5 py-1 rounded border border-amber-200 flex-1 truncate">
                  {UPI_ID}
                </code>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    copied
                      ? "bg-emerald-600 text-white"
                      : "bg-maroon hover:bg-maroon/90 text-white shadow-sm"
                  }`}
                  aria-label="Copy UPI ID"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>{isHi ? "कॉपी हो गया!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{isHi ? "कॉपी" : "Copy"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Mobile Pay CTA (Opens UPI apps on mobile) */}
            <a
              href={upiUri}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-saffron to-saffron-deep px-4 py-2.5 text-center text-xs font-semibold text-white shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.99] transition-all"
            >
              <Smartphone className="h-4 w-4" />
              <span>
                {isHi
                  ? `UPI ऐप से ₹${activeAmount} का भुगतान करें`
                  : `Pay ₹${activeAmount} via UPI App (Mobile)`}
              </span>
            </a>

            {/* Bottom trust note & link */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-muted border-t border-line">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>{isHi ? "100% सुरक्षित सीधी भेंट" : "Direct & 100% Transparent"}</span>
              </span>
              <LocaleLink
                href={PATHS.dakshina}
                onClick={handleClose}
                className="text-maroon hover:text-saffron font-medium flex items-center gap-0.5 hover:underline"
              >
                <span>{isHi ? "सेवा विवरण" : "Seva Story"}</span>
                <ExternalLink className="h-3 w-3" />
              </LocaleLink>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      <button
        type="button"
        onClick={handleToggleClick}
        aria-expanded={isOpen}
        aria-label="Contribute to Digital Dakshina"
        className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-white shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${
          isOpen
            ? "bg-maroon ring-2 ring-amber-300 scale-95"
            : "bg-gradient-to-r from-amber-600 via-[#e67e22] to-amber-700 hover:from-amber-500 hover:to-orange-500 hover:shadow-2xl hover:scale-105 active:scale-95"
        }`}
        style={{
          boxShadow: isOpen
            ? "0 4px 14px 0 rgba(74, 16, 20, 0.4)"
            : "0 8px 25px -4px rgba(211, 84, 0, 0.45), 0 4px 10px -2px rgba(235, 192, 111, 0.3)",
        }}
      >
        {/* Subtle glowing ring effect */}
        {!isOpen && (
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-30 blur-sm group-hover:opacity-75 transition duration-500" />
        )}

        {/* Pulse beacon dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-100" />
        </span>

        {/* Icon & Label */}
        <span className="relative flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide">
          <span className="text-base sm:text-lg leading-none">🙏</span>
          <span className="font-serif">
            {isHi ? "डिजिटल दक्षिणा" : "Digital Dakshina"}
          </span>
        </span>

        {/* Mini Pill Badge */}
        <span className="relative hidden sm:inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-sans font-medium uppercase tracking-wider text-amber-100 backdrop-blur-xs">
          {isHi ? "सहयोग" : "Seva"}
        </span>
      </button>
    </div>
  );
}
