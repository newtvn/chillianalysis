import { Badge } from "./Badge";

export function Note({
  author,
  handle,
  time,
  body,
  tags,
}: {
  author: string;
  handle: string;
  time: string;
  body: string;
  tags?: string[];
}) {
  return (
    <div
      style={{
        background: "#0A0A0A",
        border: "1px solid #262626",
        borderRadius: 2,
        padding: 16,
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#4ADE80",
            color: "#000",
            fontWeight: 700,
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {author
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")}
        </div>
        <span style={{ fontWeight: 600, fontSize: 13 }}>{author}</span>
        <span style={{ color: "#737373", fontSize: 12 }}>{handle}</span>
        <span
          style={{
            marginLeft: "auto",
            color: "#737373",
            fontSize: 11,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {time}
        </span>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.5, marginTop: 10, color: "#F5F5F5" }}>{body}</div>
      {tags && (
        <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <Badge key={t} tone={t.startsWith("#") && t.length < 6 ? "brand" : "neutral"}>
              {t}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
