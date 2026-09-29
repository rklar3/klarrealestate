"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { OWN_LISTINGS_QUERY, siteConfig } from "@/data/site";

const PRICE_OPTIONS = [
  { label: "Any price", value: "" },
  { label: "Under $600,000", value: "600000" },
  { label: "Under $900,000", value: "900000" },
  { label: "Under $1,200,000", value: "1200000" },
  { label: "Under $2,000,000", value: "2000000" },
];

const BEDS_OPTIONS = [
  { label: "Any beds", value: "" },
  { label: "2+ beds", value: "2" },
  { label: "3+ beds", value: "3" },
  { label: "4+ beds", value: "4" },
  { label: "5+ beds", value: "5" },
];

const TYPE_OPTIONS = [
  { label: "Any type", value: "" },
  { label: "House", value: "House" },
  { label: "Condo", value: "Condo" },
  { label: "Townhome", value: "Townhome" },
  { label: "Land", value: "Land" },
];

const AREA_OPTIONS = [
  { label: "All areas", value: "" },
  ...siteConfig.serviceAreas.map((area) => ({ label: area.name, value: area.slug })),
];

const FILTER_KEYS = ["area", "maxPrice", "beds", "type"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

const FILTERS: { key: FilterKey; label: string; options: { label: string; value: string }[] }[] = [
  { key: "area", label: "Area", options: AREA_OPTIONS },
  { key: "maxPrice", label: "Max price", options: PRICE_OPTIONS },
  { key: "beds", label: "Bedrooms", options: BEDS_OPTIONS },
  { key: "type", label: "Property type", options: TYPE_OPTIONS },
];

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-2"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ListingFilters({ counts }: { counts: { all: number; own: number } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ownOnly = searchParams.get("agent") === OWN_LISTINGS_QUERY.agent;
  const firstName = siteConfig.agentName.split(" ")[0];

  function hrefWith(changes: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    return `/listings${query ? `?${query}` : ""}`;
  }

  function updateParam(key: FilterKey, value: string) {
    router.push(hrefWith({ [key]: value }), { scroll: false });
  }

  const hasFilters = FILTER_KEYS.some((key) => searchParams.get(key));

  const views = [
    { label: "All listings", count: counts.all, active: !ownOnly, href: hrefWith({ agent: null }) },
    {
      label: `${firstName}'s listings`,
      count: counts.own,
      active: ownOnly,
      href: hrefWith({ agent: OWN_LISTINGS_QUERY.agent }),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav
          aria-label="Listing view"
          className="inline-flex rounded-full border border-muted-3/40 bg-paper p-1"
        >
          {views.map((view) => (
            <Link
              key={view.label}
              href={view.href}
              scroll={false}
              aria-current={view.active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                view.active ? "bg-ink text-cream" : "text-muted-1 hover:text-ink",
              )}
            >
              {view.label}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs tabular-nums",
                  view.active ? "bg-cream/15 text-cream" : "bg-sand text-muted-1",
                )}
              >
                {view.count}
              </span>
            </Link>
          ))}
        </nav>

        {hasFilters && (
          <Link
            href={hrefWith(Object.fromEntries(FILTER_KEYS.map((key) => [key, null])))}
            scroll={false}
            className="text-sm font-semibold text-terracotta underline-offset-4 hover:text-terracotta-dark hover:underline"
          >
            Clear filters
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {FILTERS.map((filter) => {
          const value = searchParams.get(filter.key) ?? "";
          return (
            <div key={filter.key} className="relative">
              <label htmlFor={`f-${filter.key}`} className="sr-only">
                {filter.label}
              </label>
              <select
                id={`f-${filter.key}`}
                value={value}
                onChange={(e) => updateParam(filter.key, e.target.value)}
                className={cn(
                  "w-full cursor-pointer appearance-none rounded-control border bg-paper py-3 pl-4 pr-10 text-sm transition-colors",
                  "hover:border-muted-2 focus-visible:border-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/25",
                  value ? "border-ink/40 font-semibold text-ink" : "border-muted-3/50 text-muted-1",
                )}
              >
                {filter.options.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          );
        })}
      </div>
    </div>
  );
}
