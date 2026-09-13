import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteUrl } from "@/lib/seo";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container", className)}>{children}</div>;
}
export function Button({
  children,
  href,
  secondary = false,
  className,
}: {
  children: React.ReactNode;
  href: string;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={cn("button", secondary && "button-secondary", className)}
      href={href}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {linkLabel}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const crumbs = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((item, index) => (
            <li key={item.label}>
              {index > 0 && <ChevronRight size={12} aria-hidden="true" />}
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  parent,
}: {
  eyebrow: string;
  title: string;
  description: string;
  parent?: { label: string; href: string };
}) {
  return (
    <section className="page-intro">
      <Container>
        <Breadcrumbs items={[...(parent ? [parent] : []), { label: title }]} />
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
      </Container>
    </section>
  );
}
export function RFQBanner() {
  return (
    <section className="rfq-banner">
      <Container>
        <div>
          <p className="eyebrow">LET&apos;S TALK REQUIREMENTS</p>
          <h2>
            Your next project starts
            <br />
            with a clear conversation.
          </h2>
        </div>
        <Button href="/request-quote">Request a quote</Button>
      </Container>
    </section>
  );
}
