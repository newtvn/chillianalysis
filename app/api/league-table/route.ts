import { NextResponse } from "next/server";
import { loadLeagueTable } from "@/lib/loaders/leagueTable";

export async function GET(req: Request) {
  const league = new URL(req.url).searchParams.get("league") ?? undefined;
  return NextResponse.json(await loadLeagueTable(league));
}
