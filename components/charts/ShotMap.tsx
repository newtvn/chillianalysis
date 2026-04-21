import type { Shot } from "@/lib/types";

export function ShotMap({ shots }: { shots: Shot[] }) {
  return (
    <svg
      viewBox="0 0 400 260"
      width="100%"
      style={{ display: "block", background: "#000", borderRadius: 2 }}
    >
      <g stroke="#262626" strokeWidth="1" fill="none">
        <rect x="4" y="4" width="392" height="252" />
        <line x1="200" y1="4" x2="200" y2="256" />
        <circle cx="200" cy="130" r="44" />
        <rect x="4" y="70" width="90" height="120" />
        <rect x="306" y="70" width="90" height="120" />
        <rect x="4" y="106" width="28" height="48" />
        <rect x="368" y="106" width="28" height="48" />
      </g>
      {shots.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={3 + s.xg * 14}
          fill={
            s.goal
              ? "#EF4444"
              : s.xg > 0.3
                ? "#F97316"
                : s.xg > 0.15
                  ? "#FACC15"
                  : s.xg > 0.05
                    ? "#4ADE80"
                    : "#166534"
          }
          fillOpacity={s.goal ? 0.9 : 0.75}
          stroke={s.goal ? "#EF4444" : "none"}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
