import { setRequestLocale } from "@/lib/i18n/server";

export const metadata = {
  other: {
    "content-language": "hi-IN",
  },
};

export default function HindiLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("hi");
  return children;
}
