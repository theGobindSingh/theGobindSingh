/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  allowedDevOrigins: ["192.168.1.11"],
};

export default nextConfig;
