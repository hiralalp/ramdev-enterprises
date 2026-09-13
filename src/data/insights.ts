import type { Insight } from "@/types";

export const insights: Insight[] = [
  {
    slug: "preparing-a-material-enquiry",
    title: "A clearer enquiry. A better starting point.",
    category: "PROCUREMENT",
    readingTime: "3 min read",
    description:
      "The information to include when requesting a material quotation.",
    sections: [
      {
        title: "Start with the application",
        body: "Explain what the material will be used for and include the applicable project specification. Service conditions can affect suitability, so a material choice should be reviewed by the responsible engineer rather than inferred from a product name.",
      },
      {
        title: "Make the requirement measurable",
        body: "Include the product form, required grade if known, dimensions, quantity and units. Where a drawing controls the requirement, identify the current revision. If a detail is undecided, mark it as requiring clarification.",
      },
      {
        title: "Include the delivery and documentation needs",
        body: "Share the delivery location, requested date and any inspection or document requirements. Availability, documentation and delivery should be confirmed in the quotation before an order is placed.",
      },
    ],
  },
  {
    slug: "reading-material-specifications",
    title: "Small details that matter in a material specification.",
    category: "MATERIAL NOTES",
    readingTime: "4 min read",
    description:
      "A practical review of grades, dimensions, finishes and documentation.",
    sections: [
      {
        title: "Separate grade from product form",
        body: "A grade designation does not describe the complete product. Product form, dimensional requirements and applicable standards should be stated separately and checked against the intended use.",
      },
      {
        title: "Specify finish and tolerances",
        body: "Surface finish and dimensional tolerances may influence fabrication and appearance. Record the requirements explicitly instead of relying on informal descriptions or assumptions.",
      },
      {
        title: "Check what documentation is required",
        body: "If the project requires material certificates, inspection records or other documentation, include those needs at enquiry stage. The availability of a particular document must be confirmed for the proposed supply.",
      },
    ],
  },
  {
    slug: "planning-project-procurement",
    title: "Plan the requirement before the purchase.",
    category: "PROJECT PLANNING",
    readingTime: "3 min read",
    description:
      "Bring quantities, drawings and delivery priorities into one clear brief.",
    sections: [
      {
        title: "Use one controlled requirement list",
        body: "Combine item descriptions, quantities, units and drawing references in a single list. Keep revisions visible so that suppliers and project teams can work from the same information.",
      },
      {
        title: "Identify priorities",
        body: "Distinguish required delivery dates from preferred dates. Note whether partial deliveries are acceptable and explain any site access or packaging constraints.",
      },
      {
        title: "Review the quotation against the brief",
        body: "Check quoted descriptions, exclusions, documentation, taxes, delivery terms and payment conditions. Resolve differences in writing before confirming an order.",
      },
    ],
  },
];
