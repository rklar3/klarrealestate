import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { faqJsonLd, jsonLdScript } from "@/lib/seo";
import type { Faq } from "@/data/faqs";

export function FAQSection({
  faqs,
  title = "Frequently asked questions",
  tone = "sand",
}: {
  faqs: Faq[];
  title?: string;
  tone?: "cream" | "sand" | "paper";
}) {
  return (
    <Section tone={tone} ariaLabel="Frequently asked questions">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqs))} />
      <div className="mx-auto max-w-3xl">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
        <div className="mt-8">
          <Accordion items={faqs} />
        </div>
      </div>
    </Section>
  );
}
