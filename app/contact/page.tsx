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
              <p className="eyebrow text-terracotta-dark">Office</p>
              <p className="mt-3 text-muted-1">
                {siteConfig.address.streetAddress}
                <br />
                {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion}{" "}
                {siteConfig.address.postalCode}
              </p>
              <p className="mt-2 text-sm text-muted-1">
                P:{" "}
                <a href={siteConfig.officePhoneHref} className="hover:text-terracotta-dark">
                  {siteConfig.officePhone}
                </a>
                {" · "}F: {siteConfig.officeFax}
              </p>
              <p className="mt-1 text-sm text-muted-1">
                <a href={siteConfig.officeEmailHref} className="hover:text-terracotta-dark">
                  {siteConfig.officeEmail}
                </a>
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

            <div className="rounded-card border border-ink/10 bg-paper p-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta-dark"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </span>
                <p className="font-semibold text-ink">Visit the office</p>
              </div>
              <p className="mt-3 text-sm text-muted-1">
                {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}{" "}
                {siteConfig.address.postalCode}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-dark hover:text-ink"
              >
                Get directions ↗
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
