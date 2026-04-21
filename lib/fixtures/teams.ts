import type { TeamData, TeamCompareData } from "../types";

export const teamFixture: TeamData = {
  name: "Manchester City",
  abbr: "MCI",
  league: "Premier League · 2025/26",
  record: "W 22 · D 4 · L 2",
  stadium: "Etihad Stadium",
  goalsFor: 72,
  goalsAgainst: 24,
  stats: [
    { label: "Pos", value: "1st" },
    { label: "xGD", value: "+34.2" },
    { label: "PPDA", value: "7.4" },
  ],
  squad: [
    { num: 1, name: "Ederson", pos: "GK", rating: "7.2" },
    { num: 16, name: "Rodri", pos: "DM", rating: "8.4" },
    { num: 17, name: "De Bruyne", pos: "AM", rating: "7.7" },
    { num: 9, name: "Haaland", pos: "ST", rating: "8.1" },
    { num: 11, name: "Doku", pos: "LW", rating: "7.3" },
    { num: 20, name: "Bernardo", pos: "RW", rating: "7.6" },
    { num: 3, name: "Rúben Dias", pos: "CB", rating: "7.5" },
    { num: 25, name: "Akanji", pos: "CB", rating: "7.0" },
  ],
  form: ["W", "W", "D", "W", "L"],
  nextFixture: { text: "Arsenal (A) · Sat 20:00", venue: "Emirates · TV: Sky Sports" },
};

export const teamCompareFixture: TeamCompareData = {
  a: { name: "Manchester City", abbr: "MCI", league: "Premier League", record: "W22 D4 L2", color: "#4ADE80" },
  b: { name: "Arsenal", abbr: "ARS", league: "Premier League", record: "W20 D6 L2", color: "#60A5FA" },
  stats: [
    { k: "xG / 90", a: 2.18, b: 1.92, max: 3 },
    { k: "xGA / 90", a: 0.86, b: 1.14, max: 2, inv: true },
    { k: "Possession %", a: 62.4, b: 58.1, max: 75 },
    { k: "PPDA", a: 7.4, b: 9.8, max: 16, inv: true },
    { k: "Pass acc %", a: 89.1, b: 85.6, max: 95 },
    { k: "Prog. passes", a: 52.3, b: 44.8, max: 70 },
    { k: "Shots / 90", a: 16.2, b: 13.8, max: 22 },
    { k: "Avg ball time", a: 3.4, b: 2.8, max: 5, unit: "s" },
    { k: "Duels won %", a: 54.2, b: 51.1, max: 70 },
    { k: "Set-piece xG", a: 0.42, b: 0.31, max: 1 },
  ],
  aForm: ["W", "W", "D", "W", "L", "W", "W"],
  bForm: ["W", "D", "W", "W", "W", "L", "D"],
};
