import Image from "next/image";
import Link from "next/link";
import { areas } from "@/data/areas";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function ServiceAreaTiles() {
  return (
    <div>
      <Eyebrow>Service areas</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl">Okanagan communities, up close</h2>
      <p className="mt-4 max-w-2xl text-muted-1">
        Every community in the valley has its own rhythm. Explore the guide for each one to see
        what fits.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {areas.map((area) => (
          <Link
            key={area.slug}
            href={`/areas/${area.slug}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-card"
          >
            <Image
              src={`/images/${area.image}.svg`}
              alt={`${area.name} — placeholder image`}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <span className="absolute bottom-4 left-4 font-display text-lg text-cream">
              {area.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
