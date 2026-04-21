export function LiveDot() {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#4ADE80",
        boxShadow: "0 0 10px #4ADE80",
        animation: "ca-pulse 1.2s ease-in-out infinite",
        display: "inline-block",
      }}
    />
  );
}
