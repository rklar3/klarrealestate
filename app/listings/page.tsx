import { Suspense } from "react";
import { filterListings } from "@/data/listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingFilters } from "@/components/listings/ListingFilters";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { DdfDisclaimer, RealtorCaBadge } from "@/components/listings/RealtorCaBadge";
import { buildMetadata } from "@/lib/seo";
import { OWN_LISTINGS_QUERY, siteConfig } from "@/data/site";

export const metadata = buildMetadata({
  title: "Homes for Sale in the Okanagan Valley",
  description:
    "Browse current MLS® listings from Sanam Klar and Oakwyn Realty in Kelowna, West Kelowna, Penticton, Vernon, and across BC. Filter by area, price, bedrooms, and property type.",
  path: "/listings",
});

type SearchParams = {
  area?: string;
  maxPrice?: string;
  beds?: string;
  type?: string;
  agent?: string;
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const ownOnly = params.agent === OWN_LISTINGS_QUERY.agent;
  const matching = await filterListings({
    area: params.area,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    beds: params.beds ? Number(params.beds) : undefined,
    type: params.type,
  });
  const ownMatching = matching.filter((listing) => listing.isOwnListing);
  const results = ownOnly ? ownMatching : matching;
  const firstName = siteConfig.agentName.split(" ")[0];

  return (
    <>
      <Section tone="ink" className="py-16 sm:py-20">
        <Eyebrow tone="gold">Listings</Eyebrow>
        <h1 className="mt-3 text-4xl sm:text-5xl">
          {ownOnly ? `${firstName}'s listings` : "Homes for sale"}
        </h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          {ownOnly
            ? `Properties ${firstName} currently has listed for sale.`
            : `Current MLS® listings from ${firstName} and the ${siteConfig.brokerage} team.`}{" "}
          Updated throughout the day — and if you don&apos;t see the right fit, {firstName} can
          search the full market for you.
        </p>
      </Section>

      <Section tone="cream">
        <Suspense>
          <ListingFilters counts={{ all: matching.length, own: ownMatching.length }} />
        </Suspense>

        <p className="mt-6 text-sm text-muted-2">
          {results.length} {results.length === 1 ? "listing" : "listings"} found
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
              <Button href={ownOnly ? `/listings?agent=${OWN_LISTINGS_QUERY.agent}` : "/listings"}>
                Clear filters
              </Button>
              <Button href="/contact" variant="secondary">
                Contact Sanam
              </Button>
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col gap-4 border-t border-muted-3/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <DdfDisclaimer />
          <div className="shrink-0">
            <RealtorCaBadge />
          </div>
        </div>
      </Section>
    </>
  );
}
