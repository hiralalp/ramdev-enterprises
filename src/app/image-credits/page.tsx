import { photoCredits } from "@/lib/photo-credits";
import { Container, PageIntro } from "@/components/ui/Primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Image Credits",
  "Photograph sources, authors and open licences for reference imagery used on the Ramdev Enterprises website.",
  "/image-credits",
);
export default function ImageCreditsPage() {
  return (
    <>
      <PageIntro
        eyebrow="SOURCES & LICENCES"
        title="Image credits"
        description="Third-party reference photographs illustrate general products and applications. They do not depict Ramdev Enterprises inventory, facilities or completed projects, and do not imply endorsement."
      />
      <section className="section surface" id="supplied-catalogue">
        <Container>
          <h2>Supplied reference catalogue</h2>
          <p>
            The product collections use images copied from the locally supplied
            Ramdev Steel Industries website at the owner&apos;s request.
            Original files and embedded branding are preserved. These are
            reference designs, not evidence of Ramdev Enterprises inventory or
            completed work.
          </p>
          <p>
            No open licence is asserted for this collection. Publication rights
            must be confirmed before deployment.{" "}
            <a className="text-link" href="https://ramdevsteels.in/">
              Source website
            </a>{" "}
            /{" "}
            <a className="text-link" href="/images/reference/manifest.json">
              Image source manifest
            </a>
          </p>
        </Container>
      </section>
      <section className="section">
        <Container>
          <h2>Owner-supplied product photographs</h2>
          <p>
            The pre-engineered steel plant, bicycle stand, bollard, bus shelter,
            cable tray, canopy, corner guard, dustbin, facade, grating, pergola
            and planter collections use images supplied in dedicated product
            folders. The original files and any embedded marks are preserved. No
            open licence or ownership of the pictured work is asserted. Confirm
            image publication rights, material specifications and availability
            before deployment.
          </p>
        </Container>
      </section>
      <section className="section">
        <Container className="photo-credit-list">
          <p>
            The separately sourced open-licence photographs below remain
            available under their stated licences, including our resized WebP
            version. The website&apos;s general copyright notice does not
            override these image licences.
          </p>
          {photoCredits.map((photo) => (
            <article id={photo.id} key={photo.id}>
              <h2>{photo.title.replace(/^File:/, "")}</h2>
              <p>{photo.description}</p>
              <p>
                Photograph: {photo.author}.{" "}
                <a href={photo.source}>Original source</a> /{" "}
                <a href={photo.licenseUrl}>{photo.license}</a>
              </p>
              <p>{photo.changes}</p>
              <a href={photo.paths[0]}>Download website version</a>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
