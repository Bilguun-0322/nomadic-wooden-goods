import React from "react";
import { TreePine, Hammer, Shield, Palette } from "lucide-react";
import { PatternDivider } from "@/components/ui/PatternDivider";

const PILLARS = [
  {
    icon: TreePine,
    title: "1. Цэвэр мод",
    desc: "Үйлдвэрийн аргаар хатаасан, хүйтэнд цуурахгүй, халуунд агшиж хэлбэрээ алдахгүй материалыг ашигладаг.",
  },
  {
    icon: Hammer,
    title: "2. Уламжлалт углуургадаж хийгддэг",
    desc: "Төмөр хадаасны хэрэглээг багасгаж, углуурагдах арга ашиглан бүтээдэг.",
  },
  {
    icon: Shield,
    title: "3. Насан туршийн эдэлгээ",
    desc: "Байгалийн чанартай шороон будаг, лакаар бүрж, чийг тоос болон зурагдахаас хамгаална.",
  },
  {
    icon: Palette,
    title: "4. Захиалгат хийц, хэмжээ",
    desc: "Та өөрийн гэр, албан тасалгааны орон зайд тохируулан хэмжуу болон өнгө загварыг өөрчлөн захиалах боломжтой.",
  },
];

export function Craftsmanship() {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Үнэ цэнэ & Өв соёл
          </span>
          <h2 className="font-serif font-bold text-brand-dark mt-2 mb-3">
            Яагаад "Нүүдэлчин модон эдлэл"-ийг сонгох вэ?
          </h2>
          <p className="text-sm sm:text-base text-brand-muted">
            Бид үйлдвэрийн бэлэн бүтээгдэхүүн бус, байгалийн амьд мод ба монгол өв соёл шингэсэн насан туршийн үнэ цэнийг танд урлан өгдөг.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex flex-col p-6 rounded-xl bg-brand-bg/60 border border-brand-border/80 hover:border-brand-gold/60 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-brand-dark mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        <PatternDivider variant="gold" className="mt-12" />
      </div>
    </section>
  );
}
