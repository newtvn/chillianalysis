import { unstable_cache } from "next/cache";

// Thin wrapper so every loader reads the same way and TTLs live in one place.
export function cached<Args extends unknown[], T>(
  fn: (...args: Args) => Promise<T>,
  keyPrefix: string,
  ttlSec: number,
) {
  return unstable_cache(fn, [keyPrefix], { revalidate: ttlSec, tags: [keyPrefix] });
}

export const TTL = {
  live: 30,
  short: 60,
  medium: 300,
  hour: 3600,
  day: 86400,
};

export const USE_LIVE = process.env.USE_LIVE_DATA === "1";
