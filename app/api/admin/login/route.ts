import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const submittedPassword = String(password ?? "").trim();
    const correctPassword = (process.env.ADMIN_PASSWORD || "ngnex2026").trim();

    if (submittedPassword !== correctPassword) {
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
