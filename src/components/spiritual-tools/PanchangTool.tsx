"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { defaultCity, formatTime, INDIAN_CITIES, readDeviceLocation } from "@/lib/spiritual-tools/geo";
import { loadClientPanchang } from "@/lib/spiritual-tools/engine-loader";
import type { ClientPanchangResult } from "@/lib/spiritual-tools/types";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { PrivacyNotice, ResultGrid, ToolSection, primaryButtonClassName } from "./ToolUi";

export function PanchangTool() {
  const locale = useLocale();
  const t = useMessages();
  const copy = t.spiritualTools.panchang;
  const hi = locale === "hi";
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClientPanchangResult | null>(null);
  const [place, setPlace] = useState(defaultCity());

  const calculate = useCallback(async (lat: number, lon: number, tz: string, label: string) => {
    setLoading(true);
    try {
      const engine = await loadClientPanchang();
      setResult(engine.getClientPanchang(lat, lon, tz, label));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void calculate(place.latitude, place.longitude, place.timeZone, place.name);
  }, [calculate, place]);

  async function detectLocation() {
    setLoading(true);
    const located = await readDeviceLocation();
    if (located) {
      setPlace(located);
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PrivacyNotice text={t.spiritualTools.privacyNotice} />

      <ToolSection title={copy.formTitle}>
        <p className="mb-4 text-sm text-muted">{copy.formLead}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void detectLocation()}
            className={`${primaryButtonClassName(loading)} w-auto px-5`}
          >
            <MapPin className="mr-2 inline h-4 w-4" />
            {copy.useLocation}
          </button>
          <select
            value={place.name}
            onChange={(event) => {
              const next = INDIAN_CITIES.find((city) => city.name === event.target.value);
              if (next) setPlace(next);
            }}
            className="h-11 rounded-full border border-line bg-white px-4 text-sm text-ink outline-none"
            aria-label={copy.selectCity}
          >
            {INDIAN_CITIES.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </ToolSection>

      {loading && !result ? (
        <div className="flex items-center justify-center gap-2 py-12 text-muted">
          <Loader2 className="h-5 w-5 animate-spin" />
          {copy.calculating}
        </div>
      ) : null}

      {result ? (
        <ToolSection title={copy.resultTitle}>
          <p className="mb-4 text-sm text-muted">
            {result.locationLabel} · {result.gregorianLabel}
          </p>
          <ResultGrid
            items={[
              { label: copy.weekday, value: hi ? result.weekdayNameHi : result.weekdayName },
              {
                label: copy.tithi,
                value: hi
                  ? `${result.tithi.nameHi} (${result.tithi.pakshaHi})`
                  : `${result.tithi.name} (${result.tithi.paksha})`,
              },
              {
                label: copy.nakshatra,
                value: hi
                  ? `${result.nakshatra.nameHi} · Pada ${result.nakshatra.pada}`
                  : `${result.nakshatra.name} · Pada ${result.nakshatra.pada}`,
              },
              { label: copy.yoga, value: result.yoga },
              { label: copy.karana, value: result.karana },
              { label: copy.masa, value: hi ? result.masa.nameHi : result.masa.name },
              { label: copy.ritu, value: hi ? result.ritu.nameHi : result.ritu.name },
              {
                label: copy.sunrise,
                value: formatTime(result.sunrise, result.timeZone, locale),
              },
              {
                label: copy.sunset,
                value: formatTime(result.sunset, result.timeZone, locale),
              },
              {
                label: copy.rahuKaal,
                value: `${formatTime(result.rahuKaal.start, result.timeZone, locale)} – ${formatTime(result.rahuKaal.end, result.timeZone, locale)}`,
              },
            ]}
          />
        </ToolSection>
      ) : null}
    </div>
  );
}
