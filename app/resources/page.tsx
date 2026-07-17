import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Buyer & Seller Guides",
  description:
    "Okanagan real estate guides for buyers and sellers — market notes, buyer guides, and moving tips for Kelowna, West Kelowna, Penticton, Vernon, and Summerland.",
  path: "/resources",
});

export default function ResourcesIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Resources", path: "/resources" }]))}
      />

      <Section tone="ink">
        <Eyebrow tone="gold">Resources</Eyebrow>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Buyer & seller guides</h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          Practical guides on buying, selling, and living in the Okanagan Valley.
        </p>
      </Section>

      <Section tone="cream">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="p-6">
              <Link href={`/resources/${post.slug}`} className="group block">
                {post.draft && (
                  <span className="eyebrow inline-block rounded-full bg-gold/30 px-3 py-1 text-terracotta-dark">
                    Example / draft
                  </span>
                )}
                <p className="mt-3 text-xl font-semibold text-ink group-hover:text-terracotta-dark">
                  {post.title}
                </p>
                <p className="mt-2 text-sm text-muted-1">{post.description}</p>
                <time dateTime={post.date} className="mt-4 block text-xs text-muted-2">
                  {new Date(post.date).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
