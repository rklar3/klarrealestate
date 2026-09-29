import Image from "next/image";

// Server-rendered gallery, no client JS: a swipeable strip on mobile and a
// 1 + 4 mosaic on larger screens, with the full set further down the page.
export function ListingGallery({
  photos,
  alt,
  badge,
}: {
  photos: string[];
  alt: string;
  badge: string | null;
}) {
  if (photos.length === 0) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center bg-sand text-muted-2 sm:aspect-[21/9]">
        Photos coming soon
      </div>
    );
  }

  // A partial mosaic leaves empty cells, so fewer than 5 photos shows just the cover.
  const mosaic = photos.length >= 5 ? photos.slice(0, 5) : photos.slice(0, 1);

  return (
    <div className="relative bg-ink">
      {/* Mobile: horizontal scroll-snap strip of every photo */}
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto sm:hidden">
        {photos.map((src, index) => (
          <div key={src} className="relative aspect-[4/3] w-[88%] shrink-0 snap-center">
            <Image
              src={src}
              alt={`${alt} — photo ${index + 1} of ${photos.length}`}
              fill
              priority={index === 0}
              sizes="88vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* sm and up: mosaic */}
      <div className="hidden h-[28rem] gap-2 sm:grid sm:grid-cols-4 sm:grid-rows-2 lg:h-[34rem]">
        {mosaic.map((src, index) => (
          <div
            key={src}
            className={
              index > 0
                ? "relative hidden md:block"
                : mosaic.length === 1
                  ? "relative col-span-4 row-span-2"
                  : "relative col-span-4 row-span-2 md:col-span-2"
            }
          >
            <Image
              src={src}
              alt={`${alt} — photo ${index + 1} of ${photos.length}`}
              fill
              priority={index === 0}
              sizes={index === 0 ? "(min-width: 768px) 75vw, 100vw" : "(min-width: 768px) 35vw, 50vw"}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {badge && (
        <span className="absolute right-6 top-6 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
          {badge}
        </span>
      )}
      {photos.length > 1 && (
        <a
          href="#all-photos"
          className="absolute bottom-4 right-4 hidden rounded-full bg-paper/95 px-4 py-2 text-sm font-semibold text-ink shadow transition-colors hover:bg-paper sm:inline-block"
        >
          View all {photos.length} photos
        </a>
      )}
    </div>
  );
}

export function ListingPhotoGrid({ photos, alt }: { photos: string[]; alt: string }) {
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {photos.map((src, index) => (
        <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-card bg-sand">
          <Image
            src={src}
            alt={`${alt} — photo ${index + 1} of ${photos.length}`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
