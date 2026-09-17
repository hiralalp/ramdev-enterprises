import type { Metadata } from "next";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://steelwayimpex.com" : "http://localhost:3000")
).replace(/\/$/, "");
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Ramdev Enterprises`,
      description,
      url: `${siteUrl}${path}`,
      siteName: "Ramdev Enterprises",
      type: "website",
      locale: "en_IN",
    },
    twitter: { card: "summary", title, description },
  };
}
