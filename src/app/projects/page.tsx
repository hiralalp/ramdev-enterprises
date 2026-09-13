import { projects } from "@/data/projects";
import { ProjectCard, ProjectsEmpty } from "@/components/project/ProjectCard";
import { Container, PageIntro, RFQBanner } from "@/components/ui/Primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Projects & Applications",
  "Discuss application requirements with Ramdev Enterprises. Approved project case studies will be shared when available.",
  "/projects",
);
export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="PROJECTS & APPLICATIONS"
        title="Every requirement has a context."
        description="Material decisions are shaped by the application. Connect with our team to discuss your project brief and the details that matter."
      />
      <section className="section">
        <Container>
          {projects.length ? (
            <div className="product-grid">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <ProjectsEmpty />
          )}
        </Container>
      </section>
      <RFQBanner />
    </>
  );
}
