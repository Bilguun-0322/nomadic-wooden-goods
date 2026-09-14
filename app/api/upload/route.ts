import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/upload";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Зургийн файл сонгогдоогүй байна" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Зөвхөн зураг файл оруулна уу" },
        { status: 400 }
      );
    }

    const fileUrl = await uploadFile(file);
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Зураг хадгалахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
