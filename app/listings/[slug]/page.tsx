import Image from "next/image";
import { notFound } from "next/navigation";
import { getListingBySlug, getListings } from "@/data/listings";
import { formatCurrencyCAD } from "@/lib/mortgage";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript, residenceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getListings().map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);

  if (!listing) {
    return buildMetadata({
      title: "Listing not found",
      description: "This listing is no longer available.",
      path: `/listings/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${listing.address} | ${formatCurrencyCAD(listing.price)}`,
    description: listing.summary,
    path: `/listings/${listing.slug}`,
    ogImage: `/images/${listing.image}.svg`,
  });
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

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
            { name: listing.address, path: `/listings/${listing.slug}` },
          ]),
        )}
      />

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink sm:aspect-[21/9]">
        <Image
          src={`/images/${listing.image}.svg`}
          alt={`${listing.address} — placeholder image`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <span className="absolute left-6 top-6 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
          {listing.status}
        </span>
      </div>

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Eyebrow>{listing.areaLabel}</Eyebrow>
            <h1 className="mt-3 text-3xl sm:text-4xl">{listing.address}</h1>
            <p className="mt-2 font-display text-3xl text-terracotta">
              {formatCurrencyCAD(listing.price)}
            </p>
            <div className="mt-4 flex gap-6 text-muted-1">
              <span>{listing.beds} bd</span>
              <span>{listing.baths} ba</span>
              <span>{listing.sqft.toLocaleString("en-CA")} sqft</span>
              <span>{listing.type}</span>
            </div>

            <div className="mt-8 space-y-4 text-muted-1">
              {listing.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-ink">Key features</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {listing.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-muted-1">
                    <span aria-hidden className="mt-1 text-terracotta">
                      &bull;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-ink">Location</h2>
              <div className="mt-3 overflow-hidden rounded-card border border-muted-3/40">
                <iframe
                  title={`Map of ${listing.areaLabel}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${listing.areaLabel}, BC`,
                  )}&output=embed`}
                  className="h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="mt-10">
              <MortgageCalculator initialPrice={listing.price} title="Estimate your payment" />
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
