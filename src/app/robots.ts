import { SITE_URL } from "@lib/site-config";
import type { MetadataRoute } from "next";

// AI crawlers that don't execute JS but do honour robots.txt per user-agent
// token — listed explicitly so intent isn't left to the default rule.
const AI_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "CCBot",
  "Amazonbot",
];

// Must live at the app root, not in the (app) route group — Next does not resolve
// robots.ts inside a route group, and it silently 404s rather than erroring.
const disallow = ["/admin", "/admin/", "/api/"];

const toAgentRule = (userAgent: string) => {
  return { userAgent, allow: "/", disallow };
};

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...AI_USER_AGENTS.map(toAgentRule),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
};

export default robots;
