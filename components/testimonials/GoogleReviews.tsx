"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { googleReviewsUrl, siteConfig } from "@/data/site";
import type { GoogleReview, GoogleReviewsData } from "@/lib/google-places";
import { loadGoogleReviews } from "@/components/testimonials/loadGoogleReviews";

type State =
  | { status: "idle" | "loading" | "error" }
  | { status: "ready"; data: GoogleReviewsData };

const linkClass = "font-semibold text-terracotta underline-offset-4 hover:text-terracotta-dark hover:underline";

// Google requires the "Google Maps" attribution in Roboto (or a sans-serif
// fallback), normal weight, 12–16px, with its capitalization unchanged.
export function GoogleMapsAttribution() {
  return (
    <span className="text-sm font-normal" style={{ fontFamily: "Roboto, Arial, sans-serif" }}>
      Google Maps
    </span>
  );
}

export function Stars({
  rating,
  size = 16,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className={cn("inline-flex gap-0.5 text-amber-500", className)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
            fill={star <= Math.round(rating) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.authorName.charAt(0).toUpperCase();

  return (
    <article className="flex min-w-[280px] shrink-0 snap-start flex-col rounded-card border border-ink/10 bg-paper p-6 sm:min-w-0 sm:shrink">
      <div className="flex items-center gap-3">
        {review.authorPhotoUri ? (
          // eslint-disable-next-line @next/next/no-img-element -- Google forbids proxying/caching Places photos
          <img
            src={review.authorPhotoUri}
            alt=""
            width={40}
            height={40}
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full bg-sand font-semibold text-muted-1"
          >
            {initial}
          </span>
        )}
        <div className="min-w-0">
          {review.authorUri ? (
            <a
              href={review.authorUri}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate font-semibold text-ink hover:underline"
            >
              {review.authorName}
            </a>
          ) : (
            <p className="truncate font-semibold text-ink">{review.authorName}</p>
          )}
          {review.relativeTime && <p className="text-xs text-muted-2">{review.relativeTime}</p>}
        </div>
      </div>

      <Stars rating={review.rating} className="mt-4" />
      <p className="mt-3 line-clamp-6 whitespace-pre-line text-ink">{review.text}</p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-5 text-xs">
        {review.reviewUri && (
          <a href={review.reviewUri} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Read on Google Maps
          </a>
        )}
        {review.flagUri && (
          <a
            href={review.flagUri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-2 hover:text-ink hover:underline"
          >
            Report
          </a>
        )}
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="min-w-[280px] shrink-0 animate-pulse rounded-card border border-ink/10 bg-paper p-6 sm:min-w-0 sm:shrink">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-sand" />
        <div className="h-4 w-32 rounded bg-sand" />
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-3 rounded bg-sand" />
        <div className="h-3 rounded bg-sand" />
        <div className="h-3 w-2/3 rounded bg-sand" />
      </div>
    </div>
  );
}

// Fetches live when scrolled near (sharing the hero badge's request when there
// is one), so each page view makes at most one billed Places request.
export function GoogleReviews({ limit }: { limit?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let cancelled = false;

    const load = async () => {
      setState({ status: "loading" });
      const data = await loadGoogleReviews();
      if (cancelled) return;
      setState(data && data.reviews.length > 0 ? { status: "ready", data } : { status: "error" });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void load();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  const firstName = siteConfig.agentName.split(" ")[0];

  if (state.status === "error") {
    return (
      <div ref={ref} className="mt-8 rounded-card border border-ink/10 bg-paper p-8 text-center">
        <p className="text-muted-1">See what clients are saying about working with {firstName}.</p>
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkClass, "mt-3 inline-block")}
        >
          Read {firstName}&apos;s reviews on Google
        </a>
      </div>
    );
  }

  const data = state.status === "ready" ? state.data : null;
  const reviews = data ? data.reviews.slice(0, limit) : [];
  const skeletonCount = limit ?? 3;

  return (
    <div ref={ref}>
      <div className="mt-6 flex min-h-[3.5rem] flex-wrap items-center justify-between gap-4">
        {data?.rating != null ? (
          <div className="flex items-center gap-3">
            <span className="font-display text-4xl font-semibold text-ink">
              {data.rating.toFixed(1)}
            </span>
            <div>
              <Stars rating={data.rating} />
              <p className="text-sm text-muted-1">
                {data.totalReviews} {data.totalReviews === 1 ? "review" : "reviews"} on{" "}
                <GoogleMapsAttribution />
              </p>
            </div>
          </div>
        ) : (
          <span />
        )}
        {data && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href={data.reviewsUri ?? googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              See all reviews
            </a>
            {data.writeReviewUri && (
              <a href={data.writeReviewUri} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Write a review
              </a>
            )}
          </div>
        )}
      </div>

      <div
        className="mt-6 flex snap-x gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3"
        aria-busy={!data}
      >
        {data
          ? reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          : Array.from({ length: skeletonCount }, (_, i) => <SkeletonCard key={i} />)}
      </div>

      {data && (
        <p className="mt-2 text-xs text-muted-2">
          Most relevant reviews, as ranked by Google. Reviews from <GoogleMapsAttribution />.
        </p>
      )}
    </div>
  );
}
