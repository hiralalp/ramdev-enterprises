import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { showDraftProducts } from "@/lib/catalogue";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: showDraftProducts
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
