import { NextResponse } from "next/server";
import { loadBlog } from "@/lib/loaders/blog";

export async function GET() {
  return NextResponse.json(await loadBlog());
}
