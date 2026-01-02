/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
