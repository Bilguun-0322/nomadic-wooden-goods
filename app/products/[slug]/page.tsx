import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  MessageCircle,
  Phone,
  Ruler,
  TreePine,
  Sparkles,
  CheckCircle2,
  Share2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { db } from "@/lib/db";
import { getCategoryName, BRAND } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { PatternDivider } from "@/components/ui/PatternDivider";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await db.product.findUnique({
    where: { slug: params.slug },
    include: { images: true },
  });

  if (!product) {
    return {
      title: "Бүтээгдэхүүн олдсонгүй",
    };
  }

  const imageUrl = product.images[0]?.url || "/uploads/avdar-ulzii-satin.jpg";

  return {
    title: `${product.name} | Нүүдэлчин модон эдлэл`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: `${product.name} | Нүүдэлчин модон эдлэл`,
      description: product.description.substring(0, 160),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { slug: params.slug },
    include: { images: true },
  });

  if (!product) {
    notFound();
  }

  // Related products in the same category
  const relatedProducts = await db.product.findMany({
    where: {
      category: product.category,
      NOT: { id: product.id },
    },
    include: { images: true },
    take: 3,
  });

  const mainImage = product.images[0]?.url || "/uploads/avdar-ulzii-satin.jpg";
  const messengerInquiryUrl = `${BRAND.messengerUrl}?ref=${encodeURIComponent(
    `Захиалга/Лавлагаа: ${product.name} (${product.slug})`
  )}`;

  // Product Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: mainImage,
    category: getCategoryName(product.category),
    material: product.material,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "MNT",
      price: "0",
      priceValidUntil: "2028-12-31",
      url: `https://nomadicwoodengoods.mn/products/${product.slug}`,
    },
  };

  const tagList = product.tags
    ? product.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-brand-muted mb-6">
          <Link href="/" className="hover:text-brand-dark transition-colors">
            Нүүр
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-dark transition-colors">
            Бүтээгдэхүүн
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-brand-dark transition-colors"
          >
            {getCategoryName(product.category)}
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-medium truncate max-w-[180px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Gallery / Image Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-warm border border-brand-border bg-brand-border/20">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-brand-dark/85 text-white backdrop-blur-sm">
                {getCategoryName(product.category)}
              </span>
            </div>

            {/* Thumbnail gallery if multiple images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <div
                    key={img.id}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-brand-border hover:border-brand-gold cursor-pointer transition-colors"
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Specifications & Order Box */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {product.customizable && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-brand-gold/15 text-brand-woodDark border border-brand-gold/30">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    Хүссэн хэмжээгээр хийлгэх боломжтой
                  </span>
                )}
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-brand-card text-brand-muted border border-brand-border">
                  Гар урлал
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-brand-dark mb-4">
                {product.name}
              </h1>

              {/* Price / Note */}
              {product.priceNote && (
                <div className="p-3.5 rounded-xl bg-brand-gold/10 border border-brand-gold/25 mb-6">
                  <p className="text-xs text-brand-muted font-medium">Үнийн мэдээлэл:</p>
                  <p className="text-sm sm:text-base font-serif font-bold text-brand-woodDark">
                    {product.priceNote}
                  </p>
                </div>
              )}

              {/* Specs Table */}
              <div className="rounded-xl bg-brand-card border border-brand-border p-4 sm:p-5 mb-6 space-y-3 shadow-warm">
                <h3 className="font-serif text-sm font-bold text-brand-dark uppercase tracking-wider border-b border-brand-border pb-2">
                  Техникийн үзүүлэлт
                </h3>

                {/* Dimensions */}
                {(product.lengthCm || product.widthCm || product.heightCm) && (
                  <div className="flex items-center justify-between text-sm py-1">
                    <span className="text-brand-muted flex items-center gap-1.5">
                      <Ruler className="w-4 h-4 text-brand-gold" />
                      Овор хэмжээ (У×Ө×Ө):
                    </span>
                    <span className="font-semibold text-brand-dark">
                      {product.lengthCm ?? "-"} × {product.widthCm ?? "-"} ×{" "}
                      {product.heightCm ?? "-"} см
                    </span>
                  </div>
                )}

                {/* Material */}
                {product.material && (
                  <div className="flex items-start justify-between text-sm py-1 border-t border-brand-border/40 pt-2">
                    <span className="text-brand-muted flex items-center gap-1.5 flex-shrink-0">
                      <TreePine className="w-4 h-4 text-brand-gold" />
                      Материал:
                    </span>
                    <span className="font-semibold text-brand-dark text-right ml-4">
                      {product.material}
                    </span>
                  </div>
                )}

                {/* Custom Order Guarantee */}
                <div className="flex items-center justify-between text-sm py-1 border-t border-brand-border/40 pt-2">
                  <span className="text-brand-muted flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-gold" />
                    Баталгаат хугацаа:
                  </span>
                  <span className="font-semibold text-brand-dark">
                    Үе дамжих чанар
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-serif text-base font-bold text-brand-dark mb-2">
                  Бүтээгдэхүүний тайлбар
                </h3>
                <p className="text-sm sm:text-base text-brand-muted leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              {tagList.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mb-8">
                  <span className="text-xs text-brand-muted mr-1">Түлхүүр үгс:</span>
                  {tagList.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-brand-border/40 text-brand-muted text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Action Order Area */}
            <div className="p-5 sm:p-6 rounded-2xl bg-brand-dark text-white shadow-xl space-y-3.5">
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-white">
                  Энэ бүтээгдэхүүнийг захиалах
                </h4>
                <p className="text-xs text-[#d0c4b6]">
                  Messenger эсвэл утсаар холбогдож өөрийн хэмжээгээр тохируулан захиалаарай.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  href={messengerInquiryUrl}
                  external
                  variant="messenger"
                  size="lg"
                  fullWidth
                  icon={<MessageCircle className="w-5 h-5" />}
                  className="font-bold text-sm sm:text-base"
                >
                  Messenger-ээр захиалах
                </Button>
                <Button
                  href={`tel:${BRAND.phoneRaw}`}
                  variant="phone"
                  size="lg"
                  fullWidth
                  icon={<Phone className="w-5 h-5" />}
                  className="font-bold text-sm sm:text-base"
                >
                  Утсаар лавлах
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-brand-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-brand-dark">
                Төстэй бүтээгдэхүүнүүд
              </h2>
              <Link
                href={`/products?category=${product.category}`}
                className="text-xs sm:text-sm font-semibold text-brand-gold hover:underline"
              >
                Ангиллыг бүхэлд нь үзэх
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  id={rel.id}
                  slug={rel.slug}
                  name={rel.name}
                  category={rel.category}
                  material={rel.material}
                  lengthCm={rel.lengthCm}
                  widthCm={rel.widthCm}
                  heightCm={rel.heightCm}
                  customizable={rel.customizable}
                  priceNote={rel.priceNote}
                  imageUrl={rel.images[0]?.url || "/uploads/avdar-ulzii-satin.jpg"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
