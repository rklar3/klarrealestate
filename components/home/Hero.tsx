import { HeroBackground } from "@/components/home/HeroBackground";
import { HeroRating } from "@/components/home/HeroRating";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getListings } from "@/data/listings";
import { OWN_LISTINGS_QUERY, siteConfig } from "@/data/site";

export async function Hero() {
  const listings = await getListings();
  const ownCount = listings.filter((listing) => listing.isOwnListing).length;
  const firstName = siteConfig.agentName.split(" ")[0];

  return (
    // -mt-20 pulls the hero up underneath the sticky 80px header (h-20) so the
    // header's transparent state overlays the dark hero image instead of the
    // plain page background — otherwise cream header text sits on a cream
    // background and disappears. Top padding below is increased to compensate.
    <div className="relative isolate -mt-20 overflow-hidden bg-ink text-cream">
      <HeroBackground />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/35 to-ink/75"
        aria-hidden
      />

      <Container className="relative pb-32 pt-36 sm:pb-40 sm:pt-44">
        <HeroRating />
        <Eyebrow tone="gold">Okanagan Valley, BC</Eyebrow>
        <h1 className="mt-5 max-w-3xl font-display text-6xl font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
          Your Okanagan home starts here
        </h1>
        <p className="mt-7 max-w-xl text-lg text-cream/85">
          Sanam Klar, REALTOR® with Oakwyn Realty, helps buyers and sellers navigate Kelowna, West
          Kelowna, Penticton, Vernon, and Summerland — with real answers, not just listings.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/listings" size="lg">
            Browse listings
          </Button>
          {ownCount > 0 && (
            <Button href={`/listings?agent=${OWN_LISTINGS_QUERY.agent}`} variant="ghost" size="lg">
              See {firstName}&apos;s listings
              <span className="rounded-full bg-cream/15 px-2 py-0.5 text-xs tabular-nums">
                {ownCount}
              </span>
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}
