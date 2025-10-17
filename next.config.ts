import type { NextConfig } from "next";

// Allow Android emulator origins during development to avoid blank page due to cross-origin issues
const nextConfig = {
  /* other config options here */
  // In dev, explicitly allow emulator/devbox origins
  allowedDevOrigins: [
    "http://10.0.2.2:3000",
    "http://10.0.2.2:3001",
    "http://localhost:3000",
  ],
} as any as NextConfig;

export default nextConfig;
