# Ramdev Enterprises

A responsive industrial website positioning pre-engineered steel plants as the primary business. All 53 current collections are approved for publication in six groups: the primary plant offering, 41 collections from the supplied local Ramdev Steel Industries website and 11 additional products backed by owner-supplied photo folders. Future additions require explicit approval. The original 27 proposed products are retained as legacy data. No clients, certifications, case studies, technical ratings or company history have been invented.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Lucide, React Hook Form and Zod. Server components are the default; the navigation, filters and forms are interactive client components. Manrope and IBM Plex Sans are self-hosted at build time through `next/font`. Original abstract artwork is generated with Sharp; it is not a product photograph. Motion is limited to CSS transitions and a reduced-motion-aware entrance.

## Development

Requires Node.js 20.9 or newer and npm for local builds. Use the current Node LTS. Hostinger serves the exported files without Node.js.

```sh
npm install
npm run dev
npm run lint
npm run build
npm run build:hostinger
npm start
```

The development URL is http://localhost:3000. Use `npm run dev -- --port 3001` if needed. `npm start` previews the exported `out/` directory at http://localhost:3002. Dependencies are pinned by the lockfile; CI can use `npm ci`. Google font downloads must be accessible during the initial production build.

## Environment

Create a local `.env.local` using the keys in `.env.example`. Never commit secrets.

| Variable                          | Purpose                                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Public canonical URL. Production defaults to https://steelwayimpex.com; development defaults to localhost. |
| `NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS` | Defaults to `false`. Set to `true` only for local `npm run dev` owner review. Ignored in production. |

Contact and quote forms validate locally and open a prepared message at the WhatsApp destination configured in `src/data/company.ts`. All entered business fields are included, including quote-specific quantities, specifications, location and prefilled design references. Visitors must send the message within WhatsApp; the website does not claim delivery. Values remain in the form and an explicit WhatsApp link is available if the new tab is blocked. No WhatsApp API credential or mail configuration is needed for this workflow. No uploads are stored; attachments can be shared separately by email or WhatsApp.

The unused email API and mail helper have been removed for static hosting. Form validation and the honeypot run in the browser; there is no website backend, stored enquiry database or mail-service credential.

## Content

- `src/data/company.ts`: verified contact information. PAN is never rendered publicly. Phone, tel: link and WhatsApp link are confirmed and live (footer, mobile sticky bar and the floating WhatsApp button).
- `src/data/reference-products.ts`: active 41 collections, category and canonical route mapping, specifications, FAQs and approval list.
- `src/data/reference-catalogue.json`: generated source-page, banner and gallery-image mapping with intrinsic dimensions.
- `src/data/products.ts`: retained 27 legacy briefs; combines the primary plant offering, reference collections and 11 other photo-backed products into the active catalogue. Unmatched legacy URLs remain accessible in local draft preview.
- `src/data/supplied-product-photos.json`: generated mapping of 12 product folders and all 222 supplied images, with dimensions and checksums.
- `src/data/industries.ts`: application areas, not customer claims.
- `src/data/projects.ts`: intentionally empty until case studies are approved.
- `src/data/navigation.ts`: shared navigation.
- `src/types/index.ts`: content contracts.

### Product Approval and Preview

The owner requested all current product collections in the public menu. Public listings, navigation, home sections, related products and form suggestions include approved entries only. Unapproved detail URLs return 404 and drafts never enter the sitemap. Reference-site approvals use `approvedCollectionPages`; photo-backed entries use `approvedSuppliedSlugs`.

For local owner review, set `NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS=true` and run the development server. Preview surfaces show Draft badges and an owner-review notice, set `noindex, nofollow`, and disallow crawlers. This is a development preview, not an authenticated admin portal: keep it local. `npm run build` and `npm start` ignore draft preview, even if the flag is accidentally enabled.

For an isolated Windows PowerShell preview, use the following in a separate terminal. Set the site URL to the exact preview address so canonical URLs and the form's allowed origin agree.

```powershell
$env:NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS = 'true'
$env:NEXT_PUBLIC_SITE_URL = 'http://127.0.0.1:3001'
npm run dev -- --hostname 127.0.0.1 --port 3001
```

