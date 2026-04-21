import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { DashboardData, PlayerRow } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { StatCard } from "@/components/ui/StatCard";
import { Note } from "@/components/ui/Note";

function ratingColor(r: PlayerRow): string {
  if (r._good) return "#4ADE80";
  if (r._bad) return "#EF4444";
  return "#F5F5F5";
}

export default async function DashboardPage() {
  const data = await apiGet<DashboardData>("/api/dashboard");
  const columns: { key: keyof PlayerRow; label: string }[] = [
    { key: "player", label: "Player" },
    { key: "min", label: "Min" },
    { key: "xg", label: "xG/90" },
    { key: "ppda", label: "PPDA" },
    { key: "rating", label: "Rating" },
  ];
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
          <MetricLabel>{data.matchday}</MetricLabel>
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
            Tonight&apos;s slate<span style={{ color: "#4ADE80" }}>.</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary">Filters</Button>
          <Button variant="primary">New report</Button>
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

      <div className="grid-2-1">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Watchlist performance</h3>
            <Link href="/players" style={{ color: "#4ADE80", fontSize: 12, textDecoration: "none" }}>
              Open Rodri →
            </Link>
          </div>
          <div
            className="table-scroll"
            style={{
              background: "#0A0A0A",
              border: "1px solid #262626",
              borderRadius: 2,
              overflow: "hidden",
            }}
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
                  {columns.map((c, i) => (
                    <th
                      key={c.key}
                      style={{
                        textAlign: i === 0 ? "left" : "right",
                        padding: "10px 12px",
                        fontSize: 10,
                        color: "#737373",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                      }}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.watchlist.map((row, ri) => (
                  <tr
                    key={ri}
                    style={{
                      borderBottom: ri < data.watchlist.length - 1 ? "1px solid #1F1F1F" : 0,
                    }}
                  >
                    {columns.map((c, ci) => {
                      const val = row[c.key];
                      const isNum = ci > 0;
                      const color = c.key === "rating" ? ratingColor(row) : "#F5F5F5";
                      return (
                        <td
                          key={c.key}
                          style={{
                            padding: "11px 12px",
                            textAlign: isNum ? "right" : "left",
                            fontFamily: isNum
                              ? "JetBrains Mono, monospace"
                              : "Space Grotesk, sans-serif",
                            fontVariantNumeric: "tabular-nums",
                            color,
                            fontWeight: ci === 0 ? 500 : 400,
                          }}
                        >
                          {String(val ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 600 }}>Notes feed</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.notes.map((n) => (
              <Note key={n.handle + n.time} {...n} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
