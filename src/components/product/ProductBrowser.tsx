"use client";

import { useDeferredValue, useState } from "react";
import { Search, X } from "lucide-react";
import type { Product } from "@/types";
import { belongsToCategory } from "@/lib/product-visibility";

export function ProductBrowser({
  products,
  categories,
  cards,
}: {
  products: Pick<
    Product,
    "slug" | "name" | "category" | "secondaryCategories" | "shortDescription"
  >[];
  categories: string[];
  cards: React.ReactNode[];
}) {
  const [category, setCategory] = useState("All categories");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const matching = products
    .map((product, index) => ({ product, index }))
    .filter(
      ({ product }) =>
        (category === "All categories" ||
          belongsToCategory(product, category)) &&
        `${product.name} ${product.shortDescription}`
          .toLowerCase()
          .includes(deferredQuery.toLowerCase().trim()),
    );
  return (
    <>
      <div className="catalogue-toolbar">
        <div
          className="filter-tabs"
          role="group"
          aria-label="Filter by product category"
        >
          {["All categories", ...categories].map((item) => (
            <button
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
          />
        </label>
      </div>
      <p className="result-count" role="status">
        {matching.length} {matching.length === 1 ? "product" : "products"}
      </p>
      {matching.length ? (
        <div className="product-grid catalogue-grid">
          {matching.map(({ product, index }) => (
            <div key={product.slug}>{cards[index]}</div>
          ))}
        </div>
      ) : (
        <div className="empty-search">
          <h2>No matching products</h2>
          <p>Try another search or share a custom requirement with our team.</p>
          <button
            className="button button-secondary"
            onClick={() => {
              setQuery("");
              setCategory("All categories");
            }}
          >
            Clear filters
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
