// Advanced metrics provider — stub until you pick one.
// The UI (ShotMap, Heatmap, xG race, PPDA, progressive passes, percentiles)
// depends on event-level data that API-Football does not provide.
//
// Pick a provider and wire these functions:
//   — StatsBomb Open Data: https://github.com/statsbomb/open-data (free, non-commercial, 7 comps)
//   — Stats Perform / Opta: enterprise license, full coverage
//   — Understat: scraping, top-5 men's leagues only — use at your own risk
//
// Every function returns null when unwired; loaders degrade gracefully
// (shots render empty, heatmap stays flat, xG columns show "—").

import type { Shot } from "../types";

export type AdvancedPlayerStats = {
  xgPer90?: number;
  progPasses?: number;
  ppda?: number;
  duelsWonPct?: number;
  percentile?: number;
  radarValues?: number[];
  touchHeatmap?: number[][];
};

export async function shotsForPlayer(_playerId: number, _season: number): Promise<Shot[] | null> {
  return null;
}

export async function shotsForFixture(
  _fixtureId: number,
  _teamId: number,
): Promise<Shot[] | null> {
  return null;
}

export async function advancedPlayerStats(
  _playerId: number,
  _season: number,
): Promise<AdvancedPlayerStats | null> {
  return null;
}

export async function xgRaceForFixture(
  _fixtureId: number,
): Promise<{ home: string; away: string; homePath: string; awayPath: string } | null> {
  return null;
}

export async function teamAdvancedStats(
  _teamId: number,
  _season: number,
): Promise<{ xgdPer90?: number; ppda?: number; possession?: number } | null> {
  return null;
}
