"use client";

import { useId } from "react";

type Point = { x: number; y: number };

function cubic(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

function tangent(p0: Point, p1: Point, p2: Point, p3: Point, t: number) {
  const a = cubic(p0, p1, p2, p3, Math.max(0, t - 0.012));
  const b = cubic(p0, p1, p2, p3, Math.min(1, t + 0.012));
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

function beadsOnCurve(p0: Point, p1: Point, p2: Point, p3: Point, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const t = (index + 0.5) / count;
    const point = cubic(p0, p1, p2, p3, t);
    return { ...point, rotate: tangent(p0, p1, p2, p3, t) + 90, guru: false };
  });
}

const BEAD_FILLS = ["#b36a38", "#8d4a24", "#c17a45", "#7a3e1c", "#a85f32"];

function Bead({
  x,
  y,
  rotate,
  guru,
  variant,
}: {
  x: number;
  y: number;
  rotate: number;
  guru: boolean;
  variant: number;
}) {
  const rx = guru ? 11.5 : 7.4;
  const ry = guru ? 13.5 : 8.8;
  const fill = guru ? "#6e3414" : BEAD_FILLS[variant % BEAD_FILLS.length];
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`}>
      <ellipse cx={x} cy={y + 1.4} rx={rx} ry={ry} fill="rgba(70,32,8,0.16)" />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={fill} />
      <ellipse
        cx={x - rx * 0.28}
        cy={y - ry * 0.32}
        rx={rx * 0.42}
        ry={ry * 0.28}
        fill="rgba(255,228,196,0.32)"
      />
      <path
        d={`M ${x} ${y - ry * 0.72} C ${x + 1.2} ${y - 2}, ${x + 1.2} ${y + 2}, ${x} ${y + ry * 0.72}`}
        fill="none"
        stroke="rgba(50,22,6,0.28)"
        strokeWidth="0.7"
      />
    </g>
  );
}

export function HangingMala() {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");

  const loopCx = 118;
  const loopCy = 86;
  const loopR = 42;
  const loop = Array.from({ length: 20 }, (_, index) => {
    const angle = ((index / 20) * 360 - 90) * (Math.PI / 180);
    return {
      x: loopCx + loopR * Math.cos(angle),
      y: loopCy + loopR * Math.sin(angle),
      rotate: (angle * 180) / Math.PI + 90,
      guru: index === 10,
    };
  });

  const hangMain = beadsOnCurve(
    { x: 148, y: 118 },
    { x: 198, y: 210 },
    { x: 48, y: 330 },
    { x: 126, y: 448 },
    26,
  );
  hangMain[8].guru = true;
  hangMain[25].guru = true;

  const hangSide = beadsOnCurve(
    { x: 88, y: 122 },
    { x: 36, y: 200 },
    { x: 78, y: 268 },
    { x: 62, y: 318 },
    12,
  );

  const beads = [...loop, ...hangMain, ...hangSide];

  return (
    <svg
      viewBox="0 0 220 560"
      className="hanging-mala h-full w-full"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="7%" stopColor="#fff" stopOpacity="1" />
          <stop offset="84%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="22%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="220" height="560" fill={`url(#${id}-fade)`} />
        </mask>
        <mask id={`${id}-side-mask`}>
          <rect width="220" height="560" fill={`url(#${id}-side)`} />
        </mask>
      </defs>

      <g mask={`url(#${id}-mask)`}>
        <g mask={`url(#${id}-side-mask)`}>
          <circle
            cx={loopCx}
            cy={loopCy}
            r={loopR}
            stroke="#6b3a1a"
            strokeWidth="1.4"
            opacity="0.55"
          />
          <path
            d="M148 118 C198 210, 48 330, 126 448"
            stroke="#6b3a1a"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M88 122 C36 200, 78 268, 62 318"
            stroke="#6b3a1a"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.4"
          />

          {beads.map((bead, index) => (
            <Bead
              key={index}
              x={bead.x}
              y={bead.y}
              rotate={bead.rotate}
              guru={bead.guru}
              variant={index}
            />
          ))}

          <g transform="translate(126 456)">
            <ellipse cx="0" cy="0" rx="8" ry="5" fill="#c9a227" />
            <rect x="-6" y="2" width="12" height="7" rx="2" fill="#d4a84b" />
            {[ -9, -5.5, -2, 1.5, 5, 8.5 ].map((dx, index) => (
              <path
                key={dx}
                d={`M ${dx * 0.2} 8 C ${dx} 28, ${dx + (index % 2 === 0 ? 4 : -3)} 46, ${dx} 62`}
                stroke={index % 2 === 0 ? "#7a3e1c" : "#9a5a2a"}
                strokeWidth="2.1"
                strokeLinecap="round"
                opacity="0.9"
              />
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}
