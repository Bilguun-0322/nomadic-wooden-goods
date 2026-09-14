import test from "node:test";
import assert from "node:assert/strict";

import { getUploadStrategy, sanitizeFileName } from "./upload";

test("uses vercel blob in Vercel runtime", () => {
  const original = process.env.VERCEL;
  process.env.VERCEL = "1";

  try {
    assert.equal(getUploadStrategy(), "vercel-blob");
  } finally {
    if (original === undefined) {
      delete process.env.VERCEL;
    } else {
      process.env.VERCEL = original;
    }
  }
});

test("sanitizes uploaded file names", () => {
  assert.equal(sanitizeFileName("My Photo.jpeg"), "my-photo.jpeg");
  assert.equal(sanitizeFileName("!!!"), "image");
});
