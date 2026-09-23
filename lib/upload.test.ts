import test from "node:test";
import assert from "node:assert/strict";

import { getUploadStrategy, sanitizeFileName } from "./upload";

test("uses vercel blob in Vercel runtime when token is configured", () => {
  const originalVercel = process.env.VERCEL;
  const originalBlobToken = process.env.BLOB_READ_WRITE_TOKEN;

  process.env.VERCEL = "1";
  process.env.BLOB_READ_WRITE_TOKEN = "test-token";

  try {
    assert.equal(getUploadStrategy(), "vercel-blob");
  } finally {
    if (originalVercel === undefined) {
      delete process.env.VERCEL;
    } else {
      process.env.VERCEL = originalVercel;
    }

    if (originalBlobToken === undefined) {
      delete process.env.BLOB_READ_WRITE_TOKEN;
    } else {
      process.env.BLOB_READ_WRITE_TOKEN = originalBlobToken;
    }
  }
});

test("sanitizes uploaded file names", () => {
  assert.equal(sanitizeFileName("My Photo.jpeg"), "my-photo.jpeg");
  assert.equal(sanitizeFileName("!!!"), "image");
});

test("falls back to local uploads when Vercel blob token is missing", () => {
  const originalVercel = process.env.VERCEL;
  const originalBlobToken = process.env.BLOB_READ_WRITE_TOKEN;

  process.env.VERCEL = "1";
  delete process.env.BLOB_READ_WRITE_TOKEN;

  try {
    assert.equal(getUploadStrategy(), "local");
  } finally {
    if (originalVercel === undefined) {
      delete process.env.VERCEL;
    } else {
      process.env.VERCEL = originalVercel;
    }

    if (originalBlobToken === undefined) {
      delete process.env.BLOB_READ_WRITE_TOKEN;
    } else {
      process.env.BLOB_READ_WRITE_TOKEN = originalBlobToken;
    }
  }
});
