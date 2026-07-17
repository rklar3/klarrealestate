import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "resources");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  draft?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
};

export function getAllPosts(): Post[] {
  const files = readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { ...(data as PostFrontmatter), slug, content };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((post) => !post.draft);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
