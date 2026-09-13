import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { insights } from "@/data/insights";
import {
  Container,
  PageIntro,
  RFQBanner,
  JsonLd,
} from "@/components/ui/Primitives";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { company } from "@/data/company";

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) notFound();
  return {
    ...pageMetadata(insight.title, insight.description, `/insights/${slug}`),
    openGraph: {
      type: "article" as const,
      title: insight.title,
      description: insight.description,
      url: `${siteUrl}/insights/${slug}`,
    },
  };
}
export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) notFound();
  return (
    <>
      <PageIntro
        eyebrow={`${insight.category} / ${insight.readingTime}`}
        title={insight.title}
        description={insight.description}
        parent={{ label: "Insights", href: "/insights" }}
      />
      <section className="section">
        <Container className="article-layout">
          <aside>
            <p className="eyebrow">
              <span />
              IN THIS NOTE
            </p>
            <nav aria-label="Article sections">
              {insight.sections.map((section, index) => (
                <a href={`#section-${index + 1}`} key={section.title}>
                  {section.title}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </nav>
            <Link className="text-link" href="/insights">
              <ArrowLeft size={15} />
              All insights
            </Link>
          </aside>
          <article className="article-body">
            {insight.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <p className="article-disclaimer">
              General procurement guidance only. Confirm technical suitability
              and project requirements with the responsible engineer before
              purchasing.
            </p>
          </article>
        </Container>
      </section>
      <RFQBanner />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          description: insight.description,
          url: `${siteUrl}/insights/${slug}`,
          author: { "@type": "Organization", name: company.name, url: siteUrl },
          publisher: { "@type": "Organization", name: company.name },
          mainEntityOfPage: `${siteUrl}/insights/${slug}`,
        }}
      />
    </>
  );
}
