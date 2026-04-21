import { apiGet } from "@/lib/api";
import type { LeagueData } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { Button } from "@/components/ui/Button";

export default async function LeagueTablePage({
  searchParams,
}: {
  searchParams: Promise<{ league?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.league ? `?league=${encodeURIComponent(sp.league)}` : "";
  const data = await apiGet<LeagueData>(`/api/league-table${q}`);
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
          <MetricLabel>
            {data.league} · {data.season} · {data.matchday}
          </MetricLabel>
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
            Table<span style={{ color: "#4ADE80" }}>.</span>
          </h1>
        </div>
        <Button variant="secondary">Export</Button>
      </div>

      <div className="table-scroll" style={{ background: "#0A0A0A", border: "1px solid #262626" }}>
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
              {["#", "Team", "MP", "W", "D", "L", "GF", "GA", "xGD", "Pts"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    textAlign: i === 1 ? "left" : i === 0 ? "center" : "right",
                    padding: "10px 12px",
                    fontSize: 10,
                    color: "#737373",
                    letterSpacing: "0.1em",
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
                style={{
                  borderBottom: i < data.rows.length - 1 ? "1px solid #1F1F1F" : 0,
                  borderLeft:
                    r.p <= 4
                      ? "3px solid #4ADE80"
                      : r.p <= 6
                        ? "3px solid #FACC15"
                        : r.p >= data.rows.length - 2
                          ? "3px solid #EF4444"
                          : "3px solid transparent",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    fontFamily: "JetBrains Mono, monospace",
                    color: r.p <= 4 ? "#4ADE80" : "#A3A3A3",
                    fontWeight: 600,
                  }}
                >
                  {r.p}
                </td>
                <td style={{ padding: "12px", color: "#F5F5F5", fontWeight: 500 }}>{r.team}</td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#A3A3A3",
                  }}
                >
                  {r.mp}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#F5F5F5",
                  }}
                >
                  {r.w}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#A3A3A3",
                  }}
                >
                  {r.d}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#A3A3A3",
                  }}
                >
                  {r.l}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#F5F5F5",
                  }}
                >
                  {r.gf}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#A3A3A3",
                  }}
                >
                  {r.ga}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "JetBrains Mono, monospace",
                    color: r.xgd.startsWith("+") ? "#4ADE80" : "#F87171",
                  }}
                >
                  {r.xgd}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 700,
                    color: "#F5F5F5",
                    fontSize: 15,
                  }}
                >
                  {r.pts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          gap: 18,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          color: "#737373",
          letterSpacing: "0.08em",
          flexWrap: "wrap",
        }}
      >
        <span>
          <span style={{ color: "#4ADE80" }}>▌</span> UCL
        </span>
        <span>
          <span style={{ color: "#FACC15" }}>▌</span> UEL
        </span>
        <span>
          <span style={{ color: "#EF4444" }}>▌</span> RELEGATION
        </span>
      </div>
    </div>
  );
}
