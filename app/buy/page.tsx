import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";
import { FAQSection } from "@/components/faq/FAQSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { buyFaqs } from "@/data/faqs";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Buying a Home in the Okanagan",
  description:
    "A step-by-step guide to buying a home in Kelowna, West Kelowna, Penticton, Vernon, or Summerland, BC — financing basics, the offer process, and what to expect.",
  path: "/buy",
});

const STEPS = [
  {
    title: "Get pre-approved",
    body: "A mortgage pre-approval tells you what you can actually afford and signals to sellers that you're a serious buyer. This is the first real step, before touring homes.",
  },
  {
    title: "Define your search",
    body: "Narrow down the areas, price range, and must-haves so viewings are focused rather than overwhelming. This is also where local area guidance matters most.",
  },
  {
    title: "Tour properties",
    body: "See homes in person (or virtually, if you're relocating) and get a straightforward read on condition, value, and fit — not just a sales pitch.",
  },
  {
    title: "Make an offer",
    body: "Offers in BC typically include subject clauses (financing, inspection, strata document review) that protect you before the deal becomes firm.",
  },
  {
    title: "Remove subjects & finalize financing",
    body: "Once inspections and financing are confirmed, subjects are removed and the deal becomes firm. Your lender finalizes mortgage details during this window.",
  },
  {
    title: "Complete and take possession",
    body: "A lawyer or notary handles the legal transfer on the completion date, and possession follows — typically within a day or two.",
  },
];

export default function BuyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Buy", path: "/buy" }]))}
      />

      <Section tone="ink">
        <Eyebrow tone="gold">For buyers</Eyebrow>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Buying in the Okanagan</h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          Whether it&rsquo;s your first home or your fifth, here&rsquo;s what the process actually looks like
          — and how a local REALTOR® fits into it.
        </p>
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
            <Eyebrow>First-time buyers</Eyebrow>
            <h2 className="mt-3 text-3xl">Programs worth knowing about</h2>
            <ul className="mt-6 space-y-4 text-muted-1">
              <li>
                <strong className="text-ink">BC First Time Home Buyers&rsquo; Program —</strong> can
                reduce or eliminate the Property Transfer Tax on a qualifying first purchase.
              </li>
              <li>
                <strong className="text-ink">First Home Savings Account (FHSA) —</strong> a
                federal registered account combining tax-deductible contributions with tax-free
                withdrawals for a first home.
              </li>
              <li>
                <strong className="text-ink">Home Buyers&rsquo; Plan (HBP) —</strong> allows eligible
                buyers to withdraw from an RRSP toward a down payment, repayable over time.
              </li>
            </ul>
            <p className="mt-6 text-sm text-muted-2">
              Program details and eligibility change periodically — confirm current specifics with
              a mortgage professional before relying on them.
            </p>
          </div>

          <div>
            <Eyebrow>Why work with a local agent</Eyebrow>
            <h2 className="mt-3 text-3xl">What a REALTOR® actually does for you</h2>
            <ul className="mt-6 space-y-3 text-muted-1">
              <li>Access to full MLS® inventory, including homes not yet widely advertised.</li>
              <li>Local pricing knowledge specific to each Okanagan neighbourhood.</li>
              <li>Negotiation on your behalf, from initial offer through closing.</li>
              <li>Coordination of inspections, timelines, and paperwork.</li>
              <li>In most BC transactions, buyer representation costs the buyer nothing directly.</li>
            </ul>
            <Button href="/contact" className="mt-8">
              Start the conversation
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>Financing basics</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">Estimate a monthly payment</h2>
        <p className="mt-4 max-w-2xl text-muted-1">
          Get a rough sense of what a given price point could mean monthly. This is an estimate
          only — talk to a mortgage professional for an exact number.
        </p>
        <div className="mt-8 max-w-xl">
          <MortgageCalculator />
        </div>
      </Section>

      <FAQSection faqs={buyFaqs} title="Buying — frequently asked questions" />

      <Section tone="ink">
        <ContactCTA />
      </Section>
    </>
  );
}
