import {
  Button,
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
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About Us",
  "Meet Ramdev Enterprises in Chennai: pre-engineered steel plant requirements, project coordination and supporting architectural metalwork.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT RAMDEV ENTERPRISES"
        title="Understanding first. Solutions next."
        description="Based in Chennai, Ramdev Enterprises focuses on pre-engineered steel plants and industrial building requirements, with supporting steel and architectural metalwork discussed around each project's scope."
      />
      <AboutPreview />
      <section className="section surface">
        <Container>
          <SectionHeading
            eyebrow="OUR BUSINESS FOCUS"
            title="The building, the operation and the details between."
            description="A useful solution starts with how a space will be used. We bring the building requirement and its supporting metalwork into a clear project conversation."
          />
          <Reveal className="quality-grid" stagger>
            {[
              [
                "01",
                "Pre-engineered steel plants",
                "Manufacturing buildings, warehouses and workshops begin with the production layout, usable height and clear-span requirement. The brief brings together framing, roofing, wall systems and the interfaces needed for the operation inside.",
              ],
              [
                "02",
                "Project coordination",
                "Building dimensions alone do not define a project. Site access, equipment loads, crane or mezzanine needs, service openings and execution responsibilities help establish what needs to be reviewed before a proposal moves forward.",
              ],
              [
                "03",
                "Supporting architectural metalwork",
                "Interior partitions, railings, furniture details and other steel requirements can form part of a wider project discussion. Designs, finishes, dimensions and availability are reviewed for the individual enquiry rather than assumed from a photograph.",
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
      <CapabilitiesSection />
      <section className="section surface">
        <Container className="split-section align-start">
          <Reveal className="section-copy">
            <p className="eyebrow">WORKING WITH YOUR PROJECT TEAM</p>
            <h2>A shared brief. A defined responsibility.</h2>
            <p>
              Owners, architects, consultants and site teams often approach a
              building from different starting points. An operational layout,
              architectural drawing or preliminary site plan can each begin the
              conversation. Open questions should be identified before they
              become assumptions in the project scope.
            </p>
            <p>
              Our approach is to connect those inputs through direct
              communication, with the proposed supply and execution boundaries
              made clear for review. Engineering criteria and approvals remain
              project-specific and must be agreed with the responsible team.
            </p>
            <Button href="/projects" secondary>
              Explore project applications
            </Button>
          </Reveal>
          <Reveal className="section-copy">
            <h3>What a clear scope should cover</h3>
            <ul className="application-details">
              <li>
                Building use, site location, dimensions and future expansion
                needs.
              </li>
              <li>
                Structural inputs, equipment interfaces and envelope
                requirements.
              </li>
              <li>
                Design coordination, fabrication, supply and erection
                responsibilities.
              </li>
              <li>
                Inspection needs, document requirements and acceptance criteria.
              </li>
              <li>
                Schedule expectations, site dependencies and commercial
                exclusions.
              </li>
            </ul>
            <p>
              Share the information available now, even if the brief is still
              developing. Missing dimensions, drawings or specifications can be
              identified during the initial review so the next discussion has a
              clear purpose.
            </p>
            <Button
              href="/request-quote?product=pre-engineered-steel-plants"
              secondary
            >
              Share your building brief
            </Button>
          </Reveal>
        </Container>
      </section>
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
                "Understand the application before proposing a scope. Record the important inputs, identify missing information and distinguish confirmed requirements from items still under review.",
              ],
              [
                "Care",
                "Give attention to the details that affect fit, finish and execution: dimensions, interfaces, documentation, handling and the conditions at the receiving site.",
              ],
              [
                "Communication",
                "Keep questions and changes visible to the people responsible for the project. Direct conversations and agreed next steps support a more useful technical and commercial review.",
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
