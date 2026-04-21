import type { ReactNode } from "react";

export function StatFig({
  children,
  color = "#F5F5F5",
  size = 32,
}: {
  children: ReactNode;
  color?: string;
  size?: number;
}) {
  return (
    <div
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontVariantNumeric: "tabular-nums",
        fontWeight: 500,
        fontSize: size,
        color,
        lineHeight: 1,
      }}
    >
      {children}
    </div>
  );
}
