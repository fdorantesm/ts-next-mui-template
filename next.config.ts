import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Configure TypeScript
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // ignoreBuildErrors: false,
  },

  // Configure ESLint
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: false,
  },

  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports for MUI
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@mui/lab",
      "@mui/x-date-pickers",
    ],
  },

  // Configure webpack for better chunking
  webpack: (config) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      moduleIds: "deterministic",
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for React/Next
          framework: {
            name: "framework",
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // MUI Material chunk
          mui: {
            name: "mui",
            test: /[\\/]node_modules[\\/]@mui[\\/]material[\\/]/,
            priority: 30,
            enforce: true,
          },
          // MUI Icons chunk
          muiIcons: {
            name: "mui-icons",
            test: /[\\/]node_modules[\\/]@mui[\\/]icons-material[\\/]/,
            priority: 30,
            enforce: true,
          },
          // Emotion chunk
          emotion: {
            name: "emotion",
            test: /[\\/]node_modules[\\/]@emotion[\\/]/,
            priority: 30,
            enforce: true,
          },
          // Common libraries chunk
          lib: {
            name: "lib",
            test: /[\\/]node_modules[\\/](lodash|date-fns)[\\/]/,
            priority: 20,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // Shared code chunk
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    };

    return config;
  },
};

export default nextConfig;
