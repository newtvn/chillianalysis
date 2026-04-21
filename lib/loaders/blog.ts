import { cached, TTL, USE_LIVE } from "../cache";
import { blogFixture } from "../fixtures/blog";
import { loadBlogFromCms } from "../providers/content";
import type { BlogData } from "../types";

export const loadBlog = cached(
  async (): Promise<BlogData> => {
    if (USE_LIVE) {
      try {
        const fromCms = await loadBlogFromCms();
        if (fromCms) return fromCms;
      } catch { /* fall through */ }
    }
    return blogFixture;
  },
  "blog",
  TTL.medium,
);
