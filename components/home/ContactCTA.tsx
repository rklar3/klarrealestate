import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/data/site";

export function ContactCTA() {
  return (
    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Eyebrow tone="gold">Let&rsquo;s talk</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">
          Ready to talk through your next move?
        </h2>
        <p className="mt-3 max-w-xl text-cream/80">
          Reach out for a no-pressure conversation about buying, selling, or just exploring your
          options in the Okanagan.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/contact" size="lg">
          Book a call
        </Button>
        <Button href={siteConfig.phoneHref} variant="ghost" size="lg">
          Call {siteConfig.phone}
        </Button>
      </div>
    </div>
  );
}
