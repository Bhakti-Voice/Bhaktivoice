import { NextResponse } from "next/server";
import { CITIES, searchCities, type CityConfig } from "@/lib/panchang/cities";

export const revalidate = 86400; // Cache for 24h

interface PhotonFeature {
  geometry: {
    coordinates: [number, number]; // [lon, lat]
  };
  properties: {
    name?: string;
    city?: string;
    state?: string;
    county?: string;
    country?: string;
    countrycode?: string;
    postcode?: string;
    osm_value?: string;
  };
}

function guessTimezone(lat: number, lon: number, country?: string, state?: string): string {
  const c = (country || "").toLowerCase();
  const s = (state || "").toLowerCase();

  if (c === "india" || c === "in") return "Asia/Kolkata";
  if (c === "nepal" || c === "np") return "Asia/Kathmandu";
  if (c === "sri lanka" || c === "lk") return "Asia/Colombo";
  if (c === "bangladesh" || c === "bd") return "Asia/Dhaka";
  if (c === "pakistan" || c === "pk") return "Asia/Karachi";
  if (c === "united arab emirates" || c === "uae" || c === "ae") return "Asia/Dubai";
  if (c === "qatar" || c === "qa") return "Asia/Qatar";
  if (c === "oman" || c === "om") return "Asia/Muscat";
  if (c === "kuwait" || c === "kw") return "Asia/Kuwait";
  if (c === "bahrain" || c === "bh") return "Asia/Bahrain";
  if (c === "singapore" || c === "sg") return "Asia/Singapore";
  if (c === "malaysia" || c === "my") return "Asia/Kuala_Lumpur";
  if (c === "thailand" || c === "th") return "Asia/Bangkok";
  if (c === "indonesia" || c === "id") return lon < 110 ? "Asia/Jakarta" : "Asia/Makassar";
  if (c === "japan" || c === "jp") return "Asia/Tokyo";
  if (c === "united kingdom" || c === "uk" || c === "gb") return "Europe/London";
  if (c === "ireland" || c === "ie") return "Europe/Dublin";
  if (c === "germany" || c === "de") return "Europe/Berlin";
  if (c === "france" || c === "fr") return "Europe/Paris";
  if (c === "netherlands" || c === "nl") return "Europe/Amsterdam";
  if (c === "mauritius" || c === "mu") return "Indian/Mauritius";
  if (c === "fiji" || c === "fj") return "Pacific/Fiji";
  if (c === "new zealand" || c === "nz") return "Pacific/Auckland";
  if (c === "south africa" || c === "za") return "Africa/Johannesburg";

  // North America
  if (c.includes("united states") || c === "us" || c === "usa" || c.includes("canada") || c === "ca") {
    if (s.includes("hawaii")) return "Pacific/Honolulu";
    if (s.includes("alaska")) return "America/Anchorage";
    if (s.includes("california") || s.includes("washington") || s.includes("oregon") || s.includes("nevada") || s.includes("british columbia")) {
      return c.includes("canada") ? "America/Vancouver" : "America/Los_Angeles";
    }
    if (s.includes("arizona")) return "America/Phoenix";
    if (s.includes("colorado") || s.includes("utah") || s.includes("new mexico") || s.includes("alberta") || s.includes("idaho") || s.includes("montana")) {
      return c.includes("canada") ? "America/Edmonton" : "America/Denver";
    }
    if (s.includes("texas") || s.includes("illinois") || s.includes("minnesota") || s.includes("wisconsin") || s.includes("missouri") || s.includes("kansas") || s.includes("louisiana") || s.includes("manitoba")) {
      return c.includes("canada") ? "America/Winnipeg" : "America/Chicago";
    }
    if (s.includes("new york") || s.includes("new jersey") || s.includes("florida") || s.includes("georgia") || s.includes("pennsylvania") || s.includes("massachusetts") || s.includes("ontario") || s.includes("quebec") || s.includes("virginia") || s.includes("north carolina")) {
      return c.includes("canada") ? "America/Toronto" : "America/New_York";
    }
    if (lon < -114) return "America/Los_Angeles";
    if (lon < -102) return "America/Denver";
    if (lon < -85) return "America/Chicago";
    return "America/New_York";
  }

  // Australia
  if (c.includes("australia") || c === "au") {
    if (lon < 129) return "Australia/Perth";
    if (lon < 141) return "Australia/Adelaide";
    return "Australia/Sydney";
  }

  // Longitude-based heuristic fallback
  const roughHours = Math.round(lon / 15);
  if (roughHours === 0) return "UTC";
  if (roughHours === 1) return "Europe/Berlin";
  if (roughHours === 2) return "Europe/Athens";
  if (roughHours === 3) return "Asia/Riyadh";
  if (roughHours === 4) return "Asia/Dubai";
  if (roughHours === 5 || roughHours === 6) return "Asia/Kolkata";
  if (roughHours === 7) return "Asia/Bangkok";
  if (roughHours === 8) return "Asia/Singapore";
  if (roughHours === 9) return "Asia/Tokyo";
  if (roughHours === 10) return "Australia/Sydney";
  if (roughHours === 12) return "Pacific/Auckland";
  if (roughHours === -5) return "America/New_York";
  if (roughHours === -6) return "America/Chicago";
  if (roughHours === -7) return "America/Denver";
  if (roughHours === -8) return "America/Los_Angeles";

  return "Asia/Kolkata";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";

  if (!q) {
    return NextResponse.json({
      query: "",
      count: CITIES.slice(0, 30).length,
      cities: CITIES.slice(0, 30),
    });
  }

  // 1. First Tier: Local High-Priority Index Match
  const localMatches = searchCities(q, 20);

  // 2. Second Tier: If query is 2+ characters, query global OpenStreetMap / Photon geocoder
  let globalResults: CityConfig[] = [];
  if (q.length >= 2) {
    try {
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=15`;
      const res = await fetch(url, {
        headers: { "User-Agent": "BhaktiVoice-Panchang/1.0" },
        next: { revalidate: 86400 },
      });

      if (res.ok) {
        const data = await res.json();
        const features: PhotonFeature[] = data.features || [];

        globalResults = features
          .filter((f) => f.geometry?.coordinates?.length === 2 && f.properties?.name)
          .map((f) => {
            const [lon, lat] = f.geometry.coordinates;
            const props = f.properties;
            const name = props.name || props.city || "Unknown Location";
            const state = props.state || props.county || "";
            const country = props.country || "";
            const timeZone = guessTimezone(lat, lon, country, state);
            const latRounded = Math.round(lat * 10000) / 10000;
            const lonRounded = Math.round(lon * 10000) / 10000;
            const id = `global_${latRounded >= 0 ? "+" : ""}${latRounded.toFixed(4)}_${lonRounded >= 0 ? "+" : ""}${lonRounded.toFixed(4)}`;

            return {
              id,
              name,
              nameHi: name,
              state: state || country,
              stateHi: state || country,
              country,
              countryHi: country,
              latitude: latRounded,
              longitude: lonRounded,
              elevationMeters: 0,
              timeZone,
              district: props.county,
            };
          });
      }
    } catch {
      // Fallback gracefully to local matches if external service times out
    }
  }

  // Merge and deduplicate by coordinate proximity (within 0.05 degrees ~ 5km)
  const merged: CityConfig[] = [...localMatches];
  for (const item of globalResults) {
    const isDuplicate = merged.some(
      (m) =>
        Math.abs(m.latitude - item.latitude) < 0.05 &&
        Math.abs(m.longitude - item.longitude) < 0.05
    );
    if (!isDuplicate) {
      merged.push(item);
    }
  }

  return NextResponse.json(
    {
      query: q,
      count: merged.length,
      cities: merged.slice(0, 35),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      },
    }
  );
}
