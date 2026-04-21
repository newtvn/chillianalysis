// Thin HTTP client around API-Football v3 (https://www.api-football.com).
// Auth via x-apisports-key header (direct) or RapidAPI if preferred.

const BASE = "https://v3.football.api-sports.io";

type Params = Record<string, string | number | boolean>;

async function call<T>(path: string, params?: Params): Promise<T[]> {
  const key = process.env.API_FOOTBALL_KEY;
  if (!key) throw new Error("API_FOOTBALL_KEY is not set");
  const url = new URL(BASE + path);
  if (params) for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, {
    headers: { "x-apisports-key": key },
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`api-football ${path}: ${res.status}`);
  const json = (await res.json()) as { response: T[]; errors?: unknown };
  if (json.errors && Object.keys(json.errors as object).length > 0) {
    throw new Error(`api-football ${path}: ${JSON.stringify(json.errors)}`);
  }
  return json.response;
}

export const apiFootball = {
  liveFixtures: () => call<AFFixture>("/fixtures", { live: "all" }),
  fixture: (id: number) => call<AFFixture>("/fixtures", { id }),
  fixtureStats: (id: number) => call<AFFixtureStats>("/fixtures/statistics", { fixture: id }),
  fixtureEvents: (id: number) => call<AFFixtureEvent>("/fixtures/events", { fixture: id }),
  fixturesByRound: (league: number, season: number, round: string) =>
    call<AFFixture>("/fixtures", { league, season, round }),
  standings: (league: number, season: number) =>
    call<AFStandingsWrap>("/standings", { league, season }),
  player: (id: number, season: number) => call<AFPlayer>("/players", { id, season }),
  playerProfile: (id: number) => call<AFPlayerProfile>("/players/profiles", { player: id }),
  playerInjuries: (id: number, season: number) =>
    call<AFInjury>("/injuries", { player: id, season }),
  playerSidelined: (id: number) => call<AFSidelined>("/sidelined", { player: id }),
  playerTransfers: (id: number) => call<AFTransferWrap>("/transfers", { player: id }),
  playerTrophies: (id: number) => call<AFTrophy>("/trophies", { player: id }),
  team: (id: number) => call<AFTeamWrap>("/teams", { id }),
  teamStatistics: (team: number, league: number, season: number) =>
    call<AFTeamStats>("/teams/statistics", { team, league, season }),
  teamSquad: (team: number) => call<AFSquadWrap>("/players/squads", { team }),
  teamNextFixture: (team: number) => call<AFFixture>("/fixtures", { team, next: 1 }),
  h2h: (a: number, b: number) => call<AFFixture>("/fixtures/headtohead", { h2h: `${a}-${b}` }),
  topScorers: (league: number, season: number) =>
    call<AFPlayer>("/players/topscorers", { league, season }),
  topAssists: (league: number, season: number) =>
    call<AFPlayer>("/players/topassists", { league, season }),
  currentRound: (league: number, season: number) =>
    call<string>("/fixtures/rounds", { league, season, current: "true" }),
};

// ─── Response shapes (minimal, only what the loaders consume) ─────────

export type AFFixture = {
  fixture: { id: number; date: string; venue: { name: string | null; city: string | null }; status: { short: string; elapsed: number | null } };
  league: { id: number; name: string; round: string; season: number };
  teams: { home: { id: number; name: string }; away: { id: number; name: string } };
  goals: { home: number | null; away: number | null };
  score: { halftime: { home: number | null; away: number | null }; fulltime: { home: number | null; away: number | null } };
};

export type AFFixtureStats = {
  team: { id: number; name: string };
  statistics: { type: string; value: number | string | null }[];
};

export type AFFixtureEvent = {
  time: { elapsed: number };
  team: { id: number; name: string };
  player: { id: number | null; name: string | null };
  type: string;
  detail: string;
};

export type AFStandingsWrap = {
  league: {
    id: number;
    name: string;
    season: number;
    standings: AFStandingRow[][];
  };
};

export type AFStandingRow = {
  rank: number;
  team: { id: number; name: string };
  all: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } };
  goalsDiff: number;
  points: number;
  form: string | null;
};

export type AFPlayer = {
  player: { id: number; name: string; firstname: string; lastname: string; age: number; nationality: string; photo: string };
  statistics: {
    team: { id: number; name: string };
    league: { id: number; name: string; season: number };
    games: { appearences: number | null; minutes: number | null; position: string | null; rating: string | null; number: number | null };
    shots: { total: number | null; on: number | null };
    goals: { total: number | null; assists: number | null };
    passes: { total: number | null; key: number | null; accuracy: number | null };
    tackles: { total: number | null; blocks: number | null; interceptions: number | null };
    duels: { total: number | null; won: number | null };
    dribbles: { attempts: number | null; success: number | null };
    fouls: { drawn: number | null; committed: number | null };
    cards: { yellow: number | null; red: number | null };
  }[];
};

export type AFPlayerProfile = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: { date: string; country: string };
  nationality: string;
  height: string;
  weight: string;
  position: string;
};

export type AFInjury = {
  player: { id: number; name: string };
  team: { id: number; name: string };
  fixture: { id: number; date: string };
  league: { id: number; name: string };
  type: string;
  reason: string;
};

export type AFSidelined = {
  type: string;
  start: string;
  end: string;
};

export type AFTransferWrap = {
  player: { id: number; name: string };
  transfers: { date: string; type: string | null; teams: { in: { id: number; name: string }; out: { id: number; name: string } } }[];
};

export type AFTrophy = {
  league: string;
  country: string;
  season: string;
  place: string;
};

export type AFTeamWrap = {
  team: { id: number; name: string; code: string | null; founded: number | null };
  venue: { id: number; name: string; city: string; capacity: number };
};

export type AFTeamStats = {
  league: { id: number; name: string; season: number };
  team: { id: number; name: string };
  form: string | null;
  fixtures: {
    played: { total: number };
    wins: { total: number };
    draws: { total: number };
    loses: { total: number };
  };
  goals: {
    for: { total: { total: number }; average: { total: string } };
    against: { total: { total: number }; average: { total: string } };
  };
  lineups: { formation: string; played: number }[];
};

export type AFSquadWrap = {
  team: { id: number; name: string };
  players: { id: number; name: string; age: number; number: number; position: string; photo: string }[];
};
