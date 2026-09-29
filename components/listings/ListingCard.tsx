import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatCurrencyCAD } from "@/lib/mortgage";
import type { Listing } from "@/data/listings";

export function ListingStats({ listing, className }: { listing: Listing; className?: string }) {
  const stats = [
    listing.beds != null && `${listing.beds} bd`,
    listing.baths != null && `${listing.baths} ba`,
    listing.sqft != null ? `${listing.sqft.toLocaleString("en-CA")} sqft` : listing.lotSize,
    listing.typeLabel,
  ].filter(Boolean);

  return (
    <p className={className}>
      {stats.map((stat) => (
        <span key={stat as string}>{stat}</span>
      ))}
    </p>
  );
}

export function ListingCard({ listing, priority = false }: { listing: Listing; priority?: boolean }) {
  const cover = listing.photos[0];

  return (
    <Card className="overflow-hidden">
      <Link href={`/listings/${listing.slug}`} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
          {cover ? (
            <Image
              src={cover}
              alt={`${listing.address}, ${listing.city}`}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-2">
              Photos coming soon
            </div>
          )}
          {listing.badge && (
            <span className="absolute right-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
              {listing.badge}
            </span>
          )}
        </div>
        <div className="p-5">
          <p className="font-display text-2xl text-ink">{formatCurrencyCAD(listing.price)}</p>
          <p className="mt-1 text-sm text-muted-1">
            {listing.address}
            {!listing.addressHidden && `, ${listing.city}`}
          </p>
          <ListingStats listing={listing} className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-2" />
          {listing.listOfficeName && (
            <p className="mt-3 text-xs text-muted-2">
              MLS® {listing.mlsNumber} · Courtesy of {listing.listOfficeName}
            </p>
          )}
        </div>
      </Link>
    </Card>
  );
}
