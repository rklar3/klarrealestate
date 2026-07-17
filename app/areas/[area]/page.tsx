import Image from "next/image";
import { notFound } from "next/navigation";
import { areas, getAreaBySlug } from "@/data/areas";
import { filterListings } from "@/data/listings";
import { areaFaqs } from "@/data/faqs";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ListingCard } from "@/components/listings/ListingCard";
import { FAQSection } from "@/components/faq/FAQSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return areas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }) {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    return buildMetadata({
      title: "Area not found",
      description: "This area guide could not be found.",
      path: `/areas/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `Homes for Sale in ${area.name}, BC`,
    description: `${area.tagline}. Explore what it's like living in ${area.name} and see current homes for sale.`,
    path: `/areas/${area.slug}`,
    ogImage: `/images/${area.image}.svg`,
  });
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const areaListings = filterListings({ area: area.slug });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Areas", path: "/areas" },
            { name: area.name, path: `/areas/${area.slug}` },
          ]),
        )}
      />

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink sm:aspect-[21/9]">
        <Image
          src={`/images/${area.image}.svg`}
          alt={`${area.name} — placeholder image`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="container-page absolute bottom-8 left-1/2 -translate-x-1/2">
          <Eyebrow tone="gold">{area.name}, BC</Eyebrow>
          <h1 className="mt-2 text-4xl text-cream sm:text-5xl">{area.tagline}</h1>
        </div>
      </div>

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div className="space-y-4 text-muted-1">
              {area.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-ink">Lifestyle</h2>
              <ul className="mt-4 space-y-2 text-muted-1">
                {area.lifestyle.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-terracotta">
                      &bull;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-ink">Things to do</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {area.thingsToDo.map((item) => (
                  <li key={item} className="flex gap-2 text-muted-1">
                    <span aria-hidden className="text-terracotta">
                      &bull;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-ink">Housing in {area.name}</h2>
              <p className="mt-3 text-muted-1">{area.housingContext}</p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-card bg-sand p-6">
              <p className="eyebrow text-terracotta-dark">Who it suits</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-1">
                {area.suitedFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Button href={`/listings?area=${area.slug}`} className="w-full">
              See {area.name} listings
            </Button>
            <Button href="/contact" variant="secondary" className="w-full">
              Ask about {area.name}
            </Button>
          </aside>
        </div>
      </Section>

      {areaListings.length > 0 && (
        <Section tone="sand">
          <Eyebrow>Sample listings</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">Homes in {area.name}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areaListings.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </Section>
      )}

      <FAQSection faqs={areaFaqs(area.name)} title={`${area.name} — frequently asked questions`} />

      <Section tone="ink">
        <ContactCTA />
      </Section>
    </>
  );
}
