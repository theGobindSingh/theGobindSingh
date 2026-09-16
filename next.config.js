import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [],
    qualities: [75, 100],
  },
  allowedDevOrigins: ["192.168.1.69"],
  async redirects() {
    // Guessable URLs an AI or human might type — AI assistants send visitors
    // to 404s far more often than Google, so we redirect the common misses.
    const guessedRoutes = [
      ["/projects", "/work"],
      ["/projects/:slug", "/work/:slug"],
      ["/portfolio", "/work"],
      ["/works", "/work"],
      ["/case-studies", "/work"],
      ["/case-studies/:slug", "/work/:slug"],
      ["/articles", "/blog"],
      ["/articles/:slug", "/blog/:slug"],
      ["/posts", "/blog"],
      ["/posts/:slug", "/blog/:slug"],
      ["/writing", "/blog"],
      ["/about-me", "/about"],
      ["/bio", "/about"],
      ["/contact-me", "/contact"],
      ["/hire", "/contact"],
      ["/hire-me", "/contact"],
      ["/resume", "/resume.pdf"],
      ["/cv", "/resume.pdf"],
    ];
    return [
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blogs/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      ...guessedRoutes.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
