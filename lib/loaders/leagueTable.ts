import { cached, TTL, USE_LIVE } from "../cache";
import { leagueFixture } from "../fixtures/league";
import { rapidFootball, resolveLeagueId } from "../providers/rapidFootball";
import type { LeagueData } from "../types";

function currentSeasonLabel(): string {
  const now = new Date();
  const start = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
  return `${start}/${String(start + 1).slice(2)}`;
}

async function loadLive(leagueName?: string): Promise<LeagueData> {
  const envDefault = Number(process.env.FOTMOB_LEAGUE_ID ?? 47);
  const leagueId = resolveLeagueId(leagueName, envDefault);
  const res = await rapidFootball.standings(leagueId);
  const rows = (res.standing ?? []).map((r) => {
    const [gf, ga] = r.scoresStr.split("-").map((n) => parseInt(n, 10));
    return {
      p: r.idx,
      team: r.name,
      mp: r.played,
      w: r.wins,
      d: r.draws,
      l: r.losses,
      gf: Number.isFinite(gf) ? gf : 0,
      ga: Number.isFinite(ga) ? ga : 0,
      xgd: (r.goalConDiff >= 0 ? "+" : "") + r.goalConDiff,
      pts: r.pts,
    };
  });
  const played = rows[0]?.mp ?? 0;
  return {
    league: leagueName ?? "Premier League",
    season: currentSeasonLabel(),
    matchday: `MD ${played}`,
    rows,
  };
}

export const loadLeagueTable = cached(
  async (leagueName?: string): Promise<LeagueData> => {
    if (USE_LIVE) {
      try { return await loadLive(leagueName); } catch { return leagueFixture; }
    }
    return leagueFixture;
  },
  "league-table",
  TTL.medium,
);
