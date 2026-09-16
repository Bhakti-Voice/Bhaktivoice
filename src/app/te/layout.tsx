import { setRequestLocale } from "@/lib/i18n/server";

export const metadata = {
  other: {
    "content-language": "te-IN",
  },
};

export default function TeluguLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("te");
  return children;
}
