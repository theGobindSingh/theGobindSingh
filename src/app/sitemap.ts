import { getAllPosts } from "@lib/blog";
import { getAllCaseStudies } from "@lib/case-studies";
import { SITE_URL } from "@lib/site-config";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date().toISOString();

  const caseStudyEntries: MetadataRoute.Sitemap = getAllCaseStudies().map(
    (caseStudy) => {
      return {
        url: `${SITE_URL}/work/${caseStudy.slug}`,
        lastModified: caseStudy.timeframe.end ?? now,
        changeFrequency: "monthly",
        priority: 0.7,
      };
    },
  );

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudyEntries,
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogEntries,
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
};

export default sitemap;
