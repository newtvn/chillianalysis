import type { LeagueData } from "../types";

// Snapshot of the 2025/26 Premier League table around matchday 28.
// Replaced end-to-end by API-Football /standings when USE_LIVE_DATA=1.
export const leagueFixture: LeagueData = {
  league: "Premier League",
  season: "2025/26",
  matchday: "MD 28",
  rows: [
    { p: 1, team: "Arsenal", mp: 28, w: 19, d: 7, l: 2, gf: 56, ga: 24, xgd: "+32", pts: 64 },
    { p: 2, team: "Liverpool", mp: 28, w: 19, d: 5, l: 4, gf: 58, ga: 30, xgd: "+28", pts: 62 },
    { p: 3, team: "Manchester City", mp: 28, w: 17, d: 5, l: 6, gf: 52, ga: 28, xgd: "+24", pts: 56 },
    { p: 4, team: "Chelsea", mp: 28, w: 16, d: 5, l: 7, gf: 48, ga: 30, xgd: "+18", pts: 53 },
    { p: 5, team: "Newcastle", mp: 28, w: 14, d: 7, l: 7, gf: 42, ga: 30, xgd: "+12", pts: 49 },
    { p: 6, team: "Aston Villa", mp: 28, w: 13, d: 8, l: 7, gf: 44, ga: 34, xgd: "+10", pts: 47 },
    { p: 7, team: "Nottingham Forest", mp: 28, w: 13, d: 6, l: 9, gf: 38, ga: 32, xgd: "+6", pts: 45 },
    { p: 8, team: "Bournemouth", mp: 28, w: 12, d: 7, l: 9, gf: 38, ga: 34, xgd: "+4", pts: 43 },
    { p: 9, team: "Brighton", mp: 28, w: 11, d: 8, l: 9, gf: 36, ga: 34, xgd: "+2", pts: 41 },
    { p: 10, team: "Tottenham", mp: 28, w: 11, d: 6, l: 11, gf: 40, ga: 42, xgd: "-2", pts: 39 },
    { p: 11, team: "Brentford", mp: 28, w: 10, d: 7, l: 11, gf: 35, ga: 40, xgd: "-5", pts: 37 },
    { p: 12, team: "Fulham", mp: 28, w: 9, d: 8, l: 11, gf: 33, ga: 39, xgd: "-6", pts: 35 },
    { p: 13, team: "Crystal Palace", mp: 28, w: 8, d: 9, l: 11, gf: 30, ga: 38, xgd: "-8", pts: 33 },
    { p: 14, team: "Everton", mp: 28, w: 7, d: 9, l: 12, gf: 28, ga: 38, xgd: "-10", pts: 30 },
    { p: 15, team: "Manchester United", mp: 28, w: 7, d: 7, l: 14, gf: 26, ga: 38, xgd: "-12", pts: 28 },
    { p: 16, team: "West Ham", mp: 28, w: 6, d: 8, l: 14, gf: 30, ga: 45, xgd: "-15", pts: 26 },
    { p: 17, team: "Wolves", mp: 28, w: 6, d: 7, l: 15, gf: 26, ga: 44, xgd: "-18", pts: 25 },
    { p: 18, team: "Leeds", mp: 28, w: 5, d: 8, l: 15, gf: 24, ga: 46, xgd: "-22", pts: 23 },
    { p: 19, team: "Burnley", mp: 28, w: 4, d: 8, l: 16, gf: 22, ga: 48, xgd: "-26", pts: 20 },
    { p: 20, team: "Sunderland", mp: 28, w: 3, d: 7, l: 18, gf: 20, ga: 52, xgd: "-32", pts: 16 },
  ],
};
