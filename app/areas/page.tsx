import Image from "next/image";
import Link from "next/link";
import { areas } from "@/data/areas";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Okanagan Valley Area Guides",
  description:
    "Neighbourhood and community guides for Kelowna, West Kelowna, Penticton, Vernon, and Summerland, BC — lifestyle, amenities, and what each area suits.",
  path: "/areas",
});

export default function AreasIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Areas", path: "/areas" }]))}
      />

      <Section tone="ink">
        <Eyebrow tone="gold">Area guides</Eyebrow>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Okanagan Valley communities</h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          Each Okanagan community has its own character. Explore the guides below to see what
          fits your lifestyle and budget.
        </p>
      </Section>

      <Section tone="cream">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Card key={area.slug} className="overflow-hidden">
              <Link href={`/areas/${area.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={`/images/${area.image}.svg`}
                    alt={`${area.name} — placeholder image`}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-2xl text-ink">{area.name}</p>
                  <p className="mt-1 text-sm text-muted-1">{area.tagline}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
