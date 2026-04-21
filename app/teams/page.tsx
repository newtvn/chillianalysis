import { apiGet } from "@/lib/api";
import type { TeamData } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { StatFig } from "@/components/ui/StatFig";

export default async function TeamPage() {
  const data = await apiGet<TeamData>("/api/teams");
  return (
    <div className="content-page" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        className="player-header"
        style={{
          background: "#0A0A0A",
          border: "1px solid #262626",
          borderRadius: 2,
          padding: 24,
          display: "flex",
          alignItems: "center",
          gap: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(74,222,128,0.1), transparent 50%)",
          }}
        />
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 2,
            background: "#4ADE80",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: 32,
            zIndex: 1,
            flexShrink: 0,
          }}
        >
          {data.abbr}
        </div>
        <div style={{ zIndex: 1, flex: 1 }}>
          <MetricLabel>{data.league}</MetricLabel>
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
            {data.name}
          </h1>
          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 10,
              fontSize: 13,
              color: "#A3A3A3",
              flexWrap: "wrap",
            }}
          >
            <span>{data.record}</span>
            <span>
              · {data.goalsFor} GF · {data.goalsAgainst} GA
            </span>
            <span>· {data.stadium}</span>
          </div>
        </div>
        <div
          className="player-header-right"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, zIndex: 1 }}
        >
          {data.stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "0 10px" }}>
              <MetricLabel>{s.label}</MetricLabel>
              <StatFig color="#4ADE80" size={28}>
                {s.value}
              </StatFig>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2-1">
        <div style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 2, padding: 20 }}>
          <MetricLabel>Squad</MetricLabel>
          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {data.squad.map((p) => (
              <div
                key={p.num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 2,
                  background: "#000",
                  border: "1px solid #1F1F1F",
                }}
              >
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 13,
                    color: "#737373",
                    minWidth: 22,
                  }}
                >
                  {p.num}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 13,
                    color: "#F5F5F5",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#737373",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {p.pos}
                </div>
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 13,
                    color: parseFloat(p.rating) >= 8 ? "#4ADE80" : "#F5F5F5",
                  }}
                >
                  {p.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 2, padding: 20 }}>
          <MetricLabel>Form · last 5</MetricLabel>
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            {data.form.map((r, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  background: r === "W" ? "#052E16" : r === "D" ? "#121212" : "#450A0A",
                  color: r === "W" ? "#4ADE80" : r === "D" ? "#A3A3A3" : "#F87171",
                  border: `1px solid ${r === "W" ? "#16A34A" : r === "D" ? "#262626" : "#B91C1C"}`,
                }}
              >
                {r}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <MetricLabel>Next fixture</MetricLabel>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                marginTop: 6,
              }}
            >
              {data.nextFixture.text}
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                color: "#A3A3A3",
                marginTop: 2,
              }}
            >
              {data.nextFixture.venue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
