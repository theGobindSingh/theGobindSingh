/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['res.cloudinary.com'],
    remotePatterns: [new URL('https://res.cloudinary.com/**')],
  },
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
