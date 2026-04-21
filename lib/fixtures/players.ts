import type { PlayerProfile, PlayerFactsData, ComparePlayers, Shot } from "../types";

export const shotsFixture: Shot[] = [
  { x: 340, y: 130, xg: 0.62, goal: true },
  { x: 330, y: 110, xg: 0.28 },
  { x: 350, y: 150, xg: 0.22 },
  { x: 310, y: 100, xg: 0.08 },
  { x: 370, y: 120, xg: 0.35 },
  { x: 300, y: 160, xg: 0.04 },
  { x: 360, y: 90, xg: 0.18 },
  { x: 380, y: 140, xg: 0.41, goal: true },
  { x: 320, y: 170, xg: 0.12 },
  { x: 280, y: 130, xg: 0.06 },
];

export const playerProfileFixture: PlayerProfile = {
  id: "rodri",
  name: "Rodri",
  number: 16,
  team: "Manchester City",
  position: "DM",
  age: 29,
  nationality: "🇪🇸 Spain",
  rating: "8.4",
  stats: [
    { label: "xG/90", value: "0.12", delta: "0.02" },
    { label: "Prog. Passes", value: "14.8", delta: "1.4" },
    { label: "PPDA", value: "7.40", selected: true },
    { label: "Duels won", value: "64", suffix: "%", delta: "-2" },
  ],
  radarAxes: ["Press", "Pass", "Carry", "Shoot", "Duel", "Tackle", "Inter.", "Aerial"],
  radarValues: [0.9, 0.95, 0.7, 0.45, 0.75, 0.88, 0.8, 0.6],
  shots: shotsFixture,
  shotStats: { xg: "3.12", goals: 4 },
  percentile: "91st percentile among CDMs (2,000+ mins)",
};

export const playerFactsFixture: PlayerFactsData = {
  name: "Rodri",
  profileSummary: {
    green: "Positional anchor.",
    white: "Operates at the base of a 4-1-4-1; rarely leaves the central corridor.",
    gray: "Low press frequency, elite interception angles, top-decile passing range.",
  },
  tags: [
    "Deep-lying playmaker",
    "Zonal defender",
    "Tempo setter",
    "Set-piece taker",
    "Press resistant",
    "Left-foot dominant",
  ],
  quickFacts: [
    { label: "Ball time / 90", value: "4m 12s", sub: "82nd pct CDM" },
    { label: "Touches / 90", value: "102", sub: "+14 vs pos avg" },
    { label: "Passes / game", value: "86.3", sub: "94% accuracy" },
    { label: "Minutes logged", value: "19,420", sub: "career" },
  ],
  injuries: [
    { date: "Sep 2024", type: "ACL rupture (right)", out: "247 days", severity: "high" },
    { date: "Mar 2024", type: "Hamstring strain", out: "18 days", severity: "mid" },
    { date: "Nov 2023", type: "Ankle sprain", out: "9 days", severity: "low" },
    { date: "Feb 2023", type: "Calf strain", out: "14 days", severity: "mid" },
    { date: "Aug 2022", type: "Hamstring strain", out: "21 days", severity: "mid" },
  ],
  injurySummary: {
    title: "Prone to: soft-tissue (lower body)",
    sub: "5 incidents · 309 days lost · 92nd pct among CDMs 28+",
  },
  funFacts: [
    { icon: "◉", title: "Ballon d'Or winner 2024", body: "First CDM since Matthäus ('90)." },
    { icon: "⟁", title: "Never yellow-carded vs Arsenal", body: "In 11 Premier League appearances." },
    { icon: "✺", title: "Homegrown · Atlético B", body: "Academy product, €22m to City in 2019." },
    { icon: "▲", title: "Pass range: 94th percentile", body: "Among all CM/DM in Europe's top 5." },
    { icon: "◎", title: "Left-foot usage 71%", body: "Despite being natural right-footed." },
  ],
  timeMetrics: [
    { k: "Ball time / 90", v: "4:12", delta: "+0:38", good: true },
    { k: "Avg hold time", v: "1.74s", delta: "+0.22s", good: true },
    { k: "Touches / 90", v: "102", delta: "+14", good: true },
    { k: "Seconds to release", v: "1.12s", delta: "-0.18s", good: true },
    { k: "Possession regains", v: "6.8", delta: "+1.4" },
    { k: "Turnovers", v: "1.2", delta: "-0.6", good: true },
    { k: "Carries / 90", v: "22", delta: "+2" },
    { k: "Prog. carry dist.", v: "84m", delta: "+12m", good: true },
    { k: "Take-ons / 90", v: "0.8", delta: "-1.2" },
  ],
};

export const playerCompareFixture: ComparePlayers = {
  a: { name: "Rodri", percentile: "91st", color: "#4ADE80" },
  b: { name: "Rice", percentile: "84th", color: "#60A5FA" },
  axes: ["Press", "Pass", "Carry", "Shoot", "Duel", "Tackle", "Inter.", "Aerial"],
  aValues: [0.9, 0.95, 0.7, 0.45, 0.75, 0.88, 0.8, 0.6],
  bValues: [0.82, 0.78, 0.68, 0.5, 0.82, 0.85, 0.75, 0.72],
  rows: [
    { k: "xG/90", a: "0.12", b: "0.09" },
    { k: "Prog. Passes", a: "14.8", b: "11.2" },
    { k: "PPDA", a: "7.40", b: "8.40" },
    { k: "Duels won %", a: "64", b: "68" },
    { k: "Aerial win %", a: "54", b: "62" },
    { k: "Passes / 90", a: "86.3", b: "72.1" },
  ],
};
