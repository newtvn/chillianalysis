"use client";
import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const leagues = [
  "All leagues",
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "WSL",
  "Liga F",
  "NWSL",
  "Champions League",
];
const teams = [
  "All teams",
  "Man City",
  "Arsenal",
  "Real Madrid",
  "Barcelona",
  "Chelsea W",
  "Lyon W",
  "Bayern",
  "PSG",
];
const positions = ["All positions", "GK", "DEF", "MID", "FWD"];
const seasons = ["2025/26", "2024/25", "2023/24"];
const genders = ["MEN", "WOMEN"];

// When flipping gender, auto-switch to a default league for that gender
// so a user on Premier League + WOMEN doesn't stay on a men's league.
const WOMEN_DEFAULT_LEAGUE = "WSL";
const MEN_DEFAULT_LEAGUE = "Premier League";
const WOMEN_LEAGUES = new Set(["WSL", "Liga F", "NWSL"]);
const MEN_LEAGUES = new Set([
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "Champions League",
]);

export function GlobalFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters = {
    gender: sp.get("gender") ?? "MEN",
    league: sp.get("league") ?? "Premier League",
    team: sp.get("team") ?? "All teams",
    position: sp.get("position") ?? "All positions",
    season: sp.get("season") ?? "2025/26",
  };

  function writeParams(next: Record<string, string>) {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(next)) {
      if (!v || v.startsWith("All ") || v === "MEN" || v === "2025/26") {
        params.delete(k);
      } else {
        params.set(k, v);
      }
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function setGender(g: string) {
    const swaps: Record<string, string> = { gender: g };
    if (g === "WOMEN" && MEN_LEAGUES.has(filters.league)) {
      swaps.league = WOMEN_DEFAULT_LEAGUE;
    } else if (g === "MEN" && WOMEN_LEAGUES.has(filters.league)) {
      swaps.league = MEN_DEFAULT_LEAGUE;
    }
    writeParams(swaps);
  }

  return (
    <div
      className="global-filters"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        padding: "12px 24px",
        background: "#0A0A0A",
        borderBottom: "1px solid #1F1F1F",
        flexShrink: 0,
        opacity: isPending ? 0.7 : 1,
        transition: "opacity 150ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <div style={{ display: "flex", background: "#000", border: "1px solid #262626", padding: 2 }}>
        {genders.map((g) => (
          <button
            key={g}
            onClick={() => setGender(g)}
            style={{
              background: filters.gender === g ? "#4ADE80" : "transparent",
              color: filters.gender === g ? "#000" : "#A3A3A3",
              border: 0,
              padding: "5px 12px",
              cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.12em",
            }}
          >
            {g}
          </button>
        ))}
      </div>
      <FilterSelect
        label="LEAGUE"
        value={filters.league}
        onChange={(v) => writeParams({ league: v })}
        options={leagues}
      />
      <FilterSelect
        label="TEAM"
        value={filters.team}
        onChange={(v) => writeParams({ team: v })}
        options={teams}
      />
      <FilterSelect
        label="POSITION"
        value={filters.position}
        onChange={(v) => writeParams({ position: v })}
        options={positions}
      />
      <FilterSelect
        label="SEASON"
        value={filters.season}
        onChange={(v) => writeParams({ season: v })}
        options={seasons}
      />
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: 6,
          alignItems: "center",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          color: "#737373",
          letterSpacing: "0.08em",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            background: isPending ? "#FACC15" : "#4ADE80",
            borderRadius: "50%",
            animation: isPending ? "ca-pulse 1.2s ease-in-out infinite" : "none",
          }}
        />
        {isPending ? "FILTERING…" : "LIVE DATA · 420ms"}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;
  const close = () => {
    setOpen(false);
    setQuery("");
  };
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "#000",
          border: "1px solid #262626",
          color: "#F5F5F5",
          padding: "6px 10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: 12,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            color: "#737373",
            letterSpacing: "0.12em",
          }}
        >
          {label}
        </span>
        <span>{value}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <>
          <div
            onClick={close}
            style={{ position: "fixed", inset: 0, zIndex: 99, background: "transparent" }}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              zIndex: 100,
              background: "#121212",
              border: "1px solid #262626",
              minWidth: 220,
              maxHeight: 320,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 10px",
                borderBottom: "1px solid #262626",
                background: "#000",
              }}
            >
              <span style={{ color: "#737373", fontSize: 12 }}>⌕</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") close();
                  if (e.key === "Enter" && filtered[0]) {
                    onChange(filtered[0]);
                    close();
                  }
                }}
                placeholder={`Search ${label.toLowerCase()}`}
                style={{
                  background: "transparent",
                  border: 0,
                  outline: "none",
                  color: "#F5F5F5",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 12,
                  flex: 1,
                  minWidth: 0,
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  style={{
                    background: "transparent",
                    border: 0,
                    color: "#737373",
                    cursor: "pointer",
                    fontSize: 14,
                    padding: 0,
                    lineHeight: 1,
                  }}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {filtered.length === 0 ? (
                <div
                  style={{
                    padding: "12px",
                    fontSize: 12,
                    color: "#737373",
                    fontFamily: "JetBrains Mono, monospace",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  No match
                </div>
              ) : (
                filtered.map((o) => (
                  <div
                    key={o}
                    onClick={() => {
                      onChange(o);
                      close();
                    }}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: 12,
                      color: value === o ? "#4ADE80" : "#F5F5F5",
                      background: value === o ? "#052E16" : "transparent",
                    }}
                  >
                    {o}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
