import { apiGet } from "@/lib/api";
import type { BlogData } from "@/lib/types";
import { MetricLabel } from "@/components/ui/MetricLabel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default async function BlogPage() {
  const data = await apiGet<BlogData>("/api/blog");
  return (
    <div
      className="content-page"
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
      }}
    >
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
          <MetricLabel>Chili Analysis · blog</MetricLabel>
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
            Game sentiment<span style={{ color: "#4ADE80" }}>.</span>
          </h1>
        </div>
        <Button variant="primary">+ New post</Button>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {data.categories.map((t, i) => (
          <button
            key={t}
            style={{
              background: i === 0 ? "#4ADE80" : "transparent",
              color: i === 0 ? "#000" : "#A3A3A3",
              border: i === 0 ? "none" : "1px solid #262626",
              padding: "6px 12px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div
        className="grid-13-1"
        style={{
          background: "#0A0A0A",
          border: "1px solid #262626",
          padding: 0,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #052E16, #000)",
            minHeight: 320,
            position: "relative",
            overflow: "hidden",
            borderRight: "1px solid #262626",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 22px, rgba(74,222,128,0.06) 22px 23px)",
            }}
          />
          <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
            <Badge tone="brand">FEATURED</Badge>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 14,
                color: "#A3A3A3",
                marginTop: 12,
                letterSpacing: "0.02em",
              }}
            >
              {data.featured.meta}
            </div>
          </div>
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "#4ADE80",
              letterSpacing: "0.14em",
            }}
          >
            {data.featured.tag}
          </div>
          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: 34,
              letterSpacing: "-0.03em",
              margin: "10px 0",
              lineHeight: 1.1,
              color: "#F5F5F5",
            }}
          >
            {data.featured.title}
          </h2>
          <p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 14,
              color: "#A3A3A3",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {data.featured.excerpt}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 18,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: "#737373",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#4ADE80",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 10,
              }}
            >
              {data.featured.authorInitials}
            </div>
            <span>
              {data.featured.author} · {data.featured.ago} · ↑ {data.featured.up} · ◯ {data.featured.comm}
            </span>
          </div>
        </div>
      </div>

      <div className="grid-3">
        {data.posts.map((p, i) => (
          <article
            key={i}
            style={{
              background: "#0A0A0A",
              border: "1px solid #262626",
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                height: 140,
                background: `linear-gradient(135deg, ${p.color}25, #000)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `repeating-linear-gradient(${i % 2 ? 45 : -45}deg, transparent 0 18px, ${p.color}15 18px 19px)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 12,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  color: p.color,
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                }}
              >
                {p.tag}
              </div>
            </div>
            <h3
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 17,
                fontWeight: 600,
                lineHeight: 1.25,
                letterSpacing: "-0.015em",
                color: "#F5F5F5",
                margin: 0,
                textWrap: "balance",
              }}
            >
              {p.title}
            </h3>
            <div style={{ flex: 1 }} />
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: "#737373",
                letterSpacing: "0.08em",
                display: "flex",
                gap: 10,
              }}
            >
              <span>{p.author}</span>
              <span>·</span>
              <span>{p.read}</span>
              <span style={{ marginLeft: "auto" }}>
                ↑ {p.up}  ◯ {p.comm}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div
        style={{
          background: "#0A0A0A",
          border: "1px dashed #404040",
          padding: 20,
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "#052E16",
            color: "#4ADE80",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
          }}
        >
          +
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#F5F5F5",
            }}
          >
            Upload a game sentiment piece
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 12,
              color: "#A3A3A3",
              marginTop: 2,
            }}
          >
            Markdown or rich text. Attach a match ID to auto-link xG & event data.
          </div>
        </div>
        <Button variant="secondary">Import file</Button>
        <Button variant="primary">Write in-app</Button>
      </div>
    </div>
  );
}
