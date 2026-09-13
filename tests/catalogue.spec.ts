import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { photoCredits } from "../src/lib/photo-credits";
import {
  legacyProducts as products,
  legacyCatalogueCategories as catalogueCategories,
  products as referenceProducts,
} from "../src/data/products";
import { createHash } from "node:crypto";
import referenceCatalogue from "../src/data/reference-catalogue.json";
import {
  belongsToCategory,
  draftPreviewEnabled,
  selectVisibleProducts,
} from "../src/lib/product-visibility";

test("legacy catalogue retains exactly the 27 canonical products with complete unique content", () => {
  const specification = readFileSync(
    "Ramdev_Enterprises_All_Product_Pages_GPT6_Spec.md",
    "utf8",
  );
  const slugs = [
    ...specification.matchAll(/\*\*Slug:\*\* `\/products\/([^`]+)`/g),
  ].map((match) => match[1]);
  expect(products.map((product) => product.slug)).toEqual(slugs);
  expect(products).toHaveLength(27);
  expect(new Set(products.map((product) => product.intro)).size).toBe(27);
  expect(new Set(products.map((product) => product.metaDescription)).size).toBe(
    27,
  );
  expect(
    catalogueCategories.map(
      (category) =>
        products.filter((product) => product.category === category).length,
    ),
  ).toEqual([9, 6, 7, 4, 1]);
  for (const product of products) {
    expect(product.approved).toBe(false);
    expect(product.features.length).toBeGreaterThanOrEqual(5);
    expect(product.features.length).toBeLessThanOrEqual(8);
    expect(product.applications.length).toBeGreaterThanOrEqual(4);
    expect(product.specifications.length).toBeGreaterThanOrEqual(5);
    expect(product.specifications.length).toBeLessThanOrEqual(8);
    expect(product.faqs).toHaveLength(4);
    expect(product.howToSpecify).toHaveLength(4);
    expect(product.relatedSlugs).toHaveLength(3);
    expect(product.gallery).toHaveLength(4);
    expect(product.seoTitle).toBe(
      `${product.name} | Ramdev Enterprises Chennai`,
    );
    for (const slug of product.relatedSlugs) {
      expect(slug).not.toBe(product.slug);
      expect(slugs).toContain(slug);
    }
  }
});

test("imported collections retain valid local images, unique routes and approval control", async () => {
  expect(referenceProducts).toHaveLength(41);
  expect(new Set(referenceProducts.map((product) => product.slug)).size).toBe(
    41,
  );
  expect(selectVisibleProducts(referenceProducts)).toEqual([]);
  expect(selectVisibleProducts(referenceProducts, true)).toHaveLength(41);
  const manifest = JSON.parse(
    readFileSync("public/images/reference/manifest.json", "utf8"),
  );
  expect(manifest.files).toHaveLength(1691);
  expect(manifest.missing).toEqual([]);
  const paths = new Set<string>();
  for (const file of manifest.files) {
    const bytes = readFileSync(`public${file.path}`);
    expect(bytes.length, file.path).toBe(file.bytes);
    expect(createHash("sha256").update(bytes).digest("hex"), file.path).toBe(
      file.sha256,
    );
    paths.add(file.path);
  }
  const checked = new Set<string>();
  for (const product of referenceProducts) {
    const source = referenceCatalogue.find(
      (collection) => collection.page === product.sourcePage,
    )!;
    expect(product.galleryImages).toEqual(source.images);
    expect(product.galleryImages!.length).toBeGreaterThan(0);
    expect(product.image).toBe(source.images[0].src);
    if (product.banner) expect(paths.has(product.banner)).toBe(true);
    expect(product.relatedSlugs).toHaveLength(3);
    for (const slug of product.relatedSlugs!) {
      expect(slug).not.toBe(product.slug);
      expect(referenceProducts.some((other) => other.slug === slug)).toBe(true);
    }
    for (const image of product.galleryImages!) {
      expect(paths.has(image.src), image.src).toBe(true);
      if (checked.has(image.src)) continue;
      checked.add(image.src);
      const metadata = await sharp(`public${image.src}`).metadata();
      expect([image.width, image.height]).toEqual([
        metadata.width,
        metadata.height,
      ]);
    }
  }
});

test("draft publishing fails closed in production and defaults to approved only", () => {
  expect(selectVisibleProducts(products)).toEqual([]);
  expect(
    selectVisibleProducts(products, draftPreviewEnabled("true", "development")),
  ).toHaveLength(27);
  for (const environment of ["production", "test", undefined])
    expect(draftPreviewEnabled("true", environment)).toBe(false);
  for (const flag of [undefined, "false", "TRUE", "1"])
    expect(draftPreviewEnabled(flag, "development")).toBe(false);
  const mixed = [{ ...products[0], approved: true }, products[1]];
  expect(
    selectVisibleProducts(mixed, draftPreviewEnabled("true", "production")),
  ).toEqual([mixed[0]]);
});

test("cross-category products retain a single canonical identity", () => {
  const exterior = products.filter((product) =>
    belongsToCategory(product, "Exterior & Architectural Products"),
  );
  expect(exterior).toHaveLength(6);
  expect(exterior.map((product) => product.slug)).toEqual(
    expect.arrayContaining([
      "stainless-steel-cladding",
      "stainless-steel-benches",
    ]),
  );
  expect(new Set(products.map((product) => product.slug)).size).toBe(27);
});

test("reference photos have complete provenance and valid optimized local files", async () => {
  expect(photoCredits.length).toBeGreaterThanOrEqual(20);
  const paths = new Set<string>();
  for (const photo of photoCredits) {
    expect(photo.author).toBeTruthy();
    expect(photo.author).not.toMatch(/<[^>]+>/);
    expect(photo.source).toMatch(
      /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/,
    );
    expect(photo.license).toMatch(
      /^(CC BY(?:-SA)? [234]\.0|CC0|Public domain)$/,
    );
    expect(photo.licenseUrl).toMatch(/^https?:\/\/creativecommons\.org\//);
    expect(photo.description).toBeTruthy();
    expect(photo.changes).toContain("WebP");
    for (const asset of photo.paths) {
      expect(paths.has(asset)).toBe(false);
      paths.add(asset);
      const data = readFileSync(`public${asset}`);
      const metadata = await sharp(data).metadata();
      expect(metadata.format).toBe("webp");
      expect(metadata.width).toBeGreaterThanOrEqual(400);
      expect(metadata.width).toBeLessThanOrEqual(1600);
      expect(data.length).toBeLessThan(700000);
    }
  }
});
