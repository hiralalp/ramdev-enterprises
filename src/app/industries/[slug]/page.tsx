import { notFound } from "next/navigation";
import { industries } from "@/data/industries";
import {
  Container,
  PageIntro,
  RFQBanner,
  SectionHeading,
} from "@/components/ui/Primitives";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { RelatedProducts } from "@/components/product/ProductDetails";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) notFound();
  return pageMetadata(
    industry.name,
    industry.description,
    `/industries/${slug}`,
  );
}
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) notFound();
  return (
    <>
      <PageIntro
        eyebrow="INDUSTRIES & APPLICATIONS"
        title={industry.name}
        description={industry.description}
        parent={{ label: "Industries", href: "/industries" }}
      />
      <section className="section">
        <Container className="split-section">
          <div>
            <SectionHeading
              eyebrow="UNDERSTANDING THE BRIEF"
              title="The details worth discussing."
            />
            <ul className="plain-list">
              {industry.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </div>
          <ImagePlaceholder
            src={industry.image || `/images/industries/${slug}/cover.webp`}
            alt={industry.name}
            label={industry.name}
            variant="flat"
          />
        </Container>
      </section>
      <section className="section surface">
        <Container className="split-section align-start">
          <div>
            <p className="eyebrow">
              <span />
              POTENTIAL APPLICATIONS
            </p>
            <h2>Where the conversation starts.</h2>
            <ul className="plain-list">
              {industry.applications.map((application) => (
                <li key={application}>{application}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">
              <span />
              WHY RAMDEV ENTERPRISES
            </p>
            <h2>Focused on your requirement.</h2>
            <p className="muted">
              Bring the application, project specification and requested
              delivery details together. Ramdev Enterprises supports a clear
              review of the requirement and the next steps for sourcing.
            </p>
            <p className="muted">
              Material selection and technical suitability must be confirmed by
              the responsible project team. Category references do not imply a
              particular grade, certification or availability.
            </p>
          </div>
        </Container>
      </section>
      <RelatedProducts slugs={industry.productSlugs} />
      <RFQBanner />
    </>
  );
}
