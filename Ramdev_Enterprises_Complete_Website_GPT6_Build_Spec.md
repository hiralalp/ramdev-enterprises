# Ramdev Enterprises — Complete Website Build Specification for VS Code GPT-6

> **This document is an execution specification, not only a design brief.**
>
> When this file is given to GPT-6 in VS Code, the coding agent should build the production-ready website described here end-to-end. The agent must follow the implementation commands, architecture, visual rules, factual-content restrictions, image rules, accessibility requirements, SEO requirements, and acceptance criteria in this document.

---

# 0. MASTER INSTRUCTION FOR THE CODING AGENT

## Mission

Build a **complete, premium, modern, responsive B2B website for Ramdev Enterprises**.

The website should take inspiration from the information depth and category structure documented later in this file, but it **must not copy RealFerro's design, code, text, images, or visual identity**.

The final Ramdev Enterprises website must feel like a premium contemporary engineering/materials brand with:

- sophisticated industrial visual language
- large architectural whitespace
- deep navy + white foundation
- restrained red/blue brand accents derived from the RE logo
- high-quality stainless-steel/product imagery
- strong typography
- excellent mobile UX
- technical product presentation
- fast page performance
- SEO-ready structure
- prominent RFQ conversion
- maintainable component architecture

## Non-negotiable agent rules

1. **Do not ask for permission after every step.** Work through the implementation until the site builds successfully.
2. **Do not fabricate company facts.** Do not invent certifications, client names, project counts, years of experience, manufacturing capacity, awards, stock levels, export countries, or technical specifications.
3. If business information is missing, use neutral factual wording or mark content internally as `TODO_CONTENT`, but keep the page visually complete.
4. Do not use fake customer logos, fake certificates, fake project images, or fake testimonials.
5. Do not use Real Ferro content verbatim. It is a structural reference only.
6. Use the supplied Ramdev Enterprises logo as-is once placed in the asset directory. Never redraw or distort it.
7. Do not use random stock imagery in the final UI when no approved image exists. Use tasteful branded placeholder surfaces that can later be replaced.
8. All navigation links must work.
9. All pages must be responsive.
10. The final command `npm run build` must complete successfully with no TypeScript errors.
11. Fix lint/build/runtime errors before declaring completion.
12. Do not leave broken placeholders such as `href="#"`.
13. Do not leave Lorem Ipsum anywhere.
14. Keep dependencies minimal.
15. Prefer semantic HTML and reusable React components.
16. Respect `prefers-reduced-motion`.
17. Maintain strong accessibility contrast and visible keyboard focus states.
18. Use `next/image` for raster website imagery.
19. Use server components by default; add `"use client"` only where interactivity requires it.
20. Do not create an auto-rotating hero carousel.

---

# 1. RECOMMENDED TECHNOLOGY STACK

Use:

```text
Framework        Next.js (latest stable)
Router           App Router
Language         TypeScript
Styling          Tailwind CSS
Icons            Lucide React
Animation        Motion (sparingly)
Forms            React Hook Form + Zod
Images           next/image
Fonts            next/font
SEO              Next.js Metadata API + JSON-LD
Deployment       Vercel-compatible
Package manager  npm
```

Do **not** add a large UI framework unless there is a strong implementation reason.

---

# 2. INITIAL PROJECT COMMANDS

If starting from an empty parent directory, run:

```bash
npx create-next-app@latest ramdev-enterprises --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd ramdev-enterprises
npm install lucide-react motion clsx tailwind-merge zod react-hook-form @hookform/resolvers
```

Then verify:

```bash
npm run dev
```

After initial scaffolding, stop the dev server when needed and continue implementation.

## Optional formatting tooling

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

# 3. REQUIRED PROJECT STRUCTURE

Create/refactor the project toward this structure:

```text
ramdev-enterprises/
│
├── public/
│   ├── images/
│   │   ├── brand/
│   │   │   ├── ramdev-logo.png
│   │   │   └── favicon.png
│   │   ├── hero/
│   │   ├── products/
│   │   ├── industries/
│   │   ├── projects/
│   │   ├── infrastructure/
│   │   ├── management/
│   │   ├── certificates/
│   │   └── blog/
│   └── documents/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── industries/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── quality/
│   │   │   └── page.tsx
│   │   │
│   │   ├── insights/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   ├── request-quote/
│   │   │   └── page.tsx
│   │   │
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   │
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   │
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── MegaMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── StickyMobileActions.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustStrip.tsx
│   │   │   ├── ProductCategories.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── IndustriesSection.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── QualitySection.tsx
│   │   │   ├── RFQSection.tsx
│   │   │   ├── InsightsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductHero.tsx
│   │   │   ├── SpecificationTable.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   └── RelatedProducts.tsx
│   │   │
│   │   ├── project/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectGallery.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── QuoteForm.tsx
│   │   │   └── ContactForm.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Container.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── Breadcrumbs.tsx
│   │       ├── ImagePlaceholder.tsx
│   │       └── Reveal.tsx
│   │
│   ├── data/
│   │   ├── company.ts
│   │   ├── navigation.ts
│   │   ├── products.ts
│   │   ├── industries.ts
│   │   ├── projects.ts
│   │   └── insights.ts
│   │
│   ├── lib/
│   │   ├── cn.ts
│   │   ├── seo.ts
│   │   ├── structured-data.ts
│   │   └── validation.ts
│   │
│   └── types/
│       └── index.ts
│
├── .env.example
├── README.md
├── package.json
└── tsconfig.json
```

The exact file structure may be adjusted if the framework scaffolder differs, but preserve the **separation of route pages, reusable components, data, types, and utilities**.

---

# 4. COMPANY DATA — SINGLE SOURCE OF TRUTH

Create:

```text
src/data/company.ts
```

Use one central company object so contact data is never duplicated manually.

Use:

```ts
export const company = {
  name: "Ramdev Enterprises",
  addressLine1: "1st Floor 49/2 Vembuliamman Koil Street",
  locality: "Karanai",
  city: "Chennai",
  postalCode: "600130",
  district: "Chengalpattu",
  state: "Tamil Nadu",
  country: "India",
  phoneDisplay: "91 76507264",
  phoneHref: "",
  email: "ramdeventerprises15@gmail.com",
  gstin: "33DVEPK6522D1ZX",
  pan: "DVEPK6522D",
};
```

### Important

The supplied phone number appears as `91 76507264` in the source image and may be incomplete.

Therefore:

- display it exactly as supplied if required,
- **do not invent missing digits**,
- leave `phoneHref` empty until confirmed,
- hide tap-to-call if no valid phone URI exists.

Do not expose PAN in the public footer by default.

GSTIN may be shown on Contact/About/Footer as a business identity field.

---

# 5. BRAND ASSET INSTRUCTION

The coding agent should expect the master logo at:

```text
/public/images/brand/ramdev-logo.png
```

If that file is missing:

1. Do not create a fake logo.
2. Render a temporary clean typographic brand lockup:
   `RE` icon placeholder + `Ramdev Enterprises`
3. Add a code comment:
   `TODO_ASSET: Replace with official Ramdev Enterprises logo`
4. Keep dimensions ready so the official logo can replace it without layout changes.

If the user supplies the logo later, place the actual file at that path and remove the placeholder.

---

# 6. DESIGN TOKENS

Implement the premium color system in CSS variables in `globals.css`.

```css
:root {
  --brand-blue: #164a9c;
  --brand-red: #e3222a;
  --navy: #0b1f3a;
  --navy-deep: #081a30;
  --steel-blue: #416b82;
  --steel-grey: #66727d;
  --graphite: #17202a;
  --border: #dce2e7;
  --surface: #f5f7f9;
  --warm-white: #fcfcfb;
  --white: #ffffff;
}
```

Do not hard-code random colors across components.

Use these tokens consistently.

---

# 7. TYPOGRAPHY IMPLEMENTATION

Use `next/font`.

Preferred:

```text
Headings/UI: Manrope
Body: Inter
```

If both can be loaded through `next/font/google`, configure CSS variables:

```text
--font-heading
--font-body
```

Typography target:

```text
Hero H1: clamp(2.7rem, 6vw, 5rem)
H2: clamp(2rem, 4vw, 3.25rem)
H3: 1.5–2rem
Body: 1rem–1.125rem
Small: 0.875rem
Eyebrow: 0.75–0.8125rem uppercase with tracking
```

Avoid overly compressed line-height.

---

# 8. GLOBAL LAYOUT RULES

Desktop container:

```text
max-width: 1320px
horizontal padding: 24–48px
```

Mobile:

```text
horizontal padding: 20px
```

Section vertical spacing:

```text
Desktop: 96–128px
Tablet: 72–96px
Mobile: 56–72px
```

Use a disciplined 8px spacing scale.

Do not make every section a rounded floating card.

---

# 9. REQUIRED ROUTES

The site must provide at least:

```text
/
 /products
 /products/[slug]
 /industries
 /industries/[slug]
 /projects
 /projects/[slug]
 /about
 /quality
 /insights
 /insights/[slug]
 /request-quote
 /contact
 /privacy
 /terms
```

All routes must render and return usable metadata.

---

# 10. HOMEPAGE — REQUIRED BUILD ORDER

Implement this exact narrative order:

```text
01 Utility bar
02 Sticky premium header
03 Hero
04 Trust strip
05 Product categories
06 About Ramdev Enterprises
07 Dark "Why Choose Us" section
08 Featured products
09 Industries / applications
10 Capabilities / sourcing section
11 Featured projects/applications
12 Quality commitment
13 RFQ section
14 Latest insights
15 Contact/location section
16 Premium footer
17 Mobile sticky actions where valid
```

## Hero content

Use this as the default copy:

```text
Eyebrow:
PRECISION. RELIABILITY. PERFORMANCE.

H1:
STAINLESS STEEL &
INDUSTRIAL SOLUTIONS
BUILT TO PERFORM.

Body:
Requirement-driven material and industrial solutions
for demanding applications.

Primary CTA:
REQUEST A QUOTE

Secondary CTA:
EXPLORE PRODUCTS
```

Do not claim manufacturing unless confirmed.

---

# 11. HERO VISUAL IMPLEMENTATION

Hero should be split-layout on large screens:

```text
LEFT: copy + CTA
RIGHT: image/art direction
```

At mobile:

```text
copy
CTA
image
```

If no approved hero image is available, use a premium placeholder component with:

- subtle brushed-metal CSS texture
- soft circular RE-inspired arcs
- no fake project photo
- no fake text embedded in an image

This placeholder should be easy to replace with:

```text
/public/images/hero/home-hero.webp
```

---

# 12. HEADER BEHAVIOR

Desktop:

```text
Logo | Products | Industries | Projects | About | Quality | Insights | Contact | REQUEST A QUOTE
```

Required:

- sticky header
- subtle backdrop blur after scrolling
- keyboard-accessible nav
- mega menu for Products if there are enough product categories
- no hover-only functionality that prevents keyboard/mobile access

Mobile:

- hamburger button
- accessible slide-down/drawer navigation
- focus trapping if modal drawer implementation is used
- body scroll lock when open
- close on Escape

---

# 13. PRODUCT DATA MODEL

Create a reusable `Product` type.

Example:

```ts
export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  image?: string;
  overview: string;
  features: string[];
  applications: string[];
  specifications: Array<{
    label: string;
    value: string;
  }>;
  gallery?: string[];
  relatedSlugs?: string[];
};
```

### Factual-content rule

Do not insert grades/dimensions/standards unless supplied or clearly marked as general examples.

A safe placeholder value is:

```text
"Available based on requirement — contact sales"
```

instead of inventing a specification.

---

# 14. INITIAL PRODUCT TAXONOMY

Until Ramdev Enterprises supplies the final catalogue, create a flexible data-driven product system.

Use **neutral category placeholders only if necessary**, for example:

```text
Stainless Steel Products
Pipes & Tubes
Sheets & Plates
Bars & Rods
Fittings
Flanges
Industrial Components
Custom Requirements
```

Add an inline code comment:

```ts
// TODO_CONTENT: Replace preliminary categories with approved Ramdev Enterprises catalogue.
```

The page should still look complete.

Do not present these categories as confirmed company offerings if they have not been verified.

---

# 15. PRODUCT LISTING PAGE

Required elements:

```text
Breadcrumb
Page intro
Category filter/tabs
Responsive product grid
RFQ CTA
Footer
```

