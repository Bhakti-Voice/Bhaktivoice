import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault from "@/app/(en)/dakshina/page";
import type { Metadata } from "next";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "डिजिटल दक्षिणा — सेवा सहयोग | भक्ति वॉयस",
  description:
    "भक्ति वॉयस पूर्णतः विज्ञापन-मुक्त आध्यात्मिक मंच है। सर्वर खर्च और इस सेवा को निरंतर बनाए रखने हेतु छोटी सी डिजिटल दक्षिणा (₹51, ₹101, ₹501) अर्पित करें।",
  alternates: {
    canonical: "/hi/dakshina",
  },
};

export default withHindi(EnDefault);
