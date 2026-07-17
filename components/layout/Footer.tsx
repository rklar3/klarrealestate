import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";

const EXPLORE_LINKS = [
  { href: "/listings", label: "Listings" },
  { href: "/buy", label: "Buying" },
  { href: "/sell", label: "Selling" },
  { href: "/home-valuation", label: "Free Home Valuation" },
  { href: "/about", label: "About Sanam" },
  { href: "/resources", label: "Resources" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-sand text-muted-1">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta font-display text-base font-bold text-cream"
            >
              K
            </span>
            <p className="font-display text-lg font-semibold text-ink">Klar Real Estate</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            {siteConfig.agentName}, {siteConfig.agentTitle}
            <br />
            {siteConfig.brokerageFull}
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-ink"
            >
              Instagram
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-ink"
            >
              Facebook
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-terracotta-dark">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-terracotta-dark">Service areas</p>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} className="hover:text-ink">
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-terracotta-dark">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-ink">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={siteConfig.emailHref} className="hover:text-ink">
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.region}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink/10">
        <Container className="flex flex-col gap-3 py-6 text-xs leading-relaxed text-muted-2">
          <p>
            © {year} Klar Real Estate. {siteConfig.agentName}, licensed {siteConfig.agentTitle} with{" "}
            {siteConfig.brokerage}.
          </p>
          <p>
            All information deemed reliable but not guaranteed and should be independently verified.
            Not intended to solicit properties already listed for sale.
          </p>
          {/* TODO: BC real estate compliance — brokerage disclosure, PREC (personal
              real estate corporation) notice if applicable, and any BCFSA-required
              disclaimers. Confirm exact required wording with Oakwyn's compliance
              team before launch. */}
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="underline hover:text-ink">
              Privacy Policy
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
