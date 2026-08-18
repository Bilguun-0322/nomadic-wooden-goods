import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://nomadicwoodengoods.mn"),
  title: {
    default: "Нүүдэлчин модон эдлэл | Уламжлалт гар урлал, авдар, тавилга",
    template: "%s | Нүүдэлчин модон эдлэл",
  },
  description:
    "Монгол уламжлалт хээ угалзтай гар сийлбэрт авдар, байгалийн цул модон тавилга, бэлэг дурсгалыг чанарын дээдээр захиалгаар урлана.",
  keywords: [
    "модон эдлэл",
    "монгол авдар",
    "сийлбэрт авдар",
    "модон тавилга",
    "монгол гар урлал",
    "бэлэг дурсгал",
    "модон шатар",
    "хүссэн хэмжээгээр захиалах",
  ],
  authors: [{ name: "Нүүдэлчин модон эдлэл" }],
  openGraph: {
    title: "Нүүдэлчин модон эдлэл | Уламжлалт гар урлал ба цэвэр байгалийн мод",
    description:
      "Уламжлалт сийлбэрт авдар, байгалийн цул модон интерьерийн тавилга, гар хийцийн бэлэг дурсгалыг таны хүссэн хэмжээгээр захиалгаар урлана.",
    url: "https://nomadicwoodengoods.mn",
    siteName: "Нүүдэлчин модон эдлэл",
    images: [
      {
        url: "/uploads/avdar-ulzii-satin.jpg",
        width: 1200,
        height: 630,
        alt: "Нүүдэлчин модон эдлэл",
      },
    ],
    locale: "mn_MN",
    type: "website",
  },
  alternates: {
    canonical: "/",
    languages: {
      "mn-MN": "/",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    description: BRAND.description,
    telephone: BRAND.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Үйлдвэрийн бүс 3-р гудамж",
      addressLocality: "Улаанбаатар",
      addressCountry: "MN",
    },
    openingHours: "Mo-Sa 09:00-19:00",
    sameAs: [BRAND.facebookUrl, BRAND.instagramUrl],
  };

  return (
    <html lang="mn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Full Cyrillic Extended PT Serif and Manrope fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&subset=cyrillic,cyrillic-ext&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-brand-bg text-brand-dark font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
