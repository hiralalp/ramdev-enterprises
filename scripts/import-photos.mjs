import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { parseDocument } from "htmlparser2";
import { textContent } from "domutils";

const selections = JSON.parse(
  await readFile("scripts/photo-selections.json", "utf8"),
);
const credits = [];
const plainText = (value) => textContent(parseDocument(value)).trim();
for (const selection of selections) {
  const result = JSON.parse(
    await readFile(`.photo-research/${selection.search}-search.json`, "utf8"),
  );
  const photo = result.candidates[selection.candidate];
  const metadata = photo.metadata;
  const license = metadata.LicenseShortName?.value;
  if (!/^(CC BY(?:-SA)? [234]\.0|CC0|Public domain)$/.test(license || ""))
    throw new Error(`Unverified licence: ${photo.title}`);
  if (metadata.Restrictions?.value)
    throw new Error(`Additional rights review needed: ${photo.title}`);
  const input = `.photo-research/${selection.search}-${selection.candidate}.jpg`;
  const image = await sharp(input)
    .rotate()
    .resize({
      width: 1600,
      height: 1200,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 84 })
    .toBuffer();
  for (const target of selection.paths) {
    if (!/^\/images\/[a-z0-9/-]+\.webp$/.test(target))
      throw new Error(`Unsafe output path: ${target}`);
    const output = path.join("public", target);
    await mkdir(path.dirname(output), { recursive: true });
    let existing;
    try {
      await access(output);
      existing = await readFile(output);
    } catch {}
    if (existing && !existing.equals(image))
      throw new Error(
        `Existing image differs; review it before replacing: ${target}`,
      );
    if (!existing) await writeFile(output, image);
  }
  credits.push({
    id: selection.id,
    title: photo.title,
    author: plainText(
      metadata.Artist?.value ||
        metadata.Attribution?.value ||
        "See original source",
    ),
    source: photo.source,
    license,
    licenseUrl:
      metadata.LicenseUrl?.value ||
      "https://creativecommons.org/publicdomain/mark/1.0/",
    description: selection.description,
    paths: selection.paths,
    changes:
      "Resized and converted to WebP; no recolouring or generative edits. This version is available under the original image licence.",
    sourceMetadata: metadata,
    downloadedFrom: photo.thumbnail,
  });
  console.log(
    `${selection.id}: ${selection.paths.length} placements, ${Math.round(image.length / 1024)} KB`,
  );
}
await writeFile(
  "src/data/photo-credits.json",
  JSON.stringify(credits, null, 2) + "\n",
);
