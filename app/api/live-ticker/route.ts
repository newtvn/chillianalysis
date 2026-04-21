import { NextResponse } from "next/server";
import { loadLiveTicker } from "@/lib/loaders/liveTicker";

export async function GET() {
  return NextResponse.json(await loadLiveTicker());
}
