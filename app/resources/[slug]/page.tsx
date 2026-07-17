import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata, blogPostingJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Post not found",
      description: "This post could not be found.",
      path: `/resources/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/resources/${post.slug}`,
    noIndex: post.draft,
  });
}

export default async function ResourcePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(blogPostingJsonLd(post))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Resources", path: "/resources" },
            { name: post.title, path: `/resources/${post.slug}` },
          ]),
        )}
      />

      <Section tone="ink">
        <Eyebrow tone="gold">
          {new Date(post.date).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {post.draft ? " · Example / draft" : ""}
        </Eyebrow>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">{post.title}</h1>
        <p className="mt-4 max-w-2xl text-cream/80">{post.description}</p>
      </Section>

      <Section tone="cream">
        <article className="post-content mx-auto max-w-2xl">
          <MDXRemote source={post.content} />
        </article>
      </Section>
    </>
  );
}
