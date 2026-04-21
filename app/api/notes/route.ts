import { NextResponse } from "next/server";
import { loadNotes } from "@/lib/loaders/notes";

export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId") ?? undefined;
  return NextResponse.json(await loadNotes(userId));
}
