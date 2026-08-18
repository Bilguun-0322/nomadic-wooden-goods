import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone, Sparkles, Ruler } from "lucide-react";
import { Button } from "./Button";
import { getCategoryName, BRAND } from "@/lib/utils";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  category: string;
  material?: string | null;
  lengthCm?: number | null;
  widthCm?: number | null;
  heightCm?: number | null;
  customizable?: boolean;
  priceNote?: string | null;
  imageUrl?: string;
}

export function ProductCard({
  slug,
  name,
  category,
  material,
  lengthCm,
  widthCm,
  heightCm,
  customizable = true,
  priceNote,
  imageUrl = "/uploads/avdar-ulzii-satin.jpg",
}: ProductCardProps) {
  const messengerInquiryUrl = `${BRAND.messengerUrl}?ref=${encodeURIComponent(
    `Лавлах: ${name}`
  )}`;

  const hasDimensions = lengthCm && widthCm && heightCm;

  return (
    <div className="group flex flex-col bg-brand-card rounded-xl border border-brand-border/80 shadow-warm hover:shadow-warmHover transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <Link
        href={`/products/${slug}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-brand-border/20 block"
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-brand-dark/85 text-white backdrop-blur-sm shadow-sm">
          {getCategoryName(category)}
        </span>

        {/* Customizable Badge */}
        {customizable && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-medium rounded-full bg-brand-gold/90 text-white backdrop-blur-sm shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Захиалгаар
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/products/${slug}`} className="block group-hover:text-brand-gold transition-colors">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-dark line-clamp-2 mb-2">
              {name}
            </h3>
          </Link>

          {/* Dimensions */}
          {hasDimensions && (
            <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-1.5">
              <Ruler className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <span>
                Хэмжээ: {lengthCm} × {widthCm} × {heightCm} см
              </span>
            </div>
          )}

          {/* Material */}
          {material && (
            <p className="text-xs text-brand-muted line-clamp-1 mb-3">
              <span className="font-semibold text-brand-dark/80">Материал:</span> {material}
            </p>
          )}

          {/* Price or Note */}
          {priceNote && (
            <p className="text-xs font-medium text-brand-gold mb-4 italic">
              {priceNote}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row gap-2 mt-auto">
          <Button
            href={`/products/${slug}`}
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
          >
            Дэлгэрэнгүй
          </Button>
          <Button
            href={messengerInquiryUrl}
            external
            variant="messenger"
            size="sm"
            icon={<MessageCircle className="w-3.5 h-3.5" />}
            className="flex-1 text-xs font-medium"
          >
            Messenger
          </Button>
        </div>
      </div>
    </div>
  );
}
