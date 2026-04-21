import { apiGet } from "@/lib/api";
import type { TeamCompareData } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";

function TeamHeadline({
  name,
  abbr,
  league,
  record,
  color,
  right,
}: {
  name: string;
  abbr: string;
  league: string;
  record: string;
  color: string;
  right?: boolean;
}) {
  return (
    <div
      style={{
        background: "#0A0A0A",
        border: "1px solid #262626",
        padding: 18,
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexDirection: right ? "row-reverse" : "row",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          background: color,
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: "-0.02em",
          flexShrink: 0,
        }}
      >
        {abbr}
      </div>
      <div style={{ flex: 1, textAlign: right ? "right" : "left" }}>
        <div
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "#737373",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: 2,
          }}
        >
          {league} · {record}
        </div>
      </div>
    </div>
  );
}

function FormStrip({ team, results, color }: { team: string; results: ("W" | "D" | "L")[]; color: string }) {
  return (
    <div style={{ background: "#0A0A0A", border: "1px solid #262626", padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <MetricLabel>{team} · last 7</MetricLabel>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color }}>●</span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {results.map((r, i) => (
          <div
            key={i}
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              background: r === "W" ? "#052E16" : r === "D" ? "#121212" : "#450A0A",
              color: r === "W" ? "#4ADE80" : r === "D" ? "#A3A3A3" : "#F87171",
              border: `1px solid ${r === "W" ? "#16A34A" : r === "D" ? "#262626" : "#B91C1C"}`,
            }}
          >
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function TeamComparePage() {
  const data = await apiGet<TeamCompareData>("/api/teams/compare");
  return (
    <div className="content-page" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <MetricLabel>Team comparison · 2025/26</MetricLabel>
        <h1
          className="hero-title"
          style={{
            margin: "4px 0 0",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {data.a.name} <span style={{ color: "#737373", fontWeight: 400 }}>vs</span> {data.b.name}
          <span style={{ color: "#4ADE80" }}>.</span>
        </h1>
      </div>

      <div className="grid-2">
        <TeamHeadline {...data.a} />
        <TeamHeadline {...data.b} right />
      </div>

      <div style={{ background: "#0A0A0A", border: "1px solid #262626", padding: 20 }}>
        <MetricLabel>Head to head metrics</MetricLabel>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {data.stats.map((s) => {
            const aBetter = s.inv ? s.a < s.b : s.a > s.b;
            return (
              <div
                key={s.k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 160px 1fr",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 15,
                      fontWeight: 600,
                      color: aBetter ? "#4ADE80" : "#A3A3A3",
                    }}
                  >
                    {s.a}
                    {s.unit || ""}
                  </span>
                  <div style={{ width: 160, height: 4, background: "#1F1F1F", position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "100%",
                        width: (s.a / s.max) * 100 + "%",
                        background: aBetter ? "#4ADE80" : "#404040",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10,
                    color: "#737373",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.k}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 160, height: 4, background: "#1F1F1F", position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: (s.b / s.max) * 100 + "%",
                        background: !aBetter ? "#60A5FA" : "#404040",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 15,
                      fontWeight: 600,
                      color: !aBetter ? "#60A5FA" : "#A3A3A3",
                    }}
                  >
                    {s.b}
                    {s.unit || ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-2">
        <FormStrip team={data.a.abbr} results={data.aForm} color={data.a.color} />
        <FormStrip team={data.b.abbr} results={data.bForm} color={data.b.color} />
      </div>
    </div>
  );
}
