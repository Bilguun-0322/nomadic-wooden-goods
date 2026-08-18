import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set({
    name: "admin_auth",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ success: true });
}
