import { GoogleReviews } from "@/components/testimonials/GoogleReviews";

export function Testimonials({ limit }: { limit?: number }) {
  return (
    <div>
      <h2 className="mt-3 text-3xl sm:text-4xl">In their words</h2>
      <GoogleReviews limit={limit} />
    </div>
  );
}
