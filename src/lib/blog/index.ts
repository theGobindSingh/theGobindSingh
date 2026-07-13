import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";

import type { BlogFrontmatter, BlogPost, BlogPostMeta } from "./types";

const BLOG_DIR = path.join(process.cwd(), "public/blogs");
const WORDS_PER_MINUTE = 200;

const readingTimeFor = (markdown: string): string => {
  const words = markdown.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
};

export const getPostSlugs = (): string[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => {
      return file.endsWith(".md");
    })
    .map((file) => {
      return file.replace(/\.md$/, "");
    });
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter<BlogFrontmatter>(raw);

  return {
    ...data,
    slug,
    readingTime: readingTimeFor(content),
    html: marked.parse(content, { async: false }),
  };
};

export const getPostMetaBySlug = (slug: string): BlogPostMeta | undefined => {
  const post = getPostBySlug(slug);
  if (!post) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- drop html for list views
  const { html, ...meta } = post;
  return meta;
};

export const getAllPosts = (): BlogPostMeta[] => {
  return getPostSlugs()
    .map(getPostMetaBySlug)
    .filter((post): post is BlogPostMeta => {
      return Boolean(post);
    })
    .sort((a, b) => {
      return b.date.localeCompare(a.date);
    });
};

export const getAllTags = (posts: BlogPostMeta[]): string[] => {
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  return Array.from(tags).sort();
};

export { formatBlogDate } from "./format";
export type { BlogFrontmatter, BlogPost, BlogPostMeta } from "./types";
