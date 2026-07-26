import { getAllPosts, getAllTags } from "@lib/blog";
import { getPageCta } from "@lib/page-cta";

export const blogHero = {
  eyebrow: "Selected Journal",
  title: "Thoughts on building",
  description:
    "Writing on frontend architecture, performance, and design systems, from real work building React and Next.js products.",
};

export const getBlogIndexSection = async () => {
  const posts = await getAllPosts();
  return { posts, tags: getAllTags(posts) };
};

export const getBlogCta = async () => {
  return getPageCta("blog");
};
