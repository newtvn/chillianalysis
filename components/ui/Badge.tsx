import type { ReactNode } from "react";

type Tone = "neutral" | "brand" | "danger" | "warning" | "live" | "solid";

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  const tones: Record<Tone, { bg: string; fg: string; border: string }> = {
    neutral: { bg: "#121212", fg: "#A3A3A3", border: "#262626" },
    brand: { bg: "#052E16", fg: "#4ADE80", border: "#16A34A" },
    danger: { bg: "#450A0A", fg: "#F87171", border: "#DC2626" },
    warning: { bg: "#422006", fg: "#FDE047", border: "#CA8A04" },
    live: { bg: "#000", fg: "#4ADE80", border: "#4ADE80" },
    solid: { bg: "#4ADE80", fg: "#000", border: "#4ADE80" },
  };
  const t = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        padding: "3px 10px",
        borderRadius: 999,
        fontFamily: "Space Grotesk, sans-serif",
        fontSize: 11,
        fontWeight: tone === "solid" ? 600 : 500,
        letterSpacing: tone === "live" ? "0.04em" : 0,
        textTransform: tone === "live" ? "uppercase" : "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
