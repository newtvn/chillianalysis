export function Heatmap() {
  const grid = [
    [0.0, 0.1, 0.2, 0.3, 0.3, 0.2, 0.3, 0.4, 0.5, 0.3],
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.4, 0.5, 0.6, 0.7, 0.5],
    [0.2, 0.3, 0.5, 0.7, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3],
    [0.1, 0.2, 0.4, 0.6, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2],
    [0.0, 0.1, 0.2, 0.3, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1],
  ];
  const color = (v: number) =>
    v > 0.7 ? "#EF4444" : v > 0.5 ? "#F97316" : v > 0.3 ? "#FACC15" : v > 0.15 ? "#4ADE80" : v > 0.05 ? "#166534" : "#052E16";
  return (
    <svg viewBox="0 0 400 200" width="100%" style={{ display: "block" }}>
      {grid.map((row, ri) =>
        row.map((v, ci) => (
          <rect
            key={`${ri}-${ci}`}
            x={ci * 40}
            y={ri * 40}
            width="40"
            height="40"
            fill={color(v)}
            fillOpacity={0.85}
          />
        )),
      )}
      <g stroke="#000" strokeOpacity="0.3" strokeWidth="1" fill="none">
        <rect x="0" y="0" width="400" height="200" />
        <line x1="200" y1="0" x2="200" y2="200" />
        <circle cx="200" cy="100" r="32" />
        <rect x="0" y="50" width="70" height="100" />
        <rect x="330" y="50" width="70" height="100" />
      </g>
    </svg>
  );
}
