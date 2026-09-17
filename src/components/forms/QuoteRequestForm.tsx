"use client";

import { useSearchParams } from "next/navigation";
import { QuoteForm } from "./QuoteForm";

type QuoteProduct = {
  slug: string;
  name: string;
  galleryImages?: { src: string }[];
};

export function QuoteRequestForm({ products }: { products: QuoteProduct[] }) {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "";
  const selected = products.find((item) => item.slug === product);
  const designIndex = Number(searchParams.get("design"));
  const selectedImage =
    selected?.galleryImages && Number.isInteger(designIndex) && designIndex > 0
      ? selected.galleryImages[designIndex - 1]
      : undefined;
  const initialDetails = selectedImage
    ? `Collection: ${selected!.name}\nDesign reference: ${String(designIndex).padStart(3, "0")}\nImage: ${selectedImage.src}\n\nDimensions:\nQuantity:\nFinish:\nDelivery location:`
    : "";

  return (
    <QuoteForm
      key={`${product}-${selectedImage ? designIndex : ""}`}
      initialProduct={selected?.slug}
      initialDetails={initialDetails}
      products={products.map(({ slug, name }) => ({ slug, name }))}
    />
  );
}