import { apiGet } from "@/lib/api";
import type { ShortlistData } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default async function ShortlistPage() {
  const data = await apiGet<ShortlistData>("/api/shortlists");
  return (
    <div className="content-page" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <MetricLabel>{data.subtitle}</MetricLabel>
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
            {data.title}
            <span style={{ color: "#4ADE80" }}>.</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary">Export CSV</Button>
          <Button variant="primary">Share with staff</Button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {data.filters.map((f, i) => (
          <Badge key={f} tone={i === 0 ? "brand" : "neutral"}>
            {f}
          </Badge>
        ))}
        <Badge tone="neutral">+ Add filter</Badge>
      </div>
      <div
        className="table-scroll"
        style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 2 }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 13,
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #262626", background: "#000" }}>
              {["Player", "Age", "Team", "Pos", "Fit", "xG/90", "Value", "Status"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    textAlign: i === 0 || i === 2 || i === 3 || i === 7 ? "left" : "right",
                    padding: "10px 12px",
                    fontSize: 10,
                    color: "#737373",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => (
              <tr
                key={i}
                style={{ borderBottom: i < data.rows.length - 1 ? "1px solid #1F1F1F" : 0 }}
              >
                <td style={{ padding: "12px", fontWeight: 500, color: "#F5F5F5" }}>{r.name}</td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#F5F5F5",
                  }}
                >
                  {r.age}
                </td>
                <td style={{ padding: "12px", color: "#A3A3A3" }}>{r.team}</td>
                <td style={{ padding: "12px", color: "#A3A3A3" }}>{r.pos}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 4,
                        background: "#1F1F1F",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: r.fit + "%",
                          height: "100%",
                          background: r.fit > 90 ? "#4ADE80" : r.fit > 85 ? "#FACC15" : "#737373",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: "#F5F5F5",
                        minWidth: 28,
                        textAlign: "right",
                      }}
                    >
                      {r.fit}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#F5F5F5",
                  }}
                >
                  {r.xg}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#F5F5F5",
                  }}
                >
                  {r.val}
                </td>
                <td style={{ padding: "12px" }}>
                  {r.status === "brand" && <Badge tone="brand">Priority</Badge>}
                  {r.status === "warning" && <Badge tone="warning">Contract &apos;25</Badge>}
                  {r.status === "neutral" && <Badge tone="neutral">Tracking</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
