import { unstable_cache } from "next/cache";
import { siteConfig, type ServiceAreaSlug } from "@/data/site";
import {
  fetchDdfMembers,
  fetchDdfOffice,
  fetchDdfProperties,
  isDdfConfigured,
  type DdfMember,
  type DdfProperty,
} from "@/lib/ddf";

export type PropertyType = "House" | "Condo" | "Townhome" | "Land" | "Other";

export type ListingDetail = { label: string; value: string };

export type ListingRoom = { level: string; type: string; dimensions: string | null };

export type Listing = {
  slug: string;
  listingKey: string;
  mlsNumber: string;
  badge: string | null;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  lotSize: string | null;
  address: string;
  addressHidden: boolean;
  city: string;
  province: string;
  area: ServiceAreaSlug | null;
  type: PropertyType;
  typeLabel: string;
  summary: string;
  description: string[];
  details: ListingDetail[];
  rooms: ListingRoom[];
  photos: string[];
  virtualTourUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  listedAt: string | null;
  updatedAt: string | null;
  isOwnListing: boolean;
  listAgentName: string | null;
  listOfficeName: string | null;
  realtorCaUrl: string | null;
  dataSource: string | null;
};

// Live inventory comes from Sanam's CREA DDF® feed ("Member Website Feed - One
// or More Offices"), refreshed hourly. DDF rules require removed listings to
// disappear promptly, so the cache is time-bounded rather than build-time only.
const REVALIDATE_SECONDS = 3600;
const JUST_LISTED_DAYS = 14;
const SQFT_PER_SQM = 10.7639;

function titleCaseShouting(value: string): string {
  // Board data often arrives as "1010 GILKER Street"; soften all-caps words
  // (3+ letters) without touching short tokens like "NE" or "RR".
  return value.replace(/\b[A-Z]{3,}\b/g, (word) => word[0] + word.slice(1).toLowerCase());
}

