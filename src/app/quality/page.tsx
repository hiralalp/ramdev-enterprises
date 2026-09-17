import {
  Button,
  Container,
  PageIntro,
  SectionHeading,
  RFQBanner,
} from "@/components/ui/Primitives";
import { QualitySection } from "@/components/home/Sections";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Quality Approach",
  "Explore quality considerations for steel plant projects: design inputs, material records, fabrication checks, finishes, delivery and handover documentation.",
  "/quality",
);
export default function QualityPage() {
  return (
    <>
      <PageIntro
        eyebrow="QUALITY APPROACH"
        title="Quality begins with clarity."
        description="For a steel building, quality starts with agreed design inputs and continues through material selection, fabrication, finishing and site coordination. The checks, records and responsibilities must be defined for each project."
      />
      <QualitySection />
      <section className="section surface">
        <Container className="split-section">
          <Reveal>
            <ImagePlaceholder
              src="/images/pre engineered steel plant/image-01-min.jpg"
              alt="Reference steel building frame showing primary columns, rafters and secondary roof members"
              label="STEEL BUILDING INTERFACES / REFERENCE IMAGE"
              variant="flat"
            />
          </Reveal>
          <Reveal className="section-copy">
            <p className="eyebrow">PRE-ENGINEERED BUILDING QUALITY</p>
            <h2>Review the system, not just the individual member.</h2>
            <p>
              Primary frames, secondary steelwork, connections and the building
              envelope work together. A change to an opening, crane load or
              mezzanine can affect more than one part of the structure, so the
              responsible designer should review the relevant interfaces.
            </p>
            <p>
              Agree the applicable design basis, drawing revisions and
              inspection requirements before procurement or fabrication. The
              project specification should also identify who reviews each item
              and what evidence is needed for acceptance.
            </p>
            <Button href="/products/pre-engineered-steel-plants" secondary>
              Review plant requirements
            </Button>
          </Reveal>
        </Container>
      </section>
      <section className="section surface">
        <Container>
          <SectionHeading
            eyebrow="A REQUIREMENT-LED PROCESS"
            title="Attention where it matters."
          />
          <Reveal className="quality-grid" stagger>
            {[
              [
                "01",
                "Design inputs & drawing control",
                "Confirm building geometry, loading inputs, openings and equipment interfaces with the responsible project team. Identify the drawing revision used for review and agree how subsequent changes will be communicated.",
              ],
              [
                "02",
                "Material & traceability requirements",
                "Specify the required grade, section sizes, thicknesses and fasteners. Where material certificates or traceability records are required, agree the document scope and confirm availability for the proposed supply before ordering.",
              ],
              [
                "03",
                "Fabrication & connection checks",
                "Define dimensional checks, hole positions, connection details and fit-up criteria against the agreed drawings. Welding inspection and any non-destructive testing should follow the specified project requirements and assigned responsibilities.",
              ],
              [
                "04",
                "Surface preparation & finishes",
                "Discuss the exposure environment and specified coating or finish system. Agree surface preparation, coating inspection and handling needs; for visible architectural metalwork, confirm sample approval and finish expectations before manufacture.",
              ],
              [
                "05",
                "Dispatch & site readiness",
                "Review member identification, packing, delivery sequence and receiving-site access. Confirm unloading and storage responsibilities, and agree how transit damage or missing items should be recorded and raised for review.",
              ],
              [
                "06",
                "Erection & handover coordination",
                "Clarify foundation and anchor-bolt interfaces, erection inspections and connection acceptance requirements with the responsible site team. Agree the handover records and the process for resolving open observations before acceptance.",
              ],
            ].map(([number, title, text]) => (
              <article key={title}>
                <span className="item-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </Reveal>
        </Container>
      </section>
      <section className="section">
        <Container className="split-section align-start">
          <Reveal className="section-copy">
            <p className="eyebrow">DOCUMENTATION & ACCEPTANCE</p>
            <h2>Make the evidence part of the enquiry.</h2>
            <p>
              Documentation needs vary with the application and agreed supply
              scope. Identify required records early so their availability,
              review stages and any inspection arrangements can be confirmed
              before an order is placed.
            </p>
            <p>
              A photograph or general product description does not establish
              structural performance, material grade or certification. Specific
              compliance claims must be supported by the relevant project and
              product records, not assumed from these guidelines.
            </p>
            <Button
              href="/request-quote?product=pre-engineered-steel-plants"
              secondary
            >
              Discuss quality requirements
            </Button>
          </Reveal>
          <Reveal className="section-copy">
            <h3>Records to discuss for your scope</h3>
            <ul className="application-details">
              <li>Agreed specifications, drawings and revision references.</li>
              <li>
                Material certificates and identification records, where
                required.
              </li>
              <li>
                Dimensional, welding and coating inspection records as
                specified.
              </li>
              <li>
                Third-party inspection stages and reporting requirements, if
                applicable.
              </li>
              <li>Packing lists, delivery records and receipt observations.</li>
              <li>
                Erection, as-built and handover records within the agreed scope.
              </li>
            </ul>
            <h3>When a discrepancy is identified</h3>
            <p>
              Record the affected item, drawing reference and observation, with
              photographs or measurements where useful. Raise it with the
              responsible team and agree the disposition before the affected
              work proceeds; retain the decision with the project records.
            </p>
          </Reveal>
        </Container>
      </section>
      <section className="section surface">
        <Container>
          <SectionHeading
            eyebrow="QUALITY QUESTIONS"
            title="What should be agreed before work begins?"
          />
          <div className="homepage-faq-list">
            {[
              [
                "Can material certificates be included?",
                "State the certificate type and traceability requirements in your enquiry. Availability and the applicable supply scope need to be confirmed before ordering; certificates are not assumed to accompany every item.",
              ],
              [
                "How are inspection requirements decided?",
                "Use the project specification to define acceptance criteria, inspection stages and the party responsible for each review. Any third-party witnessing or testing requirements should be raised early and included in the agreed scope.",
              ],
              [
                "How should design or finish changes be handled?",
                "Share the revised requirement and identify what changed. Review its effect on drawings, materials, interfaces, cost and schedule with the responsible team before confirming the updated scope.",
              ],
              [
                "What is needed for an architectural finish enquiry?",
                "Provide the intended location, exposure conditions, finish reference and visible-surface expectations. Discuss samples, colour consistency, fixing details and protection during handling before approving the finish.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  <span>{question}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <RFQBanner />
    </>
  );
}
