import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "engineering-fabrication",
    name: "Engineering & Fabrication",
    description:
      "Material conversations that begin with the drawing and the intended application.",
    challenges: [
      "Translating drawings into clear material requirements",
      "Coordinating dimensions, finish and quantities",
      "Identifying documentation needs before ordering",
    ],
    applications: [
      "Fabricated assemblies",
      "Machine parts",
      "Workshop requirements",
    ],
    productSlugs: [
      "custom-stainless-steel-fabrication",
      "stainless-steel-gratings",
      "cable-trays",
    ],
  },
  {
    slug: "construction-infrastructure",
    name: "Construction & Infrastructure",
    description:
      "Requirement-led discussions for built environments and project-based procurement.",
    challenges: [
      "Aligning material choices with project specifications",
      "Communicating site delivery requirements",
      "Reviewing finish and dimensional expectations",
    ],
    applications: [
      "Architectural metalwork",
      "Project fabrication",
      "Service infrastructure",
    ],
    productSlugs: [
      "railings-turnkey-solutions",
      "stainless-steel-facades",
      "ss-drywall-stone-cladding-clamps",
    ],
  },
  {
    slug: "process-industries",
    name: "Process Industries",
    description:
      "A specification-first approach to piping and equipment-related enquiries.",
    challenges: [
      "Capturing service conditions and compatibility needs",
      "Confirming connection details",
      "Discussing traceability requirements where applicable",
    ],
    applications: [
      "Process pipework",
      "Equipment connections",
      "Maintenance requirements",
    ],
    productSlugs: [
      "stainless-steel-gratings",
      "cable-trays",
      "custom-stainless-steel-fabrication",
    ],
  },
  {
    slug: "industrial-maintenance",
    name: "Industrial Maintenance",
    description:
      "Clear communication for replacement parts, repairs and planned maintenance.",
    challenges: [
      "Identifying replacement components accurately",
      "Reviewing drawings and reference specifications",
      "Communicating required delivery dates",
    ],
    applications: [
      "Replacement components",
      "Plant maintenance",
      "Engineering repairs",
    ],
    productSlugs: [
      "custom-stainless-steel-fabrication",
      "stainless-steel-corner-guards",
      "cable-trays",
    ],
  },
];
