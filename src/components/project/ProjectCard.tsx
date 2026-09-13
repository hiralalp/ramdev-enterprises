import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";
import type { Project } from "@/types";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Primitives";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="product-card">
      <Link href={`/projects/${project.slug}`}>
        <ImagePlaceholder
          src={project.image}
          label={project.application}
          alt={project.name}
          variant="flat"
        />
        <div className="product-card-content">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <span className="text-link">
            View application
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}
export function ProjectsEmpty() {
  return (
    <div className="projects-empty">
      <Layers3 size={36} strokeWidth={1} aria-hidden="true" />
      <div>
        <h3>Every application has its own requirements.</h3>
        <p>
          Project case studies are being prepared. Contact our team to discuss
          relevant applications.
        </p>
      </div>
      <Button href="/contact" secondary>
        Contact our team
      </Button>
    </div>
  );
}
