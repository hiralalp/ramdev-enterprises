// Trims built-in whitespace/transparent padding from supplied client logos
// so they render at a consistent visual scale in the homepage clients grid.
// Outputs normalized PNGs into public/images/clients/trimmed/.
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.join(
  process.cwd(),
  "public",
  "images",
  "clients",
);
const outputDir = path.join(sourceDir, "trimmed");

async function main() {
  await mkdir(outputDir, { recursive: true });
  const entries = await readdir(sourceDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();

  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    // Keep the full original filename (incl. extension) in the output name:
    // c15.avif and c15.jpg are two different clients that share the "15"
    // number, so stripping the extension would collide.
    const outputName = `${file}.png`;
    const outputPath = path.join(outputDir, outputName);
    try {
      await sharp(inputPath)
        .flatten({ background: "#ffffff" })
        .trim({ background: "#ffffff", threshold: 12 })
        .png()
        .toFile(outputPath);
      console.log(`trimmed ${file} -> trimmed/${outputName}`);
    } catch (error) {
      await sharp(inputPath).png().toFile(outputPath);
      console.warn(
        `fallback (no trim) for ${file}: ${(error && error.message) || error}`,
      );
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
