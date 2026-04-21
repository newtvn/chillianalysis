import type { DashboardData, LiveMatch } from "../types";

export const dashboardFixture: DashboardData = {
  matchday: "Matchday 28 · Premier League",
  stats: [
    { label: "Watchlist xG/90", value: "0.38", delta: "0.05" },
    { label: "Shortlisted", value: "14", suffix: "players", selected: true },
    { label: "Avg. rating", value: "7.42", delta: "0.18" },
    { label: "Feed latency", value: "420", suffix: "ms", delta: "-40" },
  ],
  watchlist: [
    { player: "Rodri", min: "2,480", xg: "0.12", ppda: "7.40", rating: "8.4", _good: true },
    { player: "Bruno Fernandes", min: "2,712", xg: "0.47", ppda: "11.2", rating: "7.9" },
    { player: "Martin Ødegaard", min: "2,340", xg: "0.34", ppda: "9.1", rating: "6.8", _bad: true },
    { player: "Declan Rice", min: "2,610", xg: "0.09", ppda: "8.4", rating: "7.6" },
    { player: "Kevin De Bruyne", min: "1,904", xg: "0.38", ppda: "10.6", rating: "7.7" },
    { player: "Alexis Mac Allister", min: "2,180", xg: "0.19", ppda: "9.8", rating: "7.4" },
  ],
  notes: [
    {
      author: "James Mendoza",
      handle: "@jmendoza_xg",
      time: "2h",
      body: "Nketiah came on, touched the ball 9 times, scored. Small sample, loud signal.",
      tags: ["#ARS", "#subs", "#xG"],
    },
    {
      author: "Priya Nair",
      handle: "@priyastats",
      time: "6h",
      body: "City's PPDA under 8 for the fourth straight. Rodri is the whole system.",
      tags: ["#MCI", "#PPDA"],
    },
  ],
};

export const liveMatchFixture: LiveMatch = {
  minute: 76,
  home: "MCI",
  away: "ARS",
  homeScore: 2,
  awayScore: 1,
  homeXg: "1.84",
  awayXg: "0.92",
};
