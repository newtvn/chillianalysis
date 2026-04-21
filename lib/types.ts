export type PlayerRow = {
  player: string;
  min: string;
  xg: string;
  ppda: string;
  rating: string;
  _good?: boolean;
  _bad?: boolean;
};

export type LiveMatch = {
  minute: number;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  homeXg: string;
  awayXg: string;
};

export type NoteItem = {
  author: string;
  handle: string;
  time: string;
  body: string;
  tags: string[];
};

export type DashboardData = {
  matchday: string;
  stats: { label: string; value: string; delta?: string; suffix?: string; selected?: boolean }[];
  watchlist: PlayerRow[];
  notes: NoteItem[];
};

export type Shot = { x: number; y: number; xg: number; goal?: boolean };

export type PlayerProfile = {
  id: string;
  name: string;
  number: number;
  team: string;
  position: string;
  age: number;
  nationality: string;
  rating: string;
  stats: { label: string; value: string; delta?: string; suffix?: string; selected?: boolean }[];
  radarAxes: string[];
  radarValues: number[];
  shots: Shot[];
  shotStats: { xg: string; goals: number };
  percentile: string;
};

export type PlayerFactsData = {
  name: string;
  profileSummary: { green: string; white: string; gray: string };
  tags: string[];
  quickFacts: { label: string; value: string; sub: string }[];
  injuries: { date: string; type: string; out: string; severity: 'high' | 'mid' | 'low' }[];
  injurySummary: { title: string; sub: string };
  funFacts: { icon: string; title: string; body: string }[];
  timeMetrics: { k: string; v: string; delta: string; good?: boolean }[];
};

export type ComparePlayers = {
  a: { name: string; percentile: string; color: string };
  b: { name: string; percentile: string; color: string };
  axes: string[];
  aValues: number[];
  bValues: number[];
  rows: { k: string; a: string; b: string }[];
};

export type TeamData = {
  name: string;
  abbr: string;
  league: string;
  record: string;
  stadium: string;
  goalsFor: number;
  goalsAgainst: number;
  stats: { label: string; value: string }[];
  squad: { num: number; name: string; pos: string; rating: string }[];
  form: ('W' | 'D' | 'L')[];
  nextFixture: { text: string; venue: string };
};

export type TeamCompareData = {
  a: { name: string; abbr: string; league: string; record: string; color: string };
  b: { name: string; abbr: string; league: string; record: string; color: string };
  stats: { k: string; a: number; b: number; max: number; inv?: boolean; unit?: string }[];
  aForm: ('W' | 'D' | 'L')[];
  bForm: ('W' | 'D' | 'L')[];
};

export type MatchData = {
  home: { name: string; abbr: string; formation: string; shots: Shot[]; shotCount: number; xg: string; goals: number; score: number };
  away: { name: string; abbr: string; formation: string; shots: Shot[]; shotCount: number; xg: string; goals: number; score: number };
  status: string;
  minute: number;
  venue: string;
  weather: string;
};

export type MatchEvent = {
  m: number;
  type: 'kickoff' | 'goal' | 'yellow' | 'red' | 'sub' | 'note';
  text: string;
  xg?: string;
  team?: 'h' | 'a';
};

export type MatchTimelineData = {
  home: { abbr: string; score: number; xg: string };
  away: { abbr: string; score: number; xg: string };
  matchday: string;
  events: MatchEvent[];
  currentMinute: number;
  xgRace: { home: string; away: string };
};

export type ShortlistRow = {
  name: string;
  age: number;
  team: string;
  pos: string;
  fit: number;
  xg: string;
  val: string;
  status: 'brand' | 'warning' | 'neutral';
};

export type ShortlistData = {
  title: string;
  subtitle: string;
  filters: string[];
  rows: ShortlistRow[];
};

export type BlogPost = {
  tag: string;
  title: string;
  author: string;
  read: string;
  up: number;
  comm: number;
  color: string;
};

export type BlogData = {
  featured: {
    tag: string;
    meta: string;
    title: string;
    excerpt: string;
    author: string;
    authorInitials: string;
    ago: string;
    up: number;
    comm: number;
  };
  categories: string[];
  posts: BlogPost[];
};

export type LeagueRow = {
  p: number;
  team: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  xgd: string;
  pts: number;
};

export type LeagueData = {
  league: string;
  season: string;
  matchday: string;
  rows: LeagueRow[];
};

export type PostDraft = {
  title: string;
  tags: string[];
  words: number;
  read: string;
  charts: number;
  author: string;
  handle: string;
  savedAgo: string;
};
