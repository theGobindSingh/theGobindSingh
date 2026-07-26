// eslint-disable-next-line camelcase -- next/cache exports this name
import { unstable_cache } from "next/cache";

import type { Blog, Media } from "@/payload-types";
import { getBlogPayload } from "./payload-client";
import { readingTimeFor, renderLexicalContent } from "./render";
import type { BlogPost, BlogPostMeta } from "./types";

const mediaUrl = (value?: (number | null) | Media): string | undefined => {
  if (value && typeof value === "object") return value.url ?? undefined;
  return undefined;
};

const toMeta = (doc: Blog, plainText: string): BlogPostMeta => {
  return {
    title: doc.title,
    date: doc.publishedDate,
    updated: doc.updatedDate ?? undefined,
    tags: doc.tags ?? [],
    excerpt: doc.excerpt,
    cover: mediaUrl(doc.cover),
    featured: doc.featured ?? undefined,
    seo: doc.seo
      ? {
          title: doc.seo.title ?? undefined,
          description: doc.seo.description ?? undefined,
          ogImage: mediaUrl(doc.seo.ogImage),
        }
      : undefined,
    slug: doc.slug,
    readingTime: readingTimeFor(plainText),
  };
};

const toPost = (doc: Blog): BlogPost => {
  const { html, outline, plainText } = renderLexicalContent(doc.content);
  return { ...toMeta(doc, plainText), html, outline };
};

export const getPostSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const payload = await getBlogPayload();
    const result = await payload.find({
      collection: "blogs",
      limit: 0,
      pagination: false,
      depth: 0,
    });
    return result.docs.map((doc) => {
      return doc.slug;
    });
  },
  ["blog-slugs"],
  { tags: ["blogs"] },
);

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPost | undefined> => {
    const payload = await getBlogPayload();
    const result = await payload.find({
      collection: "blogs",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    const doc = result.docs[0];
    return doc ? toPost(doc) : undefined;
  },
  ["blog-by-slug"],
  { tags: ["blogs"] },
);

export const getPostMetaBySlug = async (
  slug: string,
): Promise<BlogPostMeta | undefined> => {
  const post = await getPostBySlug(slug);
  if (!post) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- drop detail-only fields for list views
  const { html, outline, ...meta } = post;
  return meta;
};

export const getAllPosts = unstable_cache(
  async (): Promise<BlogPostMeta[]> => {
    const payload = await getBlogPayload();
    const result = await payload.find({
      collection: "blogs",
      limit: 0,
      pagination: false,
      depth: 2,
      sort: "-publishedDate",
    });
    return result.docs.map((doc) => {
      const { plainText } = renderLexicalContent(doc.content);
      return toMeta(doc, plainText);
    });
  },
  ["blog-all-posts"],
  { tags: ["blogs"] },
);

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
export type {
  BlogFrontmatter,
  BlogOutlineItem,
  BlogPost,
  BlogPostMeta,
} from "./types";
