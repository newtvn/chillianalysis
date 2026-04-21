import { NextResponse } from "next/server";
import { loadPlayerFacts } from "@/lib/loaders/playerFacts";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  return NextResponse.json(await loadPlayerFacts(id ? Number(id) : undefined));
}
