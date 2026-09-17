import Image from "next/image";
import {
  Button,
  Container,
  PageIntro,
  RFQBanner,
} from "@/components/ui/Primitives";
import { IndustriesSection } from "@/components/home/Sections";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

const applications = [
  {
    title: "Construction & structural steel",
    image: "/images/pre engineered steel plant/main-framing.jpg",
    alt: "Exposed steel columns and roof trusses of a building under construction",
    description:
      "From industrial structures to architectural metalwork, align the steel system with the site, building geometry and construction sequence.",
    details: [
      "Plant and warehouse structures",
      "Roofing, cladding and canopy interfaces",
      "Drawings, connections and site coordination",
    ],
    href: "/industries/construction-infrastructure",
    action: "Explore construction requirements",
  },
  {
    title: "Interiors & architectural metalwork",
    image: "/images/reference/ramdev-steels/grill-9.jpg",
    alt: "Decorative metal partition design from the supplied interior collection",
    description:
      "Metal screens and partitions define spaces while keeping the finish, proportions and fixing details part of the design conversation. Discuss residential, workplace and hospitality interiors with your drawings or design references.",
    details: [
      "Decorative screens and room partitions",
      "Stainless-steel and PVD finish requirements",
      "Opening dimensions, fixing details and sample approval",
    ],
    href: "/request-quote",
    action: "Discuss an interior project",
  },
  {
    title: "Furniture & finishing details",
    image: "/images/reference/ramdev-steels/sofa-12.jpg",
    alt: "Metal-framed seating design from the supplied furniture collection",
    description:
      "Coordinate furniture and decorative steel details with the wider interior scheme. Start with the room layout, desired finish and dimensions to establish a project-specific fabrication brief.",
    details: [
      "Metal-framed seating and tables",
      "Custom sizes and finish coordination",
      "Fabrication and installation scope review",
    ],
    href: "/request-quote",
    action: "Discuss furniture requirements",
  },
];

export const metadata = pageMetadata(
  "Industries & Applications",
  "Explore construction, structural steel, interiors and architectural metalwork applications with Ramdev Enterprises.",
  "/industries",
);
export default function IndustriesPage() {
  return (
    <>
      <PageIntro
        eyebrow="APPLICATION-LED THINKING"
        title="Construction. Interiors. Steel in detail."
        description="From the building structure to the spaces inside, discuss steel and metalwork requirements shaped around your project. Photographs are application and design references, not completed-project claims."
      />
      {applications.map((application, index) => (
        <section
          className={`section application-band${index % 2 ? " surface" : ""}`}
          key={application.title}
        >
          <Container className="application-layout">
            <Reveal>
              <figure className="application-photo">
                <div className="application-image">
                  <Image
                    src={application.image}
                    alt={application.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                  />
                </div>
                <figcaption>APPLICATION / DESIGN REFERENCE</figcaption>
              </figure>
            </Reveal>
            <Reveal className="section-copy">
              <p className="eyebrow">0{index + 1} / APPLICATION</p>
              <h2>{application.title}</h2>
              <p>{application.description}</p>
              <ul className="application-details">
                {application.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <Button href={application.href} secondary>
                {application.action}
              </Button>
            </Reveal>
          </Container>
        </section>
      ))}
      <IndustriesSection />
      <RFQBanner />
    </>
  );
}
