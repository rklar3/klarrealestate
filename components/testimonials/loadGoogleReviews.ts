"use client";

import type { GoogleReviewsData } from "@/lib/google-places";

// One /api/reviews request shared by everything on the page (hero rating badge
// and the reviews section), since each request is a billed Places call.
let request: Promise<GoogleReviewsData | null> | null = null;

export function loadGoogleReviews(): Promise<GoogleReviewsData | null> {
  request ??= fetch("/api/reviews")
    .then((res) => res.json() as Promise<{ ok: boolean; data?: GoogleReviewsData }>)
    .then((json) => (json.ok && json.data ? json.data : null))
    .catch(() => null)
    .then((data) => {
      // Let a later mount retry instead of keeping a failure for the session.
      if (!data) request = null;
      return data;
    });
  return request;
}
