"use client";
import { useState } from "react";

export type Column<T> = {
  key: keyof T & string;
  label: string;
  colorFn?: (v: unknown, row: T) => string;
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  onRowClick,
}: {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  return (
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
          {rows.map((row, ri) => (
            <tr
              key={ri}
              onMouseEnter={() => setHover(ri)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onRowClick && onRowClick(row)}
              style={{
                borderBottom: ri < rows.length - 1 ? "1px solid #1F1F1F" : 0,
                background: hover === ri ? "#121212" : "transparent",
                cursor: onRowClick ? "pointer" : "default",
              }}
            >
              {columns.map((c, ci) => {
                const val = row[c.key];
                const isNum = ci > 0;
                const color = c.colorFn ? c.colorFn(val, row) : "#F5F5F5";
                return (
                  <td
                    key={c.key}
                    style={{
                      padding: "11px 12px",
                      textAlign: isNum ? "right" : "left",
                      fontFamily: isNum ? "JetBrains Mono, monospace" : "Space Grotesk, sans-serif",
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
  );
}
