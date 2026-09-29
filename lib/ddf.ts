import "server-only";

// Thin client for the REALTOR.ca DDF® Web API (RESO/OData).
// Docs: https://ddfapi-docs.realtor.ca/
//
// Auth is OAuth2 client credentials: the data feed "username"/"password" from
// CREA are the client ID/secret. Tokens last 60 minutes and must never be
// requested from the browser, so everything here is server-only.

const TOKEN_URL = "https://identity.crea.ca/connect/token";
const API_BASE = "https://ddfapi.realtor.ca/odata/v1";
const PAGE_SIZE = 100; // API maximum for $top
const MAX_PAGES = 50; // safety cap; a single-office feed is far below this

export type DdfMedia = {
  MediaKey: string;
  MediaURL: string | null;
  MediaCategory: string | null;
  Order: number | null;
  PreferredPhotoYN: boolean | null;
  LongDescription: string | null;
};

export type DdfRoom = {
  RoomKey: string;
  RoomLevel: string | null;
  RoomType: string | null;
  RoomDimensions: string | null;
};

// Only the Property fields this site reads. The API returns many more.
export type DdfProperty = {
  ListingKey: string;
  ListingId: string;
  StandardStatus: string | null;
  ListPrice: number | null;
  PublicRemarks: string | null;
  PropertySubType: string | null;
  StructureType: string[] | null;
  CommonInterest: string | null;
  UnparsedAddress: string | null;
  UnitNumber: string | null;
  City: string | null;
  StateOrProvince: string | null;
  PostalCode: string | null;
  Latitude: number | null;
  Longitude: number | null;
  BedroomsTotal: number | null;
  BathroomsTotalInteger: number | null;
  BathroomsPartial: number | null;
  LivingArea: number | null;
  LivingAreaUnits: string | null;
  LotSizeArea: number | null;
  LotSizeUnits: string | null;
  LotSizeDimensions: string | null;
  YearBuilt: number | null;
  Stories: number | null;
  Basement: string[] | null;
  Heating: string[] | null;
  Cooling: string[] | null;
  FireplaceFeatures: string[] | null;
  ParkingFeatures: string[] | null;
  ParkingTotal: number | null;
  View: string[] | null;
  WaterfrontFeatures: string[] | null;
  PoolFeatures: string[] | null;
  AssociationFee: number | null;
  AssociationFeeFrequency: string | null;
  TaxAnnualAmount: number | null;
  TaxYear: number | null;
  Zoning: string | null;
  WaterSource: string[] | null;
  Sewer: string[] | null;
  ListAgentKey: string | null;
  CoListAgentKey: string | null;
  CoListAgentKey2: string | null;
  CoListAgentKey3: string | null;
  ListOfficeKey: string | null;
  ListingURL: string | null;
  OriginatingSystemName: string | null;
  InternetEntireListingDisplayYN: boolean | null;
  InternetAddressDisplayYN: boolean | null;
  OriginalEntryTimestamp: string | null;
  ModificationTimestamp: string | null;
  Media: DdfMedia[] | null;
  Rooms: DdfRoom[] | null;
};

export type DdfMember = {
  MemberKey: string;
  MemberFirstName: string | null;
  MemberLastName: string | null;
  MemberNickname: string | null;
};

export type DdfOffice = {
  OfficeKey: string;
  OfficeName: string | null;
};

type ODataPage<T> = {
  value: T[];
  "@odata.nextLink"?: string;
};

export function isDdfConfigured(): boolean {
  return Boolean(process.env.DDF_CLIENT_ID && process.env.DDF_CLIENT_SECRET);
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  // Tokens are not sliding; refresh a minute early to avoid mid-request expiry.
  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) {
    return cachedToken.value;
  }

  const clientId = process.env.DDF_CLIENT_ID;
  const clientSecret = process.env.DDF_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("[ddf] DDF_CLIENT_ID / DDF_CLIENT_SECRET are not set");
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "DDFApi_Read",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`[ddf] token request failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.value;
}

async function ddfGet<T>(url: string): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    cache: "no-store",
  });

  if (res.status === 401) {
    // Token may have been revoked or rotated early; retry once with a fresh one.
    cachedToken = null;
    const retryToken = await getAccessToken();
    const retry = await fetch(url, {
      headers: { Authorization: `Bearer ${retryToken}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (!retry.ok) throw new Error(`[ddf] GET ${url} failed: ${retry.status}`);
    return (await retry.json()) as T;
  }

  if (!res.ok) {
    throw new Error(`[ddf] GET ${url} failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// Follows @odata.nextLink until the collection is exhausted. Results must be
// sorted for paging to be stable (per the DDF docs), so callers pass $orderby.
async function ddfGetAll<T>(resource: string, query: Record<string, string>): Promise<T[]> {
  const params = new URLSearchParams({ $top: String(PAGE_SIZE), ...query });
  let url: string | undefined = `${API_BASE}/${resource}?${params}`;
  const results: T[] = [];

  for (let page = 0; url && page < MAX_PAGES; page++) {
    const data: ODataPage<T> = await ddfGet<ODataPage<T>>(url);
    results.push(...data.value);
    url = data["@odata.nextLink"];
  }

  return results;
}

export function fetchDdfProperties(): Promise<DdfProperty[]> {
  return ddfGetAll<DdfProperty>("Property", { $orderby: "ListingKey asc" });
}

export function fetchDdfMembers(): Promise<DdfMember[]> {
  return ddfGetAll<DdfMember>("Member", {
    $orderby: "MemberKey asc",
    $select: "MemberKey,MemberFirstName,MemberLastName,MemberNickname",
  });
}

export async function fetchDdfOffice(officeKey: string): Promise<DdfOffice | null> {
  try {
    return await ddfGet<DdfOffice>(
      `${API_BASE}/Office/${encodeURIComponent(officeKey)}?$select=OfficeKey,OfficeName`,
    );
  } catch {
    return null;
  }
}
