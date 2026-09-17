import Link from "next/link";
import { Suspense } from "react";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { Container, PageIntro } from "@/components/ui/Primitives";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { visibleProducts } from "@/lib/catalogue";

export const metadata = pageMetadata(
  "Request a Quote",
  "Share your product, quantity, specification and delivery requirements with Ramdev Enterprises for a requirement-led quotation discussion.",
  "/request-quote",
);
export default function QuotePage() {
  return (
    <>
      <PageIntro
        eyebrow="REQUEST A QUOTE"
        title="Good solutions start here."
        description="Share your requirement with our team. The more clearly you define the application and specification, the more useful the next conversation can be."
      />
      <section className="section">
        <Container className="form-layout">
          <aside className="form-aside">
            <p className="eyebrow">
              <span />
              YOUR REQUIREMENT, IN FOCUS
            </p>
            <h2>A clear brief makes a difference.</h2>
            <ol className="enquiry-steps">
              <li>
                <span>01</span>Tell us the product and application.
              </li>
              <li>
                <span>02</span>Include dimensions, quantity and grade if
                specified.
              </li>
              <li>
                <span>03</span>Share your delivery and documentation needs.
              </li>
            </ol>
            <div className="aside-contact">
              <Mail size={22} />
              <h3>Prefer a direct email?</h3>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
            <div className="aside-contact">
              <FileText size={22} />
              <h3>Have a drawing or BOQ?</h3>
              <p>
                Send attachments by email, with your name and requirement in the
                subject.
              </p>
            </div>
            <Link className="text-link" href="/products">
              Browse enquiry categories
              <ArrowUpRight size={16} />
            </Link>
          </aside>
          <Suspense fallback={<p role="status">Loading enquiry form...</p>}>
            <QuoteRequestForm
              products={visibleProducts.map(({ slug, name, galleryImages }) => ({
                slug,
                name,
                galleryImages: galleryImages?.map(({ src }) => ({ src })),
              }))}
            />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
