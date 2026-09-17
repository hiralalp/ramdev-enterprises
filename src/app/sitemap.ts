import type { MetadataRoute } from "next";
import { approvedProducts as products } from "@/lib/catalogue";
import { industries } from "@/data/industries";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/products",
    "/industries",
    "/projects",
    "/about",
    "/quality",
    "/contact",
    "/request-quote",
    "/privacy",
    "/terms",
    ...products.map((product) => `/products/${product.slug}`),
    ...industries.map((industry) => `/industries/${industry.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
