import { cached, TTL, USE_LIVE } from "../cache";
import { teamFixture } from "../fixtures/teams";
import { apiFootball } from "../providers/apiFootball";
import { teamAdvancedStats } from "../providers/statsbomb";
import type { TeamData } from "../types";

function abbrev(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

function formFromString(form: string | null | undefined): ("W" | "D" | "L")[] {
  if (!form) return [];
  return form
    .slice(-5)
    .split("")
    .filter((c): c is "W" | "D" | "L" => c === "W" || c === "D" || c === "L");
}

async function loadLive(teamId: number): Promise<TeamData> {
  const leagueId = Number(process.env.API_FOOTBALL_LEAGUE_ID ?? 39);
  const season = Number(process.env.API_FOOTBALL_SEASON ?? new Date().getFullYear());
  const [teamRes, statsRes, squadRes, nextRes, adv] = await Promise.all([
    apiFootball.team(teamId),
    apiFootball.teamStatistics(teamId, leagueId, season),
    apiFootball.teamSquad(teamId),
    apiFootball.teamNextFixture(teamId),
    teamAdvancedStats(teamId, season),
  ]);
  const team = teamRes[0];
  const stats = statsRes[0];
  const squad = squadRes[0]?.players ?? [];
  const next = nextRes[0];
  if (!team || !stats) throw new Error("team data missing");
  return {
    name: team.team.name,
    abbr: team.team.code ?? abbrev(team.team.name),
    league: `${stats.league.name} · ${season}/${String(season + 1).slice(2)}`,
    record: `W ${stats.fixtures.wins.total} · D ${stats.fixtures.draws.total} · L ${stats.fixtures.loses.total}`,
    stadium: team.venue.name,
    goalsFor: stats.goals.for.total.total,
    goalsAgainst: stats.goals.against.total.total,
    stats: [
      { label: "xGD", value: adv?.xgdPer90 != null ? adv.xgdPer90.toFixed(1) : "—" },
      { label: "PPDA", value: adv?.ppda != null ? adv.ppda.toFixed(1) : "—" },
      { label: "Pos%", value: adv?.possession != null ? adv.possession.toFixed(1) : "—" },
    ],
    squad: squad.slice(0, 8).map((p) => ({
      num: p.number ?? 0,
      name: p.name,
      pos: p.position?.slice(0, 2).toUpperCase() ?? "—",
      rating: "—",
    })),
    form: formFromString(stats.form),
    nextFixture: next
      ? {
          text: `${next.teams.away.name} (${next.teams.home.id === teamId ? "H" : "A"}) · ${new Date(next.fixture.date).toLocaleString()}`,
          venue: next.fixture.venue.name ?? "",
        }
      : { text: "—", venue: "" },
  };
}

export const loadTeam = cached(
  async (teamId?: number): Promise<TeamData> => {
    if (USE_LIVE && teamId) {
      try { return await loadLive(teamId); } catch { return teamFixture; }
    }
    return teamFixture;
  },
  "team",
  TTL.hour,
);
