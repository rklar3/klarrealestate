import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/data/site";

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_CA",
      type: "website",
      images: ogImage
        ? [{ url: /^https?:\/\//.test(ogImage) ? ogImage : absoluteUrl(ogImage) }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [absoluteUrl(ogImage)] : undefined,
    },
  };
}

// Renders a JSON-LD <script> tag. `<` is escaped per Next.js guidance to
// prevent breaking out of the script context.
export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function realEstateAgentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.agentName,
    jobTitle: siteConfig.agentTitle,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.brokerageFull,
    },
    url: siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: [
      ...siteConfig.serviceAreas.map((area) => area.name),
      siteConfig.region,
    ],
    sameAs: [siteConfig.instagram, siteConfig.facebook],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "CA",
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.agentName,
    jobTitle: siteConfig.agentTitle,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.brokerageFull,
    },
    url: absoluteUrl("/about"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: [siteConfig.instagram, siteConfig.facebook],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function residenceJsonLd(listing: {
  slug: string;
  address: string;
  addressHidden: boolean;
  city: string;
  province: string;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  summary: string;
  photos: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    url: absoluteUrl(`/listings/${listing.slug}`),
    name: listing.addressHidden ? listing.address : `${listing.address}, ${listing.city}`,
    description: listing.summary,
    image: listing.photos.slice(0, 5),
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "CAD",
    },
    ...(listing.beds != null && { numberOfBedrooms: listing.beds }),
    ...(listing.baths != null && { numberOfBathroomsTotal: listing.baths }),
    ...(listing.sqft != null && {
      floorSize: {
        "@type": "QuantitativeValue",
        value: listing.sqft,
        unitCode: "FTK",
      },
    }),
    address: {
      "@type": "PostalAddress",
      ...(!listing.addressHidden && { streetAddress: listing.address }),
      addressLocality: listing.city,
      addressRegion: listing.province,
      addressCountry: "CA",
    },
  };
}

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: absoluteUrl(`/resources/${post.slug}`),
    author: {
      "@type": "Person",
      name: siteConfig.agentName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/listings?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
