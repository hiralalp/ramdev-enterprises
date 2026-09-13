import {
  Container,
  PageIntro,
  SectionHeading,
  RFQBanner,
} from "@/components/ui/Primitives";
import { QualitySection } from "@/components/home/Sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Quality Approach",
  "Requirement validation, specification communication, available documentation and delivery coordination at Ramdev Enterprises.",
  "/quality",
);
export default function QualityPage() {
  return (
    <>
      <PageIntro
        eyebrow="QUALITY APPROACH"
        title="Quality begins with clarity."
        description="Our approach focuses on understanding the requirement, communicating the specification and reviewing the details that can be confirmed."
      />
      <QualitySection />
      <section className="section surface">
        <Container>
          <SectionHeading
            eyebrow="A REQUIREMENT-LED PROCESS"
            title="Attention where it matters."
          />
          <div className="quality-grid">
            {[
              [
                "01",
                "Requirement validation",
                "Discuss the intended application, product form, dimensions and specified material before proceeding.",
              ],
              [
                "02",
                "Specification communication",
                "Keep grade, finish, tolerances and applicable project requirements explicit in the enquiry.",
              ],
              [
                "03",
                "Documentation review",
                "Identify certificates or records the project needs and confirm their availability for the proposed supply.",
              ],
              [
                "04",
                "Inspection considerations",
                "Raise inspection and acceptance criteria early so they can be considered in the proposal.",
              ],
              [
                "05",
                "Packaging & delivery",
                "Discuss handling, packaging, destination and requested delivery timing as part of the requirement.",
              ],
              [
                "06",
                "Customer communication",
                "Clarify open questions and agreed details before an order moves forward.",
              ],
            ].map(([number, title, text]) => (
              <article key={title}>
                <span className="item-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <RFQBanner />
    </>
  );
}
