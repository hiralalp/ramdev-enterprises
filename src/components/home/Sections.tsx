import { HeroSlider } from "./HeroSlider";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardCheck,
  FileCheck2,
  MessagesSquare,
  PackageCheck,
  MapPin,
  Mail,
  LocateFixed,
  Factory,
  Building2,
  Cog,
  Wrench,
  Check,
  MoveUpRight,
} from "lucide-react";
import {
  Container,
  Button,
  SectionHeading,
  RFQBanner,
} from "@/components/ui/Primitives";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "./StatCounter";
import { ProductCard } from "@/components/product/ProductCard";
import { ProjectCard, ProjectsEmpty } from "@/components/project/ProjectCard";
import { visibleProducts as products } from "@/lib/catalogue";
import { CatalogueEmpty } from "@/components/product/CatalogueEmpty";
import { industries } from "@/data/industries";
import { projects } from "@/data/projects";
import { company, mapUrl } from "@/data/company";
import { clients } from "@/data/clients";

export function Hero() {
  return (
    <HeroSlider>
      <Container>
        <div className="hero-content">
          <p className="eyebrow">
            <span />
            PRE-ENGINEERED STEEL BUILDING SOLUTIONS
          </p>
          <h1>
            Pre-engineered
            <br /> steel plants<span>.</span>
          </h1>
          <h2>Planned around your process, site and project scope.</h2>
          <p className="hero-description">
            Design, fabrication, supply and erection requirements coordinated
            for industrial plants, warehouses and operational buildings.
          </p>
          <div className="button-row">
            <Button href="/request-quote?product=pre-engineered-steel-plants">
              Discuss your plant
            </Button>
            <Button href="/products/pre-engineered-steel-plants" secondary>
              Explore the solution
            </Button>
          </div>
        </div>
      </Container>
    </HeroSlider>
  );
}
export function TrustStrip() {
  return (
    <div className="trust-strip">
      <Container>
        {[
          [ClipboardCheck, "Project-specific planning"],
          [FileCheck2, "Design input coordination"],
          [Factory, "Industrial building focus"],
          [PackageCheck, "Supply & erection scope"],
        ].map(([Icon, label]) => {
          const ItemIcon = Icon as typeof ClipboardCheck;
          return (
            <div key={String(label)}>
              <ItemIcon size={20} strokeWidth={1.4} aria-hidden="true" />
              <span>{String(label)}</span>
            </div>
          );
        })}
      </Container>
    </div>
  );
}
export function PlantFocus() {
  return (
    <section className="section plant-focus">
      <Container>
        <Reveal className="plant-focus-copy">
          <p className="eyebrow">
            <span />
            PRIMARY BUSINESS
          </p>
          <h2>Steel plants shaped around the work inside.</h2>
          <p>
            From production floors and warehouses to workshops and equipment
            buildings, each project begins with the operation, site and
            clear-span requirement.
          </p>
          <ul>
            <li>
              <Check size={17} aria-hidden="true" />
              Primary and secondary framing
            </li>
            <li>
              <Check size={17} aria-hidden="true" />
              Roof, wall and ventilation systems
            </li>
            <li>
              <Check size={17} aria-hidden="true" />
              Crane, mezzanine and equipment interfaces
            </li>
            <li>
              <Check size={17} aria-hidden="true" />
              Defined design, supply and erection scope
            </li>
          </ul>
          <Button href="/products/pre-engineered-steel-plants">
            View plant capabilities
          </Button>
        </Reveal>
        <Reveal className="plant-focus-visual">
          <Image
            src="/images/pre engineered steel plant/main-framing.jpg"
            alt="Reference view of structural steel framing for an industrial building"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <span>STRUCTURAL SYSTEM / REFERENCE IMAGE</span>
        </Reveal>
      </Container>
    </section>
  );
}
export function ProductCategories() {
  return (
    <section className="section" id="product-categories">
      <Container>
        <SectionHeading
          eyebrow="SECONDARY PRODUCTS & SOLUTIONS"
          title="Supporting steel products for the wider project."
          href="/products"
          linkLabel="Explore all products"
          description="Beyond pre-engineered steel plants, explore stainless-steel, architectural and interior product collections."
        />
        {!products.length && <CatalogueEmpty />}
        <Reveal stagger className="product-grid">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </Reveal>
        <div className="category-links">
          {products.slice(3, 6).map((product) => (
            <Link href={`/products/${product.slug}`} key={product.slug}>
              {product.name}
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
export function AboutPreview() {
  return (
    <section className="section surface">
      <Container className="split-section">
        <Reveal className="about-visual">
          <ImagePlaceholder
            src="/images/pre engineered steel plant/low-angle-view-scafolding-building-scaled.jpg"
            alt="Reference view of a steel building frame under construction"
            label="STEEL BUILDING DELIVERY / REFERENCE IMAGE"
            variant="flat"
          />
          <div className="location-stamp">
            <MapPin size={18} />
            <div>
              Based in Chennai.
              <span>Building for industrial requirements.</span>
            </div>
          </div>
        </Reveal>
        <Reveal className="section-copy">
          <p className="eyebrow">
            <span />
            ABOUT RAMDEV ENTERPRISES
          </p>
          <h2>
            Industrial buildings begin
            <br />
            with the operation.
          </h2>
          <p>
            Ramdev Enterprises focuses on pre-engineered steel plants shaped
            around the intended operation, site constraints and required
            building geometry.
          </p>
          <p>
            The discussion connects building layout, structural inputs, envelope
            systems, equipment interfaces and the agreed design, fabrication,
            supply and erection scope.
          </p>
          <div className="inline-facts">
            <div>
              <span>BASED IN</span>
              <strong>Chennai, Tamil Nadu</strong>
            </div>
            <div>
              <span>PRIMARY FOCUS</span>
              <strong>Pre-engineered steel plants</strong>
            </div>
          </div>
          <Link className="text-link" href="/about">
            Get to know us
            <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
const stats = [
  { value: 80, label: "Expat workers" },
  { value: 20, label: "Years experience" },
  { value: 40, label: "Completed projects" },
  { value: 22, label: "Running projects" },
];
export function StatsSection() {
  return (
    <section className="section stats-section">
      <Container>
        <Reveal stagger className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <StatCounter value={stat.value} />
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
const reasons = [
  {
    icon: ClipboardCheck,
    title: "The operation comes first.",
    text: "Building geometry starts with production flow, equipment, access and future needs.",
  },
  {
    icon: FileCheck2,
    title: "Interfaces stay coordinated.",
    text: "Framing, envelope, cranes, mezzanines, openings and services are reviewed together.",
  },
  {
    icon: MessagesSquare,
    title: "Scope remains explicit.",
    text: "Design, fabrication, supply, erection and civil responsibilities are defined before execution.",
  },
  {
    icon: PackageCheck,
    title: "Delivery is project-led.",
    text: "Drawings, material flow, logistics and site sequencing are connected to the agreed programme.",
  },
];
export function WhyChooseUs() {
  return (
    <section className="section dark-section">
      <Container>
        <SectionHeading
          eyebrow="THE RAMDEV APPROACH"
          title="One building system. Many coordinated decisions."
        />
        <Reveal stagger className="reason-grid">
          {reasons.map((reason, index) => (
            <article key={reason.title}>
              <div className="reason-top">
                <reason.icon size={28} strokeWidth={1.25} aria-hidden="true" />
                <span>0{index + 1}</span>
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
export function ClientsSection() {
  return (
    <section className="section surface clients-section">
      <Container>
        <SectionHeading
          eyebrow="BUILDERS & DEVELOPERS WE HAVE WORKED WITH"
          title="Trusted by builders, developers and project teams."
        />
        <Reveal>
          <ul className="clients-grid">
            {clients.map((client) => (
              <li key={client.name} className="client-tile">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="(max-width: 600px) 33vw, (max-width: 900px) 25vw, 160px"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
export function FeaturedProducts() {
  const featured = products.filter((product) => product.featured).slice(3, 6);
  if (!featured.length) return null;
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="EXPLORE YOUR REQUIREMENT"
          title="Explore the possibilities for your project."
          href="/products"
          linkLabel="View all categories"
        />
        <Reveal stagger className="product-grid">
          {featured.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={index + 3}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
const industryIcons = [Factory, Building2, Cog, Wrench];
export function IndustriesSection() {
  return (
    <section className="section surface">
      <Container>
        <SectionHeading
          eyebrow="INDUSTRIES & APPLICATIONS"
          title="Industrial spaces built around different operations."
          href="/industries"
          linkLabel="View applications"
          description="Manufacturing, warehousing, engineering and process-support buildings each begin with different operational inputs."
        />
        <Reveal stagger className="industry-grid">
          {industries.map((industry, index) => {
            const Icon = industryIcons[index];
            return (
              <Link
                href={`/industries/${industry.slug}`}
                className="industry-item"
                key={industry.slug}
              >
                <Icon size={34} strokeWidth={1.2} aria-hidden="true" />
                <span className="item-number">0{index + 1}</span>
                <h3>{industry.name}</h3>
                <p>{industry.description}</p>
                <ArrowUpRight size={21} aria-hidden="true" />
              </Link>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
export function CapabilitiesSection() {
  return (
    <section className="section">
      <Container className="split-section">
        <Reveal className="section-copy">
          <p className="eyebrow">
            <span />
            FROM BRIEF TO BUILDING SCOPE
          </p>
          <h2>
            A coordinated path
            <br /> from brief to building.
          </h2>
          <p>
            A useful plant brief connects the site, operation, building
            geometry, structural criteria and project responsibilities before
            work proceeds.
          </p>
          <Button href="/request-quote" secondary>
            Discuss your requirement
          </Button>
        </Reveal>
        <Reveal>
          <ol className="process-list">
            {[
              [
                "Define the operation",
                "Building use, site, process flow, equipment and access needs.",
              ],
              [
                "Set the building inputs",
                "Length, width, height, spans, loads, openings and envelope requirements.",
              ],
              [
                "Coordinate the system",
                "Review framing, roofing, cladding, interfaces and execution responsibilities.",
              ],
              [
                "Confirm project scope",
                "Agree drawings, supply, erection, schedule and commercial boundaries.",
              ],
            ].map(([title, text], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <MoveUpRight size={17} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
export function FeaturedProjects() {
  return (
    <section className="section surface">
      <Container>
        <SectionHeading
          eyebrow="PROJECTS & APPLICATIONS"
          title="Built around the application."
          href="/projects"
          linkLabel="View applications"
        />
        {projects.length ? (
          <Reveal stagger className="product-grid">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </Reveal>
        ) : (
          <ProjectsEmpty />
        )}
      </Container>
    </section>
  );
}
export function QualitySection() {
  return (
    <section className="section">
      <Container className="split-section quality-preview">
        <Reveal>
          <p className="eyebrow">
            <span />
            QUALITY IN THE DETAILS
          </p>
          <h2>
            Clarity at every step.
            <br />
            Confidence in the conversation.
          </h2>
          <Link href="/quality" className="text-link">
            Our quality approach
            <ArrowUpRight size={18} />
          </Link>
        </Reveal>
        <Reveal>
          <p>
            Material suitability starts with a clear understanding of the
            specification. Our quality approach focuses on the details that can
            be reviewed and confirmed.
          </p>
          <ul className="check-list">
            {[
              "Requirement and specification validation",
              "Product documentation, where available",
              "Inspection needs discussed at enquiry stage",
              "Packaging and delivery coordination",
            ].map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
const homepageFaqs = [
  {
    question: "What information is needed to discuss a steel plant?",
    answer:
      "Start with the site location, intended building use, approximate length, width and clear height, required clear spans, openings, equipment interfaces and target programme.",
  },
  {
    question: "Can cranes, mezzanines and service openings be considered?",
    answer:
      "Yes. Share crane loads, mezzanine use, equipment layouts and service-opening requirements early so the relevant structural interfaces can be reviewed as part of the building brief.",
  },
  {
    question: "Does the scope include supply and erection?",
    answer:
      "The required scope can cover design coordination, fabrication, supply and erection. Exact responsibilities, exclusions and site dependencies are confirmed for each enquiry.",
  },
  {
    question: "How does a project enquiry begin?",
    answer:
      "Send the available site information, drawings, operational requirements and schedule. The initial review identifies missing inputs and defines the next technical and commercial discussion.",
  },
];
export function FaqSection() {
  return (
    <section className="section faq-section">
      <Container>
        <SectionHeading
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Useful answers before the first discussion."
        />
        <Reveal stagger className="homepage-faq-list">
          {homepageFaqs.map(({ question, answer }, index) => (
            <details key={question} open={index === 0}>
              <summary>
                <span>{question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
export function ContactSection() {
  return (
    <section className="section surface">
      <Container className="split-section">
        <Reveal className="section-copy">
          <p className="eyebrow">
            <span />
            LET&apos;S CONNECT
          </p>
          <h2>
            Your requirement.
            <br />
            Our next conversation.
          </h2>
          <p>
            Share what you need. We can start with a product description, a
            drawing reference or a project brief.
          </p>
          <a className="contact-email" href={`mailto:${company.email}`}>
            <Mail size={20} />
            {company.email}
          </a>
          <Button href="/contact" secondary>
            Contact our team
          </Button>
        </Reveal>
        <Reveal>
          <a
            className="location-panel"
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
          <div className="map-grid" aria-hidden="true">
            <LocateFixed size={44} strokeWidth={1} />
          </div>
          <div className="location-details">
            <p className="eyebrow">FIND US IN CHENNAI</p>
            <h3>
              {company.locality}, {company.city}
            </h3>
            <p>
              {company.addressLine1}
              <br />
              {company.district}, {company.state} - {company.postalCode}
            </p>
            <span className="text-link">
              Open in Google Maps
              <ArrowUpRight size={16} />
            </span>
          </div>
        </a>
        </Reveal>
      </Container>
    </section>
  );
}
export { RFQBanner };
