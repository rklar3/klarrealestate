// Generates on-brand placeholder images used across the site until real
// photography is available. These are deliberately restrained — a plain
// duotone field, a thin hairline frame, and a small camera glyph — so they
// read as "photography coming soon," not an attempt at fake scenery art.
// Re-run with `node scripts/generate-placeholder-images.mjs` after editing
// this file; it overwrites everything it generates under public/images/
// (it does not touch sanam-headshot.jpg, which is a real photo).
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

const PALETTE = {
  ink: "#1A130F",
  inkDeep: "#100B09",
  cream: "#F6EFE4",
  terracotta: "#C25A34",
  gold: "#EBC79A",
};

function cameraGlyph(cx, cy, scale) {
  const w = 64 * scale;
  const h = 46 * scale;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const lensR = 13 * scale;
  return `
  <rect x="${x}" y="${y + 8 * scale}" width="${w}" height="${h - 8 * scale}" rx="${4 * scale}" fill="none" stroke="${PALETTE.gold}" stroke-width="${1.6 * scale}" opacity="0.55" />
  <rect x="${cx - 10 * scale}" y="${y}" width="${20 * scale}" height="${8 * scale}" rx="${2 * scale}" fill="none" stroke="${PALETTE.gold}" stroke-width="${1.6 * scale}" opacity="0.55" />
  <circle cx="${cx}" cy="${cy + 4 * scale}" r="${lensR}" fill="none" stroke="${PALETTE.gold}" stroke-width="${1.6 * scale}" opacity="0.55" />
  <circle cx="${cx}" cy="${cy + 4 * scale}" r="${lensR * 0.45}" fill="${PALETTE.gold}" opacity="0.35" />
  `;
}

function placeholderSvg({ width, height, eyebrow, title }) {
  const scale = Math.min(width, height) / 420;
  const frameInset = Math.max(18, Math.min(width, height) * 0.035);
  const titleSize = Math.max(18, width * 0.024);
  const eyebrowSize = Math.max(10, width * 0.011);

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">
  <defs>
    <radialGradient id="vign" cx="50%" cy="38%" r="75%">
      <stop offset="0%" stop-color="${PALETTE.ink}" />
      <stop offset="100%" stop-color="${PALETTE.inkDeep}" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#vign)" />
  <rect
    x="${frameInset}" y="${frameInset}"
    width="${width - frameInset * 2}" height="${height - frameInset * 2}"
    fill="none" stroke="${PALETTE.gold}" stroke-opacity="0.28" stroke-width="1"
  />
  ${cameraGlyph(width / 2, height / 2 - height * 0.05, scale)}
  <text x="${frameInset + 28}" y="${height - frameInset - 26 - titleSize * 1.15}" font-family="Arial, Helvetica, sans-serif" font-size="${eyebrowSize}" letter-spacing="${width * 0.004}" fill="${PALETTE.gold}" opacity="0.75">${eyebrow.toUpperCase()}</text>
  <text x="${frameInset + 28}" y="${height - frameInset - 26}" font-family="Georgia, serif" font-size="${titleSize}" fill="${PALETTE.cream}" opacity="0.92">${title}</text>
</svg>`;
}

function writeImage(name, width, height, eyebrow, title) {
  const svg = placeholderSvg({ width, height, eyebrow, title });
  writeFileSync(join(outDir, `${name}.svg`), svg, "utf8");
  console.log("wrote", name + ".svg");
}

// Listings (keyed to Listing.image in data/listings.ts)
writeImage("lakeshore", 1200, 800, "Photography coming soon", "512 Lakeshore Rd, Kelowna");
writeImage("naramata", 1200, 800, "Photography coming soon", "104 Naramata Bench Rd");
writeImage("okanagan-lake", 1200, 800, "Photography coming soon", "88 Okanagan Lake Dr");
writeImage("water-st", 1200, 800, "Photography coming soon", "301-1290 Water St");
writeImage("wiltse", 1200, 800, "Photography coming soon", "47 Wiltse Heights");
writeImage("predator-ridge", 1200, 800, "Photography coming soon", "215 Predator Ridge Dr");

// Areas
writeImage("kelowna", 1400, 900, "Photography coming soon", "Kelowna, BC");
writeImage("west-kelowna", 1400, 900, "Photography coming soon", "West Kelowna, BC");
writeImage("penticton", 1400, 900, "Photography coming soon", "Penticton, BC");
writeImage("vernon", 1400, 900, "Photography coming soon", "Vernon, BC");
writeImage("summerland", 1400, 900, "Photography coming soon", "Summerland, BC");

console.log("Done. (sanam-headshot.jpg is a real photo and is left untouched.)");
