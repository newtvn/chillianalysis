import { NextResponse } from "next/server";
import { loadPlayerCompare } from "@/lib/loaders/playerCompare";

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const a = p.get("a");
  const b = p.get("b");
  return NextResponse.json(
    await loadPlayerCompare(a ? Number(a) : undefined, b ? Number(b) : undefined),
  );
}
