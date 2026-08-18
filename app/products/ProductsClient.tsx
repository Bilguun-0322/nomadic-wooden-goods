"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

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
  tags: string;
  images: { url: string }[];
}

interface ProductsClientProps {
  initialProducts: ProductItem[];
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "";

  const [activeCategory, setActiveCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Counts per category
  const counts = useMemo(() => {
    const res: Record<string, number> = {
      all: initialProducts.length,
      avdar: 0,
      wood_item: 0,
      gift: 0,
    };
    for (const p of initialProducts) {
      if (res[p.category] !== undefined) {
        res[p.category]++;
      }
    }
    return res;
  }, [initialProducts]);

  // Filtered list
  const filtered = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category match
      if (activeCategory && product.category !== activeCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inName = product.name.toLowerCase().includes(query);
        const inTags = product.tags.toLowerCase().includes(query);
        const inMaterial = (product.material || "").toLowerCase().includes(query);
        return inName || inTags || inMaterial;
      }
      return true;
    });
  }, [initialProducts, activeCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Controls Bar: Category Tabs & Search Bar */}
      <div className="flex flex-col gap-4 mb-8 bg-brand-card p-4 sm:p-5 rounded-2xl border border-brand-border shadow-warm">
        {/* Category Tabs Row */}
        <div className="w-full">
          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
            counts={counts}
          />
        </div>

        {/* Search Input Row */}
        <div className="relative w-full pt-2 border-t border-brand-border/40">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none mt-1" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Бүтээгдэхүүн, сийлбэр, материалаар хайх..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-brand-bg border border-brand-border text-brand-dark placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-muted hover:text-brand-dark p-1 mt-1"
            >
              Цэвэрлэх
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-brand-muted">
        <span>
          Нийт <strong className="text-brand-dark font-semibold">{filtered.length}</strong> бүтээгдэхүүн
        </span>
        {activeCategory && (
          <button
            onClick={() => setActiveCategory("")}
            className="text-brand-gold hover:underline font-semibold"
          >
            Бүх ангиллыг харах
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
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
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-brand-card rounded-2xl border border-brand-border my-6">
          <div className="w-16 h-16 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-brand-dark mb-2">
            Илэрц олдсонгүй
          </h3>
          <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">
            Таны хайсан түлхүүр үг эсвэл сонгосон ангилалд тохирох бүтээгдэхүүн одоогоор байхгүй байна.
          </p>
          <Button
            onClick={() => {
              setActiveCategory("");
              setSearchQuery("");
            }}
            variant="primary"
            size="md"
          >
            Бүх бүтээгдэхүүнийг үзэх
          </Button>
        </div>
      )}
    </div>
  );
}
