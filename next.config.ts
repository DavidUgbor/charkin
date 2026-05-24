import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-neon",
    "@prisma/adapter-pg",
    "@neondatabase/serverless",
    "bcryptjs",
    "pg",
    "ws",
  ],
};

export default nextConfig;
