import React, { Suspense } from "react";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ProductsClient } from "./ProductsClient";

export const metadata: Metadata = {
  title: "Бүтээгдэхүүний каталог | Уламжлалт авдар, модон тавилга, бэлэг дурсгал",
  description:
    "Нүүдэлчин модон эдлэлийн гар хийцийн сийлбэрт авдар, цул модон ширээ сандал, бэлэг дурсгалын каталогтой танилцаж, өөрийн хүссэн хэмжээгээр захиалаарай.",
};

export const revalidate = 0;

export default async function ProductsPage() {
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
    tags: string;
    images: { url: string }[];
  }> = [];
  try {
    products = await db.product.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Үндэсний үйлдвэрлэл
          </span>
          <h1 className="font-serif font-bold text-brand-dark mt-1 mb-2">
            Бүтээгдэхүүний Каталог
          </h1>
          <p className="text-sm sm:text-base text-brand-muted">
            Уламжлалт гар урлал, байгалийн цэвэр модон хийцүүдийг таны хүссэн хэмжээ, өнгө, сийлбэртэйгээр захиалгаар урлана.
          </p>
        </div>

        {/* Client Interactive Filter & Grid */}
        <Suspense fallback={<div className="text-center py-12 text-brand-muted">Уншиж байна...</div>}>
          <ProductsClient initialProducts={products} />
        </Suspense>
      </div>
    </div>
  );
}
