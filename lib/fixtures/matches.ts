import type { MatchData, MatchTimelineData } from "../types";
import { shotsFixture } from "./players";

export const matchFixture: MatchData = {
  home: {
    name: "Manchester City",
    abbr: "MCI",
    formation: "4-1-4-1",
    shots: shotsFixture.slice(0, 8).map((s) => ({ ...s, x: 400 - s.x })),
    shotCount: 14,
    xg: "1.84",
    goals: 2,
    score: 2,
  },
  away: {
    name: "Arsenal",
    abbr: "ARS",
    formation: "4-3-3",
    shots: shotsFixture.slice(2, 8),
    shotCount: 6,
    xg: "0.92",
    goals: 1,
    score: 1,
  },
  status: "Live · 76′",
  minute: 76,
  venue: "Etihad",
  weather: "18°C",
};

export const matchTimelineFixture: MatchTimelineData = {
  home: { abbr: "MCI", score: 2, xg: "1.84" },
  away: { abbr: "ARS", score: 1, xg: "0.92" },
  matchday: "Match timeline · Matchday 28",
  currentMinute: 76,
  xgRace: { home: "1.84", away: "0.92" },
  events: [
    { m: 3, type: "kickoff", text: "Kickoff — MCI vs ARS" },
    { m: 14, type: "yellow", text: "Yellow · Akanji (MCI)" },
    { m: 28, type: "goal", text: "GOAL · De Bruyne (MCI)", xg: "0.18", team: "h" },
    { m: 41, type: "note", text: "Arsenal PPDA drops to 11.2" },
    { m: 54, type: "goal", text: "GOAL · Saka (ARS)", xg: "0.41", team: "a" },
    { m: 67, type: "yellow", text: "Yellow · Rice (ARS)" },
    { m: 71, type: "sub", text: "Sub · Nketiah ⇆ Jesus (ARS)" },
    { m: 76, type: "goal", text: "GOAL · Haaland (MCI)", xg: "0.62", team: "h" },
  ],
};
