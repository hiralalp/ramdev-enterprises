# Ramdev Enterprises — All Product Pages Build Specification for VS Code GPT-6

> Use this file after the main website scaffold is ready. It defines a **proposed catalogue**, page architecture, content direction, SEO rules, approval controls and implementation commands for every product detail page.

## 0. Critical publishing rule

The product list was extracted from the Real Ferro reference website used earlier for information-architecture benchmarking. The reference navigation contains 9 Steel Products, 5 Industrial Projects, 7 Interior Projects and 7 Exterior Projects; Cable Tray also exists as a separate related industrial product page. Arts & Sculptures exists as a top-level category without an itemized submenu. The source navigation supports these extracted groups. citeturn294804view0 citeturn294804search8

**Do not assume these are confirmed Ramdev Enterprises offerings.** Build them as proposed products with `approved: false` until the business owner confirms each item. Public production listings must show only approved products.

---

## 1. One-shot command for GPT-6

```text
Read this entire Markdown file before making code changes.

Implement the complete Ramdev Enterprises product catalogue system in the current Next.js workspace.

Requirements:
- premium /products landing page,
- data-driven category filters,
- one reusable /products/[slug] detail template,
- one typed content object for every proposed product in this specification,
- approved/draft publishing control,
- unique product overview, features, applications, specification guidance and FAQs,
- breadcrumbs,
- product gallery with graceful branded image fallbacks,
- RFQ CTA,
- related products,
- unique route metadata,
- BreadcrumbList JSON-LD,
- generateStaticParams where appropriate,
- 404 for invalid slugs,
- responsive mobile/tablet/desktop layout,
- accessibility and keyboard support.

Do not copy Real Ferro text.
Do not fabricate Ramdev Enterprises clients, projects, certifications, manufacturing capacity, ratings, stock, prices, grades, test values, load ratings or standards.
Do not call Ramdev a manufacturer unless separately confirmed.

Use the existing Ramdev red/blue/navy premium design system and existing components.
Missing product images must use ImagePlaceholder rather than broken images.

When complete run:
npm run lint
npm run build

Fix every error before stopping.
```

---

## 2. Data model

```ts
export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  secondaryCategories?: string[];
  approved: boolean;
  featured?: boolean;
  shortDescription: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  features: string[];
  applications: string[];
  specifications: ProductSpecification[];
  faqs: ProductFaq[];
  image?: string;
  gallery?: string[];
  relatedSlugs: string[];
};
```

Draft visibility:

```ts
const showDraftProducts =
  process.env.NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS === "true";

export const visibleProducts = products.filter(
  (product) => product.approved || showDraftProducts
);
```

`.env.example`:

```env
NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS=false
```

---

## 3. Canonical catalogue


### Steel Products

- **Railings Turnkey Solutions** — `/products/railings-turnkey-solutions`
- **Stainless Steel Benches** — `/products/stainless-steel-benches`
- **Stainless Steel Dustbins** — `/products/stainless-steel-dustbins`
- **Stainless Steel Bicycle Stands** — `/products/stainless-steel-bicycle-stands`
- **Stainless Steel Bollards** — `/products/stainless-steel-bollards`
- **Stainless Steel Bus Shelters** — `/products/stainless-steel-bus-shelters`
- **Stainless Steel Design Furniture** — `/products/stainless-steel-design-furniture`
- **Stainless Steel Safety Doors & Frames** — `/products/stainless-steel-safety-doors-frames`
- **SS Drywall Stone Cladding Clamps** — `/products/ss-drywall-stone-cladding-clamps`

### Industrial Products & Projects

- **Stainless Steel Gratings** — `/products/stainless-steel-gratings`
- **Turnkey Project Fabrication** — `/products/turnkey-project-fabrication`
- **Expansion Joints** — `/products/expansion-joints`
- **Custom Stainless Steel Fabrication** — `/products/custom-stainless-steel-fabrication`
- **Stainless Steel Corner Guards** — `/products/stainless-steel-corner-guards`
- **Cable Trays** — `/products/cable-trays`

### Interior & Architectural Products

