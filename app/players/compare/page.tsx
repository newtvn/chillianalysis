import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { ComparePlayers } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { StatFig } from "@/components/ui/StatFig";
import { RadarChart } from "@/components/charts/RadarChart";

export default async function PlayerComparePage() {
  const data = await apiGet<ComparePlayers>("/api/players/compare");
  return (
    <div className="content-page" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#737373" }}>
        <Link href="/players" style={{ color: "#737373", textDecoration: "none" }}>
          Player
        </Link>
        <span>→</span>
        <span style={{ color: "#F5F5F5" }}>Compare</span>
      </div>
      <div>
        <MetricLabel>Head-to-head</MetricLabel>
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
        <div
          style={{
            background: "#0A0A0A",
            border: "1px solid #262626",
            borderRadius: 2,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RadarChart
            axes={data.axes}
            data={[
              { values: data.aValues, color: data.a.color },
              { values: data.bValues, color: data.b.color },
            ]}
            size={340}
          />
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 14,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div>
              <span style={{ color: data.a.color }}>●</span> {data.a.name}{" "}
              <span style={{ color: "#A3A3A3" }}>{data.a.percentile}</span>
            </div>
            <div>
              <span style={{ color: data.b.color }}>●</span> {data.b.name}{" "}
              <span style={{ color: "#A3A3A3" }}>{data.b.percentile}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.rows.map((r) => (
            <div
              key={r.k}
              style={{
                background: "#0A0A0A",
                border: "1px solid #262626",
                borderRadius: 2,
                padding: 14,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                alignItems: "center",
                gap: 10,
              }}
            >
              <StatFig color={data.a.color} size={24}>
                {r.a}
              </StatFig>
              <div style={{ textAlign: "center" }}>
                <MetricLabel>{r.k}</MetricLabel>
              </div>
              <div style={{ textAlign: "right" }}>
                <StatFig color={data.b.color} size={24}>
                  {r.b}
                </StatFig>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