Grid:

```text
Desktop: 3 columns
Large desktop: optionally 4 if card width remains premium
Tablet: 2
Mobile: 1
```

Cards must maintain consistent imagery and height.

---

# 16. PRODUCT DETAIL PAGE

Build:

```text
Breadcrumb
Product hero
Overview
Key features
Applications
Specification table
Gallery / image placeholders
Requirement CTA
Related products
FAQ (only generic purchase/process questions)
Footer
```

Do not add fake reviews.

Add `Product` structured data only where semantically appropriate and factual fields are available.

---

# 17. INDUSTRY PAGE SYSTEM

Data-driven industry pages.

Each industry detail page:

```text
Hero
Industry challenges
Relevant solution categories
Applications
Why Ramdev Enterprises
RFQ CTA
Related products
```

Use neutral language.

Do not claim existing industry customers unless confirmed.

---

# 18. PROJECTS / APPLICATIONS RULE

Because confirmed Ramdev Enterprises project case studies have not yet been supplied:

- title the primary collection **Projects & Applications** or **Applications** if needed,
- do not invent landmark projects,
- do not create fake clients,
- do not use AI visuals as completed-project proof.

Create project infrastructure so real case studies can be added later.

If `projects.ts` is empty, render a polished empty state:

```text
"Project case studies are being prepared. Contact our team to discuss relevant applications."
```

Do not show fake placeholders labeled as completed projects.

---

# 19. QUALITY PAGE

Build a strong quality-focused page, but keep wording factual.

Safe themes:

- requirement validation
- material/specification communication
- supplier/product documentation where available
- inspection/quality-conscious sourcing
- packaging and delivery coordination
- customer communication

Do **not** claim ISO or other certification without proof.

Certificates section should only render if actual certificate assets/data exist.

---

# 20. ABOUT PAGE

Required:

```text
Hero
Company overview
How we work
Values
Capabilities
Location
Business identity details
CTA
```

Suggested positioning:

```text
Ramdev Enterprises supports industrial and engineering requirements
through responsive sourcing, clear communication and requirement-led
material solutions.
```

Do not invent founding year.

---

# 21. CONTACT PAGE

Show:

```text
Ramdev Enterprises
1st Floor 49/2 Vembuliamman Koil Street
Karanai, Chennai - 600130
Chengalpattu, Tamil Nadu
India

Email:
ramdeventerprises15@gmail.com

GSTIN:
33DVEPK6522D1ZX
```

Show supplied phone display carefully, but no click-to-call link until the phone number is confirmed valid.

Include a contact form.

For map implementation:

- use an external map link if no API key is needed,
- do not hard-code a Google Maps iframe requiring unconfigured keys,
- provide a clean map placeholder/link.

---

# 22. RFQ FORM

Required fields:

```text
Full Name *
Company Name
Email *
Phone / WhatsApp
Product / Requirement *
Quantity
Grade / Specification
Delivery Location
Requirement Details *
```

Optional upload UI:

```text
Drawing / BOQ / Specification
```

If file upload is not backed by storage yet:

- render the UI only if implemented safely,
- otherwise add a clearly documented TODO,
- do not pretend uploads are being stored.

Validation:

- React Hook Form
- Zod
- inline accessible validation messages
- `aria-invalid` where appropriate

---

# 23. FORM BACKEND BEHAVIOR

Do not hard-code API secrets.

Create `.env.example` containing placeholders such as:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_TO_EMAIL=ramdeventerprises15@gmail.com

# Optional mail provider
RESEND_API_KEY=
```

If no mail provider is configured:

- form must not falsely display "sent successfully",
- either provide a safe local/demo state labeled accordingly,
- or implement a server route that returns a clear configuration error.

If Resend is added later, keep mail integration isolated in a server-only utility.

---

# 24. IMAGE SYSTEM

Expected asset paths:

```text
/public/images/brand/ramdev-logo.png
/public/images/hero/home-hero.webp
/public/images/products/{slug}/...
/public/images/industries/{slug}/...
/public/images/projects/{slug}/...
```

Use `next/image`.

All content images need:

- dimensions/aspect-ratio container
- meaningful alt text
- no layout shift
- lazy loading below fold
- hero image priority only when it is truly LCP

If an image file is missing, render the branded `ImagePlaceholder` component instead of a broken image.

---

# 25. IMAGE PLACEHOLDER COMPONENT

Build a high-quality placeholder that visually matches the brand:

```text
Light surface
Subtle blue/navy engineering arcs
Small category label
No fake photograph
```

It should communicate "asset pending" internally without showing developer text to public users.

---

# 26. MOTION RULES

Use Motion only for:

- subtle section reveal
- hover arrow movement
- small card/image transitions
- mobile menu transitions

Do not use:

- auto-playing animated backgrounds
- excessive parallax
- scroll-jacking
- bouncing CTAs
- continuously spinning graphics

Implement reduced-motion fallbacks.

---

# 27. ACCESSIBILITY REQUIREMENTS

Minimum:

- semantic landmarks
- one logical H1 per page
- heading hierarchy
- `aria-label` for icon-only controls
- keyboard navigable menus
- visible focus ring
- sufficient contrast
- descriptive link labels
- correct form labels
- error announcements
- alt text
- skip-to-content link
- reduced-motion support

Target WCAG 2.2 AA where practical.

---

# 28. SEO REQUIREMENTS

Implement metadata for every route:

```text
title
description
canonical
Open Graph
Twitter metadata
```

Default title pattern:

```text
%PAGE% | Ramdev Enterprises
```

Add:

```text
robots.ts
sitemap.ts
```

Structured data:

- `Organization`
- `LocalBusiness` only if appropriate
- `BreadcrumbList`
- `Article` for insights
- `Product` only where data is factual

Do not include fake ratings/review schema.

---

# 29. ORGANIZATION JSON-LD

Build from `company.ts`.

Include only verified values:

```text
name
address
email
GST/business context if semantically appropriate
URL
logo when available
```

Do not fabricate social links.

---

# 30. PRIVACY & TERMS

Create professionally written starter pages clearly suited to a B2B website.

Avoid claiming legal compliance beyond what can be supported.

Mention that enquiry data may be used to respond to business requirements.

These are starter templates and should be easy to replace with legal-approved text later.

---

# 31. FOOTER

Required:

```text
Logo / Ramdev Enterprises
Short brand statement
Products
Industries
Company
Resources
Contact
Email
Address
GSTIN
Privacy
Terms
Copyright
```

Do not show PAN publicly by default.

Footer background:

```text
#081A30
```

---

# 32. PERFORMANCE TARGETS

Build toward:

```text
Lighthouse Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+
```

Practical rules:

- avoid unnecessary client-side JS
- optimize images
- avoid huge dependency bundles
- no background video
- static/server rendering where possible
- use modern font loading
- no layout shifts
- cache public assets naturally

---

# 33. SECURITY / ENGINEERING RULES

- no secrets in client bundle
- validate form input on server as well as client when server submission exists
- sanitize/escape user-provided values naturally through React
- no `dangerouslySetInnerHTML` unless unavoidable
- if used for structured data, JSON serialize safely
- use environment variables for providers
- no user-upload processing without explicit validation/storage design

---

# 34. RESPONSIVE BREAKPOINT EXPECTATIONS

At minimum verify:

```text
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

No horizontal scrolling.

Navigation must remain usable at every width.

Product cards should not become tiny on tablet.

---

# 35. VISUAL QA RULES

The site should have:

- crisp logo treatment
- consistent card radius
- limited shadows
- clean vertical rhythm
- no random one-off colors
- no giant blank gaps
- no overcrowded sections
- readable line length
- consistent CTA labels
- consistent image ratios
- premium footer
- polished mobile presentation

Red is an accent, not the dominant page background.

---

# 36. CONTENT VOICE

Tone:

```text
Professional
Technical
Clear
Confident
Concise
B2B
```

Avoid:

```text
"We are the No.1..."
"Best company in India"
"World's leading..."
"Guaranteed lowest price"
"100% customer satisfaction"
```

unless independently verified and approved.

---

# 37. NAVIGATION COPY

Recommended:

```text
Products
Industries
Projects
About
Quality
Insights
Contact
Request a Quote
```

Avoid excessive top-level items.

---

# 38. CTA COPY

Primary:

```text
REQUEST A QUOTE
```

Secondary:

```text
EXPLORE PRODUCTS
```

Other actions:

```text
SEND YOUR REQUIREMENT
DISCUSS YOUR REQUIREMENT
VIEW DETAILS
VIEW APPLICATIONS
CONTACT OUR TEAM
```

Do not use generic `Click Here`.

---

# 39. REQUIRED REUSABLE UI COMPONENTS

Build and reuse:

```text
Button
Container
SectionHeading
Breadcrumbs
ImagePlaceholder
Reveal
ProductCard
ProjectCard
SpecificationTable
QuoteForm
Header
MegaMenu
MobileNav
Footer
```

Do not duplicate large blocks of markup across pages.

---

# 40. DATA-DRIVEN CONTENT REQUIREMENT

Products, industries, projects and insights must come from typed data modules, not repeated hard-coded arrays inside pages.

Example:

```text
src/data/products.ts
src/data/industries.ts
src/data/projects.ts
src/data/insights.ts
```

Use `generateStaticParams()` for dynamic routes when appropriate.

Return `notFound()` for invalid slugs.

---

# 41. ERROR AND EMPTY STATES

Implement polished states for:

- unknown product slug → 404
- no projects yet → professional empty state
- image missing → branded placeholder
- form submission unavailable → honest configuration message
- no related products → omit section cleanly

---

# 42. 404 PAGE

Create a custom `not-found.tsx`.

Copy:

```text
PAGE NOT FOUND

The page you're looking for may have moved or no longer exists.

[BACK TO HOME]
[VIEW PRODUCTS]
```

Style it as a real part of the brand.

---

# 43. LOADING STATES

Only add loading UI where there is actual asynchronous navigation/data.

Do not add skeleton loaders to static sections without need.

---

# 44. README REQUIREMENTS

Create a useful `README.md` containing:

```text
Project overview
Stack
How to install
How to run
How to build
Environment variables
Asset replacement instructions
Content-data locations
How to add a product
How to add an industry
How to add a project
How to add an insight
Deployment instructions
Known TODO content/assets
```

Commands:

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

---

# 45. DEVELOPMENT PHASES FOR GPT-6

The coding agent should execute in this order.

## Phase 1 — Scaffold

```text
Initialize project
Install dependencies
Set fonts
Create globals/tokens
Create utility functions
Create core types
Create company data
```

Then run:

```bash
npm run lint
npm run build
```

Fix errors.

## Phase 2 — Global shell

Build:

```text
Header
Navigation
Mobile nav
Footer
Container
Button
SectionHeading
Breadcrumbs
ImagePlaceholder
```

Run:

```bash
npm run lint
npm run build
```

## Phase 3 — Homepage

Build all homepage sections in specified order.

Verify:

```bash
npm run dev
```

Then:

```bash
npm run lint
npm run build
```

## Phase 4 — Product system

Build:

```text
products.ts
/products
/products/[slug]
ProductCard
SpecificationTable
RelatedProducts
```

Then build/lint.

## Phase 5 — Industries + Projects

Build route systems and data files.

Do not fabricate case studies.

Then build/lint.

## Phase 6 — About, Quality, Contact, RFQ

Build content and forms.

Then build/lint.

## Phase 7 — Insights + legal + SEO

Build:

```text
Insights list/detail
Privacy
Terms
sitemap
robots
metadata
structured data
```

Then build/lint.

## Phase 8 — Final QA

Check:

```text
Desktop
Tablet
Mobile
Keyboard
Missing assets
404
Invalid slugs
Form validation
Metadata
No dead links
No Lorem Ipsum
No fake claims
```

Final commands:

```bash
npm run lint
npm run build
```

Both must pass.

---

# 46. USER COMMAND — ONE-SHOT BUILD PROMPT

When this specification is opened in VS Code, the user can give GPT-6 this command:

