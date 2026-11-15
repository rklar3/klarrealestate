import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local, site-authored SVG placeholders only (no user-uploaded content),
    // so allowing SVG through next/image here is safe. Swap for real photos
    // (jpg/png/webp) before launch and this can be left as-is or tightened.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Listing photos from the CREA DDF® feed.
    remotePatterns: [{ protocol: "https", hostname: "ddfcdn.realtor.ca", pathname: "/listing/**" }],
    // IPv6-only / NAT64 networks resolve the CDN to 64:ff9b:: addresses, which
    // Next treats as private and refuses to proxy. Dev only; the host is still
    // restricted by remotePatterns, and production stays strict.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
};

export default nextConfig;
