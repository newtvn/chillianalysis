import { cached, TTL, USE_LIVE } from "../cache";
import { matchTimelineFixture } from "../fixtures/matches";
import { apiFootball } from "../providers/apiFootball";
import { xgRaceForFixture } from "../providers/statsbomb";
import type { MatchEvent, MatchTimelineData } from "../types";

function abbrev(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

function mapEventType(type: string, detail: string): MatchEvent["type"] {
  if (type === "Goal") return "goal";
  if (type === "Card" && detail.toLowerCase().includes("yellow")) return "yellow";
  if (type === "Card" && detail.toLowerCase().includes("red")) return "red";
  if (type === "subst") return "sub";
  return "note";
}

async function loadLive(fixtureId: number): Promise<MatchTimelineData> {
  const [fxRes, eventsRes, xg] = await Promise.all([
    apiFootball.fixture(fixtureId),
    apiFootball.fixtureEvents(fixtureId),
    xgRaceForFixture(fixtureId),
  ]);
  const fx = fxRes[0];
  if (!fx) throw new Error("fixture not found");
  const homeId = fx.teams.home.id;
  return {
    home: { abbr: abbrev(fx.teams.home.name), score: fx.goals.home ?? 0, xg: xg?.home ?? "—" },
    away: { abbr: abbrev(fx.teams.away.name), score: fx.goals.away ?? 0, xg: xg?.away ?? "—" },
    matchday: `Match timeline · ${fx.league.round}`,
    currentMinute: fx.fixture.status.elapsed ?? 0,
    xgRace: { home: xg?.home ?? "—", away: xg?.away ?? "—" },
    events: eventsRes.map((e) => ({
      m: e.time.elapsed,
      type: mapEventType(e.type, e.detail),
      text:
        e.type === "Goal"
          ? `GOAL · ${e.player.name ?? "Unknown"} (${abbrev(e.team.name)})`
          : `${e.detail} · ${e.player.name ?? ""} (${abbrev(e.team.name)})`,
      team: e.team.id === homeId ? "h" : "a",
    })),
  };
}

export const loadMatchTimeline = cached(
  async (fixtureId?: number): Promise<MatchTimelineData> => {
    if (USE_LIVE && fixtureId) {
      try { return await loadLive(fixtureId); } catch { return matchTimelineFixture; }
    }
    return matchTimelineFixture;
  },
  "match-timeline",
  TTL.live,
);
