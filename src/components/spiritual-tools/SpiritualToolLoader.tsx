"use client";

import dynamic from "next/dynamic";

const PanchangTool = dynamic(
  () => import("./PanchangTool").then((mod) => mod.PanchangTool),
  { loading: () => <div className="h-40 animate-pulse rounded-[28px] bg-sand" /> },
);

const KundliTool = dynamic(
  () => import("./KundliTool").then((mod) => mod.KundliTool),
  { loading: () => <div className="h-40 animate-pulse rounded-[28px] bg-sand" /> },
);

const KundliMilanTool = dynamic(
  () => import("./KundliMilanTool").then((mod) => mod.KundliMilanTool),
  { loading: () => <div className="h-40 animate-pulse rounded-[28px] bg-sand" /> },
);

export function SpiritualToolLoader({ tool }: { tool: "panchang" | "kundli" | "kundliMilan" }) {
  if (tool === "panchang") return <PanchangTool />;
  if (tool === "kundli") return <KundliTool />;
  return <KundliMilanTool />;
}
