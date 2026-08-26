import { Playfair_Display, Inter, Noto_Serif_Devanagari } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocaleRefresh } from "@/components/i18n/LocaleRefresh";
import { LocaleRoot } from "@/components/i18n/LocaleRoot";
import { OpenDetailsOnHash } from "@/components/seo/OpenDetailsOnHash";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE, absoluteUrl } from "@/lib/seo/site";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { getGaMeasurementId } from "@/lib/analytics/ga";

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
  icons: {
    icon: [
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon-48.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Bhakti Voice — Your Companion on the Spiritual Journey",
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl(SITE.ogHome),
        width: 1200,
        height: 800,
        alt: SITE.ogHomeAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: "Bhakti Voice — Your Companion on the Spiritual Journey",
    description: SITE.description,
    images: [absoluteUrl(SITE.ogHome)],
  },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = getGaMeasurementId();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} ${devanagari.variable} bg-ivory text-ink antialiased`}>
        <LocaleRoot>
        <GoogleAnalytics measurementId={gaId} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <OpenDetailsOnHash />
        <LocaleRefresh />
        <AuthProvider>
          <Header />
          <main className="min-h-[70vh] min-w-0 overflow-x-clip">{children}</main>
          <MobileNav />
        </AuthProvider>
        <Footer />
        </LocaleRoot>
      </body>
    </html>
  );
}
