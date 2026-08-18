import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { TreePine, Hammer, Sparkles, CheckCircle2, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { PatternDivider } from "@/components/ui/PatternDivider";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Бидний тухай & Гар урлалын түүх",
  description:
    "Монгол уламжлалт гар урлал, модон сийлбэрийн технологи, цэвэр байгалийн модоор урлах бидний зарчимтай танилцана уу.",
};



const PROCESS_STEPS = [
  {
    num: "01",
    title: "Материал бэлтгэл & Зүсвэр",
    desc: "Хэрэглэгчийн сонгосон хэмжээний дагуу модыг нарийн зүсэж цэвэрлэн, бүдүүн болон нарийн зүлгүүрээр гадаргууг тэгшлэн бэлтгэдэг."
  },
  {
    num: "02",
    title: "Уламжлалт угсралт & Арам зангидах",
    desc: "Бэлтгэсэн модыг уламжлалт аргаар углуурган хийж, бүтээгдэхүүний ерөнхий арам болон бүтцийг бат бөх зангидна."
  },
  {
    num: "03",
    title: "2D&3D сийлбэр",
    desc: "Хэрэглэгчийн сонгосон хээ угалзыг 2D, 3D технологиор нарийвчлан сийлж, гадаргууг дахин нямбай зүлгэж төгс хэлбэрт оруулна."
  },
  {
    num: "04",
    title: "Тосон&Шороон будаг",
    desc: "Шороон болон тосон будаг шингээж өнгийг гарган, чанартай лакаар бүрхэж эцсийн байдлаар бүрэн хатааж бэлэн болгоно."
  }
];

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-blue">
            Үнэт зүйл & Өв уламжлал
          </span>
          <h1 className="font-serif font-bold text-brand-dark mt-2 mb-4">
             
            <span className="text-brand-gold">Нүүдэлчин модон эдлэл</span>
          </h1>
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            "Нүүдэлчин модон эдлэл" нь өвөг дээдсээс уламжлан ирсэн модон урлалын технологийг орчин үеийн айл гэр, ажлын орон зайн тав тухтай хослуулан бүтээж буй үндэсний үйлдвэрлэл юм.
          </p>
        </div>

        {/* Story Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-warm border border-brand-border bg-brand-border/20">
            <Image
              src="uploads/1786683792823-temee-awdar.jpg"
              alt="Модон эдлэл урлал"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-4 text-brand-muted text-sm sm:text-base leading-relaxed">
            <h2 className="font-serif font-bold text-2xl text-brand-dark">
              Бидний эрхэм зорилго
            </h2>
            <p>
              Орчин үеийн өндөр хурдтай нийгэмд бид хуванцар болон хэврэг шахмал хавтангаас татгалзаж, хүний сэтгэлд дулаан, эдэлгээ даах байгалийн амьд модон бүтээлийг айл бүрийн хойморт хүргэхийг зорьдог.
            </p>
            <p>
              Манай цехийн мастер урчууд 15 гаруй жил модон сийлбэр, оньс угсралтаар мэргэшсэн бөгөөд бүтээгдэхүүн бүрийг зөвхөн нэг удаагийн хэрэглээ биш, дараагийн үедээ өвлүүлэн үлдээх нандин нандин чанартай урладаг.
            </p>
            <div className="pt-2 flex items-center gap-4 text-brand-dark font-medium">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                <span>Үйлдвэрийн хатаалгын мод</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                <span>2D 3D сийлбэр</span>
              </div>
               <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                <span>Бүтэн углуурагтай</span>
              </div>
            </div>
          </div>
        </div>

        <PatternDivider variant="gold" className="my-12 sm:my-16" />

        {/* Wood Types Section */}
        

        {/* Crafting Process Steps */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Технологи & Дараалал
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-brand-dark mt-1 mb-2">
              Урлалын 4 үе шат
            </h2>
            <p className="text-sm text-brand-muted">
              Мод бэлтгэлээс эхлээд эцсийн бүтээл болох хүртэлх нарийн нямбай ажиллагаа.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-brand-card border border-brand-border relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif font-bold text-brand-gold/30 block mb-2">
                    {step.num}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-brand-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="rounded-2xl bg-brand-dark text-white p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
            Та гэрийнхээ интерьерт тохирох модон эдлэл захиалах уу?
          </h2>
          <p className="text-sm sm:text-base text-[#d0c4b6] max-w-xl mx-auto mb-8">
            Бид таны хүссэн загвар, хэмжээ, өнгө нь дээр зөвлөгөө өгч хийж өгнө.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href={BRAND.messengerUrl}
              external
              variant="messenger"
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Messenger-ээр холбогдох
            </Button>
            <Button
              href="/products"
              variant="outline"
              size="lg"
              className="text-white border-white/30 hover:border-brand-gold hover:text-brand-gold"
            >
              Каталог үзэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
