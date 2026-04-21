import { cached, TTL, USE_LIVE } from "../cache";
import { dashboardFixture } from "../fixtures/dashboard";
import type { DashboardData } from "../types";

// Dashboard aggregates watchlist xG/90, avg rating, feed latency.
// Rating can come from API-Football /players; watchlist xG/90 and delta
// need an advanced-metrics provider (see lib/providers/statsbomb.ts).
async function loadLive(): Promise<DashboardData> {
  throw new Error(
    "dashboard live path not implemented — requires watchlist + advanced-metrics provider",
  );
}

export const loadDashboard = cached(
  async (): Promise<DashboardData> => {
    if (USE_LIVE) {
      try { return await loadLive(); } catch { return dashboardFixture; }
    }
    return dashboardFixture;
  },
  "dashboard",
  TTL.short,
);
