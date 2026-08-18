import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Эхлэл: Өгөгдлийг цэвэрлэж байна...");
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();

  console.log("Бүтээгдэхүүнүүдийг үүсгэж байна...");

  const products = [
    {
      slug: "avdar-ulzii-carved-pine",
      category: "avdar",
      name: "Угалзан сийлбэртэй уламжлалт авдар",
      lengthCm: 105,
      widthCm: 55,
      heightCm: 60,
      material: "Байгалийн нарс ба хуш мод, гар цутгамал гуулин тоног",
      customizable: true,
      isFeatured: true,
      priceNote: "Захиалгын хэмжээ, сийлбэрийн нарийвчлалаас хамаарна",
      description:
        "Монгол гэрийн хойморт өнгө нэмэх уламжлалт хээ угалз, үүлэн хээ бүхий гар сийлбэртэй авдар. Зуун дамжин өвлөгдөх чанартай хуш, нарс модоор хийгдэж, зэврэхгүй цэвэр гуулин нугас, цоожны хамгаалалтаар тоноглогдсон. Дотор зай багтаамж сайтай, чийгнээс хамгаалсан байгалийн лакаар өнгөлсөн.",
      tags: "авдар, уламжлалт, сийлбэр, гуулин тоног, хойморын авдар, монгол гэр",
      images: [
        { url: "/uploads/avdar-ulzii-satin.jpg" },
      ],
    },
    {
      slug: "larch-tea-table-stools-set",
      category: "wood_item",
      name: "Цул шинэсэн модон цайны нам ширээ, сандал",
      lengthCm: 120,
      widthCm: 60,
      heightCm: 45,
      material: "Хөвсгөлийн байгалийн цул шинэс (Larch) мод, модон оньст угсралт",
      customizable: true,
      isFeatured: true,
      priceNote: "Хослолын бүрдлээс хамаарна",
      description:
        "Орчин үеийн минималист хэв маяг болон монгол модон урлалыг хослуулсан зочны өрөөний нам ширээ, 2 ширхэг модон сандлын хослол. Хөл хэсэгт үл анзаарагдам монгол угалз сийлсэн бөгөөд төмөр хадаасгүй, уламжлалт модон оньс угсралтаар бат бөх хийгдсэн. Цай уух, тухлан суухад нэн тохиромжтой.",
      tags: "ширээ, сандал, зочны өрөө, шинэс мод, нам ширээ, модон тавилга",
      images: [
        { url: "/uploads/larch-tea-table.jpg" },
      ],
    },
    {
      slug: "burr-birch-carved-tea-bowls-set",
      category: "gift",
      name: "Хусны оньс, үндсэн сийлбэртэй аяга, тавагны ком",
      lengthCm: 38,
      widthCm: 26,
      heightCm: 12,
      material: "Байгалийн хусны оньс/үндэс (Burr birch), хүнсний зориулалттай лавлаг",
      customizable: false,
      isFeatured: true,
      priceNote: "Гар хийц тус бүр өвөрмөц хээтэй",
      description:
        "Хус модны байгалийн давтагдашгүй угалзарсан бүтэц бүхий үндсээр сийлсэн уламжлалт модон аяга, таваг, халбаганы дээд зэрэглэлийн бэлгийн багц. Цай, сүү, идээ ундаа хийхэд амт шингээхгүй, халуунд хагарахгүй байгалийн тосон боловсруулалттай.",
      tags: "модон аяга, таваг, хусны үндэс, бэлэг дурсгал, гар урлал, зочломтгой ёс",
      images: [
        { url: "/uploads/burr-birch-bowls.jpg" },
      ],
    },
    {
      slug: "mongolian-warriors-carved-chess-set",
      category: "gift",
      name: "Монгол баатруудын дүртэй гар сийлбэрт шатар",
      lengthCm: 52,
      widthCm: 52,
      heightCm: 10,
      material: "Хуш ба хус мод, өнгөлсөн хушган модон хүрээтэй хөлөг",
      customizable: true,
      isFeatured: true,
      priceNote: "Бэлгийн модон хайрцаг дагалдана",
      description:
        "Их Монгол улсын үеийн эзэн хаан, хатан, бөх баатрууд, морь тэмээний дүрсийг нэг бүрчлэн уран нарийн сийлсэн гар урлалын шатар. Хөлөг нь нугалардаг, дотроо хөлөгчид тус бүрийн хамгаалалтын ховилтой, өв дамжин үлдэх онцгой үнэ цэнэтэй бэлэг.",
      tags: "шатар, сийлбэр, монгол баатрууд, хуш мод, бэлэг дурсгал, өв соёл",
      images: [
        { url: "/uploads/nomad-carved-chess.jpg" },
      ],
    },
    {
      slug: "traditional-khas-double-chest",
      category: "avdar",
      name: "Хас хээтэй хос уламжлалт авдар",
      lengthCm: 90,
      widthCm: 48,
      heightCm: 52,
      material: "Нарс мод, гуулин тоног, байгалийн будаг",
      customizable: true,
      isFeatured: false,
      priceNote: "Хосоор эсвэл дангаар захиалах боломжтой",
      description:
        "Мөнх оршихуйн бэлгэдэл хас хээгээр чимэглэсэн хос модон авдар. Дээд зэргийн хатаасан нарс модоор урласан тул дулаан хүйтний улиралд цуурахгүй, эдэлгээ урттай.",
      tags: "хос авдар, хас хээ, нарс мод, гар урлал, гэр ахуй",
      images: [
        { url: "/uploads/avdar-ulzii-satin.jpg" },
      ],
    },
    {
      slug: "solid-wood-bookshelf-display",
      category: "wood_item",
      name: "Цул модон номын болон чимэглэлийн тавиур",
      lengthCm: 140,
      widthCm: 35,
      heightCm: 180,
      material: "Хуш мод, байгалийн мат лак",
      customizable: true,
      isFeatured: false,
      priceNote: "Өрөөний өндөр, хэмжээнд тохируулж хийнэ",
      description:
        "Орчин үеийн гэр болон оффисын интерьерт зориулсан байгалийн модны бүтэц үнэрийг хадгалсан олон тасалгаат номын тавиур. Харагдах байдал энгийн, цэвэрхэн бөгөөд даац сайн.",
      tags: "номын тавиур, модон тавилга, интерьер, хуш мод",
      images: [
        { url: "/uploads/larch-tea-table.jpg" },
      ],
    },
  ];

  for (const item of products) {
    const { images, ...productData } = item;
    const created = await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: images,
        },
      },
    });
    console.log(`+ Бүтээгдэхүүн нэмэгдлээ: ${created.name}`);
  }

  console.log("Амжилттай! Бүх бүтээгдэхүүн локал өгөгдлийн санд нэмэгдлээ.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
