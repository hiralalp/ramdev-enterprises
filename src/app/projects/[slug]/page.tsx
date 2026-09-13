import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Container, PageIntro, RFQBanner } from "@/components/ui/Primitives";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return pageMetadata(project.name, project.description, `/projects/${slug}`);
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <>
      <PageIntro
        eyebrow={project.application}
        title={project.name}
        description={project.description}
        parent={{ label: "Projects", href: "/projects" }}
      />
      <section className="section">
        <Container>
          <ImagePlaceholder
            src={project.image}
            alt={project.name}
            label={project.application}
            variant="flat"
          />
          {project.gallery?.length ? (
            <div className="gallery-grid project-gallery">
              {project.gallery.map((image, index) => (
                <ImagePlaceholder
                  key={image}
                  src={image}
                  alt={`${project.name} view ${index + 1}`}
                  label={project.application}
                  variant="flat"
                />
              ))}
            </div>
          ) : null}
        </Container>
      </section>
      <RFQBanner />
    </>
  );
}
