import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function MeetSanam() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card">
        <Image
          src="/images/sanam-headshot.jpg"
          alt="Sanam Klar, REALTOR®"
          fill
          sizes="(min-width: 1024px) 400px, 90vw"
          className="object-cover"
        />
      </div>
      <div>
        <Eyebrow>Meet Sanam</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">
          A local REALTOR® who knows these communities
        </h2>
        <p className="mt-4 max-w-xl text-muted-1">
          {/* TODO: real bio summary — placeholder draft below, confirm before launch */}
          Sanam Klar is a REALTOR® with {siteConfig.brokerageFull}, working with buyers and
          sellers across the Okanagan Valley. She focuses on straightforward guidance — clear
          next steps, honest pricing conversations, and a process that respects your time.
        </p>
        <Button href="/about" variant="secondary" className="mt-6">
          Read Sanam&rsquo;s story
        </Button>
      </div>
    </div>
  );
}