- **Stainless Steel Planters** — `/products/stainless-steel-planters`
- **Residential Stainless Steel Railings** — `/products/residential-stainless-steel-railings`
- **Stainless Steel Cladding** — `/products/stainless-steel-cladding`
- **PVD Stainless Steel Design Furniture** — `/products/pvd-stainless-steel-design-furniture`
- **Metal Wall Art** — `/products/metal-wall-art`
- **Waterjet-Cut Steel Designs** — `/products/waterjet-cut-steel-designs`
- **SS PVD Coated Screens & Partitions** — `/products/ss-pvd-coated-screens-partitions`

### Exterior & Architectural Products

- **Stainless Steel Facades** — `/products/stainless-steel-facades`
- **Stainless Steel Canopies** — `/products/stainless-steel-canopies`
- **Stainless Steel Pergolas** — `/products/stainless-steel-pergolas`
- **Stainless Steel Swings** — `/products/stainless-steel-swings`

### Arts & Sculptures

- **Custom Metal Arts & Sculptures** — `/products/custom-metal-arts-sculptures`


**Total proposed canonical detail pages: 27.**


### Cross-category canonical rules

- `Stainless Steel Cladding` should be reused under both interior and exterior navigation but have one canonical URL.
- `Stainless Steel Benches` may be surfaced in Steel Products and exterior/public-space contexts but must retain one canonical URL.
- Keep `Railings Turnkey Solutions` and `Residential Stainless Steel Railings` separate because the user intent differs.
- `Custom Metal Arts & Sculptures` is one strong category/detail page until Ramdev provides actual sculpture sub-products.

---

## 4. Standard product page layout

```text
01 Header
02 Breadcrumbs
03 Product Hero
   Category eyebrow
   H1
   1–2 sentence value proposition
   Request a Quote
   Explore Specifications
   Product image / branded fallback

04 Procurement trust strip
   Requirement-led supply
   Drawing/BOQ coordination
   Responsive commercial support

05 Product Overview
06 Key Features
07 Applications
08 Specification / RFQ Information Table
09 Product Gallery
10 How to Specify This Product
11 Dark Navy RFQ CTA
12 Product-Specific FAQs
13 Related Products
14 Contact Band
15 Footer
```

Do not add fake ratings, fake testimonials, fake prices, delivery promises or stock indicators.

---

## 5. SEO rules

For each page:

```text
SEO title:
{Product Name} | Ramdev Enterprises Chennai

Canonical:
/products/{slug}

H1:
{Product Name}
```

Create a unique meta description of roughly 145–160 characters when possible.

Always add `BreadcrumbList` structured data.

Only add `Product` schema when the factual fields required by the chosen schema are genuinely available. Never invent SKU, price, availability, reviews or ratings.

---

## 6. Image system

Expected structure:

```text
/public/images/products/{slug}/
  hero.webp
  gallery-01.webp
  gallery-02.webp
  gallery-03.webp
  application-01.webp
```

Recommended:
- 1 premium hero image
- 2–3 product/detail images
- 1–2 application images
- technical diagram where useful

If files do not exist, render the premium branded `ImagePlaceholder`.

Never use an AI image as proof of a completed Ramdev Enterprises project.

---

## 7. Full product content specifications


### 1. Railings Turnkey Solutions

**Category:** Steel Products  
**Slug:** `/products/railings-turnkey-solutions`  
**Default publishing state:** `approved: false`

**SEO title:** `Railings Turnkey Solutions | Ramdev Enterprises Chennai`

**Hero copy:**  
End-to-end stainless-steel railing solutions for architectural, commercial, institutional and infrastructure requirements.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for railings turnkey solutions only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Project-specific configuration
- Indoor/outdoor use
- Multiple architectural profiles
- Drawing/BOQ coordination
- Finish options
- Accessory coordination

#### Typical applications
- Staircases
- Balconies
- Walkways
- Commercial buildings
- Hospitals
- Transport infrastructure

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Railings Turnkey Solutions?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 2. Stainless Steel Benches

