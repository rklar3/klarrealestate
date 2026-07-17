"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  "w-full rounded-control border border-muted-3/50 bg-paper px-4 py-3 text-sm text-ink";

export function ListingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/listings${params.toString() ? `?${params.toString()}` : ""}`);
  }

  const hasFilters = ["area", "maxPrice", "beds", "type"].some((key) => searchParams.get(key));

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div>
        <label htmlFor="f-area" className="sr-only">
          Area
        </label>
        <select
          id="f-area"
          className={selectClass}
          value={searchParams.get("area") ?? ""}
          onChange={(e) => updateParam("area", e.target.value)}
        >
          <option value="">All areas</option>
          {siteConfig.serviceAreas.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-price" className="sr-only">
          Max price
        </label>
        <select
          id="f-price"
          className={selectClass}
          value={searchParams.get("maxPrice") ?? ""}
          onChange={(e) => updateParam("maxPrice", e.target.value)}
        >
          {PRICE_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-beds" className="sr-only">
          Bedrooms
        </label>
        <select
          id="f-beds"
          className={selectClass}
          value={searchParams.get("beds") ?? ""}
          onChange={(e) => updateParam("beds", e.target.value)}
        >
          {BEDS_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-type" className="sr-only">
          Property type
        </label>
        <select
          id="f-type"
          className={selectClass}
          value={searchParams.get("type") ?? ""}
          onChange={(e) => updateParam("type", e.target.value)}
        >
          {TYPE_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => router.push("/listings")}
        disabled={!hasFilters}
        className="rounded-control border border-muted-3/50 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink disabled:opacity-40"
      >
        Clear filters
      </button>
    </div>
  );
}
