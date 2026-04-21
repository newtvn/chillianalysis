import { apiGet } from "@/lib/api";
import type { PostDraft } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatFig } from "@/components/ui/StatFig";

export default async function NotesPage() {
  const data = await apiGet<PostDraft>("/api/notes");
  return (
    <div
      className="content-page"
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 880,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <MetricLabel>Draft · auto-saved {data.savedAgo}</MetricLabel>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Button variant="secondary">Preview</Button>
          <Button variant="secondary">Schedule</Button>
          <Button variant="primary">Publish</Button>
        </div>
      </div>

      <input
        defaultValue={data.title}
        style={{
          background: "transparent",
          border: 0,
          outline: "none",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          fontSize: 48,
          letterSpacing: "-0.04em",
          color: "#F5F5F5",
          width: "100%",
          padding: "8px 0",
          borderBottom: "1px solid #262626",
        }}
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {data.tags.map((t, i) => (
          <Badge key={t} tone={i === 0 ? "brand" : "neutral"}>
            {t}
          </Badge>
        ))}
        <Badge tone="neutral">+ Tag</Badge>
      </div>

      <div
        style={{
          display: "flex",
          gap: 4,
          padding: 6,
          background: "#0A0A0A",
          border: "1px solid #262626",
          borderRadius: 2,
          flexWrap: "wrap",
        }}
      >
        {["B", "I", "U", "H₂", "\"", "—", "⇱ chart", "⇱ clip", "⇱ table"].map((t, i) => (
          <button
            key={i}
            style={{
              background: i === 6 ? "#121212" : "transparent",
              color: i === 6 ? "#4ADE80" : "#A3A3A3",
              border: 0,
              padding: "6px 12px",
              borderRadius: 2,
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: 17,
          lineHeight: 1.6,
          color: "#F5F5F5",
        }}
      >
        <p style={{ margin: "0 0 16px" }}>
          Across the first 45 minutes, Bruno Fernandes played like United&apos;s metronome —{" "}
          <span style={{ color: "#4ADE80" }}>86 touches</span>, a{" "}
          <span style={{ color: "#4ADE80" }}>93% pass completion</span>, and a PPDA contribution that landed
          in the 88th percentile for #10s this season.
        </p>

        <div
          style={{
            background: "#0A0A0A",
            border: "1px solid #262626",
            borderLeft: "2px solid #4ADE80",
            borderRadius: 2,
            padding: "16px 20px",
            margin: "20px 0",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <MetricLabel>Prog. Passes · 1st half</MetricLabel>
            <StatFig color="#4ADE80" size={40}>
              14.8
            </StatFig>
          </div>
          <div style={{ borderLeft: "1px solid #262626", height: 48 }} />
          <div>
            <MetricLabel>After HT</MetricLabel>
            <StatFig color="#EF4444" size={40}>
              4.2
            </StatFig>
            <div style={{ fontSize: 11, color: "#EF4444", fontFamily: "JetBrains Mono, monospace" }}>↓ 10.6</div>
          </div>
        </div>

        <p style={{ margin: "0 0 16px" }}>
          After the break it collapsed. The positional map below shows the difference: a quarter of his
          second-half touches came in his own half.
        </p>

        <div
          style={{
            background: "#000",
            border: "1px solid #262626",
            borderRadius: 2,
            padding: 16,
            margin: "16px 0",
          }}
        >
          <MetricLabel>Insert clip · Bruno touch map · 2nd half</MetricLabel>
          <div
            style={{
              marginTop: 10,
              height: 180,
              background: "#0A0A0A",
              border: "1px dashed #404040",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#737373",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            [ chart embed · drop data source ]
          </div>
        </div>

        <p style={{ margin: 0, color: "#A3A3A3" }}>
          <span style={{ color: "#4ADE80" }}>|</span> Continue writing…
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 11,
          color: "#737373",
          fontFamily: "Space Grotesk, sans-serif",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          paddingTop: 16,
          borderTop: "1px solid #262626",
          flexWrap: "wrap",
        }}
      >
        <span>{data.words} words</span>
        <span>· {data.read}</span>
        <span>· {data.charts} charts</span>
        <span style={{ marginLeft: "auto" }}>
          By {data.author} · {data.handle}
        </span>
      </div>
    </div>
  );
}
