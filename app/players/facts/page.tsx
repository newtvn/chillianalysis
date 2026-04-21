import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { PlayerFactsData } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { Badge } from "@/components/ui/Badge";

function FactCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{ background: "#0A0A0A", border: "1px solid #262626", padding: 16 }}>
      <MetricLabel>{label}</MetricLabel>
      <div
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#F5F5F5",
          marginTop: 6,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          color: "#737373",
          letterSpacing: "0.08em",
          marginTop: 2,
        }}
      >
        {sub}
      </div>
    </div>
  );
}

export default async function PlayerFactsPage() {
  const data = await apiGet<PlayerFactsData>("/api/players/facts");
  return (
    <div className="content-page" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 12, color: "#737373" }}>
        <Link href="/players" style={{ color: "#737373", textDecoration: "none" }}>
          {data.name}
        </Link>{" "}
        <span>→</span> <span style={{ color: "#F5F5F5" }}>Profile & facts</span>
      </div>

      <div style={{ background: "#0A0A0A", border: "1px solid #262626", padding: 20 }}>
        <MetricLabel>Player profile · AI generated from 240 matches</MetricLabel>
        <div
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 22,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: "-0.015em",
            marginTop: 10,
            textWrap: "pretty",
          }}
        >
          <span style={{ color: "#4ADE80" }}>{data.profileSummary.green}</span>{" "}
          <span style={{ color: "#F5F5F5" }}>{data.profileSummary.white}</span>{" "}
          <span style={{ color: "#A3A3A3" }}>{data.profileSummary.gray}</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
          {data.tags.map((t) => (
            <Badge key={t} tone="neutral">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid-4">
        {data.quickFacts.map((f) => (
          <FactCard key={f.label} {...f} />
        ))}
      </div>

      <div className="grid-12-1">
        <div style={{ background: "#0A0A0A", border: "1px solid #262626", padding: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <MetricLabel>Injury history</MetricLabel>
            <Badge tone="warning">ACL risk · elevated</Badge>
          </div>
          {data.injuries.map((i, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 80px 12px",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom: idx < data.injuries.length - 1 ? "1px solid #1F1F1F" : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#737373",
                  letterSpacing: "0.08em",
                }}
              >
                {i.date}
              </div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "#F5F5F5" }}>{i.type}</div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#A3A3A3",
                  textAlign: "right",
                }}
              >
                {i.out}
              </div>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: i.severity === "high" ? "#EF4444" : i.severity === "mid" ? "#FACC15" : "#4ADE80",
                }}
              />
            </div>
          ))}
          <div
            style={{
              marginTop: 14,
              padding: 12,
              background: "#000",
              border: "1px solid #1F1F1F",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 2, alignSelf: "stretch", background: "#EF4444" }} />
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 13,
                  color: "#F5F5F5",
                  fontWeight: 600,
                }}
              >
                {data.injurySummary.title}
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#A3A3A3",
                  marginTop: 2,
                }}
              >
                {data.injurySummary.sub}
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "#0A0A0A", border: "1px solid #262626", padding: 20 }}>
          <MetricLabel>Player facts</MetricLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 12 }}>
            {data.funFacts.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    color: "#4ADE80",
                    fontSize: 18,
                    lineHeight: 1,
                    paddingTop: 2,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#F5F5F5",
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: 12,
                      color: "#A3A3A3",
                      marginTop: 2,
                    }}
                  >
                    {f.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#0A0A0A", border: "1px solid #262626", padding: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <MetricLabel>On-ball · time metrics</MetricLabel>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#737373" }}>
            vs positional avg
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "#262626",
            border: "1px solid #262626",
          }}
        >
          {data.timeMetrics.map((s, i) => (
            <div key={i} style={{ background: "#000", padding: 14 }}>
              <MetricLabel>{s.k}</MetricLabel>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }}>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#F5F5F5",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.v}
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    color: s.good ? "#4ADE80" : "#A3A3A3",
                  }}
                >
                  {s.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
