import { getAllPosts, getAllTags } from "@lib/blog";

export const blogHero = {
  eyebrow: "Selected Journal",
  title: "Thoughts on building",
  description:
    "Writing on frontend architecture, performance, and design systems, from real work building React and Next.js products.",
};

export const blogIndexSection = {
  posts: getAllPosts(),
  tags: getAllTags(getAllPosts()),
};

export const ctaSection = {
  title: "Have something like this in mind?",
  description:
    "I'm currently available for freelance and full-time opportunities. Reach out and let's talk about what you're building.",
};
