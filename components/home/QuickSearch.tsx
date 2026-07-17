import { siteConfig } from "@/data/site";

const PRICE_OPTIONS = [
  { label: "Any price", value: "" },
  { label: "Under $600,000", value: "600000" },
  { label: "Under $900,000", value: "900000" },
  { label: "Under $1,200,000", value: "1200000" },
  { label: "Under $2,000,000", value: "2000000" },
];

const BEDS_OPTIONS = [
  { label: "Any beds", value: "" },
  { label: "2+", value: "2" },
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
  { label: "5+", value: "5" },
];

const TYPE_OPTIONS = [
  { label: "Any type", value: "" },
  { label: "House", value: "House" },
  { label: "Condo", value: "Condo" },
  { label: "Townhome", value: "Townhome" },
];

const selectClass =
  "w-full rounded-control border border-ink/10 bg-white/95 px-4 py-3 text-sm text-ink focus-visible:outline-terracotta";

export function QuickSearch() {
  return (
    <form
      method="get"
      action="/listings"
      className="grid gap-3 rounded-card bg-white/10 p-4 backdrop-blur sm:grid-cols-2 lg:grid-cols-5"
    >
      <div className="sm:col-span-2 lg:col-span-1">
        <label htmlFor="qs-area" className="sr-only">
          Area
        </label>
        <select id="qs-area" name="area" defaultValue="" className={selectClass}>
          <option value="">All areas</option>
          {siteConfig.serviceAreas.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="qs-price" className="sr-only">
          Max price
        </label>
        <select id="qs-price" name="maxPrice" defaultValue="" className={selectClass}>
          {PRICE_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="qs-beds" className="sr-only">
          Bedrooms
        </label>
        <select id="qs-beds" name="beds" defaultValue="" className={selectClass}>
          {BEDS_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="qs-type" className="sr-only">
          Property type
        </label>
        <select id="qs-type" name="type" defaultValue="" className={selectClass}>
          {TYPE_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="rounded-control bg-terracotta px-4 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-dark"
      >
        Search listings
      </button>
    </form>
  );
}
