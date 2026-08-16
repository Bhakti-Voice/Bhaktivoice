import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";

export default async function NotFound() {
  const t = await getMessages();
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8">
      <div>
        <Breadcrumbs items={localizedCrumbs(t.homeName, [t.common.notFoundCrumb, "/404"])} />
        <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">{t.common.notFoundTitle}</h1>
        <p className="mt-4 text-lg text-muted">{t.common.notFoundBody}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LocaleLink href="/" className="rounded-full bg-navy px-5 py-2.5 text-sm text-white">
            {t.common.goHome}
          </LocaleLink>
          <LocaleLink
            href={PATHS.yatra}
            className="rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink"
          >
            {t.common.exploreYatra}
          </LocaleLink>
          <LocaleLink
            href={PATHS.naamJaap}
            className="rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-white"
          >
            {t.home.startJaap}
          </LocaleLink>
        </div>
      </div>
      <div className="relative min-h-[280px]">
        <Image
          src="/images/lotus-logo.png"
          alt="Bhakti Voice lotus emblem"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
