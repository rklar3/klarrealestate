// Central source of truth for business facts (NAP), used across pages, footer, and JSON-LD.
// Keep this the only place these facts are hardcoded so a future update touches one file.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.klarrealestate.ca";

export const siteConfig = {
  name: "Klar Real Estate",
  agentName: "Sanam Klar",
  agentTitle: "REALTOR®",
  brokerage: "Oakwyn Realty",
  brokerageFull: "Oakwyn Realty (Okanagan)",
  phone: "(250) 328-9808",
  phoneHref: "tel:+12503289808",
  email: "sanamklar@gmail.com",
  emailHref: "mailto:sanamklar@gmail.com",
  instagram: "https://instagram.com/klarrealestate",
  instagramHandle: "@klarrealestate",
  facebook: "https://www.facebook.com/klarrealestate",
  url: siteUrl,
  officePhone: "250-448-8885",
  officePhoneHref: "tel:+12504488885",
  officeFax: "604-620-7970",
  officeEmail: "info@oakwyn.com",
  officeEmailHref: "mailto:info@oakwyn.com",
  address: {
    streetAddress: "473 Bernard Avenue",
    addressLocality: "Kelowna",
    addressRegion: "British Columbia",
    postalCode: "V1Y 6N8",
  },
  serviceAreas: [
    { name: "Kelowna", slug: "kelowna" },
    { name: "West Kelowna", slug: "west-kelowna" },
    { name: "Penticton", slug: "penticton" },
    { name: "Vernon", slug: "vernon" },
    { name: "Summerland", slug: "summerland" },
  ],
  region: "Okanagan Valley, British Columbia",
  // CREA DDF® identifiers for Sanam's data feed (not secrets; the feed
  // credentials live in DDF_CLIENT_ID / DDF_CLIENT_SECRET).
  ddf: {
    memberKey: "2222866",
    destinationId: 67413,
  },
} as const;

export type ServiceAreaSlug = (typeof siteConfig.serviceAreas)[number]["slug"];

// `/listings?agent=sanam` narrows the feed to Sanam's own listings.
export const OWN_LISTINGS_QUERY = { agent: "sanam" } as const;
