"use client";
import type { CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link" | "danger";

export function Button({
  variant = "primary",
  children,
  onClick,
  icon,
  type = "button",
}: {
  variant?: Variant;
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  type?: "button" | "submit";
}) {
  const styles: Record<Variant, CSSProperties> = {
    primary: { background: "#4ADE80", color: "#000", border: 0 },
    secondary: { background: "#000", color: "#F5F5F5", border: "1px solid #262626" },
    ghost: { background: "transparent", color: "#4ADE80", border: "1px solid #4ADE80" },
    link: { background: "transparent", color: "#A3A3A3", border: 0, padding: "8px 4px" },
    danger: { background: "#EF4444", color: "#000", border: 0 },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: variant === "link" ? "8px 4px" : "10px 16px",
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: variant === "primary" || variant === "danger" ? 600 : 500,
        fontSize: 13,
        borderRadius: 2,
        cursor: "pointer",
        letterSpacing: "-0.005em",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "all 150ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {icon}
      {children}
    </button>
  );
}
