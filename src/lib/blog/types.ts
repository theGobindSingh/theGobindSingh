/**
 * Blog post content model. Every post is a static markdown file at
 * `public/blogs/<slug>.md`. The filename (without extension) is the
 * slug — never duplicated in frontmatter. Frontmatter carries metadata;
 * the body is the article content, parsed as markdown to HTML at build time.
 */

export interface BlogFrontmatter {
  title: string;
  date: string;
  updated?: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  featured?: boolean;
  seo?: { title?: string; description?: string; ogImage?: string };
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
