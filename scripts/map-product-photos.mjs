import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";

const mappings = [
  ["pre engineered steel plant", "pre-engineered-steel-plants"],
  ["ss bicycle stand", "stainless-steel-bicycle-stands"],
  ["ss bollards", "stainless-steel-bollards"],
  ["ss bus shelter", "stainless-steel-bus-shelters"],
  ["ss cable tray", "cable-trays"],
  ["ss canopies", "stainless-steel-canopies"],
  ["ss corner guards", "stainless-steel-corner-guards"],
  ["ss dustbins", "stainless-steel-dustbins"],
  ["ss facades", "stainless-steel-facades"],
  ["ss grattings", "stainless-steel-gratings"],
  ["ss pergolas", "stainless-steel-pergolas"],
  ["ss planter", "stainless-steel-planters"],
];
const collections = [];
for (const [folder, slug] of mappings) {
  const directory = path.join("public/images", folder);
  const filenames = (await readdir(directory, { recursive: true }))
    .filter((filename) => /\.(jpe?g|png|webp|avif)$/i.test(filename))
    .sort((first, second) =>
      first.localeCompare(second, "en", { numeric: true }),
    );
  if (!filenames.length) throw new Error(`No images in ${folder}`);
  const images = [];
  for (const filename of filenames) {
    const bytes = await readFile(path.join(directory, filename));
    const metadata = await sharp(bytes).metadata();
    await sharp(bytes).stats();
    if (!metadata.width || !metadata.height)
      throw new Error(`Invalid dimensions: ${folder}/${filename}`);
    images.push({
      src: `/images/${folder}/${filename.split(path.sep).join("/")}`,
      width: metadata.autoOrient?.width || metadata.width,
      height: metadata.autoOrient?.height || metadata.height,
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
  }
  collections.push({ folder, slug, images });
}
await writeFile(
  "src/data/supplied-product-photos.json",
  JSON.stringify(collections, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    collections.map(({ folder, slug, images }) => ({
      folder,
      slug,
      images: images.length,
    })),
    null,
    2,
  ),
);
console.log(
  `Validated ${collections.reduce((total, collection) => total + collection.images.length, 0)} images across ${collections.length} products. Originals unchanged.`,
);
