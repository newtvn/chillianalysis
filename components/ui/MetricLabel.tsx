import type { CSSProperties, ReactNode } from "react";

export function MetricLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: "Space Grotesk, sans-serif",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#737373",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
