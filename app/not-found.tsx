import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="cream" className="py-32 text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-3 text-4xl sm:text-5xl">This page has moved on</h1>
      <p className="mx-auto mt-4 max-w-xl text-muted-1">
        The page you&rsquo;re looking for doesn&rsquo;t exist — it may have been moved, or the address might
        be off. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back home</Button>
        <Button href="/listings" variant="secondary">
          Browse listings
        </Button>
        <Button href="/contact" variant="secondary">
          Contact Sanam
        </Button>
      </div>
    </Section>
  );
}
