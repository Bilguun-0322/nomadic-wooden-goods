import { MetadataRoute } from "next";
import { db } from "@/lib/db";

// Mark as dynamic to prevent build-time database collection
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nomadic-wooden-goods-git-main-bilguun-0322s-projects.vercel.app/";

  let products: { slug: string; updatedAt: Date }[] = [];
  try {
    products = await db.product.findMany({
      select: { slug: true, updatedAt: true },
    });
  } catch (e) {
    console.error(e);
  }

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...productUrls,
  ];
}
