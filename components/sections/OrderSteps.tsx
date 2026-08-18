import React from "react";
import { MessageCircle, Phone, Sparkles, CheckCircle2, Truck, Ruler } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    icon: Ruler,
    title: "1. Загвар, Хэмжээгээ сонгох",
    desc: "Каталогоос бэлэн загваруудыг сонгох эсвэл өөрийн хүссэн өрөөний хэмжээ, загварын зургийг бидэнд илгээнэ.",
  },
  {
    step: "02",
    icon: MessageCircle,
    title: "2. Messenger эсвэл Утсаар лавлах",
    desc: "Манай утас болон мессэнжерээр холбогдож, хэмжээ, өнгө, загвар,хээ угалзыг сонгосны дараа үнэ болон хугацаагаа тохиролцоно.",
  },
  {
    step: "03",
    icon: Truck,
    title: "3.  Хүргэлт",
    desc: "Улаанбаатар хот дотор таны хаягаар үнэгүй хүргэж өгнө. 21 аймагт унаанд тавиж үйлчилнэ.",
  },
];

export function OrderSteps() {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Хялбар & Найдвартай
          </span>
          <h2 className="font-serif font-bold text-brand-dark mt-2 mb-3">
            Худалдан авалт болон захиалга хийх 3 энгийн алхам
          </h2>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-start p-6 rounded-2xl bg-brand-bg/50 border border-brand-border"
              >
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-gold/30 mb-2">
                  {s.step}
                </span>
                <div className="w-10 h-10 rounded-lg bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-dark mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner Box */}
        <div className="rounded-2xl bg-gradient-to-r from-brand-dark via-brand-woodDark to-brand-dark p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Танд тусгай хэмжээ, загварын захиалга байна уу?
            </h3>
            <p className="text-sm text-[#d4c7b8] max-w-xl">
              Бид таны санаа, хэрэгцээнд бүрэн нийцүүлэн эцсийн бүтээгдэхүүн хүртэл чанартай гүйцэтгэнэ.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
            <Button
              href={BRAND.messengerUrl}
              external
              variant="messenger"
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Messenger-ээр чатлах
            </Button>
            <Button
              href={`tel:${BRAND.phoneRaw}`}
              variant="phone"
              size="lg"
              icon={<Phone className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              {BRAND.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
