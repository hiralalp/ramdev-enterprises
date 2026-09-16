# Ramdev Enterprises

A responsive, requirement-led B2B website built from the supplied specifications. The active catalogue contains 52 collections in five groups: 41 from the supplied local Ramdev Steel Industries website and 11 backed by owner-supplied product photo folders. All remain unapproved until owner review. The original 27 proposed products are retained as legacy data. No clients, certifications, case studies, technical ratings or company history have been invented.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Lucide, React Hook Form and Zod. Server components are the default; the navigation, filters and forms are interactive client components. Manrope and IBM Plex Sans are self-hosted at build time through `next/font`. Original abstract artwork is generated with Sharp; it is not a product photograph. Motion is limited to CSS transitions and a reduced-motion-aware entrance.

## Development

Requires Node.js 20.9 or newer and npm. Use the current Node LTS for deployment.

```sh
npm install
npm run dev
npm run lint
npm run build
npm start
```

The local URL is http://localhost:3000. Use `npm run dev -- --port 3001` if needed. Dependencies are pinned by the lockfile; CI can use `npm ci`. Google font downloads must be accessible during the initial production build.

## Environment

Create a local `.env.local` using the keys in `.env.example`. Never commit secrets.

| Variable                          | Purpose                                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Public canonical URL; set the actual HTTPS domain before production build. Defaults to localhost.    |
| `NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS` | Defaults to `false`. Set to `true` only for local `npm run dev` owner review. Ignored in production. |
| `CONTACT_TO_EMAIL`                | Destination business inbox; defaults to the supplied company email.                                  |
| `RESEND_API_KEY`                  | Optional server-only Resend credential.                                                              |
| `CONTACT_FROM_EMAIL`              | Sender address on a verified Resend domain; required for live mail delivery.                         |

Without both mail settings, valid submissions receive HTTP 503 with an honest unavailable message. The form retains entered values and offers an email draft. No uploads are stored. Email attachments directly to the company. Mail integration is isolated in `src/lib/mail.ts`; the API validates input, limits body size, rejects cross-origin browser requests and uses a honeypot. Rate limiting is process-local (five attempts per minute per forwarded IP); configure a trusted proxy and distributed rate limiting or platform firewall before a high-traffic launch. Do not treat that local limiter as a cross-instance security guarantee.

## Content

- `src/data/company.ts`: verified contact information. PAN is never rendered publicly. The supplied phone is incomplete; no call or WhatsApp link is generated.
- `src/data/reference-products.ts`: active 41 collections, category and canonical route mapping, specifications, FAQs and approval list.
- `src/data/reference-catalogue.json`: generated source-page, banner and gallery-image mapping with intrinsic dimensions.
- `src/data/products.ts`: retained 27 legacy briefs; combines the reference collections and 11 photo-backed products into the active catalogue. Unmatched legacy URLs remain accessible in local draft preview.
- `src/data/supplied-product-photos.json`: generated mapping of 11 product folders and all 172 supplied images, with dimensions and checksums.
- `src/data/industries.ts`: application areas, not customer claims.
- `src/data/projects.ts`: intentionally empty until case studies are approved.
- `src/data/insights.ts`: original general procurement guides.
- `src/data/navigation.ts`: shared navigation.
- `src/types/index.ts`: content contracts.

### Product Approval and Preview

The active `approvedCollectionSlugs` list is initially empty. Public listings, navigation, home sections, related products and form suggestions include only approved entries. Unapproved detail URLs return 404. Drafts never enter the sitemap. With no approved entries, the product listing shows a direct-enquiry state.

For local owner review, set `NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS=true` and run the development server. Preview surfaces show Draft badges and an owner-review notice, set `noindex, nofollow`, and disallow crawlers. This is a development preview, not an authenticated admin portal: keep it local. `npm run build` and `npm start` ignore draft preview, even if the flag is accidentally enabled.

For an isolated Windows PowerShell preview, use the following in a separate terminal. Set the site URL to the exact preview address so canonical URLs and the form's allowed origin agree.

```powershell
$env:NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS = 'true'
$env:NEXT_PUBLIC_SITE_URL = 'http://127.0.0.1:3001'
npm run dev -- --hostname 127.0.0.1 --port 3001
```

