import { cached, TTL, USE_LIVE } from "../cache";
import { postDraftFixture } from "../fixtures/notes";
import { loadDraftForUser } from "../providers/content";
import type { PostDraft } from "../types";

export const loadNotes = cached(
  async (userId?: string): Promise<PostDraft> => {
    if (USE_LIVE && userId) {
      try {
        const draft = await loadDraftForUser(userId);
        if (draft) return draft;
      } catch { /* fall through */ }
    }
    return postDraftFixture;
  },
  "notes",
  TTL.short,
);
