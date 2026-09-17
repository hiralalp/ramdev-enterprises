import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { products } from "../src/data/products";
import { industries } from "../src/data/industries";
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
  "/contact",
  "/request-quote",
  "/privacy",
  "/terms",
  ...publishedProducts.map((item) => `/products/${item.slug}`),
  ...industries.map((item) => `/industries/${item.slug}`),
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
      new RegExp(`${route === "/" ? "" : route}/?$`),
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
    expect(await page.locator('a[href="#"]').count()).toBe(0);
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
  await expect(page.locator("h1")).toHaveText("Pre-engineered steel plants.");
  await expect(
    page.getByText("PRIMARY BUSINESS", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View plant capabilities", exact: true }),
  ).toHaveAttribute("href", /^\/products\/pre-engineered-steel-plants\/?$/);
  await expect(
    page.getByRole("heading", {
      name: "Useful answers before the first discussion.",
    }),
  ).toBeVisible();
  await expect(page.locator(".homepage-faq-list details")).toHaveCount(4);
  await expect(page.locator('a[href^="/insights"]')).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "Trusted by builders, developers and project teams.",
    }),
  ).toBeVisible();
  await expect(page.locator(".client-tile")).toHaveCount(34);
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

test("construction and interiors photos, steel plant project content and removed Insights routes", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/industries", "/projects"]) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      expect((await page.goto(route))?.status()).toBe(200);
      const photos = page.locator(".application-photo img");
      await expect(photos).toHaveCount(3);
      for (const photo of await photos.all()) {
        await photo.scrollIntoViewIfNeeded();
        await expect(photo).toHaveAttribute("alt", /.+/);
        await expect.poll(() => photo.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        await expect(photo.locator("xpath=ancestor::div[contains(@class, 'reveal')]")).toHaveCSS("opacity", "1");
      }
      await expect(page.locator('a[href^="/insights"]')).toHaveCount(0);
      if (route === "/industries") {
        await expect(page.getByRole("heading", { name: "Interiors & architectural metalwork" })).toBeVisible();
      } else {
        await expect(page.getByRole("heading", { name: "Warehouses & logistics buildings" })).toBeVisible();
        await expect(page.locator('.application-band a[href^="/request-quote"][href$="?product=pre-engineered-steel-plants"]')).toHaveCount(3);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(accessibility.violations).toEqual([]);
      await page.screenshot({ path: `test-results/${route.slice(1)}-${width}.png`, fullPage: true, animations: "disabled" });
    }
  }
  for (const route of ["/insights", "/insights/preparing-a-material-enquiry", "/insights/reading-material-specifications", "/insights/planning-project-procurement"]) {
    expect((await request.get(route)).status(), route).toBe(404);
  }
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/insights");
  expect(errors).toEqual([]);
});

