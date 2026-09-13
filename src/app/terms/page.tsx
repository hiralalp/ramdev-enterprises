import { Container, PageIntro } from "@/components/ui/Primitives";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Terms of Use",
  "Terms for using the Ramdev Enterprises website, material enquiry categories and general procurement content.",
  "/terms",
);
// TODO_CONTENT: Obtain legal approval before public launch.
export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="TERMS OF USE"
        title="A clear basis for the conversation."
        description="These terms describe the purpose and limitations of the information and enquiry facilities on this website."
      />
      <section className="section">
        <Container>
          <article className="legal-copy">
            <h2>Website purpose</h2>
            <p>
              The Ramdev Enterprises website provides business information and a
              way to discuss industrial and material requirements. Product and
              industry categories are enquiry guides and do not constitute a
              confirmed catalogue, stock statement or offer to supply.
            </p>
            <h2>Quotations and orders</h2>
            <p>
              Submitting a form does not place an order or create a supply
              commitment. Availability, specification, quantity, price, taxes,
              documentation, payment and delivery terms must be confirmed in a
              separate written quotation or agreement.
            </p>
            <h2>Technical suitability</h2>
            <p>
              General articles and application references do not replace
              qualified engineering advice. The purchaser and responsible
              project team should confirm that specifications, materials and
              proposed products are appropriate for the intended use and
              applicable requirements.
            </p>
            <h2>Images and content</h2>
            <p>
              Abstract material illustrations are visual references, not
              photographs of confirmed inventory or completed projects. Approved
              product or project images, when provided, should be read with
              their accompanying descriptions. Website content must not be
              misrepresented as proof of certification or performance.
            </p>
            <h2>Acceptable use</h2>
            <p>
              Do not use the enquiry facilities for unlawful, misleading or
              unsolicited communications. Do not attempt to interfere with site
              operation, access restricted systems or submit malicious content.
            </p>
            <h2>Availability and external services</h2>
            <p>
              The website and online enquiry service may be unavailable from
              time to time. Email, map links and other external services are
              subject to their own terms. A form delivery error should not be
              treated as confirmation that an enquiry has been received.
            </p>
            <h2>Contact and review</h2>
            <p>
              Questions can be directed to{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a>. These are
              starter website terms for legal review and do not replace
              separately agreed commercial conditions or applicable law.
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