```text
Read the entire Ramdev Enterprises website specification in this Markdown file before making changes.

Build the complete website described in it in the current workspace. Follow the required Next.js architecture, design system, data model, page hierarchy, accessibility rules, image-handling rules, factual-content restrictions, SEO requirements, and acceptance criteria.

Work through all implementation phases without stopping for routine confirmation. Do not fabricate company facts or project/client/certification claims. If an approved image or business detail is missing, use the specified premium fallback/placeholder and TODO mechanism instead of inventing data.

Create all routes, reusable components, typed data modules, forms, SEO files, legal starter pages, responsive states, README, and environment example.

Run lint and production build repeatedly during implementation and fix every issue.

Do not declare the work complete until:
1. npm run lint passes,
2. npm run build passes,
3. all required routes render,
4. navigation contains no dead links,
5. mobile and desktop layouts are complete,
6. there is no Lorem Ipsum,
7. there are no fabricated company claims,
8. missing images fail gracefully,
9. the site visually follows the premium Ramdev Enterprises red/blue/navy industrial design system.

Begin now.
```

---

# 47. USER COMMAND — CONTINUE/FIX PROMPT

If GPT-6 stops midway, use:

```text
Continue implementing the Ramdev Enterprises website from the current repository state.

First inspect what is already complete versus the Markdown specification. Do not rebuild working sections unnecessarily.

Complete every missing route/component/content-data module, then run:
npm run lint
npm run build

Fix all errors and continue until the full specification and acceptance criteria are satisfied.
```

---

# 48. USER COMMAND — VISUAL POLISH PASS

After functionality is complete:

```text
Perform a dedicated premium visual-polish pass across the complete Ramdev Enterprises website.

Do not change factual content or route architecture.

Improve:
- typography hierarchy
- whitespace and section rhythm
- responsive spacing
- card consistency
- image framing
- dark/light section contrast
- button states
- navigation polish
- footer quality
- mobile menu
- hover/focus states
- subtle motion
- stainless-steel/industrial visual tone

Keep the Ramdev brand system:
deep navy + white foundation,
blue as primary technical accent,
red as restrained high-attention accent.

Avoid visual clutter, excessive shadows, excessive rounded cards, gradients everywhere, auto carousels, and generic template styling.

Then run npm run lint and npm run build and fix any problems.
```

---

# 49. USER COMMAND — MOBILE QA PASS

```text
Audit and improve the entire site specifically for:
375px, 390px, 430px, 768px, and 1024px widths.

Check:
- no horizontal overflow
- navigation usability
- correct hero stacking
- CTA widths
- touch targets
- product grids
- specification tables
- form fields
- footer wrapping
- heading line breaks
- image crop behavior
- sticky mobile actions
- accessible modal/drawer behavior

Fix every issue you find.

Run npm run lint and npm run build afterward.
```

---

# 50. USER COMMAND — SEO QA PASS

```text
Perform a complete SEO and metadata audit of the Ramdev Enterprises Next.js site.

Verify:
- unique title/description for every route
- canonical URLs
- Open Graph
- robots.ts
- sitemap.ts
- Organization structured data
- BreadcrumbList where appropriate
- Article data for insights
- no fake review/rating schema
- descriptive alt text
- semantic heading hierarchy
- internal linking
- clean slug structure
- not-found behavior

Do not fabricate business data.

Fix all issues and run npm run lint and npm run build.
```

---

# 51. USER COMMAND — PERFORMANCE PASS

```text
Optimize the Ramdev Enterprises site for production performance without degrading the visual design.

Check:
- client-component overuse
- image sizing and priority
- unnecessary JavaScript
- font loading
- layout shift
- repeated data
- bundle-heavy dependencies
- animations
- rendering strategy
- static generation opportunities

Use server components by default.

Preserve accessibility and design quality.

Run npm run lint and npm run build after optimization.
```

---

# 52. USER COMMAND — ADD REAL ASSETS LATER

When actual product/project images are placed in `/public/images`, use:

```text
Audit /public/images and replace all applicable branded placeholders with the supplied real Ramdev Enterprises assets.

Do not alter or regenerate the company logo.

For each real image:
- use next/image
- preserve aspect ratio
- add accurate alt text
- choose correct responsive sizes
- avoid upscaling low-resolution images
- keep image treatment consistent with the website design system

Do not use an image as proof of a project, client, factory, certificate, or product unless the asset context clearly supports that claim.

Run npm run lint and npm run build afterward.
```

---

# 53. USER COMMAND — ADD APPROVED PRODUCT CATALOGUE LATER

```text
Replace the preliminary product taxonomy with the approved Ramdev Enterprises catalogue I provide.

Update only the typed product/category data and any navigation labels that depend on it.

Preserve:
- page templates
- layout system
- design tokens
- URLs where practical
- SEO quality
- reusable components

Generate unique product metadata, descriptions, features, applications and specifications only from the supplied approved information. Never invent technical specifications.

Ensure every product has a working detail route and related-product links.

Run npm run lint and npm run build afterward.
```

---

# 54. ACCEPTANCE CHECKLIST

The agent must verify all of the following before completion.

## Brand

```text
[ ] Ramdev Enterprises clearly identified
[ ] RE logo area correct
[ ] Brand blue/red used consistently
[ ] Red is restrained
[ ] Deep navy creates premium contrast
[ ] No copied Real Ferro visual design
```

## UX

```text
[ ] Header works
[ ] Mobile nav works
[ ] Every navigation link resolves
[ ] RFQ is prominent
[ ] Product browsing is clear
[ ] Contact information is consistent
[ ] 404 page works
```

## Responsive

```text
[ ] 375px
[ ] 390px
[ ] 430px
[ ] 768px
[ ] 1024px
[ ] 1280px
[ ] 1440px
[ ] 1920px
```

## Content integrity

```text
[ ] No Lorem Ipsum
[ ] No fabricated clients
[ ] No fabricated projects
[ ] No fabricated certifications
[ ] No fabricated awards
[ ] No invented years of experience
[ ] No invented technical specifications
[ ] PAN not unnecessarily exposed
[ ] Phone is not converted to a fake full number
```

## Engineering

```text
[ ] TypeScript clean
[ ] No console errors in normal navigation
[ ] No broken images
[ ] Missing images have graceful fallback
[ ] No dead href="#"
[ ] Data modules typed
[ ] Dynamic routes handle invalid slugs
[ ] Environment variables documented
```

## Accessibility

```text
[ ] Keyboard navigation
[ ] Focus indicators
[ ] Skip link
[ ] Form labels
[ ] Validation messages
[ ] Contrast
[ ] Alt text
[ ] Reduced motion
```

## SEO

```text
[ ] Route metadata
[ ] Sitemap
[ ] Robots
[ ] Canonicals
[ ] Open Graph
[ ] Structured data
[ ] Clean headings
[ ] Internal links
```

## Final verification

```bash
npm run lint
npm run build
```

Both must succeed.

---

# 55. DEFINITION OF DONE

The website is considered complete only when:

```text
- the visual system looks intentionally premium,
- all required pages exist,
- the interface works on desktop and mobile,
- real business information is represented accurately,
- unknown information has not been invented,
- all placeholders are graceful and replaceable,
- RFQ/contact flows are implemented honestly,
- SEO foundations are complete,
- accessibility foundations are complete,
- lint succeeds,
- production build succeeds,
- README explains how to continue maintaining the site.
```

---

# 56. IMPORTANT HANDOFF NOTE

This document includes both:

1. the **execution instructions above**, which GPT-6 should follow to build the site, and
2. the **design/reference analysis below**, which explains the visual, structural and image strategy in more depth.

If there is any conflict:

```text
1. factual safety / non-fabrication rules
2. execution specification
3. Ramdev Enterprises brand design system
4. Real Ferro structural reference
```

take precedence in that order.

---

# DESIGN & STRUCTURAL REFERENCE

# RealFerro.com --- Website Design, Structure & Layout Analysis

**Website:** https://realferro.com/\
**Reviewed:** 13 September 2026\
**Purpose:** Detailed reference for understanding, recreating, or
redesigning the site's information architecture, layout system, page
hierarchy, reusable components, content flow, and B2B conversion
strategy.

------------------------------------------------------------------------

## 1. Executive Summary

Real Ferro Projects Pvt. Ltd. uses a long-form B2B manufacturing/project
website structure. The site combines stainless-steel products,
industrial fabrication, architectural/interior/exterior projects,
turnkey execution, company credentials, completed projects, client
proof, enquiries, and SEO articles.

Its basic conversion logic is:

``` text
Company credibility
      ↓
Capabilities
      ↓
Product / project categories
      ↓
Major project proof
      ↓
Clients / management / infrastructure
      ↓
Enquiry
```

The underlying content architecture is valuable, but the current
presentation can be modernized substantially. The biggest opportunities
are clearer hierarchy, cleaner copy, less duplication, a simpler
navigation system, stronger product/project templates, better technical
content, and more prominent quotation/BOQ conversion paths.

------------------------------------------------------------------------

# 2. Information Architecture

``` text
HOME
│
├── ABOUT COMPANY
│   ├── About Company
│   ├── Vision & Mission
│   ├── Our Management
│   ├── Quality Policy
│   ├── Our Infra
│   └── Our Certificates
│
├── OUR PRODUCTS
│   │
│   ├── STEEL PRODUCTS
│   │   ├── Railings Turnkey Project
│   │   ├── SS Benches
│   │   ├── SS Dustbin
│   │   ├── SS Bicycle Stand
│   │   ├── SS Bollards
│   │   ├── SS Bus Shelter
│   │   ├── SS Design Steel Furniture
│   │   ├── SS Safety Door & Frames
│   │   └── SS Drywall Stone Cladding Clamp
│   │
│   ├── INDUSTRIAL PROJECTS
│   │   ├── Gratings
│   │   ├── Turnkey Projects
│   │   ├── Expansion Joint
│   │   ├── Custom Fabrication
│   │   └── SS Corner Guard
│   │
│   ├── INTERIOR PROJECTS
│   │   ├── SS Planters
│   │   ├── Residential Railing
│   │   ├── SS Cladding
│   │   ├── PVD Design Furniture
│   │   ├── Metal Wall Art
│   │   ├── Water Jet Steel Design
│   │   └── SS PVD Coated Screens & Partitions
│   │
│   ├── EXTERIOR PROJECTS
│   │   ├── SS Cladding
│   │   ├── SS Railing
│   │   ├── Facades
│   │   ├── Canopies
│   │   ├── SS Benches
│   │   ├── Pergola
│   │   └── SS Swing
│   │
│   └── ARTS & SCULPTURES
│
├── OUR PROJECTS
├── LATEST UPDATES
└── CONTACT US
```

This is essentially a three-level SEO architecture:

``` text
Major Category → Product/Capability → Individual Detail Page
```

That is a good foundation and should be retained.

------------------------------------------------------------------------

# 3. Homepage Layout --- Current Structural Flow

The homepage can be decomposed into these reusable sections:

``` text
01 Global Header / Navigation
02 Hero / Image Slider
03 Design / Execution / SS Solutions Value Blocks
04 Company Introduction
05 Trust / Experience Claims
06 Specialisation Categories
07 Management / MD Profile
08 Satisfied Client Logos
09 Testimonial / Performance Area
10 Numerical Statistics
11 Project Enquiry CTA + Form
12 Successfully Completed Projects
13 Company Highlights
14 Presence / Location
15 Latest Updates
16 Quality Statement
17 Footer
```

This is a long homepage, designed to establish credibility before asking
for a lead.

------------------------------------------------------------------------

# 4. Header & Navigation

The site exposes both corporate pages and a large product hierarchy
directly through navigation.

### Strength

Visitors can discover many individual services/products without needing
multiple intermediate pages.

### Weakness

The hierarchy is large enough to become visually and cognitively heavy.

### Recommended redesign

Use a structured mega menu:

``` text
SOLUTIONS
──────────────────────────────────────────────────
Steel Products      Industrial       Interior
Railings            Gratings         Planters
Benches             Expansion        Cladding
Bollards            Fabrication      Furniture
Bus Shelters        Corner Guards    Screens

Exterior            Arts & Sculptures
Facades             Custom Art
Canopies
Pergolas

[VIEW ALL SOLUTIONS →]
```

Recommended top-level navigation:

``` text
LOGO | Solutions | Industries | Projects | Capabilities | About | Resources | REQUEST QUOTE
```

------------------------------------------------------------------------

# 5. Hero / Slider

The opening area uses large construction/architecture/project imagery.
The website therefore positions Real Ferro around **project capability
and execution**, not merely commodity steel supply.

One visible brand statement is:

> "A Solid Project will be Found when you have our Crew Around."

### Recommended modern hero

