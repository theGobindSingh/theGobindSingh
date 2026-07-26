import { SITE_URL } from "@lib/site-config";
import type { MetadataRoute } from "next";

// Must live at the app root, not in the (app) route group — Next does not resolve
// robots.ts inside a route group, and it silently 404s rather than erroring.
const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
};

export default robots;
