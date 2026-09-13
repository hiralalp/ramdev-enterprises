import { HeroSlider } from "./HeroSlider";
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
import { ProductCard } from "@/components/product/ProductCard";
import { ProjectCard, ProjectsEmpty } from "@/components/project/ProjectCard";
import { visibleProducts as products } from "@/lib/catalogue";
import { CatalogueEmpty } from "@/components/product/CatalogueEmpty";
import { industries } from "@/data/industries";
import { insights } from "@/data/insights";
import { projects } from "@/data/projects";
import { company, mapUrl } from "@/data/company";

export function Hero() {
  return (
    <HeroSlider>
      <Container>
        <div className="hero-content">
          <p className="eyebrow">
            <span />
            PRECISION. RELIABILITY. PERFORMANCE.
          </p>
          <h1>
            Ramdev
            <br />
            Enterprises<span>.</span>
          </h1>
          <h2>
            Stainless steel & industrial solutions.
            <br />
            Built to perform.
          </h2>
          <p className="hero-description">
            Requirement-driven material and industrial solutions for demanding
            applications.
          </p>
          <div className="button-row">
            <Button href="/request-quote">Request a quote</Button>
            <Button href="/products" secondary>
              Explore products
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
          [ClipboardCheck, "Requirement-led approach"],
          [FileCheck2, "Clear specification review"],
          [MessagesSquare, "Responsive communication"],
          [PackageCheck, "Delivery coordination"],
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
export function ProductCategories() {
  return (
    <section className="section" id="product-categories">
      <Container>
        <SectionHeading
          eyebrow="MATERIALS & SOLUTIONS"
          title="The right starting point for your requirement."
          href="/products"
          linkLabel="Explore all products"
          description="Explore material and component enquiry categories. Availability and specifications are confirmed against your requirement."
        />
        {!products.length && <CatalogueEmpty />}
        <div className="product-grid">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
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
        <div className="about-visual">
          <ImagePlaceholder
            src="/images/infrastructure/overview.webp"
            alt="Ramdev Enterprises infrastructure"
            label="MATERIAL THINKING / REQUIREMENT-LED SOLUTIONS"
            variant="flat"
          />
          <div className="location-stamp">
            <MapPin size={18} />
            <div>
              Rooted in Chennai.<span>Focused on your requirement.</span>
            </div>
          </div>
        </div>
        <div className="section-copy">
          <p className="eyebrow">
            <span />
            ABOUT RAMDEV ENTERPRISES
          </p>
          <h2>
            Good solutions begin
            <br />
            with understanding.
          </h2>
          <p>
            Ramdev Enterprises supports industrial and engineering requirements
            through responsive sourcing, clear communication and requirement-led
            material solutions.
          </p>
          <p>
            From an initial specification to delivery discussions, our approach
            starts with what your application needs.
          </p>
          <div className="inline-facts">
            <div>
              <span>BASED IN</span>
              <strong>Chennai, Tamil Nadu</strong>
            </div>
            <div>
              <span>OUR APPROACH</span>
              <strong>Requirement first</strong>
            </div>
          </div>
          <Link className="text-link" href="/about">
            Get to know us
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
const reasons = [
  {
    icon: ClipboardCheck,
    title: "Your requirement, understood.",
    text: "A clear conversation about the application, dimensions and expected outcome.",
  },
  {
    icon: FileCheck2,
    title: "Details that stay clear.",
    text: "Specification and documentation needs discussed before moving forward.",
  },
  {
    icon: MessagesSquare,
    title: "Communication that matters.",
    text: "Direct, practical conversations about your material enquiry.",
  },
  {
    icon: PackageCheck,
    title: "A coordinated approach.",
    text: "Packaging and delivery requirements considered as part of the discussion.",
  },
];
export function WhyChooseUs() {
  return (
    <section className="section dark-section">
      <Container>
        <SectionHeading
          eyebrow="THE RAMDEV APPROACH"
          title="More than materials. A considered approach."
        />
        <div className="reason-grid">
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
        </div>
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
        <div className="product-grid">
          {featured.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={index + 3}
            />
          ))}
        </div>
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
          title="Different applications. The same attention to detail."
          href="/industries"
          linkLabel="View applications"
          description="Explore possible application areas, with suitability reviewed against your project specification."
        />
        <div className="industry-grid">
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
        </div>
      </Container>
    </section>
  );
}
export function CapabilitiesSection() {
  return (
    <section className="section">
      <Container className="split-section">
        <div className="section-copy">
          <p className="eyebrow">
            <span />
            FROM REQUIREMENT TO NEXT STEPS
          </p>
          <h2>
            A clear process.
            <br />A considered solution.
          </h2>
          <p>
            Good sourcing starts with a complete brief. Share your requirements
            so the relevant material, documentation and delivery details can be
            discussed together.
          </p>
          <Button href="/request-quote" secondary>
            Discuss your requirement
          </Button>
        </div>
        <ol className="process-list">
          {[
            [
              "Share your requirement",
              "Product form, drawings, grade, quantity and application.",
            ],
            [
              "Review the details",
              "Clarify the specification and documentation needs.",
            ],
            [
              "Discuss the proposal",
              "Review availability, quotation and delivery expectations.",
            ],
            [
              "Coordinate the next step",
              "Confirm the agreed scope before proceeding.",
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
          <div className="product-grid">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
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
        <div>
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
        </div>
        <div>
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
        </div>
      </Container>
    </section>
  );
}
export function InsightsSection() {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="NOTES & PERSPECTIVES"
          title="A little clarity goes a long way."
          href="/insights"
          linkLabel="All insights"
        />
        <div className="insight-grid">
          {insights.map((insight, index) => (
            <article className="insight-card" key={insight.slug}>
              <Link href={`/insights/${insight.slug}`}>
                <div
                  className={`insight-art insight-art-${index}`}
                  aria-hidden="true"
                >
                  <span>
                    FIELD
                    <br />
                    NOTES<span>0{index + 1}</span>
                  </span>
                  <ArrowUpRight size={45} strokeWidth={0.8} />
                </div>
                <p className="insight-meta">
                  {insight.category}
                  <span>{insight.readingTime}</span>
                </p>
                <h3>{insight.title}</h3>
                <span className="text-link">
                  Read article
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
export function ContactSection() {
  return (
    <section className="section surface">
      <Container className="split-section">
        <div className="section-copy">
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
        </div>
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
      </Container>
    </section>
  );
}
export { RFQBanner };
