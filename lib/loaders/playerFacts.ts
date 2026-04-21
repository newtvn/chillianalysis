import { cached, TTL, USE_LIVE } from "../cache";
import { playerFactsFixture } from "../fixtures/players";
import type { PlayerFactsData } from "../types";

// PlayerFacts blends /players/profiles + /injuries + /transfers + /trophies.
// The narrative "profile summary" and time-metric percentiles are AI/advanced-metrics.
async function loadLive(_playerId: number): Promise<PlayerFactsData> {
  throw new Error(
    "player-facts live path not implemented — AI profile summary + time-metric percentiles need the advanced-metrics provider",
  );
}

export const loadPlayerFacts = cached(
  async (playerId?: number): Promise<PlayerFactsData> => {
    if (USE_LIVE && playerId) {
      try { return await loadLive(playerId); } catch { return playerFactsFixture; }
    }
    return playerFactsFixture;
  },
  "player-facts",
  TTL.day,
);
