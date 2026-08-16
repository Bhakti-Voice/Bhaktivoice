import type { Metadata } from "next";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  formatIstDateTime,
  formatIstTime,
  getPanchang,
  pakshaLabel,
} from "@/lib/panchang";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { SITE } from "@/lib/seo/site";
import { hubMetadata } from "@/lib/i18n/hub";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("tithi");
}

function pakshaClass(paksha: "shukla" | "krishna") {
  return paksha === "shukla" ? "text-saffron-deep" : "text-navy";
}

export default function TithiPage() {
  const panchang = getPanchang();
  const sunriseTithi = panchang.tithiAtSunrise;
  const paksha = pakshaLabel(sunriseTithi.paksha);
  const masa = panchang.masaPurnimanta;
  const tithiChanged =
    panchang.tithiNow.index !== sunriseTithi.index
      ? panchang.tithiNow
      : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Aaj Ki Tithi",
          url: `${SITE.url}${PATHS.tithi}`,
          description:
            "Today's Hindu tithi, paksha and panchang calculated for Delhi from the Moon and the Sun.",
        }}
      />
      <Breadcrumbs items={pageCrumbs(["Aaj Ki Tithi", PATHS.tithi])} />
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-saffron">Panchang</p>
      <h1 className="mt-2 font-serif text-4xl text-ink lg:text-5xl">आज की तिथि</h1>
      <p className="mt-2 text-lg text-muted">Aaj Ki Tithi · {panchang.gregorianLabel}</p>

      <section className="mt-8 overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-line">
        <div className="bg-[#fff4ea] px-6 py-8 text-center sm:px-10">
          <p className={`font-serif text-3xl sm:text-4xl ${pakshaClass(sunriseTithi.paksha)}`}>
            {masa.nameHi} {paksha.hi} {sunriseTithi.nameHi}
          </p>
          <p className="mt-2 text-lg text-ink">
            {masa.name} · {paksha.en} · {sunriseTithi.name}
          </p>
          <p className="mt-3 text-sm text-muted">
            Vikram Samvat {panchang.vikramSamvat}
            {masa.adhika ? " · Adhika masa" : ""}
          </p>
        </div>

        {panchang.observances.length ? (
          <ul className="flex flex-wrap gap-2 border-t border-line px-6 py-4 sm:px-10">
            {panchang.observances.map((item) => (
              <li key={item.name}>
                {item.href ? (
                  <LocaleLink
                    href={item.href}
                    className="inline-flex rounded-full bg-[#fff4ea] px-3 py-1 text-sm text-saffron-deep ring-1 ring-[#f3d2b3]"
                  >
                    {item.nameHi ?? item.name}
                  </LocaleLink>
                ) : (
                  <span className="inline-flex rounded-full bg-cream px-3 py-1 text-sm text-ink ring-1 ring-line">
                    {item.nameHi ?? item.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : null}

        <dl className="grid gap-px bg-line sm:grid-cols-2">
          {[
            {
              label: "Tithi (sunrise)",
              value: `${sunriseTithi.nameHi} · ${sunriseTithi.name}`,
              note: `${formatIstDateTime(sunriseTithi.start)} → ${formatIstDateTime(sunriseTithi.end)} IST`,
            },
            {
              label: "Paksha",
              value: `${paksha.hi} · ${paksha.en}`,
            },
            {
              label: "Masa (Purnimanta)",
              value: `${masa.nameHi} · ${masa.name}`,
              note:
                panchang.masaAmanta.index !== masa.index
                  ? `Amanta: ${panchang.masaAmanta.nameHi}`
                  : undefined,
            },
            {
              label: "Vara",
              value: `${panchang.weekdayNameHi} · ${panchang.weekdayName}`,
            },
            {
              label: "Ritu",
              value: `${panchang.ritu.nameHi} · ${panchang.ritu.name}`,
            },
            {
              label: "Nakshatra",
              value: `${panchang.nakshatra.name} · pada ${panchang.nakshatra.pada}`,
            },
            {
              label: "Yoga",
              value: panchang.yoga.name,
            },
            {
              label: "Karana",
              value: panchang.karana.name,
            },
            {
              label: "Sunrise / Sunset",
              value: `${formatIstTime(panchang.sunrise)} · ${formatIstTime(panchang.sunset)}`,
              note: panchang.location,
            },
            {
              label: "Rahu Kaal",
              value: `${formatIstTime(panchang.rahuKaal.start)} – ${formatIstTime(panchang.rahuKaal.end)}`,
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
          After sunrise the tithi moved to{" "}
          <span className="font-medium text-ink">
            {pakshaLabel(tithiChanged.paksha).hi} {tithiChanged.nameHi}
          </span>{" "}
          ({tithiChanged.name}). It runs until {formatIstDateTime(tithiChanged.end)} IST.
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted">
          This tithi holds until {formatIstDateTime(sunriseTithi.end)} IST. Times are for Delhi.
        </p>
      )}

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">आगे की तिथियाँ</h2>
        <p className="mt-1 text-sm text-muted">Next days at Delhi sunrise</p>
        <ol className="mt-4 divide-y divide-line overflow-hidden rounded-[28px] bg-white ring-1 ring-line">
          {panchang.upcoming.map((day) => {
            const dayPaksha = pakshaLabel(day.tithi.paksha);
            return (
              <li key={day.date.toISOString()} className="px-5 py-4 sm:px-6">
                <p className="text-xs text-muted">
                  {day.weekdayNameHi} · {formatIstDateTime(day.date).replace(/,.*/, "")}
                </p>
                <p className="mt-1 font-serif text-lg text-ink">
                  {day.masaNameHi} {dayPaksha.hi} {day.tithi.nameHi}
                </p>
                <p className="text-sm text-muted">
                  {day.masaName} · {dayPaksha.en} · {day.tithi.name}
                  {" · "}
                  {formatIstTime(day.tithi.start)} – {formatIstTime(day.tithi.end)}
                </p>
                {day.observances.length ? (
                  <p className="mt-2 text-sm text-saffron-deep">
                    {day.observances.map((item) => item.nameHi ?? item.name).join(" · ")}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>

      <p className="mt-8 text-sm text-muted">
        After you know the tithi, sit.{" "}
        <LocaleLink href="/naam-jaap" className="text-saffron">
          Start Naam Jaap
        </LocaleLink>
        {" · "}
        <LocaleLink href={PATHS.festivals} className="text-saffron">
          Festival notes
        </LocaleLink>
      </p>

      <HubSeoBlock id="tithi" />
    </div>
  );
}
