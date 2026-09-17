import Image from "next/image";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";
import {
  Button,
  Container,
  PageIntro,
  RFQBanner,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

const plantApplications = [
  {
    title: "Manufacturing & production plants",
    image: "/images/pre engineered steel plant/image-01-min.jpg",
    alt: "Steel portal frames and roof purlins with a raised metal deck during construction",
    description:
      "Plan the building around the production process. Pre-engineered steel framing brings the main structure, secondary members and building envelope into one coordinated brief, with equipment and services considered from the outset.",
    details: [
      "Production layout, clear spans and working height",
      "Crane loads, mezzanines and equipment interfaces",
      "Ventilation, daylight and service openings",
    ],
  },
  {
    title: "Warehouses & logistics buildings",
    image: "/images/pre engineered steel plant/RHINO-Argyle-Warehouse-001.jpg",
    alt: "Wide warehouse floor beneath red steel portal frames during construction",
    description:
      "Connect storage capacity with the movement of goods. Review column spacing, racking arrangements and vehicle access together so the structural layout supports day-to-day warehouse operations.",
    details: [
      "Racking height, aisle widths and column positions",
      "Loading bays, shutters and vehicle circulation",
      "Roof insulation, wall cladding and rainwater drainage",
    ],
  },
  {
    title: "Steel framing & erection planning",
    image: "/images/pre engineered steel plant/main-framing.jpg",
    alt: "Steel building skeleton showing columns, bracing and roof trusses",
    description:
      "A defined erection scope connects the engineered design to site execution. Agree foundation interfaces, member delivery, lifting access and inspection responsibilities before the structure is assembled.",
    details: [
      "Foundation and anchor-bolt coordination",
      "Fabrication, supply and erection responsibilities",
      "Site access, installation sequence and inspection requirements",
    ],
  },
];

export const metadata = pageMetadata(
  "Projects & Applications",
  "Explore pre-engineered steel plant project applications, including manufacturing buildings, warehouses, structural framing and erection planning.",
  "/projects",
);
export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="PRE-ENGINEERED STEEL PLANT PROJECTS"
        title="Steel structures. Project-specific thinking."
        description="Explore building applications for manufacturing, warehousing and industrial operations. These reference photographs illustrate project scope; they are not presented as completed Ramdev Enterprises projects."
      />
      {plantApplications.map((application, index) => (
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
                <figcaption>
                  PRE-ENGINEERED BUILDING / REFERENCE IMAGE
                </figcaption>
              </figure>
            </Reveal>
            <Reveal className="section-copy">
              <p className="eyebrow">0{index + 1} / PROJECT SCOPE</p>
              <h2>{application.title}</h2>
              <p>{application.description}</p>
              <ul className="application-details">
                {application.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <Button
                href="/request-quote?product=pre-engineered-steel-plants"
                secondary
              >
                Discuss this project scope
              </Button>
            </Reveal>
          </Container>
        </section>
      ))}
      <section className="section surface">
        <Container className="section-copy">
          <p className="eyebrow">START WITH THE PROJECT BRIEF</p>
          <h2>From site inputs to an agreed building scope.</h2>
          <p>
            Share the site location, building length, width and height, intended
            use, available drawings and target schedule. Include crane or
            mezzanine needs, openings and future expansion plans so the initial
            discussion covers the full building requirement.
          </p>
          <Button href="/products/pre-engineered-steel-plants" secondary>
            Explore plant capabilities
          </Button>
        </Container>
      </section>
      {projects.length > 0 && (
        <section className="section">
          <Container>
            <div className="product-grid">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}
      <RFQBanner />
    </>
  );
}
