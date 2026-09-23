"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  categoryName: string;
}

export function ProductGallery({ images, productName, categoryName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageCount = images.length;

  useEffect(() => {
    if (imageCount < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % imageCount);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [imageCount]);

  const goToImage = (index: number) => {
    setActiveIndex((index + imageCount) % imageCount);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-warm border border-brand-border bg-brand-border/20">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-opacity duration-500"
        />
        <span className="absolute top-4 left-4 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-brand-dark/85 text-white backdrop-blur-sm">
          {categoryName}
        </span>
        {imageCount > 1 && (
          <>
            <button
              type="button"
              onClick={() => goToImage(activeIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-dark/75 text-white flex items-center justify-center hover:bg-brand-dark transition-colors"
              aria-label="Өмнөх зураг"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => goToImage(activeIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-dark/75 text-white flex items-center justify-center hover:bg-brand-dark transition-colors"
              aria-label="Дараагийн зураг"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {imageCount > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((imageUrl, index) => (
            <button
              type="button"
              key={`${imageUrl}-${index}`}
              onClick={() => goToImage(index)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors ${
                activeIndex === index ? "border-brand-gold" : "border-brand-border hover:border-brand-gold"
              }`}
              aria-label={`${productName} зураг ${index + 1}`}
              aria-pressed={activeIndex === index}
            >
              <Image
                src={imageUrl}
                alt={`${productName} - ${index + 1}`}
                fill
                sizes="(max-width: 640px) 30vw, 15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
