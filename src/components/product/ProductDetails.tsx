import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  FileCheck2,
  MessagesSquare,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types";
import { ProductMedia } from "./ProductMedia";
import {
  Breadcrumbs,
  Button,
  Container,
  SectionHeading,
} from "@/components/ui/Primitives";
import { ProductCard } from "./ProductCard";
import { visibleProducts as products } from "@/lib/catalogue";
import { company } from "@/data/company";

export function SpecificationTable({
  rows,
}: {
  rows: Product["specifications"];
}) {
  return (
    <div className="specification-wrap">
      <table className="specification-table">
        <caption>Specification details to confirm with sales</caption>
        <thead>
          <tr>
            <th scope="col">Parameter</th>
            <th scope="col">Requirement</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function ProductGallery({ product }: { product: Product }) {
  const images = product.gallery?.length
    ? product.gallery
    : ["gallery-01", "gallery-02", "gallery-03", "application-01"].map(
        (name) => `/images/products/${product.slug}/${name}.webp`,
      );
  return (
    <div className="gallery-grid product-gallery">
      {images.map((image, index) => (
        <ProductMedia
          product={product}
          key={image || index}
          src={image}
          alt={`${product.name} ${image?.includes("application") ? "application reference" : `detail ${index + 1}`}`}
          label={`${image?.includes("application") ? "Application" : "Detail"} / ${String(index + 1).padStart(2, "0")}`}
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      ))}
    </div>
  );
}
export function RelatedProducts({ slugs }: { slugs?: string[] }) {
  const related = products.filter((product) => slugs?.includes(product.slug));
  if (!related.length) return null;
  return (
    <section className="section surface">
      <Container>
        <SectionHeading
          eyebrow="CONTINUE EXPLORING"
          title="Related requirements"
        />
        <div className="product-grid catalogue-grid">
          {related.map((product, index) => (
            <ProductCard product={product} key={product.slug} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
export function ProductHero({ product }: { product: Product }) {
  return (
    <section className="product-detail-hero">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: product.name },
          ]}
        />
        <div className="product-hero-layout">
          <div className="product-hero-copy">
            <p className="eyebrow">
              <span />
              {product.category}
            </p>
            {!product.approved && <span className="draft-badge">Draft</span>}
            <h1>{product.name}</h1>
            <p className="lead">{product.shortDescription}</p>
            <div className="button-row">
              <Button href={`/request-quote?product=${product.slug}`}>
                Request a quote
              </Button>
              <a href="#specifications" className="button button-secondary">
                Explore specifications
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="product-hero-note">
              Availability, specification and scope confirmed against your
              requirement.
            </p>
          </div>
          <ProductMedia
            product={product}
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </Container>
    </section>
  );
}

export function ProcurementTrustStrip() {
  return (
    <div className="trust-strip product-trust-strip">
      <Container>
        {[
          { Icon: ClipboardCheck, label: "Requirement-led supply" },
          { Icon: FileCheck2, label: "Drawing / BOQ coordination" },
          { Icon: MessagesSquare, label: "Responsive commercial support" },
        ].map(({ Icon, label }) => (
          <div key={label}>
            <Icon size={20} strokeWidth={1.4} aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </Container>
    </div>
  );
}

export function ProductOverview({ product }: { product: Product }) {
  return (
    <section className="section product-overview-section">
      <Container className="product-editorial">
        <SectionHeading
          eyebrow="PRODUCT OVERVIEW"
          title="Understand the requirement."
        />
        <div>
          <p className="product-intro">{product.intro}</p>
          {!product.approved && (
            <p className="draft-context">
              Proposed catalogue entry for owner review. This product has not
              yet been confirmed as a Ramdev Enterprises offering.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

export function FeatureGrid({ product }: { product: Product }) {
  return (
    <section className="section surface">
      <Container>
        <SectionHeading
          eyebrow="KEY FEATURES"
          title="The details to consider."
          description="Configuration points for your brief. Final options and suitability depend on the approved requirement."
        />
        <ul className="product-feature-grid">
          {product.features.map((feature, index) => (
            <li key={feature}>
              <span className="item-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Check size={18} aria-hidden="true" />
              <h3>{feature}</h3>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ApplicationGrid({ product }: { product: Product }) {
  return (
    <section className="section">
      <Container className="product-editorial">
        <SectionHeading
          eyebrow="TYPICAL APPLICATIONS"
          title="Put the product in context."
          description="General application references, not claims of completed projects. Suitability requires project-specific review."
        />
        <ul className="product-application-grid">
          {product.applications.map((application) => (
            <li key={application}>
              <span>{application}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function HowToSpecify({ product }: { product: Product }) {
  return (
    <section className="section">
      <Container className="product-editorial">
        <div>
          <SectionHeading
            eyebrow="HOW TO SPECIFY"
            title="A better brief starts here."
          />
          <p className="muted">
            Send the current drawing or BOQ by email. Include your name and
            project reference so the details can be reviewed together.
          </p>
          <a
            className="text-link"
            href={`mailto:${company.email}?subject=${encodeURIComponent(`${product.name} - drawing / BOQ`)}`}
          >
            <Mail size={17} aria-hidden="true" />
            Email your drawing
          </a>
        </div>
        <ol className="product-specify-list">
          {product.howToSpecify.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function ProductRFQ({ product }: { product: Product }) {
  return (
    <section className="product-rfq dark-section">
      <Container>
        <div>
          <p className="eyebrow">
            <span />
            HAVE A REQUIREMENT?
          </p>
          <h2>
            From your drawing
            <br />
            to a clear discussion.
          </h2>
          <p>
            Send your dimensions, drawing or BOQ for a project-specific
            quotation.
          </p>
        </div>
        <div className="button-row">
          <Button href={`/request-quote?product=${product.slug}`}>
            Request a quote
          </Button>
          <a
            className="button button-secondary"
            href={`mailto:${company.email}?subject=${encodeURIComponent(`Requirement: ${product.name}`)}`}
          >
            Send requirement
            <Mail size={17} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}

export function ProductFaq({ product }: { product: Product }) {
  return (
    <div className="faq-list">
      {product.faqs.map(({ question, answer }) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ProductContactBand() {
  return (
    <section className="product-contact-band">
      <Container>
        <div>
          <MapPin size={22} aria-hidden="true" />
          <span>
            {company.name}
            <small>
              {company.city}, {company.state}
            </small>
          </span>
        </div>
        <a href={`mailto:${company.email}`}>
          <Mail size={18} aria-hidden="true" />
          {company.email}
        </a>
        <Link className="text-link" href="/contact">
          Contact our team
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
