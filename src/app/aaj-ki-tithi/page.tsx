import type { Metadata } from "next";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/layout/PageHero";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  formatIstDate,
  formatIstDateTime,
  formatIstTime,
  getPanchang,
  pakshaLabel,
} from "@/lib/panchang";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { SITE } from "@/lib/seo/site";
import { hubMetadata } from "@/lib/i18n/hub";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("tithi");
}

function pakshaClass(paksha: "shukla" | "krishna") {
  return paksha === "shukla" ? "text-saffron-deep" : "text-navy";
}

export default async function TithiPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const hi = locale === "hi";
  const panchang = getPanchang();
  const sunriseTithi = panchang.tithiAtSunrise;
  const paksha = pakshaLabel(sunriseTithi.paksha);
  const masa = panchang.masaPurnimanta;
  const tithiChanged =
    panchang.tithiNow.index !== sunriseTithi.index ? panchang.tithiNow : null;
  const dateLabel = formatIstDate(panchang.sunrise, locale);
  const time = (value: Date) => formatIstTime(value, locale);
  const dateTime = (value: Date) => formatIstDateTime(value, locale);

  return (
    <div>
      <PageHero
        title={t.hubs.tithi.h1}
        subtitle={dateLabel}
        crumbs={localizedCrumbs(t.homeName, [t.nav.tithi, PATHS.tithi])}
      />
      <div className="mx-auto max-w-4xl px-4 pb-8 lg:px-8 lg:pb-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t.hubs.tithi.h1,
          url: `${SITE.url}${PATHS.tithi}`,
          description: t.hubs.tithi.description,
        }}
      />
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-saffron">{t.common.panchang}</p>

      <section className="mt-8 overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-line">
        <div className="bg-[#fff4ea] px-6 py-8 text-center sm:px-10">
          <p className={`font-serif text-3xl sm:text-4xl ${pakshaClass(sunriseTithi.paksha)}`}>
            {hi
              ? `${masa.nameHi} ${paksha.hi} ${sunriseTithi.nameHi}`
              : `${masa.name} ${paksha.en} ${sunriseTithi.name}`}
          </p>
          <p className="mt-2 text-lg text-ink">
            {hi
              ? `${masa.name} · ${paksha.en} · ${sunriseTithi.name}`
              : `${masa.nameHi} · ${paksha.hi} · ${sunriseTithi.nameHi}`}
          </p>
          <p className="mt-3 text-sm text-muted">
            {t.common.vikramSamvat} {panchang.vikramSamvat}
            {masa.adhika ? ` · ${t.common.adhikaMasa}` : ""}
          </p>
        </div>

        {panchang.observances.length ? (
          <ul className="flex flex-wrap gap-2 border-t border-line px-6 py-4 sm:px-10">
            {panchang.observances.map((item) => {
              const label = hi ? (item.nameHi ?? item.name) : item.name;
              return (
                <li key={item.name}>
                  {item.href ? (
                    <LocaleLink
                      href={item.href}
                      className="inline-flex rounded-full bg-[#fff4ea] px-3 py-1 text-sm text-saffron-deep ring-1 ring-[#f3d2b3]"
                    >
                      {label}
                    </LocaleLink>
                  ) : (
                    <span className="inline-flex rounded-full bg-cream px-3 py-1 text-sm text-ink ring-1 ring-line">
                      {label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}

        <dl className="grid gap-px bg-line sm:grid-cols-2">
          {[
            {
              label: t.common.tithiSunrise,
              value: hi
                ? `${sunriseTithi.nameHi} · ${sunriseTithi.name}`
                : `${sunriseTithi.name} · ${sunriseTithi.nameHi}`,
              note: `${dateTime(sunriseTithi.start)} → ${dateTime(sunriseTithi.end)} IST`,
            },
            {
              label: t.common.paksha,
              value: hi ? `${paksha.hi} · ${paksha.en}` : `${paksha.en} · ${paksha.hi}`,
            },
            {
              label: t.common.masa,
              value: hi ? `${masa.nameHi} · ${masa.name}` : `${masa.name} · ${masa.nameHi}`,
              note:
                panchang.masaAmanta.index !== masa.index
                  ? `${t.common.amanta}: ${hi ? panchang.masaAmanta.nameHi : panchang.masaAmanta.name}`
                  : undefined,
            },
            {
              label: t.common.vara,
              value: hi
                ? `${panchang.weekdayNameHi} · ${panchang.weekdayName}`
                : `${panchang.weekdayName} · ${panchang.weekdayNameHi}`,
            },
            {
              label: t.common.ritu,
              value: hi
                ? `${panchang.ritu.nameHi} · ${panchang.ritu.name}`
                : `${panchang.ritu.name} · ${panchang.ritu.nameHi}`,
            },
            {
              label: t.common.nakshatra,
              value: `${panchang.nakshatra.name} · ${t.common.pada(panchang.nakshatra.pada)}`,
            },
            {
              label: t.common.yoga,
              value: panchang.yoga.name,
            },
            {
              label: t.common.karana,
              value: panchang.karana.name,
            },
            {
              label: t.common.sunriseSunset,
              value: `${time(panchang.sunrise)} · ${time(panchang.sunset)}`,
              note: panchang.location,
            },
            {
              label: t.common.rahuKaal,
              value: `${time(panchang.rahuKaal.start)} – ${time(panchang.rahuKaal.end)}`,
            },
          ].map((row) => (
            <div key={row.label} className="bg-white px-6 py-4 sm:px-8">
              <dt className="text-xs uppercase tracking-wide text-saffron">{row.label}</dt>
              <dd className="mt-1 text-ink">{row.value}</dd>
              {row.note ? <p className="mt-1 text-xs text-muted">{row.note}</p> : null}
            </div>
          ))}
        </dl>
      </section>

      {tithiChanged ? (
        <p className="mt-4 rounded-3xl bg-cream px-5 py-4 text-sm text-muted ring-1 ring-line">
          {t.common.tithiMoved}{" "}
          <span className="font-medium text-ink">
            {hi
              ? `${pakshaLabel(tithiChanged.paksha).hi} ${tithiChanged.nameHi}`
              : `${pakshaLabel(tithiChanged.paksha).en} ${tithiChanged.name}`}
          </span>{" "}
          ({hi ? tithiChanged.name : tithiChanged.nameHi}). {t.common.tithiRunsUntil(dateTime(tithiChanged.end))}
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted">{t.common.tithiHolds(dateTime(sunriseTithi.end))}</p>
      )}

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">{t.common.upcomingTithis}</h2>
        <p className="mt-1 text-sm text-muted">{t.common.nextDaysSunrise}</p>
        <ol className="mt-4 divide-y divide-line overflow-hidden rounded-[28px] bg-white ring-1 ring-line">
          {panchang.upcoming.map((day) => {
            const dayPaksha = pakshaLabel(day.tithi.paksha);
            return (
              <li key={day.date.toISOString()} className="px-5 py-4 sm:px-6">
                <p className="text-xs text-muted">
                  {hi ? day.weekdayNameHi : day.weekdayName} · {formatIstDate(day.date, locale).replace(/,.*/, "")}
                </p>
                <p className="mt-1 font-serif text-lg text-ink">
                  {hi
                    ? `${day.masaNameHi} ${dayPaksha.hi} ${day.tithi.nameHi}`
                    : `${day.masaName} ${dayPaksha.en} ${day.tithi.name}`}
                </p>
                <p className="text-sm text-muted">
                  {hi
                    ? `${day.masaName} · ${dayPaksha.en} · ${day.tithi.name}`
                    : `${day.masaNameHi} · ${dayPaksha.hi} · ${day.tithi.nameHi}`}
                  {" · "}
                  {time(day.tithi.start)} – {time(day.tithi.end)}
                </p>
                {day.observances.length ? (
                  <p className="mt-2 text-sm text-saffron-deep">
                    {day.observances
                      .map((item) => (hi ? (item.nameHi ?? item.name) : item.name))
                      .join(" · ")}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>

      <p className="mt-8 text-sm text-muted">
        {t.common.afterTithi}{" "}
        <LocaleLink href="/naam-jaap" className="text-saffron">
          {t.common.startJaap}
        </LocaleLink>
        {" · "}
        <LocaleLink href={PATHS.festivals} className="text-saffron">
          {t.common.festivalNotes}
        </LocaleLink>
      </p>

      <HubSeoBlock id="tithi" />
      </div>
    </div>
  );
}
