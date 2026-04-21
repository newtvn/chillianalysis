// Thin HTTP client for the Fotmob-backed "Free API Live Football Data" on RapidAPI.
// https://rapidapi.com/Creativesdev/api/free-api-live-football-data
// League/team/player/event IDs are Fotmob IDs.

const HOST = "free-api-live-football-data.p.rapidapi.com";
const BASE = `https://${HOST}`;

type Params = Record<string, string | number>;

async function call<T>(path: string, params?: Params): Promise<T> {
  const key = process.env.RAPIDAPI_KEY;
  if (!key) throw new Error("RAPIDAPI_KEY is not set");
  const url = new URL(BASE + path);
  if (params) for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, {
    headers: { "x-rapidapi-key": key, "x-rapidapi-host": HOST },
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`rapid-football ${path}: ${res.status}`);
  const json = (await res.json()) as { status?: string; message?: string; response?: T };
  if (json.status && json.status !== "success") {
    throw new Error(`rapid-football ${path}: ${json.status}`);
  }
  if (json.message) throw new Error(`rapid-football ${path}: ${json.message}`);
  return json.response as T;
}

export const rapidFootball = {
  standings: (leagueId: number) =>
    call<{ standing: RFStandingRow[] }>("/football-get-standing-all", { leagueid: leagueId }),
  league: (leagueId: number) =>
    call<RFLeagueDetail>("/football-get-league", { leagueid: leagueId }),
  liveMatches: () => call<RFLiveResponse>("/football-current-live"),
  matchDetail: (eventId: number) =>
    call<RFMatchDetail>("/football-get-match-detail", { eventid: eventId }),
  matchScore: (eventId: number) =>
    call<RFMatchScore>("/football-get-match-score", { eventid: eventId }),
  matchStatus: (eventId: number) =>
    call<RFMatchStatus>("/football-get-match-status", { eventid: eventId }),
  matchAllStats: (eventId: number) =>
    call<RFMatchStats>("/football-get-match-all-stats", { eventid: eventId }),
  matchLocation: (eventId: number) =>
    call<RFMatchLocation>("/football-get-match-location", { eventid: eventId }),
  homeLineup: (eventId: number) =>
    call<RFLineup>("/football-get-hometeam-lineup", { eventid: eventId }),
  awayLineup: (eventId: number) =>
    call<RFLineup>("/football-get-awayteam-lineup", { eventid: eventId }),
  headToHead: (eventId: number) => call<RFH2H>("/football-get-head-to-head", { eventid: eventId }),
  matchesByDate: (yyyyMmDd: string) =>
    call<RFMatchesByDate>("/football-get-matches-by-date", { date: yyyyMmDd }),
  leagueMatches: (leagueId: number) =>
    call<RFLeagueMatches>("/football-get-all-matches-by-league", { leagueid: leagueId }),
  team: (teamId: number) => call<RFTeamDetail>("/football-league-team", { teamid: teamId }),
  teamPlayers: (teamId: number) =>
    call<RFTeamPlayers>("/football-team-players", { teamid: teamId }),
  player: (playerId: number) =>
    call<RFPlayerDetail>("/football-get-player-detail", { playerid: playerId }),
  topGoals: (leagueId: number) =>
    call<RFTopPlayers>("/football-get-top-goals", { leagueid: leagueId }),
  topAssists: (leagueId: number) =>
    call<RFTopPlayers>("/football-get-top-assists", { leagueid: leagueId }),
  topRating: (leagueId: number) =>
    call<RFTopPlayers>("/football-get-top-rating", { leagueid: leagueId }),
};

// Known Fotmob league IDs
export const FOTMOB_LEAGUE = {
  PREMIER_LEAGUE: 47,
  LA_LIGA: 87,
  BUNDESLIGA: 54,
  SERIE_A: 55,
  LIGUE_1: 53,
  CHAMPIONS_LEAGUE: 42,
  EUROPA_LEAGUE: 73,
  WSL: 9227,
  NWSL: 9134,
  LIGA_F: 9676,
} as const;

// Lookup used by filters — keys must match the GlobalFilters dropdown labels.
export const LEAGUE_NAME_TO_ID: Record<string, number> = {
  "Premier League": 47,
  "La Liga": 87,
  "Bundesliga": 54,
  "Serie A": 55,
  "Ligue 1": 53,
  "Champions League": 42,
  "Europa League": 73,
  "WSL": 9227,
  "NWSL": 9134,
  "Liga F": 9676,
};

export function resolveLeagueId(name: string | undefined, fallback = 47): number {
  if (!name) return fallback;
  return LEAGUE_NAME_TO_ID[name] ?? fallback;
}

