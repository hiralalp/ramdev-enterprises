import { createReadStream, createWriteStream } from "node:fs";
import { access, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { finished } from "node:stream/promises";
import { ZipArchive } from "archiver";

const root = fileURLToPath(new URL("../", import.meta.url));
const domain = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://steelwayimpex.com");
if (domain.protocol !== "https:" || domain.pathname !== "/" || domain.search || domain.hash || domain.username || domain.password || /^(localhost|127\.|\[::1\])/.test(domain.hostname)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be the public HTTPS domain without a path, query or credentials.");
}
if (!process.env.npm_execpath) throw new Error("Run this script with npm run build:hostinger.");
const output = path.join(root, "out");
const deployment = path.join(root, "deployment");
const zipName = "steelwayimpex-hostinger.zip";
await rm(output, { recursive: true, force: true });
const build = spawnSync(process.execPath, [process.env.npm_execpath, "run", "build"], {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: "production",
    NEXT_PUBLIC_SITE_URL: domain.origin,
    NEXT_PUBLIC_SHOW_DRAFT_PRODUCTS: "false",
  },
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);

for (const required of ["index.html", ".htaccess", "404.html", "request-quote/index.html", "products/pre-engineered-steel-plants/index.html", "sitemap.xml", "robots.txt"]) {
  await access(path.join(output, required));
}
const sitemap = await readFile(path.join(output, "sitemap.xml"), "utf8");
if (!sitemap.includes(`<loc>${domain.origin}`) || sitemap.includes("localhost")) {
  throw new Error("The generated sitemap does not match the deployment domain.");
}
await mkdir(deployment, { recursive: true });
const zipPath = path.join(deployment, zipName);
const zipStream = createWriteStream(zipPath);
const archive = new ZipArchive({ zlib: { level: 6 } });
archive.on("error", (error) => zipStream.destroy(error));
archive.on("warning", (error) => zipStream.destroy(error));
archive.pipe(zipStream);
archive.directory(output, false);
await Promise.all([archive.finalize(), finished(zipStream)]);
const hash = createHash("sha256");
for await (const chunk of createReadStream(zipPath)) hash.update(chunk);
const checksum = hash.digest("hex");
await writeFile(path.join(deployment, "SHA256SUMS.txt"), `${checksum}  ${zipName}\n`);
const info = {
  siteUrl: domain.origin,
  createdAt: new Date().toISOString(),
  archive: zipName,
  bytes: (await stat(zipPath)).size,
  sha256: checksum,
  uploadDirectory: "public_html",
  runtime: "Static HTML, CSS, JavaScript and local assets; no Node.js server",
};
await writeFile(path.join(deployment, "deployment-info.json"), `${JSON.stringify(info, null, 2)}\n`);
console.log(`\nHostinger package: ${zipPath}`);
console.log(`Site: ${domain.origin}`);
console.log(`ZIP size: ${(info.bytes / 1024 / 1024).toFixed(1)} MB`);
console.log("Extract the ZIP contents directly into public_html. See HOSTINGER-DEPLOYMENT.md.");