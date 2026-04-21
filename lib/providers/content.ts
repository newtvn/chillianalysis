// Blog posts and user notes are app-internal — API-Football has no equivalent.
// Recommended: Postgres (Drizzle/Prisma) or a headless CMS (Sanity/Contentful/Ghost).
// Wire these two functions to whatever you pick.

import type { BlogData, PostDraft } from "../types";

export async function loadBlogFromCms(): Promise<BlogData | null> {
  return null;
}

export async function loadDraftForUser(_userId: string): Promise<PostDraft | null> {
  return null;
}
