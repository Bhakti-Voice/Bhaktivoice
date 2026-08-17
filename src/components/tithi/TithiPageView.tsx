import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { FaqList } from "@/components/seo/FaqList";
import { CollapsedProse } from "@/components/tithi/CollapsedProse";
import type { Faq } from "@/lib/content/types";
import type { TithiPageData, TithiProse, UpcomingTithi } from "@/lib/panchang/tithi-view";
import { PATHS } from "@/lib/seo/paths";

type Copy = {
  panchang: string;
  specialTitle: string;
  timingsTitle: string;
  sunrise: string;
  sunset: string;
  rahuKaal: string;
  tithiStarts: string;
  tithiEnds: string;
  nextTithi: string;
  alignmentsTitle: string;
  masa: string;
  paksha: string;
  nakshatra: string;
  vikramSamvat: string;
  vara: string;
  ritu: string;
  yoga: string;
  karana: string;
  upcomingTitle: string;
  delhiNote: string;
  faqTitle: string;
  jaapTitle: string;
  jaapBody: string;
  jaapLabel: string;
  readMore: string;
  readLess: string;
};

export function TithiPageView({
  data,
  faqs,
  prose,
  copy,
}: {
  data: TithiPageData;
  faqs: Faq[];
  prose: TithiProse;
  copy: Copy;
}) {
  const timingRows = [
    { label: copy.sunrise, value: data.sunriseTime },
    { label: copy.sunset, value: data.sunsetTime },
    { label: copy.rahuKaal, value: `${data.rahuKaalStart} – ${data.rahuKaalEnd}` },
    { label: copy.tithiStarts, value: data.tithiStartAt },
    { label: copy.tithiEnds, value: data.tithiEndAt },
    { label: copy.nextTithi, value: `${data.nextTithi} · ${data.nextTithiEndAt}` },
  ];
  const alignmentRows = [
    { label: copy.vikramSamvat, value: data.currentVikramSamvat },
    { label: copy.masa, value: `${data.currentMasa} / ${data.masaAmanta}` },
    { label: copy.paksha, value: data.currentPaksha },
    { label: copy.vara, value: data.weekday },
    { label: copy.ritu, value: data.ritu },
    { label: copy.nakshatra, value: `${data.currentNakshatra} · ${data.nakshatraPada}` },
    { label: copy.yoga, value: data.yoga },
    { label: copy.karana, value: data.karana },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 pb-8 lg:px-8 lg:pb-12">
      <header className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-saffron">{copy.panchang}</p>
        <p className="mt-2 font-serif text-4xl leading-tight text-ink sm:text-5xl">{data.currentTithi}</p>
        <p className="mt-2 font-serif text-base text-ink/70 sm:text-lg">
          {data.currentPaksha} · {data.currentMasa} · {copy.vikramSamvat} {data.currentVikramSamvat}
        </p>
      </header>

      {data.observances.length ? (
        <section className="mt-8 rounded-[28px] bg-[#fff4ea] px-5 py-5 ring-1 ring-[#f3d2b3] sm:px-6">
          <h2 className="font-serif text-xl text-ink sm:text-2xl">{copy.specialTitle}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {data.observances.map((item, index) => {
              const name = data.specialFestivals[index] ?? item.name;
              const pill =
                "inline-flex rounded-full bg-white px-3 py-1.5 text-sm text-ink ring-1 ring-[#f3d2b3]";
              return (
                <li key={item.name}>
                  {item.href ? (
                    <LocaleLink href={item.href} className={pill}>
                      {name}
                    </LocaleLink>
                  ) : (
                    <span className={pill}>{name}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">{copy.timingsTitle}</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">{copy.delhiNote}</p>
        <dl className="mt-4 grid gap-px overflow-hidden rounded-[28px] bg-line ring-1 ring-line sm:grid-cols-2">
          {timingRows.map((row) => (
            <div key={row.label} className="bg-white px-6 py-4 sm:px-8">
              <dt className="text-xs uppercase tracking-wide text-saffron">{row.label}</dt>
              <dd className="mt-1 text-lg text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">{copy.alignmentsTitle}</h2>
        <dl className="mt-4 grid gap-px overflow-hidden rounded-[28px] bg-line ring-1 ring-line sm:grid-cols-2">
          {alignmentRows.map((row) => (
            <div key={row.label} className="bg-white px-6 py-4 sm:px-8">
              <dt className="text-xs uppercase tracking-wide text-saffron">{row.label}</dt>
              <dd className="mt-1 font-serif text-xl text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">{copy.upcomingTitle}</h2>
        <ol className="mt-4 divide-y divide-line overflow-hidden rounded-[28px] bg-white ring-1 ring-line">
          {data.upcomingTithis.map((day) => (
            <UpcomingRow key={`${day.date}-${day.tithi}`} day={day} />
          ))}
        </ol>
      </section>

      <div className="mt-10">
        <ContextualCta title={copy.jaapTitle} body={copy.jaapBody} href={PATHS.naamJaap} label={copy.jaapLabel} />
      </div>

      <CollapsedProse
        paragraphs={[
          prose.welcome,
          prose.observances,
          prose.tithiTiming,
          prose.sun,
          prose.alignments,
          prose.upcoming,
          prose.close,
        ]}
        readMore={copy.readMore}
        readLess={copy.readLess}
      />

      <FaqList faqs={faqs} title={copy.faqTitle} className="mt-10" jsonLd={false} />
    </article>
  );
}

function UpcomingRow({ day }: { day: UpcomingTithi }) {
  return (
    <li className="px-5 py-4 sm:px-6">
      <p className="text-xs text-muted">
        {day.day} · {day.date}
      </p>
      <p className="mt-1 font-serif text-lg text-ink">{day.tithi}</p>
      {day.festival ? <p className="mt-1 text-sm text-saffron-deep">{day.festival}</p> : null}
    </li>
  );
}
