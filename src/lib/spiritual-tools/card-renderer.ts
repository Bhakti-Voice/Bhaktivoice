import type { CardAspectRatio, CardTheme, SuvicharItem } from "./suvichar-data";

export interface RenderCardOptions {
  theme: CardTheme;
  aspect: CardAspectRatio;
  item: SuvicharItem;
  customQuote?: string;
  customSource?: string;
  customShloka?: string;
  devoteeName?: string;
  devoteeCity?: string;
  salutation?: string;
  devoteeAvatarUrl?: string | null;
  showPanchang?: boolean;
  panchangDetails?: {
    dateStr: string;
    tithi: string;
    nakshatra: string;
    muhurat: string;
  };
  fontSizeScale?: number;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = words[0] || "";

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export async function renderSuvicharCard(
  canvas: HTMLCanvasElement,
  options: RenderCardOptions,
): Promise<void> {
  const {
    theme,
    aspect,
    item,
    customQuote,
    customSource,
    customShloka,
    devoteeName = "",
    devoteeCity = "",
    salutation = "",
    devoteeAvatarUrl = null,
    showPanchang = true,
    panchangDetails,
    fontSizeScale = 1.0,
  } = options;

  const width = aspect.width;
  const height = aspect.height;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 1. Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, theme.bgColors[0]);
  grad.addColorStop(0.5, theme.bgColors[1]);
  if (theme.bgColors[2]) {
    grad.addColorStop(1, theme.bgColors[2]);
  } else {
    grad.addColorStop(1, theme.bgColors[1]);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Radial ambient glow in center
  const radialGlow = ctx.createRadialGradient(
    width / 2,
    height * 0.4,
    50,
    width / 2,
    height * 0.4,
    width * 0.75,
  );
  radialGlow.addColorStop(0, theme.glowColor);
  radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // Subtle star dust particles
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  const starCount = 35;
  for (let i = 0; i < starCount; i++) {
    const sx = ((i * 1234567 + 89) % width);
    const sy = ((i * 7654321 + 43) % height);
    const sr = ((i % 3) + 1) * 1.5;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Ornate Double Golden Border
  const margin = Math.round(width * 0.04);
  const innerMargin = margin + 12;

  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, margin, margin, width - margin * 2, height - margin * 2, 28);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2, 20);
  ctx.stroke();

  // Corner decorative flourishes
  const cornerSize = 40;
  const corners = [
    { x: innerMargin, y: innerMargin },
    { x: width - innerMargin, y: innerMargin },
    { x: innerMargin, y: height - innerMargin },
    { x: width - innerMargin, y: height - innerMargin },
  ];
  ctx.fillStyle = theme.accentColor;
  corners.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. Top Header: Tradition / Salutation / Symbol Badge
  let cursorY = margin + Math.round(height * 0.04);

  // Symbol / Icon / Motif
  ctx.font = `${Math.round(44 * fontSizeScale)}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(theme.motif || "🪔 卐 🕉️", width / 2, cursorY);
  cursorY += Math.round(52 * fontSizeScale);

  // Salutation (e.g. सप्रेम जय जिनेन्द्र / जय श्री कृष्णा)
  const displaySalutation = salutation.trim() || (item.tradition === "jain" ? "सप्रेम जय जिनेन्द्र" : "जय श्री कृष्णा");
  ctx.font = `600 ${Math.round(28 * fontSizeScale)}px "Noto Sans Devanagari", system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = theme.badgeText;
  
  // Badge Pill behind salutation
  const salutationWidth = ctx.measureText(displaySalutation).width + 50;
  const salutationHeight = Math.round(40 * fontSizeScale);
  ctx.fillStyle = theme.badgeBg;
  drawRoundedRect(
    ctx,
    width / 2 - salutationWidth / 2,
    cursorY - salutationHeight / 2,
    salutationWidth,
    salutationHeight,
    20,
  );
  ctx.fill();
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = theme.badgeText;
  ctx.fillText(displaySalutation, width / 2, cursorY);
  cursorY += Math.round(48 * fontSizeScale);

  // Optional Panchang Ribbon
  if (showPanchang && panchangDetails) {
    const panchangText = `📅 ${panchangDetails.dateStr} • ${panchangDetails.tithi} • ${panchangDetails.nakshatra}`;
    ctx.font = `500 ${Math.round(21 * fontSizeScale)}px "Noto Sans Devanagari", system-ui, sans-serif`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fillText(panchangText, width / 2, cursorY);
    cursorY += Math.round(38 * fontSizeScale);
  }

