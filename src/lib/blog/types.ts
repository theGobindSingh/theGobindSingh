/**
 * Blog post content model. Posts live in the Payload `blogs` collection;
 * this shape is what the Payload docs get mapped into for rendering.
 */

export interface BlogFrontmatter {
  title: string;
  date: string;
  updated?: string | undefined;
  tags: string[];
  excerpt: string;
  cover?: string | undefined;
  featured?: boolean | undefined;
  seo?:
    | {
        title?: string | undefined;
        description?: string | undefined;
        ogImage?: string | undefined;
      }
    | undefined;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
  readingTime: string;
}

export interface BlogOutlineItem {
  id: string;
  text: string;
}

export interface BlogPost extends BlogPostMeta {
  html: string;
  outline: BlogOutlineItem[];
}
