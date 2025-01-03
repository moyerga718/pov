import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_PORT: process.env.DATABASE_PORT,
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