``` text
┌───────────────────────────────────────────────────────────┐
│ LARGE REAL PROJECT / STAINLESS STEEL INSTALLATION IMAGE  │
│                                                           │
│ ENGINEERED STAINLESS-STEEL SOLUTIONS                      │
│ FROM FABRICATION TO TURNKEY EXECUTION                     │
│                                                           │
│ Design, fabrication and execution for industrial,         │
│ architectural and infrastructure projects.                │
│                                                           │
│ [EXPLORE SOLUTIONS] [DISCUSS YOUR PROJECT]                │
└───────────────────────────────────────────────────────────┘
```

A single focused hero would communicate the proposition more clearly
than multiple generic slides.

------------------------------------------------------------------------

# 6. Three Value-Proposition Blocks

The homepage communicates three ideas:

-   A World Class & Impactful Designs
-   Complemented With The World-Class Execution
-   Efficient Stainless Steel Solutions

These function as three feature/value cards.

Recommended structure:

``` text
[ICON]                 [ICON]                 [ICON]
DESIGN                 EXECUTION              SS SOLUTIONS
Short benefit          Short benefit          Short benefit
```

Keep this concept, but rewrite the text into concise professional B2B
copy.

------------------------------------------------------------------------

# 7. About / Corporate Credibility Section

The homepage positions Real Ferro as a turnkey solution provider with
manufacturing plants, engineers, and execution capability.

It also presents claims such as:

-   Award Winning Company
-   ISO Certified Company of India
-   More Than 20+ Years of Experience

A major issue is that the supporting areas currently include **Lorem
Ipsum placeholder copy**. Placeholder content on a corporate engineering
site materially reduces perceived trust.

### Better structure

``` text
ABOUT REAL FERRO

Engineering Stainless-Steel Solutions Since 2005

80–120 word company introduction.

20+ YEARS        IN-HOUSE          TURNKEY
EXPERIENCE       MANUFACTURING     EXECUTION

[DISCOVER OUR COMPANY →]
```

Every certification/award claim should link to supporting evidence.

------------------------------------------------------------------------

# 8. Specialisation Section

The site organizes capabilities into:

1.  Steel Products
2.  Industrial Infra Projects
3.  Interior Projects
4.  Exterior Projects
5.  Arts & Sculptures

This is one of the strongest structural ideas on the site.

Recommended card:

``` text
┌────────────────────────────┐
│ REAL CATEGORY IMAGE        │
│                            │
│ INDUSTRIAL PROJECTS        │
│ Engineered fabrication for │
│ demanding environments.    │
│                            │
│ Gratings                   │
│ Expansion joints           │
│ Custom fabrication         │
│ Corner guards              │
│                            │
│ Explore Industrial →       │
└────────────────────────────┘
```

Use 4:3 real project photography and consistent card dimensions.

------------------------------------------------------------------------

# 9. Management Section

The homepage contains a management profile for **Mr. P. L. Choudhary,
Managing Director**, with leadership and experience content.

Recommended layout:

``` text
┌─────────────────────┬────────────────────────────────────┐
│ LEADERSHIP PHOTO    │ OUR MANAGEMENT                     │
│                     │ Mr. P. L. Choudhary                │
│                     │ Managing Director                   │
│                     │                                    │
│                     │ Short leadership/company story     │
│                     │                                    │
│                     │ [MORE ABOUT US →]                  │
└─────────────────────┴────────────────────────────────────┘
```

This is useful in relationship-driven B2B sales and should remain.

------------------------------------------------------------------------

# 10. Client / Social Proof Section

The homepage includes an **Our Satisfied Clients** area. Visible logo
references include L&T, Shapoorji Pallonji, AFCONS and Samsung C&T.

This should be one of the strongest trust sections.

Recommended treatment:

``` text
TRUSTED BY LEADING ORGANISATIONS

[L&T] [AFCONS] [SAMSUNG C&T] [CLIENT] [CLIENT] [CLIENT]

                 [VIEW PROJECT PORTFOLIO →]
```

Prefer a static, well-spaced logo grid over aggressive carousel
animation.

------------------------------------------------------------------------

# 11. Testimonial / Performance Area

The site includes:

-   "What Our Clients Says About Real Ferro-Projects"
-   "Professional and reliable partner"
-   Construction / Production / Deadline percentage indicators

The extracted page currently shows these percentages as `0%`, possibly
due to animation or incomplete implementation.

### Recommendation

Remove arbitrary percentage bars unless they communicate verifiable
KPIs. Replace them with concrete project evidence, testimonials,
completion figures, or certification proof.

------------------------------------------------------------------------

# 12. Statistics

The homepage surfaces numbers including:

-   30+ Award Winning
-   99% Projects Done
-   120+ Professional Staff
-   200+ Worldwide Clients

Recommended presentation:

``` text
20+               200+               120+               XXX+
YEARS              CLIENTS            TEAM                PROJECTS
EXPERIENCE
```

Only publish metrics that can be clearly defined and substantiated.

------------------------------------------------------------------------

# 13. Enquiry / Lead Capture

A major homepage CTA says:

**You Have Projects? Let's Discuss With Us**

Current form fields include:

-   Name
-   Contact Details
-   Email ID
-   Subject
-   City
-   Product

For B2B industrial procurement, the form should be upgraded to:

``` text
Name *
Company
Phone / WhatsApp *
Email
Requirement Type *
Project Location
Message
Upload Drawing / BOQ / Specification

[REQUEST A QUOTE]
```

**Drawing/BOQ upload is especially important** because serious project
enquiries often begin with drawings, specifications, dimensions or
tender documents.

------------------------------------------------------------------------

# 14. Completed Project Portfolio

The homepage highlights projects such as:

-   Mauritius Metro Rail Projects
-   Adani Shantigram, Ahmedabad
-   Statue of Unity
-   Tamil Nadu Government Multi Super Speciality Hospital
-   Dhirubhai Ambani International School, BKC Mumbai

These are high-value trust assets.

Recommended card metadata:

``` text
PROJECT NAME
Location
Sector
Client
Scope of work
Material / grade
Year
```

Each should link to a full case study rather than only a gallery.

------------------------------------------------------------------------

# 15. Project Case Study Template

``` text
PROJECT HERO
Project Name
Location
Sector
Year
Large Image

PROJECT OVERVIEW
Client
Scope
Materials
Execution
Completion

THE REQUIREMENT

OUR ENGINEERING SOLUTION

FABRICATION

INSTALLATION

PROJECT GALLERY

RESULT

RELATED PROJECTS

[DISCUSS A SIMILAR PROJECT]
```

This would dramatically improve the site's usefulness for architects,
consultants, EPC contractors and procurement teams.

------------------------------------------------------------------------

# 16. Company Highlights & Manufacturing

The homepage contains a Company Highlights area, while the About page
describes manufacturing infrastructure in Ahmedabad and a
quality-assurance team.

This should become a dedicated proof section:

``` text
WHY REAL FERRO

✓ In-house fabrication
✓ Engineering & detailing
✓ Project execution
✓ Quality-controlled production
✓ Custom stainless-steel fabrication
✓ Architectural metalwork
✓ Turnkey capability
```

Use authentic factory, machinery, fabrication, inspection and
installation photography.

------------------------------------------------------------------------

# 17. Presence / Location

The site includes an **Our Presence** section and company-location link.

Recommended design:

``` text
OUR PRESENCE

[MAP]

Manufacturing Unit
Ahmedabad, Gujarat

Project Reach
India + International Markets

[GET DIRECTIONS] [CONTACT TEAM]
```

------------------------------------------------------------------------

# 18. Latest Updates / SEO Content

The homepage contains a Latest Update section with recent articles on
individual stainless-steel applications and products.

This supports:

-   organic search
-   long-tail keywords
-   product education
-   internal linking
-   topical authority

Homepage should show only three recent articles:

``` text
[IMAGE]
CATEGORY
Article Title
2-line summary
Read Article →
```

------------------------------------------------------------------------

# 19. Footer

Current footer content includes:

-   company quality statement
-   Home
-   About Company
-   Our Products
-   Our Projects
-   Latest Updates
-   Contact Us
-   phone
-   two email addresses
-   Ahmedabad address
-   map link
-   copyright

Recommended architecture:

``` text
┌──────────────────────────────────────────────────────────┐
│ LOGO          SOLUTIONS       COMPANY        CONTACT     │
│                                                          │
│ Short         Steel           About          Phone       │
│ company       Industrial      Projects       Email       │
│ statement     Interior        Quality        Address     │
│               Exterior        Certificates               │
│                                                          │
│ LinkedIn / Instagram / YouTube                           │
├──────────────────────────────────────────────────────────┤
│ © Real Ferro Projects Pvt. Ltd.   Privacy | Terms        │
└──────────────────────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 20. Our Products Landing Page

`/our-products/` acts as a category gateway for:

-   Steel Products
-   Industrial Projects
-   Interior Projects
-   Exterior Projects
-   Arts & Sculptures

The architecture is correct. Improve the visual presentation with a
large editorial image grid:

``` text
┌──────────────────────────┬──────────────────────────┐
│ STEEL PRODUCTS           │ INDUSTRIAL PROJECTS      │
│ image                    │ image                    │
│ Explore →                │ Explore →                │
├──────────────────────────┼──────────────────────────┤
│ INTERIOR                 │ EXTERIOR                 │
│ image                    │ image                    │
│ Explore →                │ Explore →                │
└──────────────────────────┴──────────────────────────┘
┌─────────────────────────────────────────────────────┐
│ ARTS & SCULPTURES                                   │
└─────────────────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 21. Steel Products Category Page

The Steel Products page contains individual cards/links for railings,
benches, dustbins, bicycle stands, bollards, bus shelters, furniture,
safety doors/frames and cladding clamps.

Recommended responsive grid:

``` text
Desktop: 3 cards per row
Tablet:  2 cards per row
Mobile:  1 card per row
```

Card anatomy:

``` text
PRODUCT IMAGE
Product Name
1–2 line description
View Specifications →
Request Quote →
```

------------------------------------------------------------------------

# 22. Individual Product Page Template

Every product/service page should use one consistent template:

``` text
Breadcrumb
Home > Solutions > Steel Products > SS Bollards

PRODUCT HERO
Product name
Commercial/technical summary
Main image
[REQUEST QUOTE]

PRODUCT OVERVIEW

KEY FEATURES

TECHNICAL SPECIFICATIONS
• Material
• Grade
• Dimensions
• Thickness
• Finish
• Standards
• Customization

APPLICATIONS

FINISH OPTIONS

PROJECT / INSTALLATION GALLERY

WHY REAL FERRO

RELATED PROJECTS

RELATED PRODUCTS

FAQ

SEND YOUR REQUIREMENT
[Upload Drawing / BOQ]
```

This would improve both SEO and buyer decision-making.

------------------------------------------------------------------------

# 23. About Company Page

The About page currently mixes:

-   company story
-   leadership
-   quality
-   manufacturing infrastructure
-   raw-material/product capabilities

Recommended split:

``` text
ABOUT
├── Company Overview
├── Our Story
├── Leadership
├── Manufacturing Infrastructure
├── Quality & Certifications
├── Industries Served
└── Presence
```

This prevents the company story from becoming overloaded.

------------------------------------------------------------------------

# 24. Visual Design Direction

The appropriate design language is:

**Premium Industrial Minimalism**

Use:

-   white/off-white backgrounds
-   charcoal typography
-   steel grey
-   restrained brand accent
-   large authentic project images
-   disciplined grid
-   generous whitespace
-   strong sans-serif headings
-   clean technical icons
-   subtle transitions
-   minimal decorative effects

Avoid:

-   unnecessary gradients
-   generic construction stock photos
-   dense text blocks
-   excessive animations
-   template filler content
-   inconsistent button styles

------------------------------------------------------------------------

# 25. Typography

Recommended:

``` text
H1: 48–64px desktop / 34–40px mobile / 700
H2: 36–44px desktop / 28–32px mobile / 700
H3: 22–28px / 600
Body: 16–18px / 400 / 1.55–1.7 line-height
Metadata: 13–14px / 500
```

Suitable families:

-   Inter
-   Manrope
-   Plus Jakarta Sans
-   DM Sans

Inter or Manrope would fit an engineering brand particularly well.

------------------------------------------------------------------------

# 26. Grid & Spacing

Recommended desktop:

