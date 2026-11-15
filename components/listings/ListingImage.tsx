"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/** Quiet stand-in for a missing or failed photo: a house outline on sand. */
export function PhotoPlaceholder({
  label = "Photos coming soon",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 bg-sand text-muted-3",
        className,
      )}
    >
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M6 22 24 7l18 15" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 20v20h28V20" strokeLinejoin="round" />
        <path d="M20 40V28h8v12" strokeLinejoin="round" />
      </svg>
      <span className="text-xs font-medium tracking-wide text-muted-2">{label}</span>
    </div>
  );
}

/** next/image that swaps to the placeholder if the photo fails to load. */
export function ListingImage({ alt, ...props }: ImageProps & { alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <PhotoPlaceholder label="Photo unavailable" />;
  return <Image alt={alt} {...props} onError={() => setFailed(true)} />;
}
