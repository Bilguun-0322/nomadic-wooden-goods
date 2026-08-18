import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/utils";
import { PatternDivider } from "@/components/ui/PatternDivider";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-8 mt-auto border-t border-brand-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="/uploads/1786683792823-temee-awdar.jpg"
                  alt="Нүүдэлчин модон эдлэл лого"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-serif font-bold text-lg text-white">
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm text-[#c5b9ad] leading-relaxed">
              Монгол түмний өв уламжлал, модон урлалын нандин өвийг орчин үеийн айл гэр, албан тасалгааны интерьертэй зохицуулан чанарын дээдээр урлана.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-brand-gold tracking-wide">
              Хуудсууд
            </h4>
            <ul className="space-y-2 text-sm text-[#c5b9ad]">
              <li>
                <Link href="/" className="hover:text-brand-gold transition-colors block py-1">
                  Нүүр хуудас
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors block py-1">
                  Бидний тухай & Урлал
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-gold transition-colors block py-1">
                  Бүтээгдэхүүний каталог
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors block py-1">
                  Холбоо барих
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-gold transition-colors inline-flex items-center gap-1 py-1 text-xs text-brand-gold/80">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Админ удирдлага
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-brand-gold tracking-wide">
              Бүтээгдэхүүн
            </h4>
            <ul className="space-y-2 text-sm text-[#c5b9ad]">
              <li>
                <Link href="/products?category=avdar" className="hover:text-brand-gold transition-colors block py-1">
                  Уламжлалт сийлбэрт авдар
                </Link>
              </li>
              <li>
                <Link href="/products?category=wood_item" className="hover:text-brand-gold transition-colors block py-1">
                  Модон тавилга & Ширээ сандал
                </Link>
              </li>
              <li>
                <Link href="/products?category=gift" className="hover:text-brand-gold transition-colors block py-1">
                  Бэлэг дурсгал & Модон шатар
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-gold transition-colors block py-1">
                  Тусгай захиалгат урлал
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-brand-gold tracking-wide">
              Холбоо барих
            </h4>
            <ul className="space-y-2.5 text-sm text-[#c5b9ad]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-white transition-colors">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>{BRAND.workHours}</span>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <a
                  href={BRAND.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target px-3 py-1.5 rounded-lg bg-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all text-xs font-semibold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  Messenger
                </a>
                <a
                  href={BRAND.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all text-xs"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <PatternDivider variant="subtle" className="my-8 opacity-30" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#a09488] gap-4">
          <p>© {new Date().getFullYear()} {BRAND.name}. Бүх эрх хуулиар хамгаалагдсан.</p>
          <p className="flex items-center gap-1">
            <span>Монгол улсад үйлдвэрлэв</span>
            <span className="text-brand-gold font-bold">🇲🇳</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
