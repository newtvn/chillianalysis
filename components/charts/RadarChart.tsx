export type RadarSeries = { values: number[]; color: string };

export function RadarChart({
  axes,
  data,
  size = 260,
}: {
  axes: string[];
  data: RadarSeries[];
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;
  const n = axes.length;
  const toXY = (i: number, v: number): [number, number] => {
    const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return [cx + Math.cos(angle) * r * v, cy + Math.sin(angle) * r * v];
  };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ maxWidth: "100%" }}>
      {[0.25, 0.5, 0.75, 1].map((k) => (
        <polygon
          key={k}
          points={axes.map((_, i) => toXY(i, k).join(",")).join(" ")}
          fill="none"
          stroke="#262626"
          strokeWidth="1"
        />
      ))}
      {axes.map((a, i) => {
        const [x, y] = toXY(i, 1);
        const [lx, ly] = toXY(i, 1.18);
        return (
          <g key={a}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#262626" strokeWidth="1" />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Space Grotesk, sans-serif"
              fontSize="9"
              fill="#737373"
              style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              {a}
            </text>
          </g>
        );
      })}
      {data.map((series, si) => (
        <polygon
          key={si}
          points={series.values.map((v, i) => toXY(i, v).join(",")).join(" ")}
          fill={series.color}
          fillOpacity={si === 0 ? 0.22 : 0.1}
          stroke={series.color}
          strokeWidth="1.5"
          strokeDasharray={si === 0 ? "none" : "3 3"}
        />
      ))}
    </svg>
  );
}
