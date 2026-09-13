import Link from "next/link";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Container, PageIntro } from "@/components/ui/Primitives";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { productOptions, findVisibleProduct } from "@/lib/catalogue";

export const metadata = pageMetadata(
  "Request a Quote",
  "Share your product, quantity, specification and delivery requirements with Ramdev Enterprises for a requirement-led quotation discussion.",
  "/request-quote",
);
export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; design?: string }>;
}) {
  const { product, design } = await searchParams;
  const selected = product ? findVisibleProduct(product) : undefined;
  const designIndex = Number(design);
  const selectedImage =
    selected?.galleryImages && Number.isInteger(designIndex) && designIndex > 0
      ? selected.galleryImages[designIndex - 1]
      : undefined;
  const initialDetails = selectedImage
    ? `Collection: ${selected!.name}\nDesign reference: ${String(designIndex).padStart(3, "0")}\nImage: ${selectedImage.src}\n\nDimensions:\nQuantity:\nFinish:\nDelivery location:`
    : "";
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
          <QuoteForm
            key={`${product || "general"}-${selectedImage ? designIndex : ""}`}
            initialProduct={product}
            initialDetails={initialDetails}
            products={
              selected &&
              !productOptions.some((option) => option.slug === selected.slug)
                ? [
                    ...productOptions,
                    { slug: selected.slug, name: selected.name },
                  ]
                : productOptions
            }
          />
        </Container>
      </section>
    </>
  );
}