**Category:** Steel Products  
**Slug:** `/products/stainless-steel-benches`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Benches | Ramdev Enterprises Chennai`

**Hero copy:**  
Durable stainless-steel seating solutions for public, commercial and institutional environments.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel benches only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- High-traffic suitability
- Easy-clean surfaces
- Fixed/free-standing concepts
- Custom sizing
- Indoor/outdoor options
- Project quantities

#### Typical applications
- Waiting areas
- Hospitals
- Transit facilities
- Parks
- Commercial complexes
- Campuses

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Benches?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 3. Stainless Steel Dustbins

**Category:** Steel Products  
**Slug:** `/products/stainless-steel-dustbins`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Dustbins | Ramdev Enterprises Chennai`

**Hero copy:**  
Clean, durable waste-management units for commercial, institutional and public-space applications.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel dustbins only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Single/multi-stream concepts
- Easy-clean surfaces
- Custom capacity
- Indoor/outdoor options
- Project labeling
- Robust construction

#### Typical applications
- Offices
- Hospitals
- Malls
- Public facilities
- Hotels
- Campuses

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Dustbins?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 4. Stainless Steel Bicycle Stands

**Category:** Steel Products  
**Slug:** `/products/stainless-steel-bicycle-stands`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Bicycle Stands | Ramdev Enterprises Chennai`

**Hero copy:**  
Organized bicycle-parking solutions for campuses, commercial spaces, residential projects and public facilities.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel bicycle stands only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Space-efficient layouts
- Custom bay count
- Fixed mounting
- Indoor/outdoor use
- Simple maintenance
- Site-layout coordination

#### Typical applications
- Corporate campuses
- Residential developments
- Transit areas
- Schools
- Commercial projects
- Public spaces

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Bicycle Stands?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 5. Stainless Steel Bollards

**Category:** Steel Products  
**Slug:** `/products/stainless-steel-bollards`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Bollards | Ramdev Enterprises Chennai`

**Hero copy:**  
Architectural and protective stainless-steel bollards for entrances, pedestrian zones and controlled-access areas.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel bollards only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Architectural appearance
- Fixed/removable concepts
- Outdoor suitability
- Custom dimensions
- Finish options
- Site integration

#### Typical applications
- Commercial entrances
- Pedestrian zones
- Parking areas
- Public buildings
- Hospitality
- Urban landscapes

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Diameter / height:** Project-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order
- **Performance / impact rating:** Only if supported by approved documentation

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Bollards?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 6. Stainless Steel Bus Shelters

**Category:** Steel Products  
**Slug:** `/products/stainless-steel-bus-shelters`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Bus Shelters | Ramdev Enterprises Chennai`

**Hero copy:**  
Project-oriented stainless-steel shelter structures for transport and public-infrastructure environments.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel bus shelters only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Project-specific structure
- Roof/enclosure coordination
- Integrated seating
- Drawing-led supply
- Public-infrastructure orientation
- Custom finish

#### Typical applications
- Urban bus stops
- Transit corridors
- Campuses
- Public infrastructure
- Industrial campuses
- Smart-city projects

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Bus Shelters?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 7. Stainless Steel Design Furniture

**Category:** Steel Products  
**Slug:** `/products/stainless-steel-design-furniture`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Design Furniture | Ramdev Enterprises Chennai`

**Hero copy:**  
Custom metal furniture and design elements for premium interior, hospitality, retail and architectural applications.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel design furniture only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Custom design coordination
- Premium finishes
- Custom dimensions
- Mixed-material integration
- Project-batch supply
- Interior applications

#### Typical applications
- Hotels
- Restaurants
- Retail
- Corporate interiors
- Residences
- Premium common areas

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Design Furniture?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 8. Stainless Steel Safety Doors & Frames

