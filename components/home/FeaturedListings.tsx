import Link from "next/link";
import { getListings } from "@/data/listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function FeaturedListings() {
  const featured = getListings().slice(0, 3);

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

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((listing, index) => (
          <ListingCard key={listing.slug} listing={listing} priority={index === 0} />
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-2">
        Sample listings shown above.{" "}
        <Link href="/listings" className="underline hover:text-ink">
          Browse the full list
        </Link>
        .
      </p>
    </div>
  );
}