``` text
Max content width: 1200–1320px
Horizontal padding: 32–48px
Section spacing: 88–120px
Card gap: 24–32px
```

Mobile:

``` text
Horizontal padding: 20px
Section spacing: 56–72px
Card gap: 16–20px
```

Use an 8px spacing system:

``` text
8 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 120
```

------------------------------------------------------------------------

# 27. Image Strategy

The strongest visual assets should be **real work**, not decorative UI.

Priority:

1.  completed projects
2.  product installations
3.  fabrication facility
4.  machinery
5.  close-up workmanship
6.  site execution
7.  quality inspection
8.  project teams
9.  landmark projects

Recommended ratios:

``` text
Hero:             16:7 or 16:8
Category cards:   4:3
Product cards:    4:3 / 1:1
Project cards:    4:3
Case-study hero:  16:9
Blog cards:       16:9
```

------------------------------------------------------------------------

# 28. Reusable Design Components

``` text
01 Header
02 Mega Menu
03 Mobile Navigation Drawer
04 Hero
05 Breadcrumb
06 Section Heading
07 Value Proposition Card
08 Category Card
09 Product Card
10 Project Card
11 Client Logo Grid
12 Statistics Counter
13 Leadership Profile
14 Testimonial
15 Certification Card
16 Infrastructure Gallery
17 CTA Banner
18 Enquiry Form
19 Blog Card
20 FAQ Accordion
21 Related Products
22 Related Projects
23 Contact Card
24 Map
25 Footer
```

Building the site around these components makes future product expansion
much easier.

------------------------------------------------------------------------

# 29. Conversion Architecture

``` text
Google / Referral / Direct
          ↓
Relevant Landing Page
          ↓
Understand Capability
          ↓
Inspect Product / Service
          ↓
See Real Project Evidence
          ↓
Validate Trust
          ↓
REQUEST QUOTE
          ↓
Upload Specification / BOQ
          ↓
Sales Follow-up
```

Important product pages should expose three conversion points:

``` text
Top:    [REQUEST QUOTE]
Middle: [DISCUSS YOUR REQUIREMENT]
Bottom: [SEND DRAWING / BOQ]
```

------------------------------------------------------------------------

# 30. CTA System

Use consistent action-oriented wording:

**Primary:** REQUEST A QUOTE\
**Secondary:** DISCUSS YOUR PROJECT\
**Product:** SEND YOUR REQUIREMENT\
**Technical:** UPLOAD DRAWING / BOQ\
**Contact:** TALK TO OUR TEAM

Replace vague labels such as repeated "Click Here" with descriptive
actions.

------------------------------------------------------------------------

# 31. Mobile Experience

Recommended mobile flow:

``` text
Logo + Menu
Hero
Primary CTA
Trust Strip
Solutions
Why Real Ferro
Featured Projects
Clients
Statistics
Enquiry CTA
Latest Insights
Footer
```

Recommended sticky mobile conversion bar:

``` text
┌───────────────────────────────────┐
│  CALL  │  WHATSAPP  │  ENQUIRE  │
└───────────────────────────────────┘
```

------------------------------------------------------------------------

# 32. Content / UX Issues Identified

### Placeholder content

Lorem Ipsum is visible in corporate credibility sections.

### Repetition

Some value and project sections appear duplicated in the rendered
homepage content.

### Inconsistent capitalization

Examples include mixed title/case styles across headings and category
labels.

### Copy quality

Several descriptions need professional grammar and editorial rewriting.

### Generic CTA labels

"View More", "Click Here" and "Read More" are overused.

### Ambiguous statistics

Metrics need definitions and evidence.

### Broad positioning

Raw materials, fabrication, architectural products and turnkey project
execution appear together without a sufficiently clear hierarchy.

### Navigation density

The offering taxonomy is useful but should be presented through a better
mega menu.

------------------------------------------------------------------------

# 33. Recommended New Homepage Wireframe

``` text
┌────────────────────────────────────────────────────────────┐
│ TOP CONTACT BAR                                            │
├────────────────────────────────────────────────────────────┤
│ LOGO  Solutions Projects Industries About Resources [RFQ] │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                    HERO PROJECT IMAGE                      │
│                                                            │
│ ENGINEERED STAINLESS-STEEL SOLUTIONS                       │
│ FROM FABRICATION TO TURNKEY EXECUTION                      │
│                                                            │
│ [EXPLORE SOLUTIONS] [DISCUSS YOUR PROJECT]                 │
├────────────────────────────────────────────────────────────┤
│ CLIENT / CERTIFICATION TRUST STRIP                         │
├────────────────────────────────────────────────────────────┤
│ OUR SOLUTIONS                                              │
│ Steel | Industrial | Interior | Exterior | Arts           │
├────────────────────────────────────────────────────────────┤
│ WHY REAL FERRO                                             │
│ Experience | Manufacturing | Engineering | Turnkey        │
├────────────────────────────────────────────────────────────┤
│ FEATURED PROJECTS                                          │
│ [Metro] [Statue of Unity] [Adani]                         │
│ [VIEW ALL PROJECTS]                                        │
├────────────────────────────────────────────────────────────┤
│ MANUFACTURING & INFRASTRUCTURE                             │
│ Image + capability content                                 │
├────────────────────────────────────────────────────────────┤
│ TRUSTED BY LEADING ORGANISATIONS                           │
│ Client logo grid                                           │
├────────────────────────────────────────────────────────────┤
│ PROJECT / COMPANY STATISTICS                               │
├────────────────────────────────────────────────────────────┤
│ INDUSTRIES WE SERVE                                        │
├────────────────────────────────────────────────────────────┤
│ QUALITY & CERTIFICATIONS                                   │
├────────────────────────────────────────────────────────────┤
│ HAVE A PROJECT?                                            │
│ Send drawing, BOQ or requirement                           │
│ [REQUEST QUOTE] [UPLOAD BOQ]                              │
├────────────────────────────────────────────────────────────┤
│ LATEST INSIGHTS                                            │
├────────────────────────────────────────────────────────────┤
│ LOCATION / PRESENCE                                        │
├────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└────────────────────────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 34. Recommended Final Site Architecture

``` text
HOME

SOLUTIONS
├── Steel Products
├── Industrial Solutions
├── Interior Solutions
├── Exterior / Architectural Solutions
└── Arts & Sculptures

INDUSTRIES
├── Infrastructure
├── Commercial
├── Residential
├── Industrial
├── Hospitality
└── Public Sector

PROJECTS
├── All Projects
└── Individual Case Studies

CAPABILITIES
├── Design & Engineering
├── Fabrication
├── Finishing / PVD
├── Installation
└── Turnkey Execution

ABOUT
├── Company
├── Leadership
├── Infrastructure
├── Quality
├── Certifications
└── Presence

RESOURCES
├── Insights
├── Product Guides
└── Latest Updates

CONTACT / REQUEST QUOTE
```

------------------------------------------------------------------------

# 35. SEO Architecture

Preserve the site's category-to-detail approach, but make URLs
consistent:

``` text
/solutions/
/solutions/steel-products/
/solutions/steel-products/ss-bollards/

/solutions/industrial/
/solutions/industrial/gratings/

/solutions/interior/
/solutions/interior/pvd-screens/

/solutions/exterior/
/solutions/exterior/facades/

/projects/
/projects/mauritius-metro/

/industries/
/industries/infrastructure/

/about/
/about/infrastructure/
/about/quality-certifications/

/insights/
```

Each page should serve a distinct search intent and avoid
thin/overlapping pages.

------------------------------------------------------------------------

# 36. Recommended Homepage Order

``` text
01 Header
02 Hero
03 Trust / Client Strip
04 Solutions
05 Why Real Ferro
06 Featured Projects
07 Manufacturing Capability
08 Industries Served
09 Client Logos
10 Statistics
11 Quality / Certifications
12 Project Enquiry CTA
13 Latest Insights
14 Location / Presence
15 Footer
```

The intended user journey is:

**Understanding → Relevance → Proof → Trust → Conversion**

------------------------------------------------------------------------

# 37. What Should Be Preserved

1.  Deep categorized product architecture.
2.  Separate project portfolio.
3.  Leadership credibility.
4.  Client logos.
5.  Manufacturing/infrastructure content.
6.  Landmark project references.
7.  Direct enquiry mechanism.
8.  Blog/latest-update system.
9.  Presence/location information.
10. Individual SEO landing pages for important products.

------------------------------------------------------------------------

# 38. What Should Be Redesigned First

Priority order:

1.  Header + product navigation.
2.  Hero/value proposition.
3.  Homepage content order.
4.  Typography and spacing system.
5.  Copy and grammar.
6.  Placeholder/duplicate content.
7.  Product cards.
8.  Product detail template.
9.  Project case-study template.
10. CTA system.
11. Enquiry/BOQ form.
12. Mobile navigation.
13. Statistics and credibility proof.
14. Client section.
15. Footer.

------------------------------------------------------------------------

# 39. Core UX Principle

Within seconds, the website should answer:

``` text
1. WHAT does Real Ferro do?
2. WHO does it serve?
3. WHAT can it manufacture or execute?
4. WHY should a buyer trust it?
5. HOW can a buyer send a requirement?
```

Everything else should support these five questions.

------------------------------------------------------------------------

# 40. Design Formula

``` text
Authentic Project Photography
            +
Strong Industrial Typography
            +
Simple Category Navigation
            +
Technical Product Information
            +
Major Project Case Studies
            +
Client / Certification Proof
            +
Persistent Quote CTA
            =
