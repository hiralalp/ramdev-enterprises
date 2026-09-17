# Hostinger Static Deployment

Target: **https://steelwayimpex.com**. Website branding remains **Ramdev Enterprises**.

## Build the Upload Package

Requires the local Node.js LTS toolchain. Hostinger does not need Node.js.

```powershell
npm ci
npm run build:hostinger
```

The command generates:

- `out/`: the complete static website.
- `deployment/steelwayimpex-hostinger.zip`: upload-ready archive, with `index.html` at its root.
- `deployment/SHA256SUMS.txt`: ZIP integrity checksum.
- `deployment/deployment-info.json`: build domain, timestamp and archive details.

The public domain defaults to `https://steelwayimpex.com`. To override it, set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin before running the command. It is baked into the build; changing hosting environment variables later does not change the files.

## Upload in hPanel

1. In Hostinger hPanel, open the hosting management screen for `steelwayimpex.com`, then **Files > File Manager**.
2. Back up or download the current contents of that domain's `public_html` before replacing an existing site. Confirm you are in the correct domain's folder.
3. Upload `deployment/steelwayimpex-hostinger.zip` to `public_html` and extract it there. For a slow or limited browser upload, transfer the contents of `out/` using an FTP client instead.
4. Confirm `public_html/index.html`, `public_html/.htaccess`, `public_html/_next/`, `public_html/images/` and `public_html/contact/index.html` exist. Do not nest the site inside `public_html/out/` or a ZIP-name folder.
5. After backing up the old site, remove conflicting default files such as an old `index.php` or `default.php`. Replace old WordPress/SPA rewrite rules with the supplied `.htaccess`; merge any hosting-specific rules deliberately rather than overwriting them blindly.
6. Preserve all exported files, including `.txt` route payloads, `__next.*` files and `_next` assets. Do not add a catch-all rewrite to `index.html`: each page has its own HTML file.
7. Delete the uploaded ZIP from `public_html` after extraction. Never upload `.env`, `.git`, `src`, `node_modules`, `.next` or the repository itself.
8. Confirm the domain points to this hosting plan. Activate SSL and Force HTTPS in hPanel. Configure the preferred non-www domain (`https://steelwayimpex.com`) and redirect www to it if both are enabled.
9. Purge Hostinger/CDN caches and check the live site in a private browser window.

## Verify After Upload

- Open `/`, `/about/`, `/quality/`, `/industries/`, `/projects/` and `/contact/` directly, then refresh each page.
- Open `/products/pre-engineered-steel-plants/`, load gallery images and test the lightbox.
- Open `/request-quote/?product=pre-engineered-steel-plants&design=1`; confirm the selected product and design details are prefilled.
- Complete the contact form. **Continue to WhatsApp** should prepare a message for `+91 91765 07264`; sending is completed by the visitor inside WhatsApp.
- Confirm `/sitemap.xml` and `/robots.txt` use `https://steelwayimpex.com`.
- Confirm a made-up URL and the removed `/insights/` URL show the custom 404 with HTTP status 404, not the homepage.
- Check the header, footer, menus, mobile layout and photos. Check HTTPS and response security headers on the actual host.

## Local Static Preview

```powershell
npm start
```

Open `http://localhost:3002`. This serves only `out/`, not a Next.js server. Stop it with Ctrl+C when finished. The local static server does not evaluate Apache/LiteSpeed `.htaccess`; verify those headers and custom error handling again on Hostinger.

## Publishing Notes

- All 53 current collections are published, grouped into six categories in the desktop and mobile product menus. Future additions remain subject to explicit approval through the catalogue allowlists; draft-preview flags still cannot publish unapproved entries in production.
- The supplied image library is copied into the export, including reference images not used by approved product pages. Public files are accessible directly; review image publication rights before upload. No third-party watermarks or credits are removed.
- The contact and quote forms work through WhatsApp. There is no email API, database, file-upload service, server-side form storage or automatic WhatsApp delivery.
- The empty project-detail template was removed because static export cannot generate an empty dynamic route. Restore a static detail route with `generateStaticParams` when approved case studies are ready; the Projects overview remains available.
- Image optimization is disabled at runtime so local images work without `/_next/image`. The full local image library makes the archive sizeable. Future image resizing should preserve required quality and attribution.
- Every content or configuration change requires rebuilding and uploading the new export. Keep a backup of the previous deployment, replace the generated site files together, and remove stale published routes when withdrawing content.