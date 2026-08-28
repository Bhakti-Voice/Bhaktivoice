import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { SUVICHAR_DATABASE, CARD_THEMES } from "@/lib/spiritual-tools/suvichar-data";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const quoteId = searchParams.get("q") || searchParams.get("quote") || "jain-1";
    const themeId = searchParams.get("t") || searchParams.get("theme") || "jain-swarna";
    const devoteeName = searchParams.get("n") || searchParams.get("name") || "";
    const devoteeCity = searchParams.get("c") || searchParams.get("city") || "";
    const salutation = searchParams.get("s") || searchParams.get("salutation") || "";
    const isHi = searchParams.get("lang") !== "en";

    // Find Quote & Theme
    const item = SUVICHAR_DATABASE.find((q) => q.id === quoteId) || SUVICHAR_DATABASE[0];
    const theme = CARD_THEMES.find((t) => t.id === themeId) || CARD_THEMES[0];

    const displaySalutation =
      salutation.trim() ||
      (isHi
        ? item.tradition === "jain"
          ? "सप्रेम जय जिनेन्द्र"
          : "जय श्री कृष्णा"
        : item.tradition === "jain"
          ? "Saprem Jai Jinendra"
          : "Jai Shree Krishna");

    const displayShloka = isHi ? item.shlokaOrSutra : (item.shlokaHinglish || item.shlokaOrSutra);
    const displayQuote = isHi ? item.quoteHi : (item.quoteHinglish || item.quoteHi);
    const displaySource = isHi ? item.sourceHi : (item.sourceEn || item.sourceHi);

    const bgGradient = `linear-gradient(135deg, ${theme.bgColors[0]} 0%, ${theme.bgColors[1]} 50%, ${theme.bgColors[2] || theme.bgColors[1]} 100%)`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            background: bgGradient,
            padding: "36px 44px",
            position: "relative",
          }}
        >
          {/* Inner Golden Border */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              right: "16px",
              bottom: "16px",
              display: "flex",
              border: `2px solid ${theme.borderColor}`,
              borderRadius: "24px",
            }}
          />

          {/* Top Header: Motif & Salutation Badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "36px",
              }}
            >
              {theme.motif || "🪔 卐 🕉️"}
            </div>
            <div
              style={{
                display: "flex",
                background: theme.badgeBg,
                border: `1px solid ${theme.borderColor}`,
                borderRadius: "30px",
                padding: "6px 24px",
                color: theme.badgeText || "#FEF08A",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              {displaySalutation}
            </div>
          </div>

          {/* Middle Body: Shloka + Quote + Source */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "1050px",
              gap: "10px",
            }}
          >
            {displayShloka ? (
              <div
                style={{
                  display: "flex",
                  color: theme.shlokaColor || "#FEF08A",
                  fontSize: "26px",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  textAlign: "center",
                }}
              >
                {displayShloka}
              </div>
            ) : null}

            <div
              style={{
                display: "flex",
                color: theme.textColor || "#FFFFFF",
                fontSize: "30px",
                fontWeight: 700,
                lineHeight: 1.45,
                marginTop: "4px",
                textAlign: "center",
              }}
            >
              "{displayQuote}"
            </div>

            <div
              style={{
                display: "flex",
                color: theme.accentColor || "#FBBF24",
                fontSize: "22px",
                fontWeight: 600,
                marginTop: "4px",
              }}
            >
              — {displaySource}
            </div>
          </div>

          {/* Bottom Section: Devotee Name (if provided) & Bhakti Voice Branding */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {devoteeName ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255, 255, 255, 0.12)",
                  border: `1px solid ${theme.borderColor}`,
                  borderRadius: "20px",
                  padding: "4px 20px",
                  color: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <span style={{ display: "flex" }}>🙏 प्रेषक:</span>
                <span style={{ display: "flex", color: theme.accentColor || "#FBBF24" }}>
                  {devoteeName} {devoteeCity ? `(${devoteeCity})` : ""}
                </span>
              </div>
            ) : null}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "18px",
                fontWeight: 600,
                background: "rgba(0, 0, 0, 0.3)",
                padding: "4px 18px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <span style={{ display: "flex" }}>bhaktivoice.com</span>
              <span style={{ display: "flex" }}>•</span>
              <span style={{ display: "flex" }}>भक्ति वॉइस</span>
              <span style={{ display: "flex" }}>•</span>
              <span style={{ display: "flex", color: "#FDE68A" }}>अपना कार्ड बनाएं</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error("OG Image generation failed:", e);
    return new Response(`Failed to generate OG image`, { status: 500 });
  }
}