High-Trust B2B Industrial Website
```

------------------------------------------------------------------------

# 41. Conclusion

RealFerro.com has a strong underlying content base: a broad product
portfolio, significant project references, management information,
client proof, manufacturing capability and many search-oriented product
pages.

Its primary opportunity is **presentation and hierarchy rather than lack
of content**. A redesign should retain this depth while replacing the
template-like presentation with a disciplined premium industrial system.

The ideal experience should emphasize:

**Real projects + technical capability + manufacturing credibility +
simplified navigation + strong enquiry paths.**

That would make the website much more effective for architects, EPC
contractors, infrastructure companies, consultants, developers,
procurement teams and industrial buyers.

------------------------------------------------------------------------

## Review Scope

This analysis was prepared from a live review of RealFerro.com on 13
September 2026, including the homepage and representative About,
Products, Steel Products, Projects, Turnkey and product/project content.
Website content may change over time.

---

# 42. Complete Image Architecture & Asset Management Plan

Images should be managed as a structured **website asset system**, not selected independently while individual pages are being built.

The objective is to achieve:

- consistent visual quality across the site
- predictable aspect ratios
- fast page loading
- easy replacement of assets
- clean developer handoff
- strong SEO/accessibility
- separation between authentic company photography and generated supporting visuals

## 42.1 Image Source Priority

Use this priority order:

```text
1. Authentic company/project photography
2. Authentic product photography
3. Authentic factory/infrastructure photography
4. Authentic management/team photography
5. Official client logos and certificates
6. Professionally created diagrams/renders
7. AI-generated supporting application imagery
8. Licensed stock photography only when unavoidable
```

Real projects and products should remain the dominant visual language. AI imagery should support missing application/context imagery rather than falsely represent completed projects, facilities, clients, certifications or company personnel.

## 42.2 Asset Folder Structure

```text
/public/images
│
├── /brand
│   ├── logo.svg
│   ├── logo-white.svg
│   └── favicon.svg
│
├── /hero
│   ├── home-hero-01.webp
│   ├── solutions-hero.webp
│   ├── projects-hero.webp
│   └── about-hero.webp
│
├── /products
│   ├── /railings
│   ├── /benches
│   ├── /bollards
│   ├── /bus-shelters
│   ├── /gratings
│   ├── /expansion-joints
│   ├── /cladding
│   ├── /facades
│   ├── /canopies
│   ├── /pergolas
│   └── /custom-fabrication
│
├── /industries
│   ├── infrastructure
│   ├── commercial
│   ├── residential
│   ├── industrial
│   ├── hospitality
│   └── public-sector
│
├── /projects
│   ├── /mauritius-metro
│   │   ├── cover.webp
│   │   ├── gallery-01.webp
│   │   ├── gallery-02.webp
│   │   └── gallery-03.webp
│   └── /project-slug
│
├── /infrastructure
│   ├── factory-exterior.webp
│   ├── fabrication.webp
│   ├── machinery.webp
│   ├── welding.webp
│   └── quality-inspection.webp
│
├── /management
├── /clients
├── /certificates
├── /blog
└── /icons
```

## 42.3 Image Formats

Recommended delivery formats:

| Asset | Preferred format |
|---|---|
| Photography | AVIF + WebP fallback |
| Product photography | WebP/AVIF |
| Logos | SVG where possible |
| Icons | SVG |
| Certificates | WebP preview + original PDF where required |
| Transparent product cut-outs | WebP/PNG |
| Diagrams | SVG |
| Social/Open Graph image | JPG/WebP |

Do not convert an official logo into a generated approximation.

## 42.4 Standard Image Ratios

```text
Homepage hero             16:7 or 16:8
Inner-page hero           16:6–16:8
Category card             4:3
Product listing card      4:3
Product hero              4:3 or 1:1
Product gallery           4:3
Project listing card      4:3
Project case-study hero   16:9
Infrastructure image      3:2 / 4:3
Leadership portrait       4:5
Blog thumbnail            16:9
Client logo container     3:2
Certificate thumbnail     3:4 / native ratio
```

All cards within the same component should use the same aspect ratio.

## 42.5 Homepage Image Inventory

### Header

**Required assets**
- primary logo
- inverted/white logo where required
- favicon

**Source:** official brand files only.

### Hero

**Quantity:** 1 primary image; optionally 2–3 curated alternatives.

**Content:** landmark stainless-steel installation, infrastructure project, architectural metalwork or large-scale execution.

**Ratio:** 16:7–16:9.

**Source:** authentic completed project preferred.

**Rule:** avoid visually busy imagery behind important copy. Maintain negative space where headline and CTA are positioned.

### Trust / Client Strip

**Assets:** official client logos.

**Treatment:** consistent bounding boxes and optical size rather than forcing every logo to the exact same physical dimensions.

**Source:** official supplied files.

### Solutions Cards

One primary image for each major category:

```text
Steel Products
Industrial Projects
Interior Projects
Exterior Projects
Arts & Sculptures
```

**Ratio:** 4:3.

**Source:** real category-defining project/product image preferred.

### Why Real Ferro

Use 1–2 strong images showing:

- manufacturing
- fabrication
- engineering
- quality inspection
- installation

Avoid generic office-team stock photography.

### Featured Projects

One cover image per featured project.

**Ratio:** 4:3.

Each image must correspond to the actual named project.

### Manufacturing & Infrastructure

Recommended image set:

```text
Factory exterior
Fabrication floor
Cutting/forming machinery
Welding
Polishing/finishing
Quality inspection
Packing/dispatch
```

### Industries

Industry images should show the **application environment**, not just a generic stainless-steel texture.

Example:

```text
Infrastructure → metro/station/public infrastructure
Commercial → premium commercial building
Industrial → processing/fabrication environment
Hospitality → architectural stainless application
Residential → premium railing/interior metalwork
Public Sector → public infrastructure installation
```

### Quality & Certifications

Use original certificate scans/previews.

Never generate certification imagery or marks.

### Enquiry CTA

Use either:

- subtle project photograph
- fabrication detail
- architectural steel detail

The image should not overpower the form.

### Latest Insights

One 16:9 editorial image per article.

### Presence

Use an interactive map or purpose-built map graphic rather than a decorative stock image.

## 42.6 Product Page Image Inventory

Each important product should ideally have:

```text
01 Hero image
02 Clean product image
03 Detail / close-up
04 Alternate angle
05 Installation/application image
06 Second application image
07 Finish/material detail
08 Technical diagram where useful
```

Minimum viable product page:

```text
1 hero
2 gallery images
1 application image
```

Premium product page:

```text
1 hero
4–6 product/gallery images
2–4 real application images
1 dimensions/specification diagram
1 finish/material chart
```

## 42.7 Project Case-Study Image Inventory

Each project should have a dedicated directory and metadata.

Recommended assets:

```text
cover.webp
overview.webp
detail-01.webp
detail-02.webp
installation-01.webp
installation-02.webp
completed-01.webp
completed-02.webp
```

Optional:

```text
before.webp
during.webp
after.webp
drawing.webp
```

Project pages must never use AI imagery to imply that an unbuilt/generated scene is an actual completed Real Ferro project.

## 42.8 Product Asset Manifest

Maintain metadata separately from page code.

Example:

```yaml
product: SS Bollards
slug: ss-bollards

images:
  hero:
    file: /images/products/bollards/hero.webp
    alt: Stainless steel bollards installed at commercial entrance
    source: real
    ratio: 4:3

  gallery:
    - file: /images/products/bollards/gallery-01.webp
      alt: Polished stainless steel bollard close-up
      source: real

    - file: /images/products/bollards/gallery-02.webp
      alt: Stainless steel bollards installed in pedestrian zone
      source: real

  applications:
    - file: /images/products/bollards/application-commercial.webp
      alt: Stainless steel bollards at commercial development
      source: real
```

This makes images replaceable without restructuring the entire page.

## 42.9 Project Asset Manifest

```yaml
project: Mauritius Metro Rail Project
slug: mauritius-metro

images:
  cover:
    file: /images/projects/mauritius-metro/cover.webp
    source: real

  gallery:
    - /images/projects/mauritius-metro/gallery-01.webp
    - /images/projects/mauritius-metro/gallery-02.webp
    - /images/projects/mauritius-metro/gallery-03.webp

metadata:
  client: "..."
  location: Mauritius
  sector: Infrastructure
  year: "..."
```

## 42.10 AI Image Usage Rules

AI-generated imagery can be useful for:

- generic application environments
- conceptual industry visuals
- blog/editorial illustrations
- background visuals
- non-project technical concepts
- missing category imagery during development/prototyping

Do **not** use AI-generated images as evidence of:

- completed projects
- actual factories
- real employees/management
- actual clients
- certifications
- awards
- testing facilities that do not exist
- inventory/stock claims

AI imagery should be labeled internally in the asset manifest:

```yaml
source: ai-generated
```

This prevents it from accidentally becoming project evidence later.

## 42.11 Consistent AI Visual Style

If generated supporting imagery is required, keep one visual language:

```text
Photorealistic B2B industrial photography
Premium modern environment
Realistic stainless-steel material and reflections
Neutral white / light-grey / architectural surroundings
Natural or controlled commercial lighting
Minimal clutter
Accurate engineering proportions
No logos unless intentionally supplied
No text rendered into image
No fake certificates
No fake workers where unnecessary
No unrealistic machinery
```

### Example AI Prompt — Industrial Application

```text
Photorealistic premium industrial photography of a modern stainless-steel
fabrication/application environment, realistic brushed and polished stainless
steel surfaces, technically plausible construction, clean modern facility,
controlled natural-commercial lighting, neutral white and light-grey
environment, subtle industrial depth, high material accuracy, premium global
engineering-company aesthetic, no text, no logo, no watermark, no exaggerated
reflections, 4:3 composition.
```

### Example AI Prompt — Architectural Exterior

```text
Photorealistic contemporary commercial architecture featuring premium
stainless-steel facade and railing applications, technically realistic
fabrication and installation, clean modern building, natural daylight,
architectural photography, restrained neutral palette, realistic metal
reflections, high-end engineering portfolio aesthetic, no text, no logo,
no watermark, 16:9.
```

### Example AI Prompt — Product Application

```text
Photorealistic stainless-steel [PRODUCT] installed in a realistic
[APPLICATION ENVIRONMENT], accurate dimensions and engineering construction,
premium brushed stainless finish, clean professional B2B product photography,
natural perspective, realistic shadows and reflections, minimal background
clutter, no text, no logo, no watermark, 4:3.
```

## 42.12 Image Naming Convention

Use predictable SEO/developer-friendly names.

Good:

```text
ss-bollard-commercial-entrance.webp
stainless-steel-railing-metro-project.webp
factory-stainless-steel-fabrication.webp
mauritius-metro-railing-detail.webp
```

Avoid:

```text
IMG_9382.jpg
final-new-2.jpg
photo1.png
WhatsApp-Image.jpeg
banner-final-final.jpg
```

Recommended convention:

```text
{category}-{subject}-{application}-{view}.{format}
```

## 42.13 Responsive Image Sizes

Do not send desktop-sized images to every device.

Suggested generated widths:

```text
480px
768px
1024px
1440px
1920px
```

Example HTML concept:

```html
<img
  src="/images/products/bollards/ss-bollard-1024.webp"
  srcset="
    /images/products/bollards/ss-bollard-480.webp 480w,
    /images/products/bollards/ss-bollard-768.webp 768w,
    /images/products/bollards/ss-bollard-1024.webp 1024w,
    /images/products/bollards/ss-bollard-1440.webp 1440w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Stainless steel bollards installed at a commercial entrance"
/>
```

## 42.14 Performance Rules

Target approximate optimized file sizes:

```text
Hero image             180–450 KB
Large project image    150–350 KB
Product card            50–140 KB
Gallery image           100–250 KB
Blog thumbnail          60–150 KB
Logo                    ideally <50 KB
Icon                    ideally <15 KB
```

These are practical targets rather than hard limits; visual quality takes priority where necessary.

Implementation:

- AVIF/WebP
- responsive `srcset`
- lazy loading below the fold
- explicit width/height to prevent layout shift
- preload only the primary hero
- CDN/image optimization
- avoid unnecessary background videos
- do not lazy-load the LCP hero image
- cache immutable versioned assets

## 42.15 SEO & Accessibility

Every meaningful image needs descriptive alt text.

Bad:

```text
alt="image"
alt="product"
alt="steel"
```

Better:

```text
alt="Brushed stainless steel bollards installed outside a commercial building"
```

Decorative images should use empty alt text:

```html
alt=""
```

Do not keyword-stuff alt attributes.

## 42.16 Image Cropping Rules

Never manually create random crops for each page.

Define component crop behavior:

```text
Hero              object-fit: cover
Product card      object-fit: cover / contain depending on product
Project card      object-fit: cover
Client logo       object-fit: contain
Certificate       object-fit: contain
Portrait          object-fit: cover
```

Set focal points for important photography so mobile cropping does not cut out the main subject.

## 42.17 Image Quality Checklist

Before an image is approved:

```text
[ ] Correct subject/product
[ ] Correct project association
[ ] High enough source resolution
[ ] No visible compression artifacts
[ ] Correct aspect ratio
[ ] Straight perspective where appropriate
[ ] Realistic stainless-steel appearance
[ ] Consistent lighting/style
[ ] No accidental third-party watermark
[ ] No fake text/logo
[ ] Correct filename
[ ] Alt text prepared
[ ] Source ownership/licensing known
[ ] Optimized WebP/AVIF generated
[ ] Mobile crop checked
```

## 42.18 Image CMS Fields

For a scalable CMS, each image should support:

```text
Asset ID
File
Title
Alt Text
Caption
Source Type
Photographer / Rights
Product
Project
Industry
Location
Focal Point
Desktop Crop
Mobile Crop
Date
Usage Notes
```

This lets the same approved photograph safely appear on several relevant pages.

## 42.19 Image Workflow

```text
Collect raw images
      ↓
Classify by project/product/category
      ↓
Remove duplicates / low-quality assets
      ↓
Confirm ownership and factual association
      ↓
Select hero-quality photographs
      ↓
Crop to standard ratios
      ↓
Retouch lightly where necessary
      ↓
Generate responsive sizes
      ↓
Convert to WebP/AVIF
      ↓
Create filenames + alt text
      ↓
Add to asset manifest/CMS
      ↓
Assign to page components
      ↓
Desktop + mobile visual QA
```

## 42.20 Image Replacement Strategy

The website should never depend on one hard-coded image.

A card component receives an asset reference:

```text
ProductCard
  title
  description
  image_id
  url