**Category:** Steel Products  
**Slug:** `/products/stainless-steel-safety-doors-frames`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Safety Doors & Frames | Ramdev Enterprises Chennai`

**Hero copy:**  
Stainless-steel door and frame solutions for utility, institutional, industrial and architectural requirements.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel safety doors & frames only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Custom opening sizes
- Single/double leaf concepts
- Hardware preparation
- Durable surfaces
- Frame/shutter coordination
- Project finish

#### Typical applications
- Industrial buildings
- Hospitals
- Commercial facilities
- Utility rooms
- Institutions
- Architectural applications

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order
- **Fire/security rating:** Never claim unless certified documentation is provided

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Safety Doors & Frames?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 9. SS Drywall Stone Cladding Clamps

**Category:** Steel Products  
**Slug:** `/products/ss-drywall-stone-cladding-clamps`  
**Default publishing state:** `approved: false`

**SEO title:** `SS Drywall Stone Cladding Clamps | Ramdev Enterprises Chennai`

**Hero copy:**  
Stainless-steel fixing and support components for stone and wall-cladding installation systems.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for ss drywall stone cladding clamps only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Custom geometry
- Project-grade material selection
- Drawing-based supply
- Compact fixing design
- Dimensional consistency
- BOQ quantities

#### Typical applications
- Stone facades
- Dry cladding
- Architectural wall systems
- Commercial buildings
- Hospitality
- Institutional projects

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Geometry / thickness:** Drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order
- **Load rating:** Only from approved engineering/test data

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote SS Drywall Stone Cladding Clamps?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 10. Stainless Steel Gratings

**Category:** Industrial Products & Projects  
**Slug:** `/products/stainless-steel-gratings`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Gratings | Ramdev Enterprises Chennai`

**Hero copy:**  
Industrial grating solutions for access floors, platforms, drainage and process-area applications.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel gratings only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Open-grid drainage
- Custom panels
- Project-specific supports
- Plain/serrated concepts
- Industrial access
- Drawing-based supply

#### Typical applications
- Platforms
- Walkways
- Drainage channels
- Process plants
- Utility areas
- Industrial floors

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Panel size / mesh / bearing bar:** Project-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order
- **Support span / load:** Must be supplied as engineering input

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Gratings?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 11. Turnkey Project Fabrication

**Category:** Industrial Products & Projects  
**Slug:** `/products/turnkey-project-fabrication`  
**Default publishing state:** `approved: false`

**SEO title:** `Turnkey Project Fabrication | Ramdev Enterprises Chennai`

**Hero copy:**  
Coordinated fabrication and project supply support for custom industrial and architectural requirements.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for turnkey project fabrication only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- BOQ review
- Drawing coordination
- Multi-component supply
- Material/finish coordination
- Inspection workflow
- Single-point commercial coordination

#### Typical applications
- Industrial projects
- Commercial developments
- Infrastructure
- Institutions
- Architectural metalwork
- Custom requirements

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Turnkey Project Fabrication?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 12. Expansion Joints

**Category:** Industrial Products & Projects  
**Slug:** `/products/expansion-joints`  
**Default publishing state:** `approved: false`

**SEO title:** `Expansion Joints | Ramdev Enterprises Chennai`

**Hero copy:**  
Project-specific expansion-joint assemblies and metal components for movement accommodation in industrial and building applications.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for expansion joints only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Requirement-specific configuration
- Movement-led design input
- Custom dimensions
- Project materials
- Drawing-based supply
- Technical documentation

#### Typical applications
- Buildings
- Infrastructure
- Industrial structures
- Floor/wall systems
- Architectural joints
- Engineered applications

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Joint width / movement:** Engineering input required
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Expansion Joints?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 13. Custom Stainless Steel Fabrication

**Category:** Industrial Products & Projects  
**Slug:** `/products/custom-stainless-steel-fabrication`  
**Default publishing state:** `approved: false`

**SEO title:** `Custom Stainless Steel Fabrication | Ramdev Enterprises Chennai`

**Hero copy:**  
Made-to-requirement stainless-steel components and assemblies for industrial, architectural and commercial applications.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for custom stainless steel fabrication only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Drawing-led requirements
- Custom dimensions
- Material options
- Finish coordination
- Prototype/project batches
- Tolerance-led quoting

#### Typical applications
- Machine components
- Architectural metalwork
- Guards
- Frames
- Brackets
- Custom assemblies

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Custom Stainless Steel Fabrication?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 14. Stainless Steel Corner Guards

