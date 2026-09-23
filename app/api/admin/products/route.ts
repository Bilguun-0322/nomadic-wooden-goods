import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

// Mark as dynamic to prevent build-time data collection
export const dynamic = "force-dynamic";

function getImageUrls(body: { imageUrls?: unknown; imageUrl?: unknown }): string[] {
  const values = Array.isArray(body.imageUrls)
    ? body.imageUrls
    : body.imageUrl
      ? [body.imageUrl]
      : [];

  return values
    .filter((url): url is string => typeof url === "string" && url.trim().length > 0)
    .slice(0, 3);
}

function checkAuth(): boolean {
  const authCookie = cookies().get("admin_auth");
  return authCookie?.value === "authenticated";
}

// GET: List all products
export async function GET() {
  try {
    const products = await db.product.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Бүтээгдэхүүнүүдийг дуудахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// POST: Create product
export async function POST(req: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      name,
      category,
      lengthCm,
      widthCm,
      heightCm,
      material,
      customizable,
      description,
      tags,
      isFeatured,
      priceNote,
      imageUrls,
      imageUrl,
    } = body;

    if (!name || !description || !category) {
      return NextResponse.json(
        { error: "Нэр, ангилал болон тайлбар заавал шаардлагатай" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let baseSlug = slugify(name);
    if (!baseSlug) baseSlug = `item-${Date.now()}`;
    let slug = baseSlug;
    let counter = 1;
    while (await db.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const created = await db.product.create({
      data: {
        name,
        slug,
        category,
        lengthCm: lengthCm ? parseInt(lengthCm) : null,
        widthCm: widthCm ? parseInt(widthCm) : null,
        heightCm: heightCm ? parseInt(heightCm) : null,
        material: material || null,
        customizable: customizable ?? true,
        description,
        tags: tags || "",
        isFeatured: isFeatured ?? false,
        priceNote: priceNote || null,
        images: getImageUrls({ imageUrls, imageUrl }).length
          ? {
              create: getImageUrls({ imageUrls, imageUrl }).map((url) => ({ url })),
            }
          : undefined,
      },
      include: { images: true },
    });

    return NextResponse.json({ product: created }, { status: 201 });
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json(
      { error: "Бүтээгдэхүүн нэмэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// PUT: Update product
export async function PUT(req: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      id,
      name,
      category,
      lengthCm,
      widthCm,
      heightCm,
      material,
      customizable,
      description,
      tags,
      isFeatured,
      priceNote,
      imageUrls,
      imageUrl,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Бүтээгдэхүүний ID дутуу байна" },
        { status: 400 }
      );
    }

    // Update product
    const updated = await db.product.update({
      where: { id },
      data: {
        name,
        category,
        lengthCm: lengthCm ? parseInt(lengthCm) : null,
        widthCm: widthCm ? parseInt(widthCm) : null,
        heightCm: heightCm ? parseInt(heightCm) : null,
        material: material || null,
        customizable: customizable ?? true,
        description,
        tags: tags || "",
        isFeatured: isFeatured ?? false,
        priceNote: priceNote || null,
      },
    });

    const urls = getImageUrls({ imageUrls, imageUrl });
    if (Array.isArray(imageUrls) || imageUrl) {
      await db.image.deleteMany({ where: { productId: id } });
      if (urls.length) {
        await db.image.createMany({
          data: urls.map((url) => ({ url, productId: id })),
        });
      }
    }

    const finalProduct = await db.product.findUnique({
      where: { id },
      include: { images: true },
    });

    return NextResponse.json({ product: finalProduct });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Бүтээгдэхүүн шинэчлэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// DELETE: Delete product
export async function DELETE(req: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Бүтээгдэхүүний ID дутуу байна" },
        { status: 400 }
      );
    }

    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Бүтээгдэхүүн устгахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
