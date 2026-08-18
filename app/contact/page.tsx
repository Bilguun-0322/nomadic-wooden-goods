import React from "react";
import type { Metadata } from "next";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  HelpCircle,
  Sparkles,
  Truck,
  CheckCircle,
} from "lucide-react";
import { BRAND } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PatternDivider } from "@/components/ui/PatternDivider";

export const metadata: Metadata = {
  title: "Холбоо барих & Захиалга өгөх",
  description:
    "Нүүдэлчин модон урлалын цехтэй холбогдож, үнийн санал, хэмжээ авах болон захиалга өгөөрэй. Утас: +976 9911-8899",
};

const FAQS = [
  {
    q: "Захиалга хэд хоногт бэлэн болдог вэ?",
    a: "Бүтээгдэхүүний хэмжээ, сийлбэрийн нарийвчлалаас хамааран энгийн захиалга 5-10 хоног, том хэмжээний сийлбэртэй авдар болон иж бүрэн тавилга 10-20 хоногт бүрэн хатаж, урлагдан бэлэн болдог.",
  },
  {
    q: "Хөдөө орон нутаг болон хот дотор хүргэлттэй юу?",
    a: "Тийм. Улаанбаатар хот дотор таны гэрийн үүдэнд хүргэж өгнө. Хөдөө орон нутгийн захиалагчдад зориулж модон бүтээгдэхүүнийг тусгай хамгаалалтын хайрцаг, хөөсөн ороолтоор баглан орон нутгийн найдвартай унаанд тавьж хүргүүлдэг.",
  },
  {
    q: "Захиалгын урьдчилгаа хэдэн хувь байдаг вэ?",
    a: "Захиалга албан ёсоор баталгаажиж, мод зүсэлт эхлэхэд нийт үнийн дүнгийн 30-50%-ийн урьдчилгаа авдаг. Үлдсэн төлбөрийг бүтээгдэхүүн бэлэн болж, хэрэглэгч шалган хүлээж авах үед төлнө.",
  },
  {
    q: "Өөрийн санаа, зургийн дагуу тусгай захиалга өгч болох уу?",
    a: "Болно. Та өөрийн хүссэн хэмжээ, өрөөний зай эсвэл дуртай сийлбэрийн зураг, санаагаа манай Facebook Messenger-ээр илгээж үнэ төлбөргүй зөвлөгөө авч тооцоолуулж болно.",
  },
];

export default function ContactPage() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Холбоо барих
          </span>
          <h1 className="font-serif font-bold text-brand-dark mt-2 mb-3">
            Бидэнтэй холбогдох
          </h1>
          <p className="text-sm sm:text-base text-brand-muted">
            Захиалга өгөх, хэмжээ тохирох эсвэл модон эдлэлийн талаар зөвлөгөө авах бол доорх сувгуудаар холбогдоорой.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Info Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <div className="p-6 rounded-2xl bg-white border border-brand-border shadow-warm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-brand-dark mb-1">
                    Шууд залгах
                  </h3>
                  <p className="text-xs text-brand-muted mb-4">
                    Шуурхай мэдээлэл, үнийн лавлагаа
                  </p>
                </div>
                <Button
                  href={`tel:${BRAND.phoneRaw}`}
                  variant="phone"
                  size="md"
                  fullWidth
                  className="text-sm font-bold"
                >
                  {BRAND.phone}
                </Button>
              </div>

              {/* Messenger Card */}
              <div className="p-6 rounded-2xl bg-white border border-brand-border shadow-warm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0084FF]/10 text-[#0084FF] flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-brand-dark mb-1">
                    Facebook Messenger
                  </h3>
                  <p className="text-xs text-brand-muted mb-4">
                    Зураг, хэмжээгээ илгээж чатлах
                  </p>
                </div>
                <Button
                  href={BRAND.messengerUrl}
                  external
                  variant="messenger"
                  size="md"
                  fullWidth
                  className="text-sm font-bold"
                >
                  Чат эхлүүлэх
                </Button>
              </div>
            </div>

            {/* Address & Hours Detail Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-card border border-brand-border shadow-warm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/15 text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-brand-dark">
                    Үйлдвэрийн цехийн байршил
                  </h4>
                  <p className="text-sm text-brand-muted mt-0.5">
                    {BRAND.address}
                  </p>
                  <p className="text-xs text-brand-gold font-medium mt-1">
                    * Хүрэлцэн ирж бэлэн бүтээгдэхүүнтэй биечлэн танилцах боломжтой.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-brand-border/60">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/15 text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-brand-dark">
                    Ажиллах цагийн хуваарь
                  </h4>
                  <p className="text-sm text-brand-muted mt-0.5">
                    {BRAND.workHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Fast Contact Prompt */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-brand-dark text-white shadow-xl">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-brand-gold/20 text-brand-gold">
                <Sparkles className="w-3.5 h-3.5" />
                Шуурхай захиалга
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                Захиалга өгөхөд бэлэн үү?
              </h3>
              <p className="text-sm text-[#d0c4b6] leading-relaxed">
                Та манай Messenger рүү бүтээгдэхүүнийхээ нэр эсвэл өөрийн хүссэн загварын зургийг илгээхэд л хангалттай. Бид танд дараах үйлчилгээг үзүүлнэ:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#e6ded4]">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Модны сонголт, чанарын зөвлөгөө</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Хэмжээний үнэ төлбөргүй тооцоолол</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Хүргэлт, угсралтын баталгаа</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 space-y-3">
              <Button
                href={BRAND.messengerUrl}
                external
                variant="messenger"
                size="lg"
                fullWidth
                icon={<MessageCircle className="w-5 h-5" />}
                className="font-bold"
              >
                Messenger-ээр захиалах
              </Button>
              <Button
                href={`tel:${BRAND.phoneRaw}`}
                variant="phone"
                size="lg"
                fullWidth
                icon={<Phone className="w-5 h-5" />}
                className="font-bold"
              >
                {BRAND.phone}
              </Button>
            </div>
          </div>
        </div>

        <PatternDivider variant="gold" className="my-12 sm:my-16" />

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Тусламж & Мэдээлэл
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-brand-dark mt-1">
              Түгээмэл Асуулт, Хариулт
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl bg-white border border-brand-border shadow-warm flex flex-col justify-start"
              >
                <div className="flex items-start gap-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <h3 className="font-serif font-bold text-base text-brand-dark">
                    {item.q}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed pl-8">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
