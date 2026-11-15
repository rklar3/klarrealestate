import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
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

      <PageHeader title={<>What clients say</>}>
        <p>
          Real feedback from buyers and sellers who worked with {siteConfig.agentName} across the
          Okanagan Valley.
        </p>
</PageHeader>

      <Section tone="cream">
        <Testimonials />
      </Section>

      <Section tone="ink">
        <ContactCTA />
      </Section>
    </>
  );
}
