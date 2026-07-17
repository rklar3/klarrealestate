import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local, site-authored SVG placeholders only (no user-uploaded content),
    // so allowing SVG through next/image here is safe. Swap for real photos
    // (jpg/png/webp) before launch and this can be left as-is or tightened.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
