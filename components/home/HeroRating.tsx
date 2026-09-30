"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleMapsAttribution, Stars } from "@/components/testimonials/GoogleReviews";
import { loadGoogleReviews } from "@/components/testimonials/loadGoogleReviews";

// Only worth advertising in the hero while the rating is strong.
const MIN_RATING_TO_SHOW = 4.5;

// Live Google rating badge. The rating is Places content, which Google doesn't
// allow caching, so it loads in the browser rather than being baked into the
// static hero. Its height is reserved so the hero doesn't shift when it appears.
export function HeroRating() {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadGoogleReviews().then((data) => {
      if (!cancelled && data?.rating != null && data.rating >= MIN_RATING_TO_SHOW) {
        setRating(data.rating);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mb-5 h-5">
      {rating != null && (
        <Link
          href="/testimonials"
          className="inline-flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-cream motion-safe:animate-fade-in"
        >
          <Stars rating={rating} size={13} />
          <span>
            <span className="font-semibold text-cream">{rating.toFixed(1)}</span> on{" "}
            <GoogleMapsAttribution />
          </span>
        </Link>
      )}
    </div>
  );
}
