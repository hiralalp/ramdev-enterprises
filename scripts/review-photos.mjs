import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = ".photo-research";
const files = (await readdir(directory)).filter((file) =>
  file.endsWith("-search.json"),
);
const tiles = [];
const labels = [];
for (const file of files) {
  const record = JSON.parse(await readFile(path.join(directory, file), "utf8"));
  for (const [index, photo] of record.candidates.entries()) {
    if (index > 1) continue;
    const imagePath = path.join(directory, `${record.slug}-${index}.jpg`);
    try {
      const image = await readFile(imagePath);
      const tile = await sharp(image)
        .resize(300, 200, { fit: "contain", background: "#ffffff" })
        .jpeg()
        .toBuffer();
      tiles.push({
        input: tile,
        left: (tiles.length % 4) * 300,
        top: Math.floor(tiles.length / 4) * 200,
      });
      labels.push(
        `${tiles.length - 1}: ${record.slug} / ${index} / ${photo.title}`,
      );
    } catch {
      continue;
    }
  }
}
if (tiles.length) {
  await sharp({
    create: {
      width: 1200,
      height: Math.ceil(tiles.length / 4) * 200,
      channels: 3,
      background: "#ffffff",
    },
  })
    .composite(tiles)
    .jpeg()
    .toFile(path.join(directory, "contact-sheet.jpg"));
  await writeFile(path.join(directory, "contact-sheet.txt"), labels.join("\n"));
  console.log(labels.join("\n"));
}
