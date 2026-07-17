import { Hero } from "@/components/home/Hero";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { MeetSanam } from "@/components/home/MeetSanam";
import { ServiceAreaTiles } from "@/components/home/ServiceAreaTiles";
import { BuySellSplit } from "@/components/home/BuySellSplit";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { ContactCTA } from "@/components/home/ContactCTA";
import { FAQSection } from "@/components/faq/FAQSection";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";
import { buildMetadata, jsonLdScript, realEstateAgentJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sanam Klar, REALTOR® — Okanagan Real Estate",
  description:
    "Buy or sell a home in Kelowna, West Kelowna, Penticton, Vernon, or Summerland with Sanam Klar, REALTOR® with Oakwyn Realty. Local guidance, real answers, and a clear path forward.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(realEstateAgentJsonLd())}
      />
      <Hero />
      <Section tone="cream">
        <FeaturedListings />
      </Section>
      <Section tone="sand">
        <MeetSanam />
      </Section>
      <Section tone="cream">
        <ServiceAreaTiles />
      </Section>
      <Section tone="sand">
        <BuySellSplit />
      </Section>
      <Section tone="cream">
        <Testimonials />
      </Section>
      <FAQSection faqs={homeFaqs} tone="sand" />
      <Section tone="ink">
        <ContactCTA />
      </Section>
    </>
  );
}
