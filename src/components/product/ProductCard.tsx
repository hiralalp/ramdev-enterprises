import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { ProductMedia } from "./ProductMedia";
import { showDraftProducts } from "@/lib/catalogue";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  if (!product.approved && !showDraftProducts) return null;
  return (
    <article
      className={`product-card${product.sourcePage ? " collection-card" : ""}`}
      data-product-slug={product.slug}
    >
      <Link href={`/products/${product.slug}`} className="product-card-link">
        <ProductMedia product={product} compact />
        <div className="product-card-content">
          <div className="product-category-line">
            <span>{product.category}</span>
            {!product.approved && <span className="draft-badge">Draft</span>}
          </div>
          <div className="product-card-title">
            <span className="item-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{product.name}</h3>
            <ArrowUpRight size={19} aria-hidden="true" />
          </div>
          <p>
            {product.galleryImages
              ? `${product.galleryImages.length} designs in this collection`
              : product.shortDescription}
          </p>
          <span className="card-action">
            {product.galleryImages ? "View collection" : "View product"}
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
