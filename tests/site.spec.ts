import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { products } from "../src/data/products";
import { industries } from "../src/data/industries";
import { insights } from "../src/data/insights";
import { catalogueCategories } from "../src/data/products";
import { photoCredits } from "../src/lib/photo-credits";

const preview = process.env.PLAYWRIGHT_DRAFT_PREVIEW === "true";
const publishedProducts = products.filter(
  (product) => product.approved || preview,
);

const routes = [
  "/image-credits",
  "/",
  "/products",
  "/industries",
  "/projects",
  "/about",
  "/quality",
  "/insights",
  "/contact",
  "/request-quote",
  "/privacy",
  "/terms",
  ...publishedProducts.map((item) => `/products/${item.slug}`),
  ...industries.map((item) => `/industries/${item.slug}`),
  ...insights.map((item) => `/insights/${item.slug}`),
];
const widths = [375, 390, 430, 768, 1024, 1280, 1440, 1920];
const enquiry = {
  name: "Website QA",
  company: "Local test",
  email: "qa@example.com",
  phone: "",
  requirement: "Pipes & Tubes",
  quantity: "10 units",
  specification: "To discuss",
  location: "Chennai",
  details: "Local validation test of the requirement form.",
  website: "",
};

test("all routes, metadata, local links and required responsive widths", async ({
  page,
  request,
}) => {
  test.setTimeout(600000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const internalLinks = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`${route === "/" ? "/?" : route}$`),
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary",
    );
    expect(await page.locator("body").innerText()).not.toMatch(
      /lorem ipsum|DVEPK6522D(?!1ZX)|TODO_CONTENT|TODO_ASSET/i,
    );
    expect(
      await page
        .locator('a[href="#"], a[href^="tel:"], a[href*="wa.me"]')
        .count(),
    ).toBe(0);
    for (const link of await page
      .locator("a[href]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href") || ""),
      ))
      if (link.startsWith("/") && !link.startsWith("//"))
        internalLinks.add(link.split("?")[0].split("#")[0]);
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}px has overflow`,
      ).toBe(true);
      const overlaps = await page
        .locator("h1, h2, h3, .button, .contact-email")
        .evaluateAll((elements) =>
          elements
            .filter(
              (element) =>
                element.clientWidth > 0 &&
                element.scrollWidth > element.clientWidth + 2,
            )
            .map((element) => element.textContent),
        );
      expect(overlaps, `${route} text overflow at ${width}px`).toEqual([]);
    }
    expect(
      await page
        .locator("img")
        .evaluateAll(
          (images) =>
            images.filter(
              (image) =>
                image instanceof HTMLImageElement &&
                image.complete &&
                image.naturalWidth === 0,
            ).length,
        ),
      route,
    ).toBe(0);
  }
  for (const link of internalLinks)
    expect((await request.get(link)).status(), link).toBe(200);
  expect(errors).toEqual([]);
});

test("homepage screenshots, imagery and accessible landmarks", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(
    page.locator('.hero-slide[data-active="true"] .hero-art'),
  ).toBeVisible();
  expect(
    await page
      .locator('.hero-slide[data-active="true"] .hero-art')
      .evaluate((image) => (image as HTMLImageElement).naturalWidth),
  ).toBeGreaterThan(0);
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.screenshot({
    path: "test-results/home-desktop-viewport.png",
    animations: "disabled",
  });
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.screenshot({
    path: "test-results/home-mobile-viewport.png",
    animations: "disabled",
  });
});

test("homepage banners rotate, pause and remain responsive", async ({
  page,
}) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const active = page.locator('.hero-slide[data-active="true"]');
  await expect(active).toHaveAttribute("aria-label", /^1 of 3/);
  await page.clock.runFor(6100);
  await expect(active).toHaveAttribute("aria-label", /^2 of 3/);
  await page
    .getByRole("button", { name: "Pause banners", exact: true })
    .click();
  await page.mouse.move(0, 0);
  await page.clock.runFor(12000);
  await expect(active).toHaveAttribute("aria-label", /^2 of 3/);
  await page.getByRole("button", { name: "Play banners", exact: true }).click();
  await page.mouse.move(0, 0);
  await page.clock.runFor(6100);
  await expect(active).toHaveAttribute("aria-label", /^3 of 3/);
  await page.getByRole("button", { name: "Next banner", exact: true }).click();
  await expect(active).toHaveAttribute("aria-label", /^1 of 3/);
  await page
    .getByRole("button", { name: "Previous banner", exact: true })
    .click();
  await expect(active).toHaveAttribute("aria-label", /^3 of 3/);
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (let index = 1; index <= 3; index++) {
      await page
        .getByRole("button", { name: new RegExp(`^Show banner ${index}:`) })
        .click();
      await active
        .locator("img")
        .evaluate((image) => (image as HTMLImageElement).decode());
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `test-results/hero-${width}-${index}.png`,
        animations: "disabled",
      });
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.clock.runFor(18000);
  await expect(active).toHaveAttribute("aria-label", /^1 of 3/);
  await expect(
    page.getByRole("button", { name: "Pause banners", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Next banner", exact: true }).click();
  await expect(active).toHaveAttribute("aria-label", /^2 of 3/);
});

test("keyboard menus, modal focus containment and navigation", async ({
  page,
}) => {
  await page.goto("/");
  const productsTrigger = page.getByRole("button", {
    name: "Products",
    exact: true,
  });
  if (publishedProducts.length) {
    await productsTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#product-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(productsTrigger).toBeFocused();
    await expect(page.locator("#product-menu")).toHaveCount(0);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const menuAccessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(menuAccessibility.violations).toEqual([]);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Products", exact: true })
    .click();
  await expect(page).toHaveURL(/\/products$/);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("product filters, no-results state and prefilling", async ({ page }) => {
  test.skip(
    !preview,
    "Draft catalogue is intentionally hidden outside preview.",
  );
  await page.goto("/products");
  await expect(page.locator(".product-card")).toHaveCount(products.length);
  for (const category of catalogueCategories) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(page.locator(".product-card")).toHaveCount(
      products.filter((product) => product.category === category).length,
    );
  }
  await page
    .getByRole("button", {
      name: "Furniture",
      exact: true,
    })
    .click();
  await expect(
    page.locator('[data-product-slug="stainless-steel-tables"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('[data-product-slug="stainless-steel-benches"]'),
  ).toHaveCount(1);
  await page.getByRole("searchbox").fill("not-a-product");
  await expect(
    page.getByRole("heading", { name: "No matching products" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".product-card")).toHaveCount(products.length);
  await page.locator(".product-card").first().getByRole("link").click();
  await page
    .locator(".collection-banner")
    .getByRole("link", { name: "Request a quote" })
    .click();
  await expect(page.getByLabel("Product / requirement")).toHaveValue(
    products[0].name,
  );
});

test("form validation and honest unconfigured delivery", async ({ page }) => {
  await page.goto("/request-quote");
  await page.getByRole("button", { name: "Send your requirement" }).click();
  await expect(
    page.getByText("Enter your full name.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Full name")).toBeFocused();
  await page.getByLabel("Full name").fill(enquiry.name);
  await page.getByLabel("Email", { exact: false }).fill(enquiry.email);
  await page.getByLabel("Product / requirement").fill(enquiry.requirement);
  await page.getByLabel("Requirement details").fill(enquiry.details);
  await page.getByRole("button", { name: "Send your requirement" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your enquiry has not been sent",
  );
  await expect(
    page.getByRole("link", { name: "Open enquiry in email" }),
  ).toHaveAttribute("href", /^mailto:/);
  await expect(page.getByLabel("Full name")).toHaveValue(enquiry.name);
});

test("API validation, origin checks, size bounds and rate limiting", async ({
  request,
}) => {
  const invalid = await request.post("/api/enquiry", {
    data: { ...enquiry, email: "invalid" },
    headers: { "x-forwarded-for": "qa-invalid" },
  });
  expect(invalid.status()).toBe(400);
  expect(
    (
      await request.post("/api/enquiry", {
        data: enquiry,
        headers: {
          origin: "https://unrelated.example",
          "x-forwarded-for": "qa-origin",
        },
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/enquiry", {
        data: { ...enquiry, details: "x".repeat(17000) },
        headers: { "x-forwarded-for": "qa-size" },
      })
    ).status(),
  ).toBe(413);
  expect(
    (
      await request.post("/api/enquiry", {
        data: { ...enquiry, website: "spam" },
        headers: { "x-forwarded-for": "qa-honeypot" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/enquiry", {
        data: enquiry,
        headers: { "x-forwarded-for": "qa-mail" },
      })
    ).status(),
  ).toBe(503);
  const key = `qa-rate-${Date.now()}`;
  for (let index = 0; index < 5; index++)
    await request.post("/api/enquiry", {
      data: {},
      headers: { "x-forwarded-for": key },
    });
  expect(
    (
      await request.post("/api/enquiry", {
        data: {},
        headers: { "x-forwarded-for": key },
      })
    ).status(),
  ).toBe(429);
});

test("inner-page accessibility, 404s and SEO endpoints", async ({
  page,
  request,
}) => {
  for (const route of [
    "/products",
    ...(preview ? ["/products/ss-pvd-coated-screens-partitions"] : []),
    "/contact",
    "/request-quote",
    "/projects",
    "/insights/preparing-a-material-enquiry",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      })),
      route,
    ).toEqual([]);
    if (
      route === "/products" ||
      route === "/request-quote" ||
      route.startsWith("/products/")
    ) {
      await page.screenshot({
        path: `test-results/${route.slice(1).replaceAll("/", "-")}-desktop.png`,
        fullPage: true,
        animations: "disabled",
      });
      await page.setViewportSize({ width: 375, height: 900 });
      const mobileResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(mobileResults.violations, `${route} mobile`).toEqual([]);
      await page.screenshot({
        path: `test-results/${route.slice(1).replaceAll("/", "-")}-mobile.png`,
        fullPage: true,
        animations: "disabled",
      });
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
  }
  for (const route of [
    "/missing-page",
    "/products/missing",
    "/industries/missing",
    "/projects/missing",
    "/insights/missing",
  ]) {
    expect((await request.get(route)).status(), route).toBe(404);
  }
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("/products/");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    preview ? "Disallow: /" : "Disallow: /api/",
  );
});

test("production excludes drafts from routes, suggestions, page payloads and browser chunks", async ({
  page,
  request,
}) => {
  test.skip(preview, "Production publishing check.");
  for (const product of products)
    expect((await request.get(`/products/${product.slug}`)).status()).toBe(404);
  const chunks = new Set<string>();
  for (const route of [
    "/",
    "/products",
    "/contact",
    "/industries/construction-infrastructure",
    `/request-quote?product=${products[0].slug}`,
  ]) {
    const response = await page.goto(route);
    const html = await response!.text();
    for (const product of products) expect(html).not.toContain(product.name);
    await expect(page.locator('a[href^="/products/"]')).toHaveCount(0);
    await expect(page.locator(".draft-badge")).toHaveCount(0);
    for (const source of await page
      .locator("script[src]")
      .evaluateAll((scripts) =>
        scripts.map((script) => script.getAttribute("src")!),
      ))
      chunks.add(source);
  }
  await expect(page.getByLabel("Product / requirement")).toHaveValue("");
  await expect(page.locator("datalist option")).toHaveCount(1);
  await expect(page.locator("datalist option")).toHaveAttribute(
    "value",
    "Custom requirement",
  );
  for (const chunk of chunks) {
    const code = await (await request.get(chunk)).text();
    expect(code).not.toContain(products[0].intro);
    expect(code).not.toContain(products[26].name);
  }
});

test("every draft detail has unique metadata, complete sections, working RFQ and related links", async ({
  page,
}) => {
  test.skip(!preview, "Draft catalogue preview check.");
  test.setTimeout(600000);
  for (const product of products) {
    await page.goto(`/products/${product.slug}`);
    await expect(page).toHaveTitle(product.seoTitle);
    await expect(page.locator("h1")).toHaveText(product.name);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      product.metaDescription,
    );
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(page.locator(".collection-banner .draft-badge")).toHaveText(
      "Draft",
    );
    await expect(page.locator("#specifications")).toContainText(product.intro);
    await expect(page.locator(".specification-table tbody tr")).toHaveCount(
      product.specifications.length,
    );
    await expect(page.locator(".design-tile")).toHaveCount(
      Math.min(24, product.galleryImages!.length),
    );
    await expect(page.locator(".faq-list details")).toHaveCount(4);
    await expect(page.locator(".product-card")).toHaveCount(3);
    const related = await page
      .locator(".product-card")
      .evaluateAll((cards) =>
        cards.map((card) => card.getAttribute("data-product-slug")),
      );
    expect(related.sort()).toEqual([...product.relatedSlugs].sort());
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts.map((script) => JSON.parse(script.textContent || "{}")),
      );
    const breadcrumb = schemas.find(
      (schema) => schema["@type"] === "BreadcrumbList",
    );
    expect(
      breadcrumb.itemListElement.map((item: { name: string }) => item.name),
    ).toEqual(["Home", "Products", product.name]);
    expect(schemas.some((schema) => schema["@type"] === "Product")).toBe(false);
    const hero = page.locator(".collection-banner");
    await page.getByRole("link", { name: "Specification guidance" }).click();
    await expect(page).toHaveURL(/#specifications$/);
    await page.locator(".faq-list summary").first().click();
    await expect(page.locator(".faq-list details").first()).toHaveAttribute(
      "open",
      "",
    );
    await hero.getByRole("link", { name: "Request a quote" }).click();
    await expect(page.getByLabel("Product / requirement")).toHaveValue(
      product.name,
    );
  }
});

test("expanded mobile product groups remain keyboard accessible", async ({
  page,
}) => {
  test.skip(!preview, "Draft menu groups are only visible in preview.");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/products");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByText("Browse product groups", { exact: true }).click();
  await dialog.getByText("Furniture", { exact: true }).click();
  await expect(
    dialog.getByRole("link", { name: "Stainless Steel Bench", exact: true }),
  ).toBeVisible();
  for (let index = 0; index < 32; index++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  await dialog
    .getByRole("link", { name: "Stainless Steel Bench", exact: true })
    .click();
  await expect(page).toHaveURL(/\/products\/stainless-steel-benches$/);
  await expect(dialog).not.toBeVisible();
});

test("reference photographs load locally with credits and responsive captions", async ({
  page,
  request,
}) => {
  test.skip(
    !preview,
    "Product photographs are checked in local draft preview.",
  );
  test.setTimeout(300000);
  for (const product of products) {
    await page.goto(`/products/${product.slug}`);
    const image = page.locator(".collection-banner > img");
    await expect(image).toBeVisible();
    await image.evaluate((element) => (element as HTMLImageElement).decode());
    expect(
      await image.evaluate(
        (element) => (element as HTMLImageElement).naturalWidth,
      ),
    ).toBeGreaterThan(0);
    await expect(page.locator(".collection-heading")).toContainText(
      "supplied Ramdev Steel Industries catalogue",
    );
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  for (const route of [
    "/products",
    "/products/stainless-steel-benches",
    "/products/railings-turnkey-solutions",
    "/image-credits",
  ]) {
    await page.goto(route);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => (element as HTMLImageElement).decode());
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    for (const width of [1440, 375]) {
      await page.setViewportSize({ width, height: 900 });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations, `${route} at ${width}`).toEqual([]);
      await page.screenshot({
        path: `test-results/photos-${route.replaceAll("/", "-")}-${width}.png`,
        fullPage: true,
      });
    }
  }
  await expect(page.locator(".photo-credit-list article")).toHaveCount(
    photoCredits.length,
  );
  for (const photo of photoCredits) {
    await expect(page.locator(`#${photo.id}`)).toContainText(photo.author);
    for (const asset of photo.paths)
      expect((await request.get(asset)).status()).toBe(200);
  }
});

