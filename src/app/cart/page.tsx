import type { Metadata } from "next";
import { CartView } from "@/components/store/CartView";
import { PageHero } from "@/components/layout/PageHero";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isTe ? "మీ సాధనా తాంబూలం (Cart) — భక్తి స్టోర్" : isHi ? "आपकी साधना थाल (Cart) — भक्ति स्टोर" : "Your Sadhana Cart — Bhakti Store",
    description: isHi
      ? "दैनिक नाम जप एवं साधना हेतु चयनित सामग्री का विवरण।"
      : "Review your selected malas, diyas, and sadhana essentials.",
    path: "/cart",
    noIndex: true,
  });
}

export default async function CartPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";

  return (
    <div>
      <PageHero
        title={isTe ? "మీ సాధనా తాంబూలం" : isHi ? "आपकी साधना थाल" : "Your Sadhana Cart"}
        subtitle={
          isTe
            ? "నిత్య పూజ మరియు నామ జపం కోసం ఎంపిక చేసుకున్న ప్రామాణిక సామగ్రి."
            : isHi
            ? "दैनिक पूजा एवं नाम जप हेतु चयनित प्रामाणिक सामग्री।"
            : "Authentic companions chosen for your daily devotional practice."
        }
        hub="store"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "स्टोर" : t.nav.store, PATHS.store],
          [isTe ? "కార్ట్" : isHi ? "कार्ट" : "Cart", "/cart"],
        )}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:pb-16">
        <CartView />
      </div>
    </div>
  );
}
