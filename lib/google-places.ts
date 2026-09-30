import "server-only";
import { siteConfig } from "@/data/site";

// Google reviews via Places API (New) Place Details.
// Docs: https://developers.google.com/maps/documentation/places/web-service/place-details
//
// Google's Places policies forbid caching or storing Places content (only the
// place ID is exempt), so every call here is a live, uncached request. Keep the
// key server-side and restricted to Places API (New) in Google Cloud.
//
// The key uses a "Websites" (HTTP referrer) restriction, which Google checks
// against the Referer header. Server requests don't send one, so callers pass
// the origin of the site the visitor is on (e.g. https://klarrealestate.vercel.app/).

const PLACE_DETAILS_URL = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "rating,userRatingCount,googleMapsUri,googleMapsLinks,reviews";

type PlaceReview = {
  name: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  googleMapsUri?: string;
  flagContentUri?: string;
};

type PlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  googleMapsLinks?: { reviewsUri?: string; writeAReviewUri?: string };
  reviews?: PlaceReview[];
};

export type GoogleReview = {
  id: string;
  rating: number;
  text: string;
  relativeTime: string | null;
  authorName: string;
  authorUri: string | null;
  authorPhotoUri: string | null;
  reviewUri: string | null;
  flagUri: string | null;
};

export type GoogleReviewsData = {
  rating: number | null;
  totalReviews: number;
  reviewsUri: string | null;
  writeReviewUri: string | null;
  reviews: GoogleReview[];
};

export function isGooglePlacesConfigured(): boolean {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY);
}

export async function fetchGoogleReviews(referer: string): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error("[google-places] GOOGLE_PLACES_API_KEY is not set");
  }

  const res = await fetch(`${PLACE_DETAILS_URL}/${siteConfig.googlePlaceId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
      Referer: referer,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`[google-places] Place Details failed: ${res.status} ${detail.slice(0, 300)}`);
  }

  const place = (await res.json()) as PlaceDetails;

  return {
    rating: place.rating ?? null,
    totalReviews: place.userRatingCount ?? 0,
    reviewsUri: place.googleMapsLinks?.reviewsUri ?? place.googleMapsUri ?? null,
    writeReviewUri: place.googleMapsLinks?.writeAReviewUri ?? null,
    reviews: (place.reviews ?? [])
      .filter((review) => (review.text?.text ?? review.originalText?.text)?.trim())
      .map((review) => ({
        id: review.name,
        rating: review.rating ?? 0,
        text: (review.text?.text ?? review.originalText?.text ?? "").trim(),
        relativeTime: review.relativePublishTimeDescription ?? null,
        authorName: review.authorAttribution?.displayName ?? "Google user",
        authorUri: review.authorAttribution?.uri ?? null,
        authorPhotoUri: review.authorAttribution?.photoUri ?? null,
        reviewUri: review.googleMapsUri ?? null,
        flagUri: review.flagContentUri ?? null,
      })),
  };
}
