import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        // sem `search`: permite `?cv=…` (cache bust) e URLs sem query
      },
    ],
  },
};

export default nextConfig;
