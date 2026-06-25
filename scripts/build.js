const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

const requiredFiles = [
  "index.html",
  "llms.txt",
  "robots.txt",
  "sitemap.xml",
  "netlify.toml",
];

for (const file of requiredFiles) {
  const source = path.join(root, file);
  if (!fs.existsSync(source)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}

fs.mkdirSync(dist, { recursive: true });

for (const file of requiredFiles) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

const html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!html.includes("<!DOCTYPE html>") || !html.includes("</html>")) {
  console.error("index.html does not look like valid HTML");
  process.exit(1);
}

console.log("Build complete. Output written to dist/");
console.log(`Files: ${requiredFiles.join(", ")}`);