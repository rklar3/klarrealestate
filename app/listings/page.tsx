import { Suspense } from "react";
import { filterListings } from "@/data/listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingFilters } from "@/components/listings/ListingFilters";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Homes for Sale in the Okanagan Valley",
  description:
    "Browse homes for sale in Kelowna, West Kelowna, Penticton, Vernon, and Summerland. Filter by area, price, bedrooms, and property type.",
  path: "/listings",
});

type SearchParams = {
  area?: string;
  maxPrice?: string;
  beds?: string;
  type?: string;
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const results = filterListings({
    area: params.area,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    beds: params.beds ? Number(params.beds) : undefined,
    type: params.type,
  });

  return (
    <>
      <Section tone="ink" className="py-16 sm:py-20">
        <Eyebrow tone="gold">Listings</Eyebrow>
        <h1 className="mt-3 text-4xl sm:text-5xl">Homes for sale in the Okanagan</h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          Sample listings shown below — live MLS® inventory will replace this once a data feed is
          connected. Filter to narrow by area, price, bedrooms, or type.
        </p>
      </Section>

      <Section tone="cream">
        <Suspense>
          <ListingFilters />
        </Suspense>

        <p className="mt-6 text-sm text-muted-2">
          {results.length} {results.length === 1 ? "home" : "homes"} found
        </p>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((listing, index) => (
              <ListingCard key={listing.slug} listing={listing} priority={index === 0} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-card bg-sand p-10 text-center">
            <p className="text-lg font-semibold text-ink">No homes match those filters yet</p>
            <p className="mt-2 text-muted-1">
              Try widening your search, or get in touch and Sanam can let you know when something
              matching comes up.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button href="/listings">Clear filters</Button>
              <Button href="/contact" variant="secondary">
                Contact Sanam
              </Button>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
