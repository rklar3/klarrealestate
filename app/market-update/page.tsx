import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { siteConfig } from "@/data/site";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Okanagan Real Estate Market Update",
  description:
    "Monthly Okanagan real estate market statistics — single family, townhouse, and condo/apartment trends for units sold, benchmark price, and inventory.",
  path: "/market-update",
});

const SOURCE_URL = "https://www.interiorrealtors.ca/market-statistics/";

// Pulled by hand from the Association of Interior REALTORS® "All Regions"
// report (interiorrealtors.ca/market-statistics). Update this block each
// month when the new report is published — it is not fetched live.
const REPORT_MONTH = "August 2026";
const REPORT_PULLED = "September 1, 2026";
const TOTAL_RESIDENTIAL_SALES = "1,141";

type Metric = {
  label: string;
  value: string;
  mom: string;
  yoy: string;
};

type PropertyType = {
  title: string;
  metrics: Metric[];
};

const PROPERTY_TYPES: PropertyType[] = [
  {
    title: "Single Family",
    metrics: [
      { label: "Sales", value: "581", mom: "-24.6%", yoy: "-9.5%" },
      { label: "Benchmark price", value: "$781,200", mom: "-0.5%", yoy: "-0.5%" },
      { label: "Days to sell", value: "73", mom: "+19.7%", yoy: "+10.6%" },
      { label: "Inventory", value: "4,036", mom: "-3.8%", yoy: "-11.3%" },
      { label: "New listings", value: "958", mom: "-22.6%", yoy: "-20.0%" },
    ],
  },
  {
    title: "Townhouse",
    metrics: [
      { label: "Sales", value: "121", mom: "-29.7%", yoy: "-20.4%" },
      { label: "Benchmark price", value: "$592,700", mom: "-1.6%", yoy: "-4.3%" },
      { label: "Days to sell", value: "108", mom: "+58.8%", yoy: "+74.2%" },
      { label: "Inventory", value: "1,038", mom: "-2.9%", yoy: "-1.1%" },
      { label: "New listings", value: "255", mom: "-11.5%", yoy: "-14.7%" },
    ],
  },
  {
    title: "Condo / Apartment",
    metrics: [
      { label: "Sales", value: "182", mom: "-11.2%", yoy: "-14.2%" },
      { label: "Benchmark price", value: "$416,300", mom: "-2.7%", yoy: "-1.6%" },
      { label: "Days to sell", value: "92", mom: "+8.2%", yoy: "+7.0%" },
      { label: "Inventory", value: "1,592", mom: "-0.5%", yoy: "-10.2%" },
      { label: "New listings", value: "354", mom: "-20.1%", yoy: "-15.1%" },
    ],
  },
];

export default function MarketUpdatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Market Update", path: "/market-update" }]),
        )}
      />

      <div className="relative isolate -mt-20 overflow-hidden bg-ink text-cream">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0f2a30 0%, #14424a 38%, #1c6070 68%, #2c8a94 100%)",
          }}
        />
        {/* Soft horizon "lake" bands, drawn instead of a stock photo so it stays crisp and license-free. */}
        <svg
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 w-full text-ink-deep/40 sm:h-56"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120 C 240 170, 480 70, 720 110 C 960 150, 1200 80, 1440 130 L1440 220 L0 220 Z"
            fill="currentColor"
          />
        </svg>
        <svg
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-28 w-full text-ink-deep/60 sm:h-40"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0 90 C 260 40, 520 130, 780 80 C 1040 30, 1260 110, 1440 60 L1440 160 L0 160 Z"
            fill="currentColor"
          />
        </svg>

        <div className="container-page relative pb-20 pt-44 sm:pb-28 sm:pt-52">
          <Eyebrow tone="gold">Market Update — {REPORT_MONTH}</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">
            Okanagan real estate, by the numbers
          </h1>
          <p className="mt-4 max-w-2xl text-cream/80">
            {TOTAL_RESIDENTIAL_SALES} residential sales across the Okanagan in {REPORT_MONTH} — units
            sold, benchmark pricing, and inventory by property type, sourced from the Association
            of Interior REALTORS® (All Regions).
          </p>
          <div className="mt-8">
            <Button href={SOURCE_URL} variant="primary" size="lg">
              View the full market report
            </Button>
          </div>
        </div>
      </div>

      <Section tone="cream">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>By property type</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
              {REPORT_MONTH}, all regions
            </h2>
            <p className="mt-3 max-w-2xl text-muted-1">
              Detached, attached, and condo markets don&rsquo;t always move together. Here&rsquo;s
              how each performed last month vs. the month before and the year before.
            </p>
          </div>
          <p className="text-xs text-muted-2">Data pulled {REPORT_PULLED}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PROPERTY_TYPES.map((type) => (
            <Card key={type.title} className="p-6">
              <h3 className="text-lg font-semibold text-ink">{type.title}</h3>
              <dl className="mt-4 divide-y divide-ink/10">
                {type.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between gap-3 py-3">
                    <dt className="text-sm text-muted-1">{metric.label}</dt>
                    <dd className="text-right">
                      <span className="block text-base font-semibold text-ink">{metric.value}</span>
                      <span className="block text-xs text-muted-2">
                        {metric.mom} mo/mo · {metric.yoy} yr/yr
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">
              Numbers change month to month — see the live report for current figures.
            </p>
            <p className="mt-1 text-sm text-muted-1">
              Published by the Association of Interior REALTORS®.
            </p>
          </div>
          <Button href={SOURCE_URL} variant="secondary">
            Open live report ↗
          </Button>
        </Card>
      </Section>

      <Section tone="cream">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>Curious what this means for you</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">Not sure how to read the trends?</h2>
          <p className="mt-4 text-muted-1">
            {siteConfig.agentName} can walk you through what these numbers actually mean for your
            street, your timeline, and your budget.
          </p>
        </div>
      </Section>

      <Section tone="ink">
        <ContactCTA />
      </Section>
    </>
  );
}
