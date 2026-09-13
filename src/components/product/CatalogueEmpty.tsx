import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/Primitives";

export function CatalogueEmpty() {
  return (
    <div className="projects-empty catalogue-empty">
      <PackageSearch size={36} strokeWidth={1.25} aria-hidden="true" />
      <div>
        <h2>Tell us what your project needs.</h2>
        <p>
          Our product catalogue is being prepared. Share your drawing, BOQ or
          material requirement with our team for a direct discussion.
        </p>
      </div>
      <Button href="/request-quote">Send your requirement</Button>
    </div>
  );
}