test("expanded About and Quality content, links and accessible FAQs", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/about", "/quality"]) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      expect((await page.goto(route))?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      for (const region of await page.locator(".reveal").all()) {
        await region.scrollIntoViewIfNeeded();
        await expect(region).toHaveCSS("opacity", "1");
      }
      if (route === "/about") {
        await expect(page.getByRole("heading", {
          name: "The building, the operation and the details between.",
        })).toBeVisible();
        await expect(page.locator(".quality-grid article")).toHaveCount(3);
        await expect(page.getByRole("link", { name: "Share your building brief" }))
          .toHaveAttribute("href", /^\/request-quote\/?\?product=pre-engineered-steel-plants$/);
      } else {
        await expect(page.locator(".quality-grid article")).toHaveCount(6);
        await expect(page.getByRole("heading", {
          name: "Make the evidence part of the enquiry.",
        })).toBeVisible();
        const photo = page.getByRole("img", { name: /Reference steel building frame/ });
        await expect.poll(() => photo.evaluate(
          (image) => (image as HTMLImageElement).naturalWidth,
        )).toBeGreaterThan(0);
        const questions = page.locator(".homepage-faq-list details");
        await expect(questions).toHaveCount(4);
        for (const question of await questions.all()) {
          const summary = question.locator("summary");
          await summary.focus();
          await summary.press("Enter");
          await expect(question).toHaveAttribute("open", "");
          await expect(question.locator("p")).toBeVisible();
          await summary.press("Enter");
          await expect(question).not.toHaveAttribute("open", "");
        }
        await expect(page.getByRole("link", { name: "Discuss quality requirements" }))
          .toHaveAttribute("href", /^\/request-quote\/?\?product=pre-engineered-steel-plants$/);
      }
      expect(await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      )).toBe(true);
      const overflowingText = await page.locator("h1, h2, h3, .button")
        .evaluateAll((elements) => elements.filter(
          (element) => element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 2,
        ).map((element) => element.textContent));
      expect(overflowingText).toEqual([]);
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      await page.evaluate(() => {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await page.screenshot({
        path: `test-results/${route.slice(1)}-expanded-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
    }
  }
  for (const href of ["/projects", "/products/pre-engineered-steel-plants", "/request-quote?product=pre-engineered-steel-plants"]) {
    expect((await request.get(href)).status()).toBe(200);
  }
  expect(errors).toEqual([]);
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

test("pre-engineered steel plant is the primary homepage and catalogue offering", async ({
  page,
}) => {
  test.skip(!preview, "The plant product remains in owner-review preview.");
  await page.goto("/");
  await expect(
    page.locator('.hero-slide[data-active="true"] img'),
  ).toHaveAttribute(
    "src",
    /pre%20engineered%20steel%20plant.*SKC-Steel-Buildings-014/,
  );
  await page
    .getByRole("link", { name: "Explore the solution", exact: true })
    .click();
  await expect(page).toHaveURL(/\/products\/pre-engineered-steel-plants\/?$/);
  await expect(page.locator("h1")).toHaveText("Pre-Engineered Steel Plants");
  await expect(page.locator(".collection-strip")).toContainText(
    "50 design references",
  );
  await expect(page.locator(".specification-table tbody tr")).toHaveCount(6);
  await expect(page.locator(".product-feature-grid li")).toHaveCount(6);
  await expect(page.locator(".product-application-grid li")).toHaveCount(6);
  await expect(page.locator(".faq-list details")).toHaveCount(4);
  await page.locator(".design-image").first().click();
  await expect(page.locator(".yarl__root")).toBeVisible();
  await page.locator(".lightbox-quote").click();
  await expect(page.getByLabel("Product / requirement")).toHaveValue(
    "Pre-Engineered Steel Plants",
  );
});

test("keyboard menus, modal focus containment and navigation", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [1024, 1041, 1199, 1280, 1366, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
    for (const label of ["Industries", "Projects", "About", "Quality", "Contact"]) {
      await expect(page.locator(".desktop-nav").getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await expect(page.locator(".header-quote")).toBeVisible();
    await expect(page.getByRole("button", { name: "Open navigation" })).not.toBeVisible();
    const fits = await page.locator(".site-header > .container").evaluate((container) => {
      const bounds = container.getBoundingClientRect();
      const items = Array.from(container.children)
        .filter((element) => getComputedStyle(element).display !== "none")
        .map((element) => element.getBoundingClientRect());
      return items.every((item, index) => item.left >= bounds.left && item.right <= bounds.right &&
        (index === 0 || item.left >= items[index - 1].right));
    });
    expect(fits, `Header fits without overlap at ${width}px`).toBe(true);
  }
  await page.setViewportSize({ width: 1041, height: 900 });
  await page.locator(".site-header").screenshot({ path: "test-results/header-laptop-1041.png" });
  const productsTrigger = page.getByRole("button", {
    name: "Products",
    exact: true,
  });
  if (publishedProducts.length) {
    for (const width of [1024, 1041, 1440]) {
      await page.setViewportSize({ width, height: 768 });
      await productsTrigger.click();
      const menu = page.locator("#product-menu");
      await expect(menu.locator(".mega-group")).toHaveCount(catalogueCategories.length);
      await expect(menu.locator(".mega-links a")).toHaveCount(publishedProducts.length);
      const hrefs = await menu.locator(".mega-links a").evaluateAll((links) => links.map((link) => new URL((link as HTMLAnchorElement).href).pathname.replace(/\/$/, "")));
      expect(hrefs.sort()).toEqual(publishedProducts.map((product) => `/products/${product.slug}`).sort());
      const fits = await menu.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.bottom <= window.innerHeight && bounds.left >= 0 && bounds.right <= window.innerWidth && element.scrollWidth <= element.clientWidth;
      });
      expect(fits, `Dropdown stays inside ${width}px viewport`).toBe(true);
      const lastLink = menu.locator(".mega-links a").last();
      await lastLink.focus();
      await expect(lastLink).toBeInViewport();
      await menu.evaluate((element) => { element.scrollTop = 0; });
      await page.screenshot({ path: `test-results/all-products-menu-${width}.png` });
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations).toEqual([]);
      await page.keyboard.press("Escape");
      await expect(productsTrigger).toBeFocused();
    }
    await productsTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#product-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(productsTrigger).toBeFocused();
    await expect(page.locator("#product-menu")).toHaveCount(0);
  }
  await page.setViewportSize({ width: 1023, height: 900 });
  await expect(page.locator(".desktop-nav")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.locator(".mobile-product-groups > summary").click();
  for (const summary of await page.locator(".mobile-product-groups > details > summary").all()) {
    await summary.click();
  }
  await expect(page.locator(".mobile-product-groups a")).toHaveCount(publishedProducts.length);
  const lastMobileProduct = page.locator(".mobile-product-groups a").last();
  await lastMobileProduct.focus();
  await expect(lastMobileProduct).toBeInViewport();
  await page.locator(".mobile-dialog").screenshot({ path: "test-results/all-products-menu-mobile.png" });
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
  await expect(page).toHaveURL(/\/products\/?$/);
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

test("contact and quote forms validate and prepare complete WhatsApp messages", async ({ page }) => {
  const apiCalls: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/enquiry") apiCalls.push(request.url());
  });
  await page.addInitScript(() => {
    window.open = (url, target, features) => {
      document.documentElement.dataset.whatsappUrl = String(url);
      document.documentElement.dataset.whatsappTarget = target;
      document.documentElement.dataset.whatsappFeatures = features;
      return null;
    };
  });
  const companyName = "R&D + Fabrication #1";
  const details = "Plant enquiry: 40m x 20m.\nRoof & wall panels + drawings #2?";
  for (const route of ["/contact", "/request-quote"]) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const submit = page.getByRole("button", { name: "Continue to WhatsApp" });
      await submit.click();
      await expect(page.getByText("Enter your full name.", { exact: true })).toBeVisible();
      await expect(page.getByLabel("Full name")).toBeFocused();
      await expect(page.locator("html")).not.toHaveAttribute("data-whatsapp-url");
      await page.getByLabel("Full name").fill(enquiry.name);
      await page.getByLabel("Company name").fill(companyName);
      await page.getByLabel("Email", { exact: false }).fill(enquiry.email);
      await page.getByLabel("Phone / WhatsApp").fill("+91 90000 00000");
      await page.getByLabel(route === "/contact" ? "Subject / requirement" : "Product / requirement").fill(enquiry.requirement);
      await page.getByLabel("Requirement details").fill(details);
      if (route === "/request-quote") {
        await page.getByLabel("Quantity").fill(enquiry.quantity);
        await page.getByLabel("Grade / specification").fill(enquiry.specification);
        await page.getByLabel("Delivery location").fill(enquiry.location);
      }
      await submit.click();
      await expect(page.getByRole("status")).toContainText("WhatsApp message ready");
      const fallback = page.getByRole("link", { name: "Open WhatsApp", exact: true });
      const href = await fallback.getAttribute("href");
      const url = new URL(href!);
      expect(url.origin + url.pathname).toBe("https://wa.me/919176507264");
      const message = url.searchParams.get("text");
      for (const value of [enquiry.name, companyName, enquiry.email, "+91 90000 00000", enquiry.requirement, details]) {
        expect(message).toContain(value);
      }
      if (route === "/request-quote") {
        for (const value of [enquiry.quantity, enquiry.specification, enquiry.location]) expect(message).toContain(value);
      } else {
        expect(message).not.toContain("Quantity:");
      }
      expect(message).not.toContain("website:");
      await expect(page.locator("html")).toHaveAttribute("data-whatsapp-url", href!);
      await expect(page.locator("html")).toHaveAttribute("data-whatsapp-target", "_blank");
      await expect(page.locator("html")).toHaveAttribute("data-whatsapp-features", "noopener,noreferrer");
      await expect(fallback).toHaveAttribute("target", "_blank");
      await expect(fallback).toHaveAttribute("rel", "noopener noreferrer");
      await expect(page.getByLabel("Full name")).toHaveValue(enquiry.name);
      await page.getByLabel("Requirement details").fill(`${details}\nUpdated scope.`);
      await expect(fallback).toHaveCount(0);
      await submit.click();
      expect(new URL((await fallback.getAttribute("href"))!).searchParams.get("text")).toContain("Updated scope.");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(accessibility.violations).toEqual([]);
      await page.locator(".enquiry-form").screenshot({ path: `test-results/whatsapp-${route.slice(1)}-${width}.png` });
    }
  }
  expect(apiCalls).toEqual([]);
});

test("static deployment has no enquiry backend", async ({
  request,
}) => {
  expect((await request.get("/api/enquiry/")).status()).toBe(404);
});

test("static export preserves quote design links and production metadata", async ({ page, request }) => {
  test.skip(process.env.PLAYWRIGHT_STATIC_EXPORT !== "true", "Static export verification.");
  const product = products.find((item) => item.slug === "pre-engineered-steel-plants")!;
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/products/${product.slug}/`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/steelwayimpex\.com\/products\/pre-engineered-steel-plants\/?$/);
    const designLink = page.locator(`a[href*="product=${product.slug}&design=1"]`).first();
    await designLink.click();
    await expect(page.getByLabel("Product / requirement")).toHaveValue(product.name);
    await expect(page.getByLabel("Requirement details")).toHaveValue(/Design reference: 001/);
    await page.reload();
    await expect(page.getByLabel("Requirement details")).toHaveValue(new RegExp(product.galleryImages![0].src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    for (const design of ["0", "-1", "1.5", "99999", "invalid"]) {
      await page.goto(`/request-quote/?product=${product.slug}&design=${design}`);
      await expect(page.getByLabel("Requirement details")).toHaveValue("");
    }
    await page.goto("/request-quote/?product=unknown&design=1");
    await expect(page.getByLabel("Product / requirement")).toHaveValue("");
    await expect(page.getByLabel("Requirement details")).toHaveValue("");
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("https://steelwayimpex.com");
  expect(sitemap).not.toMatch(/localhost|127\.0\.0\.1/);
  expect(await (await request.get("/robots.txt")).text()).toContain("https://steelwayimpex.com/sitemap.xml");
  expect(errors).toEqual([]);
});

test("inner-page accessibility, 404s and SEO endpoints", async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "/products",
    ...(preview ? ["/products/ss-pvd-coated-screens-partitions"] : []),
    "/contact",
    "/request-quote",
    "/projects",
    "/industries",
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
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("/products/pre-engineered-steel-plants");
  for (const product of products.filter((item) => !item.approved))
    expect(sitemapText).not.toContain(`/products/${product.slug}`);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    preview ? "Disallow: /" : "Disallow: /api/",
  );
});

test("production excludes drafts from routes, suggestions, page payloads and browser chunks", async ({
  page,
  request,
}) => {
  test.skip(preview, "Production publishing check.");
  const approved = products.filter((product) => product.approved);
  const drafts = products.filter((product) => !product.approved);
  test.setTimeout(300000);
  expect(approved).toHaveLength(53);
  expect(drafts).toHaveLength(0);
  await page.goto("/");
  await expect(page.locator("#product-categories .product-card")).toHaveCount(3);
  for (const product of approved.slice(0, 3)) {
    const card = page.locator(`#product-categories [data-product-slug="${product.slug}"]`);
    await card.scrollIntoViewIfNeeded();
    await expect(card.getByRole("heading")).toHaveText(product.name);
    await expect(card.locator(".draft-badge")).toHaveCount(0);
    await expect.poll(() => card.locator("img").evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  for (const product of approved.slice(1)) {
    await page.goto(`/products/${product.slug}/`);
    await expect(page.locator("h1")).toHaveText(product.name);
    await expect(page.locator(".draft-badge")).toHaveCount(0);
    await page.goto(`/request-quote/?product=${product.slug}&design=1`);
    await expect(page.getByLabel("Product / requirement")).toHaveValue(product.name);
    await expect(page.getByLabel("Requirement details")).toHaveValue(/Design reference: 001/);
  }
  for (const product of drafts)
    expect((await request.get(`/products/${product.slug}`)).status()).toBe(404);
  for (const product of approved)
    expect((await request.get(`/products/${product.slug}`)).status()).toBe(200);
  const sitemapText = await (await request.get("/sitemap.xml")).text();
  for (const product of approved) expect(sitemapText).toContain(`/products/${product.slug}`);
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
    for (const product of drafts) expect(html).not.toContain(product.name);
    await expect(page.locator(".draft-badge")).toHaveCount(0);
    for (const source of await page
      .locator("script[src]")
      .evaluateAll((scripts) =>
        scripts.map((script) => script.getAttribute("src")!),
      ))
      chunks.add(source);
  }
  await expect(page.getByLabel("Product / requirement")).toHaveValue(
    "Pre-Engineered Steel Plants",
  );
  await expect(
    page.locator('datalist option[value="Pre-Engineered Steel Plants"]'),
  ).toHaveCount(1);
  for (const chunk of chunks) {
    const code = await (await request.get(chunk)).text();
    for (const draft of drafts) {
      expect(code).not.toContain(draft.intro);
    }
  }
});

test("every draft detail has unique metadata, complete sections, working RFQ and related links", async ({
  page,
}) => {
  test.skip(!preview, "Draft catalogue preview check.");
  test.setTimeout(600000);
  for (const product of products.filter((item) => !item.approved)) {
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
  await expect(page).toHaveURL(/\/products\/stainless-steel-benches\/?$/);
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
      product.sourceFolder
        ? "Owner-supplied product reference images"
        : "supplied Ramdev Steel Industries catalogue",
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

test("owner-supplied product pages expose all gallery images and complete enquiry flows", async ({
  page,
}) => {
  test.skip(
    !preview,
    "Owner-supplied collections remain draft until approved.",
  );
  test.setTimeout(300000);
  for (const product of products.filter((item) => item.sourceFolder)) {
    await page.goto("/products");
    await page.getByRole("searchbox").fill(product.name);
    await page
      .locator(`[data-product-slug="${product.slug}"]`)
      .getByRole("link")
      .click();
    await expect(page).toHaveURL(new RegExp(`/products/${product.slug}/?$`));
    await expect(page).toHaveTitle(product.seoTitle);
    await expect(page.locator("h1")).toHaveText(product.name);
    await expect(page.locator(".collection-heading")).toContainText(
      "Owner-supplied product reference images",
    );
    await expect(page.locator(".product-feature-grid li")).toHaveCount(
      product.features.length,
    );
    await expect(page.locator(".product-application-grid li")).toHaveCount(
      product.applications.length,
    );
    await expect(page.locator(".product-specify-list li")).toHaveCount(
      product.howToSpecify.length,
    );
    while (
      await page
        .getByRole("button", { name: "More designs", exact: true })
        .count()
    ) {
      await page
        .getByRole("button", { name: "More designs", exact: true })
        .click();
    }
    await expect(page.locator(".design-tile")).toHaveCount(
      product.galleryImages!.length,
    );
    for (const image of await page
      .locator(".design-image img, .collection-banner > img")
      .all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => (element as HTMLImageElement).decode());
    }
    for (const width of [1440, 375]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `test-results/supplied-${product.slug}-${width}.png`,
        animations: "disabled",
      });
      await page.locator("#collection").scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `test-results/supplied-gallery-${product.slug}-${width}.png`,
        animations: "disabled",
      });
    }
    await page.locator(".design-image").last().click();
    await expect(page.locator(".lightbox-quote")).toHaveAttribute(
      "href",
      `/request-quote?product=${product.slug}&design=${product.galleryImages!.length}`,
    );
    await page.locator(".lightbox-quote").click();
    await expect(page.getByLabel("Product / requirement")).toHaveValue(
      product.name,
    );
    await expect(page.getByLabel("Requirement details")).toHaveValue(
      new RegExp(
        `Design reference: ${String(product.galleryImages!.length).padStart(3, "0")}`,
      ),
    );
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
