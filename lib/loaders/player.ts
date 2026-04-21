import { cached, TTL, USE_LIVE } from "../cache";
import { playerProfileFixture } from "../fixtures/players";
import type { PlayerProfile } from "../types";

// PlayerProfile pulls /players (structural + rating) plus advanced stats
// (radar, shots, percentile) from the advanced-metrics provider.
// Because half the fields require StatsBomb/Opta, this throws until wired.
async function loadLive(_playerId: number): Promise<PlayerProfile> {
  throw new Error(
    "player live path not implemented — requires advanced-metrics provider for radar, shots, percentile",
  );
}

export const loadPlayer = cached(
  async (playerId?: number): Promise<PlayerProfile> => {
    if (USE_LIVE && playerId) {
      try { return await loadLive(playerId); } catch { return playerProfileFixture; }
    }
    return playerProfileFixture;
  },
  "player",
  TTL.hour,
);