**Category:** Industrial Products & Projects  
**Slug:** `/products/stainless-steel-corner-guards`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Corner Guards | Ramdev Enterprises Chennai`

**Hero copy:**  
Protective stainless-steel corner profiles for walls, columns and high-traffic building areas.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel corner guards only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Corner protection
- Clean appearance
- Custom height/width
- Easy-clean surface
- Multiple fixing concepts
- High-traffic suitability

#### Typical applications
- Hospitals
- Hotels
- Commercial corridors
- Industrial buildings
- Warehouses
- Public facilities

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Corner Guards?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 15. Cable Trays

**Category:** Industrial Products & Projects  
**Slug:** `/products/cable-trays`  
**Default publishing state:** `approved: false`

**SEO title:** `Cable Trays | Ramdev Enterprises Chennai`

**Hero copy:**  
Metal cable-management systems for organized routing and support of electrical and instrumentation cabling.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for cable trays only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Organized routing
- Maintenance access
- Perforated/ladder/channel concepts subject to approval
- Project dimensions
- Accessories
- Industrial applications

#### Typical applications
- Industrial plants
- Commercial buildings
- Utility areas
- Infrastructure
- Electrical rooms
- Process facilities

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Tray width / height / thickness:** Project-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order
- **Type/accessories:** Perforated, ladder, channel and fittings only if approved catalogue confirms them

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Cable Trays?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 16. Stainless Steel Planters

**Category:** Interior & Architectural Products  
**Slug:** `/products/stainless-steel-planters`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Planters | Ramdev Enterprises Chennai`

**Hero copy:**  
Architectural stainless-steel planters for premium interiors, landscapes, hospitality and commercial spaces.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel planters only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Custom shapes
- Architectural finish
- Indoor/outdoor concepts
- Liner/drainage coordination
- Built-in/free-standing forms
- Design-led supply

#### Typical applications
- Hotels
- Lobbies
- Residential developments
- Restaurants
- Corporate spaces
- Landscape areas

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Planters?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 17. Residential Stainless Steel Railings

**Category:** Interior & Architectural Products  
**Slug:** `/products/residential-stainless-steel-railings`  
**Default publishing state:** `approved: false`

**SEO title:** `Residential Stainless Steel Railings | Ramdev Enterprises Chennai`

**Hero copy:**  
Refined stainless-steel railing systems for staircases, balconies, terraces and residential common areas.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for residential stainless steel railings only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Contemporary appearance
- Custom layouts
- Glass integration where specified
- Finish options
- Drawing-based detailing
- Residential focus

#### Typical applications
- Villas
- Apartments
- Balconies
- Staircases
- Terraces
- Residential common areas

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Residential Stainless Steel Railings?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 18. Stainless Steel Cladding

