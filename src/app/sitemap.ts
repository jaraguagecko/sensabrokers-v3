import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sensabrokers.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/hipotecas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hipotecas/matcher`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/infonavit`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/infonavit/calculadora`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/infonavit/requisitos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
