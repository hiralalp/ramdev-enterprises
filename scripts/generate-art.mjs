import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const width = 1800;
const height = 1050;
const pixels = Buffer.alloc(width * height * 3);
for (let row = 0; row < height; row++) {
  for (let column = 0; column < width; column++) {
    const fade = Math.max(0, Math.min(1, (column - 660) / 500));
    const position = column + row * 0.52;
    const strip = (((position - 940) % 240) + 240) % 240;
    const fold =
      strip < 180
        ? 225 + 22 * Math.sin((strip / 180) * Math.PI)
        : 170 + (57 * (strip - 180)) / 60;
    const grain =
      (Math.sin(row * 4.93 + column * 0.038) + Math.sin(row * 1.72)) * 1.4;
    const shade = Math.round(248 * (1 - fade) + (fold + grain) * fade);
    const offset = (row * width + column) * 3;
    pixels[offset] = Math.max(0, shade - fade * 8);
    pixels[offset + 1] = Math.max(0, shade - fade * 3);
    pixels[offset + 2] = Math.min(255, shade + fade * 2);
  }
}
await mkdir("public/images/art", { recursive: true });
await sharp(pixels, { raw: { width, height, channels: 3 } })
  .webp({ quality: 88 })
  .toFile("public/images/art/material-study.webp");
console.log(
  "Generated abstract material study (not a product or project photograph).",
);
