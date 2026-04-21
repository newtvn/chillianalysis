import { MetricLabel } from "./MetricLabel";
import { StatFig } from "./StatFig";

export function StatCard({
  label,
  value,
  delta,
  selected,
  suffix,
}: {
  label: string;
  value: string;
  delta?: string;
  selected?: boolean;
  suffix?: string;
}) {
  const deltaColor = delta && delta.startsWith("-") ? "#EF4444" : "#4ADE80";
  return (
    <div
      style={{
        background: "#0A0A0A",
        border: "1px solid #262626",
        borderLeft: selected ? "2px solid #4ADE80" : "1px solid #262626",
        borderRadius: 2,
        padding: 16,
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      <MetricLabel>{label}</MetricLabel>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 6 }}>
        <StatFig>{value}</StatFig>
        {suffix && <span style={{ color: "#737373", fontSize: 14 }}>{suffix}</span>}
      </div>
      {delta && (
        <div
          style={{
            fontSize: 11,
            color: deltaColor,
            marginTop: 4,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {delta.startsWith("-") ? "↓" : "↑"} {delta.replace(/^-/, "")}
        </div>
      )}
    </div>
  );
}
