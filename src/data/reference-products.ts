import catalogue from "./reference-catalogue.json";
import type { Product } from "@/types";

export const referenceCategories = [
  "Stainless Steel",
  "Furniture",
  "PVD Collection",
  "Laser-Cut Designs",
  "Decorative & Accessories",
];
const approvedCollectionSlugs: readonly string[] = [];
const canonicalSlugs: Record<string, string> = {
  "ramdev-railings": "railings-turnkey-solutions",
  "ramdev-doors": "stainless-steel-safety-doors-frames",
  "ramdev-grills": "stainless-steel-partitions",
  "ss-new-bench": "stainless-steel-benches",
  "ss-new-grill": "stainless-steel-grills",
  "ramdev-pvd-coating": "pvd-coating",
  "ramdev-laser-cutting": "laser-cutting",
  "wall-art": "metal-wall-art",
  "pvd-grill-partation": "ss-pvd-coated-screens-partitions",
  "pvd-sofa-chairs": "pvd-stainless-steel-design-furniture",
};
function slugFor(page: string) {
  const base = page.replace(/\.html$/, "");
  return (
    canonicalSlugs[base] ||
    base
      .replace(/^ramdev-/, "stainless-steel-")
      .replace("cansole", "console")
      .replace("partation", "partitions")
      .replaceAll("&", "-")
  );
}
function categoryFor(page: string) {
  if (page.startsWith("pvd-") || page === "ramdev-pvd-coating.html")
    return referenceCategories[2];
  if (page.startsWith("laser-") || page === "ramdev-laser-cutting.html")
    return referenceCategories[3];
  if (/accessories|decorative|nameplates|wall-art|mirror/.test(page))
    return referenceCategories[4];
  if (/table|chairs|bench/.test(page)) return referenceCategories[1];
  return referenceCategories[0];
}
function nameFor(page: string, title: string) {
  const name = title
    .replaceAll("Cansole", "Console")
    .replaceAll("Partation", "Partitions")
    .replaceAll("Jullas", "Swings")
    .replaceAll("Jhulas", "Swings");
  return page.startsWith("laser-") ? `Laser-Cut ${name}` : name;
}
export const referenceProducts: Product[] = catalogue.map((collection) => {
  const name = nameFor(collection.page, collection.title);
  const category = categoryFor(collection.page);
  const slug = slugFor(collection.page);
  const application = /table|chair|sofa|mirror/.test(slug)
    ? "room layout, furniture dimensions and finish"
    : /railing|grill|partition|door|gate/.test(slug)
      ? "opening dimensions, fixing details and site layout"
      : "dimensions, intended application and finish";
  return {
    slug,
    name,
    category,
    approved: approvedCollectionSlugs.includes(slug),
    featured: [
      "ramdev-railings.html",
      "ramdev-grills.html",
      "ramdev-doors.html",
      "ramdev-tables.html",
      "ramdev-pvd-coating.html",
      "ramdev-laser-cutting.html",
    ].includes(collection.page),
    sourcePage: collection.page,
    banner: collection.banner,
    shortDescription: `Explore ${name.toLowerCase()} and select a design for your project. Final dimensions, materials and scope are confirmed on enquiry.`,
    seoTitle: `${name} | Ramdev Enterprises Chennai`,
    metaDescription: `Browse ${name.toLowerCase()} design references. Share your selected design, dimensions and finish with Ramdev Enterprises Chennai for a project enquiry.`,
    intro: `The ${name.toLowerCase()} collection brings together design references from the supplied Ramdev Steel Industries catalogue. Start with a visual reference, then define the ${application}. Images guide the discussion; they do not establish stock, engineering ratings or an agreed supply specification.`,
    features: [
      "Design-led selection",
      "Project-specific dimensions",
      "Finish and sample review",
      "Drawing coordination",
      "Quantity-based enquiry",
      "Scope confirmed before order",
    ],
    applications: /table|chair|sofa|mirror/.test(slug)
      ? [
          "Residential interiors",
          "Hospitality spaces",
          "Office interiors",
          "Reception areas",
        ]
      : [
          "Residential projects",
          "Commercial interiors",
          "Architectural fit-outs",
          "Project-specific applications",
        ],
    specifications: [
      {
        label: "Design reference",
        value: "Select an image from this collection",
      },
      { label: "Dimensions", value: "As per your drawing or site measurement" },
      { label: "Material / grade", value: "To be specified and confirmed" },
      {
        label: "Finish",
        value:
          "Subject to sample approval; photographs are not finish standards",
      },
      { label: "Quantity", value: "As per project BOQ" },
      {
        label: "Supply / installation",
        value: "Responsibilities to be agreed in the quotation",
      },
    ],
    howToSpecify: [
      `Choose a ${name.toLowerCase()} design and note its reference number.`,
      `Share the ${application}, together with drawings where available.`,
      "Confirm quantity, delivery location, target date and sample requirements.",
      "Agree material, technical suitability and supply or installation scope before ordering.",
    ],
    faqs: [
      {
        question: `How do I enquire about a ${name.toLowerCase()} design?`,
        answer:
          "Open a gallery image and choose Enquire about this design. The quote form includes the collection and design reference; add your dimensions and quantity.",
      },
      {
        question: "Can dimensions or finishes be changed?",
        answer: `Share the required ${application}. Feasibility and final options need confirmation against the drawing and approved sample.`,
      },
      {
        question: "Do these photographs confirm available stock?",
        answer:
          "No. These are images imported from the supplied reference catalogue. Availability, manufacturing method and suitability must be confirmed separately.",
      },
      {
        question: "Is installation included?",
        answer:
          "Installation, measurements, engineering review and site acceptance are included only when explicitly agreed in the quotation.",
      },
    ],
    image: collection.images[0].src,
    gallery: collection.images.map((image) => image.src),
    galleryImages: collection.images,
    relatedSlugs: [],
  };
});
for (const product of referenceProducts) {
  product.relatedSlugs = [
    ...referenceProducts.filter(
      (other) =>
        other.slug !== product.slug && other.category === product.category,
    ),
    ...referenceProducts.filter((other) => other.category !== product.category),
  ]
    .slice(0, 3)
    .map((other) => other.slug);
}
referenceProducts.sort(
  (first, second) => Number(!!second.featured) - Number(!!first.featured),
);
