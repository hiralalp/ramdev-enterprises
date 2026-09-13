import {
  visibleProducts as products,
  visibleCategories as productCategories,
  showDraftProducts,
} from "@/lib/catalogue";
import { CatalogueEmpty } from "@/components/product/CatalogueEmpty";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductBrowser } from "@/components/product/ProductBrowser";
import { Container, RFQBanner } from "@/components/ui/Primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Products & Solutions",
    "Explore product requirements and procurement guidance from Ramdev Enterprises Chennai. Share drawings, specifications and quantities for a discussion.",
    "/products",
  ),
  ...(showDraftProducts ? { robots: { index: false, follow: false } } : {}),
};
export default function ProductsPage() {
  return (
    <>
      <section className="catalogue-intro">
        <Container>
          <div>
            <p className="eyebrow">PRODUCTS & DESIGN COLLECTIONS</p>
            <h1>
              Steel, shaped for
              <br />
              your space.
            </h1>
          </div>
          <p>
            Railings, partitions, furniture and decorative metalwork. Find a
            collection, explore the designs, and share your project brief.
          </p>
        </Container>
      </section>
      <section className="section catalogue-index">
        <Container>
          {products.length ? (
            <ProductBrowser
              products={products.map(
                ({
                  slug,
                  name,
                  category,
                  secondaryCategories,
                  shortDescription,
                }) => ({
                  slug,
                  name,
                  category,
                  secondaryCategories,
                  shortDescription,
                }),
              )}
              categories={productCategories}
              cards={products.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={index}
                />
              ))}
            />
          ) : (
            <CatalogueEmpty />
          )}
        </Container>
      </section>
      <RFQBanner />
    </>
  );
}
