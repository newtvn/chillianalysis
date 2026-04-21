import { cached, TTL, USE_LIVE } from "../cache";
import { playerCompareFixture } from "../fixtures/players";
import type { ComparePlayers } from "../types";

async function loadLive(_aId: number, _bId: number): Promise<ComparePlayers> {
  throw new Error(
    "player-compare live path not implemented — radar axes require normalized percentiles from advanced-metrics provider",
  );
}

export const loadPlayerCompare = cached(
  async (aId?: number, bId?: number): Promise<ComparePlayers> => {
    if (USE_LIVE && aId && bId) {
      try { return await loadLive(aId, bId); } catch { return playerCompareFixture; }
    }
    return playerCompareFixture;
  },
  "player-compare",
  TTL.hour,
);
