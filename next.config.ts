import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
  experimental: {
    scrollRestoration: true,
  }
};

export default nextConfig;