```

The CMS/manifest resolves `image_id` to the current approved asset.

This means a poor photograph can later be replaced without changing layout or page code.

---

# 43. Page-by-Page Image Requirement Matrix

| Page/Section | Qty | Ratio | Preferred Source | Priority |
|---|---:|---|---|---|
| Homepage Hero | 1–3 | 16:7 | Real flagship project | Critical |
| Solution Categories | 5 | 4:3 | Real products/projects | Critical |
| Why Real Ferro | 2–4 | 3:2 | Real factory/team/process | High |
| Featured Projects | 3–6 | 4:3 | Real completed projects | Critical |
| Manufacturing | 6–10 | 3:2/4:3 | Real facility | Critical |
| Industries | 6 | 4:3 | Real/AI supporting | Medium |
| Client Logos | As available | contain | Official | Critical |
| Certificates | As available | native | Original | High |
| Management | 1+ | 4:5 | Professional real portrait | High |
| Product Listing | 1/product | 4:3 | Real product | Critical |
| Product Detail | 4–10/product | 4:3 | Real + application | Critical |
| Project Listing | 1/project | 4:3 | Real project | Critical |
| Project Detail | 6–15/project | mixed | Real project | Critical |
| Blog | 1/article | 16:9 | Real/AI editorial | Medium |
| Contact | 0–1 | wide | Real facility/project | Low |

---

# 44. Recommended Initial Asset Production Plan

Before development reaches final visual QA, prepare:

```text
Brand
  2–3 logo variants

Homepage
  1 flagship hero
  5 solution images
  3–6 featured project covers
  4 manufacturing images
  client logo set
  certification set

Products
  minimum 4 images for each priority product

Projects
  minimum 6 images for each flagship case study

About
  factory exterior
  factory interior
  machinery
  fabrication
  quality inspection
  leadership portrait

Industries
  1 strong visual per industry

Blog
  reusable editorial visual system
```

If authentic images are currently limited, build the website with clearly marked temporary placeholders/generated application visuals and progressively replace them as real photography becomes available.

---

# 45. Final Image Principle

The website's visual credibility should follow this rule:

```text
REAL COMPANY CLAIM
      ↓
REAL PHOTOGRAPH / DOCUMENT / PROJECT EVIDENCE

GENERIC CONCEPT OR APPLICATION
      ↓
REAL OR AI-SUPPORTED VISUAL
```

For an industrial B2B website, authentic project evidence is more persuasive than visually spectacular but unverifiable imagery.

The final asset system should therefore optimize for:

**Authenticity + Consistency + Technical Accuracy + Performance + Easy Replacement.**

---

# 46. Ramdev Enterprises — Brand-Specific Premium Website Design System

> **Important:** The Real Ferro website analyzed above is a structural/reference benchmark only. The new website must be an original **Ramdev Enterprises** experience, not a visual clone. Its design system should be driven by the supplied Ramdev Enterprises identity and the red/blue RE monogram.

## 46.1 Confirmed Company Identity

```text
Company:
Ramdev Enterprises

Address:
1st Floor 49/2 Vembuliamman Koil Street,
Karanai, Chennai - 600130

Region:
Chengalpattu, Tamil Nadu (TN - 33)
PIN Code 600130
India

Phone:
91 76507264

Email:
ramdeventerprises15@gmail.com

GSTIN:
33DVEPK6522D1ZX

PAN:
DVEPK6522D
```

The supplied **RE monogram** is the master visual reference for the website theme. The logo uses a strong combination of red and blue with a circular/sweeping form and geometric letter construction.

**Brand rule:** use the original supplied logo asset. Do not redraw, reinterpret, stretch, recolor or alter the proportions of the mark.

---

# 47. Premium Brand Direction

The target aesthetic is:

## **Precision Industrial Luxury**

The website should combine:

```text
Premium corporate design
        +
Modern engineering aesthetic
        +
Architectural whitespace
        +
Strong red/blue brand identity
        +
High-end stainless-steel imagery
        +
Technical credibility
```

The site should feel closer to a premium global engineering/materials company than a conventional local trading/manufacturing template.

### Desired brand attributes

```text
PRECISE
RELIABLE
ENGINEERED
MODERN
PREMIUM
CONFIDENT
TECHNICAL
TRUSTWORTHY
```

### Avoid

```text
Cheap catalogue appearance
Excessive gradients
Heavy shadows
Crowded cards
Overuse of red
Overuse of blue
Generic stock-business people
Bright rainbow iconography
Animated counters everywhere
Large blocks of centered text
Tiny typography
Old-fashioned sliders
Glossy 2010-style UI
```

---

# 48. Brand Color System

The supplied logo establishes the primary red/blue identity. Exact production values should ultimately be sampled from the original vector/high-resolution logo file. Until that asset is available, use the following **working design tokens** rather than treating screenshot-derived colors as final brand specifications.

## Primary Brand Blue

```text
Working token: #164A9C
Usage:
- primary brand accents
- navigation emphasis
- links
- technical labels
- selected tabs
- line details
```

## Deep Navy

```text
#0B1F3A

Usage:
- premium dark sections
- footer
- large headlines
- dark hero overlays
- navigation text
```

## Brand Red

```text
Working token: #E3222A

