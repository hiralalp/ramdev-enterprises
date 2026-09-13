import { MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { company } from "@/data/company";
import { Brand } from "./Brand";
import { DesktopNav, MobileNav } from "./Navigation";
import { Container } from "@/components/ui/Primitives";
import { productNavigation, showDraftProducts } from "@/lib/catalogue";

export function Header() {
  return (
    <>
      {showDraftProducts && (
        <div className="draft-preview-banner">
          Owner preview: proposed products are marked Draft and are not approved
          offerings.
        </div>
      )}
      <div className="utility-bar">
        <Container>
          <span>
            <MapPin size={12} aria-hidden="true" />
            {company.city}, {company.state}
          </span>
          <a href={`mailto:${company.email}`}>
            {company.email}
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </Container>
      </div>
      <header className="site-header">
        <Container>
          <Brand />
          <DesktopNav groups={productNavigation} />
          <Link href="/request-quote" className="button header-quote">
            Request a quote
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <MobileNav groups={productNavigation} />
        </Container>
      </header>
    </>
  );
}
