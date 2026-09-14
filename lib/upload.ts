import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export function getUploadStrategy(): "vercel-blob" | "local" {
  return process.env.VERCEL ? "vercel-blob" : "local";
}

export function sanitizeFileName(fileName: string): string {
  const clean = (fileName || "image")
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();

  return clean || "image";
}
export async function uploadFile(file: File): Promise<string> {
  const strategy = getUploadStrategy();

  if (strategy === "vercel-blob") {
    const blob = await put(`uploads/${Date.now()}-${sanitizeFileName(file.name)}`, file, {
      access: "public",
    });

    return blob.url;
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const safeFileName = `${Date.now()}-${sanitizeFileName(file.name)}`.slice(0, 180);
  const filePath = path.join(uploadsDir, safeFileName);

  await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
  return `/uploads/${safeFileName}`;
}