import type { Product, ProductFaq, ProductSpecification } from "@/types";
import { referenceProducts, referenceCategories } from "./reference-products";
import suppliedPhotos from "./supplied-product-photos.json";

export const legacyCatalogueCategories = [
  "Steel Products",
  "Industrial Products & Projects",
  "Interior & Architectural Products",
  "Exterior & Architectural Products",
  "Arts & Sculptures",
] as const;
type Brief = Pick<
  Product,
  | "slug"
  | "name"
  | "shortDescription"
  | "intro"
  | "features"
  | "applications"
  | "howToSpecify"
  | "relatedSlugs"
  | "metaDescription"
> & {
  category: (typeof legacyCatalogueCategories)[number];
  secondaryCategories?: string[];
  featured?: boolean;
  approved?: boolean;
  dimensionLabel?: string;
  dimensionValue?: string;
  pvd?: boolean;
  extraSpecifications?: ProductSpecification[];
  specificFaq: ProductFaq;
};

function proposedProduct(brief: Brief): Product {
  return {
    slug: brief.slug,
    name: brief.name,
    category: brief.category,
    secondaryCategories: brief.secondaryCategories,
    approved: brief.approved ?? false,
    featured: brief.featured,
    shortDescription: brief.shortDescription,
    intro: brief.intro,
    seoTitle: `${brief.name} | Ramdev Enterprises Chennai`,
    metaDescription: brief.metaDescription,
    features: brief.features,
    applications: brief.applications,
    howToSpecify: brief.howToSpecify,
    specifications: [
      {
        label: "Material / grade",
        value: "As specified in the approved requirement",
      },
      {
        label: brief.dimensionLabel || "Dimensions",
        value: brief.dimensionValue || "Requirement- or drawing-specific",
      },
      {
        label: brief.pvd ? "PVD shade / texture" : "Finish",
        value: brief.pvd
          ? "Subject to physical sample approval"
          : "As specified / sample-approved where applicable",
      },
      { label: "Quantity", value: "RFQ / BOQ-based" },
      { label: "Application environment", value: "Customer to specify" },
      { label: "Documentation / inspection", value: "As agreed for the order" },
      ...(brief.extraSpecifications || []),
    ],
    faqs: [
      {
        question: `What information is required to quote ${brief.name}?`,
        answer: `${brief.howToSpecify[0]} Include quantity, delivery location and required material or grade. Final availability and commercial terms depend on the approved requirement.`,
      },
      {
        question: `Can ${brief.name} be reviewed against a drawing or BOQ?`,
        answer: `${brief.howToSpecify[1]} Email the current drawing revision and BOQ for review. Supply and installation responsibilities must be agreed separately.`,
      },
      {
        question: `How should dimensions and finishes be specified for ${brief.name}?`,
        answer: `${brief.howToSpecify[2]} State any mandatory grade, dimensions and consultant specification. Customization, documentation and feasibility require confirmation against the approved requirement.`,
      },
      brief.specificFaq,
    ],
    image: `/images/products/${brief.slug}/hero.webp`,
    gallery: ["gallery-01", "gallery-02", "gallery-03", "application-01"].map(
      (name) => `/images/products/${brief.slug}/${name}.webp`,
    ),
    relatedSlugs: brief.relatedSlugs,
  };
}

