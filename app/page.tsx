import React from "react";
import { db } from "@/lib/db";
import { Hero } from "@/components/sections/Hero";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { CategorySection } from "@/components/sections/CategorySection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { OrderSteps } from "@/components/sections/OrderSteps";

// Revalidate or dynamic fetch
export const revalidate = 0;

export default async function HomePage() {
  let products: Array<{
    id: string;
    slug: string;
    name: string;
    category: string;
    material: string | null;
    lengthCm: number | null;
    widthCm: number | null;
    heightCm: number | null;
    customizable: boolean;
    priceNote: string | null;
    images: { url: string }[];
  }> = [];
  try {
    products = await db.product.findMany({
      where: { isFeatured: true },
      include: { images: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    });

    if (products.length === 0) {
      products = await db.product.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      });
    }
  } catch (err) {
    console.error("Error fetching featured products:", err);
  }

  return (
    <>
      <Hero />
      <Craftsmanship />
      <CategorySection />
      <FeaturedProducts products={products} />
      <OrderSteps />
    </>
  );
}
