import { NextResponse } from "next/server";
import { loadShortlist } from "@/lib/loaders/shortlist";

export async function GET() {
  return NextResponse.json(await loadShortlist());
}
