import { siteConfig } from "@/data/site";

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 6.5h17a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="m3 7 9 6.5L21 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 3.5h2.4l1.4 4-1.9 1.5a11.5 11.5 0 0 0 5.5 5.5l1.5-1.9 4 1.4v2.4c0 1.1-.9 2.1-2.1 2A17.5 17.5 0 0 1 4.6 5.6c-.1-1.2.9-2.1 2-2.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 8.5h2.3V5.3h-2.3c-2.2 0-3.7 1.6-3.7 3.9v1.8H8.7v3.1h2.1V21h3.1v-6.9h2.3l.5-3.1h-2.8V9.2c0-.6.4-.7.6-.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: siteConfig.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.facebook, label: "Facebook", Icon: FacebookIcon },
];

export function TopBar() {
  return (
    <div className="bg-ink-deep text-cream/85">
      <div className="container-page flex h-9 items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">{siteConfig.phone}</span>
          </a>
          <a
            href={siteConfig.emailHref}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <MailIcon />
            <span className="hidden sm:inline">{siteConfig.email}</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-cream/60 md:inline">Follow along</span>
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
