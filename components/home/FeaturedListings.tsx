import Link from "next/link";
import { getFeaturedListings } from "@/data/listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export async function FeaturedListings() {
  // Sanam's own listings sort first, then the newest office listings.
  const featured = await getFeaturedListings(3);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Featured listings</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">A few homes worth a look</h2>
        </div>
        <Button href="/listings" variant="secondary">
          View all listings
        </Button>
      </div>

      {featured.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing, index) => (
            <ListingCard key={listing.slug} listing={listing} priority={index === 0} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-1">
          New listings are on the way.{" "}
          <Link href="/contact" className="underline hover:text-ink">
            Tell Sanam what you&apos;re looking for
          </Link>{" "}
          to get options as they come up.
        </p>
      )}
    </div>
  );
}