test("collection viewer, pagination and design-specific enquiries work with keyboard and mobile", async ({
  page,
}) => {
  test.skip(!preview, "Imported collections remain in draft preview.");
  const product = products.find(
    (item) => item.sourcePage === "ramdev-handles.html",
  )!;
  await page.goto(`/products/${product.slug}`);
  await expect(page.locator(".design-tile")).toHaveCount(24);
  await page.getByRole("button", { name: "More designs", exact: true }).click();
  await expect(page.locator(".design-tile")).toHaveCount(48);
  const first = page.locator(".design-image").first();
  await first.click();
  await expect(page.locator(".yarl__root")).toBeVisible();
  await page.screenshot({
    path: "test-results/collection-viewer-desktop.png",
    animations: "disabled",
  });
  await expect(page.locator(".lightbox-quote")).toHaveAttribute(
    "href",
    `\/request-quote?product=${product.slug}&design=1`,
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-quote")).toHaveAttribute(
    "href",
    `\/request-quote?product=${product.slug}&design=2`,
  );
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".lightbox-quote")).toHaveAttribute(
    "href",
    `\/request-quote?product=${product.slug}&design=1`,
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".yarl__root")).toHaveCount(0);
  await expect(first).toBeFocused();
  await page.setViewportSize({ width: 375, height: 812 });
  await first.click();
  await page.screenshot({
    path: "test-results/collection-viewer-mobile.png",
    animations: "disabled",
  });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.locator(".lightbox-quote").click();
  await expect(page.getByLabel("Product / requirement")).toHaveValue(
    product.name,
  );
  await expect(page.getByLabel("Requirement details")).toHaveValue(
    /Design reference: 002/,
  );
  await page.goto(`/request-quote?product=${product.slug}&design=99999`);
  await expect(page.getByLabel("Requirement details")).toHaveValue("");
  await page.goto("/request-quote?product=stainless-steel-dustbins");
  await expect(page.getByLabel("Product / requirement")).toHaveValue(
    "Stainless Steel Dustbins",
  );
});
