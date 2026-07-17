import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FAQSection } from "@/components/faq/FAQSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { sellFaqs } from "@/data/faqs";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Selling Your Okanagan Home",
  description:
    "A clear look at what it takes to sell a home in Kelowna, West Kelowna, Penticton, Vernon, or Summerland, BC — pricing, marketing, staging, and the process end to end.",
  path: "/sell",
});

const STEPS = [
  {
    title: "Pricing consultation",
    body: "A walkthrough of your home alongside current comparable sales and active competition to land on a realistic, well-supported list price.",
  },
  {
    title: "Prepare & stage",
    body: "Recommendations on decluttering, repairs, and staging scaled to your property — not a one-size-fits-all checklist.",
  },
  {
    title: "Go to market",
    body: "Professional photography, an optimized MLS® listing, and targeted promotion to reach serious buyers, not just browsers.",
  },
  {
    title: "Showings & offers",
    body: "Coordinated, organized showings and a clear-eyed read on incoming offers — including which subject clauses matter and which don't.",
  },
  {
    title: "Negotiate & go firm",
    body: "Negotiation on price and terms, then supporting the buyer's subject removal process so the deal closes on schedule.",
  },
  {
    title: "Complete",
    body: "Your lawyer or notary finalizes the legal transfer on completion day, and proceeds are released after registration.",
  },
];

export default function SellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Sell", path: "/sell" }]))}
      />

      <Section tone="ink">
        <Eyebrow tone="gold">For sellers</Eyebrow>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Selling your Okanagan home</h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          A clear plan for pricing, preparing, and marketing your home — with a realistic view of
          what to expect at each stage.
        </p>
        <div className="mt-8">
          <Button href="/home-valuation" size="lg">
            Get a free home valuation
          </Button>
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>The process</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">Step by step</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <Card key={step.title} className="p-6">
              <p className="font-display text-3xl text-terracotta">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-semibold text-ink">{step.title}</p>
              <p className="mt-2 text-sm text-muted-1">{step.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Marketing approach</Eyebrow>
            <h2 className="mt-3 text-3xl">How your home gets seen</h2>
            <ul className="mt-6 space-y-3 text-muted-1">
              <li>Professional photography for every listing.</li>
              <li>MLS® listing written and optimized to stand out in search.</li>
              <li>Targeted promotion across social channels.</li>
              <li>Coordinated, well-organized showings.</li>
            </ul>
          </div>

          <div>
            <Eyebrow>Pricing & staging</Eyebrow>
            <h2 className="mt-3 text-3xl">Getting the details right</h2>
            <p className="mt-4 text-muted-1">
              Pricing is grounded in recent comparable sales and current active competition in
              your specific neighbourhood — not a generic valuation tool. Staging and prep
              recommendations are tailored to your property and budget, focused on the changes
              that actually move the needle on showings and offers.
            </p>
            <Button href="/home-valuation" variant="secondary" className="mt-6">
              What&rsquo;s my home worth?
            </Button>
          </div>
        </div>
      </Section>

      <FAQSection faqs={sellFaqs} title="Selling — frequently asked questions" />

      <Section tone="ink">
        <ContactCTA />
      </Section>
    </>
  );
}
