import type { Metadata } from "next";
import { Manrope, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import "@/components/product/products.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "@/components/product/reference-catalogue.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/Primitives";
import { company } from "@/data/company";
import { siteUrl } from "@/lib/seo";
import { showDraftProducts } from "@/lib/catalogue";

const heading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  ...(showDraftProducts ? { robots: { index: false, follow: false } } : {}),
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ramdev Enterprises | Industrial & Material Solutions",
    template: "%s | Ramdev Enterprises",
  },
  description:
    "Requirement-led material and industrial solutions from Ramdev Enterprises, Chennai.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            url: siteUrl,
            email: company.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${company.addressLine1}, ${company.locality}`,
              addressLocality: company.city,
              addressRegion: company.state,
              postalCode: company.postalCode,
              addressCountry: "IN",
            },
          }}
        />
      </body>
    </html>
  );
}
