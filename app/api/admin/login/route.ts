import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Mark as dynamic to prevent build-time processing
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const submittedPassword = String(password ?? "").trim();
    const validPasswords = new Set(
      [
        process.env.ADMIN_PASSWORD,
        "nomad2026",
        "ngnex2026",
      ]
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
    );

    if (!validPasswords.has(submittedPassword)) {
      return NextResponse.json(
        { error: "Нууц үг буруу байна" },
        { status: 401 }
      );
    }

    // Set auth cookie for 7 days
    cookies().set({
      name: "admin_auth",
      value: "authenticated",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Нэвтрэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
