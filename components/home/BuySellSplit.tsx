import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function BuySellSplit() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card className="p-8">
        <Eyebrow>For buyers</Eyebrow>
        <h3 className="mt-3 text-2xl">Finding the right home, without the guesswork</h3>
        <p className="mt-4 text-muted-1">
          From first-time buyers to relocations, Sanam walks you through financing basics, the
          Okanagan market, and every step of making an offer with confidence.
        </p>
        <Button href="/buy" variant="secondary" className="mt-6">
          How buying works
        </Button>
      </Card>

      <Card className="p-8">
        <Eyebrow>For sellers</Eyebrow>
        <h3 className="mt-3 text-2xl">A clear plan to sell for what your home is worth</h3>
        <p className="mt-4 text-muted-1">
          Pricing strategy, marketing, and staging guidance tailored to your property and
          neighbourhood — with a straightforward view of what to expect at each stage.
        </p>
        <Button href="/sell" variant="secondary" className="mt-6">
          How selling works
        </Button>
      </Card>
    </div>
  );
}
