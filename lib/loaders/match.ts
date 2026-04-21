import { cached, TTL, USE_LIVE } from "../cache";
import { matchFixture } from "../fixtures/matches";
import { apiFootball } from "../providers/apiFootball";
import { shotsForFixture } from "../providers/statsbomb";
import { weatherByCity } from "../providers/openweather";
import type { MatchData } from "../types";

function abbrev(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

function statValue(stats: { type: string; value: number | string | null }[], type: string): number {
  const s = stats.find((x) => x.type === type);
  const v = s?.value;
  if (typeof v === "number") return v;
  if (typeof v === "string") return parseFloat(v) || 0;
  return 0;
}

async function loadLive(fixtureId: number): Promise<MatchData> {
  const [fxRes, statsRes] = await Promise.all([
    apiFootball.fixture(fixtureId),
    apiFootball.fixtureStats(fixtureId),
  ]);
  const fx = fxRes[0];
  if (!fx) throw new Error("fixture not found");
  const homeStats = statsRes.find((s) => s.team.id === fx.teams.home.id)?.statistics ?? [];
  const awayStats = statsRes.find((s) => s.team.id === fx.teams.away.id)?.statistics ?? [];
  const [homeShots, awayShots, weather] = await Promise.all([
    shotsForFixture(fixtureId, fx.teams.home.id),
    shotsForFixture(fixtureId, fx.teams.away.id),
    fx.fixture.venue.city ? weatherByCity(fx.fixture.venue.city) : Promise.resolve(null),
  ]);
  return {
    home: {
      name: fx.teams.home.name,
      abbr: abbrev(fx.teams.home.name),
      formation: "—",
      shots: homeShots ?? [],
      shotCount: statValue(homeStats, "Total Shots"),
      xg: "—",
      goals: fx.goals.home ?? 0,
      score: fx.goals.home ?? 0,
    },
    away: {
      name: fx.teams.away.name,
      abbr: abbrev(fx.teams.away.name),
      formation: "—",
      shots: awayShots ?? [],
      shotCount: statValue(awayStats, "Total Shots"),
      xg: "—",
      goals: fx.goals.away ?? 0,
      score: fx.goals.away ?? 0,
    },
    status:
      fx.fixture.status.short === "LIVE" || fx.fixture.status.short === "1H" || fx.fixture.status.short === "2H"
        ? `Live · ${fx.fixture.status.elapsed ?? 0}′`
        : fx.fixture.status.short,
    minute: fx.fixture.status.elapsed ?? 0,
    venue: fx.fixture.venue.name ?? "",
    weather: weather ? `${weather.temp}°C · ${weather.description}` : "—",
  };
}

export const loadMatch = cached(
  async (fixtureId?: number): Promise<MatchData> => {
    if (USE_LIVE && fixtureId) {
      try { return await loadLive(fixtureId); } catch { return matchFixture; }
    }
    return matchFixture;
  },
  "match",
  TTL.live,
);
