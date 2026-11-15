// Association of Interior REALTORS® "All Regions" report
// (interiorrealtors.ca/market-statistics).
//
// The source site sits behind Cloudflare and blocks server-side requests, so
// it can't be fetched live. This is the single place to update each month:
// replace the values below with the newest report and the whole market page
// (month label, headline numbers, "data pulled" date) follows.

export const SOURCE_URL = "https://www.interiorrealtors.ca/market-statistics/";

export const REPORT_MONTH = "October 2026";
export const REPORT_PULLED = "November 2, 2026";
export const TOTAL_RESIDENTIAL_SALES = "1,079";

export type Metric = {
  label: string;
  value: string;
  mom: string;
  yoy: string;
  /** "up" = rising number is good news for sellers; used only for tone. */
  higherIs: "good" | "bad" | "neutral";
};

export type PropertyType = {
  title: string;
  metrics: Metric[];
};

export const PROPERTY_TYPES: PropertyType[] = [
  {
    title: "Single Family",
    metrics: [
      { label: "Sales", value: "533", mom: "-5.0%", yoy: "-20.1%", higherIs: "good" },
      { label: "Benchmark price", value: "$743,600", mom: "-3.6%", yoy: "-3.0%", higherIs: "good" },
      { label: "Days to sell", value: "76", mom: "+4.1%", yoy: "+15.2%", higherIs: "bad" },
      { label: "Inventory", value: "3,598", mom: "-8.9%", yoy: "-9.3%", higherIs: "neutral" },
      { label: "New listings", value: "902", mom: "-17.2%", yoy: "-11.7%", higherIs: "neutral" },
    ],
  },
  {
    title: "Townhouse",
    metrics: [
      { label: "Sales", value: "131", mom: "0.0%", yoy: "-9.7%", higherIs: "good" },
      { label: "Benchmark price", value: "$613,400", mom: "+3.3%", yoy: "+1.8%", higherIs: "good" },
      { label: "Days to sell", value: "70", mom: "-5.4%", yoy: "-5.4%", higherIs: "bad" },
      { label: "Inventory", value: "967", mom: "-8.7%", yoy: "-8.0%", higherIs: "neutral" },
      { label: "New listings", value: "236", mom: "-23.9%", yoy: "-24.6%", higherIs: "neutral" },
    ],
  },
  {
    title: "Condo / Apartment",
    metrics: [
      { label: "Sales", value: "168", mom: "-4.0%", yoy: "-14.7%", higherIs: "good" },
      { label: "Benchmark price", value: "$410,500", mom: "-5.6%", yoy: "-2.2%", higherIs: "good" },
      { label: "Days to sell", value: "87", mom: "-8.4%", yoy: "+7.4%", higherIs: "bad" },
      { label: "Inventory", value: "1,512", mom: "-2.5%", yoy: "-5.0%", higherIs: "neutral" },
      { label: "New listings", value: "382", mom: "+8.5%", yoy: "-6.1%", higherIs: "neutral" },
    ],
  },
];

// Derived analytics: computed from the figures above, so updating the numbers
// each month refreshes the analysis automatically.

const num = (s: string) => Number(s.replace(/[$,%+]/g, ""));
const pct = (s: string) => num(s) / 100;

export function metricOf(type: PropertyType, label: string): Metric {
  const m = type.metrics.find((x) => x.label === label);
  if (!m) throw new Error(`Missing metric: ${label}`);
  return m;
}

/** Back out the prior-month / prior-year value from the reported % change. */
export function priorValues(m: Metric) {
  const v = num(m.value);
  return { now: v, lastMonth: v / (1 + pct(m.mom)), lastYear: v / (1 + pct(m.yoy)) };
}

export type Balance = "Seller's market" | "Balanced market" | "Buyer's market";

export type TypeAnalysis = {
  title: string;
  salesToListings: number;
  monthsOfInventory: number;
  balance: Balance;
  price: ReturnType<typeof priorValues>;
};

export function analyse(type: PropertyType): TypeAnalysis {
  const sales = num(metricOf(type, "Sales").value);
  const listings = num(metricOf(type, "New listings").value);
  const inventory = num(metricOf(type, "Inventory").value);
  const snlr = sales / listings;
  // Common industry rule of thumb: <40% buyer's, 40-60% balanced, >60% seller's.
  const balance: Balance =
    snlr > 0.6 ? "Seller's market" : snlr < 0.4 ? "Buyer's market" : "Balanced market";
  return {
    title: type.title,
    salesToListings: snlr,
    monthsOfInventory: inventory / sales,
    balance,
    price: priorValues(metricOf(type, "Benchmark price")),
  };
}

export const ANALYSES = PROPERTY_TYPES.map(analyse);

export const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString("en-CA")}`;
export type Edge = "Buyers" | "Sellers" | "Even";

export type Signal = { label: string; value: string; favours: "buyers" | "sellers" | "neither" };

export type Advantage = {
  title: string;
  edge: Edge;
  /** How many of the signals point the same way as `edge`. */
  agreeing: number;
  total: number;
  signals: Signal[];
};

const signedPct = (s: string) => s.replace("-", "−");

/** Who currently has the better deal, from four independent signals. */
export function advantage(type: PropertyType): Advantage {
  const a = analyse(type);
  const price = metricOf(type, "Benchmark price");
  const dom = metricOf(type, "Days to sell");
  const priceYoy = pct(price.yoy);
  const domYoy = pct(dom.yoy);

  const signals: Signal[] = [
    {
      label: "New listings selling",
      value: `${Math.round(a.salesToListings * 100)}%`,
      favours: a.salesToListings > 0.55 ? "sellers" : a.salesToListings < 0.45 ? "buyers" : "neither",
    },
    {
      label: "Months of inventory",
      value: a.monthsOfInventory.toFixed(1),
      favours: a.monthsOfInventory < 4 ? "sellers" : a.monthsOfInventory > 6 ? "buyers" : "neither",
    },
    {
      label: "Price vs. last year",
      value: signedPct(price.yoy),
      favours: priceYoy > 0.005 ? "sellers" : priceYoy < -0.005 ? "buyers" : "neither",
    },
    {
      label: "Days to sell",
      value: `${dom.value} (${signedPct(dom.yoy)} yr)`,
      favours: domYoy < -0.02 ? "sellers" : domYoy > 0.02 ? "buyers" : "neither",
    },
  ];

  const b = signals.filter((s) => s.favours === "buyers").length;
  const s = signals.filter((x) => x.favours === "sellers").length;
  const edge: Edge = b > s ? "Buyers" : s > b ? "Sellers" : "Even";
  return {
    title: type.title,
    edge,
    agreeing: edge === "Buyers" ? b : edge === "Sellers" ? s : Math.max(b, s),
    total: signals.length,
    signals,
  };
}

export const ADVANTAGES = PROPERTY_TYPES.map(advantage);

/** What is actually selling: each type's share of all residential sales. */
export function salesMix() {
  const total = num(TOTAL_RESIDENTIAL_SALES);
  const rows = PROPERTY_TYPES.map((t) => {
    const sales = metricOf(t, "Sales");
    const n = num(sales.value);
    return { title: t.title, sales: n, share: n / total, yoy: sales.yoy, price: metricOf(t, "Benchmark price").value };
  });
  const counted = rows.reduce((sum, r) => sum + r.sales, 0);
  const other = Math.max(0, total - counted);
  return { total, rows, other, otherShare: other / total };
}

export const fmtSigned = (n: number) =>
  `${n >= 0 ? "+" : "-"}$${Math.abs(Math.round(n)).toLocaleString("en-CA")}`;
