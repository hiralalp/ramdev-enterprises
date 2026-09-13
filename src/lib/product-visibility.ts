import type { Product } from "@/types";

export function draftPreviewEnabled(
  flag: string | undefined,
  environment: string | undefined,
) {
  return flag === "true" && environment === "development";
}

export function selectVisibleProducts(catalogue: Product[], preview = false) {
  return catalogue.filter((product) => product.approved || preview);
}

export function belongsToCategory(
  product: Pick<Product, "category" | "secondaryCategories">,
  category: string,
) {
  return (
    product.category === category ||
    !!product.secondaryCategories?.includes(category)
  );
}
