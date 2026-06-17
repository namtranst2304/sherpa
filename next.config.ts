import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    '*': [
      'node_modules/next/dist/compiled/@vercel/og/**',
      'node_modules/sharp/**',
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      '@radix-ui/react-icons',
    ],
  },
};

export default nextConfig;
