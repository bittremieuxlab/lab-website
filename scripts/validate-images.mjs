// Validates profile images: max 5 MB, square dimensions, and at least 360 × 360 px.
// Usage:
//   node scripts/validate-images.mjs

import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const MAX_BYTES = 5 * 1024 * 1024;
const MIN_PX = 360;
const IMAGE_RE = /\.(jpg|jpeg|png|webp|avif)$/i;
const PROFILE_IMAGE_DIR = 'src/assets/profile-images';

const files = readdirSync(PROFILE_IMAGE_DIR)
  .filter((f) => IMAGE_RE.test(f))
  .map((f) => join(PROFILE_IMAGE_DIR, f));

let failed = false;

for (const file of files) {
  const { size } = statSync(file);
  if (size > MAX_BYTES) {
    console.error(`${file}: ${(size / 1024 / 1024).toFixed(1)} MB exceeds the 5 MB limit`);
    failed = true;
  }

  const { width, height } = await sharp(file).metadata();
  if (width !== height) {
    console.error(`${file}: ${width}×${height} px is not square`);
    failed = true;
  }
  if (width < MIN_PX || height < MIN_PX) {
    console.error(`${file}: ${width}×${height} px is below the ${MIN_PX}×${MIN_PX} px minimum`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log(`${files.length} profile image(s) passed validation.`);
}
