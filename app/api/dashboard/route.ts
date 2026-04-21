import { NextResponse } from "next/server";
import { loadDashboard } from "@/lib/loaders/dashboard";

export async function GET() {
  return NextResponse.json(await loadDashboard());
}
