import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const files = [
  "index.html",
  ...readdirSync("components")
    .filter((file) => file.endsWith(".html"))
    .map((file) => `components/${file}`)
];

const errors = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);

  for (const id of new Set(ids)) {
    if (ids.filter((candidate) => candidate === id).length > 1) {
      errors.push(`${file}: duplicate id ${id}`);
    }
  }

  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (reference.startsWith("#") || /^(https?:|mailto:|tel:)/.test(reference)) continue;
    const target = resolve(dirname(file), reference.split("#")[0]);
    if (!existsSync(target)) errors.push(`${file}: missing ${reference}`);
  }
}

console.log(JSON.stringify({ htmlFiles: files.length, errors }, null, 2));
process.exit(errors.length ? 1 : 0);
