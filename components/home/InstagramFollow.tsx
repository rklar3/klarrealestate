import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

function InstagramGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

const HIGHLIGHTS = [
  "New listings, first",
  "Behind-the-scenes tours",
  "Market updates & tips",
];

export function InstagramFollow() {
  return (
    <div className="overflow-hidden rounded-card bg-ink text-cream">
      <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
        <div>
          <div className="flex items-center gap-3 text-gold">
            <InstagramGlyph />
            <Eyebrow tone="gold">{siteConfig.instagramHandle}</Eyebrow>
          </div>
          <h2 className="mt-4 max-w-lg text-3xl sm:text-4xl">
            Follow along on Instagram
          </h2>
          <p className="mt-3 max-w-lg text-cream/75">
            New listings, Okanagan lake views, and market updates — posted first to Instagram
            before anywhere else.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={siteConfig.instagram} variant="primary" size="lg">
              Follow {siteConfig.instagramHandle}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3" aria-hidden>
          {[
            "from-terracotta/70 to-ink-deep",
            "from-gold/60 to-ink-deep",
            "from-terracotta-dark/70 to-ink-deep",
            "from-ink-deep to-terracotta/50",
            "from-ink-deep to-gold/50",
            "from-ink-deep to-terracotta-dark/60",
          ].map((gradient, index) => (
            <div
              key={index}
              className={`flex aspect-square items-center justify-center rounded-control bg-gradient-to-br ${gradient}`}
            >
              <InstagramGlyph />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
