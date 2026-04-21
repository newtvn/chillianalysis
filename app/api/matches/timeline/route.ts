import { NextResponse } from "next/server";
import { loadMatchTimeline } from "@/lib/loaders/matchTimeline";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  return NextResponse.json(await loadMatchTimeline(id ? Number(id) : undefined));
}
