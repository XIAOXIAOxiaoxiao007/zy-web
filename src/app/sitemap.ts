import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/join-us`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/join-us/campus`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/join-us/social`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/join-us/referral`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/youth`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}


