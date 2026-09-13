import { Container, PageIntro } from "@/components/ui/Primitives";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Privacy Policy",
  "How enquiry information is used when you contact Ramdev Enterprises through this website.",
  "/privacy",
);
// TODO_CONTENT: Obtain legal approval before public launch.
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="PRIVACY"
        title="Your information, handled with purpose."
        description="This notice describes how information submitted through the website may be used in responding to business enquiries."
      />
      <section className="section">
        <Container>
          <article className="legal-copy">
            <h2>Information you provide</h2>
            <p>
              When you make an enquiry, you may provide your name, company,
              email address, telephone number, delivery location and details of
              a business requirement. Please do not submit passwords, payment
              information or other sensitive personal information through these
              forms.
            </p>
            <h2>How information is used</h2>
            <p>
              Enquiry information may be used to respond to your request,
              clarify specifications, discuss quotations and coordinate related
              business communication. We do not use enquiry details for an
              unrelated purpose without an appropriate basis.
            </p>
            <h2>Delivery and service providers</h2>
            <p>
              When online delivery is configured, enquiry details are sent
              through an email service provider to the business contact inbox.
              The website hosting provider may process technical information
              needed to deliver and secure the site. If online delivery is
              unavailable, the form will state that delivery has not occurred
              and offer an email option.
            </p>
            <h2>Retention and security</h2>
            <p>
              Business correspondence may be retained for the enquiry and any
              resulting commercial relationship, subject to applicable
              recordkeeping obligations. Avoid including unnecessary personal
              information in your requirement. No internet transmission or
              storage method is completely secure.
            </p>
            <h2>Cookies and third-party links</h2>
            <p>
              This website does not currently include advertising or analytics
              trackers. Links to external maps and email applications are
              governed by the relevant provider&apos;s own practices. External
              content is not loaded simply by displaying a map link.
            </p>
            <h2>Questions and requests</h2>
            <p>
              For questions about information you have shared, or to request
              correction or deletion where applicable, contact{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a>. Requests
              may need to be verified and considered against business or legal
              recordkeeping obligations.
            </p>
            <h2>Changes to this notice</h2>
            <p>
              This notice may be updated as website functionality and business
              processes change. It is a starter notice for this website and
              should be reviewed before production use.
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
