import { cached, TTL, USE_LIVE } from "../cache";
import { teamCompareFixture } from "../fixtures/teams";
import type { TeamCompareData } from "../types";

// TeamCompare uses /teams/statistics per team for fixtures/form/goals,
// but xG/xGA, PPDA, possession all come from the advanced-metrics provider.
async function loadLive(_aId: number, _bId: number): Promise<TeamCompareData> {
  throw new Error(
    "team-compare live path not implemented — xG/xGA/PPDA/possession require the advanced-metrics provider",
  );
}

export const loadTeamCompare = cached(
  async (aId?: number, bId?: number): Promise<TeamCompareData> => {
    if (USE_LIVE && aId && bId) {
      try { return await loadLive(aId, bId); } catch { return teamCompareFixture; }
    }
    return teamCompareFixture;
  },
  "team-compare",
  TTL.hour,
);
