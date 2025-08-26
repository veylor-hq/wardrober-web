import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.155",
        port: "8000",
        pathname: "/api/items/images/**",
      },
    ],
  },
};

export default nextConfig;
