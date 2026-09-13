import {
  Hero,
  TrustStrip,
  ProductCategories,
  AboutPreview,
  WhyChooseUs,
  FeaturedProducts,
  IndustriesSection,
  CapabilitiesSection,
  FeaturedProjects,
  QualitySection,
  RFQBanner,
  InsightsSection,
  ContactSection,
} from "@/components/home/Sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Industrial & Material Solutions",
  "Requirement-driven stainless steel and industrial material enquiries. Connect with Ramdev Enterprises in Chennai to discuss your application.",
  "/",
);
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProductCategories />
      <AboutPreview />
      <WhyChooseUs />
      <FeaturedProducts />
      <IndustriesSection />
      <CapabilitiesSection />
      <FeaturedProjects />
      <QualitySection />
      <RFQBanner />
      <InsightsSection />
      <ContactSection />
    </>
  );
}
