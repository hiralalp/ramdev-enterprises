import Link from "next/link";
import { ArrowUpRight, Mail, FileText } from "lucide-react";
import { company, address } from "@/data/company";
import { visibleProducts as products } from "@/lib/catalogue";
import { industries } from "@/data/industries";
import { Brand } from "./Brand";
import { Container } from "@/components/ui/Primitives";

export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <Container>
          <div className="footer-top">
            <div className="footer-brand">
              <Brand />
              <p>
                Requirement-led materials.
                <br />
                Thoughtful industrial solutions.
              </p>
              <a className="text-link" href={`mailto:${company.email}`}>
                Start a conversation
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div>
              <h2>Products</h2>
              <Link href="/products">Products & solutions</Link>
              {products.slice(0, 5).map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  {product.name}
                </Link>
              ))}
            </div>
            <div>
              <h2>Industries</h2>
              {industries.map((industry) => (
                <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                  {industry.name}
                </Link>
              ))}
            </div>
            <div>
              <h2>Company & Resources</h2>
              {[
                ["About us", "/about"],
                ["Quality approach", "/quality"],
                ["Projects & applications", "/projects"],
                ["Insights", "/insights"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-contact">
            <p>{address}</p>
            <div>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <span>GSTIN: {company.gstin}</span>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} Ramdev Enterprises. All rights
              reserved.
            </span>
            <div>
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/image-credits">Image credits</Link>
              <Link href="/terms">Terms of use</Link>
              <span>CHENNAI, INDIA</span>
            </div>
          </div>
        </Container>
      </footer>
      <div className="sticky-mobile-actions">
        <a href={`mailto:${company.email}`}>
          <Mail size={17} />
          Email us
        </a>
        <Link href="/request-quote">
          <FileText size={17} />
          Request a quote
        </Link>
        {company.phoneHref && <a href={company.phoneHref}>Call us</a>}
      </div>
    </>
  );
}
