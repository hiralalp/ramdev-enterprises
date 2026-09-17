import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Ramdev Enterprises home">
      <Image
        src="/images/ramdev-enterprises-logo.png"
        width={44}
        height={44}
        alt="Ramdev Enterprises"
        className="official-logo"
        priority
      />
      <span className="brand-name">
        RAMDEV<span>ENTERPRISES</span>
      </span>
    </Link>
  );
}