function formatAddress(p: DdfProperty): string {
  let address = titleCaseShouting((p.UnparsedAddress ?? "").trim());
  // "6370 Park Drive Unit# 11" -> "11-6370 Park Drive" (Canadian convention).
  const unitMatch = address.match(/^(.*?)\s+Unit#\s*(\S+)$/i);
  if (unitMatch) address = `${unitMatch[2]}-${unitMatch[1]}`;
  return address;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPropertyType(p: DdfProperty): PropertyType {
  const structures = p.StructureType ?? [];
  if (p.PropertySubType === "Vacant Land") return "Land";
  if (structures.includes("Apartment")) return "Condo";
  if (structures.includes("Row / Townhouse")) return "Townhome";
  if (structures.some((s) => ["House", "Duplex", "Manufactured Home", "Mobile Home"].includes(s))) {
    return "House";
  }
  if (p.CommonInterest === "Condo/Strata") return "Condo";
  return "Other";
}

function toArea(city: string): ServiceAreaSlug | null {
  const match = siteConfig.serviceAreas.find(
    (area) => area.name.toLowerCase() === city.toLowerCase(),
  );
  return match?.slug ?? null;
}

function toSqft(p: DdfProperty): number | null {
  if (!p.LivingArea) return null;
  const units = p.LivingAreaUnits?.toLowerCase() ?? "square feet";
  if (units.includes("met")) return Math.round(p.LivingArea * SQFT_PER_SQM);
  if (units.includes("feet")) return Math.round(p.LivingArea);
  return null;
}

function toLotSize(p: DdfProperty): string | null {
  if (p.LotSizeArea && p.LotSizeUnits) {
    return `${p.LotSizeArea.toLocaleString("en-CA")} ${p.LotSizeUnits}`;
  }
  return p.LotSizeDimensions?.trim() || null;
}

function toSummary(remarks: string): string {
  const firstSentence = remarks.match(/^.{40,200}?[.!?](\s|$)/)?.[0]?.trim();
  if (firstSentence) return firstSentence;
  return remarks.length > 160 ? `${remarks.slice(0, 157).trimEnd()}…` : remarks;
}

function list(values: string[] | null | undefined): string | null {
  const cleaned = (values ?? []).filter((v) => v && v !== "Unknown");
  return cleaned.length > 0 ? cleaned.join(", ") : null;
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function toDetails(p: DdfProperty, typeLabel: string, sqft: number | null, lotSize: string | null) {
  const details: Array<[string, string | null]> = [
    ["Property type", list(p.StructureType) ?? typeLabel],
    ["Ownership", p.CommonInterest],
    ["Year built", p.YearBuilt ? String(p.YearBuilt) : null],
    ["Living area", sqft ? `${sqft.toLocaleString("en-CA")} sqft` : null],
    ["Lot size", lotSize],
    ["Storeys", p.Stories ? String(p.Stories) : null],
    ["Basement", list(p.Basement)],
    ["Heating", list(p.Heating)],
    ["Cooling", list(p.Cooling)],
    ["Fireplace", list(p.FireplaceFeatures)],
    [
      "Parking",
      list(p.ParkingFeatures) ??
        (p.ParkingTotal ? `${p.ParkingTotal} space${p.ParkingTotal === 1 ? "" : "s"}` : null),
    ],
    ["View", list(p.View)],
    ["Waterfront", list(p.WaterfrontFeatures)],
    ["Pool", list(p.PoolFeatures)],
    [
      "Strata fee",
      p.AssociationFee
        ? `${formatMoney(p.AssociationFee)}${p.AssociationFeeFrequency ? ` / ${p.AssociationFeeFrequency.toLowerCase()}` : ""}`
        : null,
    ],
    [
      "Property taxes",
      p.TaxAnnualAmount
        ? `${formatMoney(p.TaxAnnualAmount)}${p.TaxYear ? ` (${p.TaxYear})` : ""}`
        : null,
    ],
    ["Zoning", p.Zoning],
    ["Water", list(p.WaterSource)],
    ["Sewer", list(p.Sewer)],
    ["MLS® number", p.ListingId],
  ];

  return details
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([label, value]) => ({ label, value }));
}

function memberName(member: DdfMember | undefined): string | null {
  if (!member) return null;
  const first = member.MemberNickname || member.MemberFirstName;
  return [first, member.MemberLastName].filter(Boolean).join(" ") || null;
}

function toListing(
  p: DdfProperty,
  members: Map<string, DdfMember>,
  offices: Map<string, string>,
): Listing | null {
  if (p.InternetEntireListingDisplayYN === false || p.ListPrice == null) return null;

  const city = p.City?.trim() || "British Columbia";
  const addressHidden = p.InternetAddressDisplayYN === false;
  const address = addressHidden ? `${city} (address on request)` : formatAddress(p) || city;
  const type = toPropertyType(p);
  const typeLabel = type === "Other" ? p.PropertySubType || "Property" : type;
  const sqft = toSqft(p);
  const lotSize = toLotSize(p);
  const remarks = p.PublicRemarks?.trim() ?? "";

  const agentKeys = [p.ListAgentKey, p.CoListAgentKey, p.CoListAgentKey2, p.CoListAgentKey3];
  const isOwnListing = agentKeys.includes(siteConfig.ddf.memberKey);

  const listedAt = p.OriginalEntryTimestamp;
  const isNew =
    listedAt != null &&
    Date.now() - new Date(listedAt).getTime() < JUST_LISTED_DAYS * 24 * 60 * 60 * 1000;

  const media = p.Media ?? [];
  const photos = media
    .filter((m) => m.MediaCategory === "Property Photo" && m.MediaURL)
    .sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0))
    .map((m) => m.MediaURL as string);
  const virtualTourUrl =
    media.find((m) => m.MediaCategory === "Video Tour Website" && m.MediaURL)?.MediaURL ?? null;

  const slugBase = addressHidden ? city : `${address} ${city}`;

  return {
    slug: `${slugify(slugBase)}-${slugify(p.ListingId)}`,
    listingKey: p.ListingKey,
    mlsNumber: p.ListingId,
    badge: isOwnListing ? `${siteConfig.agentName.split(" ")[0]}'s Listing` : isNew ? "Just Listed" : null,
    price: p.ListPrice,
    beds: p.BedroomsTotal ?? null,
    baths: p.BathroomsTotalInteger ?? null,
    sqft,
    lotSize,
    address,
    addressHidden,
    city,
    province: p.StateOrProvince ?? "British Columbia",
    area: toArea(city),
    type,
    typeLabel,
    summary: remarks ? toSummary(remarks) : `${typeLabel} for sale in ${city}.`,
    description: remarks ? remarks.split(/\n\s*\n/).map((para) => para.trim()) : [],
    details: toDetails(p, typeLabel, sqft, lotSize),
    rooms: (p.Rooms ?? [])
      .filter((room) => room.RoomType)
      .map((room) => ({
        level: room.RoomLevel ?? "Other",
        type: room.RoomType as string,
        dimensions: room.RoomDimensions,
      })),
    photos,
    virtualTourUrl,
    latitude: addressHidden ? null : p.Latitude,
    longitude: addressHidden ? null : p.Longitude,
    listedAt,
    updatedAt: p.ModificationTimestamp,
    isOwnListing,
    listAgentName: memberName(p.ListAgentKey ? members.get(p.ListAgentKey) : undefined),
    listOfficeName: p.ListOfficeKey ? (offices.get(p.ListOfficeKey) ?? null) : null,
    realtorCaUrl: p.ListingURL
      ? p.ListingURL.startsWith("http")
        ? p.ListingURL
        : `https://${p.ListingURL}`
      : null,
    dataSource: p.OriginatingSystemName?.trim() || null,
  };
}

