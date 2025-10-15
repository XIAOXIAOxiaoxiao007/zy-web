import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return {
    name: "最右 - 风格相似复刻",
    short_name: "最右复刻",
    description: "兴趣社区落地页复刻（占位内容）",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
    icons: [
      // Provide real PNGs for best installability
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }
    ],
    screenshots: [
      { src: "/og.svg", type: "image/svg+xml", sizes: "1200x630", form_factor: "wide" }
    ],
    id: baseUrl
  };
}


