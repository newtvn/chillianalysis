import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { PlayerProfile } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { StatCard } from "@/components/ui/StatCard";
import { PlayerHeader } from "@/components/ui/PlayerHeader";
import { RadarChart } from "@/components/charts/RadarChart";
import { ShotMap } from "@/components/charts/ShotMap";
import { Heatmap } from "@/components/charts/Heatmap";

export default async function PlayersPage() {
  const data = await apiGet<PlayerProfile>("/api/players");
  return (
    <div className="content-page" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#737373" }}>
        <Link href="/" style={{ color: "#737373", textDecoration: "none" }}>
          Dashboard
        </Link>
        <span>→</span>
        <span>Players</span>
        <span>→</span>
        <span style={{ color: "#F5F5F5" }}>{data.name}</span>
      </div>

      <PlayerHeader
        name={data.name}
        number={data.number}
        team={data.team}
        position={data.position}
        age={data.age}
        nationality={data.nationality}
        rating={data.rating}
      />

      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #262626", flexWrap: "wrap" }}>
        {["Overview", "Shot map", "Passing", "Defensive", "Video"].map((t, i) => (
          <button
            key={t}
            style={{
              background: "transparent",
              border: 0,
              padding: "10px 14px",
              fontFamily: "inherit",
              fontSize: 13,
              color: i === 0 ? "#F5F5F5" : "#A3A3A3",
              borderBottom: i === 0 ? "2px solid #4ADE80" : "2px solid transparent",
              marginBottom: -1,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {t}
          </button>
        ))}
        <div style={{ marginLeft: "auto", padding: "6px 0" }}>
          <Link href="/players/compare" style={{ textDecoration: "none" }}>
            <Button variant="ghost">Compare +</Button>
          </Link>
        </div>
      </div>

      <div className="grid-4">
        {data.stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            delta={s.delta}
            suffix={s.suffix}
            selected={s.selected}
          />
        ))}
      </div>

      <div className="grid-2">
        <div
          style={{
            background: "#0A0A0A",
            border: "1px solid #262626",
            borderRadius: 2,
            padding: 20,
          }}
        >
          <MetricLabel>Profile vs position avg</MetricLabel>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
            <RadarChart
              axes={data.radarAxes}
              data={[{ values: data.radarValues, color: "#4ADE80" }]}
              size={280}
            />
          </div>
          <div style={{ fontSize: 12, color: "#A3A3A3", marginTop: 6, textAlign: "center" }}>
            {data.percentile}
          </div>
        </div>
        <div
          style={{
            background: "#0A0A0A",
            border: "1px solid #262626",
            borderRadius: 2,
            padding: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
            <MetricLabel>Shot map · 24/25</MetricLabel>
            <span style={{ fontSize: 11, color: "#A3A3A3", fontFamily: "JetBrains Mono, monospace" }}>
              xG {data.shotStats.xg} · G {data.shotStats.goals}
            </span>
          </div>
          <ShotMap shots={data.shots} />
          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 14,
              fontSize: 11,
              color: "#737373",
              fontFamily: "Space Grotesk, sans-serif",
              flexWrap: "wrap",
            }}
          >
            <span><span style={{ color: "#166534" }}>●</span> low xG</span>
            <span><span style={{ color: "#4ADE80" }}>●</span> mid</span>
            <span><span style={{ color: "#FACC15" }}>●</span> high</span>
            <span><span style={{ color: "#EF4444" }}>●</span> goal</span>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#0A0A0A",
          border: "1px solid #262626",
          borderRadius: 2,
          padding: 20,
        }}
      >
        <MetricLabel>Heatmap · touches</MetricLabel>
        <div style={{ marginTop: 12 }}>
          <Heatmap />
        </div>
      </div>
    </div>
  );
}
