import { NextResponse } from "next/server";
import { loadPlayer } from "@/lib/loaders/player";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  return NextResponse.json(await loadPlayer(id ? Number(id) : undefined));
}
