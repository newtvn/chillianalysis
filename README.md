# Chili Analysis — Web

Next.js 15 (App Router, TypeScript) production app ported from the design handoff bundle. Pixel-parity with the reference prototype; responsive down to ~480px.

## Run

```bash
npm install
npm run dev      # http://localhost:3001
npm run build && npm start
```

Fixtures are the default. No keys needed to develop or demo.

## Data layer

```
Page (server component)
  └─ fetches /api/* (route handler)
       └─ calls lib/loaders/<route>.ts
            ├─ if USE_LIVE_DATA != "1" → returns fixture
            └─ if USE_LIVE_DATA == "1" → calls providers → reshapes → returns
                 ├─ lib/providers/apiFootball.ts    (structural)
                 ├─ lib/providers/statsbomb.ts      (advanced metrics — stub)
                 ├─ lib/providers/openweather.ts    (weather)
                 └─ lib/providers/content.ts        (blog + notes — stub)
```

The screens never know whether they're talking to a fixture or a real upstream. Swap point is one file per route in `lib/loaders/`.

## Going live

1. `cp .env.example .env.local`
2. Set `API_FOOTBALL_KEY`, `OPENWEATHER_KEY`, `API_FOOTBALL_LEAGUE_ID`, `API_FOOTBALL_SEASON`
3. Flip `USE_LIVE_DATA=1`
4. For advanced metrics (xG, shot coords, PPDA, heatmaps), pick a provider and implement the four functions in `lib/providers/statsbomb.ts`. Options:
   - **StatsBomb Open Data** — free, non-commercial, 7 competitions ([github.com/statsbomb/open-data](https://github.com/statsbomb/open-data))
   - **Stats Perform / Opta** — enterprise license
   - **Understat** — scraping, men's top 5 only
5. For blog + notes, wire `lib/providers/content.ts` to your Postgres (Drizzle/Prisma) or CMS (Sanity/Contentful/Ghost)

### What works the moment you flip the flag

| Route | Works with API-Football alone |
|-------|:---:|
| `/api/league-table` | ✓ |
| `/api/live-ticker` | ✓ (xG columns show "—" until StatsBomb wired) |
| `/api/matches` | ✓ (shots show 0, xG "—", weather works if OPENWEATHER_KEY set) |
| `/api/matches/timeline` | ✓ (events work, xG race "—") |
| `/api/teams` | ✓ (xGD/PPDA/Pos% show "—") |

### What throws "not implemented" until StatsBomb is wired

| Route | Why |
|-------|-----|
| `/api/dashboard` | Watchlist xG/90, delta — needs advanced metrics |
| `/api/players` | Radar, shot map, percentile — all advanced |
| `/api/players/facts` | AI profile summary + time-metric percentiles |
| `/api/players/compare` | Normalized radar axes |
| `/api/teams/compare` | xG / xGA / PPDA / possession per team |
| `/api/shortlists` | Fit score, similarity — advanced metrics |

### What needs your own DB/CMS

| Route | Why |
|-------|-----|
| `/api/blog` | Editorial content |
| `/api/notes` | User-scoped drafts |

## Caching

`lib/cache.ts` wraps `unstable_cache`. TTLs by data class:

- `live` 30s — live ticker, in-progress matches
- `short` 60s — dashboard, notes
- `medium` 5min — league table, blog
- `hour` 1h — teams, players, compare
- `day` 24h — shortlists, player facts

Cached by revalidate tag = the loader's key prefix, so revalidating a single slice is a one-liner via `revalidateTag()`.

## Project layout

```
app/
├── layout.tsx                 shell (TopNav, GlobalFilters, SideRail, LiveTicker)
├── globals.css                design tokens + responsive rules
├── page.tsx                   /
├── players/                   /players, /players/compare, /players/facts
├── teams/                     /teams, /teams/compare
├── matches/                   /matches, /matches/timeline
├── shortlists/page.tsx
├── blog/page.tsx
├── league-table/page.tsx
├── notes/page.tsx
└── api/                       13 route handlers, each a 3-line loader call
components/
├── ui/                        Button, Badge, LiveDot, StatCard, DataTable, Note, PlayerHeader, MetricLabel, StatFig
├── charts/                    RadarChart, ShotMap, Heatmap (inline SVG, no chart lib)
└── shell/                     TopNav, SideRail, GlobalFilters (searchable), LiveTicker
lib/
├── types.ts                   all frontend-facing types (route contracts)
├── api.ts                     server-component fetch helper
├── cache.ts                   unstable_cache wrapper + TTL table
├── fixtures/                  design-handoff data, served by default
├── providers/                 apiFootball, openweather, statsbomb (stub), content (stub)
└── loaders/                   13 files — one per route, the swap point
```

## Conventions

- Design tokens live in `app/globals.css` as CSS custom properties. Match colors to the brand book — don't introduce new ones.
- Inline styles preserve pixel parity with the prototype. Use class names only for responsive behavior.
- Server components do the fetching. Client components only for interactivity (filters, hover).
- Responsive breakpoints: 1024 (tablet), 768 (narrow), 480 (phone-ish). Grids collapse, sidebar shrinks then hides.

## Adding a new route

1. Add the internal type to `lib/types.ts`
2. Add a fixture to `lib/fixtures/<name>.ts`
3. Write `lib/loaders/<name>.ts` — fixture fallback + live path
4. Add the route handler at `app/api/<path>/route.ts` (3 lines)
5. Build the page that calls it