**Category:** Interior & Architectural Products  
**Slug:** `/products/stainless-steel-cladding`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Cladding | Ramdev Enterprises Chennai`

**Hero copy:**  
Premium stainless-steel cladding for columns, walls, facades, entrances and architectural feature surfaces.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel cladding only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Interior/exterior use
- Multiple finishes
- Panelized approach
- Custom detailing
- Architectural surfaces
- Project fixing coordination

#### Typical applications
- Columns
- Lift surrounds
- Entrances
- Feature walls
- Facade elements
- Commercial interiors

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Cladding?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 19. PVD Stainless Steel Design Furniture

**Category:** Interior & Architectural Products  
**Slug:** `/products/pvd-stainless-steel-design-furniture`  
**Default publishing state:** `approved: false`

**SEO title:** `PVD Stainless Steel Design Furniture | Ramdev Enterprises Chennai`

**Hero copy:**  
Decorative PVD-finished stainless-steel furniture and metal elements for premium interior projects.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for pvd stainless steel design furniture only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- PVD-finished elements
- Custom furniture
- Sample-approved colors
- Luxury interior use
- Custom dimensions
- Premium appearance

#### Typical applications
- Hotels
- Luxury residences
- Retail
- Restaurants
- Receptions
- Commercial interiors

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **PVD shade / texture:** Subject to physical sample approval
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote PVD Stainless Steel Design Furniture?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 20. Metal Wall Art

**Category:** Interior & Architectural Products  
**Slug:** `/products/metal-wall-art`  
**Default publishing state:** `approved: false`

**SEO title:** `Metal Wall Art | Ramdev Enterprises Chennai`

**Hero copy:**  
Custom decorative metal wall features for residential, hospitality, retail and commercial interiors.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for metal wall art only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Custom artistic concepts
- Geometric/abstract styles
- Custom size
- Premium finishes
- Mounting coordination
- Statement interiors

#### Typical applications
- Living spaces
- Hotel lobbies
- Restaurants
- Offices
- Retail
- Reception areas

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Metal Wall Art?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 21. Waterjet-Cut Steel Designs

**Category:** Interior & Architectural Products  
**Slug:** `/products/waterjet-cut-steel-designs`  
**Default publishing state:** `approved: false`

**SEO title:** `Waterjet-Cut Steel Designs | Ramdev Enterprises Chennai`

**Hero copy:**  
Precision-cut decorative metal patterns and panels for screens, wall features, partitions and architectural detailing.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for waterjet-cut steel designs only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Intricate patterns
- Custom artwork
- Decorative panels
- Multiple sizes
- Finish coordination
- Repeatable project patterns

#### Typical applications
- Feature walls
- Partitions
- Screens
- Ceilings
- Decorative panels
- Architectural accents

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Waterjet-Cut Steel Designs?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 22. SS PVD Coated Screens & Partitions

**Category:** Interior & Architectural Products  
**Slug:** `/products/ss-pvd-coated-screens-partitions`  
**Default publishing state:** `approved: false`

**SEO title:** `SS PVD Coated Screens & Partitions | Ramdev Enterprises Chennai`

**Hero copy:**  
Decorative stainless-steel screens and partitions with premium PVD-finished surfaces for interior zoning and feature design.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for ss pvd coated screens & partitions only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Custom patterns
- Premium PVD finish
- Framed concepts
- Full-height options
- Interior zoning
- Sample-based finish approval

#### Typical applications
- Hotel lobbies
- Restaurants
- Luxury residences
- Retail
- Office receptions
- Hospitality spaces

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **PVD shade / texture:** Subject to physical sample approval
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote SS PVD Coated Screens & Partitions?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 23. Stainless Steel Facades

**Category:** Exterior & Architectural Products  
**Slug:** `/products/stainless-steel-facades`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Facades | Ramdev Enterprises Chennai`

**Hero copy:**  
Architectural stainless-steel facade components and feature systems for contemporary building exteriors.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel facades only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Architectural expression
- Custom geometry
- Exterior metal surfaces
- Drawing integration
- Finish options
- Project-oriented supply

#### Typical applications
- Commercial buildings
- Corporate campuses
- Hotels
- Institutions
- Public buildings
- Feature elevations

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order
- **Facade performance / substructure:** Only per consultant-approved engineering

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Facades?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 24. Stainless Steel Canopies

**Category:** Exterior & Architectural Products  
**Slug:** `/products/stainless-steel-canopies`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Canopies | Ramdev Enterprises Chennai`

**Hero copy:**  
Architectural canopy structures and stainless-steel components for entrances, walkways and covered transition areas.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel canopies only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Custom geometry
- Roofing/glazing coordination
- Architectural finish
- Drawing-led coordination
- Entrance applications
- Project supports

#### Typical applications
- Building entrances
- Hotels
- Hospitals
- Commercial complexes
- Walkways
- Campuses

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order
- **Structural criteria:** Consultant / engineer-approved input required

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Canopies?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 25. Stainless Steel Pergolas

**Category:** Exterior & Architectural Products  
**Slug:** `/products/stainless-steel-pergolas`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Pergolas | Ramdev Enterprises Chennai`

**Hero copy:**  
Contemporary stainless-steel pergola structures for landscape, hospitality, residential and commercial environments.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel pergolas only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Custom modules
- Outdoor design
- Architectural finish
- Landscape integration
- Mixed-material concepts
- Project-specific fixing

#### Typical applications
- Hotels
- Terraces
- Gardens
- Commercial landscapes
- Clubhouses
- Outdoor seating

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Pergolas?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 26. Stainless Steel Swings