After the owner confirms a reference-site collection, review its name, availability, scope, technical copy, FAQs and image publication rights; add its canonical slug to `approvedCollectionSlugs` in `src/data/reference-products.ts`, then rebuild and redeploy. For one of the 11 photo-backed products, set `approved: true` in its original `proposedProduct` brief in `src/data/products.ts`; its active entry inherits that flag. Approval is per product, not per category. Remove approval and rebuild to withdraw it. Never enable approval merely to populate a page.

The listing, filters, navigation, detail route and sitemap derive from the active catalogue. Collections use photographic banners, image-led cards, a gallery displayed in batches of 24, and a full-screen viewer with zoom, thumbnails and keyboard navigation through Yet Another React Lightbox. Design-specific enquiry links validate the image number server-side and prefill the collection, reference number and image path. Specification guidance, FAQs and related collections follow the gallery. Legacy detail pages retain the original procurement template.

To add an industry, provide its name, slug, description, challenges, applications and relevant product slugs in the industry data. Never imply an existing customer without evidence.

To add a project, add a `Project` record with an approved description, application and images. Until then the list shows the specified empty state and unknown detail URLs return 404.

To add an insight, add a typed article with title, slug, description, category, reading time and sections. Article metadata and JSON-LD are generated from that content. There are no fabricated publication dates.

## Approved Assets

Place approved assets in `public/images` and rebuild. Missing local assets fall back gracefully. Paths must start with `/images/`.

| Asset                | Expected path                                                             |
| -------------------- | ------------------------------------------------------------------------- |
| Official logo        | `public/images/brand/ramdev-logo.png`                                     |
| Homepage hero        | `public/images/hero/home-hero.webp`                                       |
| Product hero         | `public/images/products/{slug}/hero.webp`                                 |
| Product gallery      | `public/images/products/{slug}/gallery-01.webp` through `gallery-03.webp` |
| Product application  | `public/images/products/{slug}/application-01.webp`                       |
| Industry cover       | `public/images/industries/{slug}/cover.webp`                              |
| Infrastructure       | `public/images/infrastructure/overview.webp`                              |
| Projects / galleries | Set approved paths in typed data                                          |

The logo is rendered unchanged with `next/image`. In its absence, a typographic RE placeholder is used. The abstract hero at `public/images/art/material-study.webp` is original and can be regenerated with `node scripts/generate-art.mjs`. It is not evidence of inventory. Hero and content imagery use stable dimensions and responsive `next/image` sizing.

### Supplied Reference Site

All 1,691 image files under the supplied site's `img` directory were copied unchanged to `public/images/reference/ramdev-steels` (approximately 246 MB). Original names, directories and embedded branding are preserved. The source is the local `veer-steel-art` site, with the live design at https://ramdevsteels.in/. The importer extracts 41 actual HTML galleries; redirects and pages without galleries do not create empty collections. PVD and laser pages that reuse source images retain that mapping; images do not verify material or manufacturing process.

Reimport with `node scripts/import-reference-site.mjs "PATH_TO_LOCAL_VEER_STEEL_ART"`. The script verifies SHA-256 checksums and refuses to overwrite a different existing image. Generated source mapping is in `src/data/reference-catalogue.json`; `public/images/reference/manifest.json` records every original path, byte size and checksum. No source files are modified. The library is local and does not require the source website at runtime.

This supplied collection is not asserted to be open-licensed. Some images include other companies' watermarks, including Real Ferro. Confirm publication rights for each image before deployment; do not remove embedded attribution. The public `/image-credits` page distinguishes this source from the separately licensed Commons photos. Copying the source logo does not replace Ramdev Enterprises branding or contact details. Files under `public` can be fetched directly even when draft product pages are hidden; draft approval is not asset access control.

### Owner-Supplied Product Folders

Run `node scripts/map-product-photos.mjs` after updating the supplied `public/images/ss ...` folders. The mapper validates image decoding, records dimensions and SHA-256 hashes, and writes `src/data/supplied-product-photos.json` without changing originals. Folder `ss grattings` intentionally maps to Stainless Steel Gratings. All 172 images are used across 11 gallery pages; the first image in filename order is the card/hero image. Existing product-specific specifications, features, applications, FAQs and specifying guidance are retained. The gallery supports full-screen viewing and selected-image enquiries.

