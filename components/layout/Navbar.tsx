"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Нүүр" },
  { href: "/about", label: "Бидний тухай" },
  { href: "/products", label: "Бүтээгдэхүүн" },
  { href: "/contact", label: "Холбоо барих" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-bg/95 backdrop-blur-md shadow-sm border-b border-brand-border/80"
          : "bg-brand-bg border-b border-brand-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <Image
                src="/uploads/1786683792823-temee-awdar.jpg"
                alt="Нүүдэлчин модон эдлэл лого"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg text-brand-dark tracking-tight leading-none">
                {BRAND.name}
              </span>
              <span className="text-[11px] text-brand-muted font-medium tracking-wide">
                Гар урлал & Модон эдлэл
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors tap-target ${
                    isActive
                      ? "text-brand-gold bg-brand-border/30 font-semibold"
                      : "text-brand-dark/80 hover:text-brand-gold hover:bg-brand-border/20"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Button
              href={`tel:${BRAND.phoneRaw}`}
              variant="phone"
              size="sm"
              icon={<Phone className="w-3.5 h-3.5" />}
              className="text-xs font-bold"
            >
              {BRAND.phone}
            </Button>
            <Button
              href={BRAND.messengerUrl}
              external
              variant="messenger"
              size="sm"
              icon={<MessageCircle className="w-4 h-4" />}
              className="text-xs font-semibold"
            >
              Messenger
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              aria-label="Утсаар залгах"
              className="tap-target p-2 rounded-lg bg-[var(--brand-green)] text-white shadow-lg hover:bg-[var(--brand-greenHover)] transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="tap-target p-2.5 rounded-lg bg-brand-card border border-brand-border text-brand-dark focus:outline-none"
              aria-label={isOpen ? "Цэс хаах" : "Цэс нээх"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-brand-bg border-b border-brand-border shadow-xl px-4 pt-4 pb-6 transition-all duration-300 animate-in fade-in slide-in-from-top-2 z-40">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`tap-target px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                    isActive
                      ? "bg-brand-dark text-white font-semibold"
                      : "bg-brand-card text-brand-dark border border-brand-border/60 hover:bg-brand-border/30"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-brand-gold" />}
                </Link>
              );
            })}

            <Link
              href="/admin"
              className="tap-target px-4 py-2.5 rounded-lg text-xs font-medium text-brand-muted hover:text-brand-dark flex items-center gap-2 mt-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Админ удирдлагын хэсэг</span>
            </Link>

            <div className="pt-4 border-t border-brand-border/60 flex flex-col gap-2.5 mt-2">
              <Button
                href={BRAND.messengerUrl}
                external
                variant="messenger"
                size="md"
                fullWidth
                icon={<MessageCircle className="w-5 h-5" />}
              >
                Messenger-ээр захиалах
              </Button>
              <Button
                href={`tel:${BRAND.phoneRaw}`}
                variant="phone"
                size="md"
                fullWidth
                icon={<Phone className="w-5 h-5" />}
              >
                {BRAND.phone} руу залгах
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
