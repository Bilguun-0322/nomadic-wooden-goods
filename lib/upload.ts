
import { put } from "@vercel/blob";

export function getUploadStrategy(): "vercel-blob" | "local" {
  if (process.env.VERCEL) {
    return "vercel-blob";
  }

  return "local";
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

async function uploadLocally(file: File): Promise<string> {
  // Зөвхөн локал хөгжүүлэлтийн орчинд ашиглана.
  const fs = await import("fs/promises");
  const path = await import("path");

  const uploadsDir = path.join(
    process.cwd(),
    "public",
    "uploads"
  );

  await fs.mkdir(uploadsDir, { recursive: true });

  const safeFileName =
    `${Date.now()}-${sanitizeFileName(file.name)}`.slice(0, 180);

  const filePath = path.join(uploadsDir, safeFileName);

  await fs.writeFile(
    filePath,
    Buffer.from(await file.arrayBuffer())
  );

  return `/uploads/${safeFileName}`;
}

export async function uploadFile(file: File): Promise<string> {
  const strategy = getUploadStrategy();

  if (strategy === "vercel-blob") {
    // Vercel дээр Blob амжилтгүй болбол локал хавтас руу
    // fallback хийхгүй. Анхны алдааг хадгалж гаргана.
    const blob = await put(
      `uploads/${Date.now()}-${sanitizeFileName(file.name)}`,
      file,
      {
        access: "public",
        addRandomSuffix: true,
      }
    );

    return blob.url;
  }

  return uploadLocally(file);
}