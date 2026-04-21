import { cached, TTL, USE_LIVE } from "../cache";
import { shortlistFixture } from "../fixtures/shortlists";
import type { ShortlistData } from "../types";

// Shortlist is a scout-built list: filters applied to a large player pool.
// Real impl typically blends:
//   - API-Football /players with filters (age, position, league)
//   - Advanced-metrics provider for xG/90, fit score, radar similarity
//   - Your own DB for "priority" / "tracking" status flags
async function loadLive(): Promise<ShortlistData> {
  throw new Error(
    "shortlist live path not implemented — requires player pool query, similarity scoring, and scout status flags",
  );
}

export const loadShortlist = cached(
  async (): Promise<ShortlistData> => {
    if (USE_LIVE) {
      try { return await loadLive(); } catch { return shortlistFixture; }
    }
    return shortlistFixture;
  },
  "shortlist",
  TTL.day,
);
