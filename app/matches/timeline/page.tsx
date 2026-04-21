import { apiGet } from "@/lib/api";
import type { MatchTimelineData } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { Badge } from "@/components/ui/Badge";

export default async function MatchTimelinePage() {
  const data = await apiGet<MatchTimelineData>("/api/matches/timeline");
  const currentPct = (data.currentMinute / 90) * 100;
  return (
    <div className="content-page" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <MetricLabel>{data.matchday}</MetricLabel>
        <h1
          className="hero-title"
          style={{
            margin: "4px 0 0",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {data.home.abbr} {data.home.score} – {data.away.score} {data.away.abbr}
          <span style={{ color: "#4ADE80" }}>.</span>
        </h1>
      </div>

      <div style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 2, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <MetricLabel>xG race · cumulative</MetricLabel>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#A3A3A3" }}>
            {data.home.abbr} <span style={{ color: "#4ADE80" }}>{data.xgRace.home}</span> ·{" "}
            {data.away.abbr} <span style={{ color: "#60A5FA" }}>{data.xgRace.away}</span>
          </div>
        </div>
        <svg viewBox="0 0 680 160" width="100%" style={{ marginTop: 10 }}>
          <g stroke="#1F1F1F" strokeWidth="1">
            <line x1="0" y1="30" x2="680" y2="30" />
            <line x1="0" y1="70" x2="680" y2="70" />
            <line x1="0" y1="110" x2="680" y2="110" />
            <line x1="0" y1="150" x2="680" y2="150" />
            <line x1="340" y1="0" x2="340" y2="160" strokeDasharray="3 3" />
          </g>
          <path
            d="M0 150 L110 145 L190 135 L260 100 L320 85 L380 72 L450 58 L520 40 L580 28 L680 22"
            stroke="#4ADE80"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0 150 L110 148 L190 142 L260 135 L320 115 L380 80 L450 70 L520 65 L580 62 L680 60"
            stroke="#60A5FA"
            strokeWidth="2"
            fill="none"
            strokeDasharray="3 3"
          />
          <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#737373">
            <text x="4" y="156">0′</text>
            <text x="336" y="156">HT</text>
            <text x="656" y="156">90′</text>
          </g>
        </svg>
      </div>

      <div style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 2, padding: 20 }}>
        <MetricLabel>Event scrubber</MetricLabel>
        <div style={{ position: "relative", height: 48, marginTop: 16 }}>
          <div
            style={{ position: "absolute", left: 0, right: 0, top: 22, height: 2, background: "#1F1F1F" }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              width: `${currentPct}%`,
              top: 22,
              height: 2,
              background: "#4ADE80",
            }}
          />
          {data.events.map((e) => {
            const left = (e.m / 90) * 100 + "%";
            const color =
              e.type === "goal"
                ? "#4ADE80"
                : e.type === "yellow"
                  ? "#FACC15"
                  : e.type === "sub"
                    ? "#A3A3A3"
                    : "#737373";
            return (
              <div
                key={e.m}
                style={{
                  position: "absolute",
                  left,
                  top: 14,
                  width: 18,
                  height: 18,
                  borderRadius: 2,
                  background: "#000",
                  border: `2px solid ${color}`,
                  transform: "translateX(-9px)",
                }}
              />
            );
          })}
          <div
            style={{
              position: "absolute",
              left: `${currentPct}%`,
              top: 0,
              transform: "translateX(-50%)",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: "#4ADE80",
            }}
          >
            {data.currentMinute}′
          </div>
        </div>
      </div>

      <div style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 2 }}>
        {data.events.map((e, i) => {
          const isGoal = e.type === "goal";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 16px",
                borderBottom: i < data.events.length - 1 ? "1px solid #1F1F1F" : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "#737373",
                  minWidth: 36,
                }}
              >
                {e.m}′
              </div>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: isGoal
                    ? "#4ADE80"
                    : e.type === "yellow"
                      ? "#FACC15"
                      : e.type === "sub"
                        ? "#A3A3A3"
                        : "#404040",
                }}
              />
              <div
                style={{
                  flex: 1,
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 13,
                  color: "#F5F5F5",
                  fontWeight: isGoal ? 600 : 400,
                }}
              >
                {e.text}
              </div>
              {e.xg && (
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#A3A3A3" }}>
                  xG {e.xg}
                </span>
              )}
              {isGoal && (
                <Badge tone={e.team === "h" ? "brand" : "neutral"}>
                  {e.team === "h" ? data.home.abbr : data.away.abbr}
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
