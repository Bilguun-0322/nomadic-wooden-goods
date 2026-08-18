import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";

interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  material?: string | null;
  lengthCm?: number | null;
  widthCm?: number | null;
  heightCm?: number | null;
  customizable: boolean;
  priceNote?: string | null;
  images: { url: string }[];
}

interface FeaturedProductsProps {
  products: ProductItem[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-12 sm:py-16 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Сонгомол цуглуулга
            </span>
            <h2 className="font-serif font-bold text-brand-dark mt-1">
              Онцлох Бүтээгдэхүүнүүд
            </h2>
          </div>
          <Link
            href="/products"
            className="mt-3 sm:mt-0 text-sm font-semibold text-brand-gold hover:text-brand-goldHover flex items-center gap-1 group tap-target"
          >
            <span>Бүгдийг үзэх</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              category={product.category}
              material={product.material}
              lengthCm={product.lengthCm}
              widthCm={product.widthCm}
              heightCm={product.heightCm}
              customizable={product.customizable}
              priceNote={product.priceNote}
              imageUrl={product.images[0]?.url || "/uploads/avdar-ulzii-satin.jpg"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
