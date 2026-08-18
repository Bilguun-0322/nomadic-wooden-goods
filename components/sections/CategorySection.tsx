import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORY_CARDS = [
  {
    id: "avdar",
    title: "Уламжлалт Авдар",
    subtitle: "2D болон 3D сийлбэртэй авдарнууд",
    href: "/products?category=avdar",
    image: "/uploads/avdar-ulzii-satin.jpg",
    itemCount: "Захиалгаар",
  },
  {
    id: "wood_item",
    title: "Авдар сэргээн засварлах үйлчилгээ",
    subtitle: " Бид хуучин,гэмтэлтэй авдрыг чанартай сэргээн засварлаж байна.",
    href: "/products?category=wood_item",
    image: "/uploads/larch-tea-table.jpg",
    itemCount: "Захиалгаар",
  },
  {
    id: "gift",
    title: "Модон тавилга",
    subtitle: "Ширээ сандал, модон ор, мориний цондог, модон шүүгээ, тавиур бусад",
    href: "/products?category=gift",
    image: "/uploads/burr-birch-bowls.jpg",
    itemCount: "Захиалгаар",
  },
];

export function CategorySection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10">
          <div>
           
            <h2 className="font-serif font-bold text-brand-dark mt-1">
              Бүтээгдэхүүний Ангилал
            </h2>
          </div>
          <Link
            href="/products"
            className="mt-3 sm:mt-0 text-sm font-semibold text-brand-gold hover:text-brand-goldHover flex items-center gap-1 group tap-target"
          >
            <span>Бүх бүтээгдэхүүн үзэх</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-warm hover:shadow-warmHover transition-all duration-300 block border border-brand-border/80"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/35 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <span className="self-end px-3 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-md">
                  {cat.itemCount}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-brand-gold transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#e0d6cb] mt-1 line-clamp-1">
                    {cat.subtitle}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold group-hover:underline">
                    <span>Үзэх</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
