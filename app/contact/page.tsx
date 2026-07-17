import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/data/site";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript, realEstateAgentJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Sanam Klar, REALTOR®",
  description:
    "Get in touch with Sanam Klar, REALTOR® with Oakwyn Realty, about buying or selling in Kelowna, West Kelowna, Penticton, Vernon, or Summerland.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(realEstateAgentJsonLd())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Contact", path: "/contact" }]))}
      />

      <Section tone="ink">
        <Eyebrow tone="gold">Contact</Eyebrow>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Let&rsquo;s talk about your move</h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          Reach out about buying, selling, or just exploring your options — Sanam typically
          replies within one business day.
        </p>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-10">
              <ContactForm />
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <p className="eyebrow text-terracotta-dark">Direct</p>
              <p className="mt-3 text-lg">
                <a href={siteConfig.phoneHref} className="hover:text-terracotta-dark">
                  {siteConfig.phone}
                </a>
              </p>
              <p className="mt-1 text-lg">
                <a href={siteConfig.emailHref} className="hover:text-terracotta-dark">
                  {siteConfig.email}
                </a>
              </p>
            </div>

            <div>
              <p className="eyebrow text-terracotta-dark">Brokerage</p>
              <p className="mt-3 text-muted-1">
                {siteConfig.agentName}, {siteConfig.agentTitle}
                <br />
                {siteConfig.brokerageFull}
              </p>
            </div>

            <div>
              <p className="eyebrow text-terracotta-dark">Service area</p>
              <p className="mt-3 text-muted-1">{siteConfig.region}</p>
              <ul className="mt-2 text-muted-1">
                {siteConfig.serviceAreas.map((area) => (
                  <li key={area.slug}>{area.name}</li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-card border border-muted-3/40">
              <iframe
                title="Map of the Okanagan Valley service area"
                src="https://www.google.com/maps?q=Okanagan+Valley,+BC&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
