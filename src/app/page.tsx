import {
  Hero,
  TrustStrip,
  PlantFocus,
  ProductCategories,
  AboutPreview,
  StatsSection,
  WhyChooseUs,
  ClientsSection,
  FeaturedProducts,
  IndustriesSection,
  CapabilitiesSection,
  FeaturedProjects,
  QualitySection,
  RFQBanner,
  FaqSection,
  ContactSection,
} from "@/components/home/Sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Pre-Engineered Steel Plants",
  "Pre-engineered steel plants for industrial, manufacturing and warehouse requirements. Discuss site, building and project scope with Ramdev Enterprises Chennai.",
  "/",
);
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <PlantFocus />
      <ProductCategories />
      <AboutPreview />
      <StatsSection />
      <WhyChooseUs />
      <ClientsSection />
      <FeaturedProducts />
      <IndustriesSection />
      <CapabilitiesSection />
      <FeaturedProjects />
      <QualitySection />
      <RFQBanner />
      <FaqSection />
      <ContactSection />
    </>
  );
}
