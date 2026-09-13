import "server-only";
import { products, legacyProducts, catalogueCategories } from "@/data/products";
import {
  belongsToCategory,
  draftPreviewEnabled,
  selectVisibleProducts,
} from "./product-visibility";

export const showDraftProducts = draftPreviewEnabled(
  process.env.NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS,
  process.env.NODE_ENV,
);
export const approvedProducts = selectVisibleProducts(products);
export const visibleProducts = selectVisibleProducts(
  products,
  showDraftProducts,
);
export const visibleCategories = catalogueCategories.filter((category) =>
  visibleProducts.some((product) => belongsToCategory(product, category)),
);
export const productOptions = visibleProducts.map(({ slug, name }) => ({
  slug,
  name,
}));
export const productNavigation = visibleCategories.map((category) => ({
  category,
  products: visibleProducts
    .filter((product) => belongsToCategory(product, category))
    .map(({ slug, name, approved }) => ({ slug, name, approved })),
}));
export function findVisibleProduct(slug: string) {
  return visibleProducts.find((product) => product.slug === slug) || selectVisibleProducts(legacyProducts.filter((legacy) => !products.some((product) => product.slug === legacy.slug)), showDraftProducts).find((product) => product.slug === slug);
}
