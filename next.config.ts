import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: __dirname,
  turbopack: { root: __dirname },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
