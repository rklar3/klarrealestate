import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { ContactCTA } from "@/components/home/ContactCTA";
import { siteConfig } from "@/data/site";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Client Testimonials",
  description: `What buyers and sellers in the Okanagan say about working with ${siteConfig.agentName}, ${siteConfig.agentTitle}.`,
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Testimonials", path: "/testimonials" }]),
        )}
      />

      <Section tone="ink">
        <Eyebrow tone="gold">Testimonials</Eyebrow>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">What clients say</h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          Real feedback from buyers and sellers who worked with {siteConfig.agentName} across the
          Okanagan Valley.
        </p>
      </Section>

      <Section tone="cream">
        <Testimonials />
      </Section>

      <Section tone="ink">
        <ContactCTA />
      </Section>
    </>
  );
}
