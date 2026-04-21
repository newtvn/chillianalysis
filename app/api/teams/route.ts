import { NextResponse } from "next/server";
import { loadTeam } from "@/lib/loaders/team";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  return NextResponse.json(await loadTeam(id ? Number(id) : undefined));
}
