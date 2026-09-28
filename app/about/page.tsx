import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { ContactCTA } from "@/components/home/ContactCTA";
import { siteConfig } from "@/data/site";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript, personJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Sanam Klar, REALTOR®",
  description: `Meet ${siteConfig.agentName}, a ${siteConfig.agentTitle} with ${siteConfig.brokerageFull} serving buyers and sellers across the Okanagan Valley.`,
  path: "/about",
  ogImage: "/images/sanam-headshot.jpg",
});

const VALUES = [
  {
    title: "Straightforward guidance",
    body: "Clear answers about pricing, process, and timelines — including when the honest answer is 'wait' or 'that's a stretch.'",
  },
  {
    title: "Local knowledge, block by block",
    body: "Every Okanagan community is different. Recommendations are grounded in what's actually happening in the specific neighbourhood you're looking at.",
  },
  {
    title: "Respect for your time",
    body: "Organized showings, responsive communication, and a process built around your schedule, not the other way around.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(personJsonLd())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "About", path: "/about" }]))}
      />

      <Section tone="ink">
        <Eyebrow tone="gold">About</Eyebrow>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">
          {siteConfig.agentName}, {siteConfig.agentTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-cream/80">{siteConfig.brokerageFull}</p>
      </Section>

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card lg:col-span-1">
            <Image
              src="/images/sanam-headshot.jpg"
              alt="Sanam Klar, REALTOR®"
              fill
              sizes="(min-width: 1024px) 340px, 90vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-2">
            {/* TODO: real bio — the paragraphs below are a placeholder draft
                written to a reasonable tone/length. Replace with Sanam's
                actual background, credentials, and any awards before launch;
                do not treat this copy as verified fact. */}
            <div className="space-y-4 text-muted-1">
              <p>
                Sanam Klar is a REALTOR® with {siteConfig.brokerageFull}, working with buyers and
                sellers throughout the Okanagan Valley — including Kelowna, West Kelowna,
                Penticton, Vernon, and Summerland.
              </p>
              <p>
                Her approach centers on being genuinely useful before being persuasive: helping
                clients understand what a given budget actually buys in a specific neighbourhood,
                what a fair offer looks like, and what to expect at each stage of a transaction.
              </p>
              <p>
                Sanam works with a range of clients — first-time buyers navigating the process for
                the first time, move-up families, downsizers, and out-of-town buyers relocating to
                the valley — and tailors the level of hand-holding to what each client actually
                wants.
              </p>
            </div>

            <div className="mt-8">
              <p className="eyebrow text-terracotta-dark">Education</p>
              <p className="mt-2 text-sm text-muted-1">
                University of British Columbia — Bachelor of Applied Science (BASc), Electrical
                Engineering, 2014–2018
              </p>
              {/* TODO: confirm licensing details, years of real-estate experience, and any
                  awards or professional designations (e.g. from Oakwyn or BCREA) before launch. */}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {VALUES.map((value) => (
                <Card key={value.title} className="p-5">
                  <p className="font-semibold text-ink">{value.title}</p>
                  <p className="mt-2 text-sm text-muted-1">{value.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <ContactCTA />
      </Section>
    </>
  );
}
