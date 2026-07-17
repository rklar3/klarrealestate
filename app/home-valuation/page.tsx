import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { ValuationForm } from "@/components/forms/ValuationForm";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Home Valuation",
  description:
    "Get a free, no-obligation home valuation estimate for your Okanagan property from Sanam Klar, REALTOR® with Oakwyn Realty.",
  path: "/home-valuation",
});

export default function HomeValuationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Free Home Valuation", path: "/home-valuation" }]),
        )}
      />

      <Section tone="ink">
        <Eyebrow tone="gold">Free home valuation</Eyebrow>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">What&rsquo;s your Okanagan home worth?</h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          Answer a few quick questions and Sanam will follow up with a grounded estimate based on
          current comparable sales in your neighbourhood — no obligation.
        </p>
      </Section>

      <Section tone="cream">
        <div className="mx-auto max-w-2xl">
          <Card className="p-6 sm:p-10">
            <ValuationForm />
          </Card>
        </div>
      </Section>
    </>
  );
}
