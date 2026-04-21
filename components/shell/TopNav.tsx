"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/Badge";
import { LiveDot } from "../ui/LiveDot";

const tabs: { label: string; href: string }[] = [
  { label: "Dashboard", href: "/" },
  { label: "Players", href: "/players" },
  { label: "Teams", href: "/teams" },
  { label: "Matches", href: "/matches" },
  { label: "Compare", href: "/teams/compare" },
  { label: "Blog", href: "/blog" },
  { label: "Notes", href: "/notes" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function TopNav() {
  const pathname = usePathname();
  return (
    <div
      className="top-nav"
      style={{
        height: 56,
        background: "#0A0A0A",
        borderBottom: "1px solid #262626",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 24,
        fontFamily: "Space Grotesk, sans-serif",
        flexShrink: 0,
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#F5F5F5" }}
      >
        <svg width="28" height="28" viewBox="0 0 64 64">
          <path d="M14 14 L36 14 L36 24 L24 24 L24 40 L36 40 L36 50 L14 50 Z" fill="#4ADE80" />
          <rect x="40" y="14" width="8" height="36" fill="#4ADE80" />
        </svg>
        <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>
          CHILI<span style={{ color: "#A3A3A3", fontWeight: 500 }}> ANALYSIS</span>
        </div>
      </Link>
      <div className="top-nav-tabs" style={{ display: "flex", gap: 4, marginLeft: 16 }}>
        {tabs.map((t) => {
          const active = isActive(pathname, t.href);
          return (
            <Link
              key={t.label}
              href={t.href}
              style={{
                padding: "8px 12px",
                fontSize: 13,
                fontWeight: 500,
                color: active ? "#F5F5F5" : "#A3A3A3",
                borderBottom: active ? "2px solid #4ADE80" : "2px solid transparent",
                marginBottom: -1,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
      <div
        className="nav-search"
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          background: "#000",
          border: "1px solid #262626",
          borderRadius: 2,
          padding: "0 12px",
          height: 32,
          width: 260,
          gap: 8,
        }}
      >
        <span style={{ color: "#737373", fontSize: 13 }}>⌕</span>
        <input
          placeholder="Search player, match, team"
          style={{
            background: "transparent",
            border: 0,
            outline: "none",
            color: "#F5F5F5",
            fontFamily: "inherit",
            fontSize: 13,
            flex: 1,
            minWidth: 0,
          }}
        />
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "#737373",
            background: "#121212",
            border: "1px solid #262626",
            padding: "1px 5px",
            borderRadius: 2,
          }}
        >
          ⌘K
        </span>
      </div>
      <Badge tone="live">
        <LiveDot />
        Live · 3
      </Badge>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#4ADE80",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 12,
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        JM
      </div>
    </div>
  );
}
