import { NextResponse } from "next/server";
import { fetchGoogleReviews, isGooglePlacesConfigured } from "@/lib/google-places";
import { isRateLimited } from "@/lib/rate-limit";

// Live Google reviews for the reviews section. Pages that show reviews stay
// static and call this from the browser, because Google's Places policies don't
// allow the review content itself to be cached in the page or on the server.
export async function GET(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  // Each call is billed by Google, so blunt scripted hammering of this route.
  // Looser than the form limit: every page view with reviews makes one call.
  if (isRateLimited(`reviews:${ip}`, 20)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  if (!isGooglePlacesConfigured()) {
    return NextResponse.json({ ok: false, error: "Reviews are not configured" }, { status: 503 });
  }

  try {
    // Matches the key's allowed websites, e.g. http://localhost:3000/* or
    // https://klarrealestate.vercel.app/*.
    const data = await fetchGoogleReviews(`${new URL(request.url).origin}/`);
    return NextResponse.json(
      { ok: true, data },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    console.error("[reviews] Failed to load Google reviews", error);
    return NextResponse.json({ ok: false, error: "Reviews are unavailable" }, { status: 502 });
  }
}