After the owner confirms a new reference-site collection, review its name, availability, scope, technical copy, FAQs and image publication rights; add its source page identifier to `approvedCollectionPages` in `src/data/reference-products.ts`, then rebuild and redeploy. For one of the photo-backed products, add its slug to `approvedSuppliedSlugs` in `src/data/products.ts`. Approval is per product, not per category. Remove approval and rebuild to withdraw it.

The listing, filters, navigation, detail route and sitemap derive from the active catalogue. Collections use photographic banners, image-led cards, a gallery displayed in batches of 24, and a full-screen viewer with zoom, thumbnails and keyboard navigation through Yet Another React Lightbox. Design-specific enquiry links validate the image number in the browser against the build-visible catalogue and prefill the collection, reference number and image path. Unapproved product data is not passed to the production form. Specification guidance, FAQs and related collections follow the gallery.

To add an industry, provide its name, slug, description, challenges, applications and relevant product slugs in the industry data. Never imply an existing customer without evidence.

The Industries page includes construction and interior design references from the existing supplied image collections. The Projects page presents pre-engineered steel building applications and project-scoping guidance, with photographs explicitly labelled as references rather than completed Ramdev work. Confirm publication rights before deployment.

To add a completed project, add a `Project` record with an approved description, application and images and restore a detail route with nonempty `generateStaticParams`. The empty project-detail route was removed for static export; unknown detail URLs return 404. Insights and its article routes have been removed and are excluded from navigation and the sitemap.

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

Run `node scripts/map-product-photos.mjs` after updating `public/images/pre engineered steel plant` or the supplied `public/images/ss ...` folders. The mapper validates image decoding, records dimensions and SHA-256 hashes, and writes `src/data/supplied-product-photos.json` without changing originals. Folder `ss grattings` intentionally maps to Stainless Steel Gratings. All 222 images are used across 12 gallery pages. The preferred plant hero is selected explicitly; other pages use the first image in filename order. Product-specific specifications, features, applications, FAQs and specifying guidance are retained. The gallery supports full-screen viewing and selected-image enquiries.

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

Browser tests cover responsive widths, route metadata, internal links, invalid slugs, keyboard menus, filters, client-side RFQ prefilling, WhatsApp message preparation and axe accessibility. WhatsApp opening is intercepted in the form test so no test enquiry is sent externally. To test exported files, build first and set `PLAYWRIGHT_STATIC_EXPORT=true`, `PLAYWRIGHT_DRAFT_PREVIEW=false`, and `PLAYWRIGHT_BASE_URL=http://localhost:3002`; the test runner can start a plain static server automatically. Otherwise tests use a local Next development server.

The production publication test checks all 53 current collection routes, sitemap entries, homepage cards and design-specific RFQs. Menu tests verify all six product groups, desktop scrolling and mobile navigation. For a separate local draft-preview server, set `PLAYWRIGHT_BASE_URL` to its URL and `PLAYWRIGHT_DRAFT_PREVIEW=true`; the preview switch cannot enable draft publishing in a production server. `tests/catalogue.spec.ts` verifies imported image checksums, source dimensions and related links, as well as the retained legacy specification and fail-closed policy for unapproved entries.

## Deployment

Run `npm run build:hostinger` to export the approved site for https://steelwayimpex.com and create `deployment/steelwayimpex-hostinger.zip`. Extract the ZIP contents directly into the domain's `public_html` folder. No Node.js process or server environment variables are required on Hostinger. See [HOSTINGER-DEPLOYMENT.md](HOSTINGER-DEPLOYMENT.md) for backup, upload, SSL, cache and verification steps.

Production uses Next.js `output: "export"`, trailing-slash directories and unoptimized local images. Hostinger's Apache/LiteSpeed reads `public/.htaccess` for security headers, directory indexes and the custom 404. Keep all exported Next route payload files alongside the HTML; do not use an SPA catch-all rewrite.

## Launch Checklist / Known TODOs

- Supply the official logo, favicon, approved hero and product imagery.
- Approve the catalogue, application copy and all business positioning.
- Add only real approved projects, certificate assets and technical specifications.
- Verify the business WhatsApp number and the prepared-message workflow on the deployed domain.
- Arrange legal review of the privacy and terms starter text and match retention practices to the notice.
- Configure SSL, hosting monitoring, backups and the final canonical domain.
- Run production Lighthouse checks on the deployed domain. Targets are performance 90+, accessibility 95+, best practices 95+, SEO 95+; scores must be measured, not assumed.
