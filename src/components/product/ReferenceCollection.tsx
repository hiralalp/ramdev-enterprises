import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Images } from "lucide-react";
import type { Product } from "@/types";
import {
  Breadcrumbs,
  Container,
  Button,
  SectionHeading,
} from "@/components/ui/Primitives";
import { DesignGallery } from "./DesignGallery";
import {
  SpecificationTable,
  ProductFaq,
  RelatedProducts,
  ProductContactBand,
} from "./ProductDetails";

export function CollectionBanner({ product }: { product: Product }) {
  return (
    <section className="collection-banner">
      <Image
        src={product.banner || product.image!}
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="collection-banner-shade" />
      <Container>
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: product.name },
          ]}
        />
        <div className="collection-banner-copy">
          <p className="eyebrow">
            {product.category}
            {!product.approved && <span className="draft-badge">Draft</span>}
          </p>
          <h1>{product.name}</h1>
          <p>
            A collection of forms, finishes and details for your next space.
          </p>
          <div className="button-row">
            <a className="button" href="#collection">
              Explore collection
              <ArrowDown size={16} />
            </a>
            <Button href={`/request-quote?product=${product.slug}`} secondary>
              Request a quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
export function ReferenceCollection({ product }: { product: Product }) {
  return (
    <div className="reference-collection">
      <CollectionBanner product={product} />
      <div className="collection-strip">
        <Container>
          <span>
            <Images size={18} aria-hidden="true" />
            {product.galleryImages!.length} design references
          </span>
          <span>Drawing & finish coordination</span>
          <a href="#specifications">
            Specification guidance
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </Container>
      </div>
      <section className="section collection-section" id="collection">
        <Container>
          <div className="collection-heading">
            <div>
              <p className="eyebrow">OUR COLLECTION</p>
              <h2>Discover the details.</h2>
            </div>
            <p>
              Images from the supplied Ramdev Steel Industries catalogue.
              Materials, finishes and availability require confirmation.
            </p>
          </div>
          <DesignGallery
            name={product.name}
            slug={product.slug}
            images={product.galleryImages!}
          />
        </Container>
      </section>
      <section className="collection-enquiry">
        <Container>
          <div>
            <p className="eyebrow">YOUR PROJECT, YOUR DETAILS</p>
            <h2>
              Found a design
              <br />
              that fits your space?
            </h2>
            <p>Share your chosen reference, dimensions and quantity.</p>
          </div>
          <Button href={`/request-quote?product=${product.slug}`}>
            Start an enquiry
          </Button>
        </Container>
      </section>
      <section className="section" id="specifications">
        <Container className="product-editorial">
          <div>
            <SectionHeading
              eyebrow="MAKE IT PROJECT-SPECIFIC"
              title="From reference to requirement."
            />
            <p>{product.intro}</p>
            <Link
              className="text-link"
              href={`/request-quote?product=${product.slug}`}
            >
              Discuss your brief
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <SpecificationTable rows={product.specifications} />
        </Container>
      </section>
      <section className="section surface">
        <Container className="product-editorial">
          <SectionHeading
            eyebrow="BEFORE YOU ENQUIRE"
            title="A few useful answers."
          />
          <ProductFaq product={product} />
        </Container>
      </section>
      <RelatedProducts slugs={product.relatedSlugs} />
      <ProductContactBand />
    </div>
  );
}
