import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecomapi.nextgenbite.com",
      },
    ],
  },
};

export default nextConfig;
