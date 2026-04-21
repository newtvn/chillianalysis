// Server-side fetch helper. Base URL resolves from env in prod, localhost in dev.
// Every screen calls these; swapping fixtures for real upstream later means
// changing the route handlers in app/api/*, not the screens.

import { headers } from "next/headers";

async function baseUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_API_BASE) return process.env.NEXT_PUBLIC_API_BASE;
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function apiGet<T>(path: string): Promise<T> {
  const base = await baseUrl();
  const res = await fetch(`${base}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}