  // Divider Line with Diya/Diamond
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.25, cursorY);
  ctx.lineTo(width * 0.75, cursorY);
  ctx.stroke();

  ctx.fillStyle = theme.accentColor;
  ctx.beginPath();
  ctx.arc(width / 2, cursorY, 6, 0, Math.PI * 2);
  ctx.fill();
  cursorY += Math.round(45 * fontSizeScale);

  // 4. Middle Content Container
  const activeShloka = (customShloka ?? item.shlokaOrSutra ?? "").trim();
  const activeQuote = (customQuote ?? item.quoteHi ?? "").trim();
  const activeSource = (customSource ?? item.sourceHi ?? "").trim();

  const maxTextWidth = Math.round(width * 0.78);

  // Shloka / Sanskrit Sutra (if exists)
  if (activeShloka) {
    ctx.font = `600 ${Math.round(27 * fontSizeScale)}px "Noto Sans Devanagari", "Tiro Devanagari Hindi", serif`;
    ctx.fillStyle = theme.shlokaColor;
    const shlokaLines = wrapText(ctx, activeShloka, maxTextWidth);
    const shlokaLineHeight = Math.round(38 * fontSizeScale);

    shlokaLines.forEach((line) => {
      ctx.fillText(line, width / 2, cursorY);
      cursorY += shlokaLineHeight;
    });
    cursorY += Math.round(24 * fontSizeScale);
  }

  // Big Decorative Quotation Mark
  ctx.font = `bold ${Math.round(72 * fontSizeScale)}px Georgia, serif`;
  ctx.fillStyle = theme.accentColor;
  ctx.fillText("“", width / 2, cursorY);
  cursorY += Math.round(32 * fontSizeScale);

  // Main Suvichar Quote Text (Rich, bold, prominent)
  const quoteFontSize = aspect.id === "story" ? 35 : aspect.id === "square" ? 31 : 33;
  ctx.font = `500 ${Math.round(quoteFontSize * fontSizeScale)}px "Noto Serif Devanagari", Georgia, serif`;
  ctx.fillStyle = theme.textColor;
  const quoteLines = wrapText(ctx, activeQuote, maxTextWidth);
  const quoteLineHeight = Math.round(quoteFontSize * 1.55 * fontSizeScale);

  quoteLines.forEach((line) => {
    ctx.fillText(line, width / 2, cursorY);
    cursorY += quoteLineHeight;
  });
  cursorY += Math.round(15 * fontSizeScale);

  // Source attribution (e.g. — भगवान महावीर / श्रीमद्भगवद्गीता)
  if (activeSource) {
    ctx.font = `italic 600 ${Math.round(24 * fontSizeScale)}px "Noto Sans Devanagari", system-ui, sans-serif`;
    ctx.fillStyle = theme.accentColor;
    ctx.fillText(`— ${activeSource}`, width / 2, cursorY);
    cursorY += Math.round(40 * fontSizeScale);
  }

  // 5. Bottom Section: Devotee Personalization & Bhakti Voice Watermark
  const bottomBoxY = height - margin - Math.round(height * 0.18);
  const bottomBoxHeight = Math.round(height * 0.13);

  // If user uploaded an avatar, load and draw in golden ring
  let avatarDrawn = false;
  if (devoteeAvatarUrl) {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = devoteeAvatarUrl;
      });

      const avatarRadius = Math.round(42 * fontSizeScale);
      const avatarX = width * 0.22;
      const avatarY = bottomBoxY + bottomBoxHeight * 0.45;

      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(
        img,
        avatarX - avatarRadius,
        avatarY - avatarRadius,
        avatarRadius * 2,
        avatarRadius * 2,
      );
      ctx.restore();

      // Golden ring around avatar
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarRadius + 3, 0, Math.PI * 2);
      ctx.strokeStyle = theme.accentColor;
      ctx.lineWidth = 4;
      ctx.stroke();

      avatarDrawn = true;
    } catch {
      avatarDrawn = false;
    }
  }

  // Devotee Name Box
  const nameLabel = devoteeName.trim()
    ? `सौजन्य से: ${devoteeName.trim()}${devoteeCity.trim() ? ` (${devoteeCity.trim()})` : ""}`
    : "शुभकामनाएं सहित — समस्त भक्त परिवार";

  const textCenterX = avatarDrawn ? width * 0.58 : width / 2;
  const textAlignment = avatarDrawn ? "left" : "center";

  ctx.textAlign = textAlignment as CanvasTextAlign;
  ctx.font = `600 ${Math.round(26 * fontSizeScale)}px "Noto Sans Devanagari", system-ui, sans-serif`;
  ctx.fillStyle = theme.textColor;
  ctx.fillText(nameLabel, textCenterX, bottomBoxY + bottomBoxHeight * 0.4);

  // Subtitle Blessing
  ctx.font = `400 ${Math.round(20 * fontSizeScale)}px "Noto Sans Devanagari", system-ui, sans-serif`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fillText("ईश्वर आपके परिवार को सुख, शांति और आरोग्य प्रदान करें", textCenterX, bottomBoxY + bottomBoxHeight * 0.72);

  // 6. Watermark Footer: Bhakti Voice Brand & Viral URL
  ctx.textAlign = "center";
  ctx.font = `500 ${Math.round(18 * fontSizeScale)}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  const footerY = height - margin - 14;
  ctx.fillText("bhaktivoice.com • भक्ति वॉइस (दैनिक सुविचार एवं स्टेटस)", width / 2, footerY);
}

export function exportCanvasDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png", 0.95);
}

export function exportCanvasBlob(
  canvas: HTMLCanvasElement,
  quality = 0.95,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png", quality);
  });
}
