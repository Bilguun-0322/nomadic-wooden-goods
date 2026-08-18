import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Mark as dynamic to prevent build-time processing
export const dynamic = "force-dynamic";

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
