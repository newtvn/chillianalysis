import { NextResponse } from "next/server";
import { loadMatch } from "@/lib/loaders/match";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  return NextResponse.json(await loadMatch(id ? Number(id) : undefined));
}
