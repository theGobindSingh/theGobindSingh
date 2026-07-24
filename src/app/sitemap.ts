import { getAllPosts } from "@lib/blog";
import { getAllCaseStudies } from "@lib/case-studies";
import { SITE_URL } from "@lib/site-config";
import type { MetadataRoute } from "next";

// Must live at the app root, not in the (app) route group — Next does not resolve
// sitemap.ts inside a route group, and it silently 404s rather than erroring.
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const now = new Date().toISOString();

  const caseStudies = await getAllCaseStudies();
  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map(
    (caseStudy) => {
      return {
        url: `${SITE_URL}/work/${caseStudy.slug}`,
        lastModified: caseStudy.timeframe.end ?? now,
        changeFrequency: "monthly",
        priority: 0.7,
      };
    },
  );

  const posts = await getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => {
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
      url: `${SITE_URL}/design`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
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
