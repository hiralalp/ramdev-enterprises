import type { MetadataRoute } from "next";
import { approvedProducts as products } from "@/lib/catalogue";
import { industries } from "@/data/industries";
import { projects } from "@/data/projects";
import { insights } from "@/data/insights";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
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
    ...products.map((product) => `/products/${product.slug}`),
    ...industries.map((industry) => `/industries/${industry.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...insights.map((insight) => `/insights/${insight.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
