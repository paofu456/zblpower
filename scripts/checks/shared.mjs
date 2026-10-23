import fs from "node:fs";
import path from "node:path";

export function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(target) : [target];
  });
}

export function pageUrl(file, distDirectory) {
  const relative = path.relative(distDirectory, file).replaceAll("\\", "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

// Google site-verification tokens (google<token>.html) are plain-text ownership
// proof files served byte-identically at the site root. They are not pages and
// intentionally carry no title, meta description or h1.
const GOOGLE_VERIFICATION_FILE = /^google[0-9a-z]+\.html$/i;

export function readPages(distDirectory) {
  const root = path.resolve(distDirectory);
  return walkFiles(distDirectory)
    .filter((file) => file.endsWith(".html"))
    .filter((file) => !(path.dirname(path.resolve(file)) === root && GOOGLE_VERIFICATION_FILE.test(path.basename(file))))
    .map((file) => ({
      file,
      url: pageUrl(file, distDirectory),
      html: fs.readFileSync(file, "utf8"),
    }));
}
