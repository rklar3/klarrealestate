import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.agentName}, ${siteConfig.agentTitle}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #2A211C 0%, #A3492A 100%)",
          color: "#F6EFE4",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#EBC79A",
          }}
        >
          Okanagan Valley, BC
        </div>
        <div style={{ fontSize: 72, marginTop: 24, fontWeight: 600, display: "flex" }}>
          Klar Real Estate
        </div>
        <div style={{ fontSize: 32, marginTop: 24, color: "#F6EFE4", opacity: 0.85, display: "flex" }}>
          {siteConfig.agentName}, {siteConfig.agentTitle} — {siteConfig.brokerage}
        </div>
      </div>
    ),
    { ...size },
  );
}
