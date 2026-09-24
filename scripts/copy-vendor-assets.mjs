import { cp, mkdir } from "node:fs/promises";

await Promise.all([
  mkdir("assets/vendor/fontawesome/css", { recursive: true }),
  mkdir("assets/vendor/fontawesome/webfonts", { recursive: true }),
  mkdir("assets/fonts", { recursive: true })
]);

await Promise.all([
  cp(
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    "assets/vendor/fontawesome/css/all.min.css"
  ),
  cp(
    "node_modules/@fortawesome/fontawesome-free/webfonts",
    "assets/vendor/fontawesome/webfonts",
    { recursive: true }
  ),
  ...[400, 500, 600, 700].map((weight) =>
    cp(
      `node_modules/@fontsource/manrope/files/manrope-latin-${weight}-normal.woff2`,
      `assets/fonts/manrope-${weight}.woff2`
    )
  )
]);
