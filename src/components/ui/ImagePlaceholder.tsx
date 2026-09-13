import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { cn } from "@/lib/cn";

export function assetExists(source?: string): source is string {
  return (
    !!source &&
    source.startsWith("/images/") &&
    !source.includes("..") &&
    existsSync(path.join(process.cwd(), "public", source))
  );
}

export function ImagePlaceholder({
  src,
  alt,
  label,
  variant = "pipes",
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  src?: string;
  alt: string;
  label: string;
  variant?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("material-visual", `visual-${variant}`, className)}>
      {assetExists(src) ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="asset-image"
        />
      ) : (
        <>
          <div className="technical-grid" aria-hidden="true" />
          <div className="material-study" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="visual-label">{label}</span>
          <span className="visual-cross" aria-hidden="true">
            +
          </span>
        </>
      )}
    </div>
  );
}
