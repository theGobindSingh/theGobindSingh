import { SITE_URL } from "@lib/site-config";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/temp", "/del"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
};

export default robots;
