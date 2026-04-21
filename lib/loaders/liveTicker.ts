import { cached, TTL, USE_LIVE } from "../cache";
import { liveMatchFixture } from "../fixtures/dashboard";
import { rapidFootball, type RFLiveMatch } from "../providers/rapidFootball";
import type { LiveMatch } from "../types";

function abbrev(name: string): string {
  const clean = name.replace(/\b(FC|CF|AFC|AC|SC|SK|SS|BK)\b/gi, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts.map((w) => w[0]).join("").toUpperCase().slice(0, 3);
  }
  return (parts[0] ?? name).slice(0, 3).toUpperCase();
}

function pickLiveMatch(matches: RFLiveMatch[]): RFLiveMatch | null {
  const preferred = Number(process.env.FOTMOB_LEAGUE_ID ?? 47);
  const inLeague = matches.filter((m) => m.leagueId === preferred);
  const pool = inLeague.length > 0 ? inLeague : matches;
  const ongoing = pool.filter((m) => m.status?.ongoing);
  if (ongoing.length > 0) return ongoing[0];
  const started = pool.filter((m) => m.status?.started && !m.status?.finished);
  if (started.length > 0) return started[0];
  return pool[0] ?? null;
}

function minuteFromLiveTime(short?: string): number {
  if (!short) return 0;
  if (short === "HT") return 45;
  if (short === "FT") return 90;
  const m = short.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

async function loadLive(): Promise<LiveMatch> {
  const res = await rapidFootball.liveMatches();
  const list = res.live ?? [];
  const m = pickLiveMatch(list);
  if (!m) return liveMatchFixture;
  return {
    minute: minuteFromLiveTime(m.status?.liveTime?.short),
    home: abbrev(m.home.name),
    away: abbrev(m.away.name),
    homeScore: m.home.score ?? 0,
    awayScore: m.away.score ?? 0,
    homeXg: "—",
    awayXg: "—",
  };
}

export const loadLiveTicker = cached(
  async (): Promise<LiveMatch> => {
    if (USE_LIVE) {
      try {
        return await loadLive();
      } catch {
        return liveMatchFixture;
      }
    }
    return liveMatchFixture;
  },
  "live-ticker",
  TTL.live,
);
