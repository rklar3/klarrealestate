import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Klar Real Estate collects, uses, and protects your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section tone="cream">
      {/* TODO: this is boilerplate drafted for general PIPEDA/BC PIPA
          alignment — have it reviewed by a lawyer or Oakwyn's compliance
          team before launch. Not legal advice. */}
      <div className="mx-auto max-w-2xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-2">
          Last updated: [TODO: set date on launch] — pending legal review.
        </p>

        <div className="post-content mt-8">
          <h2>1. Information we collect</h2>
          <p>
            When you fill out a form on this site — such as the contact form or the home valuation
            request — we collect the information you provide, which may include your name, phone
            number, email address, property address, and any details you choose to share about
            your buying or selling plans.
          </p>

          <h2>2. How we use your information</h2>
          <p>
            We use the information you provide solely to respond to your inquiry, provide the
            services you&rsquo;ve requested (such as a home valuation), and, where you&rsquo;ve consented,
            to follow up about your real estate needs. We do not sell your personal information.
          </p>

          <h2>3. How we store and protect your information</h2>
          <p>
            Form submissions are transmitted securely and delivered by email to Sanam Klar.
            Reasonable technical and organizational measures are used to protect your information
            from unauthorized access, but no method of transmission or storage is 100% secure.
          </p>

          <h2>4. Third parties</h2>
          <p>
            We use third-party service providers (such as an email delivery service) to operate
            this site and process form submissions. These providers only receive the information
            necessary to perform their function and are not authorized to use it for other
            purposes. If a customer relationship management (CRM) system is adopted in the
            future, this policy will be updated to reflect that.
          </p>

          <h2>5. Cookies and analytics</h2>
          <p>
            This site may use privacy-respecting analytics tools (such as Vercel Analytics or
            Google Analytics) to understand aggregate site usage. These tools do not identify you
            personally in the reports we review.
          </p>

          <h2>6. Your rights</h2>
          <p>
            Under Canadian privacy law (PIPEDA) and BC&rsquo;s Personal Information Protection Act
            (PIPA), you have the right to access the personal information we hold about you, ask
            questions about how it&rsquo;s used, and request correction or deletion. To make a request,
            contact us using the details below.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about this policy or your personal information can be directed to{" "}
            <a href={siteConfig.emailHref}>{siteConfig.email}</a> or {siteConfig.phone}.
          </p>
        </div>
      </div>
    </Section>
  );
}
