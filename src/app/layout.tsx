import { Playfair_Display, Inter, Noto_Serif_Devanagari } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { HreflangLinks } from "@/components/seo/HreflangLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocaleRefresh } from "@/components/i18n/LocaleRefresh";
import { OpenDetailsOnHash } from "@/components/seo/OpenDetailsOnHash";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE, absoluteUrl } from "@/lib/seo/site";
import { getMessages } from "@/lib/i18n/server";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Bhakti Voice — Your Companion on the Spiritual Journey",
    template: "%s | Bhakti Voice",
  },
  description: SITE.description,
  openGraph: {
    title: "Bhakti Voice — Your Companion on the Spiritual Journey",
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/krishna-hero.webp"),
        width: 1200,
        height: 630,
        alt: "Lord Krishna playing the flute by a river at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: "Bhakti Voice — Your Companion on the Spiritual Journey",
    description: SITE.description,
    images: [absoluteUrl("/images/krishna-hero.webp")],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const t = await getMessages();
  return (
    <html lang={t.htmlLang}>
      <HreflangLinks />
      <body className={`${playfair.variable} ${inter.variable} ${devanagari.variable} bg-ivory text-ink antialiased`}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <OpenDetailsOnHash />
        <LocaleRefresh />
        <AuthProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <MobileNav />
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
