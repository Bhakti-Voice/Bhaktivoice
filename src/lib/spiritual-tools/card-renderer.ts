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
  isHindi?: boolean;
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

/**
 * Pure client-side Canvas Renderer for High-Resolution Devotional Status Cards
 * Renders large, crisp, perfectly centered typography with symmetrical layout.
 */
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
    isHindi = true,
  } = options;

  const width = aspect.width;
  const height = aspect.height;
  const isStory = aspect.id === "story";
  const isLandscape = aspect.id === "landscape";

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

  // Radial ambient sacred glow
  const radialGlow = ctx.createRadialGradient(
    width / 2,
    height * 0.45,
    50,
    width / 2,
    height * 0.45,
    width * 0.85,
  );
  radialGlow.addColorStop(0, theme.glowColor);
  radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // Subtle star dust particles
  ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
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

  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2, 20);
  ctx.stroke();

  // Corner decorative flourishes
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

  // 3. Render Top Header Section
  let headerCursorY = innerMargin + Math.round((isStory ? 75 : 50) * fontSizeScale);

  // Top Motif / Icon
  const motifSize = Math.round((isStory ? 54 : 44) * fontSizeScale);
  ctx.font = `${motifSize}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(theme.motif || "🪔 卐 🕉️", width / 2, headerCursorY);
  headerCursorY += Math.round((isStory ? 64 : 48) * fontSizeScale);


  // Salutation (Header Badge)
  const defaultSalutation = isHindi
    ? (item.tradition === "jain" ? "सप्रेम जय जिनेन्द्र" : "जय श्री कृष्णा")
    : (item.tradition === "jain" ? "Saprem Jai Jinendra 🙏" : "Jai Shree Krishna 🪈");
  const displaySalutation = salutation.trim() || defaultSalutation;

  const salutationFontSize = Math.round((isStory ? 32 : 25) * fontSizeScale);
  ctx.font = `600 ${salutationFontSize}px "Noto Sans Devanagari", "Inter", system-ui, sans-serif`;
  
  const salutationTextWidth = ctx.measureText(displaySalutation).width;
  const salutationPillWidth = Math.min(width * 0.8, salutationTextWidth + 60);
  const salutationPillHeight = Math.round(salutationFontSize * 1.6);

  ctx.fillStyle = theme.badgeBg;
  drawRoundedRect(
    ctx,
    width / 2 - salutationPillWidth / 2,
    headerCursorY - salutationPillHeight / 2,
    salutationPillWidth,
    salutationPillHeight,
    salutationPillHeight / 2,
  );
  ctx.fill();
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = theme.badgeText;
  ctx.fillText(displaySalutation, width / 2, headerCursorY);
  headerCursorY += Math.round((isStory ? 50 : 40) * fontSizeScale);

  // Optional Panchang Ribbon
  if (showPanchang && panchangDetails) {
    const panchangText = `📅 ${panchangDetails.dateStr} • ${panchangDetails.tithi} • ${panchangDetails.nakshatra}`;
    const panchangFontSize = Math.round((isStory ? 24 : 19) * fontSizeScale);
    ctx.font = `500 ${panchangFontSize}px "Noto Sans Devanagari", "Inter", system-ui, sans-serif`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.fillText(panchangText, width / 2, headerCursorY);
    headerCursorY += Math.round((isStory ? 42 : 32) * fontSizeScale);
  }

  // Divider Line with Central Golden Gem
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.22, headerCursorY);
  ctx.lineTo(width * 0.78, headerCursorY);
  ctx.stroke();

  ctx.fillStyle = theme.accentColor;
  ctx.beginPath();
  ctx.arc(width / 2, headerCursorY, 7, 0, Math.PI * 2);
  ctx.fill();
  headerCursorY += Math.round((isStory ? 35 : 25) * fontSizeScale);

  const topHeaderEndY = headerCursorY;

  // 4. Calculate Bottom Devotee Box Height & Avatar
  let avatarImg: HTMLImageElement | null = null;
  if (devoteeAvatarUrl) {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = devoteeAvatarUrl;
      });
      avatarImg = img;
    } catch {
      avatarImg = null;
    }
  }

  const hasAvatar = Boolean(avatarImg);
  const avatarRadius = Math.round((isStory ? 60 : 44) * fontSizeScale);

  // Devotee Text details
  const nameLabel = devoteeName.trim()
    ? (isHindi
        ? `सौजन्य से: ${devoteeName.trim()}${devoteeCity.trim() ? ` (${devoteeCity.trim()})` : ""}`
        : `From: ${devoteeName.trim()}${devoteeCity.trim() ? ` (${devoteeCity.trim()})` : ""}`)
    : (isHindi ? "शुभकामनाएं सहित — समस्त भक्त परिवार" : "With Best Wishes — Devotee Family");

  const blessingText = isHindi
    ? "ईश्वर आपके परिवार को सुख, शांति और आरोग्य प्रदान करें"
    : "May the Divine bless your family with joy, peace & health";

  const devoteeNameFontSize = Math.round((isStory ? 34 : 26) * fontSizeScale);
  const blessingFontSize = Math.round((isStory ? 26 : 19) * fontSizeScale);

  // Total bottom section height needed
  let bottomBlockHeight = Math.round((isStory ? 130 : 95) * fontSizeScale);
  if (hasAvatar) {
    bottomBlockHeight += avatarRadius * 2 + Math.round(24 * fontSizeScale);
  }

  const watermarkY = height - innerMargin - Math.round(28 * fontSizeScale);
  const bottomBoxStartY = watermarkY - bottomBlockHeight - Math.round(15 * fontSizeScale);


  // 5. Calculate & Center Middle Content in the Golden Zone
  const activeShloka = (customShloka ?? (isHindi ? item.shlokaOrSutra : (item.shlokaHinglish || item.shlokaOrSutra)) ?? "").trim();
  const activeQuote = (customQuote ?? (isHindi ? item.quoteHi : (item.quoteHinglish || item.quoteHi)) ?? "").trim();
  const activeSource = (customSource ?? (isHindi ? item.sourceHi : (item.sourceEn || item.sourceHi)) ?? "").trim();

  const maxTextWidth = Math.round(width * 0.82);

  // Measure Shloka Lines
  const shlokaFontSize = Math.round((isStory ? 40 : 28) * fontSizeScale);
  const shlokaLineHeight = Math.round(shlokaFontSize * 1.55);
  ctx.font = `600 ${shlokaFontSize}px "Noto Sans Devanagari", "Tiro Devanagari Hindi", "Inter", serif`;
  const shlokaLines = activeShloka ? wrapText(ctx, activeShloka, maxTextWidth) : [];
  const shlokaTotalHeight = shlokaLines.length > 0 ? shlokaLines.length * shlokaLineHeight + Math.round(28 * fontSizeScale) : 0;

  // Quote Mark Height
  const quoteMarkFontSize = Math.round((isStory ? 84 : 60) * fontSizeScale);
  const quoteMarkHeight = Math.round((isStory ? 48 : 36) * fontSizeScale);

  // Measure Main Quote Lines
  const quoteFontSize = Math.round((isStory ? 48 : (isLandscape ? 34 : 36)) * fontSizeScale);
  const quoteLineHeight = Math.round(quoteFontSize * 1.58);
  ctx.font = `600 ${quoteFontSize}px "Noto Serif Devanagari", "Playfair Display", Georgia, serif`;
  const quoteLines = wrapText(ctx, activeQuote, maxTextWidth);
  const quoteTotalHeight = quoteLines.length * quoteLineHeight;

  // Measure Source Height
  const sourceFontSize = Math.round((isStory ? 32 : 23) * fontSizeScale);
  const sourceHeight = activeSource ? Math.round(42 * fontSizeScale) : 0;

  // Total Middle Content Height
  const middleContentHeight =
    shlokaTotalHeight +
    quoteMarkHeight +
    quoteTotalHeight +
    sourceHeight +
    Math.round(20 * fontSizeScale);

  // Vertically center between header and bottom devotee section
  const availableZoneHeight = bottomBoxStartY - topHeaderEndY;
  let cursorY = topHeaderEndY + Math.max(20, Math.round((availableZoneHeight - middleContentHeight) / 2));

  // Render Shloka Lines
  if (shlokaLines.length > 0) {
    ctx.font = `600 ${shlokaFontSize}px "Noto Sans Devanagari", "Tiro Devanagari Hindi", "Inter", serif`;
    ctx.fillStyle = theme.shlokaColor;
    shlokaLines.forEach((line) => {
      ctx.fillText(line, width / 2, cursorY);
      cursorY += shlokaLineHeight;
    });
    cursorY += Math.round(18 * fontSizeScale);
  }

  // Render Quotation Mark
  ctx.font = `bold ${quoteMarkFontSize}px Georgia, "Playfair Display", serif`;
  ctx.fillStyle = theme.accentColor;
  ctx.fillText("“", width / 2, cursorY);
  cursorY += quoteMarkHeight;

  // Render Main Suvichar Quote Text (Large, Prominent, Clear)
  ctx.font = `600 ${quoteFontSize}px "Noto Serif Devanagari", "Playfair Display", Georgia, serif`;
  ctx.fillStyle = theme.textColor;
  quoteLines.forEach((line) => {
    ctx.fillText(line, width / 2, cursorY);
    cursorY += quoteLineHeight;
  });
  cursorY += Math.round(16 * fontSizeScale);

  // Render Wisdom Source Attribution
  if (activeSource) {
    ctx.font = `italic 600 ${sourceFontSize}px "Noto Sans Devanagari", "Inter", system-ui, sans-serif`;
    ctx.fillStyle = theme.accentColor;
    ctx.fillText(`— ${activeSource}`, width / 2, cursorY);
  }

  // 6. Render Devotee Box (100% Centered Symmetrical Medallion)
  let bottomCursorY = bottomBoxStartY;

  if (avatarImg) {
    const avatarCenterX = width / 2;
    const avatarCenterY = bottomCursorY + avatarRadius;

    // Clip & Draw Avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      avatarImg,
      avatarCenterX - avatarRadius,
      avatarCenterY - avatarRadius,
      avatarRadius * 2,
      avatarRadius * 2,
    );
    ctx.restore();

    // Double Golden Medallion Rings around avatar
    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 3, 0, Math.PI * 2);
    ctx.strokeStyle = theme.accentColor;
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 7, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    bottomCursorY += avatarRadius * 2 + Math.round(24 * fontSizeScale);
  }

  // Devotee Name (Centered, Bold, Never clipped)
  ctx.textAlign = "center";
  ctx.font = `700 ${devoteeNameFontSize}px "Noto Sans Devanagari", "Inter", system-ui, sans-serif`;
  ctx.fillStyle = theme.textColor;
  ctx.fillText(nameLabel, width / 2, bottomCursorY);
  bottomCursorY += Math.round(devoteeNameFontSize * 1.38);

  // Devotee Subtitle Blessing (Centered, Large, High-Contrast & Clear)
  ctx.font = `500 ${blessingFontSize}px "Noto Sans Devanagari", "Inter", system-ui, sans-serif`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.fillText(blessingText, width / 2, bottomCursorY);


  // 7. Watermark Footer: Bhakti Voice Brand (Big, Prominent, Clear & Centered)
  ctx.textAlign = "center";
  const watermarkFontSize = Math.round((isStory ? 25 : 18) * fontSizeScale);
  ctx.font = `600 ${watermarkFontSize}px "Inter", "Noto Sans Devanagari", system-ui, -apple-system, sans-serif`;
  
  const footerText = isHindi
    ? "bhaktivoice.com • भक्ति वॉइस (दैनिक सुविचार एवं स्टेटस)"
    : "bhaktivoice.com • Bhakti Voice (Daily Devotional Status)";

  // Draw subtle high-contrast frosted badge behind watermark
  const watermarkTextWidth = ctx.measureText(footerText).width;
  const watermarkPillWidth = Math.min(width * 0.9, watermarkTextWidth + 44);
  const watermarkPillHeight = Math.round(watermarkFontSize * 1.6);
  
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  drawRoundedRect(
    ctx,
    width / 2 - watermarkPillWidth / 2,
    watermarkY - watermarkPillHeight / 2,
    watermarkPillWidth,
    watermarkPillHeight,
    watermarkPillHeight / 2,
  );
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(footerText, width / 2, watermarkY);
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