export const legacyProducts: Product[] = [
  proposedProduct({
    slug: "railings-turnkey-solutions",
    name: "Railings Turnkey Solutions",
    category: "Steel Products",
    featured: true,
    shortDescription:
      "Project-led railing requirements for stairs, balconies and circulation areas, with supply and installation scope defined in the brief.",
    metaDescription:
      "Plan a railing enquiry with layouts, fixing details, finish and BOQ. Discuss project requirements and scope with Ramdev Enterprises in Chennai.",
    intro:
      "A project railing package can involve handrails, posts, infill and fixings at stairs or slab edges. The enquiry should distinguish material supply from surveying, detailing and installation responsibilities. Start with the architect's layout and the responsible engineer's safety criteria so each part of the proposed package can be reviewed together.",
    features: [
      "Project-specific railing layouts",
      "Indoor and outdoor environments to specify",
      "Architectural profile coordination",
      "Drawing and BOQ inputs",
      "Finish and sample requirements",
      "Handrail and accessory schedules",
    ],
    applications: [
      "Staircases",
      "Balconies",
      "Walkways",
      "Commercial buildings",
      "Hospitals",
      "Transport infrastructure",
    ],
    howToSpecify: [
      "Provide railing lengths, heights, stair geometry and the locations covered by the package.",
      "Include post layouts, infill details, fixing drawings and a supply-versus-installation responsibility schedule.",
      "State the required profile, grade, finish and indoor or outdoor exposure.",
      "Attach consultant safety criteria, BOQ, delivery location and inspection requirements.",
    ],
    specificFaq: {
      question: "Does turnkey mean installation is automatically included?",
      answer:
        "No. Surveying, engineering, supply, installation and site acceptance responsibilities must be explicitly agreed. The page title does not establish an installation commitment.",
    },
    relatedSlugs: [
      "residential-stainless-steel-railings",
      "stainless-steel-cladding",
      "custom-stainless-steel-fabrication",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-benches",
    name: "Stainless Steel Benches",
    category: "Steel Products",
    secondaryCategories: ["Exterior & Architectural Products"],
    featured: true,
    shortDescription:
      "Seating requirements for waiting areas, public spaces and campuses, defined by layout, fixing method and intended use.",
    metaDescription:
      "Prepare a stainless steel bench enquiry with seating dimensions, mounting and finish. Review your requirements with Ramdev Enterprises in Chennai.",
    intro:
      "Bench selection starts with the space and the people using it. Seat length, backrests, armrests and clearance affect the layout, while fixed and freestanding arrangements require different coordination. State the environment and cleaning expectations; appearance alone does not establish suitability for high-traffic or outdoor use.",
    features: [
      "Seat and backrest configuration",
      "Armrest requirements",
      "Fixed or freestanding concepts",
      "Seating dimensions",
      "Cleaning and finish considerations",
      "Indoor and outdoor location review",
    ],
    applications: [
      "Waiting areas",
      "Hospitals",
      "Transit facilities",
      "Parks",
      "Commercial complexes",
      "Campuses",
    ],
    howToSpecify: [
      "Share seat length, seating positions and the proposed bench layout.",
      "Include backrest, armrest and floor-fixing details with the furniture schedule.",
      "Specify grade, finish, cleaning conditions and exposure to weather.",
      "Provide quantities, delivery location, site access and applicable seating criteria.",
    ],
    specificFaq: {
      question: "Are fixed and freestanding benches interchangeable?",
      answer:
        "No. Stability, anchoring and floor conditions need separate review. Identify the intended arrangement and any engineering or accessibility requirements before quotation.",
    },
    relatedSlugs: [
      "stainless-steel-bus-shelters",
      "stainless-steel-dustbins",
      "stainless-steel-design-furniture",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-dustbins",
    name: "Stainless Steel Dustbins",
    category: "Steel Products",
    shortDescription:
      "Waste-container enquiries shaped by segregation needs, capacity, access and the installation environment.",
    metaDescription:
      "Specify stainless steel dustbin capacity, waste streams, liners and location. Discuss a requirement-led enquiry with Ramdev Enterprises in Chennai.",
    intro:
      "A waste unit needs to suit both its users and the collection routine. Openings, removable liners, lids and labeling should be considered alongside the floor space. For multiple waste streams, describe each compartment separately rather than relying on a total capacity or reference photograph.",
    features: [
      "Single or multiple waste-stream concepts",
      "Liner and collection access",
      "Capacity requirements",
      "Indoor and outdoor siting",
      "Project labeling brief",
      "Lid and mounting coordination",
    ],
    applications: [
      "Offices",
      "Hospitals",
      "Malls",
      "Public facilities",
      "Hotels",
      "Campuses",
    ],
    howToSpecify: [
      "List waste streams, capacity per compartment and the space available.",
      "Provide opening, lid and liner details with labeling artwork or the waste-management schedule.",
      "State grade, finish and cleaning method for the intended location.",
      "Include quantities, collection arrangements, delivery address and mounting requirements.",
    ],
    specificFaq: {
      question:
        "Does a hospital application imply suitability for clinical waste?",
      answer:
        "No. Clinical or hazardous waste has specific handling requirements. Supply the applicable specification for review; this general waste-container category does not imply that suitability.",
    },
    relatedSlugs: [
      "stainless-steel-benches",
      "stainless-steel-planters",
      "stainless-steel-bus-shelters",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-bicycle-stands",
    name: "Stainless Steel Bicycle Stands",
    category: "Steel Products",
    shortDescription:
      "Bicycle-parking requirements planned around bay count, circulation, mounting and site layout.",
    metaDescription:
      "Define bicycle stand layouts, bay counts, fixing details and finishes for your site. Discuss the enquiry with Ramdev Enterprises in Chennai.",
    intro:
      "Bicycle parking is a layout requirement as much as a product choice. The arrangement should account for bicycle access, circulation and the fixing surface. A site plan helps distinguish usable parking positions from a nominal stand count and makes the intended locking arrangement clear.",
    features: [
      "Bay-count and spacing coordination",
      "Site-specific parking layouts",
      "Fixed mounting details",
      "Indoor and outdoor siting",
      "Locking access considerations",
      "Maintenance requirements",
    ],
    applications: [
      "Corporate campuses",
      "Residential developments",
      "Transit areas",
      "Schools",
      "Commercial projects",
      "Public spaces",
    ],
    howToSpecify: [
      "Provide bicycle count, available footprint and circulation clearances.",
      "Attach the parking layout, stand profile and substrate or anchor details.",
      "Identify grade, finish and expected site exposure.",
      "Include quantities by location, delivery address and locking-access criteria.",
    ],
    specificFaq: {
      question: "How should bicycle capacity be stated?",
      answer:
        "State the number of usable parking positions with access clearances. The nominal number of loops or frames does not by itself confirm that a layout accommodates the required bicycles.",
    },
    relatedSlugs: [
      "stainless-steel-bollards",
      "stainless-steel-benches",
      "stainless-steel-canopies",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-bollards",
    name: "Stainless Steel Bollards",
    category: "Steel Products",
    featured: true,
    shortDescription:
      "Architectural bollard enquiries for entrances and pedestrian areas, with mounting and performance requirements stated separately.",
    metaDescription:
      "Discuss stainless steel bollards with diameter, height, mounting and site details. Performance evidence must be confirmed with your requirement.",
    intro:
      "Bollards can define routes, separate areas or form part of an access strategy. Architectural appearance does not establish vehicle-impact protection. Describe whether the requirement is a visual boundary or a documented protective system and provide engineering criteria before discussing the arrangement.",
    features: [
      "Architectural profile selection",
      "Fixed or removable concepts",
      "Site-specific spacing",
      "Diameter and height requirements",
      "Finish and cap detailing",
      "Foundation interface coordination",
    ],
    applications: [
      "Commercial entrances",
      "Pedestrian zones",
      "Parking areas",
      "Public buildings",
      "Hospitality",
      "Urban landscapes",
    ],
    dimensionLabel: "Diameter / height",
    dimensionValue: "Project-specific",
    extraSpecifications: [
      {
        label: "Performance / impact rating",
        value: "Only if supported by approved documentation",
      },
    ],
    howToSpecify: [
      "State diameter, exposed height, quantity and the intended boundary or access function.",
      "Include site layout, spacing, mounting details and foundation information.",
      "Specify grade, finish, cap geometry and exposure conditions.",
      "Supply mandatory impact criteria and evidence requirements with the delivery location.",
    ],
    specificFaq: {
      question: "Are these bollards impact-rated or crash-tested?",
      answer:
        "No rating is claimed. Impact performance must be supported by approved documentation for the exact proposed system, including its foundation and installation arrangement.",
    },
    relatedSlugs: [
      "stainless-steel-bicycle-stands",
      "stainless-steel-benches",
      "railings-turnkey-solutions",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-bus-shelters",
    name: "Stainless Steel Bus Shelters",
    category: "Steel Products",
    shortDescription:
      "Shelter-package requirements bringing the structure, roof, seating and transport-site interfaces into one brief.",
    metaDescription:
      "Prepare a bus shelter brief with dimensions, roof, seating and site interfaces. Discuss project scope with Ramdev Enterprises in Chennai.",
    intro:
      "A bus shelter enquiry coordinates structural framing, roof or enclosure panels, seating and site interfaces. Drawings should identify the required elements and who is responsible for foundations, engineering and installation. Passenger access and maintenance needs belong in the brief from the outset.",
    features: [
      "Project shelter footprint",
      "Roof and enclosure coordination",
      "Seating integration requirements",
      "Component schedules",
      "Passenger access considerations",
      "Finish and site interfaces",
    ],
    applications: [
      "Urban bus stops",
      "Transit corridors",
      "Campuses",
      "Public infrastructure",
      "Industrial campuses",
      "Transport interchange areas",
    ],
    howToSpecify: [
      "Provide shelter length, width, height, passenger layout and roof coverage.",
      "Attach elevations, seating schedules, foundation interfaces and the supply responsibility matrix.",
      "State materials and finishes for frame, roof and enclosure separately.",
      "Include consultant criteria, accessibility needs, BOQ, site address and installation boundaries.",
    ],
    specificFaq: {
      question: "Are foundations, signage and seating included?",
      answer:
        "Only where expressly listed and agreed. Identify each component and trade responsibility so the quotation distinguishes included items from work by others.",
    },
    relatedSlugs: [
      "stainless-steel-benches",
      "stainless-steel-dustbins",
      "stainless-steel-canopies",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-design-furniture",
    name: "Stainless Steel Design Furniture",
    category: "Steel Products",
    shortDescription:
      "Design-led furniture enquiries with dimensions, finish samples and material interfaces clearly defined.",
    metaDescription:
      "Discuss stainless steel furniture using drawings, dimensions, finish references and project quantities with Ramdev Enterprises in Chennai.",
    intro:
      "Design furniture may combine metal frames with timber, stone, glass or upholstery. Visible proportions are only part of the brief: joints, edges and responsibility for each material also need definition. An itemized furniture schedule allows each proposed piece to be reviewed against its intended use.",
    features: [
      "Furniture design coordination",
      "Finish sample review",
      "Item-specific dimensions",
      "Mixed-material interfaces",
      "Project-batch schedules",
      "Interior cleaning considerations",
    ],
    applications: [
      "Hotels",
      "Restaurants",
      "Retail",
      "Corporate interiors",
      "Residences",
      "Common areas",
    ],
    howToSpecify: [
      "Share furniture type, overall dimensions, intended use and quantity per item.",
      "Include drawings and identify metalwork versus timber, stone, glass or upholstery responsibilities.",
      "State grade, finish, visible-joint expectations and sample requirements.",
      "Provide use criteria, packing needs, delivery access and project location.",
    ],
    specificFaq: {
      question: "Can a reference image replace a furniture drawing?",
      answer:
        "A reference communicates appearance but is not a complete specification. Dimensions, construction, interfaces and authorized design details must still be agreed before supply is confirmed.",
    },
    relatedSlugs: [
      "pvd-stainless-steel-design-furniture",
      "stainless-steel-benches",
      "custom-stainless-steel-fabrication",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-safety-doors-frames",
    name: "Stainless Steel Safety Doors & Frames",
    category: "Steel Products",
    shortDescription:
      "Door and frame enquiries based on opening schedules, hardware interfaces and documented project requirements.",
    metaDescription:
      "Specify stainless steel doors and frames using opening schedules and hardware details. Discuss requirements with Ramdev Enterprises in Chennai.",
    intro:
      "A door package is defined by the opening, frame arrangement, leaf construction and hardware. The word safety does not establish a fire, security or certified rating. Where rated performance is required, identify the exact evidence and assembly requirements before considering a proposed supply.",
    features: [
      "Opening-size coordination",
      "Single and double leaf concepts",
      "Hardware preparation",
      "Surface cleaning considerations",
      "Frame and shutter schedules",
      "Finish and interface details",
    ],
    applications: [
      "Industrial buildings",
      "Hospitals",
      "Commercial facilities",
      "Utility rooms",
      "Institutions",
      "Architectural applications",
    ],
    extraSpecifications: [
      {
        label: "Fire / security rating",
        value:
          "No rating implied; certified assembly documentation required where specified",
      },
    ],
    howToSpecify: [
      "Provide the opening schedule, clear dimensions, leaf count and handing.",
      "Attach frame sections, wall details, hardware schedules and access-control interfaces.",
      "State grade, finish and performance documentation requirements for the full assembly.",
      "Include opening quantities, inspection needs, delivery location and installation scope.",
    ],
    specificFaq: {
      question: "Does the safety-door name imply a fire or security rating?",
      answer:
        "No. A rating needs certified documentation for the complete proposed door, frame and hardware assembly. No fire or security performance is asserted here.",
    },
    relatedSlugs: [
      "stainless-steel-corner-guards",
      "stainless-steel-cladding",
      "custom-stainless-steel-fabrication",
    ],
  }),
  proposedProduct({
    slug: "ss-drywall-stone-cladding-clamps",
    name: "SS Drywall Stone Cladding Clamps",
    category: "Steel Products",
    shortDescription:
      "Drawing-specific fixing and support component enquiries for stone and wall-cladding systems.",
    metaDescription:
      "Define stone cladding clamp geometry, thickness, substrate and drawing references. Engineering and load evidence must accompany the requirement.",
    intro:
      "Stone-cladding fixings depend on the panel, substrate and support arrangement, not the appearance of a bracket. Hole positions, bends and thickness should follow the approved fixing design. A component enquiry must carry the engineer's criteria rather than assume a load capacity from a generic clamp profile.",
    features: [
      "Drawing-specific geometry",
      "Design-led material requirements",
      "Hole and slot coordination",
      "Panel and substrate interfaces",
      "Dimensional acceptance requirements",
      "BOQ component schedules",
    ],
    applications: [
      "Stone facades",
      "Dry cladding",
      "Architectural wall systems",
      "Commercial buildings",
      "Hospitality",
      "Institutional projects",
    ],
    dimensionLabel: "Geometry / thickness",
    dimensionValue: "Drawing-specific",
    extraSpecifications: [
      {
        label: "Load rating",
        value: "Only from approved engineering / test data",
      },
    ],
    howToSpecify: [
      "Provide clamp geometry, thickness, hole positions and quantities by drawing reference.",
      "Include stone-panel details, substrate, anchor interfaces and the approved fixing drawing.",
      "State grade, tolerances and consultant material or finish requirements.",
      "Attach engineering load criteria, evidence requirements, BOQ revision and delivery location.",
    ],
    specificFaq: {
      question: "Can a clamp be selected using only stone thickness?",
      answer:
        "No. Panel geometry, supports, substrate, anchors and loads affect the fixing design. The responsible engineer must define the arrangement and required performance evidence.",
    },
    relatedSlugs: [
      "stainless-steel-facades",
      "stainless-steel-cladding",
      "custom-stainless-steel-fabrication",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-gratings",
    name: "Stainless Steel Gratings",
    category: "Industrial Products & Projects",
    featured: true,
    shortDescription:
      "Access and drainage grating enquiries specified by panel geometry, supports and engineering load inputs.",
    metaDescription:
      "Prepare a stainless steel grating enquiry with panel sizes, bearing bars, support spans and load inputs for review by Ramdev Enterprises Chennai.",
    intro:
      "Grating panels must be considered with their support layout and intended loading. Panel size, bearing-bar direction, openings and edges influence the schedule. An open-grid appearance or a plain or serrated surface does not establish a load rating or slip-performance claim.",
    features: [
      "Open-grid layout considerations",
      "Panel schedules",
      "Bearing-direction coordination",
      "Plain or serrated concepts to review",
      "Industrial access requirements",
      "Cutout and edge drawings",
    ],
    applications: [
      "Platforms",
      "Walkways",
      "Drainage channels",
      "Process plants",
      "Utility areas",
      "Industrial floors",
    ],
    dimensionLabel: "Panel size / mesh / bearing bar",
    dimensionValue: "Project-specific",
    extraSpecifications: [
      {
        label: "Support span / load",
        value: "Must be supplied as engineering input",
      },
    ],
    howToSpecify: [
      "List panel sizes, mesh arrangement, bearing-bar details and quantities.",
      "Supply support spans, bearing direction, cutouts and fixing or clip details.",
      "State grade, surface concept, edge treatment and exposure.",
      "Include engineer-defined loading criteria, documentation and delivery location.",
    ],
    specificFaq: {
      question: "Can load capacity be inferred from panel size?",
      answer:
        "No. Capacity depends on the complete panel and support design. Provide engineered loads and spans; any capacity must be substantiated for that configuration.",
    },
    relatedSlugs: [
      "cable-trays",
      "custom-stainless-steel-fabrication",
      "expansion-joints",
    ],
  }),
  proposedProduct({
    slug: "turnkey-project-fabrication",
    name: "Turnkey Project Fabrication",
    category: "Industrial Products & Projects",
    shortDescription:
      "Project-package enquiries for coordinated metalwork, with scope, interfaces and commercial responsibilities explicitly defined.",
    metaDescription:
      "Organize a fabrication package with BOQ, drawings, interfaces and scope boundaries. Discuss your project brief with Ramdev Enterprises Chennai.",
    intro:
      "A multi-component package benefits from one controlled schedule of drawings, quantities and interfaces. Separate design, fabrication, finishing, supply and site activities so responsibilities remain clear. This category supports a scope discussion; it does not claim in-house manufacturing or an automatic commitment to site execution.",
    features: [
      "Consolidated BOQ review",
      "Drawing revision coordination",
      "Multi-component schedules",
      "Material and finish alignment",
      "Inspection-stage requirements",
      "Commercial scope clarification",
    ],
    applications: [
      "Industrial projects",
      "Commercial developments",
      "Infrastructure",
      "Institutions",
      "Architectural metalwork",
      "Custom requirements",
    ],
    howToSpecify: [
      "Submit component lists, quantities and package boundaries.",
      "Include controlled drawings and responsibilities for design, supply, finishing and installation.",
      "Define grades, finishes, tolerances and approval hold points per item.",
      "Provide programme requirements, documentation, site constraints and delivery locations.",
    ],
    specificFaq: {
      question:
        "Does this page confirm in-house fabrication or site execution?",
      answer:
        "No. Facilities and execution capabilities are not asserted. Any sourcing, supply or coordination scope must be reviewed and confirmed in the quotation.",
    },
    relatedSlugs: [
      "custom-stainless-steel-fabrication",
      "railings-turnkey-solutions",
      "stainless-steel-canopies",
    ],
  }),
  proposedProduct({
    slug: "expansion-joints",
    name: "Expansion Joints",
    category: "Industrial Products & Projects",
    shortDescription:
      "Joint-system enquiries defined by movement requirements, opening geometry and surrounding assembly interfaces.",
    metaDescription:
      "Discuss expansion joint requirements using joint widths, movement inputs and interface drawings with Ramdev Enterprises in Chennai.",
    intro:
      "An expansion-joint requirement begins with the movement the surrounding assembly must accommodate. Joint width, movement direction, interfaces and service conditions must be established before a configuration is considered. Building joints and industrial assemblies are not interchangeable based on their name alone.",
    features: [
      "Requirement-specific configuration",
      "Movement design inputs",
      "Joint-width coordination",
      "Project material requirements",
      "Interface drawing review",
      "Technical documentation needs",
    ],
    applications: [
      "Buildings",
      "Infrastructure",
      "Industrial structures",
      "Floor and wall systems",
      "Architectural joints",
      "Engineered applications",
    ],
    dimensionLabel: "Joint width / movement",
    dimensionValue: "Engineering input required",
    howToSpecify: [
      "State joint location, nominal opening and required movement directions and ranges.",
      "Provide interface sections with adjacent finishes, supports and connections.",
      "List materials, service conditions and surface or sealing requirements.",
      "Attach consultant criteria, documentation, quantities and delivery location.",
    ],
    specificFaq: {
      question: "Can movement capacity be selected from joint width alone?",
      answer:
        "No. Movement directions, ranges and assembly conditions need engineering definition. No movement, pressure or temperature rating is implied without approved documentation.",
    },
    relatedSlugs: [
      "stainless-steel-gratings",
      "stainless-steel-facades",
      "custom-stainless-steel-fabrication",
    ],
  }),
  proposedProduct({
    slug: "custom-stainless-steel-fabrication",
    name: "Custom Stainless Steel Fabrication",
    category: "Industrial Products & Projects",
    featured: true,
    shortDescription:
      "Drawing-led enquiries for parts and assemblies with dimensions, interfaces and acceptance requirements made explicit.",
    metaDescription:
      "Share drawings, tolerances, material grades and quantities for custom stainless steel components with Ramdev Enterprises in Chennai.",
    intro:
      "Custom components are best described by a controlled drawing rather than a broad label. Geometry, joints, tolerances and mating surfaces must be reviewed alongside quantity and finish. Distinguish prototype approval from a project batch and identify inspection records before agreeing the scope.",
    features: [
      "Controlled drawing requirements",
      "Component dimensions",
      "Material selection inputs",
      "Finish and joint coordination",
      "Prototype and batch distinctions",
      "Tolerance-led quotation review",
    ],
    applications: [
      "Machine components",
      "Architectural metalwork",
      "Guards",
      "Frames",
      "Brackets",
      "Custom assemblies",
    ],
    howToSpecify: [
      "Send part drawings with dimensions, quantities and revision identifiers.",
      "Identify joints, mating parts, critical tolerances and supplied-component boundaries.",
      "State grade, surface finish and mandated process or inspection requirements.",
      "Clarify prototype approval, batch quantities, packaging and delivery location.",
    ],
    specificFaq: {
      question: "Is a prototype automatically included before a batch?",
      answer:
        "No. Prototypes, samples and approval stages must be requested and agreed separately. A quotation should distinguish those activities from subsequent batch supply.",
    },
    relatedSlugs: [
      "turnkey-project-fabrication",
      "ss-drywall-stone-cladding-clamps",
      "stainless-steel-design-furniture",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-corner-guards",
    name: "Stainless Steel Corner Guards",
    category: "Industrial Products & Projects",
    shortDescription:
      "Corner-profile requirements coordinated with wall dimensions, substrates, finishes and fixing methods.",
    metaDescription:
      "Specify stainless steel corner guards with height, leg widths, substrate and fixing details for an enquiry with Ramdev Enterprises Chennai.",
    intro:
      "Corner guards cover exposed wall or column edges and must suit the actual corner geometry. Leg widths, height, edge treatment and fixings should be coordinated with substrates and adjacent finishes. Cleaning routines and traffic conditions should be stated without assuming a particular impact resistance.",
    features: [
      "Wall and column profiles",
      "Visible edge coordination",
      "Height and leg-width requirements",
      "Cleaning considerations",
      "Adhesive or mechanical fixing concepts",
      "Traffic conditions to review",
    ],
    applications: [
      "Hospitals",
      "Hotels",
      "Commercial corridors",
      "Industrial buildings",
      "Warehouses",
      "Public facilities",
    ],
    howToSpecify: [
      "Provide guard height, leg widths, corner angle and quantity by location.",
      "Include substrate details, edge returns and the proposed fixing arrangement.",
      "State grade, thickness, finish and cleaning conditions.",
      "Identify traffic exposure, acceptance criteria, packing and delivery address.",
    ],
    specificFaq: {
      question: "Can the fixing method be chosen after supply?",
      answer:
        "Fixing affects hole preparation, substrate compatibility and edge details. Define the method at enquiry stage and review suitability before confirming the order.",
    },
    relatedSlugs: [
      "stainless-steel-safety-doors-frames",
      "stainless-steel-cladding",
      "custom-stainless-steel-fabrication",
    ],
  }),
  proposedProduct({
    slug: "cable-trays",
    name: "Cable Trays",
    category: "Industrial Products & Projects",
    shortDescription:
      "Cable-management enquiries organized by route, tray geometry, supports and an itemized accessory schedule.",
    metaDescription:
      "Prepare cable tray enquiries with route layouts, dimensions, support requirements and accessories for review with Ramdev Enterprises Chennai.",
    intro:
      "A cable-tray package should follow the cable route and support design. Straight lengths, bends, junctions, covers and connectors need a combined schedule. Perforated, ladder and channel concepts are options for review only when supported by an approved catalogue and project requirement.",
    features: [
      "Route-based quantities",
      "Maintenance-access considerations",
      "Tray types subject to approval",
      "Project dimensions",
      "Accessory and junction coordination",
      "Support-layout inputs",
    ],
    applications: [
      "Industrial plants",
      "Commercial buildings",
      "Utility areas",
      "Infrastructure",
      "Electrical rooms",
      "Process facilities",
    ],
    dimensionLabel: "Tray width / height / thickness",
    dimensionValue: "Project-specific",
    extraSpecifications: [
      {
        label: "Type / accessories",
        value:
          "Perforated, ladder, channel and fittings only if confirmed by the approved catalogue",
      },
    ],
    howToSpecify: [
      "List tray widths, heights, thicknesses, lengths and quantities against the route.",
      "Attach support spacing and schedules for bends, tees, covers and connectors.",
      "State grade, finish, exposure and project electrical requirements.",
      "Provide loading inputs, documentation and delivery location.",
    ],
    specificFaq: {
      question: "Are all tray styles and fittings automatically available?",
      answer:
        "No. Tray and accessory configurations require catalogue and availability confirmation. Include the requested style and interfaces rather than assuming compatibility.",
    },
    relatedSlugs: [
      "stainless-steel-gratings",
      "custom-stainless-steel-fabrication",
      "turnkey-project-fabrication",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-planters",
    name: "Stainless Steel Planters",
    category: "Interior & Architectural Products",
    shortDescription:
      "Architectural planter requirements shaped by form, planting space, liners, drainage and surrounding surfaces.",
    metaDescription:
      "Discuss stainless steel planters with dimensions, liner details, drainage and finish requirements with Ramdev Enterprises in Chennai.",
    intro:
      "Planter metalwork must be coordinated with planting and water management. Outer dimensions may differ from usable planting space once liners and drainage are considered. Identify freestanding versus built-in forms and responsibilities for waterproofing, irrigation and planting.",
    features: [
      "Project-specific shapes",
      "Architectural finish review",
      "Indoor and outdoor siting",
      "Liner and drainage coordination",
      "Built-in or freestanding concepts",
      "Landscape interfaces",
    ],
    applications: [
      "Hotels",
      "Lobbies",
      "Residential developments",
      "Restaurants",
      "Corporate spaces",
      "Landscape areas",
    ],
    howToSpecify: [
      "Provide shape, outer dimensions, planting depth and quantities.",
      "Include liner, drainage, irrigation and adjacent-surface details.",
      "Specify grade, finish and interior or exterior exposure.",
      "Clarify planting and waterproofing scope, handling and delivery location.",
    ],
    specificFaq: {
      question: "Does a metal planter include waterproofing or irrigation?",
      answer:
        "Not automatically. Liners, drainage and irrigation must be specified and responsibilities agreed. The outer metal shell alone does not establish a watertight planting system.",
    },
    relatedSlugs: [
      "stainless-steel-benches",
      "stainless-steel-pergolas",
      "stainless-steel-design-furniture",
    ],
  }),
  proposedProduct({
    slug: "residential-stainless-steel-railings",
    name: "Residential Stainless Steel Railings",
    category: "Interior & Architectural Products",
    shortDescription:
      "Residential railing enquiries coordinated with stair and balcony layouts, infill and project safety requirements.",
    metaDescription:
      "Plan residential stainless steel railings with stair layouts, infill and fixing details. Discuss requirements with Ramdev Enterprises Chennai.",
    intro:
      "Residential railings need to fit the stair or balcony while meeting the responsible designer's safety criteria. Handrail continuity, infill, clearances and fixing surfaces should be established before choosing a profile. Where glass is proposed, define glazing and hardware responsibilities separately from metalwork.",
    features: [
      "Residential profile review",
      "Stair and balcony layouts",
      "Glass interfaces where specified",
      "Finish coordination",
      "Drawing-based fixings",
      "Terrace and common-area requirements",
    ],
    applications: [
      "Villas",
      "Apartments",
      "Balconies",
      "Staircases",
      "Terraces",
      "Residential common areas",
    ],
    howToSpecify: [
      "Provide stair geometry, balcony lengths, railing heights and locations.",
      "Attach post layouts, infill and fixing-surface details; identify any glass scope.",
      "Specify grade, profile, finish and exposure.",
      "Include designer safety criteria, measurements, quantities and delivery location.",
    ],
    specificFaq: {
      question: "Is glass included with a residential railing?",
      answer:
        "Only if specified and agreed. Glass type, dimensions, hardware and safety criteria need designer review; no glazing specification is implied by the railing category.",
    },
    relatedSlugs: [
      "railings-turnkey-solutions",
      "stainless-steel-cladding",
      "stainless-steel-design-furniture",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-cladding",
    name: "Stainless Steel Cladding",
    category: "Interior & Architectural Products",
    secondaryCategories: ["Exterior & Architectural Products"],
    featured: true,
    shortDescription:
      "Cladding enquiries for columns, walls and architectural surfaces with panel layouts and fixing interfaces defined together.",
    metaDescription:
      "Review stainless steel cladding requirements with panel layouts, finishes and substrate details through Ramdev Enterprises in Chennai.",
    intro:
      "Cladding is a coordinated surface system rather than just a sheet finish. Panels, joints, returns and fixings influence both appearance and scope. Interior column wraps and exterior facade elements may share a material description but need different exposure and engineering inputs.",
    features: [
      "Interior and exterior contexts",
      "Finish and sample coordination",
      "Panelized layouts",
      "Edge and joint detailing",
      "Architectural surface schedules",
      "Fixing and substrate interfaces",
    ],
    applications: [
      "Columns",
      "Lift surrounds",
      "Entrances",
      "Feature walls",
      "Facade elements",
      "Commercial interiors",
    ],
    howToSpecify: [
      "Provide cladding area, panel layout, dimensions and quantity schedule.",
      "Attach sections showing joints, returns, substrates and fixing systems.",
      "State grade, finish, grain direction and sample requirements.",
      "Identify exposure, consultant criteria, adjacent trades and delivery location.",
    ],
    specificFaq: {
      question: "Are interior and exterior cladding separate products?",
      answer:
        "They share this enquiry page, but requirements may differ. Specify location and exposure so material, fixing and engineering requirements can be reviewed for that application.",
    },
    relatedSlugs: [
      "stainless-steel-facades",
      "ss-drywall-stone-cladding-clamps",
      "stainless-steel-corner-guards",
    ],
  }),
  proposedProduct({
    slug: "pvd-stainless-steel-design-furniture",
    name: "PVD Stainless Steel Design Furniture",
    category: "Interior & Architectural Products",
    pvd: true,
    shortDescription:
      "Decorative furniture-metalwork enquiries with PVD shade, texture and physical sample approval included in the brief.",
    metaDescription:
      "Specify PVD stainless steel furniture with drawings, shade references and sample approval for an enquiry with Ramdev Enterprises Chennai.",
    intro:
      "PVD-finished furniture combines geometry with a defined surface appearance. Shade names and screen images cannot replace an agreed physical sample. Identify the base material, texture, visible joints and interfaces with other furniture materials before reviewing the proposed finish and scope.",
    features: [
      "PVD-finish requirements",
      "Furniture geometry",
      "Physical shade approval",
      "Interior design coordination",
      "Dimensional briefs",
      "Visible-joint detailing",
    ],
    applications: [
      "Hotels",
      "Residences",
      "Retail",
      "Restaurants",
      "Receptions",
      "Commercial interiors",
    ],
    howToSpecify: [
      "Provide furniture drawings, dimensions and item quantities.",
      "Identify material interfaces and attach the finish schedule with sample references.",
      "Specify base grade, texture, shade and sample-matching criteria.",
      "Include cleaning expectations, packing protection and delivery location.",
    ],
    specificFaq: {
      question: "Can a PVD shade be approved from a phone photograph?",
      answer:
        "A photograph communicates intent but displays and lighting affect appearance. Use a physical sample and agree shade, texture and acceptance criteria before confirming the finish.",
    },
    relatedSlugs: [
      "stainless-steel-design-furniture",
      "ss-pvd-coated-screens-partitions",
      "metal-wall-art",
    ],
  }),
  proposedProduct({
    slug: "metal-wall-art",
    name: "Metal Wall Art",
    category: "Interior & Architectural Products",
    shortDescription:
      "Decorative wall-feature enquiries based on authorized artwork, scale, mounting and the interior setting.",
    metaDescription:
      "Discuss metal wall art using authorized artwork, dimensions, finish and mounting details with Ramdev Enterprises in Chennai.",
    intro:
      "A wall-art brief should establish the authorized design, its scale and how it meets the wall. Layers, projections and concealed fixings can affect appearance and installation scope. A concept image is a starting point; final geometry and material requirements must be documented before a proposal is confirmed.",
    features: [
      "Authorized artistic concepts",
      "Geometric and abstract briefs",
      "Scale and proportion review",
      "Finish references",
      "Mounting and backing interfaces",
      "Interior feature placement",
    ],
    applications: [
      "Living spaces",
      "Hotel lobbies",
      "Restaurants",
      "Offices",
      "Retail",
      "Reception areas",
    ],
    howToSpecify: [
      "Provide authorized artwork, dimensions, projection and number of pieces.",
      "Attach wall elevations, backing details and mounting arrangements.",
      "State material, thickness, finish and sample requirements.",
      "Identify lighting interfaces, installation responsibilities and delivery location.",
    ],
    specificFaq: {
      question: "Can artwork found online be reproduced?",
      answer:
        "Only use artwork you own or have permission to reproduce. Supply authorization and approved files; this enquiry category does not grant rights to third-party work.",
    },
    relatedSlugs: [
      "waterjet-cut-steel-designs",
      "custom-metal-arts-sculptures",
      "pvd-stainless-steel-design-furniture",
    ],
  }),
  proposedProduct({
    slug: "waterjet-cut-steel-designs",
    name: "Waterjet-Cut Steel Designs",
    category: "Interior & Architectural Products",
    shortDescription:
      "Patterned-panel enquiries with authorized artwork, cut geometry, thickness and finishing requirements defined for review.",
    metaDescription:
      "Prepare a waterjet-cut steel design brief with artwork, panel dimensions, thickness and finish for Ramdev Enterprises in Chennai.",
    intro:
      "A cut-panel enquiry begins with the approved pattern and panel envelope. Openings, connections between pattern elements and edge details need review alongside material and thickness. Referencing a cutting process does not assert in-house equipment or a guaranteed tolerance; those requirements need separate confirmation.",
    features: [
      "Pattern-geometry review",
      "Authorized artwork",
      "Decorative panel schedules",
      "Panel-specific dimensions",
      "Edge and finish coordination",
      "Repeated-pattern alignment",
    ],
    applications: [
      "Feature walls",
      "Partitions",
      "Screens",
      "Ceilings",
      "Decorative panels",
      "Architectural accents",
    ],
    howToSpecify: [
      "Share authorized pattern files, panel sizes, thickness and quantities.",
      "Include borders, mounting holes, pattern alignment and drawing revisions.",
      "Specify grade, finish, edge treatment and dimensional acceptance criteria.",
      "Confirm sample needs, installation interfaces and delivery location.",
    ],
    specificFaq: {
      question: "Does a pattern file establish achievable cutting tolerance?",
      answer:
        "No. Material, thickness, geometry and finishing need review. State required tolerances and acceptance criteria so feasibility can be confirmed rather than assumed.",
    },
    relatedSlugs: [
      "metal-wall-art",
      "ss-pvd-coated-screens-partitions",
      "custom-metal-arts-sculptures",
    ],
  }),
  proposedProduct({
    slug: "ss-pvd-coated-screens-partitions",
    name: "SS PVD Coated Screens & Partitions",
    category: "Interior & Architectural Products",
    pvd: true,
    featured: true,
    shortDescription:
      "Interior screen enquiries combining pattern, framing, fixing interfaces and sample-approved PVD finishes.",
    metaDescription:
      "Plan PVD stainless steel screens with patterns, frame dimensions and physical finish samples for review with Ramdev Enterprises Chennai.",
    intro:
      "Decorative screens organize an interior visually, but pattern, frame and fixings still need a coordinated brief. Full-height arrangements require clear floor and ceiling interfaces. PVD appearance needs physical samples; privacy, acoustic and fire performance cannot be inferred from a decorative pattern.",
    features: [
      "Custom pattern briefs",
      "PVD surface requirements",
      "Frame and border concepts",
      "Full-height interfaces",
      "Interior zoning layouts",
      "Physical sample approval",
    ],
    applications: [
      "Hotel lobbies",
      "Restaurants",
      "Residences",
      "Retail",
      "Office receptions",
      "Hospitality spaces",
    ],
    howToSpecify: [
      "Provide screen width, height, pattern and panel quantities.",
      "Attach frame sections and floor, ceiling or wall-fixing details.",
      "State base grade, texture, shade and physical sample approval process.",
      "Clarify functional criteria, site access, installation scope and delivery location.",
    ],
    specificFaq: {
      question:
        "Does a decorative partition provide acoustic or fire separation?",
      answer:
        "No such performance is claimed. Supply any functional separation criteria and require documented evidence for the complete proposed assembly.",
    },
    relatedSlugs: [
      "waterjet-cut-steel-designs",
      "pvd-stainless-steel-design-furniture",
      "stainless-steel-cladding",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-facades",
    name: "Stainless Steel Facades",
    category: "Exterior & Architectural Products",
    shortDescription:
      "Exterior metalwork enquiries developed from elevations, panel geometry and consultant-approved facade interfaces.",
    metaDescription:
      "Discuss stainless steel facade requirements with elevations, panel details and consultant engineering inputs with Ramdev Enterprises Chennai.",
    intro:
      "Facade components form part of a wider building-envelope system. Elevations, joints and substructure must be reviewed with structural and environmental criteria. A surface finish or material name does not establish weather, fire or structural performance for the complete facade.",
    features: [
      "Elevation coordination",
      "Panel geometry",
      "Exterior surface requirements",
      "Joint-layout review",
      "Finish and sample schedules",
      "Substructure interfaces",
    ],
    applications: [
      "Commercial buildings",
      "Corporate campuses",
      "Hotels",
      "Institutions",
      "Public buildings",
      "Feature elevations",
    ],
    extraSpecifications: [
      {
        label: "Facade performance / substructure",
        value: "Only per consultant-approved engineering",
      },
    ],
    howToSpecify: [
      "Provide elevations, facade areas, panel dimensions and quantities.",
      "Attach consultant-approved joints, substructure and interface drawings.",
      "State grade, finish, grain direction and exposure.",
      "Include envelope criteria, inspection documentation and delivery or site constraints.",
    ],
    specificFaq: {
      question: "Does the stainless steel finish establish facade performance?",
      answer:
        "No. Performance depends on the complete assembly, including fixings and substructure. Engineering and evidence must come from the approved project design.",
    },
    relatedSlugs: [
      "stainless-steel-cladding",
      "ss-drywall-stone-cladding-clamps",
      "stainless-steel-canopies",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-canopies",
    name: "Stainless Steel Canopies",
    category: "Exterior & Architectural Products",
    shortDescription:
      "Canopy enquiries for entrances and covered routes, coordinated with roofing, glazing, supports and building interfaces.",
    metaDescription:
      "Define stainless steel canopy geometry, roofing and support interfaces with engineer-approved inputs for Ramdev Enterprises Chennai.",
    intro:
      "A canopy brief combines support structure with roof coverage, drainage and the building or ground connection. Metalwork, glazing and roofing may have different suppliers. Define those boundaries and engineer-approved structural criteria before reviewing the package.",
    features: [
      "Footprint and geometry",
      "Roofing and glazing coordination",
      "Architectural finish inputs",
      "Interface drawing review",
      "Entrance and walkway requirements",
      "Support connections",
    ],
    applications: [
      "Building entrances",
      "Hotels",
      "Hospitals",
      "Commercial complexes",
      "Walkways",
      "Campuses",
    ],
    extraSpecifications: [
      {
        label: "Structural criteria",
        value: "Consultant / engineer-approved input required",
      },
    ],
    howToSpecify: [
      "Provide canopy projection, width, height and covered area.",
      "Attach support, building-interface, roof, glazing and drainage details.",
      "Specify grades and finishes separately for each package component.",
      "Include structural criteria, trade boundaries, delivery and installation requirements.",
    ],
    specificFaq: {
      question:
        "Are roofing, glazing and drainage included with canopy metalwork?",
      answer:
        "Only if explicitly scoped and agreed. Identify each interface and responsible trade, including water-management and structural design requirements, before accepting a quotation.",
    },
    relatedSlugs: [
      "stainless-steel-pergolas",
      "stainless-steel-facades",
      "stainless-steel-bus-shelters",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-pergolas",
    name: "Stainless Steel Pergolas",
    category: "Exterior & Architectural Products",
    shortDescription:
      "Landscape-structure enquiries based on module geometry, open or covered arrangements and site-specific supports.",
    metaDescription:
      "Prepare a stainless steel pergola brief with module dimensions, supports and landscape interfaces for Ramdev Enterprises in Chennai.",
    intro:
      "A pergola brief should distinguish an open architectural frame from a structure carrying roof or shading elements. Module sizes, post locations and landscape interfaces define the scope. Describe coverage and supported elements without assuming a pergola provides weather protection.",
    features: [
      "Module layouts",
      "Outdoor siting considerations",
      "Architectural finish review",
      "Landscape interfaces",
      "Mixed-material shade concepts",
      "Support and fixing requirements",
    ],
    applications: [
      "Hotels",
      "Terraces",
      "Gardens",
      "Commercial landscapes",
      "Clubhouses",
      "Outdoor seating",
    ],
    howToSpecify: [
      "Provide footprint, height, bay spacing and module count.",
      "Attach post, foundation and landscape drawings with shading or roofing interfaces.",
      "State grade, finish and any mixed-material elements.",
      "Supply engineering criteria, site exposure, scope boundaries and delivery location.",
    ],
    specificFaq: {
      question: "Does a pergola provide a weatherproof roof?",
      answer:
        "Not by definition. Open frames, shading and weatherproof roofing have different requirements. Specify the intended coverage and drainage arrangement for separate review.",
    },
    relatedSlugs: [
      "stainless-steel-canopies",
      "stainless-steel-planters",
      "stainless-steel-swings",
    ],
  }),
  proposedProduct({
    slug: "stainless-steel-swings",
    name: "Stainless Steel Swings",
    category: "Exterior & Architectural Products",
    shortDescription:
      "Swing-frame enquiries with geometry, suspension interfaces and documented safety requirements established upfront.",
    metaDescription:
      "Specify stainless steel swing frames with seating, suspension and engineering requirements for a discussion with Ramdev Enterprises Chennai.",
    intro:
      "A swing feature includes its frame, seat, suspension hardware and supporting site arrangement. Moving loads and clearances need consideration by the responsible designer. A decorative seating concept is not a certified playground product and must not be assigned a load rating without evidence.",
    features: [
      "Frame geometry",
      "Indoor and outdoor location review",
      "Surface detailing",
      "Seat interfaces",
      "Suspension hardware coordination",
      "Clearance and landscape integration",
    ],
    applications: [
      "Gardens",
      "Terraces",
      "Hospitality landscapes",
      "Clubhouses",
      "Resorts",
      "Common areas",
    ],
    extraSpecifications: [
      {
        label: "Load rating",
        value: "Only if supported by approved engineering / test data",
      },
    ],
    howToSpecify: [
      "Provide frame dimensions, seat arrangement, swing clearance and quantities.",
      "Attach designer-approved suspension, anchoring and seat-interface drawings.",
      "State grade, finish, use environment and hardware details.",
      "Include intended users, engineered loads, evidence requirements and delivery location.",
    ],
    specificFaq: {
      question:
        "Is a swing frame certified for playground use or a stated load?",
      answer:
        "No certification or load capacity is claimed. Supply intended use and safety criteria, and require approved evidence for the exact frame, hardware and installation.",
    },
    relatedSlugs: [
      "stainless-steel-pergolas",
      "stainless-steel-benches",
      "stainless-steel-design-furniture",
    ],
  }),
  proposedProduct({
    slug: "custom-metal-arts-sculptures",
    name: "Custom Metal Arts & Sculptures",
    category: "Arts & Sculptures",
    shortDescription:
      "Bespoke metal-feature enquiries based on authorized concepts, scale, material expression and installation setting.",
    metaDescription:
      "Discuss custom metal art and sculpture requirements using authorized concepts, dimensions and mounting details with Ramdev Enterprises Chennai.",
    intro:
      "A sculpture brief connects artistic intent with scale, material and setting. Models, views and mounting interfaces clarify the proposal without presenting a concept as completed work. Design authorization and structural-review responsibility should be established before discussing supply or coordination.",
    features: [
      "Original or authorized concepts",
      "Interior and exterior settings",
      "Finish and material expression",
      "Scale and proportion requirements",
      "Model and drawing review",
      "Landscape integration",
    ],
    applications: [
      "Corporate campuses",
      "Hotels",
      "Public spaces",
      "Residential developments",
      "Retail destinations",
      "Landscape features",
    ],
    extraSpecifications: [
      {
        label: "Artwork / model",
        value: "Must be original or client-authorized",
      },
    ],
    howToSpecify: [
      "Provide the authorized concept, dimensions, intended setting and quantity.",
      "Attach drawings or models with base, mounting and installation interfaces.",
      "Specify material, finish, texture and model or sample-approval stages.",
      "Clarify artwork rights, structural review, transport constraints and delivery location.",
    ],
    specificFaq: {
      question: "Are concept illustrations evidence of completed sculptures?",
      answer:
        "No. Concepts communicate proposed designs only. Completed-project claims need approved records and authentic images; artwork must also be original or authorized by its rights holder.",
    },
    relatedSlugs: [
      "metal-wall-art",
      "waterjet-cut-steel-designs",
      "custom-stainless-steel-fabrication",
    ],
  }),
];

const preEngineeredSteelPlant: Product = {
  slug: "pre-engineered-steel-plants",
  name: "Pre-Engineered Steel Plants",
  category: "Pre-Engineered Buildings",
  approved: true,
  featured: true,
  shortDescription:
    "Project-specific pre-engineered steel plants for industrial production, warehousing and operational facilities.",
  seoTitle: "Pre-Engineered Steel Plants | Ramdev Enterprises Chennai",
  metaDescription:
    "Plan a pre-engineered steel plant with Ramdev Enterprises Chennai. Share the site layout, building dimensions, operating needs and project scope for review.",
  intro:
    "Pre-engineered steel plants bring the primary frame, secondary steel, roofing, wall systems and project interfaces into one coordinated building requirement. Ramdev Enterprises develops the project around the proposed use, site dimensions, clear span, height, loading inputs, openings and agreed supply or erection scope. Final structural design, materials and execution requirements are established against approved drawings and project-specific engineering inputs.",
  features: [
    "Project-specific building configuration",
    "Primary and secondary steel framing",
    "Roofing and wall-cladding coordination",
    "Openings, ventilation and access integration",
    "Mezzanine and crane-interface planning where required",
    "Defined supply and erection responsibilities",
  ],
  applications: [
    "Manufacturing plants",
    "Industrial workshops",
    "Warehouses and logistics facilities",
    "Production and assembly buildings",
    "Equipment and maintenance sheds",
    "Utility and process-support buildings",
  ],
  specifications: [
    {
      label: "Building use",
      value:
        "Manufacturing, warehousing, workshop or project-specific operation",
    },
    {
      label: "Site and geometry",
      value: "Location, length, width, eave height, clear span and bay spacing",
    },
    {
      label: "Design inputs",
      value:
        "Applicable codes, loading data and geotechnical / civil inputs to be confirmed",
    },
    {
      label: "Envelope",
      value:
        "Roofing, wall cladding, insulation, daylighting and ventilation requirements",
    },
    {
      label: "Operational interfaces",
      value:
        "Doors, cranes, mezzanines, equipment, utilities and future expansion",
    },
    {
      label: "Project scope",
      value:
        "Design, detailing, fabrication, supply and erection responsibilities to be agreed",
    },
  ],
  howToSpecify: [
    "Share the site location, intended operation and available plot or building layout.",
    "Provide required length, width, clear height, spans, bays and major openings.",
    "Identify equipment loads, crane requirements, mezzanines, ventilation and service interfaces.",
    "Confirm applicable design criteria, target schedule and the required design, supply and erection scope.",
  ],
  faqs: [
    {
      question:
        "What information is needed to discuss a pre-engineered steel plant?",
      answer:
        "Start with the site location, building use, dimensions, clear height, span, major openings and target schedule. Share equipment, crane, mezzanine and utility requirements where applicable.",
    },
    {
      question: "Can the building be planned around production equipment?",
      answer:
        "Yes. Equipment positions, maintenance clearances, service routes and operating access should be identified early so their interfaces can be reviewed with the building layout.",
    },
    {
      question: "Are roofing, cladding and ventilation part of the scope?",
      answer:
        "They can be included when defined in the enquiry. Specify the required roof and wall systems, insulation, daylighting, ventilation, drainage and openings so responsibilities are clear.",
    },
    {
      question: "Does the enquiry include erection and civil work?",
      answer:
        "Design, fabrication, supply, erection, foundations and other civil responsibilities must be stated and agreed in the quotation. Images are references and do not establish the final scope.",
    },
  ],
  relatedSlugs: [
    "stainless-steel-canopies",
    "stainless-steel-facades",
    "railings-turnkey-solutions",
  ],
};

export const suppliedProducts: Product[] = suppliedPhotos.map((collection) => {
  const original =
    collection.slug === preEngineeredSteelPlant.slug
      ? preEngineeredSteelPlant
      : legacyProducts.find((product) => product.slug === collection.slug);
  if (!original) throw new Error(`Missing product brief: ${collection.slug}`);
  const preferredPlantImage = collection.images.find((image) =>
    image.src.endsWith("/SKC-Steel-Buildings-014.jpg"),
  );
  return {
    ...original,
    category:
      collection.slug === preEngineeredSteelPlant.slug
        ? preEngineeredSteelPlant.category
        : collection.slug === "stainless-steel-planters"
          ? "Decorative & Accessories"
          : "Stainless Steel",
    secondaryCategories: undefined,
    sourceFolder: collection.folder,
    image: preferredPlantImage?.src || collection.images[0].src,
    banner: preferredPlantImage?.src,
    gallery: collection.images.map((image) => image.src),
    galleryImages: collection.images.map(({ src, width, height }) => ({
      src,
      width,
      height,
    })),
    relatedSlugs: [...original.relatedSlugs],
  };
});
export const products: Product[] = [
  ...suppliedProducts.filter(
    (product) => product.slug === preEngineeredSteelPlant.slug,
  ),
  ...referenceProducts,
  ...suppliedProducts.filter(
    (product) => product.slug !== preEngineeredSteelPlant.slug,
  ),
];
for (const product of suppliedProducts) {
  product.relatedSlugs = [
    ...new Set([
      ...product.relatedSlugs.filter((slug) =>
        products.some((other) => other.slug === slug),
      ),
      ...products
        .filter((other) => other.category === product.category)
        .map((other) => other.slug),
    ]),
  ]
    .filter((slug) => slug !== product.slug)
    .slice(0, 3);
}
export { catalogueCategories, catalogueCategories as productCategories };
const catalogueCategories = [
  "Pre-Engineered Buildings",
  ...referenceCategories,
];
