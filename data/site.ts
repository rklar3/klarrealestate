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
  // TODO: confirm real brokerage office address. Left unset intentionally —
  // JSON-LD and footer fall back to service-area-only (no street address)
  // rather than fabricate or expose one. Add here once confirmed.
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  },
  serviceAreas: [
    { name: "Kelowna", slug: "kelowna" },
    { name: "West Kelowna", slug: "west-kelowna" },
    { name: "Penticton", slug: "penticton" },
    { name: "Vernon", slug: "vernon" },
    { name: "Summerland", slug: "summerland" },
  ],
  region: "Okanagan Valley, British Columbia",
} as const;

export type ServiceAreaSlug = (typeof siteConfig.serviceAreas)[number]["slug"];
