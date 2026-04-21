import { MetricLabel } from "./MetricLabel";
import { StatFig } from "./StatFig";

export function PlayerHeader({
  name,
  number,
  team,
  position,
  age,
  nationality,
  rating,
}: {
  name: string;
  number: number;
  team: string;
  position: string;
  age: number;
  nationality: string;
  rating: string;
}) {
  return (
    <div
      className="player-header"
      style={{
        background: "#0A0A0A",
        border: "1px solid #262626",
        borderRadius: 2,
        padding: 24,
        display: "flex",
        alignItems: "center",
        gap: 24,
        fontFamily: "Space Grotesk, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "#121212",
          border: "1px solid #262626",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 32,
          color: "#4ADE80",
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        {name
          .split(" ")
          .map((p) => p[0])
          .slice(0, 2)
          .join("")}
      </div>
      <div style={{ zIndex: 1, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <MetricLabel>
            #{number} · {position}
          </MetricLabel>
          <span style={{ fontSize: 11, color: "#737373" }}>· {team}</span>
        </div>
        <h1
          className="hero-title"
          style={{
            margin: "4px 0 0",
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {name}
        </h1>
        <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, color: "#A3A3A3", flexWrap: "wrap" }}>
          <span>{nationality}</span>
          <span>· {age} yrs</span>
          <span>· Contract &apos;27</span>
        </div>
      </div>
      <div className="player-header-right" style={{ textAlign: "right", zIndex: 1 }}>
        <MetricLabel>Season rating</MetricLabel>
        <StatFig color="#4ADE80" size={56}>
          {rating}
        </StatFig>
        <div
          style={{
            fontSize: 11,
            color: "#4ADE80",
            marginTop: 2,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          ↑ 0.4 vs last
        </div>
      </div>
    </div>
  );
}