// ─── Response shapes (minimal — only fields the loaders read) ─────────

export type RFStandingRow = {
  name: string;
  shortName: string;
  id: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  scoresStr: string; // "GF-GA"
  goalConDiff: number;
  pts: number;
  idx: number; // rank, 1-indexed
  qualColor: string | null; // hex, marks UCL/UEL/relegation bands
  deduction: number | null;
};

export type RFLeagueDetail = {
  details?: { name?: string; country?: string; type?: string };
  tableData?: unknown;
};

export type RFLiveMatch = {
  id: number;
  leagueId?: number;
  time?: string;
  timeTS?: number;
  statusId?: number;
  tournamentStage?: string;
  home: { id: number; name: string; longName?: string; score: number };
  away: { id: number; name: string; longName?: string; score: number };
  status: {
    utcTime?: string;
    started?: boolean;
    cancelled?: boolean;
    finished?: boolean;
    ongoing?: boolean;
    liveTime?: { short: string; long: string; shortKey?: string };
    scoreStr?: string;
  };
};

export type RFLiveResponse = {
  live?: RFLiveMatch[];
};

export type RFMatchDetail = {
  general?: {
    matchId?: string | number;
    leagueId?: number;
    leagueName?: string;
    matchTimeUTC?: string;
    matchRound?: string;
    homeTeam?: { id: number; name: string };
    awayTeam?: { id: number; name: string };
  };
  header?: {
    status?: {
      utcTime?: string;
      started?: boolean;
      finished?: boolean;
      scoreStr?: string;
      liveTime?: { short: string };
    };
    teams?: { name: string; id: number; score: number }[];
  };
  content?: {
    matchFacts?: {
      events?: {
        events?: RFMatchEvent[];
      };
      infoBox?: {
        Venue?: { name?: string; city?: string };
        "Match Date"?: { utcTime?: string };
        Referee?: { text?: string };
      };
    };
    stats?: { stats?: RFStatGroup[] };
    lineup?: unknown;
    shotmap?: {
      shots?: RFShot[];
    };
  };
};

export type RFMatchEvent = {
  time?: number;
  overloadTime?: number;
  type?: string; // "Goal", "Card", "Substitution"
  eventType?: string;
  card?: string; // "Yellow" / "Red"
  player?: { name: string; id?: number };
  team?: number; // 1 = home, 2 = away
  isHome?: boolean;
  reason?: { long?: string };
};

export type RFStatGroup = {
  title?: string;
  stats?: { title: string; stats: [string | number, string | number] }[];
};

export type RFShot = {
  id?: number;
  eventType?: string;
  teamId?: number;
  playerName?: string;
  x?: number;
  y?: number;
  min?: number;
  expectedGoals?: number;
  isGoal?: boolean;
  situation?: string;
  shotType?: string;
};

export type RFMatchScore = {
  homeScore?: number;
  awayScore?: number;
  scoreStr?: string;
};

export type RFMatchStatus = {
  started?: boolean;
  finished?: boolean;
  liveTime?: { short: string; long: string };
  scoreStr?: string;
};

export type RFMatchStats = { stats?: RFStatGroup[] };

export type RFMatchLocation = {
  venue?: { name: string; city: string; country?: string };
};

export type RFLineup = {
  lineup?: unknown;
  players?: { id: number; name: string; role?: string }[];
};

export type RFH2H = {
  summary?: unknown;
  matches?: unknown[];
};

export type RFMatchesByDate = {
  leagues?: {
    id: number;
    name: string;
    matches: RFLiveMatch[];
  }[];
};

export type RFLeagueMatches = {
  allMatches?: RFLiveMatch[];
  matches?: RFLiveMatch[];
};

export type RFTeamDetail = {
  details?: {
    id: number;
    name: string;
    shortName?: string;
    country?: string;
    venue?: string;
  };
  table?: { data?: { table?: { all?: RFStandingRow[] } } };
  overview?: { nextMatch?: RFLiveMatch; lastMatch?: RFLiveMatch; form?: string[] };
};

export type RFTeamPlayers = {
  squad?: {
    title?: string;
    members?: { id: number; name: string; position?: string; shirtNumber?: number }[];
  }[];
};

export type RFPlayerDetail = {
  id?: number;
  name?: string;
  birthDate?: { utcTime?: string };
  height?: string;
  countryName?: string;
  positionDescription?: { primaryPosition?: { label?: string } };
  primaryTeam?: { teamId?: number; teamName?: string };
  shirtNumber?: number;
};

export type RFTopPlayers = {
  players?: {
    id: number;
    name: string;
    stat?: number | string;
    teamId?: number;
    teamName?: string;
  }[];
};
