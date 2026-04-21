import { NextResponse } from "next/server";
import { loadTeamCompare } from "@/lib/loaders/teamCompare";

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const a = p.get("a");
  const b = p.get("b");
  return NextResponse.json(
    await loadTeamCompare(a ? Number(a) : undefined, b ? Number(b) : undefined),
  );
}
