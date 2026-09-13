import type { Product } from "@/types";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { creditForPhoto } from "@/lib/photo-credits";

const visualByCategory: Record<string, string> = {
  "Steel Products": "concept-steel",
  "Industrial Products & Projects": "concept-industrial",
  "Interior & Architectural Products": "concept-interior",
  "Exterior & Architectural Products": "concept-exterior",
  "Arts & Sculptures": "concept-art",
};

export function ProductMedia({
  product,
  src = product.image,
  label = product.category,
  alt = product.name,
  priority = false,
  sizes,
  compact = false,
}: {
  product: Product;
  src?: string;
  label?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
}) {
  const credit = creditForPhoto(src);
  return (
    <div className="product-photo">
      <ImagePlaceholder
        src={src}
        alt={
          credit
            ? `${credit.description}. Reference photograph, not a Ramdev project.`
            : alt
        }
        label={label}
        variant={visualByCategory[product.category] || "concept-steel"}
        className="product-media"
        priority={priority}
        sizes={sizes}
      />
      {credit && (
        <p className="photo-caption">
          {!compact && <span>{credit.description}. </span>}Reference photo, not
          Ramdev work.{" "}
          {compact ? (
            <span>
              {credit.author} / {credit.license}
            </span>
          ) : (
            <a href={`/image-credits#${credit.id}`}>
              {credit.author} / {credit.license}
            </a>
          )}
        </p>
      )}
      {product.sourcePage && !compact && (
        <p className="photo-caption">
          Supplied Ramdev Steel Industries catalogue reference.
        </p>
      )}
    </div>
  );
}
