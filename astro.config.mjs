// @ts-check
import { defineConfig } from "astro/config";

// Served from https://stannrodriguez.github.io/website/ (GitHub Pages project site).
// If this moves to a custom domain or a <user>.github.io repo, set `base` to "/".
export default defineConfig({
  site: "https://stannrodriguez.github.io",
  base: "/website",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
