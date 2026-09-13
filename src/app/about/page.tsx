import {
  PageIntro,
  Container,
  SectionHeading,
  RFQBanner,
} from "@/components/ui/Primitives";
import {
  AboutPreview,
  CapabilitiesSection,
  ContactSection,
} from "@/components/home/Sections";
import { company, address } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About Us",
  "Meet Ramdev Enterprises in Chennai: responsive sourcing, clear communication and requirement-led industrial material solutions.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT RAMDEV ENTERPRISES"
        title="Understanding first. Solutions next."
        description="Ramdev Enterprises supports industrial and engineering requirements through responsive sourcing, clear communication and requirement-led material solutions."
      />
      <AboutPreview />
      <CapabilitiesSection />
      <section className="section dark-section">
        <Container>
          <SectionHeading
            eyebrow="WHAT GUIDES THE WORK"
            title="Practical values. Clear priorities."
          />
          <div className="values-grid">
            {[
              [
                "Clarity",
                "A requirement should be understood before a proposal is made.",
              ],
              [
                "Care",
                "Dimensions, documentation and delivery details deserve attention.",
              ],
              [
                "Communication",
                "Direct conversations help keep the next step clear.",
              ],
            ].map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="section">
        <Container className="split-section align-start">
          <SectionHeading
            eyebrow="BUSINESS DETAILS"
            title="A direct point of contact."
          />
          <dl className="business-details">
            <div>
              <dt>Business name</dt>
              <dd>{company.name}</dd>
            </div>
            <div>
              <dt>Registered contact address</dt>
              <dd>{address}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </dd>
            </div>
            <div>
              <dt>GSTIN</dt>
              <dd>{company.gstin}</dd>
            </div>
          </dl>
        </Container>
      </section>
      <ContactSection />
      <RFQBanner />
    </>
  );
}
