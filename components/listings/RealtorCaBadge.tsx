// DDF® rules require a clickable "Powered by: REALTOR.ca" badge on every
// listing, linking to that listing's page on REALTOR.ca.
// Markup follows CREA's snippet: https://ddfapi-docs.realtor.ca/ (Website requirements).
export function RealtorCaBadge({ href = "https://www.realtor.ca/en" }: { href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Powered by: REALTOR.ca — view this listing on REALTOR.ca"
      className="inline-block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- CREA-hosted badge, must be served as-is */}
      <img
        width={125}
        height={60}
        src="https://www.realtor.ca/images/en-ca/powered_by_realtor.svg"
        alt="Powered by: REALTOR.ca"
      />
    </a>
  );
}

export function DdfDisclaimer({ source }: { source?: string | null }) {
  return (
    <p className="text-xs leading-relaxed text-muted-2">
      Listing data is supplied by the REALTOR.ca DDF®
      {source ? ` from ${source}` : ""}, which assumes no responsibility for its accuracy. All
      information is deemed reliable but not guaranteed and should be independently verified.
    </p>
  );
}
