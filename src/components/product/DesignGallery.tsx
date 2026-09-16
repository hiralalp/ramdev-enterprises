"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Maximize2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";

export function DesignGallery({
  name,
  slug,
  images,
  sourceLabel = "Supplied reference catalogue.",
}: {
  name: string;
  slug: string;
  images: { src: string; width: number; height: number }[];
  sourceLabel?: string;
}) {
  const [shown, setShown] = useState(24);
  const [index, setIndex] = useState(-1);
  const number = (position: number) => String(position + 1).padStart(3, "0");
  const quote = (position: number) =>
    `/request-quote?product=${slug}&design=${position + 1}`;
  return (
    <>
      <div className="collection-gallery" aria-label={`${name} designs`}>
        {images.slice(0, shown).map((image, position) => (
          <figure className="design-tile" key={image.src}>
            <button
              className="design-image"
              style={{
                aspectRatio: Math.max(
                  0.72,
                  Math.min(1.5, image.width / image.height),
                ),
              }}
              onClick={() => setIndex(position)}
              aria-label={`Open ${name} design ${number(position)}`}
            >
              <Image
                src={image.src}
                alt={`${name}, reference design ${number(position)}`}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
              <span className="design-zoom" aria-hidden="true">
                <Maximize2 size={18} />
              </span>
            </button>
            <figcaption>
              <span>Design {number(position)}</span>
              <Link
                href={quote(position)}
                aria-label={`Enquire about ${name} design ${number(position)}`}
              >
                Enquire
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="gallery-pagination">
        <p role="status">
          {Math.min(shown, images.length)} of {images.length} designs
        </p>
        {shown < images.length && (
          <button
            className="button button-secondary"
            onClick={() => setShown((count) => count + 24)}
          >
            More designs
            <Plus size={17} aria-hidden="true" />
          </button>
        )}
      </div>
      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        on={{
          view: ({ index: current }) =>
            setIndex((previous) => (previous >= 0 ? current : previous)),
        }}
        plugins={[Zoom, Thumbnails, Captions]}
        slides={images.map((image, position) => ({
          ...image,
          alt: `${name} design ${number(position)}`,
          title: `${name} / Design ${number(position)}`,
          description: `${sourceLabel} Confirm material, finish and scope on enquiry.`,
        }))}
        toolbar={{
          buttons: [
            <Link
              key="quote"
              className="lightbox-quote"
              href={quote(Math.max(index, 0))}
            >
              Enquire about this design
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>,
            "zoom",
            "close",
          ],
        }}
        carousel={{ finite: true }}
        thumbnails={{ width: 72, height: 58 }}
      />
    </>
  );
}
