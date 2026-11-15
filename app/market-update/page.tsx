import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { siteConfig } from "@/data/site";
import {
  ADVANTAGES,
  ANALYSES,
  salesMix,
  fmtMoney,
  fmtSigned,
  PROPERTY_TYPES,
  REPORT_MONTH,
  REPORT_PULLED,
  SOURCE_URL,
  TOTAL_RESIDENTIAL_SALES,
  type Metric,
} from "@/data/market";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Okanagan Real Estate Market Update",
  description:
    "Monthly Okanagan real estate market statistics: single family, townhouse, and condo/apartment trends for units sold, benchmark price, inventory and market balance.",
  path: "/market-update",
});

function tone(change: string, higherIs: Metric["higherIs"]) {
  if (change.startsWith("0") || higherIs === "neutral") return "text-muted-2";
  const up = change.startsWith("+");
  return up === (higherIs === "good") ? "text-success" : "text-error";
}

function Change({ label, value, higherIs }: { label: string; value: string; higherIs: Metric["higherIs"] }) {
  return (
    <span className={`tabular-nums ${tone(value, higherIs)}`}>
      {value} <span className="text-muted-3">{label}</span>
    </span>
  );
}

export default function MarketUpdatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Market Update", path: "/market-update" }]),
        )}
      />

      <PageHeader
        compact
        title="Okanagan market, by the numbers"
        action={
          <Button href={SOURCE_URL} variant="secondary">
            View the full report ↗
          </Button>
        }
      >
        <p>
          {REPORT_MONTH} · {TOTAL_RESIDENTIAL_SALES} residential sales · Association of Interior
          REALTORS® (All Regions)
        </p>
      </PageHeader>

      <Section tone="cream" tight>
        <h2 className="text-2xl sm:text-3xl">Who has the upper hand?</h2>
        <p className="mt-3 max-w-2xl text-muted-1">
          Two measures show whether buyers or sellers have leverage: how many new listings actually
          sell, and how many months it would take to clear current inventory at this pace.
        </p>
        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          {ANALYSES.map((a) => {
            const share = Math.round(a.salesToListings * 100);
            return (
              <Card key={a.title} className="p-6">
                <p className="text-sm text-muted-1">{a.title}</p>
                <p className="mt-1 font-display text-2xl font-semibold">{a.balance}</p>
                <div className="mt-4">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-muted-1">Sales-to-new-listings</span>
                    <span className="font-semibold tabular-nums">{share}%</span>
                  </div>
                  <div
                    className="relative mt-2 h-2 rounded-full bg-ink/10"
                    role="img"
                    aria-label={`Sales to new listings ratio ${share} percent`}
                  >
                    <div className="absolute inset-y-0 left-[40%] z-10 w-px bg-ink/30" />
                    <div className="absolute inset-y-0 left-[60%] z-10 w-px bg-ink/30" />
                    <div
                      className="h-2 rounded-full bg-terracotta"
                      style={{ width: `${Math.min(100, share)}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px] text-muted-2">
                    <span>Buyer&rsquo;s &lt;40%</span>
                    <span>Seller&rsquo;s &gt;60%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4 text-sm">
                  <span className="text-muted-1">Months of inventory</span>
                  <span className="font-semibold tabular-nums">{a.monthsOfInventory.toFixed(1)}</span>
                </div>
              </Card>
            );
          })}
        </div>
        <p className="mt-5 text-xs text-muted-2">
          Calculated from the reported figures using common industry thresholds (roughly 4 to 6
          months of inventory is balanced). A guide, not a forecast.
        </p>
      </Section>

      <Section tone="sand" tight>
        <h2 className="text-2xl sm:text-3xl">Buyers or sellers: who has the edge?</h2>
        <p className="mt-3 max-w-2xl text-muted-1">
          Four signals per property type: how fast listings sell, how much is for sale, price
          direction, and time on market.
        </p>
        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          {ADVANTAGES.map((adv) => {
            const accent = adv.edge === "Buyers" ? "bg-success" : adv.edge === "Sellers" ? "bg-terracotta" : "bg-muted-3";
            const tint = adv.edge === "Buyers" ? "bg-success/[0.07]" : adv.edge === "Sellers" ? "bg-terracotta/[0.07]" : "bg-ink/[0.03]";
            return (
              <Card key={adv.title} className="relative overflow-hidden">
                <span className={`absolute inset-x-0 top-0 h-1 ${accent}`} />
                <div className={`p-6 pt-7 ${tint}`}>
                  <p className="text-sm text-muted-1">{adv.title}</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">
                    {adv.edge === "Even" ? "No clear edge" : `${adv.edge} lead`}
                  </p>
                  <span className="mt-3 flex gap-1" aria-hidden>
                    {adv.signals.map((s) => (
                      <span
                        key={s.label}
                        className={`h-1.5 flex-1 rounded-full ${
                          s.favours === "buyers" ? "bg-success" : s.favours === "sellers" ? "bg-terracotta" : "bg-ink/15"
                        }`}
                      />
                    ))}
                  </span>
                  <p className="mt-1.5 text-xs text-muted-2">
                    {adv.agreeing} of {adv.total} signals favour {adv.edge.toLowerCase()}
                  </p>
                </div>
                <ul className="divide-y divide-ink/10 px-6">
                  {adv.signals.map((s) => {
                    const dot =
                      s.favours === "buyers" ? "bg-success" : s.favours === "sellers" ? "bg-terracotta" : "bg-ink/20";
                    const word = s.favours === "neither" ? "Even" : s.favours === "buyers" ? "Buyers" : "Sellers";
                    return (
                      <li key={s.label} className="flex items-center justify-between gap-4 py-3">
                        <div>
                          <p className="text-sm text-muted-1">{s.label}</p>
                          <p className="font-semibold tabular-nums text-ink">{s.value}</p>
                        </div>
                        <span className="flex items-center gap-1.5 text-xs text-muted-2">
                          <span className={`h-2 w-2 rounded-full ${dot}`} />
                          {word}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            );
          })}
        </div>
        <p className="mt-3 flex flex-wrap gap-x-4 text-xs text-muted-2">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Favours buyers</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-terracotta" /> Favours sellers</span>
        </p>
      </Section>

      <Section tone="cream" tight>
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl">What people are buying</h2>
            <p className="mt-2 text-muted-1">
              Share of the {TOTAL_RESIDENTIAL_SALES} residential sales in {REPORT_MONTH}.
            </p>
          </div>
          {(() => {
            const mix = salesMix();
            const dot = (i: number) => (i === 0 ? "bg-terracotta" : i === 1 ? "bg-success" : "bg-gold");
            return (
              <div>
                <div className="flex h-4 w-full overflow-hidden rounded-full bg-ink/10" role="img"
                  aria-label="Share of sales by property type">
                  {mix.rows.map((r, i) => (
                    <div key={r.title} className={dot(i)} style={{ width: `${r.share * 100}%` }} />
                  ))}
                </div>
                <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                  {mix.rows.map((r, i) => (
                    <li key={r.title}>
                      <p className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-1">
                        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot(i)}`} />
                        {r.title}
                      </p>
                      <p className="mt-1 font-display text-4xl font-semibold tabular-nums">
                        {Math.round(r.share * 100)}%
                      </p>
                      <p className="text-xs text-muted-2">
                        {r.sales} sold · {r.yoy} yr/yr
                      </p>
                    </li>
                  ))}
                  <li>
                    <p className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-1">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-ink/15" />
                      Other residential
                    </p>
                    <p className="mt-1 font-display text-4xl font-semibold tabular-nums text-muted-2">
                      {Math.round(mix.otherShare * 100)}%
                    </p>
                    <p className="text-xs text-muted-2">{mix.other} sold · not broken out</p>
                  </li>
                </ul>
              </div>
            );
          })()}
        </div>
      </Section>

      <Section tone="paper" tight>
        <h2 className="text-2xl sm:text-3xl">Benchmark price, then and now</h2>
        <div className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
          {ANALYSES.map((a) => {
            const max = Math.max(a.price.now, a.price.lastMonth, a.price.lastYear);
            const rows = [
              { label: "A year ago", v: a.price.lastYear, strong: false },
              { label: "Last month", v: a.price.lastMonth, strong: false },
              { label: REPORT_MONTH, v: a.price.now, strong: true },
            ];
            const delta = a.price.now - a.price.lastYear;
            return (
              <div key={a.title} className="grid gap-4 py-7 lg:grid-cols-[16rem_1fr] lg:items-center lg:gap-14">
                <div>
                  <p className="text-sm text-muted-1">{a.title}</p>
                  <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
                    {fmtSigned(delta)}
                  </p>
                  <p className="text-xs text-muted-2">vs. a year ago</p>
                </div>
                <ul className="space-y-3">
                  {rows.map((r) => (
                    <li key={r.label} className="grid grid-cols-[6.5rem_1fr_5.5rem] items-center gap-3 text-xs">
                      <span className="text-muted-1">{r.label}</span>
                      <span className="h-2 rounded-full bg-ink/10">
                        <span
                          className={`block h-2 rounded-full ${r.strong ? "bg-terracotta" : "bg-muted-3"}`}
                          style={{ width: `${(r.v / max) * 100}%` }}
                        />
                      </span>
                      <span className="text-right tabular-nums text-ink">{fmtMoney(r.v)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-xs text-muted-2">
          Earlier prices are back-calculated from the reported percentage changes, so they are
          approximate.
        </p>
      </Section>

      <Section tone="cream" tight>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="max-w-2xl text-2xl sm:text-3xl">Full detail, all regions</h2>
            <p className="mt-3 max-w-2xl text-muted-1">
              Each cell shows the figure, then change month-over-month and year-over-year. Green is
              good news for sellers, red is a headwind.
            </p>
          </div>
          <p className="text-xs text-muted-2">
            Latest report: {REPORT_MONTH} · pulled {REPORT_PULLED}
          </p>
        </div>

        <Card className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left">
            <thead>
              <tr className="border-b border-ink/10 text-sm">
                <th scope="col" className="p-4 font-normal text-muted-2">
                  <span className="sr-only">Metric</span>
                </th>
                {PROPERTY_TYPES.map((t) => (
                  <th key={t.title} scope="col" className="p-4 font-semibold text-ink">
                    {t.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {PROPERTY_TYPES[0].metrics.map((m, row) => (
                <tr key={m.label}>
                  <th scope="row" className="p-4 text-sm font-normal text-muted-1">
                    {m.label}
                  </th>
                  {PROPERTY_TYPES.map((t) => {
                    const metric = t.metrics[row];
                    return (
                      <td key={t.title} className="p-4">
                        <span className="block text-lg font-semibold tabular-nums text-ink">{metric.value}</span>
                        <span className="mt-0.5 flex gap-3 text-xs">
                          <Change label="mo" value={metric.mom} higherIs={metric.higherIs} />
                          <Change label="yr" value={metric.yoy} higherIs={metric.higherIs} />
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <Section tone="sand" tight>
        <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">
              Numbers change month to month. See the live report for current figures.
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
