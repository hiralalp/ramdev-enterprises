import { notFound } from "next/navigation";
import {
  visibleProducts as products,
  findVisibleProduct,
} from "@/lib/catalogue";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import {
  ProductHero,
  SpecificationTable,
  ProductGallery,
  RelatedProducts,
  ProductFaq,
  ProcurementTrustStrip,
  ProductOverview,
  FeatureGrid,
  ApplicationGrid,
  HowToSpecify,
  ProductRFQ,
  ProductContactBand,
} from "@/components/product/ProductDetails";
import { pageMetadata } from "@/lib/seo";
import { ReferenceCollection } from "@/components/product/ReferenceCollection";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findVisibleProduct(slug);
  if (!product) notFound();
  const metadata = pageMetadata(
    product.name,
    product.metaDescription,
    `/products/${slug}`,
  );
  return {
    ...metadata,
    title: { absolute: product.seoTitle },
    openGraph: { ...metadata.openGraph, title: product.seoTitle },
    twitter: { ...metadata.twitter, title: product.seoTitle },
    ...(!product.approved ? { robots: { index: false, follow: false } } : {}),
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findVisibleProduct(slug);
  if (!product) notFound();
  return product.galleryImages ? (
    <ReferenceCollection product={product} />
  ) : (
    <>
      <ProductHero product={product} />
      <ProcurementTrustStrip />
      <ProductOverview product={product} />
      <FeatureGrid product={product} />
      <ApplicationGrid product={product} />
      <section
        className="section surface product-specifications"
        id="specifications"
      >
        <Container className="product-editorial">
          <div>
            <SectionHeading
              eyebrow="TECHNICAL REQUIREMENTS"
              title="Details make the difference."
            />
            <p className="muted">
              Share your specification so suitability can be reviewed. No grade,
              dimension or standard is implied by this enquiry category.
            </p>
          </div>
          <SpecificationTable rows={product.specifications} />
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="MATERIAL PERSPECTIVES"
            title="Explore the product form."
          />
          <ProductGallery product={product} />
        </Container>
      </section>
      <HowToSpecify product={product} />
      <ProductRFQ product={product} />
      <section className="section">
        <Container className="split-section align-start">
          <SectionHeading
            eyebrow="BEFORE YOU ENQUIRE"
            title="A few useful answers."
          />
          <ProductFaq product={product} />
        </Container>
      </section>
      <RelatedProducts slugs={product.relatedSlugs} />
      <ProductContactBand />
    </>
  );
}
