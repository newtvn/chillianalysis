import Link from "next/link";
import type { LiveMatch } from "@/lib/types";
import { Badge } from "../ui/Badge";
import { LiveDot } from "../ui/LiveDot";
import { Button } from "../ui/Button";

export function LiveTicker({ match }: { match: LiveMatch }) {
  return (
    <div
      style={{
        background: "#000",
        borderTop: "1px solid #262626",
        height: 40,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontFamily: "Space Grotesk, sans-serif",
        fontSize: 13,
        flexShrink: 0,
      }}
    >
      <Badge tone="live">
        <LiveDot />
        Live
      </Badge>
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          color: "#A3A3A3",
          fontSize: 12,
        }}
      >
        {match.minute}′
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <b style={{ fontWeight: 600 }}>{match.home}</b>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {match.homeScore}
        </span>
        <span style={{ color: "#737373" }}>–</span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontWeight: 600,
            fontSize: 16,
            color: "#A3A3A3",
          }}
        >
          {match.awayScore}
        </span>
        <b style={{ fontWeight: 600, color: "#A3A3A3" }}>{match.away}</b>
      </span>
      <span style={{ color: "#A3A3A3", fontSize: 12 }}>
        xG{" "}
        <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#F5F5F5" }}>{match.homeXg}</span> ·{" "}
        <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#F5F5F5" }}>{match.awayXg}</span>
      </span>
      <span style={{ marginLeft: "auto" }}>
        <Link href="/matches" style={{ textDecoration: "none" }}>
          <Button variant="secondary">Open match →</Button>
        </Link>
      </span>
    </div>
  );
}
