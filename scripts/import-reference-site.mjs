import {
  readdir,
  readFile,
  writeFile,
  mkdir,
  copyFile,
} from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { parseDocument } from "htmlparser2";
import { findAll, textContent } from "domutils";
import sharp from "sharp";

const source = process.argv[2];
if (!source) throw new Error("Pass the local reference site directory.");
const output = "public/images/reference/ramdev-steels";
const sha = (buffer) => createHash("sha256").update(buffer).digest("hex");
const files = [];
async function copyImages(directory, relative = "") {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const local = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) {
      await copyImages(path.join(directory, entry.name), local);
      continue;
    }
    if (!/\.(jpe?g|png|webp|gif|svg|avif|bmp|ico)$/i.test(entry.name)) continue;
    const original = path.join(directory, entry.name);
    const destination = path.join(output, local);
    const bytes = await readFile(original);
    await mkdir(path.dirname(destination), { recursive: true });
    try {
      const existing = await readFile(destination);
      if (sha(existing) !== sha(bytes))
        throw new Error(`Destination differs: ${destination}`);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      await copyFile(original, destination);
    }
    if (sha(await readFile(destination)) !== sha(bytes))
      throw new Error(`Copy verification failed: ${local}`);
    files.push({
      path: `/images/reference/ramdev-steels/${local}`,
      source: `img/${local}`,
      bytes: bytes.length,
      sha256: sha(bytes),
    });
  }
}
await copyImages(path.join(source, "img"));
const catalogue = [];
const missing = [];
const imageMap = new Map(
  files.map((file) => [file.source.toLowerCase(), file.path]),
);
for (const filename of (await readdir(source))
  .filter(
    (file) =>
      file.endsWith(".html") &&
      !/^(index|about|contact|quality|service|feature|all-products)\.html$/.test(
        file,
      ),
  )
  .sort()) {
  const document = parseDocument(
    await readFile(path.join(source, filename), "utf8"),
  );
  const elements = findAll((node) => node.type === "tag", document.children);
  const headings = elements
    .filter((node) => node.name === "h1")
    .map((node) => textContent(node).trim())
    .filter((text) => text !== "Ramdev Steel Industries");
  const gallery = [];
  for (const element of elements.filter((node) => node.name === "img")) {
    let parent = element.parent;
    let isGallery = false;
    while (parent) {
      if (
        /project-item|product-item|masonry-item/.test(
          parent.attribs?.class || "",
        )
      )
        isGallery = true;
      parent = parent.parent;
    }
    if (!isGallery) continue;
    const src = (element.attribs.src || "").replace(/^\.\//, "");
    const asset = imageMap.get(src.toLowerCase());
    if (!asset) {
      missing.push({ page: filename, image: src });
      continue;
    }
    if (!gallery.some((image) => image.src === asset)) {
      const metadata = await sharp(path.join("public", asset))
        .metadata()
        .catch(() => ({}));
      if (metadata.width && metadata.height)
        gallery.push({
          src: asset,
          width: metadata.width,
          height: metadata.height,
        });
    }
  }
  const header = elements.find((node) =>
    /hero-header/.test(node.attribs?.class || ""),
  );
  const bannerSource = header?.attribs.style
    ?.match(/url\(['"]?(.*?)['"]?\)/)?.[1]
    ?.replace(/^\.\//, "");
  if (gallery.length)
    catalogue.push({
      page: filename,
      title: headings[0] || filename,
      banner: imageMap.get(bannerSource?.toLowerCase()),
      images: gallery,
    });
}
await mkdir("src/data", { recursive: true });
await writeFile(
  "src/data/reference-catalogue.json",
  JSON.stringify(catalogue, null, 2) + "\n",
);
await writeFile(
  "public/images/reference/manifest.json",
  JSON.stringify(
    {
      source: "User-supplied local veer-steel-art site",
      website: "https://ramdevsteels.in/",
      notice:
        "Copied at the user's request. Original branding and embedded marks are preserved. No open licence is asserted; confirm publication rights before deployment.",
      files,
      missing,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify(
    {
      copiedImages: files.length,
      sizeMB: Math.round(
        files.reduce((total, file) => total + file.bytes, 0) / 1024 / 1024,
      ),
      collections: catalogue.map((item) => ({
        page: item.page,
        title: item.title,
        photos: item.images.length,
      })),
      missingReferences: missing.length,
    },
    null,
    2,
  ),
);
