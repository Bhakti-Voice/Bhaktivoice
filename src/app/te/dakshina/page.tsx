import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault from "@/app/(en)/dakshina/page";
import type { Metadata } from "next";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "డిజిటల్ దక్షిణ — సేవకు తోడ్పాటు | భక్తి వాయిస్",
  description:
    "భక్తి వాయిస్ ప్రకటనలు లేని ఆధ్యాత్మిక వేదిక. మా సర్వర్ ఖర్చులు భరించడానికి చిన్న డిజిటల్ దక్షిణను అందించండి.",
  alternates: {
    canonical: "/te/dakshina",
  },
};

export default withTelugu(EnDefault);
