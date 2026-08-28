"use client";

import { memo, useEffect, useRef } from "react";

const CX = 160;
const CY = 160;
const INNER_R = 112;
const VIEW = 320;
const PIXEL = 640;

const OM_RINGS = [
  { r: 156.2, size: 3.05, reverse: false, fill: "#f8e7a8" },
  { r: 152.6, size: 2.55, reverse: true, fill: "#e8c15a" },
  { r: 149.2, size: 2.9, reverse: false, fill: "#fff1c4" },
  { r: 145.7, size: 2.45, reverse: true, fill: "#d4a017" },
  { r: 142.3, size: 2.8, reverse: false, fill: "#f3d27a" },
  { r: 138.8, size: 2.4, reverse: true, fill: "#f6de8a" },
  { r: 135.4, size: 2.7, reverse: false, fill: "#e6c25c" },
  { r: 132.0, size: 2.35, reverse: true, fill: "#fff4c2" },
  { r: 128.6, size: 2.6, reverse: false, fill: "#d4a84b" },
  { r: 125.3, size: 2.3, reverse: true, fill: "#f8e7a2" },
  { r: 122.0, size: 2.5, reverse: false, fill: "#e8c15a" },
  { r: 118.8, size: 2.2, reverse: true, fill: "#f3d27a" },
] as const;

function polar(angle: number, radius: number) {
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  };
}

function omCount(radius: number, size: number) {
  return Math.max(80, Math.round((2 * Math.PI * radius) / (size * 0.92)));
}

function fontFamily() {
  if (typeof document === "undefined") return `"Noto Serif Devanagari", serif`;
  const token = getComputedStyle(document.documentElement).getPropertyValue("--font-devanagari").trim();
  return token ? `${token}, "Noto Serif Devanagari", serif` : `"Noto Serif Devanagari", serif`;
}

function paintLayer(ctx: CanvasRenderingContext2D, reverse: boolean) {
  ctx.clearRect(0, 0, PIXEL, PIXEL);
  ctx.setTransform(PIXEL / VIEW, 0, 0, PIXEL / VIEW, 0, 0);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const family = fontFamily();

  if (!reverse) {
    for (let index = 0; index < 32; index += 1) {
      const step = (Math.PI * 2) / 32;
      const a = index * step - Math.PI / 2;
      const tip = polar(a + step / 2, 159);
      const left = polar(a, 148);
      const right = polar(a + step, 148);
      const waist = polar(a + step / 2, 154);
      ctx.beginPath();
      ctx.moveTo(left.x, left.y);
      ctx.quadraticCurveTo(waist.x, waist.y, tip.x, tip.y);
      ctx.quadraticCurveTo(waist.x, waist.y, right.x, right.y);
      ctx.closePath();
      ctx.fillStyle = index % 2 === 0 ? "#e8c15a" : "#d4a017";
      ctx.globalAlpha = index % 2 === 0 ? 0.9 : 0.62;
      ctx.fill();
    }
    ctx.globalAlpha = 0.85;
    ctx.strokeStyle = "#f3d27a";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(CX, CY, 147, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    for (let index = 0; index < 64; index += 1) {
      const angle = (index / 64) * Math.PI * 2;
      const tall = index % 4 === 0;
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(angle);
      ctx.fillStyle = tall ? "#f6de8a" : "#d4a017";
      ctx.globalAlpha = 0.88;
      ctx.beginPath();
      ctx.roundRect(tall ? -1.5 : -1, -141, tall ? 3 : 2, tall ? 9 : 5.5, 0.6);
      ctx.fill();
      ctx.restore();
    }
  }

  ctx.globalAlpha = 0.92;
  for (const ring of OM_RINGS) {
    if (ring.reverse !== reverse) continue;
    const count = omCount(ring.r, ring.size);
    ctx.fillStyle = ring.fill;
    ctx.font = `700 ${ring.size}px ${family}`;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const x = CX + ring.r * Math.cos(angle);
      const y = CY + ring.r * Math.sin(angle);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText("ॐ", 0, 0);
      ctx.restore();
    }
  }

  if (!reverse) {
    ctx.globalAlpha = 0.95;
    for (let index = 0; index < 16; index += 1) {
      const angle = (index / 16) * Math.PI * 2 - Math.PI / 2;
      const radius = index % 2 === 0 ? 157 : 150;
      const { x, y } = polar(angle, radius);
      ctx.fillStyle = "#fff6cc";
      ctx.beginPath();
      ctx.arc(x, y, index % 3 === 0 ? 2.4 : 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
}

const ChakraBitmap = memo(function ChakraBitmap({ reverse }: { reverse: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const frameId = requestAnimationFrame(() => {
      paintLayer(ctx, reverse);
    });
    return () => cancelAnimationFrame(frameId);
  }, [reverse]);

  return (
    <canvas
      ref={ref}
      width={PIXEL}
      height={PIXEL}
      className={`absolute inset-0 h-full w-full ${reverse ? "jaap-chakra-spin-rev" : "jaap-chakra-spin"}`}
    />
  );
});

function ProgressRing({ malaProgress }: { malaProgress: number }) {
  const innerCirc = 2 * Math.PI * INNER_R;
  const innerOffset = innerCirc * (1 - Math.min(108, Math.max(0, malaProgress)) / 108);
  return (
    <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full">
      <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke="#f4e0a8" strokeWidth="2.2" />
      <circle
        cx={CX}
        cy={CY}
        r={INNER_R}
        fill="none"
        stroke="#d4a017"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={innerCirc}
        strokeDashoffset={innerOffset}
        transform={`rotate(-90 ${CX} ${CY})`}
        className="transition-all duration-300 ease-out"
      />
    </svg>
  );
}

export const JaapChakraRing = memo(function JaapChakraRing({ malaProgress }: { malaProgress: number }) {
  return (
    <div className="jaap-chakra pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="jaap-chakra-glow absolute inset-[6%] rounded-full" />
      <ChakraBitmap reverse={false} />
      <ChakraBitmap reverse={true} />
      <ProgressRing malaProgress={malaProgress} />
    </div>
  );
});