// Sanam's own listings first, then newest to oldest.
function compareListings(a: Listing, b: Listing): number {
  if (a.isOwnListing !== b.isOwnListing) return a.isOwnListing ? -1 : 1;
  return (b.listedAt ?? "").localeCompare(a.listedAt ?? "");
}

async function fetchListingsFromFeed(): Promise<Listing[]> {
  const [properties, members] = await Promise.all([fetchDdfProperties(), fetchDdfMembers()]);

  const officeKeys = [...new Set(properties.map((p) => p.ListOfficeKey).filter(Boolean))] as string[];
  const officeRecords = await Promise.all(officeKeys.map((key) => fetchDdfOffice(key)));
  const offices = new Map(
    officeRecords
      .filter((office) => office?.OfficeName)
      .map((office) => [office!.OfficeKey, office!.OfficeName as string]),
  );
  const memberMap = new Map(members.map((member) => [member.MemberKey, member]));

  return properties
    .map((p) => toListing(p, memberMap, offices))
    .filter((listing): listing is Listing => listing !== null)
    .sort(compareListings);
}

// Errors inside the cached function are not cached, so a failed refresh keeps
// serving the last good copy; only a cold cache + API outage yields [].
const getCachedListings = unstable_cache(fetchListingsFromFeed, ["ddf-listings-v1"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["ddf-listings"],
});

export async function getListings(): Promise<Listing[]> {
  if (!isDdfConfigured()) {
    console.warn(
      "[listings] DDF_CLIENT_ID / DDF_CLIENT_SECRET are not set — no listings will be shown. Set them in .env.local.",
    );
    return [];
  }

  try {
    return await getCachedListings();
  } catch (error) {
    console.error("[listings] Failed to load DDF feed", error);
    return [];
  }
}

// Slugs end in the MLS® number, which stays stable even if the address text
// is corrected on the board side, so old links still resolve.
export async function getListingBySlug(slug: string): Promise<Listing | undefined> {
  const listings = await getListings();
  const exact = listings.find((listing) => listing.slug === slug);
  if (exact) return exact;

  const mlsNumber = slug.split("-").at(-1);
  return listings.find((listing) => slugify(listing.mlsNumber) === mlsNumber);
}

export async function getFeaturedListings(count: number): Promise<Listing[]> {
  return (await getListings()).slice(0, count);
}

export async function filterListings(params: {
  area?: string;
  maxPrice?: number;
  beds?: number;
  type?: string;
  ownOnly?: boolean;
}): Promise<Listing[]> {
  return (await getListings()).filter((listing) => {
    if (params.ownOnly && !listing.isOwnListing) return false;
    if (params.area && listing.area !== params.area) return false;
    if (params.maxPrice && listing.price > params.maxPrice) return false;
    if (params.beds && (listing.beds ?? 0) < params.beds) return false;
    if (params.type && listing.type !== params.type) return false;
    return true;
  });
}