After including related collections, seven specification products still lack dedicated active collections and new photo folders: SS Drywall Stone Cladding Clamps, Turnkey Project Fabrication, Expansion Joints, Custom Stainless Steel Fabrication, Stainless Steel Cladding, Waterjet-Cut Steel Designs, and Custom Metal Arts & Sculptures. Their legacy preview pages remain available.

### Open-Licensed Reference Photographs

Product photography is sourced from Wikimedia Commons under the individual CC BY, CC BY-SA or CC0 licences recorded in `src/data/photo-credits.json`. Each record preserves the original metadata, creator, source page, download URL, licence URL, description, modifications and local placements. `/image-credits` provides public attribution, original-source links and downloadable website versions. Image licences remain in force independently of the site's copyright notice. Reference captions explicitly distinguish these images from Ramdev work; they do not approve any product, establish technical properties or imply endorsement.

The local WebP assets require no runtime external image service. Full images are fitted without destructive cropping. Original photographs are resized and converted, never recoloured to simulate stainless steel or PVD. Keep source credit and licence records with any future image changes. Replace reference photos with owner-approved product photography before representing actual supply.

The research cache `.photo-research/` is excluded from git. `scripts/source-photos.ps1` searches Commons in small cached batches; `scripts/download-review-photos.ps1` downloads specific candidates; `scripts/review-photos.mjs` makes a contact sheet. Human-reviewed selections are in `scripts/photo-selections.json`; `node scripts/import-photos.mjs` imports them from the research cache, refusing to overwrite a different existing image. These research tools are optional and are not required to build or serve the committed assets. On HTTP 429, stop and honour the host's rate limits; do not loop retries or bypass TLS validation.

Unfilled legacy gallery slots keep the branded fallback. Generic internet images were deliberately not placed in company infrastructure, logo or completed-project slots. Those require actual Ramdev assets.

## Tests

```sh
npm test
```

Browser tests use installed Google Chrome by default. Set `PLAYWRIGHT_CHANNEL=msedge` to use installed Edge. This avoids downloading a browser where a corporate certificate chain prevents the Playwright download. Do not disable TLS verification.

Browser tests cover the required viewport widths, route metadata, internal links, invalid slugs, menu keyboard behavior, product filtering, RFQ prefilling, client/server validation, honest unconfigured delivery and axe accessibility scans. Tests run against a local Next dev server, or reuse an existing server on port 3000. To test a production build, run `npm run build` and `npm start` first. Set `PLAYWRIGHT_BASE_URL` for another local port. Tests expect mail delivery to be unconfigured; do not run the delivery test against a live production inbox.

The default suite checks approved-only publishing, including all 52 active draft URLs returning 404 and no draft content in client chunks. For a separate local draft-preview server, set `PLAYWRIGHT_BASE_URL` to its URL and `PLAYWRIGHT_DRAFT_PREVIEW=true` when running tests. That mode checks all 52 detail pages, five group filters, design-specific RFQs, gallery pagination, viewer keyboard controls, responsive layouts, accessibility and mobile navigation. The owner-supplied page test checks all 172 new images, all 11 enquiry flows and desktop/mobile accessibility. `tests/catalogue.spec.ts` verifies the 1,691 imported and 172 supplied image checksums, source dimensions and related links, as well as the retained legacy specification and fail-closed policy. The preview test switch only selects expectations; it cannot enable draft publishing in a production server.

## Deployment

Import the repository into Vercel as a Next.js project, set environment variables, and deploy with `npm run build`. Alternatively run the production Node server with `npm start` behind a trusted HTTPS proxy. Set the real site URL before building so canonicals and sitemap use the public domain.

## Launch Checklist / Known TODOs

- Supply the official logo, favicon, approved hero and product imagery.
- Approve the catalogue, application copy and all business positioning.
- Confirm the complete telephone number before enabling telephone or WhatsApp links.
- Add only real approved projects, certificate assets and technical specifications.
- Configure and verify the mail provider and sender, then test delivery to the business inbox.
- Arrange legal review of the privacy and terms starter text and match retention practices to the notice.
- Configure production rate limiting, monitoring, backups and the final canonical domain.
- Run production Lighthouse checks on the deployed domain. Targets are performance 90+, accessibility 95+, best practices 95+, SEO 95+; scores must be measured, not assumed.