Usage:
- primary CTA emphasis
- small highlights
- active states
- key numbers
- graphical accents
```

Red should be used deliberately. It is more premium when it occupies approximately **5–10% of the interface** rather than dominating every section.

## Steel Blue

```text
#416B82
```

Useful for subtle industrial details and secondary information.

## Cool Steel Grey

```text
#66727D
```

## Border Grey

```text
#DCE2E7
```

## Light Surface

```text
#F5F7F9
```

## Warm White

```text
#FCFCFB
```

## Pure White

```text
#FFFFFF
```

## Graphite Text

```text
#17202A
```

### Recommended ratio

```text
White / light surfaces     65–70%
Navy / graphite            18–22%
Blue                        7–10%
Red                          3–6%
```

This creates a premium result while still making the logo identity immediately recognizable.

---

# 49. Gradient Policy

Do not build the entire site around gradients.

A subtle brand gradient may be used selectively:

```css
linear-gradient(120deg, #164A9C 0%, #0B1F3A 100%)
```

For occasional brand highlights:

```css
linear-gradient(120deg, #164A9C 0%, #164A9C 55%, #E3222A 100%)
```

Never use a bright red-to-blue gradient behind large amounts of body copy.

Best locations:

- tiny CTA accent
- hero graphic line
- loading state
- selected visual detail
- abstract brand motif

---

# 50. Signature Brand Motif

The circular sweep surrounding the **RE** logo can inspire a subtle proprietary graphic language without recreating the logo itself.

Use abstract:

- arcs
- partial circles
- sweeping lines
- precision rings
- thin engineering curves

Example:

```text
                         ╭───────────────╮
                    ╭────╯               ╰────╮
                   │                         │
        CONTENT    │       PRODUCT           │
                   │       VISUAL            │
                    ╰────╮               ╭────╯
                         ╰───────────────╯
```

The motif should appear at very low visual intensity in:

- hero backgrounds
- section transitions
- product-detail graphics
- CTA backgrounds

Do not repeat the actual RE logo as a decorative pattern.

---

# 51. Typography — Premium Ramdev System

Recommended primary typeface:

## **Manrope**

Use for:

- headings
- navigation
- buttons
- statistics
- section labels

Recommended body:

## **Inter**

Use for:

- paragraphs
- technical specifications
- forms
- tables
- metadata

Fallback:

```css
font-family:
"Manrope",
"Inter",
system-ui,
-apple-system,
"Segoe UI",
sans-serif;
```

### Type scale

```text
Display XL
72px / 1.02 / 700
Desktop hero only

H1
56–64px / 1.08 / 700

H2
40–48px / 1.12 / 700

H3
28–32px / 1.2 / 650

H4
20–24px / 1.3 / 650

Body Large
18–20px / 1.65 / 400

Body
16–17px / 1.65 / 400

Small
14px / 1.5 / 500

Eyebrow
12–13px / uppercase / 700
letter-spacing: 0.12em
```

### Headline style

Prefer:

```text
ENGINEERED FOR
DEMANDING APPLICATIONS.
```

over long centered marketing sentences.

---

# 52. Logo Usage

The supplied RE logo should become the visual anchor of the site.

## Header

Recommended:

```text
┌──────────────────────────────────────────────────────────┐
│ [RE LOGO] RAMDEV ENTERPRISES                             │
└──────────────────────────────────────────────────────────┘
```

If the supplied brand artwork contains only the monogram, the company name can be rendered beside it in the website typography rather than modifying the logo artwork.

### Clear space

Minimum clear space around the mark:

```text
0.5 × logo height
```

### Minimum digital size

```text
Desktop header: approximately 52–68px mark height
Mobile: approximately 42–50px
```

### Do not

- stretch
- rotate
- add drop shadows
- add outlines
- recolor
- redraw
- place on visually noisy imagery without a clean container
- distort letter geometry

---

# 53. Header — Premium Design

## Desktop

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Chennai, Tamil Nadu   |   Email   |   Phone                           │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│ [RE] RAMDEV ENTERPRISES      Products  Industries  Solutions           │
│                              Projects  About  Resources   [GET QUOTE]  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Styling

```text
Height: 82–92px
Background: rgba(255,255,255,.94)
Backdrop blur: 16–20px when sticky
Bottom border: 1px solid #E8EDF1
Logo left
Navigation right
CTA far right
```

### Quote CTA

White text on brand red:

```text
GET A QUOTE →
```

Use a 10–12px radius rather than an exaggerated pill shape.

---

# 54. Premium Hero Direction

The hero must immediately communicate the business and should be visually stronger than the Real Ferro reference.

Recommended structure:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  PRECISION. RELIABILITY. PERFORMANCE.      PREMIUM INDUSTRIAL IMAGE    │
│                                                                         │
│  STAINLESS STEEL &                       ┌───────────────────────────┐   │
│  INDUSTRIAL SOLUTIONS                    │                           │   │
│  BUILT TO PERFORM.                       │  Polished SS products /   │   │
│                                         │  industrial application   │   │
│  High-quality material and              │                           │   │
│  requirement-driven solutions.          │                           │   │
│                                         └───────────────────────────┘   │
│  [EXPLORE PRODUCTS] [REQUEST A QUOTE]                                  │
│                                                                         │
│  ───────────── blue precision line ─────────────── red accent           │
└─────────────────────────────────────────────────────────────────────────┘
```

### Background

Preferred:

```text
#FCFCFB / #F7F9FA
```

not a full dark hero.

Use dark navy for selected premium sections later on the page.

### Hero image style

- photorealistic
- stainless-steel reflections
- high-end commercial lighting
- technically accurate
- uncluttered
- neutral industrial environment
- no fake branding
- no rendered text
- product dominant

---

# 55. Homepage — Ramdev Enterprises Final Premium Structure

```text
01 Utility Bar
02 Premium Sticky Header
03 Hero
04 Trust / Capability Strip
05 Product Categories
06 About Ramdev Enterprises
07 Why Choose Us
08 Featured Products
09 Industries / Applications
10 Technical / Sourcing Capability
11 Featured Projects / Applications
12 Quality Commitment
13 Statistics / Proof
14 Enquiry / RFQ Section
15 Latest Insights
16 Contact / Location
17 Premium Footer
```

---

# 56. Trust Strip

Immediately below hero:

```text
┌─────────────────────────────────────────────────────────────────────┐
│ QUALITY MATERIAL  │  REQUIREMENT-BASED  │  RELIABLE SOURCING       │
│                   │  SOLUTIONS           │  & SERVICE               │
└─────────────────────────────────────────────────────────────────────┘
```

Use thin vertical separators, minimal line icons and no heavy cards.

---

# 57. Product Category Design

Instead of conventional boxed catalogue cards, use large editorial cards.

```text
OUR PRODUCT RANGE

┌───────────────────────────────┬───────────────────────────────┐
│                               │                               │
│   PRODUCT PHOTOGRAPH          │   PRODUCT PHOTOGRAPH          │
│                               │                               │
│   STAINLESS STEEL             │   INDUSTRIAL                  │
│   PRODUCTS                    │   SOLUTIONS                   │
│                               │                               │
│   Explore Collection →        │   Explore Solutions →         │
└───────────────────────────────┴───────────────────────────────┘
```

Recommended interaction:

```text
Default:
clean image + title

Hover:
image scale 1.025
subtle dark overlay
arrow shifts 4px
thin red underline appears
```

No dramatic animation.

---

# 58. Premium Product Card

```text
┌───────────────────────────────┐
│                               │
│                               │
│      CLEAN PRODUCT IMAGE      │
│                               │
│                               │
├───────────────────────────────┤
│ STAINLESS STEEL               │  ← eyebrow / category
│                               │
│ SS ROUND BARS                 │
│                               │
│ Precision material for        │
│ machining and components.     │
│                               │
│ View Details              →   │
└───────────────────────────────┘
```

### Styling

```text
Background: white
Border: #E4E8EC
Radius: 14–18px
Shadow: almost invisible
Image surface: #F5F7F8
```

Hover should elevate by only 2–4px.

---

# 59. Dark Premium Section

Use deep navy strategically after several light sections.

Example:

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   WHY RAMDEV ENTERPRISES                                      │
│                                                               │
│   RELIABLE INDUSTRIAL                                         │
│   SOURCING, WITHOUT                                           │
│   COMPROMISE.                                                 │
│                                                               │
│   01  Requirement-driven sourcing                             │
│   02  Quality-focused material selection                      │
│   03  Responsive commercial support                           │
│   04  Application-oriented solutions                          │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

Background:

```text
#0B1F3A
```

Text:

```text
#FFFFFF / #DCE5EF
```

Numbers/accent:

```text
brand red
```

This creates visual rhythm and premium contrast.

---

# 60. About Ramdev Enterprises Section

Recommended layout:

```text
ABOUT RAMDEV ENTERPRISES

┌───────────────────────────────┬───────────────────────────────────────┐
│                               │                                       │
│  REAL INDUSTRIAL / PRODUCT    │  BUILT AROUND RELIABLE               │
│  IMAGE                        │  INDUSTRIAL SUPPLY.                   │
│                               │                                       │
│                               │  Company introduction                 │
│                               │                                       │
│                               │  [ABOUT OUR COMPANY →]                │
└───────────────────────────────┴───────────────────────────────────────┘
```

Do not fabricate years of experience, client counts, certifications, manufacturing capability or project figures. Add these only after they are verified.

---

# 61. Industry / Application Cards

Recommended sectors should be based on actual Ramdev Enterprises customers and products once confirmed.

Possible design structure:

```text
INDUSTRIES WE SUPPORT

[Food & Dairy]
[Pharmaceutical]
[Chemical Processing]
[Engineering]
[Infrastructure]
[Fabrication]
```

These labels are placeholders until the company's actual market coverage is confirmed.

Cards should use authentic application photography or clearly generic supporting visuals—not fake project evidence.

---

# 62. Technical Specification UI

The website should look technically competent.

Product pages should include elegant specification tables:

```text
SPECIFICATIONS

┌──────────────────────┬──────────────────────────────┐
│ Material             │ Stainless Steel             │
├──────────────────────┼──────────────────────────────┤
│ Grades               │ Based on available product  │
├──────────────────────┼──────────────────────────────┤
│ Dimensions           │ Product-specific            │
├──────────────────────┼──────────────────────────────┤
│ Finish               │ Product-specific            │
├──────────────────────┼──────────────────────────────┤
│ Custom Requirement   │ Contact Sales               │
└──────────────────────┴──────────────────────────────┘
```

Do not publish unverified specifications.

---

# 63. RFQ Experience

The primary conversion should be **Request for Quotation**, not generic Contact Us.

## CTA

```text
REQUEST A QUOTE
```

## Form

```text
Full Name *
Company Name
Phone / WhatsApp *
Email *
Product / Requirement *
Quantity
Grade / Specification
Delivery Location
Requirement Details

[UPLOAD DRAWING / BOQ / REQUIREMENT]

[SUBMIT REQUIREMENT →]
```

### Premium layout

```text
┌───────────────────────────┬───────────────────────────────────────┐
│ LET'S DISCUSS YOUR        │ Name          Company                │
│ REQUIREMENT.              │                                       │
│                           │ Phone         Email                   │
│ Send your material,       │                                       │
│ dimensions, drawings or   │ Product / Requirement                │
│ BOQ for a quotation.      │                                       │
│                           │ Upload                                │
│                           │                                       │
│                           │ [SUBMIT REQUIREMENT →]                │
└───────────────────────────┴───────────────────────────────────────┘
```

---

# 64. Buttons

## Primary

```text
Background: #E3222A
Text: #FFFFFF
Height: 48–52px
Padding: 0 24–28px
Radius: 10–12px
```

## Secondary

```text
Background: transparent
Border: 1px solid #164A9C
Text: #164A9C
```

## Text link

```text
View Details →
```

Use a subtle arrow animation on hover.

---

# 65. Iconography

Use one consistent SVG icon family.

Style:

```text
1.5–1.75px stroke
rounded joins
minimal
technical
monochrome
```

Colors:

```text
Navy / Steel Blue
Red only for active/highlight state
```

Avoid multicolor illustration icon sets.

---

# 66. Borders, Radius & Shadows

Premium industrial interfaces should be crisp rather than overly soft.

```text
Small radius:   8px
Button:         10–12px
Card:           14–18px
Large panel:    20–24px
```

Borders:

```text
1px #E2E7EB
```

Shadow example:

```css
box-shadow: 0 12px 35px rgba(11,31,58,.06);
```

Do not apply shadows to every element.

---

# 67. Motion & Micro-Interactions

Animation should communicate quality rather than spectacle.

Recommended:

```text
Section reveal: 300–500ms
Card hover: 200ms
Image zoom: 1.02–1.035
Arrow translation: 3–5px
Header transition: 200ms
Accordion: 200–250ms
```

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Avoid:

- parallax overload
- spinning icons
- bouncing CTAs
- excessive scroll animations
- auto-playing hero carousels

---

# 68. Premium Image Direction for Ramdev Enterprises

The visual library should follow one art direction:

## **Clean Precision Industrial Photography**

Characteristics:

```text
Realistic stainless steel
Cool neutral environment
Bright controlled highlights
Deep but clean shadows
Minimal clutter
Architectural composition
Premium commercial photography
Accurate material reflections
No excessive blue tint
No orange cinematic grading
```

### Backgrounds

Preferred:

- white
- soft grey
- brushed-metal neutral
- premium industrial setting
- architectural environment

### Product isolation

Use:

```text
soft #F4F6F7 background
```

instead of pure white for every card. This allows polished stainless steel to retain edge definition.

---

# 69. Hero Image Prompt Template

For generic/supporting imagery only:

```text
Ultra-photorealistic premium B2B industrial campaign photograph featuring
high-quality stainless-steel products in a sophisticated modern industrial
environment, technically accurate geometry, immaculate brushed and polished
metal surfaces, realistic reflections, controlled soft commercial lighting,
cool neutral white and graphite environment, clean architectural composition,
substantial negative space for website copy, premium global engineering-brand
aesthetic, understated and precise, no people unless necessary, no text,
no logo, no watermark, no fake certificates, 16:9.
```

---

# 70. Product Image Prompt Template

```text
Ultra-photorealistic studio product photograph of [EXACT PRODUCT],
technically accurate stainless-steel construction, premium brushed/polished
finish, realistic edge definition and reflections, three-quarter camera
angle, soft controlled commercial studio lighting, subtle light-grey
background #F4F6F7, realistic contact shadow, high-end industrial catalogue
photography, no text, no logo, no watermark, 4:3.
```

---

# 71. Application Image Prompt Template

```text
Ultra-photorealistic commercial photograph of [PRODUCT] used in a realistic
[INDUSTRY/APPLICATION], technically plausible installation, premium stainless
steel surfaces, accurate engineering proportions, clean modern environment,
natural perspective, restrained neutral palette, controlled realistic
lighting, premium B2B engineering photography, no text, no logo, no
watermark, 4:3.
```

---

# 72. Homepage Image Plan — Ramdev Enterprises

| Section | Asset | Ratio | Art Direction |
|---|---|---|---|
| Hero | Flagship stainless/industrial visual | 16:9 | Premium, minimal, high-impact |
| Product Categories | 1/category | 4:3 | Clean product/application |
| About | 1–2 | 3:2 | Authentic company/product visual |
| Why Us | 1 | 4:3 | Technical/industrial |
| Featured Products | 1/product | 4:3 | Consistent studio treatment |
| Industries | 1/industry | 4:3 | Application environment |
| Projects/Applications | 1/item | 4:3 | Authentic where claimed |
| RFQ | 1 subtle background | wide | Dark industrial detail |
| Contact | Map | wide | Clean functional map |

---

# 73. Desktop Homepage Visual Rhythm

Do not make every section white.

Recommended sequence:

```text
HEADER             WHITE
HERO               WARM WHITE
TRUST STRIP        WHITE
PRODUCTS            LIGHT GREY
ABOUT               WHITE
WHY US              DEEP NAVY
FEATURED PRODUCTS   WHITE
INDUSTRIES          LIGHT GREY
PROJECTS            WHITE
QUALITY             DEEP NAVY / WHITE
RFQ                 LIGHT GREY + DARK PANEL
INSIGHTS            WHITE
CONTACT             LIGHT GREY
FOOTER              DEEP NAVY
```

This creates premium visual pacing.

---

# 74. Premium Mobile Direction

Mobile must preserve the same brand quality.

```text
[RE LOGO]                       [MENU]

PRECISION. RELIABILITY.
PERFORMANCE.

STAINLESS STEEL &
INDUSTRIAL SOLUTIONS
BUILT TO PERFORM.

Supporting copy

[REQUEST A QUOTE]
[EXPLORE PRODUCTS]

[HERO IMAGE]

Trust strip

Product categories

About

Dark Why Us section

Featured products

Industries

RFQ

Contact

Footer
```

Sticky bottom action bar:

```text
┌────────────────────────────────────┐
│ CALL      WHATSAPP      GET QUOTE │
└────────────────────────────────────┘
```

Use only if these contact channels are confirmed.

---

# 75. Premium Footer — Ramdev Enterprises

```text
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│ [RE LOGO] RAMDEV ENTERPRISES                                        │
│                                                                     │
│ Premium company positioning                                         │
│                                                                     │
│ PRODUCTS          COMPANY          SUPPORT          CONTACT          │
│ Product groups    About            RFQ              Chennai         │
│ Applications      Industries       Enquiry          Phone           │
│                   Quality          Resources        Email           │
│                                                                     │
│ ──────────────────────────────────────────────────────────────────  │
│ GSTIN: 33DVEPK6522D1ZX                                             │
│                                                                     │
│ © Ramdev Enterprises                         Privacy | Terms         │
└─────────────────────────────────────────────────────────────────────┘
```

Background:

```text
#081A30
```

Do not expose PAN publicly in the footer unless there is a specific business/legal reason to do so. GSTIN is commonly useful for B2B identity; PAN should be treated more conservatively.

---

# 76. Homepage Hero Copy Options

### Option A — Recommended

```text
PRECISION. RELIABILITY. PERFORMANCE.

STAINLESS STEEL &
INDUSTRIAL SOLUTIONS
BUILT TO PERFORM.

Requirement-driven material and industrial solutions
for demanding applications.

[EXPLORE PRODUCTS] [REQUEST A QUOTE]
```

### Option B

```text
ENGINEERED FOR
REAL-WORLD INDUSTRY.

Reliable stainless-steel and industrial material solutions
backed by responsive service.

[VIEW PRODUCTS] [SEND REQUIREMENT]
```

### Option C

```text
MATERIALS THAT
MOVE INDUSTRY.

Premium stainless-steel and industrial solutions
for engineering, fabrication and project requirements.

[EXPLORE RANGE] [GET A QUOTE]
```

Final copy should be adjusted once Ramdev Enterprises' exact product catalogue and business model are confirmed.

---

# 77. Visual Quality Standard

Every page should pass these tests:

```text
Does it look premium at 1440px?
Does it remain clean at 1920px?
Does mobile look intentionally designed?
Is the logo always crisp?
Is red being used sparingly?
Are product images consistent?
Are real projects clearly separated from conceptual imagery?
Is typography visibly hierarchical?
Is there enough whitespace?
Are CTAs obvious without being aggressive?
Are technical details easy to scan?
Does every section have a commercial purpose?
```

---

# 78. Final Ramdev Enterprises Design Formula

```text
RE RED + BLUE IDENTITY
        +
WHITE ARCHITECTURAL SPACE
        +
DEEP NAVY CONTRAST
        +
PREMIUM STAINLESS-STEEL PHOTOGRAPHY
        +
LARGE MODERN TYPOGRAPHY
        +
TECHNICAL PRODUCT INFORMATION
        +
MINIMAL MOTION
        +
HIGH-QUALITY RFQ EXPERIENCE
        =
PREMIUM MODERN RAMDEV ENTERPRISES WEBSITE
```

The Real Ferro reference should therefore influence **information architecture and content depth**, while the actual Ramdev Enterprises website should have its own stronger, cleaner and more premium visual identity.