**Category:** Exterior & Architectural Products  
**Slug:** `/products/stainless-steel-swings`  
**Default publishing state:** `approved: false`

**SEO title:** `Stainless Steel Swings | Ramdev Enterprises Chennai`

**Hero copy:**  
Custom stainless-steel swing frames and architectural outdoor seating features for residential and hospitality spaces.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for stainless steel swings only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Custom frame geometry
- Indoor/outdoor concepts
- Premium finish
- Seat integration
- Hardware coordination
- Landscape use

#### Typical applications
- Gardens
- Terraces
- Hospitality landscapes
- Clubhouses
- Resorts
- Common areas

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order
- **Load rating:** Only if supported by approved engineering/test data

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Stainless Steel Swings?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


### 27. Custom Metal Arts & Sculptures

**Category:** Arts & Sculptures  
**Slug:** `/products/custom-metal-arts-sculptures`  
**Default publishing state:** `approved: false`

**SEO title:** `Custom Metal Arts & Sculptures | Ramdev Enterprises Chennai`

**Hero copy:**  
Bespoke metal art, sculptures and architectural feature pieces developed from approved concepts and project requirements.

**Overview:**  
Build this page around the buyer's actual selection and RFQ process. Ramdev Enterprises should be positioned as supporting requirement-led sourcing/supply and commercial coordination for custom metal arts & sculptures only after this product is approved as an actual offering. Explain the product in practical language, show where it is typically used, and guide the buyer toward sharing drawings, dimensions, quantity, material/grade, finish and delivery location. Do not claim manufacturing, testing, certifications or performance capabilities unless separately documented.

#### Key features

- Bespoke concepts
- Indoor/outdoor possibilities
- Multiple finishes
- Custom scale
- Model/drawing development
- Landscape/interior integration

#### Typical applications
- Corporate campuses
- Hotels
- Public spaces
- Residential developments
- Retail destinations
- Landscape features

#### Specification / RFQ table
- **Material / grade:** As specified in the approved requirement
- **Dimensions:** Requirement- or drawing-specific
- **Finish:** As specified / sample-approved where applicable
- **Quantity:** RFQ / BOQ-based
- **Application environment:** Customer to specify
- **Documentation / inspection:** As agreed for the order
- **Artwork/model:** Must be original or client-authorized

#### How to specify this product

The page should ask the buyer for the information that materially affects quotation: dimensions, quantity, required material/grade, finish, installation/application environment, delivery location, drawings/BOQ and any mandatory consultant specification. Never pre-fill unknown engineering values as facts.

#### FAQ questions

- What information is required to quote Custom Metal Arts & Sculptures?
- Can the product be supplied to a drawing or BOQ?
- Can dimensions and finishes be customized?
- What material or grade information should be provided?

**FAQ answer rule:** Keep answers concise and useful. Explain what information is required and state that final availability, specification, documentation and commercial terms depend on the approved requirement.

#### Image direction

Use premium, photorealistic product or application photography with technically plausible geometry, clean stainless-steel material rendering, controlled lighting and no embedded text or watermark. If an authentic asset is not available, use the branded placeholder or a clearly conceptual supporting image—not fake project evidence.

#### CTA

```text
HAVE A REQUIREMENT?
Send us your dimensions, drawing or BOQ for a project-specific quotation.

[REQUEST A QUOTE] [SEND REQUIREMENT]
```

---


## 8. Premium `/products` page

Build the catalogue landing page:

```text
Hero
PRODUCTS & SOLUTIONS

Short introduction

Category filter:
[All]
[Steel Products]
[Industrial]
[Interior & Architectural]
[Exterior & Architectural]
[Arts & Sculptures]

Responsive product grid

RFQ CTA
Footer
```

Grid:
- 4 columns only when card width remains generous on large desktop
- 3 columns standard desktop
- 2 columns tablet
- 1 column mobile

Each card:
- image/fallback
- category eyebrow
- product name
- one-line description
- `View Product →`

Production UI must hide `approved: false`.

---

## 9. Shared reusable components

Create/reuse:

