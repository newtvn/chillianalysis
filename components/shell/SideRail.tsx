"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MetricLabel } from "../ui/MetricLabel";

type Item = { label: string; href: string };
type Section = { label: string; items: Item[] };

const sections: Section[] = [
  {
    label: "General",
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Watchlist", href: "/" },
      { label: "Notes", href: "/notes" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Analysis",
    items: [
      { label: "Players", href: "/players" },
      { label: "Player facts", href: "/players/facts" },
      { label: "Teams", href: "/teams" },
      { label: "Team compare", href: "/teams/compare" },
      { label: "Matches", href: "/matches" },
      { label: "Match timeline", href: "/matches/timeline" },
      { label: "Compare", href: "/players/compare" },
      { label: "League table", href: "/league-table" },
    ],
  },
  {
    label: "Scout",
    items: [
      { label: "Shortlists", href: "/shortlists" },
      { label: "Reports", href: "/notes" },
    ],
  },
];

export function SideRail() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href);
  return (
    <div
      className="side-rail"
      style={{
        width: 220,
        background: "#000",
        borderRight: "1px solid #262626",
        padding: "16px 12px",
        fontFamily: "Space Grotesk, sans-serif",
        flexShrink: 0,
        overflow: "auto",
      }}
    >
      {sections.map((s) => (
        <div key={s.label} style={{ marginBottom: 20 }}>
          <MetricLabel style={{ padding: "0 8px 6px" }}>
            <span className="rail-label">{s.label}</span>
          </MetricLabel>
          {s.items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label + item.href}
                href={item.href}
                style={{
                  display: "block",
                  padding: "7px 10px",
                  fontSize: 13,
                  color: active ? "#F5F5F5" : "#A3A3A3",
                  background: active ? "#0A0A0A" : "transparent",
                  borderLeft: active ? "2px solid #4ADE80" : "2px solid transparent",
                  borderRadius: 2,
                  marginBottom: 1,
                  textDecoration: "none",
                }}
              >
                <span className="rail-item-text">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
