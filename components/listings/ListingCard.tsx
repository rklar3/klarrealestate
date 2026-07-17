import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatCurrencyCAD } from "@/lib/mortgage";
import type { Listing } from "@/data/listings";

export function ListingCard({ listing, priority = false }: { listing: Listing; priority?: boolean }) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/listings/${listing.slug}`} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={`/images/${listing.image}.svg`}
            alt={`${listing.address} — placeholder image`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
          <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
            {listing.status}
          </span>
        </div>
        <div className="p-5">
          <p className="font-display text-2xl text-ink">{formatCurrencyCAD(listing.price)}</p>
          <p className="mt-1 text-sm text-muted-1">{listing.address}</p>
          <p className="mt-3 flex gap-4 text-sm text-muted-2">
            <span>{listing.beds} bd</span>
            <span>{listing.baths} ba</span>
            <span>{listing.sqft.toLocaleString("en-CA")} sqft</span>
          </p>
        </div>
      </Link>
    </Card>
  );
}
