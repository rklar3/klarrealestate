import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { getListings } from "@/data/listings";
import { areas } from "@/data/areas";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/buy",
    "/sell",
    "/home-valuation",
    "/contact",
    "/privacy",
    "/listings",
    "/areas",
    "/resources",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const areaEntries: MetadataRoute.Sitemap = areas.map((area) => ({
    url: `${siteUrl}/areas/${area.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const listingEntries: MetadataRoute.Sitemap = getListings().map((listing) => ({
    url: `${siteUrl}/listings/${listing.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts()
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/resources/${post.slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...staticEntries, ...areaEntries, ...listingEntries, ...postEntries];
}
