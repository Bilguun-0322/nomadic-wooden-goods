import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, ShieldCheck, Sparkles, Hammer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 text-brand-woodDark border border-brand-gold/30 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>Уламжлалт Монгол гар урлал</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif font-bold text-brand-dark tracking-tight mb-4 text-balance">
              Байгалийн цэвэр мод, <br />
              <span className="text-brand-gold relative">
                Үе дамжих эд
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-brand-muted max-w-2xl mb-8 leading-relaxed">
              Танай гэрийн хойморт өнгө нэмэх сийлбэртэй авдар,гүнгэрваа байгалийн цул модон интерьер, гар хийцийн бүтэн углуурагтай авдарыг таны хүссэн хэмжээ, загвараар захиалгаар бид урлана.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <Button
                href="/products"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="shadow-md"
              >
                Бүтээгдэхүүн үзэх
              </Button>
              <Button
                href={BRAND.messengerUrl}
                external
                variant="messenger"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
              >
                Messenger-ээр захиалах
              </Button>
            </div>

            {/* 3 Quick Value Highlights */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-brand-border/80 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-2xl text-brand-dark">
                  100%
                </span>
                <span className="text-xs sm:text-sm text-brand-muted">
                  Гар хийц
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-2xl text-brand-dark">
                  Чанартай
                </span>
                <span className="text-xs sm:text-sm text-brand-muted">
                  2D,3D сийлбэртэй
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-2xl text-brand-dark">
                  Захиалга
                </span>
                <span className="text-xs sm:text-sm text-brand-muted">
                  Хүссэн хэмжээгээр
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-brand-border/30">
              <Image
                src="/uploads/avdar-ulzii-satin.jpg"
                alt="Монгол уламжлалт сийлбэрт авдар"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay Gradient Tag */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/40 to-transparent p-5 text-white">
                <p className="text-xs text-brand-gold font-medium uppercase tracking-wider">
                  Хойморын сонголт
                </p>
                <p className="font-serif text-lg font-bold">
                  Угалзан сийлбэрт уламжлалт авдар
                </p>
              </div>
            </div>

            {/* Floating Quality Badge */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-brand-card p-3 sm:p-4 rounded-xl border border-brand-border shadow-warm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-dark">
                  Чанартай материйл 
                </p>
                <p className="text-[11px] text-brand-muted">
                  Эдэлгээ урт
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