```text
<ProductHero />
<ProductOverview />
<FeatureGrid />
<ApplicationGrid />
<SpecificationTable />
<ProductGallery />
<HowToSpecify />
<ProductFaq />
<RelatedProducts />
<ProductRFQ />
```

Do not create 27 hand-coded page components. Use the dynamic `[slug]` route and typed product data.

---

## 10. Content quality requirements

Every approved page must contain useful buyer-facing information rather than SEO filler.

Target:
- clear hero value proposition
- useful overview
- 5–8 product-specific features
- 4–8 realistic applications
- 5–8 RFQ/specification fields
- 4 relevant FAQs
- image guidance
- strong quotation CTA
- 3 related products where relevant

Do not:
- duplicate the same paragraph across all pages,
- keyword-stuff `manufacturer`, `supplier`, `exporter`,
- claim Ramdev is a manufacturer without confirmation,
- invent years of experience,
- invent ISO/certification claims,
- invent technical ratings or standards,
- copy Real Ferro descriptions,
- mention Real Ferro anywhere in the public website.

---

## 11. GPT-6 implementation command

```text
Implement the complete product-page system described in this specification.

Put all product content in src/data/products.ts (or cleanly split typed data modules if the file becomes too large).

Use one reusable /products/[slug]/page.tsx template.

For each proposed product:
- create a typed object,
- set approved=false initially,
- add its unique copy, features, applications, safe specification guidance and FAQs,
- add relatedSlugs,
- generate unique metadata,
- support graceful missing images.

The public /products page and production navigation must show only approved products.

If draft preview is enabled via NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS=true, draft products may be visible for owner review but must be visually tagged "Draft" only in development/admin preview, not to ordinary production visitors.

Implement category filtering without producing thin duplicate SEO URLs.

Add BreadcrumbList JSON-LD.
Omit Product schema if factual commercial fields are insufficient.

Run:
npm run lint
npm run build

Fix every problem before finishing.
```

---

## 12. Approval workflow

For each product, Ramdev Enterprises should approve:

```text
[ ] We actually sell/supply this product
[ ] Product name is correct
[ ] Category is correct
[ ] Applications are appropriate
[ ] Material/grade language is accurate
[ ] Specification fields are not misleading
[ ] Images represent the actual product
[ ] Any certification/rating is documented
[ ] RFQ route is correct
```

After approval:

```ts
approved: true
```

---

## 13. Reference extraction summary

The source/reference navigation explicitly lists the following Steel Products: Railings Turnkey Project, SS Benches, SS Dustbin, SS Bicycle Stand, SS Bollards, SS Bus Shelter, SS Design Steel Furniture, SS Safety Door And Frames, and SS Drywall Stone Cladding Clamp. citeturn294804view0

It lists Industrial Projects as Gratings, Turnkey Projects, Expansion Joint, Custom Fabrication and SS Corner Guard. citeturn294804view0 A separate Cable Tray product page is also present and is included here for owner approval. citeturn294804search8

Interior Projects include SS Planters, Residential Railing, SS Cladding, PVD Design Furniture, Metal Wall Art, Water Jet Steel Design, and SS PVD coated screen and partitions. Exterior Projects include SS Cladding, SS Railing, Facades, Canopies, SS Benches, Pergola and SS Swing. citeturn294804view0

Arts & Sculptures is present as a major category, but the main source navigation does not expose individual sculpture sub-products. citeturn294804search2

---

## 14. Definition of done

```text
[ ] Premium /products landing page complete
[ ] Every approved product has a working canonical detail URL
[ ] One reusable product template is used
[ ] Every page has unique, useful content
[ ] Cross-category products do not create duplicate URLs
[ ] Draft products are hidden in production
[ ] Category filters work
[ ] Mobile layout is polished
[ ] Image fallbacks work
[ ] RFQ CTA works
[ ] Unique metadata exists
[ ] BreadcrumbList is valid
[ ] Invalid slugs return 404
[ ] No fake claims/specifications
[ ] No Lorem Ipsum
[ ] No dead links
[ ] npm run lint passes
[ ] npm run build passes
```
