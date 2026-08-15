import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Cover art is rendered live inside the YouTube iframe itself — see the
    // README note on why we never fetch/re-host YouTube thumbnails.
    unoptimized: false,
  },
};

export default nextConfig;
