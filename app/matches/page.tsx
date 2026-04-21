import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { MatchData } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { Badge } from "@/components/ui/Badge";
import { LiveDot } from "@/components/ui/LiveDot";
import { ShotMap } from "@/components/charts/ShotMap";

export default async function MatchPage() {
  const data = await apiGet<MatchData>("/api/matches");
  return (
    <div className="content-page" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#737373" }}>
        <Link href="/" style={{ color: "#737373", textDecoration: "none" }}>
          Dashboard
        </Link>
        <span>→</span>
        <span>Matches</span>
        <span>→</span>
        <span style={{ color: "#F5F5F5" }}>
          {data.home.abbr} v {data.away.abbr}
        </span>
      </div>
      <div
        className="match-header"
        style={{
          background: "#0A0A0A",
          border: "1px solid #262626",
          borderRadius: 2,
          padding: 24,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ textAlign: "right", flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 18 }}>{data.home.name}</div>
          <MetricLabel style={{ marginTop: 4 }}>Home · {data.home.formation}</MetricLabel>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 700,
              fontSize: 72,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {data.home.score}
          </span>
          <span style={{ fontSize: 32, color: "#737373" }}>–</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 700,
              fontSize: 72,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#A3A3A3",
            }}
          >
            {data.away.score}
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: "#A3A3A3" }}>{data.away.name}</div>
          <MetricLabel style={{ marginTop: 4 }}>Away · {data.away.formation}</MetricLabel>
        </div>
        <div style={{ textAlign: "center", borderLeft: "1px solid #262626", paddingLeft: 20 }}>
          <Badge tone="live">
            <LiveDot />
            {data.status}
          </Badge>
          <div
            style={{
              fontSize: 11,
              color: "#A3A3A3",
              marginTop: 8,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {data.venue} · {data.weather}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 2, padding: 20 }}>
          <MetricLabel>Shot map · {data.home.abbr}</MetricLabel>
          <div style={{ marginTop: 10 }}>
            <ShotMap shots={data.home.shots} />
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "#A3A3A3",
            }}
          >
            Shots <span style={{ color: "#F5F5F5" }}>{data.home.shotCount}</span> · xG{" "}
            <span style={{ color: "#F5F5F5" }}>{data.home.xg}</span> · G{" "}
            <span style={{ color: "#4ADE80" }}>{data.home.goals}</span>
          </div>
        </div>
        <div style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 2, padding: 20 }}>
          <MetricLabel>Shot map · {data.away.abbr}</MetricLabel>
          <div style={{ marginTop: 10 }}>
            <ShotMap shots={data.away.shots} />
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "#A3A3A3",
            }}
          >
            Shots <span style={{ color: "#F5F5F5" }}>{data.away.shotCount}</span> · xG{" "}
            <span style={{ color: "#F5F5F5" }}>{data.away.xg}</span> · G{" "}
            <span style={{ color: "#A3A3A3" }}>{data.away.goals}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
