import Image from "next/image";
import Link from "next/link";
import { assetExists } from "@/components/ui/ImagePlaceholder";

export function Brand() {
  // TODO_ASSET: Replace with official Ramdev Enterprises logo.
  return (
    <Link href="/" className="brand" aria-label="Ramdev Enterprises home">
      {assetExists("/images/brand/ramdev-logo.png") ? (
        <Image
          src="/images/brand/ramdev-logo.png"
          width={180}
          height={48}
          alt="Ramdev Enterprises"
          className="official-logo"
        />
      ) : (
        <>
          <span className="brand-monogram" aria-hidden="true">
            RE
            <span />
          </span>
          <span className="brand-name">
            RAMDEV<span>ENTERPRISES</span>
          </span>
        </>
      )}
    </Link>
  );
}
