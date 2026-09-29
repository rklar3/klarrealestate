import { notFound, permanentRedirect } from "next/navigation";
import { getListingBySlug, getListings, type Listing } from "@/data/listings";
import { formatCurrencyCAD } from "@/lib/mortgage";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { ListingStats } from "@/components/listings/ListingCard";
import { ListingGallery, ListingPhotoGrid } from "@/components/listings/ListingGallery";
import { DdfDisclaimer, RealtorCaBadge } from "@/components/listings/RealtorCaBadge";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript, residenceJsonLd } from "@/lib/seo";

// Matches the DDF feed cache in data/listings.ts.
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getListings()).map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    return buildMetadata({
      title: "Listing not found",
      description: "This listing is no longer available.",
      path: `/listings/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${listing.address}, ${listing.city} | ${formatCurrencyCAD(listing.price)}`,
    description: listing.summary,
    path: `/listings/${listing.slug}`,
    ogImage: listing.photos[0],
  });
}

function mapQuery(listing: Listing): string {
  if (listing.latitude != null && listing.longitude != null) {
    return `${listing.latitude},${listing.longitude}`;
  }
  return listing.addressHidden
    ? `${listing.city}, ${listing.province}`
    : `${listing.address}, ${listing.city}, ${listing.province}`;
}

function groupRoomsByLevel(rooms: Listing["rooms"]) {
  const groups = new Map<string, Listing["rooms"]>();
  for (const room of rooms) {
    groups.set(room.level, [...(groups.get(room.level) ?? []), room]);
  }
  return [...groups.entries()];
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  if (listing.slug !== slug) {
    permanentRedirect(`/listings/${listing.slug}`);
  }

  const fullAddress = listing.addressHidden ? listing.address : `${listing.address}, ${listing.city}`;
  const listedBy = [listing.listAgentName, listing.listOfficeName].filter(Boolean).join(", ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(residenceJsonLd(listing))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Listings", path: "/listings" },
            { name: fullAddress, path: `/listings/${listing.slug}` },
          ]),
        )}
      />

      <ListingGallery photos={listing.photos} alt={fullAddress} badge={listing.badge} />

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Eyebrow>
              {listing.city} · MLS® {listing.mlsNumber}
            </Eyebrow>
            <h1 className="mt-3 text-3xl sm:text-4xl">{listing.address}</h1>
            <p className="mt-2 font-display text-3xl text-terracotta">
              {formatCurrencyCAD(listing.price)}
            </p>
            <ListingStats
              listing={listing}
              className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-muted-1"
            />

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-muted-3/40 py-4">
              {listedBy && <p className="text-sm text-muted-1">Listed by {listedBy}</p>}
              <div className="sm:ml-auto">
                <RealtorCaBadge href={listing.realtorCaUrl ?? undefined} />
              </div>
            </div>

            {listing.description.length > 0 && (
              <div className="mt-8 space-y-4 text-muted-1">
                {listing.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}

            {listing.virtualTourUrl && (
              <p className="mt-6">
                <a
                  href={listing.virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-terracotta underline hover:text-terracotta-dark"
                >
                  Take the virtual tour
                </a>
              </p>
            )}

            {listing.details.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-ink">Property details</h2>
                <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {listing.details.map((detail) => (
                    <div
                      key={detail.label}
                      className="flex justify-between gap-4 border-b border-muted-3/30 pb-2 text-sm"
                    >
                      <dt className="text-muted-2">{detail.label}</dt>
                      <dd className="text-right text-ink">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {listing.rooms.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-ink">Rooms</h2>
                <div className="mt-4 space-y-6">
                  {groupRoomsByLevel(listing.rooms).map(([level, rooms]) => (
                    <div key={level}>
                      <h3 className="eyebrow text-terracotta-dark">{level}</h3>
                      <ul className="mt-2 divide-y divide-muted-3/30 text-sm">
                        {rooms.map((room, index) => (
                          <li key={`${room.type}-${index}`} className="flex justify-between gap-4 py-2">
                            <span className="text-ink">{room.type}</span>
                            {room.dimensions && (
                              <span className="text-muted-2">{room.dimensions}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-ink">Location</h2>
              <div className="mt-3 overflow-hidden rounded-card border border-muted-3/40">
                <iframe
                  title={`Map of ${fullAddress}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery(listing))}&z=14&output=embed`}
                  className="h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="mt-10">
              <MortgageCalculator initialPrice={listing.price} title="Estimate your payment" />
            </div>

            {listing.photos.length > 1 && (
              <div id="all-photos" className="mt-10 hidden scroll-mt-24 sm:block">
                <h2 className="text-xl font-semibold text-ink">
                  All photos ({listing.photos.length})
                </h2>
                <ListingPhotoGrid photos={listing.photos} alt={fullAddress} />
              </div>
            )}

            <div className="mt-10">
              <DdfDisclaimer source={listing.dataSource} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="lg:sticky lg:top-24 p-6">
              <ContactForm listingSlug={listing.slug} heading="Book a viewing" />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
